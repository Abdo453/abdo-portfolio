/**
 * CCNA Data Loader
 * Loads all JSON data files asynchronously and sets global variables.
 * Dispatches 'ccnaDataReady' event when finished.
 */

window.ccnaDataLoading = true;

async function loadCcnaData() {
    try {
        console.log("Fetching CCNA Data...");
        
        // Fetch all JSON files in parallel
        const [lessonsRes, labsRes, quizzesRes, interviewsRes] = await Promise.all([
            fetch('data/lessons.json'),
            fetch('data/labs.json'),
            fetch('data/quizzes.json'),
            fetch('data/interviews.json')
        ]);
        
        if (!lessonsRes.ok) throw new Error("Failed to load lessons.json");
        if (!labsRes.ok) throw new Error("Failed to load labs.json");
        if (!quizzesRes.ok) throw new Error("Failed to load quizzes.json");
        if (!interviewsRes.ok) throw new Error("Failed to load interviews.json");
        
        window.academyData = await lessonsRes.json();
        const labsData = await labsRes.json();
        window.quizzesData = await quizzesRes.json();
        window.interviewsData = await interviewsRes.json();
        
        // Convert validate strings back to functions for labs
        labsData.forEach(phase => {
            phase.levels.forEach(level => {
                if (level.validate && typeof level.validate === 'string') {
                    try {
                        // Create function from string like "function(state) { return ... }"
                        // We use eval to parse the function expression
                        level.validate = eval("(" + level.validate + ")");
                    } catch (e) {
                        console.error("Failed to parse validate function for " + level.title, e);
                    }
                }
            });
        });
        
        window.simulatorLevels = labsData;
        window.ccnaCurriculum = labsData; // Some scripts might use this name
        
        console.log("CCNA Data Loaded Successfully!");
        window.ccnaDataLoading = false;
        
        // Dispatch event so other scripts know data is ready
        document.dispatchEvent(new Event('ccnaDataReady'));
        
    } catch (error) {
        console.error("Error loading CCNA Data:", error);
        alert("فشل تحميل بيانات المنهج. يرجى التأكد من تشغيل الموقع عبر سيرفر (http://) وليس كملف محلي (file://) لتجنب أخطاء CORS.");
    }
}

// Start loading immediately
loadCcnaData();
