import re

path_quiz = r'D:\abdo_portfolio\main\templates\main\quiz.html'
content_quiz = open(path_quiz, encoding='utf-8').read()

# Add Sub-category HTML
subcat_html = """
    <div id="subcatScreen" style="display: none; text-align: center; margin-top: 40px;">
      <h1>Bug Bounty Paths 🎯</h1>
      <p style="font-size: 1.2rem; color: #94a3b8; margin-bottom: 30px;">اختر المسار الدقيق للتحدي:</p>
      <div>
        <button class="cat-btn" onclick="startQuiz('bb_recon')">🔍 Recon & Asset Discovery</button>
        <button class="cat-btn" onclick="startQuiz('bb_web')">🌐 Web Vulns (XSS, SQLi..)</button>
        <button class="cat-btn" onclick="startQuiz('bb_api')">🔌 API & Logic Bugs</button>
        <button class="cat-btn" onclick="startQuiz('bb_cloud')">☁️ Cloud Security</button>
        <button class="cat-btn" onclick="startQuiz('bugbounty')">🔥 ميكس Bug Bounty شامل</button>
      </div>
      <div style="margin-top: 30px;">
        <button class="cat-btn" onclick="goBackToMainCats()" style="background: transparent; border-color: #64748b; color: #94a3b8;">🔙 العودة للأقسام الرئيسية</button>
      </div>
    </div>
"""

# Find the start screen and inject the subcat screen right after it
# Assuming startScreen ends with </div> just before <!-- 2. Main Quiz App -->
match = re.search(r'(<div id="startScreen">.*?</div>)\s*<!-- 2\.', content_quiz, re.DOTALL)
if match:
    content_quiz = content_quiz.replace(match.group(1), match.group(1) + '\n' + subcat_html)

# Update Bug Bounty button in startScreen to show subcats instead of starting quiz
content_quiz = content_quiz.replace('onclick="startQuiz(\'bugbounty\')"', 'onclick="showSubcats()"')

# Update JS with new functions
js_funcs = """
    function showSubcats() {
      document.getElementById('startScreen').style.display = 'none';
      document.getElementById('subcatScreen').style.display = 'block';
    }
    
    function goBackToMainCats() {
      document.getElementById('subcatScreen').style.display = 'none';
      document.getElementById('startScreen').style.display = 'block';
    }
    
    function startQuiz(cat) {
      document.getElementById('startScreen').style.display = 'none';
      const subcatEl = document.getElementById('subcatScreen');
      if(subcatEl) subcatEl.style.display = 'none';
"""

content_quiz = content_quiz.replace("function startQuiz(cat) {\n      document.getElementById('startScreen').style.display = 'none';", js_funcs)

# Add cat labels for new subcats
old_labels = "'bugbounty':'💰 Bug Bounty', 'general':'🧠 General Info'})[cat] || cat;"
new_labels = "'bugbounty':'💰 Bug Bounty', 'general':'🧠 General Info', 'bb_recon':'🔍 BB Recon', 'bb_web':'🌐 BB Web', 'bb_api':'🔌 BB API', 'bb_cloud':'☁️ BB Cloud'})[cat] || cat;"
content_quiz = content_quiz.replace(old_labels, new_labels)

open(path_quiz, 'w', encoding='utf-8').write(content_quiz)
print('UI Updated in quiz.html successfully.')
