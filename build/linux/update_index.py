import re

filepath = 'd:/abdo_portfolio/build/ccna/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the Modals right before </body>
modals_html = """
    <!-- Network Diagram Modal -->
    <div id="diagramModal" class="search-modal">
        <div class="search-content" style="max-width: 800px;">
            <h2 style="color: var(--accent); margin-bottom: 15px;">رسمة الشبكة (Topology)</h2>
            <div id="diagramContent" style="background: #020617; padding: 20px; border-radius: 8px; font-family: monospace; white-space: pre; color: #fff; text-align: center; overflow-x: auto;">
                لا توجد رسمة متاحة لهذا التحدي.
            </div>
            <button class="quiz-submit-btn" style="margin-top: 20px; width: 100%;" onclick="document.getElementById('diagramModal').classList.remove('active')">إغلاق</button>
        </div>
    </div>

    <!-- Lab Report Modal -->
    <div id="reportModal" class="search-modal">
        <div class="search-content" style="max-width: 800px;">
            <h2 style="color: var(--success); margin-bottom: 15px;">تقرير التحدي (Lab Report)</h2>
            <div id="reportContent" style="background: #020617; padding: 20px; border-radius: 8px; font-family: monospace; color: #c9d1d9; max-height: 400px; overflow-y: auto;">
            </div>
            <button class="quiz-submit-btn" style="margin-top: 20px; width: 100%;" onclick="document.getElementById('reportModal').classList.remove('active')">إغلاق</button>
        </div>
    </div>
"""
content = content.replace("</body>", modals_html + "\n</body>")

# Replace Theory Panel to include Modes and action buttons
theory_panel_old = """        <aside class="theory-panel">
            <div id="theoryContent">
                <h2>مرحباً بك في محاكي CCNA</h2>
                <p>اختر مرحلة من القائمة العلوية للبدء. هذا المحاكي سيتيح لك تجربة أوامر سيسكو الأساسية والتدرب على إعدادات الـ Routers والـ Switches مباشرة من المتصفح.</p>
            </div>
            <div class="status-box" id="statusBox">
                <h3>حالة التحدي:</h3>
                <p id="challengeStatus">في انتظار بدء التحدي...</p>
            </div>
        </aside>"""

theory_panel_new = """        <aside class="theory-panel">
            <!-- Lab Modes Selection -->
            <div class="lab-modes" style="margin-bottom: 20px; display: flex; gap: 5px; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 8px;">
                <button id="modeGuided" class="quiz-level-btn active" style="flex:1; padding:5px; font-size:0.9rem;" onclick="setLabMode('guided')">Guided</button>
                <button id="modeChallenge" class="quiz-level-btn" style="flex:1; padding:5px; font-size:0.9rem;" onclick="setLabMode('challenge')">Challenge</button>
                <button id="modeTroubleshoot" class="quiz-level-btn" style="flex:1; padding:5px; font-size:0.9rem;" onclick="setLabMode('troubleshoot')">Troubleshoot</button>
            </div>
            
            <div id="theoryContent">
                <h2>مرحباً بك في محاكي CCNA</h2>
                <p>اختر مرحلة من القائمة العلوية للبدء.</p>
            </div>
            
            <!-- Tools for the Lab -->
            <div style="display: flex; gap: 10px; margin-top: 20px; margin-bottom: 20px;">
                <button class="top-btn" style="flex:1; text-align:center;" onclick="showDiagram()">📊 Topology</button>
                <button class="top-btn" id="btnReport" style="flex:1; text-align:center; display:none;" onclick="showReport()">📄 Report</button>
            </div>

            <div class="status-box" id="statusBox">
                <h3>حالة التحدي:</h3>
                <p id="challengeStatus">في انتظار بدء التحدي...</p>
            </div>
        </aside>"""

content = content.replace(theory_panel_old, theory_panel_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html updated successfully with modals and modes")
