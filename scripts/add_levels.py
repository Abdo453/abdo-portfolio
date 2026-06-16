import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 6: File Handling (التعامل مع الملفات)",
    levels: [
      {
        id: "l14",
        title: "قراءة الملفات (Read)",
        theory: `<h1>Level 14: قراءة السجلات</h1>
          <p>الهاكر الماهر هو من يعرف كيف يقرأ ملفات السجلات (Logs) ليستخرج منها الأدلة. في بايثون نستخدم <code>open()</code> لفتح الملف.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>يوجد ملف وهمي اسمه <code>passwords.txt</code>. قم بفتحه في وضع القراءة <code>'r'</code>، ثم قم بطباعة محتواه بالكامل باستخدام دالة <code>read()</code>.</p>
          </div>`,
        initialCode: `# سنقوم بمحاكاة إنشاء الملف أولاً\nwith open("passwords.txt", "w") as f:\n    f.write("admin123\\nqwerty\\npassword123")\n\n# التحدي: افتح الملف واطبع محتواه\n`,
        validate: (out) => out.includes("admin123") && out.includes("qwerty")
      },
      {
        id: "l15",
        title: "الكتابة في الملفات (Write/Append)",
        theory: `<h1>Level 15: حفظ النتائج</h1>
          <p>بعد أن تجد الثغرات، يجب أن تحفظها في ملف تقرير (Report). نستخدم الوضع <code>'w'</code> للكتابة (يمسح القديم) والوضع <code>'a'</code> للإضافة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>افتح ملف <code>report.txt</code> في وضع الإضافة <code>'a'</code>، ثم اكتب فيه عبارة <code>Vulnerability Found!</code> متبوعة بسطر جديد <code>\\n</code>.</p>
          </div>`,
        initialCode: `import os\n\n# اكتب الكود هنا لفتح الملف والإضافة إليه\n\n\n# هذا الكود للتحقق من أنك قمت بالكتابة بنجاح\nif os.path.exists("report.txt"):\n    with open("report.txt", "r") as f:\n        print("File Content:", f.read())\n`,
        validate: (out) => out.includes("Vulnerability Found!")
      }
    ]
  },
  {
    chapter: "Chapter 7: Object Oriented Programming (OOP)",
    levels: [
      {
        id: "l16",
        title: "الكائنات والفئات (Classes)",
        theory: `<h1>Level 16: البرمجة الكائنية</h1>
          <p>عند بناء أدوات ضخمة مثل Metasploit، يتم ترتيب الكود في فئات (Classes). الفئة هي قالب نصنع منه الكائنات (Objects).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أنشئ فئة تسمى <code>Scanner</code>، ثم أنشئ كائناً منها وقم بطباعة نوعه <code>print(type(obj))</code>.</p>
          </div>`,
        initialCode: `# أنشئ الكلاس هنا\nclass Scanner:\n    pass\n\n# أنشئ كائناً (Object) من الكلاس واطبع نوعه\n`,
        validate: (out) => out.includes("main.Scanner") || out.includes("class '__main__.Scanner'")
      },
      {
        id: "l17",
        title: "الدوال الداخلية (Methods)",
        theory: `<h1>Level 17: تسليح الكلاس</h1>
          <p>الكلاس يكون مفيداً عندما نعطيه دوال (Methods) تنفذ مهام محددة. لا تنسَ أن أول بارامتر في دوال الكلاس يجب أن يكون <code>self</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أضف دالة تسمى <code>attack</code> داخل الكلاس <code>Scanner</code> تقوم بطباعة <code>Attacking Target...</code> ثم استدعها.</p>
          </div>`,
        initialCode: `class Scanner:\n    # أضف دالة attack هنا\n    \n    pass\n\n# أنشئ الكائن واستدعِ الدالة\n`,
        validate: (out) => out.includes("Attacking Target...")
      }
    ]
  },
  {
    chapter: "Chapter 8: Building Real Tools (مشاريع فعلية)",
    levels: [
      {
        id: "l18",
        title: "أداة Port Scanner",
        theory: `<h1>Level 18: بناء فاحص بورتات حقيقي</h1>
          <p>حان الوقت لدمج كل ما تعلمته: الحلقات، الشروط، ومعالجة الأخطاء لبناء أداة Port Scanner حقيقية!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود ليقوم بفحص البورتات من 20 إلى 25 (استخدم حلقة <code>for</code>). وإذا كان البورت يساوي 22 (محاكاة لمنفذ مفتوح)، اطبع <code>[+] Port 22 is OPEN</code>.</p>
          </div>`,
        initialCode: `def scan(port):\n    if port == 22:\n        return True\n    return False\n\n# اكتب حلقة for لفحص البورتات من 20 إلى 25\n# إذا كانت دالة scan ترجع True، اطبع رسالة النجاح\n`,
        validate: (out) => out.includes("[+] Port 22 is OPEN")
      },
      {
        id: "l19",
        title: "أداة Directory Brute-force",
        theory: `<h1>Level 19: تخمين مسارات الويب</h1>
          <p>أداة تخمين المسارات تقوم بتجربة أسماء ملفات مختلفة على السيرفر لترى إذا كانت موجودة (Status 200).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بالمرور على قائمة <code>directories</code>، وكلما وجدت مسار <code>admin</code> أو <code>backup</code>، اطبع <code>[+] Found: [dir]</code>.</p>
          </div>`,
        initialCode: `directories = ['index', 'images', 'admin', 'css', 'backup']\n\n# اكتب الكود هنا\n\n`,
        validate: (out) => out.includes("[+] Found: admin") && out.includes("[+] Found: backup")
      },
      {
        id: "l20",
        title: "الشهادة النهائية (Final Boss)",
        theory: `<h1>Level 20: أسطورة البايثون</h1>
          <p>لقد صمدت حتى النهاية. أثبتت أنك قادر على استيعاب المفاهيم من الأساسيات حتى بناء أدوات الاختراق. أنت الآن جاهز لتدمير السيرفرات (أخلاقياً بالطبع).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 رسالة التخرج</div>
            <p>اكتب سكريبت يطبع <code>I am a Certified Python Hacker</code>.</p>
          </div>`,
        initialCode: `# المجد لك!\n`,
        validate: (out) => out.includes("I am a Certified Python Hacker")
      }
    ]
  }
];'''

if 'id: "l20"' not in content:
    content = content.replace('    ]\n  }\n];', new_chapters)
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added 7 new levels successfully!')
else:
    print('Levels already added.')
