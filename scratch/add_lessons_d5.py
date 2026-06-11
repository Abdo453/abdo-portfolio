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
                title: "1. أنواع الهجمات (Malware, Phishing, Spoofing)",
                content: `
                    <h1>Security Threats & Vulnerabilities (التهديدات الأمنية)</h1>
                    <p>في عالم الشبكات الحديث، لم يعد تأمين الشبكة مجرد خيار بل هو الضرورة القصوى. في هذا الدرس سنتعرف على أشهر الطرق التي يستخدمها المخترقون لاختراق الشبكات وكيفية التعرف عليها.</p>
                    
                    <div class="concept-box" style="border-color: #d73a49; background: rgba(215, 58, 73, 0.05);">
                        <h3 style="color: #d73a49;">1. البرمجيات الخبيثة (Malware)</h3>
                        <ul>
                            <li><strong>Viruses (الفيروسات):</strong> أكواد خبيثة تلتصق بملفات شرعية (مثل ملف Word) ولا تعمل إلا إذا قام المستخدم بفتح الملف.</li>
                            <li><strong>Worms (الديدان):</strong> أخطر من الفيروسات لأنها <strong>تنتشر تلقائياً</strong> عبر الشبكة مستغلة الثغرات الأمنية دون الحاجة لتدخل المستخدم.</li>
                            <li><strong>Ransomware (برامج الفدية):</strong> تقوم بتشفير ملفات الجهاز أو الشركة بالكامل، وتطلب دفع فدية (عادة بعملة رقمية) مقابل إعطائك مفتاح فك التشفير.</li>
                            <li><strong>Trojans (أحصنة طروادة):</strong> برامج تبدو شرعية ومفيدة (مثل لعبة أو أداة مجانية) ولكنها تحتوي على باب خلفي (Backdoor) يسمح للمخترق بالتحكم بجهازك.</li>
                        </ul>
                    </div>

                    <h2>2. هندسة العقول (Social Engineering)</h2>
                    <p>هي عملية التلاعب بالبشر لجعلهم يكشفون عن معلومات سرية أو يقومون بأفعال ضارة، بدلاً من اختراق الأنظمة تقنياً.</p>
                    <ul>
                        <li><strong>Phishing (التصيد الاحتيالي):</strong> إرسال إيميل يبدو وكأنه من البنك أو مديرك يطلب منك إدخال كلمة المرور في موقع مزيف.</li>
                        <li><strong>Spear Phishing:</strong> تصيد احتيالي ولكنه <strong>مخصص وموجه</strong> لشخص بعينه (مثل المدير المالي للشركة) بعد جمع معلومات عنه.</li>
                        <li><strong>Baiting (الاستدراج):</strong> ترك "فلاشة" (USB Drive) ملغمة بالفيروسات في موقف سيارات الشركة، طمعاً في أن يلتقطها موظف فضولي ويضعها في حاسوب الشركة.</li>
                    </ul>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">3. هجمات الشبكة (Network Attacks)</h3>
                        <ul>
                            <li><strong>Spoofing (الانتحال):</strong> تزوير هوية. مثلاً (MAC Spoofing) تغيير الـ MAC Address لجهازك ليبدو كجهاز شخص آخر، أو (IP Spoofing) لتزوير مصدر الرسالة.</li>
                            <li><strong>Denial of Service - DoS (حجب الخدمة):</strong> إغراق السيرفر أو الراوتر بملايين الطلبات الوهمية حتى ينهار ولا يستطيع خدمة المستخدمين الحقيقيين. إذا تم الهجوم من أجهزة متعددة وموزعة يسمى <strong>DDoS</strong>.</li>
                            <li><strong>Man-in-the-Middle (رجل في المنتصف):</strong> المخترق يضع نفسه بين جهازك والسيرفر. أنت تعتقد أنك تتحدث مع السيرفر، والسيرفر يعتقد أنه يتحدث معك، والمخترق يرى ويقرأ كل البيانات بينكما!</li>
                        </ul>
                    </div>
                `
            },
            {
                id: "sec_acl",
                title: "2. قوائم التحكم في الوصول (Access Control Lists - ACL)",
                content: `
                    <h1>Access Control Lists (ACLs)</h1>
                    <p>قوائم التحكم في الوصول (ACL) هي الأداة الأساسية في راوترات سيسكو لتطبيق الـ <strong>Security Policies (سياسات الأمان)</strong>. هي عبارة عن قائمة من الشروط التي تُخبر الراوتر: "إذا جاءت رسالة بهذا الشكل، اسمح لها بالمرور (Permit)، وإذا كانت بشكل آخر، امنعها (Deny)".</p>

                    <h2>أنواع הـ ACL في سيسكو</h2>
                    <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                        <h3 style="color: var(--accent);">1. Standard ACL (من 1 إلى 99)</h3>
                        <p>هذا النوع بسيط جداً ولكنه غبي قليلاً. هو ينظر فقط إلى <strong>الـ Source IP (عنوان المرسل)</strong>. لا يهتم أين تذهب الرسالة ولا نوعها (تصفح، بينج، إيميل).</p>
                        <p><strong>القاعدة الذهبية:</strong> يتم تطبيقه <strong>أقرب ما يمكن إلى الهدف (Destination)</strong> لكي لا نمنع المرسل من الوصول لشبكات أخرى بالخطأ.</p>
                        <p><strong>مثال:</strong> منع الجهاز 10.1.1.5 من الوصول للشبكة بالكامل:</p>
                        <pre><code>R1(config)# access-list 10 deny host 10.1.1.5
R1(config)# access-list 10 permit any</code></pre>
                    </div>

                    <div class="concept-box" style="border-color: #d29922; background: rgba(210, 153, 34, 0.05);">
                        <h3 style="color: #d29922;">2. Extended ACL (من 100 إلى 199)</h3>
                        <p>هذا النوع ذكي وقوي. يمكنه الفلترة بناءً على:</p>
                        <ul>
                            <li>Source IP (عنوان المرسل)</li>
                            <li>Destination IP (عنوان الهدف)</li>
                            <li>Protocol (TCP, UDP, ICMP)</li>
                            <li>Port Number (80 لصفحات الويب، 21 للـ FTP، إلخ...)</li>
                        </ul>
                        <p><strong>القاعدة الذهبية:</strong> يتم تطبيقه <strong>أقرب ما يمكن إلى المرسل (Source)</strong> لكي نمنع الرسائل المرفوضة من استهلاك الباندويث عبر الشبكة.</p>
                        <p><strong>مثال:</strong> السماح لشبكة 192.168.1.0 بتصفح الويب (منفذ 80) فقط نحو السيرفر 10.0.0.5، ومنعها من عمل Ping:</p>
                        <pre><code>R1(config)# access-list 100 permit tcp 192.168.1.0 0.0.0.255 host 10.0.0.5 eq 80
R1(config)# access-list 100 deny icmp 192.168.1.0 0.0.0.255 host 10.0.0.5</code></pre>
                    </div>

                    <h2>الـ Implicit Deny (المنع الضمني)</h2>
                    <p>قاعدة قاتلة يقع فيها المبتدئون: <strong>في نهاية كل ACL توجد قاعدة مخفية تمنع كل شيء (Deny Any)</strong>. إذا أنشأت قائمة لتمنع شخصاً واحداً ولم تكتب بعدها <code>permit any</code>، فإن الراوتر سيمنع كل الناس من المرور!</p>
                `
            },
            {
                id: "sec_portsec",
                title: "3. حماية المنافذ (Port Security) وتقنيات التشفير",
                content: `
                    <h1>حماية منافذ السويتش (Port Security)</h1>
                    <p>أغلب الاختراقات في الشركات لا تأتي من الإنترنت، بل من شخص دخل مبنى الشركة ووضع كابلاً في "فيشة" الحائط (Switch Port). تقنية <strong>Port Security</strong> تمنع ذلك عن طريق تحديد <strong>أي الأجهزة (عناوين الـ MAC) مسموح لها بالدخول من هذا المنفذ.</strong></p>

                    <h2>إعدادات الـ Port Security</h2>
                    <p>لكي نطبق الحماية على المنفذ f0/1 ونسمح لجهاز واحد فقط (مثال: جهاز الموظف أحمد) بالعمل عليه:</p>
                    <ol>
                        <li><strong>تحويل المنفذ لـ Access:</strong> الحماية لا تعمل على الـ Trunk.
                        <pre><code>SW1(config-if)# switchport mode access</code></pre>
                        </li>
                        <li><strong>تفعيل الخدمة:</strong>
                        <pre><code>SW1(config-if)# switchport port-security</code></pre>
                        </li>
                        <li><strong>تحديد العدد الأقصى المسموح (Maximum):</strong> جهاز واحد فقط.
                        <pre><code>SW1(config-if)# switchport port-security maximum 1</code></pre>
                        </li>
                        <li><strong>حفظ عنوان الـ MAC (Sticky):</strong> بدلاً من أن أكتب رقم הـ MAC يدوياً، أمر Sticky يجعل السويتش يسجل أول MAC يراه على المنفذ ويحفظه في إعداداته ليصبح هو الـ MAC الشرعي الوحيد!
                        <pre><code>SW1(config-if)# switchport port-security mac-address sticky</code></pre>
                        </li>
                    </ol>

                    <div class="concept-box" style="border-color: #d73a49; background: rgba(215, 58, 73, 0.05);">
                        <h3 style="color: #d73a49;">ماذا لو جاء شخص غريب بكابل آخر؟ (Violation Modes)</h3>
                        <p>هناك 3 ردود أفعال للسويتش عند اكتشاف MAC غريب:</p>
                        <ul>
                            <li><strong>1. Shutdown (وهو الافتراضي):</strong> يغلق المنفذ تماماً ويتحول لحالة (err-disable). لا يفتح إلا بتدخل المهندس شخصياً (بكتابة shutdown ثم no shutdown). يسجل تنبيهاً.</li>
                            <li><strong>2. Restrict:</strong> لا يغلق المنفذ بالكامل، بل يمنع بيانات المخترق فقط، ويسمح للموظف الشرعي بالعمل، ولكنه يسجل تنبيهاً لمدير الشبكة.</li>
                            <li><strong>3. Protect:</strong> مثل Restrict يمنع بيانات المخترق بصمت، ولكن <strong>دون أن يسجل أي تنبيه!</strong> (غير مفضل أمنياً).</li>
                        </ul>
                    </div>

                    <h2>أساسيات التشفير والـ VPN (Cryptography)</h2>
                    <p>عندما نرسل بيانات حساسة (مثل كلمات مرور أو أرقام فيزا) عبر الإنترنت، لا يجب أن تُرسل كنصوص واضحة (Clear Text) وإلا سيقرؤها أي شخص يقوم بـ (Man-in-the-Middle). نحتاج للتشفير.</p>
                    <ul>
                        <li><strong>التشفير (Encryption):</strong> تحويل البيانات لطلاسم. يستخدم لـ <strong>السرية (Confidentiality)</strong>. أشهر البروتوكولات: AES.</li>
                        <li><strong>الهاش (Hashing):</strong> معادلة رياضية (ذات اتجاه واحد) تُنتج بصمة فريدة للملف. إذا تغير حرف واحد بالملف تتغير البصمة بالكامل. نستخدمه لـ <strong>النزاهة (Integrity)</strong> للتأكد أن الملف لم يُعدّل في الطريق. أشهر بروتوكولاته: SHA-256 و MD5.</li>
                        <li><strong>VPN (Virtual Private Network):</strong> شبكة وهمية تستخدم التشفير (مثل IPsec) لإنشاء "نفق آمن" عبر الإنترنت، لربط فرعين ببعضهما كأنهما متصلان بكابل مباشر ومحمي.</li>
                    </ul>
                `
            }
        ]
    }
"""

new_content = re.sub(
    r'\{\s*chapter:\s*"Domain 5: Security Fundamentals \(أساسيات الأمن\)".*?\]\s*\}',
    domain5_lessons.strip(),
    content,
    flags=re.DOTALL
)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Domain 5 injected successfully into academy.js!")
