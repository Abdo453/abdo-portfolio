import re
import sys

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"
js_file = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

# 1. Update HTML Sidebar
html_sidebar_addition = """
      <!-- Category 9: Linux Admin & Security -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-rhcsa')">
          <span>🐧 LINUX ADMIN & SEC (RHCSA)</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-rhcsa">
          <div class="meth-item" id="meth-ef-p_rhcsa" onclick="openMethPhase('p_rhcsa')" data-search="linux red hat rhcsa rh124 rh134 administration security">
            <span>├── 🐧</span> <span>RHEL 9 Administration</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_rhcsa', '🐧 RHEL 9 Administration')">★</button>
          </div>
        </div>
      </div>
"""

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

insert_marker_sidebar = r"    </div>\s+<!-- Right Viewer: Dynamic Content Panes -->"
html = re.sub(insert_marker_sidebar, lambda m: html_sidebar_addition + "\n    </div>\n\n    <!-- Right Viewer: Dynamic Content Panes -->", html)


# Add the new phase contents
html_content_views = """
      <!-- Phase: RHCSA -->
      <div class="meth-content-view" id="meth-content-p_rhcsa" style="display: none; --tool-color: #cc0000;">
        <div class="phase-module-header">
          <div class="phase-module-icon" style="color: #cc0000; text-shadow: 0 0 15px #cc0000;">🐧</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">Red Hat System Administration (RHCSA)</h1>
            <p class="phase-module-tagline">Comprehensive study plan for RH124 & RH134 to master RHEL 9/10 and pass EX200.</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 Certification Track</span>
              <span class="badge badge-tool">🔧 systemctl · podman · semanage · dnf</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3 style="color:var(--neon-cyan);">🎯 RH124: Red Hat System Administration I (Weeks 1-4)</h3></div>
          <div class="rd-checklist-wrap" style="margin-top:15px;">
            <div id="checklist-p_rhcsa_124">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 1: Files & Commands</strong> - <code>cp</code>, <code>mv</code>, <code>mkdir</code>, <code>find</code>, <code>tar</code>, FHS navigation.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 2: Users & Permissions</strong> - <code>useradd</code>, <code>usermod</code>, <code>chmod</code>, <code>chown</code>, SUID/SGID.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 3: Networking & Software</strong> - <code>nmcli</code>, <code>ssh</code>, <code>dnf</code>, repositories management.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 4: Storage & Processes</strong> - <code>ps</code>, <code>top</code>, <code>kill</code>, <code>systemctl</code> basics, <code>mount</code>.</span></div>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3 style="color:#ff0055;">⚡ RH134: Red Hat System Administration II (Weeks 5-8)</h3></div>
          <div class="rd-checklist-wrap" style="margin-top:15px;">
            <div id="checklist-p_rhcsa_134">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 5: Shell & Scheduling</strong> - Bash scripts, <code>grep</code>/<code>awk</code>, <code>cron</code>, <code>systemd timers</code>, <code>journalctl</code>.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 6: SELinux & LVM</strong> - <code>semanage</code>, <code>restorecon</code>, <code>pvcreate</code>, <code>vgcreate</code>, <code>lvcreate</code>, <code>lvextend</code>.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 7: Advanced Storage & Sec</strong> - Stratis, VDO, NFS (<code>autofs</code>), <code>firewalld</code> zones.</span></div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div><span><strong>Week 8: Boot & Containers</strong> - GRUB2, root password recovery, <code>podman run/build</code>, Rootless containers.</span></div>
            </div>
          </div>
        </div>

        <div class="info-duo">
          <div class="info-box what">
            <h5>📚 Recommended Resources</h5>
            <ul style="padding-left:20px; font-size:0.85rem;">
              <li><strong>Beanologi:</strong> Excellent YouTube channel for RHCSA V9.</li>
              <li><strong>Sander van Vugt:</strong> "Red Hat RHCSA 9 Cert Guide".</li>
              <li><strong>Red Hat Documentation:</strong> access.redhat.com</li>
            </ul>
          </div>
          <div class="info-box goal">
            <h5>⚠️ Pro Tips for EX200</h5>
            <ul style="padding-left:20px; font-size:0.85rem;">
              <li><strong>Hands-on:</strong> The exam is 100% performance-based. Practice is everything.</li>
              <li><strong>Snapshots:</strong> Take VM snapshots before every practice lab.</li>
              <li><strong>Time Management:</strong> You have 2.5 hours. Do the easy tasks first!</li>
            </ul>
          </div>
        </div>
      </div>
"""

insert_marker_content = r"      <!-- Phase 0: Subdomain Enumeration"
html = re.sub(insert_marker_content, lambda m: html_content_views + "\n      <!-- Phase 0: Subdomain Enumeration", html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Update JS ALL_PHASES
js_phases_addition = """
      { id: 'p_rhcsa',        icon: '🐧', name: 'RHEL 9 Administration',    cat: 'LINUX ADMIN & SEC (RHCSA)', tags: 'linux red hat rhcsa rh124 rh134 administration security' },
"""

with open(js_file, 'r', encoding='utf-8') as f:
    js = f.read()

insert_marker_js = r"      { id: 'p_scen_takeover'"
js = re.sub(insert_marker_js, lambda m: js_phases_addition + "      { id: 'p_scen_takeover'", js)


js_terminal_additions = """
      } else if (cmd.includes('semanage')) {
        printTermLine('[info] SELinux Policy Management tool', 'text-secondary');
        setTimeout(() => {
          printTermLine('SELinux port types:', 'text-secondary');
          printTermLine('http_port_t                    tcp      80, 81, 443, 488, 8008, 8009, 8443, 9000', 'text-neon-cyan');
          printTermLine('ssh_port_t                     tcp      22', 'text-neon-cyan');
          printTermLine('Use semanage port -a -t http_port_t -p tcp 8080 to add a new port.', 'text-neon-green');
        }, 1000);
      } else if (cmd.includes('podman')) {
        printTermLine('[info] Podman - Daemonless Container Engine', 'text-secondary');
        setTimeout(() => {
          printTermLine('Trying to pull registry.access.redhat.com/ubi9/ubi...', 'text-secondary');
          printTermLine('Getting image source signatures', 'text-secondary');
          printTermLine('Copying blob sha256:abcd1234efgh5678', 'text-neon-cyan');
          printTermLine('Writing manifest to image destination', 'text-secondary');
          printTermLine('[+] Container started successfully. Rootless execution active.', 'text-neon-green');
        }, 1500);
      } else if (cmd.includes('lvs') || cmd.includes('vgs') || cmd.includes('pvs')) {
        printTermLine('  LV          VG      Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert', 'text-secondary');
        printTermLine('  root        rhel    -wi-ao---- <15.00g                                                    ', 'text-neon-cyan');
        printTermLine('  swap        rhel    -wi-ao----  <2.00g                                                    ', 'text-neon-cyan');
"""

insert_marker_js_cmd = r"\s+} else {\n\s+printTermLine\(`Command not found"
js = re.sub(insert_marker_js_cmd, lambda m: js_terminal_additions + "\n      } else {\n        printTermLine(`Command not found", js)

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js)

print("RHCSA injection successful.")
