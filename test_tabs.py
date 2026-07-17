import re
text = open(r'd:\abdo_portfolio\build\index.html', encoding='utf-8', errors='ignore').read()
f=open('out.txt', 'w', encoding='utf-8')
for m in re.findall(r'<a.*?class="tab-link.*?>.*?</a>', text, re.DOTALL): f.write(m + '\n')
for m in re.findall(r'<button.*?class="tab-link.*?>.*?</button>', text, re.DOTALL): f.write(m + '\n')
f.close()
