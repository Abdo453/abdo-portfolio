
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

  