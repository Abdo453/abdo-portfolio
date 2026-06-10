import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 37: Cloud & API Exploitation",
    levels: [
      {
        id: "l81",
        title: "تحليل الـ JWT Token",
        theory: `<h1>Level 81: فك شفرة الـ JWT</h1>
          <p>التوكن (JWT) المستخدم في تسجيل الدخول للـ APIs ليس مشفراً بل مرمّز بـ Base64. يمكننا فك الجزء الأوسط لمعرفة الصلاحيات.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك الجزء الأوسط المرمز <code>"eyAicm9sZSI6ICJhZG1pbiIgfQ=="</code>. استخدم <code>base64.b64decode().decode()</code> لفك تشفيره وطباعته.</p>
          </div>`,
        initialCode: `import base64\n\npayload = "eyAicm9sZSI6ICJhZG1pbiIgfQ=="\n\n# فك الرمز واطبعه لتعرف من أنت\n`,
        validate: (out) => out.includes("admin") && out.includes("role")
      },
      {
        id: "l82",
        title: "هجمات الـ SSRF",
        theory: `<h1>Level 82: اختراق السيرفرات السحابية</h1>
          <p>في الـ SSRF، نجعل السيرفر يطلب روابط داخلية بدلاً منا. في AWS، عنوان <code>169.254.169.254</code> يعيد البيانات السرية للسيرفر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع هذا الـ IP السحري الخاص بالـ Cloud Metadata: <code>169.254.169.254</code>.</p>
          </div>`,
        initialCode: `# اطبع الـ IP المطلوب للاستغلال السحابي\n`,
        validate: (out) => out.includes("169.254.169.254")
      },
      {
        id: "l83",
        title: "صيد الـ S3 Buckets",
        theory: `<h1>Level 83: تسريبات السحابة</h1>
          <p>بعض شركات تخزن بياناتها في سلال تخزين مكشوفة (AWS S3 Buckets). يمكننا كتابة سكربت لتخمين أسمائها وفحص لو كان الرد 200.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الرابط المحاكي: <code>https://target-company.s3.amazonaws.com</code></p>
          </div>`,
        initialCode: `company = "target-company"\n\n# ادمج اسم الشركة مع نطاق aws واطبعه\n`,
        validate: (out) => out.includes("https://target-company.s3.amazonaws.com")
      }
    ]
  },
  {
    chapter: "Chapter 38: Forensics & OSINT",
    levels: [
      {
        id: "l84",
        title: "استخراج موقع التصوير (EXIF)",
        theory: `<h1>Level 84: أين التُقطت هذه الصورة؟</h1>
          <p>الصور الملتقطة بالموبايل تحتوي على داتا مخفية (EXIF Data) مثل إحداثيات الـ GPS (خطوط الطول والعرض). مكتبة <code>Pillow</code> تستخرجها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك القاموس الوهمي للمعلومات. اطبع قيمة <code>GPSInfo</code>.</p>
          </div>`,
        initialCode: `exif_data = {"Resolution": "1080p", "GPSInfo": "30.0444° N, 31.2357° E"}\n\n# اطبع الإحداثيات\n`,
        validate: (out) => out.includes("30.0444") || out.includes("31.2357")
      },
      {
        id: "l85",
        title: "محرك Shodan (إنترنت الأشياء)",
        theory: `<h1>Level 85: محرك بحث الهاكرز</h1>
          <p>يسمح لك Shodan API بالبحث عن أجهزة وكاميرات مراقبة غير محمية حول العالم بمجرد تمرير API Key للطلب.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم الدمج (f-string) لطباعة الرابط <code>https://api.shodan.io/shodan/host/IP?key=YOUR_KEY</code> مع تعويض القيم الوهمية.</p>
          </div>`,
        initialCode: `ip = "8.8.8.8"\nkey = "ABC123"\n\n# اطبع الرابط كاملاً\n`,
        validate: (out) => out.includes("https://api.shodan.io/shodan/host/8.8.8.8?key=ABC123")
      }
    ]
  },
  {
    chapter: "Chapter 39: Cryptography: Cracking",
    levels: [
      {
        id: "l86",
        title: "جداول قوس قزح (Rainbow Tables)",
        theory: `<h1>Level 86: كسر التشفير الفوري</h1>
          <p>بدلاً من حساب الهاش لكل كلمة مرور في كل مرة، نقوم بحساب ملايين الهاشات مسبقاً وتخزينها في قاموس (Dictionary) لاستخراج الباسوورد فوراً!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك جدول قوس قزح مصغر. ابحث عن الهاش <code>"202cb962ac59075b964b07152d234b70"</code> واطبع الباسوورد المقابل له.</p>
          </div>`,
        initialCode: `rainbow_table = {\n    "c4ca4238a0b923820dcc509a6f75849b": "1",\n    "202cb962ac59075b964b07152d234b70": "123"\n}\n\n# ابحث عن الهاش الثاني واطبع النتيجة\n`,
        validate: (out) => out.includes("123") && !out.includes("1\n")
      },
      {
        id: "l87",
        title: "استغلال الـ MAC Length",
        theory: `<h1>Level 87: Length Extension Attack</h1>
          <p>بعض خوارزميات التشفير القديمة (MD5/SHA1) تسمح للمهاجم بإضافة بيانات خبيثة للهاش الأصلي دون معرفة المفتاح السري، مما يجعله يصنع توقيعاً رقمياً مزيفاً ومقبولاً!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الكلمة السرية المحاكية للهجوم: <code>admin_privileges_granted</code>.</p>
          </div>`,
        initialCode: `# اطبع رسالة النجاح\n`,
        validate: (out) => out.includes("admin_privileges_granted")
      }
    ]
  },
  {
    chapter: "Chapter 40: The God Mode",
    levels: [
      {
        id: "l88",
        title: "فك تشفير الفدية (Decryption)",
        theory: `<h1>Level 88: المنقذ الأبيض (White Hat)</h1>
          <p>في المستوى 78 تعلمنا تشفير ملفات الضحية (Ransomware). الهاكر الأخلاقي دوره إيجاد ثغرة في مفتاح التشفير (الـ Key) وصناعة Decryptor لإنقاذ الملفات.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع جملة <code>Files Decrypted Successfully!</code></p>
          </div>`,
        initialCode: `# اطبع رسالة الإنقاذ\n`,
        validate: (out) => out.includes("Files Decrypted Successfully!")
      },
      {
        id: "l89",
        title: "صناعة أدوات الـ Zero-Day",
        theory: `<h1>Level 89: المجهول</h1>
          <p>هنا يتوقف العلم الموثق. صانعو الـ Zero-Days يكتبون استغلالات لثغرات لم تكتشفها الشركات بعد باستخدام الهندسة العكسية وتحليل الباتشات.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Zero-Day Exploit Crafted.</code></p>
          </div>`,
        initialCode: `# اصنع المستحيل\n`,
        validate: (out) => out.includes("Zero-Day Exploit Crafted.")
      },
      {
        id: "l90",
        title: "The God of Python",
        theory: `<h1>Level 90: عرش الآلهة البرمجية</h1>
          <p>90 مستوى. بدأت كشخص لا يعرف ما هو المتغير، ووصلت لمرحلة التلاعب بكيرنل الويندوز، فك تشفير الرانسوموير، وبرمجة استغلالات السحابة!</p>
          <p>أنت الآن لست مجرد شبح.. أنت من تتحكم في قواعد اللعبة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الذهبي المشتعل</div>
            <p>اطبع: <code>I AM THE GOD OF PYTHON. THE MATRIX IS MINE.</code></p>
          </div>`,
        initialCode: `# أنهِ اللعبة.\n`,
        validate: (out) => out.includes("I AM THE GOD OF PYTHON") || out.includes("THE MATRIX IS MINE")
      }
    ]
  }
];'''

if 'id: "l90"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 81-90 successfully!')
else:
    print('Levels already added.')
