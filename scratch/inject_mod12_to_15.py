import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add sidebar items for Module 12 to 15
sidebar_items = '''
        <div class="meth-item" id="meth-ef-mod12" onclick="openMethPhase('mod12')">
          <span style="font-size: 16px;">🥷</span>
          <span style="flex:1;">Module 12: Evading IDS & Firewalls</span>
        </div>
        <div class="meth-item" id="meth-ef-mod13" onclick="openMethPhase('mod13')">
          <span style="font-size: 16px;">🖥️</span>
          <span style="flex:1;">Module 13: Web Servers</span>
        </div>
        <div class="meth-item" id="meth-ef-mod14" onclick="openMethPhase('mod14')">
          <span style="font-size: 16px;">🌐</span>
          <span style="flex:1;">Module 14: Web Applications</span>
        </div>
        <div class="meth-item" id="meth-ef-mod15" onclick="openMethPhase('mod15')">
          <span style="font-size: 16px;">💉</span>
          <span style="flex:1;">Module 15: SQL Injection</span>
        </div>
'''

mod11_idx = html.find('openMethPhase(\'mod11\')')
if mod11_idx != -1:
    end_div_idx = html.find('</div>', mod11_idx) + 6
    html = html[:end_div_idx] + sidebar_items + html[end_div_idx:]

# 2. Add the includes inside meth-viewer
mod11_inc_idx = html.find("{% include 'main/modules/mod11_session_hijacking.html' %}")
if mod11_inc_idx != -1:
    insert_idx2 = mod11_inc_idx + len("{% include 'main/modules/mod11_session_hijacking.html' %}")
    include_str = '''
      {% include 'main/modules/mod12_evasion.html' %}
      {% include 'main/modules/mod13_web_servers.html' %}
      {% include 'main/modules/mod14_web_apps.html' %}
      {% include 'main/modules/mod15_sqli.html' %}
'''
    html = html[:insert_idx2] + include_str + html[insert_idx2:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Injected Modules 12 to 15 into methodology.html")
