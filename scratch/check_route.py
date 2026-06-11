import re

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

m = re.search(r'id:\s*[\'"]route_static[\'"](.*?)\}', code, re.DOTALL)
if m:
    print("Found route_static content snippet:")
    print(m.group(1)[:1000])
else:
    print("route_static NOT FOUND!")
