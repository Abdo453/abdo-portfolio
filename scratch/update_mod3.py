import os

file_path = r"d:\abdo_portfolio\main\templates\main\modules\mod3_scanning.html"

html = """
<!-- =======================================================
     CEH MODULE 3: SCANNING NETWORKS
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod3" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">📡</span> Module 3: Scanning Networks</h2>
    <p class="hero-tagline">شرح شامل لكل أنواع الفحص (Scanning) وطرق الأتمتة واكتشاف البورتات وتجاوز أنظمة الحماية.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-blue);"></span> Module 03</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Nmap Mastery</span>
    </div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #ff5555; margin: 0;">🧠 أولاً: يعني إيه Scanning؟</h3></div>
    <p>بعد ما جمعت معلومات (Footprinting)، بتيجي مرحلة فحص الشبكة علشان تعرف:</p>
    <ul style="line-height: 1.8;">
        <li>الأجهزة اللي شغالة (Live Hosts)</li>
        <li>البورتات المفتوحة</li>
        <li>الخدمات (Services)</li>
        <li>نظام التشغيل (OS)</li>
        <li>الثغرات</li>
    </ul>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #50fa7b; margin: 0;">🧭 1) Host Discovery (اكتشاف الأجهزة)</h3></div>
    <p>🎯 <strong>الهدف:</strong> تعرف مين شغال على الشبكة.</p>
    
    <div class="meth-section" style="margin-top: 20px;">
        <h4 style="color: #8be9fd;">🔹 1. Ping Sweep</h4>
        <p><strong>الفكرة:</strong> يبعت ICMP لكل IP ويشوف مين رد.</p>
        <div class="cmd-ui-box">nmap -sn 192.168.1.0/24</div>
        <p>📌 <strong>معناه:</strong> <code>-sn</code> → scan بدون بورتات (بس hosts).<br>👉 <strong>الاستخدام:</strong> تعرف الأجهزة الموجودة.</p>

        <h4 style="color: #8be9fd; margin-top: 15px;">🔹 2. ARP Scan (أقوى في الشبكة المحلية)</h4>
        <div class="cmd-ui-box">netdiscover -r 192.168.1.0/24</div>
        <p>👉 <strong>ليه قوي؟</strong> بيشتغل حتى لو Ping مقفول 🔥.</p>
    </div>
  </div>

  <div class="cyber-card" style="border-left: 4px solid #f1fa8c;">
    <div class="card-header"><h3 style="color: #f1fa8c; margin: 0;">🌐 2) Port Scanning (فحص البورتات)</h3></div>
    <p>🎯 <strong>الهدف:</strong> تعرف أي بورت مفتوح وأي خدمة شغالة.</p>
    
    <div class="meth-section" style="margin-top: 20px;">
        <h4 style="color: #ffb86c;">🔹 1. TCP Connect Scan (العادي)</h4>
        <div class="cmd-ui-box">nmap -sT 192.168.1.1</div>
        <p>👉 <strong>بيعمل:</strong> اتصال كامل (3-way handshake).<br>📌 <strong>مميزاته:</strong> دقيق. | ❌ <strong>عيوبه:</strong> سهل يتكشف.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 2. TCP SYN Scan (Stealth Scan 🔥)</h4>
        <div class="cmd-ui-box">nmap -sS 192.168.1.1</div>
        <p>👉 <strong>بيعمل:</strong> SYN → SYN-ACK → يقفل قبل ما يكمل.<br>📌 <strong>مميزاته:</strong> أسرع + أقل كشف (ده أهم Scan تستخدمه في الامتحان).</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 3. FIN Scan</h4>
        <div class="cmd-ui-box">nmap -sF 192.168.1.1</div>
        <p>👉 <strong>بيستخدم:</strong> TCP FIN flag.<br>📌 <strong>الرد:</strong> لو البورت مفتوح → مفيش رد. لو مقفول → RST.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 4. XMAS Scan 🎄</h4>
        <div class="cmd-ui-box">nmap -sX 192.168.1.1</div>
        <p>👉 <strong>بيبعت:</strong> FIN + URG + PSH.<br>📌 <strong>الاستخدام:</strong> محاولة تجاوز firewall. | ❌ <strong>خطر:</strong> ممكن يتكشف بسهولة.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 5. UDP Scan (بطيء 🔥)</h4>
        <div class="cmd-ui-box">nmap -sU 192.168.1.1</div>
        <p>👉 <strong>بيستخدم:</strong> لاكتشاف خدمات زي DNS (53) و SNMP (161).<br>❌ <strong>عيوبه:</strong> بطيء جدًا.</p>
    </div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #bd93f9; margin: 0;">💣 أنواع Scan مهمة</h3></div>
    <ul style="line-height: 1.8; margin-top: 10px;">
        <li><strong>Scan Range معين:</strong> <code>nmap -p 80,443 192.168.1.1</code> (يفحص بورتات محددة).</li>
        <li><strong>Scan كل البورتات:</strong> <code>nmap -p- 192.168.1.1</code> (كل 65535 بورت).</li>
        <li><strong>سرعة الفحص (Threading):</strong> <code>nmap -T4 192.168.1.1</code> (من 0 لـ 5، رقم 5 سريع جدًا ومزعج للشبكة).</li>
    </ul>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #00e5a0; margin: 0;">🧠 قدرات Nmap المتقدمة</h3></div>
    
    <div class="meth-section" style="margin-top: 20px;">
        <h4 style="color: #50fa7b;">3) OS Detection (معرفة النظام)</h4>
        <div class="cmd-ui-box">nmap -O 192.168.1.1</div>
        <p>👉 يحدد: Windows / Linux.</p>

        <h4 style="color: #50fa7b; margin-top: 15px;">4) Service Detection</h4>
        <div class="cmd-ui-box">nmap -sV 192.168.1.1</div>
        <p>👉 يجيب نوع الخدمة والإصدار (مثال: Apache 2.4 / OpenSSH 7.6).</p>

        <h4 style="color: #50fa7b; margin-top: 15px;">5) Nmap Script Engine (NSE)</h4>
        <div class="cmd-ui-box">nmap --script vuln 192.168.1.1</div>
        <p>👉 يعمل فحص ثغرات. 📌 مكان السكريبتات: <code>/usr/share/nmap/scripts</code></p>

        <h4 style="color: #50fa7b; margin-top: 15px;">6) الفحص الشامل (Full Scan)</h4>
        <div class="cmd-ui-box">nmap -A 192.168.1.1</div>
        <p>👉 يعمل: Port scan + OS detection + Service detection + Scripts.<br>❌ <strong>عيبه:</strong> Noise عالي (سهل يتكشف).</p>

        <h4 style="color: #50fa7b; margin-top: 15px;">7) Netcat (Manual Scan)</h4>
        <div class="cmd-ui-box">nc -nv 192.168.1.1 80</div>
        <p>👉 يختبر هل البورت مفتوح. مهم في الاختبار اليدوي.</p>
    </div>
  </div>

  <div class="cyber-card" style="border-left: 4px solid #ff4757;">
    <div class="card-header"><h3 style="color: #ff4757; margin: 0;">🧠 8) Evading Firewall / IDS</h3></div>
    
    <div class="meth-section" style="margin-top: 20px;">
        <h4 style="color: #ffb86c;">🔹 1. تغيير Source Port</h4>
        <div class="cmd-ui-box">nmap --source-port 80 192.168.1.1</div>
        <p>👉 يخلي الترافيك شكله جاي من web server.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 2. Fragmentation</h4>
        <div class="cmd-ui-box">nmap -f 192.168.1.1</div>
        <p>👉 يقسم الباكيت → صعب تتكشف.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 3. Decoy (تضليل)</h4>
        <div class="cmd-ui-box">nmap -D RND:10 192.168.1.1</div>
        <p>👉 يخلي الفحص يبان وكأنه جي من IPs وهمية.</p>

        <h4 style="color: #ffb86c; margin-top: 15px;">🔹 4. تغيير MAC</h4>
        <div class="cmd-ui-box">nmap --spoof-mac 0 192.168.1.1</div>
    </div>
  </div>

  <div class="cyber-card" style="background: rgba(255, 85, 85, 0.1);">
    <div class="card-header"><h3 style="color: #ff5555; margin: 0;">⚠️ تحذيرات مهمة (جاية في الامتحان)</h3></div>
    <ul style="line-height: 1.8; margin-top: 10px;">
        <li>Nmap ممكن يبعت <strong>100,000+ request</strong>.</li>
        <li>بعض الفحوصات ممكن تكشفك أو <strong>توقف السيرفر 💀</strong>.</li>
        <li>لازم تبدأ بـ Scan بسيط ثم متقدم.</li>
    </ul>
    
    <h4 style="color: #f1fa8c; margin-top: 20px;">🔥 أفضل Scan عملي (احفظه)</h4>
    <div class="cmd-ui-box">nmap -sS -sV -O -T4 192.168.1.1</div>
    <p>👉 ده: Stealth, Service, OS, وسريع.</p>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #fff; margin: 0;">💡 خلاصة سريعة</h3></div>
    <table class="interactive-table" dir="rtl" style="margin-top: 15px;">
        <thead>
            <tr>
                <th>النوع</th>
                <th>الاستخدام</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Ping</td><td>اكتشاف الأجهزة</td></tr>
            <tr><td>ARP</td><td>أقوى في الشبكة المحلية</td></tr>
            <tr><td>SYN</td><td>أفضل Scan</td></tr>
            <tr><td>TCP</td><td>واضح وسهل</td></tr>
            <tr><td>UDP</td><td>خدمات خاصة</td></tr>
            <tr><td>OS</td><td>معرفة النظام</td></tr>
            <tr><td>sV</td><td>معرفة الخدمة</td></tr>
            <tr><td>NSE</td><td>فحص ثغرات</td></tr>
        </tbody>
    </table>
  </div>

</div>
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated mod3_scanning.html with user content")
