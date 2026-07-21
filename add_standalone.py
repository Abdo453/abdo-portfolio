import re
import sys

def modify_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return

    # 1. Update the hrefs to include ?standalone=true
    content = content.replace('href="index.html#', 'href="index.html?standalone=true#')
    
    # 2. Inject CSS for standalone mode just before </style> or </head>
    standalone_css = """
  <style>
    body.standalone-mode .sidebar { display: none !important; }
    body.standalone-mode .content-workspace { margin-left: 0 !important; width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
    body.standalone-mode .workspace-tabs { display: none !important; }
    body.standalone-mode .bottom-nav { display: none !important; }
    body.standalone-mode .top-nav { display: none !important; }
    body.standalone-mode .mobile-header { display: none !important; }
  </style>
"""
    if 'body.standalone-mode' not in content:
        content = content.replace('</head>', standalone_css + '</head>')
    
    # 3. Inject JS to add class based on URL param
    standalone_js = """
  <script>
    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.search.includes("standalone=true")) {
            document.body.classList.add("standalone-mode");
        }
    });
  </script>
"""
    if 'standalone=true' not in content.split('<script>')[0]: # Just to avoid adding it twice
        if 'document.body.classList.add("standalone-mode")' not in content:
            content = content.replace('</body>', standalone_js + '</body>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Modified {filepath}")

modify_file(r'd:\abdo_portfolio\build\index.html')
modify_file(r'd:\abdo_portfolio\build\temp_original.html')
