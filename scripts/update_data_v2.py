import re
import os

new_explorer_data = """        'academy_explorer': [
            {
                'id': 'recon',
                'title': 'Reconnaissance',
                'icon': '🌍',
                'color_theme': '#00e5ff',
                'tools': [
                    {
                        'id': 'subfinder',
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
                        'id': 'amass',
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
                        'id': 'assetfinder',
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
                        'id': 'chaos',
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
                        'id': 'katana',
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
                        'id': 'hakrawler',
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
                        'id': 'gospider',
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
                        'id': 'gau',
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
                        'id': 'waybackurls',
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
                        'id': 'waymore',
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
                        'id': 'ffuf',
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
                        'id': 'feroxbuster',
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
                        'id': 'gobuster',
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
                        'id': 'dirsearch',
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
                        'id': 'arjun',
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
                        'id': 'paramspider',
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
                        'id': 'linkfinder',
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
                        'id': 'secretfinder',
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
                        'id': 'nuclei',
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
                        'id': 'dalfox',
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
                        'id': 'sqlmap',
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
        ]"""

filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\views.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r"        'academy_explorer': \[.*?\]", re.DOTALL)
new_content = pattern.sub(new_explorer_data, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("views.py updated successfully to v2!")
