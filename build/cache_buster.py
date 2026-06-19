import codecs
import re
path = 'd:/abdo_portfolio/build/methodology.html'
with codecs.open(path, 'r', 'utf-8') as f:
    html = f.read()

new_html = re.sub(r'src=\"js/methodology\.js(\?v=[0-9]+)?\"', 'src=\"js/methodology.js?v=999\"', html)
with codecs.open(path, 'w', 'utf-8') as f:
    f.write(new_html)
