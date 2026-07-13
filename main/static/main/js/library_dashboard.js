// ABDO RAMDAN — Master Interactive Upgrades Global Engine
// Handles: Theme Swapping, Dynamic "Mark as Read" status, and Global Progress calculations.

(function() {
  const bookRoadmap = [
    { id: 'real_world_bug_hunting', title: 'Real-World Bug Hunting', duration: 15, badge: 'Real-World Bug Hunter' },
    { id: 'bug_bounty_bootcamp', title: 'Bug Bounty Bootcamp', duration: 20, badge: 'Bootcamp Graduate' },
    { id: 'web_hackers_handbook', title: 'Web Application Hacker\'s Handbook', duration: 80, badge: 'Web Hacker Master' },
    { id: 'bug_bounty_playbook', title: 'The Bug Bounty Playbook', duration: 25, badge: 'Playbook Graduate' },
    { id: 'rtfm', title: 'Red Team Field Manual (RTFM)', duration: 10, badge: 'Red Team Specialist' },
    { id: 'btfm', title: 'Blue Team Field Manual (BTFM)', duration: 10, badge: 'Blue Team Defender' },
    { id: 'hacking_art', title: 'Hacking: The Art of Exploitation', duration: 60, badge: 'Art of Exploitation Practitioner' },
    { id: 'black_hat_python', title: 'Black Hat Python', duration: 30, badge: 'Python DevSecOps Operator' },
    { id: 'malware_analysis', title: 'Practical Malware Analysis', duration: 80, badge: 'Malware Analyst' },
    { id: 'operator_handbook', title: 'Operator Handbook', duration: 35, badge: 'Cyber Operations Specialist' }
  ];
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
        
        // Sync checkbox if exists
        const checkbox = item.querySelector('.toc-item-checkbox');
        if (checkbox) {
          checkbox.checked = isRead;
        }

        // Remove existing legay badge
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
    
    if (typeof updateBookPageProgress === 'function') {
      updateBookPageProgress(bookId);
    }
  }

  function updateBookPageProgress(bookId) {
    const total = bookSectionMap[bookId];
    if (total === undefined) return;
    
    let read = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`read_${bookId}_`) && localStorage.getItem(key) === 'true') {
        read++;
      }
    }
    
    const percent = Math.min(Math.round((read / total) * 100), 100);
    
    const pctEl = document.getElementById('bookPageProgressPct');
    const fillEl = document.getElementById('bookPageProgressFill');
    const statusEl = document.getElementById('bookPageChaptersStatus');
    const remainingEl = document.getElementById('bookPageTimeRemaining');
    
    if (pctEl) pctEl.innerText = percent + '%';
    if (fillEl) fillEl.style.width = percent + '%';
    if (statusEl) statusEl.innerText = `الفصول المنجزة: ${read} / ${total}`;
    
    const bookObj = bookRoadmap.find(b => b.id === bookId);
    if (bookObj && remainingEl) {
      const totalDuration = bookObj.duration;
      const remainingHours = Math.round(totalDuration * (1 - (read / total)) * 10) / 10;
      if (remainingHours <= 0) {
        remainingEl.innerText = 'تم إكمال المرجع! 🏆';
      } else {
        remainingEl.innerText = `الوقت المتبقي: ${remainingHours} ساعة`;
      }
    }
    
    updateBookPageBadge(bookId, percent);
  }

  function updateBookPageBadge(bookId, percent) {
    const bookObj = bookRoadmap.find(b => b.id === bookId);
    if (!bookObj) return;
    
    const badgeId = `badge-achieved-${bookId}`;
    let badgeEl = document.getElementById(badgeId);
    
    if (percent === 100) {
      if (!badgeEl) {
        const metaInfo = document.querySelector('.book-meta-info');
        if (metaInfo) {
          badgeEl = document.createElement('div');
          badgeEl.id = badgeId;
          badgeEl.className = 'completed-badge-glowing';
          badgeEl.style.cssText = `
            margin-top: 15px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(0, 255, 102, 0.1);
            border: 1px solid var(--accent-green);
            color: var(--accent-green);
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 0.9rem;
            box-shadow: 0 0 15px rgba(0, 255, 102, 0.2);
            animation: badgePulse 2s infinite;
          `;
          badgeEl.innerHTML = `🎓 الشارة المحرزة: ${bookObj.badge}`;
          metaInfo.appendChild(badgeEl);
        }
      }
    } else {
      if (badgeEl) badgeEl.remove();
    }
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
      
      // Inject progress card
      const metaInfo = document.querySelector('.book-meta-info');
      if (metaInfo && !document.getElementById('bookPageProgressCard')) {
        const progressCard = document.createElement('div');
        progressCard.id = 'bookPageProgressCard';
        progressCard.style.cssText = 'margin-top: 15px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); padding: 15px; border-radius: 8px; max-width: 500px;';
        progressCard.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
            <span style="color:var(--text-secondary);">تقدم دراسة المرجع (Overall Progress):</span>
            <span id="bookPageProgressPct" style="font-weight:bold; color:var(--accent-cyan); font-family:monospace;">0%</span>
          </div>
          <div style="width:100%; height:8px; background:rgba(255,255,255,0.05); border-radius:4px; margin-top:8px; overflow:hidden;">
            <div id="bookPageProgressFill" style="width:0%; height:100%; background:linear-gradient(90deg, var(--accent-cyan), var(--accent-green)); transition: width 0.3s ease;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:0.7rem; color:var(--text-muted);">
            <span id="bookPageChaptersStatus">الفصول المنجزة: 0 / 0</span>
            <span id="bookPageTimeRemaining">المتبقي: --</span>
          </div>
        `;
        const bookStats = metaInfo.querySelector('.book-stats');
        if (bookStats) {
          bookStats.parentNode.insertBefore(progressCard, bookStats.nextSibling);
        } else {
          metaInfo.appendChild(progressCard);
        }
      }

      // Inject interactive checkboxes into TOC sidebar items
      const tocItems = document.querySelectorAll('.toc-item');
      tocItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
          const secId = href.substring(1);
          if (item.querySelector('.toc-item-checkbox')) return;
          
          item.style.display = 'flex';
          item.style.alignItems = 'center';
          item.style.justifyContent = 'space-between';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'toc-item-checkbox';
          checkbox.dataset.secId = secId;
          checkbox.style.cursor = 'pointer';
          checkbox.style.accentColor = 'var(--accent-cyan)';
          checkbox.style.marginLeft = '10px';
          
          checkbox.checked = localStorage.getItem(`read_${bookId}_${secId}`) === 'true';
          
          checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
          });
          
          checkbox.addEventListener('change', function() {
            const checked = checkbox.checked;
            localStorage.setItem(`read_${bookId}_${secId}`, checked ? 'true' : 'false');
            
            const section = document.getElementById(secId);
            if (section) {
              const btn = section.querySelector('.read-toggle-btn');
              if (btn) {
                btn.innerText = checked ? '✓ مقروء' : '○ تحديد كمقروء';
                btn.style.background = checked ? 'rgba(0,255,102,0.1)' : 'rgba(255,255,255,0.02)';
                btn.style.borderColor = checked ? 'var(--accent-green)' : 'rgba(255,255,255,0.08)';
                btn.style.color = checked ? 'var(--accent-green)' : 'var(--text-secondary)';
              }
              if (checked) {
                const titleEl = section.querySelector('h2, h3, .sub-sec-title');
                const titleText = titleEl ? titleEl.innerText.replace(/^[أ-يA-Z0-9\\.\\-\s]+[\\)\\-\.]\\s*/, '') : 'قسم غير معروف';
                localStorage.setItem(`last_read_title_${bookId}`, titleText);
              }
            }
            updateTOCReadBadges();
          });
          
          item.appendChild(checkbox);
        }
      });

      // Inject notes panel in sidebar
      const sidebar = document.querySelector('.book-sidebar');
      if (sidebar && !document.getElementById('bookPageNotesArea')) {
        const notesContainer = document.createElement('div');
        notesContainer.className = 'sidebar-notes-panel';
        notesContainer.style.cssText = 'margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px;';
        notesContainer.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="color:#fff; font-size:0.85rem; font-weight:700;">📝 ملاحظاتي (My Notes)</span>
            <span style="font-size:0.65rem; color:var(--accent-green);">AUTO-SAVED</span>
          </div>
          <textarea id="bookPageNotesArea" placeholder="اكتب ملاحظاتك، Payloads، أو الاستنتاجات هنا..." style="width:100%; height:120px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; font-family:var(--font-body); font-size:0.8rem; padding:10px; resize:vertical; outline:none; box-sizing:border-box; line-height:1.4;"></textarea>
        `;
        sidebar.appendChild(notesContainer);
        
        const textarea = document.getElementById('bookPageNotesArea');
        if (textarea) {
          textarea.value = localStorage.getItem(`notes_${bookId}`) || '';
          textarea.addEventListener('input', function() {
            localStorage.setItem(`notes_${bookId}`, textarea.value);
          });
        }
      }

      // Inject next book recommendation in sidebar
      if (sidebar && !document.getElementById('bookPageNextBookCard')) {
        const currentIndex = bookRoadmap.findIndex(b => b.id === bookId);
        if (currentIndex !== -1 && currentIndex < bookRoadmap.length - 1) {
          const nextBook = bookRoadmap[currentIndex + 1];
          const nextBookContainer = document.createElement('div');
          nextBookContainer.className = 'sidebar-next-book';
          nextBookContainer.style.cssText = 'margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px;';
          nextBookContainer.innerHTML = `
            <div style="color:var(--text-muted); font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px;">المسار التالي (Next Book)</div>
            <a href="${nextBook.id}.html" style="text-decoration:none; display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding:10px; border-radius:6px; transition: all 0.25s ease;" class="next-book-anchor">
              <div style="width: 30px; height: 40px; background: linear-gradient(135deg, #090918, #121230); border-radius: 3px; border: 1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:0.6rem; color:#fff; font-weight:bold;">📖</div>
              <div style="flex:1;">
                <div style="font-size:0.75rem; color:#fff; font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px;">${nextBook.title}</div>
                <div style="font-size:0.65rem; color:var(--text-muted);">${nextBook.duration} ساعة مخصصة</div>
              </div>
            </a>
          `;
          sidebar.appendChild(nextBookContainer);
        }
      }

      updateBookPageProgress(bookId);
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

  // ── 7. Related Labs per Book (injected into sidebar) ──────
  const bookRelatedLabs = {
    'real_world_bug_hunting': [
      { name: 'SQL Injection Lab', url: '../labs/sql-injection-lab.html', icon: '🧪' },
      { name: 'SSRF Lab', url: '../labs/ssrf-lab.html', icon: '🧪' },
      { name: 'IDOR Lab', url: '../labs/idor-lab.html', icon: '🧪' }
    ],
    'bug_bounty_bootcamp': [
      { name: 'SSRF Lab', url: '../labs/ssrf-lab.html', icon: '🧪' },
      { name: 'API Security Lab', url: '../labs/api-security-lab.html', icon: '🧪' },
      { name: 'JWT Lab', url: '../labs/jwt-lab.html', icon: '🧪' }
    ],
    'web_hackers_handbook': [
      { name: 'SQL Injection Lab', url: '../labs/sql-injection-lab.html', icon: '🧪' },
      { name: 'Command Injection Lab', url: '../labs/command-injection-lab.html', icon: '🧪' },
      { name: 'GraphQL Lab', url: '../labs/graphql-lab.html', icon: '🧪' }
    ],
    'bug_bounty_playbook': [
      { name: 'API Security Lab', url: '../labs/api-security-lab.html', icon: '🧪' },
      { name: 'Race Condition Lab', url: '../labs/race-condition-lab.html', icon: '🧪' },
      { name: 'IDOR Lab', url: '../labs/idor-lab.html', icon: '🧪' }
    ],
    'rtfm': [
      { name: 'Linux Security Lab', url: '../labs/linux-security-lab.html', icon: '🧪' },
      { name: 'Command Injection Lab', url: '../labs/command-injection-lab.html', icon: '🧪' }
    ],
    'btfm': [
      { name: 'Linux Security Lab', url: '../labs/linux-security-lab.html', icon: '🧪' },
      { name: 'API Security Lab', url: '../labs/api-security-lab.html', icon: '🧪' }
    ],
    'hacking_art': [
      { name: 'SQL Injection Lab', url: '../labs/sql-injection-lab.html', icon: '🧪' },
      { name: 'Command Injection Lab', url: '../labs/command-injection-lab.html', icon: '🧪' },
      { name: 'Linux Security Lab', url: '../labs/linux-security-lab.html', icon: '🧪' }
    ],
    'black_hat_python': [
      { name: 'Race Condition Lab', url: '../labs/race-condition-lab.html', icon: '🧪' },
      { name: 'AI Security Lab', url: '../labs/ai-security-lab.html', icon: '🧪' }
    ],
    'malware_analysis': [
      { name: 'Command Injection Lab', url: '../labs/command-injection-lab.html', icon: '🧪' },
      { name: 'Linux Security Lab', url: '../labs/linux-security-lab.html', icon: '🧪' }
    ],
    'operator_handbook': [
      { name: 'API Security Lab', url: '../labs/api-security-lab.html', icon: '🧪' },
      { name: 'JWT Lab', url: '../labs/jwt-lab.html', icon: '🧪' },
      { name: 'GraphQL Lab', url: '../labs/graphql-lab.html', icon: '🧪' }
    ]
  };

  function injectRelatedLabs(bookId, sidebar) {
    if (!sidebar || document.getElementById('bookPageRelatedLabs')) return;
    const labs = bookRelatedLabs[bookId];
    if (!labs || labs.length === 0) return;

    const container = document.createElement('div');
    container.id = 'bookPageRelatedLabs';
    container.style.cssText = 'margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px;';

    const labLinks = labs.map(lab => `
      <a href="${lab.url}" target="_blank" style="
        display: flex; align-items: center; gap: 8px;
        padding: 8px 10px; margin-bottom: 6px;
        background: rgba(0,229,255,0.03); border: 1px solid rgba(0,229,255,0.1);
        border-radius: 6px; text-decoration: none; transition: all 0.2s ease;
        color: var(--text-secondary); font-size: 0.8rem; font-weight: 600;
      " class="related-lab-link" onmouseover="this.style.background='rgba(0,229,255,0.08)';this.style.borderColor='var(--accent-cyan)';this.style.color='#fff'"
         onmouseout="this.style.background='rgba(0,229,255,0.03)';this.style.borderColor='rgba(0,229,255,0.1)';this.style.color='var(--text-secondary)'">
        <span style="font-size:1rem">${lab.icon}</span>
        <span>${lab.name}</span>
        <span style="margin-right:auto; font-size:0.65rem; color:var(--accent-cyan); font-family:monospace;">LAUNCH →</span>
      </a>`).join('');

    container.innerHTML = `
      <div style="color:var(--text-muted); font-size:0.7rem; font-weight:bold; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
        <span style="display:inline-block; width:8px; height:8px; background:var(--accent-cyan); border-radius:50%; animation:pulse 1.5s infinite;"></span>
        Labs مرتبطة بهذا الكتاب
      </div>
      ${labLinks}
    `;
    sidebar.appendChild(container);
  }

  // ── 8. Jump to Next Unread Section (Keyboard: N) ───────────
  function initNextUnreadShortcut(bookId) {
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key !== 'n' && e.key !== 'N') return;

      const sections = Array.from(document.querySelectorAll('.content-sec')).filter(sec => {
        return !sec.id.includes('quiz') && !sec.id.includes('tips') &&
               !sec.id.includes('flashcard') && !sec.id.includes('sandbox');
      });

      const nextUnread = sections.find(sec => {
        return localStorage.getItem(`read_${bookId}_${sec.id}`) !== 'true';
      });

      if (nextUnread) {
        nextUnread.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Flash highlight
        nextUnread.style.outline = '2px solid var(--accent-cyan)';
        nextUnread.style.outlineOffset = '8px';
        setTimeout(() => {
          nextUnread.style.outline = '';
          nextUnread.style.outlineOffset = '';
        }, 1500);
      }
    });
  }

  // ── 9. Enhanced Notes Panel with Char Count & Clear ────────
  function buildEnhancedNotesPanel(bookId, sidebar) {
    if (!sidebar || document.getElementById('bookPageNotesArea')) return;

    const notesContainer = document.createElement('div');
    notesContainer.className = 'sidebar-notes-panel';
    notesContainer.style.cssText = 'margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px;';

    const savedNotes = localStorage.getItem(`notes_${bookId}`) || '';

    notesContainer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="color:#fff; font-size:0.82rem; font-weight:700;">📝 ملاحظاتي</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span id="bookNotesCharCount" style="font-size:0.65rem; color:var(--text-muted); font-family:monospace;">${savedNotes.length} حرف</span>
          <span style="font-size:0.65rem; color:var(--accent-green); font-family:monospace;">AUTO-SAVED</span>
        </div>
      </div>
      <textarea id="bookPageNotesArea"
        placeholder="اكتب ملاحظاتك، Payloads، أو الاستنتاجات هنا..."
        style="width:100%; height:110px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:6px; color:#e2e8f0; font-family:var(--font-body); font-size:0.78rem; padding:10px; resize:vertical; outline:none; box-sizing:border-box; line-height:1.5; transition: border-color 0.2s ease;"
      ></textarea>
      <div style="display:flex; justify-content:flex-end; margin-top:6px;">
        <button id="clearBookNotes" style="background:none; border:1px solid rgba(255,80,80,0.2); color:rgba(255,80,80,0.6); font-size:0.7rem; padding:3px 8px; border-radius:4px; cursor:pointer; font-family:inherit; transition: all 0.2s ease;" 
          onmouseover="this.style.borderColor='rgba(255,80,80,0.6)';this.style.color='rgba(255,80,80,0.9)'" 
          onmouseout="this.style.borderColor='rgba(255,80,80,0.2)';this.style.color='rgba(255,80,80,0.6)'">
          🗑 مسح الملاحظات
        </button>
      </div>
    `;
    sidebar.appendChild(notesContainer);

    const textarea = document.getElementById('bookPageNotesArea');
    const charCount = document.getElementById('bookNotesCharCount');
    const clearBtn = document.getElementById('clearBookNotes');

    if (textarea) {
      textarea.value = savedNotes;
      textarea.addEventListener('input', function() {
        localStorage.setItem(`notes_${bookId}`, textarea.value);
        if (charCount) charCount.innerText = textarea.value.length + ' حرف';
      });
      textarea.addEventListener('focus', function() {
        textarea.style.borderColor = 'rgba(0,229,255,0.4)';
        textarea.style.boxShadow = '0 0 8px rgba(0,229,255,0.2)';
      });
      textarea.addEventListener('blur', function() {
        textarea.style.borderColor = 'rgba(255,255,255,0.08)';
        textarea.style.boxShadow = '';
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        if (confirm('مسح كل الملاحظات المحفوظة لهذا الكتاب؟')) {
          localStorage.removeItem(`notes_${bookId}`);
          if (textarea) textarea.value = '';
          if (charCount) charCount.innerText = '0 حرف';
        }
      });
    }
  }

  // ── 10. Dynamic Progress Color by Completion Level ─────────
  function applyProgressColor(percent, fillEl) {
    if (!fillEl) return;
    if (percent < 30) {
      fillEl.style.background = 'linear-gradient(90deg, #ff4444, #ff6600)';
    } else if (percent < 60) {
      fillEl.style.background = 'linear-gradient(90deg, #ffaa00, #ffdd00)';
    } else if (percent < 90) {
      fillEl.style.background = 'linear-gradient(90deg, #00aaff, #00e5ff)';
    } else {
      fillEl.style.background = 'linear-gradient(90deg, #00e5ff, #00ff66)';
    }
  }

  // ── Wire enhanced features into DOMContentLoaded ───────────
  document.addEventListener('DOMContentLoaded', function() {
    const pathParts = window.location.pathname.split('/');
    const bookId = pathParts[pathParts.length - 1].replace('.html', '');
    if (bookSectionMap[bookId] === undefined) return;

    const sidebar = document.querySelector('.book-sidebar');

    // Replace basic notes with enhanced version
    buildEnhancedNotesPanel(bookId, sidebar);

    // Inject related labs
    injectRelatedLabs(bookId, sidebar);

    // Keyboard shortcut for next unread
    initNextUnreadShortcut(bookId);

    // Apply dynamic color to progress fill after initial render
    setTimeout(() => {
      const fillEl = document.getElementById('bookPageProgressFill');
      const pctEl = document.getElementById('bookPageProgressPct');
      if (pctEl && fillEl) {
        const pct = parseInt(pctEl.innerText) || 0;
        applyProgressColor(pct, fillEl);
      }
    }, 300);

    // Patch updateBookPageProgress to also apply colors
    const _origUpdate = updateBookPageProgress;
    window._patchedUpdateProgress = function(bid) {
      if (typeof _origUpdate === 'function') _origUpdate(bid);
      const fillEl = document.getElementById('bookPageProgressFill');
      const pctEl = document.getElementById('bookPageProgressPct');
      if (pctEl && fillEl) {
        const pct = parseInt(pctEl.innerText) || 0;
        applyProgressColor(pct, fillEl);
      }
    };
  });

})();

