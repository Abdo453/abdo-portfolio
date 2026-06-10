import os

quizzes_file = r'D:\abdo_portfolio\build\ccna\quizzes.js'
with open(quizzes_file, 'r', encoding='utf-8') as f:
    quizzes_content = f.read()

new_quizzes = """
    "sec_attacks": {
        "easy": [
            {
                q: "ما هو الهدف من هجمات הـ DoS (حجب الخدمة)؟",
                options: ["سرقة كلمات المرور", "إسقاط السيرفرات وإيقاف الخدمة عن المستخدمين الشرعيين عبر إغراقها بالبيانات", "تشفير ملفات الشركة لطلب فدية", "التحكم في الراوتر عن بعد"],
                correct: 1,
                explanation: "هجمات DoS أو DDoS تهدف لتدمير الـ Availability (التوافرية) للخدمة بجعل السيرفر غير قادر على الاستجابة للطلبات الشرعية."
            },
            {
                q: "في هجوم הـ ARP Spoofing، كيف يستفيد الهاكر من ذلك؟",
                options: ["يتمكن من اختراق הـ Firewall مباشرة", "يجعل جميع الموظفين يرسلون بياناتهم إليه (Man-in-the-Middle) قبل ذهابها للراوتر", "يتسبب في احتراق السويتش", "يغير الـ IP الخاص بموقع الشركة"],
                correct: 1,
                explanation: "عندما يزيف הهاكر رسائل ARP، فإنه يوهم الموظفين بأن הـ MAC Address الخاص به هو الـ MAC الخاص بالراوتر. فتمر كل بياناتם عبر جهازه."
            }
        ],
        "medium": [
            {
                q: "ما هو هجوم DHCP Starvation؟",
                options: ["قيام הهاكر بتشغيل سيرفر DHCP مزيف يوزع آيبيهات للموظفين", "سرقة بيانات الموظفين أثناء تجديد الـ IP", "قيام الهاكر بإرسال آلاف الطلبات الوهمية بـ MAC Addresses مختلفة لسيرفر الـ DHCP الأصلي ليجعله يستنفد كل הـ IP Addresses المتاحة", "توزيع عناوين DNS مزيفة للموظفين"],
                correct: 2,
                explanation: "DHCP Starvation (التجويع) يهدف لاستهلاك كل الآيبيهات في الـ DHCP Pool بحيث لا يتبقى أي IP للموظفين الجدد."
            }
        ],
        "hard": [
            {
                q: "أي هجوم يهدف إلى اختراق بروتوكول المصادقة Kerberos للحصول على تذاكر مشفرة وفك تشفيرها لاحقاً (Offline Brute-Force)؟",
                options: ["ARP Spoofing", "Kerberoasting", "MAC Flooding", "VLAN Hopping"],
                correct: 1,
                explanation: "Kerberoasting هو هجوم מתقدم يستهدف سيرفرات Active Directory للحصول على كلمات مرور حسابات الخدمة عبر بروتوكول Kerberos."
            }
        ],
        "scenario": [
            {
                q: "لاحظت أن الموظفين الجدد لا يحصلون على آيبيهات من الـ DHCP السليم للشركة، وبدلاً من ذلك يحصلون على آيبيهات من شبكة غريبة 10.9.9.0/24 و Gateway يشير لجهاز مجهول. ما هو الهجوم الذي تتعرض له؟",
                options: ["DHCP Starvation", "Rogue DHCP Server", "MAC Spoofing", "DDoS"],
                correct: 1,
                explanation: "وجود سيرفر DHCP مزيف في الشبكة يوزع آيبيهات خبيثة يسمى Rogue DHCP Server، وهو مقدمة لهجوم Man-in-the-Middle."
            }
        ]
    },
    "sec_acl": {
        "easy": [
            {
                q: "ما هي السمة المميزة لـ Standard ACL (الأرقام من 1 إلى 99)؟",
                options: ["تستطيع حظر الـ Ports (مثل بورت 80)", "تقوم بالتصفية (Filtering) بناءً على הـ Source IP (عنوان المصدر) فقط", "تستخدم لتشفير البيانات", "تقوم بالتصفية بناءً على הـ Destination IP فقط"],
                correct: 1,
                explanation: "الـ Standard ACL محدودة جداً وتعتمد فقط على عنوان المرسل (Source IP) ولا تفهم البورتات أو الوجهة."
            },
            {
                q: "ما هي القاعدة الذهبية لتطبيق הـ Extended ACL (100-199)؟",
                options: ["تطبيقها أقرب ما يمكن للـ Destination (الوجهة)", "تطبيقها أقرب ما يمكن للـ Source (المصدر)", "تطبيقها على السويتشات فقط", "لا يهم مكان تطبيقها"],
                correct: 1,
                explanation: "لأن הـ Extended ACL ذكية وتعرف الوجهة بالتحديد، يجب تطبيقها بالقرب من المصدر لمنع הـ Packets من استهلاك موارد الشبكة بلا فائدة إذا كانت ستُرفض في النهاية."
            }
        ],
        "medium": [
            {
                q: "ما هو السطر المخفي الموجود في نهاية أي Access Control List (ACL) في سيسكو؟",
                options: ["permit ip any any", "deny ip any any (Implicit Deny)", "deny tcp any any", "permit icmp any any"],
                correct: 1,
                explanation: "في سيسكو، أي ACL تنتهي ضمناً بقاعدة (الرفض الضمني لجميع ما سبق). إذا لم تضع permit، سيتم حظر كل شيء."
            },
            {
                q: "ما هو الأمر الصحيح في הـ Extended ACL لمنع הـ Host (192.168.1.50) من تصفح مواقع الويب (HTTP) على السيرفر (10.0.0.100)؟",
                options: ["access-list 100 deny host 192.168.1.50 host 10.0.0.100 eq 80", "access-list 100 deny tcp host 192.168.1.50 host 10.0.0.100 eq 80", "access-list 10 deny host 192.168.1.50", "access-list 100 deny tcp 192.168.1.50 10.0.0.100 port 80"],
                correct: 1,
                explanation: "الصيغة الصحيحة تطلب تحديد البروتوكول (tcp)، ثم المصدر، ثم الوجهة، ثم البورت (eq 80)."
            }
        ],
        "hard": [
            {
                q: "ماذا يحدث إذا كتبت הـ ACL التالية وطبقتها `in` على منفذ الراوتر: `access-list 10 permit 192.168.1.50` ولم تكتب أي شيء آخر؟",
                options: ["سيتم السماح לـ 192.168.1.50 فقط بالمرور، وسيتم حظر جميع الأجهزة الأخرى", "سيتم السماح للجميع بالمرور لأنها Standard", "سيتم حظر 192.168.1.50 فقط", "لن تعمل הـ ACL لأنها تفتقر للـ Wildcard mask"],
                correct: 0,
                explanation: "بسبب وجود הـ Implicit Deny في النهاية، فإن كتابة سطر Permit واحد يعني أن هذا الجهاز فقط هو المسموح له، وأي جهاز آخر سيصطدم بالرفض الضمني المخفي."
            }
        ],
        "scenario": [
            {
                q: "أراد مديرك حظر موظف (10.1.1.5) من تصفح الفيسبوك باستخدام Standard ACL وتم تطبيقها `in` على راوتر الشركة (أقرب ما يمكن للفيسبوك). فجأة، اشتكى الموظف أنه لم يعد قادراً على الوصول حتى للسيرفر الداخلي للشركة! أين الخطأ؟",
                options: ["الـ Standard ACL تحظر المصدر من الذهاب لأي مكان أياً كان، لذلك كان يجب تطبيقها أقرب للوجهة بدلاً من تطبيقها بشكل عام", "كان يجب استخدام Extended ACL لحظر منفذ 443 بدلاً من حظر የـ IP بالكامل", "العبارتان الأولى والثانية صحيحتان", "لا يوجد خطأ، هذه هي الطريقة الصحيحة لحظر الفيسبوك"],
                correct: 2,
                explanation: "أولاً، Standard ACL تحظر الـ IP بالكامل ولا تفهم البورتات. ثانياً، تطبيق Standard ACL في مكان خاطئ (بعيداً عن الوجهة المستهدفة بدقة) يؤدي لمنع الموظف من استخدام الشبكة لمهام أخرى."
            }
        ]
    },
    "sec_portsec": {
        "easy": [
            {
                q: "ما هو الغرض من ميزة Port Security في סويتشات سيسكو؟",
                options: ["تشفير البيانات اللاسلكية", "منع توصيل أجهزة غير مصرح بها على منافذ السويتش من خلال تحديد הـ MAC Address المسموح به", "تسريع نقل البيانات في الـ VLAN", "منع رسائل הـ Broadcast"],
                correct: 1,
                explanation: "Port Security تقيد المنفذ ليقبل بيانات فقط من أجهزة تمتلك MAC Addresses محددة مسبقاً، لمنع المتسللين."
            },
            {
                q: "ما هو الإجراء (Violation) الافتراضي الذي يتخذه السويتش إذا تم توصيل جهاز غير مصرح به في منفذ مفعل عليه Port Security؟",
                options: ["Protect", "Restrict", "Shutdown", "Warning"],
                correct: 2,
                explanation: "رد الفعل الافتراضي هو Shutdown، حيث يغلق السويتش المنفذ بالكامل ويحوله إلى حالة err-disabled لحماية الشبكة."
            }
        ],
        "medium": [
            {
                q: "في إعدادات Port Security، ماذا تفعل الكلمة `sticky` في أمر `switchport port-security mac-address sticky`؟",
                options: ["تجعل הـ MAC Address يتغير كل 5 دقائق", "تجعل السويتش يمنع أي جهاز باستثناء הـ Routers", "تجعل السويتش يتعلم أول MAC Address يتم توصيله بالمنفذ ويحفظه في إعدادات הـ Running-Config تلقائياً", "تلغي تفعيل הـ Port Security بعد إعادة التشغيل"],
                correct: 2,
                explanation: "الـ Sticky وفرت على المهندسين كتابة הـ MAC يدوياً. السويتش سيقرأ الـ MAC الخاص بجهاز الموظف الأول، ويلصقه في الإعدادات بشكل دائم."
            },
            {
                q: "كيف تحمي ميزة `DHCP Snooping` الشبكة من הـ Rogue DHCP Server؟",
                options: ["عن طريق إغلاق كل المنافذ", "عن طريق تقسيم منافذ السويتش إلى Trusted (تسمح بمرور عروض الـ DHCP) و Untrusted (ترفضها لمنع سيرفرات הهاكرز)", "عن طريق تشفير رسائل الـ DORA", "عن طريق تحويل الـ MAC للهاكر إلى أصفار"],
                correct: 1,
                explanation: "نجعل المنفذ المتصل بالسيرفر الحقيقي Trusted، وباقي منافذ الموظفين Untrusted، وبذلك أي موظف يحاول تشغيل DHCP Server سيتم رفضه من السويتش فوراً."
            }
        ],
        "hard": [
            {
                q: "ما هي التقنية التي تعتمد على جدول הـ DHCP Snooping (Binding Database) لمنع هجوم ARP Spoofing؟",
                options: ["Port Security", "Dynamic ARP Inspection (DAI)", "IP Source Guard (IPSG)", "802.1X"],
                correct: 1,
                explanation: "الـ DAI يقوم بتفتيش رسائل الـ ARP، ويقارنها بجدول الـ DHCP Snooping ليتأكد أن صاحب הـ MAC Address لا يكذب ويدعي أنه يمتلك IP لا يخصه."
            }
        ],
        "scenario": [
            {
                q: "موظف قام بفصل كابل الشبكة من كمبيوتر الشركة (المبرمج عليه Port Security بحد أقصى 1 MAC) ووصله باللابتوب الشخصي الخاص به لتحميل ملفات كبيرة. فوراً أُغلق المنفذ (err-disabled). أدرك الموظف خطأه وأعاد الكابل للكمبيوتر الخاص بالشركة. هل سيعمل المنفذ؟",
                options: ["نعم، سيعمل تلقائياً بمجرد استشعار הـ MAC الصحيح", "لا، يجب أن يقوم الموظف بإعادة تشغيل الكمبيوتر", "لا، المنفذ مغلق أمنياً، ويجب على مهندس الشبكة الدخول للسويتش وكتابة shutdown ثم no shutdown للمنفذ", "نعم، إذا انتظر 5 دقائق"],
                correct: 2,
                explanation: "عندما يدخل المنفذ في حالة err-disabled بسبب Shutdown Violation، فإنه يحتاج إلى تدخل يدوي من المهندس لإعادة تشغيله (reset) كنوع من العقاب والضبط الأمني (ما لم تكن مفعل ميزة errdisable recovery)."
            }
        ]
    },
"""

quizzes_content = quizzes_content.replace('const quizzesData = {', 'const quizzesData = {\n' + new_quizzes)

with open(quizzes_file, 'w', encoding='utf-8') as f:
    f.write(quizzes_content)

print("Domain 5 Quizzes injected successfully!")
