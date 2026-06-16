import re, os, json

# academy.js
with open('build/ccna/academy.js', 'r', encoding='utf-8') as f:
    t = f.read()
ids = re.findall(r'id:\s*"([^"]+)"', t)
chapters = re.findall(r'chapter:\s*"([^"]+)"', t)
print(f"=== ACADEMY.JS ===")
print(f"Chapters: {len(chapters)}")
print(f"Lessons: {len(ids)}")
for c in chapters: print(f"  - {c}")

# enrichment.js
with open('build/ccna/enrichment.js', 'r', encoding='utf-8') as f:
    t = f.read()
e_ids = re.findall(r'"([^"]+)"\s*:\s*\{', t)
print(f"\n=== ENRICHMENT.JS ===")
print(f"Lessons with enrichment: {len(e_ids)}")
print(f"IDs: {e_ids}")

# quizzes.js
with open('build/ccna/quizzes.js', 'r', encoding='utf-8') as f:
    t = f.read()
q_keys = re.findall(r'"([^"]+)"\s*:\s*\{', t)
q_easy = t.count('"easy"')
q_hard = t.count('"hard"')
q_scenario = t.count('"scenario"')
q_total = t.count('"q:"') + t.count('q:')
print(f"\n=== QUIZZES.JS ===")
print(f"Quiz domains: {len(q_keys)}")
print(f"Total question marks: q: {t.count('{q:')}")

# cheatsheets.js
with open('build/ccna/cheatsheets.js', 'r', encoding='utf-8') as f:
    t = f.read()
print(f"\n=== CHEATSHEETS.JS ===")
print(f"Lines: {len(t.splitlines())}")
print(f"EMPTY: {len(t.strip()) < 50}")

# labs.js
with open('build/ccna/labs.js', 'r', encoding='utf-8') as f:
    t = f.read()
lab_titles = re.findall(r'title:\s*"([^"]+)"', t)
phases = re.findall(r'phase:\s*"([^"]+)"', t)
print(f"\n=== LABS.JS ===")
print(f"Phases: {len(phases)}")
print(f"Labs: {len(lab_titles)}")
for p in phases: print(f"  - {p}")

# interviews.js
with open('build/ccna/interviews.js', 'r', encoding='utf-8') as f:
    t = f.read()
cats = re.findall(r'"category":\s*"([^"]+)"', t)
q_count = t.count('"q":')
print(f"\n=== INTERVIEWS.JS ===")
print(f"Categories: {len(cats)}")
print(f"Questions: {q_count}")
for c in cats: print(f"  - {c}")

# simulator.js
with open('build/ccna/simulator.js', 'r', encoding='utf-8') as f:
    t = f.read()
print(f"\n=== SIMULATOR.JS ===")
print(f"Lines: {len(t.splitlines())}")

# Coverage analysis
print(f"\n=== COVERAGE GAP ===")
academy_ids = set(ids)
enrichment_ids = set(e_ids)
covered = academy_ids & enrichment_ids
missing = academy_ids - enrichment_ids
print(f"Academy lessons: {len(academy_ids)}")
print(f"Enrichment covered: {len(covered)}")
print(f"Missing enrichment: {len(missing)}")
if missing:
    print("Missing IDs:")
    for m in sorted(missing): print(f"  - {m}")
