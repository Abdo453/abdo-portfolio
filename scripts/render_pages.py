"""Shared static page rendering helpers for render_static.py"""
import os

def scan_templates():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    templates_dir = os.path.join(project_dir, 'main', 'templates', 'main')
    
    pages = [
        # (template, output_path, css_prefix)
        ('main/about.html', 'about.html', ''),
        ('main/quiz.html', 'quiz.html', ''),
        ('main/methodology.html', 'methodology.html', ''),
        ('main/python_for_hackers.html', 'python-for-hackers.html', ''),
        ('main/bug_bounty_writeups.html', 'bug-bounty-writeups.html', ''),
        ('main/profile.html', 'profile.html', ''),
        ('main/login.html', 'login.html', ''),
    ]
    
    # 1. Scan vulnerabilities
    vulns_dir = os.path.join(templates_dir, 'academy', 'vulnerabilities')
    if os.path.exists(vulns_dir):
        for f in os.listdir(vulns_dir):
            if f.endswith('.html'):
                out_name = f.replace('_', '-')
                pages.append((f'main/academy/vulnerabilities/{f}', f'vulnerabilities/{out_name}', '../'))
                
    # 2. Scan labs
    labs_dir = os.path.join(templates_dir, 'academy', 'labs')
    if os.path.exists(labs_dir):
        for f in os.listdir(labs_dir):
            if f.endswith('.html'):
                out_name = f.replace('_', '-')
                pages.append((f'main/academy/labs/{f}', f'labs/{out_name}', '../'))
                
    # 3. Scan linux security
    linux_dir = os.path.join(templates_dir, 'academy', 'linux')
    if os.path.exists(linux_dir):
        for f in os.listdir(linux_dir):
            if f.endswith('.html'):
                out_name = f.replace('_', '-')
                pages.append((f'main/academy/linux/{f}', f'linux-security/{out_name}', '../'))
                
    # 4. Scan writeups
    writeups_dir = os.path.join(templates_dir, 'writeups')
    if os.path.exists(writeups_dir):
        for f in os.listdir(writeups_dir):
            if f.endswith('.html'):
                out_name = f.replace('_', '-')
                pages.append((f'main/writeups/{f}', f'writeups/{out_name}', '../'))
                
    return pages

def scan_books():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    books = []
    if os.path.exists(books_dir):
        for f in os.listdir(books_dir):
            if f.endswith('.html'):
                books.append(f)
    return books

def fix_static_paths(html, css_prefix=''):
    html = html.replace('/static/main/css/academy.css', css_prefix + 'css/academy.css')
    html = html.replace('/static/main/css/style.css', css_prefix + 'css/style.css')
    html = html.replace('/static/main/css/python.css', css_prefix + 'css/python.css')
    html = html.replace('/static/main/css/methodology.css', css_prefix + 'css/methodology.css')
    html = html.replace('/static/main/js/', css_prefix + 'js/')
    html = html.replace('/static/main/images/', css_prefix + 'images/')
    html = html.replace('/static/main/', css_prefix)
    return html

def inject_auth_check(html, is_login_page=False):
    if is_login_page:
        return html
    if 'JSON.parse(userStr)' in html or 'localStorage.getItem(\'current_user\')' in html:
        return html
    auth_script = """  <script>
    (function() {
      try {
        const userStr = localStorage.getItem('current_user');
        let user = null;
        if (userStr) {
          user = JSON.parse(userStr);
        }
        if (!user || !user.username) {
          const isStatic = window.location.hostname.includes('github.io') || window.location.protocol === 'file:';
          let loginUrl = '';
          if (isStatic) {
            const path = window.location.pathname;
            if (path.includes('/vulnerabilities/') || path.includes('/labs/') || path.includes('/linux-security/') || path.includes('/writeups/') || path.includes('/books/')) {
              loginUrl = '../login.html';
            } else {
              loginUrl = 'login.html';
            }
          } else {
            loginUrl = '/login';
          }
          window.location.href = loginUrl;
        }
      } catch (e) {
        const isStatic = window.location.hostname.includes('github.io') || window.location.protocol === 'file:';
        window.location.href = isStatic ? 'login.html' : '/login';
      }
    })();
  </script>
"""
    if '<head>' in html:
        return html.replace('<head>', '<head>\n' + auth_script, 1)
    return html

def render_page(render_to_string, template, context, request, output_path, css_prefix=''):
    html = render_to_string(template, context, request=request)
    html = fix_static_paths(html, css_prefix)
    is_login = 'login.html' in template
    html = inject_auth_check(html, is_login)
    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    return os.path.getsize(output_path)
