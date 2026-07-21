import re

filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\views.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace everything from `def get_portfolio_context():` down to `'academy_explorer': [`
new_content_start = """def get_portfolio_context():
    return {
        'name': 'Abdo Ramdan',
        'title': 'Cybersecurity Learner | OSCP Track | Web Developer',
        'tagline': '> "I break systems to understand how to build secure ones."',
        'bio': 'Security Researcher & OSCP Candidate. Focused on Web Application Penetration Testing, Network Security Auditing, and Linux Systems Administration. Passionate about discovering vulnerabilities, writing scripts to automate security tasks, and sharing knowledge through detailed writeups.',
        'about': {
            'text': 'أنا مهتم بالأمن السيبراني واختبار الاختراق، بشتغل على فهم الثغرات في تطبيقات الويب والبنية التحتية، وبطبق ده من خلال مختبرات عملية ومشاريع حقيقية.',
            'oscp_journey': 'Currently preparing for the OSCP exam, focusing on enumerating complex Active Directory environments, exploiting web vulnerabilities, and mastering privilege escalation vectors on both Windows and Linux.',
            'tools': ['Kali Linux', 'Burp Suite Pro', 'Nmap', 'Metasploit', 'Bash/Python'],
            'goals': ['Attain OSCP Certification', 'Contribute to open-source security tools', 'Find High-Impact Bugs in Bug Bounty Programs']
        },
        'security_mindset': {
            'methodology': 'I always start with enumeration before exploitation.',
            'description': 'A successful penetration test relies 90% on enumeration and 10% on exploitation. I approach every target by mapping the entire attack surface, understanding the application logic, identifying non-obvious entry points, and only then moving to exploit development or payload delivery.'
        },
        'social': {
            'github': 'https://github.com/Abdo453',
            'facebook': 'https://www.facebook.com/AvatarV7x',
            'linkedin': 'https://linkedin.com/in/abdo-ramdan',
            'telegram': 'https://t.me/AvatarV7x',
            'email': 'abdo.ramdan.sec@gmail.com',
            'tryhackme': 'https://tryhackme.com/p/Abdo453',
            'hackthebox': 'https://app.hackthebox.com/profile/Abdo453',
        },
        'current_focus': [
            'Active Directory Exploitation (AD Labs)',
            'Advanced Linux Privilege Escalation (PrivEsc)',
            'OSCP Certification Preparation (OffSec PWK)',
        ],
        'skills': {
            'offensive': [
                {'name': 'Web Pentesting', 'level': 90, 'icon': '🎯'},
                {'name': 'Recon & Enumeration', 'level': 95, 'icon': '🌍'},
                {'name': 'Vulnerability Scanning', 'level': 85, 'icon': '🛡️'},
                {'name': 'Active Directory', 'level': 75, 'icon': '🔑'},
            ],
            'development': [
                {'name': 'HTML / CSS / JS', 'level': 90, 'icon': '💻'},
                {'name': 'React', 'level': 80, 'icon': '⚛️'},
                {'name': 'Python Basics', 'level': 85, 'icon': '🐍'},
                {'name': 'Bash Scripting', 'level': 85, 'icon': '🐚'},
            ],
            'tools': [
                {'name': 'Burp Suite', 'level': 85, 'icon': '🌐'},
                {'name': 'Nmap', 'level': 92, 'icon': '📡'},
                {'name': 'Wireshark', 'level': 80, 'icon': '🔍'},
                {'name': 'Gobuster / Feroxbuster', 'level': 88, 'icon': '📂'},
            ]
        },
        'projects': [
            {
                'title': 'Multithreaded Port Scanner',
                'description': 'A high-performance multithreaded network port scanner built in Python. Resolves hostnames, scans custom ports, identifies running services, and outputs results in clean, readable formats.',
                'image': 'main/images/port_scanner.png',
                'problem_solved': 'Network scanning in Python using single threads is painfully slow. This tool solves the bottleneck using ThreadPoolExecutor.',
                'tech_stack': ['Python 3', 'Sockets', 'ThreadPoolExecutor'],
                'security_considerations': 'Implemented timeout handling to avoid hanging on stealthy/filtered ports, and added randomized delays to prevent triggering simple IDS/IPS rules.',
                'github_url': 'https://github.com/Abdo453/port-scanner',
                'color': '#00ff66',
            },
            {
                'title': 'Directory Bruteforcer',
                'description': 'A lightweight, fast command-line directory fuzzer to discover hidden files and folders on a target web server using dictionary attacks with status code filtering.',
                'image': 'main/images/dir_bruteforce.png',
                'problem_solved': 'Finding hidden endpoints efficiently without crashing the server. Handled connection pooling and rate-limiting issues.',
                'tech_stack': ['Python', 'Requests API', 'Wordlists'],
                'security_considerations': 'Supports custom User-Agents and HTTP Headers to evade basic WAF rules during recursive scanning.',
                'github_url': 'https://github.com/Abdo453/dir-bruteforcer',
                'color': '#00e5ff',
            },
            {
                'title': 'Linux Enumeration Script',
                'description': 'An automated bash script that executes security audits and searches for local privilege escalation vectors, including SUID binaries, misconfigured cron jobs, and kernel exploits.',
                'image': 'main/images/linux_enum.png',
                'problem_solved': 'Reduced manual post-exploitation auditing time from hours to seconds by automating check lists from PayloadAllTheThings and GTFOBins.',
                'tech_stack': ['Bash', 'Linux Syscalls', 'Awk/Sed'],
                'security_considerations': 'Runs silently without installing new binaries on the target system to avoid leaving footprints (Living off the Land).',
                'github_url': 'https://github.com/Abdo453/linux-enum',
                'color': '#ff9a56',
            }
        ],
        'labs': [
            {
                'id': 'lab-web-vuln',
                'title': 'Lab: Web Vulnerability Discovery',
                'goal': 'Find hidden endpoints and bypass authentication on a hardened web server.',
                'steps': [
                    '1. Performed initial port scan with Nmap to discover HTTP services.',
                    '2. Used Feroxbuster with custom wordlists to fuzz directories, revealing a hidden /admin-staging portal.',
                    '3. Intercepted login requests with Burp Suite and discovered a SQL Injection vulnerability in the username field.',
                    '4. Exploited the SQLi to extract admin credentials.'
                ],
                'tools': ['Feroxbuster', 'Burp Suite', 'Nmap', 'SQLMap'],
                'result': 'Discovered admin panel + Exposed endpoint + Retrieved Administrator Flag',
                'date': 'May 15, 2026'
            },
            {
                'id': 'lab-privesc',
                'title': 'Lab: Linux Privilege Escalation',
                'goal': 'Escalate privileges from a standard user to root on a vulnerable Linux box.',
                'steps': [
                    '1. Gained initial access via a vulnerable web application upload feature.',
                    '2. Uploaded a reverse shell and executed LinPEAS for automated enumeration.',
                    '3. Identified a misconfigured SUID binary (/usr/bin/find) owned by root.',
                    '4. Abused the SUID bit using GTFOBins payload: `find . -exec /bin/sh -p \\; -quit` to spawn a root shell.'
                ],
                'tools': ['LinPEAS', 'GTFOBins', 'Netcat'],
                'result': 'Spawned root shell + Captured root.txt flag',
                'date': 'May 10, 2026'
            },
            {
                'id': 'lab-ad-enum',
                'title': 'Lab: Active Directory Enumeration',
                'goal': 'Enumerate an Active Directory domain and identify paths to Domain Admin.',
                'steps': [
                    '1. Used Responder to capture NTLMv2 hashes from LLMNR/NBT-NS poisoning.',
                    '2. Cracked the hash using Hashcat to gain valid domain user credentials.',
                    '3. Ran BloodHound (Sharphound) to map out domain trusts and user privileges.',
                    '4. Identified a Kerberoasting attack path leading to a service account with high privileges.'
                ],
                'tools': ['Responder', 'Hashcat', 'BloodHound', 'Impacket'],
                'result': 'Mapped attack path to Domain Admin + Extracted Service Account Hash',
                'date': 'May 05, 2026'
            }
        ],
        'academy_explorer': ["""

pattern = re.compile(r"def get_portfolio_context\(\):\n    return \{.*?'academy_explorer': \[", re.DOTALL)
new_file_content = pattern.sub(new_content_start, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_file_content)

print("Updated views.py with the new Portfolio structure!")
