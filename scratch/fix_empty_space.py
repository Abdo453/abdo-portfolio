import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

# --- 1. Update CSS ---
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Sidebar: top: 0
css = re.sub(r'(\.meth-sidebar\s*\{[^}]*?)top:\s*60px;', r'\1top: 0;', css)

# Header: left: 260px, width: calc(100% - 260px)
css = re.sub(r'(\.meth-header\s*\{[^}]*?)left:\s*0;', r'\1left: 260px; width: calc(100% - 260px);', css)

# Viewer padding
css = re.sub(r'(\.meth-viewer\s*\{[^}]*?)padding:\s*40px;', r'\1padding: 24px; padding-top: 16px;', css)

# Hide old hunt dashboard
if ".hunt-dashboard { display: none !important; }" not in css:
    css += "\n.hunt-dashboard { display: none !important; }\n"

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)


# --- 2. Update HTML ---
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Find the logo block
logo_pattern = r'<div class="meth-logo">// <span class="logo-main">OFFENSIVE SECURITY</span><span class="logo-sub"> KNOWLEDGE PLATFORM</span></div>'

if logo_pattern in html:
    # Remove from header
    html = html.replace(logo_pattern, "")
    
    # Insert at the top of the sidebar
    # Find: <div class="meth-sidebar" id="methSidebar">
    sidebar_pattern = r'(<div class="meth-sidebar" id="methSidebar">)'
    
    # Wrap the logo with some padding/margin for the sidebar
    logo_for_sidebar = f'''
          <div class="sidebar-header-logo" style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
            <div class="meth-logo" style="font-size: 14px; letter-spacing: 0.5px;">// <span style="color:#fff;">OFFENSIVE SECURITY</span></div>
            <div style="color:var(--text-secondary); font-size: 10px; letter-spacing: 1px; margin-top: 4px;">KNOWLEDGE PLATFORM</div>
          </div>
'''
    html = re.sub(sidebar_pattern, r'\1' + logo_for_sidebar, html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Empty space fixes applied. Sidebar goes to top, padding reduced, old dashboard hidden.")
