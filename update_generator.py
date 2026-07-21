with open(r'd:\abdo_portfolio\generate_standalone.py', 'r', encoding='utf-8') as f:
    code = f.read()

new_code = code.replace(
    'max-width: 100% !important;',
    '/* max-width removed to respect container */'
)

new_code = new_code.replace(
    'css_override = """',
    'is_full_width = filename in ["terminal.html", "arena.html", "academy.html"]\n    extra_css = ".main-layout-container { max-width: 100% !important; padding: 24px !important; }" if is_full_width else ""\n    css_override = f"""'
)

new_code = new_code.replace(
    '<style>',
    '<style>\n      {extra_css}'
)

with open(r'd:\abdo_portfolio\generate_standalone.py', 'w', encoding='utf-8') as f:
    f.write(new_code)
print('Updated generate_standalone.py')
