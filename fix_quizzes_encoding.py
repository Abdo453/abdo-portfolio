import codecs

filepath = 'd:/abdo_portfolio/build/ccna/quizzes.js'

# Try to read it with various encodings
encodings_to_try = ['utf-8', 'cp1256', 'utf-16le', 'utf-8-sig']
content = None

for enc in encodings_to_try:
    try:
        with codecs.open(filepath, 'r', encoding=enc) as f:
            content = f.read()
        print(f"Successfully read with {enc}")
        
        # Test if it actually contains Arabic characters
        if 'أ' in content or 'ا' in content or 'ي' in content:
            print("Found Arabic characters with this encoding!")
            break
        else:
            print("No Arabic characters found with", enc)
            
    except Exception as e:
        print(f"Failed to read with {enc}: {e}")

if content:
    # Save it as UTF-8 properly
    with codecs.open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Saved as UTF-8!")
