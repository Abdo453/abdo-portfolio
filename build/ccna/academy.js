const academyData = [
    {
        chapter: "المرحلة الأولى: أساسيات الشبكات",
        lessons: [
            {
                id: "lesson1",
                title: "1. ما هي الشبكة ومكوناتها؟ (تعمق كامل)",
                content: `
                    <h1>مفهوم الشبكات المعمّق (Network Deep Dive)</h1>
                    <p>الشبكة ليست مجرد سلك يربط جهازين، بل هي بنية تحتية معقدة صُممت لضمان نقل البيانات بأمان وسرعة وموثوقية.</p>
                    
                    <div class="concept-box">
                        <h3>1. المكونات الأساسية لأي شبكة (Network Components)</h3>
                        <p>أي شبكة في العالم (سواء شبكة منزلك أو شبكة Google) تتكون من 3 عناصر رئيسية:</p>
                        <ul>
                            <li><strong>الأجهزة الطرفية (End Devices):</strong> هي الأجهزة التي يتعامل معها المستخدم النهائي، وهي التي تُرسل أو تستقبل البيانات. (أمثلة: الكمبيوتر، الهواتف الذكية، الطابعات، الخوادم / Servers، كاميرات المراقبة IP).</li>
                            <li><strong>الأجهزة الوسيطة (Intermediary Devices):</strong> هي أجهزة البنية التحتية التي تربط الأجهزة الطرفية ببعضها وتوجه البيانات في المسار الصحيح. (أمثلة: المحول / Switch، الموجه / Router، جدار الحماية / Firewall، أجهزة البث اللاسلكي / Access Points).</li>
                            <li><strong>وسائط النقل (Network Media):</strong> هي القنوات التي تسافر عبرها البيانات، سواء كانت مادية أو هوائية. (أمثلة: الكابلات النحاسية UTP، كابلات الألياف الضوئية Fiber Optics، أمواج الراديو اللاسلكية / Wireless Frequencies).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">2. الخصائص والمعايير السبعة لتقييم الشبكة (Network Characteristics)</h3>
                        <p>في هندسة الشبكات، لا نهتم فقط بأن الجهازين متصلان، بل نهتم بجودة الاتصال عبر 7 معايير رئيسية:</p>
                        <ol>
                            <li><strong>الطوبولوجيا (Topology):</strong> كيف يتم ترتيب الأجهزة ماديًا (Physical) ومنطقيًا (Logical).</li>
                            <li><strong>السرعة (Speed):</strong> معدل نقل البيانات ويُقاس عادة بالبت في الثانية (bps).</li>
                            <li><strong>التكلفة (Cost):</strong> الميزانية المطلوبة لإنشاء وصيانة الشبكة (الألياف الضوئية أغلى من النحاس).</li>
                            <li><strong>الأمان (Security):</strong> حماية البيانات من السرقة أو التعديل أثناء النقل.</li>
                            <li><strong>التواجدية (Availability):</strong> مدى احتمالية أن تكون الشبكة تعمل عندما تحتاجها. (نستهدف دائماً 99.999% وهو ما يُسمى بالخمس تسعات).</li>
                            <li><strong>القابلية للتوسع (Scalability):</strong> مدى سهولة إضافة أجهزة أو فروع جديدة للشبكة دون إبطائها أو تغيير تصميمها.</li>
                            <li><strong>الموثوقية (Reliability):</strong> قدرة الشبكة على إصلاح نفسها تلقائياً في حالة تعطل أحد المسارات (Redundancy).</li>
                        </ol>
                    </div>

                    <h2>3. أنواع الشبكات (تعمق جغرافي)</h2>
                    
                    <h3>1. شبكة المنطقة المحلية (LAN - Local Area Network)</h3>
                    <ul>
                        <li><strong>نطاقها:</strong> تغطي مساحة جغرافية صغيرة جداً (غرفة، مكتب، مبنى واحد).</li>
                        <li><strong>ملكيتها:</strong> عادة ما تكون مملوكة ومُدارة بالكامل من قبل شخص واحد أو قسم IT داخل الشركة.</li>
                        <li><strong>السرعة:</strong> عالية جداً (من 100 Mbps إلى 10 Gbps وأكثر) لأن الكابلات قصيرة.</li>
                        <li><strong>التقنية الأشهر:</strong> تعتمد بنسبة 99% على معيار <code>Ethernet</code> (IEEE 802.3).</li>
                    </ul>

                    <h3>2. شبكة المنطقة الواسعة (WAN - Wide Area Network)</h3>
                    <ul>
                        <li><strong>نطاقها:</strong> تربط بين شبكات LAN متباعدة جغرافياً (بين مدن أو قارات).</li>
                        <li><strong>ملكيتها:</strong> لا تمتلك الشركة كابلات الـ WAN، بل تستأجرها من مزودي خدمة الاتصالات (ISPs) مثل Vodafone أو STC.</li>
                        <li><strong>السرعة:</strong> غالباً تكون أبطأ من الـ LAN وأكثر تكلفة بكثير.</li>
                        <li><strong>التقنية الأشهر:</strong> تعتمد على تقنيات مثل MPLS و Leased Lines و مؤخراً SD-WAN.</li>
                    </ul>

                    <h3>3. شبكة المنطقة اللاسلكية (WLAN - Wireless LAN)</h3>
                    <ul>
                        <li>هي نسخة لاسلكية من الـ LAN، تتيح للأجهزة الاتصال بالشبكة المحلية باستخدام موجات الراديو بدلاً من الكابلات النحاسية.</li>
                        <li><strong>التقنية الأشهر:</strong> معيار <code>Wi-Fi</code> (IEEE 802.11).</li>
                    </ul>

                    <h3>4. شبكة منطقة التخزين (SAN - Storage Area Network)</h3>
                    <ul>
                        <li>شبكة مخصصة وعالية السرعة جداً.</li>
                        <li><strong>وظيفتها:</strong> لا تستخدم لتصفح الإنترنت للموظفين، بل تستخدم لربط <em>الخوادم (Servers)</em> بأجهزة تخزين عملاقة (Storage Arrays) لتبادل البيانات دون إرهاق شبكة الـ LAN العادية.</li>
                        <li><strong>التقنية الأشهر:</strong> Fiber Channel و iSCSI.</li>
                    </ul>

                    <h3>5. شبكة المنطقة الشخصية (PAN) و شبكة المنطقة المدنية (MAN)</h3>
                    <ul>
                        <li><strong>PAN:</strong> شبكة صغيرة جداً حول شخص واحد (مسافة أمتار قليلة). مثال: ربط سماعة البلوتوث بالهاتف، أو ساعة أبل بالآيفون.</li>
                        <li><strong>MAN:</strong> شبكة تغطي مدينة كاملة (أكبر من LAN وأصغر من WAN). مثال: ربط فروع بنك داخل نفس المدينة بكابلات ألياف ضوئية.</li>
                    </ul>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">4. مصطلحات الوصول للمعلومات (Intranet vs Extranet vs Internet)</h3>
                        <ul>
                            <li><strong>الإنترانت (Intranet):</strong> شبكة الشركة <em>الداخلية المغلقة</em>. لا يمكن الدخول إليها إلا للموظفين فقط. (مثال: نظام الإجازات الداخلي للشركة).</li>
                            <li><strong>الإكسترانت (Extranet):</strong> هي إنترانت للشركة، ولكننا فتحنا باباً صغيراً آمناً للموردين أو الشركاء الخارجيين للدخول لجزء محدد من بياناتنا (مثال: نظام يتيح للموردين رؤية مخزون الشركة لإرسال بضاعة جديدة).</li>
                            <li><strong>الإنترنت (Internet):</strong> شبكة الشبكات العالمية، متاحة للجمهور (Public)، وتتكون من ملايين الـ LANs والـ WANs المرتبطة ببعضها البعض.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson1_5",
                title: "1.5. نموذج OSI (The OSI Model)",
                content: `
                    <h1>النموذج المرجعي (OSI Model)</h1>
                    <p>نموذج OSI هو <strong>نموذج مرجعي نظري</strong> طورته منظمة ISO عام 1984 لوصف كيفية اتصال الأجهزة المختلفة ببعضها عبر الشبكة.</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">الطبقات السبعة (من فوق لتحت)</h3>
                        <ol>
                            <li><strong style="color:var(--accent);">Application (التطبيقات):</strong> البرامج والمتصفحات (HTTP, DNS).</li>
                            <li><strong>Presentation (التقديم):</strong> تشفير البيانات وضغطها وتحديد صيغتها (JPEG, SSL).</li>
                            <li><strong>Session (الجلسة):</strong> فتح وإدارة وإغلاق الاتصال بين الجهازين.</li>
                            <li><strong style="color:var(--success);">Transport (النقل):</strong> تقطيع البيانات ونقلها عبر TCP (موثوق) أو UDP (سريع). وتعتمد على منافذ الـ Ports.</li>
                            <li><strong style="color:var(--danger);">Network (الشبكة):</strong> تحديد المسار (Routing) بناءً على عناوين الـ IP. (هنا يعمل الراوتر).</li>
                            <li><strong>Data Link (ربط البيانات):</strong> نقل البيانات محلياً بناءً على الـ MAC Address. (هنا يعمل السويتش).</li>
                            <li><strong>Physical (الفيزيائية):</strong> تحويل البيانات إلى إشارات كهربائية أو ضوئية تسير في الكابلات.</li>
                        </ol>
                    </div>

                    <h2>تفصيل الطبقات والمقارنة مع TCP/IP</h2>
                    <table style="width:100%; border-collapse: collapse; margin-top: 15px; text-align: right;">
                        <tr style="background: rgba(88,166,255,0.1); border-bottom: 1px solid var(--border);">
                            <th style="padding: 10px;">طبقة OSI</th>
                            <th style="padding: 10px;">طبقة TCP/IP المقابلة</th>
                            <th style="padding: 10px;">الوظيفة</th>
                            <th style="padding: 10px;">الأجهزة/البروتوكولات</th>
                            <th style="padding: 10px;">وحدة البيانات (PDU)</th>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">7. Application<br>6. Presentation<br>5. Session</td>
                            <td style="padding: 10px; color: var(--accent);">Application</td>
                            <td style="padding: 10px;">واجهة التطبيقات، التشفير، إدارة الجلسات</td>
                            <td style="padding: 10px;">HTTP, DNS, FTP, SSL, NetBIOS</td>
                            <td style="padding: 10px;">Data</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">4. Transport</td>
                            <td style="padding: 10px; color: var(--success);">Transport</td>
                            <td style="padding: 10px;">النقل الموثوق والتحكم في التدفق</td>
                            <td style="padding: 10px;">TCP, UDP</td>
                            <td style="padding: 10px;">Segment / Datagram</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">3. Network</td>
                            <td style="padding: 10px; color: #ffb020;">Internet</td>
                            <td style="padding: 10px;">التوجيه والعناوين المنطقية</td>
                            <td style="padding: 10px;">Router, IP, ICMP, OSPF</td>
                            <td style="padding: 10px;">Packet</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">2. Data Link<br>1. Physical</td>
                            <td style="padding: 10px; color: var(--danger);">Network Access</td>
                            <td style="padding: 10px;">الوصول للوسط ونقل الإشارات</td>
                            <td style="padding: 10px;">Switch, Hub, Cables, MAC, Ethernet</td>
                            <td style="padding: 10px;">Frame / Bits</td>
                        </tr>
                    </table>

                    <h2>عملية التغليف (Encapsulation)</h2>
                    <pre style="background: #0d1117; padding: 15px; border-radius: 8px; border: 1px solid var(--border); overflow-x: auto; color: #58a6ff;">
Data → Segment → Packet → Frame → Bits
(7)    (4)       (3)      (2)     (1)
                    </pre>

                    <p><em>نصيحة للحفظ (من أعلى لأسفل):</em> <strong>A</strong>ll <strong>P</strong>eople <strong>S</strong>eem <strong>T</strong>o <strong>N</strong>eed <strong>D</strong>ata <strong>P</strong>rocessing</p>
                `
            },
            {
                id: "lesson1_6",
                title: "1.6. نموذج TCP/IP بالتفصيل",
                content: `
                    <h1>نموذج TCP/IP (The TCP/IP Model)</h1>
                    <p>نموذج TCP/IP (ويعرف أحياناً بنموذج وزارة الدفاع الأمريكية DoD) هو النموذج <strong>العملي والفعلي</strong> المستخدم في شبكة الإنترنت اليوم. تم تطويره في السبعينيات ليكون أكثر بساطة ومرونة من نموذج OSI.</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">طبقات نموذج TCP/IP (4 طبقات)</h3>
                        <ol>
                            <li><strong>Application (التطبيقات):</strong> تدمج طبقات (Application, Presentation, Session) من نموذج OSI. تتعامل مع بروتوكولات مستوى المستخدم مثل HTTP, DNS, FTP, SMTP.</li>
                            <li><strong>Transport (النقل):</strong> نفس طبقة النقل في OSI. توفر اتصالاً من طرف إلى طرف باستخدام TCP (موثوق) أو UDP (غير موثوق سريع).</li>
                            <li><strong>Internet (الإنترنت):</strong> تعادل طبقة Network في OSI. وظيفتها الأساسية التوجيه (Routing) وتحديد عناوين الـ IP.</li>
                            <li><strong>Network Access (الوصول للشبكة):</strong> تدمج طبقتي (Data Link, Physical) من OSI. تتعامل مع العتاد الفيزيائي، الكابلات، وعناوين الماك (MAC Addresses).</li>
                        </ol>
                    </div>

                    <h2>المقارنة المباشرة: OSI مقابل TCP/IP</h2>
                    <table style="width:100%; border-collapse: collapse; margin-top: 15px; text-align: right;">
                        <tr style="background: rgba(88,166,255,0.1); border-bottom: 1px solid var(--border);">
                            <th style="padding: 10px; width: 40%;">نموذج OSI (النظري)</th>
                            <th style="padding: 10px; width: 40%;">نموذج TCP/IP (العملي)</th>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">7. Application<br>6. Presentation<br>5. Session</td>
                            <td style="padding: 10px; font-weight: bold; color: var(--accent);">4. Application</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">4. Transport</td>
                            <td style="padding: 10px; font-weight: bold; color: var(--success);">3. Transport</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px;">3. Network</td>
                            <td style="padding: 10px; font-weight: bold; color: #ffb020;">2. Internet</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">2. Data Link<br>1. Physical</td>
                            <td style="padding: 10px; font-weight: bold; color: var(--danger);">1. Network Access (أو Link)</td>
                        </tr>
                    </table>

                    <div class="concept-box" style="margin-top: 20px;">
                        <h3>لماذا انتصر TCP/IP على OSI؟</h3>
                        <ul>
                            <li><strong>البساطة:</strong> 4 طبقات أسهل في البرمجة والتطبيق من 7 طبقات.</li>
                            <li><strong>مجاني ومفتوح:</strong> تم تطويره بتمويل حكومي (ARPANET) وكان متاحاً للجامعات مجاناً، بينما OSI كان يتبع منظمة ISO وتطلب شراء مستندات المعايير.</li>
                            <li><strong>البروتوكولات أولاً:</strong> في TCP/IP تم برمجة البروتوكولات (مثل IP و TCP) أولاً ثم وُضع النموذج لوصفها، بينما OSI وضع النموذج النظري أولاً ثم حاول صنع بروتوكولات تناسبه (والتي كانت معقدة جداً).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson2",
                title: "2. أجهزة الشبكة الأساسية (المعمارية الداخلية)",
                content: `
                    <h1>تشريح أجهزة الشبكات (Anatomy of Network Devices)</h1>
                    <p>المهندس المحترف لا ينظر للراوتر والسويتش كـ "صناديق سوداء"، بل يفهم كيف تعمل من الداخل. كل جهاز شبكي (مثل الراوتر أو السويتش المتقدم) يمتلك معمارية تشبه الكمبيوتر تماماً:</p>
                    
                    <div class="concept-box">
                        <h3>المكونات الداخلية (الذاكرة والمعالجة)</h3>
                        <ul>
                            <li><strong>CPU (وحدة المعالجة المركزية):</strong> تعالج الأوامر وتقوم بعمليات حساب التوجيه (Routing Algorithms).</li>
                            <li><strong>RAM (الذاكرة العشوائية):</strong> تخزن جدول الـ MAC وجدول الـ Routing أثناء عمل الجهاز. <em>(تُمحى بمجرد انقطاع الكهرباء)</em>.</li>
                            <li><strong>NVRAM (الذاكرة غير المتطايرة):</strong> تخزن ملف الإعدادات المحفوظ (Startup-Config). <em>(لا تُمحى بانقطاع الكهرباء)</em>.</li>
                            <li><strong>Flash:</strong> ذاكرة تخزين أشبه بالهارد ديسك، تحتوي على نظام تشغيل الجهاز (Cisco IOS).</li>
                        </ul>
                    </div>

                    <h2>أجهزة الطبقة الأولى (Layer 1 Devices)</h2>
                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">الموزع (Hub) - "الكارثة الأمنية"</h3>
                        <p>يعمل في الطبقة الفيزيائية. وظيفته الوحيدة استقبال الإشارة الكهربائية وتقويتها وإرسالها لجميع المنافذ الأخرى (Flooding). <strong>عيوبه القاتلة:</strong></p>
                        <ul>
                            <li><strong>Half-Duplex:</strong> لا يمكن الإرسال والاستقبال في نفس الوقت.</li>
                            <li><strong>Collision Domain واحد:</strong> احتمالية تصادم البيانات عالية جداً، مما يجعله يعتمد على بروتوكول CSMA/CD لانتظار هدوء الشبكة.</li>
                            <li><strong>انعدام الأمان:</strong> أي برامج تنصت (مثل Wireshark) على أي جهاز ستلتقط بيانات جميع الأجهزة الأخرى.</li>
                        </ul>
                    </div>

                    <h2>أجهزة الطبقة الثانية (Layer 2 Devices)</h2>
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">المحول (Switch) - "السرعة والذكاء"</h3>
                        <p>يعمل في طبقة Data Link. لا ينظر للإشارات الكهربائية فحسب، بل يقرأ عناوين الـ MAC Address.</p>
                        <ul>
                            <li>يحتفظ بجدول يسمى <strong>MAC Address Table (أو CAM Table)</strong> لربط كل MAC بالبورت المتصل به.</li>
                            <li>يعتمد في سرعته الخارقة على شريحة مادية تُسمى <strong>ASIC (Application-Specific Integrated Circuit)</strong>، مما يجعل معالجة البيانات تحدث على مستوى الـ Hardware وليس الـ Software.</li>
                            <li><strong>Full-Duplex:</strong> إرسال واستقبال في نفس الوقت. كل بورت يمثل Collision Domain مستقل (لا يوجد تصادم).</li>
                        </ul>
                    </div>

                    <h2>أجهزة الطبقة الثالثة (Layer 3 Devices)</h2>
                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">الموجه (Router) - "بوابة عبور الشبكات"</h3>
                        <p>يعمل في طبقة Network. لا يفهم الـ MAC، بل يقرأ عناوين الـ IP.</p>
                        <ul>
                            <li>يفصل بين شبكات الـ Broadcast Domains (السويتش لا يمنع رسائل البث، الراوتر يمنعها).</li>
                            <li>يحتفظ بجدول التوجيه <strong>(Routing Table)</strong> لمعرفة أفضل مسار للشبكات البعيدة.</li>
                            <li>يستخدم شريحة <strong>TCAM (Ternary Content-Addressable Memory)</strong> للبحث السريع جداً في جداول التوجيه وقوائم الحظر (ACLs) في جزء من المليون من الثانية.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson3",
                title: "3. هندسة الطوبولوجيا (Topologies & Architecture)",
                content: `
                    <h1>التصميم الهندسي للشبكات (Network Architecture)</h1>
                    <p>الطوبولوجيا (Topology) هي المخطط الهندسي لكيفية ربط الأجهزة. الفهم الخاطئ لها قد يكلف الشركة ملايين الدولارات عند تعطل الشبكة.</p>

                    <h2>1. طوبولوجيا الـ LAN</h2>
                    <ul>
                        <li><strong>Star (النجمة):</strong> جميع الأجهزة متصلة بسويتش مركزي. (هي المعيار الحالي في كل شبكات العالم). ميزتها سهولة التوسع، وعيبها الـ Single Point of Failure (لو تعطل السويتش توقفت الشبكة).</li>
                        <li><strong>Extended Star (النجمة الممتدة):</strong> ربط عدة سويتشات مع بعضها لتوسيع الشبكة عبر أدوار مبنى كامل.</li>
                    </ul>

                    <h2>2. طوبولوجيا الـ WAN (التوصيل بين الفروع)</h2>
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">Hub and Spoke vs Mesh</h3>
                        <ul>
                            <li><strong>Hub and Spoke:</strong> فرع رئيسي (Hub) يتصل به كل الفروع الفرعية (Spokes). تكلفتها منخفضة، لكن لو فرع أراد التحدث لفرع آخر، يجب أن يمر بالمركز أولاً!</li>
                            <li><strong>Full Mesh:</strong> كل فرع يتصل مباشرة <em>بكل</em> الفروع الأخرى. (أعلى موثوقية 100% Redundancy، وأغلى تكلفة على الإطلاق). معادلة عدد الكابلات = <code>n(n-1)/2</code>.</li>
                            <li><strong>Partial Mesh:</strong> حل وسط، الفروع المهمة تتصل ببعضها مباشرة، والفروع الصغيرة تتصل بالمركز.</li>
                        </ul>
                    </div>

                    <h2>3. طوبولوجيا مراكز البيانات الحديثة (Data Centers)</h2>
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">Spine-Leaf Architecture</h3>
                        <p>تصميم حديث جداً استبدل تصميم سيسكو القديم (3-Tier). يستخدم في مراكز بيانات Google و AWS لضمان أقصى سرعة بين السيرفرات (East-West Traffic).</p>
                        <ul>
                            <li><strong>Spine Switches:</strong> سويتشات العمود الفقري العملاقة.</li>
                            <li><strong>Leaf Switches:</strong> السويتشات التي تتصل بها السيرفرات. كل Leaf يتصل <em>بكل</em> الـ Spines، مما يضمن أن المسافة بين أي سيرفر وآخر هي "قفزة واحدة" فقط (One Hop).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson4",
                title: "4. الكابلات والألياف وسرعة نقل البيانات",
                content: `
                    <h1>شرايين الشبكة (Network Media & Cabling)</h1>
                    <p>اختيار الكابل الخاطئ يقتل أداء أسرع راوتر في العالم. دعونا نتعمق في الطبقة الفيزيائية.</p>
                    
                    <div class="concept-box">
                        <h3>1. الكابلات المجدولة النحاسية (UTP)</h3>
                        <p>تُسمى Unshielded Twisted Pair. يتم لف كل سلكين حول بعضهما لإلغاء التشويش الكهرومغناطيسي المتبادل (Crosstalk).</p>
                        <ul>
                            <li><strong>Cat5e:</strong> يدعم سرعة 1 Gbps (المعيار الأدنى حالياً).</li>
                            <li><strong>Cat6:</strong> يدعم سرعة 10 Gbps (لمسافة 55 متر فقط)، ويمتلك عازل بلاستيكي بالمنتصف لمنع التشويش.</li>
                            <li><strong>Cat6a:</strong> يدعم 10 Gbps (لمسافة 100 متر كاملة).</li>
                        </ul>
                        <p><em>ملاحظة هندسية:</em> نستخدم معيار <strong>T568B</strong> لترتيب الألوان داخل رأس الـ RJ-45 (برتقالي أبيض، برتقالي، أخضر أبيض، أزرق، أزرق أبيض، أخضر، بني أبيض، بني).</p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">2. الألياف الضوئية (Fiber Optics)</h3>
                        <p>تنقل الضوء (Laser أو LED) بدلاً من الكهرباء، لذا فهي منيعة تماماً ضد التشويش الكهرومغناطيسي (EMI). وتنقسم إلى:</p>
                        <ul>
                            <li><strong>SMF (Single-Mode Fiber):</strong> قلب زجاجي رفيع جداً (9 مايكرون). ينقل شعاع ليزر <em>واحد</em>. يستخدم للمسافات الشاسعة (بين المدن والمحيطات) ويصل لـ 100 كيلومتر وأكثر. مكلف جداً.</li>
                            <li><strong>MMF (Multi-Mode Fiber):</strong> قلب أوسع (50 مايكرون). ينقل عدة أشعة ضوئية (LED) ترتد بالداخل. يستخدم لمسافات قصيرة (داخل المبنى المكون من عدة طوابق) لمسافة 500 متر تقريباً. أرخص من SMF.</li>
                        </ul>
                        <p><strong>أشهر واصلاتها (Connectors):</strong> LC (حديث وصغير) و SC (مربع وأقدم).</p>
                    </div>

                    <h2>مصطلحات قياس كفاءة النقل (The Speed Myth)</h2>
                    <table style="width:100%; border-collapse: collapse; margin-top: 15px; text-align: right;">
                        <tr style="background: rgba(88,166,255,0.1); border-bottom: 1px solid var(--border);">
                            <th style="padding: 10px;">المصطلح</th>
                            <th style="padding: 10px;">المعنى الهندسي الحقيقي</th>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px; font-weight: bold; color: var(--accent);">Bandwidth (عرض النطاق)</td>
                            <td style="padding: 10px;">السعة <em>النظرية القصوى</em> للكابل في ظروف مثالية (مثال: 1000 Mbps).</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px; font-weight: bold; color: #ffb020;">Throughput (الإنتاجية)</td>
                            <td style="padding: 10px;">السرعة <em>الفعلية</em> لنقل البيانات (التي تشمل حجم البيانات + حجم الـ Headers الخاصة بالشبكة).</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; color: var(--success);">Goodput (الإنتاجية الصافية)</td>
                            <td style="padding: 10px;">سرعة نقل <em>ملفك الصافي فقط</em> (بعد خصم كل رسائل التحكم والـ Headers وإعادة الإرسال). وهي السرعة التي تراها أمامك عند تحميل فيلم!</td>
                        </tr>
                    </table>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثانية: بروتوكولات الشبكات",
        lessons: [
            {
                id: "lesson2_1",
                title: "1. بروتوكول الإنترنت وعناوينه (IPv4 & IPv6 Deep Dive)",
                content: `
                    <h1>تشريح بروتوكول الإنترنت (IP Protocol)</h1>
                    <p>بروتوكول الـ IP هو العمود الفقري لطبقة الـ Network. وظيفته هي العنونة (Addressing) وتحديد المسار (Routing). لكنه بروتوكول <strong>Best-Effort</strong> (يبذل قصارى جهده) ولا يضمن وصول البيانات (هذه وظيفة TCP).</p>

                    <div class="concept-box">
                        <h3>تشريح هيكل الـ IPv4 Header</h3>
                        <p>عندما تغلف البيانات بـ IP Packet، يضاف إليها Header حجمه 20 Byte يحتوي على حقول هندسية دقيقة:</p>
                        <ul>
                            <li><strong>Version:</strong> يحدد هل هو IPv4 أم IPv6 (قيمته هنا 4).</li>
                            <li><strong>TTL (Time to Live):</strong> حقل أمني بحجم 8-bit. قيمته تبدأ برقم (مثلاً 255) وتقل بمقدار 1 مع كل راوتر (Hop) يمر عليه. إذا وصل لـ 0، يُدمر الراوتر الحزمة ليمنع الـ Routing Loops (الدوران اللانهائي).</li>
                            <li><strong>Source & Destination IP:</strong> عناوين المصدر والوجهة (32-bit لكل منهما).</li>
                            <li><strong>Protocol:</strong> يحدد ما بداخل الـ IP (مثال: 6 تعني TCP، 17 تعني UDP، 1 تعني ICMP).</li>
                            <li><strong>Fragmentation (التقطيع):</strong> إذا كان حجم الحزمة أكبر من سعة الكابل (MTU 1500 Bytes)، يتم تقطيعها لأجزاء صغيرة وتُعطى أرقام تسلسلية لتتجمع في الوجهة.</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">الجيل القادم: IPv6 (المعمارية المتقدمة)</h3>
                        <p>صُمم لحل مشكلة نفاد عناوين IPv4. طوله 128-bit، أي أنه يوفر 340 <em>أندشيليون</em> عنوان (رقم مكون من 36 صفراً!).</p>
                        <ul>
                            <li><strong>كتابته:</strong> يُكتب بالنظام السداسي عشري (Hexadecimal). يمكن اختصار الأصفار المتتالية بعلامة <code>::</code> مرة واحدة فقط.</li>
                            <li><strong>لا يحتاج لـ DHCP (غالباً):</strong> بفضل خاصية <em>SLAAC</em> (Stateless Address Autoconfiguration)، يستطيع الجهاز توليد عنوان IPv6 لنفسه بناءً على الـ MAC Address الخاص به!</li>
                            <li><strong>لا يوجد Broadcast:</strong> تم إلغاء رسائل البث المزعجة واستبدالها بـ Multicast و Anycast.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson2_2",
                title: "2. هندسة الـ Subnetting و VLSM",
                content: `
                    <h1>تقطيع الشبكات المتقدم (Subnetting & VLSM)</h1>
                    <p>في الشركات الكبرى، لا نستخدم قناع الشبكة الافتراضي (Classful). بل نستخدم هندسة الـ <strong>VLSM (Variable Length Subnet Mask)</strong> لتقسيم الشبكة الرئيسية إلى شبكات فرعية <em>مختلفة الأحجام</em> لتجنب هدر عناوين الـ IP.</p>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">السر الرياضي: معادلات مهندس الشبكات</h3>
                        <ul>
                            <li><strong>لمعرفة عدد الشبكات الناتجة:</strong> نستخدم معادلة <code>2^s</code> (حيث s هي عدد البتات المستلفة من قسم الـ Host لصالح الـ Network).</li>
                            <li><strong>لمعرفة عدد الأجهزة في كل شبكة:</strong> نستخدم معادلة <code>(2^h) - 2</code> (حيث h هي عدد بتات الـ Host المتبقية). ونطرح 2 لأننا لا نستطيع استخدام عنوان الشبكة وعنوان البث.</li>
                        </ul>
                    </div>

                    <h2>مثال هندسي (VLSM): تصميم شبكة شركة</h2>
                    <p>لديك الشبكة <code>192.168.1.0 /24</code>، والشركة بها 3 أقسام: قسم (أ) يحتاج 60 جهاز، قسم (ب) يحتاج 25 جهاز، والراوترات تحتاج 2 جهاز فقط للربط بينها.</p>
                    
                    <ol>
                        <li><strong>قسم (أ) - 60 جهاز:</strong> نحتاج 6 بتات للـ Host لأن (2^6 - 2 = 62 جهاز). إذن الـ Mask سيكون <code>/26</code>. (الشبكة: 192.168.1.0/26).</li>
                        <li><strong>قسم (ب) - 25 جهاز:</strong> نحتاج 5 بتات لأن (2^5 - 2 = 30 جهاز). نأخذ الشبكة التالية ونعطيها Mask <code>/27</code>. (الشبكة: 192.168.1.64/27).</li>
                        <li><strong>ربط الراوترات (Point-to-Point):</strong> الراوترات تحتاج عنوانين فقط. نحتاج بتّين للـ Host (2^2 - 2 = 2). إذن الـ Mask الأفضل هو <code>/30</code> لعدم هدر العناوين! (الشبكة: 192.168.1.96/30).</li>
                    </ol>
                    <p><em>بهذه الهندسة (VLSM)، وفرنا عشرات العناوين التي كانت ستُهدر لو استخدمنا Subnet Mask واحداً للشركة كلها.</em></p>
                `
            },
            {
                id: "lesson2_3",
                title: "3. بروتوكولات النقل المتقدمة (TCP / UDP)",
                content: `
                    <h1>الغوص في طبقة النقل (Transport Layer)</h1>
                    <p>طبقة النقل هي المسؤولة عن تقسيم البيانات (Segmentation)، وتحديد التطبيق المستهدف عبر <strong>أرقام المنافذ (Ports)</strong>. تعمل هذه الطبقة ببروتوكولين رئيسيين:</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">1. TCP: الموثوقية المعمارية (Reliable & Connection-Oriented)</h3>
                        <p>بروتوكول TCP لا يرسل حرفاً واحداً قبل أن يتأكد أن الطرف الآخر مستعد. يتميز بالآتي:</p>
                        <ul>
                            <li><strong>المصافحة الثلاثية (3-Way Handshake):</strong>
                                <ol>
                                    <li>جهازك يرسل <code>SYN</code> (طلب تزامن/اتصال).</li>
                                    <li>السيرفر يرد بـ <code>SYN-ACK</code> (موافق ومستعد).</li>
                                    <li>جهازك يرد بـ <code>ACK</code> (تأكيد الاستلام وبدء نقل البيانات).</li>
                                </ol>
                            </li>
                            <li><strong>الأرقام التسلسلية (Sequence Numbers):</strong> يطبع TCP رقماً متسلسلاً على كل قطعة بيانات لتتجمع بنفس الترتيب في الوجهة حتى لو وصلت مقلوبة.</li>
                            <li><strong>النافذة المنزلقة (Sliding Window):</strong> آلية ذكية للتحكم بالتدفق (Flow Control). إذا كان السيرفر أسرع من جهازك، يقوم جهازك بتقليل "حجم النافذة" ليخبر السيرفر بإبطاء سرعة الإرسال حتى لا تضيع البيانات (Drop).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">2. UDP: السرعة المجردة (Fast & Connectionless)</h3>
                        <p>بروتوكول UDP لا يقوم بأي مصافحة، ولا يحتوي على أرقام تسلسلية، ولا نوافذ منزلقة، ولا يعيد إرسال البيانات الضائعة. حجم الـ Header الخاص به هو 8 Bytes فقط (مقابل 20 Bytes للـ TCP).</p>
                        <ul>
                            <li><strong>الهدف:</strong> أقصى سرعة ممكنة (Low Latency).</li>
                            <li><strong>الاستخدامات:</strong> الـ VoIP (مكالمات الصوت)، الـ IPTV، والألعاب (Gaming). تأخير الصوت أسوأ من ضياع كلمة واحدة!</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson2_4",
                title: "4. خدمات طبقة التطبيقات (DNS & DHCP)",
                content: `
                    <h1>خدمات البنية التحتية (Application Layer Services)</h1>
                    <p>في شبكات المؤسسات (Enterprise)، لا يمكن للمهندس الاستغناء عن فهم كيف تعمل هذه الخدمات خلف الكواليس.</p>

                    <div class="concept-box">
                        <h3>1. تشريح الـ DHCP (Dynamic Host Configuration Protocol)</h3>
                        <p>يعمل على البورتات 67 و 68 (UDP). عندما تقوم بتوصيل كابل الشبكة، يحصل جهازك على IP من السيرفر عبر عملية تسمى <strong>D.O.R.A</strong>:</p>
                        <ol>
                            <li><strong>Discover (اكتشاف):</strong> جهازك يرسل رسالة Broadcast للشبكة يصرخ فيها: "هل يوجد DHCP سيرفر هنا؟".</li>
                            <li><strong>Offer (عرض):</strong> السيرفر يرد برسالة Unicast يعرض فيها: "نعم أنا هنا، ما رأيك في الـ IP 192.168.1.50؟".</li>
                            <li><strong>Request (طلب):</strong> جهازك يرد بـ Broadcast ليخبر السيرفر والجميع: "أنا أوافق وأطلب حجز هذا الـ IP لي".</li>
                            <li><strong>Acknowledge (تأكيد):</strong> السيرفر يسجل الـ IP باسم الـ MAC Address الخاص بك، ويرسل لك رسالة التأكيد ومعها الـ Gateway والـ DNS.</li>
                        </ol>
                    </div>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">2. هندسة الـ DNS (Domain Name System)</h3>
                        <p>يعمل على بورت 53. هو دليل الهاتف للإنترنت (يترجم الأسماء المفهومة للبشر إلى أرقام IP يفهمها الراوتر). المهندس يجب أن يعرف أنواع السجلات (DNS Records):</p>
                        <ul>
                            <li><strong>A Record:</strong> يربط اسم الموقع (مثال abc.com) بـ IPv4.</li>
                            <li><strong>AAAA Record:</strong> يربط الاسم بـ IPv6.</li>
                            <li><strong>CNAME Record:</strong> يربط اسماً باسم آخر (Alias). (مثال: توجيه www.abc.com ليعمل نفس عمل abc.com).</li>
                            <li><strong>MX Record:</strong> يحدد سيرفر البريد الإلكتروني (Mail Server) الخاص بالشركة لكي تصل الإيميلات.</li>
                        </ul>
                        <p><em>ملاحظة:</em> الـ DNS يستخدم بروتوكول UDP في الترجمة العادية للسرعة، ويستخدم TCP عندما يقوم السيرفر بنقل قاعدة بياناته لسيرفر DNS احتياطي (Zone Transfer).</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثالثة: أجهزة Cisco (الطبقة الثانية)",
        lessons: [
            {
                id: "lesson3_1",
                title: "1. أساسيات أنظمة Cisco IOS",
                content: `
                    <h1>غرفة التحكم: Cisco IOS Architecture</h1>
                    <p>نظام تشغيل سيسكو (Internetwork Operating System) ليس كالويندوز، بل هو نظام يعتمد بالكامل على سطر الأوامر (CLI) ومصمم هندسياً للعمل بأقل استهلاك للذاكرة وبأقصى سرعة ممكنة.</p>

                    <div class="concept-box">
                        <h3>أوضاع التشغيل (CLI Modes)</h3>
                        <p>المهندس المحترف يعرف أين يكتب الأمر. النظام مقسم أمنياً إلى أوضاع:</p>
                        <ul>
                            <li><strong>User EXEC Mode (<code>></code>):</strong> وضع المشاهدة المحدود. لا يمكنك تغيير شيء، فقط أوامر بسيطة مثل <code>ping</code>.</li>
                            <li><strong>Privileged EXEC Mode (<code>#</code>):</strong> وضع المدير (يُدخل بكلمة مرور باستخدام أمر <code>enable</code>). هنا يمكنك رؤية كل الإعدادات (<code>show running-config</code>) وإعادة تشغيل الجهاز ونسخ الملفات، لكنك <em>لا تغير الإعدادات</em> هنا.</li>
                            <li><strong>Global Configuration Mode (<code>(config)#</code>):</strong> غرفة العمليات! أي أمر يُكتب هنا يُنفذ فوراً على الجهاز ككل (مثل تغيير اسم الجهاز <code>hostname</code>).</li>
                            <li><strong>Specific Config Modes:</strong> مثل الدخول لبرمجة بورت معين <code>(config-if)#</code> أو برمجة التوجيه <code>(config-router)#</code>.</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">كيف يتخذ الراوتر قراراته عند الإقلاع؟ (Boot Process)</h3>
                        <ol>
                            <li><strong>POST:</strong> فحص الهاردوير للتأكد من سلامة المعالج والذاكرة.</li>
                            <li><strong>Bootstrap:</strong> برنامج صغير يبحث عن نظام التشغيل (IOS) داخل ذاكرة الـ Flash.</li>
                            <li><strong>IOS Load:</strong> يتم فك ضغط نظام التشغيل ونقله إلى الـ RAM ليبدأ العمل.</li>
                            <li><strong>Startup-Config:</strong> يبحث الراوتر في ذاكرة الـ NVRAM عن ملف الإعدادات المحفوظ. إذا وجده، ينسخه للـ RAM (ويصبح اسمه Running-Config). إذا لم يجده، يدخل في وضع الإعداد الأولي المزعج (Setup Mode).</li>
                        </ol>
                    </div>
                `
            },
            {
                id: "lesson3_2",
                title: "2. هندسة الـ VLANs والـ Trunking (802.1Q)",
                content: `
                    <h1>عزل الشبكات برمجياً (Virtual LANs)</h1>
                    <p>المبدأ الهندسي الأول في الشبكات: <em>"قم بتقليص الـ Broadcast Domain قدر الإمكان"</em>. رسائل البث (Broadcast) تستهلك الـ CPU للأجهزة والـ Bandwidth للكابلات. الـ VLANs هي الحل المعماري لذلك.</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">كيف يعمل الـ Access Port؟</h3>
                        <p>الـ Access Port (الذي يتصل بالكمبيوتر) لا يفهم الـ VLANs أبداً! عندما يرسل الكمبيوتر إطاراً (Frame)، يستقبله السويتش، وينظر للبورت (مثلاً بورت 5 مبرمج كـ VLAN 10). داخلياً في ذاكرة السويتش (Backplane)، يُعامل هذا الإطار على أنه خاص بـ VLAN 10 ولا يرسله أبداً لأي بورت في VLAN 20.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">هندسة الـ Trunking وبروتوكول 802.1Q</h3>
                        <p>عند ربط سويتشين معاً، نحتاج بورت الـ Trunk ليمرر بيانات كل الـ VLANs. لكن كيف نفرق بينها في الكابل؟</p>
                        <ul>
                            <li>يستخدم المهندسون معيار IEEE <strong>802.1Q (Dot1q)</strong>.</li>
                            <li>يقوم هذا البروتوكول بكسر إطار الـ Ethernet (Frame) وحقن <strong>Tag (علامة)</strong> حجمها 4 Bytes داخله (تحديداً بعد الـ Source MAC وقبل الـ Type).</li>
                            <li>هذا الـ Tag يحتوي على حقل <code>VLAN ID</code> (12-bit)، مما يسمح بإنشاء 4096 شبكة VLAN!</li>
                        </ul>
                        <p><strong>الـ Native VLAN (الثغرة الأمنية):</strong> هي VLAN الوحيدة التي تمر عبر الـ Trunk <em>بدون وضع Tag عليها</em> (افتراضياً هي VLAN 1). لتأمين الشبكة، يجب تغيير الـ Native VLAN لرقم مهمل لا يُستخدم لمنع هجمات (VLAN Hopping).</p>
                    </div>
                `
            },
            {
                id: "lesson3_4",
                title: "3. خوارزميات الشجرة الممتدة (STP Deep Dive)",
                content: `
                    <h1>منع كوارث الـ Loops (Spanning Tree Protocol)</h1>
                    <p>في مراكز البيانات، نقوم بتوصيل السويتشات ببعضها بكابلات إضافية (Redundancy) لضمان عدم توقف الشبكة إذا قُطع كابل. لكن هذا يصنع <strong>Layer 2 Loop</strong> مميت، حيث تدور رسائل الـ Broadcast للما لا نهاية (لأنه لا يوجد حقل TTL في الطبقة الثانية مثل الطبقة الثالثة)، مما يؤدي إلى انهيار المعالجات (Broadcast Storm).</p>

                    <div class="concept-box">
                        <h3>كيف يعمل بروتوكول IEEE 802.1D (STP)؟</h3>
                        <p>يعمل كالسحر لإغلاق المنافذ الإضافية منطقياً (Blocking) وفتحها فقط عند الكوارث. الخوارزمية تعمل كالتالي:</p>
                        <ol>
                            <li><strong>انتخاب الملك (Root Bridge):</strong> تتحدث السويتشات مع بعضها برسائل تسمى (BPDU). السويتش صاحب <em>أقل Bridge ID</em> (وهو مزيج من رقم الأولوية Priority + الـ MAC Address) يصبح هو الملك للشبكة.</li>
                            <li><strong>تحديد أقصر طريق للملك (Root Ports):</strong> كل سويتش آخر غير الملك، يختار بورت <em>واحداً فقط</em> ليكون طريقه الأساسي للملك، بناءً على حساب سرعة الكابلات (Cost). بورتات الملك كلها تُسمى Designated Ports (تعمل دائماً).</li>
                            <li><strong>إعدام المسارات البديلة (Blocking Ports):</strong> أي كابلات أخرى تسبب Loop، يتم إغلاق البورتات الخاصة بها منطقياً، وتتوقف عن تمرير البيانات، لكنها تستمر في الاستماع. إذا انقطع الكابل الأساسي، يُفتح البورت المغلق أوتوماتيكياً.</li>
                        </ol>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">التطور المعماري (RSTP و PVST+)</h3>
                        <ul>
                            <li><strong>الـ STP القديم:</strong> يستغرق 50 ثانية لفتح مسار بديل! (هذا زمن كارثي في الشبكات الحديثة).</li>
                            <li><strong>RSTP (802.1w):</strong> النسخة السريعة (Rapid). تكتشف العطل وتفتح المسار البديل في أجزاء من الثانية.</li>
                            <li><strong>Per-VLAN STP (PVST+):</strong> ابتكار من سيسكو؛ لماذا نغلق الكابل الاحتياطي بالكامل ولا نستفيد من ثمنه؟ PVST+ يصنع شجرة مختلفة لكل VLAN. فيمكن أن نجعل الكابل (A) هو الأساسي لـ VLAN 10 ومغلق لـ VLAN 20، والكابل (B) العكس! وبذلك نستخدم كل الكابلات ونوازن الحمل (Load Balancing).</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الرابعة: التوجيه (Routing)",
        lessons: [
            {
                id: "lesson4_1",
                title: "1. علم التوجيه المعماري (Routing Tables)",
                content: `
                    <h1>تشريح اتخاذ القرار في الموجه (Router)</h1>
                    <p>الراوتر هو دماغ الشبكة. عندما تصله حزمة بيانات (Packet)، لا ينظر إلا إلى شيء واحد: <strong>Destination IP</strong> (الوجهة). ثم يبدأ بالبحث في ذاكرته العميقة (جدول التوجيه / Routing Table) عن أفضل مسار.</p>
                    
                    <div class="concept-box">
                        <h3>قاعدة التطابق الأطول (Longest Match Rule)</h3>
                        <p>هذا هو القانون الأعظم في الراوتر. إذا كان لدى الراوتر مساران لنفس الوجهة، فإنه يختار المسار الأكثر دقة (الذي يمتلك Subnet Mask أكبر).<br>
                        مثال: إذا كانت الوجهة للـ IP (10.1.1.5)، والراوتر لديه مسار لـ <code>10.0.0.0 /8</code> ومسار آخر لـ <code>10.1.1.0 /24</code>... فإنه سيختار <code>/24</code> لأنه محدد بدقة أكبر!</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">كيف تُبنى جداول التوجيه؟ (أنواع المسارات)</h3>
                        <ul>
                            <li><strong>المسارات المتصلة مباشرة (Connected - C):</strong> بمجرد أن تعطي IP لبورت في الراوتر وتشغله، يضيف الراوتر هذه الشبكة لجدوله فوراً برمز (C).</li>
                            <li><strong>التوجيه الثابت (Static - S):</strong> المهندس يكتب المسار بيده. يستهلك صفر معالجة (CPU) وهو الأكثر أماناً، لكنه يعمى إذا انقطع الكابل ولا يكتشف المسارات البديلة.</li>
                            <li><strong>المسار الافتراضي (Default Route - S*):</strong> شبكة الأمل الأخير <code>0.0.0.0 0.0.0.0</code>. تعني للراوتر: "إذا لم تجد وجهة هذا الـ IP في جدولك، لا تتخلص من البيانات، بل ارمِها في هذا الاتجاه". يُستخدم دائماً لتوجيه الترافيك نحو الإنترنت.</li>
                            <li><strong>التوجيه الديناميكي (Dynamic - O, D):</strong> الراوترات تتحدث مع بعضها وتتبادل الخرائط باستخدام بروتوكولات (مثل OSPF أو EIGRP) لتبني الجدول أوتوماتيكياً وتكتشف الكابلات المقطوعة.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson4_3",
                title: "2. التوجيه الديناميكي وخوارزميات (OSPF & EIGRP)",
                content: `
                    <h1>عقل الشبكات العملاقة (Dynamic Routing)</h1>
                    <p>في الشركات التي تمتلك 50 راوتراً، يستحيل كتابة المسارات يدوياً. هنا تتدخل بروتوكولات التوجيه الديناميكي لتعمل كمهندس آلي.</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">OSPF: خوارزمية الطريق الأقصر (Dijkstra)</h3>
                        <p>بروتوكول OSPF (Open Shortest Path First) هو ملك شبكات الـ Enterprise في العالم (يعمل على أجهزة سيسكو وجونيبر وهواوي).</p>
                        <ul>
                            <li><strong>المنطق (Link-State):</strong> كل راوتر يرسم خريطة كاملة لكل الراوترات المتصلة في الشبكة (Topological Map). إذا انقطع كابل في أقصى الشبكة، يعلم به الجميع فوراً.</li>
                            <li><strong>الحساب (Cost):</strong> يحسب المسار الأفضل بناءً على "التكلفة". التكلفة = (سرعة مرجعية / سرعة الكابل الحقيقية). الراوتر يفضل المسار الذي يمر عبر كابلات ألياف ضوئية سريعة (Cost قليل) حتى لو مر بـ 10 راوترات، ويرفض المسار الذي يمر براوتر واحد إذا كان الكابل نحاسياً بطيئاً!</li>
                            <li><strong>التقسيم (Areas):</strong> لتخفيف العبء عن الـ CPU للراوترات، يقسم OSPF الشبكة الكبيرة إلى مناطق (Areas). جميع المناطق يجب أن تتصل بالمركز (Area 0 أو الـ Backbone).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">EIGRP: الرياضيات المعقدة (DUAL Algorithm)</h3>
                        <p>بروتوكول خاص بأجهزة سيسكو (وهو هجين Advanced Distance Vector).</p>
                        <ul>
                            <li>يعتمد على خوارزمية (DUAL) لحساب أفضل طريق وأفضل طريق "احتياطي" في نفس اللحظة! (مما يجعله أسرع بروتوكول في العالم للتعافي من الانقطاعات، لأنه لا يضيع وقتاً في الحساب بل يستخدم الاحتياطي فوراً).</li>
                            <li>يحسب الطريق بمعادلة معقدة تعتمد أساساً على: <strong>Bandwidth</strong> (أبطأ نقطة في المسار) و <strong>Delay</strong> (التأخير التراكمي للكابلات).</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الخامسة: خدمات الشبكة (IP Services)",
        lessons: [
            {
                id: "lesson5_1",
                title: "1. تشريح الـ NAT الجراحي (Network Address Translation)",
                content: `
                    <h1>خداع العالم الخارجي (NAT & PAT)</h1>
                    <p>بسبب الكارثة الهندسية لانتهاء عناوين IPv4، تم اختراع الـ NAT كحل مؤقت (أصبح دائماً). الراوتر يقوم بعملية جراحية لكل حزمة بيانات (Packet) تمر من خلاله، حيث يمسح عنوانك الداخلي (Private) ويكتب عنوانه العام (Public) بدلاً منه.</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">جدول الترجمة الداخلي (NAT Table)</h3>
                        <p>المهندس يجب أن يعرف المصطلحات الأربعة في جدول الراوتر:</p>
                        <ul>
                            <li><strong>Inside Local:</strong> عنوان جهازك الحقيقي (مثلاً 192.168.1.5).</li>
                            <li><strong>Inside Global:</strong> العنوان العام (Public) الذي يخرج به الراوتر للإنترنت.</li>
                            <li><strong>Outside Local / Global:</strong> عنوان سيرفر جوجل (أو الوجهة).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">الـ PAT (Port Address Translation) - سحر المنافذ</h3>
                        <p>كيف لآلاف الأجهزة في الشركة أن تخرج للإنترنت بـ <strong>IP عام واحد فقط</strong>؟<br>
                        الراوتر يقوم بتغيير عنوان الـ IP <em>ورقم المنفذ (Source Port)</em> معاً! يسجل في جدوله: "الجهاز 192.168.1.5 خرج بورت 2000، سأعطيه الـ IP العام الخاص بي وأعطيه بورت 55001". عندما يعود الرد للراوتر على بورت 55001، ينظر في جدوله ويعرف فوراً أن هذا الرد يخص الجهاز الأول!</p>
                        <p><em>ملاحظة أمنية:</em> الـ NAT يعمل كجدار حماية خفي (Pseudo-Firewall) لأن الإنترنت الخارجي لا يستطيع رؤية أجهزتك الداخلية مباشرة ولا يمكنه بدء الاتصال بها (إلا لو قمت بعمل Port Forwarding).</p>
                    </div>
                `
            },
            {
                id: "lesson5_2",
                title: "2. هندسة قوائم التحكم (ACL & Wildcard Masks)",
                content: `
                    <h1>Access Control List (ACL) - حرس الحدود</h1>
                    <p>الـ ACL هي قلب الحماية في شبكات سيسكو. هي قائمة من الشروط (Rules) يقرأها الراوتر من الأعلى للأسفل (Top-Down). بمجرد أن يجد شرطاً ينطبق على البيانات، يُنفذه <strong>ويتوقف عن قراءة باقي القائمة!</strong></p>
                    
                    <div class="concept-box">
                        <h3>سر الـ Wildcard Mask (قناع العكس)</h3>
                        <p>في الـ ACL لا نستخدم الـ Subnet Mask، بل نستخدم الـ Wildcard Mask (الذي يطابق الـ 0 ويهمل الـ 1).<br>
                        مثال هندسي: إذا أردت منع شبكة <code>192.168.1.0</code>، سيكون الـ Subnet هو <code>255.255.255.0</code>، أما الـ Wildcard سيكون <code>0.0.0.255</code>. (يمكنك حسابه ببساطة بطرح الـ Subnet من 255.255.255.255).</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">الرفض الضمني (Implicit Deny) - الكابوس!</h3>
                        <p>قاعدة ذهبية: في نهاية أي قائمة ACL (حتى لو لم تراها) يوجد شرط غير مكتوب يقول: <em>"امنع كل شيء آخر" (Deny Any)</em>. إذا نسيت كتابة (Permit Any) في نهاية القائمة، سيقوم الراوتر بقطع الإنترنت عن الشركة بأكملها!</p>
                        
                        <h3>أنواع الـ ACL:</h3>
                        <ul>
                            <li><strong>Standard (1-99):</strong> غبية نوعاً ما. تمنع أو تسمح بناءً على الـ Source IP فقط. (تُوضع دائماً بالقرب من الهدف).</li>
                            <li><strong>Extended (100-199):</strong> ذكية ودقيقة. تمنع بناءً على (المرسل، المستقبل، البروتوكول TCP/UDP، ورقم البورت 80/443). (تُوضع بالقرب من المصدر لتوفير الـ Bandwidth).</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة السادسة: أمن الشبكات (Cybersecurity Fundamentals)",
        lessons: [
            {
                id: "lesson6_1",
                title: "1. حماية الطبقة الثانية (Layer 2 Security)",
                content: `
                    <h1>تأمين السويتشات من الهجمات الداخلية</h1>
                    <p>أغلب الاختراقات تأتي من الداخل (موظف ساخط أو هكر دخل المبنى). הסويتش الافتراضي يثق في الجميع، وعلينا إيقاف هذه الثقة العمياء.</p>
                    
                    <div class="concept-box">
                        <h3>1. Port Security & CAM Overflow</h3>
                        <p>الهكر يقوم بهجوم (MAC Flooding) ويرسل آلاف الـ MAC الوهمية لملء ذاكرة السويتش (CAM Table). عندما تمتلىء الذاكرة، يتحول السويتش لـ Hub غبي ويرسل البيانات لكل المنافذ ليتجسس عليها الهكر! <br>
                        <strong>الحل:</strong> تفعيل <code>Port Security</code> لتحديد عدد الـ MAC المسموحة لكل بورت (مثلاً جهاز واحد). إذا تم التجاوز، يتم إغلاق البورت (Shutdown).</p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">2. DHCP Snooping & ARP Inspection</h3>
                        <ul>
                            <li><strong>DHCP Spoofing:</strong> الهكر يوصل جهازه ويوزع IP وأرقام Gateway مزيفة للأجهزة ليصبح هو "الوسيط" (Man-in-the-Middle). <em>الحل: DHCP Snooping، الذي يجعل السويتش يرفض أي رد DHCP إلا من بورت السيرفر الموثوق (Trusted Port).</em></li>
                            <li><strong>ARP Spoofing:</strong> الهكر يرسل رسائل يخدع بها الكمبيوتر والراوتر ليقول "أنا الراوتر". <em>الحل: Dynamic ARP Inspection (DAI) الذي يفحص كل رسالة ARP ويقارنها بقاعدة بيانات الـ DHCP ليتأكد من صحتها.</em></li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson6_2",
                title: "2. التشفير وهندسة الـ VPN (IPsec)",
                content: `
                    <h1>حماية البيانات في قنوات الإنترنت المظلمة (VPN & Cryptography)</h1>
                    <p>الـ VPN ليس مجرد تغيير للـ IP. في الشركات، هو بناء نفق عسكري مشفر (IPsec Tunnel) لربط فروع الشركة عبر الإنترنت العام.</p>
                    
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">أعمدة التشفير (CIA Triad)</h3>
                        <ul>
                            <li><strong>السرية (Confidentiality):</strong> التشفير باستخدام خوارزميات التناظر (Symmetric) مثل AES (سريعة للبيانات)، أو اللاتناظر (Asymmetric) مثل RSA (بطيئة لكن آمنة لتبادل المفاتيح).</li>
                            <li><strong>النزاهة (Integrity):</strong> التأكد أن البيانات لم تتغير في الطريق. نستخدم الـ Hashing (مثل SHA-256) الذي يصنع بصمة رقمية لا يمكن التلاعب بها.</li>
                            <li><strong>المصادقة (Authentication):</strong> كيف نثبت أن الطرف الآخر هو حقاً فرع الشركة؟ باستخدام كلمات السر (PSK) أو الشهادات الرقمية (Certificates).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">هندسة الـ IPsec</h3>
                        <p>بروتوكول IPsec معقد ويعمل على مرحلتين (IKE Phases):</p>
                        <ol>
                            <li><strong>IKE Phase 1:</strong> يتفاوض الراوتران لإنشاء نفق "إداري" آمن لنقل المفاتيح فقط.</li>
                            <li><strong>IKE Phase 2:</strong> يتم إنشاء نفق "البيانات" الفعلي (ببروتوكول ESP). بروتوكول ESP يقوم بتشفير الـ IP Packet بالكامل ثم يضع فوقها IP Header جديد لتمويه العناوين الأصلية للشركة!</li>
                        </ol>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة السابعة: الأتمتة والـ SDN (Automation)",
        lessons: [
            {
                id: "lesson7_1",
                title: "1. الانفصال المعماري: SDN (Software-Defined Networking)",
                content: `
                    <h1>ثورة التفكير: فصل العقل عن العضلات</h1>
                    <p>في الراوترات الكلاسيكية، كل راوتر كان يمتلك عقله الخاص (Control Plane للـ OSPF/Routing) وعضلاته (Data Plane لتمرير البيانات). في شبكات العملاقة، هذا يجعل الإدارة مستحيلة.</p>

                    <div class="concept-box">
                        <h3>الشبكات المعرفة برمجياً (SDN)</h3>
                        <p>تم نزع "العقل" من جميع الراوترات ووضعه في سيرفر مركزي عملاق يُسمى <strong>SDN Controller (مثل Cisco DNA Center)</strong>. الراوترات أصبحت مجرد "عضلات" غبية تنفذ أوامر الـ Controller.</p>
                        <ul>
                            <li><strong>Southbound APIs:</strong> لغة التخاطب بين الـ Controller والراوترات/السويتشات (مثل بروتوكولات OpenFlow أو NETCONF أو SSH).</li>
                            <li><strong>Northbound APIs:</strong> لغة التخاطب بين الـ Controller والمبرمج! (عادة تكون REST APIs). يمكنك كتابة سكربت بايثون صغير يعطي أمراً للـ Controller ليقوم بتغيير باسورد 500 راوتر في ثانية واحدة.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson7_2",
                title: "2. لغات الأتمتة (Python, Ansible, JSON)",
                content: `
                    <h1>البنية التحتية ككود (Infrastructure as Code - IaC)</h1>
                    <p>المهندس الحديث لا يحفظ الأوامر (CLI) فقط، بل يبرمج الشبكة.</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">صيغ البيانات (Data Formats)</h3>
                        <p>عندما يسألك الـ Controller عن حالة الشبكة، لا يرد بنص عادي، بل يرد بـ Data Structure يسهل برمجتها:</p>
                        <ul>
                            <li><strong>JSON:</strong> لغة الويب، تعتمد على (Key-Value) وتستخدم الأقواس <code>{}</code>. (مثال: <code>{"hostname": "Router1", "ip": "10.0.0.1"}</code>).</li>
                            <li><strong>YAML:</strong> تستخدم المسافات (Indentation) بدلاً من الأقواس، وهي لغة الـ Ansible المفضلة.</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">الأسلحة البرمجية:</h3>
                        <ul>
                            <li><strong>Python (Netmiko/Nornir):</strong> مكتبات في بايثون تقوم بالدخول الآلي للراوترات عبر SSH وتكتب الأوامر بدلاً منك.</li>
                            <li><strong>Ansible:</strong> أداة قوية جداً (Agentless). تكتب ملف YAML يصف "الحالة المطلوبة" للشبكة (مثلاً: أريد VLAN 10 موجودة في كل السويتشات). الـ Ansible يتولى الباقي بفضل ميزة <em>Idempotency (تجنب تكرار التغيير إذا كان الوضع صحيحاً)</em>.</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثامنة: التبديل المتقدم (Advanced Switching)",
        lessons: [
            {
                id: "lesson8_1",
                title: "1. تجميع الروابط (EtherChannel & Load Balancing)",
                content: `
                    <h1>خداع السويتش لزيادة السرعة (EtherChannel)</h1>
                    <p>في مراكز البيانات، كابل جيجا واحد لا يكفي. إذا وصلنا 4 كابلات بين سويتشين، فإن الـ STP سيغلق 3 ويترك 1 لمنع الـ Loop. الـ EtherChannel يخدع الـ STP ويجعله يرى الـ 4 كابلات كـ <strong>كابل واحد وهمي</strong> بسرعة 4 جيجا!</p>
                    
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">كيف يتم توزيع الحمل (Load Balancing)؟</h3>
                        <p>هل تعتقد أن السويتش يرسل بت (Bit) هنا وبت هناك؟ لا! السويتش يستخدم خوارزمية <strong>Hashing</strong> (تعتمد على الـ Source/Destination MAC أو IP).<br>
                        إذا قمت بتحميل ملف كبير، فإنه سيسلك كابلاً واحداً فقط طوال الوقت ولن يتجاوز سرعته. الـ Load Balancing الحقيقي يظهر عندما يكون هناك مئات المستخدمين المختلفين في الشبكة.</p>
                        <p><em>البروتوكولات:</em> نستخدم <strong>LACP (802.3ad)</strong> لأنه معيار عالمي، ونتجنب PAgP الخاص بسيسكو لضمان التوافق مع سيرفرات Linux و Windows.</p>
                    </div>
                `
            },
            {
                id: "lesson8_2",
                title: "2. التكرار وبوابات الهروب (HSRP / VRRP)",
                content: `
                    <h1>ماذا لو تعطل راوتر الشركة؟ (First Hop Redundancy)</h1>
                    <p>أجهزة الموظفين تحتاج لـ Default Gateway للوصول للإنترنت. إذا احترق الراوتر، تنقطع الشركة. الحل هو وضع راوترين وبرمجتهما ليكونا راوتراً واحداً وهمياً (Virtual IP & MAC).</p>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">منظور الهكر (HSRP/VRRP Hijacking)</h3>
                        <p>بروتوكول HSRP (من سيسكو) أو VRRP (العالمي) يعتمد على رسائل Multicast لتحديد من هو الراوتر "الزعيم" (Active).<br>
                        <strong>الهجوم:</strong> إذا لم يقم مهندس الشبكات بتفعيل المصادقة (Authentication) بكلمة سر للبروتوكول، يمكن لـ <em>Pentester</em> توصيل لابتوب Kali Linux وإرسال رسائل HSRP بأولوية (Priority 255) ليجعل نفسه هو الـ Default Gateway للشركة، وبذلك تمر كل بيانات الموظفين عبر جهازه أولاً (Man-in-the-Middle) قبل خروجها للإنترنت!</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة التاسعة: التوجيه المتقدم (Advanced Routing)",
        lessons: [
            {
                id: "lesson9_1",
                title: "1. تعمق في OSPF (LSA Types)",
                content: `
                    <h1>المحرك الداخلي لـ OSPF</h1>
                    <p>كيف يرسم OSPF خريطة الشبكة؟ عن طريق تبادل رسائل تسمى <strong>LSA (Link-State Advertisements)</strong>. المهندس المحترف يجب أن يفهم أنواعها لتشخيص الأعطال:</p>
                    
                    <div class="concept-box">
                        <ul>
                            <li><strong>Type 1 (Router LSA):</strong> يرسله كل راوتر ليخبر منطقته (Area) بوجوده وحالته. لا يخرج من المنطقة.</li>
                            <li><strong>Type 2 (Network LSA):</strong> يرسله راوتر الزعيم (DR) في شبكات الـ Switch ليمثل الشبكة بأكملها.</li>
                            <li><strong>Type 3 (Summary LSA):</strong> يقوم راوتر الحدود (ABR) بأخذ مسارات Area 1 وتلخيصها لإرسالها لـ Area 0.</li>
                            <li><strong>Type 5 (External LSA):</strong> مسارات قادمة من خارج الـ OSPF تماماً (مثلاً مسار قادم من الإنترنت أو EIGRP).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson9_2",
                title: "2. بروتوكول BGP (حاكم الإنترنت)",
                content: `
                    <h1>كيف تتصل قارات العالم؟ (Border Gateway Protocol)</h1>
                    <p>إذا كان OSPF يحكم الشركة من الداخل، فإن BGP هو من يربط الشركات العالمية (ISPs) ببعضها. الإنترنت عبارة عن آلاف الشبكات المستقلة (Autonomous Systems - AS)، وبروتوكول BGP هو من يربطها.</p>
                    
                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">BGP Hijacking (اختطاف الإنترنت)</h3>
                        <p>BGP مبني على <strong>الثقة المطلقة</strong>! إذا قامت شركة اتصالات بإعلان مسار لـ BGP وتقول "أنا أمتلك شبكة 8.8.8.8 (جوجل)"، فإن الإنترنت قد يصدقها وتذهب كل بيانات جوجل لتلك الشركة!<br>
                        <em>حادثة حقيقية:</em> في 2008، أرادت باكستان حجب يوتيوب داخلياً، فأعلنت مسار BGP وهمي ليوتيوب لتوجيهه للعدم (Blackhole). تسرب الإعلان للإنترنت العالمي، وانقطع يوتيوب عن العالم بأكمله لمدة ساعتين بسبب خطأ هندسي!</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة العاشرة: الشبكات اللاسلكية والهجوم عليها (Wireless)",
        lessons: [
            {
                id: "lesson10_1",
                title: "1. هندسة الوايرلس (WLC & CAPWAP)",
                content: `
                    <h1>إدارة 1000 نقطة وصول (Access Point)</h1>
                    <p>في الشركات الكبرى، الأكسس بوينت (AP) تكون غبية (Lightweight)، لا يتم إعدادها فردياً. يتم ربطها بجهاز مركزي يسمى <strong>WLC (Wireless LAN Controller)</strong>.</p>
                    <ul>
                        <li>يتم بناء نفق مشفر يسمى <strong>CAPWAP</strong> بين الـ AP والـ WLC.</li>
                        <li>البيانات اللاسلكية للموظف لا تذهب للسويتش مباشرة، بل تسافر عبر النفق للـ WLC، والـ WLC هو من يخرجها لشبكة الشركة!</li>
                    </ul>
                `
            },
            {
                id: "lesson10_2",
                title: "2. اختراق الشبكات اللاسلكية (Wi-Fi Hacking)",
                content: `
                    <h1>كيف يهاجم الـ Pentester شبكة Wi-Fi؟</h1>
                    <p>فهمك لهندسة الترددات والبروتوكولات يجعلك قادراً على تدميرها. الوايرلس هو أسهل نقطة دخول للهكر لأنه لا يحتاج للدخول للمبنى، يكفي أن يجلس في سيارته بالخارج!</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">هجمات الـ Wi-Fi الشائعة (باستخدام Aircrack-ng)</h3>
                        <ul>
                            <li><strong>Deauth Attack:</strong> يرسل الهكر إطارات (Deauthentication Frames) مزيفة ليفصل جميع الموظفين عن الشبكة إجبارياً (هجوم حجب خدمة DoS).</li>
                            <li><strong>WPA2 4-Way Handshake Capture:</strong> عند محاولة الموظف الاتصال مجدداً بالشبكة، يعترض الهكر "المصافحة الرباعية" المشفرة التي تحتوي على الباسوورد، ويأخذها لجهازه لكسرها لاحقاً بالتخمين (Brute-Force & Wordlists).</li>
                            <li><strong>Evil Twin (التوأم الشرير):</strong> يقوم الهكر بعمل شبكة وهمية بنفس اسم شبكة الشركة (SSID) ولكن بإشارة أقوى. تتصل أجهزة الموظفين به تلقائياً بدلاً من الشركة، ليتمكن من سرقة حساباتهم!</li>
                        </ul>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الحادية عشر: معمارية الداتا سنتر وجودة الخدمة",
        lessons: [
            {
                id: "lesson11_1",
                title: "1. من الـ 3-Tier إلى الـ Spine-Leaf",
                content: `
                    <h1>تصميم مراكز البيانات الحديثة (Data Centers)</h1>
                    <p>نموذج سيسكو القديم (Core - Distribution - Access) كان رائعاً حينما كانت البيانات تذهب للإنترنت (North-South Traffic). لكن اليوم، 90% من البيانات تتحرك بين سيرفرات الشركة داخلياً (East-West Traffic).</p>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">معمارية Spine-Leaf</h3>
                        <p>الشركات العملاقة (مثل جوجل وفيسبوك) تستخدم هذه المعمارية المكونة من طبقتين فقط:</p>
                        <ul>
                            <li><strong>Spine:</strong> سويتشات المركز، لا تتصل ببعضها أبداً.</li>
                            <li><strong>Leaf:</strong> سويتشات الأطراف (تتصل بها السيرفرات). كل سويتش Leaf يتصل بكل سويتش Spine.</li>
                        </ul>
                        <p>هذا يضمن أن المسافة بين أي سيرفر وآخر هي "قفزة واحدة فقط" (1 Hop)، مما يوفر سرعة استجابة خرافية (Ultra-Low Latency) لا يمكن للـ STP توفيرها!</p>
                    </div>
                `
            },
            {
                id: "lesson11_2",
                title: "2. جودة الخدمة (QoS Deep Dive)",
                content: `
                    <h1>التمييز العنصري لصالح الـ VIP (QoS)</h1>
                    <p>حينما يمتلئ كابل الإنترنت، يجب أن نضحي ببعض البيانات لننقذ بيانات أخرى. الـ QoS هي سياسة إدارة الازدحام.</p>

                    <div class="concept-box">
                        <h3>كيف نميز البيانات؟ (DSCP)</h3>
                        <p>يقوم الراوتر بعمل وشم (Marking) على رأس الـ IP Packet. نستخدم حقل <strong>DSCP (Differentiated Services Code Point)</strong>.<br>
                        مثال: المكالمات الصوتية تأخذ وشم قيمته (EF - Expedited Forwarding أو 46). عندما ترى الراوترات هذا الوشم في الطريق، تفتح لها الطابور لتعبر فوراً (Strict Priority Queuing).</p>
                        <p>بينما التصفح العادي يأخذ وشم (Best Effort - 0) ويعبر إذا كان هناك مساحة فارغة فقط.</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثانية عشر: ☠️ جسر العبور للأمن السيبراني (Penetration Testing)",
        lessons: [
            {
                id: "lesson12_1",
                title: "1. من مهندس شبكات إلى هكر حقيقي",
                content: `
                    <h1>السر الأعظم: الشبكات هي لغة الـ Hackers</h1>
                    <p>الكثير يظن أن الهكر يحتاج لتعلم البرمجة فقط. الحقيقة أن <strong>الاختراق (Pentesting) هو استغلال لبروتوكولات الشبكة بطرق لم يتخيلها صانعوها!</strong> لن يستطيع أحد خداع شبكة دون أن يفهم الـ CCNA بعمق.</p>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">تحليل أداة Nmap برؤية CCNA</h3>
                        <p>أشهر أداة استطلاع في العالم (Nmap) هي مجرد تطبيق صريح لـ TCP/IP:</p>
                        <ul>
                            <li><strong>TCP Connect Scan:</strong> الأداة تقوم بعمل 3-Way Handshake كامل. (نظيف لكنه يترك سجلات Log في السيرفر وتكشفك).</li>
                            <li><strong>Stealth SYN Scan (-sS):</strong> الهكر يرسل SYN، وعندما يرد السيرفر بـ SYN-ACK، يرسل الهكر <strong>RST (Reset)</strong> لإلغاء الاتصال فجأة! هذا يعرّف الهكر أن البورت مفتوح، ولكن السيرفر لا يسجل الاتصال لأنه لم يكتمل!</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson12_2",
                title: "2. الاختراق الداخلي والتمدد (Pivoting & Active Directory)",
                content: `
                    <h1>الشبكة سقطت.. ماذا بعد؟</h1>
                    <p>بمجرد أن يخترق الهكر جهاز كمبيوتر واحد لموظف عبر إيميل Phishing، تبدأ اللعبة الحقيقية. جهاز الموظف لا يحتوي على أسرار الشركة، الأسرار موجودة في سيرفرات الـ Data Center المخبأة خلف راوترات وقوائم حظر (ACLs)!</p>
                    
                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">تقنية الـ Pivoting (القفز الشبكي)</h3>
                        <p>السيرفر الداخلي (VLAN 100) قد لا يقبل أي اتصال من الإنترنت، لكنه يقبل اتصالاً من جهاز الموظف المخترق (VLAN 10).<br>
                        يقوم الهكر بتحويل جهاز الموظف المخترق إلى <strong>راوتر خفي</strong> لعمل Port Forwarding. وبذلك يمرر هجماته من الإنترنت، لجهاز الموظف، ومنه للسيرفر الحساس متجاوزاً كل أنظمة الـ Firewall!</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">اختراق مملكة الشركة (Active Directory)</h3>
                        <p>أغلب الشركات الكبرى تدير موظفيها وأجهزتها بسيرفر يسمى Domain Controller. الهكر يستخدم الشبكة لتنفيذ هجمات ضد هذا السيرفر:</p>
                        <ul>
                            <li><strong>Pass-the-Hash:</strong> سرقة تشفير كلمة المرور (Hash) من جهاز الضحية وتمريرها في الشبكة لدخول سيرفر آخر دون معرفة الباسوورد الأصلي!</li>
                            <li><strong>Kerberoasting:</strong> استغلال بروتوكول المصادقة Kerberos (بورت 88) لطلب تذاكر (Tickets) مشفرة، ثم أخذها لفك تشفيرها على جهاز الهكر (Offline Brute-force).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson12_3",
                title: "3. ختام الكورس والخطوة التالية",
                content: `
                    <h1>اكتمل البناء التأسيسي بنجاح 🏆</h1>
                    <p>أنت الآن لست مجرد مبتدئ؛ أنت مهندس يفهم طبقات الـ OSI، ويفهم كيف تتحرك البيانات (Routing/Switching)، وكيف تتحدث الراوترات (OSPF/BGP)، وكيف نفصلها أمنياً (VLAN/ACL)، وكيف يعمل التشفير (VPN)، وكيف نستغل هذه المفاهيم في الأمن السيبراني الاختراقي.</p>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">ما هي خطوتك التالية في المسار؟</h3>
                        <p>بعد إتقان الـ CCNA بعمقه المعماري، أنت الآن جاهز بنسبة 100% لدخول المعركة العملية لشهادات الأمن السيبراني والاختراق:</p>
                        <ul>
                            <li><strong>🛡️ مسار الحماية المتقدمة:</strong> شهادات مثل (Cisco CCNP Security أو CompTIA CySA+ أو SOC Analyst).</li>
                            <li><strong>⚔️ مسار الهجوم والاختراق الفعلي (Red Teaming):</strong> يمكنك الآن بدء كورس الـ <strong>eJPT</strong> أو دراسة <strong>OSCP (Offensive Security Certified Professional)</strong> بكل قوة، لأنك تفهم الشبكة أكثر من 90% من المبتدئين في المجال!</li>
                        </ul>
                        <br>
                        <p><em>نهاية الجزء النظري الأكاديمي.. قم بالانتقال الآن إلى (محاكي الأوامر / Labs) لتطبيق كل هذه المفاهيم بيدك على أجهزة سيسكو الحقيقية!</em></p>
                    </div>
                `
            }
        ]
    }
];

function renderSidebar() {
    const toc = document.getElementById('tocPanel');
    toc.innerHTML = '';
    
    academyData.forEach((chapter, index) => {
        const chapterDiv = document.createElement('div');
        
        const title = document.createElement('div');
        title.className = 'chapter-title';
        title.innerHTML = `<span>${chapter.chapter}</span> <span class="arrow">▼</span>`;
        
        const lessonsContainer = document.createElement('div');
        lessonsContainer.className = 'chapter-lessons';
        
        // Open the first chapter by default
        if(index === 0) {
            lessonsContainer.classList.add('active');
            title.querySelector('.arrow').innerText = '▲';
        }

        title.onclick = () => {
            const isActive = lessonsContainer.classList.contains('active');
            lessonsContainer.classList.toggle('active');
            title.querySelector('.arrow').innerText = isActive ? '▼' : '▲';
        };

        chapterDiv.appendChild(title);
        
        chapter.lessons.forEach(lesson => {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            btn.id = 'btn-' + lesson.id;
            btn.innerText = lesson.title;
            btn.onclick = () => loadLesson(lesson.id);
            lessonsContainer.appendChild(btn);
        });
        
        chapterDiv.appendChild(lessonsContainer);
        toc.appendChild(chapterDiv);
    });
}

function loadLesson(id) {
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    
    for(let chap of academyData) {
        for(let less of chap.lessons) {
            if(less.id === id) {
                const article = document.getElementById('articleBody');
                article.style.opacity = '0';
                setTimeout(() => {
                    article.innerHTML = less.content;
                    article.style.transition = 'opacity 0.3s ease';
                    article.style.opacity = '1';
                }, 150);
                return;
            }
        }
    }
}

window.onload = () => {
    renderSidebar();
    if(academyData[0] && academyData[0].lessons[0]) {
        loadLesson(academyData[0].lessons[0].id);
    }
};
