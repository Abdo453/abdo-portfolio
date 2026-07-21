file_path = r"d:\abdo_portfolio\scratch\sync_to_build.py"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_content = content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/style\\.css)\'\\s*%}"' + r", r""\1?v=11"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/style\\.css)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)
new_content = new_content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/methodology\\.css)\'\\s*%}"' + r", r""\1?v=11"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(css/methodology\\.css)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)
new_content = new_content.replace(
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(js/methodology\\.js)\'\\s*%}"' + r", r""\1?v=1001"", html)",
    r"html = re.sub(r" + '"{%\\s*static\\s*\'main/(js/methodology\\.js)\'\\s*%}"' + r", fr""\1?v={int(time.time())}"", html)"
)

# Replace the specific block of Sync JS with the one that includes quiz JS
import re
new_sync_js = """
    # Sync JS
    with open(js_src, 'r', encoding='utf-8') as f:
        js = f.read()
    with open(js_dst, 'w', encoding='utf-8') as f:
        f.write(js)
        
    import shutil
    import os
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

new_content = re.sub(r"    # Sync JS.*?(?=    # Sync CSS)", new_sync_js, new_content, flags=re.DOTALL)

# Add import time at the top
if "import time" not in new_content:
    new_content = "import time\n" + new_content

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated sync script successfully")
