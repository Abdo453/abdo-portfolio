/**
 * Linux Data Loader
 * Loads all JSON data files asynchronously and sets global variables.
 * Dispatches 'linuxDataReady' event when finished.
 */

window.linuxDataLoading = true;

async function loadCcnaData() {
    try {
        console.log("Fetching Linux Data...");
        
        // Fetch all JSON files in parallel (quizzes loaded via quizzes.js)
        const [lessonsRes, labsRes, interviewsRes] = await Promise.all([
            fetch('data/lessons.json'),
            fetch('data/labs.json'),
            fetch('data/interviews.json')
        ]);
        
        if (!lessonsRes.ok) throw new Error("Failed to load lessons.json");
        if (!labsRes.ok) throw new Error("Failed to load labs.json");
        if (!interviewsRes.ok) throw new Error("Failed to load interviews.json");
        
        window.academyData = await lessonsRes.json();
        const labsData = await labsRes.json();
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
        window.linuxCurriculum = labsData; // Some scripts might use this name
        
        console.log("Linux Data Loaded Successfully!");
        window.linuxDataLoading = false;
        
        // Dispatch event so other scripts know data is ready
        document.dispatchEvent(new Event('linuxDataReady'));
        
    } catch (error) {
        console.error("Error loading Linux Data:", error);
        alert("فشل تحميل بيانات المنهج. يرجى التأكد من تشغيل الموقع عبر سيرفر (http://) وليس كملف محلي (file://) لتجنب أخطاء CORS.");
    }
}

// Start loading immediately
loadCcnaData();
