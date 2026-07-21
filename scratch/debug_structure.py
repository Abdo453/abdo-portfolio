content = open('build/methodology.html', 'r', encoding='utf-8').read()
import re

# Find the meth-viewer div and see what's inside it
idx = content.find('class="meth-viewer"')
if idx > 0:
    snippet = content[idx:idx+300]
    print('meth-viewer start:', repr(snippet))
    
# Find meth-container
idx2 = content.find('class="meth-container"')
if idx2 > 0:
    snippet2 = content[idx2:idx2+300]
    print('meth-container start:', repr(snippet2))

# Check if meth-content-view elements are direct children of meth-container or meth-viewer
idx3 = content.find('id="meth-content-mod2"')
if idx3 > 0:
    before = content[idx3-200:idx3]
    print('Before mod2:', repr(before[-150:]))
