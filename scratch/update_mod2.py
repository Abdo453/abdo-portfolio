import os

file_path = r"d:\abdo_portfolio\main\templates\main\modules\mod2_footprinting.html"

html = """
<!-- =======================================================
     CEH MODULE 2: FOOTPRINTING & RECONNAISSANCE
     ======================================================= -->
<div class="meth-content-view" id="meth-content-mod2" style="display:none;" dir="rtl">
  
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">👁️‍🗨️</span> Module 2: Footprinting & Recon</h2>
    <p class="hero-tagline">شرح مبسط وعملي لمرحلة جمع المعلومات مع فهم وظيفة كل أداة بالتفصيل.</p>
    <div class="hero-meta">
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-blue);"></span> Module 02</span>
      <span class="meta-pill"><span class="pill-dot" style="background:var(--neon-purple);"></span> Practical OSINT</span>
    </div>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #ff5555; margin: 0;">🧠 أولاً: يعني إيه Footprinting؟</h3></div>
    <p>هو ببساطة: <br><strong style="color: #00e5a0; font-size: 1.1em;">"جمع أكبر قدر ممكن من المعلومات عن الهدف قبل الهجوم"</strong></p>
    <ul style="line-height: 1.8;">
        <li>تعرف السيستم شغال إزاي.</li>
        <li>تعرف نقاط الضعف.</li>
        <li>تسهل عملية الاختراق بعد كده.</li>
    </ul>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #50fa7b; margin: 0;">⚡ أنواع Footprinting</h3></div>
    
    <div class="meth-section" style="margin-top: 20px;">
        <h4 style="color: #8be9fd;">1) Passive Footprinting (بدون لمس الهدف)</h4>
        <p>👉 يعني: <strong>تجمع معلومات من غير ما الهدف يحس بيك</strong></p>
        
        <h5 style="color: #f1fa8c; margin-top: 15px;">🔎 1. Google Dorks</h5>
        <p>دي طريقة ذكية للبحث في جوجل عن معلومات حساسة.</p>
        <div class="cmd-ui-box">site:example.com <span style="color: #6272a4;"># يجيب كل الصفحات الخاصة بالموقع</span></div>
        <div class="cmd-ui-box">filetype:pdf site:example.com <span style="color: #6272a4;"># يدور على ملفات PDF (ممكن تكون فيها بيانات حساسة)</span></div>
        <div class="cmd-ui-box">intitle:"index of" <span style="color: #6272a4;"># يجيب صفحات فيها ملفات مفتوحة (خطير 🔥)</span></div>
        <p>👉 <strong>الاستخدام:</strong> استخراج ملفات، اكتشاف صفحات مخفية، معلومات حساسة.</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">🌐 2. Shodan</h5>
        <p>🔹 محرك بحث للأجهزة مش المواقع (كاميرات، سيرفرات، أجهزة IoT).</p>
        <div class="cmd-ui-box">apache country:EG</div>

        <h5 style="color: #f1fa8c; margin-top: 15px;">🌍 3. Netcraft</h5>
        <p>👉 يجيب نوع السيرفر (Apache / Nginx) ونظام التشغيل.</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">🔐 4. crt.sh</h5>
        <p>👉 يجيب Subdomains من الـ SSL Certificates (مثل test.example.com و mail.example.com).</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">📧 5. hunter.io</h5>
        <p>👉 يجيب إيميلات الشركة (مهم جداً في الـ Social Engineering).</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">⚙️ 6. theHarvester</h5>
        <div class="cmd-ui-box">theHarvester -d example.com -b google</div>
        <p>📌 <strong>معناه:</strong> <code>-d</code> (الدومين) و <code>-b</code> (مصدر البيانات). <br>👉 يطلع: Emails و Subdomains.</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">🧩 7. sublist3r</h5>
        <div class="cmd-ui-box">sublist3r -d example.com</div>
        <p>👉 يجيب Subdomains.</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">🛰️ 8. Whois</h5>
        <div class="cmd-ui-box">whois example.com</div>
        <p>👉 يجيب: صاحب الدومين، تاريخ التسجيل، ومزود الـ DNS.</p>

        <h5 style="color: #f1fa8c; margin-top: 15px;">👨‍💻 9. Social Media (LinkedIn)</h5>
        <p>👉 تجمع معلومات عن الموظفين (تستخدم في Phishing و Social Engineering).</p>
    </div>

    <div class="meth-section" style="margin-top: 40px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
        <h4 style="color: #ff5555;">⚠️ 2) Active Footprinting (الهجوم المباشر)</h4>
        <p>👉 هنا الهدف ممكن يلاحظك ويسجل بياناتك في الـ Logs ⚠️</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">📡 1. Ping</h5>
        <div class="cmd-ui-box">ping example.com</div>
        <p>👉 يستخدم في معرفة هل السيرفر شغال، ومعرفة الـ IP.</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">🧭 2. Traceroute</h5>
        <div class="cmd-ui-box">traceroute example.com</div>
        <p>👉 يجيب المسار والراوترات بينك وبين الهدف.</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">🌐 3. DNS Recon</h5>
        <div class="cmd-ui-box">dnsrecon -d example.com</div>
        <p>👉 يجيب DNS records و Subdomains.</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">🕷️ 4. Photon</h5>
        <div class="cmd-ui-box">photon -u http://example.com</div>
        <p>👉 يعمل Crawling للموقع ويجيب مسارات URLs مخفية.</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">🚪 5. Knockpy</h5>
        <div class="cmd-ui-box">knockpy example.com</div>
        <p>👉 يجيب Subdomains بطريقة الـ Brute Force.</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">📂 6. Dirb / 7. Dirbuster</h5>
        <div class="cmd-ui-box">dirb http://example.com</div>
        <p>👉 يكتشف الدلائل (Directories) المخفية (Dirbuster نفس الفكرة لكن بواجهة رسومية GUI).</p>

        <h5 style="color: #ffb86c; margin-top: 15px;">⚡ 8. Wfuzz</h5>
        <div class="cmd-ui-box">wfuzz -c -w wordlist.txt http://example.com/FUZZ</div>
        <p>📌 <strong>معناه:</strong> يجرب كلمات من القاموس مكان كلمة FUZZ. <br>👉 يكتشف صفحات مخفية و APIs.</p>
    </div>
  </div>

  <div class="cyber-card" style="border-left: 4px solid #bd93f9;">
    <div class="card-header"><h3 style="color: #bd93f9; margin: 0;">🔥 الفرق المهم: Subdomain vs Subdirectory</h3></div>
    <ul style="line-height: 1.8; margin-top: 10px;">
        <li><strong>Subdomain (نطاق فرعي):</strong> <code>test.example.com</code></li>
        <li><strong>Subdirectory (دليل فرعي):</strong> <code>example.com/admin</code></li>
    </ul>
  </div>

  <div class="cyber-card">
    <div class="card-header"><h3 style="color: #00e5a0; margin: 0;">💻 جزء اللاب (مهم جداً ليك)</h3></div>
    <p>المحاضرة قالت تستخدم بيئة التدريب التالية لاكتساب الخبرة العملية بدون مخاطر قانونية:</p>
    <ul>
        <li>Kali Linux (نظام المهاجم)</li>
        <li>Windows (هدف اختباري)</li>
        <li>Metasploitable (سيرفر مصاب بالثغرات عمداً)</li>
    </ul>
    <p>👉 <strong>الهدف:</strong> تعمل <strong>بيئة تدريب للاختراق</strong> وتطبق عليها الأوامر السابقة.</p>
  </div>

  <div class="cyber-card" style="background: rgba(255, 255, 255, 0.05);">
    <div class="card-header"><h3 style="color: #fff; margin: 0;">💡 خلاصة سريعة</h3></div>
    <ul style="line-height: 1.8; margin-top: 10px;">
        <li><strong>Passive:</strong> آمن + بدون كشف.</li>
        <li><strong>Active:</strong> أسرع + ممكن تتكشف (يجب توخي الحذر).</li>
        <li><strong>كل أداة هدفها محدد:</strong> Emails, Subdomains, Directories, أو معلومات السيرفر.</li>
    </ul>
  </div>

</div>
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated mod2_footprinting.html with user content")
