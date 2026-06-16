import re
with open('D:\\abdo_portfolio\\build\\python-for-hackers.html', 'r', encoding='utf-8') as f:
    html = f.read()
scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
js = scripts[-1]
with open('D:\\abdo_portfolio\\check_js.js', 'w', encoding='utf-8') as f:
    f.write(js)
