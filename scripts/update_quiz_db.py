import re
import json

path_quiz = r'D:\abdo_portfolio\main\templates\main\quiz.html'
content_quiz = open(path_quiz, encoding='utf-8').read()

# Extract old ALL_QUESTIONS
match = re.search(r'const ALL_QUESTIONS = (\[.*?\]);', content_quiz, re.DOTALL)
if match:
    old_questions_js = match.group(1)
    
    # Read the newly generated quiz_db.js
    path_db = r'D:\abdo_portfolio\main\static\main\js\quiz_db.js'
    new_db_content = open(path_db, encoding='utf-8').read()
    new_match = re.search(r'const ALL_QUESTIONS = (\[.*?\]);', new_db_content, re.DOTALL)
    
    if new_match:
        new_questions_js = new_match.group(1)
        
        # Merge them
        merged_js = old_questions_js[:-1].strip() + ',\n' + new_questions_js[1:].strip()
        final_db_content = 'const ALL_QUESTIONS = ' + merged_js + ';\n'
        
        open(path_db, 'w', encoding='utf-8').write(final_db_content)
        print('Successfully merged old and new questions into quiz_db.js')
        
        # Remove ALL_QUESTIONS from quiz.html
        content_quiz_replaced = content_quiz.replace(match.group(0), '')
        
        # Add the script tag
        script_tag = '<script src="js/quiz_db.js"></script>\n  <script>'
        content_quiz_replaced = content_quiz_replaced.replace('<script>', script_tag, 1)
        
        # Also update the Start Screen categories to include OSCP, CEH, General
        new_categories_html = """
        <button class="cat-btn" onclick="startQuiz('all')">🎯 الكل (ميكس شامل)</button>
        <button class="cat-btn" onclick="startQuiz('oscp')">🛡️ OSCP & Pentesting</button>
        <button class="cat-btn" onclick="startQuiz('ceh')">🎓 CEH & Security+</button>
        <button class="cat-btn" onclick="startQuiz('bugbounty')">💰 Bug Bounty (Advanced)</button>
        <button class="cat-btn" onclick="startQuiz('recon')">🌐 Web Recon</button>
        <button class="cat-btn" onclick="startQuiz('exploit')">💉 Web Exploitation</button>
        <button class="cat-btn" onclick="startQuiz('general')">🧠 General Info</button>
        """
        
        # Replace the old categories div content
        start_cat_match = re.search(r'<div>\s*<button class="cat-btn" onclick="startQuiz\(\'all\'\)">.*?</button>\s*</div>', content_quiz_replaced, re.DOTALL)
        if start_cat_match:
            content_quiz_replaced = content_quiz_replaced.replace(start_cat_match.group(0), f'<div>{new_categories_html}</div>')
        
        # Update getCatLabel helper in JS
        old_cat_label = "const getCatLabel = (cat) => ({'recon':'🌐 Recon', 'exploit':'💉 Exploit', 'tools':'🔧 Tools', 'logic':'🧠 Logic', 'xss':'⚡ XSS'})[cat] || cat;"
        new_cat_label = "const getCatLabel = (cat) => ({'recon':'🌐 Recon', 'exploit':'💉 Exploit', 'tools':'🔧 Tools', 'logic':'🧠 Logic', 'xss':'⚡ XSS', 'oscp':'🛡️ OSCP', 'ceh':'🎓 CEH', 'bugbounty':'💰 Bug Bounty', 'general':'🧠 General Info'})[cat] || cat;"
        content_quiz_replaced = content_quiz_replaced.replace(old_cat_label, new_cat_label)
        
        open(path_quiz, 'w', encoding='utf-8').write(content_quiz_replaced)
        print('Updated quiz.html to use external quiz_db.js and new categories')
else:
    print('Failed to find ALL_QUESTIONS in quiz.html')
