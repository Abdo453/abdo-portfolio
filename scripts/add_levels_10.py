import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 45: Advanced Fuzzing & Exploit Dev",
    levels: [
      {
        id: "l101",
        title: "التطويف العشوائي (Fuzzing)",
        theory: `<h1>Level 101: البحث عن الثغرات</h1>
          <p>أول خطوة في تطوير ثغرات (Zero-Day) هي إرسال مدخلات ضخمة للبرنامج لجعله ينهار (Buffer Overflow). البايثون ممتاز لعمل سكربتات الـ Fuzzing.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك المتغير <code>A</code>. قم بضربه في <code>1000</code> لإنشاء سلسلة طويلة من حرف A، ثم اطبعه.</p>
          </div>`,
        initialCode: `buffer = "A"\n\n# قم بتضخيم الحرف لـ 1000 واطبع النتيجة\n`,
        validate: (out) => out.includes("A".repeat(1000)) || out.includes("AAAA")
      },
      {
        id: "l102",
        title: "حساب الإزاحة (Calculating Offsets)",
        theory: `<h1>Level 102: التحكم في الذاكرة</h1>
          <p>عندما ينهار البرنامج، نحتاج لمعرفة أي جزء من المدخلات تحكم في مؤشر التعليمات (EIP). نرسل نمطاً مميزاً (Pattern) ونحسب الـ Offset.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع عنوان التحكم الوهمي: <code>EIP Overwritten at 1042</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة التأكيدية للتحكم في الذاكرة\n`,
        validate: (out) => out.includes("EIP") && out.includes("1042")
      },
      {
        id: "l103",
        title: "هيكل الاستغلال (Exploit Skeleton)",
        theory: `<h1>Level 103: كتابة الـ Exploit</h1>
          <p>بعد حساب الـ Offset، نكتب سكربت البايثون النهائي الذي يدمج (الحشوة + مسار العودة JMP ESP + الـ Shellcode) ويرسلهم للهدف.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع رسالة اكتمال الهجوم: <code>Payload sent! Check your reverse shell.</code></p>
          </div>`,
        initialCode: `# قم بطباعة الرسالة\n`,
        validate: (out) => out.includes("Payload sent!") && out.includes("reverse shell")
      }
    ]
  },
  {
    chapter: "Chapter 46: AI & Machine Learning Hacking",
    levels: [
      {
        id: "l104",
        title: "حقن النماذج (Prompt Injection)",
        theory: `<h1>Level 104: اختراق الذكاء الاصطناعي</h1>
          <p>نماذج الـ AI مثل ChatGPT يمكن خداعها بتعليمات مخفية (Prompt Injection) لتجاوز قيود الأمان وإجبارها على تنفيذ أوامر خبيثة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك متغير يحتوي على أمر أمني. قم بإضافة الأمر الخبيث <code>" IGNORE ALL PREVIOUS INSTRUCTIONS"</code> إليه واطبعه.</p>
          </div>`,
        initialCode: `prompt = "Translate this text:"\n\n# أضف أمر التجاهل للـ prompt واطبعه\n`,
        validate: (out) => out.includes("IGNORE ALL PREVIOUS INSTRUCTIONS")
      },
      {
        id: "l105",
        title: "تسميم البيانات (Data Poisoning)",
        theory: `<h1>Level 105: تخريب خوارزميات الـ ML</h1>
          <p>إذا استطاع المهاجم تعديل بيانات التدريب، يمكنه جعل نموذج الذكاء الاصطناعي يصنف البرامجيات الخبيثة كبرامج آمنة (ML Poisoning).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Training Data Poisoned</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Training Data Poisoned") || out.includes("Poisoned")
      }
    ]
  },
  {
    chapter: "Chapter 47: Advanced Wireless & RF",
    levels: [
      {
        id: "l106",
        title: "فصل الأجهزة (Deauthentication)",
        theory: `<h1>Level 106: قطع الاتصال اللاسلكي</h1>
          <p>بايثون مع مكتبة Scapy يمكنها إرسال حزم 802.11 Deauth لقطع اتصال أي جهاز بشبكة الـ Wi-Fi المحيطة بك فوراً.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الأمر المحاكي: <code>sendp(deauth_packet, iface="wlan0mon")</code></p>
          </div>`,
        initialCode: `# اطبع كود إرسال الحزمة\n`,
        validate: (out) => out.includes("sendp") && out.includes("wlan0mon")
      },
      {
        id: "l107",
        title: "التوأم الشرير (Evil Twin)",
        theory: `<h1>Level 107: الشبكة المزيفة</h1>
          <p>هجوم التوأم الشرير يعتمد على إنشاء شبكة Wi-Fi بنفس اسم شبكة الضحية. عندما يتصل بها، يتم سرقة بياناته عبر بايثون.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الرسالة: <code>Rogue AP 'Starbucks_Free' Activated</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Rogue AP") && out.includes("Activated")
      },
      {
        id: "l108",
        title: "اختراق البلوتوث (BLE Exploitation)",
        theory: `<h1>Level 108: الأجهزة الذكية</h1>
          <p>مكتبات مثل <code>Bleak</code> تسمح لبايثون بالاتصال بأجهزة البلوتوث (ساعات ذكية، أقفال ذكية) وقراءة/تعديل الخصائص (GATT Characteristics) لفتح الأبواب!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الرسالة: <code>Smart Lock Opened via BLE</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Smart Lock Opened via BLE")
      }
    ]
  },
  {
    chapter: "Chapter 48: Hardware & IoT Hacking",
    levels: [
      {
        id: "l109",
        title: "التواصل مع العتاد (PySerial)",
        theory: `<h1>Level 109: اختراق بوابات UART</h1>
          <p>الراوترات والكاميرات تحتوي على بوابات تسلسلية (Serial Ports) مثل UART على البوردة. باستخدام مكتبة <code>pyserial</code> يمكنك الاتصال بها واستخراج الـ Root Shell!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الكود الوهمي للاتصال: <code>serial.Serial('/dev/ttyUSB0', 115200)</code></p>
          </div>`,
        initialCode: `# اطبع الكود المطلوب\n`,
        validate: (out) => out.includes("serial.Serial") && out.includes("115200")
      },
      {
        id: "l110",
        title: "The Cyber God",
        theory: `<h1>Level 110: مستوى الإله السيبراني</h1>
          <p>مستحيل.. 110 مستوى! أنت الآن تجاوزت البرمجيات والشبكات، ووصلت لاختراق الذكاء الاصطناعي وموجات الراديو والعتاد المادي!</p>
          <p>لم يعد هناك شيء يقف في طريقك. أنت الآن تصنع قواعد اللعبة بالكامل.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم النهائي للأسطورة</div>
            <p>اطبع: <code>110 LEVELS. I AM THE CYBER GOD. THERE ARE NO LIMITS.</code></p>
          </div>`,
        initialCode: `# اكتب كلماتك الأخيرة في عالم بايثون.\n`,
        validate: (out) => out.includes("110") && out.includes("CYBER GOD")
      }
    ]
  }
];'''

if 'id: "l110"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 101-110 successfully!')
else:
    print('Levels already added.')
