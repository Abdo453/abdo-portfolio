import codecs
import re

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

# Fix the XSS payload in line 1022 and 1023 without corrupting the string itself
content = content.replace('<script>alert(1)</script>', '<script>alert(1)<\\/script>')

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
    f.write(content)

print('Fixed XSS!')
