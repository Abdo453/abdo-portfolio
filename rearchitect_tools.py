import re
import os

html_path = r'd:\abdo_portfolio\build\index.html'
with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Regex to match the entire tool block.
# We will match from <div class="tool-content-view" id="content-XYZ"... up to the next tool-content-view or <!-- Pane 3 End
pattern = re.compile(
    r'(<div class="tool-content-view" id="content-([a-zA-Z0-9_-]+)"[^>]*>)(.*?)(?=(<div class="tool-content-view"|<!-- Pane 3 End))',
    re.DOTALL
)

def rebuild_tool(match):
    start_tag = match.group(1)
    tool_id = match.group(2)
    inner_html = match.group(3)
    
    # Extract Title and Icon
    title_match = re.search(r'<h2 class="hero-title">(.*?)</h2>', inner_html, re.DOTALL)
    title_html = title_match.group(1) if title_match else f"<span class=\"hero-icon\">🚀</span> {tool_id}"
    
    # Extract Overview
    overview_match = re.search(r'<div class="tab-pane active"[^>]*id="tab-overview-[^>]*>(.*?)</div>\s*(?:<div class="tab-pane"|</div>)', inner_html, re.DOTALL)
    if not overview_match:
        # fallback
        overview_match = re.search(r'<div class="tab-pane[^>]*id="tab-overview-[^>]*>(.*?)</div>\s*<div class="tab-pane"', inner_html, re.DOTALL)
        
    overview_html = overview_match.group(1).strip() if overview_match else "<p>No briefing available.</p>"
    
    # Clean up overview (remove the "What is..." h3 if it exists so we don't duplicate titles)
    overview_html = re.sub(r'<div class="card-header"><h3>.*?</h3></div>', '', overview_html)
    overview_html = re.sub(r'<h3>.*?</h3>', '', overview_html)
    
    # Extract Commands
    cmds_match = re.search(r'<div class="tab-pane"[^>]*id="tab-commands-[^>]*>(.*?)</div>\s*(?:<div class="tab-pane"|</div>)', inner_html, re.DOTALL)
    cmds_html = cmds_match.group(1).strip() if cmds_match else "<p>No commands available.</p>"
    
    # Extract Workflow
    wf_match = re.search(r'<div class="tab-pane"[^>]*id="tab-workflow-[^>]*>(.*?)</div>\s*(?:<div class="tab-pane"|</div>)', inner_html, re.DOTALL)
    wf_html = wf_match.group(1).strip() if wf_match else "<p>No workflow available.</p>"
    
    # Extract Comparisons
    comp_match = re.search(r'<div class="tab-pane"[^>]*id="tab-comparisons-[^>]*>(.*?)</div>\s*(?:<div class="tab-pane"|</div>)', inner_html, re.DOTALL)
    if not comp_match: # last pane, might end differently
        comp_match = re.search(r'<div class="tab-pane"[^>]*id="tab-comparisons-[^>]*>(.*?)$', inner_html, re.DOTALL)
        # trim the trailing </div> that closes tool-content-view
        if comp_match:
            c = comp_match.group(1).strip()
            if c.endswith('</div>'): c = c[:-6].strip()
            if c.endswith('</div>'): c = c[:-6].strip() # might have multiple closing divs
            comp_html = c
        else:
            comp_html = "<p>No comparisons available.</p>"
    else:
        comp_html = comp_match.group(1).strip()

    new_inner = f"""
  <div class="mission-dashboard">
    
    <!-- Hero Section -->
    <div class="mission-hero">
      <div class="mission-hero-header">
        <h2 class="hero-title">{title_html}</h2>
        <div class="hero-badges">
           <span class="badge-stars">★★★★★</span>
           <span class="badge-type">Advanced Tool</span>
        </div>
      </div>
      <div class="mission-actions">
        <button class="action-btn primary" onclick="alert('Course coming soon!')">▶ Start Course</button>
        <button class="action-btn" onclick="alert('Lab environment booting...')">💻 Interactive Lab</button>
        <button class="action-btn" onclick="alert('Cheat sheet downloaded.')">📋 Cheat Sheet</button>
      </div>
      <div class="mission-progress">
        <div class="progress-label">Mission Progress: 0%</div>
        <div class="progress-bar"><div class="progress-fill" style="width: 0%;"></div></div>
      </div>
    </div>

    <!-- Overview -->
    <div class="mission-module">
      <h3 class="module-title">📖 Mission Briefing</h3>
      <div class="module-content">
        {overview_html}
      </div>
    </div>

    <!-- Workflow -->
    <div class="mission-module">
      <h3 class="module-title">🎯 Tactical Workflow</h3>
      <div class="module-content">
        {wf_html}
      </div>
    </div>

    <!-- Commands -->
    <div class="mission-module">
      <h3 class="module-title">💻 Command Center</h3>
      <div class="module-content command-cards">
        {cmds_html}
      </div>
    </div>

    <!-- Mock Labs -->
    <div class="mission-module">
      <h3 class="module-title">🧪 Interactive Labs</h3>
      <div class="module-content labs-grid">
        <div class="lab-card">
          <h4>Lab 1: Basic Operations</h4>
          <p>Difficulty: ⭐⭐☆ | Time: 10 min</p>
          <button class="lab-btn" onclick="alert('Launching Lab...')">Launch Lab</button>
        </div>
        <div class="lab-card">
          <h4>Lab 2: Advanced Scenarios</h4>
          <p>Difficulty: ⭐⭐⭐⭐ | Time: 25 min</p>
          <button class="lab-btn" onclick="alert('Launching Lab...')">Launch Lab</button>
        </div>
      </div>
    </div>

    <!-- Comparisons -->
    <div class="mission-module">
      <h3 class="module-title">⚖ Tactical Comparison</h3>
      <div class="module-content">
        {comp_html}
      </div>
    </div>

  </div>
</div>
"""
    return start_tag + new_inner

new_html = pattern.sub(rebuild_tool, html)

with open(r'd:\abdo_portfolio\build\index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Re-architected all tools into Mission Dashboards!")
