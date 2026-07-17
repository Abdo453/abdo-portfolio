import re
import json
import os

os.makedirs('d:/abdo_portfolio/build/ccna/data', exist_ok=True)

# 1. Parse academy.js
with open('d:/abdo_portfolio/build/ccna/academy.js', 'r', encoding='utf-8') as f:
    text = f.read()

chapters = []
for chap_match in re.finditer(r'chapter:\s*"([^"]+)",\s*lessons:\s*\[(.*?)\]\s*(?=\}\s*,\s*\{\s*chapter|\}\s*\])', text, re.DOTALL):
    chapter_name = chap_match.group(1)
    lessons_text = chap_match.group(2)
    lessons = []
    for less_match in re.finditer(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*content:\s*`(.*?)`', lessons_text, re.DOTALL):
        lessons.append({
            "id": less_match.group(1),
            "title": less_match.group(2),
            "content": less_match.group(3).strip()
        })
    chapters.append({
        "chapter": chapter_name,
        "lessons": lessons
    })

with open('d:/abdo_portfolio/build/ccna/data/lessons.json', 'w', encoding='utf-8') as f:
    json.dump(chapters, f, indent=4, ensure_ascii=False)
print("Saved lessons.json")

# 2. Parse quizzes.js
with open('d:/abdo_portfolio/build/ccna/quizzes.js', 'r', encoding='utf-8') as f:
    text2 = f.read()

quizzes = {}
for q_match in re.finditer(r'"([^"]+)":\s*\{(.*?)\}(?=\s*,\s*"|\s*\};)', text2, re.DOTALL):
    lesson_id = q_match.group(1)
    levels_text = q_match.group(2)
    quizzes[lesson_id] = {}
    for level_match in re.finditer(r'(easy|medium|hard|scenario):\s*\[(.*?)\]', levels_text, re.DOTALL):
        level_name = level_match.group(1)
        qs_text = level_match.group(2)
        qs = []
        for question in re.finditer(r'\{\s*q:\s*"([^"]+)",\s*options:\s*\[(.*?)\],\s*correct:\s*(\d+)\s*\}', qs_text, re.DOTALL):
            options = [re.sub(r'^"|"$', '', opt.strip()) for opt in question.group(2).split(',')]
            qs.append({
                "q": question.group(1),
                "options": options,
                "correct": int(question.group(3))
            })
        quizzes[lesson_id][level_name] = qs

with open('d:/abdo_portfolio/build/ccna/data/quizzes.json', 'w', encoding='utf-8') as f:
    json.dump(quizzes, f, indent=4, ensure_ascii=False)
print("Saved quizzes.json")

# 3. Parse labs.js
with open('d:/abdo_portfolio/build/ccna/labs.js', 'r', encoding='utf-8') as f:
    text3 = f.read()

labs = []
for lab_match in re.finditer(r'\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*brief:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*difficulty:\s*"([^"]+)",\s*supportedCommands:\s*\[(.*?)\],\s*theoryHTML:\s*`(.*?)`,\s*validate:\s*function\(\w+\)\s*\{(.*?)\}\s*\}', text3, re.DOTALL):
    cmds = [re.sub(r'^"|"$', '', cmd.strip()) for cmd in lab_match.group(6).split(',') if cmd.strip()]
    labs.append({
        "id": lab_match.group(1),
        "title": lab_match.group(2),
        "brief": lab_match.group(3),
        "domain": lab_match.group(4),
        "difficulty": lab_match.group(5),
        "supportedCommands": cmds,
        "theoryHTML": lab_match.group(7).strip(),
        # For now, we skip validate functions as they can't be easily JSONified
    })

if not labs:
    print("Warning: Regex for labs.js didn't match perfectly. Creating empty labs.json")

with open('d:/abdo_portfolio/build/ccna/data/labs.json', 'w', encoding='utf-8') as f:
    json.dump(labs, f, indent=4, ensure_ascii=False)
print("Saved labs.json")
