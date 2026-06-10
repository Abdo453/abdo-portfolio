import re

academy_file = r'D:\abdo_portfolio\build\ccna\academy.js'
with open(academy_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old lesson4 and placeholders 5-8 from Domain 1
content = re.sub(r'\{\s*id:\s*"lesson4",\s*title:\s*"4\. الكابلات والألياف وسرعة نقل البيانات"[^\}]+\},', '', content, flags=re.DOTALL)
content = re.sub(r'\{\s*id:\s*"lesson5",\s*title:\s*"Placeholder lesson5"[^\}]+\},', '', content, flags=re.DOTALL)
content = re.sub(r'\{\s*id:\s*"lesson6",\s*title:\s*"Placeholder lesson6"[^\}]+\},', '', content, flags=re.DOTALL)
content = re.sub(r'\{\s*id:\s*"lesson7",\s*title:\s*"Placeholder lesson7"[^\}]+\},', '', content, flags=re.DOTALL)
content = re.sub(r'\{\s*id:\s*"lesson8",\s*title:\s*"Placeholder lesson8"[^\}]+\}\s*', '', content, flags=re.DOTALL)

with open(academy_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Placeholders removed successfully!")
