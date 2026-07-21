import re

# The sync script does basic Django template replacement but might miss some things.
# Let's manually force-copy and then fix the Django template tags.

html_src = r"d:\abdo_portfolio\main\templates\main\methodology.html"
html_dst = r"d:\abdo_portfolio\build\methodology.html"

with open(html_src, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove Django load static
html = html.replace('{% load static %}', '')

# Replace static file references
html = re.sub(r"\{%\s*static\s*'main/css/style\.css'\s*%\}", r"css/style.css?v=11", html)
html = re.sub(r"\{%\s*static\s*'main/css/methodology\.css'\s*%\}", r"css/methodology.css?v=11", html)
html = re.sub(r"\{%\s*static\s*'main/js/methodology\.js'\s*%\}", r"js/methodology.js?v=1001", html)

# Replace Django template tags for Jinja-like syntax
html = html.replace('{% templatetag openvariable %}', '{{')
html = html.replace('{% templatetag closevariable %}', '}}')

with open(html_dst, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Force-synced! Build size: {len(html)} chars")

# Verify key content
checks = ['OSCP', 'Buffer Overflow', 'MCSA', 'Operation Red Forest', 'RHCSA', 'flashcard', 'Maltego', 'IDS/Firewall Evasion']
for c in checks:
    found = c in html
    print(f"  [{'OK' if found else 'MISSING'}] {c}")
