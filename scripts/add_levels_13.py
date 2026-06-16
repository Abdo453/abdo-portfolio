import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 57: Decentralized Botnets",
    levels: [
      {
        id: "l131",
        title: "شبكات البوتنت اللامركزية (P2P)",
        theory: `<h1>Level 131: جيوش الزومبي</h1>
          <p>بدلاً من سيرفر C2 مركزي يمكن إغلاقه، الهاكرز المتقدمون يبنون بوتنت تعتمد على شبكات الند-للند (P2P)، حيث يتواصل كل جهاز مصاب مع الأجهزة الأخرى مباشرة لنقل الأوامر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع مسار الاتصال اللامركزي: <code>P2P Node Broadcast: EXECUTE DDOS</code>.</p>
          </div>`,
        initialCode: `# اطبع أمر البث لشبكة البوتنت\n`,
        validate: (out) => out.includes("P2P Node") && out.includes("DDOS")
      },
      {
        id: "l132",
        title: "خوارزمية توليد النطاقات (DGA)",
        theory: `<h1>Level 132: النطاقات المتغيرة</h1>
          <p>تقنية DGA (Domain Generation Algorithm) تجعل الفيروس يولد آلاف الدومينات العشوائية يومياً للاتصال بالسيرفر، مما يستحيل على الـ Antivirus حظرها كلها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع النطاق العشوائي المولد: <code>Generated Domain: xkcdfqw.com</code></p>
          </div>`,
        initialCode: `# اطبع الدومين العشوائي\n`,
        validate: (out) => out.includes("Generated Domain") && out.includes(".com")
      },
      {
        id: "l133",
        title: "سيرفرات البلوك تشين (Blockchain C2)",
        theory: `<h1>Level 133: سيرفرات لا تُقهر</h1>
          <p>أحدث تقنيات الـ Malware هي قراءة الأوامر من المعاملات على شبكة الإيثريوم. لا يمكن لأي دولة أو حكومة إغلاق عقد ذكي (Smart Contract)!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Command fetched from Ethereum Block: 1850493</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة التأكيدية لقراءة الأمر\n`,
        validate: (out) => out.includes("Command fetched") && out.includes("Ethereum")
      }
    ]
  },
  {
    chapter: "Chapter 58: Hypervisor & Container Escapes",
    levels: [
      {
        id: "l134",
        title: "اكتشاف بيئة التحليل (VM Detection)",
        theory: `<h1>Level 134: الفيروس الحذر</h1>
          <p>الفيروس الذكي يرفض العمل إذا كان داخل بيئة وهمية (VMware/VirtualBox) عن طريق قراءة معلومات المعالج (CPUID) أو البحث عن ملفات معينة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع رسالة الهروب: <code>Virtual Machine Detected. Sleeping...</code></p>
          </div>`,
        initialCode: `# اطبع رسالة اكتشاف البيئة الوهمية\n`,
        validate: (out) => out.includes("Virtual Machine Detected") || out.includes("Sleeping")
      },
      {
        id: "l135",
        title: "الهروب من الحاويات (Docker Escape)",
        theory: `<h1>Level 135: اختراق الدوكر</h1>
          <p>الأنظمة الحديثة تُشغّل التطبيقات داخل حاويات (Containers). إذا كانت الحاوية تعمل بصلاحيات (Privileged)، يمكن للمهاجم استغلال Cgroups للهروب إلى نظام التشغيل المضيف (Host OS).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع أمر الهروب: <code>Root Shell dropped on Host OS</code></p>
          </div>`,
        initialCode: `# اطبع رسالة النجاح في الهروب\n`,
        validate: (out) => out.includes("Host OS") && out.includes("Root Shell")
      }
    ]
  },
  {
    chapter: "Chapter 59: Cryptoeconomic Exploitation",
    levels: [
      {
        id: "l136",
        title: "روبوتات الاستباق (MEV Bots)",
        theory: `<h1>Level 136: قناصة الـ Mempool</h1>
          <p>في البلوك تشين، المعاملات تنتظر في الـ Mempool قبل تأكيدها. يمكنك برمجة بوت يراقب هذه المعاملات، ويدفع رسوم غاز أعلى (Gas) لتنفيذ معاملتك قبل الضحية (Front-Running) وسرقة الأرباح!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Transaction Front-Runned. Profit: 10 ETH</code></p>
          </div>`,
        initialCode: `# اطبع رسالة نجاح القنص\n`,
        validate: (out) => out.includes("Front-Runned") && out.includes("ETH")
      },
      {
        id: "l137",
        title: "التلاعب بالمراصد (Oracle Manipulation)",
        theory: `<h1>Level 137: تزييف الأسعار</h1>
          <p>الـ DeFi (التمويل اللامركزي) يعتمد على مراصد (Oracles) لمعرفة أسعار العملات. التلاعب بهذا المرصد برمجياً يسمح لك بشراء عملات بملايين الدولارات مقابل سنتات قليلة!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Oracle Price Spoofed. Market Crashed.</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Oracle Price Spoofed")
      }
    ]
  },
  {
    chapter: "Chapter 60: The Grand Architect",
    levels: [
      {
        id: "l138",
        title: "شفرة المصدر للواقع (Source Code of Reality)",
        theory: `<h1>Level 138: ما وراء الشفرة</h1>
          <p>كل الأنظمة تتشارك في لغة الآلة الأساسية. لقد وصلت لمرحلة ترى فيها المصفوفة كتيار من البايتات (Bytes)، ويمكنك إعادة كتابة قوانينها الرياضية.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Reality.sys rewritten.</code></p>
          </div>`,
        initialCode: `# اطبع إعلان التغيير الجذري\n`,
        validate: (out) => out.includes("Reality.sys")
      },
      {
        id: "l139",
        title: "تجاوز الأبعاد (Dimensional Escape)",
        theory: `<h1>Level 139: كسر الجدار الرابع</h1>
          <p>لقد أدركت أنك لست مجرد مبرمج... أنت الكيان الذي يعطي للمحرر معناه. لولا أوامرك، لكانت هذه الشاشة سوداء. أنت تتحكم فينا نحن.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Breaking the 4th Wall</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("4th Wall") || out.includes("Wall")
      },
      {
        id: "l140",
        title: "Transcendence",
        theory: `<h1>Level 140: مرحلة التسامي (Transcendence)</h1>
          <p>140 مستوى. هذا الرقم لم يبلغه بشر من قبل في هذا المنهج. لقد تجاوزت كل تصنيفات المخترقين ومهندسي الأنظمة. أنت الآن "المهندس الأعظم".</p>
          <p>رحلتك من طباعة Hello Hacker في المستوى الأول، إلى التلاعب بالزمن واقتصاد البلوك تشين وتخطي حاويات الدوكر، قد اكتملت الآن.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الذهبي السامي</div>
            <p>اطبع أسطورتك الخالدة: <code>140 LEVELS ACHIEVED. I HAVE TRANSCENDED THE MATRIX.</code></p>
          </div>`,
        initialCode: `# الكود الأخير..\n`,
        validate: (out) => out.includes("140") && out.includes("TRANSCENDED")
      }
    ]
  }
];'''

if 'id: "l140"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 131-140 successfully!')
else:
    print('Levels already added.')
