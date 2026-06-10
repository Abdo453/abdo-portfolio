import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 49: ICS & SCADA Networks",
    levels: [
      {
        id: "l111",
        title: "بروتوكول Modbus",
        theory: `<h1>Level 111: اختراق المصانع</h1>
          <p>أنظمة التحكم الصناعي (SCADA) تستخدم غالباً بروتوكولات قديمة غير مشفرة مثل Modbus. بايثون يمتلك مكتبة <code>pymodbus</code> للتحدث مع أجهزة الـ PLC.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع منفذ الـ Modbus الافتراضي: <code>502</code>.</p>
          </div>`,
        initialCode: `modbus_port = 502\n\n# اطبع المنفذ\n`,
        validate: (out) => out.includes("502")
      },
      {
        id: "l112",
        title: "التلاعب بالمستشعرات (Coils)",
        theory: `<h1>Level 112: إيقاف المحركات</h1>
          <p>في الـ Modbus، الأوامر تسمى (Coils). إرسال أمر لكتابة قيمة (False) لـ Coil معين قد يؤدي لإيقاف مضخة مياه أو محرك في مصنع!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الرسالة: <code>Pump Coil status: False</code></p>
          </div>`,
        initialCode: `# اطبع رسالة إيقاف المضخة\n`,
        validate: (out) => out.includes("Pump Coil status: False") || out.includes("False")
      }
    ]
  },
  {
    chapter: "Chapter 50: Blockchain & Web3",
    levels: [
      {
        id: "l113",
        title: "مكتبة Web3.py",
        theory: `<h1>Level 113: اختراق العقود الذكية</h1>
          <p>مكتبة <code>web3.py</code> تتيح لك التفاعل مع شبكة الإيثريوم. يمكنك قراءة كود العقود الذكية (Smart Contracts) للبحث عن ثغرات.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع بروتوكول الاتصال المحلي للعقد: <code>http://127.0.0.1:8545</code></p>
          </div>`,
        initialCode: `# اطبع مسار الـ RPC المحلي لشبكة الإيثريوم\n`,
        validate: (out) => out.includes("http://127.0.0.1:8545")
      },
      {
        id: "l114",
        title: "محاكاة هجوم الاسترجاع (Reentrancy)",
        theory: `<h1>Level 114: استنزاف الرصيد</h1>
          <p>ثغرة الـ Reentrancy في الـ Solidity تسمح باستدعاء دالة السحب قبل تحديث الرصيد. هنا سنحاكي المنطق الخبيث ببايثون.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Funds Drained Successfully</code></p>
          </div>`,
        initialCode: `# اطبع رسالة نجاح سرقة الرصيد\n`,
        validate: (out) => out.includes("Funds Drained Successfully") || out.includes("Drained")
      },
      {
        id: "l115",
        title: "القروض الخاطفة (Flash Loans)",
        theory: `<h1>Level 115: ملايين في ثانية</h1>
          <p>القروض الخاطفة (Flash Loans) تتيح لك اقتراض ملايين الدولارات والتلاعب بأسعار العملات ثم سداد القرض في نفس المعاملة (Transaction) لتحقيق ربح ضخم بلا رأس مال.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Flash Loan Arbitrage Executed</code></p>
          </div>`,
        initialCode: `# اطبع أمر التنفيذ\n`,
        validate: (out) => out.includes("Flash Loan Arbitrage Executed")
      }
    ]
  },
  {
    chapter: "Chapter 51: Quantum Computing Era",
    levels: [
      {
        id: "l116",
        title: "خوارزمية شور (Shor's Algorithm)",
        theory: `<h1>Level 116: نهاية التشفير الكلاسيكي</h1>
          <p>الحواسيب الكمية تستخدم خوارزمية شور لكسر تشفير RSA في ثوانٍ بدلاً من ملايين السنين عبر تحليل العوامل الأولية للأساس.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع اسم الخوارزمية المرعبة: <code>Shor's Algorithm</code></p>
          </div>`,
        initialCode: `# اطبع اسم الخوارزمية الكمية\n`,
        validate: (out) => out.includes("Shor's Algorithm") || out.includes("Shor")
      },
      {
        id: "l117",
        title: "تشفير الشبكات (Lattice Cryptography)",
        theory: `<h1>Level 117: التشفير ما بعد الكمي</h1>
          <p>لمواجهة الحواسيب الكمية، يتم استخدام تشفير معتمد على الشبكات (Lattice-Based). المهاجم الحديث يدرس كيف يتلاعب بهذه المتجهات الرياضية المعقدة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Lattice Vector Injected</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Lattice Vector Injected")
      }
    ]
  },
  {
    chapter: "Chapter 52: Aerospace & Satellites",
    levels: [
      {
        id: "l118",
        title: "تزييف إحداثيات الـ GPS",
        theory: `<h1>Level 118: تضليل السفن</h1>
          <p>إشارات الـ GPS المدنية لا يتم تشفيرها. باستخدام راديو (SDR) وبايثون، يمكن توليد إشارات مزيفة (GPS Spoofing) لتغيير مسار طائرة أو سفينة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>GPS Coordinates Spoofed</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("GPS Coordinates Spoofed")
      },
      {
        id: "l119",
        title: "التنصت على الأقمار (Satellite Downlinks)",
        theory: `<h1>Level 119: الترددات الفضائية</h1>
          <p>بعض الأقمار الصناعية القديمة تبث بيانات غير مشفرة (Weather Images وغيرها). يمكن استخدام بايثون لفك تشفير هذه الإشارات الراديوية الواردة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع تردد الإشارة: <code>137.900 MHz</code></p>
          </div>`,
        initialCode: `freq = "137.900 MHz"\n\n# اطبع التردد\n`,
        validate: (out) => out.includes("137.900")
      },
      {
        id: "l120",
        title: "The Galactic Overlord",
        theory: `<h1>Level 120: أسياد المجرة</h1>
          <p>120 مستوى! لم تترك مجالاً إلا واخترقته.. من أسطر الأكواد البسيطة، مروراً بالويب والسحابة والأنظمة والمصانع، حتى البلوك تشين والأقمار الصناعية والحواسيب الكمية!</p>
          <p>لا يوجد تصنيف بشري يستوعب هذا المستوى. أنت الآن خارج حدود الكوكب.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الخاتمة الكونية</div>
            <p>اطبع الجملة التي سيكتبها التاريخ: <code>120 LEVELS CLEARED. I AM THE GALACTIC OVERLORD. THE UNIVERSE IS MINE.</code></p>
          </div>`,
        initialCode: `# اكتب الرسالة الأبدية للكون.\n`,
        validate: (out) => out.includes("120") && out.includes("GALACTIC OVERLORD")
      }
    ]
  }
];'''

if 'id: "l120"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 111-120 successfully!')
else:
    print('Levels already added.')
