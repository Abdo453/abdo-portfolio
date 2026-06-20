import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

new_html = """      <!-- ═══════ REDESIGN V3: Dark Hacker Components ═══════ -->
      <div id="rd-hero-section">
        
        <!-- 3. Hunt Session Tracker -->
        <div class="hunt-tracker">
          <div class="hunt-tracker-left">
            <div class="hunt-phase-icons">
              <div class="hunt-phase-icon active">🌐</div>
              <div class="hunt-phase-icon">📂</div>
              <div class="hunt-phase-icon">💉</div>
              <div class="hunt-phase-icon">📋</div>
            </div>
            <div class="hunt-progress-container">
              <div class="hunt-progress-bar"><div class="hunt-progress-fill"></div></div>
            </div>
          </div>
          <button class="start-hunt-btn">Start Hunt</button>
        </div>

        <!-- 4. Stats Dashboard -->
        <div class="stats-dashboard">
          <div class="stat-card">
            <div class="stat-icon" style="color: var(--accent-secondary);">🌍</div>
            <div class="stat-info"><span class="stat-value">15,000</span><span class="stat-label">Subdomains</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="color: var(--accent-primary);">🔗</div>
            <div class="stat-info"><span class="stat-value">5,000</span><span class="stat-label">Endpoints</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="color: var(--accent-warning);">⚡</div>
            <div class="stat-info"><span class="stat-value">4-6 hrs</span><span class="stat-label">Avg. Time</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="color: var(--success);">💰</div>
            <div class="stat-info"><span class="stat-value">$12.5k</span><span class="stat-label">Total Bounty</span></div>
          </div>
        </div>

        <!-- 5. Workflow Bar -->
        <div class="workflow-bar">
          <div class="workflow-step completed">✅ Scope</div>
          <div class="workflow-arrow active">→</div>
          <div class="workflow-step active">🌐 Recon</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">📂 Discovery</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">💉 Exploit</div>
          <div class="workflow-arrow">→</div>
          <div class="workflow-step">📋 Report</div>
        </div>

        <!-- 7. Breadcrumb -->
        <div class="hacker-breadcrumb">
          <span>Offensive Security</span>
          <span class="separator">›</span>
          <span>Bug Bounty</span>
          <span class="separator">›</span>
          <span class="active">Subdomain Enumeration</span>
        </div>

      </div>"""

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to replace from <!-- ═══════ REDESIGN V2: Hero Stats ═══════ --> up to the end of <div id="rd-hero-section">
# Because rd-hero-section has child divs, a simple regex might be tricky. Let's use DOTALL.
pattern = r'<!-- ═══════ REDESIGN V2: Hero Stats ═══════ -->\s*<div id="rd-hero-section">.*?</div>\s*</div>'

content = re.sub(pattern, new_html, content, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected Dark Hacker top components (Tracker, Stats, Workflow).")
