import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar items for Module 16 to 20
sidebar_items = '''
        <div class="meth-item" id="meth-ef-mod16" onclick="openMethPhase('mod16')">
          <span style="font-size: 16px;">📶</span>
          <span style="flex:1;">Module 16: Wireless Networks</span>
        </div>
        <div class="meth-item" id="meth-ef-mod17" onclick="openMethPhase('mod17')">
          <span style="font-size: 16px;">📱</span>
          <span style="flex:1;">Module 17: Mobile Platforms</span>
        </div>
        <div class="meth-item" id="meth-ef-mod18" onclick="openMethPhase('mod18')">
          <span style="font-size: 16px;">🏭</span>
          <span style="flex:1;">Module 18: IoT & OT Hacking</span>
        </div>
        <div class="meth-item" id="meth-ef-mod19" onclick="openMethPhase('mod19')">
          <span style="font-size: 16px;">☁️</span>
          <span style="flex:1;">Module 19: Cloud Computing</span>
        </div>
        <div class="meth-item" id="meth-ef-mod20" onclick="openMethPhase('mod20')">
          <span style="font-size: 16px;">🔐</span>
          <span style="flex:1;">Module 20: Cryptography</span>
        </div>
'''

mod15_idx = html.find('openMethPhase(\'mod15\')')
if mod15_idx != -1:
    end_div_idx = html.find('</div>', mod15_idx) + 6
    html = html[:end_div_idx] + sidebar_items + html[end_div_idx:]

# 2. Add the includes inside meth-viewer
mod15_inc_idx = html.find("{% include 'main/modules/mod15_sqli.html' %}")
if mod15_inc_idx != -1:
    insert_idx2 = mod15_inc_idx + len("{% include 'main/modules/mod15_sqli.html' %}")
    include_str = '''
      {% include 'main/modules/mod16_wireless.html' %}
      {% include 'main/modules/mod17_mobile.html' %}
      {% include 'main/modules/mod18_iot_ot.html' %}
      {% include 'main/modules/mod19_cloud.html' %}
      {% include 'main/modules/mod20_cryptography.html' %}
'''
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Injected Modules 16 to 20 into methodology.html")
