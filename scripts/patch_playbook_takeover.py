import os

def patch_playbook():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(project_dir, 'main', 'templates', 'main', 'books', 'bug_bounty_playbook.html')
    
    # Try reading with utf-8 first, fallback to windows-1256 or ignore errors
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

    js_code = """
    function runTakeoverSimulation() {
      const statusNode = document.getElementById('takeover-status-node');
      const statusIcon = document.getElementById('takeover-status-icon');
      const statusTitle = document.getElementById('takeover-status-title');
      const statusDesc = document.getElementById('takeover-status-desc');
      const browserContent = document.getElementById('virtual-browser-content');
      const btn = document.getElementById('btn-simulate-takeover');

      // Update Node status
      statusNode.style.background = 'rgba(0, 255, 102, 0.15)';
      statusNode.style.borderColor = '#00ff66';
      statusIcon.innerText = '🛡️';
      statusTitle.innerText = 'تمت السيطرة بنجاح';
      statusTitle.style.color = '#00ff66';
      statusDesc.innerText = 'Controlled by Researcher';
      statusDesc.style.color = '#00ff66';

      // Update Virtual Browser Frame
      browserContent.style.background = 'rgba(0, 255, 102, 0.03)';
      browserContent.innerHTML = `
        <h1 style="color: #00ff66; font-size: 1.8rem; margin: 0 0 10px 0; font-weight:900; text-shadow:0 0 15px rgba(0,255,102,0.4);">Hijacked Successfully</h1>
        <p style="color: #e2e8f0; font-size: 0.95rem; margin: 0 0 15px 0;">This subdomain is currently pointing to a resource controlled by <strong>Security Researcher</strong>.</p>
        <div style="border:1px dashed #00ff66; padding: 8px 16px; border-radius: 4px; display:inline-block; font-family:monospace; color:#00ff66; font-size:0.8rem; background:rgba(0,255,102,0.05);">
          PoC Verified: CNAME target hijacked
        </div>
      `;

      // Disable button
      btn.innerText = '✓ تمت المحاكاة بنجاح';
      btn.style.background = 'linear-gradient(135deg, #00ff66 0%, #00e5ff 100%)';
      btn.disabled = true;
    }

    function filterTakeoverTable() {
      const q = document.getElementById('takeover-search-input').value.toLowerCase().trim();
      const rows = document.querySelectorAll('#takeover-signatures-table tbody tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    // Initial call to populate values
    window.onload = function() {
      updateCommands();
      loadChecklist();
    };
"""

    target_onload = """    // Initial call to populate values
    window.onload = function() {
      updateCommands();
      loadChecklist();
    };"""

    if target_onload in content:
        content = content.replace(target_onload, js_code)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully injected javascript functions.")
    else:
        # Check if already patched
        if "runTakeoverSimulation()" in content:
            print("Already patched.")
        else:
            print("Target window.onload pattern not found.")

if __name__ == '__main__':
    patch_playbook()
