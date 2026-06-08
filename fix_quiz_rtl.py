import re

path = r"D:\abdo_portfolio\main\templates\main\quiz.html"
with open(path, encoding="utf-8") as f:
    content = f.read()

# Make the quiz container RTL
if 'dir="rtl"' not in content:
    content = content.replace('<div id="quizContainer"></div>', '<div id="quizContainer" dir="rtl" style="text-align: right;"></div>')

# Fix explanation text alignment
content = content.replace('.quiz-explanation {', '.quiz-explanation {\n      direction: rtl; text-align: right;')

# Fix question text alignment
content = content.replace('.quiz-question {', '.quiz-question {\n      direction: rtl; text-align: right;')

# Fix options direction
content = content.replace('.quiz-opt {', '.quiz-opt {\n      direction: rtl; text-align: right;')

# Re-escape the Django tags just in case
content = content.replace("{&#123;", r"\x7B\x7B")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Quiz layout adjusted for Arabic RTL")
