import io

with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio_github\old_style.css', 'r', encoding='utf-16') as f:
    data = f.read()

# Try different search terms if exact comment doesn't match perfectly
start_str = '8. EXPLORER'
start = data.find(start_str)
if start != -1:
    # Find the beginning of the comment
    start = data.rfind('/* ──', 0, start)
else:
    # Fallback search for academy classes
    start = data.find('.explorer-layout')

# The end is either the end of the file or the next major section (9. Modals)
end = data.find('/* ── 9.', start)
if end == -1:
    end = len(data)

if start != -1:
    extracted = data[start:end]
    with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\academy_css.txt', 'w', encoding='utf-8') as out:
        out.write(extracted)
    print("Success CSS")
else:
    print("Failed CSS")
