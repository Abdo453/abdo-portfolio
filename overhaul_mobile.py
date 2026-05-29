import os

template_path = r"D:\abdo_portfolio\main\templates\main\methodology.html"

with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the CSS Media Query block
old_media_css = """    @media (max-width: 1000px) {
      .meth-container {
        flex-direction: column;
        height: auto;
      }
      .meth-sidebar {
        width: 100%;
        height: 300px;
        border-right: none;
        border-bottom: 1px solid rgba(0, 229, 255, 0.15);
      }
      .meth-viewer {
        padding: 20px;
      }
      .use-box-grid {
        grid-template-columns: 1fr;
      }
    }"""

new_media_css = """    /* Mobile Responsive Optimizations */
    .menu-toggle-btn {
      display: none;
      background: rgba(0, 229, 255, 0.05);
      color: var(--neon-cyan);
      border: 1px solid rgba(0, 229, 255, 0.3);
      padding: 8px 14px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      font-family: 'Fira Code', monospace;
    }
    .menu-toggle-btn:hover {
      background: rgba(0, 229, 255, 0.15);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
    }
    
    /* Table Responsive Wrapper */
    .table-wrapper {
      width: 100%;
      overflow-x: auto;
      margin: 15px 0;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 4px;
      background: rgba(10, 10, 20, 0.2);
    }
    .interactive-table {
      margin: 0;
      min-width: 650px;
    }

    @media (max-width: 900px) {
      .meth-logo {
        font-size: 1.1rem;
      }
      .menu-toggle-btn {
        display: block;
      }
      .meth-container {
        flex-direction: column;
        height: calc(100vh - 65px);
        position: relative;
        overflow: hidden;
      }
      .meth-sidebar {
        position: absolute;
        left: -360px;
        top: 0;
        bottom: 0;
        width: 320px;
        height: 100%;
        z-index: 1000;
        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 5px 0 25px rgba(0,0,0,0.9);
      }
      .meth-sidebar.active {
        left: 0;
      }
      .meth-viewer {
        padding: 20px 15px !important;
        height: 100%;
        overflow-y: auto;
      }
      .use-box-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      .flow-visualization {
        padding: 20px 10px;
        gap: 10px;
      }
      .flow-node {
        min-width: 130px;
        padding: 10px 14px;
        font-size: 1rem;
      }
      .hero-title {
        font-size: 1.8rem;
      }
      .hero-tagline {
        font-size: 1.1rem;
      }
      .term-container {
        height: 350px;
      }
      .lab-body {
        padding: 15px;
      }
      .lab-body > div {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
      }
    }"""

content = content.replace(old_media_css, new_media_css)

# 2. Update Header block to add Hamburger Menu Button
old_header = """  <!-- Top Navbar -->
  <header class="meth-header">
    <div class="meth-logo">// OFFENSIVE SECURITY KNOWLEDGE PLATFORM</div>
    <a href="index.html" class="back-btn">
      <span>⬅</span> Back to Terminal OS
    </a>
  </header>"""

new_header = """  <!-- Top Navbar -->
  <header class="meth-header">
    <div style="display: flex; align-items: center; gap: 15px;">
      <button class="menu-toggle-btn" onclick="toggleMobileSidebar()">☰ Menu</button>
      <div class="meth-logo">// OFFENSIVE SECURITY KNOWLEDGE PLATFORM</div>
    </div>
    <a href="index.html" class="back-btn">
      <span>⬅</span> Back to Terminal OS
    </a>
  </header>"""

content = content.replace(old_header, new_header)

# 3. Wrap all tables in .table-wrapper to prevent overflow breaking
# We can find all "<table class="interactive-table">" and replace with "<div class="table-wrapper"><table class="interactive-table">"
# And then replace "</table>" with "</table></div>".
# Since there are multiple tables, we'll do this carefully with a python split/replace loop.
parts = content.split('<table class="interactive-table">')
new_parts = [parts[0]]
for part in parts[1:]:
    # Find next closing table
    table_end_idx = part.find('</table>')
    if table_end_idx != -1:
        # Wrap it
        wrapped_part = '<div class="table-wrapper"><table class="interactive-table">' + part[:table_end_idx] + '</table></div>' + part[table_end_idx + 8:]
        new_parts.append(wrapped_part)
    else:
        new_parts.append(part)

content = "".join(new_parts)

# 4. Update Javascript block to add toggleMobileSidebar() and close-on-click
old_toggle_function = """    // Toggle sidebar categories
    function toggleCategory(catId) {
      const cat = document.getElementById(catId);
      const titleSpan = cat.previousElementSibling.querySelector('span:last-child');
      if (cat.style.maxHeight === '0px' || cat.style.display === 'none') {
        cat.style.display = 'flex';
        cat.style.maxHeight = '1000px';
        titleSpan.innerText = '▼';
      } else {
        cat.style.display = 'none';
        cat.style.maxHeight = '0px';
        titleSpan.innerText = '▶';
      }
    }"""

new_toggle_function = """    // Toggle Mobile Sidebar
    function toggleMobileSidebar() {
      const sidebar = document.querySelector('.meth-sidebar');
      sidebar.classList.toggle('active');
    }

    // Toggle sidebar categories
    function toggleCategory(catId) {
      const cat = document.getElementById(catId);
      const titleSpan = cat.previousElementSibling.querySelector('span:last-child');
      if (cat.style.maxHeight === '0px' || cat.style.display === 'none') {
        cat.style.display = 'flex';
        cat.style.maxHeight = '1000px';
        titleSpan.innerText = '▼';
      } else {
        cat.style.display = 'none';
        cat.style.maxHeight = '0px';
        titleSpan.innerText = '▶';
      }
    }"""

content = content.replace(old_toggle_function, new_toggle_function)

# In openMethPhase, we close the active mobile sidebar
old_open_phase = """    // Tab switcher
    function openMethPhase(phaseId) {
      document.querySelectorAll('.meth-item').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('meth-ef-' + phaseId);
      if (activeFolder) activeFolder.classList.add('active');
      
      document.querySelectorAll('.meth-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';"""

new_open_phase = """    // Tab switcher
    function openMethPhase(phaseId) {
      document.querySelectorAll('.meth-item').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('meth-ef-' + phaseId);
      if (activeFolder) activeFolder.classList.add('active');
      
      document.querySelectorAll('.meth-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.meth-sidebar');
      if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }"""

content = content.replace(old_open_phase, new_open_phase)

# Write final template html
with open(template_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished applying mobile responsive updates to templates/main/methodology.html")
