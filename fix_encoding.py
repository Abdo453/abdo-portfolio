import os

filepath = 'd:/abdo_portfolio/build/ccna/quizzes.js'

try:
    with open(filepath, 'r', encoding='utf-16le') as f:
        content = f.read()
    
    # Write as utf-8
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully converted quizzes.js to UTF-8")
except Exception as e:
    print("Error:", e)
