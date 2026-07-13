// ABDO RAMDAN — Master Interactive Upgrades Global Engine
// Handles: Theme Swapping, Dynamic "Mark as Read" status, and Global Progress calculations.

(function() {
  // ── 1. Theme Swapper Engine ────────────────────────────────
  function initTheme() {
    const savedTheme = localStorage.getItem('hacker_theme') || 'theme-cyan';
    document.body.classList.remove('theme-green', 'theme-cyan', 'theme-red', 'theme-purple');
    document.body.classList.add(savedTheme);
    
    // Update theme selector dropdown if exists
    const selector = document.getElementById('theme-select');
    if (selector) {
      selector.value = savedTheme;
    }
  }

  window.setHackerTheme = function(themeName) {
    localStorage.setItem('hacker_theme', themeName);
    document.body.classList.remove('theme-green', 'theme-cyan', 'theme-red', 'theme-purple');
    document.body.classList.add(themeName);
    
    // Broadcast message or update local frame
    const iframe = document.getElementById('sandbox-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'theme-change', theme: themeName }, '*');
    }
  };

  // Run theme initialization immediately to prevent layout flash
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // ── 2. Dynamic Section Reading Status ───────────────────────
  const bookSectionMap = {
    'bug_bounty_playbook': 21,
    'web_hackers_handbook': 9,
    'bug_bounty_bootcamp': 11,
    'real_world_bug_hunting': 9,
    'rtfm': 5,
    'btfm': 5,
    'hacking_art': 5,
    'malware_analysis': 5,
    'black_hat_python': 5,
    'operator_handbook': 5
  };

  function updateTOCReadBadges() {
    const pathParts = window.location.pathname.split('/');
    const bookId = pathParts[pathParts.length - 1].replace('.html', '');
    const tocItems = document.querySelectorAll('.toc-item');
    
    tocItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const secId = href.substring(1);
        const isRead = localStorage.getItem(`read_${bookId}_${secId}`) === 'true';
        
        // Remove existing badge
        const existingBadge = item.querySelector('.read-badge');
        if (existingBadge) existingBadge.remove();

        if (isRead) {
          const badge = document.createElement('span');
          badge.className = 'read-badge';
          badge.innerText = ' ✓';
          badge.style.color = 'var(--accent-green)';
          badge.style.fontSize = '0.75rem';
          badge.style.fontWeight = 'bold';
          item.appendChild(badge);
        }
      }
    });
  }

  function calculateGlobalProgress() {
    let readCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('read_') && localStorage.getItem(key) === 'true') {
        readCount++;
      }
    }
    
    let totalSections = 0;
    Object.values(bookSectionMap).forEach(val => totalSections += val);
    
    const progressPercent = Math.min(Math.round((readCount / totalSections) * 100), 100);
    return { readCount, totalSections, progressPercent };
  }

  window.updateDashboardUI = function() {
    const progressText = document.getElementById('global-progress-text');
    const progressCircle = document.getElementById('global-progress-circle');
    const completedCountText = document.getElementById('global-completed-count');
    const badgeText = document.getElementById('global-badge-text');

    const stats = calculateGlobalProgress();

    if (progressText) {
      progressText.innerText = stats.progressPercent + '%';
    }

    if (progressCircle) {
      const radius = progressCircle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (stats.progressPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    if (completedCountText) {
      completedCountText.innerText = `${stats.readCount} من أصل ${stats.totalSections} قسماً`;
    }

    if (badgeText) {
      let badge = 'مبتدئ سيبراني (Noob)';
      if (stats.progressPercent >= 80) badge = 'خبير استطلاع سيبراني (Elite)';
      else if (stats.progressPercent >= 50) badge = 'صائد ثغرات متقدم (Pro Hunter)';
      else if (stats.progressPercent >= 20) badge = 'مخترق تحت التدريب (Script Kiddie)';
      badgeText.innerText = badge;
    }

    // ── Academy Stats Dashboard & Individual Progress ──────────
    const bookDurations = {
      'real_world_bug_hunting': 15,
      'bug_bounty_bootcamp': 20,
      'web_hackers_handbook': 50,
      'bug_bounty_playbook': 25,
      'rtfm': 10,
      'btfm': 10,
      'hacking_art': 60,
      'malware_analysis': 80,
      'black_hat_python': 30,
      'operator_handbook': 35
    };

    let readingCount = 0;
    let completedCount = 0;
    let totalChaptersRead = 0;
    let remainingTime = 0;

    document.querySelectorAll('.roadmap-book-card').forEach(card => {
      const bookId = card.getAttribute('data-book-id');
      if (!bookId || bookSectionMap[bookId] === undefined) return;

      const total = bookSectionMap[bookId];
      let read = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`read_${bookId}_`) && localStorage.getItem(key) === 'true') {
          read++;
        }
      }

      totalChaptersRead += read;
      const percent = Math.min(Math.round((read / total) * 100), 100);
      
      if (read > 0 && read < total) {
        readingCount++;
      } else if (read === total) {
        completedCount++;
      }

      if (read < total) {
        remainingTime += bookDurations[bookId] || 0;
      }

      const fill = card.querySelector('.roadmap-card-progress-fill');
      const text = card.querySelector('.roadmap-card-progress-percent');
      const lastReadText = card.querySelector('.roadmap-card-last-read');

      if (fill) fill.style.width = `${percent}%`;
      if (text) text.innerText = `${percent}%`;
      
      const lastReadTitle = localStorage.getItem(`last_read_title_${bookId}`) || 'لم يبدأ بعد';
      if (lastReadText) lastReadText.innerText = lastReadTitle;

      // Update card title text for chapters count
      const chapterStatusEl = card.querySelector('.roadmap-card-chapter-status');
      if (chapterStatusEl) {
        chapterStatusEl.innerText = `الفصول: ${read} / ${total}`;
      }

      // Update action button states
      const ctaBtn = card.querySelector('.btn-cta-main');
      if (ctaBtn) {
        if (percent === 100) {
          ctaBtn.innerText = '✓ مكتمل';
          ctaBtn.style.background = 'rgba(0, 255, 102, 0.15)';
          ctaBtn.style.color = 'var(--accent-green)';
          ctaBtn.style.border = '1px solid var(--accent-green)';
        } else if (percent > 0) {
          ctaBtn.innerText = 'استمر بالقراءة';
        } else {
          ctaBtn.innerText = 'ابدأ الآن';
        }
      }
    });

    // Update Academy Stat Dashboard elements
    const statReading = document.getElementById('academy-stat-reading-count');
    const statCompleted = document.getElementById('academy-stat-completed-count');
    const statRemaining = document.getElementById('academy-stat-remaining-time');
    const statXp = document.getElementById('academy-stat-xp');

    if (statReading) statReading.innerText = readingCount;
    if (statCompleted) statCompleted.innerText = completedCount;
    if (statRemaining) statRemaining.innerText = remainingTime + ' ساعة';
    
    // XP: 1000 XP per completed book, 50 XP per completed chapter
    const computedXp = (completedCount * 1000) + (totalChaptersRead * 50);
    if (statXp) statXp.innerText = computedXp;
  };

  // ── Book Filter Logic & Live Counters ──────────────────────
  function initBookFilters() {
    const filterBtns = document.querySelectorAll('.book-filter-btn');
    if (filterBtns.length === 0) return;

    // Calculate counters dynamically
    const cards = document.querySelectorAll('.roadmap-book-card');
    const countMap = { all: cards.length, beginner: 0, intermediate: 0, advanced: 0, expert: 0 };
    cards.forEach(card => {
      const level = card.getAttribute('data-level');
      if (countMap[level] !== undefined) {
        countMap[level]++;
      }
    });

    // Inject counters into buttons
    filterBtns.forEach(btn => {
      const filterVal = btn.getAttribute('data-filter');
      const count = countMap[filterVal] || 0;
      
      // Keep Arabic labels and add counter
      let label = 'الكل';
      if (filterVal === 'beginner') label = '🟢 مبتدئ (Beginner)';
      else if (filterVal === 'intermediate') label = '🟡 متوسط (Intermediate)';
      else if (filterVal === 'advanced') label = '🔴 متقدم (Advanced)';
      else if (filterVal === 'expert') label = '🏆 خبير (Expert)';
      else label = 'الكل (All)';
      
      btn.innerText = `${label} (${count})`;

      btn.addEventListener('click', function() {
        // Toggle active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          const level = card.getAttribute('data-level');
          if (filterVal === 'all' || level === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 2.5 detailed modal triggers ────────────────────────────
  window.openBookModal = function(bookId) {
    const overlay = document.getElementById(`modal-${bookId}`);
    if (overlay) {
      overlay.style.display = 'flex';
      // Trigger browser redraw for animation transition
      overlay.offsetHeight;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Load progress into modal
      const total = bookSectionMap[bookId];
      let read = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`read_${bookId}_`) && localStorage.getItem(key) === 'true') {
          read++;
        }
      }
      const percent = Math.min(Math.round((read / total) * 100), 100);
      const fill = overlay.querySelector('.roadmap-card-progress-fill');
      const text = overlay.querySelector('.roadmap-card-progress-percent');
      const lastReadText = overlay.querySelector('.roadmap-card-last-read');
      const chapterStatusEl = overlay.querySelector('.roadmap-card-chapter-status');

      if (fill) fill.style.width = `${percent}%`;
      if (text) text.innerText = `${percent}%`;
      if (chapterStatusEl) chapterStatusEl.innerText = `الفصول: ${read} / ${total}`;
      
      const lastReadTitle = localStorage.getItem(`last_read_title_${bookId}`) || 'لم يبدأ بعد';
      if (lastReadText) lastReadText.innerText = lastReadTitle;
    }
  };

  window.closeBookModal = function(bookId) {
    const overlay = document.getElementById(`modal-${bookId}`);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  };

  // Close modals on clicking overlay background
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('book-modal-overlay')) {
      const bookId = e.target.id.replace('modal-', '');
      closeBookModal(bookId);
    }
  });

  // Inject section footer buttons dynamically in book template views
  document.addEventListener("DOMContentLoaded", function() {
    initTheme();

    const pathParts = window.location.pathname.split('/');
    const bookId = pathParts[pathParts.length - 1].replace('.html', '');
    
    // Only inject inside book templates
    if (bookSectionMap[bookId] !== undefined) {
      const sections = document.querySelectorAll('.content-sec');

      sections.forEach(sec => {
        // Exclude quiz, tips, and flashcard sections from reading list
        if (sec.id.includes('quiz') || sec.id.includes('tips') || sec.id.includes('flashcard') || sec.id.includes('sandbox')) return;

        const btnContainer = document.createElement('div');
        btnContainer.className = 'read-status-container';
        btnContainer.style.cssText = 'display:flex; justify-content:flex-end; margin-top:25px; border-top:1px dashed rgba(255,255,255,0.08); padding-top:15px;';

        const isRead = localStorage.getItem(`read_${bookId}_${sec.id}`) === 'true';

        const btn = document.createElement('button');
        btn.className = 'read-toggle-btn';
        btn.style.cssText = `
          background: ${isRead ? 'rgba(0,255,102,0.1)' : 'rgba(255,255,255,0.02)'};
          border: 1px solid ${isRead ? 'var(--accent-green)' : 'rgba(255,255,255,0.08)'};
          color: ${isRead ? 'var(--accent-green)' : 'var(--text-secondary)'};
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 0.78rem;
          cursor: pointer;
          font-family: var(--font-body);
          font-weight: 700;
          transition: all 0.3s ease;
        `;
        btn.innerText = isRead ? '✓ مقروء' : '○ تحديد كمقروء';

        btn.addEventListener('click', function() {
          const currentlyRead = localStorage.getItem(`read_${bookId}_${sec.id}`) === 'true';
          if (currentlyRead) {
            localStorage.setItem(`read_${bookId}_${sec.id}`, 'false');
            btn.innerText = '○ تحديد كمقروء';
            btn.style.background = 'rgba(255,255,255,0.02)';
            btn.style.borderColor = 'rgba(255,255,255,0.08)';
            btn.style.color = 'var(--text-secondary)';
          } else {
            localStorage.setItem(`read_${bookId}_${sec.id}`, 'true');
            btn.innerText = '✓ مقروء';
            btn.style.background = 'rgba(0,255,102,0.1)';
            btn.style.borderColor = 'var(--accent-green)';
            btn.style.color = 'var(--accent-green)';

            // Save last read section title
            const titleEl = sec.querySelector('h2, h3, .sub-sec-title');
            const titleText = titleEl ? titleEl.innerText.replace(/^[أ-يA-Z0-9\.\-\s]+[\)\-\.]\s*/, '') : 'قسم غير معروف';
            localStorage.setItem(`last_read_title_${bookId}`, titleText);
          }
          updateTOCReadBadges();
        });

        btnContainer.appendChild(btn);
        sec.appendChild(btnContainer);
      });

      updateTOCReadBadges();
    } else {
      // We are in home.html (the dashboard view)
      updateDashboardUI();
      initBookFilters();
    }
  });

  // ── 3. Interactive Sandbox & Flashcards Global Handlers ────
  window.toggleFlashcard = function(card) {
    card.classList.toggle('flipped');
  };

  window.updateSandboxPayloads = function(bookId) {
    const type = document.getElementById(`sandbox-type-${bookId}`).value;
    const payloadInput = document.getElementById(`sandbox-payload-${bookId}`);
    if (type === 'sqli') {
      payloadInput.value = "' OR '1'='1";
    } else if (type === 'xss') {
      payloadInput.value = "<script>alert('XSS_POC')</script>";
    } else if (type === 'ssrf') {
      payloadInput.value = "http://169.254.169.254/latest/meta-data/";
    }
  };

  window.runSandboxExploit = function(bookId) {
    const type = document.getElementById(`sandbox-type-${bookId}`).value;
    const payload = document.getElementById(`sandbox-payload-${bookId}`).value;
    const terminal = document.getElementById(`sandbox-terminal-${bookId}`);
    const browserWrap = document.getElementById(`sandbox-browser-wrap-${bookId}`);
    const browserContent = document.getElementById(`sandbox-browser-content-${bookId}`);

    terminal.innerHTML = `[+] Initiating connection to mock server...\n[+] Sending payload: ${payload.replace(/</g, '&lt;').replace(/>/g, '&gt;')}\n[+] Processing request parameters...\n`;
    browserWrap.style.display = 'none';

    setTimeout(() => {
      if (type === 'sqli') {
        terminal.innerHTML += `[+] Database Engine: MySQL / PostgreSQL detected\n[+] Checking syntax validation...\n[+] SQL query modified dynamically!\n[+] Query Result: SQL bypass successful!\n[+] Dumping table users:\n----------------------------------------\n| id | username | password_hash         |\n----------------------------------------\n| 1  | admin    | \$2y\$12\$Y7z0d... (P1) |\n| 2  | db_user  | \$2y\$12\$XwR9...       |\n----------------------------------------`;
      } else if (type === 'xss') {
        terminal.innerHTML += `[+] Rendering response HTML page...\n[+] Payload successfully reflected in DOM!\n[+] Browser security warning bypassed\n[+] Triggering JavaScript alert event context...`;
        browserWrap.style.display = 'block';
        browserContent.innerHTML = `<div style="padding:10px; border:1px solid #ff0055; background:rgba(255,0,85,0.05); color:#ff0055; font-weight:bold; border-radius:4px; display:inline-block; font-family:sans-serif;">
          ⚠️ Pop-up Alert: XSS_POC
        </div>`;
      } else if (type === 'ssrf') {
        terminal.innerHTML += `[+] Outbound network connection initiated...\n[+] Bypassing local filter validation...\n[+] Resolving target: 169.254.169.254\n[+] Meta-data service responded!\n[+] Internal AWS keys retrieved:\n----------------------------------------\nAccessKeyId: ASIAIOSFODNN7EXAMPLE\nSecretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\nToken: FwoGZXIvYXdzE... (Critical P1)`;
      }
      
      // Reset scroll of sandbox terminal
      terminal.scrollLeft = 0;
    }, 1000);
  };

  // ── 4. Fix RTL Horizontal Scrollbar Bug ───────────────────
  function resetCodeScrolls() {
    document.querySelectorAll('.code-box').forEach(box => {
      box.scrollLeft = 0;
    });
    document.querySelectorAll('.code-box pre').forEach(pre => {
      pre.scrollLeft = 0;
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    resetCodeScrolls();
    // Re-run after a small delay to override browser layout defaults
    setTimeout(resetCodeScrolls, 100);
    setTimeout(resetCodeScrolls, 500);
  });

  window.addEventListener("load", resetCodeScrolls);

  // Hook into tab changes to reset scroll when showing sections
  const tocItems = document.querySelectorAll('.toc-item');
  tocItems.forEach(item => {
    item.addEventListener('click', () => {
      setTimeout(resetCodeScrolls, 50);
    });
  });

  // ── 5. Dynamic Mobile Hamburger Menu Drawer ───────────────
  function initMobileDrawer() {
    const pathParts = window.location.pathname.split('/');
    const bookId = pathParts[pathParts.length - 1].replace('.html', '');
    
    // Only initialize inside book templates
    if (bookSectionMap[bookId] === undefined) return;
    if (document.getElementById('mobile-nav-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'mobile-nav-toggle';
    btn.innerHTML = '☰';
    btn.style.cssText = `
      display: none;
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9999;
      background: var(--gradient-primary);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
    `;

    btn.addEventListener('click', function() {
      const sidebar = document.querySelector('.book-sidebar');
      if (!sidebar) return;
      if (sidebar.style.left === '0px') {
        sidebar.style.left = '-300px';
        btn.innerHTML = '☰';
      } else {
        sidebar.style.left = '0px';
        btn.innerHTML = '✕';
      }
    });

    document.body.appendChild(btn);

    // Auto-close sidebar on menu link click on mobile
    document.querySelectorAll('.toc-item').forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 1000) {
          const sidebar = document.querySelector('.book-sidebar');
          if (sidebar) sidebar.style.left = '-300px';
          btn.innerHTML = '☰';
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    initMobileDrawer();
    initReadingMode();
  });

  // ── 6. Distraction-Free Reading Mode Engine ───────────────
  window.toggleReadingMode = function() {
    const active = document.body.classList.toggle('reading-mode-active');
    localStorage.setItem('reading_mode_enabled', active ? 'true' : 'false');
    
    const btns = document.querySelectorAll('.reading-mode-btn');
    btns.forEach(btn => {
      btn.innerHTML = active ? '✕ العودة للوضع العادي' : '📖 وضع القراءة';
    });
  };

  function initReadingMode() {
    const pathParts = window.location.pathname.split('/');
    const bookId = pathParts[pathParts.length - 1].replace('.html', '');
    if (bookSectionMap[bookId] === undefined) return;

    const contentArea = document.querySelector('.book-content');
    if (!contentArea) return;

    const header = document.createElement('div');
    header.className = 'reading-mode-header';
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:25px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06);';

    const label = document.createElement('span');
    label.style.cssText = 'font-size:0.8rem; color:var(--text-secondary); font-weight:700;';
    label.innerHTML = '📚 وضع القراءة الميسر للثغرات والأكواد';

    const isEnabled = localStorage.getItem('reading_mode_enabled') === 'true';

    const btn = document.createElement('button');
    btn.className = 'reading-mode-btn';
    btn.innerHTML = isEnabled ? '✕ العودة للوضع العادي' : '📖 وضع القراءة';
    btn.style.cssText = `
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--accent-cyan);
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 0.78rem;
      cursor: pointer;
      font-family: var(--font-body);
      font-weight: 700;
      transition: all 0.3s ease;
    `;

    btn.addEventListener('click', toggleReadingMode);

    header.appendChild(label);
    header.appendChild(btn);

    contentArea.insertBefore(header, contentArea.firstChild);

    if (isEnabled) {
      document.body.classList.add('reading-mode-active');
    }
  }

})();
