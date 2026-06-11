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
                title: "1. البيانات المنظمة (JSON, XML, YAML)",
                content: `
                    <h1>Data Formats: JSON, XML, YAML</h1>
                    <p>في عالم الأتمتة (Automation)، نحن لا نستخدم سطر الأوامر (CLI) البشري المعتاد لبرمجة ألف راوتر. بدلاً من ذلك، نستخدم برامج وسكربتات. لكي تفهم البرامج بعضها البعض، يجب أن تتبادل البيانات بصيغ "مُهيكلة" وواضحة للحاسوب.</p>
                    
                    <h2>1. صيغة JSON (JavaScript Object Notation)</h2>
                    <p>هي الصيغة الأكثر استخداماً اليوم في الـ APIs (خاصة REST APIs). تعتمد على فكرة <strong>(Key: Value) المفتاح والقيمة</strong>.</p>
                    <div class="concept-box" style="border-color: #f7df1e; background: rgba(247, 223, 30, 0.05);">
                        <h3 style="color: #d29922;">خصائص JSON:</h3>
                        <ul>
                            <li>تُحاط الأقواس المتعرجة <code>{}</code> لتمثيل كائن (Object).</li>
                            <li>تُحاط الأقواس المربعة <code>[]</code> لتمثيل مصفوفة/قائمة (Array).</li>
                            <li>يجب وضع النصوص (Strings) والمفاتيح (Keys) داخل <strong>علامات تنصيص مزدوجة <code>" "</code></strong>.</li>
                        </ul>
                        <strong>مثال:</strong>
<pre><code>{
  "interface": "GigabitEthernet0/0",
  "ip_address": "192.168.1.1",
  "status": "up"
}</code></pre>
                    </div>

                    <h2>2. صيغة XML (eXtensible Markup Language)</h2>
                    <p>تشبه لغة الـ HTML التي تُبنى بها المواقع. تعتمد على <strong>الوسوم (Tags)</strong>. هي صيغة قديمة وتستهلك مساحة كبيرة ولكنها مدعومة في كل الأنظمة القديمة.</p>
                    <div class="concept-box" style="border-color: #0066cc; background: rgba(0, 102, 204, 0.05);">
                        <h3 style="color: #0066cc;">خصائص XML:</h3>
                        <ul>
                            <li>يجب أن يحتوي كل وسم بداية <code>&lt;tag&gt;</code> على وسم نهاية <code>&lt;/tag&gt;</code>.</li>
                            <li>البيانات توضع بين الوسمين.</li>
                        </ul>
                        <strong>مثال:</strong>
<pre><code>&lt;interface&gt;
  &lt;name&gt;GigabitEthernet0/0&lt;/name&gt;
  &lt;ip_address&gt;192.168.1.1&lt;/ip_address&gt;
  &lt;status&gt;up&lt;/status&gt;
&lt;/interface&gt;</code></pre>
                    </div>

                    <h2>3. صيغة YAML (YAML Ain't Markup Language)</h2>
                    <p>هي المفضلة لدى البشر والمهندسين لسهولة قراءتها وكتابتها. تستخدم بشكل مكثف في أدوات الأتمتة مثل <strong>Ansible</strong>.</p>
                    <div class="concept-box" style="border-color: #cb171e; background: rgba(203, 23, 30, 0.05);">
                        <h3 style="color: #cb171e;">خصائص YAML:</h3>
                        <ul>
                            <li><strong>لا توجد أقواس!</strong> تعتمد كلياً على <strong>المسافات البادئة (Indentation)</strong> لتحديد هيكل البيانات. (خطأ مسافة واحدة يدمر الملف).</li>
                            <li>تستخدم الشرطة <code>-</code> لتمثيل عناصر القائمة (Array).</li>
                        </ul>
                        <strong>مثال:</strong>
<pre><code>interface: GigabitEthernet0/0
ip_address: 192.168.1.1
status: up
protocols:
  - OSPF
  - BGP</code></pre>
                    </div>
                `
            },
            {
                id: "auto_sdn",
                title: "2. الشبكات المعرفة برمجياً (SDN & REST APIs)",
                content: `
                    <h1>Software Defined Networking (SDN)</h1>
                    <p>في الشبكات التقليدية، كل راوتر أو سويتش يتخذ قرارات التوجيه بنفسه، ولديه شاشة إعدادات منفصلة. هذا يعني أنك لتحديث 100 راوتر، يجب أن تدخل عليها واحداً تلو الآخر!</p>
                    <p>في الـ <strong>SDN</strong>، نقوم بفصل <strong>العقل المفكر (Control Plane)</strong> عن <strong>العضلات التي تنقل البيانات (Data Plane)</strong>. نأخذ كل العقول من الراوترات ونضعها في خادم مركزي يسمى <strong>SDN Controller</strong> (مثل Cisco DNA Center).</p>

                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">مكونات الـ SDN (Southbound vs Northbound)</h3>
                        <ul>
                            <li><strong>Southbound APIs:</strong> لغة التخاطب بين الـ Controller والمرتزقة تحته (الراوترات والسويتشات). من أشهر البروتوكولات المستخدمة هنا: OpenFlow و NETCONF.</li>
                            <li><strong>Northbound APIs:</strong> لغة التخاطب بين الـ Controller وبين التطبيقات التي يبرمجها مهندس الشبكة فوقه. تستخدم عادة الـ <strong>REST APIs</strong>.</li>
                        </ul>
                    </div>

                    <h2>واجهات برمجة التطبيقات (REST APIs)</h2>
                    <p>هي طريقة تواصل البرامج مع بعضها عبر شبكة الويب (HTTP). إذا أردت من تطبيقك أن يطلب من الـ Controller إضافة VLAN، سترسل له طلب HTTP. للـ REST APIs أربع طرق رئيسية (CRUD):</p>
                    <ul>
                        <li><strong>GET (Read):</strong> لجلب البيانات (مثل عرض حالة المنافذ).</li>
                        <li><strong>POST (Create):</strong> لإنشاء شيء جديد (مثل إضافة VLAN جديدة).</li>
                        <li><strong>PUT/PATCH (Update):</strong> لتعديل شيء موجود (مثل تغيير IP لمنفذ).</li>
                        <li><strong>DELETE (Delete):</strong> لمسح شيء (مثل حذف مسار توجيه).</li>
                    </ul>

                    <h2>أكواد الرد (HTTP Status Codes)</h2>
                    <p>عندما ترسل طلب REST API، يرد عليك السيرفر بكود يوضح حالة الطلب:</p>
                    <ul style="line-height: 1.8;">
                        <li><strong>2xx (نجاح):</strong> مثل 200 OK (تمت العملية بنجاح) أو 201 Created (تم إنشاء الـ VLAN).</li>
                        <li><strong>4xx (خطأ من العميل):</strong> مثل 400 Bad Request (طلبك مكتوب بصيغة خاطئة)، 401 Unauthorized (كلمة المرور خاطئة)، 404 Not Found (الملف أو الرابط غير موجود).</li>
                        <li><strong>5xx (خطأ من السيرفر):</strong> مثل 500 Internal Server Error (السيرفر نفسه انهار أو واجه مشكلة برمجية).</li>
                    </ul>

                    <div class="concept-box" style="border-color: #28a745; background: rgba(40, 167, 69, 0.05);">
                        <h3 style="color: #28a745;">أدوات إدارة التكوين (Configuration Management)</h3>
                        <p>لأتمتة آلاف الأجهزة دفعة واحدة دون Controller، نستخدم أدوات مثل:</p>
                        <ul>
                            <li><strong>Ansible:</strong> لا يحتاج لتنصيب برنامج على الراوتر (Agentless)، يستخدم الـ SSH و لغة YAML. مفضل جداً لدى مهندسي الشبكات.</li>
                            <li><strong>Puppet و Chef:</strong> تحتاج لتنصيب Agent على الأجهزة، تستخدم لغة Ruby.</li>
                        </ul>
                    </div>
                `
            }
        ]
    }
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 6: Automation & Programmability \(برمجة وأتمتة الشبكات\)".*?\]\s*\}',
    domain6_lessons.strip(),
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 6 injected successfully into academy.js!")
