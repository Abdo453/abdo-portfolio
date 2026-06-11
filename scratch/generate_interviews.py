import json

interviews_data = [
    {
        "category": "Layer 2 & Switching (السويتشات والطبقة الثانية)",
        "questions": [
            {
                "q": "ما هو الفرق بين הـ Hub والـ Switch؟ وكيف يتخذ الـ Switch قرار توجيه הـ Frame؟",
                "hint": "تذكر كيف يتعامل כל منهما مع رسائل הـ Broadcast وإلى أي طبقة ينتمي כל منهما في הـ OSI Model.",
                "ans": "<ul><li><strong>الـ Hub (Layer 1):</strong> جهاز غبي يقوم بنسخ أي إشارة كهربائية تصله من بورت ويرسلها לجميع البورتات الأخرى (Flooding). يسبب تصادمات (Collisions) ويستخدم نطاق بث واحد.</li><li><strong>الـ Switch (Layer 2):</strong> جهاز ذكي، يبني جدولاً يسمى (MAC Address Table). عندما تصله رسالة، ينظر لعنوان الـ Destination MAC، ثم يرسل الرسالة فقط للمنفذ المتصل به هذا الجهاز.</li></ul>"
            },
            {
                "q": "كيف تحل مشكلة جهازين في VLAN 10 و VLAN 20 لا يستطيعان التواصل مع بعضهما البعض؟",
                "hint": "الـ VLANs تقسم السويتش لشبكات وهمية منفصلة في الطبقة الثانية. ماذا تحتاج لتمرير البيانات بين شبكتين مختلفتين؟",
                "ans": "<p><strong>الحل (Inter-VLAN Routing):</strong> نحتاج لجهاز من الطبقة الثالثة (Layer 3).</p><ol><li><strong>Router-on-a-Stick:</strong> استخدام راوتر وتوصيله بـ Trunk Port من السويتش، ثم إنشاء Sub-interfaces على الراوتر لكل VLAN مع تغليف `encapsulation dot1Q`.</li><li><strong>Layer 3 Switch (SVI):</strong> تفعيل `ip routing` داخل السويتش (إن كان يدعم)، ثم إنشاء `interface vlan 10` وإعطائه IP ليعمل כـ Gateway.</li></ol>"
            },
            {
                "q": "ما هي وظيفة بروتوكول Spanning Tree (STP)؟ وماذا سيحدث إن قمنا بإلغائه؟",
                "hint": "تخيل أنك قمت بتوصيل سويتشين بكابلين في نفس الوقت بدلاً من كابل واحد.",
                "ans": "<p>وظيفته الأساسية هي <strong>منع حلقات التكرار (Loop Prevention)</strong> في الطبقة الثانية. لو قمنا بتوصيل كابلين بين سويتشين بدون STP، ستحدث عاصفة من الـ Broadcast (Broadcast Storm) مما يؤدي إلى انهيار الشبكة بالكامل وتوقف السويتشات عن العمل.</p><p>الـ STP يكتشف هذه المسارات الزائدة، ويقوم بإغلاق منفذ واحد منطقياً (Blocking) مع إبقائه احتياطياً.</p>"
            },
            {
                "q": "ما هو הـ DTP (Dynamic Trunking Protocol) ولماذا يُنصح دائماً بإغلاقه لأسباب أمنية؟",
                "hint": "تذكر הـ VLAN Hopping Attack وكيف يتم استغلال הـ Negotiation.",
                "ans": "<p>الـ DTP هو بروتوكول من سيسكو يتفاوض تلقائياً لتحويل البورت إلى Trunk أو Access. <strong>أمنياً:</strong> يُنصح بتعطيله بكتابة `switchport nonegotiate` وتحديد نوع البورت يدوياً `switchport mode access`، لأن الهاكر قد يرسل رسائل DTP مزيفة ليجبر بورت السويتش على التحول إلى Trunk، مما يسمح له بالوصول لجميع الـ VLANs (هجوم VLAN Hopping).</p>"
            }
        ]
    },
    {
        "category": "Routing & OSPF (التوجيه والطبقة الثالثة)",
        "questions": [
            {
                "q": "راوتر سيسكو استلم Packet تريد الذهاب إلى הـ IP: 10.1.1.50. وفي جدول التوجيه (Routing Table) لديه مسارين: مسار OSPF لـ 10.1.1.0/24 ومسار Static لـ 10.0.0.0/8. أيهما سيختار الراوتر ولماذا؟",
                "hint": "فكر في قاعدة (Longest Prefix Match) مقابل قاعدة (Administrative Distance).",
                "ans": "<p>سيختار مسار הـ <strong>OSPF (10.1.1.0/24)</strong>. <strong>السبب:</strong> قاعدة (Longest Prefix Match) أو التطابق الأطول היא الحاكمة في الراوتر <strong>دائماً</strong>، وتتفوق على הـ AD. بما أن /24 أكثر تحديداً (Specific) من /8، فالراوتر سيختاره مباشرة دون النظر للـ Administrative Distance.</p>"
            },
            {
                "q": "ما هو الفرق بين الـ Default Route والـ Floating Static Route؟",
                "hint": "تذكر الـ Administrative Distance للـ Static Route وكيف يمكن التلاعب به.",
                "ans": "<ul><li><strong>Default Route:</strong> مسار يُكتب بصيغة `0.0.0.0 0.0.0.0` وهو (الملاذ الأخير). يخبر الراوتر: \"إذا لم تجد مساراً للوجهة في جدولك، ارمِ הـ Packet هنا (غالباً نحو الإنترنت)\".</li><li><strong>Floating Static Route:</strong> هو מסار ثابت (Static) نقوم برفع الـ AD الخاص به (مثلاً لـ 200) لكي يصبح (مساراً احتياطياً مخفياً). لن يظهر في הـ Routing Table إلا إذا سقط المسار الأساسي (مثل مسار الـ OSPF الذي يملك AD 110).</li></ul>"
            },
            {
                "q": "كيف يتم انتخاب الـ DR و BDR في شبكات OSPF؟ ولماذا نحتاجهم من الأساس؟",
                "hint": "فكر في شبكات הـ Multi-Access (مثل سويتش متصل به 5 راوترات) وكمية הـ LSAs المتبادلة.",
                "ans": "<p><strong>الاحتياج:</strong> في شبكات הـ Broadcast (כوجود سويتش يجمع الراوترات)، لو تبادل الجميع הـ LSAs بشكل عشوائي سيحدث اختناق للشبكة (O(n^2)). لذا ننتخب רئيس (DR) ليجمع הـ LSAs ويوزعها للجميع.</p><p><strong>الانتخاب:</strong> يتم اختيار الـ DR بناءً على:</p><ol><li>أعلى OSPF Priority (الافتراضي 1، إن غيرته لـ 0 فإنه لن يشارك في الانتخابات أبداً).</li><li>إذا تساوت الـ Priority، يفوز صاحب <strong>أعلى Router ID</strong> (أعلى Loopback IP، ثم أعلى Physical IP).</li></ol>"
            }
        ]
    },
    {
        "category": "IP Services & Security (الخدمات والأمن)",
        "questions": [
            {
                "q": "اشرح باختصار عملية DORA في بروتوكول DHCP، واذكر سبب استخدام أمر (ip helper-address).",
                "hint": "DORA هي اختصار لأربعة أنواع من الرسائل. وما علاقة הـ Broadcast בـ Router؟",
                "ans": "<p>العملية: <strong>Discover</strong> (הجهاز يصرخ للبحث عن سيرفر) -> <strong>Offer</strong> (السيرفر يعرض IP) -> <strong>Request</strong> (الجهاز يطلب اعتماده) -> <strong>ACK</strong> (السيرفر يؤكد الحجز).</p><p><strong>ip helper-address:</strong> رسالة الـ Discover هي Broadcast، والراوتر بطبيعته <strong>يمنع مرور הـ Broadcast</strong>. لذلك، إذا كان سيرفر الـ DHCP في شبكة أخرى، نضع هذا الأمر على واجهة الراوتر ليقوم بتحويل הـ Broadcast إلى Unicast ليعبر نحو السيرفر.</p>"
            },
            {
                "q": "ما هو الـ PAT (NAT Overload) وكيف يستطيع تمكين 1000 موظف من تصفح الإنترنت باستخدام Public IP واحد فقط؟",
                "hint": "أين يخزن الراوتر معلومات הـ Sessions؟",
                "ans": "<p>الـ PAT (Port Address Translation) يقوم بترجمة الآيبيهات الداخلية (Private) المتعددة إلى عنوان Public IP واحد.</p><p>الراوتر يستطيع التفريق بين جلسات الموظفين (Sessions) عبر <strong>أرقام المنافذ (Port Numbers)</strong>. الراوتر ينشئ جدولاً يربط فيه كل Private IP ברقم Port عشوائي فريد بجانب הـ Public IP، وعندما يعود الرد من الإنترنت، ينظر הراوتر لرقم البورت ويحوله للموظف الصحيح.</p>"
            },
            {
                "q": "في إعدادات Port Security، ماذا يعني الـ Violation Mode: Restrict؟",
                "hint": "قارنه مع Shutdown و Protect.",
                "ans": "<p>عندما يكتشف السويتش MAC Address غير مصرح به على المنفذ:</p><ul><li><strong>Shutdown (الافتراضي):</strong> يغلق المنفذ بالكامل (err-disabled).</li><li><strong>Protect:</strong> يرمي הـ Packets الخاصة بالهاكر في صمت، والمنفذ يظل يعمل للأجهزة السليمة (إن وُجدت عبر Hub).</li><li><strong>Restrict:</strong> يرمي הـ Packets الخاصة بالهاكر، <strong>لكنه يقوم أيضاً بإرسال رسالة تنبيه (Syslog/SNMP) للإدارة ويزيد عداد المخالفات.</strong></li></ul>"
            }
        ]
    },
    {
        "category": "Troubleshooting Scenarios (سيناريوهات إصلاح أعطال حقيقية)",
        "questions": [
            {
                "q": "سيناريو: جهاز موظف لديه IP (192.168.1.50) و Default Gateway (192.168.1.1). الموظف يستطيع عمل Ping لـ 8.8.8.8، ولكنه لا يستطيع فتح موقع (google.com) من المتصفح. ما هو السبب الأرجح؟",
                "hint": "بما أنه يصل לـ 8.8.8.8 فإن الـ Routing والـ NAT سليم. ما هو البروتوكول المسئول عن الأسماء؟",
                "ans": "<p>المشكلة تكمن في <strong>الـ DNS</strong>. الـ Ping لـ IP خارجي نجح، وهذا يثبت أن إعدادات הـ IP، والـ Gateway، والـ NAT، والتوجيه (Routing) جميعها <strong>سليمة 100%</strong>.</p><p>عدم قدرته على فتح `google.com` يعني أن المتصفح غير قادر على ترجمة الاسم إلى IP. الحل: التحقق من إعدادات سيرفر הـ DNS في الـ DHCP Pool أو في جهاز الموظف.</p>"
            },
            {
                "q": "سيناريو: قمت ببرمجة OSPF على راوترين (R1 و R2) موصلين ببعضهما، لكنهما فشلا في تكوين علاقة جيرة (Neighbor Adjacency). اذكر 3 أسباب محتملة.",
                "hint": "تذكر معايير تطابق הـ Hello Packets في הـ OSPF.",
                "ans": "<p>لنجاح علاقة الـ OSPF يجب أن تتطابق عدة عوامل في הـ Hello Packets، من أشهر أسباب الفشل:</p><ol><li>اختلاف הـ <strong>Subnet Mask</strong> (يجب أن يكونا في نفس الشبكة / نفس الـ Mask).</li><li>اختلاف أرقام الـ <strong>Hello/Dead Timers</strong>.</li><li>اختلاف منطقة الـ <strong>Area ID</strong>.</li><li>تطابق أو تعارض الـ <strong>Router ID</strong> (يجب أن يكون فريداً لكل راوتر).</li><li>عدم توافق المصادقة (Authentication).</li></ol>"
            }
        ]
    }
]

js_content = f"const interviewsData = {json.dumps(interviews_data, ensure_ascii=False, indent=4)};\n"

with open(r'D:\\abdo_portfolio\\build\\ccna\\interviews.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("interviews.js generated successfully!")
