# -*- coding: utf-8 -*-
import os
import re

filepath = 'main/templates/main/home.html'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update title and description
text = text.replace(
    '<meta name="description" content="Interactive Cybersecurity Portfolio of Abdo Ramdan — Security Researcher &amp; OSCP Candidate" />',
    '<meta name="description" content="HunterOS — Actionable Bug Bounty Academy & Learning Lab" />'
)
text = text.replace(
    '<title>Abdo Ramdan — Interactive Cybersecurity Console & Learning Lab</title>',
    '<title>HunterOS — Actionable Bug Bounty Academy & Learning Lab</title>'
)

# 2. Update Header Menu & Logo
old_header = """  <!-- Top Cyber Status Bar -->
  <header class="cyber-header">
    <div style="display:flex; align-items:center; gap:12px;">
      <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileSidebar()" style="display:none;" aria-label="Toggle Navigation">
        ☰ Profile
      </button>
      <div class="header-logo">
        <span class="logo-bracket">&lt;</span>Abdo Ramdan<span class="logo-bracket">/&gt;</span>
      </div>
    </div>"""

new_header = """  <!-- Top Cyber Status Bar -->
  <header class="cyber-header">
    <div style="display:flex; align-items:center; gap:12px;">
      <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileSidebar()" style="display:none;" aria-label="Toggle Navigation">
        ☰ Menu
      </button>
      <div class="header-logo">
        <span class="logo-bracket">&lt;</span>HunterOS<span class="logo-bracket">/&gt;</span>
      </div>
    </div>"""

text = text.replace(old_header, new_header)

# 3. Extract Portfolio Panes
def get_pane_content(pane_id, next_pane_id):
    start_tag = f'<div class="workspace-pane" id="{pane_id}">'
    next_tag = f'<div class="workspace-pane" id="{next_pane_id}">'
    
    start_idx = text.find(start_tag)
    end_idx = text.find(next_tag)
    
    if start_idx == -1 or end_idx == -1:
        print(f"Error: Could not find bounds for {pane_id} and {next_pane_id}")
        return ""
    
    # Extract the block
    block = text[start_idx:end_idx].strip()
    
    # Remove the wrapper <div class="workspace-pane" id="..."> ... </div>
    inner_start = block.find('>') + 1
    inner_end = block.rfind('</div>')
    
    return block[inner_start:inner_end].strip()

skills_content = get_pane_content('pane-skills', 'pane-projects')
projects_content = get_pane_content('pane-projects', 'pane-writeups')
certs_content = get_pane_content('pane-certs', 'pane-contact')
contact_content = get_pane_content('pane-contact', 'pane-academy')

# 4. Remove Portfolio Panes from original spots
start_skills = text.find('<div class="workspace-pane" id="pane-skills">')
end_projects = text.find('<div class="workspace-pane" id="pane-writeups">')
text = text[:start_skills] + text[end_projects:]

# Replace certs + contact with empty or joiner
start_certs = text.find('<div class="workspace-pane" id="pane-certs">')
end_contact = text.find('<div class="workspace-pane" id="pane-academy">')
text = text[:start_certs] + text[end_contact:]

