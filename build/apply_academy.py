import codecs

css_path = 'd:/abdo_portfolio/build/css/style.css'
html_path = 'd:/abdo_portfolio/build/methodology.html'
js_path = 'd:/abdo_portfolio/build/js/methodology.js'

# --- CSS INJECTIONS ---
academy_css = '''
/* =========================================
   ACADEMY DASHBOARD & UI/UX ENHANCEMENTS
   ========================================= */

/* Animated Grid Background */
body {
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: -1px -1px;
  animation: moveGrid 20s linear infinite;
}

@keyframes moveGrid {
  from { background-position: 0 0; }
  to { background-position: 30px 30px; }
}

/* Reading Progress Bar */
#reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 9999;
}
#reading-progress-bar {
  height: 100%;
  width: 0%;
  background: var(--neon-cyan);
  box-shadow: 0 0 10px var(--neon-cyan);
  transition: width 0.1s ease-out;
}

/* Stat Counters */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
}
.stat-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 243, 255, 0.2);
  border-color: var(--neon-cyan);
}
.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--neon-cyan);
  margin-bottom: 5px;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}
.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Achievement System */
.achievement-panel {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.1), transparent);
  border-left: 4px solid var(--neon-purple);
  border-radius: 8px;
  margin-bottom: 30px;
}
.rank-badge {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));
}
.rank-info h3 { margin: 0 0 5px 0; color: var(--neon-purple); }
.rank-info p { margin: 0; color: var(--text-secondary); }

/* Skill Tree */
.skill-tree {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
}
.skill-branch {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  position: relative;
  transition: all 0.3s ease;
}
.skill-branch:hover {
  border-color: var(--neon-cyan);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
}
.skill-branch h4 { margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px; }
.skill-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.skill-node {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--text-color);
  cursor: default;
  transition: all 0.3s ease;
}
.skill-node:hover {
  background: var(--neon-cyan);
  color: #000;
  border-color: var(--neon-cyan);
  box-shadow: 0 0 10px var(--neon-cyan);
  transform: scale(1.1);
}
'''
with codecs.open(css_path, 'r', 'utf-8') as f:
    if 'ACADEMY DASHBOARD' not in f.read():
        with codecs.open(css_path, 'a', 'utf-8') as f_append:
            f_append.write('\n' + academy_css)


# --- HTML INJECTIONS ---
with codecs.open(html_path, 'r', 'utf-8') as f:
    html_content = f.read()

if 'reading-progress-container' not in html_content:
    html_content = html_content.replace('<body>', '<body>\n  <div id="reading-progress-container"><div id="reading-progress-bar"></div></div>')

academy_html = '''
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

# Replace the old meth-content-p_home entirely
import re
if 'id="meth-content-p_home"' in html_content:
    # We find where it starts and ends
    start_idx = html_content.find('<div class="meth-content-view" id="meth-content-p_home"')
    end_idx = html_content.find('<div class="meth-content-view" id="meth-content-p0"')
    if start_idx != -1 and end_idx != -1:
        html_content = html_content[:start_idx] + academy_html + '\n      ' + html_content[end_idx:]
        with codecs.open(html_path, 'w', 'utf-8') as f:
            f.write(html_content)

# --- JS INJECTIONS ---
academy_js = '''
// ==========================================
// ACADEMY DASHBOARD FEATURES
// ==========================================

// 1. Reading Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('reading-progress-bar');
  if (progressBar) progressBar.style.width = scrolled + '%';
});

// 2. Animated Counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const count = +counter.innerText;
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target + (target > 50 ? '+' : '');
      }
    };
    updateCount();
  });
}

// 3. Achievement System Update
function updateAchievements() {
  // Total checklists in the entire methodology
  const totalTasks = document.querySelectorAll('.checklist-item').length || 1;
  const completedTasks = document.querySelectorAll('.checklist-item.completed').length;
  
  const progressPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));
  
  const rankBadge = document.getElementById('userRankBadge');
  const rankTitle = document.getElementById('userRankTitle');
  const rankDesc = document.getElementById('userRankDesc');
  const rankProgress = document.getElementById('userRankProgress');
  
  if (!rankBadge) return;
  
  rankProgress.style.width = progressPercent + '%';
  
  if (completedTasks === 0) {
    rankBadge.innerText = '🥚';
    rankTitle.innerText = 'Rank: Observer';
    rankDesc.innerText = 'أنت تراقب فقط! ابدأ بتحديد المهام المنجزة لترفع تصنيفك.';
  } else if (completedTasks < 10) {
    rankBadge.innerText = '🥉';
    rankTitle.innerText = 'Rank: Script Kiddie';
    rankDesc.innerText = 'بداية جيدة! أكمل المزيد من مهام الاستطلاع للوصول للمستوى التالي.';
  } else if (completedTasks < 30) {
    rankBadge.innerText = '🥈';
    rankTitle.innerText = 'Rank: Bug Hunter';
    rankDesc.innerText = 'أنت الآن صائد ثغرات معتمد. واصل تعميق بحثك لاصطياد ثغرات حرجة.';
  } else if (completedTasks < 60) {
    rankBadge.innerText = '🥇';
    rankTitle.innerText = 'Rank: Advanced Hacker';
    rankDesc.innerText = 'مستوى متقدم! أنت تتقن ربط الثغرات المتقدمة.';
  } else {
    rankBadge.innerText = '💎';
    rankTitle.innerText = 'Rank: Elite Pentester';
    rankDesc.innerText = 'أسطورة! لقد أتممت منهجية الاختراق بالكامل.';
  }
}

// Hook updateAchievements into loadChecklistState and toggleCheck
const oldLoadChecklistState = window.loadChecklistState;
window.loadChecklistState = function() {
  if (oldLoadChecklistState) oldLoadChecklistState();
  updateAchievements();
};

const oldToggleCheck2 = window.toggleCheck;
window.toggleCheck = function(element, listId, index) {
  if (oldToggleCheck2) oldToggleCheck2(element, listId, index);
  updateAchievements();
};

// Initialize Counters on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateCounters, 500);
});
'''

with codecs.open(js_path, 'r', 'utf-8') as f:
    if 'ACADEMY DASHBOARD FEATURES' not in f.read():
        with codecs.open(js_path, 'a', 'utf-8') as f_append:
            f_append.write('\n\n' + academy_js)

print("Academy Dashboard implemented successfully.")
