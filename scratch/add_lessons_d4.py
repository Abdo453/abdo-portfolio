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
                    <h1>Dynamic Host Configuration Protocol (DHCP)</h1>
                    <p>في الشبكات القديمة، كان مهندس الشبكة يمر على كل جهاز كمبيوتر ليكتب له عنوان IP والـ Subnet Mask والـ Gateway يدوياً. تخيل لو كان لديك 1000 موظف! هنا جاء دور <strong>DHCP</strong> ليقوم بتوزيع هذه الإعدادات على الأجهزة <strong>تلقائياً (ديناميكياً)</strong>.</p>
                    
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">كيف يعمل DHCP؟ (عملية DORA)</h3>
                        <p>عندما تقوم بتوصيل كابل الشبكة بجهاز الكمبيوتر، تحدث محادثة سريعة بين الكمبيوتر (Client) وخادم الـ DHCP مكونة من 4 رسائل تُعرف اختصاراً بـ <strong>DORA</strong>:</p>
                        <ol>
                            <li><strong>D - Discover (اكتشاف):</strong> الكمبيوتر يصرخ في الشبكة (Broadcast) قائلاً: "هل يوجد خادم DHCP هنا ليعطيني IP؟"</li>
                            <li><strong>O - Offer (عرض):</strong> خادم الـ DHCP يرد قائلاً: "نعم أنا هنا، ما رأيك في هذا الـ IP؟" (Unicast أو Broadcast).</li>
                            <li><strong>R - Request (طلب):</strong> الكمبيوتر يرد: "أعجبني هذا الـ IP، أرجو حجزه لي رسمياً".</li>
                            <li><strong>A - Acknowledge (تأكيد):</strong> خادم الـ DHCP يسجل الـ IP باسم هذا الجهاز ويرسل التأكيد النهائي للكمبيوتر.</li>
                        </ol>
                    </div>

                    <h2>إعداد راوتر سيسكو كخادم DHCP</h2>
                    <p>يمكن لراوتر سيسكو أن يلعب دور خادم الـ DHCP للشبكة المحلية. خطوات الإعداد:</p>
                    <ol>
                        <li><strong>استثناء بعض العناوين (Exclusion):</strong> يجب أن نمنع الراوتر من توزيع العناوين المهمة (مثل عنوان الراوتر نفسه أو السيرفرات).
                        <pre><code>R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10</code></pre>
                        </li>
                        <li><strong>إنشاء حوض عناوين (Pool):</strong> ننشئ مسبحاً (Pool) ونعطيه اسماً (مثلاً LAN1).
                        <pre><code>R1(config)# ip dhcp pool LAN1</code></pre>
                        </li>
                        <li><strong>تحديد الشبكة والـ Gateway والـ DNS:</strong>
                        <pre><code>R1(dhcp-config)# network 192.168.1.0 255.255.255.0
R1(dhcp-config)# default-router 192.168.1.1
R1(dhcp-config)# dns-server 8.8.8.8</code></pre>
                        </li>
                    </ol>

                    <div class="concept-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.05);">
                        <h3 style="color: #d29922;">مشكلة الـ Broadcast والـ DHCP Relay Agent</h3>
                        <p>رسالة הـ <strong>Discover</strong> هي رسالة Broadcast، والراوتر <strong>يمنع مرور رسائل הـ Broadcast</strong> من شبكة لأخرى! إذا كان خادم الـ DHCP في شبكة أخرى غير شبكة الموظفين، لن تصل رسائلهم إليه.</p>
                        <p><strong>الحل:</strong> استخدام <code>ip helper-address</code>. نقوم بالدخول على الـ Interface الخاص بالراوتر المواجه للموظفين، ونخبره أن يقوم بتحويل رسائل הـ Broadcast للـ DHCP إلى رسائل Unicast موجهة مباشرة نحو IP الخادم.</p>
                        <pre><code>R1(config)# interface g0/0
