// ==========================================
// DOM Rendering Logic (Restored)
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
            // Use window.renderLesson so features.js can hook into it
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
                return;
            }
        }
    }
};

document.addEventListener('linuxDataReady', () => {
    renderSidebar();
    if(typeof academyData !== 'undefined' && academyData[0] && academyData[0].lessons[0]) {
        window.renderLesson(academyData[0].lessons[0].id);
    }
});
