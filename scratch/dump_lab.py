import os
import sys
import django
from django.template.loader import render_to_string
from django.test import RequestFactory
import re

# Setup Django
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_site.settings')
django.setup()

def dump_lab():
    # Use RequestFactory to mock a request
    request = RequestFactory().get('/labs/command-injection-lab.html')
    
    # We need to render the specific lab template
    template_name = 'main/academy/labs/command_injection_lab.html'
    
    # Render using Django
    try:
        html = render_to_string(template_name, request=request)
    except Exception as e:
        print(f"Failed to render template: {e}")
        return
    
    # Now fix the URLs for GitHub Pages
    # For GitHub pages:
    #   - /static/main/css/style.css -> ../css/style.css
    #   - /static/main/js/v3_engine/JourneyManager.js -> ../js/v3_engine/JourneyManager.js
    #   - /static/main/data/journeys/cmd_injection.json -> ../data/journeys/cmd_injection.json
    
    # Replace static tags that were rendered as /static/main/
    html = html.replace('href="/static/main/css/', 'href="../css/')
    html = html.replace('src="/static/main/js/', 'src="../js/')
    
    # specific to our new imports
    html = html.replace("from '/static/main/js/", "from '../js/")
    html = html.replace("fetch('/static/main/data/", "fetch('../data/")
    
    # also handle the case where they used double quotes
    html = html.replace('from "/static/main/js/', 'from "../js/')
    html = html.replace('fetch("/static/main/data/', 'fetch("../data/')
    
    # output file path
    out_path = r'd:\abdo_portfolio\build\labs\command-injection-lab.html'
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print(f"Successfully dumped rendered HTML to {out_path}")

if __name__ == '__main__':
    dump_lab()
