import re

with open(r'd:\abdo_portfolio\generate_standalone.py', 'r', encoding='utf-8') as f:
    code = f.read()

new_btn_css = '''/* Back button styling */
    .standalone-back-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 9999;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(10, 10, 18, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 229, 255, 0.3);
        color: var(--accent-cyan, #00e5ff);
        text-decoration: none;
        font-family: 'Fira Code', monospace;
        font-size: 14px;
        font-weight: bold;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0, 229, 255, 0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .standalone-back-btn:hover {
        background: rgba(0, 229, 255, 0.15);
        box-shadow: 0 6px 20px rgba(0, 229, 255, 0.3);
        transform: translateY(-2px);
    }
  </style>'''

code = re.sub(r'/\* Back button styling \*/.*?</style>', new_btn_css, code, flags=re.DOTALL)

with open(r'd:\abdo_portfolio\generate_standalone.py', 'w', encoding='utf-8') as f:
    f.write(code)
print('Updated generate_standalone.py back button')
