import re
import os

def sync_main_to_build():
    html_src = r"d:\abdo_portfolio\main\templates\main\methodology.html"
    js_src = r"d:\abdo_portfolio\main\static\main\js\methodology.js"
    css_src = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

    html_dst = r"d:\abdo_portfolio\build\methodology.html"
    js_dst = r"d:\abdo_portfolio\build\js\methodology.js"
    css_dst = r"d:\abdo_portfolio\build\css\methodology.css"

    # Sync HTML
    with open(html_src, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = html.replace('{% load static %}', '')
    html = re.sub(r"{%\s*static\s*'main/(css/style\.css)'\s*%}", r"\1?v=11", html)
    html = re.sub(r"{%\s*static\s*'main/(css/methodology\.css)'\s*%}", r"\1?v=11", html)
    html = re.sub(r"{%\s*static\s*'main/(js/methodology\.js)'\s*%}", r"\1?v=1001", html)
    html = html.replace('{% templatetag openvariable %}', '{{')
    html = html.replace('{% templatetag closevariable %}', '}}')

    with open(html_dst, 'w', encoding='utf-8') as f:
        f.write(html)

    # Sync JS
    with open(js_src, 'r', encoding='utf-8') as f:
        js = f.read()
    with open(js_dst, 'w', encoding='utf-8') as f:
        f.write(js)

    # Sync CSS
    with open(css_src, 'r', encoding='utf-8') as f:
        css = f.read()
    with open(css_dst, 'w', encoding='utf-8') as f:
        f.write(css)

    print("Synced main to build successfully.")

if __name__ == "__main__":
    sync_main_to_build()
