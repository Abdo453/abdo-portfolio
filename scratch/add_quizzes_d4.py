import os

quizzes_file = r'D:\abdo_portfolio\build\ccna\quizzes.js'
with open(quizzes_file, 'r', encoding='utf-8') as f:
    quizzes_content = f.read()

new_quizzes = """
    "serv_dhcp": {
        "easy": [
            {
                q: "ما هي رسالة הـ Broadcast الأولى التي يرسلها جهاز الكمبيوتر للبحث عن سيرفر DHCP؟",
                options: ["DHCP Request", "DHCP Discover", "DHCP Offer", "DHCP ACK"],
                correct: 1,
                explanation: "أول خطوة في عملية DORA هي رسالة Discover التي تُرسل כـ Broadcast للبحث عن أي سيرفر DHCP متاح."
            },
            {
                q: "إذا كان سيرفر הـ DHCP في شبكة، والمستخدمون في شبكة أخرى يفصل بينهما راوتر، ما هي الميزة التي يجب تفعيلها على الراوتر لكي يعبر طلب הـ DHCP؟",
                options: ["NAT Overload", "DHCP Snooping", "DHCP Relay Agent (ip helper-address)", "Port Security"],
                correct: 2,
                explanation: "الراوتر يمنع الـ Broadcast، ولأن طلب DHCP هو Broadcast، نحتاج لتفعيل DHCP Relay Agent ليقوم الراوتر بتحويله لـ Unicast وإرساله للسيرفر."
            }
        ],
        "medium": [
            {
                q: "ما هو الغرض من أمر `ip dhcp excluded-address 192.168.1.1 192.168.1.10` على راوتر سيسكو؟",
                options: ["مسح هذه العناوين من الشبكة", "توزيع هذه العناوين بشكل حصري للمدراء", "منع سيرفر الـ DHCP من توزيع هذه العناوين للأجهزة، لكي يتم استخدامها كـ Static IP للسيرفرات والراوتر", "حظر هذه العناوين من الإنترنت"],
                correct: 2,
                explanation: "أمر excluded-address يضمن أن الـ DHCP لن يقوم بتوزيع هذه العناوين لأي كمبيوتر، وذلك لتجنب حدوث IP Conflict مع الأجهزة الثابتة كالطابعات والسيرفرات."
            }
        ],
        "hard": [
            {
                q: "في رسالة DHCP Offer، على أي مستوى (Layer) وفي أي بروتوكول يتم تحديد הـ IP المقترح للجهاز؟",
                options: ["Layer 2 (Ethernet Header)", "Layer 3 (IP Header)", "Layer 4 (TCP Header)", "Layer 7 (Application / DHCP Payload)"],
                correct: 3,
                explanation: "الـ IP المقترح (Your IP) يُرسل كبيانات (Payload) في طبقة التطبيقات داخل حزمة الـ DHCP، وليس في الـ IP Header، لأن الكمبيوتر لم يمتلك IP بشكل رسمي بعد."
            }
        ],
        "scenario": [
            {
                q: "قمت ببرمجة سيرفر DHCP على ਰਾوتر. لكنك لاحظت أن جميع أجهزة الموظفين استلمت IP و Subnet Mask، ولكنهم غير قادرين على تصفح الإنترنت أو الوصول لأي شبكة أخرى. ما هو الإعداد الناقص غالباً في برمجة الـ DHCP Pool؟",
                options: ["dns-server", "default-router", "network", "domain-name"],
                correct: 1,
                explanation: "للوصول لأي شبكة خارج شبكتهم المحلية، يحتاج الموظفون لمعرفة الـ Default Gateway الخاص بهم. يتم توزيعه في הـ DHCP عبر الأمر default-router."
            }
        ]
    },
    "serv_nat": {
        "easy": [
            {
                q: "ما هو البروتوكول الذي يحل مشكلة نقص عناوين IPv4 عن طريق ترجمة العناوين الخاصة (Private) إلى عناوين عامة (Public)؟",
                options: ["DHCP", "DNS", "NAT", "NTP"],
                correct: 2,
                explanation: "NAT يقوم بترجمة الـ Private IP إلى Public IP لكي تتمكن من الوصول للإنترنت."
            },
            {
                q: "أي نوع من الـ NAT يسمح لآلاف الموظفين بمشاركة عنوان Public IP واحد فقط للوصول للإنترنت؟",
                options: ["Static NAT", "Dynamic NAT", "PAT (NAT Overload)", "NAT-T"],
                correct: 2,
                explanation: "الـ PAT أو الـ NAT Overload يعتمد على استخدام أرقام الـ Ports للتفريق بين جلسات الموظفين، مما يسمح بمشاركة Public IP واحد."
            }
        ],
        "medium": [
            {
                q: "متى نضطر لاستخدام הـ Static NAT بدلاً من הـ PAT في الشبكة؟",
                options: ["عندما نريد إخراج 100 موظف للإنترنت", "عندما يكون لدينا سيرفر ويب داخلي (Web Server) ويجب أن يتمكن زوار الإنترنت من الدخول إليه", "عندما نريد توزيع הـ IP آلياً", "عندما نريد تسريع تصفح الإنترنت"],
                correct: 1,
                explanation: "الـ Static NAT (1-to-1) يستخدم لربط Public IP ثابت بـ Private IP ثابت، وهو ضروري للسيرفرات التي تحتاج لاستقبال اتصالات من الخارج."
            }
        ],
        "hard": [
            {
                q: "إذا استخدمت أمر `ip nat inside source list 1 interface g0/1 overload`، ماذا يعني `list 1`؟",
                options: ["رقم الواجهة", "رقم הـ VLAN", "رقم הـ Access Control List (ACL) التي تحدد من المسموح لهم بالخروج للإنترنت", "رقم مجموعة הـ HSRP"],
                correct: 2,
                explanation: "list 1 تشير إلى Standard ACL تم إنشاؤها مسبقاً لتحديد نطاق الـ Private IPs المسموح لها بالترجمة (NAT) والخروج للإنترنت."
            }
        ],
        "scenario": [
            {
                q: "قمت ببرمجة PAT لموظفي الشركة. برمجت الـ Pool، والـ ACL، وربطتهما معاً بـ overload. ومع ذلك، الموظفون لا زالوا يفشلون في الاتصال بالإنترنت. ما هي الخطوة التي غالباً نسيتها؟",
                options: ["إعطاء الموظفين Public IPs", "تحديد `ip nat inside` على المنفذ الداخلي للراوتر، و `ip nat outside` على منفذ الإنترنت", "إغلاق منافذ الراوتر بـ shutdown", "تفعيل OSPF"],
                correct: 1,
                explanation: "من شروط الـ NAT الأساسية هو الدخول للمنافذ (Interfaces) وتحديد من هو المنفذ الداخلي (inside) ومن هو المنفذ الخارجي (outside) المتجه للإنترنت."
            }
        ]
    },
    "serv_dns_ntp": {
        "easy": [
            {
                q: "ما هو الغرض من بروتوكول DNS؟",
                options: ["ترجمة الـ IP إلى MAC Address", "توزيع הـ IP للموظفين", "مزامنة وقت أجهزة الشبكة", "ترجمة أسماء المواقع (مثل google.com) إلى عناوين IP"],
                correct: 3,
                explanation: "البشر لا يستطيعون حفظ كل الآيبيهات، لذلك DNS يترجم الأسماء المفهومة إلى أرقام IP يفهمها الراوتر."
            },
            {
                q: "ما هو الغرض من بروتوكول NTP في بيئة سيسكو؟",
                options: ["إنشاء مسارات آمنة (VPN)", "مزامنة الوقت والتاريخ (Time Synchronization) بشكل دقيق بين جميع أجهزة الشبكة", "تسريع أداء السويتشات", "ترجمة عناوين הـ NAT"],
                correct: 1,
                explanation: "NTP هو Network Time Protocol ويستخدم لمزامنة الساعات، وهو مهم جداً للأمن والسجلات الرقمية (Logs)."
            }
        ],
        "medium": [
            {
                q: "ماذا يمثل مصطلح Stratum في بروتوكول NTP؟",
                options: ["سرعة خط הـ Internet", "عدد الراوترات في المسار", "مستوى دقة الوقت (الـ Stratum 1 هو الأكثر دقة لارتباطه مباشرة بمصادر Stratum 0)", "نوع تشفير كلمات المرور"],
                correct: 2,
                explanation: "الـ Stratum يحدد بعد السيرفر عن المصدر الأصلي للوقت (مثل الساعات الذرية). وكلما زاد الرقم، قلت الدقة."
            }
        ],
        "hard": [
            {
                q: "لماذا يعتبر وقت الراوتر (NTP Time) مهماً جداً لتحقيقات الأمن السيبراني (Forensics)؟",
                options: ["لأنه يمنع הـ Malware من الدخول", "لأنه يزيد من سرعة الـ CPU", "لأنه يوفر تسلسلاً زمنياً دقيقاً (Correlation) لسجلات הـ Logs المأخوذة من عدة أجهزة لتتبع الجريمة", "لا توجد له أهمية أمنية"],
                correct: 2,
                explanation: "إذا كانت أجهزة الشبكة غير متزامنة الوقت، لا يمكن لمحلل הـ SOC تحديد تسلسل مسار الهاكر داخل الشركة وتطابق السجلات (Logs)."
            }
        ],
        "scenario": [
            {
                q: "تحاول الدخول إلى موقع HTTPS آمن، فظهر لك المتصفح رسالة خطأ (Certificate Error / Your Clock is Behind). ما هو البروتوكول الذي كان سيعالج هذه المشكلة إن كان مفعلاً على جهازك؟",
                options: ["DNS", "DHCP", "NAT", "NTP"],
                correct: 3,
                explanation: "الشهادات الرقمية (SSL/TLS Certificates) لها مدة صلاحية تعتمد على التاريخ. إذا كان تاريخ جهازك خاطئاً، سيتم رفض الشهادة. الـ NTP كان سيضبط وقتك تلقائياً."
            }
        ]
    },
"""

# Inject without introducing literal backslash-n
quizzes_content = quizzes_content.replace('const quizzesData = {', 'const quizzesData = {\n' + new_quizzes)

with open(quizzes_file, 'w', encoding='utf-8') as f:
    f.write(quizzes_content)

print("Domain 4 Quizzes injected successfully!")
