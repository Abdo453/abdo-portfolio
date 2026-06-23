/* ============================
   FEATURES JS (Dark Mode, Progress, Search)
   ============================ */

document.addEventListener('linuxDataReady', () => {
    initTheme();
    injectFeaturesUI();
    initSearch();
    initKeyboardShortcuts();
    initScrollToTop();
    updateProgressBar();
    
    // Listen for lesson loading in academy.js
    const originalRender = window.renderLesson;
    if (typeof originalRender === 'function') {
        window.renderLesson = function(lessonId) {
            // Trigger fade animation by re-rendering content
            const article = document.getElementById('articleBody');
            if (article) {
                article.style.animation = 'none';
                article.offsetHeight; // force reflow
                article.style.animation = '';
            }

            originalRender(lessonId);
            if (typeof appendEnrichment === 'function') appendEnrichment(lessonId);
            appendCompletionButton(lessonId);
            appendLessonNavArrows(lessonId);
            updateSidebarIcons();

            // Scroll content to top on lesson switch
            const panel = document.getElementById('contentPanel');
            if (panel) panel.scrollTo({ top: 0, behavior: 'smooth' });
        };
        // Initial call
        setTimeout(() => updateSidebarIcons(), 500);
    }
});

/* --- Theme Management --- */
function initTheme() {
    const savedTheme = localStorage.getItem('linux_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('linux_theme', next);
}

/* --- UI Injection --- */
function injectFeaturesUI() {
    // Inject Progress Bar
    const pbContainer = document.createElement('div');
    pbContainer.className = 'progress-container';
    pbContainer.innerHTML = `<div class="progress-bar" id="topProgressBar"></div><div class="progress-text" id="topProgressText">0%</div>`;
    document.body.prepend(pbContainer);

    // Inject Search Modal
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.id = 'searchModal';
    modal.innerHTML = `
        <div class="search-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="color:#8b949e; font-size:0.85rem;"><span class="kbd-hint">Ctrl+K</span> لفتح البحث</span>
                <span style="color:#8b949e; font-size:0.85rem;"><span class="kbd-hint">Esc</span> للإغلاق</span>
            </div>
            <input type="text" id="searchInput" class="search-input" placeholder="ابحث عن درس، مصطلح، أو بروتوكول...">
            <div class="search-results" id="searchResults"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Inject Buttons in Navbar
    const navButtons = document.querySelector('.nav-buttons') || document.querySelector('.navbar');
    if (navButtons) {
        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'nav-icons';
        iconsDiv.innerHTML = `
            <button class="icon-btn" onclick="document.getElementById('searchModal').classList.add('active'); document.getElementById('searchInput').focus();" title="بحث">🔍</button>
            <button class="icon-btn" onclick="toggleTheme()" title="تغيير المظهر">🌓</button>
        `;
        // Insert before the links if in .nav-buttons
        navButtons.prepend(iconsDiv);
    }
}

/* --- Search Functionality --- */
function initSearch() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    
    if (!input || typeof academyData === 'undefined') return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        results.innerHTML = '';
        if (query.length < 2) return;

        let matches = [];
        academyData.forEach(chapter => {
            chapter.lessons.forEach(lesson => {
                if (lesson.title.toLowerCase().includes(query) || lesson.content.toLowerCase().includes(query)) {
                    matches.push({ chapter: chapter.chapter, id: lesson.id, title: lesson.title });
                }
            });
        });

        if (matches.length === 0) {
            results.innerHTML = '<div style="padding: 10px; color: var(--danger);">لا توجد نتائج.</div>';
            return;
        }

        matches.forEach(m => {
            const a = document.createElement('a');
            a.className = 'search-item';
            a.href = `academy.html?lesson=${m.id}`; // Optional: handle directly if already on academy
            a.innerHTML = `<div class="search-item-chapter">${m.chapter}</div><div>${m.title}</div>`;
            a.onclick = (ev) => {
                if (window.location.pathname.includes('academy.html')) {
                    ev.preventDefault();
                    window.renderLesson(m.id);
                    document.getElementById('searchModal').classList.remove('active');
                }
            };
            results.appendChild(a);
        });
    });
}

/* --- Progress Tracking (Granular) --- */
function appendCompletionButton(lessonId) {
    const articleBody = document.getElementById('articleBody');
    if (!articleBody) return;

    // Remove old button if exists
    const oldBtn = document.getElementById('granularProgressContainer');
    if (oldBtn) oldBtn.remove();

    if (typeof getLessonProgress !== 'function') return; // Progress script not loaded

    const p = getLessonProgress(lessonId);

    const container = document.createElement('div');
    container.id = 'granularProgressContainer';
    container.style.marginTop = '40px';
    container.style.padding = '20px';
    container.style.background = 'var(--panel-bg)';
    container.style.border = '1px solid var(--border)';
    container.style.borderRadius = '8px';

    container.innerHTML = `
        <h3 style="color: var(--accent); margin-bottom: 15px;">نسبة إنجازك في هذا الدرس:</h3>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <label style="cursor: pointer; font-size: 1.1rem; color: ${p.theory ? 'var(--success)' : '#c9d1d9'};">
                <input type="checkbox" ${p.theory ? 'checked' : ''} onchange="toggleLessonMetric('${lessonId}', 'theory')"> النظري 📖
            </label>
            <label style="cursor: pointer; font-size: 1.1rem; color: ${p.quiz ? 'var(--success)' : '#c9d1d9'};">
                <input type="checkbox" ${p.quiz ? 'checked' : ''} onchange="toggleLessonMetric('${lessonId}', 'quiz')"> الاختبار ❓
            </label>
            <label style="cursor: pointer; font-size: 1.1rem; color: ${p.lab ? 'var(--success)' : '#c9d1d9'};">
                <input type="checkbox" ${p.lab ? 'checked' : ''} onchange="toggleLessonMetric('${lessonId}', 'lab')"> اللاب العملي 💻
            </label>
            <label style="cursor: pointer; font-size: 1.1rem; color: ${p.interview ? 'var(--success)' : '#c9d1d9'};">
                <input type="checkbox" ${p.interview ? 'checked' : ''} onchange="toggleLessonMetric('${lessonId}', 'interview')"> المقابلة 💼
            </label>
        </div>
    `;

    articleBody.appendChild(container);
}

function updateProgressBar() {
    if (typeof academyData === 'undefined' || typeof getLessonProgress !== 'function') return;
    
    let totalMetrics = 0;
    let completedMetrics = 0;

    academyData.forEach(ch => {
        ch.lessons.forEach(l => {
            totalMetrics += 4; // theory, quiz, lab, interview
            const p = getLessonProgress(l.id);
            if (p.theory) completedMetrics++;
            if (p.quiz) completedMetrics++;
            if (p.lab) completedMetrics++;
            if (p.interview) completedMetrics++;
        });
    });
    
    const percentage = totalMetrics === 0 ? 0 : Math.round((completedMetrics / totalMetrics) * 100);
    
    const bar = document.getElementById('topProgressBar');
    const txt = document.getElementById('topProgressText');
    if (bar) bar.style.width = percentage + '%';
    if (txt) txt.innerText = percentage + '% Linux Progress';
}

function updateSidebarIcons() {
    if (typeof getLessonProgress !== 'function') return;

    document.querySelectorAll('.lesson-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        const matchResult = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;
        const id = matchResult ? matchResult[1] : null;
        if (id) {
            const p = getLessonProgress(id);
            const isFullyCompleted = p.theory && p.quiz && p.lab && p.interview;
            const isPartiallyCompleted = p.theory || p.quiz || p.lab || p.interview;

            const oldIcon = btn.querySelector('.lesson-status-icon');
            if (oldIcon) oldIcon.remove();

            const iconSpan = document.createElement('span');
            iconSpan.className = 'lesson-status-icon';
            
            if (isFullyCompleted) {
                iconSpan.innerText = '☑ ';
                iconSpan.style.color = 'var(--success)';
            } else if (isPartiallyCompleted) {
                iconSpan.innerText = '◐ ';
                iconSpan.style.color = '#ffb020';
            } else {
                iconSpan.innerText = '☐ ';
                iconSpan.style.color = 'var(--text-main)';
            }
            btn.prepend(iconSpan);
        }
    });
}

/* --- Content Enrichment (Phase 2 & 3) --- */
function appendEnrichment(lessonId) {
    const articleBody = document.getElementById('articleBody');
    if (!articleBody || typeof quizzesData === 'undefined') return;

    const data = quizzesData[lessonId];
    if (!data) return; // No quizzes data for this lesson yet

    // Remove old enrichment if exists
    const oldEnr = document.getElementById('enrichmentSection');
    if (oldEnr) oldEnr.remove();

    const enrichmentDiv = document.createElement('div');
    enrichmentDiv.id = 'enrichmentSection';
    enrichmentDiv.className = 'enrichment-section';
    
    // Build tabs based on available quiz levels
    let tabsHtml = '';
    let contentHtml = '';
    const levels = ['easy', 'medium', 'hard', 'scenario'];
    const levelNames = {'easy': '🟢 سهل', 'medium': '🟡 متوسط', 'hard': '🔴 صعب', 'scenario': '🕵️ سيناريو عملي'};
    let first = true;

    levels.forEach(level => {
        if (data[level] && data[level].length > 0) {
            tabsHtml += `<button class="enrichment-tab ${first ? 'active' : ''}" onclick="switchEnrichmentTab(this, 'quiz-${lessonId}-${level}')">${levelNames[level]}</button>`;
            
            contentHtml += `
                <div id="quiz-${lessonId}-${level}" class="enrichment-content ${first ? 'active' : ''}">
                    <h4>${levelNames[level]}:</h4>
                    ${data[level].map((q, idx) => `
                        <div class="quiz-question" id="quiz-${lessonId}-${level}-q${idx}">
                            <p style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem;">س${idx + 1}: ${q.q}</p>
                            <div class="quiz-options">
                                ${q.options.map((opt, optIdx) => `
                                    <label class="quiz-option" style="display: block; margin-bottom: 8px; cursor: pointer; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                                        <input type="radio" name="quiz-${lessonId}-${level}-q${idx}" value="${optIdx}">
                                        <span>${opt}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <button class="quiz-check-btn" onclick="checkNewQuizAnswer('${lessonId}', '${level}', ${idx}, ${q.correct}, this)" style="margin-top: 10px; padding: 8px 15px; background: var(--accent); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">تحقق من الإجابة</button>
                            <div class="quiz-feedback" id="feedback-${lessonId}-${level}-q${idx}" style="margin-top: 10px; font-weight: bold; display: none; padding: 10px; border-radius: 5px;"></div>
                        </div>
                    `).join('<hr style="border-color: var(--border); margin: 25px 0;">')}
                </div>
            `;
            first = false;
        }
    });

    enrichmentDiv.innerHTML = `
        <h2 style="margin-top: 40px; border-bottom: 2px solid var(--border); padding-bottom: 10px;">🧠 اختبر فهمك للدرس</h2>
        <div class="enrichment-tabs">
            ${tabsHtml}
        </div>
        ${contentHtml}
    `;

    // Append it before the granular progress container if it exists
    const markBtn = document.getElementById('granularProgressContainer');
    if (markBtn) {
        articleBody.insertBefore(enrichmentDiv, markBtn);
    } else {
        articleBody.appendChild(enrichmentDiv);
    }
}

