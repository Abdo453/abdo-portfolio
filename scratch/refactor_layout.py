import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Body
content = re.sub(
    r'html,\s*body\s*\{.*?\n\s*\}',
    '''html, body {
      background-color: var(--bg-primary);
      color: var(--text-secondary);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.8;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      /* allow body to scroll naturally */
      overflow-x: hidden;
    }''',
    content,
    flags=re.DOTALL
)

# 2. Header
header_css = '''.meth-header {
      background: var(--bg-primary);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-color);
      padding: 0 30px;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
    }'''
content = re.sub(r'\.meth-header\s*\{[^\}]+\}', header_css, content, count=1)

# 3. Container
container_css = '''.meth-container {
      display: flex;
      width: 100%;
      min-height: calc(100vh - 60px);
    }'''
content = re.sub(r'\.meth-container\s*\{[^\}]+\}', container_css, content, count=1)

# 4. Sidebar
sidebar_css = '''.meth-sidebar {
      width: 260px;
      background: #0f1520;
      border-right: 1px solid var(--border-color);
      padding: 24px 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      z-index: 500;
      box-sizing: border-box;
    }'''
content = re.sub(r'\.meth-sidebar\s*\{[^\}]+\}', sidebar_css, content, count=1)

# 5. Viewer
viewer_css = '''.meth-viewer {
      flex: 1;
      padding: 40px;
      margin-left: 260px;
      margin-top: 60px;
      background: radial-gradient(circle at top right, rgba(155, 89, 255, 0.02), transparent 60%);
      display: flex;
      flex-direction: column;
      gap: 30px;
      position: relative;
      z-index: 1;
      box-sizing: border-box;
    }'''
content = re.sub(r'\.meth-viewer\s*\{[^\}]+\}', viewer_css, content, count=1)

# Remove the messy !important overrides at the end
content = re.sub(r'\.meth-container\s*\{\s*/\* Prevent the container from stretching.*?\s*height: calc\(100vh - 65px\) !important;\s*\}', '', content, flags=re.DOTALL)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Layout refactored to Fixed Sidebar + Natural Body Scroll.")
