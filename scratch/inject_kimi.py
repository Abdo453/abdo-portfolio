import re
import sys

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"
js_file = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. HTML: Add Progress Bar and Cheat Sheet
html_progress_bar = """
        <!-- RHCSA Progress Bar -->
        <div class="cyber-card" style="margin-top: 20px; text-align: center;">
          <h3 style="color:var(--neon-cyan); margin-bottom: 15px;">🚀 EX200 Readiness Tracker</h3>
          <div style="background: rgba(255,255,255,0.1); border-radius: 10px; height: 20px; width: 100%; overflow: hidden; border: 1px solid var(--border-color);">
            <div id="rhcsa-progress-bar" style="background: linear-gradient(90deg, #cc0000, #ff0055); height: 100%; width: 0%; transition: width 0.4s ease;"></div>
          </div>
          <p id="rhcsa-progress-text" style="margin-top: 10px; font-weight: bold;">0% Completed</p>
          <button id="rhcsa-ready-btn" class="cyber-btn" style="display: none; margin: 15px auto 0 auto; background: var(--neon-cyan); color: #000;">🎯 Ready for EX200!</button>
        </div>
"""

html_cheat_sheet = """
        <div class="cyber-card" style="margin-top: 20px;">
          <div class="card-header"><h3 style="color:#00e5ff;">📜 RHCSA EX200 Cheat Sheet</h3></div>
          <pre style="background:#0f172a; padding:15px; border-radius:5px; border-left:3px solid #00e5ff; color:#e2e8f0; font-family:'Fira Code', monospace; font-size:0.85rem; overflow-x:auto;">
# --- LVM (Always on the exam) ---
pvcreate /dev/vdb1
vgcreate vg_data /dev/vdb1
lvcreate -n lv_web -L 5G vg_data
mkfs.xfs /dev/vg_data/lv_web
mount /dev/vg_data/lv_web /mnt/web

# --- Users & Groups ---
groupadd sysadmins
useradd -G sysadmins -s /bin/bash john
passwd john

# --- SELinux ---
semanage port -a -t http_port_t -p tcp 82
restorecon -Rv /var/www/html
          </pre>
        </div>
"""

# Inject progress bar after phase-module-header
html = html.replace(
    """<div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 Certification Track</span>
              <span class="badge badge-tool">🔧 systemctl · podman · semanage · dnf</span>
            </div>
          </div>
        </div>""",
    """<div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 Certification Track</span>
              <span class="badge badge-tool">🔧 systemctl · podman · semanage · dnf</span>
            </div>
          </div>
        </div>""" + html_progress_bar
)

# Replace onclick to add updateRhcsaProgress
html = html.replace(
    """onclick="this.classList.toggle('checked')" """,
    """onclick="this.classList.toggle('checked'); if(typeof updateRhcsaProgress !== 'undefined') updateRhcsaProgress();" """
)

# Add Cheat sheet before resources
html = html.replace(
    """<div class="info-duo">
          <div class="info-box what">
            <h5>📚 Recommended Resources</h5>""",
    html_cheat_sheet + """
        <div class="info-duo">
          <div class="info-box what">
            <h5>📚 Recommended Resources</h5>"""
)

# Update resources with real links
html = html.replace(
    """<li><strong>Beanologi:</strong> Excellent YouTube channel for RHCSA V9.</li>
              <li><strong>Sander van Vugt:</strong> "Red Hat RHCSA 9 Cert Guide".</li>
              <li><strong>Red Hat Documentation:</strong> access.redhat.com</li>""",
    """<li><a href="https://www.youtube.com/@beanologi" target="_blank" style="color:var(--neon-cyan);"><strong>Beanologi:</strong></a> Excellent YouTube channel for RHCSA V9.</li>
              <li><a href="https://www.pearsonitcertification.com/store/red-hat-rhcsa-9-cert-guide-ex200-9780138036818" target="_blank" style="color:var(--neon-cyan);"><strong>Sander van Vugt:</strong></a> "Red Hat RHCSA 9 Cert Guide".</li>
              <li><a href="https://access.redhat.com/documentation" target="_blank" style="color:var(--neon-cyan);"><strong>Red Hat Documentation:</strong></a> Official documentation.</li>"""
)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)


