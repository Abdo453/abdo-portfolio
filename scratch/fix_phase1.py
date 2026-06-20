import re
import os

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# --- methodology.html fixes ---

# 1. Add fuse.js script if not there
if "fuse.min.js" not in html:
    html = html.replace("</head>", '  <script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js"></script>\n</head>')

# 2. Add REAL ASSESSMENTS to sidebar
assessments_sidebar = """
      <!-- Category: REAL ASSESSMENTS -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-assess')">
          <span style="color: #ffb86c;">📁 REAL ASSESSMENTS</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-assess" style="display: block;">
          <div class="meth-item" id="meth-ef-assess-htb" onclick="openMethPhase('assess-htb')" data-search="hackthebox htb writeup corporate">
            🏴‍☠️ HTB: "Corporate"
          </div>
          <div class="meth-item" id="meth-ef-assess-bb" onclick="openMethPhase('assess-bb')" data-search="bug bounty report account takeover idor">
            🐛 Bug Bounty: ATO
          </div>
          <div class="meth-item" id="meth-ef-assess-ad" onclick="openMethPhase('assess-ad')" data-search="active directory pentest zero to da">
            👑 AD: Zero to DA
          </div>
        </div>
      </div>
"""

# Insert before cat-recon
cat_recon_start = html.find('<!-- Category 1: Recon & Footprinting -->')
if cat_recon_start != -1 and 'id="cat-assess"' not in html:
    html = html[:cat_recon_start] + assessments_sidebar + "\n      " + html[cat_recon_start:]

# 3. Add REAL ASSESSMENTS includes
includes_html = """
      <!-- REAL ASSESSMENTS MODULES -->
      {% include 'main/modules/mod_assess_htb.html' %}
      {% include 'main/modules/mod_assess_bugbounty.html' %}
      {% include 'main/modules/mod_assess_ad.html' %}
"""
pt_mod20_include = "{% include 'main/modules/pt_mod20.html' %}"
if pt_mod20_include in html and "mod_assess_htb.html" not in html:
    html = html.replace(pt_mod20_include, pt_mod20_include + "\n" + includes_html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html")


# --- methodology.js fixes ---

# 1. Update filterSidebarItems to use Fuse.js
fuse_js_logic = """
    function filterSidebarItems(query) {
      const q = query.toLowerCase().trim();
      const items = document.querySelectorAll('.meth-item');
      
      if (!q) {
        items.forEach(i => i.style.display = 'block');
        document.getElementById('searchNoResults').style.display = 'none';
        return;
      }
      
      if (typeof Fuse !== 'undefined' && !window.methFuse) {
        var itemsArray = [];
        items.forEach(function(item) {
          itemsArray.push({
            id: item.id,
            title: item.textContent.trim(),
            search: item.getAttribute('data-search') || ''
          });
        });
        window.methFuse = new Fuse(itemsArray, {
          includeScore: true,
          threshold: 0.4,
          keys: ['title', 'search']
        });
      }
      
      let visibleCount = 0;
      if (window.methFuse) {
        var results = window.methFuse.search(q);
        var matchedIds = results.map(r => r.item.id);
        items.forEach(i => {
          if (matchedIds.includes(i.id)) {
            i.style.display = 'block';
            visibleCount++;
          } else {
            i.style.display = 'none';
          }
        });
      } else {
        // Fallback
        items.forEach(i => {
          const text = i.textContent.toLowerCase();
          const tags = (i.getAttribute('data-search') || '').toLowerCase();
          if (text.includes(q) || tags.includes(q)) {
            i.style.display = 'block';
            visibleCount++;
          } else {
            i.style.display = 'none';
          }
        });
      }
      document.getElementById('searchNoResults').style.display = visibleCount === 0 ? 'block' : 'none';
    }
"""

if "function filterSidebarItems(query)" in js:
    # replace the existing function
    pattern = r"function filterSidebarItems\(query\)\s*\{.*?\n    \}"
    js = re.sub(pattern, fuse_js_logic.strip(), js, flags=re.DOTALL)


# 2. Progress Tracker Logic for Mark As Complete
progress_logic = """

// --- Mark As Complete Logic ---
function injectCompleteButton(phaseId) {
  var activeContent = document.getElementById('meth-content-' + phaseId);
  if (!activeContent) return;
  
  if (activeContent.querySelector('.mark-complete-btn')) return;
  
  var completedModules = JSON.parse(localStorage.getItem('meth_completed_modules') || '[]');
  var isCompleted = completedModules.includes(phaseId);
  
  var btnHtml = '<div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">' +
                '<button class="mark-complete-btn" style="background: ' + (isCompleted ? 'var(--success)' : 'var(--accent-primary)') + '; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; font-family: var(--font-mono); cursor: pointer; transition: all 0.3s ease;" onclick="handleMarkComplete(\\'' + phaseId + '\\', this)">' +
                (isCompleted ? '✅ COMPLETED' : 'MARK AS COMPLETE') +
                '</button></div>';
                
  activeContent.insertAdjacentHTML('beforeend', btnHtml);
  
  // also add checkmark to sidebar if completed
  if (isCompleted) {
    var sidebarItem = document.getElementById('meth-ef-' + phaseId);
    if (sidebarItem && !sidebarItem.innerHTML.includes('✅')) {
      sidebarItem.innerHTML = '✅ ' + sidebarItem.innerHTML;
    }
  }
}

window.handleMarkComplete = function(phaseId, btn) {
  var completedModules = JSON.parse(localStorage.getItem('meth_completed_modules') || '[]');
  if (!completedModules.includes(phaseId)) {
    completedModules.push(phaseId);
    localStorage.setItem('meth_completed_modules', JSON.stringify(completedModules));
    
    // Also mark it as visited for the main progress bar
    let visited = JSON.parse(localStorage.getItem('visited_phases') || '[]');
    if (!visited.includes(phaseId)) {
      visited.push(phaseId);
      localStorage.setItem('visited_phases', JSON.stringify(visited));
      updateProgressBar();
    }
  }
  btn.style.background = 'var(--success)';
  btn.innerHTML = '✅ COMPLETED';
  
  var sidebarItem = document.getElementById('meth-ef-' + phaseId);
  if (sidebarItem && !sidebarItem.innerHTML.includes('✅')) {
    sidebarItem.innerHTML = '✅ ' + sidebarItem.innerHTML;
  }
};
"""

if "injectCompleteButton" not in js:
    js += progress_logic

# 3. Inject it inside openMethPhase
if "activeContent.classList.add('active');" in js:
    js = js.replace("activeContent.classList.add('active');", "activeContent.classList.add('active');\n      setTimeout(function(){injectCompleteButton(phaseId);}, 50);")

# 4. Add Real Assessments to getPhaseTitle
if "if (phaseId === 'assess-htb') return 'HTB Writeup';" not in js:
    js = js.replace(
        "if (phaseId === 'pt_mod20') return '20. Tools Reference';",
        "if (phaseId === 'pt_mod20') return '20. Tools Reference';\n        if (phaseId === 'assess-htb') return 'HTB Writeup';\n        if (phaseId === 'assess-bb') return 'Bug Bounty Report';\n        if (phaseId === 'assess-ad') return 'AD Pentest';"
    )

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js")