window.switchEnrichmentTab = function(btn, targetId) {
    const section = btn.closest('.enrichment-section');
    section.querySelectorAll('.enrichment-tab').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.enrichment-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(targetId).classList.add('active');
};

window.checkNewQuizAnswer = function(lessonId, level, qIdx, correctIdx, btn) {
    const selected = document.querySelector(`input[name="quiz-${lessonId}-${level}-q${qIdx}"]:checked`);
    const feedback = document.getElementById(`feedback-${lessonId}-${level}-q${qIdx}`);
    feedback.style.display = 'block';
    
    if (!selected) {
        feedback.innerHTML = '<span style="color:var(--warning)">الرجاء اختيار إجابة أولاً.</span>';
        return;
    }
    
    if (parseInt(selected.value) === correctIdx) {
        feedback.innerHTML = '<span style="color:var(--success)">✅ إجابة صحيحة، ممتاز!</span>';
        btn.style.display = 'none'; // Hide button on success

        // Auto-track quiz progress
        if (typeof updateLessonProgress === 'function') {
            updateLessonProgress(lessonId, 'quiz', true);
        }

        // Check if all quiz questions in this level are answered
        checkAllQuizzesAnswered(lessonId, level);
    } else {
        feedback.innerHTML = '<span style="color:var(--danger)">❌ إجابة خاطئة، حاول مرة أخرى.</span>';
    }
};

