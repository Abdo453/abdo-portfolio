import codecs

html_path = 'd:/abdo_portfolio/build/methodology.html'
js_path = 'd:/abdo_portfolio/build/js/methodology.js'

# --- HTML INJECTIONS ---
with codecs.open(html_path, 'r', 'utf-8') as f:
    html_content = f.read()

# 1. Light/Dark Toggle
theme_toggle_html = '''
      <!-- Theme Toggle -->
      <button id="themeToggleBtn" onclick="toggleTheme()" title="Toggle Light/Dark Mode" style="background: none; border: 1px solid var(--border-color); color: var(--text-color); padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-left: 10px; font-size: 1rem;">
        ☀️
      </button>
'''
# Inject next to the search input in the sidebar
if 'id="sidebarSearch"' in html_content and 'id="themeToggleBtn"' not in html_content:
    html_content = html_content.replace('autocomplete="off">', 'autocomplete="off">\n' + theme_toggle_html)

# 2. One-Liner Generator (in p0)
oneliner_html = '''
        <!-- ONE-LINER GENERATOR (Automation Tool) -->
        <div class="cyber-card border-neon" style="border-color: var(--neon-cyan); background: rgba(0, 243, 255, 0.05);">
          <div class="card-header"><h3 style="color:var(--neon-cyan);">⚡ Auto-Generator: Recon One-Liner</h3></div>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">أدخل الدومين واختر الأدوات لتوليد كود الفحص المخصص لك:</p>
          <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
            <input type="text" id="targetDomainInput" placeholder="example.com" style="background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); padding: 8px; border-radius: 4px; flex-grow: 1; min-width: 200px;" oninput="generateOneLiner()">
            <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;"><input type="checkbox" id="chkSubfinder" checked onchange="generateOneLiner()"> Subfinder</label>
            <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;"><input type="checkbox" id="chkAmass" checked onchange="generateOneLiner()"> Amass</label>
            <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;"><input type="checkbox" id="chkHttpx" checked onchange="generateOneLiner()"> httpx</label>
            <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;"><input type="checkbox" id="chkNuclei" onchange="generateOneLiner()"> nuclei</label>
          </div>
          <div class="cmd-ui-box" style="margin:0;">
            <div class="cmd-ui-top" id="oneLinerOutput" style="word-break: break-all;">subfinder -d example.com -silent | httpx -silent -title -status-code</div>
            <div class="cmd-ui-bottom"><button class="cmd-btn" onclick="copyText(document.getElementById('oneLinerOutput').innerText, this)">📋 Copy One-Liner</button></div>
          </div>
        </div>
'''
if '<!-- MAIN CONTENT AREA -->' in html_content or 'id="meth-content-p0"' in html_content:
    if 'Auto-Generator: Recon One-Liner' not in html_content:
        # insert after <div class="meth-content-view" id="meth-content-p0"...> <div class="phase-module-header">...</div>
        idx = html_content.find('id="meth-content-p0"')
        if idx != -1:
            header_end = html_content.find('</div>', html_content.find('</div>', html_content.find('class="phase-module-header"', idx)) + 6)
            if header_end != -1:
                html_content = html_content[:header_end+6] + '\n\n' + oneliner_html + html_content[header_end+6:]


