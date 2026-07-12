import os

def fix_navbars():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    
    target_pattern = """      // Hook click events on TOC items
      tocItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            showSection(targetId);
            window.location.hash = targetId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      });"""

    replacement_pattern = """      // Hook click events on TOC items
      tocItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            showSection(targetId);
            // Use pushState to update the URL hash silently without scrolling
            history.pushState(null, null, '#' + targetId);
          }
        });
      });"""

    for f in os.listdir(books_dir):
      if f.endswith('.html'):
        path = os.path.join(books_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
          content = file.read()
          
        if target_pattern in content:
          patched = content.replace(target_pattern, replacement_pattern)
          with open(path, 'w', encoding='utf-8') as file:
            file.write(patched)
          print(f"Fixed navigation behavior in {f}.")
        else:
          # Try checking if we already patched it
          if "history.pushState(null, null, '#' + targetId)" in content:
            print(f"{f} already fixed.")
          else:
            print(f"Pattern not found in {f}.")

if __name__ == '__main__':
    fix_navbars()
