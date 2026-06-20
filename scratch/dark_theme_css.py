import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

new_root = """    :root {
      /* Dark Hacker Theme Colors */
      --bg-primary: #0a0e17;
      --bg-card: #111827;
      --bg-elevated: #1a2236;
      
      --accent-primary: #00e5a0;
      --accent-secondary: #00b4d8;
      --accent-danger: #ff4757;
      --accent-warning: #ffa502;
      
      --text-primary: #e2e8f0;
      --text-secondary: #94a3b8;
      
      --border-color: #1e293b;
      --success: #2ed573;

      /* Mapping existing variables to new palette for backward compatibility */
      --neon-cyan: var(--accent-primary);
      --neon-purple: var(--accent-secondary);
      --neon-green: var(--success);
      --neon-red: var(--accent-danger);
      --bg-dark: var(--bg-primary);
    }
"""

new_body = """    body {
      background-color: var(--bg-primary);
      color: var(--text-secondary);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 1.8;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      position: relative;
    }"""

content = re.sub(r'    :root \{[^}]*\}', new_root, content, count=1)
content = re.sub(r'    body \{[^}]*\}', new_body, content, count=1)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("CSS root variables and body updated successfully.")
