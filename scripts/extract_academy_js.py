import io

with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio_github\old_index.html', 'r', encoding='utf-16') as f:
    data = f.read()

start_str = 'function openExplorerFolder'
end_str = '</script>'

start = data.find(start_str)
end = data.rfind(end_str)

if start != -1 and end != -1:
    extracted = data[start:end]
    with io.open(r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\academy_js.txt', 'w', encoding='utf-8') as out:
        out.write(extracted)
    print("Success JS")
else:
    print("Failed JS")
