content = open('build/methodology.html', 'r', encoding='utf-8').read()
import re
divs = re.findall(r'id="meth-content-([^"]+)"', content)
print('All meth-content IDs found:')
for d in divs:
    print(' -', d)
