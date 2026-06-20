import os

modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"

# ================= MOD 7: MALWARE =================
html_path_mod7 = os.path.join(modules_dir, "mod7_malware.html")
content_mod7 = """
<!-- =======================================================
     CEH MODULE 7: MALWARE THREATS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod7" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🦠</span> Malware Threats</h2>
    <p class="hero-tagline">الفيروسات، الرانسوم وير، والهندسة العكسية للبرمجيات الخبيثة المتقدمة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-red);"></span> Module 07</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🧩</span>
      <h3>مكونات البرمجيات الخبيثة المتقدمة (Malware Components)</h3>
    </div>
    
    <div class="goal-cards-grid" dir="rtl">
      <div class="goal-card">
        <div class="goal-icon">🔒</div>
        <h4>Crypter (برامج التشفير)</h4>
        <p>تُشفر الكود المصدري للبرمجية للتهرب من مضادات الفيروسات. لا يتم فك التشفير إلا في الذاكرة الحية (RAM).</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🗜️</div>
        <h4>Packer (برامج الضغط)</h4>
        <p>تضغط الـ PE File لإخفاء تركيبته (Obfuscation) وتغيير بصمته (Hash) لتعطيل التحليل الثابت.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">📦</div>
        <h4>Dropper (برامج الإسقاط)</h4>
        <p>ملف ناقل شرعي الشكل يحتوي بداخله البرمجية الخبيثة ويقوم بإسقاطها خفية على النظام.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">⬇️</div>
        <h4>Downloader</h4>
        <p>أداة صغيرة يتم إرسالها أولاً، وتقوم بتحميل البرمجية الرئيسية من خادم القيادة والسيطرة (C2).</p>
      </div>
      <div class="goal-card" style="border-color: #ff4757;">
        <div class="goal-icon" style="color:#ff4757;">💉</div>
        <h4 style="color:#ff4757;">Injector (برامج الحقن)</h4>
        <p>تحقن الكود الخبيث داخل عمليات النظام الشرعية (مثل explorer.exe) لتجنب اكتشافه.</p>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🔬</span>
      <h3>الهندسة العكسية (Reverse Engineering)</h3>
    </div>
    <div class="rd-compare-grid">
      <div class="rd-compare-col good" style="border-color: #00b4d8;">
        <div class="rd-compare-title">📄 التحليل الثابت (Static Analysis)</div>
        <ul class="rd-compare-list">
          <li>تحليل الكود دون تشغيله للبحث عن المؤشرات (IoCs).</li>
          <li>استخراج الـ Strings لاكتشاف روابط C2 أو Passwords.</li>
          <li>فحص الدوال المستوردة (PE Header) لمعرفة قدرات البرنامج.</li>
          <li>استخدام Disassemblers مثل IDA Pro أو Ghidra.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #ff4757;">
        <div class="rd-compare-title">⚙️ التحليل الديناميكي (Dynamic Analysis)</div>
        <ul class="rd-compare-list">
          <li>تشغيل البرمجية الخبيثة داخل بيئة معزولة (Sandbox).</li>
          <li>مراقبة تغييرات النظام (Registry & File System).</li>
          <li>رصد اتصالات الشبكة وطلبات الـ DNS.</li>
          <li>استخدام Debuggers كـ x64dbg لتتبع الذاكرة وسجلات المعالج خطوة بخطوة.</li>
        </ul>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 8: SNIFFING =================
html_path_mod8 = os.path.join(modules_dir, "mod8_sniffing.html")
content_mod8 = """
<!-- =======================================================
     CEH MODULE 8: SNIFFING
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod8" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🎧</span> Sniffing</h2>
    <p class="hero-tagline">اعتراض البيانات، تسميم بروتوكول ARP، وفلاتر Wireshark العميقة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-blue);"></span> Module 08</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">📡</span>
      <h3>تقنيات هجمات التنصت النشط (Active Sniffing)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #00b4d8;">
      <div class="card-header"><h4>1. إغراق جدول MAC (MAC Flooding)</h4></div>
      <p>إغراق الـ Switch بآلاف العناوين المزيفة لملء جدول الـ CAM. هذا يُجبر الـ Switch على العمل كـ Hub، مسبباً بث كل الحزم لجميع المنافذ لالتقاطها.</p>
    </div>

    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>2. تسميم ARP (ARP Poisoning / Spoofing)</h4></div>
      <p>يستغل غياب المصادقة في ARP. المهاجم يُقنع الضحية والـ Gateway بأن جهازه هو الطرف الآخر المستهدف، ليمرر الحركة عبره في هجوم (Man-in-the-Middle).</p>
    </div>

    <div class="cyber-card" style="--tool-color: #ffa502;">
      <div class="card-header"><h4>3. تجويع خادم DHCP (DHCP Starvation & Spoofing)</h4></div>
      <p>استنزاف عناوين הـ IP المتوفرة من خادم الـ DHCP عن طريق إرسال طلبات عناوين وهمية، ليقوم المهاجم لاحقاً بتشغيل Rogue DHCP ويصبح هو الـ Gateway الخاص بالشبكة.</p>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🦈</span>
      <h3>Wireshark Arsenal (فلاتر وايرشارك المتقدمة)</h3>
    </div>
    <div class="cmd-block">
      <div class="cmd-header"><span class="cmd-lang">Wireshark Filters</span></div>
      <pre><code># تصفية حسب عنوان IP معين
