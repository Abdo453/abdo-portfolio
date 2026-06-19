import codecs

html_path = 'd:/abdo_portfolio/build/methodology.html'
js_path = 'd:/abdo_portfolio/build/js/methodology.js'

# Fix JS TypeError
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_data = f.read()
js_data = js_data.replace(".querySelector('.meth-content').scrollTo", ".querySelector('.meth-viewer').scrollTo")
with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_data)

# Inject Academy HTML and Fix Duplicate Sidebar
with codecs.open(html_path, 'r', 'utf-8') as f:
    html = f.read()

# Fix Duplicate Manual Walkthrough
old_manual = '''<div class="meth-item" id="meth-ef-p_manual" onclick="openMethPhase('p_manual')" data-search="manual analysis business logic happy path burp proxy">
            <span>🧠</span> <span>Manual Walkthrough</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_manual', '🧠 Manual Walkthrough')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-p_manual" onclick="openMethPhase('p_manual')" data-search="manual analysis business logic happy path burp proxy">
            <span>🧠</span> <span>Manual Walkthrough</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_manual', '🧠 Manual Walkthrough')">★</button>
          </div>'''
new_manual = '''<div class="meth-item" id="meth-ef-p_manual" onclick="openMethPhase('p_manual')" data-search="manual analysis business logic happy path burp proxy">
            <span>🧠</span> <span>Manual Walkthrough</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_manual', '🧠 Manual Walkthrough')">★</button>
          </div>'''
html = html.replace(old_manual, new_manual)

# Now inject p_home before p0 if not exists
if 'id="meth-content-p_home"' not in html:
    p_home_html = '''
      <!-- ACADEMY DASHBOARD (p_home) -->
      <div class="meth-content-view" id="meth-content-p_home" style="display: block; --tool-color: var(--neon-cyan);">
        
        <div class="phase-module-header" style="margin-bottom: 10px;">
          <div class="phase-module-icon" style="text-shadow: 0 0 15px var(--neon-purple);">🎓</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">Hunter Academy Dashboard</h2>
            <p class="phase-module-tagline">منصتك الاحترافية لاحتراف الأمن السيبراني واكتشاف الثغرات</p>
          </div>
        </div>

        <!-- Animated Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number" data-target="200">0</div>
            <div class="stat-label">Attack Vectors</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" data-target="85">0</div>
            <div class="stat-label">Live Tools</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" data-target="25">0</div>
            <div class="stat-label">Methodology Phases</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" data-target="100">0</div>
            <div class="stat-label">% Practical</div>
          </div>
        </div>

        <!-- Achievement System -->
        <div class="achievement-panel">
          <div class="rank-badge" id="userRankBadge">🥉</div>
          <div class="rank-info">
            <h3 id="userRankTitle">Rank: Script Kiddie</h3>
            <p id="userRankDesc">أكمل المهام (Checklists) في المنهجية لترفع تصنيفك إلى Bug Hunter!</p>
            <div style="margin-top:10px; background: var(--bg-color); height: 8px; border-radius: 4px; width: 100%; overflow: hidden; border: 1px solid var(--border-color);">
              <div id="userRankProgress" style="width: 0%; height: 100%; background: var(--neon-purple); transition: width 1s ease;"></div>
            </div>
          </div>
        </div>

        <!-- Skill Tree -->
        <h3 style="color: var(--text-color); margin-top: 40px; margin-bottom: 20px;"><span style="color:var(--neon-cyan);">⚡</span> Cybersecurity Skill Tree</h3>
        <div class="skill-tree">
          
          <div class="skill-branch" style="border-left: 4px solid var(--neon-cyan);">
            <h4><span style="color:var(--neon-cyan);">🌐</span> Network & Web Recon</h4>
            <div class="skill-nodes">
              <div class="skill-node">Subdomain Enumeration</div>
              <div class="skill-node">Port Scanning</div>
              <div class="skill-node">Tech Detection</div>
              <div class="skill-node">JS Analysis</div>
              <div class="skill-node">Directory Brute-force</div>
            </div>
          </div>

          <div class="skill-branch" style="border-left: 4px solid #f59e0b;">
            <h4><span style="color:#f59e0b;">⚔️</span> Core Exploitation</h4>
            <div class="skill-nodes">
              <div class="skill-node">XSS (Cross-Site Scripting)</div>
              <div class="skill-node">SQL Injection</div>
              <div class="skill-node">SSRF</div>
              <div class="skill-node">Command Injection</div>
              <div class="skill-node">File Upload</div>
            </div>
          </div>

          <div class="skill-branch" style="border-left: 4px solid var(--neon-purple);">
            <h4><span style="color:var(--neon-purple);">🧠</span> Advanced Logic & Scenarios</h4>
            <div class="skill-nodes">
              <div class="skill-node">IDOR</div>
              <div class="skill-node">CSRF</div>
              <div class="skill-node">Exploit Chaining</div>
              <div class="skill-node">API Hacking</div>
              <div class="skill-node">GraphQL Flaws</div>
            </div>
          </div>

        </div>

      </div>
'''
    # Find p0 to insert BEFORE it
    target_str = '<div class="meth-content-view" id="meth-content-p0"'
    html = html.replace(target_str, p_home_html + '\n      ' + target_str)
    # also hide p0 by default
    html = html.replace('id="meth-content-p0" style="display: block;', 'id="meth-content-p0" style="display: none;')
    
with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(html)
print('Fixed layout and injected academy dashboard.')
