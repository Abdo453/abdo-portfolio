import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update .phase-module-header
new_phase_header = """    .phase-module-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 32px;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .phase-module-icon {
      font-size: 48px;
      line-height: 1;
    }
    .phase-module-meta {
      flex: 1;
    }
    .phase-module-title {
      font-family: var(--font-sans);
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .phase-module-tagline {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 16px 0;
    }
    .phase-meta-badges {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .badge {
      background: var(--bg-elevated);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-family: var(--font-sans);
      text-transform: uppercase;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 0.5px;
      color: var(--text-primary);
      border: 1px solid transparent;
    }
    .badge-medium, .badge-high, .badge-critical {
      background: #332200;
      color: var(--accent-warning);
      border-color: var(--accent-warning);
    }
    .badge-tool, .badge-time, .badge-reward {
      border-color: var(--border-color);
    }
    .badge-reward {
      color: #ffd700;
    }"""

content = re.sub(
    r'\s*\.phase-module-header \{.*?\}\s*\.phase-module-icon \{.*?\}\s*\.phase-module-meta \{.*?\}\s*\.phase-module-title \{.*?\}\s*\.phase-module-tagline \{.*?\}\s*\.phase-meta-badges \{.*?\}\s*\.badge \{.*?\}\s*\.badge-medium \{.*?\}\s*\.badge-high \{.*?\}\s*\.badge-tool \{.*?\}',
    '\n' + new_phase_header,
    content,
    flags=re.DOTALL
)

# 2. Update .cyber-hero (CEH header)
new_cyber_hero = """    .cyber-hero {
      background: transparent;
      border: none;
      padding: 0;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      box-shadow: none;
      text-align: left;
    }
    .hero-title {
      font-family: var(--font-sans);
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .hero-icon {
      font-size: 48px;
    }
    .hero-tagline {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 16px 0;
    }"""

content = re.sub(
    r'\s*\.cyber-hero \{.*?\}\s*\.hero-title \{.*?\}\s*\.hero-icon \{.*?\}\s*\.hero-tagline \{.*?\}',
    '\n' + new_cyber_hero,
    content,
    flags=re.DOTALL
)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Phase Headers updated successfully.")
