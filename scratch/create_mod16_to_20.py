import os

modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"

# ================= MOD 16: WIRELESS =================
html_path_mod16 = os.path.join(modules_dir, "mod16_wireless.html")
content_mod16 = """
<!-- =======================================================
     CEH MODULE 16: HACKING WIRELESS NETWORKS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod16" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">📶</span> Wireless Networks</h2>
    <p class="hero-tagline">اختراق الواي فاي: كسر التشفير، الهجمات الجانبية، وأدوات المراقبة المتقدمة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-blue);"></span> Module 16</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">📡</span>
      <h3>بروتوكولات التشفير والهجمات (Encryption & Attacks)</h3>
    </div>
    
    <div class="goal-cards-grid" dir="rtl">
      <div class="goal-card">
        <div class="goal-icon">🔑</div>
        <h4>WEP Cracking</h4>
        <div class="goal-subtitle">RC4 Vulnerability</div>
        <p>يعتمد على 24-bit IV الذي يتكرر بسرعة. يُخترق بهجمات (FMS, PTW, Chopchop) لكسر التشفير خلال دقائق.</p>
      </div>
      <div class="goal-card" style="border-color: #ff4757;">
        <div class="goal-icon" style="color: #ff4757;">🤝</div>
        <h4 style="color: #ff4757;">WPA/WPA2 Attacks</h4>
        <div class="goal-subtitle">4-Way Handshake</div>
        <p>اعتراض الـ Handshake وكسر الباسورد بهجوم القاموس، أو استخدام **PMKID Attack** و **KRACK**.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">😈</div>
        <h4>Evil Twin & Rogue AP</h4>
        <div class="goal-subtitle">MitM Attack</div>
        <p>نقطة وصول مزيفة تنتحل (ESSID/BSSID) للشبكة الشرعية، تُستخدم لسرقة البيانات بعد تنفيذ Deauth Attack.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🦷</div>
        <h4>Bluetooth Hacks</h4>
        <div class="goal-subtitle">Bluebugging</div>
        <p>رسائل مزعجة (Bluejacking)، سرقة بيانات (Bluesnarfing)، وسيطرة كاملة على الهاتف (Bluebugging).</p>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🛠️</span>
      <h3>أرسنال الأدوات הلاسلكية (Wireless Arsenal)</h3>
    </div>
    <div class="cyber-card" style="--tool-color: #00e5a0;">
      <div class="card-header"><h4>Aircrack-ng Suite</h4></div>
      <p>الأداة الأقوى لاختراق الشبكات. تتكون من (airmon-ng) للمراقبة، (airodump-ng) لالتقاط الحزم، (aireplay-ng) للحقن، و (aircrack-ng) لكسر المفاتيح.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Terminal</span></div>
        <pre><code># تفعيل وضع المراقبة
airmon-ng start wlan0

# التقاط مصافحة WPA
airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon

# هجوم Deauth لطرد العميل
aireplay-ng -0 10 -a 00:11:22:33:44:55 -c AA:BB:CC:DD:EE:FF wlan0mon</code></pre>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 17: MOBILE PLATFORMS =================
html_path_mod17 = os.path.join(modules_dir, "mod17_mobile.html")
content_mod17 = """
<!-- =======================================================
     CEH MODULE 17: MOBILE PLATFORMS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod17" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">📱</span> Mobile Platforms</h2>
    <p class="hero-tagline">أمن الهواتف: التجذير، ثغرات تطبيقات Android/iOS، وإدارة الـ MDM.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-green);"></span> Module 17</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🔓</span>
      <h3>التجذير وكسر الحماية (Rooting & Jailbreaking)</h3>
    </div>
    
    <div class="rd-compare-grid">
      <div class="rd-compare-col bad" style="border-color: #00e5a0;">
        <div class="rd-compare-title">🤖 Android Rooting</div>
        <ul class="rd-compare-list">
          <li>الحصول على صلاحيات Root لكسر حماية הـ Sandboxing للتطبيقات.</li>
          <li>من أشهر الأدوات: Magisk و SuperSU.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #f1c40f;">
        <div class="rd-compare-title">🍎 iOS Jailbreaking</div>
        <ul class="rd-compare-list">
          <li>إزالة قيود آبل المدمجة (Code Signing & Sandboxing).</li>
          <li>أنواع: Tethered (مقيد بحاسوب) و Untethered (غير مقيد).</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🐞</span>
      <h3>قائمة OWASP للهواتف و MDM (Mobile Vulnerabilities)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>OWASP Mobile Top Threats</h4></div>
      <p>سوء استخدام المنصة، تخزين بيانات بدون تشفير، ضعف المصادقة (Insecure Authentication)، وضعف أمان الاتصال (Lack of SSL/TLS Pinning).</p>
    </div>

    <div class="cyber-card" style="--tool-color: #00b4d8;">
      <div class="card-header"><h4>MDM Bypass (تجاوز أنظمة المؤسسات)</h4></div>
      <p>استغلال ثغرات بروتوكول הـ DEP للهروب من قيود تحكم المؤسسات (Wipe, Geofencing) على الأجهزة.</p>
    </div>
  </div>

