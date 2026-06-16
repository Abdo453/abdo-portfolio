import json

# Let's write a large set of questions covering OSCP, CEH, Bug Bounty, and General Security

questions = [
    # ================= OSCP =================
    {
        "id": 101, "cat": "oscp", "diff": "medium",
        "question": "أثناء فحص شبكة داخلية (OSCP Lab)، وجدت المنفذ 445 مفتوحاً ولكن بدون Null Session. كيف تستخرج قائمة الـ Users باستخدام حساب صالح (Valid Credentials)؟",
        "options": [
          "nmap -p 445 --script smb-vuln*",
          "crackmapexec smb <IP> -u 'user' -p 'pass' --users",
          "smbclient -L //IP/ -N",
          "enum4linux -a <IP>"
        ],
        "correct": 1,
        "explanation": "<strong>SMB Enumeration:</strong> لاستخراج الـ Users عندما تملك Credentials صالحة، أداة `crackmapexec` أو `netexec` هي الأفضل والأسرع، `enum4linux` يعمل أيضاً ولكن CME أكثر كفاءة.",
        "tip": "crackmapexec smb 10.10.10.10 -u 'john' -p 'password123' --users"
    },
    {
        "id": 102, "cat": "oscp", "diff": "hard",
        "question": "اخترقت سيرفر Linux بصلاحيات مستخدم عادي (www-data). وجدت ملف SUID اسمه 'find' (/usr/bin/find). كيف تستخدمه للوصول إلى Root؟",
        "options": [
          "find . -exec /bin/sh \\; -quit",
          "find / -name root.txt",
          "sudo find / -exec sh \\;",
          "chmod +s /bin/bash"
        ],
        "correct": 0,
        "explanation": "<strong>SUID Privilege Escalation:</strong> الأمر `find` إذا كان يحتوي على SUID bit، يمكنه تنفيذ أوامر بصلاحية مالك الملف (غالباً Root) باستخدام الـ flag `-exec`. هذا أمر أساسي في منهجية OSCP.",
        "tip": "find . -exec /bin/sh -p \\; -quit"
    },
    {
        "id": 103, "cat": "oscp", "diff": "medium",
        "question": "في بيئة Active Directory، ما هو هجوم AS-REP Roasting؟",
        "options": [
          "استخراج TGS للخدمات التي تعمل بحسابات مستخدمين وتخمين الـ Hash.",
          "استخراج الـ Hash الخاص بالمستخدمين الذين لديهم خاصية 'Do not require Kerberos preauthentication' مفعلة.",
          "سرقة الـ NTLM Hash من الذاكرة باستخدام Mimikatz.",
          "إرسال طلب مزيف للـ Domain Controller لتغيير كلمة مرور الـ Admin."
        ],
        "correct": 1,
        "explanation": "<strong>AS-REP Roasting:</strong> هجوم يستهدف المستخدمين الذين ليس لديهم Pre-Auth مفعل، مما يسمح للمهاجم بطلب تذكرة AS-REP من الـ KDC واستخراج الـ Hash لتخمينه Offline.",
        "tip": "GetNPUsers.py domain.local/ -usersfile users.txt -format hashcat -dc-ip 10.10.10.10"
    },
    {
        "id": 104, "cat": "oscp", "diff": "hard",
        "question": "في بيئة Windows Privilege Escalation، ما هو استغلال SeImpersonatePrivilege؟",
        "options": [
          "استغلال ثغرة في Kernel للحصول على SYSTEM.",
          "استخدام أدوات مثل PrintSpoofer أو JuicyPotato لإجبار خدمة تعمل بصلاحية SYSTEM على المصادقة معك، ومن ثم انتحال الـ Token الخاص بها.",
          "تغيير مسار خدمة (Unquoted Service Path).",
          "قراءة الـ SAM Database."
        ],
        "correct": 1,
        "explanation": "<strong>Token Impersonation:</strong> صلاحية SeImpersonate (غالباً موجودة لدى IIS و SQL Server) تسمح لك بانتحال Tokens. باستخدام PrintSpoofer (لـ Windows 10/Server 2016+) يمكنك الحصول على SYSTEM.",
        "tip": "PrintSpoofer.exe -i -c cmd"
    },
    {
        "id": 105, "cat": "oscp", "diff": "medium",
        "question": "في Buffer Overflow (منهجية OSCP القديمة/الأساسية)، ما هي فائدة JMP ESP؟",
        "options": [
          "إيقاف تشغيل الحماية DEP.",
          "القفز إلى عنوان عشوائي في الذاكرة.",
          "الكتابة فوق EIP لجعله يقفز إلى عنوان يحتوي على تعليمة JMP ESP، والتي بدورها تنقل التنفيذ إلى الـ Stack (حيث يوجد الـ Shellcode الخاص بك).",
          "زيادة حجم الـ Buffer لتجنب الانهيار."
        ],
        "correct": 2,
        "explanation": "<strong>Buffer Overflow Basics:</strong> تعليمة JMP ESP ضرورية لتوجيه مسار التنفيذ إلى أعلى الـ Stack (المؤشر ESP)، حيث تقوم بوضع الـ Shellcode الخبيث.",
        "tip": "!mona jmp -r esp -cpb \"\\x00\\x0a\\x0d\""
    },

    # ================= CEH =================
    {
        "id": 201, "cat": "ceh", "diff": "easy",
        "question": "حسب منهجية CEH، ما هي الخطوة الأولى في الـ Ethical Hacking؟",
        "options": [
          "Scanning",
          "Gaining Access",
          "Reconnaissance / Footprinting",
          "Maintaining Access"
        ],
        "correct": 2,
        "explanation": "<strong>Hacking Phases:</strong> المنهجية الرسمية (EC-Council) تبدأ دائماً بـ Reconnaissance (جمع المعلومات)، تليها Scanning، ثم Gaining Access، ثم Maintaining Access، وأخيراً Clearing Tracks.",
        "tip": "Recon is 80% of the work."
    },
    {
        "id": 202, "cat": "ceh", "diff": "medium",
        "question": "أداة Nmap: ما هو الـ flag المستخدم لإجراء XMAS Scan؟",
        "options": [
          "-sS",
          "-sX",
          "-sU",
          "-sA"
        ],
        "correct": 1,
        "explanation": "<strong>XMAS Scan (-sX):</strong> يقوم بإرسال حزمة TCP مفعل فيها (FIN, PSH, URG). يستخدم لتجاوز بعض أنواع الـ Firewalls التي تراقب الـ SYN packets فقط.",
        "tip": "nmap -sX -p 1-1024 10.10.10.10"
    },
    {
        "id": 203, "cat": "ceh", "diff": "easy",
        "question": "ما هو الهجوم الذي يعتمد على تزييف الـ MAC Address لربط الـ IP الخاص بالـ Gateway بجهاز المهاجم؟",
        "options": [
          "DNS Spoofing",
          "DHCP Starvation",
          "ARP Spoofing",
          "MAC Flooding"
        ],
        "correct": 2,
        "explanation": "<strong>ARP Spoofing:</strong> يقوم المهاجم بتسميم الـ ARP Cache الخاص بالضحية ليظن أن المهاجم هو الـ Router (الـ Gateway)، مما يتيح له تنفيذ Man-In-The-Middle (MITM).",
        "tip": "arpspoof -i eth0 -t <Target_IP> <Gateway_IP>"
    },
    {
        "id": 204, "cat": "ceh", "diff": "medium",
        "question": "ما هي أفضل طريقة للحماية من هجمات الـ SQL Injection حسب توصيات الأمان؟",
        "options": [
          "استخدام Firewalls على الشبكة.",
          "تشفير قاعدة البيانات بـ AES-256.",
          "استخدام Prepared Statements (Parameterized Queries).",
          "تشفير كلمة مرور الـ Admin بـ MD5."
        ],
        "correct": 2,
        "explanation": "<strong>SQLi Prevention:</strong> الـ Prepared Statements تفصل الكود البرمجي (الاستعلام) عن البيانات المدخلة، مما يجعل من المستحيل على المدخلات أن تغير مسار الاستعلام.",
        "tip": "Always use PDO/Parameterized Queries in your code."
    },

    # ================= Bug Bounty =================
    {
        "id": 301, "cat": "bugbounty", "diff": "hard",
        "question": "وجدت تطبيق يسمح لك برفع صورة (Avatar). قمت برفع ملف PHP، ولكن السيرفر يعيد تسمية الملف إلى .png ويمسح أي كود PHP. كيف تتجاوز هذه الحماية إذا كان السيرفر يستخدم ImageMagick قديم؟",
        "options": [
          "الاستسلام، السيرفر آمن تماماً.",
          "تغيير Content-Type في Burp إلى text/php.",
          "استخدام ثغرة ImageTragick عن طريق وضع payload داخل ملف .mvg مدمج في الصورة.",
          "رفع ملف .htaccess."
        ],
        "correct": 2,
        "explanation": "<strong>ImageTragick (CVE-2016-3714):</strong> إذا كان التطبيق يستخدم ImageMagick قديم لمعالجة الصور، يمكن كتابة كود مخصص (MVG) يؤدي إلى RCE أثناء معالجة الصورة، بغض النظر عن الامتداد.",
        "tip": "Search for ImageTragick MVG payload."
    },
    {
        "id": 302, "cat": "bugbounty", "diff": "medium",
        "question": "ما هي ثغرة BOLA (Broken Object Level Authorization) في الـ APIs؟",
        "options": [
          "تخطي المصادقة (Authentication) كلياً بدون توكن.",
          "القدرة على تغيير الـ ID في الـ API Endpoint للوصول إلى بيانات مستخدم آخر (تعرف أيضاً بـ IDOR).",
          "حقن أوامر SQL داخل الـ JSON.",
          "إرسال طلبات كثيرة جداً لإسقاط السيرفر (Rate Limit)."
        ],
        "correct": 1,
        "explanation": "<strong>BOLA / IDOR:</strong> تعتبر رقم 1 في قائمة OWASP API Security. تحدث عندما لا يتحقق الـ API مما إذا كان المستخدم الحالي لديه صلاحية للوصول إلى الـ Object ID المطلوب.",
        "tip": "Always test endpoints like /api/users/123 by changing it to 124."
    },
    {
        "id": 303, "cat": "bugbounty", "diff": "hard",
        "question": "اكتشفت ثغرة SSRF ولكن الـ Target يعمل ببيئة AWS. ما هو الـ Endpoint الذي ستحاول الوصول إليه لاستخراج الـ IAM Credentials؟",
        "options": [
          "http://127.0.0.1/admin",
          "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
          "http://metadata.google.internal/",
          "http://aws.amazon.com/credentials"
        ],
        "correct": 1,
        "explanation": "<strong>AWS Metadata SSRF:</strong> الـ IP السحري في Cloud Environments هو 169.254.169.254. في بيئة AWS، المسار المذكور يحتوي على الـ Temporary Credentials الخاصة بالدور (Role) المربوط بـ EC2.",
        "tip": "curl http://169.254.169.254/latest/meta-data/iam/security-credentials/"
    },
    {
        "id": 304, "cat": "bugbounty", "diff": "medium",
        "question": "في الـ Bug Bounty، ماذا يقصد بـ 'Second-Order SQL Injection'؟",
        "options": [
          "استخدام أداتين SQLmap في نفس الوقت.",
          "إدخال Payload في نموذج، ويتم تخزينه في الـ Database بأمان، ثم يتم تنفيذه لاحقاً عند استدعائه في استعلام آخر.",
          "إدخال Payload يتم تنفيذه مباشرة في الـ Response.",
          "استغلال الـ SQL Injection عبر الـ Headers فقط."
        ],
        "correct": 1,
        "explanation": "<strong>Second-Order SQLi:</strong> الخطورة تكمن في أن المطور قد يقوم بفلترة البيانات عند الإدخال (الخطوة 1)، لكنه يثق بالبيانات الخارجة من الـ Database ويضعها في استعلام آخر بدون فلترة (الخطوة 2).",
        "tip": "Think about User Profile update -> Display Profile features."
    },

    # ================= General Cyber Security =================
    {
        "id": 401, "cat": "general", "diff": "easy",
        "question": "ما هو الـ Zero-Day Exploit؟",
        "options": [
          "ثغرة تم اكتشافها وإصدار ترقيع (Patch) لها اليوم.",
          "فيروس يصيب الجهاز ويمسح البيانات في صفر يوم.",
          "ثغرة في نظام ما، غير معروفة للشركة المصنعة ولا يوجد لها ترقيع (Patch) حتى الآن.",
          "هجوم DDOS يستمر لأقل من يوم."
        ],
        "correct": 2,
        "explanation": "<strong>Zero-Day:</strong> تعني أن المطور لديه 'صفر أيام' لحل المشكلة لأنها مستغلة فعلياً ولم تكن معروفة لديه من قبل.",
        "tip": "Zero-days are the most expensive bugs in the market."
    },
    {
        "id": 402, "cat": "general", "diff": "easy",
        "question": "أي من بروتوكولات التشفير التالية يعتبر الأحدث والأكثر أماناً لشبكات الـ Wi-Fi؟",
        "options": [
          "WEP",
          "WPA2",
          "WPA3",
          "WPS"
        ],
        "correct": 2,
        "explanation": "<strong>WPA3:</strong> تم إطلاقه كتحسين لـ WPA2 ليحمي من هجمات التخمين (Dictionary Attacks) بفضل تقنية SAE (Simultaneous Authentication of Equals).",
        "tip": "Always disable WEP and WPS!"
    },
    {
        "id": 403, "cat": "general", "diff": "medium",
        "question": "ما هي تقنية الـ Sandbox في أمن المعلومات؟",
        "options": [
          "لعبة إلكترونية للهاكرز.",
          "بيئة معزولة وآمنة لتشغيل البرامج أو تحليل البرمجيات الخبيثة دون التأثير على النظام الأساسي.",
          "أداة لتسريع اتصال الإنترنت.",
          "نوع من أنواع الـ Firewalls."
        ],
        "correct": 1,
        "explanation": "<strong>Sandboxing:</strong> يستخدم بكثرة في تحليل الـ Malware (مثل Cuckoo Sandbox) لتشغيل الفيروس في بيئة افتراضية ومراقبة سلوكه بأمان.",
        "tip": "Use Windows Sandbox for quick safe execution."
    }
]

import os
js_content = "const ALL_QUESTIONS = " + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n"

# We will save this into a file called quiz_db.js in the build/js directory, 
# and also update the template to load it. 
# But wait, it's easier to just inject it directly into the HTML like before, 
# or make the HTML fetch it. I'll make a separate file.
with open(r'D:\abdo_portfolio\main\static\main\js\quiz_db.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
    
print("Created quiz_db.js")
