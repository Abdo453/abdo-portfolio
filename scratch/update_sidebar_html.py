import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace category headers
content = content.replace('<div class="category-title" onclick="toggleSidebarCategory(this)">Core Recon <span class="arrow">▼</span></div>',
                          '<div class="category-title" onclick="toggleSidebarCategory(this)">▼ 📂 CORE RECON</div>')

content = content.replace('<div class="category-title" onclick="toggleSidebarCategory(this)">Web Discovery <span class="arrow">▼</span></div>',
                          '<div class="category-title" onclick="toggleSidebarCategory(this)">▼ 🌐 WEB DISCOVERY</div>')

content = content.replace('<div class="category-title" onclick="toggleSidebarCategory(this)">Vulnerabilities <span class="arrow">▼</span></div>',
                          '<div class="category-title" onclick="toggleSidebarCategory(this)">▼ 💉 VULNERABILITIES</div>')

content = content.replace('<div class="category-title" onclick="toggleSidebarCategory(this)">Pipelines & Labs <span class="arrow">▼</span></div>',
                          '<div class="category-title" onclick="toggleSidebarCategory(this)">▼ ⚙ PIPELINES & LABS</div>')

# Core Recon Items
content = content.replace("""            <div class="meth-item active" onclick="showPhase('p0')">
              <span class="meth-icon">💻</span>
              <span class="meth-title">Subdomain Enumeration</span>
            </div>""",
            '<div class="tree-item active" onclick="showPhase(\'p0\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>Subdomain Enumeration <span style="color:#ffd700; margin-left:auto;">★</span></div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p1')">
              <span class="meth-icon">🔌</span>
              <span class="meth-title">Port Scanning</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p1\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>Port Scanning</div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p2')">
              <span class="meth-icon">📡</span>
              <span class="meth-title">Tech Detection</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p2\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>Tech Detection</div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p_matrix')">
              <span class="meth-icon">🛡️</span>
              <span class="meth-title">Decision Matrix</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p_matrix\')"><span class="tree-line">└──</span><span class="tree-icon">📄</span>Decision Matrix</div>')

# Web Discovery Items
content = content.replace("""            <div class="meth-item" onclick="showPhase('p6')">
              <span class="meth-icon">📂</span>
              <span class="meth-title">Directory Discovery</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p6\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>Directory Discovery</div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p10')">
              <span class="meth-icon">📝</span>
              <span class="meth-title">JavaScript Recon</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p10\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>JavaScript Recon</div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p15')">
              <span class="meth-icon">⚙️</span>
              <span class="meth-title">APIs & REST Hacking</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p15\')"><span class="tree-line">├──</span><span class="tree-icon">📄</span>APIs & REST Hacking</div>')

content = content.replace("""            <div class="meth-item" onclick="showPhase('p16')">
              <span class="meth-icon">🕸️</span>
              <span class="meth-title">GraphQL Hacking</span>
            </div>""",
            '<div class="tree-item" onclick="showPhase(\'p16\')"><span class="tree-line">└──</span><span class="tree-icon">📄</span>GraphQL Hacking</div>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Sidebar converted to tree layout.")