# 2. JS: Add progress logic and terminal Easter Eggs
js_additions = """
// RHCSA Progress logic
function updateRhcsaProgress() {
  const checklists = document.querySelectorAll('#checklist-p_rhcsa_124 .rd-check-item, #checklist-p_rhcsa_134 .rd-check-item');
  if(checklists.length === 0) return;
  const completed = document.querySelectorAll('#checklist-p_rhcsa_124 .rd-check-item.checked, #checklist-p_rhcsa_134 .rd-check-item.checked');
  
  const percentage = Math.round((completed.length / checklists.length) * 100);
  
  const bar = document.getElementById('rhcsa-progress-bar');
  const text = document.getElementById('rhcsa-progress-text');
  const btn = document.getElementById('rhcsa-ready-btn');
  
  if(bar && text) {
    bar.style.width = percentage + '%';
    text.innerText = percentage + '% Completed';
    
    if(percentage === 100) {
      btn.style.display = 'block';
      bar.style.background = 'linear-gradient(90deg, #00e5ff, #3ddc84)';
    } else {
      btn.style.display = 'none';
      bar.style.background = 'linear-gradient(90deg, #cc0000, #ff0055)';
    }
  }
}
"""

js_terminal_additions = """
      } else if (cmd.includes('dnf install httpd') || cmd.includes('yum install httpd')) {
        printTermLine('[info] Installing Apache HTTP Server...', 'text-secondary');
        setTimeout(() => {
          printTermLine('Complete! 1 package installed.', 'text-neon-green');
          printTermLine('Remember to run: systemctl enable --now httpd', 'text-neon-cyan');
        }, 800);
      } else if (cmd.includes('systemctl status sshd') || cmd.includes('systemctl status httpd')) {
        printTermLine('● sshd.service - OpenSSH server daemon', 'text-secondary');
        printTermLine('   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)', 'text-secondary');
        printTermLine('   Active: active (running) since Mon 2026-06-18 10:00:00 UTC; 2h ago', 'text-neon-green');
      } else if (cmd.includes('getenforce')) {
        printTermLine('Enforcing', 'text-neon-green');
      } else if (cmd.includes('fdisk -l')) {
        printTermLine('Disk /dev/vda: 20 GiB, 21474836480 bytes, 41943040 sectors', 'text-secondary');
        printTermLine('Disk /dev/vdb: 10 GiB, 10737418240 bytes, 20971520 sectors', 'text-secondary');
        printTermLine('Device     Boot   Start      End  Sectors  Size Id Type', 'text-secondary');
        printTermLine('/dev/vda1  *       2048  2099199  2097152    1G 83 Linux', 'text-secondary');
        printTermLine('/dev/vda2       2099200 41943039 39843840   19G 8e Linux LVM', 'text-secondary');
      } else if (cmd.includes('ip a') || cmd.includes('ip addr')) {
        printTermLine('1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN', 'text-secondary');
        printTermLine('    inet 127.0.0.1/8 scope host lo', 'text-secondary');
        printTermLine('2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP', 'text-neon-cyan');
        printTermLine('    inet 192.168.1.10/24 brd 192.168.1.255 scope global dynamic eth0', 'text-neon-green');
"""

with open(js_file, 'r', encoding='utf-8') as f:
    js = f.read()

# Add progress logic function at the end
js += "\n" + js_additions

# Add terminal additions
insert_marker_js_cmd = r"\s+} else {\n\s+printTermLine\(`Command not found"
js = re.sub(insert_marker_js_cmd, lambda m: js_terminal_additions + "\n      } else {\n        printTermLine(`Command not found", js)

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js)

print("Kimi injection successful.")
