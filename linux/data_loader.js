/**
 * Linux Data Loader
 * Loads all JSON data files asynchronously and sets global variables.
 * Dispatches 'linuxDataReady' event when finished.
 */

window.linuxDataLoading = true;

async function loadCcnaData() {
    try {
        console.log("Fetching Linux Data...");
        
        const cacheBuster = '?v=' + Date.now();
        const basePath = 'data/';
        
        let lessonsData = [], labsData = [], interviewsData = [];
        
        try {
            const lessonsRes = await fetch(basePath + 'lessons.json' + cacheBuster);
            if (lessonsRes.ok) {
                lessonsData = await lessonsRes.json();
            } else {
                console.warn("lessons.json not found or returned error status");
            }
        } catch (e) {
            console.error("Error loading lessons.json:", e);
        }
        
        try {
            const labsRes = await fetch(basePath + 'labs.json' + cacheBuster);
            if (labsRes.ok) {
                labsData = await labsRes.json();
                
                // Convert validate strings back to functions for labs
                labsData.forEach(phase => {
                    if (phase.levels && Array.isArray(phase.levels)) {
                        phase.levels.forEach(level => {
                            if (level.validate && typeof level.validate === 'string') {
                                try {
                                    // Parse function from string like "function(state) { return ... }"
                                    level.validate = eval("(" + level.validate + ")");
                                } catch (e) {
                                    console.error("Failed to parse validate function for " + level.title, e);
                                    level.validate = () => false; // fallback
                                }
                            }
                        });
                    }
                });
            } else {
                console.warn("labs.json not found or returned error status");
            }
        } catch (e) {
            console.error("Error loading labs.json:", e);
        }
        
        try {
            const interviewsRes = await fetch(basePath + 'interviews.json' + cacheBuster);
            if (interviewsRes.ok) {
                interviewsData = await interviewsRes.json();
            } else {
                console.warn("interviews.json not found or returned error status");
            }
        } catch (e) {
            console.error("Error loading interviews.json:", e);
        }
        
        window.academyData = lessonsData;
        window.simulatorLevels = labsData;
        window.linuxCurriculum = labsData; // Backup reference name
        window.interviewsData = interviewsData;
        
        console.log("Linux Data Loaded Successfully!");
        window.linuxDataLoading = false;
        
        // Dispatch custom event to notify other scripts that data is ready
        document.dispatchEvent(new CustomEvent('linuxDataReady', { 
            detail: { lessons: lessonsData.length, labs: labsData.length } 
        }));
        
    } catch (err) {
        console.error("Critical Error in loadCcnaData:", err);
        window.linuxDataLoading = false;
        document.dispatchEvent(new Event('linuxDataReady'));
    }
}

// Start loading immediately
loadCcnaData();
