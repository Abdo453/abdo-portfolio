    // Toggle Mobile Sidebar
    function toggleMobileSidebar() {
      const sidebar = document.querySelector('.meth-sidebar');
      sidebar.classList.toggle('active');
    }

    // Toggle sidebar categories
    function toggleCategory(catId) {
      const cat = document.getElementById(catId);
      const titleSpan = cat.previousElementSibling.querySelector('span:last-child');
      if (cat.style.maxHeight === '0px' || cat.style.display === 'none') {
        cat.style.display = 'flex';
        cat.style.maxHeight = '1000px';
        titleSpan.innerText = '▼';
      } else {
        cat.style.display = 'none';
        cat.style.maxHeight = '0px';
        titleSpan.innerText = '▶';
      }
    }

    // Tab switcher — includes visited phase tracking
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

      var activeContent = document.getElementById('meth-content-' + phaseId);

      // Lazy Loading logic
      if (!activeContent && (phaseId.startsWith('pt_mod') || phaseId.startsWith('assess') || phaseId === 'sys-hack' || phaseId === 'lab-metasploitable' || phaseId === 'capstone-mid')) {
        
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
        if (phaseId === 'mod1') filename = 'mod1_intro.html';
        if (phaseId === 'mod2') filename = 'mod2_footprinting.html';
        if (phaseId === 'mod3') filename = 'mod3_scanning.html';
        if (phaseId === 'mod4') filename = 'mod4_enumeration.html';
        if (phaseId === 'mod5') filename = 'mod5_vuln_analysis.html';
        if (phaseId === 'mod7') filename = 'mod7_malware.html';
        if (phaseId === 'mod8') filename = 'mod8_sniffing.html';
        if (phaseId === 'mod9') filename = 'mod9_social_eng.html';
        if (phaseId === 'mod10') filename = 'mod10_dos.html';
        if (phaseId === 'mod11') filename = 'mod11_session_hijacking.html';
        if (phaseId === 'mod12') filename = 'mod12_evasion.html';
        if (phaseId === 'mod13') filename = 'mod13_web_servers.html';
        if (phaseId === 'sys-hack') filename = 'system_hacking.html';
        if (phaseId === 'lab-metasploitable') filename = 'lab_metasploitable.html';
        if (phaseId === 'capstone-mid') filename = 'capstone_mid.html';
        
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
    }

    // Switch Vuln Database Tabs
    function switchVulnTab(tabId, btnEl) {
      document.querySelectorAll('.vuln-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.vuln-pane').forEach(p => p.classList.remove('active'));
      
      if (btnEl) btnEl.classList.add('active');
      const pane = document.getElementById('vuln-' + tabId);
      if (pane) pane.classList.add('active');
    }

    // Copy utility
    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    // Node inspector
    function inspectNode(title, desc) {
      let inspector = document.getElementById('recon-inspector');
      let titleEl = document.getElementById('recon-inspector-title');
      let descEl = document.getElementById('recon-inspector-desc');
      
      if (title.startsWith('JS')) {
        inspector = document.getElementById('js-inspector');
        titleEl = document.getElementById('js-inspector-title');
        descEl = document.getElementById('js-inspector-desc');
      } else if (title.startsWith('XSS')) {
        inspector = document.getElementById('xss-inspector');
        titleEl = document.getElementById('xss-inspector-title');
        descEl = document.getElementById('xss-inspector-desc');
      } else if (title.startsWith('SQLi')) {
        inspector = document.getElementById('sqli-inspector');
        titleEl = document.getElementById('sqli-inspector-title');
        descEl = document.getElementById('sqli-inspector-desc');
      } else if (title.startsWith('SSRF')) {
        inspector = document.getElementById('ssrf-inspector');
        titleEl = document.getElementById('ssrf-inspector-title');
        descEl = document.getElementById('ssrf-inspector-desc');
      } else if (title.startsWith('API')) {
        inspector = document.getElementById('api-inspector');
        titleEl = document.getElementById('api-inspector-title');
        descEl = document.getElementById('api-inspector-desc');
      } else if (title.startsWith('GraphQL')) {
        inspector = document.getElementById('graphql-inspector');
        titleEl = document.getElementById('graphql-inspector-title');
        descEl = document.getElementById('graphql-inspector-desc');
      } else if (title.startsWith('JWT')) {
        inspector = document.getElementById('jwt-inspector');
        titleEl = document.getElementById('jwt-inspector-title');
        descEl = document.getElementById('jwt-inspector-desc');
      }

      titleEl.innerText = title;
      descEl.innerText = desc;
      inspector.style.display = 'block';
    }

    // Live Payload filter functions
    function filterPayloads() {
      const query = document.getElementById('payloadSearchInput').value.toLowerCase();
      const activeTabEl = document.querySelector('.vuln-tabs-container .vuln-tab.active');
      const activeTab = activeTabEl ? activeTabEl.id.replace('payload-tab-', '') : 'all';
      
      document.querySelectorAll('.payload-item').forEach(item => {
        const text = item.innerText.toLowerCase();
        const cat = item.getAttribute('data-category');
        
        const matchesQuery = text.includes(query);
        const matchesTab = (activeTab === 'all' || cat === activeTab);
        
        if (matchesQuery && matchesTab) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    function filterPayloadCategory(cat) {
      document.querySelectorAll('.vuln-tabs-container .vuln-tab').forEach(tab => tab.classList.remove('active'));
      document.getElementById('payload-tab-' + cat).classList.add('active');
      filterPayloads();
    }

    // Labs scripts
    function runXSSLab() {
      const val = document.getElementById('xssInput').value;
      const res = document.getElementById('xssResult');
      
      if (val.includes('<script>') || val.includes('onerror') || val.includes('alert') || val.includes('<img') || val.includes('<svg')) {
        res.innerHTML = `<span class="text-neon-red">Search payload reflected: </span> ${val.replace(/</g, "&lt;").replace(/>/g, "&gt;")}`;
        // Trigger alert simulation popup
        document.getElementById('popupModalText').innerText = `Your input payload: "${val}" triggered a script execution environment.`;
        document.getElementById('popupOverlay').style.display = 'block';
        document.getElementById('popupModal').style.display = 'block';
      } else {
        res.innerHTML = `<span class="text-neon-cyan">Search output: </span> No matches found for "${val}"`;
      }
    }

    // Close XSS Modal
    function closePopupModal() {
      document.getElementById('popupOverlay').style.display = 'none';
      document.getElementById('popupModal').style.display = 'none';
    }

    // IDOR Lab
    function runIDORLab() {
      const val = document.getElementById('idorInput').value;
      const res = document.getElementById('idorResult');
      
      if (val == 101) {
        res.innerText = `{
  "status": "success",
  "invoice_id": 101,
  "owner": "Abdo Ramdan",
  "amount": "$0.00 (Self Account)",
  "status": "PAID"
}`;
      } else if (val == 102) {
        res.innerText = `// VULNERABILITY EXPLOITED: IDOR CONFIRMED\n{\n  "status": "success",\n  "invoice_id": 102,\n  "owner": "CEO Administrator",\n  "amount": "$45,000.00 (Private Project)",\n  "status": "UNPAID",\n  "notes": "Sensitive credentials: AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE"\n}`;
      } else if (val == 103) {
        res.innerText = `// VULNERABILITY EXPLOITED: IDOR CONFIRMED\n{\n  "status": "success",\n  "invoice_id": 103,\n  "owner": "John Doe",\n  "amount": "$12.99",\n  "status": "PAID"\n}`;
      } else {
        res.innerText = `{ "status": "error", "message": "Invoice not found or insufficient privileges (Simulated)" }`;
      }
    }

    // Terminal Emulator Scripts
    const termInput = document.getElementById('termInput');
    const termScreen = document.getElementById('termScreen');
    
    if (termInput) {
      termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          const cmd = termInput.value.trim();
          termInput.value = '';
          if (cmd) {
            executeTermCmd(cmd);
          }
        }
      });
    }

    function printTermLine(text, colorClass = '') {
      if (!termScreen) return;
      const p = document.createElement('div');
      p.className = 'term-line ' + colorClass;
      p.innerText = text;
      termScreen.appendChild(p);
      termScreen.scrollTop = termScreen.scrollHeight;
    }

    function executeTermCmd(cmd) {
      printTermLine('$ ' + cmd, 'text-neon-cyan');
      
      const args = cmd.toLowerCase().split(' ');
      const main = args[0];

      if (main === 'clear') {
        if (termScreen) termScreen.innerHTML = '';
      } else if (main === 'help') {
        printTermLine('Available simulated commands:\n' +
          '  subfinder -d target.com    - Run subdomain scan\n' +
          '  httpx -l subs.txt           - Check alive targets\n' +
          '  katana -u target.com       - JS Crawling\n' +
          '  ffuf -u target.com/FUZZ    - Directory fuzzing\n' +
          '  nuclei                     - Run CVE scanners\n' +
          '  sqlmap -u target.com/?id=1 - Automated SQL Injection audit\n' +
          '  kiterunner -u target.com   - Fuzz API Endpoints routes\n' +
          '  arjun -u target.com        - Detect hidden query params\n' +
          '  clear                      - Clear the console\n' +
          '  help                       - Show this screen', 'text-secondary');
      } else if (cmd.includes('subfinder')) {
        printTermLine('[info] Starting Subfinder v2.6.2...', 'text-secondary');
        setTimeout(() => printTermLine('[info] Querying 24 passive sources...', 'text-secondary'), 300);
        setTimeout(() => {
          printTermLine('api.target.com\n' +
            'dev.target.com\n' +
            'staging-auth.target.com\n' +
            'admin.target.com\n' +
            'assets.target.com', 'text-neon-green');
          printTermLine('[+] Subfinder finished: 5 subdomains discovered.', 'text-neon-cyan');
        }, 1000);
      } else if (cmd.includes('httpx')) {
        printTermLine('[info] Launching HTTPX checker...', 'text-secondary');
        setTimeout(() => {
          printTermLine('https://api.target.com [200 OK] [Tech: Express, Node.js]\n' +
            'https://admin.target.com [403 Forbidden] [Tech: Apache]\n' +
            'https://dev.target.com [200 OK] [Tech: PHP/8.1, Nginx]\n' +
            'https://staging-auth.target.com [200 OK] [Tech: Next.js]', 'text-neon-green');
          printTermLine('[+] HTTPX check complete. 4 alive hosts found.', 'text-neon-cyan');
        }, 800);
      } else if (cmd.includes('katana')) {
        printTermLine('[info] Initializing crawl engine...', 'text-secondary');
        setTimeout(() => {
          printTermLine('https://target.com/api/v1/auth/login [POST]\n' +
            'https://target.com/assets/app.js [GET]\n' +
            'https://target.com/dashboard/settings [GET]\n' +
            'https://target.com/wp-json/wp/v2/users [GET]', 'text-neon-green');
          printTermLine('[+] Crawling finished successfully.', 'text-neon-cyan');
        }, 1200);
      } else if (cmd.includes('ffuf')) {
        printTermLine(':: FFUF - Fuzz Faster U Fool :: v2.1.0 ::', 'text-secondary');
        printTermLine('________________________________________________', 'text-secondary');
        setTimeout(() => {
          printTermLine('/admin                  [Status: 403, Size: 242]\n' +
            '/config.php.bak         [Status: 200, Size: 4122]  <-- CRITICAL\n' +
            '/robots.txt             [Status: 200, Size: 42]\n' +
            '/phpinfo.php            [Status: 200, Size: 24200]', 'text-neon-green');
          printTermLine('________________________________________________', 'text-secondary');
        }, 1500);
      } else if (cmd.includes('nuclei')) {
        printTermLine('[info] Initializing Nuclei Engine v3.1.2...', 'text-secondary');
        setTimeout(() => {
          printTermLine('[cve-2021-41773] [http] [critical] https://target.com/cgi-bin/%%32%%65/%%32%%65/etc/passwd\n' +
            '[git-core-leak] [http] [high] https://target.com/.git/config\n' +
            '[exposed-panels] [http] [info] https://target.com/admin/login.php', 'text-neon-red');
          printTermLine('[+] Nuclei finished. 1 critical, 1 high alerts detected.', 'text-neon-cyan');
        }, 1800);
      } else if (cmd.includes('sqlmap')) {
        printTermLine('[info] testing connection to the target URL...', 'text-secondary');
        setTimeout(() => {
          printTermLine('[info] heuristic test shows GET parameter id might be vulnerable\n' +
            '[info] testing parameter UNION capability...\n' +
            '[+] GET parameter "id" is vulnerable to UNION-based SQL Injection!', 'text-neon-green');
          printTermLine('Database: target_production_db\n' +
            '[+] Tables found:\n' +
            '  - users\n' +
            '  - transactions\n' +
            '  - admin_credentials', 'text-neon-green');
        }, 1000);
      } else if (cmd.includes('kiterunner') || cmd.includes('kr')) {
        printTermLine('[info] loading API routes database... 2.4M routes loaded.', 'text-secondary');
        setTimeout(() => {
          printTermLine('[+] [200 OK]  GET  /api/v1/user/profile  (Size: 412)\n' +
            '[+] [200 OK]  POST /api/v1/auth/login     (Size: 182)\n' +
            '[+] [403 Forbidden] PUT /api/v1/admin/config (Size: 220)\n' +
            '[+] [200 OK]  GET  /api/v2/invoice/details (Size: 610)', 'text-neon-green');
        }, 1200);
      } else if (cmd.includes('arjun')) {
        printTermLine('[info] Arjun v2.2.1 - Parameter Discovery Tool', 'text-secondary');
        setTimeout(() => {
          printTermLine('[+] Parameter found: "debug" (Type: String)\n' +
            '[+] Parameter found: "role" (Type: String)\n' +
            '[+] Parameter found: "bypass" (Type: Boolean)\n' +
            '[+] Arjun scan complete. 3 parameters discovered.', 'text-neon-green');
        }, 1100);
      } else {
        printTermLine(`Command not found or unsupported in simulation: "${cmd}". Type "help" for a list of available commands.`, 'text-neon-red');
      }
    }

    // Trigger terminal tab and run command simulation
    function triggerTerminalSim(cmd) {
      openMethPhase('p19');
      executeTermCmd(cmd);
    }

    // =============================================
    // PHASE 3: ADVANCED FEATURES
    // =============================================

    // All phases registry for Quick Jump
    let ALL_PHASES = [];
    document.querySelectorAll('.meth-item').forEach(function(item) {
      let catEl = item.closest('.sidebar-category');
      let catName = 'OTHER';
      if (catEl) {
          let titleEl = catEl.querySelector('.category-title span:first-child');
          if (titleEl) catName = titleEl.innerText.replace(/[▼▶🎬]/g, '').trim();
      }
      
      let icon = '🔹';
      let firstSpan = item.querySelector('span:first-child');
      if (firstSpan) {
          let match = firstSpan.innerText.match(/([^\w\s\u0000-\u007F]+)/);
          if (match) icon = match[0];
      }
      
      let nameSpan = item.querySelector('span:nth-child(2)');
      let name = nameSpan ? nameSpan.innerText.trim() : item.innerText.replace('├──', '').replace('└──', '').trim();
      
      ALL_PHASES.push({
          id: item.id.replace('meth-ef-', ''),
          icon: icon,
          name: name,
          cat: catName,
          tags: item.getAttribute('data-search') || ''
      });
    });
    const TOTAL_PHASES = ALL_PHASES.length;

    // ---- VISITED PHASES (Progress Tracker) ----
    let visitedPhases = new Set(JSON.parse(localStorage.getItem('meth_visited') || '[]'));

    function markVisited(phaseId) {
      visitedPhases.add(phaseId);
      localStorage.setItem('meth_visited', JSON.stringify([...visitedPhases]));
      const item = document.getElementById('meth-ef-' + phaseId);
      if (item) item.classList.add('visited');
      updateProgressBar();
    }

    function updateProgressBar() {
      const count = visitedPhases.size;
      const pct = Math.round((count / TOTAL_PHASES) * 100);
      const fill = document.getElementById('progressBarFill');
      const label = document.getElementById('progressCount');
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = count + ' / ' + TOTAL_PHASES;
    }

    // markVisitedSafe: safe version that doesn't conflict with openMethPhase
    function markVisitedSafe(phaseId) {
      markVisited(phaseId);
    }

    // Restore visited badges on load
    function restoreVisited() {
      visitedPhases.forEach(id => {
        const item = document.getElementById('meth-ef-' + id);
        if (item) item.classList.add('visited');
      });
      updateProgressBar();
    }

    // ---- BOOKMARK SYSTEM ----
    let bookmarks = JSON.parse(localStorage.getItem('meth_bookmarks') || '[]');

    function toggleBookmark(e, phaseId, name) {
      e.stopPropagation();
      const btn = e.currentTarget;
      const idx = bookmarks.findIndex(b => b.id === phaseId);
      if (idx === -1) {
        bookmarks.push({ id: phaseId, name });
        btn.classList.add('bookmarked');
      } else {
        bookmarks.splice(idx, 1);
        btn.classList.remove('bookmarked');
      }
      localStorage.setItem('meth_bookmarks', JSON.stringify(bookmarks));
      renderBookmarksPanel();
    }

    function renderBookmarksPanel() {
      const panel = document.getElementById('bookmarksPanel');
      const list  = document.getElementById('bookmarksList');
      const count = document.getElementById('bookmarkCount');
      if (!panel || !list || !count) return;

      count.textContent = bookmarks.length;

      if (bookmarks.length === 0) {
        panel.classList.remove('has-items');
        list.innerHTML = '';
        return;
      }
      panel.classList.add('has-items');

      list.innerHTML = bookmarks.map(b => `
        <div class="bookmark-item-entry" onclick="openMethPhase('${b.id}')">
          <span>★</span> <span>${b.name}</span>
        </div>
      `).join('');

      // Sync bookmark buttons state
      document.querySelectorAll('.bookmark-btn').forEach(btn => btn.classList.remove('bookmarked'));
      bookmarks.forEach(b => {
        const item = document.getElementById('meth-ef-' + b.id);
        if (item) {
          const btn = item.querySelector('.bookmark-btn');
          if (btn) btn.classList.add('bookmarked');
        }
      });
    }

    function toggleBookmarksPanel() {
      const list = document.getElementById('bookmarksList');
      if (list) list.style.display = list.style.display === 'none' ? 'flex' : 'none';
    }

    // ---- SIDEBAR SEARCH FILTER ----
    function filterSidebarItems(query) {
      const q = query.toLowerCase().trim();
      const items = document.querySelectorAll('.meth-item');
      
      if (!q) {
        items.forEach(i => i.style.display = 'block');
        document.querySelectorAll('.sidebar-category').forEach(cat => cat.style.display = 'block');
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
            let catContainer = i.closest('.category-items');
            if (catContainer && (catContainer.style.display === 'none' || !catContainer.style.display)) {
              catContainer.style.display = 'flex';
              catContainer.style.maxHeight = '2000px';
              let titleSpan = catContainer.previousElementSibling.querySelector('span:last-child');
              if (titleSpan) titleSpan.innerText = '▼';
            }
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
            let catContainer = i.closest('.category-items');
            if (catContainer && (catContainer.style.display === 'none' || !catContainer.style.display)) {
              catContainer.style.display = 'flex';
              catContainer.style.maxHeight = '2000px';
              let titleSpan = catContainer.previousElementSibling.querySelector('span:last-child');
              if (titleSpan) titleSpan.innerText = '▼';
            }
          } else {
            i.style.display = 'none';
          }
        });
      }
      
      // Hide empty categories
      document.querySelectorAll('.sidebar-category').forEach(cat => {
        const itemsList = cat.querySelectorAll('.meth-item');
        let hasVisible = false;
        itemsList.forEach(item => {
          if (item.style.display === 'block') hasVisible = true;
        });
        cat.style.display = hasVisible ? 'block' : 'none';
      });

      document.getElementById('searchNoResults').style.display = visibleCount === 0 ? 'block' : 'none';
    }

    // ---- QUICK JUMP MODAL (Ctrl+K) ----
    let qjSelectedIdx = -1;

    function openQuickJump() {
      const overlay = document.getElementById('quickJumpOverlay');
      const input   = document.getElementById('quickJumpInput');
      if (!overlay || !input) return;
      overlay.style.display = 'block';
      input.value = '';
      qjSelectedIdx = -1;
      renderQuickJumpResults('');
      setTimeout(() => input.focus(), 50);
    }

    function closeQuickJump(e) {
      if (e && e.target !== document.getElementById('quickJumpOverlay')) return;
      const overlay = document.getElementById('quickJumpOverlay');
      if (overlay) overlay.style.display = 'none';
    }

    function renderQuickJumpResults(q) {
      const container = document.getElementById('quickJumpResults');
      if (!container) return;
      const query = q.toLowerCase().trim();

      const filtered = !query
        ? ALL_PHASES
        : ALL_PHASES.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.tags.toLowerCase().includes(query) ||
            p.cat.toLowerCase().includes(query)
          );

      if (filtered.length === 0) {
        container.innerHTML = `<div class="quick-jump-no-results">No results for "${q}"</div>`;
        qjSelectedIdx = -1;
        return;
      }

      container.innerHTML = filtered.map((p, i) => `
        <div class="quick-jump-result-item ${i === qjSelectedIdx ? 'selected' : ''} ${query && p.name.toLowerCase().includes(query) ? 'match-highlight' : ''}"
             onclick="selectQuickJump('${p.id}')"
             data-phase="${p.id}">
          <span class="item-icon">${p.icon}</span>
          <span class="item-name">${p.name}</span>
          <span class="item-cat">${p.cat}</span>
        </div>
      `).join('');
    }

    function selectQuickJump(phaseId) {
      openMethPhase(phaseId);
      const overlay = document.getElementById('quickJumpOverlay');
      if (overlay) overlay.style.display = 'none';
    }

    // Quick Jump input handler
    const qjInput = document.getElementById('quickJumpInput');
    if (qjInput) {
      qjInput.addEventListener('input', function() {
        qjSelectedIdx = -1;
        renderQuickJumpResults(this.value);
      });

      qjInput.addEventListener('keydown', function(e) {
        const items = document.querySelectorAll('.quick-jump-result-item[data-phase]');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          qjSelectedIdx = Math.min(qjSelectedIdx + 1, items.length - 1);
          items.forEach((el, i) => el.classList.toggle('selected', i === qjSelectedIdx));
          items[qjSelectedIdx]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          qjSelectedIdx = Math.max(qjSelectedIdx - 1, 0);
          items.forEach((el, i) => el.classList.toggle('selected', i === qjSelectedIdx));
          items[qjSelectedIdx]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const selected = items[qjSelectedIdx] || items[0];
          if (selected) selectQuickJump(selected.getAttribute('data-phase'));
        } else if (e.key === 'Escape') {
          const overlay = document.getElementById('quickJumpOverlay');
          if (overlay) overlay.style.display = 'none';
        }
      });
    }

    // ---- GLOBAL KEYBOARD SHORTCUTS ----
    document.addEventListener('keydown', function(e) {
      // Ctrl+K = Open Quick Jump
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openQuickJump();
      }
      // ESC = Close Quick Jump
      if (e.key === 'Escape') {
        const overlay = document.getElementById('quickJumpOverlay');
        if (overlay && overlay.style.display === 'block') {
          overlay.style.display = 'none';
        }
      }
      // / = Focus sidebar search
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const search = document.getElementById('sidebarSearch');
        if (search) search.focus();
      }
    });

    // ── Light/Dark Theme Switcher (Phase 2) ──
    function toggleTheme() {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme_preference', isLight ? 'light' : 'dark');
      const toggleBtn = document.getElementById('themeToggleBtn');
      if (toggleBtn) toggleBtn.textContent = isLight ? '☀️' : '🌙';
    }
    
    function initTheme() {
      const savedTheme = localStorage.getItem('theme_preference');
      const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
      
      if (isLight) {
        document.body.classList.add('light-theme');
        const toggleBtn = document.getElementById('themeToggleBtn');
        if (toggleBtn) toggleBtn.textContent = '☀️';
      }
    }

    // ── Auto Table of Contents for Phase 0 (Phase 2) ──
    function generateTOC() {
      const p0Container = document.getElementById('meth-content-p0');
      if (!p0Container) return;
      
      const cards = p0Container.querySelectorAll('.cyber-card.mobile-accordion');
      const tocItems = [];
      
      cards.forEach((card, idx) => {
        const header = card.querySelector('.card-header h3');
        if (header) {
          const cardId = `p0-card-${idx}`;
          card.id = cardId;
          const title = header.textContent.replace(/^[^\w\s\u0600-\u06FF]+/g, '').trim();
          tocItems.push({ id: cardId, title });
        }
      });
      
      if (tocItems.length > 0) {
        const tocBox = document.createElement('div');
        tocBox.className = 'toc-box';
        tocBox.innerHTML = `
          <div class="toc-title">📋 Table of Contents</div>
          <div class="toc-links">
            ${tocItems.map(item => `<span class="toc-link-item" onclick="document.getElementById('${item.id}').scrollIntoView({ behavior: 'smooth' })">• ${item.title}</span>`).join('')}
          </div>
        `;
        const hero = p0Container.querySelector('.cyber-hero');
        if (hero) {
          hero.parentNode.insertBefore(tocBox, hero.nextSibling);
        }
      }
    }

    // ── Dynamic Metadata & Breadcrumbs (Phase 2) ──
    function renderTacticsMetadata() {
      const views = document.querySelectorAll('.meth-content-view');
      const difficultyMap = {
        'p0': { read: '15 min', level: 'Intermediate', tool: 'Recon' },
        'p2': { read: '5 min', level: 'Beginner', tool: 'Fingerprint' },
        'p1': { read: '8 min', level: 'Beginner', tool: 'Port Scan' },
        'p_matrix': { read: '5 min', level: 'Intermediate', tool: 'Strategy' },
        'p6': { read: '10 min', level: 'Intermediate', tool: 'Fuzzing' },
        'p4': { read: '12 min', level: 'Advanced', tool: 'JS Analysis' },
        'p_writeups': { read: '25 min', level: 'Intermediate', tool: 'Reports' },
        'p19': { read: '5 min', level: 'Beginner', tool: 'CLI Terminal' }
      };

      views.forEach(view => {
        const hero = view.querySelector('.cyber-hero');
        if (hero) {
          const id = view.id.replace('meth-content-', '');
          const meta = difficultyMap[id] || { read: '8 min', level: 'Intermediate', tool: 'Exploit' };
          
          const metaBox = document.createElement('div');
          metaBox.className = 'meta-header-box';
          metaBox.innerHTML = `
            <span class="meta-badge">⏱ ${meta.read} read</span>
            <span class="meta-badge">📖 ${meta.level}</span>
            <span class="meta-badge">🛠 ${meta.tool}</span>
          `;
          hero.appendChild(metaBox);
        }
      });
    }

    function renderBreadcrumbs() {
      const views = document.querySelectorAll('.meth-content-view');
      views.forEach(view => {
        const hero = view.querySelector('.cyber-hero');
        if (hero) {
          const title = hero.querySelector('.hero-title')?.textContent || 'Details';
          const breadBox = document.createElement('div');
          breadBox.className = 'breadcrumb-box';
          breadBox.innerHTML = `
            <span>Playbook</span>
            <span class="breadcrumb-separator">&gt;</span>
            <span>Academy</span>
            <span class="breadcrumb-separator">&gt;</span>
            <span class="text-neon-cyan">${title}</span>
          `;
          hero.parentNode.insertBefore(breadBox, hero);
        }
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
      const sidebar = document.querySelector('.meth-sidebar');
      const toggleBtn = document.querySelector('.menu-toggle-btn');
      if (window.innerWidth <= 900 && sidebar && sidebar.classList.contains('active')) {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
          sidebar.classList.remove('active');
        }
      }
    });

    // Toggle expanded state of mobile accordions
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const header = e.target.closest('.cyber-card.mobile-accordion .card-header');
        if (header) {
          const card = header.closest('.cyber-card');
          if (card) {
            card.classList.toggle('expanded');
          }
        }
      }
    });


    // =============================================
    // BUG BOUNTY OPERATING SYSTEM — Core Engine
    // =============================================

    // Decision Tree — Real Yes/No Branching
    function dtBranch(showId, hideId) {
      const showEl = document.getElementById(showId);
      const hideEl = hideId ? document.getElementById(hideId) : null;
      if (!showEl) return;
      const isOpen = showEl.classList.contains('show');
      if (isOpen) {
        showEl.classList.remove('show');
        showEl.style.display = 'none';
      } else {
        showEl.classList.add('show');
        showEl.style.display = 'block';
        if (hideEl) {
          hideEl.classList.remove('show');
          hideEl.style.display = 'none';
        }
      }
    }

    // ---- CHECKLISTS — Persistent localStorage ----
    function toggleCheck(item, phaseId, index) {
      item.classList.toggle('checked');
      const isChecked = item.classList.contains('checked');
      localStorage.setItem('bb_check_' + phaseId + '_' + index, isChecked ? '1' : '0');
      updateChecklistProgress(phaseId);
    }

    function updateChecklistProgress(phaseId) {
      const list = document.getElementById('checklist-' + phaseId);
      if (!list) return;
      const items = list.querySelectorAll('.checklist-item');
      const checked = list.querySelectorAll('.checklist-item.checked').length;
      const total = items.length;
      const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
      const countEl = document.getElementById(phaseId + '-checklist-count');
      const barEl = document.getElementById(phaseId + '-checklist-bar');
      if (countEl) countEl.textContent = checked + ' / ' + total + ' completed';
      if (barEl) barEl.style.width = pct + '%';
    }

    function loadChecklistState(phaseId, count) {
      for (let i = 0; i < count; i++) {
        const saved = localStorage.getItem('bb_check_' + phaseId + '_' + i);
        if (saved === '1') {
          const list = document.getElementById('checklist-' + phaseId);
          if (!list) continue;
          const items = list.querySelectorAll('.checklist-item');
          if (items[i]) items[i].classList.add('checked');
        }
      }
      updateChecklistProgress(phaseId);
    }

    // ---- MARK PHASE COMPLETE ----
    function markPhaseComplete(phaseId, nextPhaseId) {
      const btn = document.getElementById('complete-btn-' + phaseId);
      if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = '✅ Phase Completed! Navigating...';
        btn.disabled = true;
      }
      localStorage.setItem('bb_phase_done_' + phaseId, '1');

      // Update hunt session
      const session = JSON.parse(localStorage.getItem('bb_hunt_session') || 'null');
      if (session) {
        if (!session.completedPhases) session.completedPhases = [];
        if (!session.completedPhases.includes(phaseId)) {
          session.completedPhases.push(phaseId);
        }
        localStorage.setItem('bb_hunt_session', JSON.stringify(session));
        updateHuntDashboard();
      }

      setTimeout(function() { openMethPhase(nextPhaseId); }, 700);
    }

    // =============================================
    // HUNT DASHBOARD
    // =============================================

    const HUNT_PHASES_DEF = [
      { id: 'p0',  label: '🌍 Recon',   next: 'p4'         },
      { id: 'p4',  label: '⚙️ JS',      next: 'p16'        },
      { id: 'p16', label: '🔌 API',     next: 'p7'         },
      { id: 'p7',  label: '🛡️ XSS',    next: 'p8'         },
      { id: 'p8',  label: '💉 SQLi',    next: 'p10'        },
      { id: 'p10', label: '🔑 IDOR',    next: 'p_writeups' },
    ];

    function initHuntDashboard() {
      const session = JSON.parse(localStorage.getItem('bb_hunt_session') || 'null');
      if (session) {
        const dash = document.getElementById('hunt-dashboard');
        if (dash) dash.classList.add('visible');
        const resetBtn = document.getElementById('huntResetBtn');
        if (resetBtn) resetBtn.style.display = 'block';
        updateHuntDashboard();
      }
    }

    function updateHuntDashboard() {
      const session = JSON.parse(localStorage.getItem('bb_hunt_session') || 'null');
      if (!session) return;

      const targetEl = document.getElementById('huntTargetDisplay');
      const phasesRow = document.getElementById('huntPhasesRow');
      const phaseCount = document.getElementById('huntPhaseCount');
      const ringProgress = document.getElementById('huntRingProgress');
      const ringPct = document.getElementById('huntRingPct');
      const ringFrac = document.getElementById('huntPhaseFraction');

      if (targetEl) targetEl.textContent = session.target || 'Unknown';

      const done = (session.completedPhases || []).length;
      const total = HUNT_PHASES_DEF.length;
      const pct = Math.round((done / total) * 100);

      // SVG Ring — circumference = 2 * π * 34 ≈ 213.6
      if (ringProgress) {
        const circumference = 213.6;
        const offset = circumference - (pct / 100) * circumference;
        ringProgress.style.strokeDashoffset = offset;
      }
      if (ringPct) ringPct.textContent = pct + '%';
      if (ringFrac) ringFrac.textContent = done + '/' + total;
      if (phaseCount) phaseCount.textContent = done + ' / ' + total + ' phases complete';

      if (phasesRow) {
        phasesRow.innerHTML = HUNT_PHASES_DEF.map(function(phase) {
          const isDone = (session.completedPhases || []).includes(phase.id);
          const cls = isDone ? 'done' : 'pending';
          const icon = isDone ? '✅ ' : '';
          return '<div class="hunt-phase-chip ' + cls + '" onclick="openMethPhase(\'' + phase.id + '\')">' + icon + phase.label + '</div>';
        }).join('');
      }
    }

    function toggleHuntDash() {
      const inner = document.getElementById('huntDashInner');
      const icon = document.getElementById('huntToggleIcon');
      if (!inner) return;
      if (inner.style.display === 'none') {
        inner.style.display = 'flex';
        if (icon) icon.textContent = '▲';
      } else {
        inner.style.display = 'none';
        if (icon) icon.textContent = '▼';
      }
    }

    // =============================================
    // START HUNT MODAL — 3 Steps
    // =============================================

    let _selectedProgram = 'bug_bounty';

    function openStartHuntModal() {
      const modal = document.getElementById('start-hunt-modal');
      if (!modal) return;
      modal.style.display = 'flex';
      document.getElementById('shunt-step-1').style.display = 'block';
      document.getElementById('shunt-step-2').style.display = 'none';
      document.getElementById('shunt-step-3').style.display = 'none';
      const inp = document.getElementById('shuntTargetInput');
      const session = JSON.parse(localStorage.getItem('bb_hunt_session') || 'null');
      if (inp) {
        inp.value = session ? session.target : '';
        setTimeout(function() { inp.focus(); }, 100);
      }
    }

    function closeStartHuntModal() {
      const modal = document.getElementById('start-hunt-modal');
      if (modal) modal.style.display = 'none';
    }

    function shuntNextStep(step) {
      if (step === 1) {
        const target = (document.getElementById('shuntTargetInput') || {}).value;
        if (!target || !target.trim()) {
          const inp = document.getElementById('shuntTargetInput');
          if (inp) { inp.style.borderColor = 'var(--neon-red)'; setTimeout(function(){ inp.style.borderColor = ''; }, 1500); }
          return;
        }
        document.getElementById('shunt-step-1').style.display = 'none';
        document.getElementById('shunt-step-2').style.display = 'block';
      }
    }

    function shuntBackStep() {
      document.getElementById('shunt-step-2').style.display = 'none';
      document.getElementById('shunt-step-1').style.display = 'block';
    }

    function shuntBackStep2() {
      document.getElementById('shunt-step-3').style.display = 'none';
      document.getElementById('shunt-step-2').style.display = 'block';
    }

    function selectProgram(type, el) {
      _selectedProgram = type;
      document.querySelectorAll('.shunt-option').forEach(function(o) { o.classList.remove('selected'); });
      if (el) el.classList.add('selected');

      setTimeout(function() {
        const target = (document.getElementById('shuntTargetInput') || {}).value || '';
        const labels = { bug_bounty: '🏆 Bug Bounty', vdp: '📋 VDP', internal: '🔒 Internal' };
        const summary = document.getElementById('shuntSummary');
        if (summary) {
          summary.innerHTML = '<strong>Target:</strong> ' + target + '<br><strong>Program:</strong> ' + (labels[type] || type) + '<br><strong>Date:</strong> ' + new Date().toLocaleDateString('en-US', {day:'numeric',month:'short',year:'numeric'});
        }
        document.getElementById('shunt-step-2').style.display = 'none';
        document.getElementById('shunt-step-3').style.display = 'block';
      }, 180);
    }

    function startHunt() {
      const target = ((document.getElementById('shuntTargetInput') || {}).value || '').trim();
      if (!target) return;

      const session = {
        target: target,
        program: _selectedProgram,
        startedAt: new Date().toISOString(),
        completedPhases: []
      };
      localStorage.setItem('bb_hunt_session', JSON.stringify(session));
      closeStartHuntModal();

      const dash = document.getElementById('hunt-dashboard');
      if (dash) dash.classList.add('visible');
      const resetBtn = document.getElementById('huntResetBtn');
      if (resetBtn) resetBtn.style.display = 'block';

      updateHuntDashboard();
      openMethPhase('p0');
    }

    // ---- RESET ----
    function confirmResetHunt() {
      const ol = document.getElementById('confirm-reset-overlay');
      if (ol) ol.style.display = 'flex';
    }

    function confirmFactoryReset() {
      closeConfirmDlg('confirm-reset-overlay');
      const ol = document.getElementById('confirm-factory-overlay');
      if (ol) ol.style.display = 'flex';
    }

    function closeConfirmDlg(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }

    function doResetHunt() {
      localStorage.removeItem('bb_hunt_session');

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('bb_check_') || k.startsWith('bb_phase_done_'))) keysToRemove.push(k);
      }
      keysToRemove.forEach(function(k) { localStorage.removeItem(k); });

      // Reset UI
      document.querySelectorAll('.checklist-item.checked').forEach(function(el) { el.classList.remove('checked'); });
      document.querySelectorAll('.checklist-bar-fill').forEach(function(el) { el.style.width = '0%'; });
      document.querySelectorAll('.mark-complete-btn').forEach(function(btn) {
        btn.classList.remove('completed');
        btn.disabled = false;
        if (btn.id === 'complete-btn-p0') btn.innerHTML = '✅ Mark Phase Complete — Subdomain Enumeration Done → JS Analysis';
      });

      const dash = document.getElementById('hunt-dashboard');
      if (dash) dash.classList.remove('visible');
      const resetBtn = document.getElementById('huntResetBtn');
      if (resetBtn) resetBtn.style.display = 'none';
      const targetEl = document.getElementById('huntTargetDisplay');
      if (targetEl) targetEl.textContent = 'No active session';

      closeConfirmDlg('confirm-reset-overlay');
    }

    function doFactoryReset() {
      localStorage.clear();
      location.reload();
    }

    // =============================================
    // DOMContentLoaded INIT
    // =============================================
    document.addEventListener('DOMContentLoaded', function() {
      // Existing inits
      restoreVisited();
      renderBookmarksPanel();
      initTheme();
      if (typeof generateTOC === 'function') generateTOC();
      if (typeof renderTacticsMetadata === 'function') renderTacticsMetadata();
      if (typeof renderBreadcrumbs === 'function') renderBreadcrumbs();
      markVisited('p0');

      // BB OS inits
      initHuntDashboard();
      loadChecklistState('p0', 9);
      loadChecklistState('p0-stop', 4);

      // Restore completed phase buttons
      ALL_PHASES.forEach(function(phase) {
        if (localStorage.getItem('bb_phase_done_' + phase.id) === '1') {
          const btn = document.getElementById('complete-btn-' + phase.id);
          if (btn) { btn.classList.add('completed'); btn.innerHTML = '✅ Phase Completed!'; btn.disabled = true; }
        }
      });

      // Close Start Hunt Modal on overlay click
      const modal = document.getElementById('start-hunt-modal');
      if (modal) {
        modal.addEventListener('click', function(e) {
          if (e.target === modal) closeStartHuntModal();
        });
      }
    });

  
    // =============================================
    // REDESIGN V2 — showToolInfo (Tool Inspector)
    // =============================================
    // Creates a floating tooltip-panel showing tool details
    // Called from tool cards and ▶ Simulate buttons on Phase 0

    var _toolInfoPanel = null;

    function showToolInfo(toolName, description) {
      // Remove existing panel
      if (_toolInfoPanel) { _toolInfoPanel.remove(); _toolInfoPanel = null; }

      var simOutputs = {
        subfinder: 'subfinder -d target.com -all -silent\n[info] Starting Subfinder v2.6.2...\n[info] Querying 24 passive sources...\napi.target.com\ndev.target.com        ← HOT 🎯\nstaging.target.com    ← HOT 🎯\nadmin.target.com      ← HOT 🎯\nassets.target.com\n[+] Total: 5 subdomains found.',
        httpx:     'httpx -l subs.txt -status-code -title -tech-detect\nhttps://api.target.com      [200] [API Portal] [Node.js, Nginx]\nhttps://dev.target.com      [200] [DevEnv] [PHP/8.1, Nginx]  ← TEST\nhttps://admin.target.com    [403] [Forbidden] [Apache]        ← BYPASS?\nhttps://old.target.com      [404] Not Found                   ← CHECK CNAME\n[+] 4 alive hosts.',
        nuclei:    'nuclei -l alive.txt -t takeovers/ -t cves/\n[cve-2021-41773] [critical] https://target.com/cgi-bin/..\n[git-core-leak]  [high]     https://target.com/.git/config\n[takeover-azure] [medium]   https://staging.target.com\n[+] 1 critical, 1 high, 1 medium found.',
        naabu:     'naabu -l alive.txt -top-ports 1000\nhttps://api.target.com:443\nhttps://api.target.com:8443\nhttps://dev.target.com:9200   ← Elasticsearch!\nhttps://dev.target.com:6379   ← Redis!\n[+] Non-standard ports found: 9200, 6379',
        amass:     'amass enum -passive -d target.com\n[info] OWASP Amass v3.23.2...\napi.target.com\ndev-portal.target.com\nauth.target.com\n[+] 3 subdomains (passive mode).',
        assetfinder: 'assetfinder --subs-only target.com\napi.target.com\nstatus.target.com\nblog.target.com\n[+] 3 subdomains via crt.sh.'
      };

      var output = simOutputs[toolName] || ('[*] ' + toolName + '\n' + description);

      var panel = document.createElement('div');
      panel.style.cssText = [
        'position:fixed', 'bottom:20px', 'right:20px', 'z-index:9999',
        'width:480px', 'max-width:94vw',
        'background:#04040a', 'border:1px solid rgba(0,229,255,0.3)',
        'border-radius:10px', 'box-shadow:0 0 30px rgba(0,229,255,0.15)',
        'font-family:Fira Code,monospace', 'font-size:0.85rem',
        'animation:fadeIn 0.2s ease', 'overflow:hidden'
      ].join(';');

      panel.innerHTML = [
        '<div style="background:rgba(0,229,255,0.06);border-bottom:1px solid rgba(0,229,255,0.15);',
        'padding:10px 14px;display:flex;justify-content:space-between;align-items:center;">',
        '<span style="color:#00e5ff;font-weight:700;">🛠 ' + toolName + ' — Simulator</span>',
        '<button onclick="this.closest(\'div[style]\').remove()" ',
        'style="background:none;border:none;color:rgba(148,163,184,0.6);cursor:pointer;font-size:1rem;">✕</button>',
        '</div>',
        '<div style="padding:8px 14px 4px;color:rgba(148,163,184,0.7);font-size:0.78rem;border-bottom:1px solid rgba(255,255,255,0.04);">',
        description,
        '</div>',
        '<div style="padding:14px;color:#00ff66;white-space:pre-wrap;line-height:1.7;max-height:220px;overflow-y:auto;">',
        output,
        '</div>',
        '<div style="padding:8px 14px;border-top:1px solid rgba(255,255,255,0.04);display:flex;gap:8px;">',
        '<button onclick="triggerTerminalSim(\'' + toolName + ' -d target.com\')" ',
        'style="background:rgba(0,229,255,0.07);border:1px solid rgba(0,229,255,0.25);color:#00e5ff;',
        'padding:6px 12px;border-radius:4px;cursor:pointer;font-family:Fira Code,monospace;font-size:0.78rem;">',
        '▶ Run in Terminal</button>',
        '<button onclick="this.closest(\'div[style]\').remove()" ',
        'style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:#94a3b8;',
        'padding:6px 12px;border-radius:4px;cursor:pointer;font-size:0.78rem;">Close</button>',
        '</div>'
      ].join('');

      document.body.appendChild(panel);
      _toolInfoPanel = panel;
      setTimeout(function() { if (panel.parentNode) panel.remove(); }, 12000);
    }

    // =============================================
    // REDESIGN V2 — New Interactive Sections
    // =============================================

    // --- Stats Counter Animation ---
    function animateCounters() {
      document.querySelectorAll('.hero-stat-value[data-target]').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (!target || target === 0) return;
        var prefix = el.textContent.startsWith('$') ? '$' : '';
        var suffix = '+';
        var duration = 1500;
        var start = 0;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var current = Math.floor(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    // --- Checklist System ---
    function initRdChecklist() {
      var items = document.querySelectorAll('#rdCheckItems .rd-check-item');
      items.forEach(function(item) {
        var idx = item.getAttribute('data-idx');
        if (localStorage.getItem('rd_check_' + idx) === '1') {
          item.classList.add('checked');
          item.querySelector('.rd-check-box').textContent = '✓';
        }
      });
      updateRdCheckProgress();
    }
    function toggleRdCheck(el) {
      var idx = el.getAttribute('data-idx');
      el.classList.toggle('checked');
      var box = el.querySelector('.rd-check-box');
      if (el.classList.contains('checked')) {
        localStorage.setItem('rd_check_' + idx, '1');
        box.textContent = '✓';
      } else {
        localStorage.removeItem('rd_check_' + idx);
        box.textContent = '';
      }
      updateRdCheckProgress();
    }
    function updateRdCheckProgress() {
      var total = document.querySelectorAll('#rdCheckItems .rd-check-item').length;
      var checked = document.querySelectorAll('#rdCheckItems .rd-check-item.checked').length;
      var pct = Math.round((checked / total) * 100);
      var countEl = document.getElementById('rdCheckCount');
      var fillEl = document.getElementById('rdCheckFill');
      var celebEl = document.getElementById('rdCelebration');
      if (countEl) countEl.textContent = checked + ' / ' + total;
      if (fillEl) fillEl.style.width = pct + '%';
      if (celebEl) {
        if (checked === total && total > 0) celebEl.classList.add('show');
        else celebEl.classList.remove('show');
      }
    }

    // --- Edge Case Accordion ---
    function toggleEdge(el) {
      el.classList.toggle('open');
    }

    // --- Quick Reference Toggle ---
    function toggleQuickRef() {
      var qr = document.getElementById('rdQuickRef');
      var arrow = document.getElementById('rdQrArrow');
      qr.classList.toggle('open');
      arrow.textContent = qr.classList.contains('open') ? '▼' : '▲';
    }
    function copyQR(btn, text) {
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = '✓';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = '📋'; btn.classList.remove('copied'); }, 1500);
      });
    }

    // --- Show/Hide redesign sections based on active phase ---
    var RD_SECTIONS = ['rd-tools-grid','rd-case-study','rd-checklist','rd-mistakes','rd-edge-cases','rd-next-cta'];
    var originalOpenMethPhase = typeof openMethPhase === 'function' ? openMethPhase : null;

    function showRdSections(phaseId) {
      // Show hero + pipeline always
      var hero = document.getElementById('rd-hero-section');
      if (hero) hero.style.display = 'block';

      // Show bottom sections only on p0 (main page)
      RD_SECTIONS.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = (phaseId === 'p0') ? 'block' : 'none';
      });
    }

    // Patch openMethPhase to also toggle redesign sections
    (function() {
      var _origOpen = window.openMethPhase;
      if (_origOpen) {
        window.openMethPhase = function(id) {
          _origOpen(id);
          showRdSections(id);
        };
      }
    })();

    function clickPipelineNode(phaseId) {
      if (typeof openMethPhase === 'function') {
        openMethPhase(phaseId);
        var viewer = document.querySelector('.meth-viewer');
        if (viewer) viewer.scrollTop = 0;
      }
    }

    // Init redesign features on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      // Animate stat counters
      setTimeout(animateCounters, 400);
      // Init checklist
      initRdChecklist();
      // Show sections for default phase
      showRdSections('p0');
      // Open quick ref by default
      var qr = document.getElementById('rdQuickRef');
      if (qr) qr.classList.add('open');
      // Generate TOC for default phase
      var defaultContent = document.getElementById('meth-content-p0');
      if (defaultContent) {
        generatePhaseTOC('p0', defaultContent);
        generateBreadcrumb('p0');
      }
    });

    // ============================================================
    // PHASE TOC GENERATOR — Auto-builds table of contents
    // ============================================================
    var _tocScrollHandler = null;

    function getCategoryForPhase(phaseId) {
      if (phaseId.startsWith('pt_mod')) return 'Pentesting Guide';
      if (phaseId.startsWith('assess-')) return 'Real Assessments';

      var catMap = {
        'cat-recon': ['p0','p2','p1','p_matrix'],
        'cat-discover': ['p6','p4','p16','p_graphql','p5','p3'],
        'cat-vuln': ['p7','p8','p9','p_ssti','p_xxe','p10','p11','p12','p14','p13','p15'],
        'cat-automation': ['p17','p_payloads','p18','p_writeups','p19'],
        'cat-scenarios': ['p_scen_rce','p_scen_idor','p_scen_takeover']
      };
      var catNames = {
        'cat-recon': 'Core Recon',
        'cat-discover': 'Web Discovery',
        'cat-vuln': 'Vulnerabilities',
        'cat-automation': 'Pipelines & Labs',
        'cat-scenarios': 'Hacker Scenarios'
      };
      for (var cat in catMap) {
        if (catMap[cat].indexOf(phaseId) !== -1) return catNames[cat] || cat;
      }
      return 'Methodology';
    }

    function getPhaseTitle(phaseId) {
        // Pentesting Guide
        if (phaseId === 'pt_mod1') return '01. Fundamentals';
        if (phaseId === 'pt_mod2') return '02. Active Recon';
        if (phaseId === 'pt_mod3') return '03. Passive Recon';
        if (phaseId === 'pt_mod4') return '04. Content Discovery';
        if (phaseId === 'pt_mod5') return '05. Port Scanning';
        if (phaseId === 'pt_mod6') return '06. Service Enumeration';
        if (phaseId === 'pt_mod7') return '07. Web Testing';
        if (phaseId === 'pt_mod8') return '08. API Testing';
        if (phaseId === 'pt_mod9') return '09. Authentication';
        if (phaseId === 'pt_mod10') return '10. Advanced Vulns';
        if (phaseId === 'pt_mod11') return '11. Client Side';
        if (phaseId === 'pt_mod12') return '12. Cloud';
        if (phaseId === 'pt_mod13') return '13. Network';
        if (phaseId === 'pt_mod14') return '14. Active Directory';
        if (phaseId === 'pt_mod15') return '15. Post Exploitation';
        if (phaseId === 'pt_mod16') return '16. Reporting';
        if (phaseId === 'pt_mod17') return '17. Methodologies';
        if (phaseId === 'pt_mod18') return '18. Bug Bounty';
        if (phaseId === 'pt_mod19') return '19. Labs';
        if (phaseId === 'pt_mod20') return '20. Tools Reference';
        if (phaseId === 'assess-htb') return 'HTB Writeup';
        if (phaseId === 'assess-bb') return 'Bug Bounty Report';
        if (phaseId === 'assess-ad') return 'AD Pentest';

      var contentEl = document.getElementById('meth-content-' + phaseId);
      if (!contentEl) return phaseId;
      var h1 = contentEl.querySelector('.phase-module-title') || contentEl.querySelector('.hero-title') || contentEl.querySelector('h1') || contentEl.querySelector('h2');
      if (h1) return h1.textContent.trim().replace(/^#+\s*/, '');
      return phaseId;
    }

    function generatePhaseTOC(phaseId, contentEl) {
      if (!contentEl) return;

      // Remove any existing TOC
      var oldToc = contentEl.querySelector('.phase-toc');
      if (oldToc) oldToc.remove();

      // Find all sections: os-section-label, card-header h3, h2
      var sections = [];
      var elements = contentEl.querySelectorAll('.os-section-label, .card-header h3, .phase-module-header, .info-duo, .if-nothing-box, .expected-output, .lab-box');
      var seen = {};
      var stepCount = 0;

      elements.forEach(function(el) {
        var text = '';
        if (el.classList.contains('os-section-label')) {
          text = el.textContent.trim();
        } else if (el.classList.contains('phase-module-header')) {
          text = 'Overview';
        } else if (el.classList.contains('info-duo')) {
          text = 'What & Goal';
        } else if (el.classList.contains('if-nothing-box')) {
          var title = el.querySelector('.if-nothing-title');
          text = title ? title.textContent.trim() : 'If Nothing Found';
        } else if (el.classList.contains('expected-output')) {
          return; // skip these
        } else if (el.classList.contains('lab-box')) {
          var labHeader = el.querySelector('.lab-header h3, .lab-header');
          text = labHeader ? labHeader.textContent.trim() : 'Lab';
        } else {
          text = el.textContent.trim();
        }

        if (!text || text.length > 80) return;
        if (seen[text]) return;
        seen[text] = true;
        stepCount++;

        // Add anchor ID
        var anchorId = 'phase-toc-' + phaseId + '-' + stepCount;
        el.id = anchorId;
        el.classList.add('section-anchor');

        sections.push({ id: anchorId, text: text, step: stepCount });
      });

      if (sections.length < 2) return; // Don't show TOC for tiny phases

      // Count total steps (cmd-ui-box elements)
      var totalSteps = contentEl.querySelectorAll('.cmd-ui-box').length;

      // Build TOC HTML
      var phaseTitle = getPhaseTitle(phaseId);
      var category = getCategoryForPhase(phaseId);
      var tocHtml = '<div class="phase-toc">';
      tocHtml += '<div class="phase-toc-title">\u{1F4D1} IN THIS SECTION</div>';
      tocHtml += '<button class="phase-toc-toggle" onclick="this.parentElement.classList.toggle(\'collapsed\'); this.textContent = this.parentElement.classList.contains(\'collapsed\') ? \'+ show\' : \'\u2212 hide\';">\u2212 hide</button>';
      tocHtml += '<ul class="phase-toc-list">';

      sections.forEach(function(s) {
        tocHtml += '<li class="phase-toc-item" data-target="' + s.id + '" onclick="scrollToPhaseSection(\'' + s.id + '\')">';
        tocHtml += '<span class="toc-step-num">' + s.step + '</span>';
        tocHtml += '<span>' + s.text + '</span>';
        tocHtml += '</li>';
      });

      tocHtml += '</ul></div>';

      // Insert TOC after the phase-module-header
      var header = contentEl.querySelector('.phase-module-header');
      if (header && header.nextSibling) {
        header.parentNode.insertBefore(createElementFromHTML(tocHtml), header.nextSibling);
      } else if (header) {
        contentEl.appendChild(createElementFromHTML(tocHtml));
      } else {
        var firstChild = contentEl.firstElementChild;
        if (firstChild) {
          contentEl.insertBefore(createElementFromHTML(tocHtml), firstChild.nextSibling);
        }
      }

      // Setup scroll spy
      setupScrollSpy(contentEl, sections);
    }

    function generateBreadcrumb(phaseId) {
      var viewer = document.querySelector('.meth-viewer');
      if (!viewer) return;

      var oldBc = viewer.querySelector('.phase-breadcrumb');
      if (oldBc) oldBc.remove();

      var category = getCategoryForPhase(phaseId);
      var title = getPhaseTitle(phaseId);
      var contentEl = document.getElementById('meth-content-' + phaseId);
      var totalSteps = contentEl ? contentEl.querySelectorAll('.cmd-ui-box').length : 0;

      var bcHtml = '<div class="phase-breadcrumb">';
      bcHtml += '<span class="bc-category">' + category + '</span>';
      bcHtml += '<span class="bc-separator">\u203A</span>';
      bcHtml += '<span class="bc-phase">' + title + '</span>';
      if (totalSteps > 0) {
        bcHtml += '<span class="bc-step-count">' + totalSteps + ' steps</span>';
      }
      bcHtml += '</div>';

      var phaseContent = document.getElementById('meth-content-' + phaseId);
      if (phaseContent) {
        phaseContent.insertBefore(createElementFromHTML(bcHtml), phaseContent.firstChild);
      }
    }

    function scrollToPhaseSection(anchorId) {
      var el = document.getElementById(anchorId);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function setupScrollSpy(contentEl, sections) {
      // Remove old handler
      if (_tocScrollHandler) {
        document.querySelector('.meth-viewer') &&
          document.querySelector('.meth-viewer').removeEventListener('scroll', _tocScrollHandler);
      }

      var viewer = document.querySelector('.meth-viewer');
      if (!viewer) return;

      _tocScrollHandler = function() {
        var scrollTop = viewer.scrollTop;
        var activeId = null;

        for (var i = sections.length - 1; i >= 0; i--) {
          var el = document.getElementById(sections[i].id);
          if (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top <= 150) {
              activeId = sections[i].id;
              break;
            }
          }
        }

        var tocItems = contentEl.querySelectorAll('.phase-toc-item');
        tocItems.forEach(function(item) {
          if (item.getAttribute('data-target') === activeId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      };

      viewer.addEventListener('scroll', _tocScrollHandler);
    }

    function createElementFromHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      return div.firstElementChild || div.firstChild;
    }


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
                '<button class="mark-complete-btn" style="background: ' + (isCompleted ? 'var(--success)' : 'var(--accent-primary)') + '; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; font-family: var(--font-mono); cursor: pointer; transition: all 0.3s ease;" onclick="handleMarkComplete(\'' + phaseId + '\', this)">' +
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