ip.addr == 192.168.1.1

# عرض طلبات ويب من نوع GET أو التي تحتوي على كلمات سر
http.request.method == "GET"
http contains "password"

# عرض حزم استجابة ARP فقط لاكتشاف تسميم ARP
arp.opcode == 2

# تصفية حسب عنوان MAC
eth.addr == 00:11:22:33:44:55</code></pre>
    </div>
  </div>

</div>
"""

# ================= MOD 9: SOCIAL ENGINEERING =================
html_path_mod9 = os.path.join(modules_dir, "mod9_social_eng.html")
content_mod9 = """
<!-- =======================================================
     CEH MODULE 9: SOCIAL ENGINEERING
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod9" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🎭</span> Social Engineering</h2>
    <p class="hero-tagline">فن التلاعب بالبشر: التصيد الاحتيالي، الانتحال، وأدوات المهندس الاجتماعي.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-yellow);"></span> Module 09</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🎣</span>
      <h3>أساليب الهندسة الاجتماعية (Techniques)</h3>
    </div>
    
    <div class="goal-cards-grid" dir="rtl">
      <div class="goal-card">
        <div class="goal-icon">📧</div>
        <h4>التصيد الاحتيالي (Phishing)</h4>
        <p>إرسال رسائل مزيفة تبدو من مصدر موثوق لحث الضحية على إدخال بيانات الاعتماد.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🎯</div>
        <h4>التصيد الموجه (Spear Phishing)</h4>
        <p>هجوم مخصص لشخص أو قسم معين بُني على استطلاع مسبق للهدف (OSINT).</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🐋</div>
        <h4>صيد الحيتان (Whaling)</h4>
        <p>يستهدف كبار الشخصيات والمسؤولين التنفيذيين (C-Level Executives) لصلاحياتهم العالية.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">👥</div>
        <h4>الانتحال (Pretexting)</h4>
        <p>تقمص شخصية (فني IT أو بنك) لإقناع الضحية بتقديم معلومات حساسة هاتفياً أو حضورياً.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🚶</div>
        <h4>التتبع (Tailgating / Piggybacking)</h4>
        <p>دخول المهاجم لمبنى مؤمن عن طريق تتبع موظف مصرح له عن قرب (سواء برضاه أو غفلة منه).</p>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🧰</span>
      <h3>مجموعة أدوات المهندس الاجتماعي (SET)</h3>
    </div>
    <div class="cyber-card" style="--tool-color: #ff4757;">
      <p>أداة جبارة (Social-Engineer Toolkit) مفتوحة المصدر.</p>
      <ul style="color:#e2e8f0; line-height: 1.8;">
        <li><strong style="color:#ff4757">Site Cloner:</strong> نسخ صفحة حقيقية متطابقة بالكامل (مثل صفحة لوجن فيسبوك) لسرقة الباسوردات.</li>
        <li><strong style="color:#ff4757">Credential Harvester:</strong> استقبال وتسجيل البيانات بمجرد إدخالها في الموقع المستنسخ.</li>
        <li><strong style="color:#ff4757">Infectious Media (USB):</strong> تحضير أقراص USB محملة ببرمجيات خبيثة ذاتية التشغيل كطُعم للإيقاع بالموظفين.</li>
      </ul>
    </div>
  </div>

