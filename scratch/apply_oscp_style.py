import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Target only the CEH section
match_ceh = re.search(r'(<!-- CEH Module 8: Sniffing -->.*)(<!-- Popup Modal structure)', content, re.DOTALL)
if match_ceh:
    ceh_section = match_ceh.group(1)
    
    # Replace phase-module-header with cyber-hero
    ceh_section = re.sub(
        r'<div class="phase-module-header">\s*<div class="phase-module-icon">(.*?)</div>\s*<div class="phase-module-meta">\s*<h1 class="phase-module-title">(.*?)</h1>\s*<p class="phase-module-tagline">(.*?)</p>\s*<div class="phase-meta-badges">(.*?)</div>\s*</div>\s*</div>',
        r'<div class="cyber-hero">\n  <h2 class="hero-title"><span class="hero-icon">\1</span> \2</h2>\n  <p class="hero-tagline">\3</p>\n  <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">\4</div>\n</div>',
        ceh_section,
        flags=re.DOTALL
    )

    # Replace tools-table with interactive-table
    ceh_section = re.sub(
        r'<table class="tools-table">',
        r'<div class="table-wrapper"><table class="interactive-table">',
        ceh_section
    )
    # The end of the table needs a closing div for the table-wrapper
    ceh_section = re.sub(
        r'</table>',
        r'</table></div>',
        ceh_section
    )

    new_content = content[:match_ceh.start(1)] + ceh_section + match_ceh.group(2) + content[match_ceh.end(2):]
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("CEH modules successfully styled like OSCP modules.")
else:
    print("CEH section not found")
