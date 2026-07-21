import re

with open(r'd:\abdo_portfolio\build\css\style.css', encoding='utf-8', errors='ignore') as f:
    css = f.read()

classes_to_check = ['.explorer-layout', '.articles-grid', '.books-grid', '.research-hub-container', '.lab-grid', '.dashboard-hero']
for cls in classes_to_check:
    print(f'\n--- {cls} ---')
    escaped_cls = cls.replace(".", "\\.")
    matches = re.findall(f'{escaped_cls}\\s*{{([^}}]*)}}', css)
    for m in matches:
        print(m.strip())
