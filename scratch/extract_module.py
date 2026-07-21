import re
import os

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"

if not os.path.exists(modules_dir):
    os.makedirs(modules_dir)

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Extract Phase 0 content
# We need to find <div class="meth-content-view" id="meth-content-p0"...>
# and its corresponding closing tag. We can use string matching.
start_str = '<div class="meth-content-view" id="meth-content-p0"'
start_idx = html.find(start_str)

if start_idx != -1:
    # Find the closing </div> of this block.
    # Since there are many nested divs, we need a simple parsing.
    div_count = 0
    end_idx = -1
    i = start_idx
    while i < len(html):
        if html.startswith('<div', i):
            div_count += 1
            i += 4
        elif html.startswith('</div', i):
            div_count -= 1
            i += 5
            if div_count == 0:
                end_idx = i + 1 # include '>'
                break
        else:
            i += 1

    if end_idx != -1:
        phase0_content = html[start_idx:end_idx]
        
        # Create module file
        module_file_path = os.path.join(modules_dir, "recon_subdomain.html")
        with open(module_file_path, "w", encoding="utf-8") as out:
            out.write(phase0_content)
        
        # Replace in original file
        replacement = "{% include 'main/modules/recon_subdomain.html' %}"
        new_html = html[:start_idx] + replacement + html[end_idx:]
        
        with open(html_path, "w", encoding="utf-8") as out:
            out.write(new_html)
            
        print("Successfully extracted Phase 0 into recon_subdomain.html")
    else:
        print("Failed to find end of Phase 0 div")
else:
    print("Failed to find Phase 0 start")
