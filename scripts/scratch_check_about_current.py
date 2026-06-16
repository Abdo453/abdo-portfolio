import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

filepath = 'main/templates/main/home.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'id="pane-about"', text)
if match:
    idx = match.start()
    line_num = text[:idx].count('\n') + 1
    print(f"pane-about starts at line {line_num}")
    lines = text.split('\n')
    for i in range(max(0, line_num-5), min(len(lines), line_num+10)):
        print(f"{i+1}: {lines[i]}")
else:
    print("pane-about NOT FOUND")
