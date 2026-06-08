import os
import re

FILES = [
    r"D:\abdo_portfolio\main\static\main\css\style.css",
    r"D:\abdo_portfolio\main\static\main\css\academy.css",
    r"D:\abdo_portfolio\main\templates\main\methodology.html"
]

def fix_performance(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} - not found.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    original = content
    
    # 1. Remove backdrop-filter lines for blurs used on cards
    content = re.sub(r'^\s*backdrop-filter:\s*blur\((16px|12px|8px)\)[^;]*;\n?', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*-webkit-backdrop-filter:\s*blur\((16px|12px|8px)\)[^;]*;\n?', '', content, flags=re.MULTILINE)
    
    # Keep the meth-header and sidebar blur (which are 20px)
    
    # 2. Increase opacity of translucent backgrounds to compensate for lack of blur
    # e.g., rgba(5, 5, 12, 0.65) -> rgba(5, 5, 12, 0.9)
    content = content.replace("rgba(5, 5, 12, 0.65)", "rgba(5, 5, 12, 0.9)")
    content = content.replace("rgba(8, 8, 18, 0.55)", "rgba(8, 8, 18, 0.9)")
    content = content.replace("rgba(10, 10, 24, 0.45)", "rgba(10, 10, 24, 0.85)")
    content = content.replace("rgba(10, 10, 24, 0.5)", "rgba(10, 10, 24, 0.85)")
    content = content.replace("rgba(8, 8, 20, 0.45)", "rgba(8, 8, 20, 0.85)")
    content = content.replace("rgba(3, 3, 8, 0.6)", "rgba(3, 3, 8, 0.9)")
    content = content.replace("rgba(10, 10, 24, 0.6)", "rgba(10, 10, 24, 0.85)")
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed performance issues in {os.path.basename(filepath)}")
    else:
        print(f"No changes needed for {os.path.basename(filepath)}")

for file in FILES:
    fix_performance(file)
