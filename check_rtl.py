import re
css = open(r'd:\abdo_portfolio\build\css\style.css', encoding='utf-8', errors='ignore').read()
matches = re.findall(r'(\.[^{]+)\s*{[^}]*direction\s*:\s*rtl', css)
with open(r'd:\abdo_portfolio\rtl_check.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(set(matches)))
