import re

# 1. Update views.py context structure with image pathing
views_path = r"D:\abdo_portfolio\main\views.py"
with open(views_path, 'r', encoding='utf-8') as f:
    views_code = f.read()

# Let's map tool IDs to their respective image lists
tool_images = {
    'subfinder': ['main/images/tools/category_recon.png'],
    'amass': ['main/images/tools/tool_amass_1.png', 'main/images/tools/tool_amass_2.png'],
    'assetfinder': ['main/images/tools/category_recon.png'],
    'chaos': ['main/images/tools/category_recon.png'],
    'katana': ['main/images/tools/tool_katana_1.png', 'main/images/tools/tool_katana_2.png'],
    'hakrawler': ['main/images/tools/category_crawling.png'],
    'gospider': ['main/images/tools/category_crawling.png'],
    'gau': ['main/images/tools/tool_gau_1.png', 'main/images/tools/tool_gau_2.png', 'main/images/tools/tool_gau_3.png'],
    'waybackurls': ['main/images/tools/category_historical.png'],
    'waymore': ['main/images/tools/category_historical.png'],
    'ffuf': ['main/images/tools/tool_dir_1.png', 'main/images/tools/tool_dir_2.png'],
    'feroxbuster': ['main/images/tools/tool_dir_1.png', 'main/images/tools/tool_dir_2.png'],
    'gobuster': ['main/images/tools/tool_dir_1.png', 'main/images/tools/tool_dir_2.png'],
    'dirsearch': ['main/images/tools/tool_dir_1.png', 'main/images/tools/tool_dir_2.png'],
    'arjun': ['main/images/tools/tool_param_1.png', 'main/images/tools/tool_param_2.png', 'main/images/tools/tool_param_3.png'],
    'paramspider': ['main/images/tools/tool_param_1.png', 'main/images/tools/tool_param_2.png', 'main/images/tools/tool_param_3.png'],
    'linkfinder': ['main/images/tools/tool_js_1.png', 'main/images/tools/tool_js_2.png', 'main/images/tools/tool_js_3.png'],
    'secretfinder': ['main/images/tools/tool_js_1.png', 'main/images/tools/tool_js_2.png', 'main/images/tools/tool_js_3.png'],
    'nuclei': ['main/images/tools/tool_vuln_1.png', 'main/images/tools/tool_vuln_2.png', 'main/images/tools/tool_vuln_3.png'],
    'dalfox': ['main/images/tools/tool_vuln_1.png', 'main/images/tools/tool_vuln_2.png', 'main/images/tools/tool_vuln_3.png'],
    'sqlmap': ['main/images/tools/tool_vuln_1.png', 'main/images/tools/tool_vuln_2.png', 'main/images/tools/tool_vuln_3.png'],
}

# We can parse the views_code, find the tools dictionaries, and inject the images field
for tool_id, imgs in tool_images.items():
    # We want to find the dictionary matching 'id': 'tool_id' and add 'images': imgs
    pattern = rf"'\s*id\s*'\s*:\s*'\s*{tool_id}\s*'\s*,"
    replacement = f"'id': '{tool_id}', 'images': {imgs},"
    views_code = re.sub(pattern, replacement, views_code)

with open(views_path, 'w', encoding='utf-8') as f:
    f.write(views_code)
print("Updated views.py with image paths.")

# 2. Update home.html template to render these images
html_path = r"D:\abdo_portfolio\main\templates\main\home.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html_code = f.read()

# We need to find the TAB: OVERVIEW block in home.html. Let's look for how it's dynamically populated.
# Wait, let's view home.html to see how the tools loop is built! Or is it hardcoded?
# Ah! Let's check lines 880-1429 of home.html. It seems the tools are generated statically via render_static.py,
# but the Django template itself contains loops or is it hardcoded in HTML?
# Let's inspect the Django template.
