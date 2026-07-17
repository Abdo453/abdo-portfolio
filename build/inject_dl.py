import re
import codecs

path = 'd:/abdo_portfolio/build/js/methodology.js'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

darkweb_sim = r'''  darkweb: [
    { text: `root@kali:~# proxychains4 -q torbrowser-launcher`, type: `cmd`, delay: 500 },
    { text: `[+] Tor network connected...`, delay: 400 },
    { text: `[+] Launching Ahmia Search Engine on Tor...`, delay: 600 },
    { text: `[INFO] Navigating to http://lockbitapt...onion`, delay: 800 },
    { text: `[!] ALERT: "TARGET CORPORATION" FOUND ON RANSOMWARE BLOG`, type: `err`, delay: 1200 },
    { text: `root@kali:~# proxychains4 -q wget -r -np http://lockbitapt...onion/target_leak/`, type: `cmd`, delay: 800 },
    { text: `Downloading: /target_leak/aws_keys.txt ... OK`, delay: 300 },
    { text: `Downloading: /target_leak/employees_passwords.csv ... OK`, delay: 300 },
    { text: `Downloading: /target_leak/network_topology.pdf ... OK`, delay: 300 },
    { text: `root@kali:~# cat aws_keys.txt`, type: `cmd`, delay: 600 },
    { text: `AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE`, type: `err`, delay: 100 },
    { text: `AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`, type: `err`, delay: 100 },
    { text: `[!!!] CRITICAL CLOUD INFRASTRUCTURE KEYS ACQUIRED [!!!]`, type: `err`, delay: 1000 }
  ],'''

leaks_sim = r'''  leaks: [
    { text: `root@kali:~# h8mail -t "admin@target.com" -c config.ini`, type: `cmd`, delay: 800 },
    { text: `[+] Initializing h8mail v2.5.6`, type: `warn`, delay: 300 },
    { text: `[+] Loading API Keys from config.ini... OK`, delay: 200 },
    { text: `[*] Querying DeHashed API...`, delay: 600 },
    { text: `[*] Querying Leak-Lookup API...`, delay: 500 },
    { text: `[*] Querying IntelligenceX...`, delay: 400 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!] BREACH FOUND: Collection #1 (2019)`, type: `err`, delay: 800 },
    { text: `Email: admin@target.com`, delay: 100 },
    { text: `Cleartext Password: SuperSecretAdmin2019!`, type: `err`, delay: 100 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!] BREACH FOUND: LinkedIn Data Leak (2021)`, type: `err`, delay: 600 },
    { text: `Email: admin@target.com`, delay: 100 },
    { text: `Cleartext Password: TargetCorp@2021!`, type: `err`, delay: 100 },
    { text: `------------------------------------------------------`, delay: 100 },
    { text: `[!!!] FATAL: VALID CLEARTEXT PASSWORDS RECOVERED.`, type: `err`, delay: 1000 },
    { text: `[!!!] PROCEEDING TO VPN/RDP INITIAL ACCESS.`, type: `err`, delay: 500 }
  ],'''

# We need to insert this before `supply: [` so that it becomes part of `simulationScripts`.
# Actually, let's insert it before `  supply: [`
if 'supply: [' in content:
    content = content.replace('  supply: [', darkweb_sim + '\n' + leaks_sim + '\n  supply: [')
    
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(content)
    print("Injected simulations!")
else:
    print("Could not find supply: [")
