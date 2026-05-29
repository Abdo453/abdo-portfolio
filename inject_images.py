import os
import re

# 1. Image Mapping (paths relative to static main/images)
tool_images = {
    'subfinder': ['category_recon.png'],
    'amass': ['tool_amass_1.png', 'tool_amass_2.png'],
    'assetfinder': ['category_recon.png'],
    'chaos': ['category_recon.png'],
    'katana': ['tool_katana_1.png', 'tool_katana_2.png'],
    'hakrawler': ['category_crawling.png'],
    'gospider': ['category_crawling.png'],
    'gau': ['tool_gau_1.png', 'tool_gau_2.png', 'tool_gau_3.png'],
    'waybackurls': ['category_historical.png'],
    'waymore': ['category_historical.png'],
    'ffuf': ['tool_dir_1.png', 'tool_dir_2.png'],
    'feroxbuster': ['tool_dir_1.png', 'tool_dir_2.png'],
    'gobuster': ['tool_dir_1.png', 'tool_dir_2.png'],
    'dirsearch': ['tool_dir_1.png', 'tool_dir_2.png'],
    'arjun': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'],
    'paramspider': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'],
    'linkfinder': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'],
    'secretfinder': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'],
    'nuclei': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
    'dalfox': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
    'sqlmap': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
}

# Paths
views_path = r"D:\abdo_portfolio\main\views.py"
html_path = r"D:\abdo_portfolio\main\templates\main\home.html"
css_path = r"D:\abdo_portfolio\main\static\main\css\style.css"

# Update views.py (add 'images' field)
print("Updating views.py...")
with open(views_path, 'r', encoding='utf-8') as f:
    views_code = f.read()

for tool_id, imgs in tool_images.items():
    pattern = rf"'\s*id\s*'\s*:\s*'\s*{tool_id}\s*'\s*,"
    replacement = f"'id': '{tool_id}', 'images': {imgs},"
    views_code = re.sub(pattern, replacement, views_code)

with open(views_path, 'w', encoding='utf-8') as f:
    f.write(views_code)
print("views.py updated successfully.")

# Update home.html (inject images)
print("Updating home.html...")
with open(html_path, 'r', encoding='utf-8') as f:
    html_code = f.read()

# To avoid duplicate injections, let's first check if we already have tool-graphic-card in home.html
if "tool-graphic-card" in html_code:
    print("Warning: tool-graphic-card already found in home.html. Stripping it first.")
    # Strip any existing tool-graphic-card blocks first
    html_code = re.sub(r'\s*<div class="cyber-card tool-graphic-card">.*?</div>\s*</div>', '\n                    </div>', html_code, flags=re.DOTALL)

for tool_id, imgs in tool_images.items():
    # Build raw static paths for each image
    imgs_html = ""
    for img in imgs:
        imgs_html += f'\n                        <img src="/static/main/images/tools/{img}" class="tool-graphic-img" alt="{tool_id} graphic" />'
        
    injection = f"""
                    <div class="cyber-card tool-graphic-card">
                      <div class="tool-image-gallery">{imgs_html}
                      </div>
                    </div>"""
    
    # We find '<div class="tab-pane active" id="tab-overview-[tool_id]">'
    pattern = rf'(<div class="tab-pane active" id="tab-overview-{tool_id}">)'
    replacement = rf'\1{injection}'
    html_code = re.sub(pattern, replacement, html_code)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_code)
print("home.html updated successfully.")

# Add CSS rules to style.css
print("Updating style.css...")
with open(css_path, 'r', encoding='utf-8') as f:
    css_code = f.read()

css_rules = """
/* ── Tool Graphic Cards inside Academy ── */
.tool-graphic-card {
  padding: 15px;
  background: rgba(3, 3, 8, 0.6);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 25px;
  text-align: center;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0, 229, 255, 0.05);
}
.tool-image-gallery {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.tool-graphic-img {
  max-width: 100%;
  max-height: 220px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease;
  object-fit: contain;
}
.tool-graphic-img:hover {
  transform: translateY(-5px) scale(1.04);
  box-shadow: 0 12px 30px rgba(0, 229, 255, 0.25);
  border-color: rgba(0, 229, 255, 0.4);
}
"""

if ".tool-graphic-card" not in css_code:
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write(css_rules)
    print("style.css updated successfully.")
else:
    print("style.css already contains the tool graphic card rules.")

print("All injections complete.")
