import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Fuse.js CDN at the beginning of the content block
if 'fuse.min.js' not in html:
    html = html.replace('{% block content %}', '{% block content %}\n<script src="https://cdn.jsdelivr.net/npm/fuse.js/dist/fuse.min.js"></script>')

# 2. Add Global Progress Bar above the search input in the sidebar
progress_bar_html = """
      <!-- Global Progress Bar -->
      <div class="global-progress-container" style="padding: 10px 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-secondary); margin-bottom: 5px;">
          <span>LEARNING PROGRESS</span>
          <span id="global-progress-text">0%</span>
        </div>
        <div style="width: 100%; height: 6px; background: #1a2333; border-radius: 3px; overflow: hidden;">
          <div id="global-progress-fill" style="width: 0%; height: 100%; background: var(--accent-primary); transition: width 0.5s ease;"></div>
        </div>
      </div>
"""
if 'id="global-progress-fill"' not in html:
    # insert before <div class="sidebar-search">
    html = html.replace('<div class="sidebar-search">', progress_bar_html + '\n      <div class="sidebar-search">')

# 3. Add Real Assessments category to the top of the sidebar categories
assessments_sidebar = """
      <!-- Category: REAL ASSESSMENTS -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-assess')">
          <span style="color: #ffb86c;">📁 REAL ASSESSMENTS</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-assess" style="display: block;">
          <div class="meth-item" id="meth-ef-assess-htb" onclick="openMethPhase('assess-htb')" data-search="hackthebox htb writeup corporate">
            🏴‍☠️ HTB: "Corporate"
          </div>
          <div class="meth-item" id="meth-ef-assess-bb" onclick="openMethPhase('assess-bb')" data-search="bug bounty report account takeover idor">
            🐛 Bug Bounty: ATO
          </div>
          <div class="meth-item" id="meth-ef-assess-ad" onclick="openMethPhase('assess-ad')" data-search="active directory pentest zero to da">
            👑 AD: Zero to DA
          </div>
        </div>
      </div>
"""
if 'id="cat-assess"' not in html:
    # insert before the first sidebar category: <!-- Category 1: CORE RECON -->
    html = html.replace('<!-- Category 1: CORE RECON -->', assessments_sidebar + '\n      <!-- Category 1: CORE RECON -->')

# 4. Include the 3 new HTML files
includes_html = """
      <!-- REAL ASSESSMENTS MODULES -->
      {% include 'main/modules/mod_assess_htb.html' %}
      {% include 'main/modules/mod_assess_bugbounty.html' %}
      {% include 'main/modules/mod_assess_ad.html' %}
"""
if 'mod_assess_htb.html' not in html:
    # insert at the top of the meth-viewer, right after <div class="meth-viewer" id="mainViewer">
    html = html.replace('<div class="meth-viewer" id="mainViewer">', '<div class="meth-viewer" id="mainViewer">\n' + includes_html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html with Phase 1 additions.")
