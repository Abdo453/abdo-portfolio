import re

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# =============================================
# 1. Add OSCP sidebar item + content section
# =============================================
oscp_sidebar = """          <div class="meth-item" id="meth-ef-p_oscp" onclick="openMethPhase('p_oscp')" data-search="oscp offensive security pen200 privilege escalation buffer overflow exploit">
            <span>├── 🎯</span> <span>OSCP (PEN-200)</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_oscp', '🎯 OSCP PEN-200')">★</button>
          </div>"""

mcsa_sidebar = """          <div class="meth-item" id="meth-ef-p_mcsa" onclick="openMethPhase('p_mcsa')" data-search="mcsa windows server active directory group policy hyper-v failover">
            <span>└── 🖥️</span> <span>Windows Server (MCSA)</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_mcsa', '🖥️ Windows Server MCSA')">★</button>
          </div>"""

# Inject into AD/RedTeam category
cat_ad_close = '        </div>\n      </div>\n\n      <!-- Category 8: Modern Tech'
if cat_ad_close in html:
    html = html.replace(
        cat_ad_close,
        f'{oscp_sidebar}\n{mcsa_sidebar}\n{cat_ad_close}'
    )
    print("Sidebar items injected.")
else:
    print("ERROR: Could not find AD category close.")

# =============================================
# 2. OSCP Content Section
# =============================================
oscp_content = """
      <!-- Phase: OSCP PEN-200 -->
      <div class="meth-content-view" id="meth-content-p_oscp" style="display: none; --tool-color: #ff6600;">
        <div class="phase-module-header">
          <div class="phase-module-icon" style="color: #ff6600; text-shadow: 0 0 15px #ff6600;">🎯</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">OSCP — PEN-200 Offensive Security</h1>
            <p class="phase-module-tagline">The gold standard in hands-on penetration testing certification. Try Harder.</p>
            <div class="phase-meta-badges">
              <span class="badge badge-advanced">🔴 Expert / OSCP Level</span>
              <span class="badge badge-tool">🔧 Metasploit · Nmap · Buffer Overflow · PrivEsc</span>
            </div>
          </div>
        </div>

        <div class="info-duo" style="margin-bottom: 25px;">
          <div class="info-box what" style="background: rgba(255,102,0, 0.05); border-left: 3px solid #ff6600;">
            <h5 style="color: #ff6600;">⚡ OSCP Mindset: Try Harder</h5>
            <p style="font-size:0.85rem; margin-top:5px;">OSCP is a 24-hour performance exam in a live lab environment. No multiple choice — you exploit real machines. The mindset shift: don't look for a walkthrough, enumerate deeper. The answer is always in the enumeration.</p>
          </div>
        </div>

        <!-- Core Attack Methodology -->
        <div class="cyber-card" style="border-top: 2px solid #ff6600;">
          <div class="card-header"><h3 style="color:#ff6600;">🗺️ The OSCP Attack Methodology (5 Steps)</h3></div>
          <div class="rd-checklist-wrap">
            <div id="checklist-oscp-meth">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>1. Enumerate Everything First:</strong> Run <code>nmap -sC -sV -oA full_scan target</code> then <code>nmap -p- target</code> for all 65535 ports. Never skip port 8080, 8443, or non-standard services.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>2. Research Every Version:</strong> Every service version you find — Google it + <code>searchsploit &lt;service&gt; &lt;version&gt;</code>. Check ExploitDB, GitHub, and CVEdetails.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>3. Low Hanging Fruit First:</strong> Check for default credentials, anonymous FTP, open SMB shares (<code>smbclient -L target</code>), and readable web directories before chasing complex exploits.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>4. Get a Shell, Then PrivEsc:</strong> Once you have a foothold, run <code>LinPEAS.sh</code> (Linux) or <code>WinPEAS.exe</code> (Windows) immediately to find privilege escalation vectors.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>5. Document Everything in Real-Time:</strong> Take screenshots at every step (proof.txt, local.txt). Use CherryTree or Obsidian for notes. You need them for the report.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buffer Overflow -->
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#f59e0b;">💥 Buffer Overflow (The Guaranteed 25 Points)</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary);">OSCP always includes a Buffer Overflow machine. It's a guaranteed 25 points if you practice the steps.</p>
          <div class="cmd-grid" style="grid-template-columns: 1fr;">
            <div class="cmd-card" style="border-left: 3px solid #f59e0b;">
              <strong style="color:#f59e0b;">Step-by-step BOF Methodology:</strong>
              <ol style="font-size:0.8rem; margin:5px 0; padding-left:20px; color: var(--text-secondary);">
                <li>Fuzz the application to find the crash offset (Spike/Python fuzzer).</li>
                <li>Find exact EIP offset using <code>msf-pattern_create -l 3000</code> → <code>msf-pattern_offset</code>.</li>
                <li>Overwrite EIP with <code>42424242</code> to confirm control.</li>
                <li>Find Bad Characters (<code>\\x00</code> always bad, brute force the rest).</li>
                <li>Find JMP ESP using <code>!mona jmp -r esp -cpb "badchars"</code> in Immunity Debugger.</li>
                <li>Generate shellcode: <code>msfvenom -p windows/shell_reverse_tcp LHOST=... LPORT=... -b "badchars" -f py</code>.</li>
                <li>Add 16-byte NOP sled, assemble and fire!</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- PrivEsc Quick Ref -->
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#00d9ff;">🔝 Privilege Escalation Quick Reference</h3></div>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>OS</th><th>Check</th><th>Command/Tool</th></tr></thead>
            <tbody>
              <tr><td>Linux</td><td>SUID Binaries</td><td><code>find / -perm -4000 -type f 2>/dev/null</code> → Check GTFOBins</td></tr>
              <tr><td>Linux</td><td>Sudo Rights</td><td><code>sudo -l</code> → Look for NOPASSWD entries</td></tr>
              <tr><td>Linux</td><td>Cron Jobs</td><td><code>crontab -l; cat /etc/crontab</code> → Writable scripts running as root?</td></tr>
              <tr><td>Windows</td><td>Unquoted Service Paths</td><td><code>wmic service get name,displayname,pathname | findstr /i /v "C:\\Windows\\\\"</code></td></tr>
              <tr><td>Windows</td><td>Weak Service Perms</td><td><code>accesschk.exe -uwcqv "Everyone" *</code> → Can you modify a service binary?</td></tr>
              <tr><td>Windows</td><td>Token Impersonation</td><td>If SeImpersonatePrivilege → use <code>PrintSpoofer</code> or <code>GodPotato</code></td></tr>
            </tbody>
          </table></div>
        </div>

        <button class="mark-complete-btn" id="complete-btn-p_oscp" onclick="markPhaseComplete('p_oscp','p_mcsa')" style="margin-top: 20px;">
          ✅ Mark Complete — OSCP Methodology Reviewed
        </button>
      </div>

"""

