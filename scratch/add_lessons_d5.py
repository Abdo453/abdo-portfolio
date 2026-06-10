import re

academy_file = r'D:\abdo_portfolio\build\ccna\academy.js'
with open(academy_file, 'r', encoding='utf-8') as f:
    content = f.read()

domain5_lessons = """
    {
        chapter: "Domain 5: Security Fundamentals (أساسيات الأمن)",
        lessons: [
            {
                id: "sec_attacks",
                title: "1. التهديدات والهجمات الشبكية (Network Attacks)",
                content: `
                    <h1>ما هي التهديدات التي تواجه الشبكات؟</h1>
                    <p>أمن الشبكات لا يقتصر على وضع Firewall على الحافة، بل يجب حماية البنية التحتية من الداخل (الراوترات والسويتشات). الهاكر قد يكون موظفاً ناقماً أو شخصاً اخترق جهاز أحد الموظفين.</p>

                    <div class="concept-box" style="border-color: #f85149; background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: #f85149;">1. هجمات حجب الخدمة (DoS & DDoS)</h3>
                        <p><strong>الهدف:</strong> إسقاط الخدمة عن المستخدمين الشرعيين.</p>
                        <ul>
                            <li><strong>DoS (Denial of Service):</strong> هجوم من جهاز واحد. مثال: إرسال آلاف رسائل الـ Ping (Ping of Death) أو إغراق السيرفر بطلبات SYN (SYN Flood) لتعليق الذاكرة.</li>
                            <li><strong>DDoS (Distributed DoS):</strong> הهاكر يستخدم آلاف الأجهزة المخترقة (Botnet) حول العالم للهجوم على نفس السيرفر في نفس اللحظة، مما يتسبب في انهيار السيرفر فوراً.</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">2. هجمات انتحال الشخصية (Spoofing & Man-in-the-Middle)</h3>
                        <p>الهاكر يخدع أجهزة الشبكة ليعتقدوا أنه هو البوابة (Gateway) ليتمكن من اعتراض كلمات المرور:</p>
                        <ul>
                            <li><strong>ARP Spoofing:</strong> الهاكر يرسل رسائل ARP وهمية لكل الموظفين يخبرهم: "الـ IP الخاص بالراوتر أصبح يمتلك الـ MAC Address الخاص بي!". وبذلك تمر كل بيانات الموظفين عبر جهاز הهاكر أولاً (MitM).</li>
                            <li><strong>MAC Spoofing:</strong> الهاكر يغير الـ MAC Address الخاص بجهازه ليتطابق مع MAC Address لجهاز مسموح له بالدخول (مثل كمبيوتر المدير) لتجاوز الحماية.</li>
                            <li><strong>IP Spoofing:</strong> تزوير عنوان הـ IP المصدر في הـ Packet ليبدو وكأنه قادم من جهاز موثوق داخل الشركة.</li>
                        </ul>
                    </div>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">3. هجمات הـ DHCP</h3>
                        <p>بما أن رسائل DHCP تعتمد على الـ Broadcast بدون أي توثيق، فهي عرضة لهجومين خطيرين:</p>
                        <ul>
                            <li><strong>DHCP Starvation:</strong> הهاكر يرسل آلاف الطلبات المزيفة بـ MAC Addresses عشوائية ليجعل سيرفر الـ DHCP يستنفد كل الآيبيهات لديه. النتيجة: لا يمكن لأي موظف جديد الحصول على IP!</li>
                            <li><strong>Rogue DHCP Server:</strong> הهاكر يقوم بتشغيل سيرفر DHCP خاص به داخل الشركة. عندما يطلب موظف IP، يرد الهاكر أسرع من السيرفر الحقيقي، ويعطي الموظف IP و Gateway تشير إلى جهاز الهاكر. (Man-in-the-Middle)!</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "sec_acl",
                title: "2. قوائم التحكم في الوصول (ACLs)",
                content: `
                    <h1>ما هي הـ ACL؟</h1>
                    <p>الـ Access Control List هي بمثابة "حارس الأمن" الواقف على بوابات الراوتر (Interfaces). تستخدم للسماح (Permit) أو حظر (Deny) مرور البيانات بناءً على شروط نحددها نحن.</p>

                    <h2>أنواع הـ ACLs في سيسكو</h2>
                    <p>تنقسم إلى نوعين رئيسيين:</p>
                    
                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">1. Standard ACL (أرقامها 1-99)</h3>
                        <p>تستطيع تصفية البيانات بناءً على <strong>عنوان المصدر (Source IP) فقط</strong>. ولا تفهم أي شيء عن הـ Ports أو الخدمات.</p>
                        <p><strong>القاعدة الذهبية:</strong> يجب تطبيقها <strong>أقرب ما يمكن إلى الوجهة (Destination)</strong>. لكي لا نحظر جهازاً من الشبكة بأكملها بدلاً من حظره من سيرفر معين.</p>
                        <pre><code>R1(config)# access-list 10 deny 192.168.1.50
R1(config)# access-list 10 permit any</code></pre>
                        <p><em>(يحظر הـ IP رقم 50 فقط، ويسمح للبقية).</em></p>
                    </div>

                    <div class="concept-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.05);">
                        <h3 style="color: #d29922;">2. Extended ACL (أرقامها 100-199)</h3>
                        <p>ذكية جداً! تصفّي البيانات بناءً على: المصدر (Source)، الوجهة (Destination)، البروتوكول (TCP/UDP)، ورقم البورت (مثل 80 للويب أو 22 للـ SSH).</p>
                        <p><strong>القاعدة الذهبية:</strong> يجب تطبيقها <strong>أقرب ما يمكن إلى المصدر (Source)</strong>. حتى نوقف البيانات الممنوعة فوراً بدلاً من السماح لها باستهلاك كابلات الراوترات ثم رميها في النهاية!</p>
                        <pre><code>R1(config)# access-list 100 deny tcp host 192.168.1.50 host 10.1.1.100 eq 80
R1(config)# access-list 100 permit ip any any</code></pre>
                        <p><em>(يمنع الـ IP رقم 50 من تصفح موقع الويب الموجود على السيرفر 100، ويسمح بأي شيء آخر).</em></p>
                    </div>

                    <h2>قواعد بالغة الأهمية في الـ ACL</h2>
                    <ol>
                        <li><strong>Implicit Deny (الرفض الضمني):</strong> في نهاية أي ACL تقوم بكتابتها، يوجد سطر مخفي يرفض كل شيء `deny any`. إذا لم تكتب `permit` في النهاية، سيتم حظر الشبكة بالكامل!</li>
                        <li><strong>ترتيب الأسطر:</strong> الراوتر يقرأ الـ ACL من أعلى إلى أسفل (Top-Down). بمجرد أن يتطابق شرط، يتوقف الراوتر عن قراءة باقي الأسطر وينفذ الأمر. يجب دائماً كتابة الشروط المحددة (Specific) في الأعلى، والشروط العامة في الأسفل.</li>
                        <li><strong>اتجاه التطبيق (In/Out):</strong> يجب تطبيق الـ ACL على منفذ الراوتر وتحديد اتجاهها (In للبيانات الداخلة للراوتر، Out للبيانات الخارجة منه).
                        <pre><code>R1(config-if)# ip access-group 100 in</code></pre>
                        </li>
                    </ol>
                `
            },
            {
                id: "sec_portsec",
                title: "3. أمن الطبقة الثانية (Layer 2 Security)",
                content: `
                    <h1>تأمين السويتشات من الداخل</h1>
                    <p>أغلب هجمات الاختراق تتم من الطبقة الثانية (الربط المباشر بالسويتش). يجب أن نمنع أي شخص من فصل كابل الطابعة وتوصيله باللابتوب الخاص به للتسلل للشبكة!</p>

                    <div class="concept-box" style="border-color: #58a6ff; background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: #58a6ff;">1. حماية المنافذ (Port Security)</h3>
                        <p>تقوم هذه الميزة بإجبار منفذ السويتش على قبول MAC Address واحد فقط (أو عدد نحدده). إذا حاول أي جهاز آخر إرسال بيانات عبر نفس المنفذ، يتخذ السويتش رد فعل فورياً.</p>
                        <p><strong>طرق تعلم الـ MAC:</strong></p>
                        <ul>
                            <li><strong>Static:</strong> كتابة الـ MAC يدوياً (مُتعب جداً).</li>
                            <li><strong>Sticky:</strong> السويتش يحفظ أول MAC Address يراه على المنفذ ويلصقه في الـ Configuration تلقائياً.</li>
                        </ul>
                        <p><strong>ردود الفعل (Violations):</strong></p>
                        <ul>
                            <li><strong>Protect:</strong> يرمي بيانات الهاكر المجهول بصمت، ولا يخبر الإدارة.</li>
                            <li><strong>Restrict:</strong> يرمي البيانات ويرسل إشعاراً (Syslog) للإدارة، ويزيد عداد المخالفات.</li>
                            <li><strong>Shutdown (الافتراضي):</strong> بمجرد دخول MAC غريب، يُغلق المنفذ بالكامل (يصبح لونه أحمر err-disabled) ولن يفتح إلا بتدخل مهندس الشبكة يدوياً.</li>
                        </ul>
                        <pre><code>SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown</code></pre>
                    </div>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">2. DHCP Snooping (منع سيرفرات DHCP المزيفة)</h3>
                        <p>لمنع هجوم Rogue DHCP، نقوم بتفعيل DHCP Snooping على السويتش. هذه الميزة تقسم منافذ السويتش إلى:</p>
                        <ul>
                            <li><strong>Untrusted Ports (غير موثوقة):</strong> هي جميع منافذ الموظفين. السويتش <strong>سيرفض</strong> أي رسالة (DHCP Offer أو ACK) تأتي منها. (بذلك يمنع الهاكر من توزيع آيبيهات).</li>
                            <li><strong>Trusted Ports (موثوقة):</strong> هو المنفذ الوحيد المتصل بسيرفر הـ DHCP الحقيقي أو الراوتر. السويتش سيسمح بتمرير הـ Offers منه.</li>
                        </ul>
                        <pre><code>SW1(config)# ip dhcp snooping
SW1(config)# ip dhcp snooping vlan 10
SW1(config)# interface g0/1   (هذا منفذ السيرفر الحقيقي)
SW1(config-if)# ip dhcp snooping trust</code></pre>
                    </div>

                    <div class="concept-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.05);">
                        <h3 style="color: #d29922;">3. Dynamic ARP Inspection (DAI)</h3>
                        <p>لمنع هجوم ARP Spoofing (تسميم الـ ARP)، تعتمد تقنية DAI على قاعدة بيانات DHCP Snooping (التي تحتوي على الـ MAC والـ IP لكل موظف موثوق). السويتش سيقوم بتفتيش كل رسالة ARP، وإذا وجد أن الهاكر يدّعي أنه يملك IP لا يخصه، فإنه يسقط الرسالة فوراً.</p>
                    </div>
                `
            }
        ]
    },
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 5: Security Fundamentals".*?\]\s*\},',
    domain5_lessons.strip() + ',',
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 5 injected into academy.js successfully!")
