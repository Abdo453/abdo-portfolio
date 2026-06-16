import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 9: Advanced Data & Comprehensions",
    levels: [
      {
        id: "l21",
        title: "اختصار القوائم (List Comprehension)",
        theory: `<h1>Level 21: السرعة والاحتراف</h1>
          <p>المحترفون لا يكتبون 3 أسطر لعمل حلقة <code>for</code> بسيطة لإضافة عناصر في قائمة. يستخدمون سطر واحد يسمى <em>List Comprehension</em>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قائمة أرقام <code>ports = [80, 443, 22]</code>. استخدم اختصار القوائم لإنشاء قائمة جديدة <code>string_ports</code> تحتوي على نفس الأرقام ولكن كنصوص (استخدم <code>str(p)</code>)، ثم اطبع القائمة الجديدة.</p>
          </div>`,
        initialCode: `ports = [80, 443, 22]\n\n# أنشئ القائمة الجديدة في سطر واحد واطبعها\nstring_ports = [str(p) for p in ports]\nprint(string_ports)\n`,
        validate: (out) => out.includes("['80', '443', '22']") || out.includes("['80', '443', '22']".replace(/'/g, '"'))
      },
      {
        id: "l22",
        title: "المجموعات (Sets)",
        theory: `<h1>Level 22: تدمير التكرار</h1>
          <p>أثناء جمع العناوين (Reconnaissance)، قد تجد عنوان IP متكرر 100 مرة. الـ <code>Set</code> هي تركيبة بيانات تشبه القائمة ولكنها <strong>تمنع التكرار نهائياً</strong>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قائمة <code>ips = ["10.0.0.1", "10.0.0.1", "192.168.1.5"]</code>. قم بتحويلها إلى Set لضمان إزالة التكرار، ثم اطبعها.</p>
          </div>`,
        initialCode: `ips = ["10.0.0.1", "10.0.0.1", "192.168.1.5"]\n\n# حول القائمة إلى set واطبعها\n`,
        validate: (out) => out.includes("10.0.0.1") && out.includes("192.168.1.5") && out.split("10.0.0.1").length === 2
      }
    ]
  },
  {
    chapter: "Chapter 10: Advanced Functions",
    levels: [
      {
        id: "l23",
        title: "البارامترات اللانهائية (*args)",
        theory: `<h1>Level 23: استدعاء بلا حدود</h1>
          <p>ماذا لو أردت دالة تقبل أي عدد من البورتات لفحصها بدون أن تحدد العدد مسبقاً؟ نستخدم <code>*args</code> الذي يجمع المتغيرات في (Tuple).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بإنشاء دالة <code>scan_all(*ports)</code> تقوم بطباعة البورتات الممررة لها، ثم استدعها ممرراً الأرقام <code>21, 22, 80</code>.</p>
          </div>`,
        initialCode: `# أنشئ الدالة هنا\ndef scan_all(*ports):\n    pass\n\n# استدعِ الدالة\n`,
        validate: (out) => out.includes("21") && out.includes("22") && out.includes("80")
      },
      {
        id: "l24",
        title: "الدوال المجهولة (Lambda)",
        theory: `<h1>Level 24: دوال السطر الواحد</h1>
          <p>أحياناً تحتاج لدالة صغيرة جداً تُستخدم لمرة واحدة. هنا تتدخل الـ <code>lambda</code>. تُستخدم بكثرة في ترتيب البيانات المتقدم.</p>
          <p>مثال: <code>double = lambda x: x * 2</code></p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أنشئ دالة <code>lambda</code> تسمى <code>is_open</code> تأخذ متغيراً <code>port</code> وترجع <code>True</code> إذا كان 80، واطبع نتيجتها عند تمرير 80.</p>
          </div>`,
        initialCode: `# اكتب دالة اللامدا هنا\n\n\n# اطبع نتيجتها مع الرقم 80\n`,
        validate: (out) => out.includes("True")
      }
    ]
  },
  {
    chapter: "Chapter 11: Error Handling Mastery",
    levels: [
      {
        id: "l25",
        title: "رمي الأخطاء (Raise)",
        theory: `<h1>Level 25: اصنع خطأك بنفسك</h1>
          <p>ليس كل الأخطاء برمجية. ماذا لو أدخل المستخدم عنوان IP خطأ؟ يجب أن توقف السكربت وترمي خطأ بيدك باستخدام <code>raise Exception</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اكتب كود يتحقق: إذا كان <code>target == ""</code>، قم برمى خطأ (Raise) باستخدام <code>Exception("No Target Given")</code>.</p>
          </div>`,
        initialCode: `target = ""\n\n# تحقق من المتغير، وارمِ الخطأ هنا\n`,
        validate: (out) => out.includes("No Target Given") || out.includes("Exception")
      },
      {
        id: "l26",
        title: "التنظيف الإجباري (Finally)",
        theory: `<h1>Level 26: ترك مسرح الجريمة نظيفاً</h1>
          <p>بعد اختراق سيرفر (أو فتح ملف/اتصال)، يجب أن تغلقه حتى لو حدث خطأ أدى لانهيار السكربت. بلوك <code>finally</code> يعمل <strong>دائماً</strong> بغض النظر عن الأخطاء.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك <code>try/except</code>. أضف بلوك <code>finally</code> يطبع عبارة <code>Connection Closed.</code>.</p>
          </div>`,
        initialCode: `try:\n    print("Connecting...")\n    x = 1 / 0  # خطأ متعمد\nexcept:\n    print("Error Occurred")\n# أضف finally هنا\n`,
        validate: (out) => out.includes("Connection Closed.")
      }
    ]
  },
  {
    chapter: "Chapter 12: APIs & Network",
    levels: [
      {
        id: "l27",
        title: "تحليل الجيسون (JSON Parsing)",
        theory: `<h1>Level 27: لغة الويب العالمية</h1>
          <p>السيرفرات تتحدث ببيانات بصيغة JSON. مكتبة <code>json</code> في بايثون تحول هذا النص إلى قاموس (Dictionary) يسهل التعامل معه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك نص <code>response</code>. استخدم <code>json.loads(response)</code> لتحويله إلى قاموس، ثم اطبع قيمة <code>"status"</code>.</p>
          </div>`,
        initialCode: `import json\n\nresponse = '{"ip": "8.8.8.8", "status": "active"}'\n\n# حول النص واطبع الحالة\n`,
        validate: (out) => out.includes("active")
      }
    ]
  },
  {
    chapter: "Chapter 13: System & Subprocesses",
    levels: [
      {
        id: "l28",
        title: "تنفيذ أوامر النظام (OS Commands)",
        theory: `<h1>Level 28: السيطرة على النظام</h1>
          <p>كهاكر، ستحتاج أن يجعل بايثون ينفذ أوامر تيرمينال (مثل ls, ping, nmap) نيابة عنك. نستخدم مكتبة <code>os</code> أو <code>subprocess</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم الدالة <code>os.system()</code> لتنفيذ أمر الطباعة الوهمي <code>echo "Hacked by Python"</code>.</p>
          </div>`,
        initialCode: `import os\n\n# نفذ الأمر هنا باستخدام os.system\n`,
        validate: (out) => out.includes("Hacked by Python") || out.includes("0")
      }
    ]
  },
  {
    chapter: "Chapter 14: The Grand Master Project",
    levels: [
      {
        id: "l29",
        title: "مشروع Web Vulnerability Scanner",
        theory: `<h1>Level 29: الزعيم الأعظم</h1>
          <p>هذا هو الاختبار النهائي. ستبني هيكل أداة فحص ثغرات ويب متقدمة تستخدم الـ Classes لمعالجة الأهداف وفحصها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي النهائي</div>
            <p>أكمل الكلاس <code>WebScanner</code>. أضف دالة <code>scan(self)</code> تطبع رسالة <code>Scanning [target] for XSS...</code>. ثم استدعها.</p>
          </div>`,
        initialCode: `class WebScanner:\n    def __init__(self, target):\n        self.target = target\n        \n    # أضف دالة scan هنا\n\n\n# أنشئ كائناً للهدف http://site.com واستدعِ scan\n`,
        validate: (out) => out.includes("Scanning http://site.com for XSS...")
      },
      {
        id: "l30",
        title: "الوداع والختام",
        theory: `<h1>Level 30: التتويج الأسطوري</h1>
          <p>من سطر كود بسيط <code>print</code> إلى بناء أدوات احترافية باستخدام الـ OOP وفهم كل سطر في أدوات الهاكرز.</p>
          <p>أنت الآن لم تعد مجرد "Script Kiddie" ينسخ الأكواد.. أنت الآن <strong>Python Security Engineer</strong>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 رسالة النصر</div>
            <p>اكتب سكريبت يطبع <code>I am Abdo, The Grand Python Master!</code></p>
          </div>`,
        initialCode: `# المكان مكانك.. اختمها بأسلوبك!\n`,
        validate: (out) => out.includes("I am Abdo, The Grand Python Master!") || out.includes("Master")
      }
    ]
  }
];'''

if 'id: "l30"' not in content:
    target = '    ]\n  }\n];'
    # We replace "];" with new_chapters string which has "];" at the end.
    # But new_chapters starts with "  },\n  {\n"
    # So if we replace "];" with new_chapters, it becomes:
    #     ]
    #   }
    #   },
    #   {
    # We need to replace "];" with new_chapters but new_chapters ALREADY has the "  }," at the beginning.
    # Wait, the string in the file ends with:
    #     ]
    #   }
    # ];
    # If we replace "];" with "\n" + new_chapters, we get:
    #     ]
    #   }
    # 
    #   },
    #   {
    # We SHOULD just replace "  }\n];" with new_chapters!
    # Because new_chapters starts with "  },"
    
    # Let's replace "    ]\n  }\n];" with "    ]\n" + new_chapters
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 21-30 successfully!')
else:
    print('Levels already added.')
