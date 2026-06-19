import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

emojis = ['📂', '📜', '🧬', '🕸️', '🎛️', '🕷️', '💻', '🔍', '⚙️', '🛡️', '🔑', '🚀', '📡', '🔌']

def replace_list(match):
    list_content = match.group(1)
    items = re.findall(r'<li>(.*?)</li>', list_content, re.DOTALL)
    if not items:
        return match.group(0)
    
    new_html = '<div class="tree-container" style="font-family: \'Fira Code\', monospace; margin-bottom: 20px; direction: ltr; text-align: left; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; border-left: 2px solid #a8b2d1;">\n'
    
    for i, item in enumerate(items):
        prefix = '└── ' if i == len(items) - 1 else '├── '
        emoji = emojis[i % len(emojis)]
        
        # In case the first item should just be ├── or ── ? The user example:
        # ── 📂 Directory Discovery
        # ├── 📜 JavaScript Recon
        if i == 0:
            prefix = '├── '
            
        new_html += f'  <div style="margin-bottom: 12px; display: flex; align-items: flex-start; color: #a8b2d1;">\n'
        new_html += f'    <span style="white-space: pre; margin-right: 10px;">{prefix}{emoji}</span>\n'
        new_html += f'    <span dir="rtl" style="font-family: \'Inter\', sans-serif; color: #e2e8f0; text-align: right; flex: 1;">{item.strip()}</span>\n'
        new_html += f'  </div>\n'
        
    new_html += '</div>'
    return new_html

match_ceh = re.search(r'(<!-- CEH Module 8: Sniffing -->.*)(<!-- Popup Modal structure)', content, re.DOTALL)
if match_ceh:
    ceh_section = match_ceh.group(1)
    new_ceh_section = re.sub(r'<ul>(.*?)</ul>', replace_list, ceh_section, flags=re.DOTALL)
    
    new_content = content[:match_ceh.start(1)] + new_ceh_section + match_ceh.group(2) + content[match_ceh.end(2):]
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Tree formatting applied to CEH modules successfully.")
else:
    print("CEH section not found")
