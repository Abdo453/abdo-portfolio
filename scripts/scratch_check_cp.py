import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

filepath = 'main/templates/main/home.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'const commandPaletteItems = \[', text)
if match:
    idx = match.start()
    line_num = text[:idx].count('\n') + 1
    print(f"commandPaletteItems starts at line {line_num}")
    lines = text.split('\n')
    for i in range(max(0, line_num-2), min(len(lines), line_num+25)):
        print(f"{i+1}: {lines[i]}")
else:
    print("commandPaletteItems NOT FOUND")
