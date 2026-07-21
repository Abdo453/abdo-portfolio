import json
import re
import ast

filepath = 'd:/abdo_portfolio/old_quizzes.js'
with open(filepath, 'r', encoding='utf-16le') as f:
    content = f.read()

# Remove BOM
content = content.replace('\uFEFF', '')
content = content.replace('window.quizzesData = ', '').strip()
if content.endswith(';'):
    content = content[:-1]

# Make JS string into python literal
content = content.replace(': true', ': True').replace(': false', ': False')

# Quote keys using regex
content = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', content)

try:
    data = ast.literal_eval(content)
except Exception as e:
    print("eval failed:", e)
    # Let's try json.loads if eval fails
    try:
        content = content.replace(': True', ': true').replace(': False', ': false')
        data = json.loads(content)
    except Exception as e2:
        print("json decode failed:", e2)
        data = None

if data:
    with open('d:/abdo_portfolio/build/ccna/data/quizzes.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=4)
    print("Successfully converted quizzes to JSON!")
else:
    print("Failed to convert quizzes.")
