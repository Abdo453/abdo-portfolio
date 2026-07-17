(function() {
  // Custom Toast Notification System
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: rgba(10, 10, 25, 0.95);
      border: 1px solid ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-orange)'};
      box-shadow: 0 0 15px ${type === 'success' ? 'rgba(0,255,102,0.2)' : 'rgba(255,170,0,0.2)'};
      color: #fff;
      padding: 12px 24px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      z-index: 100000;
      direction: rtl;
      text-align: right;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    `;
    toast.innerHTML = type === 'success' ? `✔️ ${message}` : `⚠️ ${message}`;
    document.body.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // XP addition helper
  function addArenaXP(amount, reason) {
    let currentXp = parseInt(localStorage.getItem('arena_xp')) || 0;
    currentXp += amount;
    localStorage.setItem('arena_xp', currentXp);
    
    showToast(`لقد حصلت على +${amount} XP! (${reason})`, 'success');
    
    if (typeof window.updateDashboardUI === 'function') {
      window.updateDashboardUI();
    }
  }

  // Switch between Subtabs in the Arena
  window.switchArenaTab = function(tabId) {
    // Update subtab button states
    document.querySelectorAll('.arena-subtab-btn').forEach(btn => {
      if (btn.getAttribute('data-subtab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update active pane
    document.querySelectorAll('.arena-pane').forEach(pane => {
      if (pane.id === `arena-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // If memory match tab is opened, initialize/reset game
    if (tabId === 'memory') {
      initMemoryGame();
    }
  };

  // 1. Roadmap Path Logic
  window.toggleRoadmapNode = function(element, nodeId) {
    const key = `arena_roadmap_${nodeId}`;
    const isCompleted = localStorage.getItem(key) === 'true';

    if (!isCompleted) {
      localStorage.setItem(key, 'true');
      element.classList.add('completed');
      addArenaXP(20, 'إكمال مرحلة في خريطة الطريق');
    } else {
      localStorage.removeItem(key);
      element.classList.remove('completed');
      // Deduct XP on unchecking
      let currentXp = parseInt(localStorage.getItem('arena_xp')) || 0;
      currentXp = Math.max(0, currentXp - 20);
      localStorage.setItem('arena_xp', currentXp);
      showToast('تم إلغاء تحديد العقدة وخصم 20 XP', 'warning');
      if (typeof window.updateDashboardUI === 'function') {
        window.updateDashboardUI();
      }
    }
  };

  function loadRoadmapNodeStates() {
    document.querySelectorAll('.roadmap-node').forEach(node => {
      const nodeId = node.getAttribute('data-node-id');
      if (localStorage.getItem(`arena_roadmap_${nodeId}`) === 'true') {
        node.classList.add('completed');
      }
    });
  }

  // 2. Payload Builder Logic
  const payloads = {
    sqli: {
      normal: "1' UNION SELECT null, username, password FROM users--",
      bypass: "1'/**/UNION/**/sElEcT/**/null,/**/username,/**/password/**/FROM/**/users--"
    },
    xss: {
      normal: "<script>alert('XSS')</script>",
      bypass: "<svg/onload=alert('XSS')>"
    },
    lfi: {
      normal: "../../../../etc/passwd",
      bypass: "....//....//....//....//etc/passwd"
    }
  };

  window.updatePayload = function() {
    const type = document.getElementById('payload-type').value;
    const bypassWAF = document.getElementById('waf-bypass-toggle').checked;
    const urlEncode = document.getElementById('url-encode-toggle').checked;
    const base64Encode = document.getElementById('base64-toggle').checked;

    let payload = bypassWAF ? payloads[type].bypass : payloads[type].normal;

    if (urlEncode) {
      payload = encodeURIComponent(payload);
    }

    if (base64Encode) {
      try {
        payload = btoa(payload);
      } catch (e) {
        payload = btoa(unescape(encodeURIComponent(payload)));
      }
    }

    const payloadBox = document.getElementById('generated-payload-box');
    if (payloadBox) {
      payloadBox.innerText = payload;
    }
  };

  window.copyPayloadToClipboard = function() {
    const payloadText = document.getElementById('generated-payload-box').innerText;
    navigator.clipboard.writeText(payloadText).then(() => {
      showToast('تم نسخ البايلود بنجاح إلى الحافظة!', 'success');
    }).catch(err => {
      showToast('حدث خطأ أثناء النسخ!', 'warning');
    });
  };

  // 3. Memory Match Game Logic
  const concepts = [
    { text: 'SQL Injection', matchId: 1 },
    { text: 'تعديل استعلامات قاعدة البيانات عبر حقول الإدخال', matchId: 1 },
    { text: 'Cross-Site Scripting', matchId: 2 },
    { text: 'حقن نصوص برمجية (JS) لتنفيذها في متصفح الضحية', matchId: 2 },
    { text: 'LFI', matchId: 3 },
    { text: 'تضمين ملفات محلية من الخادم بشكل غير مصرح به', matchId: 3 },
    { text: 'SSRF', matchId: 4 },
    { text: 'إجبار الخادم على إرسال طلبات لجهات داخلية', matchId: 4 },
    { text: 'Ransomware', matchId: 5 },
    { text: 'تشفير ملفات النظام والمطالبة بفدية مالية', matchId: 5 },
    { text: 'IDOR', matchId: 6 },
    { text: 'الوصول المباشر للموارد بتغيير معرفات الطلب (IDs)', matchId: 6 }
  ];

  let selectedCards = [];
  let matchedPairs = 0;

  function initMemoryGame() {
    const grid = document.getElementById('memory-game-grid');
    if (!grid) return;

    grid.innerHTML = '';
    selectedCards = [];
    matchedPairs = 0;

    // Shuffle concepts
    const shuffled = [...concepts].sort(() => Math.random() - 0.5);

    shuffled.forEach((c, idx) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.style.cssText = `
        background: rgba(3,3,8,0.7);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        padding: 15px;
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        font-size: 0.8rem;
        direction: rtl;
        transition: all 0.3s ease;
        user-select: none;
      `;
      card.innerText = '❓';
      card.dataset.matchId = c.matchId;
      card.dataset.text = c.text;

      card.addEventListener('click', () => handleCardClick(card));
      grid.appendChild(card);
    });
  }

  function handleCardClick(card) {
    if (card.classList.contains('matched') || card.classList.contains('selected') || selectedCards.length >= 2) {
      return;
    }

    card.classList.add('selected');
    card.innerText = card.dataset.text;
    card.style.borderColor = 'var(--accent-cyan)';
    card.style.background = 'rgba(0, 229, 255, 0.05)';

    selectedCards.push(card);

    if (selectedCards.length === 2) {
      setTimeout(checkMemoryMatch, 1000);
    }
  }

  function checkMemoryMatch() {
    const [card1, card2] = selectedCards;
    
    if (card1.dataset.matchId === card2.dataset.matchId) {
      // Match found
      card1.classList.remove('selected');
      card2.classList.remove('selected');
      card1.classList.add('matched');
      card2.classList.add('matched');

      card1.style.borderColor = 'var(--accent-green)';
      card1.style.background = 'rgba(0, 255, 102, 0.05)';
      card2.style.borderColor = 'var(--accent-green)';
      card2.style.background = 'rgba(0, 255, 102, 0.05)';

      matchedPairs++;
      if (matchedPairs === 6) {
        const key = 'arena_memory_completed';
        if (localStorage.getItem(key) !== 'true') {
          localStorage.setItem(key, 'true');
          addArenaXP(50, 'مطابقة مفاهيم الذاكرة الأمنية');
        } else {
          showToast('تهانينا! لقد أكملت اللعبة بنجاح!', 'success');
        }
      }
    } else {
      // No match
      card1.classList.remove('selected');
      card2.classList.remove('selected');
      card1.innerText = '❓';
      card2.innerText = '❓';
      card1.style.borderColor = 'rgba(255,255,255,0.08)';
      card1.style.background = 'rgba(3,3,8,0.7)';
      card2.style.borderColor = 'rgba(255,255,255,0.08)';
      card2.style.background = 'rgba(3,3,8,0.7)';
    }

    selectedCards = [];
  }

  // 4. Mock Vulnerability Scanner
  let scanInProgress = false;

  window.startMockScan = function() {
    if (scanInProgress) {
      showToast('هناك فحص جارٍ بالفعل!', 'warning');
      return;
    }

    const domainInput = document.getElementById('scan-domain-input');
    const domain = domainInput ? domainInput.value.trim() : '';

    if (!domain) {
      showToast('الرجاء إدخال نطاق مستهدف صالح للفحص!', 'warning');
      return;
    }

    scanInProgress = true;
    const progressFill = document.getElementById('scan-progress-fill');
    const logsConsole = document.getElementById('scanner-console-logs');
    const reportsList = document.getElementById('scan-reports-list');

    if (progressFill) progressFill.style.width = '0%';
    if (logsConsole) logsConsole.innerText = '';
    if (reportsList) reportsList.innerHTML = '';

    const logMessages = [
      { t: 0, msg: `[+] Initializing mock scan targeting: ${domain}...` },
      { t: 800, msg: `[+] Resolving DNS records and IP addresses...` },
      { t: 1500, msg: `[+] Port scanning active: checking ports 80, 443, 22, 8080...` },
      { t: 2200, msg: `[+] Found ports: 80/HTTP, 443/HTTPS active.` },
      { t: 2800, msg: `[+] Banner grabbing: nginx/1.21.0 backend detected.` },
      { t: 3500, msg: `[+] Spidering web application paths...` },
      { t: 4200, msg: `[!] Alert: Detected potential SQL Injection vulnerability on /api/products?id=` },
      { t: 5000, msg: `[!] Alert: Found directory listing index vulnerability on /uploads/` },
      { t: 5800, msg: `[+] Analyzing security headers: Missing Content-Security-Policy (CSP).` },
      { t: 6500, msg: `[+] Scan finalized. Compiling threat vulnerability report...` }
    ];

    logMessages.forEach(item => {
      setTimeout(() => {
        if (logsConsole) {
          logsConsole.innerText += `\n${item.msg}`;
          logsConsole.scrollTop = logsConsole.scrollHeight;
        }
        if (progressFill) {
          const progressPct = Math.round((item.t / 6500) * 100);
          progressFill.style.width = `${progressPct}%`;
        }
      }, item.t);
    });

    setTimeout(() => {
      scanInProgress = false;
      showToast('اكتمل فحص الثغرات المحاكي بنجاح!', 'success');

      if (reportsList) {
        reportsList.innerHTML = `
          <div class="cyber-card" style="padding: 15px; border-color: var(--accent-orange); direction: rtl; text-align: right;">
            <h4 style="color:var(--accent-orange); margin-bottom:10px;">📋 تقرير الثغرات المكتشفة لـ ${domain}</h4>
            <ul style="font-size:0.8rem; color:var(--text-secondary); line-height:1.6; margin-right:20px;">
              <li>⚠️ <strong>ثغرة SQL Injection (حرجة):</strong> في المسار <code>/api/products?id=</code> يمكن استغلالها لقراءة بيانات المستخدمين.</li>
              <li>⚠️ <strong>كشف محتويات المجلدات (متوسطة):</strong> المجلد <code>/uploads/</code> يتيح عرض الملفات المرفوعة.</li>
              <li>ℹ️ <strong>فقدان حماية الرؤوس الأمنية (منخفضة):</strong> الرأس <code>Content-Security-Policy</code> غير مفعل.</li>
            </ul>
            <button class="hunt-btn primary" onclick="downloadScanReport('${domain}')" style="margin-top:15px; min-height:44px; width:100%;">📥 تحميل تقرير الفحص (Markdown)</button>
          </div>
        `;
      }

      const key = 'arena_scanner_completed';
      if (localStorage.getItem(key) !== 'true') {
        localStorage.setItem(key, 'true');
        addArenaXP(30, 'فحص ثغرات محاكي ناجح');
      }
    }, 7000);
  };

  window.downloadScanReport = function(domain) {
    const reportMarkdown = `# Threat Assessment Report for ${domain}
Generated by Abdo Portfolio Mock Vulnerability Scanner
Date: ${new Date().toLocaleDateString()}

## Vulnerabilities Identified

### 1. SQL Injection (High Severity)
- **Path:** \`/api/products?id=\`
- **Impact:** An attacker can manipulate queries to extract confidential user information or administrative credentials.
- **Remediation:** Implement parameterized queries or prepared statements.

### 2. Directory Listing (Medium Severity)
- **Path:** \`/uploads/\`
- **Impact:** Direct access allowed to user files without authorization checks.
- **Remediation:** Disable indexing options in nginx settings.

### 3. Missing Security Headers (Low Severity)
- **Header:** \`Content-Security-Policy\`
- **Remediation:** Deploy CSP header configuration to block unauthorized script execution.
`;
    const blob = new Blob([reportMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `vuln_report_${domain}.md`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 5. Daily Challenge ROT13 Caesar Cipher
  window.checkDailyChallenge = function() {
    const flagInput = document.getElementById('challenge-flag-input');
    const answer = flagInput ? flagInput.value.trim().toLowerCase() : '';

    if (!answer) {
      showToast('الرجاء إدخال رمز العلم للتحقق!', 'warning');
      return;
    }

    // Accept both flag{abdo_sec} and abdo_sec
    if (answer === 'abdo_sec' || answer === 'flag{abdo_sec}') {
      const key = 'arena_challenge_completed';
      if (localStorage.getItem(key) !== 'true') {
        localStorage.setItem(key, 'true');
        addArenaXP(100, 'فك شفرة التحدي اليومي');
      } else {
        showToast('إجابة صحيحة! لقد قمت بحل هذا التحدي بالفعل.', 'success');
      }
    } else {
      showToast('رمز العلم خاطئ! حاول مجدداً وفك شفرة ROT13.', 'warning');
    }
  };

    } else {
      showToast('رمز العلم خاطئ! حاول مجدداً وفك شفرة ROT13.', 'warning');
    }
  };

  // =========================================================================
  // 6. NEXT-GEN FEATURE: AI SECURITY MENTOR
  // =========================================================================
  const aiMentorDB = {
    sqli: {
      title: "SQL Injection (SQLi)",
      cwe: "CWE-89: Improper Neutralization of Special Elements used in an SQL Command",
      cve: "CVE-2022-2185 (GitLab SQL Injection leading to Remote Code Execution)",
      concept: "SQL Injection occurs when user-supplied input is directly concatenated into a database query string without proper sanitization or parameterization, allowing an attacker to manipulate SQL syntax and query structure.",
      vulnCode: `// VULNERABLE CODE (PHP)\n$id = $_GET['id'];\n$query = "SELECT * FROM products WHERE id = " . $id;\n$result = mysqli_query($conn, $query);`,
      patchCode: `// PATCHED CODE (PHP)\n$stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");\n$stmt->bind_param("i", $id);\n$stmt->execute();`,
      request: "GET /products.php?id=1%20UNION%20SELECT%20null,username,password%20FROM%20users HTTP/1.1\nHost: target.com\nUser-Agent: Mozilla/5.0",
      response: "HTTP/1.1 200 OK\nContent-Type: text/html\n\n[{\"id\": 1, \"name\": \"admin\", \"price\": \"$2y$10$xyz...\"}]",
      labLink: "sql-injection-lab.html"
    },
    xss: {
      title: "Cross-Site Scripting (XSS)",
      cwe: "CWE-79: Improper Neutralization of Input During Web Page Generation",
      cve: "CVE-2020-11022 (jQuery vulnerability exposing XSS in HTML parsing)",
      concept: "XSS vulnerabilities occur when an application includes untrusted data in a web page without proper validation or escaping, allowing malicious client-side scripts to run in the victim's browser context.",
      vulnCode: `// VULNERABLE CODE (Node.js/Express)\nconst comment = req.body.comment;\nres.send("<div>" + comment + "</div>");`,
      patchCode: `// PATCHED CODE (Node.js/Express)\nconst DOMPurify = require('dompurify');\nconst cleanComment = DOMPurify.sanitize(req.body.comment);\nres.send("<div>" + cleanComment + "</div>");`,
      request: "POST /comments HTTP/1.1\nHost: target.com\nContent-Type: application/x-www-form-urlencoded\n\ncomment=%3Csvg%2Fonload%3Dalert(document.cookie)%3E",
      response: "HTTP/1.1 200 OK\n\n<div><svg/onload=alert(document.cookie)></div>",
      labLink: "sql-injection-lab.html"
    },
    idor: {
      title: "Insecure Direct Object References (IDOR)",
      cwe: "CWE-639: Access Control Bypass Through User-Controlled Key",
      cve: "CVE-2022-30525 (Zyxel firewalls access control bypass)",
      concept: "IDOR happens when an application provides direct access to objects based on user-supplied input, but fails to validate if the user has authorization to access the requested resource.",
      vulnCode: `// VULNERABLE CODE (Python/Django)\ndef view_invoice(request):\n    invoice_id = request.GET.get('id')\n    invoice = Invoice.objects.get(id=invoice_id)\n    return render(request, 'invoice.html', {'invoice': invoice})`,
      patchCode: `// PATCHED CODE (Python/Django)\ndef view_invoice(request):\n    invoice_id = request.GET.get('id')\n    # Enforce ownership check\n    invoice = Invoice.objects.filter(id=invoice_id, owner=request.user).first()\n    if not invoice:\n        return HttpResponseForbidden()\n    return render(request, 'invoice.html', {'invoice': invoice})`,
      request: "GET /api/invoices?id=1002 HTTP/1.1\nHost: target.com\nAuthorization: Bearer attacker_token",
      response: "HTTP/1.1 200 OK\n\n{\"invoice_id\": 1002, \"owner\": \"victim_user\", \"amount\": \"$5,000.00\"}",
      labLink: "idor-lab.html"
    },
    ssrf: {
      title: "Server-Side Request Forgery (SSRF)",
      cwe: "CWE-918: Server-Side Request Forgery",
      cve: "CVE-2021-26084 (Confluence SSRF & OGNL Injection)",
      concept: "SSRF occurs when a web application fetches a remote resource without validating the user-supplied URL. An attacker can force the server to connect to internal-only resources, cloud metadata endpoints, or loopback interfaces.",
      vulnCode: `// VULNERABLE CODE (Python)\nimport requests\ndef fetch_preview(request):\n    url = request.GET.get('url')\n    return HttpResponse(requests.get(url).content)`,
      patchCode: `// PATCHED CODE (Python)\nfrom urllib.parse import urlparse\ndef fetch_preview(request):\n    url = request.GET.get('url')\n    parsed = urlparse(url)\n    # Blacklist internal subnets and restrict protocols to http/https\n    if parsed.hostname in ['localhost', '127.0.0.1'] or parsed.scheme not in ['http', 'https']:\n        return HttpResponseForbidden()\n    return HttpResponse(requests.get(url).content)`,
      request: "GET /preview?url=http://169.254.169.254/latest/meta-data/ HTTP/1.1\nHost: target.com",
      response: "HTTP/1.1 200 OK\n\niam/\nlocal-hostname\nsecurity-credentials/",
      labLink: "ssrf-lab.html"
    }
  };

  window.askAIMentor = function(topic) {
    let key = topic ? topic.toLowerCase() : '';
    if (!key) {
      const input = document.getElementById('ai-search-input');
      key = input ? input.value.trim().toLowerCase() : '';
    }

    if (!key) {
      showToast('الرجاء كتابة اسم الثغرة أو اختيارها من الأسفل!', 'warning');
      return;
    }

    // Resolve aliases
    if (key.includes('sql') || key === 'sqli') key = 'sqli';
    else if (key.includes('xss') || key.includes('scripting')) key = 'xss';
    else if (key.includes('idor') || key.includes('direct object')) key = 'idor';
    else if (key.includes('ssrf') || key.includes('forgery')) key = 'ssrf';
    else {
      showToast('لم يتم العثور على معلومات دقيقة للثغرة المحددة. جرب اختيار ثغرة من القائمة!', 'warning');
      return;
    }

    const data = aiMentorDB[key];
    const detailsContainer = document.getElementById('ai-response-details');
    if (!detailsContainer) return;

    detailsContainer.innerHTML = `
      <div class="cyber-card" style="padding: 20px; border-color: var(--accent-cyan); background: rgba(5,5,15,0.9); direction: ltr; text-align: left;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,229,255,0.2); padding-bottom:10px; margin-bottom:15px;">
          <h4 style="color:var(--accent-cyan); margin:0; font-family:'Outfit',sans-serif; font-size:1.15rem;">🧠 AI Security Mentor - ${data.title}</h4>
          <span style="font-size:0.75rem; background:rgba(0,229,255,0.1); color:var(--accent-cyan); padding:2px 8px; border-radius:4px; font-weight:bold;">Threat Intel Active</span>
        </div>
        
        <p style="color:#e2e8f0; font-size:0.88rem; line-height:1.6; margin-bottom:15px;">
          <strong>Concept:</strong> ${data.concept}
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div>
            <div style="font-size:0.75rem; color:#ff4f70; margin-bottom:4px; font-family:'Fira Code',monospace;">⚠️ Vulnerable Code Pattern</div>
            <pre style="margin:0; background:rgba(255,79,112,0.04); border:1px solid rgba(255,79,112,0.2); padding:10px; border-radius:4px; font-size:0.75rem; overflow-x:auto; font-family:'Fira Code',monospace; color:#ffb3c1;"><code>${data.vulnCode}</code></pre>
          </div>
          <div>
            <div style="font-size:0.75rem; color:#00ff66; margin-bottom:4px; font-family:'Fira Code',monospace;">✔️ Remediated Secure Code</div>
            <pre style="margin:0; background:rgba(0,255,102,0.04); border:1px solid rgba(0,255,102,0.2); padding:10px; border-radius:4px; font-size:0.75rem; overflow-x:auto; font-family:'Fira Code',monospace; color:#a3ffd6;"><code>${data.patchCode}</code></pre>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div>
            <div style="font-size:0.75rem; color:var(--accent-cyan); margin-bottom:4px; font-family:'Fira Code',monospace;">📤 Attack HTTP Request</div>
            <pre style="margin:0; background:rgba(0,0,0,0.3); border:1px solid rgba(0,229,255,0.15); padding:10px; border-radius:4px; font-size:0.75rem; overflow-x:auto; font-family:'Fira Code',monospace; color:#88d9ff;"><code>${data.request}</code></pre>
          </div>
          <div>
            <div style="font-size:0.75rem; color:#a8b2d1; margin-bottom:4px; font-family:'Fira Code',monospace;">📥 Target Server Response</div>
            <pre style="margin:0; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); padding:10px; border-radius:4px; font-size:0.75rem; overflow-x:auto; font-family:'Fira Code',monospace; color:#cbd5e1;"><code>${data.response}</code></pre>
          </div>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:12px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div style="font-size:0.75rem; color:#94a3b8; font-family:'Fira Code',monospace;">
            <div><strong>CWE:</strong> ${data.cwe}</div>
            <div style="margin-top:2px;"><strong>CVE:</strong> ${data.cve}</div>
          </div>
          <a href="labs/${data.labLink}" target="_blank" class="hunt-btn primary" style="padding: 6px 16px; min-height:36px; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; font-size:0.8rem; font-family:'Outfit',sans-serif;">🧪 Start Hands-On Lab</a>
        </div>
      </div>
    `;

    // Track Mentor XP
    const mentorXpKey = 'arena_mentor_xp_earned_' + key;
    if (localStorage.getItem(mentorXpKey) !== 'true') {
      localStorage.setItem(mentorXpKey, 'true');
      addArenaXP(20, 'استشارة خبير الذكاء الاصطناعي');
    }
  };

  // =========================================================================
  // 7. NEXT-GEN FEATURE: VULNERABILITY SANDBOX
  // =========================================================================
  let sandboxRunning = false;
  const sandboxPayloads = {
    sqli: {
      login: {
        normal: "admin",
        exploit: "admin' OR '1'='1"
      },
      search: {
        normal: "laptop",
        exploit: "laptop' UNION SELECT null, username, password FROM users--"
      }
    },
    xss: {
      search: {
        normal: "printer",
        exploit: "<script>alert('Reflected XSS')</script>"
      },
      comment: {
        normal: "Great work!",
        exploit: "<img src=x onerror=alert(document.cookie)>"
      }
    },
    cmd: {
      ping: {
        normal: "8.8.8.8",
        exploit: "8.8.8.8; cat /etc/passwd"
      }
    }
  };

  window.updateSandboxPayloads = function() {
    const vuln = document.getElementById('sandbox-vuln-select').value;
    const scenarioSelect = document.getElementById('sandbox-scenario-select');
    
    // Populate scenarios based on vuln type
    scenarioSelect.innerHTML = '';
    if (vuln === 'sqli') {
      scenarioSelect.innerHTML = `
        <option value="login">Form Login Bypass</option>
        <option value="search">Product Search Union</option>
      `;
    } else if (vuln === 'xss') {
      scenarioSelect.innerHTML = `
        <option value="search">Search Input Reflected</option>
        <option value="comment">Guestbook Comment Stored</option>
      `;
    } else if (vuln === 'cmd') {
      scenarioSelect.innerHTML = `
        <option value="ping">Ping Diagnosis Console</option>
      `;
    }
    
    window.updateSandboxPayloadValue();
  };

  window.updateSandboxPayloadValue = function() {
    const vuln = document.getElementById('sandbox-vuln-select').value;
    const scenario = document.getElementById('sandbox-scenario-select').value;
    const isExploit = document.getElementById('sandbox-exploit-toggle').checked;
    
    const payload = isExploit ? sandboxPayloads[vuln][scenario].exploit : sandboxPayloads[vuln][scenario].normal;
    const input = document.getElementById('sandbox-payload-input');
    if (input) input.value = payload;
  };

  window.runSandboxExploit = function() {
    if (sandboxRunning) return;
    
    const vuln = document.getElementById('sandbox-vuln-select').value;
    const scenario = document.getElementById('sandbox-scenario-select').value;
    const payload = document.getElementById('sandbox-payload-input').value;
    const isExploit = document.getElementById('sandbox-exploit-toggle').checked;
    
    sandboxRunning = true;
    const progressText = document.getElementById('sandbox-progress-text');
    const logsBox = document.getElementById('sandbox-logs');
    const resultBox = document.getElementById('sandbox-result-box');
    
    if (progressText) progressText.innerText = "Initializing Execution flow...";
    if (logsBox) logsBox.innerText = "";
    if (resultBox) {
      resultBox.style.display = "none";
      resultBox.innerHTML = "";
    }
    
    // Reset flow nodes styles
    const nodes = ['client', 'network', 'server', 'db', 'exploit'];
    nodes.forEach(n => {
      const el = document.getElementById(`flow-node-${n}`);
      if (el) el.style.borderColor = 'rgba(0, 229, 255, 0.15)';
    });

    const flowSteps = [
      {
        node: 'client',
        text: 'Client Node',
        log: `[*] Packaging data payload: "${payload}"`,
        delay: 0
      },
      {
        node: 'network',
        text: 'HTTP Transmission',
        log: `[*] Routing HTTP POST packet with parameter: payload=${encodeURIComponent(payload)}`,
        delay: 1000
      },
      {
        node: 'server',
        text: 'Server Processing',
        log: `[*] Server received inputs. Evaluating parameter processing.`,
        delay: 2000
      },
      {
        node: 'db',
        text: vuln === 'cmd' ? 'OS Execution' : 'Database Query',
        log: vuln === 'cmd' ? `[!] Running command shell: ping -c 3 ${payload}` : `[!] Intersecting SQL query: SELECT * FROM users WHERE username = '${payload}'`,
        delay: 3500
      },
      {
        node: 'exploit',
        text: 'Exploit Outcome',
        log: isExploit ? `[+] CRITICAL: Exploitation executed successfully!` : `[*] Operation executed safely. Input correctly evaluated.`,
        delay: 5000
      }
    ];

    flowSteps.forEach(step => {
      setTimeout(() => {
        const el = document.getElementById(`flow-node-${step.node}`);
        if (el) {
          el.style.borderColor = isExploit ? 'var(--accent-cyan)' : 'var(--accent-green)';
          el.style.boxShadow = `0 0 10px ${isExploit ? 'rgba(0,229,255,0.25)' : 'rgba(0,255,102,0.1)'}`;
        }
        if (progressText) progressText.innerText = `Executing: ${step.text}`;
        if (logsBox) {
          logsBox.innerText += `\n${step.log}`;
          logsBox.scrollTop = logsBox.scrollHeight;
        }
      }, step.delay);
    });

    setTimeout(() => {
      sandboxRunning = false;
      if (progressText) progressText.innerText = "Simulation Finalized";
      
      if (resultBox) {
        resultBox.style.display = "block";
        if (isExploit) {
          resultBox.style.borderColor = "var(--accent-orange)";
          if (vuln === 'sqli') {
            resultBox.innerHTML = `
              <div style="color:var(--accent-orange); font-weight:bold; margin-bottom:8px; font-family:'Fira Code',monospace;">🔓 DATABASE EXTRUDED:</div>
              <pre style="margin:0; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; font-size:0.75rem; font-family:'Fira Code',monospace; color:#ffb3c1;">+----+----------+------------------------------+
| id | username | password                     |
+----+----------+------------------------------+
|  1 | admin    | hunteros{sqli_sandbox_flag}  |
|  2 | victim   | SuperSecurePassword123!      |
+----+----------+------------------------------+</pre>
            `;
          } else if (vuln === 'xss') {
            resultBox.innerHTML = `
              <div style="color:var(--accent-orange); font-weight:bold; margin-bottom:8px; font-family:'Fira Code',monospace;">🖥️ DOM SCRIPT EXECUTED:</div>
              <div style="background:rgba(255,170,0,0.1); border:1px dashed var(--accent-orange); padding:10px; border-radius:4px; font-size:0.8rem; font-family:var(--font-mono); text-align:center;">
                Simulating alert popup box: <br>
                <strong style="color:#fff;">"alert(document.cookie)"</strong><br>
                Cookie stolen! flag: <strong style="color:var(--accent-cyan);">hunteros{xss_dom_hijacked}</strong>
              </div>
            `;
          } else if (vuln === 'cmd') {
            resultBox.innerHTML = `
              <div style="color:var(--accent-orange); font-weight:bold; margin-bottom:8px; font-family:'Fira Code',monospace;">📡 SHELL STDOUT OUTPUT:</div>
              <pre style="margin:0; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; font-size:0.75rem; font-family:'Fira Code',monospace; color:#ffb3c1;">PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=14.2 ms
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
hunteros{cmd_sandbox_rce_escalated}</pre>
            `;
          }
          addArenaXP(40, 'محاكاة استغلال ثغرة Sandbox');
        } else {
          resultBox.style.borderColor = "var(--accent-green)";
          resultBox.innerHTML = `
            <div style="color:var(--accent-green); font-weight:bold; font-family:'Fira Code',monospace;">🛡️ SECURE EXECUTION:</div>
            <p style="margin:5px 0 0; font-size:0.8rem; color:#94a3b8;">The input was evaluated safely without triggering syntax escapes.</p>
          `;
        }
      }
    }, 6000);
  };

  // =========================================================================
  // 8. NEXT-GEN FEATURE: HTTP PACKET INSPECTOR
  // =========================================================================
  const packetHeadersDB = {
    request_line: {
      name: "Request Method & URI",
      desc: "GET - specifies the action retrieve data from /api/user/profile. HTTP/1.1 is the protocol version.",
      threat: "Can be vulnerable to HTTP Parameter Pollution (HPP) or Parameter Tampering if ID or authorization fields are altered in the query parameters."
    },
    host: {
      name: "Host Header",
      desc: "Specifies the domain name of the server being targeted (e.g. hunteros.org).",
      threat: "If not verified by the server, an attacker can manipulate this header to exploit Host Header Injection, leading to cache poisoning or password reset link redirections."
    },
    user_agent: {
      name: "User-Agent Header",
      desc: "Informs the server about the browser type, operating system, and browser engine version of the client.",
      threat: "Often targeted in User-Agent parsing vulnerabilities (SQLi, Log4j injection, or Client-side Buffer Overflows). Hackers spoof this header to bypass scraping limits."
    },
    cookie: {
      name: "Cookie Header",
      desc: "Contains key-value pairs stored in the browser representing the active session token.",
      threat: "Crucial target for Session Hijacking, Cross-Site Scripting (XSS), or session fixation attacks if the HTTPOnly flag is missing."
    },
    authorization: {
      name: "Authorization Header",
      desc: "Holds the authorization credentials (typically Bearer JWT tokens or Basic credentials) used to authenticate the API request.",
      threat: "If tokens are weakly signed (HMAC with weak secrets) or contain signature bypasses, attackers can elevate privileges (e.g., changing role from user to admin)."
    },
    x_forwarded_for: {
      name: "X-Forwarded-For Header",
      desc: "Identifies the originating IP address of a client connecting through an HTTP proxy or load balancer.",
      thought: "Frequently used by developers to log client IPs or limit login attempts.",
      threat: "Easily spoofed! An attacker can set this to 127.0.0.1 to bypass internal IP verification restrictions."
    },
    csp: {
      name: "Content-Security-Policy Header",
      desc: "An HTTP Response header that restricts what resources (JS, CSS, Images) the browser is allowed to load for a given page.",
      threat: "A missing or weak CSP allows Cross-Site Scripting (XSS) payload scripts to run and send data to third-party servers."
    },
    hsts: {
      name: "Strict-Transport-Security Header",
      desc: "Forces the browser to connect to the site exclusively using secure HTTPS connections.",
      threat: "Without HSTS, connections can be intercepted and downgraded to HTTP (SSL/TLS stripping attacks)."
    }
  };

  window.inspectPacketHeader = function(headerKey) {
    const data = packetHeadersDB[headerKey];
    const display = document.getElementById('inspector-side-display');
    if (!data || !display) return;

    display.innerHTML = `
      <div style="border-bottom:1px solid rgba(0,229,255,0.25); padding-bottom:8px; margin-bottom:12px;">
        <h4 style="color:var(--accent-cyan); margin:0; font-family:'Outfit',sans-serif;">🔍 Header: ${data.name}</h4>
      </div>
      <div style="margin-bottom:12px; font-size:0.85rem; color:#e2e8f0; line-height:1.5;">
        <strong>Description:</strong> ${data.desc}
      </div>
      <div style="background:rgba(255,79,112,0.05); border:1px solid rgba(255,79,112,0.2); padding:10px; border-radius:4px; font-size:0.8rem; line-height:1.5; color:#ffb3c1;">
        <strong>💀 Security Threat:</strong> ${data.threat}
      </div>
    `;

    // Highlight active selected row
    document.querySelectorAll('.packet-inspect-row').forEach(row => {
      row.style.background = 'transparent';
      row.style.borderColor = 'transparent';
    });
    const selectedRow = document.getElementById(`inspect-row-${headerKey}`);
    if (selectedRow) {
      selectedRow.style.background = 'rgba(0, 229, 255, 0.08)';
      selectedRow.style.borderColor = 'rgba(0, 229, 255, 0.2)';
    }

    const inspectXpKey = 'arena_inspect_xp_' + headerKey;
    if (localStorage.getItem(inspectXpKey) !== 'true') {
      localStorage.setItem(inspectXpKey, 'true');
      addArenaXP(10, 'فحص الرؤوس الأمنية للشبكة');
    }
  };

  // =========================================================================
  // 9. NEXT-GEN FEATURE: BURP SUITE SIMULATOR
  // =========================================================================
  window.switchBurpTab = function(tabName) {
    document.querySelectorAll('.burp-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('.burp-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `burp-pane-${tabName}`);
    });
  };

  window.sendToBurpRepeater = function() {
    const rawReq = document.getElementById('burp-proxy-raw').value;
    const repeaterRaw = document.getElementById('burp-repeater-raw');
    if (repeaterRaw) {
      repeaterRaw.value = rawReq;
      showToast('تم إرسال الطلب بنجاح إلى Repeater!', 'success');
      window.switchBurpTab('repeater');
    }
  };

  window.burpForwardRequest = function() {
    const rawReq = document.getElementById('burp-proxy-raw').value;
    const responseBox = document.getElementById('burp-proxy-response');
    if (!responseBox) return;

    responseBox.innerText = "HTTP/1.1 200 OK\nContent-Type: application/json\nConnection: close\n\n{\"status\":\"success\", \"message\":\"Request forwarded to backend server.\"}";
    showToast('تم تمرير الطلب بنجاح!', 'success');
  };

  window.executeBurpRepeater = function() {
    const reqText = document.getElementById('burp-repeater-raw').value;
    const respBox = document.getElementById('burp-repeater-response');
    if (!respBox) return;

    let response = "HTTP/1.1 200 OK\nServer: HunterOS/Gunicorn\nConnection: close\n\n";

    if (reqText.includes("user_id=1") || reqText.includes("user_id=01")) {
      response += "{\n  \"status\": \"success\",\n  \"username\": \"admin\",\n  \"role\": \"administrator\",\n  \"flag\": \"hunteros{burp_repeater_idor_bypassed}\"\n}";
      addArenaXP(50, 'محاكاة استغلال ثغرة Repeater IDOR');
    } else if (reqText.includes("price=1") || reqText.includes("price=0") || reqText.includes("price=-")) {
      response += "{\n  \"status\": \"success\",\n  \"order_id\": 9851,\n  \"total_price\": \"$0.00\",\n  \"message\": \"Business Logic Exploit Active!\",\n  \"flag\": \"hunteros{burp_repeater_price_tampered}\"\n}";
      addArenaXP(50, 'محاكاة استغلال ثغرة Repeater Business Logic');
    } else {
      response += "{\n  \"status\": \"success\",\n  \"username\": \"guest_user\",\n  \"role\": \"guest\",\n  \"message\": \"Try changing parameter values (e.g. user_id=1 or price=1) to explore vulnerabilities.\"\n}";
    }

    respBox.innerText = response;
    showToast('تم استقبال استجابة الخادم!', 'success');
  };

  window.runBurpDecoder = function() {
    const input = document.getElementById('burp-decoder-input').value;
    const operation = document.getElementById('burp-decoder-op').value;
    const outputBox = document.getElementById('burp-decoder-output');
    if (!outputBox) return;

    let output = "";
    try {
      if (operation === 'base64_encode') {
        output = btoa(unescape(encodeURIComponent(input)));
      } else if (operation === 'base64_decode') {
        output = decodeURIComponent(escape(atob(input)));
      } else if (operation === 'url_encode') {
        output = encodeURIComponent(input);
      } else if (operation === 'url_decode') {
        output = decodeURIComponent(input);
      } else if (operation === 'hex_encode') {
        for (let i = 0; i < input.length; i++) {
          output += input.charCodeAt(i).toString(16).padStart(2, '0');
        }
      } else if (operation === 'hex_decode') {
        for (let i = 0; i < input.length; i += 2) {
          output += String.fromCharCode(parseInt(input.substr(i, 2), 16));
        }
      }
    } catch(e) {
      output = `Error during translation: ${e.message}`;
    }

    outputBox.value = output;
  };

  // Initialize nodes on load
  document.addEventListener('DOMContentLoaded', () => {
    loadRoadmapNodeStates();
  });
})();

