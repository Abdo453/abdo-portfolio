with open(r'd:\abdo_portfolio\build\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('id="pane-arena"')
with open(r'd:\abdo_portfolio\pane_output.txt', 'w', encoding='utf-8') as f:
    f.write(content[start:start+1000])
