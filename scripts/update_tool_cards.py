path_html = r'D:\abdo_portfolio\main\templates\main\methodology.html'
content = open(path_html, encoding='utf-8').read()

replacements = {
    '<div class="tool-card-mini">\n            <div class="tool-name">subfinder</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'subfinder -d target.com\')" style="cursor:pointer">\n            <div class="tool-name">subfinder</div>',
    '<div class="tool-card-mini">\n            <div class="tool-name">amass</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'amass enum -d target.com\')" style="cursor:pointer">\n            <div class="tool-name">amass</div>',
    '<div class="tool-card-mini">\n            <div class="tool-name">assetfinder</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'assetfinder target.com\')" style="cursor:pointer">\n            <div class="tool-name">assetfinder</div>',
    '<div class="tool-card-mini">\n            <div class="tool-name">httpx</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'httpx -l subs.txt\')" style="cursor:pointer">\n            <div class="tool-name">httpx</div>',
    '<div class="tool-card-mini">\n            <div class="tool-name">nuclei</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'nuclei -u target.com\')" style="cursor:pointer">\n            <div class="tool-name">nuclei</div>',
    '<div class="tool-card-mini">\n            <div class="tool-name">naabu</div>': '<div class="tool-card-mini" onclick="triggerTerminalSim(\'naabu -host target.com\')" style="cursor:pointer">\n            <div class="tool-name">naabu</div>'
}

for old, new in replacements.items():
    content = content.replace(old, new)

open(path_html, 'w', encoding='utf-8').write(content)
print('UI Updated')
