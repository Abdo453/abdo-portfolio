import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 28: Advanced Web Requests",
    levels: [
      {
        id: "l61",
        title: "الجلسات (Sessions)",
        theory: `<h1>Level 61: الحفاظ على الـ Cookies</h1>
          <p>عند محاولة تسجيل الدخول وفحص لوحة التحكم، يجب أن تحافظ على ملفات تعريف الارتباط (Cookies) بين كل طلب وآخر. هنا نستخدم الـ <code>Session</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود الوهمي وطبّق <code>s.get(url)</code> لتطبع <code>Access Granted!</code>.</p>
          </div>`,
        initialCode: `class MockSession:\n    def get(self, url):\n        print("Access Granted!")\n\ns = MockSession()\nurl = "http://target.com/admin"\n\n# استخدم s لجلب الرابط\n`,
        validate: (out) => out.includes("Access Granted!")
      },
      {
        id: "l62",
        title: "تخطي الحماية بالبروكسي",
        theory: `<h1>Level 62: البروكسي (Proxies)</h1>
          <p>لتخطي الحظر، أو لمراقبة مرورك في أداة Burp Suite، نستخدم البروكسي. نمرر القاموس <code>{"http": "http://127.0.0.1:8080"}</code> للطلب.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع عنوان البروكسي <code>http://127.0.0.1:8080</code>.</p>
          </div>`,
        initialCode: `proxies = {"http": "http://127.0.0.1:8080"}\n\n# اطبع قيمة الـ proxy لـ http\n`,
        validate: (out) => out.includes("http://127.0.0.1:8080")
      }
    ]
  },
  {
    chapter: "Chapter 29: Web App Pentesting Scripts",
    levels: [
      {
        id: "l63",
        title: "أتمتة الـ Blind SQLi",
        theory: `<h1>Level 63: الاختراق الأعمى</h1>
          <p>في الـ Blind SQL Injection، نقوم بتجربة الحروف حرفاً حرفاً ومراقبة تأخر السيرفر أو تغير الصفحة. هذا يتطلب حلقتين متداخلتين (Nested Loops).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك متغير <code>chars = "abc"</code>. استخدم حلقة <code>for</code> مرتين (Nested Loop) لطباعة الحروف معاً (مثلاً aa, ab, ac...). يكفي أن تطبعها.</p>
          </div>`,
        initialCode: `chars = "abc"\n\n# استخدم For بداخلها For لطباعة كل الاحتمالات الثنائية\nfor i in chars:\n    for j in chars:\n        print(i+j)\n`,
        validate: (out) => out.includes("aa") && out.includes("cc") && out.includes("ab")
      },
      {
        id: "l64",
        title: "الـ Fuzzer (التجربة العشوائية)",
        theory: `<h1>Level 64: إغراق السيرفر بالـ Payloads</h1>
          <p>الـ Fuzzer هو سكربت يجرب مئات الـ Payloads ليجد واحد يتخطى الحماية (XSS Fuzzer).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك القائمة <code>payloads</code>. اكتشف أي واحد فيهم يحتوي على كلمة <code>alert</code> واطبعه.</p>
          </div>`,
        initialCode: `payloads = ["<svg onload=1>", "<script>alert(1)</script>", "<b>hello</b>"]\n\n# اكتب Loop يبحث عن الـ payload الذي يحتوي على كلمة alert واطبعه\n`,
        validate: (out) => out.includes("<script>alert(1)</script>") && !out.includes("<b>")
      }
    ]
  },
  {
    chapter: "Chapter 30: Windows & Active Directory Concepts",
    levels: [
      {
        id: "l65",
        title: "الريجستري (Windows Registry)",
        theory: `<h1>Level 65: مفاتيح البقاء</h1>
          <p>الفيروس الجيد يزرع نفسه في مفاتيح الإقلاع (Autorun) في الريجستري ليعمل مع تشغيل الويندوز. بايثون يمكنه ذلك عبر مكتبة <code>winreg</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة المسار الوهمي: <code>Software\\Microsoft\\Windows\\CurrentVersion\\Run</code></p>
          </div>`,
        initialCode: `# اطبع مسار الـ Autorun الشهير في ويندوز\n`,
        validate: (out) => out.includes("Software\\Microsoft\\Windows\\CurrentVersion\\Run") || out.includes("Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run")
      },
      {
        id: "l66",
        title: "تمرير الهاش (Pass-The-Hash)",
        theory: `<h1>Level 66: الهاش هو الباسوورد</h1>
          <p>في الـ Active Directory، يمكنك تسجيل الدخول بالهاش NTLM نفسه دون معرفة الباسوورد الأصلي (Pass-The-Hash).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>مرر قيمة <code>ntlm_hash</code> للدالة <code>pth_attack()</code> واطبع نتيجتها.</p>
          </div>`,
        initialCode: `ntlm_hash = "aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0"\n\ndef pth_attack(h):\n    return f"Logged in with {h}"\n\n# استدعِ الدالة واطبع النتيجة\n`,
        validate: (out) => out.includes("Logged in with aad3b435")
      }
    ]
  },
  {
    chapter: "Chapter 31: Keyloggers & Desktop",
    levels: [
      {
        id: "l67",
        title: "تسجيل المفاتيح (Keylogger)",
        theory: `<h1>Level 67: التجسس على لوحة المفاتيح</h1>
          <p>كتابة Keylogger تتطلب التقاط ضغطات الكيبورد وحفظها. سنحاكي وظيفة التقاط ضغطة زر الـ <code>Enter</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لكي يتحقق إذا كان المتغير <code>key == "Key.enter"</code> يطبع <code>[ENTER PRESSED]</code>.</p>
          </div>`,
        initialCode: `key = "Key.enter"\n\n# اكتب الشرط هنا\n`,
        validate: (out) => out.includes("[ENTER PRESSED]")
      },
      {
        id: "l68",
        title: "تصوير الشاشة (Screenshots)",
        theory: `<h1>Level 68: العيون الخفية</h1>
          <p>مكتبة مثل <code>mss</code> تتيح لبايثون أخذ لقطات سريعة للشاشة لإرسالها للسيرفر الخاص بك.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة <code>Screenshot saved to screen.png</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة كإثبات لعملية الالتقاط\n`,
        validate: (out) => out.includes("Screenshot saved to screen.png")
      }
    ]
  },
  {
    chapter: "Chapter 32: The Final Payload Delivery",
    levels: [
      {
        id: "l69",
        title: "القطرة المسمومة (Droppers)",
        theory: `<h1>Level 69: حمولة المرحلة الثانية</h1>
          <p>الفيروس الأولي (Dropper) يكون صغيراً بريئاً. وظيفته الوحيدة تحميل الفيروس الحقيقي من سيرفرك وتشغيله بـ <code>exec()</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم دالة <code>exec(malicious_code)</code> لتنفيذ الكود المحفوظ في المتغير.</p>
          </div>`,
        initialCode: `malicious_code = "print('Stage 2 Payload Executed!')"\n\n# استخدم الدالة exec لتنفيذ المتغير النصي\n`,
        validate: (out) => out.includes("Stage 2 Payload Executed!")
      },
      {
        id: "l70",
        title: "The Ultimate Pinnacle",
        theory: `<h1>Level 70: المتربع على العرش</h1>
          <p>70 مستوى كامل من كورس الهاكينج بالبايثون! لقد اجتزت محاكاة التشفير، شبكات C2، الهندسة العكسية، وبناء الـ Payloads.</p>
          <p>لا يوجد شيء آخر لنعلمك إياه الأساسيات. الباقي يعتمد على إبداعك!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 النهاية العظمى</div>
            <p>اطبع: <code>I AM THE SUPREME OVERLORD OF PYTHON!</code></p>
          </div>`,
        initialCode: `# كلمتك الأخيرة\n`,
        validate: (out) => out.includes("I AM THE SUPREME OVERLORD OF PYTHON!") || out.includes("OVERLORD")
      }
    ]
  }
];'''

if 'id: "l70"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 61-70 successfully!')
else:
    print('Levels already added.')
