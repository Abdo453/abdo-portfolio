import re

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

pro_ad_html = """
      <div class="meth-content-view" id="meth-content-p_ad" style="display: none; --tool-color: #ff0055;">
        <div class="phase-module-header">
          <div class="phase-module-icon" style="color: #ff0055; text-shadow: 0 0 15px #ff0055;">👑</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">Active Directory Dominance</h1>
            <p class="phase-module-tagline">Advanced Red Team methodologies to map, exploit, and control Windows domains.</p>
            <div class="phase-meta-badges">
              <span class="badge badge-advanced">🔴 Pro-Level / Expert</span>
              <span class="badge badge-tool">🔧 OPSEC · Rubeus · Impacket · BloodHound</span>
            </div>
          </div>
        </div>

        <div class="info-duo" style="margin-bottom: 25px;">
          <div class="info-box what" style="background: rgba(255, 0, 85, 0.05); border-left: 3px solid #ff0055;">
            <h5 style="color: #ff0055;">🧠 The Red Team Mindset</h5>
            <p style="font-size:0.85rem; margin-top:5px;">
              Active Directory exploitation is not about collecting hashes. It's about understanding the <strong>business topology</strong>, mapping <strong>Trust Relationships</strong>, and identifying the weakest link (often a misconfigured Service Account) to achieve Domain Admin silently.
            </p>
          </div>
        </div>

        <!-- Layer 1 & 2: Fundamentals & Hands-on -->
        <div class="cyber-card" style="border-top: 2px solid #ff0055;">
          <div class="card-header"><h3 style="color:#ff0055;">🩸 Core TTPs Checklist (The Attack Path)</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:15px;">Real-world attacks usually follow this pipeline. Check off steps as you execute them.</p>
          
          <div class="rd-checklist-wrap">
            <div id="checklist-p_ad_attacks">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>1. Local Network Poisoning (No Credentials):</strong> Use <code>Responder -I eth0</code> to capture NTLMv2 hashes via LLMNR/NBT-NS spoofing. Crack with Hashcat.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>2. AS-REP Roasting (No Pre-Auth):</strong> Target users with 'Do not require Kerberos preauthentication' enabled. Extract TGTs using <code>GetNPUsers.py</code>.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>3. BloodHound Enumeration (Any Valid Credential):</strong> Map the environment. OPSEC warning: Use <code>SharpHound</code> carefully in stealth operations to avoid triggering SIEMs.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>4. Kerberoasting (Service Accounts):</strong> Request TGS tickets for SPNs (Service Principal Names) using <code>GetUserSPNs.py</code>. Offline crack for cleartext passwords.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>5. DCSync (Domain Admin Privileges):</strong> Simulate a Domain Controller to pull the entire NTDS.dit (krbtgt hash) using <code>secretsdump.py</code>.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Layer 3: Real World Project / Case Study -->
        <div class="cyber-card" style="margin-top:20px; background: rgba(15,23,42, 0.8);">
          <div class="card-header"><h3 style="color:#00d9ff;">🎯 Project Case Study: Operation "Red Forest"</h3></div>
          <p style="font-size:0.85rem; margin-bottom:10px;">A simulated Red Team scenario demonstrating a complete kill-chain.</p>
          
          <div class="cmd-grid" style="grid-template-columns: 1fr;">
            <div class="cmd-card" style="border-left: 3px solid #3ddc84;">
              <strong style="color:#3ddc84; font-size:0.9rem;">Phase 1: Initial Foothold (Zero to Low-Priv)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">We started with zero credentials on the guest WiFi. Running Responder yielded an NTLMv2 hash for an IT Helpdesk user. We cracked it (Password: <code>Welcome2023!</code>).</p>
            </div>
            <div class="cmd-card" style="border-left: 3px solid #f59e0b;">
              <strong style="color:#f59e0b; font-size:0.9rem;">Phase 2: BloodHound & Lateral Movement</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Using the Helpdesk creds, we ran SharpHound. The graph revealed a <strong>GenericWrite</strong> privilege over an old IIS Service Account. We forced a password reset on this account using <code>targetedKerberoast</code>.</p>
            </div>
            <div class="cmd-card" style="border-left: 3px solid #ff0055;">
              <strong style="color:#ff0055; font-size:0.9rem;">Phase 3: Domain Dominance</strong>
              <p style="font-size:0.8rem; margin:5px 0;">The IIS account was a member of 'Backup Operators'. We leveraged this to read the NTDS.dit registry hive locally, extracted the <code>krbtgt</code> hash, and forged a <strong>Golden Ticket</strong> for full persistence.</p>
            </div>
          </div>
        </div>

        <!-- Layer 4: Advanced Thinking & OPSEC -->
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#f59e0b;">🕵️‍♂️ Advanced OPSEC: Tooling Comparisons</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:15px;">Why use one tool over another in mature environments?</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>Technique</th><th>Impacket (Python)</th><th>Rubeus (C# / .NET)</th><th>Pro-Tip / OPSEC</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Kerberoasting</strong></td>
                <td>Run from your attacking Linux box over the network. Leaves traffic footprint.</td>
                <td>Run <strong>In-Memory</strong> via Cobalt Strike/Sliver on a compromised Windows endpoint.</td>
                <td>Always prefer in-memory .NET (execute-assembly) to avoid dropping files on disk.</td>
              </tr>
              <tr>
                <td><strong>Credential Dumping</strong></td>
                <td><code>secretsdump.py</code> triggers multiple 4624/4634 Event IDs and creates remote services.</td>
                <td><code>Mimikatz (lsadump)</code> or custom BOFs (Beacon Object Files).</td>
                <td>If using secretsdump, clean up event logs (if possible) or use WMI instead of SMBExec to bypass basic monitoring.</td>
              </tr>
            </tbody>
          </table></div>
        </div>

      </div>
"""

# Let's just use string index replacement to be safe.
start_str = '      <div class="meth-content-view" id="meth-content-p_ad"'
end_str = '      <!-- Phase: EDR Evasion & C2 -->'

start_idx = html.find(start_str)
end_idx = html.find(end_str, start_idx)

if start_idx != -1 and end_idx != -1:
    html = html[:start_idx] + pro_ad_html + "\n" + html[end_idx:]
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html)
    print("AD Pro-Level successfully injected.")
else:
    print("Could not find start or end index.")
