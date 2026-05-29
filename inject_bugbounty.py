import os
import re

views_path = r"D:\abdo_portfolio\main\views.py"
html_path = r"D:\abdo_portfolio\main\templates\main\home.html"

# Define the Bug Bounty explorer data
bugbounty_data = [
    {
        'id': 'api_testing',
        'title': 'API Testing',
        'icon': '📬',
        'color_theme': '#00e5ff',
        'tools': [
            {
                'id': 'postman',
                'name': 'Postman',
                'icon': '📬',
                'difficulty': 'Easy',
                'speed': 'Fast',
                'tagline': 'Collaborative API Development & Testing Platform',
                'badges': ['GUI-BASED', 'MANUAL/AUTO', 'POPULAR'],
                'stats': {'speed': 85, 'complexity': 40, 'accuracy': 90},
                'what_is': 'منصة متكاملة لبناء واختبار واستخدام الـ APIs، تُستعمل بشكل واسع لفحص أمن نقاط الاتصال يدوياً.',
                'why': ['تعديل وقراءة الـ HTTP Requests بسهولة', 'دعم الأتمتة للمجموعات (Collections)', 'بيئة عمل مرئية بالكامل'],
                'flow_nodes': ['Launch GUI', 'Import Spec', 'Craft Requests', 'Analyze Response'],
                'install': 'Download from postman.com/downloads',
                'cmd': 'postman (GUI App)',
                'flags': [
                    { 'flag': '--help', 'desc': 'عرض خيارات المساعدة لنسخة Newman CLI' }
                ],
                'when_use': ['عند اختبار منطق عمل الـ API (Business Logic)', 'عند عمل Fuzzing يدوي للطلبات'],
                'when_not': ['عند الرغبة في عمل Fuzzing سريع جداً لملايين المسارات (استخدم ffuf)'],
                'comparison': [
                    {'tool': 'postman', 'speed': 'Medium', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'},
                    {'tool': 'kiterunner', 'speed': 'Very Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['📬 postman', '💻 proxy', '🔥 burp suite'],
                'related_tools': ['kiterunner', 'ffuf_api'],
                'images': ['bb_api_testing.png']
            },
            {
                'id': 'kiterunner',
                'name': 'Kiterunner',
                'icon': '🏃',
                'difficulty': 'Intermediate',
                'speed': 'Very Fast',
                'tagline': 'Context-Aware API Scanning Tool',
                'badges': ['FAST', 'API-ROUTES', 'GO-BASED'],
                'stats': {'speed': 95, 'complexity': 60, 'accuracy': 85},
                'what_is': 'أداة سريعة جداً مصممة خصيصاً لاكتشاف مسارات الـ API والـ Endpoints المخفية باستخدام ملفات التوجيه.',
                'why': ['سرعة فائقة في الفحص والتخمين', 'فهم سياق الـ APIs (REST, GraphQL)', 'دعم قراءة ملفات OpenAPI/Swagger'],
                'flow_nodes': ['Target API Host', 'Wordlist (routes.json)', 'Assetnote Scan', 'Endpoints Discovered'],
                'install': 'go install github.com/assetnote/kiterunner/cmd/kr@latest',
                'cmd': 'kr scan https://target.com/api -w routes.json',
                'flags': [
                    { 'flag': 'scan', 'desc': 'بدء عملية الفحص' },
                    { 'flag': '-w', 'desc': 'تحديد مسار ملف الكلمات/المسارات (Wordlist)' }
                ],
                'when_use': ['عندما تواجه هدفاً يعتمد على الـ API وتريد معرفة المسارات النشطة بسرعة'],
                'when_not': ['على المواقع التعريفية البسيطة التي لا تحتوي على خدمات API الخلفية'],
                'comparison': [
                    {'tool': 'kiterunner', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🏃 kiterunner', '🌐 httpx', '🔥 nuclei'],
                'related_tools': ['postman', 'ffuf_api'],
                'images': ['bb_api_testing.png']
            },
            {
                'id': 'ffuf_api',
                'name': 'ffuf API fuzzing',
                'icon': '⚡',
                'difficulty': 'Intermediate',
                'speed': 'Very Fast',
                'tagline': 'Fuzzing API Endpoints with ffuf',
                'badges': ['FUZZER', 'API-FUZZ', 'GO-BASED'],
                'stats': {'speed': 100, 'complexity': 50, 'accuracy': 90},
                'what_is': 'استخدام أداة ffuf السريعة لتخمين وفحص مسارات ومعاملات الـ API باستخدام قوائم مخصصة.',
                'why': ['أسرع فاحص مسارات ويب على الإطلاق', 'القدرة على فحص ميثودز متعددة (POST, PUT, DELETE)', 'تصفية ذكية للاستجابات الخاطئة'],
                'flow_nodes': ['API Endpoint/FUZZ', 'API Wordlist', 'ffuf Engine', 'Method Fuzzing', 'Filter & Save'],
                'install': 'go install github.com/ffuf/ffuf/v2@latest',
                'cmd': 'ffuf -u https://target.com/api/FUZZ -w api_endpoints.txt -mc 200',
                'flags': [
                    { 'flag': '-u', 'desc': 'الرابط مع كلمة FUZZ للمكان المراد تخمينه' },
                    { 'flag': '-mc', 'desc': 'فلترة النتائج بناءً على كود الاستجابة (Status Code)' },
                    { 'flag': '-X', 'desc': 'تحديد طريقة الطلب (GET, POST, etc.)' }
                ],
                'when_use': ['لاكتشاف البارامترات والقيم داخل الـ API', 'لتخمين مسارات الـ endpoints المجهولة'],
                'when_not': ['إذا كانت الـ API محمية بـ Rate-Limit صارم جداً يسبب حظر الـ IP بسرعة'],
                'comparison': [
                    {'tool': 'ffuf api', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['⚡ ffuf api', '💻 burp suite'],
                'related_tools': ['kiterunner', 'postman'],
                'images': ['bb_api_testing.png']
            }
        ]
    },
    {
        'id': 'cloud_security',
        'title': 'Cloud Security',
        'icon': '☁️',
        'color_theme': '#9b59ff',
        'tools': [
            {
                'id': 'scoutsuite',
                'name': 'ScoutSuite',
                'icon': '🔍',
                'difficulty': 'Intermediate',
                'speed': 'Medium',
                'tagline': 'Multi-Cloud Security Auditing Tool',
                'badges': ['MULTI-CLOUD', 'AUDITING', 'HTML-REPORT'],
                'stats': {'speed': 60, 'complexity': 50, 'accuracy': 95},
                'what_is': 'أداة مفتوحة المصدر لتدقيق وفحص أمان السحابة المتعددة (AWS, Azure, GCP)، تقوم بتحليل الإعدادات وتقديم تقرير تفاعلي.',
                'why': ['الحصول على نظرة شاملة لثغرات الحساب السحابي', 'تصدير تقرير HTML مرئي وجذاب وسهل القراءة', 'دعم منصات سحابية متعددة في مكان واحد'],
                'flow_nodes': ['Cloud APIs Connection', 'Fetch Configuration', 'Evaluate Ruleset', 'Generate HTML Report'],
                'install': 'pip install scoutsuite',
                'cmd': 'scout aws --profile my-profile',
                'flags': [
                    { 'flag': 'aws', 'desc': 'تحديد المزود (AWS) المراد فحصه' },
                    { 'flag': '--profile', 'desc': 'استخدام ملف تعريف AWS CLI معين' }
                ],
                'when_use': ['عند الحصول على وصول لقراءة حساب سحابي (ReadOnly credentials) وتريد تقييمه'],
                'when_not': ['عند الرغبة في محاولة استغلال الثغرات بشكل نشط وعنيف (استخدم Pacu)'],
                'comparison': [
                    {'tool': 'scoutsuite', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'},
                    {'tool': 'prowler', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['☁️ scoutsuite', '📊 HTML Report'],
                'related_tools': ['prowler', 'pacu'],
                'images': ['bb_cloud_security.png']
            },
            {
                'id': 'prowler',
                'name': 'Prowler',
                'icon': '🦁',
                'difficulty': 'Intermediate',
                'speed': 'Medium',
                'tagline': 'AWS & Azure Security Assessment tool',
                'badges': ['CIS-BENCHMARKS', 'AWS/AZURE', 'COMPLIANCE'],
                'stats': {'speed': 65, 'complexity': 55, 'accuracy': 98},
                'what_is': 'أداة سطر أوامر قوية لتقييم أمان السحاب والمطابقة مع معايير الأمان مثل CIS Benchmarks و GDPR.',
                'why': ['فحص دقيق وشامل لأكثر من 240 فحص أمني', 'التحقق التلقائي من الالتزام بالمعايير العالمية', 'دعم AWS و Azure بشكل ممتاز'],
                'flow_nodes': ['Credentials Auth', 'AWS API Queries', 'Compliance Assessment', 'CLI/CSV Output'],
                'install': 'pip install prowler',
                'cmd': 'prowler aws',
                'flags': [
                    { 'flag': '-g', 'desc': 'فحص مجموعة معايير أمان معينة فقط' },
                    { 'flag': '-M', 'desc': 'تحديد صيغ الإخراج المطلوبة (json, csv, html)' }
                ],
                'when_use': ['للتحقق من توافق إعدادات السحابة مع المعايير القياسية وصناعة تقارير التدقيق'],
                'when_not': ['عندما تريد أداة فحص سريعة جداً وخفيفة للـ Assets الخارجية فقط'],
                'comparison': [
                    {'tool': 'prowler', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🦁 prowler', '📊 CSV/HTML Logs'],
                'related_tools': ['scoutsuite', 'pacu'],
                'images': ['bb_cloud_security.png']
            },
            {
                'id': 'pacu',
                'name': 'Pacu',
                'icon': '🐻',
                'difficulty': 'Advanced',
                'speed': 'Fast',
                'tagline': 'AWS Penetration Testing Framework',
                'badges': ['OFFENSIVE-CLOUD', 'EXPLOITATION', 'FRAMEWORK'],
                'stats': {'speed': 80, 'complexity': 80, 'accuracy': 90},
                'what_is': 'إطار عمل هجومي مخصص لاختبار اختراق بيئات AWS، يساعد في تصعيد الصلاحيات وسرقة البيانات بطريقة مؤتمتة.',
                'why': ['أداة هجومية رائدة للأمازون AWS', 'تضم عشرات الموديلات الهجومية الجاهزة للتشغيل', 'تسهيل عمليات تصعيد الصلاحيات (PrivEsc) سحابياً'],
                'flow_nodes': ['Pacu Console', 'Import Keys', 'Run Enum Modules', 'Execute PrivEsc/Attack'],
                'install': 'pip install aws-pacu',
                'cmd': 'python3 pacu.py',
                'flags': [
                    { 'flag': 'exec', 'desc': 'تشغيل موديل هجومي معين' }
                ],
                'when_use': ['عند الرغبة في اختبار متانة الدفاعات السحابية ومحاكاة هجمات حقيقية داخل AWS'],
                'when_not': ['للتحقق السلبي أو البسيط من الالتزام بالقواعد (Compliance)'],
                'comparison': [
                    {'tool': 'pacu', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🐻 pacu', '🔑 compromised_keys', '👑 domain_admin'],
                'related_tools': ['scoutsuite', 'prowler'],
                'images': ['bb_cloud_security.png']
            }
        ]
    },
    {
        'id': 'cms_scanning',
        'title': 'CMS Scanning',
        'icon': '🛡️',
        'color_theme': '#ffb020',
        'tools': [
            {
                'id': 'wpscan',
                'name': 'WPScan',
                'icon': '🐝',
                'difficulty': 'Easy',
                'speed': 'Medium',
                'tagline': 'WordPress Vulnerability Scanner',
                'badges': ['WORDPRESS', 'PLUGINS-ENUM', 'VULN-DB'],
                'stats': {'speed': 70, 'complexity': 30, 'accuracy': 95},
                'what_is': 'أداة متخصصة لفحص مواقع ووردبريس، واكتشاف الإضافات والقوالب المصابة بثغرات أمنية وتخمين كلمات المرور.',
                'why': ['أكبر قاعدة بيانات لثغرات ووردبريس', 'كشف دقيق للإضافات والقوالب المثبتة', 'فحص ملفات النظام المعرضة للخطر'],
                'flow_nodes': ['Target URL', 'Version Check', 'Enumerate Plugins', 'Compare with Vuln DB'],
                'install': 'gem install wpscan',
                'cmd': 'wpscan --url https://target.com --enumerate vp,vt,u',
                'flags': [
                    { 'flag': '--url', 'desc': 'تحديد رابط الموقع المستهدف' },
                    { 'flag': '--enumerate', 'desc': 'تحديد خيارات الاستعلام (vp: إضافات، vt: قوالب، u: مستخدمين)' },
                    { 'flag': '--api-token', 'desc': 'إدخال الـ Token الخاص بـ WPScan لجلب الثغرات المحدثة' }
                ],
                'when_use': ['عند استهداف موقع يعمل بنظام إدارة المحتوى WordPress كلياً'],
                'when_not': ['عندما يكون الهدف تطبيق ويب مخصص (Custom App) أو CMS آخر كـ Drupal'],
                'comparison': [
                    {'tool': 'wpscan', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'},
                    {'tool': 'joomscan', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🐝 wpscan', '🔑 admin_credentials', '💻 shell_upload'],
                'related_tools': ['joomscan', 'droopescan'],
                'images': ['bb_cms_scanning.png']
            },
            {
                'id': 'joomscan',
                'name': 'Joomscan',
                'icon': '🦁',
                'difficulty': 'Easy',
                'speed': 'Fast',
                'tagline': 'Joomla Vulnerability Scanner',
                'badges': ['JOOMLA', 'FIREWALL-DETECTION', 'PERL'],
                'stats': {'speed': 80, 'complexity': 25, 'accuracy': 80},
                'what_is': 'أداة من تطوير OWASP تفحص المواقع المبنية على نظام Joomla لاكتشاف الثغرات والتكوينات الخاطئة.',
                'why': ['بسيطة وسهلة التشغيل', 'تحديد إصدار جوملا ونوع جدار الحماية المستخدم', 'البحث عن ملفات التكوين المكشوفة'],
                'flow_nodes': ['Target Joomla URL', 'Detect Version', 'Scan Components', 'Vulnerability Report'],
                'install': 'git clone https://github.com/OWASP/joomscan.git',
                'cmd': 'perl joomscan.pl -u https://target.com',
                'flags': [
                    { 'flag': '-u', 'desc': 'رابط الموقع الهدف' },
                    { 'flag': '--ec', 'desc': 'فحص المكونات الإضافية (Components)' }
                ],
                'when_use': ['عند استهداف موقع يعمل بـ Joomla للبحث عن ثغرات المكونات الإضافية'],
                'when_not': ['على أي نظام إدارة محتوى آخر غير Joomla'],
                'comparison': [
                    {'tool': 'joomscan', 'speed': 'Fast', 'accuracy': 'Medium', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🦁 joomscan', '📂 components_vuln'],
                'related_tools': ['wpscan', 'droopescan'],
                'images': ['bb_cms_scanning.png']
            },
            {
                'id': 'droopescan',
                'name': 'Droopescan',
                'icon': '🐻',
                'difficulty': 'Easy',
                'speed': 'Medium',
                'tagline': 'Drupal and Silverstripe vulnerability scanner',
                'badges': ['DRUPAL', 'SILVERSTRIPE', 'CMS-IDENTIFY'],
                'stats': {'speed': 75, 'complexity': 30, 'accuracy': 85},
                'what_is': 'أداة فحص مصممة للتعرف على الإصدارات والملفات والإضافات في مواقع Drupal و SilverStripe.',
                'why': ['أفضل أداة لفحص بيئات Drupal وتثبيتاتها', 'تخمين دقيق للملفات بناءً على الهاش الخاص بها', 'أداة خفيفة ومكتوبة ببايثون'],
                'flow_nodes': ['URL Target', 'Hash Matching', 'Determine Version', 'Themes & Plugins Enum'],
                'install': 'pip install droopescan',
                'cmd': 'droopescan scan drupal -u https://target.com',
                'flags': [
                    { 'flag': 'scan', 'desc': 'تحديد نوع الموقع (drupal, silverstripe, wordpress)' },
                    { 'flag': '-u', 'desc': 'رابط الهدف' }
                ],
                'when_use': ['عند التعامل مع مواقع أو جهات حكومية تستخدم نظام Drupal بشكل رئيسي'],
                'when_not': ['على المواقع التي لا تستعمل دروبال أو سيلفرسترايب'],
                'comparison': [
                    {'tool': 'droopescan', 'speed': 'Medium', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🐻 droopescan', '📂 plugin_exploits'],
                'related_tools': ['wpscan', 'joomscan'],
                'images': ['bb_cms_scanning.png']
            }
        ]
    },
    {
        'id': 'screenshotting',
        'title': 'Screenshotting',
        'icon': '📷',
        'color_theme': '#ff0055',
        'tools': [
            {
                'id': 'aquatone',
                'name': 'Aquatone',
                'icon': '📷',
                'difficulty': 'Easy',
                'speed': 'Fast',
                'tagline': 'Visual Inspection of Web Sites at Scale',
                'badges': ['VISUAL-RECON', 'HTML-REPORT', 'PORT-CLUSTERING'],
                'stats': {'speed': 90, 'complexity': 30, 'accuracy': 90},
                'what_is': 'أداة لمعاينة صفحات الويب بصرياً لعدد كبير من الأهداف، تجمع اللقطات وتدمجها في تقرير تفاعلي مذهل.',
                'why': ['تجميع وتصنيف المواقع المتشابهة لتوفير الوقت', 'عرض العناوين والتقنيات بجانب كل لقطة شاشة', 'تصدير تقرير HTML متكامل وسريع التصفح'],
                'flow_nodes': ['Subdomains list', 'Port Probe', 'Chrome Headless Screenshots', 'HTML Dashboard'],
                'install': 'Download precompiled binary from releases',
                'cmd': 'cat live_hosts.txt | aquatone',
                'flags': [
                    { 'flag': '-ports', 'desc': 'تحديد المنافذ المراد فحصها وتصويرها' },
                    { 'flag': '-threads', 'desc': 'عدد المهام المتزامنة للتصوير' }
                ],
                'when_use': ['بعد عملية استطلاع واسعة والحصول على مئات النطاقات الحية لتصفحها سريعاً بالعين'],
                'when_not': ['إذا كان لديك نطاق واحد أو نطاقات قليلة جداً لا تحتاج أتمتة تصويرية'],
                'comparison': [
                    {'tool': 'aquatone', 'speed': 'Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'},
                    {'tool': 'gowitness', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🛰️ subfinder', '🌐 httpx', '📷 aquatone', '👁️ Visual Review'],
                'related_tools': ['gowitness', 'eyewitness'],
                'images': ['bb_screenshotting.png']
            },
            {
                'id': 'gowitness',
                'name': 'Gowitness',
                'icon': '👁️',
                'difficulty': 'Easy',
                'speed': 'Very Fast',
                'tagline': 'Go Web Screenshot Utility using Chrome Headless',
                'badges': ['GO-BASED', 'SQLITE-DB', 'FAST'],
                'stats': {'speed': 95, 'complexity': 35, 'accuracy': 92},
                'what_is': 'أداة تصوير مواقع مبنية بلغة Go تستخدم Chrome Headless وتخزن اللقطات في قاعدة بيانات SQLite.',
                'why': ['سرعة استثنائية وقدرة على معالجة آلاف الروابط', 'تخزين منظم للبيانات داخل ملف قاعدة بيانات SQLite', 'واجهة ويب مدمجة لعرض الصور والبحث فيها'],
                'flow_nodes': ['URLs input', 'Chrome Browser Launch', 'Capture & Render', 'SQLite database save'],
                'install': 'go install github.com/sensepost/gowitness@latest',
                'cmd': 'gowitness file -f live_hosts.txt',
                'flags': [
                    { 'flag': 'file', 'desc': 'تحديد وضع القراءة من ملف' },
                    { 'flag': '-f', 'desc': 'مسار ملف العناوين' },
                    { 'flag': 'server', 'desc': 'تشغيل خادم الويب لعرض الصور الملتقطة تفاعلياً' }
                ],
                'when_use': ['عند الحاجة لالتقاط لقطات الشاشة بسرعة فائقة وبطريقة منظمة وقابلة للبحث البرمجي'],
                'when_not': ['إذا كنت لا تملك متصفح Google Chrome أو Chromium مثبتاً على خادم الفحص'],
                'comparison': [
                    {'tool': 'gowitness', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['👁️ gowitness', '🖥️ Web GUI Interface'],
                'related_tools': ['aquatone', 'eyewitness'],
                'images': ['bb_screenshotting.png']
            },
            {
                'id': 'eyewitness',
                'name': 'EyeWitness',
                'icon': '👀',
                'difficulty': 'Easy',
                'speed': 'Medium',
                'tagline': 'Screenshots, Server Headers, and default credential checks',
                'badges': ['RECON-HELPER', 'DEFAULT-CREDS', 'PYTHON'],
                'stats': {'speed': 75, 'complexity': 40, 'accuracy': 95},
                'what_is': 'أداة ممتازة تأخذ لقطات شاشة للمواقع، وتستخلص معلومات السيرفر وتحذر عند وجود لوحات تحكم تستعمل بيانات مرور افتراضية.',
                'why': ['كشف تلقائي للوحات التحكم الشهيرة وبيانات مرورها الافتراضية', 'تنظيم ممتاز للتقرير مع إظهار تفاصيل الـ HTTP Headers', 'دعم تصوير خدمات الـ RDP والـ VNC أيضاً'],
                'flow_nodes': ['Target URLs', 'Identify Services (HTTP/RDP)', 'Screenshot & Header Extract', 'Report Generation'],
                'install': 'git clone https://github.com/RedSiege/EyeWitness.git',
                'cmd': 'python3 EyeWitness.py -f live_hosts.txt --web',
                'flags': [
                    { 'flag': '--web', 'desc': 'تفعيل الفحص وتصوير صفحات الويب' },
                    { 'flag': '-f', 'desc': 'ملف يحتوي على العناوين المستهدفة' }
                ],
                'when_use': ['أثناء الفحوصات الداخلية للشبكات أو النطاقات الكبيرة للبحث عن أجهزة إلكترونية ببيانات مرور افتراضية'],
                'when_not': ['عندما تريد أداة خفيفة الحجم ولا تستهلك مساحة تخزينية كبيرة'],
                'comparison': [
                    {'tool': 'eyewitness', 'speed': 'Medium', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['👀 eyewitness', '🔑 default_credentials_check'],
                'related_tools': ['aquatone', 'gowitness'],
                'images': ['bb_screenshotting.png']
            }
        ]
    },
    {
        'id': 'subdomain_takeover',
        'title': 'Subdomain Takeover',
        'icon': '🔗',
        'color_theme': '#00ff66',
        'tools': [
            {
                'id': 'subzy',
                'name': 'Subzy',
                'icon': '🔗',
                'difficulty': 'Easy',
                'speed': 'Very Fast',
                'tagline': 'Fast Subdomain Takeover Vulnerability Checker',
                'badges': ['TAKEOVER', 'FAST-CHECK', 'GO-BASED'],
                'stats': {'speed': 98, 'complexity': 20, 'accuracy': 90},
                'what_is': 'أداة سريعة تفحص أسماء النطاقات الفرعية وتكتشف إمكانية الاستيلاء عليها (Takeover) بسبب وجود توجيهات DNS لخدمات سحابية غير مهيأة.',
                'why': ['سرعة مذهلة في معالجة آلاف النطاقات', 'قاعدة بيانات مدمجة للمؤشرات والخدمات الشهيرة (GitHub, Heroku, Shopify)', 'سهلة الاستخدام وسطر أوامر بسيط'],
                'flow_nodes': ['Subdomains list', 'CNAME Resolution', 'Check Service Response Signatures', 'Vulnerable Alert'],
                'install': 'go install github.com/LukaSikic/subzy@latest',
                'cmd': 'subzy run --targets subdomains.txt',
                'flags': [
                    { 'flag': 'run', 'desc': 'بدء تشغيل عملية الفحص' },
                    { 'flag': '--targets', 'desc': 'تحديد ملف النطاقات الفرعية المستهدفة' }
                ],
                'when_use': ['بشكل روتيني بعد تجميع النطاقات الفرعية للبحث عن ثغرات الاستيلاء عالية الخطورة (Subdomain Takeover)'],
                'when_not': ['لا توجد حالة تمنع استخدامها فهي passive وآمنة تماماً'],
                'comparison': [
                    {'tool': 'subzy', 'speed': 'Very Fast', 'accuracy': 'High', 'passive': 'Yes', 'active': 'No'},
                    {'tool': 'nuclei_takeover', 'speed': 'Fast', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🛰️ subfinder', '🔗 subzy', '🚩 takeover_exploit'],
                'related_tools': ['nuclei_takeover'],
                'images': ['bb_subdomain_takeover.png']
            },
            {
                'id': 'nuclei_takeover',
                'name': 'Nuclei Takeover Templates',
                'icon': '☢️',
                'difficulty': 'Intermediate',
                'speed': 'Fast',
                'tagline': 'Accurate Service Signature Matching using Nuclei',
                'badges': ['NUCLEI-TEMPLATES', 'EXACT-MATCHING', 'COMMUNITY-UPDATED'],
                'stats': {'speed': 85, 'complexity': 50, 'accuracy': 98},
                'what_is': 'استخدام قالب فحص الثغرات Nuclei مع قوالب الاستيلاء (takeovers) الخاصة بالمجتمع للتحقق بدقة شديدة.',
                'why': ['دقة مرتفعة للغاية ونسبة إنذار خاطئ شبه معدومة', 'قوالب محدثة باستمرار من مجتمع الأمن السيبراني العالمي', 'دعم سيناريوهات فحص متطورة ومركبة'],
                'flow_nodes': ['Subdomains list', 'HTTP Request', 'Signature Regex Check', 'Vulnerability Matching'],
                'install': 'go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest',
                'cmd': 'nuclei -l subdomains.txt -t takeovers/',
                'flags': [
                    { 'flag': '-t takeovers/', 'desc': 'تشغيل مجلد قوالب الاستيلاء فقط' },
                    { 'flag': '-l', 'desc': 'ملف قائمة النطاقات الفرعية المراد فحصها' }
                ],
                'when_use': ['لتأكيد وجود ثغرة subdomain takeover بدون أخطاء واستبعاد النتائج المزيفة'],
                'when_not': ['عندما تريد فحصاً عاماً وسريعاً جداً بدون إرسال طلبات HTTP مخصصة'],
                'comparison': [
                    {'tool': 'nuclei takeover', 'speed': 'Fast', 'accuracy': 'Very High', 'passive': 'No', 'active': 'Yes'}
                ],
                'workflow_nodes': ['🔗 subdomain_list', '☢️ nuclei takeover', '🚩 verified_takeover'],
                'related_tools': ['subzy'],
                'images': ['bb_subdomain_takeover.png']
            }
        ]
    },
    {
        'id': 'wordlists',
        'title': 'Wordlists',
        'icon': '📖',
        'color_theme': '#ff3300',
        'tools': [
            {
                'id': 'seclists',
                'name': 'SecLists',
                'icon': '📖',
                'difficulty': 'Easy',
                'speed': 'N/A',
                'tagline': 'The Security Tester\'s Companion Wordlists',
                'badges': ['RESOURCE', 'DICTIONARY', 'MUST-HAVE'],
                'stats': {'speed': 100, 'complexity': 10, 'accuracy': 95},
                'what_is': 'المكتبة الأضخم والأهم لقوائم الكلمات المخصصة للأمن السيبراني، تحتوي على كلمات مرور، أسماء مستخدمين، مسارات ويب، وحقن ثغرات.',
                'why': ['القوائم مقسمة ومنظمة حسب نوع الفحص بشكل احترافي', 'توفير الوقت في كتابة قوائم كلمات من الصفر', 'تحديثات مستمرة من الباحثين الأمنيين'],
                'flow_nodes': ['Determine Scan Type', 'Select Wordlist from SecLists', 'Load into Fuzzer', 'Bruteforce / Exploit'],
                'install': 'git clone https://github.com/danielmiessler/SecLists.git',
                'cmd': 'ls -l /usr/share/seclists/',
                'flags': [
                    { 'flag': 'No flags', 'desc': 'مجلد يحتوي على ملفات نصية فقط' }
                ],
                'when_use': ['في جميع مراحل فحص وتخمين الثغرات (Directory search, Password spraying, XSS fuzzing)'],
                'when_not': ['لا توجد حالة، هي ركن أساسي لكل مختبر اختراق'],
                'comparison': [
                    {'tool': 'seclists', 'speed': 'N/A', 'accuracy': 'Very High', 'passive': 'N/A', 'active': 'N/A'},
                    {'tool': 'payloadsallthethings', 'speed': 'N/A', 'accuracy': 'Very High', 'passive': 'N/A', 'active': 'N/A'}
                ],
                'workflow_nodes': ['📖 seclists', '⚡ ffuf', '📂 sensitive_files'],
                'related_tools': ['payloadsallthethings', 'onelistforall'],
                'images': ['bb_wordlists.png']
            },
            {
                'id': 'payloadsallthethings',
                'name': 'PayloadsAllTheThings',
                'icon': '💡',
                'difficulty': 'Easy',
                'speed': 'N/A',
                'tagline': 'Repository of useful payloads and bypasses',
                'badges': ['RESOURCE', 'PAYLOADS', 'BYPASSES'],
                'stats': {'speed': 100, 'complexity': 15, 'accuracy': 95},
                'what_is': 'دليل ومرجع ضخم يحتوي على نصوص برمجية هجومية (Payloads) وحيل تخطي الحمايات لكل أنواع ثغرات تطبيقات الويب.',
                'why': ['أفضل مرجع لصياغة جمل الاستغلال (Exploits) يدوياً', 'حلول تخطي جدار الحماية (WAF Bypasses) مفصلة', 'أمثلة أكواد عملية لجميع الثغرات الشائعة'],
                'flow_nodes': ['Find Web Vuln', 'Lookup Vuln type', 'Select Payload', 'Modify & Inject'],
                'install': 'git clone https://github.com/swisskyrepo/PayloadsAllTheThings.git',
                'cmd': 'ls -l PayloadsAllTheThings/',
                'flags': [
                    { 'flag': 'No flags', 'desc': 'مستودع مستندات وأكواد نصية' }
                ],
                'when_use': ['عندما تعثر على ثغرة وتريد صياغة Payload ناجح لتخطي الفلاتر والحمايات وإثبات الثغرة (PoC)'],
                'when_not': ['لا توجد حالة'],
                'comparison': [
                    {'tool': 'payloadsallthethings', 'speed': 'N/A', 'accuracy': 'Very High', 'passive': 'N/A', 'active': 'N/A'}
                ],
                'workflow_nodes': ['💡 payloadsallthethings', '💉 exploit_crafting', '👑 remote_code_execution'],
                'related_tools': ['seclists', 'onelistforall'],
                'images': ['bb_wordlists.png']
            },
            {
                'id': 'onelistforall',
                'name': 'OneListForAll',
                'icon': '📜',
                'difficulty': 'Easy',
                'speed': 'N/A',
                'tagline': 'A compiled and optimized wordlist for web fuzzing',
                'badges': ['UNIFIED', 'OPTIMIZED', 'FUZZING'],
                'stats': {'speed': 100, 'complexity': 10, 'accuracy': 90},
                'what_is': 'قائمة كلمات موحدة ومحسنة تجمع أفضل وأكثر مسارات الويب الحساسة تكراراً لحل مشكلة تشتت قوائم الكلمات.',
                'why': ['تجميع ذكي يقلل الوقت عبر حذف التكرار والمصطلحات النادرة', 'قائمة واحدة للفحص السريعة والفعال', 'أداء عالي وسرعة فحص ملحوظة'],
                'flow_nodes': ['Fuzzing Setup', 'Load OneListForAll', 'Quick Web Scanning', 'Key Findings'],
                'install': 'git clone https://github.com/six2dez/OneListForAll.git',
                'cmd': 'ls -l OneListForAll/',
                'flags': [
                    { 'flag': 'No flags', 'desc': 'ملف نصي موحد للفحص' }
                ],
                'when_use': ['في الفحوصات الاستطلاعية السريعة لمسارات الويب الحساسة'],
                'when_not': ['عندما تريد فحصاً عميقاً جداً وتفصيلياً بنوع معين من المسارات'],
                'comparison': [
                    {'tool': 'onelistforall', 'speed': 'N/A', 'accuracy': 'High', 'passive': 'N/A', 'active': 'N/A'}
                ],
                'workflow_nodes': ['📜 onelistforall', '🦀 feroxbuster', '🔥 discovery'],
                'related_tools': ['seclists', 'payloadsallthethings'],
                'images': ['bb_wordlists.png']
            }
        ]
    }
]

# 1. Update views.py context dict
print("1. Updating views.py context data...")
with open(views_path, 'r', encoding='utf-8') as f:
    views_code = f.read()

import pprint
formatted_bb_explorer = pprint.pformat(bugbounty_data, indent=8)

# Check if 'bugbounty_explorer' already exists in views.py
if "'bugbounty_explorer'" in views_code:
    views_code = re.sub(r"\s*'bugbounty_explorer':\s*\[.*?\n\s*\],?\n", "\n", views_code, flags=re.DOTALL)

# Insert 'bugbounty_explorer' into views.py get_portfolio_context dict
target_pattern = r"({\s*'name': 'Abdo Ramdan',.*?'date': 'Continuous'\s*\}\s*,\s*\])"
match = re.search(target_pattern, views_code, re.DOTALL)
if match:
    replacement = match.group(1) + ",\n        'bugbounty_explorer': " + formatted_bb_explorer
    views_code = views_code.replace(match.group(1), replacement)
    with open(views_path, 'w', encoding='utf-8') as f:
        f.write(views_code)
    print("[Success] views.py updated successfully.")
else:
    print("[Error] Could not find the end of the context dict to inject bugbounty_explorer.")


# 2. Build Bug Bounty HTML
print("2. Generating Bug Bounty HTML components...")

folder_sidebar_html = ""
for folder in bugbounty_data:
    folder_sidebar_html += f"""
                <div class="bb-folder explorer-folder" id="bb-ef-{folder['id']}" onclick="openBBFolder('{folder['id']}')">
                  <span class="f-icon">{folder['icon']}</span>
                  <span class="f-title">{folder['title']}</span>
                </div>"""

tools_list_html = ""
for folder in bugbounty_data:
    tools_list_html += f"""
              <div class="bb-tools-list tools-list" id="bb-tools-{folder['id']}" style="display: none;">"""
    for tool in folder['tools']:
        tools_list_html += f"""
                <div class="bb-tool-item tool-list-item" id="bb-ti-{tool['id']}" onclick="openBBTool('{tool['id']}')">
                  <span class="t-icon">{tool['icon']}</span>
                  <div class="t-info">
                    <span class="t-name">{tool['name']}</span>
                    <span class="t-meta">{tool['speed']} | {tool['difficulty']}</span>
                  </div>
                </div>"""
    tools_list_html += "\n              </div>"

tool_viewer_html = ""
for folder in bugbounty_data:
    for tool in folder['tools']:
        badges_html = ""
        for b in tool['badges']:
            badges_html += f'\n                          <span class="cyber-badge">{b}</span>'
            
        stats_html = f"""
                      <div class="stat-row">
                        <div class="stat-label"><span>Speed</span><span>{tool['stats']['speed']}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {tool['stats']['speed']}%;"></div></div>
                      </div>
                      <div class="stat-row">
                        <div class="stat-label"><span>Complexity</span><span>{tool['stats']['complexity']}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {tool['stats']['complexity']}%;"></div></div>
                      </div>
                      <div class="stat-row">
                        <div class="stat-label"><span>Accuracy</span><span>{tool['stats']['accuracy']}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {tool['stats']['accuracy']}%;"></div></div>
                      </div>"""
                      
        why_html = ""
        for w in tool['why']:
            why_html += f'\n                          <li>✔ {w}</li>'
            
        when_use_html = ""
        for w in tool['when_use']:
            when_use_html += f'\n                            <li>✔ {w}</li>'
            
        when_not_html = ""
        for w in tool['when_not']:
            when_not_html += f'\n                            <li>❌ {w}</li>'
            
        install_html = ""
        if tool['install'] and tool['install'] != 'N/A':
            install_html = f"""
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔵 Installation</h3></div>
                      <div class="cmd-ui-box">
                        <div class="cmd-ui-top">{tool['install']}</div>
                        <div class="cmd-ui-bottom">
                          <button class="cmd-btn" onclick="copyText('{tool['install']}', this)">📋 Copy</button>
                        </div>
                      </div>
                    </div>"""
                    
        run_demo_btn = ""
        if tool['cmd'] and 'GUI' not in tool['cmd'] and 'ls -l' not in tool['cmd']:
            run_demo_btn = f'<button class="cmd-btn run-btn" onclick="simulateTerminal(\'{tool["cmd"]}\')">▶ Run Demo</button>'

        cmd_html = f"""
                    <div class="cyber-card">
                      <div class="card-header"><h3>Core Command</h3></div>
                      <div class="cmd-ui-box">
                        <div class="cmd-ui-top">{tool['cmd']}</div>
                        <div class="cmd-ui-bottom">
                          <button class="cmd-btn" onclick="copyText('{tool['cmd']}', this)">📋 Copy</button>
                          {run_demo_btn}
                        </div>
                      </div>
                    </div>"""
                    
        flags_html = ""
        if tool['flags'] and tool['flags'][0]['flag'] != 'No flags':
            flags_html = """
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔴 Flags & Parameters</h3></div>
                      <table class="interactive-table">
                        <thead><tr><th>Flag</th><th>Description</th></tr></thead>
                        <tbody>"""
            for f in tool['flags']:
                flags_html += f"\n                          <tr><td>{f['flag']}</td><td>{f['desc']}</td></tr>"
            flags_html += """
                        </tbody>
                      </table>
                    </div>"""
                    
        flow_nodes_html = ""
        for node in tool['flow_nodes']:
            flow_nodes_html += f'\n                          <div class="wf-node">{node}</div>'
            if node != tool['flow_nodes'][-1]:
                flow_nodes_html += '\n                          <div class="wf-arrow">↓</div>'
                
        wnodes_html = ""
        for wnode in tool['workflow_nodes']:
            wnodes_html += f'\n                          <div class="wf-node" style="border-color: #ffb020; box-shadow: 0 0 10px rgba(255,176,32,0.3);">{wnode}</div>'
            if wnode != tool['workflow_nodes'][-1]:
                wnodes_html += '\n                          <div class="wf-arrow" style="transform: rotate(-90deg);">↓</div>'
                
        comparison_html = ""
        if tool['comparison'] and tool['comparison'][0]['speed'] != 'N/A':
            comparison_html = """
                    <div class="cyber-card">
                      <div class="card-header"><h3>🟢 Comparison Chart</h3></div>
                      <table class="interactive-table">
                        <thead>
                          <tr><th>Tool</th><th>Speed</th><th>Accuracy</th><th>Passive</th><th>Active</th></tr>
                        </thead>
                        <tbody>"""
            for cmp in tool['comparison']:
                comparison_html += f"""
                          <tr>
                            <td>{cmp['tool']}</td>
                            <td>{cmp['speed']}</td>
                            <td>{cmp['accuracy']}</td>
                            <td>{cmp['passive']}</td>
                            <td>{cmp['active']}</td>
                          </tr>"""
            comparison_html += """
                        </tbody>
                      </table>
                    </div>"""
                    
        related_html = ""
        for rel in tool['related_tools']:
            related_html += f"""
                          <div class="related-tool-pill" onclick="openBBToolDirect('{rel}')">🚀 {rel}</div>"""
                          
        imgs_html = ""
        for img in tool['images']:
            imgs_html += f'\n                        <img src="/static/main/images/tools/{img}" class="tool-graphic-img" alt="{tool["id"]} graphic" />'
            
        graphic_card_html = f"""
                    <div class="cyber-card tool-graphic-card">
                      <div class="tool-image-gallery">{imgs_html}
                      </div>
                    </div>"""

        tool_viewer_html += f"""
                <div class="bb-tool-content-view tool-content-view" id="bb-content-{tool['id']}" style="display: none; --tool-color: {folder['color_theme']};">
                  
                  <!-- HERO SECTION -->
                  <div class="cyber-hero">
                    <div class="hero-left">
                      <h2 class="hero-title"><span class="hero-icon">{tool['icon']}</span> {tool['name']}</h2>
                      <p class="hero-tagline">{tool['tagline']}</p>
                      <div class="hero-badges">{badges_html}
                      </div>
                    </div>
                    <div class="hero-right">{stats_html}
                    </div>
                  </div>

                  <!-- TABS NAVIGATION -->
                  <div class="cyber-tabs">
                    <button class="cyber-tab-btn active" onclick="switchBBCyberTab(this, 'bb-tab-overview-{tool['id']}')">Overview</button>
                    <button class="cyber-tab-btn" onclick="switchBBCyberTab(this, 'bb-tab-commands-{tool['id']}')">Commands</button>
                    <button class="cyber-tab-btn" onclick="switchBBCyberTab(this, 'bb-tab-workflow-{tool['id']}')">Workflow</button>
                    <button class="cyber-tab-btn" onclick="switchBBCyberTab(this, 'bb-tab-comparisons-{tool['id']}')">Comparisons</button>
                  </div>

                  <!-- TAB: OVERVIEW -->
                  <div class="tab-pane active" id="bb-tab-overview-{tool['id']}">{graphic_card_html}
                    <div class="cyber-card">
                      <div class="card-header"><h3>⚫ What is {tool['name']}?</h3></div>
                      <p>{tool['what_is']}</p>
                    </div>

                    <div class="cyber-card">
                      <div class="card-header"><h3>🟣 Why Use It?</h3></div>
                      <ul class="t-check-list">{why_html}
                      </ul>
                    </div>

                    <div class="use-box-grid">
                      <div class="use-card perfect-for">
                        <h4>✅ Perfect For:</h4>
                        <ul>{when_use_html}
                        </ul>
                      </div>
                      <div class="use-card avoid-when">
                        <h4>❌ Avoid When:</h4>
                        <ul>{when_not_html}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- TAB: COMMANDS -->
                  <div class="tab-pane" id="bb-tab-commands-{tool['id']}">{install_html}{cmd_html}{flags_html}
                  </div>

                  <!-- TAB: WORKFLOW -->
                  <div class="tab-pane" id="bb-tab-workflow-{tool['id']}">
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔵 Execution Flow</h3></div>
                      <div class="workflow-map">{flow_nodes_html}
                      </div>
                    </div>

                    <div class="cyber-card">
                      <div class="card-header"><h3>🟡 Real Attack Pipeline</h3></div>
                      <div class="workflow-map" style="flex-direction: row; flex-wrap: wrap; justify-content: center;">{wnodes_html}
                      </div>
                    </div>
                  </div>

                  <!-- TAB: COMPARISONS -->
                  <div class="tab-pane" id="bb-tab-comparisons-{tool['id']}">{comparison_html}
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔗 Related Tools</h3></div>
                      <div class="related-tools-bar">{related_html}
                      </div>
                    </div>
                  </div>

                </div>"""

# Assemble full pane-bugbounty HTML
pane_bugbounty_html = f"""        <!-- 8. BUG BOUNTY VIEW (3-Pane Explorer) -->
        <div class="workspace-pane" id="pane-bugbounty">
          <div class="explorer-layout">
            
            <!-- Pane 1: Sidebar (Folders) -->
            <div class="explorer-sidebar">
              <h3 class="explorer-title">EXPLORER</h3>
              <div class="explorer-folders">{folder_sidebar_html}
              </div>
            </div>

            <!-- Pane 2: Tools Panel -->
            <div class="explorer-tools-panel">
              <h3 class="explorer-title">// Tools List</h3>
              
              <div id="bb-emptyToolsState" class="empty-state">
                <span class="empty-icon">📁</span>
                <p>Select a folder to view tools.</p>
              </div>{tools_list_html}
            </div>

            <!-- Pane 3: Dynamic Content (Viewer) -->
            <div class="explorer-content-panel">
              <div id="bb-emptyContentState" class="empty-state">
                <span class="empty-icon">🪲</span>
                <p>Select a tool to view its deep analysis.</p>
              </div>{tool_viewer_html}
            </div>

          </div>
        </div>"""

# 3. Read home.html
print("3. Modifying home.html...")
with open(html_path, 'r', encoding='utf-8') as f:
    html_code = f.read()

# A. Add tab link
print("A. Adding tab link button...")
tab_link_target = """        <button class="tab-link" onclick="switchTab('academy')" data-tab="academy">
          <span class="tab-icon">🗂️</span> Academy
        </button>"""
new_tab_link = tab_link_target + """
        <button class="tab-link" onclick="switchTab('bugbounty')" data-tab="bugbounty">
          <span class="tab-icon">🪲</span> Bug Bounty
        </button>"""

if "switchTab('bugbounty')" not in html_code:
    html_code = html_code.replace(tab_link_target, new_tab_link)
    print("Tab link button injected.")
else:
    print("Tab link button already exists. Skipping.")

# B. Inject pane-bugbounty
if 'id="pane-bugbounty"' in html_code:
    print("Removing existing pane-bugbounty from template first...")
    html_code = re.sub(r'\s*<!-- 8\. BUG BOUNTY VIEW.*?<!-- Footer -->', '\n\n  <!-- Footer -->', html_code, flags=re.DOTALL)

target_footer_close = """          </div>
        </div>
      </div>

  <!-- Footer -->"""

injected_close = """          </div>
        </div>
        
""" + pane_bugbounty_html + """
      </div>

  <!-- Footer -->"""

html_code = html_code.replace(target_footer_close, injected_close)
print("pane-bugbounty injected.")

# C. Inject JS functions before </script>
print("C. Injecting Javascript controllers...")

# Remove existing functions if any
html_code = html_code.replace("""    // ── Bug Bounty Explorer Navigation ──
    function openBBFolder(folderId) {
      document.querySelectorAll('.bb-folder').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('bb-ef-' + folderId);
      if (activeFolder) activeFolder.classList.add('active');
      document.getElementById('bb-emptyToolsState').style.display = 'none';
      document.querySelectorAll('.bb-tools-list').forEach(el => el.style.display = 'none');
      const activeTools = document.getElementById('bb-tools-' + folderId);
      if (activeTools) activeTools.style.display = 'flex';
      document.querySelectorAll('.bb-tool-content-view').forEach(el => el.style.display = 'none');
      document.getElementById('bb-emptyContentState').style.display = 'flex';
      document.querySelectorAll('.bb-tool-item').forEach(el => el.classList.remove('active'));
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Bug Bounty explorer navigated to: /usr/share/bugbounty/${folderId}`, 'text-neon-cyan');
      }
    }
    function openBBTool(toolId) {
      document.querySelectorAll('.bb-tool-item').forEach(el => el.classList.remove('active'));
      const activeTool = document.getElementById('bb-ti-' + toolId);
      if (activeTool) activeTool.classList.add('active');
      document.getElementById('bb-emptyContentState').style.display = 'none';
      document.querySelectorAll('.bb-tool-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('bb-content-' + toolId);
      if (activeContent) activeContent.style.display = 'block';
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Displaying manual page for: ${toolId}`, 'text-neon-cyan');
      }
    }
    function openBBToolDirect(toolId) {
      const toolElement = document.getElementById('bb-ti-' + toolId);
      if (toolElement) {
        const parentList = toolElement.closest('.bb-tools-list');
        if (parentList) {
          const folderId = parentList.id.replace('bb-tools-', '');
          openBBFolder(folderId);
          setTimeout(() => {
            openBBTool(toolId);
          }, 100);
        }
      } else {
        if (terminalInitialized) printLineToTerminal(`\\n[error] Tool ${toolId} not found in Bug Bounty path.`, 'text-neon-red');
      }
    }
    function switchBBCyberTab(btn, tabId) {
      const toolView = btn.closest('.bb-tool-content-view');
      toolView.querySelectorAll('.cyber-tab-btn').forEach(b => b.classList.remove('active'));
      toolView.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = toolView.querySelector('#' + tabId);
      if (targetPane) targetPane.classList.add('active');
    }""", "")

js_functions = """
    // ── Bug Bounty Explorer Navigation ──
    function openBBFolder(folderId) {
      document.querySelectorAll('.bb-folder').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('bb-ef-' + folderId);
      if (activeFolder) activeFolder.classList.add('active');
      document.getElementById('bb-emptyToolsState').style.display = 'none';
      document.querySelectorAll('.bb-tools-list').forEach(el => el.style.display = 'none');
      const activeTools = document.getElementById('bb-tools-' + folderId);
      if (activeTools) activeTools.style.display = 'flex';
      document.querySelectorAll('.bb-tool-content-view').forEach(el => el.style.display = 'none');
      document.getElementById('bb-emptyContentState').style.display = 'flex';
      document.querySelectorAll('.bb-tool-item').forEach(el => el.classList.remove('active'));
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Bug Bounty explorer navigated to: /usr/share/bugbounty/${folderId}`, 'text-neon-cyan');
      }
    }
    function openBBTool(toolId) {
      document.querySelectorAll('.bb-tool-item').forEach(el => el.classList.remove('active'));
      const activeTool = document.getElementById('bb-ti-' + toolId);
      if (activeTool) activeTool.classList.add('active');
      document.getElementById('bb-emptyContentState').style.display = 'none';
      document.querySelectorAll('.bb-tool-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('bb-content-' + toolId);
      if (activeContent) activeContent.style.display = 'block';
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Displaying manual page for: ${toolId}`, 'text-neon-cyan');
      }
    }
    function openBBToolDirect(toolId) {
      const toolElement = document.getElementById('bb-ti-' + toolId);
      if (toolElement) {
        const parentList = toolElement.closest('.bb-tools-list');
        if (parentList) {
          const folderId = parentList.id.replace('bb-tools-', '');
          openBBFolder(folderId);
          setTimeout(() => {
            openBBTool(toolId);
          }, 100);
        }
      } else {
        if (terminalInitialized) printLineToTerminal(`\\n[error] Tool ${toolId} not found in Bug Bounty path.`, 'text-neon-red');
      }
    }
    function switchBBCyberTab(btn, tabId) {
      const toolView = btn.closest('.bb-tool-content-view');
      toolView.querySelectorAll('.cyber-tab-btn').forEach(b => b.classList.remove('active'));
      toolView.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = toolView.querySelector('#' + tabId);
      if (targetPane) targetPane.classList.add('active');
    }
"""

if "function openBBFolder" not in html_code:
    html_code = html_code.replace("  </script>", js_functions + "  </script>")
    print("JS controllers injected.")
else:
    print("JS controllers already exist. Skipping.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_code)
print("[Success] home.html modified.")

print("All modifications completed successfully!")
