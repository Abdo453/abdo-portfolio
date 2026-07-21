import shutil
import re
import os

build_dir = r'd:\abdo_portfolio\build'
index_path = os.path.join(build_dir, 'index.html')

with open(index_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

tabs = ['academy', 'labs', 'articles', 'research', 'books', 'arena', 'terminal']

standalone_css = '''
  <style>
    /* Hide everything that makes it a dashboard */
    .sidebar, .workspace-tabs, .sidebar-dashboard, .mobile-header, .bottom-nav, .top-nav, .dashboard-widget { display: none !important; }
    
    /* Make the workspace full width */
    .content-workspace { 
        margin-left: 0 !important; 
        margin-right: 0 !important; 
        width: 100% !important; 
        /* max-width removed to respect container */ 
        border-radius: 0 !important; 
        min-height: 100vh;
    }
    
    /* Hide all panes by default, show only the target one */
    .workspace-pane { display: none !important; }
    #pane-{tab} { display: block !important; animation: none !important; }
    /* Override grid layout if present */
    .dashboard-layout { 
        display: block !important;
    }

    /* Back button styling */
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
  </style>
'''

back_btn_html = '''<a href="index.html" class="standalone-back-btn"><span>⬅</span> Back to Dashboard</a>'''

for tab in tabs:
    # 1. Set the correct pane to active
    tab_content = content
    # Remove active class from dashboard
    # Remove active class from dashboard
    tab_content = re.sub(r'class="workspace-pane(\s+active)?"\s+id="pane-dashboard"', 'class="workspace-pane" id="pane-dashboard"', tab_content)
    tab_content = re.sub(r'id="pane-dashboard"\s+class="workspace-pane(\s+active)?"', 'id="pane-dashboard" class="workspace-pane"', tab_content)
    # Add active class to target pane.
    tab_content = re.sub(rf'id="pane-{tab}"\s+class="workspace-pane( active)?"', f'id="pane-{tab}" class="workspace-pane active"', tab_content)
    # Handle class first then id
    tab_content = re.sub(rf'class="workspace-pane( active)?"\s+id="pane-{tab}"', f'class="workspace-pane active" id="pane-{tab}"', tab_content)
    
    # 2. Inject CSS
    if 'standalone-back-btn' not in tab_content:
        tab_content = tab_content.replace('</head>', standalone_css.replace('{tab}', tab) + '</head>')
        
        # 3. Inject Back Button right after content-workspace starts
        tab_content = tab_content.replace('<main class="content-workspace">', f'<main class="content-workspace">\n{back_btn_html}')
    
    # 4. Save to file
    out_path = os.path.join(build_dir, f'{tab}.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(tab_content)
    print(f'Generated {tab}.html')

# Now modify index.html to link to these standalone pages instead of ?standalone=true
index_content = content
for tab in tabs:
    index_content = index_content.replace(f'href="index.html?standalone=true#{tab}"', f'href="{tab}.html"')
    index_content = index_content.replace(f'href="index.html#{tab}"', f'href="{tab}.html"')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(index_content)
print('Updated index.html links to point to standalone pages.')
