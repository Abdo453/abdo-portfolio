/* ============================
   FEATURES JS (Dark Mode, Progress, Search)
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    injectFeaturesUI();
    initSearch();
    updateProgressBar();
    
    // Listen for lesson loading in academy.js
    // We override or hook into the render logic
    const originalRender = window.renderLesson;
    if (typeof originalRender === 'function') {
        window.renderLesson = function(lessonId) {
            originalRender(lessonId);
            appendCompletionButton(lessonId);
            updateSidebarIcons();
        };
        // Initial call
        setTimeout(() => updateSidebarIcons(), 500);
    }
});

/* --- Theme Management --- */
function initTheme() {
    const savedTheme = localStorage.getItem('ccna_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ccna_theme', next);
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

/* --- Progress Tracking --- */
function getCompletedLessons() {
    return JSON.parse(localStorage.getItem('ccna_completed_lessons') || '[]');
}

function toggleLessonComplete(lessonId) {
    let completed = getCompletedLessons();
    const index = completed.indexOf(lessonId);
    if (index === -1) {
        completed.push(lessonId);
    } else {
        completed.splice(index, 1);
    }
    localStorage.setItem('ccna_completed_lessons', JSON.stringify(completed));
    updateProgressBar();
    updateSidebarIcons();
    
    // Update button visually
    const btn = document.getElementById('markCompleteBtn');
    if (btn) {
        if (index === -1) { // It was added
            btn.className = 'mark-complete-btn completed';
            btn.innerHTML = '☑ مكتمل (انقر للتراجع)';
        } else {
            btn.className = 'mark-complete-btn';
            btn.innerHTML = '☐ تحديد كدرس مكتمل';
        }
    }
}

function appendCompletionButton(lessonId) {
    const articleBody = document.getElementById('articleBody');
    if (!articleBody) return;

    // Remove old button if exists
    const oldBtn = document.getElementById('markCompleteBtn');
    if (oldBtn) oldBtn.remove();

    const completed = getCompletedLessons();
    const isCompleted = completed.includes(lessonId);

    const btn = document.createElement('button');
    btn.id = 'markCompleteBtn';
    btn.className = isCompleted ? 'mark-complete-btn completed' : 'mark-complete-btn';
    btn.innerHTML = isCompleted ? '☑ مكتمل (انقر للتراجع)' : '☐ تحديد كدرس مكتمل';
    btn.onclick = () => toggleLessonComplete(lessonId);

    articleBody.appendChild(btn);
}

function updateProgressBar() {
    if (typeof academyData === 'undefined') return;
    
    let totalLessons = 0;
    academyData.forEach(ch => totalLessons += ch.lessons.length);
    
    const completed = getCompletedLessons().length;
    const percentage = totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);
    
    const bar = document.getElementById('topProgressBar');
    const txt = document.getElementById('topProgressText');
    if (bar) bar.style.width = percentage + '%';
    if (txt) txt.innerText = percentage + '% CCNA Progress';
}

function updateSidebarIcons() {
    const completed = getCompletedLessons();
    document.querySelectorAll('.lesson-btn').forEach(btn => {
        const id = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (id) {
            // Remove old icon
            const oldIcon = btn.querySelector('.lesson-status-icon');
            if (oldIcon) oldIcon.remove();

            const iconSpan = document.createElement('span');
            iconSpan.className = 'lesson-status-icon';
            
            if (completed.includes(id)) {
                iconSpan.innerText = '☑ ';
                iconSpan.style.color = 'var(--success)';
            } else {
                iconSpan.innerText = '☐ ';
                iconSpan.style.color = 'var(--text-main)';
            }
            btn.prepend(iconSpan);
        }
    });
}
