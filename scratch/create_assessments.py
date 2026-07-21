import os

modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"

htb_content = """
<div class="meth-content-view" id="meth-content-assess-htb" style="display: none; --tool-color: #00e5a0;" dir="rtl">
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🏴‍☠️</span> HTB Writeup: "Corporate"</h2>
    <p class="hero-tagline">تقرير اختراق آلة HackTheBox بتصنيف "Hard" مع شرح مفصل للمنهجية</p>
  </div>
  
  <div class="cyber-card">
    <div class="card-header"><h3>1. Reconnaissance (الاستطلاع)</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">بدأت الفحص باستخدام Nmap لاكتشاف المنافذ المفتوحة، وتم التركيز على المنفذ 80 و 445.</p>
    <div class="cmd-ui-box">
      <div class="cmd-header"><span class="cmd-dot red"></span><span class="cmd-dot yellow"></span><span class="cmd-dot green"></span><span class="cmd-title">Nmap Scan</span></div>
      <pre><code>nmap -sC -sV -p- 10.10.10.X -oA nmap_full</code></pre>
    </div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3>2. Initial Access (الاختراق المبدئي)</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">باستخدام ثغرة LFI تمكنت من قراءة ملفات التكوين والوصول إلى بيانات الاعتماد المبدئية.</p>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3>3. Privilege Escalation (تصعيد الصلاحيات)</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">استغلال خدمة غير محمية تعمل بصلاحيات SYSTEM للوصول إلى الجذر (Root).</p>
  </div>
</div>
"""

bb_content = """
<div class="meth-content-view" id="meth-content-assess-bb" style="display: none; --tool-color: #ff0055;" dir="rtl">
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🐛</span> Bug Bounty: Account Takeover</h2>
    <p class="hero-tagline">تقرير ثغرة حقيقية (Redacted) أدت للاستيلاء الكامل على حسابات المستخدمين</p>
  </div>
  
  <div class="cyber-card">
    <div class="card-header"><h3>Vulnerability Details</h3></div>
    <div class="table-wrapper"><table class="interactive-table">
      <thead><tr><th>Severity</th><th>Vulnerability Type</th><th>Bounty</th></tr></thead>
      <tbody><tr><td style="color:#ff0055;">Critical (9.8)</td><td>IDOR + Broken Access Control</td><td>$2,500</td></tr></tbody>
    </table></div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3>Steps to Reproduce</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">
      1. تسجيل الدخول بحساب User A.<br>
      2. اعتراض طلب تغيير البريد الإلكتروني.<br>
      3. تغيير معامل <code>user_id</code> إلى الـ ID الخاص بـ User B.<br>
      4. تخطي حماية CSRF بسبب غياب الـ Validation على السيرفر.
    </p>
  </div>
</div>
"""

ad_content = """
<div class="meth-content-view" id="meth-content-assess-ad" style="display: none; --tool-color: #0088ff;" dir="rtl">
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">👑</span> AD Pentest: Zero to DA</h2>
    <p class="hero-tagline">محاكاة تقييم كامل لبيئة Active Directory من الصفر حتى Domain Admin</p>
  </div>
  
  <div class="cyber-card">
    <div class="card-header"><h3>1. LLMNR Poisoning & SMB Relay</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">تم استخدام Responder لالتقاط الـ Hashes، واستخدام ntlmrelayx للوصول المبدئي لمحطة عمل.</p>
    <div class="cmd-ui-box">
      <div class="cmd-header"><span class="cmd-dot red"></span><span class="cmd-dot yellow"></span><span class="cmd-dot green"></span><span class="cmd-title">Responder</span></div>
      <pre><code>responder -I eth0 -rdw</code></pre>
    </div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3>2. BloodHound Enumeration</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">تشغيل SharpHound لجمع البيانات ورسم خريطة الشبكة.</p>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3>3. Kerberoasting</h3></div>
    <p style="padding: 10px; color: var(--text-secondary);">تم استخراج تيكت لخدمة SQL، وكسر التشفير باستخدام Hashcat للوصول لصلاحيات Domain Admin.</p>
  </div>
</div>
"""

with open(os.path.join(modules_dir, 'mod_assess_htb.html'), 'w', encoding='utf-8') as f:
    f.write(htb_content)
    
with open(os.path.join(modules_dir, 'mod_assess_bugbounty.html'), 'w', encoding='utf-8') as f:
    f.write(bb_content)
    
with open(os.path.join(modules_dir, 'mod_assess_ad.html'), 'w', encoding='utf-8') as f:
    f.write(ad_content)

print("Created 3 assessment modules.")
