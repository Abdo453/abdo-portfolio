import re

# 1. Fix methodology.html (remove the extra </div>)
html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# The extra divs are here:
bad_divs = """        </div>
      </div>

      </div>
      </div>

      <!-- Category 7: CEH MASTERCLASS"""

good_divs = """        </div>
      </div>

      <!-- Category 7: CEH MASTERCLASS"""

if bad_divs in html:
    html = html.replace(bad_divs, good_divs)
    print("Fixed extra </div> in methodology.html")
else:
    print("Could not find the extra </div> block in methodology.html")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

# 2. Fix methodology.js (inject Lazy Loading properly)
js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Find the exact openMethPhase function
pattern = r"function openMethPhase\(phaseId\)\s*\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\n    \}"
# Wait, parsing JS with regex is hard. Let's just do string replacement from known text.

start_marker = "function openMethPhase(phaseId) {"
end_marker = "generateBreadcrumb(phaseId);\n    }"

start_idx = js.find(start_marker)
end_idx = js.find(end_marker)

if start_idx != -1 and end_idx != -1:
    end_idx += len(end_marker)
    
    lazy_load_logic = """function openMethPhase(phaseId) {
      if (!phaseId) return;
      
      // Update sidebar active state
      document.querySelectorAll('.meth-item').forEach(function(item) {
        item.classList.remove('active');
      });
      var activeSidebarItem = document.getElementById('meth-ef-' + phaseId);
      if (activeSidebarItem) {
        activeSidebarItem.classList.add('active');
      }

      var activeContent = document.getElementById('meth-content-' + phaseId);

      // Lazy Loading logic
      if (!activeContent && (phaseId.startsWith('pt_mod') || phaseId.startsWith('assess'))) {
        
        var mainViewer = document.querySelector('.meth-container');
        var loadingEl = document.getElementById('lazy-loading-div');
        if (!loadingEl) {
            loadingEl = document.createElement('div');
            loadingEl.id = 'lazy-loading-div';
            loadingEl.style.cssText = 'color: #00e5a0; text-align: center; margin-top: 50px; font-family: var(--font-mono); width: 100%;';
            mainViewer.appendChild(loadingEl);
        }
        loadingEl.style.display = 'block';
        loadingEl.innerText = '[+] Loading module ' + phaseId + '...';
        
        document.querySelectorAll('.meth-content-view').forEach(function(content) {
          content.style.display = 'none';
        });

        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        let filename = phaseId + '.html';
        if (phaseId === 'assess-htb') filename = 'mod_assess_htb.html';
        if (phaseId === 'assess-bb') filename = 'mod_assess_bugbounty.html';
        if (phaseId === 'assess-ad') filename = 'mod_assess_ad.html';
        
        const basePath = isLocal ? '/static/main/modules/' : 'modules/';
        
        fetch(basePath + filename)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
          })
          .then(html => {
            loadingEl.style.display = 'none';
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            var newContent = tempDiv.firstElementChild; // The .meth-content-view div
            mainViewer.appendChild(newContent);
            
            activeContent = document.getElementById('meth-content-' + phaseId);
            if (activeContent) {
                activeContent.style.display = 'block';
                activeContent.classList.add('active');
                if (typeof injectCompleteButton === 'function') {
                    setTimeout(function(){injectCompleteButton(phaseId);}, 50);
                }
                if (typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, activeContent.querySelectorAll('.mermaid, pre > code.language-mermaid'));
                }
            }
            markVisitedSafe(phaseId);
            generatePhaseTOC(phaseId, activeContent);
            generateBreadcrumb(phaseId);
          })
          .catch(error => {
            loadingEl.style.display = 'block';
            loadingEl.style.color = '#ff5555';
            loadingEl.innerText = '[-] Failed to load module. Error: ' + error;
          });
        return;
      }

      // Hide all content views
      document.querySelectorAll('.meth-content-view').forEach(function(content) {
        content.style.display = 'none';
      });

      // Show selected content view
      if (activeContent) {
        activeContent.style.display = 'block';
        activeContent.classList.add('active');
        if (typeof injectCompleteButton === 'function') {
            setTimeout(function(){injectCompleteButton(phaseId);}, 50);
        }
      }

      // Hide empty state
      var emptyState = document.getElementById('methEmptyState');
      if (emptyState) emptyState.style.display = 'none';

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.meth-sidebar');
      if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }

      // Track visited phases (progress tracker)
      markVisitedSafe(phaseId);

      // Generate phase TOC and breadcrumb
      generatePhaseTOC(phaseId, activeContent);
      generateBreadcrumb(phaseId);
    }"""
    
    js = js[:start_idx] + lazy_load_logic + js[end_idx:]
    print("Injected Lazy Loading into methodology.js")
else:
    print("Could not find openMethPhase in methodology.js")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
