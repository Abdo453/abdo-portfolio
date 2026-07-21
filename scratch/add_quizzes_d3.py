import os

quizzes_file = r'D:\abdo_portfolio\build\ccna\quizzes.js'
with open(quizzes_file, 'r', encoding='utf-8') as f:
    quizzes_content = f.read()

new_quizzes = """
    "route_fhrp": {
        "easy": [
            {
                q: "ما هو الغرض الأساسي من بروتوكولات הـ FHRP (مثل HSRP و VRRP)؟",
                options: ["تشفير البيانات عبر הـ WAN", "توفير Redundancy (تكرار) للـ Default Gateway", "توزيع הـ IP Addresses تلقائياً", "تقسيم הـ VLANs على הـ Switches"],
                correct: 1,
                explanation: "الهدف من FHRP هو دمج أكثر من راوتر ليظهروا كراوتر واحد (Gateway واحد) لتفادي انقطاع الإنترنت عن الموظفين إذا تعطل الراوتر الأساسي."
            },
            {
                q: "في بروتوكول HSRP، ماذا يُسمى الراوتر الذي يقوم فعلياً بتمرير بيانات المستخدمين؟",
                options: ["Active Router", "Standby Router", "Designated Router", "Root Bridge"],
                correct: 0,
                explanation: "الراوتر الأساسي يسمى Active، بينما الاحتياطي يسمى Standby."
            }
        ],
        "medium": [
            {
                q: "كيف يتم انتخاب הـ Active Router في بروتوكول HSRP؟",
                options: ["صاحب أقل MAC Address يفوز", "صاحب أعلى Priority يفوز، وإذا تساوت يفوز أعلى IP", "صاحب أعلى Bandwidth يفوز", "صاحب أدنى Priority يفوز"],
                correct: 1,
                explanation: "الانتخاب يتم بناءً على הـ Priority (الافتراضي 100، والأعلى هو الفائز). وإذا تساوت الأولويات، يُنظر لأعلى IP كفيصل."
            },
            {
                q: "ما هو الـ MAC Address الوهمي (Virtual MAC) الافتراضي الذي يستخدمه HSRPv1 للمجموعة رقم 10 (بالسداسي عشر 0A)؟",
                options: ["0000.0c07.ac0A", "0000.5e00.010A", "0000.0c07.ac10", "FFFF.FFFF.FFFF"],
                correct: 0,
                explanation: "HSRPv1 يستخدم الصيغة 0000.0c07.acXX حيث XX هي رقم المجموعة بالسداسي عشر. ورقم 10 بالهيكسا هو 0A."
            }
        ],
        "hard": [
            {
                q: "ما هي وظيفة الأمر `standby 1 preempt` في تكوين الـ HSRP؟",
                options: ["يجعل الراوتر يمرر البيانات بسرعة أكبر", "يجبر الراوتر على إرسال رسائل Hello كل ثانية بدلاً من 3 ثوانٍ", "يسمح للراوتر باستعادة منصبه كـ Active فور عودته للعمل إذا كان يمتلك Priority أعلى", "يمنع الراوترات الأخرى من الانضمام للمجموعة"],
                correct: 2,
                explanation: "بدون أمر preempt، إذا تعطل الـ Active، سيأخذ الـ Standby مكانه، ولكن عندما يعود الـ Active الأصلي للعمل، سيبقى Standby ولن يسترجع منصبه! أمر Preempt يحل هذه المشكلة."
            }
        ],
        "scenario": [
            {
                q: "أنت تدير شبكة بها راوتران يعملان كـ HSRP. الراوتر الأول R1 (Priority 150) والراوتر الثاني R2 (Priority 100). فجأة سقط R1، فأصبح R2 هو הـ Active. بعد ساعة عاد R1 للعمل، لكنك لاحظت أن R2 ما زال هو הـ Active! ما هو الأمر الناقص في R1؟",
                options: ["standby 1 track", "standby 1 preempt", "standby 1 timers", "standby 1 authentication"],
                correct: 1,
                explanation: "لكي يسترد R1 منصبه كزعيم (بسبب الـ Priority الأعلى الخاصة به) بمجرد عودته للحياة، يجب تفعيل ميزة הـ Preemption عليه."
            }
        ]
    },
    "route_ospf": {
        "easy": [
            {
                q: "في بروتوكول OSPF، ما هي الـ Area (المنطقة) التي يجب أن تتصل بها جميع المناطق الأخرى؟",
                options: ["Area 1", "Area 100", "Area 0 (Backbone)", "Area 255"],
                correct: 2,
                explanation: "تصميم OSPF الهرمي يفرض أن جميع المناطق (مثل Area 1 و Area 2) يجب أن تتصل بالمنطقة المركزية Area 0 (Backbone Area)."
            },
            {
                q: "ما هي القيمة الافتراضية للـ Administrative Distance (AD) لبروتوكول OSPF؟",
                options: ["90", "110", "120", "1"],
                correct: 1,
                explanation: "الـ AD لبروتوكول OSPF هو 110."
            }
        ],
        "medium": [
            {
                q: "كيف يقوم OSPF بحساب تكلفة المسار (Metric أو Cost)؟",
                options: ["بناءً على عدد الراوترات في المسار (Hop Count)", "بناءً على التأخير (Delay) والتحميل (Load)", "بناءً على عرض النطاق الترددي للوصلة (Bandwidth)", "بناءً على الـ IP Address الخاص بالوجهة"],
                correct: 2,
                explanation: "OSPF يعتمد على سرعة الخط (Bandwidth) لحساب التكلفة. الخط الأسرع له تكلفة أقل، وبالتالي يكون هو المسار المفضل."
            },
            {
                q: "ما هو الـ IP الذي يتم إرسال تحديثات OSPF إليه لكي تصل لجميع الراوترات المجاورة في الـ Ethernet؟",
                options: ["255.255.255.255", "224.0.0.9", "224.0.0.5", "224.0.0.10"],
                correct: 2,
                explanation: "OSPF يستخدم Multicast IP 224.0.0.5 لإرسال الـ Hellos والتحديثات لجميع راوترات הـ OSPF."
            }
        ],
        "hard": [
            {
                q: "في شبكة Ethernet (Multi-access)، كيف يتم انتخاب الـ DR (Designated Router)؟",
                options: ["أعلى Priority، ثم أعلى Router ID", "أقل Priority، ثم أقل Router ID", "أعلى Bandwidth على الـ Interface", "أطول Uptime (مدة التشغيل)"],
                correct: 0,
                explanation: "الراوتر صاحب أعلى OSPF Priority يفوز (افتراضياً 1). إذا تساوت الـ Priority، يفوز الراوتر صاحب أعلى Router ID (والذي يتم تحديده بأعلى Loopback IP، أو أعلى Physical IP)."
            }
        ],
        "scenario": [
            {
                q: "قمت ببرمجة OSPF على راوترين متصلين بكابل Serial. الـ OSPF لا يكوّن جيرة (No Adjacency). قمت بفحص الـ Hello Timer ووجدته 10 ثوانٍ في R1 و 30 ثانية في R2. ما هو السبب؟",
                options: ["تطابق الـ Timers غير مطلوب في OSPF", "يجب أن تتطابق الـ Hello والـ Dead Timers لكي تقوم الجيرة", "كابل الـ Serial لا يدعم OSPF", "الـ Priority في R2 أعلى من R1"],
                correct: 1,
                explanation: "من شروط قيام الجيرة (Adjacency) في OSPF أن تتطابق قيم الـ Hello timer والـ Dead timer بين الراوترين تماماً، وكذلك تطابق الـ Area ID."
            }
        ]
    },
    "route_static": {
        "easy": [
            {
                q: "ما هو الـ IP والـ Subnet Mask المستخدم لتمثيل الـ Default Route؟",
                options: ["255.255.255.255 255.255.255.255", "10.0.0.0 255.0.0.0", "0.0.0.0 0.0.0.0", "192.168.1.1 255.255.255.0"],
                correct: 2,
                explanation: "الـ Default Route (مسار الملاذ الأخير للإنترنت) يُمثل بأصفار ليعني (أي شبكة غير معروفة، وأي ماسك)."
            },
            {
                q: "ما هي הـ Administrative Distance (AD) الافتراضية للمسار الثابت (Static Route)؟",
                options: ["0", "1", "90", "110"],
                correct: 1,
                explanation: "المسار الثابت له AD مقدارها 1، مما يجعله مفضلاً على أي بروتوكول توجيه ديناميكي مثل OSPF أو EIGRP."
            }
        ],
        "medium": [
            {
                q: "ما هو الأمر الصحيح لإنشاء مسار ثابت للوصول للشبكة 172.16.0.0/16 عبر الراوتر المجاور 10.1.1.2؟",
                options: ["ip route 172.16.0.0 255.255.0.0 10.1.1.2", "ip route 10.1.1.2 255.255.0.0 172.16.0.0", "route ip 172.16.0.0 255.255.255.0 10.1.1.2", "ip static 172.16.0.0 255.255.0.0 next-hop 10.1.1.2"],
                correct: 0,
                explanation: "الصيغة الصحيحة هي: ip route [الشبكة الهدف] [الماسك الهدف] [الـ IP التالي أو Next-Hop]."
            },
            {
                q: "ما هو הـ Floating Static Route (المسار العائم)؟",
                options: ["مسار يتم حذفه تلقائياً عند إعادة تشغيل الراوتر", "مسار ثابت يتم تكوينه بـ AD أعلى من المسار الديناميكي ليعمل كاحتياطي (Backup)", "مسار يستخدم لتوجيه بيانات הـ Multicast فقط", "مسار يتغير الـ IP الخاص به تلقائياً"],
                correct: 1,
                explanation: "الـ Floating Static Route نعطيه AD عالية (مثلاً 115) بحيث يختبئ في الجدول ولا يتدخل طالما أن المسار الأساسي (مثل OSPF بـ AD 110) يعمل."
            }
        ],
        "hard": [
            {
                q: "عند تكوين مسار ثابت باستخدام واجهة الخروج (Exit Interface) بدلاً من الـ Next-Hop IP في شبكات Ethernet، ما هي المشكلة التي قد تحدث؟",
                options: ["يقلل من سرعة الـ CPU بسبب التشفير", "يتطلب تفعيل الـ OSPF", "يؤدي إلى استهلاك عالي جداً لطلبات الـ Proxy ARP", "لا يمكن حفظه في NVRAM"],
                correct: 2,
                explanation: "إذا وجهت البيانات لمنفذ Ethernet (مثل ip route 8.8.8.8 0.0.0.0 g0/0)، سيعتقد الراوتر أن الإنترنت كله متصل محلياً (Connected) وسيرسل طلب ARP لكل IP يحاول الوصول إليه، مما يخنق الشبكة. يُفضل استخدام הـ Next-Hop IP."
            }
        ],
        "scenario": [
            {
                q: "لديك مسار OSPF لشبكة الفروع. أردت عمل مسار احتياطي عبر خط 4G. كتبت الأمر `ip route 10.1.1.0 255.255.255.0 192.168.100.1`. بعد ذلك لاحظت أن مسار הـ OSPF اختفى من الجدول وحل مكانه مسار הـ 4G! ما هو الخطأ؟",
                options: ["لم تضع AD أعلى من 110 للمسار الثابت، فأخذ الـ AD الافتراضي (1) وطرد הـ OSPF", "نسيت تفعيل no shutdown", "كابل الـ 4G غير متصل", "يجب استخدام Exit Interface"],
                correct: 0,
                explanation: "لأن المسار الثابت له AD = 1 والـ OSPF له AD = 110. الراوتر يفضل الأقل. لجعله احتياطياً، كان يجب أن تضيف رقماً أعلى من 110 في نهاية الأمر، هكذا: ip route 10.1.1.0 255.255.255.0 192.168.100.1 115."
            }
        ]
    },
    "route_concept": {
        "easy": [
            {
                q: "ما هي الوظيفة الأساسية للراوتر في الشبكة؟",
                options: ["ربط الأجهزة في نفس הـ VLAN", "منع رسائل הـ Broadcast من العبور وتوجيه הـ Packets بين الشبكات المختلفة", "تشفير البيانات اللاسلكية", "تخزين الملفات المركزية"],
                correct: 1,
                explanation: "الراوتر يربط بين شبكات مختلفة (مثل LAN و WAN)، وهو يوقف رسائل الـ Broadcast ولا يمررها، ويتخذ قرارات التوجيه بناءً على הـ IP."
            },
            {
                q: "عندما تضع IP Address وتفتح منفذ الراوتر بـ no shutdown، كيف يظهر مسار هذه الشبكة المباشرة في جدول التوجيه؟",
                options: ["بحرف S (Static)", "بحرف O (OSPF)", "بحرف C (Connected)", "بحرف R (RIP)"],
                correct: 2,
                explanation: "الشبكات المتصلة مباشرة بالراوتر (Directly Connected) تضاف تلقائياً للجدول وتُميز بحرف C."
            }
        ],
        "medium": [
            {
                q: "إذا استلم الراوتر Packet متجهة لـ 10.1.1.50، ووجد في جدوله المسارين التاليين: الأول (10.0.0.0/8) والثاني (10.1.1.0/24). أيهما سيختار ولماذا؟",
                options: ["المسار الأول لأن الـ /8 أسرع", "المسار الثاني لأن الـ /24 أكثر تحديداً (Longest Prefix Match)", "كلاهما وسيحدث Load Balancing", "سيحذف الـ Packet ولن يوجهها"],
                correct: 1,
                explanation: "القاعدة الذهبية الأولى في التوجيه: الراوتر يختار دائماً المسار الأكثر تحديداً (الأطول في تطابق البتات)، وهو /24."
            },
            {
                q: "ما هو دور הـ Administrative Distance (AD)؟",
                options: ["قياس سرعة الكابل", "قياس مدى موثوقية وثقة الراوتر في مصدر المسار", "تحديد عدد الراوترات في الطريق", "إعطاء الأولوية للـ MAC Address"],
                correct: 1,
                explanation: "الـ AD تستخدم لكسر التعادل عندما يتلقى الراوتر نفس المسار من بروتوكولين مختلفين (مثلاً OSPF و Static). الراوتر سيثق بالذي يملك AD أقل."
            }
        ],
        "hard": [
            {
                q: "إذا استلم الراوتر نفس المسار 192.168.1.0/24 من خلال عملية OSPF (AD=110، Metric=50) ومن خلال عملية EIGRP (AD=90، Metric=1000). أيهما سيتم إضافته لجدول التوجيه (Routing Table)؟",
                options: ["مسار OSPF لأن التكلفة (Metric 50) أقل", "مسار EIGRP لأن הـ AD الخاصة به (90) أقل", "مسار OSPF لأن OSPF هو معيار مفتوح", "سيقوم بدمج المسارين معاً"],
                correct: 1,
                explanation: "الراوتر ينظر للـ AD أولاً قبل הـ Metric. بما أن הـ AD لـ EIGRP (90) أقل من OSPF (110)، سيثق بـ EIGRP ويضع مساره في الجدول، وسيتجاهل OSPF تماماً حتى لو كان المترك الخاص به أفضل!"
            }
        ],
        "scenario": [
            {
                q: "قمت بفتح الـ Routing Table ورأيت المسار التالي: `O 10.1.1.0/24 [110/65] via 192.168.1.2`. ماذا يمثل الرقم 65؟",
                options: ["رقم الـ AS للـ BGP", "الـ Administrative Distance", "הـ Metric (التكلفة) المحسوبة بواسطة הـ OSPF", "الوقت المتبقي لانتهاء صلاحية المسار"],
                correct: 2,
                explanation: "في القوس [110/65]، الرقم الأول (110) هو الـ AD لـ OSPF، والرقم الثاني (65) هو הـ Metric (التكلفة الإجمالية) للوصول لتلك الشبكة."
            }
        ]
    },
"""

quizzes_content = quizzes_content.replace('const quizzesData = {', 'const quizzesData = {\\n' + new_quizzes)

with open(quizzes_file, 'w', encoding='utf-8') as f:
    f.write(quizzes_content)

print("Domain 3 Quizzes injected successfully!")