# 3. Report Generator Button and Modal
report_html = '''
    <!-- Floating Report Generator Button -->
    <button onclick="generateReport()" style="position: fixed; bottom: 30px; right: 30px; background: var(--neon-purple); color: #fff; border: none; border-radius: 50px; padding: 15px 25px; font-weight: bold; cursor: pointer; box-shadow: 0 0 15px var(--neon-purple); z-index: 1000; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 8px;">
      <span>📝</span> Generate Report
    </button>

    <!-- Report Modal -->
    <div id="reportModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center;">
      <div style="background: var(--surface-color); border: 1px solid var(--border-color); width: 80%; max-width: 800px; max-height: 90vh; border-radius: 8px; display: flex; flex-direction: column;">
        <div style="padding: 15px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: var(--text-color);">HackerOne Markdown Report</h3>
          <button onclick="document.getElementById('reportModal').style.display='none'" style="background: none; border: none; color: #ff0055; cursor: pointer; font-size: 1.5rem;">&times;</button>
        </div>
        <div style="padding: 20px; overflow-y: auto; flex-grow: 1;">
          <p style="color: var(--text-secondary); margin-top: 0;">هذا التقرير تم توليده أوتوماتيكياً بناءً على ما أنجزته من مهام (Checklists) في الموقع.</p>
          <textarea id="reportContent" style="width: 100%; height: 300px; background: var(--bg-color); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 4px; padding: 10px; font-family: monospace; resize: vertical;" readonly></textarea>
        </div>
        <div style="padding: 15px 20px; border-top: 1px solid var(--border-color); text-align: right;">
          <button class="hack-btn" onclick="copyText(document.getElementById('reportContent').value, this)">📋 Copy to Clipboard</button>
        </div>
      </div>
    </div>
'''
if 'id="reportModal"' not in html_content:
    html_content = html_content.replace('</body>', report_html + '\n</body>')

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(html_content)

# --- JS INJECTIONS ---
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

automation_js = '''
// ==========================================
// AUTOMATION ASSISTANT FEATURES
// ==========================================

// 1. Persistent Checklists (LocalStorage)
function saveChecklistState() {
  const checkboxes = document.querySelectorAll('.checklist-item');
  const state = {};
  checkboxes.forEach((item, index) => {
    // Generate a unique ID based on the onclick attribute if an ID doesn't exist
    let uid = item.getAttribute('onclick');
    if (uid) {
      state[uid] = item.classList.contains('completed');
    }
  });
  localStorage.setItem('hunter_checklist_state', JSON.stringify(state));
}

function loadChecklistState() {
  const savedState = localStorage.getItem('hunter_checklist_state');
  if (savedState) {
    const state = JSON.parse(savedState);
    const checkboxes = document.querySelectorAll('.checklist-item');
    checkboxes.forEach((item) => {
      let uid = item.getAttribute('onclick');
      if (uid && state[uid]) {
        item.classList.add('completed');
        const box = item.querySelector('.check-box');
        if(box) box.textContent = '✓';
      }
    });
  }
}

// Override existing toggleCheck to add save functionality
const originalToggleCheck = window.toggleCheck;
window.toggleCheck = function(element, listId, index) {
  if (originalToggleCheck) {
    originalToggleCheck(element, listId, index);
  } else {
    // Fallback if original doesn't exist
    element.classList.toggle('completed');
    const box = element.querySelector('.check-box');
    if (element.classList.contains('completed')) {
      box.textContent = '✓';
    } else {
      box.textContent = '';
    }
  }
  saveChecklistState();
};

// 2. Report Generator
window.generateReport = function() {
  const modal = document.getElementById('reportModal');
  const textarea = document.getElementById('reportContent');
  
  // Count completed tasks
  const completedTasks = document.querySelectorAll('.checklist-item.completed');
  let completedText = "";
  completedTasks.forEach(task => {
    const label = task.querySelector('.check-label');
    if(label) completedText += `- [x] ${label.innerText}\\n`;
  });

  if (completedText === "") {
    completedText = "- [ ] (No methodology steps completed yet. Complete checklists to auto-populate here)\\n";
  }

  const template = `## Title: [Vulnerability Name] on [target.com]

## Description:
I have discovered a [vulnerability type] vulnerability affecting the \`[endpoint]\`. 

## Reconnaissance & Methodology Steps Taken:
${completedText}

## Steps To Reproduce:
1. Navigate to \`https://target.com\`
2. [Action step]
3. Observe that [Result]

## Impact:
[Describe how an attacker can exploit this and what the business impact is].

## Remediation:
[Provide mitigation advice].
`;

  textarea.value = template;
  modal.style.display = 'flex';
};

// 3. Dynamic One-Liner Generator
window.generateOneLiner = function() {
  const domain = document.getElementById('targetDomainInput').value || 'example.com';
  const useSub = document.getElementById('chkSubfinder').checked;
  const useAmass = document.getElementById('chkAmass').checked;
  const useHttpx = document.getElementById('chkHttpx').checked;
  const useNuclei = document.getElementById('chkNuclei').checked;
  
  let cmd = "";
  
  if (useSub && useAmass) {
    cmd += `subfinder -d ${domain} -all -silent > subs.txt && amass enum -passive -d ${domain} >> subs.txt && sort -u subs.txt > unique.txt`;
  } else if (useSub) {
    cmd += `subfinder -d ${domain} -all -silent > unique.txt`;
  } else if (useAmass) {
    cmd += `amass enum -passive -d ${domain} > unique.txt`;
  } else {
    cmd += `echo ${domain} > unique.txt`;
  }
  
  if (useHttpx) {
    cmd += ` && cat unique.txt | httpx -silent -status-code -title > alive.txt`;
  }
  
  if (useNuclei && useHttpx) {
    cmd += ` && nuclei -l alive.txt -t cves/`;
  } else if (useNuclei && !useHttpx) {
    cmd += ` && nuclei -l unique.txt -t cves/`;
  }
  
  const outputEl = document.getElementById('oneLinerOutput');
  if (outputEl) outputEl.innerText = cmd;
};

// 4. Universal Copy Buttons Injector
function injectCopyButtons() {
  const codeBlocks = document.querySelectorAll('.cmd-ui-top');
  codeBlocks.forEach(block => {
    // Check if it already has a bottom box with a copy button
    const parent = block.parentElement;
    const hasBottom = parent.querySelector('.cmd-ui-bottom');
    
    if (!hasBottom) {
      // Create it!
      const bottomDiv = document.createElement('div');
      bottomDiv.className = 'cmd-ui-bottom';
      bottomDiv.innerHTML = `<button class="cmd-btn" onclick="copyText(this.parentElement.previousElementSibling.innerText, this)">📋 Copy</button>`;
      parent.appendChild(bottomDiv);
      // Ensure the parent is a flex column or block
      parent.style.display = 'flex';
      parent.style.flexDirection = 'column';
    }
  });
}

// 5. Theme Toggle (Light/Dark)
window.toggleTheme = function() {
  const isLight = document.body.classList.contains('light-mode');
  if (isLight) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('hunter_theme', 'dark');
    document.getElementById('themeToggleBtn').innerText = '☀️';
  } else {
    document.body.classList.add('light-mode');
    localStorage.setItem('hunter_theme', 'light');
    document.getElementById('themeToggleBtn').innerText = '🌙';
  }
};

function loadTheme() {
  const theme = localStorage.getItem('hunter_theme');
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.innerText = '🌙';
  }
}

// Ensure init functions run on load
window.addEventListener('DOMContentLoaded', () => {
  loadChecklistState();
  loadTheme();
  setTimeout(injectCopyButtons, 500); // slight delay to ensure UI is parsed
});
'''