# 5. Replace pane-terminal with pane-dashboard
dashboard_html = """        <!-- 1. DASHBOARD VIEW (DEFAULT ACTIVE) -->
        <div class="workspace-pane active" id="pane-dashboard">
          
          <!-- Obsidian Header -->
          <div class="dashboard-hero">
            <h2 class="hero-main-title">🎯 HunterOS</h2>
            <p class="hero-tagline">Learn • Hunt • Practice</p>
          </div>

          <!-- Active Hunt Console -->
          <div class="cyber-card dashboard-session-card">
            <div class="card-header"><h3>📡 Active Hunt Console</h3></div>
            <div class="session-box-layout">
              <div class="session-actions-primary">
                <button class="hunt-btn primary" onclick="openStartHuntModal()" style="font-size: 1.1rem; padding: 14px 28px;">▶ Start Hunting</button>
              </div>
              
              <!-- Continue Hunt Widget (Dynamic) -->
              <div id="dashboardContinueWidget" class="continue-hunt-widget" style="display: none;">
                <div class="continue-details">
                  <div class="continue-lbl">// ACTIVE ENGAGEMENT</div>
                  <div class="continue-target">Target: <strong id="dashTargetDisplay" class="text-neon-cyan">example.com</strong></div>
                  <div class="continue-phase">Current: <span id="dashPhaseDisplay" class="badge badge-active">Recon</span></div>
                </div>
                <a class="hunt-btn link-btn" href="methodology.html" target="_blank" style="text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                  Continue Hunt →
                </a>
              </div>
              
              <!-- Idle Hunt Widget -->
              <div id="dashboardIdleWidget" class="continue-hunt-widget idle">
                <div class="continue-details">
                  <div class="continue-lbl">// NO ACTIVE ENGAGEMENT</div>
                  <p style="margin:4px 0 0; color:rgba(148,163,184,0.5); font-size:0.85rem;">Start a new target engagement to track checklists and decision paths.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Dashboard Grids -->
          <div class="dashboard-grid-layout">
            
            <!-- Left Side: Daily Challenge & Progress -->
            <div class="dash-col">
              
              <!-- Daily Challenge Card -->
              <div class="cyber-card challenge-card">
                <div class="card-header"><h3>🏆 Daily Challenge</h3></div>
                <div class="challenge-body">
                  <p class="challenge-question" id="dailyChallengeQ">لديك 800 Subdomains حية، ما أول 3 خطوات تقوم بها للفحص الفعال؟</p>
                  <div class="challenge-options" id="dailyChallengeOptions">
                    <div class="challenge-option" onclick="answerChallenge(0, this)">A) تشغيل Nuclei على جميع المنافذ لتوفير الوقت.</div>
                    <div class="challenge-option" onclick="answerChallenge(1, this)">B) فرز النطاقات وتصنيفها (Categorize) ثم فحص CNAME للـ 404s ثم port scan للمنافذ الحساسة.</div>
                    <div class="challenge-option" onclick="answerChallenge(2, this)">C) تشغيل FFUF على كافة المسارات دفعة واحدة.</div>
                  </div>
                  <div class="challenge-feedback" id="dailyChallengeFeedback" style="display: none;"></div>
                </div>
              </div>

              <!-- Today's Progress Card -->
              <div class="cyber-card progress-card">
                <div class="card-header"><h3>📈 Today's Learning Progress</h3></div>
                <div class="progress-card-body">
                  <div class="progress-details-row">
                    <span class="progress-label">Academy Completion:</span>
                    <span class="progress-val text-neon-cyan" id="dashProgressPct">0%</span>
                  </div>
                  <div class="lab-progress-bar" style="margin: 8px 0 14px;">
                    <div class="lab-progress-fill" id="dashProgressFill" style="width: 0%;"></div>
                  </div>
                  <div class="active-mission" id="dashActiveMissionBox">
                    <span class="mission-bullet">[+]</span> Next Chapter: <span id="dashNextChapter" class="text-neon-green">Think Like a Hacker: Why Recon Fails?</span>
                  </div>
                  <button class="hunt-btn primary" onclick="switchTab('academy')" style="width:100%; margin-top: 10px; font-size: 0.85rem;">
                    Continue Learning Path →
                  </button>
                </div>
              </div>

            </div>

            <!-- Right Side: Quick Tools & Recent Articles -->
            <div class="dash-col">
              
              <!-- Quick Tools Card -->
              <div class="cyber-card quick-tools-card">
                <div class="card-header"><h3>🛠️ Quick Academy Tools</h3></div>
                <div class="quick-tools-grid">
                  <div class="q-tool-item" onclick="openExplorerToolDirect('subfinder')">
                    <div class="q-tool-name">subfinder</div>
                    <div class="q-tool-tag">Passive Recon</div>
                  </div>
                  <div class="q-tool-item" onclick="openExplorerToolDirect('katana')">
                    <div class="q-tool-name">katana</div>
                    <div class="q-tool-tag">Crawling</div>
                  </div>
                  <div class="q-tool-item" onclick="openExplorerToolDirect('amass')">
                    <div class="q-tool-name">amass</div>
                    <div class="q-tool-tag">Deep DNS</div>
                  </div>
                  <div class="q-tool-item" onclick="openExplorerToolDirect('httpx')">
                    <div class="q-tool-name">httpx</div>
                    <div class="q-tool-tag">Alive Check</div>
                  </div>
                </div>
              </div>

              <!-- Recent Articles Card -->
              <div class="cyber-card recent-articles-card">
                <div class="card-header"><h3>📚 Mindset Articles</h3></div>
                <div class="recent-articles-list">
                  <div class="r-article-item" onclick="openArticleDirect('why-recon-fails')">
                    <div class="r-article-title">🧠 لماذا لا يبدأ المحترفون بـ Nuclei؟</div>
                    <div class="r-article-meta">Mindset • 5 min read</div>
                  </div>
                  <div class="r-article-item" onclick="openArticleDirect('attack-surface-15')">
                    <div class="r-article-title">🧠 كيف أحدد Attack Surface خلال أول 15 دقيقة؟</div>
                    <div class="r-article-meta">Strategy • 8 min read</div>
                  </div>
                  <div class="r-article-item" onclick="openArticleDirect('js-attacker-mind')">
                    <div class="r-article-title">🧠 كيف أقرأ JavaScript بعقلية مهاجم؟</div>
                    <div class="r-article-meta">JS • 6 min read</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>"""

