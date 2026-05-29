from django.shortcuts import render

def get_portfolio_context():
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
                    '4. Abused the SUID bit using GTFOBins payload: `find . -exec /bin/sh -p \; -quit` to spawn a root shell.'
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
                'timeline': [
            {
                'year': '2025 - 2026',
                'title': 'OSCP Preparation & Advanced Labs',
                'description': 'Completing OffSec PWK labs, dominating HackTheBox Pro Labs, and mastering Active Directory exploitation and advanced Web Pentesting.'
            },
            {
                'year': '2024 - 2025',
                'title': 'Frontend Web Developer',
                'description': 'Built modern, responsive, and highly interactive web applications using HTML, CSS, JavaScript, and React. Gained deep understanding of client-side architecture.'
            },
            {
                'year': '2023',
                'title': 'Security Fundamentals & Networking',
                'description': 'Studied network protocols, Linux system administration, and basic security principles. Began solving TryHackMe rooms to build a solid foundation.'
            }
        ],
        'academy_explorer': [
            {
                'id': 'recon',
                'title': 'Reconnaissance',
                'icon': '🌍',
                'color_theme': '#00e5ff',
                'tools': [
                    {
                        'id': 'subfinder', 'images': ['category_recon.png'], 'images': ['category_recon.png'], 'images': ['category_recon.png'],
                        'name': 'subfinder',
                        'icon': '🛠️',
                        'difficulty': 'Easy',
                        'speed': 'Fast',
                        'tagline': 'Passive Subdomain Enumeration Tool',
                        'badges': ['FAST', 'PASSIVE', 'GO-BASED'],
                        'stats': {'speed': 95, 'complexity': 20, 'accuracy': 80},
                        'what_is': 'أداة لجمع Subdomains من مصادر OSINT بشكل سريع جداً دون التفاعل المباشر مع الهدف (Passive).',
                        'why': ['توسعة مساحة الهجوم (Attack Surface)', 'اكتشاف Domains منسية', 'بداية مرحلة الـ Recon'],
                        'flow_nodes': ['Target Domain', 'OSINT Sources', 'Collection', 'Filtering'],
                        'install': 'go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest',
                        'cmd': 'subfinder -d target.com -all -silent',
                        'flags': [
                            { 'flag': '-d', 'desc': 'تحديد الدومين المستهدف' },
                            { 'flag': '-all', 'desc': 'استخدام جميع المصادر المتاحة' },
                            { 'flag': '-silent', 'desc': 'إخفاء الـ Banner وعرض النطاقات فقط' }
                        ],
                        'when_use': ['بداية أي Bug Bounty', 'أثناء الاستطلاع السلبي (Passive Recon)'],
                        'when_not': ['ليست الأفضل للـ Deep Enumeration', 'لا تعتمد عليها وحدها'],
                        'comparison': [
                            {'tool': 'subfinder', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'Yes', 'active': 'No'},
                            {'tool': 'amass', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'Yes', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌍 Target', '🛰️ subfinder', '🌐 httpx', '🕷️ katana', '🔥 nuclei'],
                        'related_tools': ['amass', 'assetfinder', 'httpx']
                    },
                    {
                        'id': 'amass', 'images': ['tool_amass_1.png', 'tool_amass_2.png'], 'images': ['tool_amass_1.png', 'tool_amass_2.png'], 'images': ['tool_amass_1.png', 'tool_amass_2.png'],
                        'name': 'amass',
                        'icon': '🛡️',
                        'difficulty': 'Intermediate',
                        'speed': 'Slow',
                        'tagline': 'In-depth Attack Surface Mapping',
                        'badges': ['DEEP SCAN', 'ACTIVE/PASSIVE', 'GRAPH DB'],
                        'stats': {'speed': 40, 'complexity': 80, 'accuracy': 95},
                        'what_is': 'أداة قوية جداً لجمع النطاقات، تعتمد على تقنيات متعددة مثل APIs, Scraping, DNS bruteforcing.',
                        'why': ['للحصول على نتائج عميقة جداً', 'لاكتشاف النطاقات التي تخفيها الـ OSINT العادية'],
                        'flow_nodes': ['Target', 'DNS/APIs/Scraping', 'Deep Mapping', 'Graph Database'],
                        'install': 'go install github.com/owasp-amass/amass/v4/...@master',
                        'cmd': 'amass enum -passive -d target.com',
                        'flags': [
                            { 'flag': '-passive', 'desc': 'استطلاع سلبي فقط لتجنب الحظر' },
                            { 'flag': '-active', 'desc': 'إرسال طلبات نشطة للخوادم' }
                        ],
                        'when_use': ['عندما تريد بحثاً عميقاً جداً وشاملاً', 'عند استهداف شركات كبيرة بـ Scope واسع'],
                        'when_not': ['لا تستخدمها للبحث السريع أو في الأهداف الصغيرة'],
                        'comparison': [
                            {'tool': 'amass', 'speed': 'Slow', 'accuracy': 'Very High', 'passive': 'Yes', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌍 Target', '🛡️ amass', '🌐 dnsx', '🛰️ httpx'],
                        'related_tools': ['subfinder', 'dnsx', 'assetfinder']
                    },
                    {
                        'id': 'assetfinder', 'images': ['tool_assetfinder.png'], 'images': ['category_recon.png'], 'images': ['category_recon.png'],
                        'name': 'assetfinder',
                        'icon': '⚡',
                        'difficulty': 'Easy',
                        'speed': 'Very Fast',
                        'tagline': 'Find related domains and subdomains',
                        'badges': ['FAST', 'LIGHTWEIGHT', 'PIPELINE'],
                        'stats': {'speed': 100, 'complexity': 10, 'accuracy': 60},
                        'what_is': 'أداة سريعة وخفيفة للبحث عن Subdomains المتعلقة بدومين معين.',
                        'why': ['سرعة فائقة في جمع البيانات', 'سهلة الدمج في السكريبتات التلقائية'],
                        'flow_nodes': ['Domain', 'crt.sh/certspotter', 'Subdomains'],
                        'install': 'go install github.com/tomnomnom/assetfinder@latest',
                        'cmd': 'assetfinder --subs-only target.com',
                        'flags': [
                            { 'flag': '--subs-only', 'desc': 'إرجاع الـ subdomains فقط' }
                        ],
                        'when_use': ['للبحث السريع ودمجها مع أدوات أخرى كجزء من Pipeline'],
                        'when_not': ['عندما تريد نتائج دقيقة ومعتمدة على مصادر ضخمة (استخدم Amass بدلاً منها)'],
                        'comparison': [
                            {'tool': 'assetfinder', 'speed': 'Very Fast', 'accuracy': 'Medium', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['🌍 Target', '⚡ assetfinder', '🌐 httpx'],
                        'related_tools': ['subfinder', 'amass']
                    },
                    {
                        'id': 'chaos', 'images': ['tool_chaos.png'], 'images': ['category_recon.png'], 'images': ['category_recon.png'],
                        'name': 'chaos',
                        'icon': '🌪️',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'ProjectDiscovery Chaos Client',
                        'badges': ['DATABASE', 'API', 'FAST'],
                        'stats': {'speed': 90, 'complexity': 40, 'accuracy': 85},
                        'what_is': 'مكتبة ضخمة للنطاقات المُجمّعة باستمرار من ProjectDiscovery، تستخدم لتنزيل بيانات الـ Recon الجاهزة.',
                        'why': ['توفير الوقت عبر الحصول على بيانات Recon جاهزة', 'تغطية ضخمة للـ Bug Bounty Programs'],
                        'flow_nodes': ['Chaos API', 'Download Zip', 'Extract Subdomains'],
                        'install': 'go install github.com/projectdiscovery/chaos-client/cmd/chaos@latest',
                        'cmd': 'chaos -d target.com',
                        'flags': [
                            { 'flag': '-d', 'desc': 'الدومين المراد جلب نطاقاته' }
                        ],
                        'when_use': ['إذا كان الهدف ضمن برامج Bug Bounty العامة والمسجلة في Chaos'],
                        'when_not': ['على الأهداف الخاصة (Private Programs) غير المسجلة'],
                        'comparison': [
                            {'tool': 'chaos', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['🌪️ chaos', '🌐 httpx', '🔥 nuclei'],
                        'related_tools': ['subfinder', 'httpx']
                    }
                ]
            },
            {
                'id': 'crawling',
                'title': 'Crawling',
                'icon': '🕷️',
                'color_theme': '#9b59ff',
                'tools': [
                    {
                        'id': 'katana', 'images': ['tool_katana_1.png', 'tool_katana_2.png'], 'images': ['tool_katana_1.png', 'tool_katana_2.png'], 'images': ['tool_katana_1.png', 'tool_katana_2.png'],
                        'name': 'katana',
                        'icon': '⚔️',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'Next-Generation Crawling Framework',
                        'badges': ['HEADLESS', 'JS-PARSING', 'MODERN'],
                        'stats': {'speed': 75, 'complexity': 50, 'accuracy': 90},
                        'what_is': 'أداة للزحف على الروابط تعتمد على Headless Browser لضمان اصطياد الروابط في تطبيقات SPA الحديثة.',
                        'why': ['للعثور على روابط مخفية (Hidden Endpoints)', 'استخراج روابط الـ APIs', 'الزحف داخل الـ JS'],
                        'flow_nodes': ['Target URL', 'Headless Browser', 'JS Parsing', 'Endpoints Output'],
                        'install': 'go install github.com/projectdiscovery/katana/cmd/katana@latest',
                        'cmd': 'katana -u https://target.com -jc -d 3',
                        'flags': [
                            { 'flag': '-jc', 'desc': 'تفعيل تحليل الـ JavaScript' },
                            { 'flag': '-d 3', 'desc': 'عمق الزحف (Depth = 3)' }
                        ],
                        'when_use': ['في تطبيقات الـ React و Vue.js', 'عندما تفشل الأدوات القديمة في استخراج الروابط'],
                        'when_not': ['عندما يكون السيرفر ضعيفاً ولا يحتمل ضغط الزحف'],
                        'comparison': [
                            {'tool': 'katana', 'speed': 'Medium', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'},
                            {'tool': 'hakrawler', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌐 httpx', '⚔️ katana', '🔥 nuclei'],
                        'related_tools': ['hakrawler', 'gospider', 'linkfinder']
                    },
                    {
                        'id': 'hakrawler', 'images': ['tool_hakrawler.png'], 'images': ['category_crawling.png'], 'images': ['category_crawling.png'],
                        'name': 'hakrawler',
                        'icon': '🐾',
                        'difficulty': 'Easy',
                        'speed': 'Fast',
                        'tagline': 'Simple, fast web crawler',
                        'badges': ['FAST', 'PIPELINE', 'CLI'],
                        'stats': {'speed': 95, 'complexity': 15, 'accuracy': 60},
                        'what_is': 'زاحف ويب سريع وبسيط يقوم باستخراج الـ URLs، JavaScript، والـ forms.',
                        'why': ['لاستخراج نقاط الإدخال بسرعة (Input endpoints)', 'سهل في الـ pipeline'],
                        'flow_nodes': ['Target', 'HTML Parsing', 'URLs Extraction'],
                        'install': 'go install github.com/hakluke/hakrawler@latest',
                        'cmd': 'echo "https://target.com" | hakrawler',
                        'flags': [
                            { 'flag': '-d', 'desc': 'عمق الزحف' }
                        ],
                        'when_use': ['للأهداف البسيطة والاستخراج السريع'],
                        'when_not': ['في تطبيقات الصفحة الواحدة SPA الحديثة (استخدم Katana)'],
                        'comparison': [
                            {'tool': 'hakrawler', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌐 httpx', '🐾 hakrawler', '⚡ ffuf'],
                        'related_tools': ['katana', 'gospider']
                    },
                    {
                        'id': 'gospider', 'images': ['tool_gospider.png'], 'images': ['category_crawling.png'], 'images': ['category_crawling.png'],
                        'name': 'gospider',
                        'icon': '🕸️',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'Fast web spider written in Go',
                        'badges': ['CONCURRENT', 'SITEMAPS', 'DEEP LINKS'],
                        'stats': {'speed': 80, 'complexity': 30, 'accuracy': 75},
                        'what_is': 'أداة زحف قوية قادرة على قراءة الروابط من Sitemaps و Robots.txt واستخراج الروابط المخفية.',
                        'why': ['ميزات الزحف المتقدم واستخراج الـ Parameters', 'البحث في ملفات JS عن مسارات محتملة'],
                        'flow_nodes': ['URLs list', 'Spidering', 'Sitemaps/Robots/JS', 'Deep Links'],
                        'install': 'go install github.com/jaeles-project/gospider@latest',
                        'cmd': 'gospider -s "https://target.com/" -c 10 -d 1',
                        'flags': [
                            { 'flag': '-s', 'desc': 'الموقع المستهدف' },
                            { 'flag': '-c', 'desc': 'عدد المهام المتزامنة (Concurrency)' }
                        ],
                        'when_use': ['للتحليل العميق لمحتوى الموقع الثابت والـ Sitemaps'],
                        'when_not': ['إذا أردت تنفيذ JavaScript، gospider لا يدعم Headless Browsing.'],
                        'comparison': [
                            {'tool': 'gospider', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🕸️ gospider', '🕷️ paramspider', '💉 sqlmap'],
                        'related_tools': ['katana', 'hakrawler']
                    }
                ]
            },
            {
                'id': 'historical_urls',
                'title': 'Historical URLs',
                'icon': '🕰️',
                'color_theme': '#ffb020',
                'tools': [
                    {
                        'id': 'gau', 'images': ['tool_gau_1.png'], 'images': ['tool_gau_1.png', 'tool_gau_2.png', 'tool_gau_3.png'], 'images': ['tool_gau_1.png', 'tool_gau_2.png', 'tool_gau_3.png'],
                        'name': 'gau',
                        'icon': '📜',
                        'difficulty': 'Easy',
                        'speed': 'Fast',
                        'tagline': 'GetAllUrls',
                        'badges': ['ARCHIVE', 'PASSIVE', 'FAST'],
                        'stats': {'speed': 90, 'complexity': 10, 'accuracy': 60},
                        'what_is': 'يقوم بجلب الروابط التاريخية المحفوظة للموقع من AlienVault, Wayback Machine, Common Crawl.',
                        'why': ['لاكتشاف Endpoints قديمة أو منسية ربما تحتوي على ثغرات', 'الحصول على مسارات بدون عمل Fuzzing'],
                        'flow_nodes': ['Target', 'Wayback/OTX/CC', 'Historical URLs'],
                        'install': 'go install github.com/lc/gau/v2/cmd/gau@latest',
                        'cmd': 'echo "target.com" | gau --threads 5',
                        'flags': [
                            { 'flag': '--threads', 'desc': 'زيادة سرعة السحب' },
                            { 'flag': '--subs', 'desc': 'تضمين النطاقات الفرعية' }
                        ],
                        'when_use': ['دائماً كجزء من Recon لأنها Passive وسريعة جداً'],
                        'when_not': ['لا توجد حالة تمنع استخدامها (أداة آمنة جداً)'],
                        'comparison': [
                            {'tool': 'gau', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'Yes', 'active': 'No'},
                            {'tool': 'waybackurls', 'speed': 'Medium', 'accuracy': 'Medium', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['📜 gau', '🧹 uro', '🌐 httpx', '🔥 nuclei'],
                        'related_tools': ['waybackurls', 'waymore']
                    },
                    {
                        'id': 'waybackurls', 'images': ['tool_gau_2.png'], 'images': ['category_historical.png'], 'images': ['category_historical.png'],
                        'name': 'waybackurls',
                        'icon': '🕰️',
                        'difficulty': 'Easy',
                        'speed': 'Medium',
                        'tagline': 'Fetch URLs from the Wayback Machine',
                        'badges': ['CLASSIC', 'WAYBACK', 'CLI'],
                        'stats': {'speed': 70, 'complexity': 10, 'accuracy': 50},
                        'what_is': 'أداة كلاسيكية لجلب الروابط المحفوظة من Wayback Machine فقط.',
                        'why': ['مفيدة وبسيطة ولا تحتاج تكوين', 'اكتشاف الـ API endpoints القديمة'],
                        'flow_nodes': ['Target', 'web.archive.org', 'URLs list'],
                        'install': 'go install github.com/tomnomnom/waybackurls@latest',
                        'cmd': 'echo "target.com" | waybackurls',
                        'flags': [
                            { 'flag': 'No flags', 'desc': 'الأداة تقرأ مباشرة من Stdin' }
                        ],
                        'when_use': ['للتحقق السريع من أرشيف موقع'],
                        'when_not': ['إذا كنت تريد مصادر أوسع، استخدم gau او waymore'],
                        'comparison': [
                            {'tool': 'waybackurls', 'speed': 'Medium', 'accuracy': 'Medium', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['🕰️ waybackurls', '🔍 grep "="', '🦊 dalfox'],
                        'related_tools': ['gau', 'waymore']
                    },
                    {
                        'id': 'waymore', 'images': ['tool_gau_3.png'], 'images': ['category_historical.png'], 'images': ['category_historical.png'],
                        'name': 'waymore',
                        'icon': '🌐',
                        'difficulty': 'Intermediate',
                        'speed': 'Slow',
                        'tagline': 'Find way more from the Wayback Machine',
                        'badges': ['DEEP EXTRACTION', 'RESPONSES', 'PYTHON'],
                        'stats': {'speed': 30, 'complexity': 40, 'accuracy': 95},
                        'what_is': 'نسخة أقوى لاستخراج الروابط، لا تكتفي بجلب العناوين بل يمكنها تحميل الصفحات المحفوظة واستخراج ملفات JS للتحليل.',
                        'why': ['تعطيك نتائج أعمق بكثير', 'تحليل الأكواد القديمة بحثاً عن Secrets'],
                        'flow_nodes': ['Target', 'APIs + Archive pages', 'Deep Extraction'],
                        'install': 'pip install waymore',
                        'cmd': 'waymore -i target.com -mode U',
                        'flags': [
                            { 'flag': '-mode U', 'desc': 'جلب الـ URLs فقط' },
                            { 'flag': '-mode R', 'desc': 'تنزيل الردود (Responses) للتحليل' }
                        ],
                        'when_use': ['عند الحاجة للغوص العميق في تاريخ الهدف ومراجعة الأكواد القديمة'],
                        'when_not': ['أثناء الـ Recon السريع لأنها أبطأ من gau'],
                        'comparison': [
                            {'tool': 'waymore', 'speed': 'Slow', 'accuracy': 'High', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['🌐 waymore', '🔗 xnLinkFinder'],
                        'related_tools': ['gau', 'waybackurls']
                    }
                ]
            },
            {
                'id': 'directory_discovery',
                'title': 'Directory Discovery',
                'icon': '📂',
                'color_theme': '#ff0055',
                'tools': [
                    {
                        'id': 'ffuf', 'images': ['tool_dir_1.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'],
                        'name': 'ffuf',
                        'icon': '⚡',
                        'difficulty': 'Beginner',
                        'speed': 'Very Fast',
                        'tagline': 'Fast Web Fuzzer',
                        'badges': ['FUZZER', 'GO-BASED', 'FLEXIBLE'],
                        'stats': {'speed': 100, 'complexity': 30, 'accuracy': 90},
                        'what_is': 'أداة سريعة جداً مكتوبة بـ Go لاكتشاف الملفات والمجلدات المخفية (Directory Bruteforcing).',
                        'why': ['للعثور على لوحات تحكم (Admin Panels)', 'اكتشاف ملفات حساسة (.env, backups)'],
                        'flow_nodes': ['URL + FUZZ', 'Wordlist', 'HTTP Requests', 'Filtering'],
                        'install': 'go install github.com/ffuf/ffuf/v2@latest',
                        'cmd': 'ffuf -u https://target.com/FUZZ -w words.txt -mc 200,301',
                        'flags': [
                            { 'flag': '-u', 'desc': 'الرابط مع كلمة FUZZ' },
                            { 'flag': '-w', 'desc': 'مسار الـ Wordlist' },
                            { 'flag': '-mc', 'desc': 'تصفية النتائج بناءً على Status Code' }
                        ],
                        'when_use': ['للبحث السريع والمخصص (Custom Fuzzing)', 'عند اختبار الـ APIs'],
                        'when_not': ['لا تستخدمها بدون فلترة (Filtering) وإلا ستغرق في الـ False Positives'],
                        'comparison': [
                            {'tool': 'ffuf', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'},
                            {'tool': 'gobuster', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌐 httpx', '⚡ ffuf', '💻 burp suite'],
                        'related_tools': ['feroxbuster', 'gobuster', 'dirsearch']
                    },
                    {
                        'id': 'feroxbuster', 'images': ['tool_dir_2.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'],
                        'name': 'feroxbuster',
                        'icon': '🦀',
                        'difficulty': 'Intermediate',
                        'speed': 'Very Fast',
                        'tagline': 'A fast, simple, recursive content discovery tool',
                        'badges': ['RUST', 'RECURSIVE', 'GUI-LIKE'],
                        'stats': {'speed': 95, 'complexity': 40, 'accuracy': 95},
                        'what_is': 'أداة سريعة مبنية بـ Rust تتميز بخصائص الـ Recursion التلقائي لاكتشاف المحتوى العميق.',
                        'why': ['الزحف التلقائي للمجلدات الجديدة التي يتم اكتشافها', 'السرعة الفائقة والواجهة البصرية'],
                        'flow_nodes': ['Target', 'Wordlist', 'Found /api/', 'Auto-scan /api/FUZZ'],
                        'install': 'curl -sL https://raw.githubusercontent.com/epi052/feroxbuster/main/install-nix.sh | bash',
                        'cmd': 'feroxbuster -u https://target.com -w words.txt -x php,html',
                        'flags': [
                            { 'flag': '-x', 'desc': 'تحديد الامتدادات (Extensions)' },
                            { 'flag': '-d', 'desc': 'أقصى عمق للـ Recursion' }
                        ],
                        'when_use': ['لاكتشاف الهيكل الكامل للموقع بضغطة زر (Full tree discovery)'],
                        'when_not': ['الأنظمة الضعيفة التي لا تتحمل ضغط الطلبات العالي'],
                        'comparison': [
                            {'tool': 'feroxbuster', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🦀 feroxbuster', '🔥 nuclei'],
                        'related_tools': ['ffuf', 'gobuster']
                    },
                    {
                        'id': 'gobuster', 'images': ['tool_gobuster.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'],
                        'name': 'gobuster',
                        'icon': '👻',
                        'difficulty': 'Beginner',
                        'speed': 'Fast',
                        'tagline': 'Directory/File, DNS and VHost busting tool',
                        'badges': ['CLASSIC', 'VHOST', 'STABLE'],
                        'stats': {'speed': 80, 'complexity': 20, 'accuracy': 80},
                        'what_is': 'أداة كلاسيكية لاكتشاف المسارات والنطاقات الـ Virtual، استقرارها عالي.',
                        'why': ['مستقرة ولا تستهلك الذاكرة بشكل جنوني', 'تدعم DNS و VHost busting في أداة واحدة'],
                        'flow_nodes': ['Target', 'Wordlist', 'Bruteforce', 'Results'],
                        'install': 'go install github.com/OJ/gobuster/v3@latest',
                        'cmd': 'gobuster dir -u https://target.com -w words.txt',
                        'flags': [
                            { 'flag': 'dir', 'desc': 'وضع اكتشاف المجلدات' },
                            { 'flag': '-t', 'desc': 'عدد الخيوط (Threads)' }
                        ],
                        'when_use': ['في تحديات CTF أو للمبتدئين لبساطتها'],
                        'when_not': ['إذا كنت تحتاج مرونة Ffuf أو قوة Feroxbuster التكرارية'],
                        'comparison': [
                            {'tool': 'gobuster', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['👻 gobuster', '🌐 browser'],
                        'related_tools': ['ffuf', 'dirsearch']
                    },
                    {
                        'id': 'dirsearch', 'images': ['category_dir.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'], 'images': ['tool_dir_1.png', 'tool_dir_2.png'],
                        'name': 'dirsearch',
                        'icon': '🔎',
                        'difficulty': 'Beginner',
                        'speed': 'Medium',
                        'tagline': 'Web path scanner',
                        'badges': ['PYTHON', 'BUILT-IN WORDS', 'EASY'],
                        'stats': {'speed': 60, 'complexity': 15, 'accuracy': 85},
                        'what_is': 'أداة بايثون شهيرة تأتي بـ Wordlist مدمج وتتعرف تلقائياً على تقنيات الموقع لتغيير الامتدادات.',
                        'why': ['Wordlist جاهز وممتاز جداً', 'سهولة الاستخدام للبحث السريع'],
                        'flow_nodes': ['Target', 'Built-in Wordlist', 'Path Scanning'],
                        'install': 'git clone https://github.com/maurosoria/dirsearch.git',
                        'cmd': 'python3 dirsearch.py -u https://target.com -e php,zip',
                        'flags': [
                            { 'flag': '-e', 'desc': 'الامتدادات (Extensions)' }
                        ],
                        'when_use': ['الفحوصات السريعة باستخدام الـ wordlist الافتراضي الخاص بها'],
                        'when_not': ['عندما تريد سرعة مهولة (استخدم ffuf)'],
                        'comparison': [
                            {'tool': 'dirsearch', 'speed': 'Medium', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🔎 dirsearch', '🔥 nuclei'],
                        'related_tools': ['ffuf', 'gobuster']
                    }
                ]
            },
            {
                'id': 'parameter_discovery',
                'title': 'Parameter Discovery',
                'icon': '🎛️',
                'color_theme': '#00ff66',
                'tools': [
                    {
                        'id': 'arjun', 'images': ['tool_param_1.png'], 'images': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'], 'images': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'],
                        'name': 'arjun',
                        'icon': '🎯',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'HTTP Parameter Discovery Suite',
                        'badges': ['HEURISTICS', 'SMART', 'PYTHON'],
                        'stats': {'speed': 85, 'complexity': 50, 'accuracy': 95},
                        'what_is': 'أداة ذكية جداً لاكتشاف الـ Parameters المخفية باستخدام تقنيات Heuristics، تقلل الطلبات للحد الأدنى.',
                        'why': ['اكتشاف بارامترات قد تؤدي لـ XSS, SSRF, SQLi', 'ترسل الطلبات في دفعات (Chunks) لتقليل اللود'],
                        'flow_nodes': ['Endpoint', 'Large Wordlist', 'Chunking', 'Heuristic Analysis', 'Valid Params'],
                        'install': 'pip3 install arjun',
                        'cmd': 'arjun -u https://target.com/endpoint',
                        'flags': [
                            { 'flag': '-c', 'desc': 'حجم كل دفعة (Chunk size)' },
                            { 'flag': '-m', 'desc': 'تحديد الميثود (GET/POST)' }
                        ],
                        'when_use': ['عندما تجد صفحة لا يوجد بها مدخلات ظاهرة وتشك بوجود ثغرة'],
                        'when_not': ['على المسارات الثابتة (Static Files) كالصور و CSS'],
                        'comparison': [
                            {'tool': 'arjun', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🎯 arjun', '🦊 dalfox', '💉 sqlmap'],
                        'related_tools': ['paramspider']
                    },
                    {
                        'id': 'paramspider', 'images': ['tool_param_2.png'], 'images': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'], 'images': ['tool_param_1.png', 'tool_param_2.png', 'tool_param_3.png'],
                        'name': 'paramspider',
                        'icon': '🕷️',
                        'difficulty': 'Easy',
                        'speed': 'Very Fast',
                        'tagline': 'Mining parameters from dark web archives',
                        'badges': ['ARCHIVE MINING', 'FAST', 'PASSIVE'],
                        'stats': {'speed': 95, 'complexity': 10, 'accuracy': 70},
                        'what_is': 'أداة تجلب الروابط التاريخية ثم تستخرج منها الـ Parameters فقط لاستخدامها في الهجوم لاحقاً.',
                        'why': ['تعطيك Params بناءً على استهلاك حقيقي (من الأرشيف)', 'سريعة جداً لأنها لا تتفاعل مع الهدف (Passive)'],
                        'flow_nodes': ['Target', 'Web Archives', 'URL Parsing', 'Params Output'],
                        'install': 'git clone https://github.com/devanshbatham/ParamSpider',
                        'cmd': 'python3 paramspider.py -d target.com',
                        'flags': [
                            { 'flag': '-d', 'desc': 'الدومين الهدف' }
                        ],
                        'when_use': ['لتوسيع مساحة الهجوم قبل فحص الـ XSS أو SQLi'],
                        'when_not': ['للبحث عن Params جديدة أو مخصصة غير موجودة بالأرشيف'],
                        'comparison': [
                            {'tool': 'paramspider', 'speed': 'Very Fast', 'accuracy': 'Medium', 'passive': 'Yes', 'active': 'No'}
                        ],
                        'workflow_nodes': ['🕷️ paramspider', '🦊 dalfox'],
                        'related_tools': ['arjun']
                    }
                ]
            },
            {
                'id': 'js_recon',
                'title': 'JS Recon',
                'icon': '📜',
                'color_theme': '#ff00d4',
                'tools': [
                    {
                        'id': 'linkfinder', 'images': ['tool_js_2.png'], 'images': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'], 'images': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'],
                        'name': 'linkfinder',
                        'icon': '🔗',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'Find endpoints in JavaScript files',
                        'badges': ['REGEX', 'JS PARSER', 'PYTHON'],
                        'stats': {'speed': 85, 'complexity': 40, 'accuracy': 80},
                        'what_is': 'سكربت يقوم بقراءة ملفات الـ JS وتحليلها باستخدام Regex لاستخراج الـ URLs والـ API Endpoints.',
                        'why': ['اكتشاف مسارات APIs المخفية عن المستخدم العادي', 'تحليل أكواد الـ Frontend لمعرفة البنية'],
                        'flow_nodes': ['JS File', 'Regex Parsing', 'Extracted Endpoints'],
                        'install': 'git clone https://github.com/GerbenJavado/LinkFinder.git',
                        'cmd': 'python3 linkfinder.py -i https://target.com/app.js -o cli',
                        'flags': [
                            { 'flag': '-i', 'desc': 'رابط الملف أو المجلد المحلي' },
                            { 'flag': '-o cli', 'desc': 'إخراج النتائج في الشاشة بدلاً من HTML' }
                        ],
                        'when_use': ['عند فحص تطبيقات تعتمد بكثافة على JS (SPA)'],
                        'when_not': ['عندما يكون كود الـ JS معقداً (Obfuscated) بشكل شديد قد يفشل'],
                        'comparison': [
                            {'tool': 'linkfinder', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🌐 httpx', '⚔️ katana (JS)', '🔗 linkfinder', '⚡ ffuf'],
                        'related_tools': ['secretfinder', 'xnLinkFinder']
                    },
                    {
                        'id': 'secretfinder', 'images': ['tool_js_3.png'], 'images': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'], 'images': ['tool_js_1.png', 'tool_js_2.png', 'tool_js_3.png'],
                        'name': 'secretfinder',
                        'icon': '🔑',
                        'difficulty': 'Easy',
                        'speed': 'Fast',
                        'tagline': 'Discover sensitive data like apikeys, accesstoken',
                        'badges': ['SECRETS', 'REGEX', 'TOKENS'],
                        'stats': {'speed': 85, 'complexity': 20, 'accuracy': 75},
                        'what_is': 'نفس فكرة LinkFinder لكنه يركز على البحث عن المفاتيح السرية (API Keys, Tokens) داخل الـ JS.',
                        'why': ['العثور على AWS Keys, Stripe Tokens, وغيرها وتسريبها'],
                        'flow_nodes': ['JS File', 'Regex Signatures', 'Extracted Secrets'],
                        'install': 'git clone https://github.com/m4ll0k/SecretFinder.git',
                        'cmd': 'python3 SecretFinder.py -i https://target.com/app.js -o cli',
                        'flags': [
                            { 'flag': '-i', 'desc': 'المدخل' }
                        ],
                        'when_use': ['دائماً عند العثور على ملفات JS ضخمة أو مجمعة (Bundled)'],
                        'when_not': ['لا توجد حالة'],
                        'comparison': [
                            {'tool': 'secretfinder', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['⚔️ katana (JS)', '🔑 secretfinder'],
                        'related_tools': ['linkfinder', 'trufflehog']
                    }
                ]
            },
            {
                'id': 'vulnerability_scanning',
                'title': 'Vulnerability Scanning',
                'icon': '🔥',
                'color_theme': '#ff3300',
                'tools': [
                    {
                        'id': 'nuclei', 'images': ['tool_vuln_1.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
                        'name': 'nuclei',
                        'icon': '☢️',
                        'difficulty': 'Intermediate',
                        'speed': 'Very Fast',
                        'tagline': 'Fast and customizable vulnerability scanner',
                        'badges': ['TEMPLATES', 'CVEs', 'GO-BASED'],
                        'stats': {'speed': 95, 'complexity': 60, 'accuracy': 90},
                        'what_is': 'أقوى أداة لفحص الثغرات مبنية على الـ Templates (قوالب مخصصة)، ترسل طلبات HTTP للتحقق من وجود ثغرة معروفة.',
                        'why': ['سرعة مهولة في فحص آلاف الأهداف لثغرات حديثة (CVEs, Misconfigs)', 'يمكنك كتابة القوالب الخاصة بك'],
                        'flow_nodes': ['Targets', 'YAML Templates', 'HTTP Requests', 'Match Vuln'],
                        'install': 'go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest',
                        'cmd': 'nuclei -l live_hosts.txt -t cves/ -t exposures/',
                        'flags': [
                            { 'flag': '-l', 'desc': 'قائمة الأهداف' },
                            { 'flag': '-t', 'desc': 'تحديد الـ Templates المراد استخدامها' }
                        ],
                        'when_use': ['في المراحل النهائية من الـ Recon للبحث السريع عن Quick Wins'],
                        'when_not': ['بدون تحديد القوالب المناسبة (سيبعث آلاف الطلبات ويزعج الهدف)'],
                        'comparison': [
                            {'tool': 'nuclei', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'},
                            {'tool': 'nikto', 'speed': 'Slow', 'accuracy': 'Low', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🛰️ subfinder', '🌐 httpx', '☢️ nuclei'],
                        'related_tools': ['dalfox', 'sqlmap']
                    },
                    {
                        'id': 'dalfox', 'images': ['tool_vuln_2.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
                        'name': 'dalfox',
                        'icon': '🦊',
                        'difficulty': 'Intermediate',
                        'speed': 'Fast',
                        'tagline': 'Parameter Analysis and XSS Scanner',
                        'badges': ['XSS', 'SCANNER', 'AUTO-BYPASS'],
                        'stats': {'speed': 85, 'complexity': 50, 'accuracy': 95},
                        'what_is': 'أداة متخصصة وقوية جداً في اكتشاف ثغرات الـ XSS وتحليل الـ Parameters.',
                        'why': ['دقيقة جداً في فحص الـ XSS', 'تتعرف على حمايات WAF وتحاول تخطيها'],
                        'flow_nodes': ['URL/Params', 'Payload Inject', 'Reflection Parse', 'Validate XSS'],
                        'install': 'go install github.com/hahwul/dalfox/v2@latest',
                        'cmd': 'dalfox url https://target.com/page?id=1',
                        'flags': [
                            { 'flag': 'url', 'desc': 'فحص رابط واحد' },
                            { 'flag': 'pipe', 'desc': 'استقبال الروابط من أدوات أخرى مثل gau' }
                        ],
                        'when_use': ['بعد استخراج الروابط التي تحتوي على Parameters'],
                        'when_not': ['فحص صفحات لا يوجد بها Reflection أو مدخلات'],
                        'comparison': [
                            {'tool': 'dalfox', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['📜 gau', '🔄 qsreplace', '🦊 dalfox'],
                        'related_tools': ['arjun', 'paramspider']
                    },
                    {
                        'id': 'sqlmap', 'images': ['tool_vuln_3.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'], 'images': ['tool_vuln_1.png', 'tool_vuln_2.png', 'tool_vuln_3.png'],
                        'name': 'sqlmap',
                        'icon': '💉',
                        'difficulty': 'Intermediate',
                        'speed': 'Slow',
                        'tagline': 'Automatic SQL injection and database takeover tool',
                        'badges': ['SQLi', 'DATABASE', 'EXPLOITATION'],
                        'stats': {'speed': 30, 'complexity': 80, 'accuracy': 99},
                        'what_is': 'الأداة الأشهر والأقوى في اكتشاف واستغلال ثغرات حقن قواعد البيانات (SQL Injection).',
                        'why': ['دعم جميع أنواع قواعد البيانات', 'قدرة استغلال عالية لتخطي الجدران النارية واستخراج البيانات'],
                        'flow_nodes': ['Vulnerable URL', 'Heuristic Tests', 'Payload Inject', 'Extract Data'],
                        'install': 'git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev',
                        'cmd': 'python3 sqlmap.py -u "http://target.com?id=1" --dbs --batch',
                        'flags': [
                            { 'flag': '-u', 'desc': 'الرابط المستهدف' },
                            { 'flag': '--dbs', 'desc': 'استخراج أسماء قواعد البيانات' },
                            { 'flag': '--batch', 'desc': 'الرد الافتراضي على الأسئلة' }
                        ],
                        'when_use': ['عند الشك بوجود Error-based أو Time-based SQLi في أحد المدخلات'],
                        'when_not': ['لا تطلقها عشوائياً على كل الروابط (مزعجة جداً للـ WAF)'],
                        'comparison': [
                            {'tool': 'sqlmap', 'speed': 'Slow', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                        ],
                        'workflow_nodes': ['🕷️ paramspider', '💉 sqlmap'],
                        'related_tools': ['arjun', 'dalfox']
                    }
                ]
            }
        ],
        'stats': [
            {'label': 'Labs Solved', 'value': 100, 'icon': '🎮', 'suffix': '+'},
            {'label': 'Projects', 'value': 4, 'icon': '📂', 'suffix': ''},
            {'label': 'Writeups', 'value': 5, 'icon': '📝', 'suffix': ''},
            {'label': 'Tools Used', 'value': 10, 'icon': '🛠️', 'suffix': '+'},
        ],
        'certifications': [
            {
                'name': 'OSCP (Offensive Security Certified Professional)',
                'issuer': 'Offensive Security',
                'status': 'In Progress',
                'color': '#ff0055',
                'badge': 'Candidate',
                'progress': 75,
                'date': 'Target: Q3 2026'
            },
            {
                'name': 'RHCSA (Red Hat Certified System Administrator)',
                'issuer': 'Red Hat',
                'status': 'Certified',
                'color': '#cc0000',
                'badge': 'Active',
                'date': 'Issued: Jan 2025'
            },
            {
                'name': 'TryHackMe (Top 1%)',
                'issuer': 'TryHackMe Platform',
                'status': 'Completed Labs',
                'color': '#9b59ff',
                'badge': 'Top Rank',
                'date': 'Continuous'
            },
            {
                'name': 'HackTheBox Pro Hacker',
                'issuer': 'HackTheBox Platform',
                'status': 'Completed Labs',
                'color': '#00ff66',
                'badge': 'Active',
                'date': 'Continuous'
            },
        ],
        'bugbounty_explorer': [       {       'color_theme': '#00e5ff',
                'icon': '📬',
                'id': 'api_testing',
                'title': 'API Testing',
                'tools': [       {       'badges': [       'GUI-BASED',
                                                           'MANUAL/AUTO',
                                                           'POPULAR'],
                                         'cmd': 'postman (GUI App)',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'postman'},
                                                               {       'accuracy': 'Medium',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'kiterunner'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'عرض '
                                                                          'خيارات '
                                                                          'المساعدة '
                                                                          'لنسخة '
                                                                          'Newman '
                                                                          'CLI',
                                                                  'flag': '--help'}],
                                         'flow_nodes': [       'Launch GUI',
                                                               'Import Spec',
                                                               'Craft Requests',
                                                               'Analyze '
                                                               'Response'],
                                         'icon': '📬',
                                         'id': 'postman',
                                         'images': ['bb_api_testing.png'],
                                         'install': 'Download from '
                                                    'postman.com/downloads',
                                         'name': 'Postman',
                                         'related_tools': [       'kiterunner',
                                                                  'ffuf_api'],
                                         'speed': 'Fast',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 40,
                                                          'speed': 85},
                                         'tagline': 'Collaborative API '
                                                    'Development & Testing '
                                                    'Platform',
                                         'what_is': 'منصة متكاملة لبناء '
                                                    'واختبار واستخدام الـ '
                                                    'APIs، تُستعمل بشكل واسع '
                                                    'لفحص أمن نقاط الاتصال '
                                                    'يدوياً.',
                                         'when_not': [       'عند الرغبة في '
                                                             'عمل Fuzzing سريع '
                                                             'جداً لملايين '
                                                             'المسارات (استخدم '
                                                             'ffuf)'],
                                         'when_use': [       'عند اختبار منطق '
                                                             'عمل الـ API '
                                                             '(Business Logic)',
                                                             'عند عمل Fuzzing '
                                                             'يدوي للطلبات'],
                                         'why': [       'تعديل وقراءة الـ HTTP '
                                                        'Requests بسهولة',
                                                        'دعم الأتمتة للمجموعات '
                                                        '(Collections)',
                                                        'بيئة عمل مرئية '
                                                        'بالكامل'],
                                         'workflow_nodes': [       '📬 postman',
                                                                   '💻 proxy',
                                                                   '🔥 burp '
                                                                   'suite']},
                                 {       'badges': [       'FAST',
                                                           'API-ROUTES',
                                                           'GO-BASED'],
                                         'cmd': 'kr scan '
                                                'https://target.com/api -w '
                                                'routes.json',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'kiterunner'}],
                                         'difficulty': 'Intermediate',
                                         'flags': [       {       'desc': 'بدء '
                                                                          'عملية '
                                                                          'الفحص',
                                                                  'flag': 'scan'},
                                                          {       'desc': 'تحديد '
                                                                          'مسار '
                                                                          'ملف '
                                                                          'الكلمات/المسارات '
                                                                          '(Wordlist)',
                                                                  'flag': '-w'}],
                                         'flow_nodes': [       'Target API '
                                                               'Host',
                                                               'Wordlist '
                                                               '(routes.json)',
                                                               'Assetnote Scan',
                                                               'Endpoints '
                                                               'Discovered'],
                                         'icon': '🏃',
                                         'id': 'kiterunner',
                                         'images': ['bb_api_testing.png'],
                                         'install': 'go install '
                                                    'github.com/assetnote/kiterunner/cmd/kr@latest',
                                         'name': 'Kiterunner',
                                         'related_tools': [       'postman',
                                                                  'ffuf_api'],
                                         'speed': 'Very Fast',
                                         'stats': {       'accuracy': 85,
                                                          'complexity': 60,
                                                          'speed': 95},
                                         'tagline': 'Context-Aware API '
                                                    'Scanning Tool',
                                         'what_is': 'أداة سريعة جداً مصممة '
                                                    'خصيصاً لاكتشاف مسارات الـ '
                                                    'API والـ Endpoints '
                                                    'المخفية باستخدام ملفات '
                                                    'التوجيه.',
                                         'when_not': [       'على المواقع '
                                                             'التعريفية '
                                                             'البسيطة التي لا '
                                                             'تحتوي على خدمات '
                                                             'API الخلفية'],
                                         'when_use': [       'عندما تواجه '
                                                             'هدفاً يعتمد على '
                                                             'الـ API وتريد '
                                                             'معرفة المسارات '
                                                             'النشطة بسرعة'],
                                         'why': [       'سرعة فائقة في الفحص '
                                                        'والتخمين',
                                                        'فهم سياق الـ APIs '
                                                        '(REST, GraphQL)',
                                                        'دعم قراءة ملفات '
                                                        'OpenAPI/Swagger'],
                                         'workflow_nodes': [       '🏃 '
                                                                   'kiterunner',
                                                                   '🌐 httpx',
                                                                   '🔥 nuclei']},
                                 {       'badges': [       'FUZZER',
                                                           'API-FUZZ',
                                                           'GO-BASED'],
                                         'cmd': 'ffuf -u '
                                                'https://target.com/api/FUZZ '
                                                '-w api_endpoints.txt -mc 200',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'ffuf '
                                                                               'api'}],
                                         'difficulty': 'Intermediate',
                                         'flags': [       {       'desc': 'الرابط '
                                                                          'مع '
                                                                          'كلمة '
                                                                          'FUZZ '
                                                                          'للمكان '
                                                                          'المراد '
                                                                          'تخمينه',
                                                                  'flag': '-u'},
                                                          {       'desc': 'فلترة '
                                                                          'النتائج '
                                                                          'بناءً '
                                                                          'على '
                                                                          'كود '
                                                                          'الاستجابة '
                                                                          '(Status '
                                                                          'Code)',
                                                                  'flag': '-mc'},
                                                          {       'desc': 'تحديد '
                                                                          'طريقة '
                                                                          'الطلب '
                                                                          '(GET, '
                                                                          'POST, '
                                                                          'etc.)',
                                                                  'flag': '-X'}],
                                         'flow_nodes': [       'API '
                                                               'Endpoint/FUZZ',
                                                               'API Wordlist',
                                                               'ffuf Engine',
                                                               'Method Fuzzing',
                                                               'Filter & Save'],
                                         'icon': '⚡',
                                         'id': 'ffuf_api',
                                         'images': ['bb_api_testing.png'],
                                         'install': 'go install '
                                                    'github.com/ffuf/ffuf/v2@latest',
                                         'name': 'ffuf API fuzzing',
                                         'related_tools': [       'kiterunner',
                                                                  'postman'],
                                         'speed': 'Very Fast',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 50,
                                                          'speed': 100},
                                         'tagline': 'Fuzzing API Endpoints '
                                                    'with ffuf',
                                         'what_is': 'استخدام أداة ffuf السريعة '
                                                    'لتخمين وفحص مسارات '
                                                    'ومعاملات الـ API باستخدام '
                                                    'قوائم مخصصة.',
                                         'when_not': [       'إذا كانت الـ API '
                                                             'محمية بـ '
                                                             'Rate-Limit صارم '
                                                             'جداً يسبب حظر '
                                                             'الـ IP بسرعة'],
                                         'when_use': [       'لاكتشاف '
                                                             'البارامترات '
                                                             'والقيم داخل الـ '
                                                             'API',
                                                             'لتخمين مسارات '
                                                             'الـ endpoints '
                                                             'المجهولة'],
                                         'why': [       'أسرع فاحص مسارات ويب '
                                                        'على الإطلاق',
                                                        'القدرة على فحص ميثودز '
                                                        'متعددة (POST, PUT, '
                                                        'DELETE)',
                                                        'تصفية ذكية للاستجابات '
                                                        'الخاطئة'],
                                         'workflow_nodes': [       '⚡ ffuf api',
                                                                   '💻 burp '
                                                                   'suite']}]},
        {       'color_theme': '#9b59ff',
                'icon': '☁️',
                'id': 'cloud_security',
                'title': 'Cloud Security',
                'tools': [       {       'badges': [       'MULTI-CLOUD',
                                                           'AUDITING',
                                                           'HTML-REPORT'],
                                         'cmd': 'scout aws --profile '
                                                'my-profile',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'scoutsuite'},
                                                               {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'prowler'}],
                                         'difficulty': 'Intermediate',
                                         'flags': [       {       'desc': 'تحديد '
                                                                          'المزود '
                                                                          '(AWS) '
                                                                          'المراد '
                                                                          'فحصه',
                                                                  'flag': 'aws'},
                                                          {       'desc': 'استخدام '
                                                                          'ملف '
                                                                          'تعريف '
                                                                          'AWS '
                                                                          'CLI '
                                                                          'معين',
                                                                  'flag': '--profile'}],
                                         'flow_nodes': [       'Cloud APIs '
                                                               'Connection',
                                                               'Fetch '
                                                               'Configuration',
                                                               'Evaluate '
                                                               'Ruleset',
                                                               'Generate HTML '
                                                               'Report'],
                                         'icon': '🔍',
                                         'id': 'scoutsuite',
                                         'images': ['bb_cloud_security.png'],
                                         'install': 'pip install scoutsuite',
                                         'name': 'ScoutSuite',
                                         'related_tools': ['prowler', 'pacu'],
                                         'speed': 'Medium',
                                         'stats': {       'accuracy': 95,
                                                          'complexity': 50,
                                                          'speed': 60},
                                         'tagline': 'Multi-Cloud Security '
                                                    'Auditing Tool',
                                         'what_is': 'أداة مفتوحة المصدر لتدقيق '
                                                    'وفحص أمان السحابة '
                                                    'المتعددة (AWS, Azure, '
                                                    'GCP)، تقوم بتحليل '
                                                    'الإعدادات وتقديم تقرير '
                                                    'تفاعلي.',
                                         'when_not': [       'عند الرغبة في '
                                                             'محاولة استغلال '
                                                             'الثغرات بشكل نشط '
                                                             'وعنيف (استخدم '
                                                             'Pacu)'],
                                         'when_use': [       'عند الحصول على '
                                                             'وصول لقراءة حساب '
                                                             'سحابي (ReadOnly '
                                                             'credentials) '
                                                             'وتريد تقييمه'],
                                         'why': [       'الحصول على نظرة شاملة '
                                                        'لثغرات الحساب السحابي',
                                                        'تصدير تقرير HTML مرئي '
                                                        'وجذاب وسهل القراءة',
                                                        'دعم منصات سحابية '
                                                        'متعددة في مكان واحد'],
                                         'workflow_nodes': [       '☁️ '
                                                                   'scoutsuite',
                                                                   '📊 HTML '
                                                                   'Report']},
                                 {       'badges': [       'CIS-BENCHMARKS',
                                                           'AWS/AZURE',
                                                           'COMPLIANCE'],
                                         'cmd': 'prowler aws',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'prowler'}],
                                         'difficulty': 'Intermediate',
                                         'flags': [       {       'desc': 'فحص '
                                                                          'مجموعة '
                                                                          'معايير '
                                                                          'أمان '
                                                                          'معينة '
                                                                          'فقط',
                                                                  'flag': '-g'},
                                                          {       'desc': 'تحديد '
                                                                          'صيغ '
                                                                          'الإخراج '
                                                                          'المطلوبة '
                                                                          '(json, '
                                                                          'csv, '
                                                                          'html)',
                                                                  'flag': '-M'}],
                                         'flow_nodes': [       'Credentials '
                                                               'Auth',
                                                               'AWS API '
                                                               'Queries',
                                                               'Compliance '
                                                               'Assessment',
                                                               'CLI/CSV '
                                                               'Output'],
                                         'icon': '🦁',
                                         'id': 'prowler',
                                         'images': ['bb_cloud_security.png'],
                                         'install': 'pip install prowler',
                                         'name': 'Prowler',
                                         'related_tools': [       'scoutsuite',
                                                                  'pacu'],
                                         'speed': 'Medium',
                                         'stats': {       'accuracy': 98,
                                                          'complexity': 55,
                                                          'speed': 65},
                                         'tagline': 'AWS & Azure Security '
                                                    'Assessment tool',
                                         'what_is': 'أداة سطر أوامر قوية '
                                                    'لتقييم أمان السحاب '
                                                    'والمطابقة مع معايير '
                                                    'الأمان مثل CIS Benchmarks '
                                                    'و GDPR.',
                                         'when_not': [       'عندما تريد أداة '
                                                             'فحص سريعة جداً '
                                                             'وخفيفة للـ '
                                                             'Assets الخارجية '
                                                             'فقط'],
                                         'when_use': [       'للتحقق من توافق '
                                                             'إعدادات السحابة '
                                                             'مع المعايير '
                                                             'القياسية وصناعة '
                                                             'تقارير التدقيق'],
                                         'why': [       'فحص دقيق وشامل لأكثر '
                                                        'من 240 فحص أمني',
                                                        'التحقق التلقائي من '
                                                        'الالتزام بالمعايير '
                                                        'العالمية',
                                                        'دعم AWS و Azure بشكل '
                                                        'ممتاز'],
                                         'workflow_nodes': [       '🦁 prowler',
                                                                   '📊 CSV/HTML '
                                                                   'Logs']},
                                 {       'badges': [       'OFFENSIVE-CLOUD',
                                                           'EXPLOITATION',
                                                           'FRAMEWORK'],
                                         'cmd': 'python3 pacu.py',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'pacu'}],
                                         'difficulty': 'Advanced',
                                         'flags': [       {       'desc': 'تشغيل '
                                                                          'موديل '
                                                                          'هجومي '
                                                                          'معين',
                                                                  'flag': 'exec'}],
                                         'flow_nodes': [       'Pacu Console',
                                                               'Import Keys',
                                                               'Run Enum '
                                                               'Modules',
                                                               'Execute '
                                                               'PrivEsc/Attack'],
                                         'icon': '🐻',
                                         'id': 'pacu',
                                         'images': ['bb_cloud_security.png'],
                                         'install': 'pip install aws-pacu',
                                         'name': 'Pacu',
                                         'related_tools': [       'scoutsuite',
                                                                  'prowler'],
                                         'speed': 'Fast',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 80,
                                                          'speed': 80},
                                         'tagline': 'AWS Penetration Testing '
                                                    'Framework',
                                         'what_is': 'إطار عمل هجومي مخصص '
                                                    'لاختبار اختراق بيئات AWS، '
                                                    'يساعد في تصعيد الصلاحيات '
                                                    'وسرقة البيانات بطريقة '
                                                    'مؤتمتة.',
                                         'when_not': [       'للتحقق السلبي أو '
                                                             'البسيط من '
                                                             'الالتزام '
                                                             'بالقواعد '
                                                             '(Compliance)'],
                                         'when_use': [       'عند الرغبة في '
                                                             'اختبار متانة '
                                                             'الدفاعات '
                                                             'السحابية ومحاكاة '
                                                             'هجمات حقيقية '
                                                             'داخل AWS'],
                                         'why': [       'أداة هجومية رائدة '
                                                        'للأمازون AWS',
                                                        'تضم عشرات الموديلات '
                                                        'الهجومية الجاهزة '
                                                        'للتشغيل',
                                                        'تسهيل عمليات تصعيد '
                                                        'الصلاحيات (PrivEsc) '
                                                        'سحابياً'],
                                         'workflow_nodes': [       '🐻 pacu',
                                                                   '🔑 '
                                                                   'compromised_keys',
                                                                   '👑 '
                                                                   'domain_admin']}]},
        {       'color_theme': '#ffb020',
                'icon': '🛡️',
                'id': 'cms_scanning',
                'title': 'CMS Scanning',
                'tools': [       {       'badges': [       'WORDPRESS',
                                                           'PLUGINS-ENUM',
                                                           'VULN-DB'],
                                         'cmd': 'wpscan --url '
                                                'https://target.com '
                                                '--enumerate vp,vt,u',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'wpscan'},
                                                               {       'accuracy': 'Medium',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'joomscan'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'تحديد '
                                                                          'رابط '
                                                                          'الموقع '
                                                                          'المستهدف',
                                                                  'flag': '--url'},
                                                          {       'desc': 'تحديد '
                                                                          'خيارات '
                                                                          'الاستعلام '
                                                                          '(vp: '
                                                                          'إضافات، '
                                                                          'vt: '
                                                                          'قوالب، '
                                                                          'u: '
                                                                          'مستخدمين)',
                                                                  'flag': '--enumerate'},
                                                          {       'desc': 'إدخال '
                                                                          'الـ '
                                                                          'Token '
                                                                          'الخاص '
                                                                          'بـ '
                                                                          'WPScan '
                                                                          'لجلب '
                                                                          'الثغرات '
                                                                          'المحدثة',
                                                                  'flag': '--api-token'}],
                                         'flow_nodes': [       'Target URL',
                                                               'Version Check',
                                                               'Enumerate '
                                                               'Plugins',
                                                               'Compare with '
                                                               'Vuln DB'],
                                         'icon': '🐝',
                                         'id': 'wpscan',
                                         'images': ['bb_cms_scanning.png'],
                                         'install': 'gem install wpscan',
                                         'name': 'WPScan',
                                         'related_tools': [       'joomscan',
                                                                  'droopescan'],
                                         'speed': 'Medium',
                                         'stats': {       'accuracy': 95,
                                                          'complexity': 30,
                                                          'speed': 70},
                                         'tagline': 'WordPress Vulnerability '
                                                    'Scanner',
                                         'what_is': 'أداة متخصصة لفحص مواقع '
                                                    'ووردبريس، واكتشاف '
                                                    'الإضافات والقوالب المصابة '
                                                    'بثغرات أمنية وتخمين كلمات '
                                                    'المرور.',
                                         'when_not': [       'عندما يكون الهدف '
                                                             'تطبيق ويب مخصص '
                                                             '(Custom App) أو '
                                                             'CMS آخر كـ '
                                                             'Drupal'],
                                         'when_use': [       'عند استهداف موقع '
                                                             'يعمل بنظام إدارة '
                                                             'المحتوى '
                                                             'WordPress كلياً'],
                                         'why': [       'أكبر قاعدة بيانات '
                                                        'لثغرات ووردبريس',
                                                        'كشف دقيق للإضافات '
                                                        'والقوالب المثبتة',
                                                        'فحص ملفات النظام '
                                                        'المعرضة للخطر'],
                                         'workflow_nodes': [       '🐝 wpscan',
                                                                   '🔑 '
                                                                   'admin_credentials',
                                                                   '💻 '
                                                                   'shell_upload']},
                                 {       'badges': [       'JOOMLA',
                                                           'FIREWALL-DETECTION',
                                                           'PERL'],
                                         'cmd': 'perl joomscan.pl -u '
                                                'https://target.com',
                                         'comparison': [       {       'accuracy': 'Medium',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'joomscan'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'رابط '
                                                                          'الموقع '
                                                                          'الهدف',
                                                                  'flag': '-u'},
                                                          {       'desc': 'فحص '
                                                                          'المكونات '
                                                                          'الإضافية '
                                                                          '(Components)',
                                                                  'flag': '--ec'}],
                                         'flow_nodes': [       'Target Joomla '
                                                               'URL',
                                                               'Detect Version',
                                                               'Scan '
                                                               'Components',
                                                               'Vulnerability '
                                                               'Report'],
                                         'icon': '🦁',
                                         'id': 'joomscan',
                                         'images': ['bb_cms_scanning.png'],
                                         'install': 'git clone '
                                                    'https://github.com/OWASP/joomscan.git',
                                         'name': 'Joomscan',
                                         'related_tools': [       'wpscan',
                                                                  'droopescan'],
                                         'speed': 'Fast',
                                         'stats': {       'accuracy': 80,
                                                          'complexity': 25,
                                                          'speed': 80},
                                         'tagline': 'Joomla Vulnerability '
                                                    'Scanner',
                                         'what_is': 'أداة من تطوير OWASP تفحص '
                                                    'المواقع المبنية على نظام '
                                                    'Joomla لاكتشاف الثغرات '
                                                    'والتكوينات الخاطئة.',
                                         'when_not': [       'على أي نظام '
                                                             'إدارة محتوى آخر '
                                                             'غير Joomla'],
                                         'when_use': [       'عند استهداف موقع '
                                                             'يعمل بـ Joomla '
                                                             'للبحث عن ثغرات '
                                                             'المكونات '
                                                             'الإضافية'],
                                         'why': [       'بسيطة وسهلة التشغيل',
                                                        'تحديد إصدار جوملا '
                                                        'ونوع جدار الحماية '
                                                        'المستخدم',
                                                        'البحث عن ملفات '
                                                        'التكوين المكشوفة'],
                                         'workflow_nodes': [       '🦁 joomscan',
                                                                   '📂 '
                                                                   'components_vuln']},
                                 {       'badges': [       'DRUPAL',
                                                           'SILVERSTRIPE',
                                                           'CMS-IDENTIFY'],
                                         'cmd': 'droopescan scan drupal -u '
                                                'https://target.com',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'droopescan'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'تحديد '
                                                                          'نوع '
                                                                          'الموقع '
                                                                          '(drupal, '
                                                                          'silverstripe, '
                                                                          'wordpress)',
                                                                  'flag': 'scan'},
                                                          {       'desc': 'رابط '
                                                                          'الهدف',
                                                                  'flag': '-u'}],
                                         'flow_nodes': [       'URL Target',
                                                               'Hash Matching',
                                                               'Determine '
                                                               'Version',
                                                               'Themes & '
                                                               'Plugins Enum'],
                                         'icon': '🐻',
                                         'id': 'droopescan',
                                         'images': ['bb_cms_scanning.png'],
                                         'install': 'pip install droopescan',
                                         'name': 'Droopescan',
                                         'related_tools': [       'wpscan',
                                                                  'joomscan'],
                                         'speed': 'Medium',
                                         'stats': {       'accuracy': 85,
                                                          'complexity': 30,
                                                          'speed': 75},
                                         'tagline': 'Drupal and Silverstripe '
                                                    'vulnerability scanner',
                                         'what_is': 'أداة فحص مصممة للتعرف على '
                                                    'الإصدارات والملفات '
                                                    'والإضافات في مواقع Drupal '
                                                    'و SilverStripe.',
                                         'when_not': [       'على المواقع التي '
                                                             'لا تستعمل دروبال '
                                                             'أو سيلفرسترايب'],
                                         'when_use': [       'عند التعامل مع '
                                                             'مواقع أو جهات '
                                                             'حكومية تستخدم '
                                                             'نظام Drupal بشكل '
                                                             'رئيسي'],
                                         'why': [       'أفضل أداة لفحص بيئات '
                                                        'Drupal وتثبيتاتها',
                                                        'تخمين دقيق للملفات '
                                                        'بناءً على الهاش الخاص '
                                                        'بها',
                                                        'أداة خفيفة ومكتوبة '
                                                        'ببايثون'],
                                         'workflow_nodes': [       '🐻 '
                                                                   'droopescan',
                                                                   '📂 '
                                                                   'plugin_exploits']}]},
        {       'color_theme': '#ff0055',
                'icon': '📷',
                'id': 'screenshotting',
                'title': 'Screenshotting',
                'tools': [       {       'badges': [       'VISUAL-RECON',
                                                           'HTML-REPORT',
                                                           'PORT-CLUSTERING'],
                                         'cmd': 'cat live_hosts.txt | aquatone',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'aquatone'},
                                                               {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'gowitness'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'تحديد '
                                                                          'المنافذ '
                                                                          'المراد '
                                                                          'فحصها '
                                                                          'وتصويرها',
                                                                  'flag': '-ports'},
                                                          {       'desc': 'عدد '
                                                                          'المهام '
                                                                          'المتزامنة '
                                                                          'للتصوير',
                                                                  'flag': '-threads'}],
                                         'flow_nodes': [       'Subdomains '
                                                               'list',
                                                               'Port Probe',
                                                               'Chrome '
                                                               'Headless '
                                                               'Screenshots',
                                                               'HTML '
                                                               'Dashboard'],
                                         'icon': '📷',
                                         'id': 'aquatone',
                                         'images': ['bb_screenshotting.png'],
                                         'install': 'Download precompiled '
                                                    'binary from releases',
                                         'name': 'Aquatone',
                                         'related_tools': [       'gowitness',
                                                                  'eyewitness'],
                                         'speed': 'Fast',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 30,
                                                          'speed': 90},
                                         'tagline': 'Visual Inspection of Web '
                                                    'Sites at Scale',
                                         'what_is': 'أداة لمعاينة صفحات الويب '
                                                    'بصرياً لعدد كبير من '
                                                    'الأهداف، تجمع اللقطات '
                                                    'وتدمجها في تقرير تفاعلي '
                                                    'مذهل.',
                                         'when_not': [       'إذا كان لديك '
                                                             'نطاق واحد أو '
                                                             'نطاقات قليلة '
                                                             'جداً لا تحتاج '
                                                             'أتمتة تصويرية'],
                                         'when_use': [       'بعد عملية '
                                                             'استطلاع واسعة '
                                                             'والحصول على مئات '
                                                             'النطاقات الحية '
                                                             'لتصفحها سريعاً '
                                                             'بالعين'],
                                         'why': [       'تجميع وتصنيف المواقع '
                                                        'المتشابهة لتوفير '
                                                        'الوقت',
                                                        'عرض العناوين '
                                                        'والتقنيات بجانب كل '
                                                        'لقطة شاشة',
                                                        'تصدير تقرير HTML '
                                                        'متكامل وسريع التصفح'],
                                         'workflow_nodes': [       '🛰️ '
                                                                   'subfinder',
                                                                   '🌐 httpx',
                                                                   '📷 aquatone',
                                                                   '👁️ Visual '
                                                                   'Review']},
                                 {       'badges': [       'GO-BASED',
                                                           'SQLITE-DB',
                                                           'FAST'],
                                         'cmd': 'gowitness file -f '
                                                'live_hosts.txt',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'gowitness'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'تحديد '
                                                                          'وضع '
                                                                          'القراءة '
                                                                          'من '
                                                                          'ملف',
                                                                  'flag': 'file'},
                                                          {       'desc': 'مسار '
                                                                          'ملف '
                                                                          'العناوين',
                                                                  'flag': '-f'},
                                                          {       'desc': 'تشغيل '
                                                                          'خادم '
                                                                          'الويب '
                                                                          'لعرض '
                                                                          'الصور '
                                                                          'الملتقطة '
                                                                          'تفاعلياً',
                                                                  'flag': 'server'}],
                                         'flow_nodes': [       'URLs input',
                                                               'Chrome Browser '
                                                               'Launch',
                                                               'Capture & '
                                                               'Render',
                                                               'SQLite '
                                                               'database save'],
                                         'icon': '👁️',
                                         'id': 'gowitness',
                                         'images': ['bb_screenshotting.png'],
                                         'install': 'go install '
                                                    'github.com/sensepost/gowitness@latest',
                                         'name': 'Gowitness',
                                         'related_tools': [       'aquatone',
                                                                  'eyewitness'],
                                         'speed': 'Very Fast',
                                         'stats': {       'accuracy': 92,
                                                          'complexity': 35,
                                                          'speed': 95},
                                         'tagline': 'Go Web Screenshot Utility '
                                                    'using Chrome Headless',
                                         'what_is': 'أداة تصوير مواقع مبنية '
                                                    'بلغة Go تستخدم Chrome '
                                                    'Headless وتخزن اللقطات في '
                                                    'قاعدة بيانات SQLite.',
                                         'when_not': [       'إذا كنت لا تملك '
                                                             'متصفح Google '
                                                             'Chrome أو '
                                                             'Chromium مثبتاً '
                                                             'على خادم الفحص'],
                                         'when_use': [       'عند الحاجة '
                                                             'لالتقاط لقطات '
                                                             'الشاشة بسرعة '
                                                             'فائقة وبطريقة '
                                                             'منظمة وقابلة '
                                                             'للبحث البرمجي'],
                                         'why': [       'سرعة استثنائية وقدرة '
                                                        'على معالجة آلاف '
                                                        'الروابط',
                                                        'تخزين منظم للبيانات '
                                                        'داخل ملف قاعدة بيانات '
                                                        'SQLite',
                                                        'واجهة ويب مدمجة لعرض '
                                                        'الصور والبحث فيها'],
                                         'workflow_nodes': [       '👁️ '
                                                                   'gowitness',
                                                                   '🖥️ Web GUI '
                                                                   'Interface']},
                                 {       'badges': [       'RECON-HELPER',
                                                           'DEFAULT-CREDS',
                                                           'PYTHON'],
                                         'cmd': 'python3 EyeWitness.py -f '
                                                'live_hosts.txt --web',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Medium',
                                                                       'tool': 'eyewitness'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'تفعيل '
                                                                          'الفحص '
                                                                          'وتصوير '
                                                                          'صفحات '
                                                                          'الويب',
                                                                  'flag': '--web'},
                                                          {       'desc': 'ملف '
                                                                          'يحتوي '
                                                                          'على '
                                                                          'العناوين '
                                                                          'المستهدفة',
                                                                  'flag': '-f'}],
                                         'flow_nodes': [       'Target URLs',
                                                               'Identify '
                                                               'Services '
                                                               '(HTTP/RDP)',
                                                               'Screenshot & '
                                                               'Header Extract',
                                                               'Report '
                                                               'Generation'],
                                         'icon': '👀',
                                         'id': 'eyewitness',
                                         'images': ['bb_screenshotting.png'],
                                         'install': 'git clone '
                                                    'https://github.com/RedSiege/EyeWitness.git',
                                         'name': 'EyeWitness',
                                         'related_tools': [       'aquatone',
                                                                  'gowitness'],
                                         'speed': 'Medium',
                                         'stats': {       'accuracy': 95,
                                                          'complexity': 40,
                                                          'speed': 75},
                                         'tagline': 'Screenshots, Server '
                                                    'Headers, and default '
                                                    'credential checks',
                                         'what_is': 'أداة ممتازة تأخذ لقطات '
                                                    'شاشة للمواقع، وتستخلص '
                                                    'معلومات السيرفر وتحذر عند '
                                                    'وجود لوحات تحكم تستعمل '
                                                    'بيانات مرور افتراضية.',
                                         'when_not': [       'عندما تريد أداة '
                                                             'خفيفة الحجم ولا '
                                                             'تستهلك مساحة '
                                                             'تخزينية كبيرة'],
                                         'when_use': [       'أثناء الفحوصات '
                                                             'الداخلية للشبكات '
                                                             'أو النطاقات '
                                                             'الكبيرة للبحث عن '
                                                             'أجهزة إلكترونية '
                                                             'ببيانات مرور '
                                                             'افتراضية'],
                                         'why': [       'كشف تلقائي للوحات '
                                                        'التحكم الشهيرة '
                                                        'وبيانات مرورها '
                                                        'الافتراضية',
                                                        'تنظيم ممتاز للتقرير '
                                                        'مع إظهار تفاصيل الـ '
                                                        'HTTP Headers',
                                                        'دعم تصوير خدمات الـ '
                                                        'RDP والـ VNC أيضاً'],
                                         'workflow_nodes': [       '👀 '
                                                                   'eyewitness',
                                                                   '🔑 '
                                                                   'default_credentials_check']}]},
        {       'color_theme': '#00ff66',
                'icon': '🔗',
                'id': 'subdomain_takeover',
                'title': 'Subdomain Takeover',
                'tools': [       {       'badges': [       'TAKEOVER',
                                                           'FAST-CHECK',
                                                           'GO-BASED'],
                                         'cmd': 'subzy run --targets '
                                                'subdomains.txt',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'No',
                                                                       'passive': 'Yes',
                                                                       'speed': 'Very '
                                                                                'Fast',
                                                                       'tool': 'subzy'},
                                                               {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'nuclei_takeover'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'بدء '
                                                                          'تشغيل '
                                                                          'عملية '
                                                                          'الفحص',
                                                                  'flag': 'run'},
                                                          {       'desc': 'تحديد '
                                                                          'ملف '
                                                                          'النطاقات '
                                                                          'الفرعية '
                                                                          'المستهدفة',
                                                                  'flag': '--targets'}],
                                         'flow_nodes': [       'Subdomains '
                                                               'list',
                                                               'CNAME '
                                                               'Resolution',
                                                               'Check Service '
                                                               'Response '
                                                               'Signatures',
                                                               'Vulnerable '
                                                               'Alert'],
                                         'icon': '🔗',
                                         'id': 'subzy',
                                         'images': [       'bb_subdomain_takeover.png'],
                                         'install': 'go install '
                                                    'github.com/LukaSikic/subzy@latest',
                                         'name': 'Subzy',
                                         'related_tools': ['nuclei_takeover'],
                                         'speed': 'Very Fast',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 20,
                                                          'speed': 98},
                                         'tagline': 'Fast Subdomain Takeover '
                                                    'Vulnerability Checker',
                                         'what_is': 'أداة سريعة تفحص أسماء '
                                                    'النطاقات الفرعية وتكتشف '
                                                    'إمكانية الاستيلاء عليها '
                                                    '(Takeover) بسبب وجود '
                                                    'توجيهات DNS لخدمات سحابية '
                                                    'غير مهيأة.',
                                         'when_not': [       'لا توجد حالة '
                                                             'تمنع استخدامها '
                                                             'فهي passive '
                                                             'وآمنة تماماً'],
                                         'when_use': [       'بشكل روتيني بعد '
                                                             'تجميع النطاقات '
                                                             'الفرعية للبحث عن '
                                                             'ثغرات الاستيلاء '
                                                             'عالية الخطورة '
                                                             '(Subdomain '
                                                             'Takeover)'],
                                         'why': [       'سرعة مذهلة في معالجة '
                                                        'آلاف النطاقات',
                                                        'قاعدة بيانات مدمجة '
                                                        'للمؤشرات والخدمات '
                                                        'الشهيرة (GitHub, '
                                                        'Heroku, Shopify)',
                                                        'سهلة الاستخدام وسطر '
                                                        'أوامر بسيط'],
                                         'workflow_nodes': [       '🛰️ '
                                                                   'subfinder',
                                                                   '🔗 subzy',
                                                                   '🚩 '
                                                                   'takeover_exploit']},
                                 {       'badges': [       'NUCLEI-TEMPLATES',
                                                           'EXACT-MATCHING',
                                                           'COMMUNITY-UPDATED'],
                                         'cmd': 'nuclei -l subdomains.txt -t '
                                                'takeovers/',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'Yes',
                                                                       'passive': 'No',
                                                                       'speed': 'Fast',
                                                                       'tool': 'nuclei '
                                                                               'takeover'}],
                                         'difficulty': 'Intermediate',
                                         'flags': [       {       'desc': 'تشغيل '
                                                                          'مجلد '
                                                                          'قوالب '
                                                                          'الاستيلاء '
                                                                          'فقط',
                                                                  'flag': '-t '
                                                                          'takeovers/'},
                                                          {       'desc': 'ملف '
                                                                          'قائمة '
                                                                          'النطاقات '
                                                                          'الفرعية '
                                                                          'المراد '
                                                                          'فحصها',
                                                                  'flag': '-l'}],
                                         'flow_nodes': [       'Subdomains '
                                                               'list',
                                                               'HTTP Request',
                                                               'Signature '
                                                               'Regex Check',
                                                               'Vulnerability '
                                                               'Matching'],
                                         'icon': '☢️',
                                         'id': 'nuclei_takeover',
                                         'images': [       'bb_subdomain_takeover.png'],
                                         'install': 'go install '
                                                    'github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest',
                                         'name': 'Nuclei Takeover Templates',
                                         'related_tools': ['subzy'],
                                         'speed': 'Fast',
                                         'stats': {       'accuracy': 98,
                                                          'complexity': 50,
                                                          'speed': 85},
                                         'tagline': 'Accurate Service '
                                                    'Signature Matching using '
                                                    'Nuclei',
                                         'what_is': 'استخدام قالب فحص الثغرات '
                                                    'Nuclei مع قوالب الاستيلاء '
                                                    '(takeovers) الخاصة '
                                                    'بالمجتمع للتحقق بدقة '
                                                    'شديدة.',
                                         'when_not': [       'عندما تريد فحصاً '
                                                             'عاماً وسريعاً '
                                                             'جداً بدون إرسال '
                                                             'طلبات HTTP '
                                                             'مخصصة'],
                                         'when_use': [       'لتأكيد وجود ثغرة '
                                                             'subdomain '
                                                             'takeover بدون '
                                                             'أخطاء واستبعاد '
                                                             'النتائج المزيفة'],
                                         'why': [       'دقة مرتفعة للغاية '
                                                        'ونسبة إنذار خاطئ شبه '
                                                        'معدومة',
                                                        'قوالب محدثة باستمرار '
                                                        'من مجتمع الأمن '
                                                        'السيبراني العالمي',
                                                        'دعم سيناريوهات فحص '
                                                        'متطورة ومركبة'],
                                         'workflow_nodes': [       '🔗 '
                                                                   'subdomain_list',
                                                                   '☢️ nuclei '
                                                                   'takeover',
                                                                   '🚩 '
                                                                   'verified_takeover']}]},
        {       'color_theme': '#ff3300',
                'icon': '📖',
                'id': 'wordlists',
                'title': 'Wordlists',
                'tools': [       {       'badges': [       'RESOURCE',
                                                           'DICTIONARY',
                                                           'MUST-HAVE'],
                                         'cmd': 'ls -l /usr/share/seclists/',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'N/A',
                                                                       'passive': 'N/A',
                                                                       'speed': 'N/A',
                                                                       'tool': 'seclists'},
                                                               {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'N/A',
                                                                       'passive': 'N/A',
                                                                       'speed': 'N/A',
                                                                       'tool': 'payloadsallthethings'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'مجلد '
                                                                          'يحتوي '
                                                                          'على '
                                                                          'ملفات '
                                                                          'نصية '
                                                                          'فقط',
                                                                  'flag': 'No '
                                                                          'flags'}],
                                         'flow_nodes': [       'Determine Scan '
                                                               'Type',
                                                               'Select '
                                                               'Wordlist from '
                                                               'SecLists',
                                                               'Load into '
                                                               'Fuzzer',
                                                               'Bruteforce / '
                                                               'Exploit'],
                                         'icon': '📖',
                                         'id': 'seclists',
                                         'images': ['bb_wordlists.png'],
                                         'install': 'git clone '
                                                    'https://github.com/danielmiessler/SecLists.git',
                                         'name': 'SecLists',
                                         'related_tools': [       'payloadsallthethings',
                                                                  'onelistforall'],
                                         'speed': 'N/A',
                                         'stats': {       'accuracy': 95,
                                                          'complexity': 10,
                                                          'speed': 100},
                                         'tagline': "The Security Tester's "
                                                    'Companion Wordlists',
                                         'what_is': 'المكتبة الأضخم والأهم '
                                                    'لقوائم الكلمات المخصصة '
                                                    'للأمن السيبراني، تحتوي '
                                                    'على كلمات مرور، أسماء '
                                                    'مستخدمين، مسارات ويب، '
                                                    'وحقن ثغرات.',
                                         'when_not': [       'لا توجد حالة، هي '
                                                             'ركن أساسي لكل '
                                                             'مختبر اختراق'],
                                         'when_use': [       'في جميع مراحل '
                                                             'فحص وتخمين '
                                                             'الثغرات '
                                                             '(Directory '
                                                             'search, Password '
                                                             'spraying, XSS '
                                                             'fuzzing)'],
                                         'why': [       'القوائم مقسمة ومنظمة '
                                                        'حسب نوع الفحص بشكل '
                                                        'احترافي',
                                                        'توفير الوقت في كتابة '
                                                        'قوائم كلمات من الصفر',
                                                        'تحديثات مستمرة من '
                                                        'الباحثين الأمنيين'],
                                         'workflow_nodes': [       '📖 seclists',
                                                                   '⚡ ffuf',
                                                                   '📂 '
                                                                   'sensitive_files']},
                                 {       'badges': [       'RESOURCE',
                                                           'PAYLOADS',
                                                           'BYPASSES'],
                                         'cmd': 'ls -l PayloadsAllTheThings/',
                                         'comparison': [       {       'accuracy': 'Very '
                                                                                   'High',
                                                                       'active': 'N/A',
                                                                       'passive': 'N/A',
                                                                       'speed': 'N/A',
                                                                       'tool': 'payloadsallthethings'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'مستودع '
                                                                          'مستندات '
                                                                          'وأكواد '
                                                                          'نصية',
                                                                  'flag': 'No '
                                                                          'flags'}],
                                         'flow_nodes': [       'Find Web Vuln',
                                                               'Lookup Vuln '
                                                               'type',
                                                               'Select Payload',
                                                               'Modify & '
                                                               'Inject'],
                                         'icon': '💡',
                                         'id': 'payloadsallthethings',
                                         'images': ['bb_wordlists.png'],
                                         'install': 'git clone '
                                                    'https://github.com/swisskyrepo/PayloadsAllTheThings.git',
                                         'name': 'PayloadsAllTheThings',
                                         'related_tools': [       'seclists',
                                                                  'onelistforall'],
                                         'speed': 'N/A',
                                         'stats': {       'accuracy': 95,
                                                          'complexity': 15,
                                                          'speed': 100},
                                         'tagline': 'Repository of useful '
                                                    'payloads and bypasses',
                                         'what_is': 'دليل ومرجع ضخم يحتوي على '
                                                    'نصوص برمجية هجومية '
                                                    '(Payloads) وحيل تخطي '
                                                    'الحمايات لكل أنواع ثغرات '
                                                    'تطبيقات الويب.',
                                         'when_not': ['لا توجد حالة'],
                                         'when_use': [       'عندما تعثر على '
                                                             'ثغرة وتريد صياغة '
                                                             'Payload ناجح '
                                                             'لتخطي الفلاتر '
                                                             'والحمايات وإثبات '
                                                             'الثغرة (PoC)'],
                                         'why': [       'أفضل مرجع لصياغة جمل '
                                                        'الاستغلال (Exploits) '
                                                        'يدوياً',
                                                        'حلول تخطي جدار '
                                                        'الحماية (WAF '
                                                        'Bypasses) مفصلة',
                                                        'أمثلة أكواد عملية '
                                                        'لجميع الثغرات '
                                                        'الشائعة'],
                                         'workflow_nodes': [       '💡 '
                                                                   'payloadsallthethings',
                                                                   '💉 '
                                                                   'exploit_crafting',
                                                                   '👑 '
                                                                   'remote_code_execution']},
                                 {       'badges': [       'UNIFIED',
                                                           'OPTIMIZED',
                                                           'FUZZING'],
                                         'cmd': 'ls -l OneListForAll/',
                                         'comparison': [       {       'accuracy': 'High',
                                                                       'active': 'N/A',
                                                                       'passive': 'N/A',
                                                                       'speed': 'N/A',
                                                                       'tool': 'onelistforall'}],
                                         'difficulty': 'Easy',
                                         'flags': [       {       'desc': 'ملف '
                                                                          'نصي '
                                                                          'موحد '
                                                                          'للفحص',
                                                                  'flag': 'No '
                                                                          'flags'}],
                                         'flow_nodes': [       'Fuzzing Setup',
                                                               'Load '
                                                               'OneListForAll',
                                                               'Quick Web '
                                                               'Scanning',
                                                               'Key Findings'],
                                         'icon': '📜',
                                         'id': 'onelistforall',
                                         'images': ['bb_wordlists.png'],
                                         'install': 'git clone '
                                                    'https://github.com/six2dez/OneListForAll.git',
                                         'name': 'OneListForAll',
                                         'related_tools': [       'seclists',
                                                                  'payloadsallthethings'],
                                         'speed': 'N/A',
                                         'stats': {       'accuracy': 90,
                                                          'complexity': 10,
                                                          'speed': 100},
                                         'tagline': 'A compiled and optimized '
                                                    'wordlist for web fuzzing',
                                         'what_is': 'قائمة كلمات موحدة ومحسنة '
                                                    'تجمع أفضل وأكثر مسارات '
                                                    'الويب الحساسة تكراراً لحل '
                                                    'مشكلة تشتت قوائم الكلمات.',
                                         'when_not': [       'عندما تريد فحصاً '
                                                             'عميقاً جداً '
                                                             'وتفصيلياً بنوع '
                                                             'معين من '
                                                             'المسارات'],
                                         'when_use': [       'في الفحوصات '
                                                             'الاستطلاعية '
                                                             'السريعة لمسارات '
                                                             'الويب الحساسة'],
                                         'why': [       'تجميع ذكي يقلل الوقت '
                                                        'عبر حذف التكرار '
                                                        'والمصطلحات النادرة',
                                                        'قائمة واحدة للفحص '
                                                        'السريعة والفعال',
                                                        'أداء عالي وسرعة فحص '
                                                        'ملحوظة'],
                                         'workflow_nodes': [       '📜 '
                                                                   'onelistforall',
                                                                   '🦀 '
                                                                   'feroxbuster',
                                                                   '🔥 '
                                                                   'discovery']}]}]
    }

def home(request):
    return render(request, 'main/home.html', get_portfolio_context())
