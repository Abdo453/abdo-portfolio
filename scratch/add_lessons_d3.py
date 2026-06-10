import re

academy_file = r'D:\abdo_portfolio\build\ccna\academy.js'
with open(academy_file, 'r', encoding='utf-8') as f:
    content = f.read()

domain3_lessons = """
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
    },
"""

# Regex to replace Domain 3 placeholder
import re
new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 3: IP Connectivity".*?\]\s*\},',
    domain3_lessons.strip() + ',',
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 3 injected into academy.js successfully!")
