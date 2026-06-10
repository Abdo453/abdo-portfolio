const academyData = [
    {
        chapter: "Domain 1: Network Fundamentals",
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
                id: "fund_osi_tcp",
                title: "2. The OSI & TCP/IP Models (Deep Dive)",
                content: `
                    <h1>The OSI & TCP/IP Models</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم لماذا نحتاج إلى نماذج مرجعية (Reference Models).</li>
                            <li>حفظ وفهم الطبقات السبعة لنموذج OSI والطبقات الأربعة لنموذج TCP/IP.</li>
                            <li>فهم عملية التغليف (Encapsulation) وفك التغليف (Decapsulation).</li>
                            <li>معرفة مكان عمل كل جهاز شبكي (Switch, Router, Firewall) داخل هذه الطبقات.</li>
                        </ul>
                    </div>

                    <h2>1. لماذا نحتاج إلى OSI Model؟ (Theory)</h2>
                    <p>في الماضي، كانت كل شركة (مثل IBM أو Apple) تصنع أجهزة تتحدث لغة خاصة بها، ولا يمكن لجهاز IBM أن يتصل بجهاز Apple. لحل هذه المشكلة، اجتمعت منظمة <strong>ISO</strong> عام 1984 وأصدرت معيار <strong>OSI (Open Systems Interconnection)</strong>.</p>
                    <p>نموذج OSI هو <strong>نموذج مرجعي (Reference Model)</strong> نظري يقسم عملية الاتصال إلى 7 طبقات محددة الوظائف، لضمان التوافق (Interoperability) بين جميع الأجهزة في العالم.</p>

                    <h2>2. الطبقات السبعة (The 7 Layers)</h2>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                        <div style="padding: 10px; background: #238636; color: white; border-radius: 5px;"><strong>7. Application (التطبيقات):</strong> واجهة المستخدم والتطبيقات (HTTP, FTP, DNS).</div>
                        <div style="padding: 10px; background: #2ea043; color: white; border-radius: 5px;"><strong>6. Presentation (التقديم):</strong> تشفير البيانات (Encryption)، ضغطها (Compression)، وصيغتها (JPEG, ASCII).</div>
                        <div style="padding: 10px; background: #3fb950; color: white; border-radius: 5px;"><strong>5. Session (الجلسة):</strong> فتح، إدارة، وإغلاق جلسات الاتصال بين التطبيقات.</div>
                        <div style="padding: 10px; background: #d29922; color: white; border-radius: 5px;"><strong>4. Transport (النقل):</strong> تقطيع البيانات، ضمان الوصول (TCP) أو السرعة (UDP)، استخدام الـ Ports. <br><em>(PDU: Segment)</em></div>
                        <div style="padding: 10px; background: #f85149; color: white; border-radius: 5px;"><strong>3. Network (الشبكة):</strong> التوجيه (Routing) باستخدام IP Address. هنا يعمل الـ Router. <br><em>(PDU: Packet)</em></div>
                        <div style="padding: 10px; background: #8957e5; color: white; border-radius: 5px;"><strong>2. Data Link (ربط البيانات):</strong> التوصيل المحلي باستخدام MAC Address واكتشاف الأخطاء (FCS). هنا يعمل الـ Switch. <br><em>(PDU: Frame)</em></div>
                        <div style="padding: 10px; background: #58a6ff; color: white; border-radius: 5px;"><strong>1. Physical (الفيزيائية):</strong> الكابلات، الإشارات الكهربائية، موجات الراديو، وتحويل البيانات إلى Bits (0, 1). هنا يعمل الـ Hub/Cable. <br><em>(PDU: Bits)</em></div>
                    </div>

                    <h2 style="margin-top: 30px;">3. عملية التغليف وفك التغليف (Encapsulation & Decapsulation)</h2>
                    <p>عندما ترسل رسالة (مثلاً إيميل)، فإنها تنزل من الطبقة السابعة إلى الأولى. في كل طبقة يتم إضافة <strong>Header (ترويسة)</strong> تحتوي على معلومات خاصة بتلك الطبقة.</p>
                    
                    <div class="concept-box">
                        <h3>Encapsulation (عند المُرسل)</h3>
                        <ol>
                            <li><strong>Data:</strong> الرسالة الأصلية (L7, L6, L5).</li>
                            <li><strong>Segment:</strong> في طبقة الـ Transport، يتم إضافة (Source/Destination Port).</li>
                            <li><strong>Packet:</strong> في طبقة الـ Network، يتم إضافة (Source/Destination IP).</li>
                            <li><strong>Frame:</strong> في طبقة الـ Data Link، يتم إضافة (Source/Destination MAC) وإضافة ذيل (FCS) في النهاية لاكتشاف الأخطاء.</li>
                            <li><strong>Bits:</strong> في الطبقة الفيزيائية تتحول لـ نبضات كهربائية 0 و 1.</li>
                        </ol>
                    </div>

                    <p>عند المستقبل، يحدث العكس تماماً <strong>Decapsulation</strong> حيث يتم نزع الترويسات طبقة بطبقة صعوداً حتى تصل الرسالة للتطبيق.</p>

                    <h2>4. نموذج TCP/IP (The Practical Model)</h2>
                    <p>بينما OSI هو النموذج النظري، فإن <strong>TCP/IP</strong> (ويعرف بـ DoD Model) هو النموذج المُطبق فعلياً في الإنترنت اليوم، ويتكون من 4 طبقات (أو 5 في النسخة المحدثة):</p>
                    <ul>
                        <li><strong>Application Layer:</strong> تدمج (L5, L6, L7) من OSI.</li>
                        <li><strong>Transport Layer:</strong> تقابل الـ Transport في OSI.</li>
                        <li><strong>Internet Layer:</strong> تقابل الـ Network في OSI.</li>
                        <li><strong>Network Access Layer:</strong> تدمج (Data Link & Physical) في النسخة القديمة، وتفصلهم في النسخة الحديثة.</li>
                    </ul>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">⚠️ الأخطاء الشائعة (Common Mistakes)</h3>
                        <ul>
                            <li><strong>الخلط بين السويتش والراوتر:</strong> السويتش يقرأ الـ MAC (Layer 2) فقط ولا يفهم الـ IP. الراوتر يقرأ الـ IP (Layer 3) ويوجه بناءً عليه.</li>
                            <li><strong>الخلط بين الـ Header والـ Trailer:</strong> جميع الطبقات تضيف Header في المقدمة، إلا طبقة الـ Data Link تضيف Header (للماك) وتضيف Trailer (للـ FCS) في النهاية.</li>
                            <li><strong>مسمى الـ PDU:</strong> في L4 تسمى Segment، في L3 تسمى Packet، في L2 تسمى Frame. هذه المسميات دقيقة جداً في المقابلات!</li>
                        </ul>
                    </div>
                `
            },

            
            {
                id: "fund_ethernet",
                title: "3. Ethernet, MAC, and ARP (Layer 2)",
                content: `
                    <h1>Ethernet & Layer 2 Fundamentals</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم معيار Ethernet وهيكل الـ Ethernet Frame (MTU).</li>
                            <li>شرح عناوين الـ MAC Address وكيفية كتابتها.</li>
                            <li>التفريق بين Broadcast Domain و Collision Domain.</li>
                            <li>فهم بروتوكول ARP وكيف يربط بين Layer 2 و Layer 3.</li>
                            <li>معرفة مفاهيم Duplex و Speed و CSMA/CD.</li>
                        </ul>
                    </div>

                    <h2>1. معيار Ethernet والـ Frame (Ethernet Frame & MTU)</h2>
                    <p>الـ <strong>Ethernet (IEEE 802.3)</strong> هو المعيار الأكثر استخداماً في شبكات הـ LAN اليوم. في طبقة الـ Data Link، يتم تغليف البيانات داخل <strong>Frame</strong>.</p>
                    <div class="concept-box">
                        <h3>مكونات الـ Ethernet Frame:</h3>
                        <ul>
                            <li><strong>Preamble (8 Bytes):</strong> يستخدم لمزامنة الاتصال وتنبيه المستقبل بقدوم إطار جديد.</li>
                            <li><strong>Destination MAC (6 Bytes):</strong> عنوان المستلم.</li>
                            <li><strong>Source MAC (6 Bytes):</strong> عنوان المُرسل.</li>
                            <li><strong>Type/Length (2 Bytes):</strong> يحدد نوع البروتوكول في الطبقة الثالثة (مثلاً IPv4 قيمته 0x0800).</li>
                            <li><strong>Payload/Data (46 - 1500 Bytes):</strong> البيانات الفعلية (Packet). أقصى حجم لها هو 1500 بايت وهو ما يُعرف بـ <strong>MTU (Maximum Transmission Unit)</strong>.</li>
                            <li><strong>FCS (4 Bytes):</strong> يستخدم لاكتشاف الأخطاء (Frame Check Sequence).</li>
                        </ul>
                    </div>

                    <h2>2. عنوان הـ MAC Address</h2>
                    <p>هو عنوان فيزيائي (Physical Address) محروق على كرت الشبكة (NIC) ولا يتغير. حجمه <strong>48 بت (6 بايت)</strong> ويُكتب بالنظام السداسي عشر (Hexadecimal).</p>
                    <ul>
                        <li><strong>أول 24 بت:</strong> تُسمى OUI (Organizationally Unique Identifier) وتحدد الشركة المصنعة (مثل Cisco أو Apple).</li>
                        <li><strong>آخر 24 بت:</strong> رقم تسلسلي فريد للكرت.</li>
                    </ul>

                    <h2>3. التصادم والبث (Collision Domain vs Broadcast Domain)</h2>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px;">
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #ffb020;">Collision Domain</h3>
                            <p>هو النطاق الذي إذا أرسل فيه جهازان بيانات في نفس الوقت سيحدث <strong>تصادم (Collision)</strong>.</p>
                            <ul>
                                <li>الـ <strong>Hub</strong>: يعتبر Collision Domain واحد مهما كثرت منافذه.</li>
                                <li>الـ <strong>Switch</strong>: كل منفذ (Port) فيه يعتبر Collision Domain مستقل (مما يمنع التصادمات).</li>
                            </ul>
                        </div>
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #f85149;">Broadcast Domain</h3>
                            <p>هو النطاق الذي تصل إليه رسالة البث (Broadcast Message). مثال: رسالة ARP أو DHCP.</p>
                            <ul>
                                <li>الـ <strong>Switch</strong>: يعتبر Broadcast Domain واحد (إلا إذا استخدمنا VLANs).</li>
                                <li>الـ <strong>Router</strong>: يوقف البث (Broadcasts do not cross routers)، فكل منفذ في الراوتر هو Broadcast Domain مستقل.</li>
                            </ul>
                        </div>
                    </div>

                    <h2 style="margin-top: 30px;">4. بروتوكول ARP (Address Resolution Protocol)</h2>
                    <p>عندما يريد جهاز إرسال بيانات إلى IP معين، فإنه يحتاج إلى الـ MAC Address الخاص بذلك الجهاز (لأن السويتش لا يفهم IP). هنا يأتي دور الـ ARP.</p>
                    <ol>
                        <li>يبحث الجهاز في الـ <strong>ARP Cache</strong> (ذاكرة التخزين المؤقتة).</li>
                        <li>إذا لم يجده، يرسل رسالة <strong>ARP Request</strong> للجميع (Broadcast) يقول فيها: "من يمتلك الـ IP الفلاني؟ فليرسل لي الـ MAC الخاص به".</li>
                        <li>يرد صاحب الـ IP برسالة <strong>ARP Reply</strong> (Unicast) تحتوي على הـ MAC الخاص به.</li>
                    </ol>

                    <h2>5. مفاهيم הـ Duplex و Speed و CSMA/CD</h2>
                    <ul>
                        <li><strong>Half-Duplex:</strong> يمكن للجهاز الإرسال والاستقبال، ولكن ليس في نفس الوقت (مثل اللاسلكي أو הـ Hub القديم).</li>
                        <li><strong>Full-Duplex:</strong> يمكن للجهاز الإرسال والاستقبال في نفس الوقت (السويتشات الحديثة).</li>
                        <li><strong>CSMA/CD:</strong> بروتوكول قديم كان يستخدم في الـ Half-Duplex لاكتشاف التصادمات وإيقاف الإرسال وإعادة المحاولة بعد وقت عشوائي.</li>
                    </ul>
                `
            },

            
            {
                id: "fund_ipv4_subnetting",
                title: "4. IPv4, Binary, and Subnetting",
                content: `
                    <h1>IPv4 & Subnetting (The Backbone of CCNA)</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم هيكل الـ IPv4 والتحويل بين الـ Binary والـ Decimal.</li>
                            <li>معرفة الـ Classes الخاصة بالـ IP (A, B, C, D, E).</li>
                            <li>التفريق بين الـ Public IP والـ Private IP.</li>
                            <li>احتراف الـ Subnetting ومفاهيم FLSM و VLSM و CIDR.</li>
                        </ul>
                    </div>

                    <h2>1. نظام הـ IPv4 والـ Binary Math</h2>
                    <p>الـ IPv4 يتكون من <strong>32 بت</strong>، مقسمة إلى 4 أقسام (Octets)، كل قسم 8 بت.</p>
                    <p>لتحويل أي رقم IP، نستخدم مضاعفات العدد 2 (من اليمين لليسار):</p>
                    <div style="background: var(--bg-color); padding: 15px; border-radius: 5px; font-family: monospace; font-size: 1.2rem; text-align: center; letter-spacing: 2px;">
                        128 - 64 - 32 - 16 - 8 - 4 - 2 - 1
                    </div>
                    <p>مثال: الرقم 192 بالـ Binary هو (11000000) لأنه (128 + 64 = 192).</p>

                    <h2>2. فئات العناوين (IP Classes)</h2>
                    <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
                        <tr style="background: rgba(255,255,255,0.1);">
                            <th style="padding: 10px; border: 1px solid var(--border);">Class</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">Range</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">Default Subnet Mask</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">Use</th>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">A</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">1 - 126</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">255.0.0.0 (/8)</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">الشركات الضخمة</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">B</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">128 - 191</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">255.255.0.0 (/16)</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">الشركات المتوسطة</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">C</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">192 - 223</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">255.255.255.0 (/24)</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">الشبكات الصغيرة والمنازل</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">D</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">224 - 239</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">N/A</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Multicast (مثل OSPF)</td>
                        </tr>
                    </table>

                    <div class="concept-box" style="margin-top: 20px;">
                        <h3>Private vs Public IPs</h3>
                        <p>الـ Public IP يُشترى بالمال ويستخدم في الإنترنت، أما الـ Private IP فهو مجاني ويستخدم داخل شبكتك المحلية (LAN) ولا يخرج للإنترنت إلا بوجود NAT. نطاقات הـ Private هي:</p>
                        <ul>
                            <li><strong>Class A:</strong> 10.0.0.0 to 10.255.255.255</li>
                            <li><strong>Class B:</strong> 172.16.0.0 to 172.31.255.255</li>
                            <li><strong>Class C:</strong> 192.168.0.0 to 192.168.255.255</li>
                        </ul>
                    </div>

                    <h2>3. الـ Subnetting و CIDR و FLSM و VLSM</h2>
                    <p>الـ Subnetting هو استعارة Bits من جزء الـ Host لتكبير جزء الـ Network لتقسيم الشبكة الكبيرة إلى شبكات صغيرة (لتوفير الـ IPs وتقليل הـ Broadcast).</p>
                    
                    <ul>
                        <li><strong>CIDR (Classless Inter-Domain Routing):</strong> هو التعبير عن הـ Mask بالشرطة المائلة. مثلاً <code>/26</code> يعني أن 26 بت محجوزة للشبكة، ومتبقي 6 بت للأجهزة.</li>
                        <li><strong>FLSM (Fixed Length Subnet Mask):</strong> جميع الشبكات الفرعية لها نفس الحجم ونفس الـ Mask. (يؤدي لهدر العناوين).</li>
                        <li><strong>VLSM (Variable Length Subnet Mask):</strong> كل شبكة فرعية تأخذ Mask يناسب عدد أجهزتها بالضبط. (مثال: شبكة بين راوترين تأخذ <code>/30</code> لتعطينا 2 IP صالحين فقط).</li>
                    </ul>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">كيف تحسب הـ Subnetting بثواني (Magic Number)?</h3>
                        <ol>
                            <li>احسب الـ Block Size (Magic Number) عن طريق طرح قيمة الـ Mask في الـ Octet المثير للاهتمام من 256.</li>
                            <li><strong>مثال:</strong> <code>192.168.1.0/26</code> -> الـ Mask هو 255.255.255.192.</li>
                            <li>الـ Magic Number = 256 - 192 = <strong>64</strong>.</li>
                            <li>إذن الشبكات ستقفز بـ 64: (الشبكة الأولى .0، الثانية .64، الثالثة .128، الرابعة .192).</li>
                        </ol>
                    </div>
                `
            },

            
            {
                id: "fund_ipv6_wireless",
                title: "5. IPv6 & Wireless Basics",
                content: `
                    <h1>IPv6 & Wireless Fundamentals</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>معرفة هيكل عناوين IPv6 ولماذا انتقلنا إليها.</li>
                            <li>طرق اختصار عناوين الـ IPv6.</li>
                            <li>أنواع رسائل الـ IPv6 (Unicast, Multicast, Anycast).</li>
                            <li>التعرف على أساسيات الشبكات اللاسلكية (Wireless LAN).</li>
                            <li>التفريق بين WLC و Autonomous APs.</li>
                        </ul>
                    </div>

                    <h2>1. لماذا نحتاج إلى IPv6؟</h2>
                    <p>الـ IPv4 يوفر حوالي 4.3 مليار عنوان، ومع التطور المهول وثورة إنترنت الأشياء (IoT)، نفدت هذه العناوين. لذلك تم اختراع <strong>IPv6</strong> والذي يتكون من <strong>128 بت</strong>، ليوفر عدداً شبه لانهائي من العناوين (340 Undecillion).</p>

                    <h2>2. هيكل IPv6 واختصاراته</h2>
                    <p>يُكتب الـ IPv6 بالنظام السداسي عشر (Hexadecimal) مقسماً إلى 8 أقسام (Hextets)، يفصل بينها نقطتان رأسيتان (<code>:</code>). كل قسم يحتوي على 4 أرقام Hex (16 بت).</p>
                    <div style="background: var(--bg-color); padding: 15px; border-radius: 5px; font-family: monospace; font-size: 1.1rem; text-align: center; margin-bottom: 15px;">
                        2001:0DB8:0000:0000:0008:0800:200C:417A
                    </div>
                    
                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">قواعد الاختصار (Zero Compression)</h3>
                        <ol>
                            <li><strong>إلغاء الأصفار على اليسار (Leading Zeros):</strong> <code>0DB8</code> تصبح <code>DB8</code>. <code>0008</code> تصبح <code>8</code>.</li>
                            <li><strong>استخدام الدبل كولون (::):</strong> يمكن استبدال مجموعة متتالية من الأصفار بـ <code>::</code>. (<strong>ملاحظة هامة:</strong> يمكن استخدامها مرة واحدة فقط في العنوان).</li>
                        </ol>
                        <p>بعد الاختصار يصبح العنوان: <code>2001:DB8::8:800:200C:417A</code></p>
                    </div>

                    <h2>3. أنواع رسائل הـ IPv6</h2>
                    <ul>
                        <li><strong>Unicast:</strong> من جهاز إلى جهاز (One-to-One).</li>
                        <li><strong>Multicast:</strong> من جهاز إلى مجموعة أجهزة (One-to-Many). <em>ملاحظة: تم إلغاء הـ Broadcast تماماً في IPv6 واستبداله بالـ Multicast.</em></li>
                        <li><strong>Anycast:</strong> من جهاز إلى أقرب جهاز متاح (One-to-Nearest). تستخدم غالباً للسيرفرات الموزعة.</li>
                    </ul>

                    <h2>4. الشبكات اللاسلكية (Wireless Basics)</h2>
                    <p>الشبكات اللاسلكية تعتمد على موجات الراديو (RF) بدلاً من الكابلات، وتعمل في معيار <strong>IEEE 802.11 (Wi-Fi)</strong>.</p>
                    <ul>
                        <li><strong>الترددات:</strong> تعمل غالباً على ترددين رئيسيين: <code>2.4 GHz</code> (مدى أطول وسرعة أقل) و <code>5 GHz</code> (مدى أقصر وسرعة أعلى جداً).</li>
                        <li><strong>SSID:</strong> هو اسم الشبكة الذي تراه عند البحث عن Wi-Fi في هاتفك.</li>
                    </ul>

                    <h2>5. بنية הـ Wireless (WLC vs Autonomous AP)</h2>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px;">
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #2ea043;">Autonomous AP</h3>
                            <p>هو جهاز Access Point مستقل (مثل الراوتر المنزلي). يتم إعداده بشكل منفرد. متعب جداً في الشركات الكبرى إذا كان لديك 100 جهاز وتريد تغيير الـ Password.</p>
                        </div>
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #58a6ff;">Lightweight AP & WLC</h3>
                            <p>في الشركات الكبرى، نستخدم أجهزة <strong>LAP (Lightweight Access Point)</strong> "غبية" لا يتم برمجتها، بل تأخذ أوامرها وتهيئة الشبكة من جهاز مركزي يُسمى <strong>WLC (Wireless LAN Controller)</strong>.</p>
                        </div>
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
            },
            {
                id: "lesson5",
                title: "Placeholder lesson5",
                content: `<h1>قريباً</h1>`
            },
            {
                id: "lesson6",
                title: "Placeholder lesson6",
                content: `<h1>قريباً</h1>`
            },
            {
                id: "lesson7",
                title: "Placeholder lesson7",
                content: `<h1>قريباً</h1>`
            },
            {
                id: "lesson8",
                title: "Placeholder lesson8",
                content: `<h1>قريباً</h1>`
            },
        ]
    },
    {
        chapter: "Domain 2: Network Access",
        lessons: [
            
            {
                id: "access_vlan_trunk",
                title: "1. VLANs, Trunks & DTP",
                content: `
                    <h1>VLANs & Trunking (Layer 2)</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم الـ VLAN ولماذا نقسم السويتش افتراضياً.</li>
                            <li>التفريق بين Access Port و Trunk Port.</li>
                            <li>فهم الـ 802.1Q وكيفية عمل הـ Tagging.</li>
                            <li>مفهوم הـ Native VLAN والـ Voice VLAN.</li>
                            <li>بروتوكول DTP والتفاوض التلقائي.</li>
                        </ul>
                    </div>

                    <h2>1. الشبكات الوهمية (VLAN - Virtual LAN)</h2>
                    <p>السويتش افتراضياً عبارة عن <strong>Broadcast Domain واحد</strong>، كل المنافذ تنتمي لـ VLAN 1. الـ VLAN تقوم بتقسيم السويتش الواحد برمجياً إلى عدة سويتشات وهمية (كل VLAN تعتبر Broadcast Domain مستقل وشبكة IP مستقلة).</p>
                    <ul>
                        <li><strong>المزايا:</strong> زيادة الأمان (فصل الأقسام)، تقليل الإزعاج (تقليل البث Broadcast)، وتقليل التكلفة.</li>
                    </ul>

                    <h2>2. أنواع المنافذ (Access vs Trunk)</h2>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px;">
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #2ea043;">Access Port</h3>
                            <p>منفذ ينتمي إلى <strong>VLAN واحدة فقط</strong>. يُوصل غالباً بالأجهزة النهائية (PC, Printer). السويتش يرسل البيانات من هذا المنفذ بدون أي Tag.</p>
                        </div>
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #58a6ff;">Trunk Port</h3>
                            <p>منفذ يمرر بيانات <strong>عدة VLANs في نفس الوقت</strong>. يُوصل غالباً بين سويتشين أو راوتر وسويتش. يستخدم بروتوكول <code>802.1Q</code> لإضافة (Tag) أو ملصق برقم الـ VLAN لكل Frame يمر عبره.</p>
                        </div>
                    </div>

                    <h2 style="margin-top: 30px;">3. الـ Native VLAN و الـ Voice VLAN</h2>
                    <ul>
                        <li><strong>Native VLAN:</strong> في منفذ הـ Trunk، يتم تمرير بيانات هذه الـ VLAN المعينة <strong>بدون Tag (Untagged)</strong> لأسباب التوافقية مع الأجهزة القديمة (Hubs). افتراضياً هي VLAN 1، ويُنصح بشدة بتغييرها لأسباب أمنية (لمنع هجمات VLAN Hopping).</li>
                        <li><strong>Voice VLAN:</strong> تستخدم لهواتف הـ IP Phone. يمرر السويتش بيانات الكمبيوتر في VLAN، وبيانات الصوت في VLAN أخرى على <strong>نفس المنفذ</strong> باستخدام Tag، مع إعطاء أولوية قصوى لبيانات الصوت (QoS).</li>
                    </ul>

                    <h2>4. بروتوكول DTP (Dynamic Trunking Protocol)</h2>
                    <p>بروتوكول خاص بسيسكو (Cisco Proprietary) يقوم بالتفاوض التلقائي لتحديد ما إذا كان المنفذ سيكون Access أو Trunk.</p>
                    <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
                        <tr style="background: rgba(255,255,255,0.1);">
                            <th style="padding: 10px; border: 1px solid var(--border);">وضع المنفذ الأول</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">وضع المنفذ الثاني</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">النتيجة النهائية</th>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Dynamic Auto (Default)</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Dynamic Auto</td>
                            <td style="padding: 10px; border: 1px solid var(--border); color: #f85149;">Access</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Dynamic Desirable</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Dynamic Auto / Desirable</td>
                            <td style="padding: 10px; border: 1px solid var(--border); color: #2ea043;">Trunk</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Trunk</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Dynamic Auto / Desirable</td>
                            <td style="padding: 10px; border: 1px solid var(--border); color: #2ea043;">Trunk</td>
                        </tr>
                    </table>
                    <p><em>نصيحة أمنية: قم دائماً بإلغاء الـ DTP يدوياً بالأمر <code>switchport nonegotiate</code>.</em></p>
                `
            },

            
            {
                id: "access_inter_vlan",
                title: "2. Inter-VLAN Routing (ROAS)",
                content: `
                    <h1>Inter-VLAN Routing</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم مشكلة الاتصال بين الـ VLANs.</li>
                            <li>طريقة الراوتر التقليدية (واجهة لكل VLAN).</li>
                            <li>طريقة Router-on-a-Stick (ROAS).</li>
                            <li>طريقة הـ Layer 3 Switch (SVI).</li>
                        </ul>
                    </div>

                    <h2>1. مشكلة الانعزال (The Isolation Problem)</h2>
                    <p>بمجرد وضع الأجهزة في VLANs مختلفة، فإنها تعيش في Broadcast Domains مختلفة (و Subnets مختلفة). السويتش (Layer 2) لا يمكنه تمرير البيانات بين شبكات مختلفة. الحل؟ نحتاج إلى جهاز (Layer 3) مثل الراوتر.</p>

                    <h2>2. طريقة Router-on-a-Stick (ROAS)</h2>
                    <p>بدلاً من شراء راوتر بـ 50 منفذ لربط 50 VLAN (مكلف جداً وغير منطقي)، نستخدم منفذ <strong>واحد فقط</strong> في الراوتر ونقسمه وهمياً (Logical Division).</p>
                    
                    <div class="concept-box">
                        <h3>كيف تعمل ROAS؟</h3>
                        <ol>
                            <li>نجعل المنفذ في السويتش (المتصل بالراوتر) في وضع <strong>Trunk</strong> ليحمل جميع הـ VLANs.</li>
                            <li>في الراوتر، نشغل المنفذ الرئيسي <code>no shutdown</code> (بدون وضع IP).</li>
                            <li>نقوم بإنشاء <strong>Sub-interfaces</strong> فرعية (مثلاً: <code>int g0/0.10</code>).</li>
                            <li>نقوم بتغليف الواجهة الفرعية برقم الـ VLAN: <code>encapsulation dot1Q 10</code>.</li>
                            <li>نضع الـ IP للواجهة الفرعية ليكون هو الـ Default Gateway للـ PC.</li>
                        </ol>
                    </div>

                    <h2 style="margin-top: 30px;">3. طريقة הـ Layer 3 Switch (SVI)</h2>
                    <p>طريقة الـ ROAS ممتازة للشركات الصغيرة، ولكن في الشركات الكبرى (Enterprise)، كابل واحد للراوتر سيسبب اختناق (Bottleneck). الحل الأفضل هو استخدام <strong>Layer 3 Switch</strong> (سويتش يمتلك قدرات الراوتر).</p>
                    <ul>
                        <li>نقوم بإنشاء واجهة وهمية داخل السويتش لكل VLAN تُسمى <strong>SVI (Switch Virtual Interface)</strong>.</li>
                        <li>مثال: <code>interface vlan 10</code> ثم نضع لها הـ IP Address.</li>
                        <li>يجب تفعيل التوجيه داخل السويتش بالأمر: <code>ip routing</code>.</li>
                        <li>هذه الطريقة أسرع بكثير لأن التوجيه يتم داخل الـ Hardware الخاص بالسويتش دون الحاجة لتمرير البيانات عبر كابل خارجي.</li>
                    </ul>
                `
            },

            
            {
                id: "access_stp",
                title: "3. STP & RSTP (Spanning Tree)",
                content: `
                    <h1>Spanning Tree Protocol (STP & RSTP)</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>معرفة خطر حلقة הـ Switching (Broadcast Storm).</li>
                            <li>طريقة عمل STP في انتخاب الـ Root Bridge.</li>
                            <li>حالات المنافذ في STP و RSTP.</li>
                            <li>كيفية تسريع الشبكة باستخدام PortFast.</li>
                            <li>كيفية حماية الشبكة باستخدام BPDU Guard.</li>
                        </ul>
                    </div>

                    <h2>1. مشكلة הـ Layer 2 Loop (Broadcast Storm)</h2>
                    <p>في الشبكات الاحترافية، يجب أن نوفر <strong>Redundancy (مسار بديل)</strong> لكي لا تسقط الشبكة إذا انقطع كابل. ولكن، توصيل السويتشات في شكل حلقة (Loop) يتسبب في كارثة:</p>
                    <ul>
                        <li><strong>Broadcast Storm (عاصفة البث):</strong> إطار البث سيدور في الحلقة إلى الأبد لأن הـ Ethernet Frame لا يمتلك TTL (Time to Live) ليوقفه. مما يؤدي لانهيار الشبكة.</li>
                        <li><strong>MAC Database Instability:</strong> السويتش سيتعلم نفس الـ MAC Address من منافذ مختلفة بسرعة جنونية مما يؤدي لتعطله.</li>
                    </ul>

                    <h2>2. بروتوكول STP (IEEE 802.1D)</h2>
                    <p>يقوم الـ STP باكتشاف الحلقات <strong>وإغلاق أحد المسارات (Block) منطقياً</strong> لمنع العاصفة. وإذا انقطع المسار الأساسي، سيقوم بفتح المسار المغلق تلقائياً.</p>
                    
                    <div class="concept-box">
                        <h3>خطوات عمل הـ STP:</h3>
                        <ol>
                            <li><strong>انتخاب الـ Root Bridge:</strong> السويتش الزعيم في الشبكة. يتم انتخابه بناءً على أقل <code>Bridge ID (Priority + MAC Address)</code>. הـ Priority الافتراضية هي 32768.</li>
                            <li><strong>انتخاب הـ Root Ports:</strong> كل سويتش (غير الزعيم) يختار المنفذ صاحب <em>أقل تكلفة (Cost)</em> للوصول للـ Root Bridge. الـ Cost يعتمد على سرعة الكابل (19 للـ 100Mbps، 4 للـ 1Gbps).</li>
                            <li><strong>انتخاب הـ Designated Ports:</strong> على كل سلك (Segment)، يجب أن يكون هناك منفذ واحد مفتوح. (جميع منافذ الـ Root Bridge هي Designated).</li>
                            <li><strong>باقي المنافذ (Blocking):</strong> أي منفذ لم يحصل على دور يتم إغلاقه (Block) لمنع الـ Loop.</li>
                        </ol>
                    </div>

                    <h2 style="margin-top: 30px;">3. الـ RSTP (Rapid Spanning Tree 802.1w)</h2>
                    <p>المشكلة في الـ STP القديم أنه بطيء جداً، يستغرق من <strong>30 إلى 50 ثانية</strong> لفتح المنفذ المغلق (حالات: Listening -> Learning -> Forwarding). الـ <strong>RSTP</strong> هو الجيل الحديث ويعمل في أجزاء من الثانية.</p>
                    <table style="width: 100%; text-align: left; border-collapse: collapse; margin-top: 10px;">
                        <tr style="background: rgba(255,255,255,0.1);">
                            <th style="padding: 10px; border: 1px solid var(--border);">حالات STP (القديم)</th>
                            <th style="padding: 10px; border: 1px solid var(--border);">حالات RSTP (الحديث)</th>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Disabled / Blocking / Listening</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Discarding (دمج لثلاث حالات)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Learning</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Learning</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid var(--border);">Forwarding</td>
                            <td style="padding: 10px; border: 1px solid var(--border);">Forwarding</td>
                        </tr>
                    </table>

                    <h2>4. חماية وتسريع הـ STP (PortFast & BPDU Guard)</h2>
                    <p>رسائل الـ STP تسمى <strong>BPDU</strong> وتُرسل كل ثانيتين. ماذا لو قمت بتوصيل كمبيوتر جديد؟ السويتش سينتظر 30 ثانية ليتأكد أنه ليس سويتش آخر! هذا مزعج للمستخدمين.</p>
                    <ul>
                        <li><strong>PortFast:</strong> أمر يتم وضعه على منافذ הـ Access (المتصلة بالكمبيوتر) ليجعل المنفذ يعمل (Forwarding) <strong>فوراً</strong> بدون انتظار 30 ثانية.</li>
                        <li><strong>BPDU Guard:</strong> أمر حماية يوضع مع הـ PortFast. إذا قام موظف خبيث بتوصيل سويتش شخصي بهذا المنفذ، سيستقبل السويتش رسالة BPDU، وسيقوم BPDU Guard <strong>بإغلاق المنفذ فوراً</strong> (Error-Disable) لحماية الشبكة.</li>
                    </ul>
                `
            },

            
            {
                id: "access_etherchannel",
                title: "4. EtherChannel (LACP & PAgP)",
                content: `
                    <h1>EtherChannel (Link Aggregation)</h1>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">🎯 Objectives (أهداف الدرس)</h3>
                        <ul>
                            <li>فهم مشكلة STP مع المسارات المتعددة.</li>
                            <li>طريقة عمل الـ EtherChannel في دمج الكابلات.</li>
                            <li>الفرق بين LACP (المعيار المفتوح) و PAgP (سيسكو).</li>
                            <li>شروط تكوين הـ EtherChannel.</li>
                        </ul>
                    </div>

                    <h2>1. المشكلة التي يحلها הـ EtherChannel</h2>
                    <p>لنفترض أن لديك سويتشين متصلين بكابل 1Gbps، والضغط عالي. قررت إضافة كابل 1Gbps آخر لزيادة السرعة إلى 2Gbps. بمجرد توصيل الكابل الثاني، سيتدخل <strong>STP (Spanning Tree)</strong> ويقوم <strong>بإغلاق أحد الكابلين</strong> لمنع الـ Loop! بالتالي لم تستفد من الكابل الثاني.</p>

                    <h2>2. الـ EtherChannel (Link Aggregation)</h2>
                    <p>تقنية الـ EtherChannel تقوم بدمج عدة كابلات فيزيائية (حتى 8 كابلات) في <strong>كابل منطقي (Logical Link) واحد</strong> يسمى <code>Port-Channel</code>.</p>
                    <ul>
                        <li>بما أن السويتش والـ STP يريانه ككابل واحد، فلن يتم إغلاقه.</li>
                        <li><strong>النتيجة:</strong> زيادة عرض النطاق الترددي (Bandwidth) وتوفير تحمل الأخطاء (Redundancy) فإذا انقطع سلك مادي، سيستمر الكابل المنطقي بالعمل بالكابلات المتبقية دون توقف.</li>
                    </ul>

                    <h2 style="margin-top: 30px;">3. بروتوكولات التفاوض (LACP vs PAgP)</h2>
                    <p>مثل الـ DTP، يمكن تفعيل الـ EtherChannel بشكل يدوي (On) أو عن طريق بروتوكولات تفاوض ديناميكية:</p>
                    
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 15px;">
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #58a6ff;">LACP (IEEE 802.3ad)</h3>
                            <p>هو المعيار المفتوح (Open Standard) ويعمل على جميع أنواع السويتشات (Cisco, HP, Juniper). <strong>(يُنصح به دائماً).</strong></p>
                            <ul>
                                <li><strong>Active:</strong> يبادر ويرسل طلب التفاوض.</li>
                                <li><strong>Passive:</strong> ينتظر ولا يبادر.</li>
                            </ul>
                            <p><em>(لكي ينجح الدمج، يجب أن يكون أحدهما على الأقل Active).</em></p>
                        </div>
                        <div style="flex: 1; padding: 15px; border: 1px solid var(--border); border-radius: 8px;">
                            <h3 style="color: #2ea043;">PAgP (Cisco Proprietary)</h3>
                            <p>خاص بسيسكو فقط، ولا يُستخدم غالباً إلا في بيئة سيسكو القديمة البحتة.</p>
                            <ul>
                                <li><strong>Desirable:</strong> يبادر التفاوض.</li>
                                <li><strong>Auto:</strong> ينتظر.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05); margin-top: 20px;">
                        <h3 style="color: #ffb020;">⚠️ شروط تكوين الـ EtherChannel</h3>
                        <p>لكي يقبل السويتش دمج الكابلات، يجب أن تكون <strong>متطابقة تماماً</strong> في الخصائص التالية:</p>
                        <ol>
                            <li>نفس السرعة (Speed) ونفس الـ Duplex.</li>
                            <li>نفس نوع المنفذ (كلها Access أو كلها Trunk).</li>
                            <li>إذا كانت Access، يجب أن تكون في نفس الـ VLAN.</li>
                            <li>إذا كانت Trunk، يجب أن تمرر نفس الـ Allowed VLANs ولها نفس الـ Native VLAN.</li>
                        </ol>
                        <p><em>أي اختلاف في هذه الشروط سيؤدي إلى فشل دمج الـ Port-Channel (حالة Suspended).</em></p>
                    </div>
                `
            },

        ]
    },
    {
        chapter: "Domain 3: IP Connectivity (التوجيه والمسارات)",
        lessons: [
            {
                id: "route_concept",
                title: "1. مفاهيم التوجيه وجدول المسارات (Routing Table)",
                content: `
                    <h1>التوجيه: كيف تتخذ الراوترات قراراتها؟</h1>
                    <p>الراوتر هو بمثابة "شرطي المرور" في الشبكات. وظيفته الأساسية هي استلام البيانات (Packets) من شبكة، وتوجيهها نحو أفضل مسار للوصول إلى الشبكة الهدف.</p>
                    
                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">كيف يبني الراوتر جدول التوجيه (Routing Table)؟</h3>
                        <p>لكي يوجه الراوتر البيانات، يحتاج لخريطة تسمى <strong>Routing Table</strong>. يحصل الراوتر على المسارات بثلاث طرق رئيسية:</p>
                        <ol>
                            <li><strong>الشبكات المتصلة مباشرة (Directly Connected):</strong> بمجرد وضع IP على منفذ الراوتر وتشغيله (no shutdown)، يضاف هذا المسار للجدول تلقائياً بحرف <strong>C</strong>.</li>
                            <li><strong>التوجيه اليدوي (Static Routing):</strong> مهندس الشبكة يكتب مساراً بيده للراوتر. يظهر في الجدول بحرف <strong>S</strong>.</li>
                            <li><strong>التوجيه الديناميكي (Dynamic Routing):</strong> الراوترات تتحدث مع بعضها وتتبادل المسارات آلياً (مثل OSPF). يظهر بحرف <strong>O</strong>.</li>
                        </ol>
                    </div>

                    <h2>معايير اختيار أفضل مسار (Route Selection)</h2>
                    <p>ماذا لو كان للراوتر أكثر من مسار للوصول لنفس الشبكة؟ الراوتر يتخذ قراره بناءً على القواعد التالية بالترتيب الصارم:</p>
                    
                    <h3>1. أطول تطابق للشبكة (Longest Prefix Match)</h3>
                    <p>هذه هي <strong>القاعدة الذهبية الأولى</strong>! الراوتر يختار دائماً المسار الأكثر تحديداً (Most Specific).<br>
                    مثال: الراوتر يمتلك مسارين:<br>
                    - مسار إلى <code>10.0.0.0/8</code> عبر منفذ G0/0<br>
                    - مسار إلى <code>10.1.1.0/24</code> عبر منفذ G0/1<br>
                    إذا جاءت بيانات تريد الذهاب لـ <code>10.1.1.50</code>، سيختار الراوتر <strong>G0/1</strong> لأن <code>/24</code> أكثر تحديداً من <code>/8</code>.</p>

                    <h3>2. المسافة الإدارية (Administrative Distance - AD)</h3>
                    <p>إذا تساوى التطابق، ينظر الراوتر إلى "مدى ثقته" في مصدر المسار. كل بروتوكول له رقم AD (كلما قل الرقم زادت الثقة):</p>
                    <ul>
                        <li><strong>Connected (C):</strong> 0 (أعلى ثقة)</li>
                        <li><strong>Static Route (S):</strong> 1</li>
                        <li><strong>eBGP:</strong> 20</li>
                        <li><strong>EIGRP:</strong> 90</li>
                        <li><strong>OSPF:</strong> 110</li>
                        <li><strong>RIP:</strong> 120</li>
                    </ul>

                    <h3>3. التكلفة (Metric)</h3>
                    <p>إذا جاء مساران لنفس الشبكة ومن نفس البروتوكول (مثلاً كلاهما OSPF)، ينظر الراوتر إلى التكلفة (Metric) ويختار التكلفة <strong>الأقل</strong>. (في OSPF تُحسب التكلفة بناءً على سرعة الخط Bandwidth).</p>
                `
            },
            {
                id: "route_static",
                title: "2. التوجيه اليدوي والمسار الافتراضي (Static & Default Route)",
                content: `
                    <h1>التوجيه اليدوي (Static Routing)</h1>
                    <p>التوجيه اليدوي يعني أنك كمهندس شبكات ستقوم بتعريف الراوتر بالمسار خطوة بخطوة. يتميز بأنه لا يستهلك موارد الراوتر (CPU/RAM) وأكثر أماناً، ولكنه متعب جداً في الشبكات الكبيرة ولا يتكيف مع الأعطال تلقائياً.</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">1. المسار الثابت العادي (Standard Static Route)</h3>
                        <p>الأمر بسيط: <code>ip route [Network] [Subnet Mask] [Next-Hop IP أو Exit Interface]</code></p>
                        <p><strong>مثال:</strong> لكي نصل للشبكة 192.168.2.0 من الراوتر R1 عبر الراوتر R2 الذي عنوانه 10.0.0.2:<br>
                        <code>R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2</code></p>
                    </div>

                    <div class="concept-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.05);">
                        <h3 style="color: #d29922;">2. المسار الافتراضي (Default Route)</h3>
                        <p>يُستخدم عادةً لتوجيه حركة المرور نحو <strong>الإنترنت</strong>. وهو يمثل شبكة "أي مكان" أو "شبكة غير معروفة". يُرمز له بـ <code>0.0.0.0 0.0.0.0</code>.</p>
                        <p><strong>مثال:</strong> توجيه أي بيانات غير معروفة نحو مزود الخدمة (ISP) الموجود على IP 200.1.1.2:<br>
                        <code>R1(config)# ip route 0.0.0.0 0.0.0.0 200.1.1.2</code></p>
                        <p><em>(يظهر في الـ Routing Table بحرف <strong>S*</strong>).</em></p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">3. المسار العائم (Floating Static Route)</h3>
                        <p>هو مسار يدوي نستخدمه <strong>كمسار احتياطي (Backup)</strong> لمسار رئيسي (مثل OSPF). لكي نجعله احتياطياً ولا يظهر في الجدول إلا إذا تعطل الرئيسي، نقوم <strong>بزيادة الـ AD</strong> الخاصة به لتكون أعلى من الـ AD للبروتوكول الرئيسي.</p>
                        <p><strong>مثال:</strong> جعله احتياطياً لـ OSPF (الذي يمتلك AD 110):<br>
                        <code>R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.3 115</code><br>
                        <em>(بما أن 115 أكبر من 110، لن يستخدم الراوتر هذا المسار إلا إذا سقط الـ OSPF).</em></p>
                    </div>

                    <h2>مشكلة الـ Next-Hop مقابل הـ Exit Interface</h2>
                    <ul>
                        <li>إذا استخدمت <strong>Next-Hop IP</strong>: الراوتر سيقوم بعملية تسمى (Recursive Lookup) للبحث في جدوله عن كيفية الوصول للـ Next-Hop أولاً. (مفضلة في شبكات الـ Ethernet).</li>
                        <li>إذا استخدمت <strong>Exit Interface</strong> (مثل s0/0/0): الراوتر سيعتبر الشبكة الهدف Connected، ولكنه سيرسل طلبات ARP لكل IP يذهب إليه (Proxy ARP)، وهو أمر سيء في شبكات الـ Ethernet (مفضلة في Point-to-Point).</li>
                    </ul>
                `
            },
            {
                id: "route_ospf",
                title: "3. بروتوكول OSPFv2 (الأساسيات والإعدادات)",
                content: `
                    <h1>بروتوكول OSPF (Open Shortest Path First)</h1>
                    <p>هو بروتوكول توجيه ديناميكي مفتوح المصدر (يعمل على سيسكو وغيرها)، ويعتبر من نوع <strong>Link-State</strong>. يقوم بجمع حالة الوصلات وسرعتها ليخلق خريطة كاملة للشبكة باستخدام خوارزمية <strong>Dijkstra (SPF)</strong>.</p>

                    <h2>1. خصائص الـ OSPF</h2>
                    <ul>
                        <li><strong>الـ AD:</strong> 110.</li>
                        <li><strong>التكلفة (Metric):</strong> تُحسب بناءً على عرض النطاق الترددي (Bandwidth). المسار الأسرع يمتلك تكلفة أقل. ` + "`Cost = 100 Mbps / Bandwidth`" + `.</li>
                        <li><strong>الـ Areas:</strong> صُمم الـ OSPF ليكون هرمياً لتخفيف العبء على الراوترات. يجب أن تمتلك كل شبكة منطقة رئيسية تسمى <strong>Area 0 (Backbone Area)</strong>.</li>
                        <li><strong>التحديثات (Updates):</strong> لا يرسل جدول التوجيه بالكامل كل فترة (مثل RIP)، بل يرسل تحديثات فقط عند حدوث تغيير (Triggered Updates) ويرسل نبضات (Hello) كل 10 ثوانٍ للتأكد من الجيران.</li>
                    </ul>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">2. مفاهيم DR و BDR</h3>
                        <p>في شبكات הـ Ethernet (التي تعتبر Multi-access)، إذا كان هناك 10 راوترات، وتحدثت مع بعضها جميعاً سيحدث فوضى كبيرة (Full Mesh). لذا يقوم הـ OSPF بانتخاب رئيساً ونائباً:</p>
                        <ul>
                            <li><strong>DR (Designated Router):</strong> الزعيم. جميع الراوترات (DROthers) ترسل تحديثاتها إليه فقط على الـ IP الخاص <code>224.0.0.6</code>. وهو بدوره يوزعها للجميع على <code>224.0.0.5</code>.</li>
                            <li><strong>BDR (Backup DR):</strong> النائب. يراقب بصمت، وإذا تعطل الـ DR، يتولى القيادة فوراً.</li>
                        </ul>
                        <p><strong>كيف يتم الانتخاب؟</strong> الراوتر صاحب أعلى <strong>OSPF Priority</strong> (افتراضياً 1) يفوز. إذا تساوت، يفوز الراوتر صاحب أعلى <strong>Router ID</strong> (وهو أعلى IP على الراوتر).</p>
                    </div>

                    <h2>3. إعداد الـ OSPF (Configuration)</h2>
                    <p>لتفعيل OSPF عملية رقم 10 وضم الشبكة 192.168.1.0/24 في Area 0. لاحظ أننا نستخدم <strong>Wildcard Mask</strong> (وهو عكس الـ Subnet Mask):</p>
                    <pre><code>R1(config)# router ospf 10
R1(config-router)# network 192.168.1.0 0.0.0.255 area 0</code></pre>

                    <p>لإجبار الراوتر على أن يكون الـ DR، نزيد من الـ Priority على المنفذ (القيمة العظمى 255، والقيمة 0 تعني لن يكون DR أبداً):</p>
                    <pre><code>R1(config)# interface g0/0
R1(config-if)# ip ospf priority 255</code></pre>

                    <p>إذا أردنا من الراوتر أن يوزع المسار الافتراضي (Default Route) الخاص بالإنترنت على جميع جيرانه في الـ OSPF:</p>
                    <pre><code>R1(config-router)# default-information originate</code></pre>
                `
            },
            {
                id: "route_fhrp",
                title: "4. بروتوكولات التكرار (FHRP و HSRP)",
                content: `
                    <h1>لماذا نحتاج بروتوكولات FHRP؟</h1>
                    <p>في الشبكات الكبيرة، لا نعتمد على راوتر واحد ليكون الـ <strong>Default Gateway</strong> للأجهزة. ماذا لو احترق هذا الراوتر؟ جميع الموظفين سيفقدون الاتصال بالإنترنت أو بالسيرفرات!</p>
                    <p>الحل هو وضع أكثر من راوتر كبوابة للموظفين. لكن الموظف (الكمبيوتر) لا يمكنه كتابة سوى Gateway IP واحد في إعداداته. هنا يأتي دور <strong>First Hop Redundancy Protocol (FHRP)</strong>.</p>

                    <h2>فكرة FHRP (العنوان الوهمي)</h2>
                    <p>يقوم بروتوكول FHRP بدمج راوترين (أو أكثر) ليظهرا كأنهما راوتر واحد وهمي (Virtual Router) بـ IP وهمي و MAC وهمي. نضع هذا الـ IP الوهمي في أجهزة الموظفين كـ Gateway.
                    <br>الراوتر الأول سيكون هو الأساسي (Active)، والثاني هو الاحتياطي (Standby). إذا سقط الأساسي، ينتقل الـ IP الوهمي فوراً إلى الاحتياطي دون أن يشعر الموظف بأي انقطاع!</p>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">HSRP (Hot Standby Router Protocol)</h3>
                        <p>هو بروتوكول خاص بسيسكو (Cisco Proprietary) وهو الأشهر في الـ CCNA. النسخة المفتوحة المصدر (Open Standard) تسمى <strong>VRRP</strong>.</p>
                        <ul>
                            <li><strong>Active Router:</strong> الراوتر الذي يحمل الـ IP الوهمي ويمرر البيانات.</li>
                            <li><strong>Standby Router:</strong> الراوتر النائم، يرسل ويستقبل نبضات (Hellos). إذا انقطعت النبضات، يُعلن نفسه Active.</li>
                            <li><strong>الـ MAC الوهمي:</strong> في النسخة الأولى يبدأ دائماً بـ <code>0000.0c07.acXX</code> (حيث XX هو رقم المجموعة).</li>
                        </ul>
                    </div>

                    <h2>إعداد الـ HSRP</h2>
                    <p>الانتخاب يتم بناءً على <strong>Priority</strong> (افتراضياً 100). الأعلى يفوز. وإذا تساوت، يفوز صاحب أعلى IP.</p>
                    <p>مثال لإعداد راوتر كـ Active بوضع Priority 110 ليكون هو الأعلى، وإنشاء IP وهمي 192.168.1.254 (رقم المجموعة 1):</p>
                    <pre><code>R1(config)# interface g0/0
R1(config-if)# standby 1 ip 192.168.1.254
R1(config-if)# standby 1 priority 110
R1(config-if)# standby 1 preempt</code></pre>

                    <p><em>ملاحظة هامة:</em> أمر <code>preempt</code> يخبر الراوتر أنه إذا سقط وعاد للعمل، يجب أن يطالب باستعادة منصبه كزعيم (Active) فوراً بدلاً من البقاء كاحتياطي.</p>
                `
            }
        ]
    },,
    {
        chapter: "Domain 4: IP Services",
        lessons: [
            { id: "serv_dhcp", title: "DHCP", content: `<h1>قريباً</h1>` },
            { id: "serv_nat", title: "NAT & PAT", content: `<h1>قريباً</h1>` }
        ]
    },
    {
        chapter: "Domain 5: Security Fundamentals",
        lessons: [
            { id: "sec_acl", title: "Access Control Lists (ACL)", content: `<h1>قريباً</h1>` },
            { id: "sec_portsec", title: "Port Security", content: `<h1>قريباً</h1>` }
        ]
    },
    {
        chapter: "Domain 6: Automation & Programmability",
        lessons: [
            { id: "auto_json", title: "JSON & REST APIs", content: `<h1>قريباً</h1>` },
            { id: "auto_sdn", title: "SDN & Cisco DNA Center", content: `<h1>قريباً</h1>` }
        ]
    }
];


// ==========================================
// DOM Rendering Logic (Restored)
// ==========================================
function renderSidebar() {
    const toc = document.getElementById('tocPanel');
    if (!toc) return;
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
            // Use window.renderLesson so features.js can hook into it
            btn.setAttribute('onclick', `window.renderLesson('${lesson.id}')`);
            lessonsContainer.appendChild(btn);
        });
        
        chapterDiv.appendChild(lessonsContainer);
        toc.appendChild(chapterDiv);
    });
}

window.renderLesson = function(id) {
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-' + id);
    if(btn) btn.classList.add('active');
    
    for(let chap of academyData) {
        for(let less of chap.lessons) {
            if(less.id === id) {
                const article = document.getElementById('articleBody');
                if(!article) return;
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
};

window.onload = () => {
    renderSidebar();
    if(academyData[0] && academyData[0].lessons[0]) {
        window.renderLesson(academyData[0].lessons[0].id);
    }
};
