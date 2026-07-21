import re
with open(r'D:\abdo_portfolio\build\ccna\academy.js', 'r', encoding='utf-8') as f:
    code = f.read()

chapters = re.findall(r'chapter:\s*\"(.*?)\"', code)
print("CHAPTERS:", chapters)

ids = re.findall(r'id:\s*[\'"](.*?)[\'"]', code)
print("\nLESSON IDS:", ids)
