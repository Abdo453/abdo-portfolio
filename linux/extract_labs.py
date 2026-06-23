import re
import json

with open('d:/abdo_portfolio/build/ccna/labs.js', 'r', encoding='utf-8') as f:
    text3 = f.read()

curriculum = []
for phase_match in re.finditer(r'\{\s*phase:\s*"([^"]+)",\s*levels:\s*\[(.*?)\]\s*(?=\}\s*,\s*\{\s*phase|\}\s*\])', text3, re.DOTALL):
    phase_name = phase_match.group(1)
    levels_text = phase_match.group(2)
    levels = []
    
    # We will grab title, theory, challengeText and the raw validate function string
    for level_match in re.finditer(r'\{\s*title:\s*"([^"]+)",\s*theory:\s*"(.*?)",\s*challengeText:\s*"([^"]+)",\s*validate:\s*(function\([^)]*\)\s*\{.*?\})\s*\}', levels_text, re.DOTALL):
        levels.append({
            "title": level_match.group(1),
            "theory": level_match.group(2),
            "challengeText": level_match.group(3),
            "validate": level_match.group(4)
        })
    
    curriculum.append({
        "phase": phase_name,
        "levels": levels
    })

with open('d:/abdo_portfolio/build/ccna/data/labs.json', 'w', encoding='utf-8') as f:
    json.dump(curriculum, f, indent=4, ensure_ascii=False)
print("Saved labs.json")
