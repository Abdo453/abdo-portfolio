import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 15: Cryptography Basics",
    levels: [
      {
        id: "l31",
        title: "التشفير بالـ Hashing",
        theory: `<h1>Level 31: بصمة البيانات (Hashing)</h1>
          <p>الهاش هو تحويل النص إلى سلسلة حروف وأرقام فريدة (مثل بصمة الإصبع) ولا يمكن عكسه. نستخدم مكتبة <code>hashlib</code> لفعل ذلك.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك النص <code>"admin"</code>. استخدم <code>hashlib.md5(text.encode()).hexdigest()</code> لطباعة الهاش الخاص به.</p>
          </div>`,
        initialCode: `import hashlib\n\ntext = "admin"\n\n# اطبع الهاش الخاص بكلمة admin باستخدام MD5\n`,
        validate: (out) => out.includes("21232f297a57a5a743894a0e4a801fc3")
      },
      {
        id: "l32",
        title: "تشفير Base64",
        theory: `<h1>Level 32: إخفاء البيانات (Base64)</h1>
          <p>تُستخدم Base64 كثيراً في الويب (مثل الـ Cookies والـ Auth). يمكنك تشفير أو فك تشفير النصوص باستخدام مكتبة <code>base64</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك نص مشفر <code>"aGFja2Vy"</code>. استخدم <code>base64.b64decode(encoded).decode()</code> لفك تشفيره وطباعته.</p>
          </div>`,
        initialCode: `import base64\n\nencoded = "aGFja2Vy"\n\n# فك التشفير واطبع النص الأصلي\n`,
        validate: (out) => out.includes("hacker") || out.includes("hacker".toLowerCase())
      },
      {
        id: "l33",
        title: "كسر التشفير (Brute-force)",
        theory: `<h1>Level 33: كسر الباسورد</h1>
          <p>لدينا هاش مسرب <code>e10adc3949ba59abbe56e057f20f883e</code> وكلمات سر محتملة. سنقوم بتشفير كل كلمة ومقارنتها بالهاش المسرب.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم حلقة <code>for</code> لتشفير كلمات السر في القائمة ومقارنتها بالهاش. إذا تطابقت، اطبع الكلمة السرية.</p>
          </div>`,
        initialCode: `import hashlib\n\ntarget_hash = "e10adc3949ba59abbe56e057f20f883e"\npasswords = ["12345", "123456", "admin", "password"]\n\n# ابحث عن الكلمة المتطابقة واطبعها\n`,
        validate: (out) => out.includes("123456") && !out.includes("admin")
      }
    ]
  },
  {
    chapter: "Chapter 16: Advanced Networking",
    levels: [
      {
        id: "l34",
        title: "العميل (TCP Client)",
        theory: `<h1>Level 34: التحدث بالـ Sockets</h1>
          <p>للتواصل مع أي سيرفر على مستوى منخفض، نستخدم <code>socket</code>. نقوم بإنشاء Socket، ثم الاتصال <code>connect((ip, port))</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اكتب كود يتصل بعنوان <code>"127.0.0.1"</code> ومنفذ <code>80</code>. إذا تم الاتصال بنجاح اطبع <code>Connected to Target!</code>.</p>
          </div>`,
        initialCode: `import socket\n\n# لقد قمنا بمحاكاة السيرفر لك في الخلفية\ndef connect_target():\n    # للتبسيط، اطبع رسالة النجاح مباشرة\n    print("Connected to Target!")\n\nconnect_target()\n`,
        validate: (out) => out.includes("Connected to Target!")
      },
      {
        id: "l35",
        title: "طلبات الويب المتقدمة (Requests)",
        theory: `<h1>Level 35: مكتبة Requests</h1>
          <p>المحترفون يستخدمون مكتبة <code>requests</code> لجلب صفحات الويب بسهولة. في Pyodide نستخدم <code>urllib.request</code> كبديل.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>باستخدام <code>urllib.request.urlopen</code>، اجلب رابط <code>https://httpbin.org/get</code>، واطبع حالة الرد <code>req.status</code>.</p>
          </div>`,
        initialCode: `import urllib.request\n\nurl = "https://httpbin.org/get"\n\n# اجلب الرابط واطبع الحالة (Status)\n`,
        validate: (out) => out.includes("200")
      }
    ]
  },
  {
    chapter: "Chapter 17: Web Exploitation Concepts",
    levels: [
      {
        id: "l36",
        title: "ترميز الروابط (URL Encoding)",
        theory: `<h1>Level 36: تخطي الفلاتر</h1>
          <p>الرموز مثل القوس أو المسافة تُحظر أحياناً في الروابط. الحل هو ترميزها. نستخدم <code>urllib.parse.quote()</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بترميز الـ Payload التالي: <code><script>alert(1)</script></code> واطبعه.</p>
          </div>`,
        initialCode: `import urllib.parse\n\npayload = "<script>alert(1)</script>"\n\n# قم بترميزه واطبعه\n`,
        validate: (out) => out.includes("%3Cscript%3Ealert%281%29%3C/script%3E") || out.includes("%3Cscript%3Ealert(1)%3C/script%3E")
      },
      {
        id: "l37",
        title: "صناعة بي لود (Payload Crafting)",
        theory: `<h1>Level 37: حقن قواعد البيانات</h1>
          <p>لصناعة Payload ديناميكي للـ SQL Injection، نستخدم المتغيرات ودمج النصوص (String Formatting).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك متغير <code>table = "users"</code>. اصنع متغير يحتوي على <code>SELECT * FROM users WHERE id=1 OR 1=1</code> باستخدام الدمج واطبعه.</p>
          </div>`,
        initialCode: `table = "users"\n\n# اصنع الـ Payload واطبعه\npayload = f""\n`,
        validate: (out) => out.includes("SELECT * FROM users WHERE id=1 OR 1=1")
      },
      {
        id: "l38",
        title: "استخراج البيانات (Regex Scraping)",
        theory: `<h1>Level 38: صيد التوكن (CSRF Token)</h1>
          <p>تحتاج الأداة أحياناً لسرقة توكن حماية من صفحة الويب لتستمر في الهجوم. نستخدم Regex للبحث داخل الـ HTML.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>re.search(r'value="(.*?)"', html)</code> لاستخراج قيمة التوكن <code>12345abc</code> وطباعته (باستخدام <code>.group(1)</code>).</p>
          </div>`,
        initialCode: `import re\n\nhtml = '<input type="hidden" name="csrf" value="12345abc">'\n\n# استخرج التوكن واطبعه\n`,
        validate: (out) => out.includes("12345abc")
      }
    ]
  },
  {
    chapter: "Chapter 18: The Ultimate Hacker Toolkit",
    levels: [
      {
        id: "l39",
        title: "المشروع المتكامل (Integration)",
        theory: `<h1>Level 39: الآلة الفتاكة</h1>
          <p>سنقوم بدمج كل شيء: 1. قراءة الهاشات من ملف. 2. كسر تشفيرها باستخدام قاموس. 3. استخراج البيانات المهمة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي الشامل</div>
            <p>الكود يحتوي على كلاس <code>Cracker</code> شبه جاهز. أكمل الكود لكي يطبع عبارة <code>Cracked: admin -> 21232f297a57a5a743894a0e4a801fc3</code>.</p>
          </div>`,
        initialCode: `class Cracker:\n    def __init__(self, target_hash):\n        self.target = target_hash\n    \n    def crack(self):\n        print(f"Cracked: admin -> {self.target}")\n\n# قم بتشغيل الكلاس هنا\nc = Cracker("21232f297a57a5a743894a0e4a801fc3")\n`,
        validate: (out) => out.includes("Cracked: admin -> 21232f297a57a5a743894a0e4a801fc3")
      },
      {
        id: "l40",
        title: "الختم الأسود (The Black Badge)",
        theory: `<h1>Level 40: أسطورة الأمن السيبراني</h1>
          <p>لقد أنجزت 40 مستوى، من كتابة كلمة <code>print</code> إلى التشفير، الشبكات، والبرمجة الكائنية.</p>
          <p>لقد حصلت على الشارة السوداء في برمجة الأمن السيبراني. انطلق الآن لبناء أدواتك الخاصة ورفعها على GitHub!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 المجد الأبدي</div>
            <p>اكتب سكريبت يطبع: <code>I Have Conquered Python!</code></p>
          </div>`,
        initialCode: `# شارة المجد لك!\n`,
        validate: (out) => out.includes("I Have Conquered Python!")
      }
    ]
  }
];'''

if 'id: "l40"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 31-40 successfully!')
else:
    print('Levels already added.')
