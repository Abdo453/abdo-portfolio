import re
import json

filepath = 'd:/abdo_portfolio/old_quizzes.js'
with open(filepath, 'r', encoding='utf-16le') as f:
    content = f.read()

# We need to extract the JS object and convert to JSON
# The file starts with `window.quizzesData = {` and ends with `};`
# We can use chompjs if available, but let's try a simple regex or just string manipulation.
# Since it's a valid JS object, we can use Python's node execution or js2py, or just fix it.

import subprocess
import os

# Write a tiny node script to parse and stringify
node_script = """
const fs = require('fs');
let content = fs.readFileSync('d:/abdo_portfolio/old_quizzes.js', 'utf16le');
content = content.replace(/window\\.quizzesData\\s*=\\s*/, '');
content = content.replace(/;\\s*$/, '');
// Need to evaluate it
let data;
eval('data = ' + content);
fs.writeFileSync('d:/abdo_portfolio/build/ccna/data/quizzes.json', JSON.stringify(data, null, 4), 'utf8');
console.log('Quizzes converted to JSON successfully.');
"""

with open('convert_quizzes.js', 'w', encoding='utf-8') as f:
    f.write(node_script)

os.system('node convert_quizzes.js')