R1(config-if)# ip helper-address 10.1.1.5</code></pre>
                    </div>
                `
            },
            {
                id: "serv_nat",
                title: "2. بروتوكول NAT و PAT (ترجمة العناوين)",
                content: `
                    <h1>Network Address Translation (NAT)</h1>
                    <p>عناوين الـ IPv4 <strong>الخاصة (Private IPs)</strong> مثل <code>192.168.x.x</code> و <code>10.x.x.x</code> مجانية ويمكن استخدامها داخل الشركات والمنازل، ولكنها <strong>ممنوعة من التصفح على الإنترنت</strong> لأنها غير مسجلة عالمياً. للوصول للإنترنت، يجب أن تمتلك عنوان <strong>عام (Public IP)</strong> نشتريه من مزود الخدمة (ISP).</p>
                    <p>بما أننا لا نستطيع شراء Public IP لكل موظف، جاء <strong>NAT</strong> ليقوم بترجمة (تبديل) العنوان الخاص للكمبيوتر إلى عنوان عام أثناء خروجه للإنترنت، ثم يعكس العملية عند عودة البيانات.</p>

                    <h2>أنواع הـ NAT</h2>
                    <ul style="line-height: 1.8;">
                        <li><strong>1. Static NAT (1 to 1):</strong> نربط IP خاص واحد بـ IP عام واحد بشكل دائم. يُستخدم للسيرفرات الداخلية (مثل سيرفر كاميرات أو ويب) لكي نتمكن من الوصول إليها من خارج الشركة عبر الإنترنت.</li>
                        <li><strong>2. Dynamic NAT (Many to Many):</strong> نشتري مجموعة (Pool) من الـ Public IPs من مزود الخدمة. إذا أراد موظف الخروج، يستعير عنواناً متاحاً، وعندما ينتهي يعيده. مشكلته أنه إذا كان لدينا 10 Public IPs فقط، الموظف رقم 11 لن يستطيع تصفح الإنترنت حتى ينهي أحدهم تصفحه.</li>
                        <li><strong>3. PAT أو NAT Overload (Many to 1):</strong> وهو <strong>الأكثر استخداماً</strong> (وهو ما يحصل في راوتر منزلك الآن!). كل الأجهزة الداخلية (هواتف، لابتوبات) تخرج للإنترنت بـ Public IP <strong>واحد فقط</strong>! الراوتر يفرق بينهم باستخدام <strong>رقم المنفذ (Port Number)</strong>.</li>
                    </ul>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">مصطلحات الـ NAT (Inside vs Outside)</h3>
                        <p>لفهم إعدادات سيسكو، يجب أن تعرف أن سيسكو تسمي الشبكة الداخلية <strong>Inside</strong> والإنترنت <strong>Outside</strong>، وتقسم العناوين إلى:</p>
                        <ul>
                            <li><strong>Inside Local:</strong> الـ IP الخاص بجهازك قبل الترجمة (مثال: 192.168.1.10).</li>
                            <li><strong>Inside Global:</strong> الـ IP العام الذي تم ترجمة جهازك إليه (مثال: 200.1.1.1).</li>
                            <li><strong>Outside Local / Outside Global:</strong> عناوين الموقع الذي تتصفحه على الإنترنت (تكون عادة متطابقة).</li>
                        </ul>
                    </div>

                    <h2>إعداد הـ PAT (NAT Overload)</h2>
                    <p>لكي نجعل كل أجهزة الشبكة 192.168.1.0/24 تخرج للإنترنت باستخدام الـ IP العام الموجود على الفتحة s0/0/0:</p>
                    <ol>
                        <li><strong>إنشاء قائمة صلاحيات (ACL) تحدد من المسموح لهم بالترجمة:</strong>
                        <pre><code>R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255</code></pre>
                        </li>
                        <li><strong>تفعيل הـ NAT Overload وربط الـ ACL بالفتحة:</strong>
                        <pre><code>R1(config)# ip nat inside source list 1 interface s0/0/0 overload</code></pre>
                        </li>
                        <li><strong>تعريف الراوتر أين الـ Inside وأين الـ Outside:</strong>
                        <pre><code>R1(config)# interface g0/0
R1(config-if)# ip nat inside  (الفتحة المواجهة للموظفين)

R1(config)# interface s0/0/0
R1(config-if)# ip nat outside (الفتحة المواجهة للإنترنت)</code></pre>
                        </li>
                    </ol>
                `
            },
            {
                id: "serv_dns_ntp",
                title: "3. بروتوكولات DNS و NTP",
                content: `
                    <h1>Domain Name System (DNS)</h1>
                    <p>أجهزة الكمبيوتر والراوترات لا تفهم سوى الـ IP Addresses. لكن من المستحيل على الإنسان أن يحفظ عنوان IP لكل موقع (مثل 142.250.190.46 للوصول لـ Google). هنا جاء دور خادم <strong>DNS</strong>.</p>
                    <p>خادم הـ DNS هو ببساطة "دفتر هواتف الإنترنت". تعيطه اسماً (www.google.com) فيرد عليك بالـ IP الخاص به لتستطيع تصفحه.</p>
                    <p>في راوترات سيسكو، لكي نعلم الراوتر كيف يقوم بتحويل الأسماء إلى أرقام، يجب أن نفعل خدمة (Domain Lookup) ونخبره من هو سيرفر الـ DNS الخاص بنا:</p>
                    <pre><code>R1(config)# ip domain-lookup
R1(config)# ip name-server 8.8.8.8</code></pre>

                    <div class="concept-box" style="border-color: #8957e5; background: rgba(137, 87, 229, 0.05);">
                        <h3 style="color: #8957e5;">Network Time Protocol (NTP)</h3>
                        <p>تخيل أن يحدث هجوم اختراق لشبكتك، وعندما تفتح السجلات (Logs) الخاصة بالراوترات للتحقيق، تجد أن راوتر يقول الهجوم حدث الساعة 1 ظهراً، وراوتر آخر يقول حدث الساعة 9 مساءً، وراوتر ثالث يقول نحن في عام 1993! هذا سيجعل التحقيق مستحيلاً، وسيتسبب في فشل شهادات التشفير الرقمية (Certificates).</p>
                        <p><strong>NTP</strong> هو بروتوكول يقوم بضبط و <strong>مزامنة الوقت والتاريخ (Synchronization)</strong> عبر كل أجهزة الشبكة (سويتشات، راوترات، سيرفرات) من خلال جلب الوقت الدقيق من خادم وقت مركزي (NTP Server).</p>
                    </div>

                    <h2>إعداد הـ NTP</h2>
                    <p>لتكوين راوتر سيسكو لكي يجلب الوقت من السيرفر 10.1.1.5:</p>
                    <pre><code>R1(config)# ntp server 10.1.1.5</code></pre>
                    <p>للتحقق من مزامنة الوقت بنجاح (ستظهر علامة * إذا تم المزامنة):</p>
                    <pre><code>R1# show ntp associations
R1# show ntp status</code></pre>
                `
            }
        ]
    }
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 4: IP Services \(خدمات الشبكة\)".*?\]\s*\}',
    domain4_lessons.strip(),
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 4 injected successfully into academy.js!")
