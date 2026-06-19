import re
import codecs

path = 'd:/abdo_portfolio/build/js/methodology.js'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

hashcat_sim = '''
  hashcat: [
    { text: "root@kali:~# hashcat -m 0 -a 0 -O -w 3 hashes.txt rockyou.txt -r rules/best64.rule", type: "cmd", delay: 800 },
    { text: "hashcat (v6.2.6) starting...", type: "output", delay: 600 },
    { text: "OpenCL API (OpenCL 3.0 CUDA 12.2.147) - Platform #1 [NVIDIA Corporation]", type: "info", delay: 400 },
    { text: "=======================================================================", type: "output", delay: 100 },
    { text: "* Device #1: NVIDIA GeForce RTX 4090, 24000/24564 MB (6141 MB allocatable), 128MCU", type: "success", delay: 500 },
    { text: "Minimum password length supported by kernel: 0", type: "info", delay: 200 },
    { text: "Maximum password length supported by kernel: 256", type: "info", delay: 200 },
    { text: "Hashes: 1 digests; 1 unique digests, 1 unique salts", type: "info", delay: 300 },
    { text: "Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates", type: "info", delay: 200 },
    { text: "Rules: 77", type: "info", delay: 200 },
    { text: "Dictionary cache hit:", type: "success", delay: 400 },
    { text: "* Filename..: rockyou.txt", type: "output", delay: 100 },
    { text: "* Passwords.: 14344385", type: "output", delay: 100 },
    { text: "* Bytes.....: 139921507", type: "output", delay: 100 },
    { text: "* Keyspace..: 1104517645", type: "output", delay: 100 },
    { text: "Approaching final keyspace - workload is adjusted to save energy.", type: "warning", delay: 1000 },
    { text: "Cracking in progress... [0.00%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [12.45%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [38.12%]", type: "output", delay: 800 },
    { text: "Cracking in progress... [64.88%]", type: "output", delay: 800 },
    { text: "5f4dcc3b5aa765d61d8327deb882cf99:Admin@123", type: "success", delay: 500 },
    { text: "Session..........: hashcat", type: "info", delay: 200 },
    { text: "Status...........: Cracked", type: "success", delay: 200 },
    { text: "Hash.Mode........: 0 (MD5)", type: "info", delay: 200 },
    { text: "Hash.Target......: 5f4dcc3b5aa765d61d8327deb882cf99", type: "info", delay: 200 },
    { text: "Time.Started.....: Wed Jun 17 14:00:00 2026 (4 secs)", type: "info", delay: 200 },
    { text: "Time.Estimated...: Wed Jun 17 14:00:04 2026 (0 secs)", type: "info", delay: 200 },
    { text: "Kernel.Feature...: Pure Kernel", type: "info", delay: 200 },
    { text: "Guess.Base.......: File (rockyou.txt)", type: "info", delay: 200 },
    { text: "Guess.Mod........: Rules (rules/best64.rule)", type: "info", delay: 200 },
    { text: "Speed.#1.........: 145.2 MH/s (3.44ms) @ Accel:512 Loops:77 Thr:256 Vec:8", type: "success", delay: 200 },
    { text: "Recovered........: 1/1 (100.00%) Digests", type: "success", delay: 200 },
    { text: "Progress.........: 61858564/1104517645 (5.60%)", type: "info", delay: 200 },
    { text: "Rejected.........: 0/61858564 (0.00%)", type: "info", delay: 200 },
    { text: "Restore.Point....: 486400/14344385 (3.39%)", type: "info", delay: 200 },
    { text: "Started: Wed Jun 17 14:00:00 2026", type: "info", delay: 200 },
    { text: "Stopped: Wed Jun 17 14:00:05 2026", type: "info", delay: 200 }
  ],
'''

if 'const simulationScripts = {' in content:
    content = content.replace('const simulationScripts = {', 'const simulationScripts = {\n' + hashcat_sim)
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(content)
    print("Hashcat simulation added.")
else:
    print("Could not find simulationScripts object.")
