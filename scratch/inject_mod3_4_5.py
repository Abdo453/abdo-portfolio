import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar items for Module 3, 4, and 5
# I want to insert them right after Mod 2 in the sidebar
sidebar_items = '''
        <div class="meth-item" id="meth-ef-mod3" onclick="openMethPhase('mod3')">
          <span style="font-size: 16px;">📡</span>
          <span style="flex:1;">Module 3: Scanning Networks</span>
        </div>
        <div class="meth-item" id="meth-ef-mod4" onclick="openMethPhase('mod4')">
          <span style="font-size: 16px;">📋</span>
          <span style="flex:1;">Module 4: Enumeration</span>
        </div>
        <div class="meth-item" id="meth-ef-mod5" onclick="openMethPhase('mod5')">
          <span style="font-size: 16px;">🚨</span>
          <span style="flex:1;">Module 5: Vulnerability Analysis</span>
        </div>
'''

mod2_idx = html.find('openMethPhase(\'mod2\')')
if mod2_idx != -1:
    # Find the closing div of Mod2 item
    end_div_idx = html.find('</div>', mod2_idx) + 6
    html = html[:end_div_idx] + sidebar_items + html[end_div_idx:]

# 2. Add the includes inside meth-viewer
mod2_inc_idx = html.find("{% include 'main/modules/mod2_footprinting.html' %}")
if mod2_inc_idx != -1:
    insert_idx2 = mod2_inc_idx + len("{% include 'main/modules/mod2_footprinting.html' %}")
    include_str = '''
      {% include 'main/modules/mod3_scanning.html' %}
      {% include 'main/modules/mod4_enumeration.html' %}
      {% include 'main/modules/mod5_vuln_analysis.html' %}
'''
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Injected Mod3, Mod4, Mod5 into methodology.html")
