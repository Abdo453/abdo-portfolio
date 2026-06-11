import json
import re

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Try to extract the entire academyData array using regex and json
m = re.search(r'const academyData = (\[.*?\]);\s*// ===', code, re.DOTALL)
if m:
    data_str = m.group(1)
    
    # Let's count how many lessons are found with regex
    lessons = re.findall(r'id:\s*[\'"](.*?)[\'"]', data_str)
    print("All IDs found by regex:", lessons)
    
    # Look at the syntax of Domain 4
    d4_idx = data_str.find("Domain 4: IP Services")
    print("\nDomain 4 syntax snippet:")
    print(data_str[d4_idx-50:d4_idx+200])

else:
    print("Could not find academyData")
