import os
import re

html_path = r"D:\abdo_portfolio\main\templates\main\home.html"

# Define the Methodology phases metadata
phases = [
    {
        'id': 'p0',
        'title': 'Phase 0: Environment',
        'arabic': 'المرحلة 0 — تجهيز البيئة',
        'icon': '💻'
    },
    {
        'id': 'p1',
        'title': 'Phase 1: Scope',
        'arabic': 'المرحلة 1 — فهم الـ Scope',
        'icon': '🎯'
    },
    {
        'id': 'p2',
        'title': 'Phase 2: Passive Recon',
        'arabic': 'المرحلة 2 — الاستطلاع السلبي',
        'icon': '🌍'
    },
    {
        'id': 'p3',
        'title': 'Phase 3: Port Scanning',
        'arabic': 'المرحلة 3 — فحص المنافذ',
        'icon': '📡'
    },
    {
        'id': 'p4',
        'title': 'Phase 4: Directory Discovery',
        'arabic': 'المرحلة 4 — فحص الملفات',
        'icon': '📂'
    },
    {
        'id': 'p5',
        'title': 'Phase 5: Crawling',
        'arabic': 'المرحلة 5 — الزحف والمسارات',
        'icon': '🕷️'
    },
    {
        'id': 'p6',
        'title': 'Phase 6: Historical URLs',
        'arabic': 'المرحلة 6 — روابط الأرشيف',
        'icon': '🕰️'
    },
    {
        'id': 'p7',
        'title': 'Phase 7: JavaScript Recon',
        'arabic': 'المرحلة 7 — تحليل الجافا سكربت',
        'icon': '📜'
    },
    {
        'id': 'p8',
        'title': 'Phase 8: Params Discovery',
        'arabic': 'المرحلة 8 — كشف المعاملات',
        'icon': '🎛️'
    },
    {
        'id': 'p9',
        'title': 'Phase 9: Vuln Hunting',
        'arabic': 'المرحلة 9 — اصطياد الثغرات',
        'icon': '🔥'
    },
    {
        'id': 'p10',
        'title': 'Phase 10: Automation',
        'arabic': 'المرحلة 10 — الأتمتة والـ Pipelines',
        'icon': '⚙️'
    },
    {
        'id': 'p11',
        'title': 'Phase 11: Reporting',
        'arabic': 'المرحلة 11 — كتابة التقرير',
        'icon': '📝'
    },
    {
        'id': 'p12',
        'title': 'Resources & Skills',
        'arabic': 'المصادر والمهارات الأساسية',
        'icon': '📚'
    }
]

# Generate Sidebar HTML
sidebar_html = ""
for p in phases:
    active_class = "active" if p['id'] == 'p0' else ""
    sidebar_html += f"""
                <div class="meth-phase explorer-folder {active_class}" id="meth-ef-{p['id']}" onclick="openMethPhase('{p['id']}')">
                  <span class="f-icon">{p['icon']}</span>
                  <span class="f-title">{p['title']}</span>
                </div>"""

# Generate Content HTML
content_html = ""

# --- PHASE 0 ---
content_html += """
              <!-- PHASE 0: Environment -->
              <div class="meth-content-view tool-content-view" id="meth-content-p0" style="display: block; --tool-color: #00e5ff;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">💻</span> Phase 0: Environment Setup</h2>
                    <p class="hero-tagline">المرحلة 0 — تجهيز بيئة العمل واختيار نظام التشغيل المناسب</p>
                  </div>
                </div>
                
                <div class="cyber-card">
                  <div class="card-header"><h3>🖥️ Operating Systems</h3></div>
                  <p>قبل البدء في أي فحص أمني، يجب إعداد نظام تشغيل مجهز بالأدوات المناسبة. الخيارات الأكثر شيوعاً:</p>
                  <ul class="t-check-list">
                    <li>✔ <strong>Kali Linux</strong>: التوزيعة الأشهر والأكثر دعماً من مجتمع الأمن السيبراني.</li>
                    <li>✔ <strong>Parrot Security OS</strong>: توزيعة خفيفة وممتازة تركز على التصفح الآمن وحماية الهوية.</li>
                    <li>✔ <strong>Ubuntu / Debian</strong>: إعداد نظام مخصص عبر تثبيت الأدوات التي تحتاجها يدوياً لضمان خفته.</li>
                  </ul>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚙️ Essential Tools Checklist</h3></div>
                  <table class="interactive-table">
                    <thead><tr><th>الأداة</th><th>الاستخدام الرئيسي</th></tr></thead>
                    <tbody>
                      <tr><td>Burp Suite Pro / Community</td><td>اعتراض وتحليل طلبات الويب (HTTP Proxy) وهي الأداة الأهم على الإطلاق.</td></tr>
                      <tr><td>Nmap</td><td>فحص المنافذ والخدمات المفتوحة والشبكات.</td></tr>
                      <tr><td>subfinder / Amass / Assetfinder</td><td>جمع النطاقات الفرعية (Subdomains).</td></tr>
                      <tr><td>httpx</td><td>التحقق من المواقع النشطة (Alive Check).</td></tr>
                      <tr><td>katana / Hakrawler</td><td>الزحف واستخراج الروابط (Crawling).</td></tr>
                      <tr><td>ffuf / feroxbuster / dirsearch</td><td>تخمين المجلدات والملفات الحساسة (Fuzzing).</td></tr>
                      <tr><td>gau / waymore</td><td>سحب الروابط التاريخية والأرشيفية.</td></tr>
                      <tr><td>sqlmap / dalfox</td><td>فحص واستغلال ثغرات حقن قواعد البيانات والـ XSS تلقائياً.</td></tr>
                      <tr><td>arjun / SecretFinder</td><td>كشف المعاملات المخفية واستخراج المفاتيح والرموز السرية من ملفات الـ JS.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>"""

