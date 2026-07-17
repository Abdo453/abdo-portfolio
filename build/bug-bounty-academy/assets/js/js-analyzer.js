// ==========================================
// JS ANALYZER ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const btnAnalyze = document.getElementById("btn-analyze");
  const jsInput = document.getElementById("js-input");
  
  // Tabs UI
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    });
  });

  // Regex Patterns
  const PATTERNS = {
    endpoints: [
      // Matches standard URLs
      { regex: /(https?:\/\/[a-zA-Z0-9.\-_]+(:[0-9]+)?(\/[a-zA-Z0-9.\-_%&=?]*)*)/ig, type: 'Absolute URL', severity: 'low' },
      // Matches relative API paths (e.g., /api/v1/users)
      { regex: /(?=["'])\/?(api\/v[0-9]\/[a-zA-Z0-9.\-_%&=?\/]+)["']/ig, type: 'API Route', severity: 'medium' },
      // Matches hidden dev routes
      { regex: /(?=["'])\/?((dev|test|admin|staging|internal)\/[a-zA-Z0-9.\-_%&=?\/]+)["']/ig, type: 'Sensitive Route', severity: 'high' }
    ],
    secrets: [
      // Matches JWT tokens
      { regex: /(eyJ[a-zA-Z0-9_-]{5,}\.eyJ[a-zA-Z0-9_-]{5,}\.[a-zA-Z0-9_-]+)/ig, type: 'JWT Token', severity: 'critical' },
      // Matches AWS Access Keys
      { regex: /(AKIA[0-9A-Z]{16})/ig, type: 'AWS Access Key', severity: 'critical' },
      // Matches Stripe Secret Keys
      { regex: /(sk_live_[0-9a-zA-Z]{24})/ig, type: 'Stripe Live Key', severity: 'critical' },
      // Matches generic Bearer tokens
      { regex: /(Bearer\s[a-zA-Z0-9\-_]+)/ig, type: 'Bearer Token', severity: 'high' },
      // Matches Generic API Keys assigned to variables
      { regex: /(?:api_key|apiKey|secret|token|password)[\s]*=[\s]*['"]([a-zA-Z0-9\-_]{16,})['"]/ig, type: 'Generic API Key', severity: 'high' }
    ],
    comments: [
      // Single line comments
      { regex: /(\/\/.*)/g, type: 'Single Line Comment', severity: 'low' },
      // Multi line comments
      { regex: /(\/\*[\s\S]*?\*\/)/g, type: 'Block Comment', severity: 'low' }
    ]
  };

  function renderFindings(containerId, badgeId, findings) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);
    
    // Remove duplicates
    const uniqueFindings = [];
    const seen = new Set();
    for (const f of findings) {
      if (!seen.has(f.value)) {
        seen.add(f.value);
        uniqueFindings.push(f);
      }
    }

    badge.textContent = uniqueFindings.length;

    if (uniqueFindings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="bx bx-check-shield"></i>
          <p>No matches found in this category.</p>
        </div>
      `;
      return;
    }

    // Sort by severity
    const severityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
    uniqueFindings.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

    container.innerHTML = "";
    uniqueFindings.forEach(f => {
      const card = document.createElement("div");
      card.className = `finding-card ${f.severity}`;
      card.innerHTML = `
        <div class="finding-type">${f.type} <span style="float:right; opacity:0.5;">${f.severity.toUpperCase()}</span></div>
        <div class="finding-value">${escapeHtml(f.value)}</div>
      `;
      container.appendChild(card);
    });
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  btnAnalyze.addEventListener("click", () => {
    const code = jsInput.value;
    if (!code.trim()) return;

    btnAnalyze.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Analyzing...";

    setTimeout(() => {
      // Analyze Endpoints
      let endpointFindings = [];
      PATTERNS.endpoints.forEach(p => {
        let match;
        // reset regex state
        p.regex.lastIndex = 0;
        while ((match = p.regex.exec(code)) !== null) {
          // If capture group 1 exists, use it, else use full match
          let val = match[1] ? match[1] : match[0];
          val = val.replace(/["']/g, ''); // strip quotes
          endpointFindings.push({ type: p.type, severity: p.severity, value: val });
        }
      });
      renderFindings("tab-endpoints", "badge-endpoints", endpointFindings);

      // Analyze Secrets
      let secretFindings = [];
      PATTERNS.secrets.forEach(p => {
        let match;
        p.regex.lastIndex = 0;
        while ((match = p.regex.exec(code)) !== null) {
          let val = match[1] ? match[1] : match[0];
          secretFindings.push({ type: p.type, severity: p.severity, value: val });
        }
      });
      renderFindings("tab-secrets", "badge-secrets", secretFindings);

      // Analyze Comments
      let commentFindings = [];
      PATTERNS.comments.forEach(p => {
        let match;
        p.regex.lastIndex = 0;
        while ((match = p.regex.exec(code)) !== null) {
          let val = match[1] ? match[1] : match[0];
          commentFindings.push({ type: p.type, severity: p.severity, value: val });
        }
      });
      renderFindings("tab-comments", "badge-comments", commentFindings);

      btnAnalyze.innerHTML = "<i class='bx bx-check'></i> Analysis Complete";
      btnAnalyze.style.background = "var(--accent-green)";
      
      setTimeout(() => {
        btnAnalyze.innerHTML = "<i class='bx bx-search-alt-2'></i> Analyze Code";
        btnAnalyze.style.background = "var(--accent-cyan)";
      }, 2000);
      
    }, 600); // Simulate processing time
  });
});
