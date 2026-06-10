import codecs
import re

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

# Replace all occurrences of `something` with <code>something</code>
# This regex finds backticks that surround some text, EXCLUDING the main template backticks.
# Actually, the main template backticks are `<h1>...</div>` or similar.
# Let's just use regex to replace `(.*?)` with <code>\1</code> but ONLY if it's on a line that starts with <p> or <div
lines = content.split('\n')
new_lines = []
for line in lines:
    if '<p>' in line or '<div' in line or '<li>' in line or '<h1>' in line:
        # Replace `text` with <code>text</code>
        line = re.sub(r'`([^`]+)`', r'<code>\1</code>', line)
    new_lines.append(line)

content = '\n'.join(new_lines)

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
    f.write(content)

print('Replaced all inline backticks with <code> tags!')
