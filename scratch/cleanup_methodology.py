import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Remove the old CEH links. 
# They are between <div class="meth-item" id="meth-ef-ceh_sniff"... and the end of the category (</div></div>)
old_ceh_start = html.find('<div class="meth-item" id="meth-ef-ceh_sniff"')
if old_ceh_start != -1:
    old_ceh_end = html.find('</div>\n        </div>\n      </div>\n\n\n      <!-- Category 5: Hacker Scenarios -->', old_ceh_start)
    if old_ceh_end != -1:
        # Just keep the closing tags
        html = html[:old_ceh_start] + html[old_ceh_end:]

# 2. Add data-search and bookmarks to all mod1..mod20 links
def enhance_mod_link(match):
    full_str = match.group(0)
    # Extract id: meth-ef-modX
    id_match = re.search(r'id="([^"]+)"', full_str)
    if not id_match: return full_str
    mod_id = id_match.group(1)
    
    # Extract title text
    title_match = re.search(r'<span style="flex:1;">([^<]+)</span>', full_str)
    if not title_match: return full_str
    title = title_match.group(1).strip()
    
    # If already enhanced, skip
    if 'data-search' in full_str:
        return full_str
        
    # We add data-search, visited-badge and bookmark-btn
    # And make the design identical to the old ones:
    # <span>├── 🕵️</span> <span>M8: Sniffing</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_sniff', '🕵️ M8: Sniffing')">★</button>
    
    icon_match = re.search(r'<span style="font-size: 16px;">([^<]+)</span>', full_str)
    icon = icon_match.group(1) if icon_match else "📚"
    
    # Replace the inner html
    new_inner = f'''
          <span>├── {icon}</span> <span>{title}</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, '{mod_id}', '{icon} {title}')">★</button>
    '''
    # Construct the new outer
    new_outer = f'<div class="meth-item" id="{mod_id}" onclick="openMethPhase(\'{mod_id.replace("meth-ef-", "")}\')" data-search="{title.lower()}">' + new_inner + '</div>'
    return new_outer

# Find all <div class="meth-item" id="meth-ef-modX"...> ... </div>
# using regex
html = re.sub(r'<div class="meth-item" id="meth-ef-mod\d+".*?</div>', enhance_mod_link, html, flags=re.DOTALL)
html = re.sub(r'<div class="meth-item" id="meth-ef-sys-hack".*?</div>', enhance_mod_link, html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Cleaned up old CEH links and enhanced the new Mod links.")
