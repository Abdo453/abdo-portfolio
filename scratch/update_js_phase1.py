import re

js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update Search to use Fuse.js
# Look for the search function: 
#   var filter = this.value.toLowerCase();
#   var items = document.querySelectorAll('.meth-item');
fuse_search_logic = """
    // Initialize Fuse.js if available
    if (typeof Fuse !== 'undefined' && !window.methFuse) {
      var itemsArray = [];
      document.querySelectorAll('.meth-item').forEach(function(item) {
        itemsArray.push({
          id: item.id,
          title: item.textContent.trim(),
          search: item.getAttribute('data-search') || ''
        });
      });
      var fuseOptions = {
        includeScore: true,
        threshold: 0.4,
        keys: ['title', 'search']
      };
      window.methFuse = new Fuse(itemsArray, fuseOptions);
    }

    var filter = this.value.toLowerCase();
    var items = document.querySelectorAll('.meth-item');
    
    if (filter.length === 0) {
      items.forEach(function(item) {
        item.style.display = 'block';
      });
    } else if (window.methFuse) {
      var results = window.methFuse.search(filter);
      var matchedIds = results.map(function(r) { return r.item.id; });
      items.forEach(function(item) {
        if (matchedIds.includes(item.id)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      // Fallback to basic search
      items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        var searchTags = item.getAttribute('data-search') || '';
        searchTags = searchTags.toLowerCase();
        if (text.includes(filter) || searchTags.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
"""

# Replace the existing search event listener body
search_pattern = r"var filter = this\.value\.toLowerCase\(\);\s*var items = document\.querySelectorAll\('\.meth-item'\);\s*items\.forEach\(function\(item\) \{.*?\}\);"
js = re.sub(search_pattern, fuse_search_logic, js, flags=re.DOTALL)

# 2. Add titles for assess-* in getPhaseTitle and getCategoryForPhase
if "if (phaseId === 'pt_mod10') return '10. Tools Reference';" in js:
    js = js.replace(
        "if (phaseId === 'pt_mod10') return '10. Tools Reference';",
        "if (phaseId === 'pt_mod10') return '10. Tools Reference';\n        if (phaseId === 'assess-htb') return 'HTB Writeup';\n        if (phaseId === 'assess-bb') return 'Bug Bounty Report';\n        if (phaseId === 'assess-ad') return 'AD Pentest';"
    )

if "if (phaseId.startsWith('pt_mod')) return 'Pentesting Guide';" in js:
    js = js.replace(
        "if (phaseId.startsWith('pt_mod')) return 'Pentesting Guide';",
        "if (phaseId.startsWith('pt_mod')) return 'Pentesting Guide';\n      if (phaseId.startsWith('assess-')) return 'Real Assessments';"
    )

# 3. Add Progress Tracking Logic at the end of the file
progress_logic = """

// --- Phase 1: Progress Tracking Logic ---
function updateGlobalProgress() {
  var completedModules = JSON.parse(localStorage.getItem('meth_completed_modules') || '[]');
  var totalModules = document.querySelectorAll('.meth-item').length;
  if (totalModules === 0) return;
  
  var percentage = Math.round((completedModules.length / totalModules) * 100);
  var fillEl = document.getElementById('global-progress-fill');
  var textEl = document.getElementById('global-progress-text');
  
  if (fillEl) fillEl.style.width = percentage + '%';
  if (textEl) textEl.textContent = percentage + '%';
  
  // Update sidebar checks
  document.querySelectorAll('.meth-item').forEach(function(item) {
    var phaseId = item.id.replace('meth-ef-', '');
    if (completedModules.includes(phaseId)) {
      if (!item.innerHTML.includes('✅')) {
        item.innerHTML = '✅ ' + item.innerHTML;
      }
    }
  });
}

function markModuleComplete(phaseId) {
  var completedModules = JSON.parse(localStorage.getItem('meth_completed_modules') || '[]');
  if (!completedModules.includes(phaseId)) {
    completedModules.push(phaseId);
    localStorage.setItem('meth_completed_modules', JSON.stringify(completedModules));
    updateGlobalProgress();
  }
}

function injectCompleteButton(phaseId) {
  var activeContent = document.getElementById('meth-content-' + phaseId);
  if (!activeContent) return;
  
  // Check if button already exists
  if (activeContent.querySelector('.mark-complete-btn')) return;
  
  var completedModules = JSON.parse(localStorage.getItem('meth_completed_modules') || '[]');
  var isCompleted = completedModules.includes(phaseId);
  
  var btnHtml = '<div style="text-align: center; margin-top: 40px; margin-bottom: 20px;">' +
                '<button class="mark-complete-btn" style="background: ' + (isCompleted ? 'var(--success)' : 'var(--accent-primary)') + '; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; font-family: var(--font-mono); cursor: pointer; transition: all 0.3s ease;" onclick="handleMarkComplete(\\'' + phaseId + '\\', this)">' +
                (isCompleted ? '✅ COMPLETED' : 'MARK AS COMPLETE') +
                '</button></div>';
                
  activeContent.insertAdjacentHTML('beforeend', btnHtml);
}

window.handleMarkComplete = function(phaseId, btn) {
  markModuleComplete(phaseId);
  btn.style.background = 'var(--success)';
  btn.innerHTML = '✅ COMPLETED';
};

// Hook into existing events
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(updateGlobalProgress, 500); // Wait for DOM
});

// We need to call injectCompleteButton inside openMethPhase
"""
js += progress_logic

# Inject injectCompleteButton into openMethPhase
if "function openMethPhase(phaseId) {" in js:
    # Find the end of openMethPhase block to inject
    # Actually, it's safer to inject it right after activeContent.style.display = 'block';
    js = js.replace(
        "if (activeContent) activeContent.style.display = 'block';",
        "if (activeContent) { activeContent.style.display = 'block'; setTimeout(function(){injectCompleteButton(phaseId);}, 100); }"
    )

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js with Phase 1 additions.")
