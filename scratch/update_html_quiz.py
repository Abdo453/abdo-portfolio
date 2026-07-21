import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Add quiz_engine.js to the bottom of the body
if 'quiz_engine.js' not in html:
    html = html.replace('</body>', '  <script src="{% static \'main/js/quiz_engine.js\' %}"></script>\n</body>')

# Also I need to add CSS for quiz-option if not exists
quiz_css = """
  <style>
    .quiz-container { background: #1a1e29; padding: 20px; border-radius: 8px; border-left: 4px solid var(--accent-primary); margin: 20px 0; }
    .quiz-option { display: block; width: 100%; text-align: left; background: #232838; border: 1px solid #333; color: #fff; padding: 12px; margin-top: 10px; border-radius: 4px; cursor: pointer; transition: all 0.3s ease; }
    .quiz-option:hover:not(:disabled) { background: #2d3345; border-color: var(--accent-primary); }
  </style>
"""
if '.quiz-container' not in html:
    html = html.replace('</head>', quiz_css + '</head>')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html with quiz engine.")
