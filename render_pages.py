"""Shared static page rendering helpers for render_static.py"""

STANDALONE_PAGES = [
    # (template, output_path, css_prefix)
    ('main/methodology.html', 'methodology.html', ''),
    ('main/bug_bounty_writeups.html', 'bug-bounty-writeups.html', ''),
    ('main/academy/vulnerabilities/sql_injection.html', 'vulnerabilities/sql-injection.html', '../'),
    ('main/academy/vulnerabilities/idor.html', 'vulnerabilities/idor.html', '../'),
    ('main/academy/vulnerabilities/ssrf.html', 'vulnerabilities/ssrf.html', '../'),
    ('main/academy/labs/sql_injection_lab.html', 'labs/sql-injection-lab.html', '../'),
]

BOOKS = [
    'real_world_bug_hunting.html',
    'bug_bounty_bootcamp.html',
    'web_hackers_handbook.html',
]


def fix_static_paths(html, css_prefix=''):
    html = html.replace('/static/main/css/academy.css', css_prefix + 'css/academy.css')
    html = html.replace('/static/main/css/style.css', css_prefix + 'css/style.css')
    html = html.replace('/static/main/images/', css_prefix + 'images/')
    html = html.replace('/static/main/', css_prefix)
    return html


def render_page(render_to_string, template, context, request, output_path, css_prefix=''):
    import os
    html = render_to_string(template, context, request=request)
    html = fix_static_paths(html, css_prefix)
    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    return os.path.getsize(output_path)
