import re
import json

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Extract academyData
m = re.search(r'const academyData = (\[.*\]);\s*// ===', code, re.DOTALL)
if m:
    data_str = m.group(1)
    print("Found academyData array.")
    
    # Let's find the content for route_static manually using regex to avoid JS eval issues
    lesson_m = re.search(r'id:\s*[\'"]route_static[\'"].*?title:\s*[\'"](.*?)[\'"].*?content:\s*`(.*?)`', data_str, re.DOTALL)
    if lesson_m:
        print("TITLE:", lesson_m.group(1))
        print("CONTENT STARTS WITH:", lesson_m.group(2)[:100].strip())
    else:
        print("Could not parse route_static lesson.")
else:
    print("academyData not found.")
