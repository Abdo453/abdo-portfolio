import re

with open(r'd:\abdo_portfolio\build\css\style.css', 'r', encoding='utf-8', errors='ignore') as f:
    css = f.read()

# 6. Update tool list items
old_tool_item = '''
.tool-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(0,0,0,0.2);
}
.tool-list-item:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.05);
}
.tool-list-item.active {
  background: rgba(0, 229, 255, 0.05);
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.1);
}
'''
new_tool_item = '''
.tool-list-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.tool-list-item:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(0, 229, 255, 0.4);
  box-shadow: 0 5px 20px rgba(0, 229, 255, 0.15);
  transform: translateY(-2px);
}
.tool-list-item.active {
  background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(0, 0, 0, 0.6));
  border-color: var(--accent-cyan);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
  transform: scale(1.02);
}
'''
css = css.replace(old_tool_item.strip(), new_tool_item.strip())


# 7. Add CSS for tool detail header bars to glow
glowing_bars = '''
.metric-bar {
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px currentColor;
}
.tool-header-card {
  background: linear-gradient(135deg, rgba(10, 10, 15, 0.8), rgba(20, 20, 30, 0.9)) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}
.tool-body-content img {
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  max-width: 100%;
  height: auto;
}
'''
if '.metric-bar' not in css:
    css += '\n' + glowing_bars


with open(r'd:\abdo_portfolio\build\css\style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated style.css with more redesign elements')
