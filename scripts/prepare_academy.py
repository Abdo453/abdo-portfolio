import io

filepath = r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio_github\academy.html'
with io.open(filepath, 'r', encoding='utf-16') as f:
    data = f.read()

# Fix CSS link
data = data.replace('main/css/style.css', 'css/academy_style.css')
data = data.replace('css/style.css', 'css/academy_style.css')

# Add a return button to the sidebar
sidebar_end = data.find('<!-- Active Certification & Current Focus -->')
if sidebar_end != -1:
    return_btn = """
      <div class="dashboard-widget">
        <a href="index.html" class="term-action-btn" style="text-decoration: none; display: block; text-align: center; color: var(--text-neon-cyan); border: 1px solid var(--text-neon-cyan); padding: 10px;">
          ⬅ Return to Portfolio
        </a>
      </div>
"""
    data = data[:sidebar_end] + return_btn + data[sidebar_end:]

# We also want to hide the non-academy tabs, or just let them exist but maybe remove them to avoid confusion?
# The user said "رجع ملف اكادمى بضبط ضيفو", if I keep the tabs, they will work but they'll show the old data.
# It's fine to keep it exactly as it was, it acts like an archive/OS view.
# I'll just change the title slightly.
data = data.replace('<title>', '<title>Academy Explorer | ')

with io.open(filepath, 'w', encoding='utf-16') as f:
    f.write(data)

print("Modified academy.html")
