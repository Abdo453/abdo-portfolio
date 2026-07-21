import re

# Update render_pages.py
rp_path = r'D:\abdo_portfolio\render_pages.py'
with open(rp_path, 'r', encoding='utf-8') as f:
    rp_content = f.read()

new_page = "        ('main/python_for_hackers.html', 'python-for-hackers.html', ''),\n"
if "python-for-hackers" not in rp_content:
    rp_content = rp_content.replace(
        "('main/methodology.html', 'methodology.html', ''),\n",
        "('main/methodology.html', 'methodology.html', ''),\n" + new_page
    )
    with open(rp_path, 'w', encoding='utf-8') as f:
        f.write(rp_content)
        
print("Updated render_pages.py!")

# Update home.html Navbar
home_path = r'D:\abdo_portfolio\main\templates\main\home.html'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

navbar_link = """<li><a href="/methodology.html">Methodology</a></li>"""
new_navbar_link = """<li><a href="/methodology.html">Methodology</a></li>
            <li><a href="/python-for-hackers.html" style="color:var(--neon-purple); border:1px solid var(--neon-purple); padding:2px 8px; border-radius:4px;">Python for Hackers</a></li>"""

if "Python for Hackers" not in home_content:
    if navbar_link in home_content:
        home_content = home_content.replace(navbar_link, new_navbar_link)
    
    # Also add a quick card or link in the Dashboard area if desired
    # For now, placing it prominently in the navbar is great.

    with open(home_path, 'w', encoding='utf-8') as f:
        f.write(home_content)
    print("Updated home.html Navbar!")
else:
    print("Python for Hackers link already exists in home.html.")