/* --- Check if all quizzes in a level are answered --- */
function checkAllQuizzesAnswered(lessonId, level) {
    const allBtns = document.querySelectorAll(`#quiz-${lessonId}-${level} .quiz-check-btn`);
    const allHidden = Array.from(allBtns).every(b => b.style.display === 'none');
    if (allHidden && allBtns.length > 0) {
        // All questions answered - show completion message
        const section = document.getElementById(`quiz-${lessonId}-${level}`);
        if (section && !section.querySelector('.quiz-complete-msg')) {
            const msg = document.createElement('div');
            msg.className = 'quiz-complete-msg';
            msg.style.cssText = 'text-align:center; padding:15px; margin-top:15px; background:rgba(63,185,80,0.1); border:1px solid var(--success); border-radius:8px; color:var(--success); font-weight:bold;';
            msg.innerHTML = '🎉 أجبت على جميع الأسئلة بنجاح!';
            section.appendChild(msg);
        }
    }
}

/* --- Keyboard Shortcuts --- */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+K or Cmd+K — Open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const modal = document.getElementById('searchModal');
            if (modal) {
                modal.classList.add('active');
                document.getElementById('searchInput').focus();
            }
        }

        // Escape — Close search modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('searchModal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        }

        // Arrow Left/Right — Navigate between lessons (only if not in input)
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateLesson('next');
        }
        if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            navigateLesson('prev');
        }
    });
}

