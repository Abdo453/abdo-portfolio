import codecs
import re

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(r'chapter: "Chapter 2: Control Flow \([^\)]+\)"', 'chapter: "Chapter 2: Control Flow (التحكم)"', content)
content = re.sub(r'chapter: "Chapter 6: File Handling \([^\)]+\)"', 'chapter: "Chapter 6: File Handling (التعامل مع الملفات)"', content)
content = re.sub(r'chapter: "Chapter 8: Building Real Tools \([^\)]+\)"', 'chapter: "Chapter 8: Building Real Tools (مشاريع فعلية)"', content)
content = re.sub(r'chapter: "Chapter 19: Multithreading \([^\)]+\)"', 'chapter: "Chapter 19: Multithreading (تعدد المهام)"', content)

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
    f.write(content)

print('Replaced corrupted Arabic titles successfully!')
