import os

html_path_mod4 = r"d:\abdo_portfolio\main\templates\main\modules\mod4_enumeration.html"

content_mod4 = """
<!-- =======================================================
     CEH MODULE 4: ENUMERATION
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod4" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">📋</span> Enumeration</h2>
    <p class="hero-tagline">مرحلة الاستجابة المباشرة: الكشف عن المستخدمين، المجموعات، والموارد المشتركة عبر الشبكة.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-orange);"></span> Module 04</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🧩</span>
      <h3>بروتوكولات التعداد العميقة وأدواتها (Enumeration Protocols)</h3>
    </div>

    <div class="cyber-card" style="--tool-color: #00b4d8;">
      <div class="card-header"><h4>1. تعداد NetBIOS & SMB</h4></div>
      <p>يُستخدم في بيئة مايكروسوفت لاستخراج الحواسيب داخل الـ Domain والمجلدات المشتركة. منفذ 445 (SMB) من أخطر أهداف الاستكشاف لاستخراج الجلسات النشطة (Null Sessions) وسياسات الباسوردات.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">SMB Arsenal</span></div>
        <pre><code># استخدام nbtstat لمعرفة أسماء الأجهزة
nbtstat -A 192.168.1.5

# الأداة الأقوى لاستخراج كافة مستخدمي الـ Domain والـ Shares والـ SIDs
enum4linux -a 192.168.1.5</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #f1c40f;">
      <div class="card-header"><h4>2. تعداد SNMP</h4></div>
      <p>بروتوكول إدارة أجهزة الشبكة. الاعتماد على Community Strings الافتراضية (public/private) قد يكشف عن جداول التوجيه والأجهزة المتصلة.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">SNMP Arsenal</span></div>
        <pre><code># استخراج شجرة معلومات متكاملة (MIB tree) من خادم يعتمد على public string
snmpwalk -v 2c -c public 192.168.1.1</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>3. تعداد LDAP و RPC</h4></div>
      <p><strong>LDAP (Port 389):</strong> استخراج أسماء المستخدمين الموثوقة في الـ Active Directory والهيكلية الإدارية لاستغلالها في الـ Social Engineering.<br>
      <strong>RPC (Port 135):</strong> استكشاف التطبيقات التي تعمل في الخلفية عبر الـ Endpoint Mapper.</p>
    </div>
  </div>

</div>
"""

with open(html_path_mod4, "w", encoding="utf-8") as f:
    f.write(content_mod4)

print(f"Created {html_path_mod4}")
