import re

with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

m = re.search(r'const academyData = (\[.*?\]);\s*// ===', code, re.DOTALL)
if m:
    data_str = m.group(1)
    
    # Let's find all occurrences of },,
    double_commas = [m.start() for m in re.finditer(r'\},,', data_str)]
    print("Double commas found at indices:", double_commas)
    
    for idx in double_commas:
        snippet = data_str[max(0, idx-100):min(len(data_str), idx+100)]
        print("-------")
        print(snippet)

else:
    print("Could not find academyData")
