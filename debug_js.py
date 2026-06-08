import re
with open('D:\\abdo_portfolio\\main\\static\\main\\js\\curriculum.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Check for backslash immediately preceding a backtick
matches = re.findall(r'\\[`]', js)
print('Escaped backticks:', matches)

# Check for unclosed template literals
print('Number of backticks:', js.count('`'))