# --- PHASE 1 ---
content_html += """
              <!-- PHASE 1: Scope -->
              <div class="meth-content-view tool-content-view" id="meth-content-p1" style="display: none; --tool-color: #9b59ff;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🎯</span> Phase 1: Scope Understanding</h2>
                    <p class="hero-tagline">المرحلة 1 — فهم نطاق العمل والسياسات الخاصة بالهدف</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📋 Rules of Engagement (قواعد العمل)</h3></div>
                  <p>قبل إرسال أي حزم بيانات للهدف، يجب مراجعة وثيقة الـ Scope الخاص بالبرنامج أو الفحص الأمني وفهمه بالكامل لتفادي المشاكل القانونية.</p>
                </div>

                <div class="use-box-grid">
                  <div class="use-card perfect-for">
                    <h4>✅ الأشياء المسموحة (In-Scope):</h4>
                    <ul>
                      <li>✔ النطاقات المحددة صراحة (e.g. *.target.com).</li>
                      <li>✔ واجهات برمجة التطبيقات (APIs) التابعة للهدف.</li>
                      <li>✔ تطبيقات الهاتف المحمول (Android/iOS) المتاحة للفحص.</li>
                    </ul>
                  </div>
                  <div class="use-card avoid-when">
                    <h4>❌ الأشياء الممنوعة (Out-of-Scope):</h4>
                    <ul>
                      <li>❌ هجمات حجب الخدمة (DDoS/DoS) التي تضر بالخدمة.</li>
                      <li>❌ هجمات الهندسة الاجتماعية ضد موظفي الشركة (Phishing).</li>
                      <li>❌ استهداف خوادم شركات أخرى مستضافة (e.g. AWS/Cloudflare) بشكل مباشر.</li>
                    </ul>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>💡 أسئلة يجب الإجابة عنها قبل البدء</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>Rate Limit</strong>: هل هناك حد أقصى للطلبات المسموح بها في الثانية لتجنب إغراق السيرفر؟</li>
                    <li>✔ <strong>Exclusions</strong>: هل هناك مسارات معينة أو خوادم محظور فحصها؟</li>
                    <li>✔ <strong>Testing environment</strong>: هل الفحص يتم على السيرفر الرئيسي (Production) أم بيئة اختبار منفصلة (Staging)؟</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 2 ---
content_html += """
              <!-- PHASE 2: Passive Recon -->
              <div class="meth-content-view tool-content-view" id="meth-content-p2" style="display: none; --tool-color: #ffb020;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🌍</span> Phase 2: Passive Recon</h2>
                    <p class="hero-tagline">المرحلة 2 — الاستطلاع السلبي وجمع البيانات دون التفاعل المباشر</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🌐 2.1 Subdomain Enumeration</h3></div>
                  <p>جمع النطاقات الفرعية لتوسيع مساحة الهجوم واكتشاف خوادم منسية أو غير محمية.</p>
                  <table class="interactive-table">
                    <thead><tr><th>الأداة</th><th>الوظيفة والسرعة</th></tr></thead>
                    <tbody>
                      <tr><td>subfinder</td><td>سريع جداً، يعتمد على محركات الـ OSINT والـ APIs بشكل كامل.</td></tr>
                      <tr><td>amass</td><td>فحص عميق، يبني قاعدة بيانات مرئية ويقوم بعمل DNS Bruteforce ذكي.</td></tr>
                      <tr><td>Assetfinder</td><td>أداة بسيطة وسريعة للغاية تعتمد على crt.sh ومصادر محدودة.</td></tr>
                      <tr><td>crt.sh</td><td>موقع عام للبحث في سجلات شهادات الأمان (SSL/TLS Certificates).</td></tr>
                      <tr><td>Chaos Client</td><td>تحميل بيانات Recon جاهزة ومحدثة من منصة ProjectDiscovery.</td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🛠️ Commands & Pipeline</h3></div>
                  
                  <h4>1) تشغيل Subfinder</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">subfinder -d target.com -all -recursive</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('subfinder -d target.com -all -recursive', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('subfinder -d target.com -all -recursive')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>2) تشغيل Amass (Passive Mode)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">amass enum -passive -d target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('amass enum -passive -d target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('amass enum -passive -d target.com')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>3) دمج وتصفية النتائج</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">cat *.txt | sort -u > allsubs.txt</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('cat *.txt | sort -u > allsubs.txt', this)">📋 Copy</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📡 2.2 Alive Domains Check</h3></div>
                  <p>التحقق من النطاقات التي تعمل بالفعل وتستجيب لطلبات HTTP/HTTPS لتجنب تضييع الوقت على نطاقات مغلقة.</p>
                  
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">httpx -l allsubs.txt -title -tech-detect -status-code</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('httpx -l allsubs.txt -title -tech-detect -status-code', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('httpx -l allsubs.txt -title -tech-detect -status-code')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚙️ 2.3 Technology Profiling</h3></div>
                  <p>تحديد اللغات، وإطارات العمل (Frameworks)، والخوادم المستخدمة في الهدف لتجهيز ثغرات متوافقة.</p>
                  <ul class="t-check-list">
                    <li>✔ <strong>WhatWeb</strong>: أداة سطر أوامر ممتازة للتعرف على محتوى وتكنولوجيات الويب.</li>
                    <li>✔ <strong>Wappalyzer</strong>: إضافة متصفح شهيرة تُظهر فوراً لغات وتقنيات الموقع.</li>
                  </ul>
                  
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">whatweb https://target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('whatweb https://target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('whatweb https://target.com')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>
              </div>"""

# --- PHASE 3 ---
content_html += """
              <!-- PHASE 3: Port Scanning -->
              <div class="meth-content-view tool-content-view" id="meth-content-p3" style="display: none; --tool-color: #ff0055;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">📡</span> Phase 3: Port Scanning</h2>
                    <p class="hero-tagline">المرحلة 3 — فحص المنافذ والخدمات المفتوحة على السيرفر</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🛡️ Nmap — The Network King</h3></div>
                  <p>نبدأ هنا بلمس خوادم الهدف بشكل مباشر لمعرفة المنافذ المفتوحة والخدمات التي تعمل عليها.</p>
                  <table class="interactive-table">
                    <thead><tr><th>نوع الفحص</th><th>الاستخدام والغرض</th></tr></thead>
                    <tbody>
                      <tr><td>SYN Scan (-sS)</td><td>فحص سريع ومتخفّي نسبياً لا يكمل مصافحة TCP كاملة (Half-Open).</td></tr>
                      <tr><td>Service Version (-sV)</td><td>استعلام دقيق لمعرفة إصدارات البرامج والخدمات على المنافذ.</td></tr>
                      <tr><td>Script Scan (-sC)</td><td>تشغيل نصوص Nmap البرمجية الجاهزة (NSE Scripts) لكشف ثغرات شائعة.</td></tr>
                      <tr><td>OS Detection (-O)</td><td>تحليل استجابات السيرفر لمحاولة تخمين نظام التشغيل بدقة.</td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🛠️ Scan Commands</h3></div>
                  
                  <h4>Basic Scan (فحص سريع)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">nmap -sV target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('nmap -sV target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('nmap -sV target.com')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>Professional Scan (فحص احترافي شامل)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">nmap -sC -sV -Pn -T4 target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('nmap -sC -sV -Pn -T4 target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('nmap -sC -sV -Pn -T4 target.com')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>Full Port Scan (فحص جميع المنافذ الـ 65,535)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">nmap -p- -T4 target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('nmap -p- -T4 target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('nmap -p- -T4 target.com')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🔍 Common Vulnerabilities Checked by Nmap</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>FTP Anonymous Login</strong>: دخول مجلدات الـ FTP المفتوحة للعامة دون كلمة مرور.</li>
                    <li>✔ <strong>SMB Misconfigurations</strong>: ثغرات مشاركة الملفات ونظام التوثيق (e.g. EternalBlue).</li>
                    <li>✔ <strong>SSL/TLS Vulnerabilities</strong>: تشفير ضعيف أو استخدام بروتوكولات قديمة ومعرضة للاختراق.</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 4 ---
content_html += """
              <!-- PHASE 4: Directory Discovery -->
              <div class="meth-content-view tool-content-view" id="meth-content-p4" style="display: none; --tool-color: #00ff66;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">📂</span> Phase 4: Directory & File Discovery</h2>
                    <p class="hero-tagline">المرحلة 4 — تخمين المجلدات والملفات الحساسة والمخفية</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📂 Web Directory Bruteforcing</h3></div>
                  <p>تخمين المسارات المخفية على السيرفر والتي لا تظهر في تصفح الموقع العادي للوصول إلى لوحات تحكم أو ملفات حساسة.</p>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🛠️ ffuf Commands</h3></div>
                  
                  <h4>Basic Fuzzing (تخمين أساسي)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">ffuf -u https://target.com/FUZZ -w wordlist.txt</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('ffuf -u https://target.com/FUZZ -w wordlist.txt', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('ffuf -u https://target.com/FUZZ -w wordlist.txt')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>Filter 404 Pages (إخفاء الصفحات غير الموجودة)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">ffuf -u https://target.com/FUZZ -w wordlist.txt -fc 404</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('ffuf -u https://target.com/FUZZ -w wordlist.txt -fc 404', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('ffuf -u https://target.com/FUZZ -w wordlist.txt -fc 404')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>Scan for Extensions (البحث عن امتدادات معينة)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">ffuf -u https://target.com/FUZZ -w wordlist.txt -e .php,.txt,.bak</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('ffuf -u https://target.com/FUZZ -w wordlist.txt -e .php,.txt,.bak', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('ffuf -u https://target.com/FUZZ -w wordlist.txt -e .php,.txt,.bak')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🚩 Critical Files & Directories to Find</h3></div>
                  <table class="interactive-table">
                    <thead><tr><th>الملف/المسار</th><th>مستوى الخطورة</th><th>الوصف والتأثير</th></tr></thead>
                    <tbody>
                      <tr><td>.git/</td><td>Critical</td><td>سحب السورس كود الكامل وتاريخ التعديل الخاص بالموقع.</td></tr>
                      <tr><td>backup.zip / backup.sql</td><td>Critical</td><td>نسخة احتياطية من ملفات الموقع أو قاعدة البيانات.</td></tr>
                      <tr><td>.env / config.php</td><td>Critical</td><td>كشف كلمات مرور قاعدة البيانات ومفاتيح الـ APIs السرية.</td></tr>
                      <tr><td>admin / dashboard</td><td>Medium-High</td><td>لوحة تحكم إدارة السيرفر أو التطبيق.</td></tr>
                      <tr><td>phpinfo.php</td><td>Low-Medium</td><td>تسريب معلومات خيارات الـ PHP وإعدادات الخادم والمسارات.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>"""

# --- PHASE 5 ---
content_html += """
              <!-- PHASE 5: Crawling -->
              <div class="meth-content-view tool-content-view" id="meth-content-p5" style="display: none; --tool-color: #ff00d4;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🕷️</span> Phase 5: Crawling & Endpoint Discovery</h2>
                    <p class="hero-tagline">المرحلة 5 — الزحف على صفحات الموقع واستخراج جميع الروابط</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🕷️ Web Crawling & Spidering</h3></div>
                  <p>المرور البرمجي على جميع الصفحات المتصلة داخلياً ببعضها البعض واستخراج روابط الـ APIs والمسارات المخفية.</p>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚔️ Katana Scan Commands</h3></div>
                  
                  <h4>Basic Crawling (زحف أساسي)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">katana -u https://target.com</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('katana -u https://target.com', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('katana -u https://target.com')">▶ Run Demo</button>
                    </div>
                  </div>

                  <h4>Deep JS Crawling & Parsing (تحليل جافا سكربت والروابط داخلها)</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">katana -u https://target.com -jc -kf -d 3</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('katana -u https://target.com -jc -kf -d 3', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('katana -u https://target.com -jc -kf -d 3')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>💡 Why Crawling Matters</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>Input Endpoints</strong>: العثور على حقول الإدخال والـ Forms التي يمكن حقنها بالثغرات.</li>
                    <li>✔ <strong>Hidden API Routes</strong>: اكتشاف واجهات برمجة لم توثق أو منسية كـ `/api/v1/auth`.</li>
                    <li>✔ <strong>Tech Discovery</strong>: جمع ملفات الـ Assets مثل ملفات الـ JS والصور لتحليلها لاحقاً.</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 6 ---
content_html += """
              <!-- PHASE 6: Historical URLs -->
              <div class="meth-content-view tool-content-view" id="meth-content-p6" style="display: none; --tool-color: #ff3300;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🕰️</span> Phase 6: Historical URLs</h2>
                    <p class="hero-tagline">المرحلة 6 — جلب الروابط التاريخية للهدف من الأرشيف السحابي</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🕰️ Wayback Machine & OSINT Archive</h3></div>
                  <p>جمع المسارات التاريخية التي تم تصويرها وأرشفتها للهدف عبر السنين، قد تفاجأ بوجود صفحات لم تعد موجودة في الهيكل الحالي ولكن السيرفر ما زال يدعم تشغيلها!</p>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📜 gau (GetAllUrls) Commands</h3></div>
                  
                  <h4>Basic URL Fetching</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">gau target.com --threads 5 --subs</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('gau target.com --threads 5 --subs', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('gau target.com --threads 5 --subs')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>💎 الكنوز التي يمكن العثور عليها في الأرشيف</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>Old API Endpoints</strong>: واجهات برمجية قديمة لا تحتوي على حماية الـ Token الحالية.</li>
                    <li>✔ <strong>Backup Configurations</strong>: روابط لملفات مضغوطة تم رفعها وحذف روابطها التصفحية فقط.</li>
                    <li>✔ <strong>Parameters list</strong>: معاملات وباراميترات ويب قديمة تم استخدامها في Fuzzing لثغرات الـ XSS/SQLi.</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 7 ---
content_html += """
              <!-- PHASE 7: JavaScript Recon -->
              <div class="meth-content-view tool-content-view" id="meth-content-p7" style="display: none; --tool-color: #00e5ff;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">📜</span> Phase 7: JavaScript Recon</h2>
                    <p class="hero-tagline">المرحلة 7 — تحليل كود الـ JavaScript لاستخراج الأسرار والمسارات</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🔑 What we search inside JS</h3></div>
                  <table class="interactive-table">
                    <thead><tr><th>العنصر</th><th>أمثلة</th><th>مستوى الخطورة</th></tr></thead>
                    <tbody>
                      <tr><td>API Keys</td><td>AWS access keys, Google API Keys, Stripe Tokens</td><td>High - Critical</td></tr>
                      <tr><td>Tokens</td><td>JWT tokens, bearer tokens left in code</td><td>High</td></tr>
                      <tr><td>Hidden Endpoints</td><td>`/api/v2/user/delete`</td><td>Medium - High</td></tr>
                      <tr><td>Secrets & Credentials</td><td>Hardcoded passwords or usernames</td><td>Critical</td></tr>
                      <tr><td>Internal Domains</td><td>`dev.target.local`, `staging.target.com`</td><td>Medium</td></tr>
                    </tbody>
                  </table>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🛠️ SecretFinder Commands</h3></div>
                  
                  <h4>Extract Secrets from Javascript URL</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">python3 SecretFinder.py -i https://target.com/assets/app.js -o cli</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('python3 SecretFinder.py -i https://target.com/assets/app.js -o cli', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('python3 SecretFinder.py -i https://target.com/assets/app.js -o cli')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚙️ Recommended Tools</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>LinkFinder</strong>: كود بايثون متقدم لاستخراج المسارات والروابط من ملفات JS.</li>
                    <li>✔ <strong>SecretFinder</strong>: تعديل على LinkFinder يركز بالكامل على البحث عن الأسرار والمفاتيح بـ Regex.</li>
                    <li>✔ <strong>jsluice</strong>: أداة سريعة جداً مكتوبة بـ Go لتحليل ملفات JS واستخراج الهيكل والمسارات بشكل منظم.</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 8 ---
content_html += """
              <!-- PHASE 8: Params Discovery -->
              <div class="meth-content-view tool-content-view" id="meth-content-p8" style="display: none; --tool-color: #9b59ff;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🎛️</span> Phase 8: Parameter Discovery</h2>
                    <p class="hero-tagline">المرحلة 8 — البحث عن المعاملات والباراميترات المخفية</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🎛️ Hidden Parameters (المعاملات المخفية)</h3></div>
                  <p>في كثير من الأحيان، يدعم السيرفر استقبال معاملات للتحكم بالوظائف مثل `?debug=true` أو `?admin=1` ولكنها لا تظهر في الروابط العادية. اكتشافها يفتح آفاقاً لثغرات IDOR أو bypasses.</p>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🎯 Arjun Commands</h3></div>
                  
                  <h4>Discover parameters on URL</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">arjun -u https://target.com/index.php -m GET</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('arjun -u https://target.com/index.php -m GET', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('arjun -u https://target.com/index.php -m GET')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>💡 Tools in Focus</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <strong>Arjun</strong>: الأفضل لتخمين البارامترات بفضل استعلاماته الذكية وتقليله للطلبات المرسلة.</li>
                    <li>✔ <strong>ParamSpider</strong>: استخراج البارامترات المسجلة للهدف سلبياً بالكامل عبر الأرشيف دون إرسال طلب واحد.</li>
                  </ul>
                </div>
              </div>"""

# --- PHASE 9 ---
content_html += """
              <!-- PHASE 9: Vuln Hunting -->
              <div class="meth-content-view tool-content-view" id="meth-content-p9" style="display: none; --tool-color: #ffb020;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">🔥</span> Phase 9: Vulnerability Hunting</h2>
                    <p class="hero-tagline">المرحلة 9 — اختبار الثغرات الفعلي وتطبيق سيناريوهات الاستغلال</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚠️ Top Vulnerabilities & Severity</h3></div>
                  <table class="interactive-table">
                    <thead><tr><th>الثغرة</th><th>الخطورة القياسية</th><th>فكرة الثغرة باختصار</th></tr></thead>
                    <tbody>
                      <tr><td>RCE (Remote Code Execution)</td><td>Critical</td><td>تشغيل أوامر النظام مباشرة على السيرفر والسيطرة عليه.</td></tr>
                      <tr><td>SQL Injection (SQLi)</td><td>High - Critical</td><td>حقن أوامر SQL لتخطي التوثيق أو سرقة قاعدة البيانات.</td></tr>
                      <tr><td>SSRF (Server Side Request Forgery)</td><td>High - Critical</td><td>إجبار السيرفر على طلب روابط داخلية أو خارجية لصالح المهاجم.</td></tr>
                      <tr><td>File Upload Vulns</td><td>High - Critical</td><td>رفع ملفات خبيثة (PHP Shell) لتنفيذ الأوامر.</td></tr>
                      <tr><td>IDOR (Insecure Direct Object Reference)</td><td>High</td><td>تغيير الـ ID للوصول لبيانات مستخدمين آخرين دون توثيق الصلاحية.</td></tr>
                      <tr><td>Cross Site Scripting (XSS)</td><td>Medium - High</td><td>حقن وتنفيذ أكواد JavaScript في متصفح الزوار الآخرين.</td></tr>
                    </tbody>
                  </table>
                </div>

                <!-- SUBSECTION: XSS -->
                <div class="cyber-card">
                  <div class="card-header"><h3>🌐 9.1 Cross Site Scripting (XSS)</h3></div>
                  <p>تنفيذ أكواد جافا سكربت في متصفح الضحية لسرقة ملفات تعريف الارتباط (Cookies) أو التصيد.</p>
                  
                  <h4>Basic PoC Payload</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">&lt;script&gt;alert(1)&lt;/script&gt;</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('<script>alert(1)</script>', this)">📋 Copy</button>
                    </div>
                  </div>

                  <h4>Fuzzing for XSS using Dalfox</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">dalfox url https://target.com/search?q=test</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('dalfox url https://target.com/search?q=test', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('dalfox url https://target.com/search?q=test')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <!-- SUBSECTION: SQLi -->
                <div class="cyber-card">
                  <div class="card-header"><h3>💉 9.2 SQL Injection (SQLi)</h3></div>
                  <p>استغلال ضعف فحص المدخلات لتنفيذ استعلامات خبيثة على قاعدة البيانات.</p>
                  
                  <h4>Scan target with SQLMap</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">sqlmap -u "https://target.com/item.php?id=1" --dbs --batch</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('sqlmap -u &quot;https://target.com/item.php?id=1&quot; --dbs --batch', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('sqlmap -u &quot;https://target.com/item.php?id=1&quot; --dbs --batch')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>

                <!-- SUBSECTION: IDOR -->
                <div class="cyber-card">
                  <div class="card-header"><h3>🔑 9.3 Insecure Direct Object Reference (IDOR)</h3></div>
                  <p>المهاجم يقوم بتغيير قيم المعرفات مثل `?user_id=1001` إلى `?user_id=1002` للاطلاع على بيانات الآخرين دون امتلاك الصلاحية المناسبة.</p>
                  <blockquote class="mindset-quote">"دائماً اختبر الوظائف الحساسة مثل حذف الحساب، تعديل كلمة المرور، واستخراج الفواتير."</blockquote>
                </div>
                
                <!-- SUBSECTION: SSRF -->
                <div class="cyber-card">
                  <div class="card-header"><h3>📡 9.4 Server Side Request Forgery (SSRF)</h3></div>
                  <p>حقن روابط داخلية مثل `http://127.0.0.1` أو روابط بيانات السحابة `http://169.254.169.254` في الخصائص التي تطلب صوراً أو تجلب ملفات لمعرفة الخدمات الداخلية غير المصرح بالوصول إليها خارجياً.</p>
                </div>
              </div>"""

# --- PHASE 10 ---
content_html += """
              <!-- PHASE 10: Automation -->
              <div class="meth-content-view tool-content-view" id="meth-content-p10" style="display: none; --tool-color: #ff0055;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">⚙️</span> Phase 10: Automation & Pipelines</h2>
                    <p class="hero-tagline">المرحلة 10 — أتمتة عمليات الفحص وربط الأدوات معاً</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>⚙️ Build Your Pentesting Pipeline</h3></div>
                  <p>المخترق الذكي يقوم بدمج أدواته في سطر برمجي واحد (Pipeline) ليعمل الفحص التلقائي على الخلفية ويخزن النتائج دون مراقبة مستمرة.</p>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>🔥 Automation Command Example</h3></div>
                  
                  <h4>Pipeline: Subdomains -> Alive Check -> Vuln Scan</h4>
                  <div class="cmd-ui-box">
                    <div class="cmd-ui-top">subfinder -d target.com -silent | httpx -silent | nuclei -t cves/</div>
                    <div class="cmd-ui-bottom">
                      <button class="cmd-btn" onclick="copyText('subfinder -d target.com -silent | httpx -silent | nuclei -t cves/', this)">📋 Copy</button>
                      <button class="cmd-btn run-btn" onclick="simulateTerminal('subfinder -d target.com -silent | httpx -silent | nuclei -t cves/')">▶ Run Demo</button>
                    </div>
                  </div>
                </div>
              </div>"""

# --- PHASE 11 ---
content_html += """
              <!-- PHASE 11: Reporting -->
              <div class="meth-content-view tool-content-view" id="meth-content-p11" style="display: none; --tool-color: #00ff66;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">📝</span> Phase 11: Reporting</h2>
                    <p class="hero-tagline">المرحلة 11 — كتابة التقرير وتوثيق الثغرات بشكل احترافي</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📝 Essential Elements of a Bug Report</h3></div>
                  <p>التقرير هو المنتج النهائي الذي تقدمه للعميل أو لبرنامج الـ Bug Bounty، وتعتمد مكافأتك كلياً على وضوح التقرير وقابليته للفهم والتطبيق.</p>
                  <table class="interactive-table">
                    <thead><tr><th>عنصر التقرير</th><th>الوصف والغرض منه</th></tr></thead>
                    <tbody>
                      <tr><td>Title (العنوان)</td><td>وصف مختصر وواضح لنوع الثغرة ومكانها (e.g. IDOR on /api/v1/delete_user).</td></tr>
                      <tr><td>Severity (الخطورة)</td><td>تحديد خطورة الثغرة (Low, Medium, High, Critical) بناءً على تأثيرها.</td></tr>
                      <tr><td>Description (الوصف)</td><td>شرح مبسط للثغرة الأمنية والخدمة المصابة.</td></tr>
                      <tr><td>Steps to Reproduce (خطوات الاستغلال)</td><td>خطوات مرقمة وواضحة جداً تمكن المهندس من إعادة تنفيذ الثغرة لإثباتها.</td></tr>
                      <tr><td>Impact (التأثير)</td><td>شرح ما يمكن للمخترق الحقيقي فعله باستغلال هذه الثغرة وتأثيرها المالي أو الأمني.</td></tr>
                      <tr><td>Fix Recommendation (الحل المقترح)</td><td>تقديم إرشادات برمجية أو إدارية لإصلاح الثغرة الأمنية وإغلاقها.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>"""

# --- RESOURCES ---
content_html += """
              <!-- PHASE 12: Resources -->
              <div class="meth-content-view tool-content-view" id="meth-content-p12" style="display: none; --tool-color: #ffb020;">
                <div class="cyber-hero">
                  <div class="hero-left">
                    <h2 class="hero-title"><span class="hero-icon">📚</span> Resources & Skills</h2>
                    <p class="hero-tagline">أقوى المصادر للتعلم المستمر والمهارات الحقيقية التي تحتاجها</p>
                  </div>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>📚 Top Recommended Resources</h3></div>
                  <ul class="t-check-list">
                    <li>✔ <a href="https://portswigger.net/web-security" target="_blank" rel="noopener">PortSwigger Web Security Academy</a>: المرجع الأول والمنصة الأفضل لتعلم واختبار ثغرات الويب عملياً.</li>
                    <li>✔ <a href="https://owasp.org/www-project-web-security-testing-guide/" target="_blank" rel="noopener">OWASP Web Security Testing Guide</a>: الدليل الرسمي والمقياس الأفضل لاختبار أمان التطبيقات.</li>
                    <li>✔ <a href="https://github.com/swisskyrepo/PayloadsAllTheThings" target="_blank" rel="noopener">PayloadsAllTheThings</a>: مستودع الأكواد والـ Payloads الأشهر الذي يستعين به كل بنتيستر.</li>
                    <li>✔ <a href="https://book.hacktricks.wiki" target="_blank" rel="noopener">HackTricks</a>: موسوعة أمنية شاملة لكل تقنيات اختراق الأنظمة والويب والسحاب.</li>
                  </ul>
                </div>

                <div class="cyber-card">
                  <div class="card-header"><h3>💡 Recommended Learning Path (الترتيب الأفضل للتعلم)</h3></div>
                  <ol class="lab-steps">
                    <li>1. فهم بروتوكول HTTP والشبكات الأساسية (Networking Basics).</li>
                    <li>2. إتقان التعامل مع نظام تشغيل Linux وسطر الأوامر.</li>
                    <li>3. احتراف أداة Burp Suite وفهم منطق الطلبات.</li>
                    <li>4. تعلم وفهم ثغرات الويب الأساسية بالترتيب: OWASP Top 10 (XSS, SQLi, IDOR, SSRF).</li>
                    <li>5. دراسة الأتمتة (Automation) وكتابة سكريبتات فحص بسيطة بـ Bash/Python.</li>
                    <li>6. الغوص في أمان السحابة (Cloud Security) وثغرات الـ APIs المتقدمة.</li>
                  </ol>
                </div>
              </div>"""

# Assemble full pane-methodology HTML
pane_methodology_html = f"""        <!-- 9. METHODOLOGY VIEW (3-Pane Explorer Layout) -->
        <div class="workspace-pane" id="pane-methodology">
          <div class="explorer-layout">
            
            <!-- Left Column: Phases list -->
            <div class="explorer-sidebar">
              <h3 class="explorer-title">METHODOLOGY</h3>
              <div class="explorer-folders">{sidebar_html}
              </div>
            </div>

            <!-- Right Column: Details Pane -->
            <div class="explorer-content-panel" style="flex: 3;">{content_html}
            </div>

          </div>
        </div>"""

# 4. Modifying home.html
print("4. Modifying home.html template...")
with open(html_path, 'r', encoding='utf-8') as f:
    html_code = f.read()

# A. Add tab link
print("A. Adding tab link button...")
tab_link_target = """        <button class="tab-link" onclick="switchTab('bugbounty')" data-tab="bugbounty">
          <span class="tab-icon">🪲</span> Bug Bounty
        </button>"""
new_tab_link = tab_link_target + """
        <button class="tab-link" onclick="switchTab('methodology')" data-tab="methodology">
          <span class="tab-icon">🗺️</span> Methodology
        </button>"""

if "switchTab('methodology')" not in html_code:
    html_code = html_code.replace(tab_link_target, new_tab_link)
    print("Tab link button injected.")
else:
    print("Tab link button already exists. Skipping.")

# B. Inject pane-methodology
if 'id="pane-methodology"' in html_code:
    print("Removing existing pane-methodology from template first...")
    html_code = re.sub(r'\s*<!-- 9\. METHODOLOGY VIEW.*?<!-- Footer -->', '\n\n  <!-- Footer -->', html_code, flags=re.DOTALL)

target_footer_close = """          </div>
        </div>
      </div>

  <!-- Footer -->"""

injected_close = """          </div>
        </div>
        
""" + pane_methodology_html + """
      </div>

  <!-- Footer -->"""

html_code = html_code.replace(target_footer_close, injected_close)
print("pane-methodology HTML injected.")

# C. Inject JS functions before </script>
print("C. Injecting Javascript controller...")

html_code = html_code.replace("""    // ── Methodology Explorer Navigation ──
    function openMethPhase(phaseId) {
      document.querySelectorAll('.meth-phase').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('meth-ef-' + phaseId);
      if (activeFolder) activeFolder.classList.add('active');
      document.querySelectorAll('.meth-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Roadmap phase switched to: ${phaseId}`, 'text-neon-cyan');
      }
    }""", "")

js_functions = """
    // ── Methodology Explorer Navigation ──
    function openMethPhase(phaseId) {
      document.querySelectorAll('.meth-phase').forEach(el => el.classList.remove('active'));
      const activeFolder = document.getElementById('meth-ef-' + phaseId);
      if (activeFolder) activeFolder.classList.add('active');
      document.querySelectorAll('.meth-content-view').forEach(el => el.style.display = 'none');
      const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';
      if (terminalInitialized) {
        printLineToTerminal(`\\n[info] Roadmap phase switched to: ${phaseId}`, 'text-neon-cyan');
      }
    }
"""

if "function openMethPhase" not in html_code:
    html_code = html_code.replace("  </script>", js_functions + "  </script>")
    print("JS controllers injected.")
else:
    print("JS controllers already exist. Skipping.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_code)
print("[Success] home.html modified.")

print("All modifications completed successfully!")
