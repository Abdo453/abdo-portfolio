(function() {
    if (window.HunterOSSyncManager) return;
    window.HunterOSSyncManager = true;

    const originalSetItem = localStorage.setItem;
    let syncTimeout = null;
    const trackedKeys = [
        'arena_xp', 'sqli_lab_flags', 'cmd_inj_flags', 'jwt_lab_flags', 
        'idor_lab_flags', 'ssrf_lab_flags', 'graphql_lab_flags', 
        'race_lab_flags', 'api_lab_flags', 'ai_lab_flags', 
        'cloud_lab_flags', 'linux_lab_flags'
    ];

    // Override setItem to detect progress changes
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (trackedKeys.includes(key)) {
            clearTimeout(syncTimeout);
            syncTimeout = setTimeout(pushToServer, 2000); // debounce 2s
        }
    };

    async function pushToServer() {
        try {
            let payload = {
                xp: parseInt(localStorage.getItem('arena_xp')) || 0,
                completed_challenges: {}
            };

            trackedKeys.forEach(k => {
                if (k !== 'arena_xp') {
                    const val = localStorage.getItem(k);
                    if (val) {
                        try {
                            payload.completed_challenges[k] = JSON.parse(val);
                        } catch(e) {}
                    }
                }
            });

            await fetch('/api/auth/save-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.error('Sync push failed:', e);
        }
    }

    async function pullFromServer() {
        try {
            const res = await fetch('/api/auth/profile');
            const data = await res.json();
            
            if (data.authenticated && data.user) {
                // Restore XP
                if (data.user.xp !== undefined && data.user.xp !== null) {
                    originalSetItem.call(localStorage, 'arena_xp', data.user.xp.toString());
                }
                
                // Restore Challenges
                if (data.user.completed_challenges && !Array.isArray(data.user.completed_challenges)) {
                    for (let k in data.user.completed_challenges) {
                        originalSetItem.call(localStorage, k, JSON.stringify(data.user.completed_challenges[k]));
                    }
                }

                // If we're inside a lab with an updateHud function, refresh the UI
                if (typeof window.updateHud === 'function') {
                    try { window.updateHud(); } catch(e){}
                }
            }
        } catch (e) {
            console.error('Sync pull failed:', e);
        }
    }

    window.syncProgressToServer = pushToServer;
    window.pullProgressFromServer = pullFromServer;

    // Auto-pull on load (except for home.html since it fetches profile itself, and login.html)
    const path = window.location.pathname;
    if (!path.includes('login') && !path.endsWith('/profile') && path !== '/') {
        pullFromServer();
    }
})();
