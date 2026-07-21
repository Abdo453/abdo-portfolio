import re
import os

build_dir = r'd:\abdo_portfolio\build'
html_path = os.path.join(build_dir, 'index.html')

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

start_idx = content.find('<aside class="sidebar-dashboard">')
end_idx = content.find('</aside>', start_idx) + len('</aside>')

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + content[end_idx:]
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Removed sidebar-dashboard from index.html')
else:
    print('Could not find sidebar-dashboard bounds')

# 2. Modify style.css
css_path = os.path.join(build_dir, r'css\style.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('grid-template-columns: 360px 1fr;', 'grid-template-columns: 1fr;')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated grid layout in style.css')