/* --- Navigate to next/prev lesson --- */
function navigateLesson(direction) {
    if (typeof academyData === 'undefined' || typeof renderLesson !== 'function') return;

    // Flatten all lessons
    const allLessons = [];
    academyData.forEach(ch => ch.lessons.forEach(l => allLessons.push(l)));

    // Find current lesson
    const activeBtn = document.querySelector('.lesson-btn.active');
    if (!activeBtn) return;
    const onclickAttr = activeBtn.getAttribute('onclick');
    const match = onclickAttr ? onclickAttr.match(/'([^']+)'/) : null;
    const currentId = match ? match[1] : null;
    if (!currentId) return;

    const idx = allLessons.findIndex(l => l.id === currentId);
    if (idx === -1) return;

    const newIdx = direction === 'next' ? idx + 1 : idx - 1;
    if (newIdx >= 0 && newIdx < allLessons.length) {
        renderLesson(allLessons[newIdx].id);
    }
}

/* --- Scroll to Top Button --- */
function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = '↑';
    btn.title = 'العودة للأعلى';
    btn.onclick = () => {
        const panel = document.getElementById('contentPanel');
        if (panel) panel.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(btn);

    const panel = document.getElementById('contentPanel');
    if (panel) {
        panel.addEventListener('scroll', () => {
            if (panel.scrollTop > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }
}

/* --- Lesson Navigation Arrows (Prev/Next) --- */
function appendLessonNavArrows(lessonId) {
    if (typeof academyData === 'undefined') return;
    const articleBody = document.getElementById('articleBody');
    if (!articleBody) return;

    const allLessons = [];
    academyData.forEach(ch => ch.lessons.forEach(l => allLessons.push(l)));
    const idx = allLessons.findIndex(l => l.id === lessonId);
    if (idx === -1) return;

    const prevLesson = idx > 0 ? allLessons[idx - 1] : null;
    const nextLesson = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;

    const navDiv = document.createElement('div');
    navDiv.className = 'lesson-nav-arrows';
    navDiv.innerHTML = `
        <button class="lesson-nav-btn" ${!prevLesson ? 'disabled' : ''} onclick="${prevLesson ? `renderLesson('${prevLesson.id}')` : ''}">
            <span style="margin-left: 10px; font-size: 1.2rem;">❮</span> ${prevLesson ? prevLesson.title.substring(0, 30) : 'الدرس السابق'}
        </button>
        <button class="lesson-nav-btn" ${!nextLesson ? 'disabled' : ''} onclick="${nextLesson ? `renderLesson('${nextLesson.id}')` : ''}">
            ${nextLesson ? nextLesson.title.substring(0, 30) : 'الدرس التالي'} <span style="margin-right: 10px; font-size: 1.2rem;">❯</span>
        </button>
    `;
    articleBody.appendChild(navDiv);
}
