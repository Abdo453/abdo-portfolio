import codecs

html_content = r'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pro Python IDE | Abdo Ramdan</title>
  
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;600;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/static/main/css/style.css">
  
  <!-- Xterm.js -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css" />
  <script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js"></script>

  <!-- Pyodide -->
  <script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>

  <!-- Monaco Editor Loader -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>

  <!-- Curriculum Database -->
  <script src="/static/main/js/curriculum.js"></script>

  <style>
    :root {
      --neon-cyan: #00e5ff;
      --neon-purple: #9b59ff;
      --neon-green: #00ff66;
      --neon-red: #ff0055;
      --bg-dark: #020205;
      --bg-panel: #080814;
      --border-color: rgba(0, 229, 255, 0.15);
      --py-blue: #3776AB;
      --py-yellow: #FFD43B;
    }
    * { box-sizing: border-box; }
    body {
      background-color: var(--bg-dark);
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .meth-header {
      background: rgba(4, 4, 10, 1);
      border-bottom: 1px solid rgba(55, 118, 171, 0.3);
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 100;
      height: 60px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    .meth-logo {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.5rem;
      background: linear-gradient(90deg, var(--py-blue), var(--py-yellow));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .top-controls {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .level-select {
      background: rgba(255, 255, 255, 0.05);
      color: var(--py-yellow);
      border: 1px solid rgba(55, 118, 171, 0.4);
      padding: 6px 12px;
      border-radius: 4px;
      font-family: 'Outfit', sans-serif;
      font-size: 1rem;
      outline: none;
      cursor: pointer;
      max-width: 300px;
    }
    .level-select option {
      background: var(--bg-dark);
      color: #fff;
    }
    .level-select option:disabled {
      color: #555;
    }

    .run-btn {
      background: rgba(0, 255, 102, 0.1);
      color: var(--neon-green);
      border: 1px solid var(--neon-green);
      padding: 6px 20px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .run-btn:hover:not(:disabled) {
      background: rgba(0, 255, 102, 0.2);
      box-shadow: 0 0 10px rgba(0, 255, 102, 0.4);
    }
    .run-btn:disabled {
      border-color: #555;
      color: #555;
      cursor: not-allowed;
    }

    /* Split Pane Layout */
    .ide-container {
      display: flex;
      flex-direction: row; 
      height: calc(100vh - 60px);
      width: 100vw;
    }

    /* Theory & Terminal Pane */
    .content-pane {
      width: 45%;
      display: flex;
      flex-direction: column;
      background: var(--bg-panel);
      border-left: 1px solid #333;
    }
    
    .theory-section {
      flex: 1.4;
      padding: 25px;
      overflow-y: auto;
      border-bottom: 2px solid #222;
    }

    .terminal-section {
      flex: 1;
      background: #000;
      display: flex;
      flex-direction: column;
    }
    .term-header {
      background: #111;
      padding: 5px 15px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: #888;
      border-bottom: 1px solid #222;
    }
    #xterm-container {
      flex: 1;
      padding: 10px;
      overflow: hidden;
    }

    /* Editor Pane */
    .editor-pane {
      width: 55%;
      display: flex;
      flex-direction: column;
      background: #1e1e1e;
    }
    .editor-header {
      background: #2d2d2d;
      padding: 8px 15px;
      border-bottom: 1px solid #111;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      color: #a0a0a0;
      display: flex;
      justify-content: space-between;
      direction: ltr; 
    }
    #monaco-container {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
    }

    /* Mobile Responsiveness */
    @media (max-width: 950px) {
      body { overflow-y: auto; }
      .ide-container { flex-direction: column; height: auto; min-height: calc(100vh - 60px); }
      .content-pane { width: 100%; height: auto; min-height: 50vh; border-left: none; }
      .editor-pane { width: 100%; height: 60vh; }
      .theory-section { flex: none; height: auto; }
      .terminal-section { flex: none; height: 30vh; }
    }

    /* Dynamic Content Styling */
    h1 {
      font-family: 'Outfit', sans-serif;
      color: #fff;
      font-size: 1.8rem;
      margin-top: 0;
      border-bottom: 1px dashed rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }
    p { font-size: 1.05rem; color: #cbd5e1; line-height: 1.8; }
    
    .mini-challenge {
      background: rgba(255, 212, 59, 0.05);
      border-right: 4px solid var(--py-yellow);
      padding: 15px;
      margin-top: 20px;
      border-radius: 8px 0 0 8px;
    }
    .challenge-title {
      color: var(--py-yellow);
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      margin-bottom: 10px;
    }
    code {
      background: #222;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      color: var(--neon-cyan);
    }
    .locked-overlay {
      position: absolute;
      top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.8);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #ff0055;
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      backdrop-filter: blur(5px);
      display: none;
    }
    
    /* Reset Button */
    .reset-btn {
      background: transparent;
      border: 1px solid #ff0055;
      color: #ff0055;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-size: 0.8rem;
      margin-left: 10px;
    }
    .reset-btn:hover { background: rgba(255,0,85,0.1); }

  </style>
</head>
<body>

  <header class="meth-header">
    <div class="meth-logo">🐍 PyHackers Engine</div>
    <div class="top-controls">
      <button class="reset-btn" onclick="resetProgress()" title="مسح التقدم والعودة للصفر">Reset Progress</button>
      <select class="level-select" id="levelSelector" onchange="switchLevel(this.value)">
        <!-- Options injected by JS Engine -->
      </select>
      <button class="run-btn" id="runBtn" onclick="executePython()" disabled>⏳ Loading...</button>
      <a href="/" class="back-btn" style="padding: 6px 12px; font-size:1rem; border:1px solid rgba(255,255,255,0.2); color:#fff; text-decoration:none; border-radius:4px;">Exit ✖</a>
    </div>
  </header>

  <div class="ide-container">
    
    <!-- Right Panel: Content & Terminal -->
    <div class="content-pane">
      <div class="theory-section" id="theory-box">
        <!-- Theory injected by JS Engine -->
        <h1 style="color:#aaa;">Loading Engine...</h1>
      </div>
      <div class="terminal-section">
        <div class="term-header" id="term-header-title">Terminal — /workspace/script.py</div>
        <div id="xterm-container"></div>
      </div>
    </div>

    <!-- Left Panel: Editor -->
    <div class="editor-pane" dir="ltr">
      <div class="editor-header">
        <span id="editor-filename">workspace/script.py</span>
        <button class="copy-btn" style="background:transparent; border:1px solid #555; color:#aaa; cursor:pointer;" onclick="copyEditorCode()">Copy</button>
      </div>
      <div id="monaco-container">
        <div class="locked-overlay" id="editor-lock">
          <div>🔒 المستوى مغلق</div>
          <div style="font-size:1rem; color:#aaa; margin-top:10px;">عليك اجتياز التحدي السابق أولاً!</div>
        </div>
      </div>
    </div>

  </div>

  <script>
    // --- Engine State ---
    let unlockedLevels = ['l1'];
    let pyodide = null;
    let editor = null;
    let term = null;
    let fitAddon = null;
    let currentLevelId = 'l1';
    let allLevels = []; // Flat array of level objects for easy access

    // --- Load Progress ---
    const savedProgress = localStorage.getItem('pyhackers_unlocked');
    if (savedProgress) {
        try {
            const parsed = JSON.parse(savedProgress);
            if(Array.isArray(parsed) && parsed.length > 0) {
                unlockedLevels = parsed;
            }
        } catch(e) {}
    }

    function resetProgress() {
        if(confirm("هل أنت متأكد أنك تريد مسح تقدمك والعودة للمستوى الأول؟")) {
            localStorage.removeItem('pyhackers_unlocked');
            location.reload();
        }
    }

    // --- Initialize Xterm.js ---
    term = new Terminal({
      theme: { background: '#000000', foreground: '#00e5ff', cursor: '#00e5ff' },
      fontFamily: '"Fira Code", monospace',
      fontSize: 15,
      cursorBlink: true,
      convertEol: true
    });
    fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('xterm-container'));
    fitAddon.fit();
    term.writeln('\x1b[36m[*] Booting PyHackers OS...\x1b[0m');

    window.addEventListener('resize', () => {
      fitAddon.fit();
      if(editor) editor.layout();
    });

    // --- Build Dropdown & Flat Array ---
    function buildCurriculumUI() {
        const selector = document.getElementById('levelSelector');
        selector.innerHTML = '';
        allLevels = [];
        
        if(typeof window.pythonCurriculum === 'undefined') {
            term.writeln('\x1b[31m[-] Error: curriculum.js not loaded. Check file paths.\x1b[0m');
            return;
        }

        window.pythonCurriculum.forEach(chapter => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = chapter.chapter;
            
            chapter.levels.forEach(level => {
                allLevels.push(level); // add to flat array
                
                const opt = document.createElement('option');
                opt.value = level.id;
                
                let isUnlocked = unlockedLevels.includes(level.id);
                opt.innerText = `${level.title} ${isUnlocked ? '🔓' : '🔒'}`;
                if(!isUnlocked) opt.disabled = true;
                
                optgroup.appendChild(opt);
            });
            selector.appendChild(optgroup);
        });
        
        // Select the highest unlocked level
        currentLevelId = unlockedLevels[unlockedLevels.length - 1];
        selector.value = currentLevelId;
    }

    // --- Load Level Content ---
    function switchLevel(levelId) {
        const levelData = allLevels.find(l => l.id === levelId);
        if(!levelData) return;
        
        if(!unlockedLevels.includes(levelId)) {
            document.getElementById('editor-lock').style.display = 'flex';
        } else {
            document.getElementById('editor-lock').style.display = 'none';
        }

        currentLevelId = levelId;
        document.getElementById('theory-box').innerHTML = levelData.theory;
        document.getElementById('editor-filename').innerText = `workspace/${levelId}.py`;
        document.getElementById('term-header-title').innerText = `Terminal — /workspace/${levelId}.py`;
        
        if(editor) {
            editor.setValue(levelData.initialCode);
        }
        term.clear();
        term.writeln(`\x1b[36m[*] Loaded ${levelId}.py\x1b[0m\n`);
    }

    // --- Unlock Logic ---
    function unlockNextLevel(currentId) {
        const idx = allLevels.findIndex(l => l.id === currentId);
        if(idx >= 0 && idx < allLevels.length - 1) {
            const nextLevel = allLevels[idx+1];
            if(!unlockedLevels.includes(nextLevel.id)) {
                unlockedLevels.push(nextLevel.id);
                localStorage.setItem('pyhackers_unlocked', JSON.stringify(unlockedLevels));
                
                // Update UI Dropdown
                const opt = document.querySelector(`option[value="${nextLevel.id}"]`);
                if(opt) {
                    opt.disabled = false;
                    opt.innerText = opt.innerText.replace('🔒', '🔓');
                }
                
                term.writeln(`\n\x1b[1;33m[!] UNLOCKED: ${nextLevel.title} 🔓\x1b[0m`);
                term.writeln(`\x1b[33mSelect it from the dropdown menu above to continue.\x1b[0m`);
            }
        } else if (idx === allLevels.length - 1) {
            term.writeln(`\n\x1b[1;35m🎉 CONGRATULATIONS! You have completed the entire curriculum!\x1b[0m`);
        }
    }

    // --- Initialize Pyodide ---
    async function initPyodide() {
      try {
        pyodide = await loadPyodide();
        pyodide.setStdout({ batched: (str) => { term.writeln(str); } });
        pyodide.setStderr({ batched: (str) => { term.writeln(`\x1b[31m${str}\x1b[0m`); } });
        
        term.writeln('\x1b[32m[+] Python 3.11 Engine Loaded.\x1b[0m');
        term.writeln('\x1b[33m[!] Read the challenge on the right, write code on the left, and click "Run Code".\x1b[0m\\n');
        
        const btn = document.getElementById('runBtn');
        btn.innerText = "▶ Run Code";
        btn.disabled = false;
      } catch (err) {
        term.writeln(`\x1b[31m[-] Engine Load Failed: ${err}\x1b[0m`);
      }
    }

    // --- Initialize Monaco Editor ---
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.38.0/min/vs' }});
    require(['vs/editor/editor.main'], function() {
      buildCurriculumUI();
      const initialData = allLevels.find(l => l.id === currentLevelId);
      
      editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: initialData ? initialData.initialCode : "",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 16,
        fontFamily: '"Fira Code", monospace',
        scrollBeyondLastLine: false,
        padding: { top: 15 }
      });
      
      switchLevel(currentLevelId);
      initPyodide();
    });

    async function executePython() {
      if (!pyodide || !editor) return;
      if (!unlockedLevels.includes(currentLevelId)) {
          term.writeln(`\x1b[31m[-] Cannot run locked level!\x1b[0m`);
          return;
      }

      const code = editor.getValue();
      term.writeln(`\x1b[90m$ python3 ${currentLevelId}.py\x1b[0m`);
      
      let outBuffer = "";
      pyodide.setStdout({ batched: (str) => { 
        term.writeln(str); 
        outBuffer += str + "\\n"; 
      }});

      try {
        await pyodide.runPythonAsync(code);
        
        // Dynamic Validation
        const levelData = allLevels.find(l => l.id === currentLevelId);
        if(levelData && levelData.validate) {
            const isSuccess = levelData.validate(outBuffer);
            if(isSuccess) {
                term.writeln(`\x1b[1;32m✅ [SUCCESS] Challenge Passed!\x1b[0m`);
                term.writeln(`\x1b[32m+50 XP\x1b[0m`);
                unlockNextLevel(currentLevelId);
            } else {
                term.writeln(`\x1b[1;31m❌ [FAILED] Incorrect output. Read the challenge again.\x1b[0m`);
            }
        }
        
      } catch (err) {
        // Stderr is routed automatically
      }
      term.writeln(''); 
    }

    function copyEditorCode() {
      if(editor) { navigator.clipboard.writeText(editor.getValue()); }
    }

  </script>
</body>
</html>
'''

with codecs.open(r'D:\abdo_portfolio\main\templates\main\python_for_hackers.html', 'w', 'utf-8') as f:
    f.write(html_content)

print("Dynamic Python Learning Engine generated!")
