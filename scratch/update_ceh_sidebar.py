import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# I will add headers for the 5 Phases inside the CEH category.

phase1_label = '<div style="padding-left:15px; color:#00e5a0; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 1: INFO GATHERING</div>\n'
html = html.replace('<div class="meth-item" id="meth-ef-mod1"', phase1_label + '        <div class="meth-item" id="meth-ef-mod1"')

phase2_label = '<div style="padding-left:15px; color:#00e5a0; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 2: SCAN & ENUM</div>\n'
html = html.replace('<div class="meth-item" id="meth-ef-mod3"', phase2_label + '        <div class="meth-item" id="meth-ef-mod3"')

phase3_label = '<div style="padding-left:15px; color:#00e5a0; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 3: GAINING ACCESS</div>\n'
html = html.replace('<div class="meth-item" id="meth-ef-sys-hack"', phase3_label + '        <div class="meth-item" id="meth-ef-sys-hack"')

phase4_label = '<div style="padding-left:15px; color:#00e5a0; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 4: EVASION & WEB</div>\n'
html = html.replace('<div class="meth-item" id="meth-ef-mod12"', phase4_label + '        <div class="meth-item" id="meth-ef-mod12"')

phase5_label = '<div style="padding-left:15px; color:#00e5a0; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 5: ADVANCED</div>\n'
html = html.replace('<div class="meth-item" id="meth-ef-mod16"', phase5_label + '        <div class="meth-item" id="meth-ef-mod16"')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Added Phases to CEH sidebar")
