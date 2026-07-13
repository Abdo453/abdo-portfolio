import os

def patch_books():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    
    books_flashcards = {
        'bug_bounty_playbook.html': [
            {"q": "ما هي بصمة السيطرة على GitHub Pages؟", "a": "There is not a GitHub Pages site here"},
            {"q": "ما هي الأداة القياسية لفحص سد الثغرات بالـ WordPress؟", "a": "WPScan"},
            {"q": "ما هو الأمر للكشف التلقائي عن الأسرار بـ Gitleaks؟", "a": "gitleaks detect --source ./repo -v"},
            {"q": "ما هو نوع سجل الـ DNS الأساسي لثغرة Takeover؟", "a": "CNAME Record"},
            {"q": "كيف نتجاوز كشف أداة الفحص التلقائية؟", "a": "تعديل قيم الـ User-Agent وتخصيص البايلودز يدوياً"}
        ],
        'web_hackers_handbook.html': [
            {"q": "كيف نتجاوز حماية الـ Same Origin Policy (SOP)؟", "a": "استغلال ثغرة CORS Misconfiguration"},
            {"q": "ما هي ثغرة تثبيت الجلسة (Session Fixation)؟", "a": "تثبيت معرف الجلسة للمستهدف قبل تسجيل دخوله"},
            {"q": "ما هو خط الدفاع الأول ضد ثغرات الـ CSRF؟", "a": "استخدام الـ Anti-CSRF Token الفريد لكل طلب"},
            {"q": "كيف يتم حقن ثغرات الـ XXE في السيرفر؟", "a": "إرسال ملف XML يحتوي على System Entity تشير لملف محلي"},
            {"q": "ما هي وظيفة الـ Web Application Firewall (WAF)؟", "a": "فحص وتصفية الطلبات الواردة ومنع البايلودز المعروفة"}
        ],
        'bug_bounty_bootcamp.html': [
            {"q": "ما هو الفرق بين الـ Active والـ Passive Recon؟", "a": "النشط يتفاعل مباشرة مع الهدف بينما السلبي يجمع البيانات من مصادر عامة"},
            {"q": "ما هي الأداة الأسرع لفحص المنافذ بمقاييس ضخمة؟", "a": "Masscan أو Naabu"},
            {"q": "ما معنى ثغرة IDOR باختصار؟", "a": "الوصول المباشر لكائنات النظام بدون التحقق من صلاحيات صاحب الطلب"},
            {"q": "كيف نثبت ثغرة الـ Blind XSS بنجاح؟", "a": "باستخدام منصات OOB مثل XSS Hunter لاستقبال الاتصال بالخلفية"},
            {"q": "ما هي أهمية كتابة تقرير ثغرة واضح (PoC)؟", "a": "يسرع عملية التحقق والقبول من فريق الـ Triage ويضمن حصولك على المكافأة"}
        ],
        'real_world_bug_hunting.html': [
            {"q": "ما هو الـ Parameter Pollution؟", "a": "تكرار إرسال نفس المعامل بقيم مختلفة لتشويش منطق السيرفر الخلفي"},
            {"q": "كيف نستغل خلل في تطبيق يدعم تسجيل OAuth؟", "a": "التلاعب بـ redirect_uri لتسريب رمز التحقق (Auth Code) لسيرفرنا"},
            {"q": "ما هي ثغرات الـ Race Condition؟", "a": "إرسال طلبات متزامنة في نفس الأجزاء من الثانية لتجاوز شروط منطقية (مثل الدفع)"},
            {"q": "كيف تكتشف ثغرات الـ Open Redirect؟", "a": "البحث عن معاملات التحويل مثل next, url, redirect وضخ روابط خارجية"},
            {"q": "ما هو خطر تسريب مفاتيح الـ API في تطبيقات أندرويد؟", "a": "عن طريق فك تشفير الـ APK بـ jadx والبحث عن أسرار Firebase أو AWS"}
        ],
        'rtfm.html': [
            {"q": "ما معنى منهجية Living off the Land (LoTL)؟", "a": "استخدام أدوات النظام الرسمية الموثوقة لتجنب كشف برنامج الحماية EDR"},
            {"q": "كيف نفعل نفق اتصال بـ SSH Reverse Port Forwarding؟", "a": "ssh -R local_port:target_ip:target_port user@attacker_ip"},
            {"q": "ما هي الأداة الأساسية لتخطي صلاحيات UAC بنظام ويندوز؟", "a": "Fodhelper.exe bypass"},
            {"q": "ما هو الأمر لرفع ملف بالخلفية باستخدام PowerShell؟", "a": "Invoke-WebRequest أو Start-BitsTransfer"},
            {"q": "كيف ننشئ مستخدم محلي جديد بمستوى Admin بالويندوز؟", "a": "net user /add ثم net localgroup administrators /add"}
        ],
        'btfm.html': [
            {"q": "ما هو خط الدفاع الأهم لحماية سجلات الـ Event Logs؟", "a": "تأمين ونقل السجلات فوراً لخادم خروج خارجي SIEM"},
            {"q": "كيف نكشف هجمات التخمين Brute Force بالويندوز؟", "a": "مراقبة سجلات الأحداث Event ID 4625 (فشل تسجيل الدخول)"},
            {"q": "ما هو الـ Hardening للأنظمة والشبكات؟", "a": "تعطيل كافة الخدمات غير المستخدمة وسد المنافذ المفتوحة وتحديث الأنظمة"},
            {"q": "كيف نرصد هجمات الـ DNS Tunneling؟", "a": "مراقبة الاستعلامات الطويلة غير المعتادة أو كثرة استعلامات TXT للهدف"},
            {"q": "ما هو دور الـ Endpoint Detection & Response (EDR)؟", "a": "مراقبة العمليات الجارية بالذاكرة وسلوك البرامج بالوقت الفعلي وسد الثغرات"}
        ],
        'hacking_art.html': [
            {"q": "ما هي ثغرة طفح الذاكرة المخزنة (Stack Buffer Overflow)؟", "a": "تجاوز الحدود المخصصة للمصفوفة لكتابة عنوان الرجوع (EIP)"},
            {"q": "ما هي وظيفة مسجل الـ EIP بالمعالج؟", "a": "يشير إلى عنوان التعليمة البرمجية التالية المراد تنفيذها"},
            {"q": "ما هو البايلود الخالي من الـ Null Bytes؟", "a": "بايلود لا يحتوي على \\x00 لتجنب قطع قراءة السلسلة النصية بسيرفر الهدف"},
            {"q": "كيف يعمل حماية الـ ASLR بالذاكرة؟", "a": "توزيع عناوين الذاكرة بشكل عشوائي عند كل إقلاع لمنع استغلال العناوين الثابتة"},
            {"q": "ما هو الـ NOP Sled وكيف يساعد الاستغلال؟", "a": "سلسلة من تعليمات \\x90 لتسهيل انزلاق المعالج للوصول للـ Shellcode بالذاكرة"}
        ],
        'malware_analysis.html': [
            {"q": "ما الفرق بين الـ Static والـ Dynamic Analysis للفيروسات؟", "a": "الاستاتيكي يحلل الأكواد بدون تشغيل، بينما الديناميكي يراقب السلوك أثناء التشغيل"},
            {"q": "ما هي أداة INetSim ولماذا تستخدم بالمعمل؟", "a": "محاكاة خادم شبكة كامل (HTTP, DNS) لتضليل الفيروس وجعله يكشف اتصالاته"},
            {"q": "ما هي طريقة كشف الفيروس لأجهزة التحليل (Anti-VM)؟", "a": "البحث عن معرّفات VBox أو VMware بالريجستري وعمليات المراقبة"},
            {"q": "كيف يتم تخطي فحوصات الـ Debugger برمجياً؟", "a": "التحقق من الدالة IsDebuggerPresent وتعديل مسار الشرط بالذاكرة"},
            {"q": "ما هو دور أداة Process Hacker في تتبع الفيروسات؟", "a": "مراقبة العمليات المنبثقة، اتصالات الشبكة، واستخراج ملفات الـ DLL بالذاكرة"}
        ],
        'black_hat_python.html': [
            {"q": "لماذا يفضل المهاجمون استخدام Python؟", "a": "سرعة كتابة الكود وتوافر مكتبات قوية للتلاعب بحزم الشبكة مثل Scapy"},
            {"q": "كيف ننشئ اتصال TCP Client خفيف في بايثون؟", "a": "استخدام مكتبة socket.socket والاتصال المباشر دون أي ملحقات خارجية"},
            {"q": "ما هو الـ Banner Grabbing وكيف يتم برمجته؟", "a": "استقبال البيانات الترحيبية من المنفذ لمعرفة إصدار الخدمة الجارية"},
            {"q": "ما هي دالة subprocess.Popen ولماذا تستخدم بالـ Backdoor؟", "a": "لتشغيل أوامر النظام مباشرة داخل السيرفر واسترجاع المخرجات للمتسلل"},
            {"q": "كيف نلتقط حزم الشبكة برمجياً بدون Wireshark؟", "a": "عن طريق فتح Raw Socket وتفسير الحزم بلغة بايثون"}
        ],
        'operator_handbook.html': [
            {"q": "ما هو خطر مشاركة /var/run/docker.sock بالـ Container؟", "a": "يتيح للحاوية التحكم بالـ Docker الرئيسي والهروب والحصول على Root بالكامل"},
            {"q": "كيف نتأكد من تشفير سجلات الـ Kubernetes Secrets؟", "a": "التحقق من تفعيل الـ EncryptionConfiguration بسيرفر API للـ K8s"},
            {"q": "ما هو دور سياسات الـ IAM بالـ Cloud Security؟", "a": "تحديد الصلاحيات والموارد التي يمكن للخدمات السحابية الوصول لها وإدارتها"},
            {"q": "كيف يتم عمل Privilege Escalation داخل البيئات السحابية؟", "a": "البحث عن أدوار (Roles) زائدة عن الحاجة تسمح بإعادة ربط وتوسيع الصلاحيات"},
            {"q": "ما هي أفضل ممارسة لتخزين المفاتيح المشفرة سحابياً؟", "a": "استخدام أنظمة إدارة المفاتيح السحابية (KMS) أو أداة HashiCorp Vault"}
        ]
    }

    for f in os.listdir(books_dir):
      if f.endswith('.html'):
        path = os.path.join(books_dir, f)
        
        # Load file with fallback encoding
        try:
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
        except UnicodeDecodeError:
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
          
        # Check if already patched to avoid duplicate injection
        if "Master Interactive Upgrades CSS Extension" in content or "playbook-flashcards" in content:
            print(f"Skipping {f} - already patched.")
            continue
            
        book_id = f.replace('.html', '')
        cards = books_flashcards.get(f, [])
        
        # 1. Inject Theme selector HUD in the sidebar
        target_aside = '<aside class="book-sidebar">'
        replacement_aside = """      <aside class="book-sidebar">
        <!-- Theme Swapper HUD -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
          <label for="theme-select" style="font-size: 0.72rem; color: var(--text-muted); font-weight: bold; display: block; margin-bottom: 5px;">🎨 مظهر الواجهة:</label>
          <select id="theme-select" onchange="setHackerTheme(this.value)" style="width: 100%; background: #030308; border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; padding: 6px; color: #fff; font-size: 0.78rem; outline: none; cursor: pointer; font-family: sans-serif;">
            <option value="theme-cyan">Cyber Cyan</option>
            <option value="theme-green">Matrix Green</option>
            <option value="theme-red">Ruby Red</option>
            <option value="theme-purple">Royal Purple</option>
          </select>
        </div>"""
        
        if target_aside in content:
            content = content.replace(target_aside, replacement_aside, 1)

        # 2. Inject TOC items for Flashcards and Sandbox
        # Find tips link to insert before it
        tips_id = f"{book_id}-tips"
        if book_id == 'bug_bounty_playbook':
            tips_id = 'playbook-tips'
        elif book_id == 'web_hackers_handbook':
            tips_id = 'web-tips'
        elif book_id == 'bug_bounty_bootcamp':
            tips_id = 'bc-tips'
        elif book_id == 'real_world_bug_hunting':
            tips_id = 'rw-tips'
            
        target_tips_link = f'href="#{tips_id}"'
        replacement_tips_link = f'href="#{book_id}-flashcards" class="toc-item">🎴 كروت المراجعة الذكية 3D</a>\n          <a href="#{book_id}-sandbox" class="toc-item">🧪 مختبر حقن البايلودز الحي</a>\n          <a href="#{tips_id}"'
        
        if target_tips_link in content:
            content = content.replace(target_tips_link, replacement_tips_link, 1)

        # 3. Create HTML markup for Flashcards & Sandbox sections
        flashcards_html = f"""        <!-- Flashcards Section -->
        <section id="{book_id}-flashcards" class="content-sec">
          <h2 class="sec-title">🎴 كروت المراجعة السيبرانية الذكية (Interactive 3D Flashcards)</h2>
          <p>كروت مراجعة تفاعلية لحفظ الأوامر والبصمات. انقر على أي كرت لقلبه ومعرفة الإجابة النموذجية:</p>
          
          <div class="flashcards-grid">
"""
        for index, card in enumerate(cards):
            flashcards_html += f"""            <div class="flashcard-wrapper" onclick="toggleFlashcard(this)">
              <div class="flashcard-inner">
                <div class="flashcard-front">
                  <div style="font-size: 1.5rem; margin-bottom: 8px;">❓</div>
                  <div style="font-size: 0.85rem; font-weight: bold; line-height: 1.4;">{card['q']}</div>
                </div>
                <div class="flashcard-back">
                  <div style="font-size: 1.5rem; margin-bottom: 8px;">💡</div>
                  <div style="font-size: 0.85rem; font-weight: bold; line-height: 1.4; font-family: monospace;">{card['a']}</div>
                </div>
              </div>
            </div>
"""
        flashcards_html += """          </div>
        </section>

"""

        sandbox_html = f"""        <!-- Payload Sandbox Section -->
        <section id="{book_id}-sandbox" class="content-sec">
          <h2 class="sec-title">🧪 مختبر حقن البايلودز الحي (Interactive Payload Sandbox)</h2>
          <p>مختبر محاكاة تفاعلي لاختبار وتحليل البايلودز ورؤية الاستجابة المباشرة للخوادم:</p>
          
          <div style="background: rgba(3,3,8,0.9); border: 1px solid var(--border-glass); border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="margin-bottom: 15px;">
              <label style="color:#fff; font-size:0.85rem; font-weight:700; display:block; margin-bottom:5px;">اختر نوع الثغرة للاختبار:</label>
              <select id="sandbox-type-{book_id}" onchange="updateSandboxPayloads('{book_id}')" style="background:#0d0d1a; border:1px solid rgba(255,255,255,0.15); color:#fff; padding:8px; border-radius:4px; width:100%; outline:none; font-size:0.85rem;">
                <option value="sqli">SQL Injection (SQLi)</option>
                <option value="xss">Cross-Site Scripting (XSS)</option>
                <option value="ssrf">Server-Side Request Forgery (SSRF)</option>
              </select>
            </div>
            
            <div style="margin-bottom: 15px;">
              <label style="color:#fff; font-size:0.85rem; font-weight:700; display:block; margin-bottom:5px;">البايلود (Payload Input):</label>
              <input type="text" id="sandbox-payload-{book_id}" value="' OR '1'='1" style="background:#0d0d1a; border:1px solid rgba(255,255,255,0.15); color:var(--accent-cyan); padding:10px; border-radius:4px; width:100%; outline:none; font-family:monospace; font-size:0.85rem; box-sizing:border-box;">
            </div>

            <button onclick="runSandboxExploit('{book_id}')" style="background:var(--gradient-primary); border:none; color:#fff; padding:10px 20px; border-radius:4px; font-weight:700; cursor:pointer; width:100%; font-size:0.88rem;">
              ⚡ تنفيذ الهجوم ومحاكاة الاستجابة
            </button>

            <!-- Terminal Output -->
            <div style="margin-top: 20px; background:#000; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden;">
              <div style="background:#0d0d1a; padding:6px 12px; font-size:0.72rem; color:var(--text-secondary); border-bottom:1px solid rgba(255,255,255,0.08); font-family:monospace; display:flex; justify-content:space-between;">
                <span>CONSOLE OUTPUT</span>
                <span>STATUS: ACTIVE</span>
              </div>
              <div id="sandbox-terminal-{book_id}" style="padding:15px; font-family:monospace; font-size:0.8rem; color:#00ff66; min-height:120px; max-height:200px; overflow-y:auto; line-height:1.5; text-align:left; direction:ltr;">
                [+] System ready. Input payload and click Execute to begin simulation...
              </div>
            </div>

            <!-- Virtual Browser Frame if XSS -->
            <div id="sandbox-browser-wrap-{book_id}" style="margin-top: 20px; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden; display:none;">
              <div style="background:#0d0d1a; padding:6px 12px; font-size:0.72rem; color:var(--text-secondary); border-bottom:1px solid rgba(255,255,255,0.08); font-family:monospace;">
                🖥️ VIRTUAL BROWSER FRAME
              </div>
              <div id="sandbox-browser-content-{book_id}" style="background:#fff; color:#000; padding:20px; text-align:center; min-height:80px; font-size:0.9rem;">
                Virtual Viewport
              </div>
            </div>

          </div>
        </section>

"""

        # Inject sections before the strategic tips section
        target_tips_sec = f'<!-- Author Strategic Tips -->'
        if target_tips_sec not in content:
            target_tips_sec = f'<section id="{tips_id}"'
            
        if target_tips_sec in content:
            content = content.replace(target_tips_sec, flashcards_html + sandbox_html + target_tips_sec, 1)

        # 4. Inject library_dashboard.js script tag before </body>
        if "library_dashboard.js" not in content and "</body>" in content:
            content = content.replace("</body>", '  <script src="../js/library_dashboard.js"></script>\n</body>', 1)

        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Patched features successfully in {f}.")

if __name__ == '__main__':
    patch_books()