terminal_start = text.find('<div class="workspace-pane active" id="pane-terminal">')
terminal_end = text.find('<div class="workspace-pane" id="', terminal_start + 50)
text = text[:terminal_start] + dashboard_html + '\n\n' + text[terminal_end:]

# 6. Replace pane-bugbounty with pane-labs, pane-simulator, pane-articles, pane-about
new_panes = """        <!-- 3. INTERACTIVE LABS VIEW -->
        <div class="workspace-pane" id="pane-labs">
          <h2 class="pane-view-title">// Cybersecurity Interactive Labs</h2>
          
          <div class="labs-layout">
            <!-- Labs Directory / List -->
            <div class="labs-directory">
              
              <div class="lab-card active" onclick="openLab('terminal-sim', this)">
                <div class="lab-card-meta">
                  <span class="badge badge-easy">🟢 Easy</span>
                  <span class="lab-duration">⏱ 15 min</span>
                </div>
                <h4 class="lab-card-title">🐚 Linux Terminal Simulator</h4>
                <p class="lab-card-desc">تعلم أساسيات سطر الأوامر في لينكس وفك تشفير الملفات السرية للوصول للأعلام (Flags).</p>
              </div>
              
              <div class="lab-card disabled">
                <div class="lab-card-meta">
                  <span class="badge badge-medium">🟠 Medium</span>
                  <span class="lab-duration">⏱ 25 min</span>
                </div>
                <h4 class="lab-card-title">💻 Command Injection Sandbox</h4>
                <p class="lab-card-desc">مختبر تفاعلي لاستغلال ثغرات حقن الأوامر وتخطي فلاتر الحماية (قريباً).</p>
              </div>

              <div class="lab-card disabled">
                <div class="lab-card-meta">
                  <span class="badge badge-hard">🔴 Hard</span>
                  <span class="lab-duration">⏱ 40 min</span>
                </div>
                <h4 class="lab-card-title">🔑 JWT Token Forgery Sandbox</h4>
                <p class="lab-card-desc">مختبر متقدم للتلاعب بـ JWT وتزوير التوقيع لتخطي الصلاحيات (قريباً).</p>
              </div>

            </div>

            <!-- Lab Container / Active Lab Area -->
            <div class="lab-execution-area">
              <div id="lab-terminal-sim" class="active-lab-view active">
                
                <div class="interactive-terminal">
                  <div class="terminal-header">
                    <div class="terminal-controls">
                      <span class="term-dot term-dot--red"></span>
                      <span class="term-dot term-dot--yellow"></span>
                      <span class="term-dot term-dot--green"></span>
                    </div>
                    <span class="terminal-title">visitor@abdo-sec:~ (Interactive Lab Session)</span>
                    <div class="terminal-actions">
                      <button class="term-action-btn" id="soundToggleBtn" onclick="toggleMute()" title="Toggle Sound Feedback">
                        <span id="soundIcon">🔇 Sound Off</span>
                      </button>
                      <button class="term-action-btn" onclick="resetLabState()" title="Reset Linux Lab Progression">
                        🔄 Reset Lab
                      </button>
                    </div>
                  </div>
                  
                  <div class="terminal-body" id="consoleBody">
                    <!-- Logs will append here -->
                  </div>

                  <!-- Mobile Keyboard Helpers Toolbar -->
                  <div class="terminal-mobile-toolbar">
                    <span class="toolbar-label">Quick Commands:</span>
                    <div class="toolbar-scroll">
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('help')">help</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('whoami')">whoami</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('skills')">skills</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('projects')">projects</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('writeups')">writeups</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('nmap')">nmap</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('linux')">linux</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('progress')">progress</button>
                      <button class="mobile-cmd-btn" onclick="executeQuickCommand('clear')">clear</button>
                    </div>
                  </div>

                  <div class="terminal-input-line">
                    <span class="term-prompt" id="consolePrompt">visitor@abdo-sec:~$</span>
                    <input type="text" id="consoleInput" autofocus autocomplete="off" spellcheck="false" placeholder="Type a command..." />
                    <div class="autocomplete-hint" id="autocompleteHint"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 4. INTERACTIVE SIMULATOR VIEW -->
        <div class="workspace-pane" id="pane-simulator">
          <h2 class="pane-view-title">// Real Hunting Simulator</h2>
          <div class="cyber-card">
            <div class="card-header"><h3>🎮 Decision-Making Simulator</h3></div>
            <div class="simulator-intro-box" style="padding:10px 0;">
              <p style="font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
                مرحباً بك في **Real Hunting Simulator**. هنا يمكنك محاكاة عملية صيد ثغرات حية واتخاذ القرارات بمنهجية واقعية.
              </p>
              <div class="tip-callout" style="margin: 15px 0;">
                <div class="tip-callout-icon">💡</div>
                <div class="tip-callout-text">
                  <strong>الهدف:</strong> اختبار فرضياتك، تحديد أين تقضي وقتك، وكيف تصل للثغرة بالطريقة الصحيحة.
                </div>
              </div>
              <button class="hunt-btn primary" onclick="switchTab('simulator')" style="font-size: 1rem; padding: 12px 24px; margin-top:10px;">▶ Launch Simulator</button>
            </div>
          </div>
        </div>

        <!-- 5. MINDSET ARTICLES VIEW -->
        <div class="workspace-pane" id="pane-articles">
          <h2 class="pane-view-title">// Mindset & Strategy Articles</h2>
          <div class="articles-categories-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:15px;">
            
            <div class="cyber-card">
              <div class="card-header"><h3>🧠 Hacker Mindset</h3></div>
              <ul class="t-check-list" style="padding:0; margin:0; list-style:none;">
                <li style="margin-bottom:12px; cursor:pointer;" onclick="openArticleDirect('why-recon-fails')">
                  <span style="color:var(--accent-cyan); font-weight:700;">• لماذا لا يبدأ المحترفون بـ Nuclei؟</span>
                  <p style="font-size:0.75rem; color:var(--text-muted); margin:2px 0 0 10px;">فهم متى تعتمد على الأتمتة ومتى تحتاج للفحص اليدوي.</p>
                </li>
                <li style="margin-bottom:12px; cursor:pointer;" onclick="openArticleDirect('js-attacker-mind')">
                  <span style="color:var(--accent-cyan); font-weight:700;">• كيف أقرأ JavaScript بعقلية مهاجم؟</span>
                  <p style="font-size:0.75rem; color:var(--text-muted); margin:2px 0 0 10px;">البحث عن المسارات المخفية والأسرار داخل ملفات الـ JS.</p>
                </li>
              </ul>
            </div>

            <div class="cyber-card">
              <div class="card-header"><h3>🧭 Hunting Strategy</h3></div>
              <ul class="t-check-list" style="padding:0; margin:0; list-style:none;">
                <li style="margin-bottom:12px; cursor:pointer;" onclick="openArticleDirect('attack-surface-15')">
                  <span style="color:var(--accent-cyan); font-weight:700;">• كيف أحدد Attack Surface خلال أول 15 دقيقة؟</span>
                  <p style="font-size:0.75rem; color:var(--text-muted); margin:2px 0 0 10px;">خطة سريعة لتصنيف الأهداف وتحديد الأكثر إثارة للاهتمام.</p>
                </li>
                <li style="margin-bottom:12px; cursor:pointer;" onclick="openArticleDirect('when-to-leave-endpoint')">
                  <span style="color:var(--accent-cyan); font-weight:700;">• متى أترك Endpoint وأنتقل لغيره؟</span>
                  <p style="font-size:0.75rem; color:var(--text-muted); margin:2px 0 0 10px;">تفادي الوقوع في فخ تضييع الوقت على أهداف معقدة بلا ثغرات.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <!-- 6. ABOUT VIEW (CONSOLIDATED PORTFOLIO) -->
        <div class="workspace-pane" id="pane-about">
          <h2 class="pane-view-title">// About the Author</h2>
          <div class="about-grid">
            
            <!-- Bio Section -->
            <div class="cyber-card">
              <div class="card-header"><h3>👤 Profile Summary</h3></div>
              <p style="font-size:0.95rem; line-height:1.7; color:var(--text-secondary); margin:0;">
                Security Researcher & OSCP Candidate. Focused on Web Application Penetration Testing, Network Security Auditing, and Linux Systems Administration. Passionate about discovering vulnerabilities, writing scripts to automate security tasks, and sharing knowledge through detailed writeups.
              </p>
            </div>

            <!-- Skills Section -->
            <div class="cyber-card">
              <div class="card-header"><h3>🛡️ Hardened Skills Arsenal</h3></div>
              {skills_placeholder}
            </div>

            <!-- Projects Section -->
            <div class="cyber-card">
              <div class="card-header"><h3>📂 Proof Of Concept Exploits & Tools</h3></div>
              {projects_placeholder}
            </div>

            <!-- Certificates Section -->
            <div class="cyber-card">
              <div class="card-header"><h3>🔑 Certificates & Ranks</h3></div>
              {certs_placeholder}
            </div>

            <!-- Contact Section -->
            <div class="cyber-card">
              <div class="card-header"><h3>📡 Contact & Gateway</h3></div>
              {contact_placeholder}
            </div>

          </div>
        </div>"""

new_panes = new_panes.replace('{skills_placeholder}', skills_content)
new_panes = new_panes.replace('{projects_placeholder}', projects_content)
new_panes = new_panes.replace('{certs_placeholder}', certs_content)
new_panes = new_panes.replace('{contact_placeholder}', contact_content)

bb_start = text.find('<div class="workspace-pane" id="pane-bugbounty">')
if bb_start == -1:
    bb_start = text.find('id="pane-bugbounty"')
    bb_start = text.rfind('<div', 0, bb_start)

# Find footer comment
footer_idx = text.find('<!-- Footer -->')
j = text.rfind('</div>', 0, footer_idx)
bb_end = j + len('</div>')

text = text[:bb_start] + new_panes + '\n\n' + text[bb_end:]

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully applied hybrid structure to home.html!")
