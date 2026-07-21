import re
import time

file_path = r"d:\abdo_portfolio\scratch\sync_to_build.py"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the cache busters to use dynamic timestamps
content = content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/style\\.css)\'\\s*%}"' + r", r""\1?v=11"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/style\\.css)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)
content = content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/methodology\\.css)\'\\s*%}"' + r", r""\1?v=11"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/methodology\\.css)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)
content = content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(js/methodology\\.js)\'\\s*%}"' + r", r""\1?v=1001"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(js/methodology\\.js)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)
# Make sure to catch quiz_engine and quiz_db if they use static tags, though they probably use normal script tags.
# Let's add a generic regex for JS files in methodology.html
generic_js_cache_replace = """
    # Dynamic cache busters
    import time
    timestamp = int(time.time())
    html = re.sub(r"{%\\s*static\\s*'main/(css/style\\.css)'\\s*%}", fr"\\1?v={timestamp}", html)
    html = re.sub(r"{%\\s*static\\s*'main/(css/methodology\\.css)'\\s*%}", fr"\\1?v={timestamp}", html)
    html = re.sub(r"{%\\s*static\\s*'main/(js/methodology\\.js)'\\s*%}", fr"\\1?v={timestamp}", html)
    
    # Also add cache busters to standard src= tags if they exist
    html = re.sub(r'src="js/quiz_engine\\.js"', fr'src="js/quiz_engine.js?v={timestamp}"', html)
    html = re.sub(r'src="js/quiz_db\\.js"', fr'src="js/quiz_db.js?v={timestamp}"', html)
"""

content = re.sub(r"    html = re.sub.*?r\"\\1\?v=1001\", html\)", generic_js_cache_replace.strip(), content, flags=re.DOTALL)

# 2. Add quiz JS syncing
sync_quiz_js = """
    # Sync JS
    with open(js_src, 'r', encoding='utf-8') as f:
        js = f.read()
    with open(js_dst, 'w', encoding='utf-8') as f:
        f.write(js)
        
    # Sync Quiz JS
    quiz_engine_src = r"d:\abdo_portfolio\main\static\main\js\quiz_engine.js"
    quiz_db_src = r"d:\abdo_portfolio\main\static\main\js\quiz_db.js"
    quiz_engine_dst = r"d:\abdo_portfolio\build\js\quiz_engine.js"
    quiz_db_dst = r"d:\abdo_portfolio\build\js\quiz_db.js"
    
    if os.path.exists(quiz_engine_src):
        shutil.copy2(quiz_engine_src, quiz_engine_dst)
    if os.path.exists(quiz_db_src):
        shutil.copy2(quiz_db_src, quiz_db_dst)
"""
content = re.sub(r"    # Sync JS.*?(?=    # Sync CSS)", sync_quiz_js, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated sync_to_build.py with dynamic cache busting and quiz JS syncing")
