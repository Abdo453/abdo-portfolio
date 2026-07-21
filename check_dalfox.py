import re
content = open(r'd:\abdo_portfolio\build\index.html', encoding='utf-8', errors='ignore').read()
start_idx = content.find('id="tool-detail-dalfox"')
if start_idx != -1:
    end_idx = content.find('id="tool-detail-', start_idx + 10)
    if end_idx == -1: end_idx = start_idx + 3000
    print(content[start_idx:start_idx+1500])
else:
    print('Not found')
