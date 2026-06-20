import re
import os
import shutil
import time

def resolve_includes(html_content, base_dir):
    pattern = re.compile(r"{%\s*include\s*'([^']+)'\s*%}")
    def repl(match):
        include_path = match.group(1)
        parts = include_path.split('/')
        file_path = os.path.join(base_dir, *parts)
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        else:
            print(f"Warning: Could not find included file {file_path}")
            return f"<!-- Missing include: {include_path} -->"

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

    # Dynamic cache buster
    timestamp = int(time.time())

    # Sync HTML
    with open(html_src, 'r', encoding='utf-8') as f:
        html = f.read()
    
    html = resolve_includes(html, base_dir)
    html = html.replace('{% load static %}', '')
    
    html = re.sub(r"{%\s*static\s*'main/(css/style\.css)'\s*%}", fr"\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(css/methodology\.css)'\s*%}", fr"\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/methodology\.js)'\s*%}", fr"\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/components\.js)'\s*%}", fr"\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/quiz_engine\.js)'\s*%}", fr"\1?v={timestamp}", html)
    html = re.sub(r"{%\s*static\s*'main/(js/quiz_db\.js)'\s*%}", fr"\1?v={timestamp}", html)
    
    # Update cache buster for quiz engine JS if included in HTML with normal src
    html = re.sub(r'src="js/quiz_engine\.js(\?v=\d+)?"', fr'src="js/quiz_engine.js?v={timestamp}"', html)
    html = re.sub(r'src="js/quiz_db\.js(\?v=\d+)?"', fr'src="js/quiz_db.js?v={timestamp}"', html)

    html = html.replace('{% templatetag openvariable %}', '{{')
    html = html.replace('{% templatetag closevariable %}', '}}')

    with open(html_dst, 'w', encoding='utf-8') as f:
        f.write(html)

    # Sync JS
    with open(js_src, 'r', encoding='utf-8') as f:
        js = f.read()
    with open(js_dst, 'w', encoding='utf-8') as f:
        f.write(js)

    # Sync Quiz JS
    quiz_engine_src = r"d:\abdo_portfolio\main\static\main\js\quiz_engine.js"
    quiz_db_src = r"d:\abdo_portfolio\main\static\main\js\quiz_db.js"
    quiz_engine_dst = r"d:\abdo_portfolio\build\js\quiz_engine.js"
    quiz_db_dst = r"d:\abdo_portfolio\build\js\quiz_db.js"
    components_src = r"d:\abdo_portfolio\main\static\main\js\components.js"
    components_dst = r"d:\abdo_portfolio\build\js\components.js"
    
    if os.path.exists(quiz_engine_src):
        shutil.copy2(quiz_engine_src, quiz_engine_dst)
    if os.path.exists(quiz_db_src):
        shutil.copy2(quiz_db_src, quiz_db_dst)
    if os.path.exists(components_src):
        shutil.copy2(components_src, components_dst)

    # Sync Data Directory
    data_src = r"d:\abdo_portfolio\main\static\main\data"
    data_dst = r"d:\abdo_portfolio\build\data"
    if os.path.exists(data_dst):
        shutil.rmtree(data_dst)
    if os.path.exists(data_src):
        shutil.copytree(data_src, data_dst)

    # Sync CSS
    with open(css_src, 'r', encoding='utf-8') as f:
        css = f.read()
    with open(css_dst, 'w', encoding='utf-8') as f:
        f.write(css)

    # Sync Modules
    build_modules_dir = r"d:\abdo_portfolio\build\modules"
    static_modules_dir = r"d:\abdo_portfolio\main\static\main\modules"
    template_modules_dir = r"d:\abdo_portfolio\main\templates\main\modules"
    
    if os.path.exists(build_modules_dir):
        shutil.rmtree(build_modules_dir)
        
    if os.path.exists(static_modules_dir):
        shutil.copytree(static_modules_dir, build_modules_dir)
        
    # Also copy the CEH modules from templates/main/modules
    if os.path.exists(template_modules_dir):
        for item in os.listdir(template_modules_dir):
            if item.endswith('.html'):
                src_path = os.path.join(template_modules_dir, item)
                dst_path = os.path.join(build_modules_dir, item)
                shutil.copy2(src_path, dst_path)

    print("Synced main to build successfully with dynamic cache busters and quiz JS!")

if __name__ == "__main__":
    sync_main_to_build()
