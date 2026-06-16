import json
import re
import ast

filepath = 'd:/abdo_portfolio/old_quizzes.js'
with open(filepath, 'r', encoding='utf-16le') as f:
    content = f.read()

# content looks like:
# window.quizzesData = {
#     "fund_osi_tcp": {
#         "easy": [
#             {
#                 q: "أي طبقة من نموذج OSI...",
#                 options: ["Transport Layer", ...],
#                 correct: 1,
#                 explanation: "..."
#             }, ...

# This is NOT valid JSON because keys like `q`, `options` lack quotes.
# We will use a regex trick to quote unquoted keys.
content = content.replace('window.quizzesData = ', '').strip()
if content.endswith(';'):
    content = content[:-1]

# Quote keys (e.g. q: -> "q":)
# regex: match an identifier before a colon
content = re.sub(r'([a-zA-Z0-9_]+)\s*:', r'"\1":', content)

# There might be some single quotes instead of double quotes, but JS usually has double quotes here based on the git log.
# Let's write a small parsing using json.loads after replacing

try:
    data = json.loads(content)
except json.JSONDecodeError as e:
    # If JSON loading fails, we can use ast.literal_eval if we convert JS to python syntax
    print("JSON decode failed, attempting eval")
    # Replace true/false with True/False
    content = content.replace(': true', ': True').replace(': false', ': False')
    # Try eval
    try:
        data = ast.literal_eval(content)
    except Exception as e2:
        print("eval failed:", e2)
        data = None

if data:
    with open('d:/abdo_portfolio/build/ccna/data/quizzes.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=4)
    print("Successfully converted quizzes to JSON!")
else:
    print("Failed to convert quizzes.")
