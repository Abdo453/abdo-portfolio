let allQuestionsPool = [];
let selectedQuestions = [];
let currentIdx = 0;
let userAnswers = [];
let timerInterval;
let timeLeft = 0;

document.addEventListener('linuxDataReady', () => {
    buildQuestionPool();
    document.getElementById('startScreen').innerHTML = `
        <h2 style="text-align: center; color: var(--accent); margin-bottom: 20px;">استعد للاختبار النهائي 🚀</h2>
        <p style="font-size: 1.2rem; line-height: 1.8; text-align: center; color: #c9d1d9;">
            لقد تم تجميع <strong>${allQuestionsPool.length} سؤال</strong> من بنك أسئلة Linux.<br>
            اختر نوع الامتحان الذي تفضله:
        </p>
        <div style="display: flex; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
            <button class="btn btn-start" style="flex: 1; padding: 20px; font-size: 1.2rem; background: #2ea043;" onclick="startExam(20, 15)">
                ⏱️ Quick Exam<br><span style="font-size: 0.9rem; font-weight: normal;">20 سؤال / 15 دقيقة</span>
            </button>
            <button class="btn btn-start" style="flex: 1; padding: 20px; font-size: 1.2rem; background: #d29922;" onclick="startExam(60, 90)">
                🎓 Full Simulator<br><span style="font-size: 0.9rem; font-weight: normal;">60 سؤال / 90 دقيقة</span>
            </button>
        </div>
    `;
});

function buildQuestionPool() {
    if (!window.academyData || !window.quizzesData) return;
    
    window.academyData.forEach(chapterObj => {
        const domainName = chapterObj.chapter;
        chapterObj.lessons.forEach(lesson => {
            const lessonData = window.quizzesData[lesson.id];
            if (lessonData) {
                // Collect easy, medium, hard, scenario
                ['easy', 'medium', 'hard', 'scenario'].forEach(level => {
                    if (lessonData[level] && Array.isArray(lessonData[level])) {
                        lessonData[level].forEach(q => {
                            allQuestionsPool.push({
                                ...q,
                                domain: domainName,
                                lessonId: lesson.id
                            });
                        });
                    }
                });
            }
        });
    });
}

function startExam(questionCount, minutes) {
    if (allQuestionsPool.length === 0) {
        alert("لم يتم تحميل الأسئلة بعد. يرجى المحاولة مرة أخرى.");
        return;
    }

    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('examScreen').style.display = 'block';
    
    // Shuffle and select N random questions
    selectedQuestions = [...allQuestionsPool].sort(() => 0.5 - Math.random()).slice(0, Math.min(questionCount, allQuestionsPool.length));
    userAnswers = new Array(selectedQuestions.length).fill(-1); // -1 means not answered
    currentIdx = 0;
    
    renderQuestion();
    
    // Start Timer
    timeLeft = minutes * 60;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) finishExam();
    }, 1000);
}

function updateTimerDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    const display = document.getElementById('timerDisplay');
    display.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    // Turn red in last 5 minutes
    if (timeLeft <= 300) display.style.color = '#ff0055';
}

function renderQuestion() {
    const q = selectedQuestions[currentIdx];
    document.getElementById('qCurrent').innerText = currentIdx + 1;
    document.getElementById('qTotal').innerText = selectedQuestions.length;
    
    let html = `
        <div class="question-block active">
            <span style="display:inline-block; padding: 4px 10px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 0.9rem; margin-bottom: 10px; color: #a5d6ff;">${q.domain}</span>
            <div class="question-text" style="user-select: none;">${q.q}</div>
            ${q.options.map((opt, i) => `
                <label class="option-label">
                    <input type="radio" name="examQ" value="${i}" ${userAnswers[currentIdx] === i ? 'checked' : ''} onchange="saveAnswer(${i})"> 
                    <span style="user-select: none;">${opt}</span>
                </label>
            `).join('')}
        </div>
    `;
    document.getElementById('questionContainer').innerHTML = html;

    document.getElementById('prevBtn').style.visibility = currentIdx > 0 ? 'visible' : 'hidden';
    
    if (currentIdx === selectedQuestions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('finishBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('finishBtn').style.display = 'none';
    }
}

function saveAnswer(val) {
    userAnswers[currentIdx] = parseInt(val);
}

function nextQuestion() {
    if (currentIdx < selectedQuestions.length - 1) {
        currentIdx++;
        renderQuestion();
    }
}

function prevQuestion() {
    if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
    }
}

function markReview() {
    // Optional feature: add a visual marker for review
    alert("تم تظليل السؤال للمراجعة لاحقاً.");
    // In a real implementation we would render a sidebar of questions
}

