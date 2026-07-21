import re
import sys

def process_file(filepath):
    try:
        content = open(filepath, encoding='utf-8', errors='ignore').read()
    except Exception as e:
        print(f'Error reading {filepath}: {e}')
        return

    def replacer(m):
        cls = m.group(1)
        tab = m.group(2)
        inner = m.group(3)
        if tab == 'dashboard':
            return m.group(0)
        return f'<a class="{cls}" href="index.html#{tab}" target="_blank" data-tab="{tab}">{inner}</a>'

    content, count = re.subn(r'<button class="(tab-link.*?)" onclick="switchTab\(\'([a-z]+)\'\)" data-tab="\2">(.*?)</button>', replacer, content, flags=re.DOTALL)
    print(f'Replaced {count} tab-link buttons in {filepath}')

    def replacer_bottom(m):
        cls = m.group(1)
        tab = m.group(2)
        aria = m.group(3)
        if tab == 'dashboard':
            return m.group(0)
        # bottom-nav-item usually doesn't have inner text but may have an icon, wait, I didn't capture inner in the regex.
        # Let's fix the regex to capture inner content.
        inner = m.group(4)
        return f'<a class="{cls}" href="index.html#{tab}" target="_blank" data-bottom-tab="{tab}" {aria}>{inner}</a>'

    content, count2 = re.subn(r'<button class="(bottom-nav-item.*?)" onclick="switchTab\(\'([a-z]+)\'\)" data-bottom-tab="\2" (aria-label=".*?")>(.*?)</button>', replacer_bottom, content, flags=re.DOTALL)
    print(f'Replaced {count2} bottom-nav-item buttons in {filepath}')
    
    open(filepath, 'w', encoding='utf-8').write(content)

process_file(r'd:\abdo_portfolio\build\index.html')
process_file(r'd:\abdo_portfolio\build\temp_original.html')
