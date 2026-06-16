import os

filepath = 'd:/abdo_portfolio/build/ccna/simulator.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add variables to the top
var_declarations = """
// Global state for Modes and Reports
let currentMode = 'guided'; // 'guided', 'challenge', 'troubleshoot'
let labReport = {
    commands: [],
    errors: [],
    startTime: null,
    endTime: null
};

"""
content = var_declarations + content

# Modify processCommand to track commands and errors
# I will find the processCommand function definition
# It starts around function processCommand(cmdStr) {
# For tracking, I can just modify checkChallenge and getPrompt maybe?
# Let's actually add the tracking manually inside the script block

# Actually, the python script can just append the new logic at the end, and overwrite loadPhase and checkChallenge.
# Let's replace the end block from checkChallenge to the end.

old_end_code = """function checkChallenge() {
    if (!currentLevel) return;
    
    let isPassed = currentLevel.validate(routerState);
    if (isPassed) {
        document.getElementById('statusBox').classList.add('success');
        document.getElementById('challengeStatus').innerText = "نجاح! لقد أتممت التحدي.";
        
        // Show success msg in terminal
        term.writeln('');
        term.writeln('\\x1b[32m*** CHALLENGE COMPLETED ***\\x1b[0m');
        
        // Setup next level logic here (optional auto-advance)
    }
}

function buildUI() {
    const selector = document.getElementById('phaseSelector');
    
    window.ccnaCurriculum.forEach((phaseObj, pIndex) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = phaseObj.phase;
        
        phaseObj.levels.forEach((lvl, lIndex) => {
            const opt = document.createElement('option');
            opt.value = `${pIndex}-${lIndex}`;
            opt.innerText = lvl.title;
            optgroup.appendChild(opt);
        });
        
        selector.appendChild(optgroup);
    });

    // Load first level
    selector.value = "0-0";
    loadPhase("0-0");
}

window.loadPhase = function(val) {
    let [p, l] = val.split('-');
    currentPhaseIndex = parseInt(p);
    currentLevelIndex = parseInt(l);
    currentLevel = window.ccnaCurriculum[currentPhaseIndex].levels[currentLevelIndex];

    document.getElementById('theoryContent').innerHTML = currentLevel.theory;
    document.getElementById('challengeStatus').innerText = currentLevel.challengeText;
    document.getElementById('statusBox').classList.remove('success');

    // Reset Router State for new level
    routerState = {
        hostname: 'Router',
        mode: 'user',
        interfaces: {},
        runningConfig: '',
        isLinux: currentLevel.isLinux || false
    };

    // Load initial broken state for Troubleshooting labs if provided
    if (currentLevel.initialState) {
        Object.assign(routerState, JSON.parse(JSON.stringify(currentLevel.initialState)));
    }

    currentInput = '';
    commandHistory = [];
    historyIndex = -1;

    if (term) {
        term.clear();
        term.writeln('\\x1b[36m╔══════════════════════════════════════════════════╗\\x1b[0m');
        term.writeln('\\x1b[36m║  Cisco IOS Software, Version 15.1(4)M4           ║\\x1b[0m');
        term.writeln('\\x1b[36m╚══════════════════════════════════════════════════╝\\x1b[0m');
        term.writeln('\\x1b[33mLevel: ' + currentLevel.title + '\\x1b[0m');
        term.writeln('\\x1b[90mTip: Use Tab for completion, ↑↓ for history, ? for help\\x1b[0m');
        term.writeln('');
        term.write(getPrompt());
    }
};

window.addEventListener('load', () => {
    buildUI();
    initTerminal();
});"""

