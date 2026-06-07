import re

filepath = 'main/templates/main/home.html'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

panes = [
    ('pane-terminal', r'<div class="workspace-pane active" id="pane-terminal">'),
    ('pane-skills', r'<div class="workspace-pane" id="pane-skills">'),
    ('pane-projects', r'<div class="workspace-pane" id="pane-projects">'),
    ('pane-writeups', r'<div class="workspace-pane" id="pane-writeups">'),
    ('pane-certs', r'<div class="workspace-pane" id="pane-certs">'),
    ('pane-contact', r'<div class="workspace-pane" id="pane-contact">'),
    ('pane-academy', r'<div class="workspace-pane" id="pane-academy">'),
    ('pane-bugbounty', r'<div class="workspace-pane" id="pane-bugbounty">')
]

for name, pattern in panes:
    match = re.search(pattern, text)
    if match:
        idx = match.start()
        line_num = text[:idx].count('\n') + 1
        print(f'{name} starts at line {line_num}')
    else:
        print(f'{name} NOT FOUND')
