import re

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

m = re.search(r'chapter:\s*\"Domain 2: Network Access(.*?)\}', code, re.DOTALL)
if m:
    with open(r'D:\abdo_portfolio\scratch\domain2_snippet.txt', 'w', encoding='utf-8') as out:
        out.write(m.group(0)[:1000])
