import os

def patch_books():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    
    js_payload = """
  <!-- Dynamic Fixed Navigation and Tabbed Section Switcher (Master Edition UI) -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Inject tab switcher CSS rules dynamically
      const style = document.createElement('style');
      style.innerHTML = `
        .content-sec { display: none; }
        .toc-item.active-tab {
          color: var(--accent-cyan) !important;
          border-right: 3px solid var(--accent-cyan);
          padding-right: 12px !important;
          font-weight: 700 !important;
          background: rgba(255,255,255,0.02);
        }
        .book-sidebar {
          position: sticky !important;
          top: 30px !important;
          max-height: calc(100vh - 60px);
          overflow-y: auto;
        }
      `;
      document.head.appendChild(style);

      const tocItems = document.querySelectorAll('.toc-item');
      const sections = document.querySelectorAll('.content-sec');
      const searchInput = document.querySelector('.sidebar-search-box') || document.getElementById('sec-search') || document.getElementById('sec-search-bc') || document.getElementById('sec-search-rw');

      let activeTabId = "";

      function showSection(targetId) {
        if (!targetId) return;
        activeTabId = targetId;
        sections.forEach(sec => {
          if (sec.id === targetId) {
            sec.style.display = 'block';
          } else {
            sec.style.display = 'none';
          }
        });
        tocItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === '#' + targetId) {
            item.classList.add('active-tab');
          } else {
            item.classList.remove('active-tab');
          }
        });
      }

      // Hook click events on TOC items
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
      });

      // Initial load
      const initialHash = window.location.hash ? window.location.hash.substring(1) : '';
      if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
      } else if (sections.length > 0) {
        showSection(sections[0].id);
      }

      // Search bar hook
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          const query = this.value.toLowerCase().trim();
          if (query === "") {
            showSection(activeTabId);
          } else {
            sections.forEach(sec => {
              const text = sec.innerText.toLowerCase();
              if (text.includes(query)) {
                sec.style.display = 'block';
              } else {
                sec.style.display = 'none';
              }
            });
          }
        });
      }
    });
  </script>
"""

    for f in os.listdir(books_dir):
      if f.endswith('.html'):
        path = os.path.join(books_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
          content = file.read()
          
        # Check if already patched to avoid duplicate injection
        if "Dynamic Fixed Navigation and Tabbed Section Switcher" in content:
          print(f"Skipping {f} - already patched.")
          continue
          
        # Insert before </body>
        if "</body>" in content:
          patched = content.replace("</body>", js_payload + "</body>")
          with open(path, 'w', encoding='utf-8') as file:
            file.write(patched)
          print(f"Patched {f} successfully.")
        else:
          print(f"Warning: </body> not found in {f}.")

if __name__ == '__main__':
    patch_books()