</div>
"""

# ================= MOD 18: IoT & OT =================
html_path_mod18 = os.path.join(modules_dir, "mod18_iot_ot.html")
content_mod18 = """
<!-- =======================================================
     CEH MODULE 18: IoT & OT HACKING
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod18" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🏭</span> IoT & OT Hacking</h2>
    <p class="hero-tagline">أمن المصانع والأنظمة الحيوية: SCADA، نموذج Purdue، وبروتوكولات الـ IoT.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-orange);"></span> Module 18</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🌐</span>
      <h3>ثغرات إنترنت الأشياء (IoT Vulnerabilities)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #ffa502;">
      <p>ثغرات خطيرة في بروتوكولات مثل **MQTT** والذي يعمل غالباً بدون مصادقة وتشفير. يسمح للمهاجم بالاشتراك (Subscribe) ونشر بيانات ضارة.<br>
      الأجهزة الضعيفة يتم تجنيدها في شبكات **Botnets** (مثل Mirai) لتنفيذ هجمات DDoS مدمرة بسبب الباسوردات الافتراضية والـ Telnet.</p>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">⚙️</span>
      <h3>هندسة OT ونموذج Purdue (Industrial Security)</h3>
    </div>
    <div class="rd-compare-grid">
      <div class="rd-compare-col good" style="border-color: #00b4d8;">
        <div class="rd-compare-title">المستويات (Purdue Model)</div>
        <ul class="rd-compare-list">
          <li><strong>المستوى 0 & 1:</strong> المستشعرات والتحكم الأساسي (PLCs).</li>
          <li><strong>المستوى 2:</strong> الإشراف والمراقبة (HMI & SCADA).</li>
          <li><strong>المستوى 3.5:</strong> الـ Industrial DMZ العازلة.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #ff4757;">
        <div class="rd-compare-title">ثغرات البروتوكولات الصناعية</div>
        <ul class="rd-compare-list">
          <li>بروتوكولات (Modbus و DNP3) بُنيت للسرعة لا الأمان (No Encryption).</li>
          <li>تسمح بهجمات הـ MitM، הـ Replay، وحقن الأوامر (Command Injection).</li>
          <li>أمثلة: فيروس Stuxnet والهجوم على شبكات كهرباء أوكرانيا.</li>
        </ul>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 19: CLOUD =================
