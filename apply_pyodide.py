import codecs

file_path = r'D:\abdo_portfolio\main\templates\main\python_for_hackers.html'
with codecs.open(file_path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add CDN links in the <head>
head_addition = """
  <!-- CodeMirror -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/darcula.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/python/python.min.js"></script>
  <!-- Pyodide -->
  <script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>
"""

if "codemirror" not in content:
    content = content.replace("</head>", head_addition + "</head>")

# 2. Modify Level 1 to have an interactive editor
old_level1 = """<div class="code-content" id="code1" dir="ltr" style="text-align:left;">
<span class="keyword">import</span> re

<span class="comment"># Extracting hidden endpoints from a JS file</span>
js_content = <span class="string">"var api_url = '/api/v1/users'; fetch('/internal/debug');"</span>

endpoints = re.findall(<span class="string">r"/[a-zA-Z0-9_/-]+"</span>, js_content)

<span class="keyword">for</span> endpoint <span class="keyword">in</span> endpoints:
    <span class="func">print</span>(<span class="string">f"[*] Found Hidden Endpoint: {endpoint}"</span>)
            </div>"""

new_level1 = """<div class="code-content" dir="ltr" style="text-align:left; padding: 0;">
              <textarea id="editor1">
import re

# Extracting hidden endpoints from a JS file
js_content = "var api_url = '/api/v1/users'; fetch('/internal/debug');"

endpoints = re.findall(r"/[a-zA-Z0-9_/-]+", js_content)

for endpoint in endpoints:
    print(f"[*] Found Hidden Endpoint: {endpoint}")
              </textarea>
            </div>"""

content = content.replace(old_level1, new_level1)

# Modify Level 1 challenge to have an interactive editor
old_challenge = """        <div class="mini-challenge">
          <div class="challenge-title">🎯 Mini-Challenge</div>
          <p>استخدم `re.findall` لاستخراج جميع عناوين الـ IP من ملف السجل (Log file).</p>
        </div>"""

new_challenge = """        <div class="mini-challenge">
          <div class="challenge-title">🎯 Mini-Challenge</div>
          <p>استخدم <code>re.findall</code> لاستخراج جميع عناوين الـ IP من المتغير <code>log_data</code> وطباعتها.</p>
          <div class="code-box">
            <div class="code-header">
              <span>challenge_ips.py</span>
              <div>
                <button class="action-btn sim-btn" onclick="runChallenge()">▶ Run Challenge</button>
              </div>
            </div>
            <div class="code-content" dir="ltr" style="text-align:left; padding: 0;">
              <textarea id="challengeEditor">
import re

log_data = "Failed login from 192.168.1.50 at 10:00. Success from 10.0.0.5."

# اكتب الكود الخاص بك هنا:
# استخرج جميع عناوين IP من log_data باستخدام re.findall
# ثم قم بطباعة قائمة العناوين أو العناوين منفردة.

</textarea>
            </div>
          </div>
          <div class="term-output-box" id="challengeOut" dir="ltr" style="text-align:left;"></div>
        </div>"""

content = content.replace(old_challenge, new_challenge)

# Update the buttons
content = content.replace('''<button class="action-btn sim-btn" onclick="simulate('out1')">▶ Simulate</button>''', 
                          '''<button class="action-btn sim-btn" onclick="runPythonCode('editor1', 'out1')" id="runBtn1" disabled>⏳ Loading Python...</button>''')


# 3. Add JS logic for Pyodide and CodeMirror
old_script = """  <script>
    function switchLevel(levelId, el) {"""

new_script = """  <script>
    let pyodide = null;
    let editor1 = null;
    let challengeEditor = null;

    async function initPyodide() {
      try {
        pyodide = await loadPyodide();
        document.getElementById('runBtn1').innerText = "▶ Run Code";
        document.getElementById('runBtn1').disabled = false;
        console.log("Pyodide loaded successfully.");
      } catch (err) {
        console.error("Pyodide failed to load: ", err);
      }
    }

    // Initialize Editors when DOM loads
    window.addEventListener('DOMContentLoaded', () => {
      initPyodide();
      
      editor1 = CodeMirror.fromTextArea(document.getElementById("editor1"), {
        mode: "python",
        theme: "darcula",
        lineNumbers: true,
        viewportMargin: Infinity
      });
      
      challengeEditor = CodeMirror.fromTextArea(document.getElementById("challengeEditor"), {
        mode: "python",
        theme: "darcula",
        lineNumbers: true,
        viewportMargin: Infinity
      });
    });

    async function runPythonCode(editorId, outputId) {
      if (!pyodide) return;
      const code = editorId === 'editor1' ? editor1.getValue() : challengeEditor.getValue();
      const outputBox = document.getElementById(outputId);
      outputBox.style.display = 'block';
      outputBox.innerText = "Running...";
      
      // Redirect stdout
      let outputBuffer = "";
      pyodide.setStdout({ batched: (str) => { outputBuffer += str + "\\n"; } });
      
      try {
        await pyodide.runPythonAsync(code);
        outputBox.innerText = outputBuffer || "No output generated.";
        return outputBuffer;
      } catch (err) {
        outputBox.innerText = err.toString();
        return err.toString();
      }
    }
    
    async function runChallenge() {
       const out = await runPythonCode('challengeEditor', 'challengeOut');
       const outBox = document.getElementById('challengeOut');
       if(out.includes("192.168.1.50") && out.includes("10.0.0.5")) {
           outBox.innerHTML = `<span style="color:var(--neon-green)">✅ مبروك! إجابة صحيحة. تم استخراج جميع عناوين الـ IP بنجاح!</span><br><br>` + outBox.innerHTML;
       } else {
           outBox.innerHTML = `<span style="color:var(--neon-red)">❌ إجابة غير صحيحة. تأكد أنك تطبع الـ IP's الموجودة في النص.</span><br><br>` + outBox.innerHTML;
       }
    }

    function switchLevel(levelId, el) {"""

content = content.replace(old_script, new_script)

# Add custom CSS for CodeMirror to fix height
css_addition = """
    /* CodeMirror adjustments */
    .CodeMirror {
      height: auto;
      font-family: 'Fira Code', monospace;
      font-size: 1.05rem;
    }
"""

if "CodeMirror adjustments" not in content:
    content = content.replace("/* Code Blocks */", css_addition + "\n    /* Code Blocks */")

with codecs.open(file_path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated python_for_hackers.html with Pyodide and CodeMirror!")
