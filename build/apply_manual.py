import re
import codecs

path = 'd:/abdo_portfolio/build/methodology.html'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add sidebar item
sidebar_item = '''          <div class="meth-item" id="meth-ef-p_manual" onclick="openMethPhase('p_manual')" data-search="manual analysis business logic happy path burp proxy">
            <span>🧠</span> <span>Manual Walkthrough</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_manual', '🧠 Manual Walkthrough')">★</button>
          </div>'''

if 'id="cat-discover">' in content:
    content = content.replace('id="cat-discover">', 'id="cat-discover">\n' + sidebar_item)

# 2. Add main content block
manual_html = '''
      <!-- Phase: Manual Application Walkthrough -->
      <div class="meth-content-view" id="meth-content-p_manual" style="display: none; --tool-color: #8b5cf6;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🧠</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">Manual Walkthrough & Business Logic</h2>
            <p class="phase-module-tagline">أهم مرحلة! الأدوات لا تفهم "المنطق التجاري"، عقلك هو أقوى أداة.</p>
            <div class="phase-meta-badges">
              <span class="badge-time">⏱️ 1-3 Hours</span>
              <span class="badge-difficulty" style="background:#8b5cf6; color:#fff;">Crucial Step</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>🚶‍♂️ The Happy Path (المسار الطبيعي)</h3></div>
          <p>قبل تشغيل أي أداة (مثل Burp Active Scan أو ffuf)، يجب أن تتصفح الموقع كمستخدم عادي وتسجل كل حركة:</p>
          <ul class="t-check-list">
            <li>✔ <strong>قم بإنشاء 3 حسابات:</strong> (حساب Admin إن أمكن، وحساب User A، وحساب User B). هذا أساس لاختبار ثغرات IDOR و Privilege Escalation.</li>
            <li>✔ <strong>اضغط على كل زر:</strong> لا تترك صفحة (Profile, Settings, Billing, Uploads) إلا وتزورها بينما Burp Suite يعمل في الخلفية (Proxy History).</li>
            <li>✔ <strong>افهم دورة عمل الموقع (Business Logic):</strong> ما هو الهدف الأساسي للموقع؟ (شراء منتجات، حجز تذاكر، تحويل أموال؟). الثغرات الخطيرة دائماً تكون في الـ Core Feature.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>🕵️‍♂️ الاستكشاف اليدوي المباشر (Direct Checks)</h3></div>
          <p>هناك ملفات أساسية يجب أن تفحصها بيدك بمجرد فتح الهدف:</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>المسار / الملف</th><th>لماذا نفحصه يدوياً؟</th></tr></thead>
            <tbody>
              <tr><td><code>/robots.txt</code></td><td>يحتوي أحياناً على مسارات `/admin/` أو `/api/v1/` المخفية التي لا تريد الشركة من Google أرشفتها.</td></tr>
              <tr><td><code>/sitemap.xml</code></td><td>خريطة كاملة للموقع، قد تكشف عن مسارات غير مرتبطة بالواجهة الرئيسية.</td></tr>
              <tr><td><code>/.well-known/</code></td><td>مجلد حساس جداً، ابحث بداخله عن <code>security.txt</code> أو <code>apple-app-site-association</code> أو إعدادات OAuth.</td></tr>
              <tr><td><code>Ctrl + U</code> (Source Code)</td><td>ابحث عن التعليقات <code>&lt;!-- --&gt;</code>، مفاتيح API، أو روابط مخفية لنسخ الـ Staging.</td></tr>
            </tbody>
          </table></div>
        </div>

        <div class="cyber-card border-neon">
          <div class="card-header"><h3 style="color: var(--neon-purple);"><span class="hero-icon">💡</span> Pro Tips: نصائح ذهبية للبحث اليدوي</h3></div>
          <ul class="t-check-list">
            <li>🔥 <strong>قاعدة الـ 403 Bypass:</strong> هل جربت الدخول إلى <code>/admin</code> وحصلت على 403؟ جرب <code>/admin/</code> أو <code>/admin.json</code> أو أضف Header <code>X-Forwarded-For: 127.0.0.1</code>! (ابحث دائماً عن طرق التخطي اليدوية).</li>
            <li>🔥 <strong>تحليل الـ JavaScript:</strong> افتح الـ DevTools (F12) -> Sources -> اضغط <code>Ctrl + Shift + F</code> وابحث عن كلمات مثل <code>token</code>, <code>api_key</code>, <code>admin</code>, <code>hidden</code>.</li>
            <li>🔥 <strong>العب في الـ Parameters:</strong> إذا رأيت رابطاً مثل <code>?user_id=105</code>، جرب تغييره يدوياً إلى <code>?user_id=106</code> (ثغرة IDOR واضحة!). إذا رأيت <code>role=user</code> غيرها إلى <code>role=admin</code>.</li>
          </ul>
        </div>
        
        <p class="os-section-label">🛑 When to Stop?</p>
        <div class="stop-check-box">
          <div class="stop-check-title">✅ هل أنهيت الفحص اليدوي؟</div>
          <ul class="phase-checklist" id="checklist-p_manual-stop" style="margin:0 0 14px;">
            <li class="checklist-item" onclick="toggleCheck(this,'p_manual-stop',0)"><div class="check-box"></div><div class="check-label">هل ملأت الـ Proxy History في Burp بكافة وظائف الموقع؟</div></li>
            <li class="checklist-item" onclick="toggleCheck(this,'p_manual-stop',1)"><div class="check-box"></div><div class="check-label">هل قمت بإنشاء حسابين على الأقل لتجربة الصلاحيات؟</div></li>
            <li class="checklist-item" onclick="toggleCheck(this,'p_manual-stop',2)"><div class="check-box"></div><div class="check-label">هل قرأت robots.txt و Source Code للصفحة الرئيسية؟</div></li>
          </ul>
        </div>

        <button class="mark-complete-btn" id="complete-btn-p_manual" onclick="markPhaseComplete('p_manual','p6')" style="margin-top: 20px;">
          ✅ Mark Phase Complete — Manual Analysis Done → Proceed to Directory Discovery
        </button>
      </div>
'''

# Find the start of Category 2 phases to inject the manual phase HTML
if '<!-- Phase 6: Directory Discovery -->' in content:
    content = content.replace('<!-- Phase 6: Directory Discovery -->', manual_html + '\n\n      <!-- Phase 6: Directory Discovery -->')

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied Manual Phase updates successfully.")