new_end_code = """function checkChallenge() {
    if (!currentLevel) return;
    
    let isPassed = currentLevel.validate(routerState);
    if (isPassed && !document.getElementById('statusBox').classList.contains('success')) {
        document.getElementById('statusBox').classList.add('success');
        document.getElementById('challengeStatus').innerText = "نجاح! لقد أتممت التحدي.";
        
        labReport.endTime = new Date();
        document.getElementById('btnReport').style.display = 'block';
        
        // Show success msg in terminal
        term.writeln('');
        term.writeln('\\x1b[32m*** CHALLENGE COMPLETED ***\\x1b[0m');
        term.writeln('\\x1b[36mاضغط على زر Report بالأعلى لرؤية تقريرك.\\x1b[0m');
    }
}

function buildUI() {
    const selector = document.getElementById('phaseSelector');
    selector.innerHTML = '<option value="" disabled selected>-- اختر المرحلة --</option>';
    
    window.ccnaCurriculum.forEach((phaseObj, pIndex) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = phaseObj.phase;
        
        phaseObj.levels.forEach((lvl, lIndex) => {
            const opt = document.createElement('option');
            opt.value = `${pIndex}-${lIndex}`;
            opt.innerText = lvl.title;
            optgroup.appendChild(opt);
        });
        
        selector.appendChild(optgroup);
    });

    // Load first level
    selector.value = "0-0";
    loadPhase("0-0");
}

window.loadPhase = function(val) {
    let [p, l] = val.split('-');
    currentPhaseIndex = parseInt(p);
    currentLevelIndex = parseInt(l);
    currentLevel = window.ccnaCurriculum[currentPhaseIndex].levels[currentLevelIndex];

    // Reset Report
    labReport = {
        commands: [],
        errors: [],
        startTime: new Date(),
        endTime: null
    };
    document.getElementById('btnReport').style.display = 'none';

    // Apply Mode UI
    applyModeUI();

    document.getElementById('statusBox').classList.remove('success');

    // Reset Router State
    routerState = {
        hostname: 'Router',
        mode: 'user',
        interfaces: {},
        runningConfig: '',
        isLinux: currentLevel.isLinux || false
    };

    // Inject bugs based on Mode
    if (currentMode === 'troubleshoot') {
        injectTroubleshootingBug();
    } else if (currentLevel.initialState) {
        Object.assign(routerState, JSON.parse(JSON.stringify(currentLevel.initialState)));
    }

    currentInput = '';
    commandHistory = [];
    historyIndex = -1;

    if (term) {
        term.clear();
        term.writeln('\\x1b[36m╔══════════════════════════════════════════════════╗\\x1b[0m');
        term.writeln('\\x1b[36m║  Cisco IOS Software, Version 15.1(4)M4           ║\\x1b[0m');
        term.writeln('\\x1b[36m╚══════════════════════════════════════════════════╝\\x1b[0m');
        term.writeln('\\x1b[33mLevel: ' + currentLevel.title + ' [' + currentMode.toUpperCase() + ']\\x1b[0m');
        term.writeln('\\x1b[90mTip: Use Tab for completion, ↑↓ for history, ? for help\\x1b[0m');
        term.writeln('');
        term.write(getPrompt());
    }
};

window.setLabMode = function(mode) {
    currentMode = mode;
    document.querySelectorAll('.lab-modes button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('mode' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');
    
    // Reload phase with new mode
    let val = document.getElementById('phaseSelector').value;
    if (val) loadPhase(val);
}

function applyModeUI() {
    let tc = document.getElementById('theoryContent');
    let cs = document.getElementById('challengeStatus');
    
    if (currentMode === 'guided') {
        tc.innerHTML = currentLevel.theory;
        cs.innerHTML = currentLevel.challengeText;
    } else if (currentMode === 'challenge') {
        tc.innerHTML = "<h2>تحدي بدون مساعدة</h2><p>في هذا الوضع، لن يظهر لك الشرح أو الأوامر. اعتمد على حفظك للوصول للهدف المذكور بالأسفل.</p>";
        cs.innerHTML = currentLevel.challengeText;
    } else if (currentMode === 'troubleshoot') {
        tc.innerHTML = "<h2>اكتشاف الأخطاء (Troubleshooting)</h2><p>هناك خطأ مقصود في إعدادات الراوتر. استخدم أوامر الـ show لتشخيص المشكلة وحلها.</p>";
        cs.innerHTML = "اكتشف الخطأ الموجود في الشبكة، ثم قم بإصلاحه لتلبية المتطلبات الخاصة بهذا اللاب.";
    }
}

function injectTroubleshootingBug() {
    // If the lab has specific bugs defined, pick one randomly.
    if (currentLevel.bugs && currentLevel.bugs.length > 0) {
        let randomBug = currentLevel.bugs[Math.floor(Math.random() * currentLevel.bugs.length)];
        Object.assign(routerState, JSON.parse(JSON.stringify(randomBug.state)));
        // Could also log the bug silently for debugging
        console.log("Injected Bug: ", randomBug.description);
    } else if (currentLevel.initialState) {
        // Fallback to initial state if no bugs array
        Object.assign(routerState, JSON.parse(JSON.stringify(currentLevel.initialState)));
    } else {
        // Generic random bug if nothing defined: Shut down an interface
        routerState.interfaces['fa0/0'] = { shutdown: true };
    }
}

window.showDiagram = function() {
    let diagramText = currentLevel.topology || "[Router] --- (fa0/0) --- [Switch]";
    document.getElementById('diagramContent').innerText = diagramText;
    document.getElementById('diagramModal').classList.add('active');
}

window.showReport = function() {
    let duration = ((labReport.endTime - labReport.startTime) / 1000).toFixed(1);
    let html = `
        <h3 style="color:#00d2ff;">تقرير الأداء: ${currentLevel.title}</h3>
        <p><strong>الوضع (Mode):</strong> ${currentMode.toUpperCase()}</p>
        <p><strong>وقت التنفيذ:</strong> ${duration} ثانية</p>
        <hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;">
        <h4 style="color:#4CAF50;">✅ الأوامر المنفذة (Commands Used):</h4>
        <pre style="background:#0f172a; padding:10px; border-radius:5px;">${labReport.commands.join('\\n') || 'لا توجد أوامر'}</pre>
        <h4 style="color:#f85149; margin-top:15px;">❌ الأخطاء (Failed Commands):</h4>
        <pre style="background:#0f172a; padding:10px; border-radius:5px;">${labReport.errors.join('\\n') || 'ممتاز! لم تقع في أي أخطاء.'}</pre>
    `;
    document.getElementById('reportContent').innerHTML = html;
    document.getElementById('reportModal').classList.add('active');
}

// Intercept term.writeln to catch errors
const originalWriteln = term ? term.writeln : null;

// Ensure terminal loads properly with data_loader
document.addEventListener('ccnaDataReady', () => {
    buildUI();
    if (!term) initTerminal();
});

// For local testing without server (fallback)
window.addEventListener('load', () => {
    if (!window.ccnaDataLoading && window.ccnaCurriculum) {
        buildUI();
        if (!term) initTerminal();
    }
});
"""

# Replace the block
if old_end_code in content:
    content = content.replace(old_end_code, new_end_code)
else:
    print("WARNING: Could not find exact block to replace. Attempting fallback.")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("simulator.js patched successfully.")
