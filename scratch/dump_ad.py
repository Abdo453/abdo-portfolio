import os
import sys
import django
from django.template.loader import render_to_string
from django.test import RequestFactory

sys.path.append(r'd:\abdo_portfolio')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_site.settings')
django.setup()

request = RequestFactory().get('/vulnerabilities/active-directory.html')
html = render_to_string('main/academy/vulnerabilities/active_directory.html', request=request)
html = html.replace('href="/static/main/css/', 'href="../css/')
html = html.replace('src="/static/main/js/', 'src="../js/')

out_path = r'd:\abdo_portfolio\build\vulnerabilities\active-directory.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Built successfully!')
