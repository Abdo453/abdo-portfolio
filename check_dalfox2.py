import re

content = open(r'd:\abdo_portfolio\build\index.html', encoding='utf-8', errors='ignore').read()
start_idx = content.find('id="content-dalfox"')
if start_idx != -1:
    print(content[start_idx:start_idx+2500])
else:
    print("Not found")
