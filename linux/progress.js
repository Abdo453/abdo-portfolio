/* 
   progress.js - Granular Progress Tracker
   Tracks: Theory, Quiz, Lab, Interview
*/

function getLessonProgress(lessonId) {
    const raw = localStorage.getItem('linux_granular_progress');
    const data = raw ? JSON.parse(raw) : {};
    return data[lessonId] || { theory: false, quiz: false, lab: false, interview: false };
}

function updateLessonProgress(lessonId, metric, status) {
    const raw = localStorage.getItem('linux_granular_progress');
    const data = raw ? JSON.parse(raw) : {};
    
    if (!data[lessonId]) {
        data[lessonId] = { theory: false, quiz: false, lab: false, interview: false };
    }
    
    data[lessonId][metric] = status;
    localStorage.setItem('linux_granular_progress', JSON.stringify(data));
    
    if (typeof updateSidebarIcons === 'function') updateSidebarIcons();
    if (typeof updateProgressBar === 'function') updateProgressBar();
}

function toggleLessonMetric(lessonId, metric) {
    const p = getLessonProgress(lessonId);
    updateLessonProgress(lessonId, metric, !p[metric]);
}
