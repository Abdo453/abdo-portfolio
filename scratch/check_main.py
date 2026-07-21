html = open(r'd:\abdo_portfolio\main\templates\main\methodology.html', encoding='utf-8').read()
checks = ['Operation Red Forest', 'flashcard', 'flashcard-container', 'rd-check-item', 'exam_scenarios', 'Red Forest']
for c in checks:
    status = "OK" if c in html else "MISSING"
    print(f"  [{status}] {c}")

# Also check the inject_flashcards.py to see what it injects
print("\n--- Checking what inject_flashcards injects ---")
fc = open(r'd:\abdo_portfolio\scratch\inject_flashcards.py', encoding='utf-8').read()
if 'flashcard' in fc.lower():
    print("inject_flashcards.py contains flashcard content")
if 'Red Forest' in fc:
    print("inject_flashcards.py contains Red Forest content")
