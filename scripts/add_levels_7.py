import codecs

with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'r', 'utf-8') as f:
    content = f.read()

new_chapters = r'''  },
  {
    chapter: "Chapter 33: Steganography (علم الإخفاء)",
    levels: [
      {
        id: "l71",
        title: "البيانات في الصور (Steganography)",
        theory: `<h1>Level 71: رسائل تحت الغطاء</h1>
          <p>التخفي الاحترافي يتضمن إخفاء الفيروس داخل صورة عادية. أبسط طريقة هي إلحاق النص بآخر ملف الصورة (Trailing Data).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك كود يفتح صورة وهمية بوضع الإلحاق <code>'a'</code>. قم بكتابة النص <code>"SECRET_PAYLOAD"</code> بداخلها.</p>
          </div>`,
        initialCode: `# محاكاة: with open("image.png", "a") as f:\n# اكتب النص السري\npayload = ""\n`,
        validate: (out) => out.includes("SECRET_PAYLOAD") || out.includes("SECRET")
      },
      {
        id: "l72",
        title: "الأرقام السحرية (Magic Numbers)",
        theory: `<h1>Level 72: خداع النظام</h1>
          <p>كل ملف يبدأ برقم سحري يحدد نوعه (مثلاً <code>MZ</code> للملفات التنفيذية EXE). المهاجم قد يغير الامتداد، لكن الرقم السحري يفضح الملف.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع الحرفين الوهميين المحاكيين للملفات التنفيذية في ويندوز: <code>MZ</code>.</p>
          </div>`,
        initialCode: `magic_number = "MZ"\n\n# اطبع الرقم السحري للملفات التنفيذية\n`,
        validate: (out) => out.includes("MZ")
      }
    ]
  },
  {
    chapter: "Chapter 34: Network Sniffing & Scapy",
    levels: [
      {
        id: "l73",
        title: "التنصت (Packet Sniffing)",
        theory: `<h1>Level 73: مكتبة Scapy</h1>
          <p>مكتبة <code>scapy</code> هي الأقوى في بايثون للتحكم بالشبكات وصناعة الحزم. تُستخدم للتنصت (Sniffing) و هجمات (Spoofing).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الجملة المحاكية: <code>sniff(filter="icmp", count=5)</code>.</p>
          </div>`,
        initialCode: `# اطبع كود التنصت كما هو مطلوب\n`,
        validate: (out) => out.includes("sniff(filter=\"icmp\", count=5)") || out.includes("sniff(filter='icmp', count=5)")
      },
      {
        id: "l74",
        title: "هجوم التسميم (ARP Spoofing)",
        theory: `<h1>Level 74: رجل في المنتصف (MITM)</h1>
          <p>في الـ ARP Spoofing، نرسل حزمة مزيفة للضحية نخبره فيها أننا الراوتر (Gateway) ليمر ترافيك الإنترنت الخاص به من خلالنا.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك متغير <code>target_ip = "192.168.1.5"</code>. اطبع رسالة: <code>Spoofing Target: 192.168.1.5</code> مدمجة مع المتغير.</p>
          </div>`,
        initialCode: `target_ip = "192.168.1.5"\n\n# اطبع الرسالة مدمجة مع الـ IP\n`,
        validate: (out) => out.includes("Spoofing Target: 192.168.1.5")
      },
      {
        id: "l75",
        title: "تزييف الدي إن إس (DNS Spoofing)",
        theory: `<h1>Level 75: توجيه الضحية</h1>
          <p>عندما يطلب الضحية `google.com`، يمكنك عبر Scapy الرد بحزمة DNS مزيفة توجهه لسيرفر الاختراق الخاص بك.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قاموس DNS. غيّر قيمة الـ IP لـ <code>google.com</code> لتصبح <code>"10.0.0.1"</code> ثم اطبع القاموس.</p>
          </div>`,
        initialCode: `dns_records = {"google.com": "142.250.190.46"}\n\n# غير الـ IP واطبع القاموس\n`,
        validate: (out) => out.includes("10.0.0.1")
      }
    ]
  },
  {
    chapter: "Chapter 35: Advanced Malware Techniques",
    levels: [
      {
        id: "l76",
        title: "مكتبة Ctypes (DLL Injection)",
        theory: `<h1>Level 76: مكتبة ctypes</h1>
          <p>أحياناً تحتاج للتحدث مع نواة الويندوز (Windows API) مباشرة بلغة C. بايثون يوفر مكتبة <code>ctypes</code> لاستدعاء دوال النظام لتنفيذ هجمات مثل الـ DLL Injection.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع مسار مكتبة الويندوز الشهيرة: <code>kernel32.dll</code>.</p>
          </div>`,
        initialCode: `# import ctypes\n# kernel32 = ctypes.windll.kernel32\n\n# اطبع مسار المكتبة\n`,
        validate: (out) => out.includes("kernel32.dll")
      },
      {
        id: "l77",
        title: "تفريغ العمليات (Process Hollowing)",
        theory: `<h1>Level 77: الاختباء في العمليات</h1>
          <p>تقنية Process Hollowing تقوم بتشغيل برنامج شرعي (مثل svchost.exe) ثم تفرغه من الميموري وتضع فيه الشيل كود الخاص بك!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة <code>Hollowed process: svchost.exe</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة المؤكدة لعملية الحقن\n`,
        validate: (out) => out.includes("Hollowed process: svchost.exe")
      }
    ]
  },
  {
    chapter: "Chapter 36: Advanced Cryptography",
    levels: [
      {
        id: "l78",
        title: "التشفير القوي (AES)",
        theory: `<h1>Level 78: فيروسات الفدية (Ransomware)</h1>
          <p>فيروسات الفدية تستخدم التشفير المتماثل <code>AES</code> لتشفير كل ملفات الجهاز وطلب فدية. في بايثون نستخدم مكتبة <code>cryptography</code> أو <code>pycryptodome</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>مفتاح الـ AES يجب أن يكون 16 أو 24 أو 32 بايت. استخدم الدالة <code>len()</code> لطباعة طول المتغير <code>key</code> وتأكد أنه 16.</p>
          </div>`,
        initialCode: `key = "SUP3R_S3CR3T_K3Y"\n\n# اطبع طول المفتاح\n`,
        validate: (out) => out.includes("16")
      },
      {
        id: "l79",
        title: "الهندسة العكسية (Reverse Engineering)",
        theory: `<h1>Level 79: تفكيك الفيروسات</h1>
          <p>عندما تحصل على فايروس مكتوب ببايثون (محول لـ EXE بـ PyInstaller)، يمكنك تفكيكه باستخدام أدوات مثل <code>uncompyle6</code> لقراءة الكود المصدري الأصلي وتحليله.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع اسم الأداة الشهيرة: <code>uncompyle6</code>.</p>
          </div>`,
        initialCode: `# اكتب اسم الأداة\n`,
        validate: (out) => out.includes("uncompyle6")
      },
      {
        id: "l80",
        title: "The Phantom Hacker",
        theory: `<h1>Level 80: مستوى الأشباح</h1>
          <p>80 مستوى! لقد درست التشفير، الشبكات المتقدمة، إخفاء البيانات (Steganography)، حقن الميموري، وصناعة الفيروسات.</p>
          <p>أنت لم تعد مبرمجاً ولا حتى هاكر محترف.. أنت أصبحت <strong>شبحاً</strong>، قادراً على كتابة أكواد تعجز أنظمة الحماية عن اكتشافها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 رسالة الشبح</div>
            <p>اطبع: <code>I AM THE PHANTOM HACKER. 80 LEVELS BEATEN.</code></p>
          </div>`,
        initialCode: `# انقش رسالتك في الميموري للأبد!\n`,
        validate: (out) => out.includes("I AM THE PHANTOM HACKER") || out.includes("80 LEVELS BEATEN")
      }
    ]
  }
];'''

if 'id: "l80"' not in content:
    target = '    ]\n  }\n];'
    content = content.replace('    ]\n  }\n];', '    ]\n' + new_chapters)
    
    with codecs.open(r'D:\abdo_portfolio\generate_engine_ide.py', 'w', 'utf-8') as f:
        f.write(content)
    print('Added levels 71-80 successfully!')
else:
    print('Levels already added.')
