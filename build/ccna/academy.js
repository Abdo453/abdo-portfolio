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
                    <h1>نظام التشغيل Cisco IOS</h1>
                    <p>أجهزة سيسكو (الراوترات والسويتشات) تعمل بنظام تشغيل يُسمى <strong>IOS (Internetwork Operating System)</strong>. يتم التعامل معه بالكامل عبر سطر الأوامر (CLI).</p>
                    
                    <h2>أوضاع التشغيل الأساسية (Modes)</h2>
                    <div class="concept-box">
                        <h3>1. User EXEC Mode (وضع المستخدم)</h3>
                        <p>الشكل: <code>Router></code></p>
                        <p>وضع محدود جداً، يسمح لك فقط ببعض أوامر الفحص البسيطة مثل <code>ping</code>. لا يمكنك تغيير أي إعدادات هنا.</p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">2. Privileged EXEC Mode (وضع الامتيازات)</h3>
                        <p>الشكل: <code>Router#</code></p>
                        <p>يتم الدخول إليه بكتابة الأمر <code>enable</code>. هنا يمكنك عرض جميع إعدادات الجهاز باستخدام أوامر <code>show</code> (مثل <code>show running-config</code>) وحفظ الإعدادات، لكن لا يمكنك تعديل التكوين.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">3. Global Configuration Mode (وضع الإعداد العام)</h3>
                        <p>الشكل: <code>Router(config)#</code></p>
                        <p>يتم الدخول إليه بكتابة <code>configure terminal</code> من وضع الامتيازات. هذا هو المكان الذي نقوم فيه بتغيير اسم الجهاز (<code>hostname</code>) وإعداد كلمات المرور وتكوين الشبكة الفعلي.</p>
                    </div>
                `
            },
            {
                id: "lesson3_2",
                title: "2. الشبكات الوهمية (VLANs)",
                content: `
                    <h1>الشبكات المحلية الوهمية (Virtual LANs)</h1>
                    <p>في الوضع الطبيعي، كل المنافذ (Ports) في السويتش تنتمي لشبكة واحدة (Broadcast Domain واحد). لكن ماذا لو أردنا فصل قسم "الحسابات" عن قسم "الموارد البشرية" وهم متصلون بنفس السويتش الفعلي؟</p>
                    
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">الحل: الـ VLAN</h3>
                        <p>تقوم الـ VLAN بتقسيم السويتش الفعلي الواحد إلى عدة سويتشات <em>وهمية</em> (Logical Switches). الأجهزة في VLAN 10 لا يمكنها التحدث مع الأجهزة في VLAN 20 إلا بوجود راوتر!</p>
                        <ul>
                            <li><strong>VLAN 1:</strong> هي الشبكة الافتراضية، جميع المنافذ تكون تابعة لها عند شراء السويتش.</li>
                            <li><strong>Access Port:</strong> هو المنفذ الذي يتم توصيل جهاز كمبيوتر به، وينتمي لـ VLAN واحدة فقط.</li>
                        </ul>
                        <p><em>الأمر لإنشاء VLAN:</em><br><code>Switch(config)# vlan 10<br>Switch(config-vlan)# name Accounting</code></p>
                    </div>
                `
            },
            {
                id: "lesson3_3",
                title: "3. الـ Trunking وبروتوكول 802.1Q",
                content: `
                    <h1>منافذ العبور (Trunk Ports)</h1>
                    <p>إذا كان لدينا قسم للحسابات (VLAN 10) يمتد عبر <strong>سويتشين مختلفين</strong> (مبنيين مختلفين)، كيف نجعل بيانات VLAN 10 تعبر الكابل الذي يربط السويتشين؟</p>

                    <div class="concept-box">
                        <h3>منفذ الـ Trunk</h3>
                        <p>الـ Access Port ينقل بيانات VLAN واحدة فقط (لأجهزة الكمبيوتر). أما الـ <strong>Trunk Port</strong> فهو يُستخدم لربط سويتش بسويتش آخر، ويسمح بمرور بيانات <em>جميع الـ VLANs</em> عبر كابل واحد.</p>
                        
                        <h3>كيف يعرف السويتش المستقبل أن هذه البيانات تابعة لـ VLAN 10 أو 20؟</h3>
                        <p>هنا يأتي دور بروتوكول <strong>802.1Q</strong> (ويُعرف بـ Dot1q). يقوم هذا البروتوكول بوضع <em>علامة (Tag)</em> على البيانات قبل إرسالها عبر الـ Trunk، ليكتب عليها رقم الـ VLAN، فيستلمها السويتش الآخر ويوجهها للمنفذ الصحيح.</p>
                    </div>
                `
            },
            {
                id: "lesson3_4",
                title: "4. بروتوكول الشجرة الممتدة (STP)",
                content: `
                    <h1>Spanning Tree Protocol (STP)</h1>
                    <p>في الشبكات الحساسة، نقوم بتوصيل السويتشات ببعضها بأكثر من كابل لتجنب انقطاع الخدمة (Redundancy). ولكن هذا الكابل الإضافي قد يصنع حلقة مفرغة (Loop) للبيانات، مما يؤدي إلى انهيار الشبكة بالكامل بسبب ما يُعرف بـ Broadcast Storm!</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">كيف يحل الـ STP المشكلة؟</h3>
                        <p>يعمل بروتوكول STP أوتوماتيكياً لاكتشاف هذه الحلقات. إذا وجد كابلين يؤديان لنفس المكان، فإنه يقوم بـ <strong>إغلاق (Block) أحدهما منطقياً</strong> (يظل متصلاً لكن لا ينقل بيانات).</p>
                        <p>إذا انقطع الكابل الأساسي، يقوم الـ STP فوراً بفتح الكابل الاحتياطي الذي كان مغلقاً لتعود الشبكة للعمل بدون أي حلقة مفرغة.</p>
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
                title: "1. أساسيات التوجيه (Routing Fundamentals)",
                content: `
                    <h1>مفهوم التوجيه (Routing)</h1>
                    <p>التوجيه هو عملية تحديد أفضل مسار لإرسال البيانات (Packets) من شبكة المصدر إلى شبكة الوجهة باستخدام الراوتر.</p>
                    
                    <div class="concept-box">
                        <h3>جدول التوجيه (Routing Table)</h3>
                        <p>الراوتر يمتلك جدولاً (مثل خريطة جوجل) يحتوي على:</p>
                        <ul>
                            <li><strong>الشبكة الوجهة (Destination Network):</strong> الشبكة التي نريد الوصول إليها.</li>
                            <li><strong>المحطة التالية (Next-Hop):</strong> عنوان الراوتر المجاور الذي سيسلمنا للوجهة.</li>
                            <li><strong>واجهة الخروج (Interface):</strong> الكابل الذي ستخرج منه البيانات.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson4_2",
                title: "2. التوجيه الثابت (Static Routing)",
                content: `
                    <h1>التوجيه الثابت (Static)</h1>
                    <p>هو مسار يقوم مهندس الشبكات بكتابته يدوياً في الراوتر. مفيد للشبكات الصغيرة، لكنه متعب في الشبكات الكبيرة لأنه لا يتأقلم إذا انقطع الكابل.</p>
                    
                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">المسار الافتراضي (Default Route)</h3>
                        <p>يُكتب بالصيغة <code>0.0.0.0/0</code>، ويعني: "إذا لم تعرف أين تذهب هذه البيانات، أرسلها إلى هذا المسار". يُستخدم عادة للاتصال بالإنترنت.</p>
                    </div>
                `
            },
            {
                id: "lesson4_3",
                title: "3. بروتوكولات التوجيه الديناميكي",
                content: `
                    <h1>التوجيه الديناميكي (Dynamic)</h1>
                    <p>هنا تتبادل الراوترات المعلومات أوتوماتيكياً لبناء خريطة الشبكة بدون تدخل يدوي.</p>

                    <h2>OSPF (Open Shortest Path First)</h2>
                    <ul>
                        <li>يعتمد على حالة الوصلة (Link-State).</li>
                        <li>سريع جداً في اكتشاف التغييرات.</li>
                        <li>يستخدم خوارزمية Dijkstra لاختيار أقصر مسار بناءً على الـ Cost (السرعة).</li>
                    </ul>

                    <h2>EIGRP</h2>
                    <ul>
                        <li>بروتوكول خاص بسيسكو (Cisco Proprietary).</li>
                        <li>يستخدم معادلة معقدة تعتمد على الـ Bandwidth والـ Delay.</li>
                    </ul>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الخامسة: خدمات الشبكة (IP Services)",
        lessons: [
            {
                id: "lesson5_1",
                title: "1. ترجمة العناوين (NAT)",
                content: `
                    <h1>Network Address Translation (NAT)</h1>
                    <p>بما أن عناوين الـ IPv4 العامة (Public) نفدت، نستخدم الـ NAT في الراوتر ليقوم بترجمة عناوين أجهزتنا الداخلية (Private) إلى عنوان عام واحد (Public) للوصول للإنترنت.</p>

                    <div class="concept-box">
                        <h3>PAT (Port Address Translation) أو Overload</h3>
                        <p>هو النوع الأكثر استخداماً، يسمح لآلاف الأجهزة في الشبكة المحلية باستخدام <strong>IP عام واحد فقط</strong> للوصول للإنترنت، حيث يفرق الراوتر بينهم باستخدام أرقام المنافذ (Ports).</p>
                    </div>
                `
            },
            {
                id: "lesson5_2",
                title: "2. قوائم التحكم (ACL)",
                content: `
                    <h1>Access Control List (ACL)</h1>
                    <p>هي قواعد تُكتب على الراوتر للسماح (Permit) أو المنع (Deny) لمرور بيانات معينة. تعمل كجدار حماية بسيط (Firewall).</p>
                    
                    <ul>
                        <li><strong style="color:var(--danger);">Standard ACL:</strong> تمنع أو تسمح بناءً على عنوان المرسل (Source IP) فقط. (أرقامها 1-99).</li>
                        <li><strong style="color:var(--success);">Extended ACL:</strong> متقدمة جداً، تمنع بناءً على المرسل، والمستقبل، ونوع الخدمة (مثل منع الـ HTTP فقط والسماح بالـ Ping). (أرقامها 100-199).</li>
                    </ul>
                `
            }
        ]
    },
    {
        chapter: "المرحلة السادسة: أمن الشبكات (Security)",
        lessons: [
            {
                id: "lesson6_1",
                title: "1. أمان المنافذ (Port Security)",
                content: `
                    <h1>أمان المنافذ في السويتش</h1>
                    <p>حتى لا يقوم أي شخص غريب بفصل كابل طابعة وتركيب جهازه الخاص لاختراق الشبكة، نستخدم الـ Port Security.</p>
                    <p>نقوم بربط المنفذ بـ MAC Address محدد. إذا تم توصيل جهاز مختلف، يتخذ السويتش أحد الإجراءات التالية:</p>
                    <ul>
                        <li><strong>Protect:</strong> يتجاهل بيانات الغريب بهدوء.</li>
                        <li><strong>Restrict:</strong> يتجاهل البيانات ويُرسل إنذاراً للمدير.</li>
                        <li><strong style="color:var(--danger);">Shutdown:</strong> يغلق المنفذ تماماً فوراً.</li>
                    </ul>
                `
            },
            {
                id: "lesson6_2",
                title: "2. الشبكات الخاصة الافتراضية (VPN)",
                content: `
                    <h1>Virtual Private Network (VPN)</h1>
                    <p>هل تعمل من المنزل وتريد الدخول لسيرفرات الشركة بأمان عبر الإنترنت غير الآمن؟ هنا يأتي دور الـ VPN.</p>
                    <p>يقوم بإنشاء <strong>نفق مشفر (Encrypted Tunnel)</strong> عبر الإنترنت لحماية بياناتك من التجسس (Man-in-the-Middle).</p>
                    <ul>
                        <li><strong>Site-to-Site:</strong> ربط فرعين لشركة عبر الإنترنت بشكل دائم.</li>
                        <li><strong>Remote Access:</strong> ربط كمبيوتر موظف من منزله بشبكة الشركة (باستخدام برامج مثل Cisco AnyConnect).</li>
                    </ul>
                `
            }
        ]
    },
    {
        chapter: "المرحلة السابعة: الأتمتة (Automation)",
        lessons: [
            {
                id: "lesson7_1",
                title: "1. الأتمتة وبرمجة الشبكات",
                content: `
                    <h1>مستقبل الشبكات: Automation & SDN</h1>
                    <p>الطريقة التقليدية لإدارة 500 راوتر هي الدخول عليهم واحداً تلو الآخر لكتابة الأوامر! هذا مضيعة للوقت ومعرض للخطأ البشري.</p>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">الشبكات المعرفة برمجياً (SDN)</h3>
                        <p>في الـ SDN، نقوم بفصل عقل الراوتر (Control Plane) عن عضلاته التي تنقل البيانات (Data Plane). نضع العقل في سيرفر مركزي يُسمى <strong>Controller (مثل Cisco DNA)</strong>. من خلال هذا السيرفر، ندير جميع راوترات الشركة بضغطة زر واحدة!</p>
                    </div>

                    <h2>أدوات الأتمتة</h2>
                    <ul>
                        <li><strong>Ansible:</strong> أداة تعتمد على ملفات YAML لدفع الإعدادات لمئات الأجهزة في ثوانٍ.</li>
                        <li><strong>Python:</strong> لغة البرمجة الأساسية في الشبكات اليوم، نستخدم مكتبات مثل <code>Netmiko</code> للدخول على الأجهزة وتغيير الإعدادات عبر سكربتات.</li>
                        <li><strong>REST APIs:</strong> واجهات برمجية للتخاطب مع الأجهزة ببيانات بصيغة JSON بدل التخاطب بالـ CLI.</li>
                    </ul>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثامنة: التبديل المتقدم (Advanced Switching)",
        lessons: [
            {
                id: "lesson8_1",
                title: "1. دمج الروابط (EtherChannel)",
                content: `
                    <h1>تجميع الكابلات (EtherChannel)</h1>
                    <p>تخيل أن لديك كابل بسرعة 1 جيجا بين سويتشين، والضغط عالي جداً. الحل التقليدي هو توصيل كابل آخر، لكن المشكلة أن بروتوكول STP سيقوم بإغلاقه لمنع اللوب (Loop)!</p>
                    
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">الحل مع EtherChannel</h3>
                        <p>هذه التقنية تخدع السويتش وتجعله يرى الكابلين (أو حتى 8 كابلات) كأنهم <strong>كابل واحد وهمي</strong>. بالتالي:</p>
                        <ul>
                            <li>تتضاعف السرعة (كابلين جيجا = 2 جيجا).</li>
                            <li>لا يقوم STP بإغلاق أي كابل.</li>
                            <li>إذا انقطع كابل، يستمر الآخر في العمل بدون انقطاع للشبكة.</li>
                        </ul>
                    </div>

                    <h2>بروتوكولات الـ EtherChannel</h2>
                    <ul>
                        <li><strong>LACP:</strong> بروتوكول قياسي عالمي، يعمل مع أي أجهزة.</li>
                        <li><strong>PAgP:</strong> بروتوكول حصري لأجهزة سيسكو (Cisco Proprietary).</li>
                    </ul>
                `
            },
            {
                id: "lesson8_2",
                title: "2. التكرار في البوابة الافتراضية (FHRP / HSRP)",
                content: `
                    <h1>ماذا لو تعطل راوتر الشركة؟</h1>
                    <p>كل جهاز كمبيوتر يمتلك Default Gateway (راوتر) ليخرج للإنترنت. إذا احترق هذا الراوتر، ستنقطع الشركة بالكامل عن العالم الخارجي.</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">بروتوكول HSRP (Hot Standby Router Protocol)</h3>
                        <p>نحضر راوترين، راوتر أساسي (Active) وراوتر احتياطي (Standby). نعطيهما عنوان <strong>IP وهمي (Virtual IP)</strong>.</p>
                        <p>نخبر جميع أجهزة الشركة أن الـ Gateway هو هذا الـ IP الوهمي. إذا تعطل الراوتر الأساسي، يكتشف الاحتياطي ذلك في ثوانٍ ويستلم الـ IP الوهمي ويكمل العمل بدون أن يشعر الموظفون بأي انقطاع!</p>
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
                title: "1. تعمق في OSPF",
                content: `
                    <h1>بروتوكول OSPF (التوجيه بناءً على حالة الرابط)</h1>
                    <p>كما عرفنا أن OSPF يستخدم خوارزمية Dijkstra لاختيار المسار الأسرع. لكن ماذا لو كان لدينا شبكة عملاقة بها 500 راوتر؟</p>
                    
                    <div class="concept-box">
                        <h3>المناطق (OSPF Areas)</h3>
                        <p>لتقليل الضغط على معالجات الراوترات، نقسم الشبكة الكبيرة إلى <strong>مناطق (Areas)</strong>.</p>
                        <ul>
                            <li><strong>Area 0:</strong> هي منطقة العمود الفقري (Backbone). يجب أن تتصل بها جميع المناطق الأخرى.</li>
                            <li>الراوتر الذي يربط بين منطقتين يُسمى <strong>ABR (Area Border Router)</strong>.</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson9_2",
                title: "2. بروتوكول BGP",
                content: `
                    <h1>بروتوكول الإنترنت (BGP)</h1>
                    <p>OSPF و EIGRP هي بروتوكولات داخلية (IGP) تُستخدم داخل الشركة الواحدة. ولكن كيف تتحدث شركات الاتصالات (ISPs) مع بعضها البعض عبر الإنترنت؟</p>
                    
                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">BGP (Border Gateway Protocol)</h3>
                        <p>هو البروتوكول الذي <strong>يشغل شبكة الإنترنت العالمية</strong>. هو بطيء جداً، لكنه يتحمل ملايين المسارات، ويعتمد على السياسات (Policies) أكثر من السرعة في اختيار المسار. (مثلاً: لا تمرر بياناتي عبر راوترات تابعة لدولة معينة).</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة العاشرة: الشبكات اللاسلكية (Wireless)",
        lessons: [
            {
                id: "lesson10_1",
                title: "1. أساسيات الوايرلس (Wi-Fi)",
                content: `
                    <h1>كيف يعمل الوايرلس؟</h1>
                    <p>الشبكات اللاسلكية (WLAN) تعتمد على موجات الراديو (RF). لدينا ترددان أساسيان:</p>
                    <ul>
                        <li><strong>2.4 GHz:</strong> يغطي مسافة بعيدة ويخترق الجدران جيداً، لكنه بطيء ومزدحم (لأن المايكرويف والبلوتوث يعملان عليه).</li>
                        <li><strong>5 GHz:</strong> سريع جداً ولا يعاني من الازدحام، لكن مداه قصير ولا يخترق الجدران بقوة.</li>
                    </ul>
                `
            },
            {
                id: "lesson10_2",
                title: "2. متحكم الشبكات اللاسلكية (WLC)",
                content: `
                    <h1>كيف تدير 1000 أكسس بوينت (AP)؟</h1>
                    <p>في منزلك لديك راوتر واي فاي واحد. في الفنادق أو الشركات الكبرى، يوجد المئات من أجهزة البث (Access Points - AP). برمجتها واحدة تلو الأخرى مستحيل!</p>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">متحكم الوايرلس (WLC - Wireless LAN Controller)</h3>
                        <p>نستخدم الـ WLC كجهاز مركزي للتحكم. الـ APs تصبح أجهزة "غبية" (Lightweight APs) تنتظر الأوامر فقط من الـ WLC عبر نفق يسمى <strong>CAPWAP</strong>. من خلال الـ WLC يمكنك تغيير الباسوورد لجميع الفروع بضغطة واحدة.</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الحادية عشر: المعمارية وجودة الخدمة (Architecture & QoS)",
        lessons: [
            {
                id: "lesson11_1",
                title: "1. معمارية شبكات سيسكو (3-Tier & 2-Tier)",
                content: `
                    <h1>كيف نصمم شبكة لشركة كبرى؟</h1>
                    <p>قامت سيسكو بابتكار نموذج هرمي لتصميم الشبكات لضمان الكفاءة وسهولة حل المشاكل:</p>
                    
                    <ul>
                        <li><strong>Core Layer (القلب):</strong> سويتشات عملاقة وسريعة جداً مهمتها الوحيدة النقل السريع للبيانات بين المباني (لا توجد فلاتر أو أمان هنا، السرعة فقط).</li>
                        <li><strong>Distribution Layer (التوزيع):</strong> هنا نضع الراوترات الكبيرة ونتحكم في مرور البيانات بين أقسام الشركة (VLAN Routing & ACL).</li>
                        <li><strong>Access Layer (الوصول):</strong> السويتشات العادية التي تتصل بها أجهزة الكمبيوتر والطابعات.</li>
                    </ul>

                    <p><em>ملاحظة:</em> للشركات المتوسطة، يتم دمج الـ Core مع الـ Distribution في طبقة واحدة تُسمى <strong>Collapsed Core (2-Tier)</strong>.</p>
                `
            },
            {
                id: "lesson11_2",
                title: "2. جودة الخدمة (QoS)",
                content: `
                    <h1>Quality of Service (QoS)</h1>
                    <p>تخيل أن كابل الشبكة ممتلئ بنسبة 100% (Congestion). لدينا شخص يحمل ملف كبير، وآخر في مكالمة زووم (Voice/Video) مهمة مع المدير. ماذا سيحدث؟</p>
                    <p>سيحدث تقطيع شديد في الصوت! لأن السويتش يعامل جميع البيانات بإنصاف (من يصل أولاً يعبر أولاً).</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">دور الـ QoS</h3>
                        <p>وظيفة جودة الخدمة هي <strong>التمييز العنصري لصالح البيانات الحساسة</strong>! نقوم ببرمجة الراوتر لإعطاء <em>أولوية قصوى للمكالمات الصوتية والمرئية</em>، ووضع تحميل الملفات في طابور الانتظار (لأن تحميل ملف تأخر ثانيتين لن يلاحظه أحد، بينما تأخر الصوت لثانية يفسد المكالمة).</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثانية عشر: جسر العبور للأمن السيبراني (Cyber Security)",
        lessons: [
            {
                id: "lesson12_1",
                title: "1. لماذا الـ CCNA هو أقوى أساس للهكر؟",
                content: `
                    <h1>السر الذي لا يخبرك به الكثيرون!</h1>
                    <p>الكثير من المبتدئين في الأمن السيبراني يقفزون مباشرة لتعلم أدوات الاختراق (مثل Kali Linux) دون فهم الشبكات. <strong>هذا يجعلهم Script Kiddies (مجرد مستخدمين لأدوات لا يفهمون كيف تعمل).</strong></p>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">كيف يصنعك نموذج OSI كـ هكر محترف؟</h3>
                        <p>الاختراق الحقيقي (Pentesting) هو إيجاد ثغرة في إحدى طبقات الشبكة واستغلالها. دراستك للـ CCNA تجعلك تفهم كيف تسير البيانات، مما يجعلك قادراً على اعتراضها أو تزييفها!</p>
                        <ul>
                            <li><strong>الطبقة الثانية (Data Link):</strong> الهكر يستخدم هجمات <em>MAC Flooding</em> و <em>ARP Spoofing</em> لسرقة البيانات أو انتحال شخصية الراوتر.</li>
                            <li><strong>الطبقة الثالثة (Network):</strong> الهكر يستخدم <em>IP Spoofing</em> و <em>Ping of Death</em> لإخفاء هويته وإيقاف السيرفرات.</li>
                            <li><strong>الطبقة الرابعة (Transport):</strong> يتم تنفيذ هجمات <em>SYN Flood (DDoS)</em> لإرهاق السيرفر باتصالات TCP وهمية.</li>
                            <li><strong>الطبقة السابعة (Application):</strong> ثغرات الويب (SQL Injection) وسرقة كلمات المرور غير المشفرة (HTTP/Telnet).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson12_2",
                title: "2. مشهد التهديدات (Threat Landscape)",
                content: `
                    <h1>من يهاجمنا؟ وما هي الأسلحة؟</h1>
                    
                    <h2>المهاجمون (Threat Actors):</h2>
                    <ul>
                        <li><strong>White Hats:</strong> الهكر الأخلاقي (أنت مستقبلاً) يختبر الاختراق بإذن الشركة لحمايتها.</li>
                        <li><strong>Black Hats:</strong> المجرم السيبراني الذي يخترق لسرقة الأموال والبيانات.</li>
                        <li><strong>State-Sponsored:</strong> قراصنة ترعاهم دول لضرب بنية تحتية لدول أخرى (مثل استهداف مفاعلات نووية).</li>
                    </ul>

                    <h2>البرمجيات الخبيثة (Malware):</h2>
                    <ul>
                        <li><strong>Ransomware (فيروس الفدية):</strong> يشفر ملفات الشركة ولا يفتحها إلا بدفع فدية بالبيتكوين (أخطر نوع حالياً).</li>
                        <li><strong>Trojan Horse (حصان طروادة):</strong> برنامج يبدو مفيداً (مثل لعبة أو برنامج تفعيل) لكنه يفتح باباً خلفياً للهكر في جهازك.</li>
                        <li><strong>Worms (الديدان):</strong> فيروس ذكي جداً، لا يحتاج لتدخل منك لينتشر. بمجرد دخوله الشبكة، يستغل الـ CCNA (عناوين الـ IP والمنافذ المفتوحة) لينسخ نفسه لكل الأجهزة في الشركة!</li>
                    </ul>
                `
            },
            {
                id: "lesson12_3",
                title: "3. الهندسة الاجتماعية (Social Engineering)",
                content: `
                    <h1>اختراق العقول بدلاً من الأجهزة!</h1>
                    <p>أحياناً تكون شبكة الشركة مؤمنة بأقوى أجهزة الـ Firewalls والراوترات من Cisco، ويكون اختراقها تقنياً شبه مستحيل.</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">أضعف حلقة في الأمن السيبراني: الموظف!</h3>
                        <p>الهندسة الاجتماعية هي فن التلاعب بالبشر لجعلهم يفصحون عن معلومات سرية أو يفتحون روابط ملغمة. <strong>(لا يوجد Firewall يستطيع حماية الشركة من غباء موظف!)</strong>.</p>
                        
                        <h3>أشهر طرقها:</h3>
                        <ul>
                            <li><strong>Phishing (التصيد الاحتيالي):</strong> إيميل مزيف يبدو كأنه من البنك أو مديرك يطلب منك إدخال باسووردك لتحديث بياناتك.</li>
                            <li><strong>Baiting (الطُعم):</strong> أن يترك الهكر فلاشة (USB) ملغمة في جراج الشركة، فيجدها موظف فضولي ويضعها في جهازه لمعرفة ما بها، فيتم اختراق الشبكة من الداخل!</li>
                            <li><strong>Tailgating:</strong> أن يتظاهر الهكر بأنه عامل توصيل بيتزا ويدخل خلف موظف يحمل بطاقة دخول لغرفة السيرفرات.</li>
                        </ul>
                    </div>

                    <p><em>🚀 بعد أن أنهينا هذا الجزء التأسيسي العملاق.. حان الوقت لنرتدي القبعة البيضاء (White Hat)، وندخل في مسار الـ Penetration Testing واصطياد الثغرات! هل أنت مستعد للبدء في الهجوم؟</em></p>
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
