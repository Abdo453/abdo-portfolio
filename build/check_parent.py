from bs4 import BeautifulSoup
with open('d:/abdo_portfolio/build/methodology.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')
for pid in ['meth-content-p7', 'meth-content-p0', 'meth-content-p_home', 'rd-hero-section']:
    el = soup.find(id=pid)
    if el:
        parent = el.parent
        print(f'{pid} parent is ID: {parent.get("id")}, Class: {parent.get("class")}')
