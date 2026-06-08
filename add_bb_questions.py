import re
import json

new_bb_questions = [
    {
        "id": 501, "cat": "bb_recon", "diff": "medium",
        "question": "أثناء مرحلة الـ Recon، استخدمت أداة Amass ووجدت Subdomain يرجع رسالة (NXDOMAIN). ما هي الخطوة التالية الأكثر منطقية للبحث عن ثغرات؟",
        "options": [
          "تخطي النطاق لأنه غير موجود.",
          "البحث عن ثغرة Subdomain Takeover عبر فحص الـ CNAME Records السابقة.",
          "محاولة عمل Port Scanning باستخدام Nmap.",
          "محاولة استغلال ثغرة SQL Injection."
        ],
        "correct": 1,
        "explanation": "<strong>Subdomain Takeover:</strong> عندما يرجع النطاق NXDOMAIN (غير موجود)، فهذا مؤشر قوي على أن الـ Subdomain ربما كان مربوطاً بخدمة خارجية (مثل S3 أو GitHub Pages) وتم مسحها، مما يتيح لك الاستيلاء عليه إذا سجلت نفس الاسم في الخدمة الخارجية.",
        "tip": "Always check CNAMEs of NXDOMAIN subdomains."
    },
    {
        "id": 502, "cat": "bb_web", "diff": "hard",
        "question": "وجدت ثغرة XSS ولكن التطبيق يستخدم Content Security Policy (CSP) يمنع 'unsafe-inline'. ما هي الطريقة الأفضل لتجاوز (Bypass) هذه الحماية وتنفيذ الـ Payload؟",
        "options": [
          "استخدام eval() داخل الـ Payload.",
          "تغيير حروف الـ Payload مثل <sCrIpT>.",
          "البحث عن ثغرة في أحد الـ Domains المسموح بها في الـ script-src (مثل JSONP Endpoints أو CDNs غير آمنة).",
          "لا يمكن تجاوز الـ CSP نهائياً في هذه الحالة."
        ],
        "correct": 2,
        "explanation": "<strong>CSP Bypass:</strong> إذا كان الـ script-src يسمح بنطاقات معينة (Whitelist)، يمكنك البحث داخل هذه النطاقات عن JSONP endpoints أو ثغرات تعيد لك كود JS، وبذلك سيعتبره الـ CSP كوداً موثوقاً لأنه قادم من نطاق مسموح.",
        "tip": "Use Google to find open JSONP endpoints on whitelisted domains."
    },
    {
        "id": 503, "cat": "bb_api", "diff": "medium",
        "question": "تطبيق يعتمد على GraphQL، كيف يمكنك استخراج شكل قاعدة البيانات (Schema) إذا لم تكن موثقة؟",
        "options": [
          "استخدام SQLmap على الـ endpoint.",
          "إرسال استعلام Introspection (مثل __schema) إلى الـ endpoint.",
          "محاولة تحميل ملف schema.xml من الـ root.",
          "الـ Schema دائماً مخفية ولا يمكن الوصول إليها إلا بصلاحيات Admin."
        ],
        "correct": 1,
        "explanation": "<strong>GraphQL Introspection:</strong> استعلامات الـ Introspection هي ميزة أساسية في GraphQL تسمح للعميل بسؤال السيرفر عن الهيكل الكامل للـ Schema (الـ Types, Queries, Mutations). غالباً ما ينسى المطورون إغلاقها في بيئة الـ Production.",
        "tip": "Query: { __schema { types { name } } }"
    },
    {
        "id": 504, "cat": "bb_cloud", "diff": "easy",
        "question": "أثناء البحث في AWS، وجدت ملف Backup بامتداد .bak مرفوع على S3 Bucket مفتوح للجميع (Public). ماذا تسمى هذه الثغرة الشائعة؟",
        "options": [
          "S3 Bucket Misconfiguration (Insecure Storage).",
          "Server-Side Request Forgery (SSRF).",
          "Cross-Origin Resource Sharing (CORS) Bypass.",
          "Command Injection."
        ],
        "correct": 0,
        "explanation": "<strong>Cloud Storage Misconfig:</strong> ترك الـ S3 Buckets مفتوحة للصلاحيات العامة (Public Read/Write) هو من أشهر أخطاء الـ Cloud Security ويؤدي إلى تسريب بيانات حساسة جداً.",
        "tip": "Use tools like 'cloud_enum' to find public buckets."
    }
]

path_quiz = r'D:\abdo_portfolio\main\templates\main\quiz.html'
quiz_content = open(path_quiz, encoding='utf-8').read()

# We need to inject the new_bb_questions into the ALL_QUESTIONS array inside quiz.html
new_questions_js = json.dumps(new_bb_questions, ensure_ascii=False, indent=2)

# Find where the array ends
match = re.search(r'const ALL_QUESTIONS = (\[.*?\]);', quiz_content, re.DOTALL)
if match:
    old_array = match.group(1)
    # Merge them
    merged = old_array[:-1].strip() + ',\n' + new_questions_js[1:].strip()
    quiz_content = quiz_content.replace(old_array, merged)
    open(path_quiz, 'w', encoding='utf-8').write(quiz_content)
    print('Successfully added Bug Bounty Sub-Category questions.')
else:
    print('Failed to find ALL_QUESTIONS in quiz.html')
