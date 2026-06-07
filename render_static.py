"""Render the Django template to a static HTML file for GitHub Pages."""
import os
import re
import shutil
import sys
import django

# Set up Django environment
os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio_site.settings'
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from django.template.loader import render_to_string
from django.test import RequestFactory
from main.views import get_portfolio_context
from render_pages import scan_templates, scan_books, render_page, fix_static_paths

factory = RequestFactory()
request = factory.get('/')
context = get_portfolio_context()

project_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(project_dir, 'build')
os.makedirs(build_dir, exist_ok=True)

# Compile list of pages dynamically
STANDALONE_PAGES = scan_templates()
BOOKS = scan_books()

# --- index.html ---
html = render_to_string('main/home.html', context, request=request)
html = fix_static_paths(html)
html = re.sub(r'<input[^>]*csrfmiddlewaretoken[^>]*/>', '', html)

output_path = os.path.join(build_dir, 'index.html')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"Static HTML written to {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")

# --- Standalone pages ---
for template, out_name, css_prefix in STANDALONE_PAGES:
    out_path = os.path.join(build_dir, out_name.replace('/', os.sep))
    size = render_page(render_to_string, template, context, request, out_path, css_prefix)
    print(f"Static HTML written to {out_path}")
    print(f"File size: {size} bytes")

# --- Books ---
books_dir = os.path.join(build_dir, 'books')
os.makedirs(books_dir, exist_ok=True)

for book in BOOKS:
    book_html = render_to_string(f'main/books/{book}', context, request=request)
    book_html = fix_static_paths(book_html, '../')
    book_output_path = os.path.join(books_dir, book)
    with open(book_output_path, 'w', encoding='utf-8') as f:
        f.write(book_html)
    print(f"Static Book HTML written to {book_output_path}")
    print(f"File size: {os.path.getsize(book_output_path)} bytes")

# --- Copy assets ---
css_src = os.path.join(project_dir, 'main', 'static', 'main', 'css')
css_dest_dir = os.path.join(build_dir, 'css')
os.makedirs(css_dest_dir, exist_ok=True)
for css_file in ('style.css', 'academy.css'):
    src = os.path.join(css_src, css_file)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(css_dest_dir, css_file))
        print(f"Copied {css_file} to {css_dest_dir}")

images_src = os.path.join(project_dir, 'main', 'static', 'main', 'images')
images_dest = os.path.join(build_dir, 'images')
if os.path.exists(images_src):
    shutil.copytree(images_src, images_dest, dirs_exist_ok=True)
    print(f"Copied Images to {images_dest}")