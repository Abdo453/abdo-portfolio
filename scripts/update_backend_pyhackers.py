import os

# Update urls.py
urls_path = r'D:\abdo_portfolio\main\urls.py'
with open(urls_path, 'r', encoding='utf-8') as f:
    urls_content = f.read()

new_path = "    path('python-for-hackers.html', views.python_for_hackers, name='python_for_hackers'),"
if "python-for-hackers" not in urls_content:
    urls_content = urls_content.replace(
        "path('methodology.html', views.methodology, name='methodology'),",
        "path('methodology.html', views.methodology, name='methodology'),\n" + new_path
    )
    with open(urls_path, 'w', encoding='utf-8') as f:
        f.write(urls_content)

# Update views.py
views_path = r'D:\abdo_portfolio\main\views.py'
with open(views_path, 'r', encoding='utf-8') as f:
    views_content = f.read()

new_view = """
def python_for_hackers(request):
    return render(request, 'main/python_for_hackers.html', get_portfolio_context())
"""

if "def python_for_hackers" not in views_content:
    views_content += new_view
    with open(views_path, 'w', encoding='utf-8') as f:
        f.write(views_content)

print("Backend updated!")
