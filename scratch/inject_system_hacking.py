import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar item for System Hacking under CEH Category
# The CEH category starts at: <div class="category-title" onclick="toggleCategory('cat-ceh')">
sidebar_item = '''
        <div class="meth-item" id="meth-ef-sys-hack" onclick="openMethPhase('sys-hack')">
          <span style="font-size: 16px;">💻</span>
          <span style="flex:1;">System Hacking (Deep Dive)</span>
        </div>
'''

# Find the end of cat-ceh div
cat_ceh_idx = html.find('id="cat-ceh"')
if cat_ceh_idx != -1:
    # insert after the first item or at the top of the category
    insert_idx = html.find('>', cat_ceh_idx) + 1
    html = html[:insert_idx] + sidebar_item + html[insert_idx:]

# 2. Add the include statement inside meth-viewer
# Find the end of recon_subdomain include or the start of meth-viewer
viewer_idx = html.find('class="meth-viewer"')
if viewer_idx != -1:
    # find the end of the opening div tag
    insert_idx2 = html.find('>', viewer_idx) + 1
    include_str = "\n      {% include 'main/modules/system_hacking.html' %}\n"
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("System Hacking successfully injected into methodology.html")
