const academyData = [
    {
        chapter: "المرحلة الأولى: أساسيات الشبكات",
        lessons: [
            {
                id: "lesson1",
                title: "1. ما هي الشبكات؟ وأنواعها",
                content: `
                    <h1>مفهوم الشبكات (What is a Network?)</h1>
                    <p>الشبكة ببساطة هي جهازي كمبيوتر أو أكثر متصلين ببعضهم البعض بهدف <strong>مشاركة الموارد (Resources)</strong> مثل الملفات، الطابعات، أو الاتصال بالإنترنت.</p>
                    
                    <div class="concept-box">
                        <h3>لماذا نحتاج الشبكات؟</h3>
                        <ul>
                            <li><strong>مشاركة الموارد:</strong> تخيل شركة بها 50 موظف، بدلاً من شراء 50 طابعة، نشتري طابعة واحدة ونربطها بالشبكة!</li>
                            <li><strong>التواصل السريع:</strong> إرسال الإيميلات والمحادثات.</li>
                            <li><strong>الوصول للبيانات المركزية:</strong> حفظ ملفات الشركة على سيرفر واحد (File Server) يصل إليه الجميع.</li>
                        </ul>
                    </div>

                    <h2>أنواع الشبكات حسب المساحة الجغرافية:</h2>
                    
                    <pre style="background: #0d1117; padding: 15px; border-radius: 8px; border: 1px solid var(--border); overflow-x: auto; color: #58a6ff;">
[PC]---[Switch]---[Router]==========[ISP]==========[Router]---[Switch]---[PC]
        LAN        ←――――――――――――→  WAN (Internet)  ←――――――――――――→       LAN
                    </pre>

                    <h3>1. شبكة الـ LAN (Local Area Network)</h3>
                    <p>هي الشبكة المحلية. تغطي مساحة صغيرة مثل مكتب، منزل، أو مبنى واحد. تتميز بسرعتها العالية وسهولة إدارتها.</p>

                    <h3>2. شبكة الـ WAN (Wide Area Network)</h3>
                    <p>هي الشبكة الواسعة. تربط بين مدن أو دول مختلفة. أبطأ من الـ LAN وتعتمد على مزودي خدمة الإنترنت (ISPs) وشركات الاتصالات.</p>

                    <h3>3. شبكة الـ MAN (Metropolitan Area Network)</h3>
                    <p>تغطي مساحة متوسطة مثل مدينة أو حرم جامعي ضخم. وهي أكبر من الـ LAN وأصغر من الـ WAN.</p>

                    <h3>جدول مقارنة سريع</h3>
                    <table style="width:100%; border-collapse: collapse; margin-top: 15px; text-align: right;">
                        <tr style="background: rgba(88,166,255,0.1); border-bottom: 1px solid var(--border);">
                            <th style="padding: 10px;">النوع</th>
                            <th style="padding: 10px;">المساحة</th>
                            <th style="padding: 10px;">السرعة</th>
                            <th style="padding: 10px;">التكلفة</th>
                            <th style="padding: 10px;">التحكم</th>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px; color: var(--accent);">LAN</td>
                            <td style="padding: 10px;">مبنى/منزل</td>
                            <td style="padding: 10px;">عالية جداً</td>
                            <td style="padding: 10px;">منخفضة</td>
                            <td style="padding: 10px;">كامل (أنت تديرها)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 10px; color: #ffb020;">MAN</td>
                            <td style="padding: 10px;">مدينة/حرم جامعي</td>
                            <td style="padding: 10px;">متوسطة</td>
                            <td style="padding: 10px;">متوسطة</td>
                            <td style="padding: 10px;">مشترك</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; color: var(--danger);">WAN</td>
                            <td style="padding: 10px;">دول/قارات</td>
                            <td style="padding: 10px;">متغيرة (حسب الـ ISP)</td>
                            <td style="padding: 10px;">عالية</td>
                            <td style="padding: 10px;">مزود الخدمة (ISP)</td>
                        </tr>
                    </table>
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
                id: "lesson2",
                title: "2. أجهزة الشبكة الأساسية",
                content: `
                    <h1>أجهزة الشبكات (Network Devices)</h1>
                    <p>لتكوين شبكة، نحتاج إلى أجهزة فيزيائية (Hardware) تقوم بتوجيه ونقل البيانات. إليك أهم 4 أجهزة:</p>
                    
                    <div class="concept-box">
                        <h3>1. الموزع (Hub) - "الغبي"</h3>
                        <p>جهاز قديم جداً وظيفته ربط الأجهزة ببعضها في شبكة LAN. لكنه يفتقر للذكاء؛ عندما يصله ملف من جهاز (A) ويريد إرساله لجهاز (B)، فإنه يقوم بإرسال الملف <strong>لجميع الأجهزة</strong> المتصلة به! وهذا يسبب بطئاً شديداً وانعداماً للأمان.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">2. المحول (Switch) - "الذكي"</h3>
                        <p>هو بديل الـ Hub الحديث. جهاز ذكي جداً يربط أجهزة الـ LAN. عندما تصل رسالة من جهاز (A) إلى (B)، فإنه يقرأ العنوان (MAC Address) ويرسل الرسالة إلى جهاز (B) <strong>فقط</strong>. يتميز بالسرعة والأمان ولا يسبب اختناقاً في الشبكة.</p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">3. الموجه (Router) - "بوابة العبور"</h3>
                        <p>إذا كان السويتش يربط أجهزة <em>نفس الشبكة</em>، فإن الراوتر وظيفته ربط <strong>شبكات مختلفة</strong> ببعضها البعض! الراوتر يقرأ عناوين الـ IP ويختار أفضل مسار لنقل البيانات من بلد لآخر أو من شبكتك المنزلية إلى الإنترنت.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">4. الجدار الناري (Firewall) - "حارس الأمن"</h3>
                        <p>جهاز (أو برنامج) يقف بين شبكتك الداخلية والإنترنت، ويقوم بفحص كل ما يدخل وما يخرج. إذا وجد زيارة من موقع خبيث أو هجوم، فإنه يقوم بـ <em>حظر (Block)</em> الاتصال فوراً.</p>
                    </div>
                `
            },
            {
                id: "lesson3",
                title: "3. طوبولوجيا الشبكات",
                content: `
                    <h1>طوبولوجيا الشبكات (Network Topologies)</h1>
                    <p>الطوبولوجيا هي الطريقة أو "الرسم الهندسي" الذي نستخدمه لتوصيل الأجهزة ببعضها البعض في الشبكة.</p>

                    <h2>Physical vs Logical</h2>
                    <ul>
                        <li><strong>Physical Topology:</strong> هو الشكل المادي الحقيقي للكابلات والأجهزة على أرض الواقع.</li>
                        <li><strong>Logical Topology:</strong> هي الطريقة التي تسري بها الإشارات الكهربائية والبيانات داخل الأسلاك بغض النظر عن الشكل الخارجي.</li>
                    </ul>

                    <h2>أشهر أنواع الـ Topologies:</h2>
                    
                    <div class="concept-box">
                        <h3>1. Star Topology (النجمة) - "الأكثر استخداماً"</h3>
                        <p>تتصل جميع الأجهزة بجهاز مركزي واحد (عادة يكون Switch). في هذا النوع، إذا انقطع سلك جهاز معين، ينفصل هو فقط وتستمر باقي الشبكة في العمل. <em>لكن إذا تعطل الـ Switch، تتعطل الشبكة بالكامل.</em></p>
                    </div>

                    <div class="concept-box">
                        <h3>2. Mesh Topology (الشبكة العنكبوتية) - "الأعلى تكلفة وموثوقية"</h3>
                        <p>كل جهاز في الشبكة متصل بكل جهاز آخر بكابل مستقل! إذا انقطع كابل، توجد مسارات بديلة فوراً. يُستخدم في الأماكن الحساسة (مثل المستشفيات والمطارات) حيث يمنع انقطاع الاتصال بأي ثمن.</p>
                    </div>

                    <div class="concept-box">
                        <h3>3. Bus Topology (الناقل) - "القديم"</h3>
                        <p>كابل واحد رئيسي (Backbone) تتصل به جميع الأجهزة. إذا انقطع هذا الكابل الرئيسي في أي نقطة، <strong>تسقط الشبكة بأكملها</strong>.</p>
                    </div>

                    <div class="concept-box">
                        <h3>4. Ring Topology (الحلقة)</h3>
                        <p>الأجهزة متصلة ببعضها على شكل حلقة مغلقة. تنتقل البيانات في اتجاه واحد، وتمر على الأجهزة تباعاً حتى تصل للهدف. إذا فشل جهاز واحد، تتوقف الحلقة.</p>
                    </div>
                `
            },
            {
                id: "lesson4",
                title: "4. الكابلات وسرعة الشبكة",
                content: `
                    <h1>الكابلات ومفاهيم السرعة</h1>
                    
                    <h2>أنواع الكابلات (Cables)</h2>
                    <p>الكابلات هي الشرايين التي تنقل البيانات. إليك أشهرها:</p>
                    <ul>
                        <li><strong>1. الكابلات النحاسية (Copper - Twisted Pair):</strong> هي كابلات الإنترنت المنزلية (مثل Cat5, Cat6). رخيصة ومناسبة للمسافات القصيرة (حتى 100 متر)، لكنها تتأثر بالتشويش الكهرومغناطيسي (EMI).</li>
                        <li><strong>2. الألياف الضوئية (Fiber Optic):</strong> تنقل البيانات باستخدام <em>الضوء</em> داخل أنابيب زجاجية دقيقة. سرعتها خيالية، تسافر لمسافات طويلة جداً (كيلومترات)، ولا تتأثر بالتشويش. تُستخدم بين القارات وفي مراكز البيانات الضخمة (Data Centers).</li>
                        <li><strong>3. الكابلات المحورية (Coaxial):</strong> كابلات النحاس السميكة المستخدمة في أطباق الدش وكاميرات المراقبة القديمة. قوية لكنها أصبحت نادرة في شبكات الكمبيوتر الحديثة.</li>
                    </ul>

                    <h2>مفاهيم قياس كفاءة الشبكة</h2>
                    
                    <div class="concept-box">
                        <h3>1. عرض النطاق الترددي (Bandwidth)</h3>
                        <p>هو "السعة القصوى" للماسورة. أقصى كمية بيانات <em>يمكن</em> نقلها في الثانية الواحدة. يقاس بـ Mbps (ميجابت في الثانية). على سبيل المثال، اشتراكك 100 ميجا هو الـ Bandwidth.</p>
                    </div>

                    <div class="concept-box">
                        <h3>2. الإنتاجية الفعلية (Throughput)</h3>
                        <p>هي السرعة "الفعلية" التي تحصل عليها على أرض الواقع في تلك اللحظة. عادة تكون أقل من الـ Bandwidth بسبب التشويش، عدد المستخدمين، وتأخير السيرفر.</p>
                    </div>

                    <div class="concept-box">
                        <h3>3. التأخير (Latency / Ping)</h3>
                        <p>هو الوقت الذي تستغرقه قطعة بيانات (Packet) لتسافر من جهازك إلى السيرفر وتعود إليك مرة أخرى. يُقاس بالمللي ثانية (ms). في ألعاب الأونلاين والمكالمات، يُفضل أن يكون التأخير أقل ما يمكن.</p>
                    </div>
                `
            }
        ]
    },
    {
        chapter: "المرحلة الثانية: بروتوكولات الشبكات",
        lessons: [
            {
                id: "lesson2_1",
                title: "1. عناوين الشبكة (IPv4 & IPv6)",
                content: `
                    <h1>بروتوكول الإنترنت (IP)</h1>
                    <p>عنوان الـ IP هو الرقم التعريفي لأي جهاز متصل بالشبكة، وبدونه لا يمكن للأجهزة التخاطب مع بعضها. تماماً كأرقام الهواتف.</p>

                    <div class="concept-box">
                        <h3>الإصدار الرابع (IPv4)</h3>
                        <p>يتكون من 32 بت، ويُكتب على شكل 4 مقاطع (Octets) تفصلها نقطة. مثال: <strong>192.168.1.10</strong></p>
                        <p>بسبب التطور وزيادة عدد الأجهزة، أوشكت عناوين الـ IPv4 على الانتهاء (حوالي 4.3 مليار عنوان فقط).</p>
                        <ul>
                            <li><strong>Public IP:</strong> عنوان عام يُستخدم للوصول للإنترنت.</li>
                            <li><strong>Private IP:</strong> عنوان محلي داخل شبكتك (مثل 192.168.x.x) لا يمكن تصفح الإنترنت به مباشرة (يحتاج للـ NAT).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">الإصدار السادس (IPv6)</h3>
                        <p>هو الحل لمشكلة نفاد العناوين. يتكون من 128 بت ويُكتب بالنظام السداسي عشري (Hexadecimal). مثال:</p>
                        <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>
                        <p>يوفر عدداً لا نهائياً تقريباً من العناوين!</p>
                    </div>
                `
            },
            {
                id: "lesson2_2",
                title: "2. تقسيم الشبكات (Subnetting)",
                content: `
                    <h1>مقدمة في الـ Subnetting</h1>
                    <p>الـ Subnetting هو عملية تقسيم شبكة كبيرة (تحتوي على عدد هائل من الـ IPs) إلى شبكات فرعية أصغر. لماذا؟</p>
                    <ul>
                        <li><strong>توفير العناوين:</strong> لكي لا نهدر عناوين الـ IP.</li>
                        <li><strong>الأمان:</strong> فصل أقسام الشركة عن بعضها (قسم الحسابات معزول عن قسم المبيعات).</li>
                        <li><strong>تقليل الزحام:</strong> تقليل الـ Broadcast Domain وتسريع الشبكة.</li>
                    </ul>

                    <div class="concept-box">
                        <h3>قناع الشبكة (Subnet Mask)</h3>
                        <p>هو رقم يُحدد أي جزء من عنوان الـ IP يُمثل "الشبكة" وأي جزء يُمثل "الجهاز" (Host).<br>
                        مثال: <code>255.255.255.0</code> أو <code>/24</code> (يعني أول 3 أرقام للشبكة، والرقم الأخير للجهاز).</p>
                    </div>

                    <p><em>💡 نصيحة: الـ Subnetting يحتاج إلى تدريب يومي بالورقة والقلم، وسنوفر لك تمارين عليه لاحقاً في المحاكي!</em></p>
                `
            },
            {
                id: "lesson2_3",
                title: "3. بروتوكولات النقل (TCP vs UDP)",
                content: `
                    <h1>كيف تنتقل البيانات؟ (Transport Layer)</h1>
                    <p>عند إرسال البيانات عبر الشبكة، تُستخدم طريقتان أساسيتان للنقل:</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">1. بروتوكول الـ TCP (الموثوق)</h3>
                        <p>يعتمد على التأكد من وصول البيانات بالكامل وبنفس الترتيب. إذا سقطت حزمة (Packet)، يطلب إعادة إرسالها.</p>
                        <ul>
                            <li>يستخدم تقنية المصافحة الثلاثية <strong>Three-Way Handshake</strong> قبل بدء الاتصال (SYN, SYN-ACK, ACK).</li>
                            <li><strong>استخداماته:</strong> تصفح الويب (HTTP/HTTPS)، إرسال الإيميلات، تحميل الملفات (أي شيء يحتاج دقة 100%).</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">2. بروتوكول الـ UDP (السريع)</h3>
                        <p>يرسل البيانات بأقصى سرعة ممكنة <strong>بدون التأكد</strong> من وصولها! لا يوجد به إعادة إرسال ولا مصافحة.</p>
                        <ul>
                            <li><strong>استخداماته:</strong> البث المباشر (Live Streaming)، الألعاب الأونلاين، مكالمات الصوت والفيديو. (لأن السرعة هنا أهم من الدقة.. لا يهم إذا ضاعت لقطة قصيرة من الفيديو، المهم ألا يتوقف البث).</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "lesson2_4",
                title: "4. طبقة التطبيقات (Application Layer)",
                content: `
                    <h1>خدمات التطبيقات المشهورة</h1>
                    <p>هي البروتوكولات التي نستخدمها في حياتنا اليومية وتتفاعل مع البرامج المتصفحات:</p>

                    <ul>
                        <li><strong style="color:var(--accent);">DNS (Domain Name System):</strong> دليلك في الإنترنت. يترجم الأسماء مثل <code>google.com</code> إلى أرقام IP، لأن الكمبيوتر لا يفهم الأسماء. يعمل على بورت 53 (UDP).</li>
                        <br>
                        <li><strong style="color:var(--accent);">DHCP (Dynamic Host Configuration Protocol):</strong> السيرفر المريح. يقوم بتوزيع عناوين الـ IP على الأجهزة في شبكتك أوتوماتيكياً (بمجرد اتصالك بالواي فاي، هو من يعطيك الـ IP). يعمل على بورت 67/68.</li>
                        <br>
                        <li><strong style="color:var(--accent);">HTTP / HTTPS:</strong> بروتوكولات تصفح المواقع. الـ HTTPS هو النسخة المشفرة والآمنة (بورت 443).</li>
                        <br>
                        <li><strong style="color:var(--accent);">SSH (Secure Shell):</strong> يستخدم للتحكم وإدارة الأجهزة والراوترات عن بُعد بشكل <strong>مشفر</strong> (بورت 22). وهو بديل بروتوكول Telnet القديم والخطير.</li>
                    </ul>
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
    }
];

function renderSidebar() {
    const toc = document.getElementById('tocPanel');
    toc.innerHTML = '';
    
    academyData.forEach(chapter => {
        const title = document.createElement('div');
        title.className = 'chapter-title';
        title.innerText = chapter.chapter;
        toc.appendChild(title);
        
        chapter.lessons.forEach(lesson => {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            btn.id = 'btn-' + lesson.id;
            btn.innerText = lesson.title;
            btn.onclick = () => loadLesson(lesson.id);
            toc.appendChild(btn);
        });
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
