filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio_github\index.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

import re
stack = []
lines = content.split('\n')
for i, line in enumerate(lines):
    for match in re.finditer(r'<div|</div', line):
        tag = match.group()
        if tag == '<div':
            stack.append((i + 1, line.strip()[:50]))
        elif tag == '</div':
            if stack:
                stack.pop()
            else:
                print(f"Extra closing div on line {i + 1}")

if stack:
    print(f"Unclosed open divs:")
    for item in stack:
        print(f"Line {item[0]}: {item[1]}")
