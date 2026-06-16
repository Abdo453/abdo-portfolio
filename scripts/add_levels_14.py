import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 61: Cryptography (Post-Quantum & ZKP)",
    levels: [
      {
        id: "l141",
        title: "إثبات المعرفة الصفرية (ZKP)",
        theory: `<h1>Level 141: بروتوكول الـ ZKP</h1>
          <p>إثبات المعرفة الصفرية (Zero-Knowledge Proofs) يسمح لك بإثبات أنك تعرف كلمة المرور دون أن ترسلها فعلياً عبر الشبكة. تقنية معقدة تستخدم في الخصوصية وتأمين البلوك تشين.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الإثبات الرياضي: <code>ZKP Verified: Secret is known without revealing it</code>.</p>
          </div>`,
        initialCode: `# اطبع رسالة إثبات المعرفة\n`,
        validate: (out) => out.includes("ZKP Verified") && out.includes("without revealing")
      },
      {
        id: "l142",
        title: "التشفير المتجانس (Homomorphic Encryption)",
        theory: `<h1>Level 142: عمليات على المشفر</h1>
          <p>التشفير المتجانس يسمح للسيرفر السحابي بإجراء عمليات حسابية على بياناتك (وهي مشفرة!) وإرجاع النتيجة مشفرة، دون أن يرى بياناتك الأصلية أبداً!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Homomorphic computation completed on Encrypted Data</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة\n`,
        validate: (out) => out.includes("Homomorphic") && out.includes("Encrypted Data")
      },
      {
        id: "l143",
        title: "منحنيات التشفير (ECDSA)",
        theory: `<h1>Level 143: التوقيع الرقمي</h1>
          <p>البيتكوين يعتمد على خوارزمية (Elliptic Curve Digital Signature). أي خلل صغير في توليد الأرقام العشوائية (Nonce) أثناء التوقيع يسمح للهاكرز باستخراج الـ Private Key!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>ECDSA Private Key Recovered via Nonce Reuse</code></p>
          </div>`,
        initialCode: `# اطبع رسالة استخراج المفتاح\n`,
        validate: (out) => out.includes("ECDSA") && out.includes("Recovered")
      }
    ]
  },
  {
    chapter: "Chapter 62: Darknet Architectures",
    levels: [
      {
        id: "l144",
        title: "توجيه البصل (Tor Routing)",
        theory: `<h1>Level 144: شبكة الدارك ويب</h1>
          <p>شبكة (Tor) تعتمد على تشفير البصل (Onion Routing). حيث تُشفر رسالتك بعدة طبقات، وكل خادم (Node) يزيل طبقة واحدة فقط ولا يعرف سوى المحطة القادمة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الجملة المحاكية: <code>Onion Layer 3 peeled. Routing to Exit Node.</code></p>
          </div>`,
        initialCode: `# اطبع رسالة التوجيه\n`,
        validate: (out) => out.includes("Onion Layer") && out.includes("Exit Node")
      },
      {
        id: "l145",
        title: "توجيه الثوم (I2P Garlic Routing)",
        theory: `<h1>Level 145: شبكات الـ I2P</h1>
          <p>في شبكات I2P (الدارك نت البديل لـ Tor)، يتم استخدام Garlic Routing، حيث يتم تجميع عدة رسائل معاً في حزمة واحدة كفصوص الثوم لزيادة التخفي والتعقيد.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Garlic Routing Message Bundled. Privacy Maximum.</code></p>
          </div>`,
        initialCode: `# اطبع رسالة الـ I2P\n`,
        validate: (out) => out.includes("Garlic Routing")
      }
    ]
  },
  {
    chapter: "Chapter 63: Advanced Exploitation (ROP & ASLR)",
    levels: [
      {
        id: "l146",
        title: "سلسلة الـ ROP (Return-Oriented Programming)",
        theory: `<h1>Level 146: تقنية الـ ROP Chains</h1>
          <p>عندما يمنع النظام تنفيذ الشيل كود (بفضل DEP/NX)، يقوم المهاجم بجمع أجزاء صغيرة من الكود الموجودة أصلاً في البرامج (Gadgets) لترتيبها وتركيب هجوم كامل!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع أمر التنفيذ الوهمي: <code>POP EAX; RET -> Executing ROP Chain</code></p>
          </div>`,
        initialCode: `# اطبع سلسلة الـ ROP\n`,
        validate: (out) => out.includes("POP EAX; RET") && out.includes("ROP Chain")
      },
      {
        id: "l147",
        title: "تخطي عشوائية الذاكرة (ASLR Bypass)",
        theory: `<h1>Level 147: قنص الـ ASLR</h1>
          <p>نظام (ASLR) يغير عناوين الذاكرة عشوائياً في كل مرة لتصعيب الاختراق. لتخطيه، نحتاج لتسريب عنوان واحد (Memory Leak) لنتمكن من حساب باقي العناوين بعمليات رياضية.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Memory Leak detected. ASLR Defeated. Base Address Found.</code></p>
          </div>`,
        initialCode: `# اطبع إعلان تخطي حماية الذاكرة\n`,
        validate: (out) => out.includes("ASLR Defeated") && out.includes("Base Address")
      },
      {
        id: "l148",
        title: "رش الذاكرة (Heap Spraying)",
        theory: `<h1>Level 148: إغراق الـ Heap</h1>
          <p>تقنية (Heap Spraying) تعتمد على حقن الذاكرة بملايين النسخ من الـ Shellcode، بحيث تزداد احتمالية أن يهبط معالج البرنامج في منطقة تحتوي على الكود الخبيث عند انهياره.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Heap Sprayed with 200MB of NOP Sleds</code></p>
          </div>`,
        initialCode: `# اطبع رسالة رش الذاكرة\n`,
        validate: (out) => out.includes("Heap Sprayed") && out.includes("NOP Sleds")
      }
    ]
  },
  {
    chapter: "Chapter 64: The Absolute Horizon",
    levels: [
      {
        id: "l149",
        title: "الموت الحراري (Entropy & Heat Death)",
        theory: `<h1>Level 149: العشوائية المطلقة (Entropy)</h1>
          <p>في التشفير كما في الفيزياء، كل نظام يتجه نحو الفوضى التامة والعشوائية المطلقة. هذا هو المستوى ما قبل الأخير. لم يتبق سوى الفراغ المطلق.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع: <code>Maximum Entropy Reached. The Matrix is Collapsing.</code></p>
          </div>`,
        initialCode: `# اطبع الرسالة ما قبل الأخيرة\n`,
        validate: (out) => out.includes("Maximum Entropy Reached") || out.includes("Matrix is Collapsing")
      },
      {
        id: "l150",
        title: "Omniscience",
        theory: `<h1>Level 150: كليّ المعرفة (Omniscience)</h1>
          <p>150 مستوى... 150 انتصاراً. لقد فككت خوارزميات الكم، اخترقت التشفير المتجانس، شبكات I2P، والـ ROP Chains. لقد بلغت الأفق المطلق للمعرفة السيبرانية.</p>
          <p>أنت لم تعد مبرمجاً، ولم تعد هاكراً، ولم تعد مهندساً أو إلهاً سيبرانياً... أنت الآن <strong>(المعرفة المطلقة)</strong>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الماسي المطلق</div>
            <p>اطبع هذه الكلمات لتغلق بها تاريخ هذا المحرك إلى الأبد: <code>150 LEVELS CLEAR. I AM OMNISCIENT. THERE IS NOTHING LEFT TO LEARN.</code></p>
          </div>`,
        initialCode: `# أسدل الستار يا أسطورة الأساطير.\n`,
        validate: (out) => out.includes("150") && out.includes("OMNISCIENT")
      }
    ]
  }
];'''

if 'id: "l150"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 141-150 successfully!')
else:
    print('Levels already added.')