if '// AUTOMATION ASSISTANT FEATURES' not in js_content:
    js_content += '\n\n' + automation_js
    with codecs.open(js_path, 'w', 'utf-8') as f:
        f.write(js_content)

# Add CSS directly
css_html = """
    <style>
      body.light-mode {
        --bg-color: #f8fafc;
        --surface-color: #ffffff;
        --border-color: #e2e8f0;
        --text-color: #1e293b;
        --text-secondary: #475569;
        --neon-cyan: #0ea5e9;
        --neon-purple: #8b5cf6;
        --neon-red: #ef4444;
        --accent-glow: 0 0 10px rgba(14, 165, 233, 0.3);
      }
      body.light-mode .cyber-card { background: var(--surface-color); }
      body.light-mode .meth-sidebar { background: var(--surface-color); border-right: 1px solid var(--border-color); }
      body.light-mode .terminal-window { background: #1e293b; color: #fff; }
    </style>
"""
if '<style>' not in html_content:
    pass # we won't strictly check
# re-read and write to safely append to head
with codecs.open(html_path, 'r', 'utf-8') as f:
    h = f.read()
if 'body.light-mode' not in h:
    h = h.replace('</head>', css_html + '</head>')
    with codecs.open(html_path, 'w', 'utf-8') as f:
        f.write(h)

print("Automation script prepared.")