function finishExam() {
    if (timeLeft > 0 && !confirm("هل أنت متأكد من إنهاء الامتحان قبل انتهاء الوقت؟")) return;
    
    clearInterval(timerInterval);

    document.getElementById('examScreen').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';

    let score = 0;
    let reviewHtml = '';
    
    // Domain tracking
    let domainStats = {};

    selectedQuestions.forEach((q, i) => {
        if (!domainStats[q.domain]) {
            domainStats[q.domain] = { total: 0, correct: 0 };
        }
        domainStats[q.domain].total++;

        const isCorrect = userAnswers[i] === q.correct;
        if (isCorrect) {
            score++;
            domainStats[q.domain].correct++;
        }
        
        reviewHtml += `
            <div class="review-item ${isCorrect ? 'correct' : ''}">
                <p><strong>س${i+1} [${q.domain}]:</strong> ${q.q}</p>
                <p style="color: var(--success);">الجواب الصحيح: ${q.options[q.correct]}</p>
                ${!isCorrect ? `<p style="color: var(--danger);">إجابتك: ${userAnswers[i] >= 0 ? q.options[userAnswers[i]] : 'لم تجب'}</p>` : ''}
            </div>
        `;
    });

    const percent = Math.round((score / selectedQuestions.length) * 100);
    document.getElementById('scoreDisplay').innerText = percent + '%';
    document.getElementById('reviewContainer').innerHTML = reviewHtml;

    const comment = document.getElementById('scoreComment');
    let certHtml = '';
    if (percent >= 80) {
        comment.innerText = "أداء أسطوري! أنت جاهز لامتحان سيسكو الحقيقي.";
        certHtml = `<button class="btn btn-finish" style="margin-top: 15px; font-size: 1.2rem; padding: 15px 30px;" onclick="generateCertificate(${percent})">🎓 استخراج شهادة النجاح</button>`;
    } else if (percent >= 50) {
        comment.innerText = "أداء جيد، لكنك بحاجة لمراجعة بعض الدروس.";
    } else {
        comment.innerText = "لا تستسلم! راجع أقسام الضعف وجرب مرة أخرى.";
    }

    // Render Weakness Radar/Bars
    let weaknessHtml = '<div style="margin: 20px 0; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px;">';
    weaknessHtml += '<h3 style="color: var(--accent); margin-bottom: 15px;">📊 تحليل الأداء حسب المواضيع:</h3>';
    
    for (let dom in domainStats) {
        let stats = domainStats[dom];
        let p = Math.round((stats.correct / stats.total) * 100);
        let color = p >= 80 ? 'var(--success)' : (p >= 50 ? '#d29922' : 'var(--danger)');
        weaknessHtml += `
            <div style="margin-bottom: 10px; text-align: right;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${dom}</span>
                    <span style="color: ${color}; font-weight: bold;">${p}% (${stats.correct}/${stats.total})</span>
                </div>
                <div style="width: 100%; background: rgba(255,255,255,0.1); border-radius: 5px; height: 10px; overflow: hidden;">
                    <div style="width: ${p}%; height: 100%; background: ${color};"></div>
                </div>
            </div>
        `;
    }
    weaknessHtml += '</div>';
    
    document.getElementById('scoreComment').insertAdjacentHTML('afterend', weaknessHtml + certHtml);
}

function generateCertificate(score) {
    const studentName = prompt("أدخل اسمك لاستخراج الشهادة:");
    if (!studentName) return;

    const date = new Date().toLocaleDateString('en-GB');
    const certWindow = window.open('', '_blank');
    
    certWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>شهادة إتمام - ${studentName}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
                body { margin: 0; padding: 0; background: #333; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Cairo', sans-serif; }
                .cert-container { width: 800px; padding: 50px; background: #fff; border: 15px solid #1a365d; position: relative; text-align: center; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
                .cert-inner { border: 2px dashed #1a365d; padding: 40px; }
                .logo { font-size: 2rem; color: #1a365d; font-weight: 900; margin-bottom: 20px; }
                h1 { color: #d29922; font-size: 3rem; margin: 10px 0; }
                h2 { color: #333; font-size: 1.5rem; margin: 20px 0; }
                .student-name { font-size: 3rem; color: #1a365d; border-bottom: 2px solid #d29922; display: inline-block; padding-bottom: 5px; margin: 20px 0; }
                .desc { font-size: 1.2rem; color: #555; line-height: 1.8; margin-bottom: 40px; }
                .footer { display: flex; justify-content: space-between; margin-top: 50px; color: #1a365d; font-weight: bold; }
                .signature { border-top: 2px solid #1a365d; padding-top: 10px; width: 200px; }
                .score-badge { position: absolute; top: 40px; left: 40px; background: #d29922; color: #fff; width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
                @media print {
                    body { background: #fff; }
                    .cert-container { box-shadow: none; border: 10px solid #1a365d; width: 100%; height: 100%; }
                }
            </style>
        </head>
        <body>
            <div class="cert-container">
                <div class="score-badge">${score}%</div>
                <div class="cert-inner">
                    <div class="logo">Linux Linux Academy</div>
                    <h1>شهادة إجتياز بتفوق</h1>
                    <h2>يُشهد بأن المتدرب</h2>
                    <div class="student-name">${studentName}</div>
                    <div class="desc">
                        قد اجتاز بنجاح امتحان المحاكاة الشامل لشهادة (Linux Security) المعتمد من الأكاديمية،<br>
                        وأظهر كفاءة ممتازة في أساسيات الشبكات، التوجيه، التبديل، والأمن السيبراني.
                    </div>
                    <div class="footer">
                        <div class="signature">التاريخ: ${date}</div>
                        <div class="signature">المدير الأكاديمي</div>
                    </div>
                </div>
            </div>
            <script>
                setTimeout(() => { window.print(); }, 1000);
            </script>
        </body>
        </html>
    `);
    certWindow.document.close();
}
