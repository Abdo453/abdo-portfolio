import codecs

filepath = 'd:/abdo_portfolio/build/ccna/quizzes.js'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

with codecs.open(filepath, 'w', encoding='utf-8-sig') as f:
    f.write(content)

print("Saved quizzes.js as UTF-8 with BOM!")
