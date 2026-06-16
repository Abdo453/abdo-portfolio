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
      flex-direction: row; /* Right to Left flow by default due to dir="rtl" */
      height: calc(100vh - 60px);
      width: 100vw;
    }

    /* Theory & Terminal Pane (Visually on the Right in RTL) */
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

    /* Editor Pane (Visually on the Left in RTL) */
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
      direction: ltr; /* keep file path left-to-right */
    }
    #monaco-container {
      flex: 1;
      width: 100%;
      height: 100%;
    }

    /* Mobile Responsiveness */
    @media (max-width: 950px) {
      body { overflow-y: auto; }
      .ide-container {
        flex-direction: column;
        height: auto;
        min-height: calc(100vh - 60px);
      }
      .content-pane { width: 100%; height: auto; min-height: 50vh; border-left: none; }
      .editor-pane { width: 100%; height: 60vh; }
      .theory-section { flex: none; height: auto; }
      .terminal-section { flex: none; height: 30vh; }
    }

    /* Content Styling */
    .level-content {
      display: none;
      animation: fadeIn 0.3s ease;
    }
    .level-content.active {
      display: block;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    h1 {
      font-family: 'Outfit', sans-serif;
      color: #fff;
      font-size: 1.8rem;
      margin-top: 0;
      border-bottom: 1px dashed rgba(255,255,255,0.1);
      padding-bottom: 10px;
    }
    p {
      font-size: 1.05rem;
      color: #cbd5e1;
      line-height: 1.8;
    }
    
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

  </style>
</head>
<body>

  <header class="meth-header">
    <div class="meth-logo">🐍 PyHackers Pro IDE</div>
    <div class="top-controls">
      <select class="level-select" id="levelSelector" onchange="switchLevel(this.value)">
        <option value="l1">Level 1: أول كود 🔓</option>
        <option value="l2" disabled>Level 2: المتغيرات 🔒</option>
        <option value="l3" disabled>Level 3: التكرار 🔒</option>
        <option value="l4" disabled>Level 4: استخراج البيانات 🔒</option>
        <option value="l5" disabled>Level 5: طلبات الويب 🔒</option>
        <option value="l6" disabled>Level 6: مشروع التخرج 🔒</option>
      </select>
      <button class="run-btn" id="runBtn" onclick="executePython()" disabled>⏳ Loading...</button>
      <a href="/" class="back-btn" style="padding: 6px 12px; font-size:1rem; border:1px solid rgba(255,255,255,0.2); color:#fff; text-decoration:none; border-radius:4px;">Exit ✖</a>
    </div>
  </header>

  <div class="ide-container">
    
    <!-- Right Panel: Content & Terminal (45%) -->
    <div class="content-pane">
      
      <!-- Theory Section -->
      <div class="theory-section" id="theory-box">
        
        <!-- LEVEL 1 -->
        <div id="l1" class="level-content active">
          <h1>Level 1: مرحباً بالعالم (أول كود)</h1>
          <p>كما قالت منصات البرمجة العالمية (مثل Codecademy)، لا يمكنك الجري قبل أن تمشي. وأول خطوة في البرمجة هي أن تجعل الكمبيوتر "يتحدث".</p>
          <p>في لغة بايثون، نستخدم أمر الطباعة <code>print()</code> لإظهار النصوص على الشاشة.</p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي (مطلوب للعبور)</div>
            <p>لا يمكنك المرور للمستوى التالي دون اجتياز هذا التحدي!</p>
            <p>اكتب كود بايثون يقوم بطباعة العبارة التالية بالضبط: <br><code>Hello Hacker</code></p>
            <p>ثم اضغط على <b>Run Code</b>. إذا كان صحيحاً سيُفتح المستوى التالي!</p>
          </div>
        </div>

        <!-- LEVEL 2 -->
        <div id="l2" class="level-content">
          <h1>Level 2: المتغيرات (Variables)</h1>
          <p>رائع! الآن أنت تعرف كيف تطبع. الخطوة الثانية هي "الذاكرة". كيف نخزن الآيبيهات والبورتات؟</p>
          <p>المتغير هو صندوق نضع فيه قيمة لكي نستخدمها لاحقاً. مثلاً: <code>port = 80</code></p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي (مطلوب للعبور)</div>
            <p>لدينا متغير اسمه <code>target_ip</code> يحتوي على قيمة <code>127.0.0.1</code>.</p>
            <p>قم بطباعة قيمة هذا المتغير باستخدام <code>print</code>.</p>
          </div>
        </div>

        <!-- LEVEL 3 -->
        <div id="l3" class="level-content">
          <h1>Level 3: التكرار (Loops)</h1>
          <p>الهاكر لا يفحص هدفاً واحداً. لحسن الحظ، البرمجة تتيح لنا تكرار الأوامر مئات المرات بـ 3 أسطر فقط باستخدام <code>for loop</code>.</p>
          <p>دالة <code>range(1, 6)</code> تعطينا الأرقام من 1 إلى 5.</p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي (مطلوب للعبور)</div>
            <p>اكتب حلقة تكرارية تمر من 1 إلى 5. وفي كل دورة، اطبع الجملة التالية (مع استبدال X بالرقم الحالي):<br><code>Ping 192.168.1.X</code></p>
          </div>
        </div>

        <!-- LEVEL 4 -->
        <div id="l4" class="level-content">
          <h1>Level 4: استخراج البيانات (Regex)</h1>
          <p>مخرجات أدوات الفحص تكون ضخمة ومزعجة. استخدم التعبيرات النمطية (Regular Expressions) عبر مكتبة <code>re</code> لصيد ما تريده فقط (مثل الآيبيهات).</p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي (مطلوب للعبور)</div>
            <p>يوجد متغير <code>log_data</code> يحتوي على نص طويل. استخدم <code>re.findall</code> مع نمط الـ IP لاستخراج العناوين وطباعتها.</p>
          </div>
        </div>

        <!-- LEVEL 5 -->
        <div id="l5" class="level-content">
          <h1>Level 5: طلبات الويب (HTTP)</h1>
          <p>التحدث مع الـ APIs وسحب البيانات يتم عن طريق إرسال طلبات ويب (Web Requests).</p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي (مطلوب للعبور)</div>
            <p>باستخدام مكتبة <code>urllib.request</code>، أرسل طلباً للرابط <code>https://httpbin.org/status/200</code>، وقم بطباعة الحالة (Status Code) الخاصة بالرد.</p>
          </div>
        </div>

        <!-- LEVEL 6 -->
        <div id="l6" class="level-content">
          <h1>Level 6: مشروع التخرج</h1>
          <p>لقد دمجنا لك كل ما سبق: متغيرات، تكرار، دوال، واتصال بالشبكات، لبناء <b>Port Scanner</b> كامل!</p>
          
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي النهائي</div>
            <p>اقرأ كود الـ Port Scanner بتمعن لتفهم كيف يعمل. ثم أضف سطر طباعة في النهاية يطبع:<br><code>I am a Python Hacker!</code></p>
            <p>لتحصل على المكافأة النهائية!</p>
          </div>
        </div>

      </div>

      <!-- Terminal Section -->
      <div class="terminal-section">
        <div class="term-header" id="term-header-title">Terminal — /workspace/level1.py</div>
        <div id="xterm-container"></div>
      </div>

    </div>

    <!-- Left Panel: Editor (55%) -->
    <div class="editor-pane" dir="ltr">
      <div class="editor-header">
        <span id="editor-filename">workspace/level1.py</span>
        <button class="copy-btn" style="background:transparent; border:1px solid #555; color:#aaa; cursor:pointer;" onclick="copyEditorCode()">Copy</button>
      </div>
      <div id="monaco-container" style="position:relative;">
        <div class="locked-overlay" id="editor-lock">
          <div>🔒 المستوى مغلق</div>
          <div style="font-size:1rem; color:#aaa; margin-top:10px;">عليك اجتياز التحدي السابق أولاً!</div>
        </div>
      </div>
    </div>

  </div>

  <script>
    // --- Levels Initial Code Data ---
    const levelCodes = {
      'l1': `# Level 1: أمر الطباعة
# استخدم الأمر print لطباعة الجملة المطلوبة

print("اكتب هنا")
`,
      'l2': `# Level 2: المتغيرات

target_ip = "127.0.0.1"

# اطبع قيمة المتغير target_ip:

`,
      'l3': `# Level 3: التكرار

# تلميح: for i in range(1, 6):
# اكتب الحلقة التكرارية هنا:

`,
      'l4': `import re

log_data = "Attack detected from 192.168.1.50 at 10:00 AM. Admin logged from 10.0.0.5."

# النمط (Regex pattern) لاستخراج الـ IP
ip_pattern = r"\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b"

# استخدم re.findall لاستخراج الأيبيهات من log_data باستخدام ip_pattern واطبعها:

`,
      'l5': `import urllib.request

url = "https://httpbin.org/status/200"

try:
    # أرسل الطلب باستخدام urllib.request.urlopen واطبع الـ status (response.status)
    pass
except Exception as e:
    print(f"Error: {e}")

`,
      'l6': `import socket

def scan_port(ip, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    # محاكاة لفحص بورت وهمي (لا تستخدمه على شبكات حقيقية بدون إذن)
    if port == 80:
        print(f"[+] Port {port} is OPEN")
    s.close()

# فحص البورتات من 79 إلى 81
for p in range(79, 82):
    scan_port("127.0.0.1", p)

# اكتب الجملة النهائية للحصول على الاعتماد:
`
    };

    // Progression System
    let unlockedLevels = ['l1'];
    let pyodide = null;
    let editor = null;
    let term = null;
    let fitAddon = null;
    let currentLevel = 'l1';

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

    // --- Initialize Pyodide ---
    async function initPyodide() {
      try {
        pyodide = await loadPyodide();
        pyodide.setStdout({ batched: (str) => { term.writeln(str); } });
        pyodide.setStderr({ batched: (str) => { term.writeln(`\x1b[31m${str}\x1b[0m`); } });
        
        term.writeln('\x1b[32m[+] Python 3.11 Engine Loaded.\x1b[0m');
        term.writeln('\x1b[33m[!] Read the challenge on the right, write code on the left, and click "Run Code".\x1b[0m\n');
        
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
      editor = monaco.editor.create(document.getElementById('monaco-container'), {
        value: levelCodes['l1'],
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 16,
        fontFamily: '"Fira Code", monospace',
        scrollBeyondLastLine: false,
        padding: { top: 15 }
      });
      initPyodide();
    });

    function switchLevel(levelId) {
      if(!unlockedLevels.includes(levelId)) {
          // If trying to access locked level
          document.getElementById('editor-lock').style.display = 'flex';
      } else {
          document.getElementById('editor-lock').style.display = 'none';
      }

      // Update UI
      document.querySelectorAll('.level-content').forEach(el => el.classList.remove('active'));
      document.getElementById(levelId).classList.add('active');
      document.getElementById('editor-filename').innerText = `workspace/${levelId}.py`;
      document.getElementById('term-header-title').innerText = `Terminal — /workspace/${levelId}.py`;
      
      // Save current level and update editor
      currentLevel = levelId;
      if(editor) {
        editor.setValue(levelCodes[levelId]);
      }
      term.clear();
      term.writeln(`\x1b[36m[*] Loaded ${levelId}.py\x1b[0m\n`);
    }

    function unlockNextLevel(currentLvl) {
        const levels = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'];
        const idx = levels.indexOf(currentLvl);
        if(idx >= 0 && idx < levels.length - 1) {
            const nextLvl = levels[idx+1];
            if(!unlockedLevels.includes(nextLvl)) {
                unlockedLevels.push(nextLvl);
                const opt = document.querySelector(`option[value="${nextLvl}"]`);
                opt.disabled = false;
                opt.innerText = opt.innerText.replace('🔒', '🔓');
                
                term.writeln(`\x1b[1;33m[!] UNLOCKED: ${nextLvl.toUpperCase()} 🔓\x1b[0m`);
                term.writeln(`\x1b[33mSelect it from the dropdown menu above to continue.\x1b[0m`);
            }
        }
    }

    async function executePython() {
      if (!pyodide || !editor) return;
      if (!unlockedLevels.includes(currentLevel)) {
          term.writeln(`\x1b[31m[-] Cannot run locked level!\x1b[0m`);
          return;
      }

      const code = editor.getValue();
      term.writeln(`\x1b[90m$ python3 ${currentLevel}.py\x1b[0m`);
      
      let outBuffer = "";
      pyodide.setStdout({ batched: (str) => { 
        term.writeln(str); 
        outBuffer += str + "\\n"; 
      }});

      try {
        await pyodide.runPythonAsync(code);
        validateChallenge(currentLevel, outBuffer);
      } catch (err) {
        // Stderr is routed automatically
      }
      term.writeln(''); 
    }

    function validateChallenge(level, out) {
       let isSuccess = false;
       
       if(level === 'l1') {
           isSuccess = out.includes("Hello Hacker");
       } else if (level === 'l2') {
           isSuccess = out.includes("127.0.0.1");
       } else if (level === 'l3') {
           isSuccess = out.includes("Ping 192.168.1.1") && out.includes("Ping 192.168.1.5");
       } else if (level === 'l4') {
           isSuccess = out.includes("192.168.1.50") && out.includes("10.0.0.5");
       } else if (level === 'l5') {
           isSuccess = out.includes("200");
       } else if (level === 'l6') {
           isSuccess = out.includes("I am a Python Hacker!");
       }
       
       if(isSuccess) {
           term.writeln(`\x1b[1;32m✅ [SUCCESS] Challenge Passed!\x1b[0m`);
           term.writeln(`\x1b[32m+50 XP\x1b[0m`);
           unlockNextLevel(level);
       } else {
           term.writeln(`\x1b[1;31m❌ [FAILED] Incorrect output. Try again.\x1b[0m`);
       }
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

print("Pro IDE curriculum with progression locks generated!")
