import re
import codecs

with codecs.open(r'D:\abdo_portfolio\main\static\main\js\curriculum.js', 'r', 'utf-8') as f:
    cur_js = f.read()

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    engine_py = f.read()

target = r'''  <!-- Curriculum Database (v=2 to bust cache) -->
  <script src="/static/main/js/curriculum.js?v=2"></script>'''

replacement = f'''  <!-- Curriculum Database Inlined -->
  <script>
{cur_js}
  </script>'''

engine_py = engine_py.replace(target, replacement)

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
    f.write(engine_py)

print("Inlined curriculum.js into generate_engine_ide.py successfully.")
