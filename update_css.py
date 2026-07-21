import re

with open(r'd:\abdo_portfolio\build\css\style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

# 1. Update .explorer-layout
old_explorer_layout = '''
.explorer-layout {
  display: flex;
  height: calc(100vh - 120px);
  min-height: 600px;
  background: var(--bg-surface);
  border: 1px solid var(--border-glass);
  border-radius: var(--border-radius);
  overflow: hidden;
}
'''
new_explorer_layout = '''
.explorer-layout {
  display: flex;
  height: calc(100vh - 40px);
  min-height: 600px;
  background: rgba(10, 10, 18, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 229, 255, 0.05);
  direction: ltr !important; /* Force LTR for IDE feel */
}
'''
if old_explorer_layout.strip() in css:
    css = css.replace(old_explorer_layout.strip(), new_explorer_layout.strip())
else:
    # If exact match fails, use regex
    css = re.sub(r'\.explorer-layout\s*{[^}]+}', new_explorer_layout.strip(), css, count=1)


# 2. Update .explorer-sidebar
old_sidebar = '''
.explorer-sidebar {
  width: 250px;
  background: var(--bg-dark);
  border-right: 1px solid var(--border-glass);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
}
'''
new_sidebar = '''
.explorer-sidebar {
  width: 260px;
  background: rgba(5, 5, 12, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
}
'''
if old_sidebar.strip() in css:
    css = css.replace(old_sidebar.strip(), new_sidebar.strip())
else:
    css = re.sub(r'\.explorer-sidebar\s*{[^}]+}', new_sidebar.strip(), css, count=1)


# 3. Update .explorer-folder
old_folder = '''
.explorer-folder {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  font-size: 0.95rem;
  border: 1px solid transparent;
}
.explorer-folder:hover {
  background: rgba(255,255,255,0.03);
  color: var(--text-primary);
  animation: bounceHover 1s ease-in-out infinite;
}
.explorer-folder.active {
  background: rgba(0, 229, 255, 0.1);
  color: var(--accent-cyan);
  border-color: rgba(0, 229, 255, 0.2);
}
'''
new_folder = '''
.explorer-folder {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;
  border: 1px solid transparent;
  margin-bottom: 4px;
}
.explorer-folder:hover {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), transparent);
  color: var(--text-primary);
  transform: translateX(5px);
}
.explorer-folder.active {
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.15), transparent);
  color: var(--accent-cyan);
  border-left: 3px solid var(--accent-cyan);
  border-radius: 0 8px 8px 0;
  box-shadow: inset 20px 0 20px -20px rgba(0, 229, 255, 0.5);
}
'''
css = css.replace(old_folder.strip(), new_folder.strip())


# 4. Update .explorer-tools-panel
old_tools_panel = '''
.explorer-tools-panel {
  width: 280px;
  background: rgba(255,255,255,0.01);
  border-right: 1px solid var(--border-glass);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
}
'''
new_tools_panel = '''
.explorer-tools-panel {
  width: 300px;
  background: rgba(15, 15, 25, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  box-shadow: inset -10px 0 20px rgba(0,0,0,0.2);
}
'''
if old_tools_panel.strip() in css:
    css = css.replace(old_tools_panel.strip(), new_tools_panel.strip())
else:
    css = re.sub(r'\.explorer-tools-panel\s*{[^}]+}', new_tools_panel.strip(), css, count=1)


# 5. Update .explorer-content-panel
old_content_panel = '''
.explorer-content-panel {
  flex: 1;
  background: var(--bg-dark);
  padding: 30px;
  overflow-y: auto;
  position: relative;
}
'''
new_content_panel = '''
.explorer-content-panel {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  padding: 30px;
  overflow-y: auto;
  position: relative;
  box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
}
'''
if old_content_panel.strip() in css:
    css = css.replace(old_content_panel.strip(), new_content_panel.strip())
else:
    css = re.sub(r'\.explorer-content-panel\s*{[^}]+}', new_content_panel.strip(), css, count=1)

with open(r'd:\abdo_portfolio\build\css\style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated style.css with new explorer design')
