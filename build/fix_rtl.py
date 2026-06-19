import os

def fix_css(filepath):
    with open(filepath, 'a', encoding='utf-8') as f:
        f.write("\n.terminal-window { direction: ltr !important; text-align: left !important; }\n")
        f.write(".terminal-body { direction: ltr !important; text-align: left !important; }\n")
        f.write(".terminal-header { display: flex; align-items: center; justify-content: space-between; }\n")

fix_css('d:/abdo_portfolio/build/css/methodology.css')
fix_css('d:/abdo_portfolio/build/css/academy.css')
fix_css('d:/abdo_portfolio/build/ccna/style.css')

# Fix methodology.html
meth_path = 'd:/abdo_portfolio/build/methodology.html'
with open(meth_path, 'r', encoding='utf-8') as f:
    meth_content = f.read()

import re
old_overlay = r'<div class="terminal-overlay" id="terminal-overlay">.*?<div class="terminal-body" id="terminal-output"></div>\s*</div>\s*</div>'
new_overlay = """<div class="terminal-overlay" id="terminal-overlay" onclick="if(event.target===this) closeTerminal()">
  <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr;">
    <div class="terminal-header" style="display: flex; align-items: center; width: 100%;">
      <div class="terminal-dots">
        <span class="dot close" onclick="closeTerminal()"></span>
        <span class="dot minimize"></span>
        <span class="dot maximize"></span>
      </div>
      <div class="terminal-title" style="flex-grow: 1; text-align: center;">root@kali:~</div>
      <div style="cursor:pointer; color:#ff4444; font-weight:bold; padding-right:10px; font-family: sans-serif;" onclick="closeTerminal()">✖ Close</div>
    </div>
    <div class="terminal-body" id="terminal-output" dir="ltr" style="text-align: left; direction: ltr;"></div>
  </div>
</div>"""

meth_content = re.sub(old_overlay, new_overlay, meth_content, flags=re.DOTALL)
with open(meth_path, 'w', encoding='utf-8') as f:
    f.write(meth_content)

# Fix academy_sim.js
acad_path = 'd:/abdo_portfolio/build/js/academy_sim.js'
with open(acad_path, 'r', encoding='utf-8') as f:
    acad_content = f.read()

old_overlay_js = r'<div class="terminal-overlay" id="terminal-overlay">.*?<div class="terminal-body" id="terminal-output"></div>\s*</div>\s*</div>'
new_overlay_js = """<div class="terminal-overlay" id="terminal-overlay" onclick="if(event.target===this) closeAcademySim()">
        <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr;">
          <div class="terminal-header" style="display: flex; align-items: center; width: 100%;">
            <div class="terminal-dots">
              <span class="dot close" onclick="closeAcademySim()"></span>
              <span class="dot minimize"></span>
              <span class="dot maximize"></span>
            </div>
            <div class="terminal-title" style="flex-grow: 1; text-align: center;">root@kali:~</div>
            <div style="cursor:pointer; color:#ff4444; font-weight:bold; padding-right:10px; font-family: sans-serif;" onclick="closeAcademySim()">✖ Close</div>
          </div>
          <div class="terminal-body" id="terminal-output" dir="ltr" style="text-align: left; direction: ltr;"></div>
        </div>
      </div>"""

acad_content = re.sub(old_overlay_js, new_overlay_js, acad_content, flags=re.DOTALL)
with open(acad_path, 'w', encoding='utf-8') as f:
    f.write(acad_content)
