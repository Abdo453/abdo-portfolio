import re

html_path = r"D:\abdo_portfolio\main\templates\main\home.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html_code = f.read()

# Pattern matches the tab-pane start, the graphic card, its closing, and the extra </div>
pattern = r'(<div class="tab-pane active" id="tab-overview-[a-zA-Z0-9_-]+">.*?<div class="cyber-card tool-graphic-card">.*?</div>\s*</div>)\s*</div>'

fixed_code, count = re.subn(pattern, r'\1', html_code, flags=re.DOTALL)
print(f"Fixed {count} instances of premature closing div tag.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(fixed_code)

print("HTML structure fix complete.")
