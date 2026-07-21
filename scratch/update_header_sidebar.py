import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace meth-header block
new_header = """    .meth-header {
      background: var(--bg-primary);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5);
    }
    .meth-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 16px;
      color: var(--accent-primary);
      letter-spacing: 0px;
    }
    .back-btn {
      background: transparent;
      color: var(--accent-primary);
      border: 1px solid var(--accent-primary);
      padding: 6px 14px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 13px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .back-btn:hover {
      background: var(--accent-primary);
      color: var(--bg-primary);
      box-shadow: 0 0 10px rgba(0, 229, 160, 0.4);
      transform: translateY(-2px);
    }"""

# Replace from .meth-header up to the end of .back-btn:hover
content = re.sub(
    r'\s*\.meth-header \{.*?\}\s*\.meth-logo \{.*?\}\s*\.back-btn \{.*?\}\s*\.back-btn:hover \{.*?\}',
    '\n' + new_header,
    content,
    flags=re.DOTALL
)

# 2. Replace Sidebar
new_sidebar = """    .meth-sidebar {
      width: 260px;
      background: #0f1520;
      border-right: 1px solid var(--border-color);
      padding: 24px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 10;
    }
    .sidebar-category {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;
    }
    .category-title {
      font-family: var(--font-sans);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-secondary);
      padding: 0 12px;
      letter-spacing: 0.1em;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: color 0.15s ease;
      margin-top: 24px;
      margin-bottom: 8px;
    }
    .category-title:hover {
      color: var(--text-primary);
    }
    .category-items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: max-height 0.3s ease;
      overflow: hidden;
    }
    .meth-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      border-left: 3px solid transparent;
      transition: all 0.15s ease;
      color: var(--text-secondary);
      font-family: var(--font-sans);
      font-weight: 500;
      font-size: 13px;
    }
    .meth-item:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }
    .meth-item.active {
      background: var(--bg-elevated);
      border-left-color: var(--accent-primary);
      color: var(--accent-primary);
    }"""

content = re.sub(
    r'\s*\.meth-sidebar \{.*?\}\s*\.sidebar-category \{.*?\}\s*\.category-title \{.*?\}\s*\.category-title:hover \{.*?\}\s*\.category-items \{.*?\}\s*\.meth-item \{.*?\}\s*\.meth-item:hover \{.*?\}\s*\.meth-item\.active \{.*?\}',
    '\n' + new_sidebar,
    content,
    flags=re.DOTALL
)

# 3. Remove Light Theme Overrides entirely
content = re.sub(
    r'\s*/\*\s*Light Theme Overrides\s*\*/\s*body\.light-theme[\s\S]*?(?=\s*/\*\s*meth-viewer\s*\*/|\s*\.meth-viewer)',
    '\n',
    content
)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Header and Sidebar updated successfully. Light theme removed.")
