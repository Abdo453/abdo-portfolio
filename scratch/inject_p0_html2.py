import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

new_html = """
        <!-- Real World Case (Starbucks) -->
        <div class="real-world-case" dir="rtl">
          <div class="rwc-header">
            <div class="rwc-title">📂 Real World Case — Starbucks IDOR</div>
            <div class="rwc-badge">💰 $2,000 Bounty</div>
          </div>
          <div class="rwc-timeline">
            <div class="rwc-step">
              <div class="rwc-step-number">1</div>
              <div class="rwc-step-content">
                <strong>Target Selection:</strong> تم اختيار starbucks.com من HackerOne نظراً لضخامة الـ Scope الخاص به.
              </div>
            </div>
            <div class="rwc-step">
              <div class="rwc-step-number">2</div>
              <div class="rwc-step-content">
                <strong>Subdomain Enumeration:</strong> استخدام <code>subfinder + amass</code> واكتشاف 2,847 نطاق فرعي.
                <div class="hot-label">🔥 Found Internal Dev Server</div>
              </div>
            </div>
            <div class="rwc-step">
              <div class="rwc-step-number">3</div>
              <div class="rwc-step-content">
                <strong>Discovery & Exploitation:</strong> العثور على لوحة تحكم داخلية بها ثغرة IDOR تسمح بالوصول لبيانات المستخدمين عبر تغيير <code>user_id</code>.
              </div>
            </div>
            <div class="rwc-step">
              <div class="rwc-step-number">4</div>
              <div class="rwc-step-content">
                <strong>Result:</strong> تم الإبلاغ وحصل الباحث على <span style="color:#2ed573; font-weight:bold;">✅ $2,000 Bounty</span>.
              </div>
            </div>
          </div>
        </div>

        <!-- Practice Lab CTA -->
        <div class="practice-lab-cta" dir="rtl" style="border: 1px solid var(--accent-primary); background: linear-gradient(180deg, var(--bg-card) 0%, #0a111a 100%); box-shadow: inset 0 2px 0 0 rgba(0, 229, 160, 0.2);">
          <div class="pl-icon">🧪</div>
          <div class="pl-content">
            <div class="pl-title">هل أنت جاهز للتطبيق العملي؟</div>
            <div class="pl-desc">قم بتجربة ما تعلمته في بيئة آمنة وتفاعلية للتدرب على Subdomain Enumeration.</div>
          </div>
          <button class="pl-btn">▶ Launch Interactive Labs</button>
        </div>
"""

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Insert before <!-- Mark Phase Complete -->
content = content.replace("<!-- Mark Phase Complete -->", new_html + "\n        <!-- Mark Phase Complete -->")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected Real World Case and Practice Lab into Phase 0.")
