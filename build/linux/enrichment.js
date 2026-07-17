const lessonEnrichment = {
    "lesson1": {
        summary: "الشبكة هي نظام لربط الأجهزة. تتكون من أجهزة طرفية (End Devices)، أجهزة وسيطة (Switches/Routers)، ووسائط نقل (Cables/Wireless). وتصنف جغرافياً إلى LAN, WAN, SAN, PAN.",
        mistakes: "الخلط بين الإنترنت (متاح للجميع) والإنترانت (خاص بالموظفين فقط). أو الاعتقاد أن الـ WAN أسرع من الـ LAN (الـ LAN دائماً أسرع وأرخص).",
        quiz: [
            { q: "أي من الأجهزة التالية يُعتبر جهازاً وسيطاً (Intermediary Device)؟", options: ["جهاز كمبيوتر", "طابعة شبكية", "المحول (Switch)", "كاميرا IP"], answer: 2 },
            { q: "ما هي الشبكة المخصصة لربط الخوادم بأجهزة التخزين بسرعة فائقة؟", options: ["LAN", "WAN", "SAN", "PAN"], answer: 2 },
            { q: "ما هو المعيار الذي يعبر عن قدرة الشبكة على الاستمرار بالعمل عند تعطل أحد الكابلات؟", options: ["Scalability", "Reliability", "Speed", "Security"], answer: 1 }
        ]
    },
    "lesson1_5": {
        summary: "نموذج OSI يتكون من 7 طبقات (Application, Presentation, Session, Transport, Network, Data Link, Physical). يصف كيف تنتقل البيانات من التطبيق حتى تتحول إلى إشارات كهربائية.",
        mistakes: "حفظ الطبقات بالترتيب الخاطئ. أو الخلط بين وحدة البيانات في طبقة النقل (Segment) وطبقة الشبكة (Packet).",
        quiz: [
            { q: "في أي طبقة يعمل الراوتر (Router)؟", options: ["طبقة التطبيقات (Application)", "طبقة النقل (Transport)", "طبقة الشبكة (Network)", "الطبقة الفيزيائية (Physical)"], answer: 2 },
            { q: "ما هو اسم وحدة البيانات (PDU) في طبقة ربط البيانات (Data Link)؟", options: ["Packet", "Segment", "Frame", "Bits"], answer: 2 },
            { q: "أي طبقة مسؤولة عن تشفير البيانات وضغطها؟", options: ["Session", "Presentation", "Transport", "Data Link"], answer: 1 }
        ]
    },
    "lesson1_6": {
        summary: "نموذج TCP/IP هو النموذج الفعلي المستخدم في الإنترنت. يتكون من 4 طبقات مدمجة (Application, Transport, Internet, Network Access).",
        mistakes: "الاعتقاد بأن نموذج OSI هو المستخدم حالياً للبرمجة (OSI نظري فقط). أو الخلط بين طبقة Internet في TCP/IP وطبقة Network في OSI.",
        quiz: [
            { q: "كم عدد الطبقات في نموذج TCP/IP الأصلي؟", options: ["4", "5", "6", "7"], answer: 0 },
            { q: "طبقة التطبيقات في TCP/IP تدمج أي طبقات من نموذج OSI؟", options: ["Network, Data Link, Physical", "Application, Presentation, Session", "Transport, Network", "Application فقط"], answer: 1 },
            { q: "لماذا انتصر نموذج TCP/IP على OSI؟", options: ["لأنه نظري ومثالي", "لأنه تم تطوير البروتوكولات أولاً ثم النموذج وكان مجانياً", "لأنه يحتوي على 7 طبقات", "لأنه مدعوم من منظمة ISO"], answer: 1 }
        ]
    },
    "lesson2": {
        summary: "أجهزة الشبكة تمتلك CPU و RAM تماماً كالكمبيوتر. الـ Hub غبي وأمني ضعيف. الـ Switch ذكي وسريع جداً بفضل הـ ASIC. والـ Router يربط الشبكات المختلفة باستخدام جداول التوجيه.",
        mistakes: "استخدام الـ Hub في الشبكات الحديثة. أو الاعتقاد بأن السويتش يقرأ الـ IP (السويتش العادي يقرأ الـ MAC فقط).",
        quiz: [
            { q: "أي نوع من الذاكرة في الراوتر يحتفظ بالإعدادات ولا يُمحى بانقطاع الكهرباء؟", options: ["RAM", "NVRAM", "ASIC", "ROM"], answer: 1 },
            { q: "ما هي الشريحة المسؤولة عن السرعة الخارقة في معالجة البيانات داخل السويتش؟", options: ["CPU", "TCAM", "ASIC", "Flash"], answer: 2 },
            { q: "لماذا يعتبر الـ Hub كارثة أمنية؟", options: ["لأنه بطيء", "لأنه يرسل البيانات لجميع المنافذ (Flooding)", "لأنه يحذف الـ MAC", "لأنه معقد في البرمجة"], answer: 1 }
        ]
    },
    "lesson3": {
        summary: "التصميم الشائع للـ LAN هو النجمة (Star). للـ WAN توجد تصميمات Hub and Spoke (أرخص) و Full Mesh (مكلفة وآمنة). وفي مراكز البيانات الحديثة يُستخدم تصميم Spine-Leaf لأقصى سرعة.",
        mistakes: "الاعتقاد بأن Full Mesh مناسب للشركات الصغيرة (تكلفته الفلكية تمنع ذلك).",
        quiz: [
            { q: "ما هي الطوبولوجيا الافتراضية لأي شبكة محلية (LAN) حديثة؟", options: ["Ring", "Bus", "Star", "Full Mesh"], answer: 2 },
            { q: "ما هو عيب تصميم الـ Full Mesh الأساسي؟", options: ["بطيء جداً", "لا يوفر مسارات احتياطية", "التكلفة العالية جداً وصعوبة التمديد", "توقف الشبكة لو تعطل سويتش واحد"], answer: 2 },
            { q: "أي معمارية تستخدمها جوجل و AWS في مراكز البيانات لضمان الوصول السريع بين الخوادم؟", options: ["3-Tier Architecture", "Hub and Spoke", "Ring Topology", "Spine-Leaf Architecture"], answer: 3 }
        ]
    },
    "lesson4": {
        summary: "تستخدم الكابلات النحاسية (UTP) للسرعات والمسافات المحدودة (100 متر)، والألياف الضوئية (Fiber) للسرعات والمسافات الخارقة. الـ Goodput هو سرعة التحميل الفعلية للملف.",
        mistakes: "توقع أن الـ Bandwidth هو سرعة التحميل الفعلية (السرعة الفعلية هي הـ Goodput لأنها تستثني الـ Headers والتحكم).",
        quiz: [
            { q: "ما هي أقصى مسافة قياسية لكابلات النحاس UTP (Cat6a) لدعم 10 جيجابت؟", options: ["50 متر", "100 متر", "500 متر", "10 كيلومتر"], answer: 1 },
            { q: "أي نوع من الألياف الضوئية يستخدم ليزر واحد ويصل لمسافات تتخطى 100 كيلومتر؟", options: ["SMF (Single-Mode Fiber)", "MMF (Multi-Mode Fiber)", "UTP", "STP"], answer: 0 },
            { q: "ما هو المصطلح الهندسي الذي يعبر عن السرعة الصافية لتحميل ملفك بعد خصم الـ Headers؟", options: ["Bandwidth", "Throughput", "Latency", "Goodput"], answer: 3 }
        ]
    },
    "lesson2_1": {
        summary: "بروتوكول IP هو المسؤول عن التوجيه ويعتمد على TTL لمنع الدوران اللانهائي. الـ IPv6 جاء بـ 128-bit وألغى الـ Broadcast بالكامل واستبدله بآليات ذكية.",
        mistakes: "الاعتقاد بأن IP يضمن وصول البيانات (لا يضمن، TCP هو من يضمن).",
        quiz: [
            { q: "ما وظيفة حقل الـ TTL في الـ IPv4 Header؟", options: ["تشفير البيانات", "منع الدوران اللانهائي للبيانات في الشبكة (Routing Loops)", "تسريع النقل", "تصحيح الأخطاء"], answer: 1 },
            { q: "كم يبلغ طول عنوان IPv6؟", options: ["32 bit", "64 bit", "128 bit", "256 bit"], answer: 2 },
            { q: "أي من أنواع البث التالية تم إلغاؤه تماماً في الـ IPv6؟", options: ["Unicast", "Multicast", "Broadcast", "Anycast"], answer: 2 }
        ]
    },
    "lesson2_2": {
        summary: "الـ VLSM هو علم تقسيم الشبكة الرئيسية لشبكات فرعية بأحجام مختلفة لتجنب هدر عناوين الـ IP. نستخدم المعادلات الرياضية الدقيقة لتحديد الـ Subnet Mask المناسب.",
        mistakes: "استخدام /24 لكل الأقسام مما يضيع مئات العناوين في الفراغ. واستخدام /24 للراوترات بدلاً من /30.",
        quiz: [
            { q: "ما هو الـ Subnet Mask الأفضل هندسياً لربط راوترين (Point-to-Point) دون هدر عناوين؟", options: ["/24", "/28", "/30", "/32"], answer: 2 },
            { q: "إذا احتجنا شبكة تتسع لـ 60 جهازاً، فما هو الـ Prefix length المناسب؟", options: ["/24", "/25", "/26", "/27"], answer: 2 },
            { q: "في معادلة الأجهزة (2^h - 2)، لماذا نطرح 2؟", options: ["لحجز عنوان للراوتر وعنوان للسويتش", "لأننا لا نستخدم عنوان الشبكة (Network IP) وعنوان البث (Broadcast IP)", "لتوفير مساحة أمنية", "هذا خطأ مطبعي في المعايير"], answer: 1 }
        ]
    },
    "lesson2_3": {
        summary: "الـ TCP بروتوكول موثوق يبدأ بـ 3-Way Handshake ويراقب التدفق. الـ UDP سريع ومباشر ولا يضمن الوصول (مثالي للمكالمات والألعاب).",
        mistakes: "استخدام TCP للألعاب أو مكالمات الفيديو (الـ TCP سيؤدي لتأخير وتقطيع شديد في حال ضياع بيانات).",
        quiz: [
            { q: "أي من البروتوكولات التالية يقوم بعمل المصافحة الثلاثية (3-Way Handshake)؟", options: ["TCP", "UDP", "IP", "ICMP"], answer: 0 },
            { q: "ما هي التقنية التي يستخدمها TCP للتحكم بسرعة تدفق البيانات (Flow Control)؟", options: ["Routing", "Sliding Window", "Subnetting", "TTL"], answer: 1 },
            { q: "إذا كنت تصمم تطبيقاً للبث المباشر (Live Video Streaming)، أي بروتوكول ستختار؟", options: ["TCP لأنه آمن", "UDP لأن السرعة وتجنب التأخير أهم من ضياع بعض الفريمات", "HTTP", "FTP"], answer: 1 }
        ]
    },
    "lesson2_4": {
        summary: "الـ DHCP يوزع عناوين IP أوتوماتيكياً عبر عملية DORA. والـ DNS يترجم الأسماء المفهومة مثل google.com إلى عناوين IP ليتمكن الراوتر من توجيهها.",
        mistakes: "الخلط بين سجلات الـ DNS (سجل A للـ IPv4 بينما AAAA للـ IPv6).",
        quiz: [
            { q: "ماذا يمثل حرف الـ O في عملية الـ DORA الخاصة ببروتوكول DHCP؟", options: ["Options", "Offer", "Overload", "Origin"], answer: 1 },
            { q: "أي نوع من سجلات الـ DNS يستخدم لربط اسم النطاق بعنوان IPv6؟", options: ["A Record", "AAAA Record", "MX Record", "CNAME Record"], answer: 1 },
            { q: "ما هي رسالة الـ DHCP التي يرسلها جهاز الكمبيوتر بصيغة Broadcast للبحث عن السيرفر في البداية؟", options: ["Request", "Acknowledge", "Offer", "Discover"], answer: 3 }
        ]
    }
};
