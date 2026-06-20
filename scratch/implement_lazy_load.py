import os
import shutil
import re

# 1. Move modules to static folder
src_dir = r"d:\abdo_portfolio\main\templates\main\modules"
dst_dir = r"d:\abdo_portfolio\main\static\main\modules"
os.makedirs(dst_dir, exist_ok=True)

# Move pt_mod* and mod_assess*
for f in os.listdir(src_dir):
    if f.startswith('pt_mod') or f.startswith('mod_assess'):
        shutil.move(os.path.join(src_dir, f), os.path.join(dst_dir, f))

# 2. Update methodology.js for Lazy Loading
js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

lazy_load_logic = """
    function openMethPhase(phaseId) {
      if (!phaseId) return;
      
      // Update sidebar active state
      document.querySelectorAll('.meth-item').forEach(function(item) {
        item.classList.remove('active');
      });
      var activeSidebarItem = document.getElementById('meth-ef-' + phaseId);
      if (activeSidebarItem) {
        activeSidebarItem.classList.add('active');
      }

      var mainViewer = document.getElementById('mainViewer');
      var activeContent = document.getElementById('meth-content-' + phaseId);

      // Lazy Loading logic
      if (!activeContent && (phaseId.startsWith('pt_mod') || phaseId.startsWith('assess'))) {
        // Show loading state
        mainViewer.innerHTML = '<div style="color: #00e5a0; text-align: center; margin-top: 50px; font-family: var(--font-mono);">[+] Loading module ' + phaseId + '...</div>';
        
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Handle mod_assess filename prefix mapping
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
            // Append to DOM so we don't fetch again
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            var newContent = tempDiv.firstElementChild; // The .meth-content-view div
            // Inject to the DOM, but hide others
            document.querySelectorAll('.meth-content-view').forEach(function(content) {
              content.style.display = 'none';
            });
            document.querySelector('.meth-container').appendChild(newContent);
            
            // Re-select activeContent
            activeContent = document.getElementById('meth-content-' + phaseId);
            if (activeContent) {
                activeContent.style.display = 'block';
                activeContent.classList.add('active');
                setTimeout(function(){injectCompleteButton(phaseId);}, 50);
                if (typeof mermaid !== 'undefined') {
                    mermaid.init(undefined, activeContent.querySelectorAll('.mermaid, pre > code.language-mermaid'));
                }
            }
          })
          .catch(error => {
            mainViewer.innerHTML = '<div style="color: #ff5555; text-align: center; margin-top: 50px; font-family: var(--font-mono);">[-] Failed to load module. Error: ' + error + '</div>';
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
        setTimeout(function(){injectCompleteButton(phaseId);}, 50);
      }

      // Hide empty state
      var emptyState = document.getElementById('methEmptyState');
      if (emptyState) emptyState.style.display = 'none';
    }
"""

# Replace openMethPhase function in JS
js = re.sub(r'function openMethPhase\(phaseId\)\s*\{.*?// Hide empty state.*?\}', lazy_load_logic.strip(), js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js with Lazy Loading.")

# 3. Update sync_to_build.py
sync_path = r"d:\abdo_portfolio\scratch\sync_to_build.py"
with open(sync_path, "r", encoding="utf-8") as f:
    sync_code = f.read()

copy_modules_logic = """
    import shutil
    build_modules_dir = r"d:\\abdo_portfolio\\build\\modules"
    static_modules_dir = r"d:\\abdo_portfolio\\main\\static\\main\\modules"
    if os.path.exists(build_modules_dir):
        shutil.rmtree(build_modules_dir)
    if os.path.exists(static_modules_dir):
        shutil.copytree(static_modules_dir, build_modules_dir)
"""
if "build_modules_dir" not in sync_code:
    sync_code = sync_code.replace('print("Synced main to build successfully', copy_modules_logic + '\n    print("Synced main to build successfully')

with open(sync_path, "w", encoding="utf-8") as f:
    f.write(sync_code)
print("Updated sync_to_build.py")

# 4. Remove old includes from methodology.html if any are there
html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

html = re.sub(r"{%\s*include\s*'main/modules/pt_mod[^>]*?%}", "", html)
html = re.sub(r"{%\s*include\s*'main/modules/mod_assess[^>]*?%}", "", html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Cleaned includes in methodology.html")
