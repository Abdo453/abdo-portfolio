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

  // Initialize nodes on load
  document.addEventListener('DOMContentLoaded', () => {
    loadRoadmapNodeStates();
  });
})();
