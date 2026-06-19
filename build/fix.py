import re

path = 'd:/abdo_portfolio/build/js/methodology.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# We will use regex to capture the text value.
# The pattern we want to match is:
# \{ text:\s*"(.*?)",\s*type:
# \{ text:\s*"(.*?)",\s*delay:
# \{ text:\s*"(.*?)"\s*\}
# Wait, `.*?` might be tricky.

lines = content.split('\n')
new_lines = []
for line in lines:
    if '{ text: "' in line and '", type:' in line:
        line = line.replace('{ text: "', '{ text: `')
        line = line.replace('", type:', '`, type:')
    elif '{ text: "' in line and '", delay:' in line:
        line = line.replace('{ text: "', '{ text: `')
        line = line.replace('", delay:', '`, delay:')
    elif '{ text: "' in line and '" }' in line:
        line = line.replace('{ text: "', '{ text: `')
        line = line.replace('" }', '` }')
    
    # Check if there are still any broken quotes like `",`, type:` -> this is wrong because we replaced `", type:`
    # Wait, what if the string itself ends with a quote?
    # e.g., `{ text: "  "Code" : "Success",", type: "err", delay: 100 },`
    # My replace `{ text: "` -> `{ text: \``
    # `{ text: \`  "Code" : "Success",", type: "err", delay: 100 },`
    # My replace `", type:` -> `` `, type: ``
    # `{ text: \`  "Code" : "Success",`, type: "err", delay: 100 },`
    # Which is `{ text: `  "Code" : "Success",`, type: "err", delay: 100 }`
    # THIS IS PERFECT!
    
    new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))
print('Done!')
