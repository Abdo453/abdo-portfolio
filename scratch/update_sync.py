import os
import shutil
import re
import time

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
    
    # We don't have resolve_includes defined here, but since methodology.html 
    # already has the resolved CEH includes from the previous sync, wait!
    # I should just modify the regex for cache busters directly in the original sync script!
