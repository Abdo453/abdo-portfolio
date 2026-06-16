import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 23: Data Serialization & Databases",
    levels: [
      {
        id: "l51",
        title: "خطورة الـ Pickle (RCE)",
        theory: `<h1>Level 51: الثغرات الخفية</h1>
          <p>مكتبة <code>pickle</code> تستخدم لحفظ الكائنات في ملفات. لكن فك التشفير لكائن مجهول قد يؤدي لتنفيذ كود خبيث (RCE).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>pickle.dumps(data)</code> لتحويل القاموس <code>data</code> إلى بايتات مشفرة (Bytes) ثم اطبعه.</p>
          </div>`,
        initialCode: `import pickle\n\ndata = {"user": "admin", "role": "hacker"}\n\n# قم بتشفير القاموس واطبعه\n`,
        validate: (out) => out.includes("admin") && out.includes("hacker") && out.includes("b'")
      },
      {
        id: "l52",
        title: "قواعد بيانات SQLite",
        theory: `<h1>Level 52: سرقة قواعد البيانات</h1>
          <p>أثناء الاختراق، قد تجد ملف <code>.db</code>. مكتبة <code>sqlite3</code> في بايثون تتيح لك قراءة وسرقة محتوياته بسهولة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قمنا بإنشاء محاكاة. استخدم الكود المكتوب وضع تحته جملة تطبع <code>"Hacking DB..."</code> لتتخطى المستوى.</p>
          </div>`,
        initialCode: `import sqlite3\n# conn = sqlite3.connect('users.db')\n# cursor = conn.cursor()\n\n# اطبع جملة Hacking DB...\n`,
        validate: (out) => out.includes("Hacking DB...")
      }
    ]
  },
  {
    chapter: "Chapter 24: Command Line Interfaces (CLI)",
    levels: [
      {
        id: "l53",
        title: "مدخلات التيرمينال (sys.argv)",
        theory: `<h1>Level 53: أدوات التيرمينال</h1>
          <p>الأدوات الاحترافية تُشغل من التيرمينال هكذا: <code>python tool.py 192.168.1.5</code>. نلتقط هذا الـ IP بـ <code>sys.argv[1]</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك القائمة الوهمية <code>sys_argv = ["script.py", "10.0.0.1"]</code>. اطبع التارجت (العنصر الثاني).</p>
          </div>`,
        initialCode: `sys_argv = ["script.py", "10.0.0.1"]\n\n# استخرج التارجت من القائمة واطبعه\n`,
        validate: (out) => out.includes("10.0.0.1")
      },
      {
        id: "l54",
        title: "صناعة أدوات احترافية (Argparse)",
        theory: `<h1>Level 54: الهاكر الأنيق</h1>
          <p>لعمل أداة بها <code>--help</code> و <code>-t target</code> مثل Sqlmap، نستخدم مكتبة <code>argparse</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لطباعة جملة: <code>Scanning Target: 127.0.0.1</code>.</p>
          </div>`,
        initialCode: `target = "127.0.0.1"\n# الكود الفعلي يستخدم parser.parse_args()\n\n# اطبع الجملة المطلوبة مدمجة مع التارجت\n`,
        validate: (out) => out.includes("Scanning Target: 127.0.0.1")
      }
    ]
  },
  {
    chapter: "Chapter 25: Memory & Binary Manipulation",
    levels: [
      {
        id: "l55",
        title: "العمليات الثنائية (Bitwise XOR)",
        theory: `<h1>Level 55: التشفير المعقد</h1>
          <p>الـ XOR (<code>^</code>) هو أساس التشفير في الفيروسات وتخطي الانتي فيرس. إذا دمجت رقم مع مفتاح مرتين، يعود لأصله.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك رقم <code>15</code> ومفتاح <code>7</code>. اطبع ناتج <code>15 ^ 7</code>.</p>
          </div>`,
        initialCode: `# اطبع ناتج عملية الـ XOR هنا\n`,
        validate: (out) => out.includes("8")
      },
      {
        id: "l56",
        title: "هندسة البايتات (Struct)",
        theory: `<h1>Level 56: ثغرات الـ Buffer Overflow</h1>
          <p>لإرسال عنوان ذاكرة (Memory Address) للتحكم بالسيرفر، يجب تحويله لـ Little Endian. نستخدم مكتبة <code>struct</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع النص الوهمي المحاكي <code>"\\xef\\xbe\\xad\\xde"</code> (يمثل 0xdeadbeef).</p>
          </div>`,
        initialCode: `# import struct\n# payload = struct.pack("<I", 0xdeadbeef)\n\n# اطبع النص الوهمي كما هو مطلوب\n`,
        validate: (out) => out.includes("\xef\xbe\xad\xde") || out.includes("\\xef\\xbe\\xad\\xde")
      }
    ]
  },
  {
    chapter: "Chapter 26: Anti-Forensics & Evasion",
    levels: [
      {
        id: "l57",
        title: "مسح السجلات (Clearing Logs)",
        theory: `<h1>Level 57: إخفاء الأثر</h1>
          <p>أول قاعدة بعد الاختراق: احذف سجلات الدخول لتجنب المحققين الرقميين (Forensics). نفتح الملف بوضع <code>'w'</code> لمسحه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>افتح ملف <code>auth.log</code> وضع بداخله نص فارغ <code>""</code> لتمسح محتواه، ثم اطبع <code>Logs Cleared!</code>.</p>
          </div>`,
        initialCode: `# امسح محتوى الملف ثم اطبع الرسالة\n`,
        validate: (out) => out.includes("Logs Cleared!")
      },
      {
        id: "l58",
        title: "تزييف الوقت (Timestomping)",
        theory: `<h1>Level 58: التلاعب بالزمن</h1>
          <p>المحقق سيعرف متى تم رفع ملف الاختراق. يمكننا استخدام <code>os.utime</code> لتغيير تاريخ الملف للماضي لتضليله.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الجملة <code>Timestomp executed!</code>.</p>
          </div>`,
        initialCode: `# محاكاة: os.utime("backdoor.py", (old_time, old_time))\n\n# اطبع رسالة النجاح\n`,
        validate: (out) => out.includes("Timestomp executed!")
      }
    ]
  },
  {
    chapter: "Chapter 27: The C2 Blueprint",
    levels: [
      {
        id: "l59",
        title: "إرسال النبضات (Beacons)",
        theory: `<h1>Level 59: فيروسات التحكم (C2)</h1>
          <p>فيروس الـ RAT يرسل "نبضة" (Beacon) كل 10 ثواني للسيرفر ليخبرك أنه ما زال حياً وجاهزاً للأوامر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الـ Loop الوهمي لكي يطبع <code>[+] I am alive</code> مرتين فقط ثم يتوقف.</p>
          </div>`,
        initialCode: `for i in range(2):\n    # اطبع الرسالة هنا\n    pass\n`,
        validate: (out) => out.includes("[+] I am alive") && out.split("[+] I am alive").length === 3
      },
      {
        id: "l60",
        title: "The Ghost in the Machine",
        theory: `<h1>Level 60: زعيم الهاكرز</h1>
          <p>لقد صمدت إلى المستوى 60. من سطر <code>print</code> بسيط إلى بناء وتشفير الفيروسات وأدوات التحكم (C2).</p>
          <p>أنت الآن لم تعد بشرياً برمجياً... أنت الشبح في الآلة. يمكنك بناء أي أداة تخطر على بالك لتدمير الأنظمة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الأحمر</div>
            <p>اطبع: <code>I AM THE GHOST IN THE MACHINE.</code></p>
          </div>`,
        initialCode: `# رسالة الوداع الأسطورية\n`,
        validate: (out) => out.includes("I AM THE GHOST IN THE MACHINE") || out.includes("GHOST")
      }
    ]
  }
];'''

if 'id: "l60"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 51-60 successfully!')
else:
    print('Levels already added.')
