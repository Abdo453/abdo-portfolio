import re

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. We need to find the injected oscp_content and mcsa_content and remove them.
# The injected content starts with "      <!-- Phase: OSCP PEN-200 -->"
# And ends before "      <!-- Category 6: Mobile & Advanced API -->"

start_marker = "      <!-- Phase: OSCP PEN-200 -->"
end_marker = "      <!-- Category 6: Mobile & Advanced API -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
    extracted_content = html[start_idx:end_idx]
    # Remove it from there
    html = html[:start_idx] + html[end_idx:]
    print("Extracted content from sidebar successfully.")
    
    # Now we need to inject it into the meth-viewer.
    # A good place is right before "      <!-- Phase 0: Subdomain Enumeration"
    # or before "      <!-- Phase: Android Reversing -->" inside the meth-viewer.
    target_marker = "      <!-- Phase: Android Reversing -->"
    target_idx = html.find(target_marker)
    
    if target_idx != -1:
        # Check if the extracted content is already there
        if html.find(start_marker, target_idx) == -1:
            html = html[:target_idx] + extracted_content + html[target_idx:]
            print("Injected content into meth-viewer successfully.")
        else:
            print("Content already in meth-viewer?")
    else:
        print("ERROR: target_marker not found in meth-viewer.")
else:
    print("ERROR: Could not find start or end markers for extraction.")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
