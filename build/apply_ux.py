import codecs

css_path = 'd:/abdo_portfolio/build/css/style.css'
html_path = 'd:/abdo_portfolio/build/methodology.html'

# --- CSS INJECTIONS ---
with codecs.open(css_path, 'r', 'utf-8') as f:
    css_content = f.read()

# Fix mobile scrolling (ensure body doesn't have overflow: hidden)
# Find body overflow: hidden in mobile queries
css_content = css_content.replace('overflow: hidden;', '/* overflow: hidden; removed for mobile scroll */')

# Add UX CSS
ux_css = '''
/* --- UX/UI OVERHAUL --- */

/* 1. Active State Animation */
@keyframes activePulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 243, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0); }
}

.meth-sidebar .meth-item.active {
  background: rgba(0, 243, 255, 0.1);
  border-left: 4px solid var(--neon-cyan);
  animation: activePulse 2s infinite;
  transform: translateX(5px);
  transition: all 0.3s ease;
}

/* 2. Consistent Spacing */
.cyber-card {
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 8px;
}
.phase-module-header {
  margin-bottom: 30px;
}

/* 3. Interactive Vertical Timeline */
.timeline-container {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 40px 0;
  padding-left: 30px;
}
.timeline-container::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--neon-cyan), var(--neon-purple), var(--neon-red));
  border-radius: 4px;
  box-shadow: 0 0 10px var(--neon-cyan);
}
.timeline-node {
  position: relative;
  margin-bottom: 30px;
  padding: 15px 20px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.timeline-node:hover {
  transform: translateX(10px);
  border-color: var(--neon-cyan);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}
.timeline-node::before {
  content: '';
  position: absolute;
  left: -28px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: var(--surface-color);
  border: 3px solid var(--neon-cyan);
  border-radius: 50%;
  z-index: 1;
  transition: all 0.3s ease;
}
.timeline-node:hover::before {
  background: var(--neon-cyan);
  box-shadow: 0 0 10px var(--neon-cyan);
}
.timeline-node h4 {
  margin: 0 0 5px 0;
  color: var(--text-color);
  font-size: 1.1rem;
}
.timeline-node p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
'''
if '/* --- UX/UI OVERHAUL --- */' not in css_content:
    with codecs.open(css_path, 'a', 'utf-8') as f:
        f.write('\n' + ux_css)

# --- HTML INJECTIONS ---
with codecs.open(html_path, 'r', 'utf-8') as f:
    html_content = f.read()

timeline_html = '''
      <!-- VERTICAL INTERACTIVE TIMELINE -->
      <div class="meth-content-view" id="meth-content-p_home" style="display: block; --tool-color: var(--neon-cyan);">
        <div class="phase-module-header">
          <div class="phase-module-icon">🗺️</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">The Master Blueprint</h2>
            <p class="phase-module-tagline">خارطة الطريق الكاملة لاختراق الويب (Interactive Flowchart)</p>
          </div>
        </div>
        
        <p style="color: var(--text-secondary);">اختر المرحلة للبدء المباشر أو تتبع المسار بالترتيب المنطقي لاكتشاف الثغرات العميقة.</p>
        
        <div class="timeline-container">
          <div class="timeline-node" onclick="openMethPhase('p0')" style="border-left: 4px solid var(--neon-cyan);">
            <h4 style="color: var(--neon-cyan);">1. Reconnaissance (الاستطلاع)</h4>
            <p>Subdomain Enumeration, Tech Detection, Port Scanning.</p>
          </div>
          <div class="timeline-node" onclick="openMethPhase('p_manual')" style="border-left: 4px solid var(--neon-purple);">
            <h4 style="color: var(--neon-purple);">2. Web Discovery (الاستكشاف اليدوي)</h4>
            <p>Manual Walkthrough, Directory Brute-forcing, JS Recon, API Hacking.</p>
          </div>
          <div class="timeline-node" onclick="openMethPhase('p7')" style="border-left: 4px solid #f59e0b;">
            <h4 style="color: #f59e0b;">3. Exploitation (الاستغلال)</h4>
            <p>XSS, SQLi, SSRF, IDOR, File Upload.</p>
          </div>
          <div class="timeline-node" onclick="openMethPhase('p_chaining')" style="border-left: 4px solid var(--neon-red);">
            <h4 style="color: var(--neon-red);">4. Advanced Scenarios (السيناريوهات المتقدمة)</h4>
            <p>Exploit Chaining, Business Logic Flaws, APT Scenarios.</p>
          </div>
          <div class="timeline-node" onclick="openMethPhase('p_reporting')" style="border-left: 4px solid #10b981;">
            <h4 style="color: #10b981;">5. Reporting & Triage (كتابة التقارير)</h4>
            <p>كيف تكتب تقرير احترافي يقبله الـ Triage دون رفض.</p>
          </div>
        </div>
      </div>
'''

if 'id="meth-content-p_home"' not in html_content:
    # Inject it right after the pipeline-track div
    idx = html_content.find('<!-- End Pipeline Track -->')
    if idx != -1:
        # Also, hide p0 by default, and let p_home be the initial block!
        html_content = html_content.replace('id="meth-content-p0" style="display: block;', 'id="meth-content-p0" style="display: none;')
        html_content = html_content[:idx+27] + '\n\n' + timeline_html + html_content[idx+27:]
        
        with codecs.open(html_path, 'w', 'utf-8') as f:
            f.write(html_content)

print("UX improvements applied.")
