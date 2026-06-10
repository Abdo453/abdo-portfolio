import re

academy_file = r'D:\abdo_portfolio\build\ccna\academy.js'
with open(academy_file, 'r', encoding='utf-8') as f:
    content = f.read()

domain6_lessons = """
    {
        chapter: "Domain 6: Automation & Programmability (برمجة وأتمتة الشبكات)",
        lessons: [
            {
                id: "auto_json",
                title: "1. البيانات (JSON و XML) وواجهات برمجة التطبيقات (REST APIs)",
                content: `
                    <h1>مرحباً بك في عصر الشبكات المبرمجة</h1>
                    <p>في الماضي، كان مهندس الشبكات يدخل لكل راوتر يدوياً عبر SSH لكتابة الأوامر (CLI). ماذا لو كان لدينا 1000 راوتر؟ هنا ظهرت الحاجة للأتمتة (Automation) لبرمجة الشبكة بالكامل من مكان واحد باستخدام لغات البرمجة (مثل Python).</p>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">1. صيغ البيانات (Data Formats)</h3>
                        <p>لكي تفهم أجهزة الشبكات الأوامر البرمجية، يجب تنسيق البيانات بصيغة يتفق عليها البشر والآلات. لدينا 3 صيغ رئيسية:</p>
                        <ul>
                            <li><strong>JSON (JavaScript Object Notation):</strong> الأشهر والأكثر استخداماً حالياً. تعتمد على نظام (مفتاح: قيمة) وتشبه قواميس بايثون. سهلة جداً للقراءة البشرية وتستخدم بكثرة مع الـ REST APIs.</li>
                            <li><strong>XML (eXtensible Markup Language):</strong> تعتمد على التاجات (Tags) مثل HTML. دقيقة جداً لكنها معقدة وتستهلك مساحة كبيرة. تستخدم مع بروتوكولات مثل NETCONF.</li>
                            <li><strong>YAML (YAML Ain't Markup Language):</strong> الأسهل للقراءة البشرية، تعتمد كلياً على المسافات الفارغة (Indentation). تستخدم في أدوات الأتمتة مثل Ansible.</li>
                        </ul>
                    </div>

                    <h2>مثال على JSON</h2>
                    <pre><code>{
  "interface": "GigabitEthernet0/1",
  "ip_address": "192.168.1.1",
  "enabled": true
}</code></pre>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">2. الـ REST APIs</h3>
                        <p>الـ API هو وسيط (نادل) ينقل طلبك إلى السيرفر (المطبخ) ويعود لك بالنتيجة. الـ REST هو أشهر هندسة لبناء الـ APIs ويعتمد كلياً على بروتوكول HTTP (الويب).</p>
                        <p><strong>أوامر הـ HTTP (Verbs) المستخدمة مع الـ REST API:</strong></p>
                        <ul>
                            <li><strong>GET:</strong> قراءة/جلب بيانات من الراوتر (مثل: عرض الـ Routing Table). (لا يغير شيئاً).</li>
                            <li><strong>POST:</strong> إنشاء شيء جديد (مثل: إضافة مسار جديد).</li>
                            <li><strong>PUT:</strong> استبدال أو تعديل شيء موجود.</li>
                            <li><strong>PATCH:</strong> تعديل جزئي لشيء موجود.</li>
                            <li><strong>DELETE:</strong> مسح شيء (مثل: مسح مسار من الراوتر).</li>
                        </ul>
                    </div>

                    <h2>الـ HTTP Status Codes (ردود السيرفر)</h2>
                    <p>بعد إرسال طلب הـ REST API، يرد عليك جهاز الشبكة برقم:</p>
                    <ul>
                        <li><strong>2xx (مثل 200 OK):</strong> نجاح الطلب.</li>
                        <li><strong>4xx (مثل 400 Bad Request أو 401 Unauthorized أو 404 Not Found):</strong> خطأ من جهتك (الكود خاطئ أو لا تملك صلاحية).</li>
                        <li><strong>5xx (مثل 500 Internal Server Error):</strong> خطأ في السيرفر أو الراوتر نفسه.</li>
                    </ul>
                `
            },
            {
                id: "auto_sdn",
                title: "2. الشبكات المعرفة بالبرمجيات (SDN) و Cisco DNA Center",
                content: `
                    <h1>ما هي הـ SDN (Software-Defined Networking)؟</h1>
                    <p>في الراوترات العادية (التقليدية)، كل راوتر يمتلك "عقلاً" و"عضلات" بداخله:</p>
                    <ul>
                        <li><strong>عقل الراوتر (Control Plane):</strong> هو الجزء الذي يفكر ويبني جدول التوجيه (مثل OSPF).</li>
                        <li><strong>عضلات الراوتر (Data Plane):</strong> هو الجزء الذي ينفذ ويقوم بتمرير الـ Packets بناءً على أوامر العقل.</li>
                    </ul>
                    <p>هذا يعني أن الإدارة لا مركزية، وكل راوتر يتخذ قراره بنفسه. في الـ <strong>SDN</strong>، قمنا بفصل "العقل" عن "العضلات"!</p>
                    
                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">بنية הـ SDN (المتحكم المركزي)</h3>
                        <p>في הـ SDN، يتم سحب "العقل" (Control Plane) من جميع الراوترات والسويتشات، ووضعه في سيرفر مركزي ذكي يسمى <strong>SDN Controller</strong>. وتصبح أجهزة الشبكة مجرد "عضلات" غبية (Data Plane) تنفذ أوامر المتحكم فقط.</p>
                        <p><strong>المزايا:</strong> إدارة الشبكة بأكملها (آلاف الأجهزة) من شاشة واحدة بدلاً من الدخول لكل جهاز بمفرده.</p>
                    </div>

                    <h2>المسارات (APIs) في بنية הـ SDN</h2>
                    <ul>
                        <li><strong>Southbound APIs:</strong> اللغة التي يستخدمها المتحكم المركزي (Controller) للتحدث وإعطاء الأوامر للأجهزة (الراوترات والسويتشات). (مثل بروتوكولات OpenFlow، NETCONF، RESTCONF).</li>
                        <li><strong>Northbound APIs:</strong> اللغة التي تستخدمها أنت كمهندس (أو السكريبتات الخاصة بك) لإعطاء الأوامر للمتحكم المركزي نفسه. (وهي غالباً REST APIs).</li>
                    </ul>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">Cisco DNA Center (SDA)</h3>
                        <p>هو تطبيق סيسكو הرسمي لـ SDN في شبكات الشركات (Enterprise/Campus). هو بمثابة عقل الشبكة المركزي.</p>
                        <p>يعتمد הـ DNA Center على مبدأ <strong>Intent-Based Networking (الشبكات الموجهة بالنوايا)</strong>: أي أنك تخبر الـ DNA Center بنيتك (مثلاً: "أريد عزل كاميرات المراقبة عن أجهزة الموظفين")، وهو بدوره يقوم بترجمة هذه النية إلى آلاف الأوامر (QoS, ACLs, VLANs) ويوزعها على כל הסויتشات آلياً!</p>
                    </div>

                    <h2>أدوات إدارة التهيئة (Configuration Management Tools)</h2>
                    <p>تستخدم لبرمجة الأجهزة التقليدية التي لا تدعم SDN بشكل كامل. أشهرها:</p>
                    <ul>
                        <li><strong>Ansible:</strong> لا يحتاج لبرنامج وسيط (Agentless). يعتمد على الـ SSH وصيغة YAML البسيطة. يستخدم نمط الـ Push (يدفع الإعدادات للأجهزة).</li>
                        <li><strong>Puppet & Chef:</strong> يحتاجان لبرنامج وسيط (Agent) ويعتمدان على لغة Ruby ونمط الـ Pull.</li>
                    </ul>
                `
            }
        ]
    }
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 6: Automation & Programmability".*?\]\s*\}',
    domain6_lessons.strip(),
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 6 injected into academy.js successfully!")
