import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

new_html = """      <!-- Phase 0: Subdomain Enumeration — BUG BOUNTY OS MODULE -->
      <div class="meth-content-view" id="meth-content-p0" style="display: block;">

        <!-- Phase Header -->
        <div class="phase-header-new" dir="rtl">
          <div class="phase-header-top">
            <div class="phase-icon-large">💻</div>
            <div>
              <h1 class="phase-title-new">Subdomain Enumeration</h1>
              <p class="phase-subtitle-new">Build your full attack surface before touching the target — as used in real Bug Bounty</p>
            </div>
          </div>
          <div class="phase-meta-row">
            <div class="meta-pill difficulty">🟠 Medium</div>
            <div class="meta-pill">⏱ 20-40 min</div>
            <div class="meta-pill">🔧 subfinder · amass · httpx</div>
            <div class="meta-pill" style="color:#ffd700;">💰 $500 → $5,000</div>
          </div>
        </div>

        <!-- Goal Cards -->
        <div class="goal-cards-grid" dir="rtl">
          <div class="goal-card what">
            <div class="goal-card-header">ℹ️ What is it?</div>
            <p>عملية جمع أسماء النطاقات الفرعية (Subdomains) المرتبطة بالنطاق الرئيسي للهدف. الهدف هو توسيع الـ Attack Surface لتجد أنظمة منسية أو بيئات اختبار.</p>
          </div>
          <div class="goal-card goal">
            <div class="goal-card-header">🎯 The Goal</div>
            <p>إيجاد لوحة تحكم، أو بيئة Staging، أو API داخلي، أو نقطة نسيها المطورون وتركوا فيها ثغرة سهلة الاستغلال.</p>
          </div>
        </div>

        <!-- Terminal Command Block -->
        <div class="hacker-terminal" dir="ltr">
          <div class="h-term-header">
            <div class="h-term-dots">
              <div class="h-term-dot r"></div><div class="h-term-dot y"></div><div class="h-term-dot g"></div>
            </div>
            <div class="h-term-title">① Passive Collection</div>
            <div class="h-term-copy">📋 Copy</div>
          </div>
          <div class="h-term-body">
            <span class="hl-cmd">subfinder</span> <span class="hl-flag">-d</span> target.com <span class="hl-flag">-all</span> | <span class="hl-cmd">httpx</span> <span class="hl-flag">-sc</span> <span class="hl-flag">-td</span> <span class="hl-flag">-title</span>
            <br><br><span class="hl-comment"># Collects subdomains passively and probes them for live web servers.</span>
          </div>
          <div class="h-term-footer">
            <button class="sim-btn" onclick="this.nextElementSibling.style.display='block';">▶ Simulate Execution</button>
            <div class="h-term-output">[INF] Found 1450 subdomains...<br>[200] https://dev.target.com [Apache/2.4.41]<br>[403] https://admin.target.com [nginx]</div>
          </div>
        </div>

        <!-- Interactive Decision Tree -->
        <div class="decision-tree-container" dir="rtl">
          <div class="decision-node">
            📊 هل يهمك النطاق الخاص بـ dev / staging / admin ؟
            <div class="decision-btns">
              <button class="decision-btn yes" onclick="this.parentElement.parentElement.nextElementSibling.nextElementSibling.style.display='block';">YES</button>
              <button class="decision-btn no">NO</button>
            </div>
          </div>
          <div class="decision-path"></div>
          <div class="decision-node result" style="display:none;">
            أولوية قصوى! بيئات الاختبار غالباً حمايتها أضعف وممتلئة بالثغرات السهلة.
          </div>
          <div class="bonus-tip">⚡ بونص: دائماً تحقق من CNAME للبحث عن Subdomain Takeover!</div>
        </div>

        <!-- Tools Grid -->
        <div class="tools-hacker-grid" dir="ltr">
          <div class="tool-hacker-card">
            <div class="tool-h-name">subfinder</div>
            <div class="tool-h-desc">Fast passive subdomain enumeration tool. Uses multiple sources.</div>
          </div>
          <div class="tool-hacker-card">
            <div class="tool-h-name">amass</div>
            <div class="tool-h-desc">In-depth attack surface mapping and asset discovery.</div>
          </div>
          <div class="tool-hacker-card">
            <div class="tool-h-name">httpx</div>
            <div class="tool-h-desc">Multi-purpose HTTP toolkit to run probes concurrently.</div>
          </div>
        </div>

        <!-- Mistakes vs Best Practices -->
        <div class="mistakes-practices-grid" dir="rtl">
          <div class="mp-col mistakes">
            <div class="mp-header">❌ Mistakes</div>
            <div class="mp-item">الاكتفاء بأداة واحدة (مثل Sublist3r)</div>
            <div class="mp-item">عدم فحص النطاقات التي تعطي 404 للبحث عن Takeover</div>
          </div>
          <div class="mp-col practices">
            <div class="mp-header">✅ Best Practices</div>
            <div class="mp-item">دمج نتائج أكثر من أداة وإزالة التكرار (sort -u)</div>
            <div class="mp-item">استخدام DNS Resolvers سريعة لتسريع عملية الفحص</div>
          </div>
        </div>

        <!-- Checklist -->
        <div class="hacker-checklist" dir="rtl">
          <div class="hk-check-header">✅ Checklist — Saved Automatically</div>
          <div class="hk-check-item">
            <div class="hk-checkbox checked" onclick="this.classList.toggle('checked'); this.parentElement.classList.toggle('completed');">✓</div>
            <div class="hk-check-text">
              <span class="cmd" dir="ltr">subfinder -d target.com</span>
              <span class="desc">Passive Subdomain Enum</span>
            </div>
          </div>
          <div class="hk-check-item">
            <div class="hk-checkbox" onclick="this.classList.toggle('checked'); this.innerHTML = this.classList.contains('checked') ? '✓' : ''; this.parentElement.classList.toggle('completed');"></div>
            <div class="hk-check-text">
              <span class="cmd" dir="ltr">dnsx -l subs.txt</span>
              <span class="desc">Resolve Live Domains</span>
            </div>
          </div>
          <div class="hk-check-item">
            <div class="hk-checkbox" onclick="this.classList.toggle('checked'); this.innerHTML = this.classList.contains('checked') ? '✓' : ''; this.parentElement.classList.toggle('completed');"></div>
            <div class="hk-check-text">
              <span class="cmd" dir="ltr">httpx -l live.txt</span>
              <span class="desc">Probe for Web Servers</span>
            </div>
          </div>
        </div>
        
        <!-- Mark Phase Complete -->
        <button class="start-hunt-btn" style="width:100%; margin-top:20px; font-size:16px;">✅ Mark Phase Complete — Proceed to Port Scanning</button>

      </div>
"""

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'<!-- Phase 0: Subdomain Enumeration — BUG BOUNTY OS MODULE -->.*?<!-- Phase 1: Port Scanning -->'
content = re.sub(pattern, new_html + "\n      <!-- Phase 1: Port Scanning -->", content, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Phase 0 replaced with Dark Hacker Theme layout.")
