import re

quizzes_file = r'D:\abdo_portfolio\build\ccna\quizzes.js'
with open(quizzes_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace empty placeholder for serv_dhcp
serv_dhcp_quizzes = """
    "serv_dhcp": {
        "easy": [
            {
                "q": "ما هو اختصار بروتوكول DHCP؟",
                "options": [
                    "Dynamic Host Configuration Protocol",
                    "Data Host Control Protocol",
                    "Dynamic Hardware Control Protocol",
                    "Data Handling Computer Protocol"
                ],
                "answer": 0,
                "explanation": "يرمز DHCP إلى Dynamic Host Configuration Protocol وهو المسؤول عن التوزيع الديناميكي لعناوين الشبكة."
            },
            {
                "q": "أي من رسائل DORA الأربعة هي رسالة Broadcast من الكمبيوتر للبحث عن الخادم؟",
                "options": [
                    "Offer",
                    "Request",
                    "Discover",
                    "Acknowledge"
                ],
                "answer": 2,
                "explanation": "رسالة Discover هي الرسالة الأولى وتُرسل كـ Broadcast للبحث عن أي سيرفر DHCP في الشبكة."
            }
        ],
        "medium": [
            {
                "q": "ما هو الأمر المستخدم لمنع الراوتر من توزيع عناوين معينة (مثل عنوان الراوتر نفسه)؟",
                "options": [
                    "ip dhcp exclude 192.168.1.1",
                    "ip dhcp excluded-address 192.168.1.1",
                    "ip dhcp avoid 192.168.1.1",
                    "ip dhcp block 192.168.1.1"
                ],
                "answer": 1,
                "explanation": "الأمر الصحيح في سيسكو لاستثناء عنوان أو نطاق من العناوين هو ip dhcp excluded-address."
            },
            {
                "q": "ما هي المشكلة التي يحلها الـ DHCP Relay Agent؟",
                "options": [
                    "بطء استجابة الـ DHCP",
                    "منع الراوتر لرسائل הـ Broadcast من العبور لشبكة أخرى",
                    "نفاذ عناوين الـ IP المتاحة في الـ Pool",
                    "توزيع عناوين DNS خاطئة"
                ],
                "answer": 1,
                "explanation": "رسالة Discover تكون Broadcast، والراوتر يمنع الـ Broadcast من العبور. الـ Relay Agent (ip helper-address) يحولها إلى Unicast لتصل للسيرفر في الشبكة الأخرى."
            }
        ],
        "hard": [
            {
                "q": "أين يتم كتابة أمر 'ip helper-address 10.1.1.5' لكي يعمل بشكل صحيح كـ Relay Agent؟",
                "options": [
                    "في وضع Global Configuration (R1(config)#)",
                    "داخل إعدادات الـ DHCP Pool",
                    "على الـ Interface المواجهة لسيرفر الـ DHCP",
                    "على الـ Interface المواجهة للكمبيوترات (Clients)"
                ],
                "answer": 3,
                "explanation": "يجب وضع الأمر على المنفذ (Interface) المواجه لأجهزة الموظفين لكي يستلم رسالة الـ Broadcast منهم ويحولها لـ Unicast نحو السيرفر."
            }
        ],
        "scenario": {
            "title": "مشكلة في الـ Relay",
            "context": "قمت بإعداد سيرفر DHCP مركزي للشركة في الفرع الرئيسي (IP: 10.0.0.100). الموظفون في شبكة VLAN 20 (الـ Gateway الخاص بها هو g0/1.20 على الراوتر) لا يحصلون على عناوين IP.",
            "question": "ما هو الإعداد الناقص والمكان الصحيح لكتابته لحل المشكلة؟",
            "options": [
                "كتابة ip helper-address 10.0.0.100 داخل الـ VLAN 20 على السويتش.",
                "كتابة ip helper-address 10.0.0.100 داخل الـ sub-interface g0/1.20 على الراوتر.",
                "كتابة ip dhcp relay 10.0.0.100 على الفتحة g0/1 الرئيسية.",
                "كتابة ip route 0.0.0.0 0.0.0.0 10.0.0.100 على الراوتر."
            ],
            "answer": 1,
            "explanation": "الـ Gateway لأجهزة الـ VLAN هو الـ sub-interface على الراوتر. لذلك يجب الدخول إليه وتطبيق ip helper-address لتحويل الـ Broadcast إلى سيرفر الـ DHCP."
        }
    },
"""

serv_nat_quizzes = """
    "serv_nat": {
        "easy": [
            {
                "q": "ما هي الفائدة الأساسية من الـ NAT؟",
                "options": [
                    "تشفير البيانات وحمايتها من الاختراق",
                    "ترجمة العناوين الخاصة (Private) إلى عناوين عامة (Public) للوصول للإنترنت",
                    "توزيع عناوين IP على الأجهزة ديناميكياً",
                    "منع الفيروسات من دخول الشبكة"
                ],
                "answer": 1,
                "explanation": "بروتوكول NAT (Network Address Translation) صُنع أساساً لترجمة العناوين الخاصة إلى عامة للتمكن من التصفح، مما حل أزمة نفاذ عناوين IPv4."
            },
            {
                "q": "في مصطلحات سيسكو للـ NAT، ماذا يمثل الـ 'Inside Local'؟",
                "options": [
                    "العنوان الخاص (Private) لجهاز الكمبيوتر داخل الشركة",
                    "العنوان العام (Public) للراوتر على الإنترنت",
                    "عنوان سيرفر جوجل الذي نتصفحه",
                    "العنوان الخاص (Private) لراوتر مزود الخدمة"
                ],
                "answer": 0,
                "explanation": "Inside تعني أنه خاص بنا داخلياً، و Local تعني العنوان كما نراه نحن (أي الـ Private IP)."
            }
        ],
        "medium": [
            {
                "q": "أي نوع من الـ NAT يسمح لمئات الموظفين بالخروج للإنترنت باستخدام عنوان Public IP واحد فقط؟",
                "options": [
                    "Static NAT",
                    "Dynamic NAT",
                    "PAT (NAT Overload)",
                    "Reverse NAT"
                ],
                "answer": 2,
                "explanation": "الـ PAT (Port Address Translation) أو NAT Overload يعتمد على رقم المنفذ (Port) ليفرق بين اتصالات الأجهزة المختلفة، مما يسمح لأكثر من 65 ألف اتصال بالمشاركة في IP عام واحد."
            },
            {
                "q": "في سطر الأوامر: ip nat inside source list 1 interface s0/0/0 overload، ما هو دور 'list 1'؟",
                "options": [
                    "قائمة أرقام المنافذ (Ports) المسموح بها",
                    "هي Access List تحدد العناوين الداخلية المسموح لها بالترجمة والخروج للإنترنت",
                    "رقم الـ VLAN الداخلية",
                    "رقم سرعة الإنترنت المسموحة للموظفين"
                ],
                "answer": 1,
                "explanation": "نستخدم الـ ACL (Access Control List) لتحديد أي الـ Subnets يُسمح بمرورها عبر الـ NAT للحصول على ترجمة."
            }
        ],
        "hard": [
            {
                "q": "إذا كان لديك سيرفر ويب (Web Server) داخل الشركة (IP 192.168.1.100) وتريد أن يصل إليه العملاء من الإنترنت عبر عنوانك العام (200.1.1.5)، ما هو نوع הـ NAT المطلوب؟",
                "options": [
                    "NAT Overload (PAT)",
                    "Dynamic NAT",
                    "Static NAT",
                    "Policy NAT"
                ],
                "answer": 2,
                "explanation": "السيرفرات تتطلب ربطاً ثابتاً لا يتغير (1 to 1 Mapping) لكي يستطيع الناس من الخارج الاتصال به دائماً عبر نفس العنوان العام الثابت، وهذا هو Static NAT."
            }
        ],
        "scenario": {
            "title": "الإنترنت مقطوع!",
            "context": "قمت بعمل كل إعدادات الـ NAT وقمت بتفعيل Overload وربطه بالـ ACL الصحيحة. لكن الموظفين ما زالوا لا يستطيعون تصفح الإنترنت.",
            "question": "ما هي الخطوة التي غالباً ينسى المهندسون الجدد القيام بها لتفعيل הـ NAT بشكل كامل؟",
            "options": [
                "إنشاء DNS Server داخلي",
                "الدخول على كل جهاز كمبيوتر وتفعيل خيار NAT في الويندوز",
                "الدخول على منافذ الراوتر (Interfaces) وتحديد من هو الـ ip nat inside ومن هو الـ ip nat outside",
                "كتابة أمر ip routing"
            ],
            "answer": 2,
            "explanation": "لا يكفي كتابة قاعدة הـ NAT فقط. يجب أن تخبر الراوتر أي فتحة موجهة للداخل (ip nat inside) وأي فتحة موجهة للإنترنت (ip nat outside) لكي يعرف في أي اتجاه سيقوم بالترجمة."
        }
    },
"""

serv_dns_ntp_quizzes = """
    "serv_dns_ntp": {
        "easy": [
            {
                "q": "ما هي وظيفة الـ DNS؟",
                "options": [
                    "توزيع عناوين IP تلقائياً",
                    "ترجمة العناوين الخاصة إلى عامة",
                    "ترجمة أسماء النطاقات (مثل google.com) إلى عناوين IP",
                    "مزامنة الوقت والتاريخ في الشبكة"
                ],
                "answer": 2,
                "explanation": "الـ DNS هو بمثابة دليل الهاتف، يُترجم الأسماء البشرية المفهومة إلى عناوين IP تفهمها الحواسيب والراوترات."
            },
            {
                "q": "ما هي وظيفة الـ NTP؟",
                "options": [
                    "تسريع نقل البيانات في الشبكة",
                    "مزامنة الوقت (Time Synchronization) عبر جميع أجهزة الشبكة",
                    "ترجمة أرقام المنافذ",
                    "التحكم في جدار الحماية"
                ],
                "answer": 1,
                "explanation": "الـ Network Time Protocol يُستخدم لضمان أن جميع الأجهزة (سويتشات، راوترات، سيرفرات) تمتلك نفس الوقت والتاريخ بالثانية."
            }
        ],
        "medium": [
            {
                "q": "ما هو الأمر المستخدم لتعريف راوتر سيسكو بخادم הـ DNS الخارجي؟",
                "options": [
                    "ip dns-server 8.8.8.8",
                    "ip name-server 8.8.8.8",
                    "dns set 8.8.8.8",
                    "server-dns 8.8.8.8"
                ],
                "answer": 1,
                "explanation": "أمر إعداد الـ DNS على الراوتر هو ip name-server."
            },
            {
                "q": "كيف نتأكد من أن राوتر سيسكو قد قام بمزامنة وقته بنجاح مع سيرفر הـ NTP؟",
                "options": [
                    "باستخدام أمر show clock فقط",
                    "باستخدام أمر show ntp status و show ntp associations",
                    "الوقت يظهر تلقائياً كرسالة Broadcast",
                    "من خلال وميض لمبة الـ SYNC في الراوتر"
                ],
                "answer": 1,
                "explanation": "أوامر show ntp associations و status تُظهر تفاصيل الاتصال بسيرفر הـ NTP وتؤكد حالة التزامن (يظهر رمز * بجوار السيرفر المُعتمد)."
            }
        ],
        "hard": [
            {
                "q": "لماذا تعتبر مزامنة الوقت (NTP) أمراً بالغ الأهمية من الناحية الأمنية (Security) في شبكات المؤسسات؟",
                "options": [
                    "لأن الهاكرز لا يستطيعون اختراق الراوترات إذا كان الوقت مضبوطاً",
                    "من أجل دقة سجلات الأحداث (Logs) وصلاحية شهادات التشفير (Certificates)",
                    "لأن الأنظمة تعمل بشكل أسرع في النهار مقارنة بالليل",
                    "لمنع وصول الموظفين للإنترنت بعد ساعات العمل بشكل تلقائي"
                ],
                "answer": 1,
                "explanation": "التحقيق الجنائي الرقمي يعتمد على Logs مترابطة زمنياً، وشهادات الأمان (مثل SSL/TLS و IPsec) تعتمد كلياً على الوقت لتحديد فترة صلاحيتها ورفضها إذا كان الوقت خاطئاً."
            }
        ],
        "scenario": {
            "title": "استكشاف أخطاء הـ NTP",
            "context": "قمت بتكوين ntp server 10.1.1.5 على الراوتر. بعد 5 دقائق كتبت أمر show ntp status ووجدت أن الـ Clock is unsynchronized. السيرفر 10.1.1.5 يرد على الـ Ping بشكل سليم.",
            "question": "ما هو السبب الأكثر احتمالاً لهذه المشكلة؟",
            "options": [
                "أمر ntp server يتطلب إعادة تشغيل الراوتر ليعمل",
                "الراوتر يحتاج إلى IP Helper Address",
                "سيرفر הـ NTP يرفض الطلب لأن الراوتر لم يقدم الـ NTP Authentication (الرقم السري) المطلوب",
                "الـ Ping لا يعني أن الـ IP يعمل"
            ],
            "answer": 2,
            "explanation": "إذا كانت إمكانية الوصول موجودة (Ping ينجح) ومع ذلك يفشل التزامن، فغالباً السيرفر يحمي نفسه بإعدادات مصادقة (Authentication) ويطلب مفتاح أمان (Key) لكي يمنحك الوقت."
        }
    }
"""

content = re.sub(r'"serv_dhcp":\s*\{\s*\},', serv_dhcp_quizzes, content)
content = re.sub(r'"serv_nat":\s*\{\s*\},', serv_nat_quizzes, content)
content = re.sub(r'"serv_dns_ntp":\s*\{\s*\}', serv_dns_ntp_quizzes, content)

with open(quizzes_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Domain 4 quizzes injected successfully!")
