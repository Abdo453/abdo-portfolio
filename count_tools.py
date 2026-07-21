import re
content = open(r'd:\abdo_portfolio\build\index.html', encoding='utf-8', errors='ignore').read()
matches = re.findall(r'id=\"content-([a-zA-Z0-9_-]+)\"', content)
print(f'Total tools found: {len(matches)}')
print(matches[:10])
