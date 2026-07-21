import re

# 1. Update academy.js
with open('d:/abdo_portfolio/build/ccna/academy.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove `const academyData = [...];`
text = re.sub(r'const academyData = \[.*?\];\s*', '', text, flags=re.DOTALL)
# Change window load to ccnaDataReady
text = text.replace("window.addEventListener('load',", "document.addEventListener('ccnaDataReady',")
with open('d:/abdo_portfolio/build/ccna/academy.js', 'w', encoding='utf-8') as f:
    f.write(text)

# 2. Update labs.js
with open('d:/abdo_portfolio/build/ccna/labs.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'window\.ccnaCurriculum = \[.*?\];\s*', '', text, flags=re.DOTALL)
text = text.replace("window.addEventListener('load',", "document.addEventListener('ccnaDataReady',")
with open('d:/abdo_portfolio/build/ccna/labs.js', 'w', encoding='utf-8') as f:
    f.write(text)

# 3. Update quizzes.js
with open('d:/abdo_portfolio/build/ccna/quizzes.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'const quizzesData = \{.*?\};\s*', '', text, flags=re.DOTALL)
# Not strictly necessary if it just defines functions, but let's check
with open('d:/abdo_portfolio/build/ccna/quizzes.js', 'w', encoding='utf-8') as f:
    f.write(text)

# 4. Update features.js
with open('d:/abdo_portfolio/build/ccna/features.js', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace("document.addEventListener('DOMContentLoaded',", "document.addEventListener('ccnaDataReady',")
with open('d:/abdo_portfolio/build/ccna/features.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated JS files.")
