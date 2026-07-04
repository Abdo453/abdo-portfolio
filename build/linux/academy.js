// ==========================================
// DOM Rendering Logic
// ==========================================
function renderSidebar() {
    const toc = document.getElementById('tocPanel');
    if (!toc) return;
    toc.innerHTML = '';
    
    academyData.forEach((chapter, index) => {
        const chapterDiv = document.createElement('div');
        
        const title = document.createElement('div');
        title.className = 'chapter-title';
        title.innerHTML = `<span>${chapter.chapter}</span> <span class="arrow">▼</span>`;
        
        const lessonsContainer = document.createElement('div');
        lessonsContainer.className = 'chapter-lessons';
        
        // Open the first chapter by default
        if(index === 0) {
            lessonsContainer.classList.add('active');
            title.querySelector('.arrow').innerText = '▲';
        }

        title.onclick = () => {
            const isActive = lessonsContainer.classList.contains('active');
            lessonsContainer.classList.toggle('active');
            title.querySelector('.arrow').innerText = isActive ? '▼' : '▲';
        };

        chapterDiv.appendChild(title);
        
        chapter.lessons.forEach(lesson => {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            btn.id = 'btn-' + lesson.id;
            btn.innerText = lesson.title;
            btn.setAttribute('onclick', `window.renderLesson('${lesson.id}')`);
            lessonsContainer.appendChild(btn);
        });
        
        chapterDiv.appendChild(lessonsContainer);
        toc.appendChild(chapterDiv);
    });
}

window.renderLesson = function(id) {
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-' + id);
    if(btn) btn.classList.add('active');
    
    for(let chap of academyData) {
        for(let less of chap.lessons) {
            if(less.id === id) {
                const article = document.getElementById('articleBody');
                if(!article) return;
                article.innerHTML = less.content;
                
                // Update the URL hash without triggering full reload, to preserve current state on refresh
                window.location.hash = id;
                return;
            }
        }
    }
};

document.addEventListener('linuxDataReady', () => {
    renderSidebar();
    
    // Check if there is a specific lesson in the URL hash, if so render it, otherwise render the first lesson
    let initialLessonId = null;
    if (window.location.hash) {
        initialLessonId = window.location.hash.substring(1);
    }
    
    if (initialLessonId) {
        // Verify the lesson exists
        let exists = false;
        for (let chap of academyData) {
            if (chap.lessons.some(l => l.id === initialLessonId)) {
                exists = true;
                break;
            }
        }
        if (exists) {
            window.renderLesson(initialLessonId);
            return;
        }
    }
    
    if(typeof academyData !== 'undefined' && academyData[0] && academyData[0].lessons[0]) {
        window.renderLesson(academyData[0].lessons[0].id);
    }
});
