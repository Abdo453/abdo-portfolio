import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 19: Multithreading (تعدد المهام)",
    levels: [
      {
        id: "l41",
        title: "أساسيات التزامن (Threads)",
        theory: `<h1>Level 41: سرعة البرق</h1>
          <p>عند فحص شبكة كاملة، لا يمكنك فحص عنوان واحد كل مرة. نستخدم <code>threading</code> لفحص 10 أو 100 عنوان في نفس اللحظة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لإنشاء خيط (Thread) جديد يستدعي الدالة <code>scan()</code> واطبعه.</p>
          </div>`,
        initialCode: `import threading\n\ndef scan():\n    print("Thread Scanning...")\n\n# أنشئ الخيط وابدأ تشغيله\n# t = threading.Thread(target=scan)\n`,
        validate: (out) => out.includes("Thread Scanning...")
      },
      {
        id: "l42",
        title: "تنظيم المرور (Queues)",
        theory: `<h1>Level 42: طابور العمليات</h1>
          <p>عندما تعمل عدة خيوط معاً، قد تتداخل البيانات. نستخدم الـ <code>Queue</code> لتوزيع المهام على الخيوط بأمان.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك طابور. أضف الرقم <code>80</code> للطابور باستخدام <code>put()</code>، ثم اسحبه باستخدام <code>get()</code> واطبعه.</p>
          </div>`,
        initialCode: `import queue\nq = queue.Queue()\n\n# أضف الرقم 80 للطابور واسحبه ثم اطبعه\n`,
        validate: (out) => out.includes("80")
      }
    ]
  },
  {
    chapter: "Chapter 20: Advanced File Formats",
    levels: [
      {
        id: "l43",
        title: "تحليل قواعد البيانات (CSV)",
        theory: `<h1>Level 43: تسريبات الـ CSV</h1>
          <p>أغلب التسريبات تأتي بصيغة CSV. مكتبة <code>csv</code> تساعدنا في قراءة وفصل الأعمدة (مثل الإيميل والباسورد).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لقد صممنا الكود لطباعة السطر الأول. استخدم <code>row[1]</code> لطباعة الباسوورد الخاص بأول شخص.</p>
          </div>`,
        initialCode: `# محاكاة بيانات CSV\nrow = ["admin@site.com", "hacked123", "admin"]\n\n# اطبع الباسوورد (العنصر الثاني في القائمة)\n`,
        validate: (out) => out.includes("hacked123")
      },
      {
        id: "l44",
        title: "كتابة التقارير (CSV Write)",
        theory: `<h1>Level 44: تقرير الاختراق</h1>
          <p>بعد إنهاء المهمة، تحتاج لتصدير النتائج كملف Excel أو CSV للعميل. نשתخدم <code>csv.writer</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الجملة <code>Vulnerability,Severity</code> كمحاكاة لإنشاء رأس الجدول (Header).</p>
          </div>`,
        initialCode: `# اطبع الجملة المطلوبة\n`,
        validate: (out) => out.includes("Vulnerability,Severity")
      }
    ]
  },
  {
    chapter: "Chapter 21: Stealth & Obfuscation",
    levels: [
      {
        id: "l45",
        title: "تغيير الهوية (User-Agent)",
        theory: `<h1>Level 45: التخفي</h1>
          <p>السيرفرات تكتشف أدوات بايثون فوراً من الـ User-Agent الافتراضي (مثلاً python-urllib/3.9). يجب تزييفه لـ Chrome أو Firefox.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قاموس Headers. قم بتعديل قيمة <code>"User-Agent"</code> إلى <code>"Mozilla/5.0"</code>، ثم اطبع القاموس.</p>
          </div>`,
        initialCode: `headers = {"User-Agent": "python-requests/2.25"}\n\n# قم بتعديل الهوية واطبعها\n`,
        validate: (out) => out.includes("Mozilla/5.0")
      },
      {
        id: "l46",
        title: "التمويه الزمني (Random Delays)",
        theory: `<h1>Level 46: الهروب من الفايرول (WAF)</h1>
          <p>إرسال 1000 طلب في ثانية واحدة سيؤدي لحظرك فوراً (Rate Limiting). يجب استخدام فترات توقف عشوائية للتمويه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>random.randint(1, 3)</code> لإنتاج رقم عشوائي، واطبعه.</p>
          </div>`,
        initialCode: `import random\n\n# ولد رقماً عشوائياً بين 1 و 3 واطبعه\n`,
        validate: (out) => out.includes("1") || out.includes("2") || out.includes("3")
      }
    ]
  },
  {
    chapter: "Chapter 22: The Mastermind Challenge",
    levels: [
      {
        id: "l47",
        title: "برمجة أداة SSH Cracker",
        theory: `<h1>Level 47: العقل المدبر</h1>
          <p>أداة كسر كلمات سر الـ SSH تتطلب مكتبة (Paramiko)، حلقات تكرار، ومعالجة أخطاء (AuthenticationException). سنقوم بمحاكاتها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لكي يجرب كلمات السر. إذا كانت الكلمة <code>"toor"</code>، اطبع <code>Success! Password is toor</code> ثم قم بالخروج من الحلقة بـ <code>break</code>.</p>
          </div>`,
        initialCode: `passwords = ["123", "admin", "toor", "root"]\n\nfor p in passwords:\n    # اكتب الشرط هنا\n    pass\n`,
        validate: (out) => out.includes("Success! Password is toor")
      },
      {
        id: "l48",
        title: "التشفير اللامتماثل (RSA Sim)",
        theory: `<h1>Level 48: المفاتيح العامة والخاصة</h1>
          <p>التشفير القوي يعتمد على مفتاحين. محاكاة: اضرب الرقم 5 (رسالتك) في 13 (المفتاح العام). واطبع النتيجة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع ناتج ضرب 5 في 13.</p>
          </div>`,
        initialCode: `# العملية الحسابية هنا\n`,
        validate: (out) => out.includes("65")
      },
      {
        id: "l49",
        title: "تنفيذ الشيل كود (Shellcode)",
        theory: `<h1>Level 49: قلب الميموري</h1>
          <p>أقوى مستوى في الاختراق هو تشغيل كود ثنائي (Hex/Bytes) في الذاكرة. نستخدم الـ <code>bytes()</code> في بايثون للتعامل معها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بتحويل النص المحاكي <code>"\\x90\\x90"</code> (الذي يمثل تعليمة NOP) واطبعه كنص عادي.</p>
          </div>`,
        initialCode: `shellcode = "\\x90\\x90"\nprint(shellcode)\n`,
        validate: (out) => out.includes("\x90\x90") || out.includes("\\x90\\x90")
      },
      {
        id: "l50",
        title: "The Absolute Zenith",
        theory: `<h1>Level 50: أسطورة الأساطير</h1>
          <p>وصلت إلى قمة الجبل. 50 مستوى من العرق والبرمجة والتشفير.</p>
          <p>أنت الآن أصبحت جزءاً من النخبة. يمكنك بناء ترسانة كاملة من الصفر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الرسالة النهائية</div>
            <p>اطبع: <code>I AM THE ELITE HACKER, LEVEL 50 COMPLETED.</code></p>
          </div>`,
        initialCode: `# رسالتك الأخيرة للتاريخ!\n`,
        validate: (out) => out.includes("LEVEL 50 COMPLETED")
      }
    ]
  }
];'''

if 'id: "l50"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 41-50 successfully!')
else:
    print('Levels already added.')
