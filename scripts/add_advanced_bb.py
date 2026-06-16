import re
import json

new_advanced_bb_questions = [
    # ---- BB Recon ----
    {
        "id": 601, "cat": "bb_recon", "diff": "hard",
        "question": "أثناء فحص الـ Recon، وجدت أن السيرفر المستهدف يستخدم Nginx كـ Reverse Proxy أمام خادم داخلي. كيف يمكنك اكتشاف وجود مسارات إدارية (Admin Panels) مخفية قد تكون معتمدة على الـ Virtual Host الداخلي؟",
        "options": [
          "استخدام أداة Wfuzz مع التلاعب بـ Host Header لإرسال قيم مثل 'localhost' أو 'admin.local'.",
          "عمل brute-force باستخدام DirBuster مع قاموس كبير جداً.",
          "تنفيذ هجوم DNS Zone Transfer باستخدام dig.",
          "فحص منافذ الـ UDP للسيرفر."
        ],
        "correct": 0,
        "explanation": "<strong>VHost Discovery:</strong> الكثير من الشركات تقوم بإخفاء لوحات التحكم (Admin Panels) عن طريق ربطها بـ Host Header داخلي. التلاعب بـ Host Header واستخدام قيم مثل 'localhost' أو أسماء نطاقات داخلية قد يجبر الـ Reverse Proxy (Nginx) على توجيهك للسيرفر الإداري المخفي.",
        "tip": "wfuzz -c -w vhosts.txt -H 'Host: FUZZ.target.com' http://IP/"
    },
    {
        "id": 602, "cat": "bb_recon", "diff": "medium",
        "question": "عثرت على Subdomain يشير إلى خدمة سحابية (CNAME) ولكن الخدمة تُرجع خطأ (404 Not Found). كيف تتأكد أن هذا النطاق معرّض لثغرة Subdomain Takeover؟",
        "options": [
          "بمجرد ظهور 404، فإن النطاق مصاب وعليك كتابة التقرير.",
          "التحقق مما إذا كان مزود الخدمة (مثل GitHub, AWS, Heroku) يسمح للمستخدمين بتسجيل النطاقات بدون إثبات ملكية مسبقة (Verification Bypass).",
          "إرسال طلب HTTP TRACE للتحقق من الاستجابة.",
          "تغيير عنوان IP النطاق في ملف hosts المحلي."
        ],
        "correct": 1,
        "explanation": "<strong>Subdomain Takeover:</strong> مجرد وجود CNAME يشير لخدمة تعطي 404 لا يعني حتمية الثغرة. بعض الخدمات تطلب إثبات ملكية للنطاق الأساسي (Domain Verification). يجب التأكد من سياسة الخدمة عبر مستودع مثل 'Can I Take Over XYZ'.",
        "tip": "Check edoverflow's 'can-i-take-over-xyz' GitHub repository."
    },

    # ---- BB Web Vulns ----
    {
        "id": 603, "cat": "bb_web", "diff": "hard",
        "question": "ما هي ثغرة HTTP Request Smuggling، وكيف تنشأ؟",
        "options": [
          "تنشأ عند إرسال ملفات ضخمة لتعطيل قاعدة البيانات.",
          "تنشأ نتيجة اختلاف تفسير كل من الـ Front-end (Proxy) والـ Back-end لخلفية طلب HTTP (بسبب التعارض بين حقلي Content-Length و Transfer-Encoding).",
          "تنشأ عند سرقة ملفات الارتباط (Cookies) عبر بروتوكول HTTP.",
          "تنشأ عند تغيير نوع المحتوى إلى XML بدلاً من JSON."
        ],
        "correct": 1,
        "explanation": "<strong>HTTP Request Smuggling:</strong> تحدث عندما يقرأ الـ Load Balancer أو الـ Proxy الطلب بناءً على Content-Length (CL)، بينما يقرأه السيرفر الخلفي بناءً على Transfer-Encoding (TE) أو العكس (CL.TE أو TE.CL). هذا يسمح للمهاجم بـ 'تهريب' طلب مخفي داخل طلب شرعي.",
        "tip": "Use Burp Suite's 'HTTP Request Smuggler' extension for detection."
    },
    {
        "id": 604, "cat": "bb_web", "diff": "hard",
        "question": "في ثغرات Web Cache Poisoning، ما المقصود بالـ 'Unkeyed Input'؟",
        "options": [
          "هو الـ Header أو الـ Parameter الذي يقوم نظام الـ Cache بتجاهله عند إنشاء مفتاح الـ Cache (Cache Key)، ولكنه مع ذلك ينعكس في استجابة السيرفر.",
          "هو الإدخال الذي يفتقر إلى تشفير SSL.",
          "هو الـ Input المخفي داخل نماذج الـ HTML.",
          "هو طلب HTTP الذي يتم رفضه من قبل الـ Cache."
        ],
        "correct": 0,
        "explanation": "<strong>Web Cache Poisoning:</strong> أنظمة التخزين المؤقت (Cache) تستخدم أجزاء معينة من الطلب (مثل الـ URL و Host Header) لإنشاء 'مفتاح' (Key). الأجزاء الأخرى (Unkeyed) لا تدخل في المفتاح. إذا كان Unkeyed input ينعكس في الاستجابة (مثل X-Forwarded-Host يؤدي إلى XSS)، فيمكن للمهاجم تسميم الـ Cache ليصيب كل من يزور نفس الـ Key.",
        "tip": "Use Param Miner in Burp to find Unkeyed parameters/headers."
    },
    {
        "id": 605, "cat": "bb_web", "diff": "medium",
        "question": "كيف تكتشف ثغرة DOM XSS المتعلقة بـ postMessage؟",
        "options": [
          "عبر فحص الكود المصدري للبحث عن `addEventListener('message')` وتحليل ما إذا كان هناك تحقق من `event.origin` قبل تمرير البيانات إلى دوال خطيرة مثل `eval()` أو `innerHTML`.",
          "عن طريق حقن كود JavaScript في شريط الـ URL فقط.",
          "من خلال استخدام أدوات فحص ثغرات SQL.",
          "عبر اعتراض الاتصال بـ Burp Suite وتغيير محتوى طلبات POST."
        ],
        "correct": 0,
        "explanation": "<strong>postMessage DOM XSS:</strong> رسائل postMessage تستخدم للتواصل بين الـ Iframes والـ Windows. إذا كان التطبيق يستقبل الرسالة ويقوم بمعالجتها (Sink) بدون التأكد من المصدر (Origin Check)، يمكن لموقع المهاجم إرسال payload خبيث للضحية عبر iframe.",
        "tip": "Search sources for: addEventListener('message', function(e)..."
    },

    # ---- BB API & Logic Bugs ----
    {
        "id": 606, "cat": "bb_api", "diff": "hard",
        "question": "أثناء اختبار نظام دفع (Payment Gateway)، لاحظت أن السعر يتم تمريره كـ Parameter في الـ API. ما هو سيناريو الـ Logic Bug الأكثر خطورة الذي يجب اختباره فوراً؟",
        "options": [
          "تغيير السعر إلى قيمة نصية (String) لإحداث خطأ.",
          "تغيير السعر إلى قيمة سالبة (Negative Value) لمحاولة إجبار النظام على إضافة رصيد لحسابك بدلاً من خصمه.",
          "حذف حقل السعر كلياً لمشاهدة رسالة الخطأ.",
          "إرسال طلبات متعددة بسرعة لإحداث Rate Limit."
        ],
        "correct": 1,
        "explanation": "<strong>Business Logic / Negative Pricing:</strong> تمرير القيم السالبة في أنظمة الدفع أو عربات التسوق قد يؤدي إلى قيام التطبيق بـ 'خصم السالب' (أي إضافة الرصيد) إذا لم يكن هناك تحقق رياضي صحيح في الـ Backend.",
        "tip": "Always test bounds: 0, negative values, decimals, and massive integers."
    },
    {
        "id": 607, "cat": "bb_api", "diff": "medium",
        "question": "كيف يمكنك محاولة تجاوز حماية الـ Rate Limiting في الـ APIs باستخدام الـ HTTP Headers؟",
        "options": [
          "استخدام تشفير Base64 للبيانات المرسلة.",
          "إضافة وتعديل الـ Headers مثل X-Forwarded-For، X-Real-IP، و X-Client-IP للإيحاء للسيرفر بأن الطلبات تأتي من عناوين IP مختلفة.",
          "تغيير الـ User-Agent إلى Googlebot.",
          "استخدام بروتوكول HTTP/2 بدلاً من HTTP/1.1."
        ],
        "correct": 1,
        "explanation": "<strong>Rate Limit Bypass:</strong> بعض السيرفرات تعتمد على هذه الـ Headers لتحديد IP العميل الحقيقي إذا كانت خلف Proxy. تغيير هذه القيم مع كل طلب يمكن أن يخدع نظام الحماية (WAF/Rate Limiter) ويتيح لك إرسال عدد غير محدود من الطلبات (مثال: Brute-forcing OTPs).",
        "tip": "Burp Intruder -> Add payload position on X-Forwarded-For: 127.0.0.§1§"
    },
    {
        "id": 608, "cat": "bb_api", "diff": "hard",
        "question": "في الـ GraphQL، ما هي هجمات Query Batching؟",
        "options": [
          "استخراج الجداول وقواعد البيانات عن طريق حقن SQL داخل استعلامات GraphQL.",
          "إرسال عدد ضخم من الاستعلامات (Queries) داخل طلب HTTP واحد (Array of queries) لتجاوز قيود الـ Rate Limit المطبقة على الـ HTTP Endpoint، مما يسمح بعمل Brute-force سريع.",
          "تقسيم الاستعلامات الكبيرة إلى أجزاء صغيرة لعدم استهلاك الذاكرة.",
          "تغيير الـ Type الخاص بـ GraphQL إلى JSON."
        ],
        "correct": 1,
        "explanation": "<strong>GraphQL Query Batching:</strong> ميزة تتيح للعميل إرسال مصفوفة من الطلبات ليتم معالجتها دفعة واحدة لتقليل الـ Network overhead. الهاكر يستغلها لوضع 10,000 محاولة تسجيل دخول داخل طلب HTTP واحد فقط، فيتجاوز حماية الـ Rate Limiter المعتمدة على الـ HTTP.",
        "tip": "Send: [ {\"query\":\"mutation{login(usr:\\\"A\\\",pass:\\\"1\\\")}\"}, {...} ]"
    },

    # ---- BB Cloud Security ----
    {
        "id": 609, "cat": "bb_cloud", "diff": "hard",
        "question": "كيف يمكنك تجاوز الحماية التي تفرضها GCP (Google Cloud) والتي تشترط وجود Header محدد ('Metadata-Flavor: Google') للوصول إلى الـ Metadata Endpoint أثناء استغلال ثغرة SSRF؟",
        "options": [
          "استغلال ثغرات الـ DNS Rebinding للالتفاف على الحماية.",
          "التجاوز مستحيل ما لم يكن الـ SSRF يتيح لك إضافة Custom Headers صراحةً.",
          "استخدام بروتوكول gopher:// لتضمين الـ Header المطلوب مع الـ SSRF.",
          "الإجابات B و C كلاهما صحيح اعتماداً على قوة الـ SSRF."
        ],
        "correct": 3,
        "explanation": "<strong>Cloud SSRF Bypass:</strong> في GCP و AWS IMDSv2، يجب إرسال Custom Headers لاستخراج הـ Metadata. إذا كان الـ SSRF لا يدعم الحقن المباشر للـ Headers، يمكن للمهاجم استخدام بروتوكول `gopher://` (إذا كان مدعوماً) لبناء طلب HTTP كامل متضمنًا الـ Headers المطلوبة من الصفر.",
        "tip": "gopher://169.254.169.254:80/_GET /computeMetadata/... HTTP/1.1%0AHost:..."
    },
    {
        "id": 610, "cat": "bb_cloud", "diff": "medium",
        "question": "اكتشفت تسريب لـ AWS Access Key و Secret Key في كود مصدري (GitHub). كيف تتحقق من صلاحيات هذا المفتاح بأسرع طريقة؟",
        "options": [
          "تثبيت AWS CLI واستخدام أمر `aws sts get-caller-identity` لتحديد صاحب المفتاح، ثم فحص السياسات المتاحة له.",
          "تسجيل الدخول به من خلال واجهة الموقع (AWS Console).",
          "حذف المفتاح فوراً لحماية الشركة.",
          "لا يمكن معرفة الصلاحيات دون اختراق الـ Root Account."
        ],
        "correct": 0,
        "explanation": "<strong>AWS IAM Verification:</strong> أمر `get-caller-identity` يعمل كـ 'whoami' في بيئة AWS. بعدها يمكنك استخدام أدوات مثل `pacu` لعمل Privilege Escalation و Enumeration كامل للصلاحيات التي يمتلكها هذا الـ Key.",
        "tip": "aws sts get-caller-identity --profile stolen-key"
    }
]

path_quiz = r'D:\abdo_portfolio\main\templates\main\quiz.html'
quiz_content = open(path_quiz, encoding='utf-8').read()

new_questions_js = json.dumps(new_advanced_bb_questions, ensure_ascii=False, indent=2)

match = re.search(r'const ALL_QUESTIONS = (\[.*?\]);', quiz_content, re.DOTALL)
if match:
    old_array = match.group(1)
    merged = old_array[:-1].strip() + ',\n' + new_questions_js[1:].strip()
    quiz_content = quiz_content.replace(old_array, merged)
    open(path_quiz, 'w', encoding='utf-8').write(quiz_content)
    print('Successfully added 10 Highly Advanced Bug Bounty questions.')
else:
    print('Failed to find ALL_QUESTIONS in quiz.html')
