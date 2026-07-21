import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar items for Module 7 to 11
sidebar_items = '''
        <div class="meth-item" id="meth-ef-mod7" onclick="openMethPhase('mod7')">
          <span style="font-size: 16px;">🦠</span>
          <span style="flex:1;">Module 7: Malware Threats</span>
        </div>
        <div class="meth-item" id="meth-ef-mod8" onclick="openMethPhase('mod8')">
          <span style="font-size: 16px;">🎧</span>
          <span style="flex:1;">Module 8: Sniffing</span>
        </div>
        <div class="meth-item" id="meth-ef-mod9" onclick="openMethPhase('mod9')">
          <span style="font-size: 16px;">🎭</span>
          <span style="flex:1;">Module 9: Social Engineering</span>
        </div>
        <div class="meth-item" id="meth-ef-mod10" onclick="openMethPhase('mod10')">
          <span style="font-size: 16px;">🛑</span>
          <span style="flex:1;">Module 10: DoS/DDoS</span>
        </div>
        <div class="meth-item" id="meth-ef-mod11" onclick="openMethPhase('mod11')">
          <span style="font-size: 16px;">🔓</span>
          <span style="flex:1;">Module 11: Session Hijacking</span>
        </div>
'''

syshack_idx = html.find('openMethPhase(\'sys-hack\')')
if syshack_idx != -1:
    end_div_idx = html.find('</div>', syshack_idx) + 6
    html = html[:end_div_idx] + sidebar_items + html[end_div_idx:]

# 2. Add the includes inside meth-viewer
syshack_inc_idx = html.find("{% include 'main/modules/system_hacking.html' %}")
if syshack_inc_idx != -1:
    insert_idx2 = syshack_inc_idx + len("{% include 'main/modules/system_hacking.html' %}")
    include_str = '''
      {% include 'main/modules/mod7_malware.html' %}
      {% include 'main/modules/mod8_sniffing.html' %}
      {% include 'main/modules/mod9_social_eng.html' %}
      {% include 'main/modules/mod10_dos.html' %}
      {% include 'main/modules/mod11_session_hijacking.html' %}
'''
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Injected Modules 7 to 11 into methodology.html")
