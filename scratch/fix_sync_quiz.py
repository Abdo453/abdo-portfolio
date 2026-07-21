import re

file_path = r"d:\abdo_portfolio\scratch\sync_to_build.py"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# I want to add the quiz_engine and quiz_db replacement rules right after methodology.js
replacement_rules = r"""    html = re.sub(r"{%\s*static\s*'main/(css/style\.css)'\s*%}", fr"\\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(css/methodology\.css)'\s*%}", fr"\\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/methodology\.js)'\s*%}", fr"\\1?v={timestamp}", html)
    
    # Also resolve quiz scripts
    html = re.sub(r"{%\s*static\s*'main/(js/quiz_engine\.js)'\s*%}", fr"\\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/quiz_db\.js)'\s*%}", fr"\\1?v={timestamp}", html)
"""

# Replace the block
content = re.sub(
    r"    html = re.sub\(r\"\{%\\s\*static\\s\*'main/\(css/style\\\.css\)'\\s\*%}\".*?html\)",
    replacement_rules.strip(),
    content,
    flags=re.DOTALL
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated sync_to_build.py to resolve quiz_engine.js static tags")
