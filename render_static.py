"""Render the Django template to a static HTML file for GitHub Pages."""
import os
import sys
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio_site.settings'
sys.path.insert(0, os.path.dirname(__file__))
django.setup()

from django.template.loader import render_to_string
from main.views import home
from django.test import RequestFactory

# Create a fake request
factory = RequestFactory()
request = factory.get('/')


# Get the context dynamically from views.py
from main.views import get_portfolio_context
context = get_portfolio_context()

html = render_to_string('main/home.html', context, request=request)

# Fix static paths for GitHub Pages (relative paths)
html = html.replace('/static/main/css/style.css', 'css/style.css')
html = html.replace('/static/main/images/', 'images/')
html = html.replace('/static/main/', '')

# Remove CSRF token hidden input (not needed for static site)
import re
html = re.sub(r'<input[^>]*csrfmiddlewaretoken[^>]*/>', '', html)

project_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(project_dir, 'build')
os.makedirs(build_dir, exist_ok=True)

output_path = os.path.join(build_dir, 'index.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Static HTML written to {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")

# --- Render standalone methodology.html ---
meth_html = render_to_string('main/methodology.html', context, request=request)
meth_html = meth_html.replace('/static/main/css/style.css', 'css/style.css')
meth_html = meth_html.replace('/static/main/images/', 'images/')
meth_html = meth_html.replace('/static/main/', '')

meth_output_path = os.path.join(build_dir, 'methodology.html')
with open(meth_output_path, 'w', encoding='utf-8') as f:
    f.write(meth_html)

print(f"Static HTML written to {meth_output_path}")
print(f"File size: {os.path.getsize(meth_output_path)} bytes")

# --- Render standalone books ---
books_dir = os.path.join(build_dir, 'books')
os.makedirs(books_dir, exist_ok=True)

books = [
    'real_world_bug_hunting.html',
    'bug_bounty_bootcamp.html',
    'web_hackers_handbook.html'
]

for book in books:
    book_html = render_to_string(f'main/books/{book}', context, request=request)
    book_html = book_html.replace('/static/main/css/style.css', '../css/style.css')
    book_html = book_html.replace('/static/main/images/', '../images/')
    book_html = book_html.replace('/static/main/', '../')
    
    book_output_path = os.path.join(books_dir, book)
    with open(book_output_path, 'w', encoding='utf-8') as f:
        f.write(book_html)
    
    print(f"Static Book HTML written to {book_output_path}")
    print(f"File size: {os.path.getsize(book_output_path)} bytes")

# Auto-copy assets
import shutil

# Copy CSS
css_src = os.path.join(project_dir, 'main', 'static', 'main', 'css', 'style.css')
css_dest_dir = os.path.join(build_dir, 'css')
os.makedirs(css_dest_dir, exist_ok=True)
shutil.copy(css_src, os.path.join(css_dest_dir, 'style.css'))
print(f"Copied CSS to {css_dest_dir}")

# Copy Images
images_src = os.path.join(project_dir, 'main', 'static', 'main', 'images')
images_dest = os.path.join(build_dir, 'images')
if os.path.exists(images_src):
    shutil.copytree(images_src, images_dest, dirs_exist_ok=True)
    print(f"Copied Images to {images_dest}")


