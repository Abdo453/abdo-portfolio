import re

academy_file = r'D:\abdo_portfolio\build\ccna\academy.js'
with open(academy_file, 'r', encoding='utf-8') as f:
    content = f.read()

domain4_lessons = """
    {
        chapter: "Domain 4: IP Services (خدمات الشبكة)",
        lessons: [
            {
                id: "serv_dhcp",
                title: "1. بروتوكول DHCP (توزيع العناوين آلياً)",
                content: `
                    <h1>بروتوكول DHCP (Dynamic Host Configuration Protocol)</h1>
                    <p>في الشبكات القديمة، كان مهندس الشبكة يمر على كل جهاز كمبيوتر ليضع له IP و Subnet Mask و Gateway يدوياً. أما اليوم، يتم استخدام سيرفر DHCP لتوزيع هذه الإعدادات على آلاف الأجهزة آلياً في ثوانٍ.</p>
                    
                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">عملية DORA</h3>
                        <p>عندما تقوم بتوصيل كابل الشبكة أو الـ Wi-Fi، كيف يحصل جهازك على IP؟ تتم عملية تسمى <strong>DORA</strong> (كلها رسائل Broadcast في الطبقة الثانية):</p>
                        <ol>
                            <li><strong>Discover (D):</strong> جهازك يصرخ في الشبكة: "هل هناك أي سيرفر DHCP هنا؟ أحتاج إلى IP!"</li>
                            <li><strong>Offer (O):</strong> السيرفر يرد: "نعم أنا هنا، ما رأيك في الـ IP (192.168.1.50)؟"</li>
                            <li><strong>Request (R):</strong> جهازك يرد: "موافق، أرجو تأكيد حجز هذا الـ IP لي."</li>
                            <li><strong>Acknowledge (A):</strong> السيرفر يرد: "تم الحجز لك لمدة معينة (Lease Time)."</li>
                        </ol>
                    </div>

                    <h2>مشكلة הـ DHCP Relay Agent</h2>
                    <p>رسائل الـ DORA تعتمد على الـ <strong>Broadcast</strong>. ونحن نعلم أن الراوتر <strong>يمنع مرور الـ Broadcast</strong>. فماذا لو كان سيرفر הـ DHCP في مبنى، والموظفين في مبنى آخر يفصل بينهما راوتر؟ الموظفون لن يحصلوا على IP!</p>
                    <p><strong>الحل:</strong> نقوم بتحويل الراوتر الوسيط إلى <code>DHCP Relay Agent</code> ليقوم باستلام صراخ המوظفين (Broadcast) وتحويله لرسالة مباشرة (Unicast) إلى السيرفر.</p>
                    <pre><code>R1(config-if)# ip helper-address 10.1.1.100</code></pre>
                    <p><em>(حيث 10.1.1.100 هو عنوان سيرفر הـ DHCP).</em></p>

                    <h2>إعداد راوتر سيسكو كـ DHCP Server</h2>
                    <p>يمكننا جعل الراوتر نفسه هو من يوزع الآيبيهات للمكاتب الصغيرة:</p>
                    <pre><code>R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10
R1(config)# ip dhcp pool STAFF
R1(dhcp-config)# network 192.168.1.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.1.1
R1(dhcp-config)# dns-server 8.8.8.8</code></pre>
                    <p><em>ملاحظة: أمر excluded-address يمنع توزيع الآيبيهات من 1 إلى 10 لأننا قد نستخدمها للسيرفرات الثابتة والراوتر نفسه.</em></p>
                `
            },
            {
                id: "serv_nat",
                title: "2. بروتوكول NAT و PAT (ترجمة العناوين)",
                content: `
                    <h1>NAT (Network Address Translation)</h1>
                    <p>في تسعينيات القرن الماضي، أدرك العالم أن عناوين <strong>IPv4</strong> (والتي يبلغ عددها 4.3 مليار) ستنفد قريباً. فكان الحل المؤقت والعبقري هو اختراع הـ NAT.</p>
                    <p>تم تقسيم الـ IP إلى قسمين:</p>
                    <ul>
                        <li><strong>Private IP:</strong> آيبيهات مجانية ومكررة في كل منازل وشركات العالم (مثل 192.168.1.0). <strong>يُمنع منعاً باتاً</strong> أن تخرج للإنترنت.</li>
                        <li><strong>Public IP:</strong> آيبيهات حقيقية تُشترى من شركات الاتصالات وهي فريدة لا تتكرر، وتستخدم للتصفح عبر الإنترنت.</li>
                    </ul>
                    <p><strong>وظيفة الـ NAT:</strong> عندما يحاول جهازك (Private IP) فتح جوجل، يقوم راوتر الشركة بترجمة عنوانه إلى (Public IP) قبل أن يخرجه للإنترنت، وعندما يعود الرد من جوجل، يترجمه الراوتر مجدداً إلى الـ Private IP ليوصله لجهازك!</p>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">أنواع הـ NAT</h3>
                        <ol>
                            <li><strong>Static NAT (ترجمة ثابتة 1-to-1):</strong> ربط Public IP واحد بـ Private IP واحد للأبد. يُستخدم للسيرفرات (Web Servers) التي يجب أن يصل إليها الناس من خارج الشركة.<br>
                            <code>ip nat inside source static 192.168.1.50 200.1.1.50</code></li>
                            <li><strong>Dynamic NAT:</strong> الشركة تشتري 10 Public IPs، وتملك 100 موظف. أول 10 موظفين يفتحون الإنترنت يحصلون عليها، والـ 90 الباقون ينتظرون حتى ينتهي الأولون! (غير عملي وضعيف).</li>
                            <li><strong>PAT (Port Address Translation / NAT Overload):</strong> هو المستخدم في كل مكان اليوم (حتى راوتر منزلك). يسمح لـ 65,000 موظف بتصفح الإنترنت باستخدام <strong>Public IP واحد فقط!</strong> كيف؟ يفرق الراوتر بينهم باستخدام <strong>رقم الـ Port</strong> الخاص بكل موظف.</li>
                        </ol>
                    </div>

                    <h2>إعداد الـ PAT (NAT Overload)</h2>
                    <p>1- نحدد من المسموح لهم بالإنترنت باستخدام ACL:</p>
                    <pre><code>R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255</code></pre>
                    <p>2- نخبر الراوتر بترجمة هذه الـ ACL باستخدام الـ IP الموجود على منفذ الخروج (مثلاً G0/1) وتفعيل الـ Overload:</p>
                    <pre><code>R1(config)# ip nat inside source list 1 interface g0/1 overload</code></pre>
                    <p>3- نحدد المنفذ الداخلي (G0/0) والخارجي (G0/1):</p>
                    <pre><code>R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside</code></pre>
                `
            },
            {
                id: "serv_dns_ntp",
                title: "3. بروتوكولات DNS و NTP",
                content: `
                    <h1>بروتوكول DNS (Domain Name System)</h1>
                    <p>البشر يفضلون حفظ الأسماء (مثل google.com)، بينما الكمبيوترات والراوترات تتواصل بالأرقام (IP Addresses). الـ DNS هو بمثابة "دليل الهاتف" للإنترنت.</p>
                    <ul>
                        <li>عندما تكتب موقعاً، جهازك يرسل طلباً لـ DNS Server (غالباً بورت 53 UDP) يسأله: "ما هو הـ IP الخاص بـ google.com؟".</li>
                        <li>فيرد السيرفر بالـ IP، ليتمكن جهازك من بناء הـ Packet والاتصال.</li>
                    </ul>

                    <h1>بروتوكول NTP (Network Time Protocol)</h1>
                    <p>الـ NTP يُستخدم لمزامنة الوقت والتاريخ (Time Synchronization) في جميع أجهزة الشبكة.</p>
                    
                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">لماذا مزامنة الوقت أمر بالغ الأهمية أمنياً؟</h3>
                        <ol>
                            <li><strong>تحليل السجلات (Log Analysis):</strong> إذا حدث اختراق، سيقوم المحقق الرقمي (Forensic) بجمع السجلات من السويتشات والراوترات والفايروال لمعرفة مسار الهاكر. إذا كان كل جهاز يحمل وقتاً مختلفاً، فسيستحيل تتبع الجريمة بشكل زمني صحيح (Correlation).</li>
                            <li><strong>الشهادات الرقمية (Certificates & SSL):</strong> المتصفحات سترفض فتح المواقع إذا كان وقت جهازك أقدم أو أحدث بكثير من صلاحية شهادة הـ SSL للموقع.</li>
                            <li><strong>بروتوكولات التشفير (VPN/IPsec):</strong> قد تفشل الجيرة في بروتوكولات التشفير إذا كان الفارق الزمني كبيراً بين الراوترات.</li>
                        </ol>
                    </div>

                    <h2>مستويات הـ NTP (Stratum Levels)</h2>
                    <p>الـ NTP يعمل بنظام الطبقات (Stratum) لبيان مدى دقة الساعات:</p>
                    <ul>
                        <li><strong>Stratum 0:</strong> الساعات الذرية وأقمار הـ GPS (عالية الدقة جداً، ولكن لا يمكن للكمبيوترات الاتصال بها مباشرة عبر الشبكة).</li>
                        <li><strong>Stratum 1:</strong> السيرفرات المتصلة مباشرة بـ Stratum 0. (السيرفرات المركزية في العالم).</li>
                        <li><strong>Stratum 2:</strong> سيرفرات الشركات الكبرى التي تأخذ وقتها من Stratum 1، وهكذا.</li>
                        <li>كلما زاد الرقم، قلت الدقة. (أقصى رقم مسموح للـ Stratum هو 15، والرقم 16 يعني أن الوقت غير موثوق).</li>
                    </ul>

                    <p><strong>أمر إعداد הـ NTP على راوتر سيسكو لجعله يأخذ الوقت من سيرفر 10.1.1.5:</strong></p>
                    <pre><code>R1(config)# ntp server 10.1.1.5</code></pre>
                `
            }
        ]
    },
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 4: IP Services".*?\]\s*\},',
    domain4_lessons.strip() + ',',
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 4 injected into academy.js successfully!")
