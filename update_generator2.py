with open(r'd:\abdo_portfolio\generate_standalone.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix the CSS injection logic to properly hide all panes and use f-string for the target pane
code = code.replace(
    '/* Override grid layout if present */',
    '/* Hide all panes by default, show only the target one */\n    .workspace-pane { display: none !important; }\n    #pane-{tab} { display: block !important; animation: none !important; }\n    /* Override grid layout if present */'
)

# And we must change standalone_css from a static string to a format string or replace {tab} in the loop
# Wait, standalone_css is defined OUTSIDE the loop.
# Let's just fix it where standalone_css is injected.

code = code.replace(
    'tab_content = tab_content.replace(\'</head>\', standalone_css + \'</head>\')',
    'tab_content = tab_content.replace(\'</head>\', standalone_css.replace(\'{tab}\', tab) + \'</head>\')'
)

with open(r'd:\abdo_portfolio\generate_standalone.py', 'w', encoding='utf-8') as f:
    f.write(code)
print('Updated generate_standalone.py')
