import re

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

m = re.search(r'id:\s*[\'"]route_static[\'"](.*?)\}', code, re.DOTALL)
if m:
    with open(r'D:\abdo_portfolio\scratch\route_static_dump.html', 'w', encoding='utf-8') as out:
        out.write(m.group(1))
    print("Dumped successfully.")