html_path_mod19 = os.path.join(modules_dir, "mod19_cloud.html")
content_mod19 = """
<!-- =======================================================
     CEH MODULE 19: CLOUD COMPUTING
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod19" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">☁️</span> Cloud Computing</h2>
    <p class="hero-tagline">أمن السحابة، ثغرات الحاويات، وإدارة صلاحيات الـ IAM.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-yellow);"></span> Module 19</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🌩️</span>
      <h3>التهديدات السحابية الشائعة (Cloud Threats)</h3>
    </div>
    <div class="goal-cards-grid" dir="rtl">
      <div class="goal-card">
        <div class="goal-icon">⚠️</div>
        <h4>Misconfiguration</h4>
        <p>ترك حاويات التخزين (S3 Buckets) مفتوحة للعامة دون تصريح.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🕷️</div>
        <h4>SSRF Attack</h4>
        <p>استغلال الخادم لسرقة بيانات الميتا الحساسة لـ AWS على IP (169.254.169.254).</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🔑</div>
        <h4>IAM Escalation</h4>
        <p>منح سياسات وصول فضفاضة مما يسمح بتصعيد الصلاحيات (Privilege Escalation).</p>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🐳</span>
      <h3>ثغرات Docker و Kubernetes (Containers Flaws)</h3>
    </div>
    
    <div class="rd-compare-grid">
      <div class="rd-compare-col bad" style="border-color: #00b4d8;">
        <div class="rd-compare-title">🐳 Docker Threats</div>
        <ul class="rd-compare-list">
          <li><strong>Exposed Daemon:</strong> منفذ API متاح (2375) يتيح تنفيذ أوامر كـ Root.</li>
          <li><strong>Container Breakout:</strong> هروب المهاجم للنظام المضيف (Host OS) بسبب الإفراط في الصلاحيات.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #00e5a0;">
        <div class="rd-compare-title">☸️ Kubernetes Threats</div>
        <ul class="rd-compare-list">
          <li><strong>Exposed Kubelet (10250):</strong> وصول غير مصرح به لتنفيذ RCE على הـ Pods.</li>
          <li><strong>Etcd Exposure:</strong> سرقة كل الـ Secrets و الـ Keys من قاعدة بيانات الكلاستر الأساسية.</li>
        </ul>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 20: CRYPTOGRAPHY =================
html_path_mod20 = os.path.join(modules_dir, "mod20_cryptography.html")
content_mod20 = """
<!-- =======================================================
     CEH MODULE 20: CRYPTOGRAPHY
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod20" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🔐</span> Cryptography</h2>
    <p class="hero-tagline">علم التشفير: التماثل، اللاتماثل، الـ PKI، وهجمات فك التشفير الرياضية.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-red);"></span> Module 20</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🔏</span>
      <h3>أنواع التشفير وخوارزمياته (Encryption Algorithms)</h3>
    </div>
    
    <div class="rd-compare-grid">
      <div class="rd-compare-col good" style="border-color: #00b4d8;">
        <div class="rd-compare-title">التشفير المتماثل (Symmetric)</div>
        <ul class="rd-compare-list">
          <li>استخدام مفتاح واحد للتشفير وفك التشفير (سريع).</li>
          <li><strong>AES:</strong> المعيار الذهبي الحالي، كتل بحجم 128-bit. النمط المفضل هو GCM لأمانه العالي.</li>
          <li><strong>DES/3DES:</strong> قديم وضعيف ويجب تجنبه.</li>
        </ul>
      </div>
      <div class="rd-compare-col good" style="border-color: #00e5a0;">
        <div class="rd-compare-title">التشفير اللامتماثل (Asymmetric)</div>
        <ul class="rd-compare-list">
          <li>استخدام زوج من المفاتيح (Public & Private).</li>
          <li><strong>RSA:</strong> يعتمد على الصعوبة في تحليل الأعداد الأولية (Factoring Primes).</li>
          <li><strong>ECC:</strong> أمان قوي بمفاتيح صغيرة جداً، مثالي للموبايل والـ IoT.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🧮</span>
      <h3>خوارزميات التجزئة والهجمات الجانبية (Hashes & Attacks)</h3>
    </div>
    <div class="cyber-card" style="--tool-color: #ffa502;">
      <div class="card-header"><h4>Hash Algorithms</h4></div>
      <p>دوال باتجاه واحد لضمان الـ Integrity. خوارزمية MD5 و SHA-1 تعتبر ضعيفة وعرضة لـ (Hash Collisions)، بينما SHA-2 و SHA-3 هما المعيار الآمن.</p>
    </div>
    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>Cryptanalysis Attacks (هجمات فك التشفير)</h4></div>
      <p><strong>الهجمات الرياضية:</strong> (Known-Plaintext, Chosen-Ciphertext).<br>
      <strong>الهجمات الجانبية (Side-Channel):</strong> تحليل وقت العمليات (Timing Attack) أو استهلاك الطاقة (Power Analysis) لمعرفة المفتاح.</p>
    </div>
  </div>

</div>
"""

# Write all files
for file_path, content in zip(
    [html_path_mod16, html_path_mod17, html_path_mod18, html_path_mod19, html_path_mod20],
    [content_mod16, content_mod17, content_mod18, content_mod19, content_mod20]
):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Created Modules 16, 17, 18, 19, 20 HTML files successfully.")
