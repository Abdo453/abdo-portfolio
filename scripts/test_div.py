filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\templates\main\home.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('<main class="content-workspace">')
end = content.find('id="pane-academy"')
sub = content[start:end]

open_d = sub.count('<div')
close_d = sub.count('</div')

print(f"Between main and pane-academy: open={open_d}, close={close_d}")