</div>
"""

# ================= MOD 10: DoS =================
html_path_mod10 = os.path.join(modules_dir, "mod10_dos.html")
content_mod10 = """
<!-- =======================================================
     CEH MODULE 10: Denial-of-Service
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod10" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🛑</span> Denial-of-Service (DoS/DDoS)</h2>
    <p class="hero-tagline">استنزاف الموارد: الهجمات الحجمية، الاستنزاف، والتضخيم الانعكاسي.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-orange);"></span> Module 10</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">💥</span>
      <h3>تقنيات حجب الخدمة (Attack Vectors)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #00b4d8;">
      <div class="card-header"><h4>1. استنزاف البروتوكول (TCP SYN Flood)</h4></div>
      <p>إغراق الخادم بطلبات `SYN` بعناوين مزيفة. يترك الخادم الجلسات في الانتظار (Half-open) حتى تمتلئ الذاكرة وتتوقف الخدمة.</p>
    </div>

    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>2. التضخيم والانعكاس (Amplification Attacks)</h4></div>
      <p>استغلال الـ UDP (مثل DNS أو NTP). يرسل المهاجم طلب صغير بعنوان الضحية (Spoofed)، فيرد الخادم بإجابة ضخمة جداً تسحق شبكة الضحية.</p>
    </div>

    <div class="cyber-card" style="--tool-color: #ffa502;">
      <div class="card-header"><h4>3. هجوم طبقة التطبيقات (Slowloris)</h4></div>
      <p>فتح آلاف الاتصالات مع الخادم، وإرسال الـ Headers ببطء شديد وتجزئتها، مما يستنفد الـ Concurrent Connections دون الحاجة لباندويث ضخم.</p>
    </div>

    <div class="cyber-card" style="--tool-color: #2ed573;">
      <div class="card-header"><h4>4. هجوم Smurf</h4></div>
      <p>إرسال طلب ICMP بعنوان الضحية لعنوان بث (Broadcast) ضخم. كل الأجهزة في تلك الشبكة ترد على الضحية في نفس اللحظة مضخمة الهجوم.</p>
    </div>
  </div>

</div>
"""

# ================= MOD 11: SESSION HIJACKING =================
html_path_mod11 = os.path.join(modules_dir, "mod11_session_hijacking.html")
content_mod11 = """
<!-- =======================================================
     CEH MODULE 11: SESSION HIJACKING
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod11" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🔓</span> Session Hijacking</h2>
    <p class="hero-tagline">السيطرة على جلسات المستخدمين الشرعيين متجاوزاً عمليات المصادقة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-green);"></span> Module 11</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🌐</span>
      <h3>أساليب اختطاف الجلسات (Hijacking Levels)</h3>
    </div>
    
    <div class="rd-compare-grid">
      <div class="rd-compare-col bad" style="border-color: #ff4757;">
        <div class="rd-compare-title">⚠️ اختطاف مستوى الشبكة (TCP/IP)</div>
        <ul class="rd-compare-list">
          <li>مراقبة اتصال TCP نشط واعتراضه.</li>
          <li>الاعتماد على **توقع رقم التسلسل (Sequence Number Prediction)**.</li>
          <li>حقن الحزمة الشرعية برقم التسلسل الصحيح ليتعامل الخادم مع المهاجم وكأنه العميل الأصلي.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #ffa502;">
        <div class="rd-compare-title">⚠️ اختطاف مستوى التطبيق (App Level)</div>
        <ul class="rd-compare-list">
          <li><strong>سرقة الكوكيز (Sniffing):</strong> التقاط الـ Session ID وحقنه في المتصفح.</li>
          <li><strong>تثبيت الجلسة (Session Fixation):</strong> فرض معرف جلسة مسبق على الضحية ليسجل دخوله به.</li>
          <li><strong>استغلال XSS:</strong> حقن كود جافاسكريبت لسرقة الكوكي النشط.</li>
        </ul>
      </div>
    </div>
  </div>

</div>
"""

# Write all files
for file_path, content in zip(
    [html_path_mod7, html_path_mod8, html_path_mod9, html_path_mod10, html_path_mod11],
    [content_mod7, content_mod8, content_mod9, content_mod10, content_mod11]
):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Created Modules 7, 8, 9, 10, 11 HTML files successfully.")
