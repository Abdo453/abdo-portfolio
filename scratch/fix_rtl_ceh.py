import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Isolate the CEH section
match = re.search(r'(<!-- CEH Module 8: Sniffing -->.*)', content, re.DOTALL)
if match:
    ceh_section = match.group(1)
    
    # Add dir="rtl" to cyber-card
    ceh_section = ceh_section.replace('class="cyber-card"', 'class="cyber-card" dir="rtl" style="text-align: right;"')
    
    # Add dir="rtl" to info-boxes
    ceh_section = ceh_section.replace('class="info-box what"', 'class="info-box what" dir="rtl" style="text-align: right;"')
    ceh_section = ceh_section.replace('class="info-box goal"', 'class="info-box goal" dir="rtl" style="text-align: right;"')

    # Add dir="rtl" to phase-module-header texts
    ceh_section = ceh_section.replace('class="phase-module-title"', 'class="phase-module-title" dir="rtl"')
    ceh_section = ceh_section.replace('class="phase-module-tagline"', 'class="phase-module-tagline" dir="rtl"')

    # For lists that might be mixed, dir="rtl" on cyber-card handles it, 
    # but we should make sure cmd-block is ltr so commands don't get flipped!
    ceh_section = ceh_section.replace('class="cmd-block"', 'class="cmd-block" dir="ltr" style="text-align: left;"')

    # Replace the section in the original content
    new_content = content[:match.start(1)] + ceh_section
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("RTL attributes added to CEH section successfully.")
else:
    print("CEH section not found!")