# =============================================
# 3. MCSA Content Section
# =============================================
mcsa_content = """
      <!-- Phase: MCSA / Windows Server -->
      <div class="meth-content-view" id="meth-content-p_mcsa" style="display: none; --tool-color: #0078d4;">
        <div class="phase-module-header">
          <div class="phase-module-icon" style="color: #0078d4; text-shadow: 0 0 15px #0078d4;">🖥️</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">Windows Server Administration (MCSA)</h1>
            <p class="phase-module-tagline">Enterprise Windows infrastructure — from the administrator's and the attacker's perspective.</p>
            <div class="phase-meta-badges">
              <span class="badge" style="background:#0078d4; color:#fff;">🔵 Intermediate / Sys Admin</span>
              <span class="badge badge-tool">🔧 Active Directory · Group Policy · Hyper-V · PowerShell</span>
            </div>
          </div>
        </div>

        <!-- Core Administration -->
        <div class="cyber-card" style="border-top: 2px solid #0078d4;">
          <div class="card-header"><h3 style="color:#0078d4;">🛡️ Core Windows Server Administration Checklist</h3></div>
          <div class="rd-checklist-wrap">
            <div id="checklist-mcsa-admin">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Active Directory DS Setup:</strong> Promote a server to Domain Controller using <code>Install-ADDSForest -DomainName "corp.local"</code>. Understand Forest vs Domain vs OU hierarchy.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Group Policy (GPO):</strong> Create and link GPOs to enforce security baselines (Password Policy, Firewall Rules, AppLocker). Use <code>gpupdate /force</code> and <code>gpresult /R</code> to verify.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Hyper-V Virtualization:</strong> Create VMs using PowerShell: <code>New-VM -Name "Server01" -MemoryStartupBytes 2GB -VHDPath "C:\\VMs\\Server01.vhdx"</code>.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Failover Clustering:</strong> Understand quorum configurations, witness modes, and how Failover Cluster Manager (WSFC) provides High Availability for SQL Server / File Server roles.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>PowerShell Remoting (WinRM):</strong> Enable with <code>Enable-PSRemoting -Force</code>. Use <code>Enter-PSSession -ComputerName Server01</code> for remote admin. Critical for scale automation.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Attacker Perspective Card -->
        <div class="cyber-card" style="margin-top:20px; background: rgba(255,0,85,0.03); border-left: 3px solid #ff0055;">
          <div class="card-header"><h3 style="color:#ff0055;">🔴 The Attacker's Perspective on Windows Server</h3></div>
          <p style="font-size:0.85rem;">Understanding how to administrate Windows Server makes you a better attacker. Common misconfigurations to look for:</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>Misconfiguration</th><th>Attack Vector</th><th>Impact</th></tr></thead>
            <tbody>
              <tr><td>Default Admin Share (C$, ADMIN$)</td><td><code>net use \\target\C$ /user:Admin password</code></td><td>Full remote file access</td></tr>
              <tr><td>WinRM enabled + weak creds</td><td><code>evil-winrm -i target -u admin -p password</code></td><td>Remote PowerShell shell</td></tr>
              <tr><td>Unconstrained Delegation</td><td>Any computer account with unconstrained delegation can store TGTs and impersonate any user.</td><td>Domain Privilege Escalation</td></tr>
              <tr><td>MS17-010 (EternalBlue)</td><td>Unpatched SMBv1 → <code>use exploit/windows/smb/ms17_010_eternalblue</code></td><td>SYSTEM shell on target</td></tr>
            </tbody>
          </table></div>
        </div>

        <button class="mark-complete-btn" id="complete-btn-p_mcsa" onclick="markPhaseComplete('p_mcsa','p_redteam')" style="margin-top: 20px;">
          ✅ Mark Complete — Windows Server Review Done
        </button>
      </div>

"""

# Inject before the first Category: Mobile section closing
inject_before = '      <!-- Category 6: Mobile & Advanced API -->'
if inject_before in html:
    html = html.replace(inject_before, oscp_content + mcsa_content + inject_before)
    print("OSCP and MCSA content sections injected.")
else:
    print("ERROR: Could not find injection point for content sections.")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("All injections applied successfully.")
