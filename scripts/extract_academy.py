import io

with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio_github\old_index.html', 'r', encoding='utf-16') as f:
    data = f.read()

start_str = '<div class="workspace-pane" id="pane-academy">'
end_str = '<!-- 2. SKILLS VIEW -->'

start = data.find(start_str)
end = data.find(end_str)

if start != -1 and end != -1:
    extracted = data[start:end]
    with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\academy_extract.html', 'w', encoding='utf-8') as out:
        out.write(extracted)
    print("Success")
else:
    print(f"Failed. Start: {start}, End: {end}")
