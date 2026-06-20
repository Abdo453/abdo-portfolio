import re
import os

def resolve_includes(html_content, base_dir):
    # Find all {% include 'main/modules/filename.html' %}
    pattern = re.compile(r"{%\s*include\s*'([^']+)'\s*%}")
    
    def repl(match):
        include_path = match.group(1)
        # include_path is like 'main/modules/mod1_intro.html'
        # we need to map it to the actual file path in templates
        # base_dir is d:\abdo_portfolio\main\templates\
        parts = include_path.split('/')
        file_path = os.path.join(base_dir, *parts)
        
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            print(f"Warning: Could not find included file {file_path}")
            return f"<!-- Missing include: {include_path} -->"

    # Repeatedly resolve includes in case included files have includes
    prev_content = None
    while prev_content != html_content:
        prev_content = html_content
        html_content = pattern.sub(repl, html_content)
        
    return html_content

def sync_main_to_build():
    base_dir = r"d:\abdo_portfolio\main\templates"
    html_src = r"d:\abdo_portfolio\main\templates\main\methodology.html"
    js_src = r"d:\abdo_portfolio\main\static\main\js\methodology.js"
    css_src = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

    html_dst = r"d:\abdo_portfolio\build\methodology.html"
    js_dst = r"d:\abdo_portfolio\build\js\methodology.js"
    css_dst = r"d:\abdo_portfolio\build\css\methodology.css"

    # Sync HTML
    with open(html_src, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Resolve Django includes by injecting the actual HTML content
    html = resolve_includes(html, base_dir)
    
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

    
    import shutil
    build_modules_dir = r"d:\abdo_portfolio\build\modules"
    static_modules_dir = r"d:\abdo_portfolio\main\static\main\modules"
    if os.path.exists(build_modules_dir):
        shutil.rmtree(build_modules_dir)
    if os.path.exists(static_modules_dir):
        shutil.copytree(static_modules_dir, build_modules_dir)

    print("Synced main to build successfully with Includes resolved!")

if __name__ == "__main__":
    sync_main_to_build()
