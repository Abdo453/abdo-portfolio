import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar items for Module 1 and 2
sidebar_items = '''
        <div class="meth-item" id="meth-ef-mod1" onclick="openMethPhase('mod1')">
          <span style="font-size: 16px;">🧠</span>
          <span style="flex:1;">Module 1: Intro to Ethical Hacking</span>
        </div>
        <div class="meth-item" id="meth-ef-mod2" onclick="openMethPhase('mod2')">
          <span style="font-size: 16px;">👁️‍🗨️</span>
          <span style="flex:1;">Module 2: Footprinting & Recon</span>
        </div>
'''

cat_ceh_idx = html.find('id="cat-ceh"')
if cat_ceh_idx != -1:
    insert_idx = html.find('>', cat_ceh_idx) + 1
    html = html[:insert_idx] + sidebar_items + html[insert_idx:]

# 2. Add the includes
viewer_idx = html.find('class="meth-viewer"')
if viewer_idx != -1:
    insert_idx2 = html.find('>', viewer_idx) + 1
    include_str = '''
      {% include 'main/modules/mod1_intro.html' %}
      {% include 'main/modules/mod2_footprinting.html' %}
'''
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Injected Mod1 and Mod2 into methodology.html")
