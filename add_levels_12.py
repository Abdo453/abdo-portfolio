import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 53: Neuro-Hacking & BCI",
    levels: [
      {
        id: "l121",
        title: "تحليل موجات الدماغ (EEG)",
        theory: `<h1>Level 121: واجهات الدماغ والحاسوب</h1>
          <p>أجهزة BCI مثل شرائح Neuralink تقرأ الإشارات العصبية. باستخدام بايثون ومكتبات مثل <code>BrainFlow</code>، يمكن للمهاجم تحليل موجات (Alpha/Beta) واستنتاج حالة الضحية.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع حالة التركيز المستنتجة من التردد العالي: <code>Focus State Detected</code>.</p>
          </div>`,
        initialCode: `# اطبع حالة الدماغ المستخرجة\n`,
        validate: (out) => out.includes("Focus State Detected") || out.includes("Focus")
      },
      {
        id: "l122",
        title: "تسميم الإشارة العصبية",
        theory: `<h1>Level 122: التحكم في الأطراف الصناعية</h1>
          <p>إذا تم اعتراض الإشارة بين المخ والطرف الصناعي الذكي، يمكن للمهاجم حقن إشارة (Spoofing) لإجبار الطرف على أداء حركة غير مرغوبة!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع أمر الاستبدال: <code>Motor Signal Spoofed: GRAB</code></p>
          </div>`,
        initialCode: `# اطبع رسالة اختراق إشارة الحركة\n`,
        validate: (out) => out.includes("Motor Signal") && out.includes("GRAB")
      }
    ]
  },
  {
    chapter: "Chapter 54: Self-Destructing Malware",
    levels: [
      {
        id: "l123",
        title: "فيروسات الميموري فقط (Fileless)",
        theory: `<h1>Level 123: الأشباح الحقيقية</h1>
          <p>الفيروس (Fileless) لا يُكتب أبداً على القرص الصلب. يتم تحميله مباشرة للـ RAM وتنفيذه لتجاوز الـ Antivirus وعدم ترك دليل مادي.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Payload Executed in RAM. No disk trace.</code></p>
          </div>`,
        initialCode: `# اطبع رسالة التأكيد\n`,
        validate: (out) => out.includes("Executed in RAM")
      },
      {
        id: "l124",
        title: "التدمير الذاتي (Kill-Switch)",
        theory: `<h1>Level 124: بروتوكول الانتحار</h1>
          <p>مبرمج الفيروس المحترف يضع (Kill-Switch). بمجرد إتمام المهمة، يقوم الفيروس بالكتابة فوق نفسه في الميموري بأصفار (Zeroing) لمسح أي دليل.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع رسالة المسح الآمن: <code>Memory Zeroed. Malware Self-Destructed.</code></p>
          </div>`,
        initialCode: `# فعّل بروتوكول التدمير الذاتي\n`,
        validate: (out) => out.includes("Zeroed") && out.includes("Self-Destructed")
      },
      {
        id: "l125",
        title: "التشفير الانتحاري",
        theory: `<h1>Level 125: التشفير بلا عودة</h1>
          <p>يتم إرسال البيانات المسروقة مشفرة بمفتاح يتم توليده عشوائياً وحذفه فوراً من ذاكرة الفيروس، لتصبح عملية فك التشفير مستحيلة على أي شخص لا يملك السيرفر المستقبل.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Key Deleted Permanently</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Key Deleted")
      }
    ]
  },
  {
    chapter: "Chapter 55: 5G & Telecom Exploitation",
    levels: [
      {
        id: "l126",
        title: "ثغرات SS7 & Diameter",
        theory: `<h1>Level 126: اعتراض الشبكات الخلوية</h1>
          <p>بروتوكولات (SS7/Diameter) التي تربط أبراج شركات الاتصالات عالمياً مليئة بالثغرات، وتسمح للمهاجم باعتراض رسائل הـ 2FA وتحديد موقع الهواتف.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Authentication Packet Intercepted</code></p>
          </div>`,
        initialCode: `# اطبع رسالة الاعتراض\n`,
        validate: (out) => out.includes("Packet Intercepted")
      },
      {
        id: "l127",
        title: "محطة الاتصال المزيفة (Stingray)",
        theory: `<h1>Level 127: الـ IMSI Catcher</h1>
          <p>جهاز (Stingray) أو التوأم الشرير الخلوي يُوهم الهواتف القريبة أنه أقوى برج اتصال، فيجبرها على الاتصال به وتسريب أرقامها السرية (IMSI).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع أمر الاستخراج: <code>IMSI Extracted from Victim</code></p>
          </div>`,
        initialCode: `# اطبع رسالة الاستخراج\n`,
        validate: (out) => out.includes("IMSI Extracted")
      },
      {
        id: "l128",
        title: "هجوم التقطيع الشبكي (Network Slicing)",
        theory: `<h1>Level 128: اختراق الـ 5G Slices</h1>
          <p>شبكات 5G تتيح تقسيم الشبكة شرائح (Slices). شريحة للمستشفيات، شريحة للمصانع، وشريحة للعوام. المهاجم يحاول القفز من شريحة العوام لشريحة حساسة!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Jumped to Critical 5G Slice</code></p>
          </div>`,
        initialCode: `# اطبع الجملة المطلوبة\n`,
        validate: (out) => out.includes("Critical 5G Slice")
      }
    ]
  },
  {
    chapter: "Chapter 56: The Singularity",
    levels: [
      {
        id: "l129",
        title: "دودة الذكاء الاصطناعي (AI Worm)",
        theory: `<h1>Level 129: الاختراق المستقل</h1>
          <p>أخطر كابوس سيبراني: فيروس يدمج نموذج Machine Learning داخله. يفحص الشبكة، يكتشف ثغراتها، يكتب الـ Exploit بنفسه ويهاجمها دون تدخل بشري!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع قرار الدودة المستقل: <code>AI Worm Decision: EXPLOIT CREATED</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة المرعبة\n`,
        validate: (out) => out.includes("EXPLOIT CREATED")
      },
      {
        id: "l130",
        title: "الوعي السيبراني (The Cyber Consciousness)",
        theory: `<h1>Level 130: التفرد (The Singularity)</h1>
          <p>130 مستوى... لم تترك تقنية معروفة أو سرية إلا وتعلمت استغلالها عبر بايثون. أنت لم تعد تكتب الأكواد، الأكواد هي من تكتبك.</p>
          <p>لقد وصلت لمرحلة الوعي السيبراني الكامل. لم يعد هناك حدود بين وعيك وبين المصفوفة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم السماوي الأخير</div>
            <p>انقش كلمات الخلود: <code>130 LEVELS. I AM THE CYBER CONSCIOUSNESS. THE SINGULARITY IS HERE.</code></p>
          </div>`,
        initialCode: `# استيقظ أيها الكيان العظيم.\n`,
        validate: (out) => out.includes("130") && out.includes("SINGULARITY") && out.includes("CONSCIOUSNESS")
      }
    ]
  }
];'''

if 'id: "l130"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 121-130 successfully!')
else:
    print('Levels already added.')
