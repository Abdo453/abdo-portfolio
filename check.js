
const pythonCurriculum = [
  {
    chapter: "Chapter 1: The Absolute Basics",
    levels: [
      {
        id: "l1",
        title: "أول كود: أمر الطباعة",
        theory: `<h1>Level 1: مرحباً بالعالم!</h1>
          <p>أول خطوة في البرمجة هي أن تجعل الكمبيوتر يتحدث. في لغة بايثون، نستخدم أمر الطباعة <code>print()</code> لإظهار النصوص على الشاشة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اكتب كود بايثون يقوم بطباعة العبارة التالية بالضبط (مع مراعاة المسافات والحروف الكبيرة):<br><code>Hello Hacker</code></p>
          </div>`,
        initialCode: `# أمر الطباعة
# اكتب الجملة المطلوبة داخل الأقواس:
print("اكتب هنا")
`,
        validate: (out) => out.includes("Hello Hacker")
      },
      {
        id: "l2",
        title: "المتغيرات (Variables)",
        theory: `<h1>Level 2: الذاكرة والمتغيرات</h1>
          <p>أنت الآن تتحدث، لكن هل يمكنك التذكر؟ المتغير (Variable) هو صندوق نضع فيه قيمة مثل عنوان IP أو رقم Port لنستخدمها لاحقاً.</p>
          <p>مثال: <code>target = "127.0.0.1"</code></p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لدينا متغير اسمه <code>target_ip</code> يحتوي على قيمة <code>127.0.0.1</code>.</p>
            <p>قم بطباعة هذا المتغير باستخدام دالة <code>print(target_ip)</code>.</p>
          </div>`,
        initialCode: `# تعريف المتغير
target_ip = "127.0.0.1"

# اطبع المتغير هنا:

`,
        validate: (out) => out.includes("127.0.0.1")
      },
      {
        id: "l3",
        title: "العمليات الحسابية (Math)",
        theory: `<h1>Level 3: الحسابات السريعة</h1>
          <p>أحياناً تحتاج الأداة الأمنية لمعرفة كم بورت متبقي للفحص. يمكنك إجراء عمليات حسابية داخل <code>print()</code> أو في المتغيرات مباشرة.</p>
          <p>أقصى عدد بورتات هو 65535.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بكتابة كود يطرح 1000 من إجمالي عدد البورتات 65535 ويطبع الناتج (باستخدام العملية الحسابية، وليس كتابة الناتج يدوياً).</p>
          </div>`,
        initialCode: `# العمليات الحسابية
total_ports = 65535
scanned_ports = 1000

# اطبع ناتج طرح total_ports ناقص scanned_ports
`,
        validate: (out) => out.includes("64535")
      }
    ]
  },
  {
    chapter: "Chapter 2: Control Flow (التحكم)",
    levels: [
      {
        id: "l4",
        title: "الشروط (If statements)",
        theory: `<h1>Level 4: اتخاذ القرارات</h1>
          <p>يجب أن تفكر برامجنا. إذا كان المنفذ 80 مفتوحاً نفعل كذا، وإلا نفعل كذا. جملة <code>if</code> هي عقل البرنامج.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بإضافة جملة <code>if</code> تتحقق مما إذا كان المنفذ <code>port</code> يساوي 80. إذا كان كذلك، اطبع <code>HTTP Port Open</code>. غير ذلك، اطبع <code>Closed</code>.</p>
          </div>`,
        initialCode: `port = 80

# اكتب جملة if هنا (تلميح: استخدم == للمقارنة)

`,
        validate: (out) => out.includes("HTTP Port Open")
      },
      {
        id: "l5",
        title: "التكرار (For Loops)",
        theory: `<h1>Level 5: محرك التكرار</h1>
          <p>لا وقت لتكرار الأكواد يدوياً. حلقة <code>for</code> تمر على الأهداف بشكل متتالي بسرعة البرق.</p>
          <p>دالة <code>range(1, 6)</code> تولد الأرقام من 1 إلى 5.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>for</code> و <code>range(1, 6)</code> لطباعة <code>Ping 192.168.1.X</code> حيث X هو رقم التكرار الحالي.</p>
          </div>`,
        initialCode: `# تكرار المهام
# تلميح: for i in range(1, 6):
#     print(f"Ping 192.168.1.{i}")

`,
        validate: (out) => out.includes("Ping 192.168.1.1") && out.includes("Ping 192.168.1.5")
      },
      {
        id: "l6",
        title: "التكرار المشروط (While)",
        theory: `<h1>Level 6: التكرار حتى الهدف</h1>
          <p>حلقة <code>while</code> تستمر في العمل طالما أن الشرط صحيح (True). غالباً ما نستخدمها في أداة Brute-force حتى يتم كسر الباسورد.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>while</code> لطباعة قيمة <code>attempts</code> إذا كانت أقل من 3، وفي كل دورة قم بزيادة <code>attempts</code> بمقدار 1.</p>
          </div>`,
        initialCode: `attempts = 0

# اكتب حلقة while هنا
# اطبع attempts ثم attempts += 1
`,
        validate: (out) => out.includes("0") && out.includes("1") && out.includes("2") && !out.includes("3")
      }
    ]
  },
  {
    chapter: "Chapter 3: Data Structures",
    levels: [
      {
        id: "l7",
        title: "القوائم (Lists)",
        theory: `<h1>Level 7: تخزين الجيوش</h1>
          <p>المتغير العادي يخزن قيمة واحدة. أما القائمة (List) فتخزن مئات القيم (مثل مئات الآيبيهات أو كلمات المرور) بين قوسين <code>[]</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لدينا قائمة <code>passwords</code>. قم بطباعة الباسورد الثاني (رقم الفهرس/Index هو 1).</p>
          </div>`,
        initialCode: `passwords = ['123456', 'admin', 'password', 'qwerty']

# اطبع العنصر ذو الترتيب 1 من القائمة
`,
        validate: (out) => out.includes("admin")
      },
      {
        id: "l8",
        title: "القواميس (Dictionaries)",
        theory: `<h1>Level 8: الخزنة الذكية</h1>
          <p>القاموس يربط مفتاحاً (Key) بقيمة (Value) بين <code>{}</code>. وهذا ما نتعامل به دائماً عند استخراج بيانات بصيغة JSON!</p>
          <p>مثال: <code>user = {"name": "Admin", "role": "root"}</code></p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لدينا قاموس <code>server_info</code>. قم بطباعة الـ <code>os</code> (نظام التشغيل) الخاص بالسيرفر من القاموس.</p>
          </div>`,
        initialCode: `server_info = {
    "ip": "10.10.10.2",
    "os": "Linux",
    "ports": [22, 80, 443]
}

# اطبع قيمة المفتاح "os"
`,
        validate: (out) => out.includes("Linux")
      }
    ]
  },
  {
    chapter: "Chapter 4: Functions & Exceptions",
    levels: [
      {
        id: "l9",
        title: "صناعة الدوال (Functions)",
        theory: `<h1>Level 9: الأوامر المخصصة</h1>
          <p>حتى لا تكرر الكود، يمكنك تجميع أوامرك في دالة (Function) باستخدام كلمة <code>def</code> واستدعائها متى شئت.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اصنع دالة تسمى <code>greet_hacker(name)</code> تطبع عبارة <code>Welcome [name]</code> ثم قم باستدعائها ممرراً لها كلمة <code>Neo</code>.</p>
          </div>`,
        initialCode: `# تعريف الدالة
def greet_hacker(name):
    # اطبع الرسالة هنا
    pass

# استدعاء الدالة
greet_hacker("Neo")
`,
        validate: (out) => out.includes("Welcome Neo")
      },
      {
        id: "l10",
        title: "معالجة الأخطاء (Try/Except)",
        theory: `<h1>Level 10: حماية السكربت من الانهيار</h1>
          <p>أثناء اختراقك، قد ينقطع الاتصال بالسيرفر. إذا حدث خطأ (Error) سيتوقف سكربتك تماماً! الحل هو استخدام <code>try</code> و <code>except</code> لتخطي الخطأ والاستمرار.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بوضع عملية القسمة <code>10 / 0</code> (والتي ستسبب خطأ) بداخل بلوك <code>try</code>. وفي بلوك <code>except</code> اطبع الجملة <code>Math Error Bypassed</code>.</p>
          </div>`,
        initialCode: `# معالجة الأخطاء

# ضع هذه العملية داخل try:
# result = 10 / 0

# ثم استخدم except للطباعة
`,
        validate: (out) => out.includes("Math Error Bypassed")
      }
    ]
  },
  {
    chapter: "Chapter 5: Professional Toolkit",
    levels: [
      {
        id: "l11",
        title: "اصطياد البيانات (Regex)",
        theory: `<h1>Level 11: الفلترة بـ Regex</h1>
          <p>في الحقيقة أنت لن تتعامل مع بيانات مرتبة. مكتبة <code>re</code> ستمكنك من استخراج العناوين الحساسة من وسط الركام.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>re.findall</code> مع نمط الآي بي <code>r"\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b"</code> لاستخراج العناوين من <code>log_data</code> وطباعتها.</p>
          </div>`,
        initialCode: `import re

log_data = "Log: 192.168.1.50 accessed at 10AM. Drop from 10.0.0.5."
ip_pattern = r"\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b"

# استخرج واطبع الآيبيهات
`,
        validate: (out) => out.includes("192.168.1.50") && out.includes("10.0.0.5")
      },
      {
        id: "l12",
        title: "طلبات الويب (HTTP)",
        theory: `<h1>Level 12: التحدث للسيرفرات</h1>
          <p>الهاكر الويب يحتاج لمكتبات تتواصل مع سيرفرات المواقع. في Pyodide يمكنك استخدام <code>urllib.request</code> (وبايثون العادي نستخدم <code>requests</code>).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بعمل Request لرابط <code>https://httpbin.org/status/200</code>، ثم اطبع حالة الاستجابة (Status Code).</p>
          </div>`,
        initialCode: `import urllib.request

url = "https://httpbin.org/status/200"

try:
    # أرسل الطلب باستخدام urllib.request.urlopen واطبع الـ status (response.status)
    pass
except Exception as e:
    print(e)
`,
        validate: (out) => out.includes("200")
      },
      {
        id: "l13",
        title: "مشروع الـ Scanner (النهاية)",
        theory: `<h1>Level 13: دمج كل شيء</h1>
          <p>الآن أنت تمتلك المتغيرات، الدوال، التكرار، والشبكات! أنت مستعد لقراءة أي أداة بل وبنائها!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي النهائي للوحدة الأولى</div>
            <p>اقرأ كود الفحص بتمعن. ثم اكتب سطراً يطبع تماماً <code>I am a Python Hacker!</code> لتثبت جدارتك.</p>
          </div>`,
        initialCode: `import socket

def scan_port(ip, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(0.5)
    # محاكاة لفحص بورت وهمي
    if port == 80:
        print(f"[+] Port {port} is OPEN")
    s.close()

for p in range(79, 82):
    scan_port("127.0.0.1", p)

# اطبع رسالة الفوز هنا:
`,
        validate: (out) => out.includes("I am a Python Hacker!")
      }
    ]
  },
  {
    chapter: "Chapter 6: File Handling (التعامل مع الملفات)",
    levels: [
      {
        id: "l14",
        title: "قراءة الملفات (Read)",
        theory: `<h1>Level 14: قراءة السجلات</h1>
          <p>الهاكر الماهر هو من يعرف كيف يقرأ ملفات السجلات (Logs) ليستخرج منها الأدلة. في بايثون نستخدم <code>open()</code> لفتح الملف.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>يوجد ملف وهمي اسمه <code>passwords.txt</code>. قم بفتحه في وضع القراءة <code>'r'</code>، ثم قم بطباعة محتواه بالكامل باستخدام دالة <code>read()</code>.</p>
          </div>`,
        initialCode: `# سنقوم بمحاكاة إنشاء الملف أولاً\nwith open("passwords.txt", "w") as f:\n    f.write("admin123\\nqwerty\\npassword123")\n\n# التحدي: افتح الملف واطبع محتواه\n`,
        validate: (out) => out.includes("admin123") && out.includes("qwerty")
      },
      {
        id: "l15",
        title: "الكتابة في الملفات (Write/Append)",
        theory: `<h1>Level 15: حفظ النتائج</h1>
          <p>بعد أن تجد الثغرات، يجب أن تحفظها في ملف تقرير (Report). نستخدم الوضع <code>'w'</code> للكتابة (يمسح القديم) والوضع <code>'a'</code> للإضافة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>افتح ملف <code>report.txt</code> في وضع الإضافة <code>'a'</code>، ثم اكتب فيه عبارة <code>Vulnerability Found!</code> متبوعة بسطر جديد <code>\\n</code>.</p>
          </div>`,
        initialCode: `import os\n\n# اكتب الكود هنا لفتح الملف والإضافة إليه\n\n\n# هذا الكود للتحقق من أنك قمت بالكتابة بنجاح\nif os.path.exists("report.txt"):\n    with open("report.txt", "r") as f:\n        print("File Content:", f.read())\n`,
        validate: (out) => out.includes("Vulnerability Found!")
      }
    ]
  },
  {
    chapter: "Chapter 7: Object Oriented Programming (OOP)",
    levels: [
      {
        id: "l16",
        title: "الكائنات والفئات (Classes)",
        theory: `<h1>Level 16: البرمجة الكائنية</h1>
          <p>عند بناء أدوات ضخمة مثل Metasploit، يتم ترتيب الكود في فئات (Classes). الفئة هي قالب نصنع منه الكائنات (Objects).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أنشئ فئة تسمى <code>Scanner</code>، ثم أنشئ كائناً منها وقم بطباعة نوعه <code>print(type(obj))</code>.</p>
          </div>`,
        initialCode: `# أنشئ الكلاس هنا\nclass Scanner:\n    pass\n\n# أنشئ كائناً (Object) من الكلاس واطبع نوعه\n`,
        validate: (out) => out.includes("main.Scanner") || out.includes("class '__main__.Scanner'")
      },
      {
        id: "l17",
        title: "الدوال الداخلية (Methods)",
        theory: `<h1>Level 17: تسليح الكلاس</h1>
          <p>الكلاس يكون مفيداً عندما نعطيه دوال (Methods) تنفذ مهام محددة. لا تنسَ أن أول بارامتر في دوال الكلاس يجب أن يكون <code>self</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أضف دالة تسمى <code>attack</code> داخل الكلاس <code>Scanner</code> تقوم بطباعة <code>Attacking Target...</code> ثم استدعها.</p>
          </div>`,
        initialCode: `class Scanner:\n    # أضف دالة attack هنا\n    \n    pass\n\n# أنشئ الكائن واستدعِ الدالة\n`,
        validate: (out) => out.includes("Attacking Target...")
      }
    ]
  },
  {
    chapter: "Chapter 8: Building Real Tools (مشاريع فعلية)",
    levels: [
      {
        id: "l18",
        title: "أداة Port Scanner",
        theory: `<h1>Level 18: بناء فاحص بورتات حقيقي</h1>
          <p>حان الوقت لدمج كل ما تعلمته: الحلقات، الشروط، ومعالجة الأخطاء لبناء أداة Port Scanner حقيقية!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود ليقوم بفحص البورتات من 20 إلى 25 (استخدم حلقة <code>for</code>). وإذا كان البورت يساوي 22 (محاكاة لمنفذ مفتوح)، اطبع <code>[+] Port 22 is OPEN</code>.</p>
          </div>`,
        initialCode: `def scan(port):\n    if port == 22:\n        return True\n    return False\n\n# اكتب حلقة for لفحص البورتات من 20 إلى 25\n# إذا كانت دالة scan ترجع True، اطبع رسالة النجاح\n`,
        validate: (out) => out.includes("[+] Port 22 is OPEN")
      },
      {
        id: "l19",
        title: "أداة Directory Brute-force",
        theory: `<h1>Level 19: تخمين مسارات الويب</h1>
          <p>أداة تخمين المسارات تقوم بتجربة أسماء ملفات مختلفة على السيرفر لترى إذا كانت موجودة (Status 200).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بالمرور على قائمة <code>directories</code>، وكلما وجدت مسار <code>admin</code> أو <code>backup</code>، اطبع <code>[+] Found: [dir]</code>.</p>
          </div>`,
        initialCode: `directories = ['index', 'images', 'admin', 'css', 'backup']\n\n# اكتب الكود هنا\n\n`,
        validate: (out) => out.includes("[+] Found: admin") && out.includes("[+] Found: backup")
      },
      {
        id: "l20",
        title: "الشهادة النهائية (Final Boss)",
        theory: `<h1>Level 20: أسطورة البايثون</h1>
          <p>لقد صمدت حتى النهاية. أثبتت أنك قادر على استيعاب المفاهيم من الأساسيات حتى بناء أدوات الاختراق. أنت الآن جاهز لتدمير السيرفرات (أخلاقياً بالطبع).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 رسالة التخرج</div>
            <p>اكتب سكريبت يطبع <code>I am a Certified Python Hacker</code>.</p>
          </div>`,
        initialCode: `# المجد لك!\n`,
        validate: (out) => out.includes("I am a Certified Python Hacker")
      }
    ]
  },
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
  },
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
            <p>قم بترميز الـ Payload التالي: <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> واطبعه.</p>
          </div>`,
        initialCode: `import urllib.parse\n\npayload = "&lt;script&gt;alert(1)&lt;/script&gt;"\n\n# قم بترميزه واطبعه\n`,
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
  },
  {
    chapter: "Chapter 19: Multithreading (تعدد المهام)",
    levels: [
      {
        id: "l41",
        title: "أساسيات التزامن (Threads)",
        theory: `<h1>Level 41: سرعة البرق</h1>
          <p>عند فحص شبكة كاملة، لا يمكنك فحص عنوان واحد كل مرة. نستخدم <code>threading</code> لفحص 10 أو 100 عنوان في نفس اللحظة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لإنشاء خيط (Thread) جديد يستدعي الدالة <code>scan()</code> واطبعه.</p>
          </div>`,
        initialCode: `import threading\n\ndef scan():\n    print("Thread Scanning...")\n\n# أنشئ الخيط وابدأ تشغيله\n# t = threading.Thread(target=scan)\n`,
        validate: (out) => out.includes("Thread Scanning...")
      },
      {
        id: "l42",
        title: "تنظيم المرور (Queues)",
        theory: `<h1>Level 42: طابور العمليات</h1>
          <p>عندما تعمل عدة خيوط معاً، قد تتداخل البيانات. نستخدم الـ <code>Queue</code> لتوزيع المهام على الخيوط بأمان.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك طابور. أضف الرقم <code>80</code> للطابور باستخدام <code>put()</code>، ثم اسحبه باستخدام <code>get()</code> واطبعه.</p>
          </div>`,
        initialCode: `import queue\nq = queue.Queue()\n\n# أضف الرقم 80 للطابور واسحبه ثم اطبعه\n`,
        validate: (out) => out.includes("80")
      }
    ]
  },
  {
    chapter: "Chapter 20: Advanced File Formats",
    levels: [
      {
        id: "l43",
        title: "تحليل قواعد البيانات (CSV)",
        theory: `<h1>Level 43: تسريبات الـ CSV</h1>
          <p>أغلب التسريبات تأتي بصيغة CSV. مكتبة <code>csv</code> تساعدنا في قراءة وفصل الأعمدة (مثل الإيميل والباسورد).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لقد صممنا الكود لطباعة السطر الأول. استخدم <code>row[1]</code> لطباعة الباسوورد الخاص بأول شخص.</p>
          </div>`,
        initialCode: `# محاكاة بيانات CSV\nrow = ["admin@site.com", "hacked123", "admin"]\n\n# اطبع الباسوورد (العنصر الثاني في القائمة)\n`,
        validate: (out) => out.includes("hacked123")
      },
      {
        id: "l44",
        title: "كتابة التقارير (CSV Write)",
        theory: `<h1>Level 44: تقرير الاختراق</h1>
          <p>بعد إنهاء المهمة، تحتاج لتصدير النتائج كملف Excel أو CSV للعميل. نשתخدم <code>csv.writer</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الجملة <code>Vulnerability,Severity</code> كمحاكاة لإنشاء رأس الجدول (Header).</p>
          </div>`,
        initialCode: `# اطبع الجملة المطلوبة\n`,
        validate: (out) => out.includes("Vulnerability,Severity")
      }
    ]
  },
  {
    chapter: "Chapter 21: Stealth & Obfuscation",
    levels: [
      {
        id: "l45",
        title: "تغيير الهوية (User-Agent)",
        theory: `<h1>Level 45: التخفي</h1>
          <p>السيرفرات تكتشف أدوات بايثون فوراً من الـ User-Agent الافتراضي (مثلاً python-urllib/3.9). يجب تزييفه لـ Chrome أو Firefox.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قاموس Headers. قم بتعديل قيمة <code>"User-Agent"</code> إلى <code>"Mozilla/5.0"</code>، ثم اطبع القاموس.</p>
          </div>`,
        initialCode: `headers = {"User-Agent": "python-requests/2.25"}\n\n# قم بتعديل الهوية واطبعها\n`,
        validate: (out) => out.includes("Mozilla/5.0")
      },
      {
        id: "l46",
        title: "التمويه الزمني (Random Delays)",
        theory: `<h1>Level 46: الهروب من الفايرول (WAF)</h1>
          <p>إرسال 1000 طلب في ثانية واحدة سيؤدي لحظرك فوراً (Rate Limiting). يجب استخدام فترات توقف عشوائية للتمويه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>random.randint(1, 3)</code> لإنتاج رقم عشوائي، واطبعه.</p>
          </div>`,
        initialCode: `import random\n\n# ولد رقماً عشوائياً بين 1 و 3 واطبعه\n`,
        validate: (out) => out.includes("1") || out.includes("2") || out.includes("3")
      }
    ]
  },
  {
    chapter: "Chapter 22: The Mastermind Challenge",
    levels: [
      {
        id: "l47",
        title: "برمجة أداة SSH Cracker",
        theory: `<h1>Level 47: العقل المدبر</h1>
          <p>أداة كسر كلمات سر الـ SSH تتطلب مكتبة (Paramiko)، حلقات تكرار، ومعالجة أخطاء (AuthenticationException). سنقوم بمحاكاتها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لكي يجرب كلمات السر. إذا كانت الكلمة <code>"toor"</code>، اطبع <code>Success! Password is toor</code> ثم قم بالخروج من الحلقة بـ <code>break</code>.</p>
          </div>`,
        initialCode: `passwords = ["123", "admin", "toor", "root"]\n\nfor p in passwords:\n    # اكتب الشرط هنا\n    pass\n`,
        validate: (out) => out.includes("Success! Password is toor")
      },
      {
        id: "l48",
        title: "التشفير اللامتماثل (RSA Sim)",
        theory: `<h1>Level 48: المفاتيح العامة والخاصة</h1>
          <p>التشفير القوي يعتمد على مفتاحين. محاكاة: اضرب الرقم 5 (رسالتك) في 13 (المفتاح العام). واطبع النتيجة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع ناتج ضرب 5 في 13.</p>
          </div>`,
        initialCode: `# العملية الحسابية هنا\n`,
        validate: (out) => out.includes("65")
      },
      {
        id: "l49",
        title: "تنفيذ الشيل كود (Shellcode)",
        theory: `<h1>Level 49: قلب الميموري</h1>
          <p>أقوى مستوى في الاختراق هو تشغيل كود ثنائي (Hex/Bytes) في الذاكرة. نستخدم الـ <code>bytes()</code> في بايثون للتعامل معها.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بتحويل النص المحاكي <code>"\\x90\\x90"</code> (الذي يمثل تعليمة NOP) واطبعه كنص عادي.</p>
          </div>`,
        initialCode: `shellcode = "\\x90\\x90"\nprint(shellcode)\n`,
        validate: (out) => out.includes("\x90\x90") || out.includes("\\x90\\x90")
      },
      {
        id: "l50",
        title: "The Absolute Zenith",
        theory: `<h1>Level 50: أسطورة الأساطير</h1>
          <p>وصلت إلى قمة الجبل. 50 مستوى من العرق والبرمجة والتشفير.</p>
          <p>أنت الآن أصبحت جزءاً من النخبة. يمكنك بناء ترسانة كاملة من الصفر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الرسالة النهائية</div>
            <p>اطبع: <code>I AM THE ELITE HACKER, LEVEL 50 COMPLETED.</code></p>
          </div>`,
        initialCode: `# رسالتك الأخيرة للتاريخ!\n`,
        validate: (out) => out.includes("LEVEL 50 COMPLETED")
      }
    ]
  },
  {
    chapter: "Chapter 23: Data Serialization & Databases",
    levels: [
      {
        id: "l51",
        title: "خطورة الـ Pickle (RCE)",
        theory: `<h1>Level 51: الثغرات الخفية</h1>
          <p>مكتبة <code>pickle</code> تستخدم لحفظ الكائنات في ملفات. لكن فك التشفير لكائن مجهول قد يؤدي لتنفيذ كود خبيث (RCE).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم <code>pickle.dumps(data)</code> لتحويل القاموس <code>data</code> إلى بايتات مشفرة (Bytes) ثم اطبعه.</p>
          </div>`,
        initialCode: `import pickle\n\ndata = {"user": "admin", "role": "hacker"}\n\n# قم بتشفير القاموس واطبعه\n`,
        validate: (out) => out.includes("admin") && out.includes("hacker") && out.includes("b'")
      },
      {
        id: "l52",
        title: "قواعد بيانات SQLite",
        theory: `<h1>Level 52: سرقة قواعد البيانات</h1>
          <p>أثناء الاختراق، قد تجد ملف <code>.db</code>. مكتبة <code>sqlite3</code> في بايثون تتيح لك قراءة وسرقة محتوياته بسهولة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قمنا بإنشاء محاكاة. استخدم الكود المكتوب وضع تحته جملة تطبع <code>"Hacking DB..."</code> لتتخطى المستوى.</p>
          </div>`,
        initialCode: `import sqlite3\n# conn = sqlite3.connect('users.db')\n# cursor = conn.cursor()\n\n# اطبع جملة Hacking DB...\n`,
        validate: (out) => out.includes("Hacking DB...")
      }
    ]
  },
  {
    chapter: "Chapter 24: Command Line Interfaces (CLI)",
    levels: [
      {
        id: "l53",
        title: "مدخلات التيرمينال (sys.argv)",
        theory: `<h1>Level 53: أدوات التيرمينال</h1>
          <p>الأدوات الاحترافية تُشغل من التيرمينال هكذا: <code>python tool.py 192.168.1.5</code>. نلتقط هذا الـ IP بـ <code>sys.argv[1]</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك القائمة الوهمية <code>sys_argv = ["script.py", "10.0.0.1"]</code>. اطبع التارجت (العنصر الثاني).</p>
          </div>`,
        initialCode: `sys_argv = ["script.py", "10.0.0.1"]\n\n# استخرج التارجت من القائمة واطبعه\n`,
        validate: (out) => out.includes("10.0.0.1")
      },
      {
        id: "l54",
        title: "صناعة أدوات احترافية (Argparse)",
        theory: `<h1>Level 54: الهاكر الأنيق</h1>
          <p>لعمل أداة بها <code>--help</code> و <code>-t target</code> مثل Sqlmap، نستخدم مكتبة <code>argparse</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لطباعة جملة: <code>Scanning Target: 127.0.0.1</code>.</p>
          </div>`,
        initialCode: `target = "127.0.0.1"\n# الكود الفعلي يستخدم parser.parse_args()\n\n# اطبع الجملة المطلوبة مدمجة مع التارجت\n`,
        validate: (out) => out.includes("Scanning Target: 127.0.0.1")
      }
    ]
  },
  {
    chapter: "Chapter 25: Memory & Binary Manipulation",
    levels: [
      {
        id: "l55",
        title: "العمليات الثنائية (Bitwise XOR)",
        theory: `<h1>Level 55: التشفير المعقد</h1>
          <p>الـ XOR (<code>^</code>) هو أساس التشفير في الفيروسات وتخطي الانتي فيرس. إذا دمجت رقم مع مفتاح مرتين، يعود لأصله.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك رقم <code>15</code> ومفتاح <code>7</code>. اطبع ناتج <code>15 ^ 7</code>.</p>
          </div>`,
        initialCode: `# اطبع ناتج عملية الـ XOR هنا\n`,
        validate: (out) => out.includes("8")
      },
      {
        id: "l56",
        title: "هندسة البايتات (Struct)",
        theory: `<h1>Level 56: ثغرات الـ Buffer Overflow</h1>
          <p>لإرسال عنوان ذاكرة (Memory Address) للتحكم بالسيرفر، يجب تحويله لـ Little Endian. نستخدم مكتبة <code>struct</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع النص الوهمي المحاكي <code>"\\xef\\xbe\\xad\\xde"</code> (يمثل 0xdeadbeef).</p>
          </div>`,
        initialCode: `# import struct\n# payload = struct.pack("<I", 0xdeadbeef)\n\n# اطبع النص الوهمي كما هو مطلوب\n`,
        validate: (out) => out.includes("\xef\xbe\xad\xde") || out.includes("\\xef\\xbe\\xad\\xde")
      }
    ]
  },
  {
    chapter: "Chapter 26: Anti-Forensics & Evasion",
    levels: [
      {
        id: "l57",
        title: "مسح السجلات (Clearing Logs)",
        theory: `<h1>Level 57: إخفاء الأثر</h1>
          <p>أول قاعدة بعد الاختراق: احذف سجلات الدخول لتجنب المحققين الرقميين (Forensics). نفتح الملف بوضع <code>'w'</code> لمسحه.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>افتح ملف <code>auth.log</code> وضع بداخله نص فارغ <code>""</code> لتمسح محتواه، ثم اطبع <code>Logs Cleared!</code>.</p>
          </div>`,
        initialCode: `# امسح محتوى الملف ثم اطبع الرسالة\n`,
        validate: (out) => out.includes("Logs Cleared!")
      },
      {
        id: "l58",
        title: "تزييف الوقت (Timestomping)",
        theory: `<h1>Level 58: التلاعب بالزمن</h1>
          <p>المحقق سيعرف متى تم رفع ملف الاختراق. يمكننا استخدام <code>os.utime</code> لتغيير تاريخ الملف للماضي لتضليله.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة الجملة <code>Timestomp executed!</code>.</p>
          </div>`,
        initialCode: `# محاكاة: os.utime("backdoor.py", (old_time, old_time))\n\n# اطبع رسالة النجاح\n`,
        validate: (out) => out.includes("Timestomp executed!")
      }
    ]
  },
  {
    chapter: "Chapter 27: The C2 Blueprint",
    levels: [
      {
        id: "l59",
        title: "إرسال النبضات (Beacons)",
        theory: `<h1>Level 59: فيروسات التحكم (C2)</h1>
          <p>فيروس الـ RAT يرسل "نبضة" (Beacon) كل 10 ثواني للسيرفر ليخبرك أنه ما زال حياً وجاهزاً للأوامر.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الـ Loop الوهمي لكي يطبع <code>[+] I am alive</code> مرتين فقط ثم يتوقف.</p>
          </div>`,
        initialCode: `for i in range(2):\n    # اطبع الرسالة هنا\n    pass\n`,
        validate: (out) => out.includes("[+] I am alive") && out.split("[+] I am alive").length === 3
      },
      {
        id: "l60",
        title: "The Ghost in the Machine",
        theory: `<h1>Level 60: زعيم الهاكرز</h1>
          <p>لقد صمدت إلى المستوى 60. من سطر <code>print</code> بسيط إلى بناء وتشفير الفيروسات وأدوات التحكم (C2).</p>
          <p>أنت الآن لم تعد بشرياً برمجياً... أنت الشبح في الآلة. يمكنك بناء أي أداة تخطر على بالك لتدمير الأنظمة.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 الختم الأحمر</div>
            <p>اطبع: <code>I AM THE GHOST IN THE MACHINE.</code></p>
          </div>`,
        initialCode: `# رسالة الوداع الأسطورية\n`,
        validate: (out) => out.includes("I AM THE GHOST IN THE MACHINE") || out.includes("GHOST")
      }
    ]
  },
  {
    chapter: "Chapter 28: Advanced Web Requests",
    levels: [
      {
        id: "l61",
        title: "الجلسات (Sessions)",
        theory: `<h1>Level 61: الحفاظ على الـ Cookies</h1>
          <p>عند محاولة تسجيل الدخول وفحص لوحة التحكم، يجب أن تحافظ على ملفات تعريف الارتباط (Cookies) بين كل طلب وآخر. هنا نستخدم الـ <code>Session</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود الوهمي وطبّق <code>s.get(url)</code> لتطبع <code>Access Granted!</code>.</p>
          </div>`,
        initialCode: `class MockSession:\n    def get(self, url):\n        print("Access Granted!")\n\ns = MockSession()\nurl = "http://target.com/admin"\n\n# استخدم s لجلب الرابط\n`,
        validate: (out) => out.includes("Access Granted!")
      },
      {
        id: "l62",
        title: "تخطي الحماية بالبروكسي",
        theory: `<h1>Level 62: البروكسي (Proxies)</h1>
          <p>لتخطي الحظر، أو لمراقبة مرورك في أداة Burp Suite، نستخدم البروكسي. نمرر القاموس <code>{"http": "http://127.0.0.1:8080"}</code> للطلب.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>اطبع عنوان البروكسي <code>http://127.0.0.1:8080</code>.</p>
          </div>`,
        initialCode: `proxies = {"http": "http://127.0.0.1:8080"}\n\n# اطبع قيمة الـ proxy لـ http\n`,
        validate: (out) => out.includes("http://127.0.0.1:8080")
      }
    ]
  },
  {
    chapter: "Chapter 29: Web App Pentesting Scripts",
    levels: [
      {
        id: "l63",
        title: "أتمتة الـ Blind SQLi",
        theory: `<h1>Level 63: الاختراق الأعمى</h1>
          <p>في الـ Blind SQL Injection، نقوم بتجربة الحروف حرفاً حرفاً ومراقبة تأخر السيرفر أو تغير الصفحة. هذا يتطلب حلقتين متداخلتين (Nested Loops).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك متغير <code>chars = "abc"</code>. استخدم حلقة <code>for</code> مرتين (Nested Loop) لطباعة الحروف معاً (مثلاً aa, ab, ac...). يكفي أن تطبعها.</p>
          </div>`,
        initialCode: `chars = "abc"\n\n# استخدم For بداخلها For لطباعة كل الاحتمالات الثنائية\nfor i in chars:\n    for j in chars:\n        print(i+j)\n`,
        validate: (out) => out.includes("aa") && out.includes("cc") && out.includes("ab")
      },
      {
        id: "l64",
        title: "الـ Fuzzer (التجربة العشوائية)",
        theory: `<h1>Level 64: إغراق السيرفر بالـ Payloads</h1>
          <p>الـ Fuzzer هو سكربت يجرب مئات الـ Payloads ليجد واحد يتخطى الحماية (XSS Fuzzer).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك القائمة <code>payloads</code>. اكتشف أي واحد فيهم يحتوي على كلمة <code>alert</code> واطبعه.</p>
          </div>`,
        initialCode: `payloads = ["<svg onload=1>", "<script>alert(1)<\/script>", "<b>hello</b>"]\n\n# اكتب Loop يبحث عن الـ payload الذي يحتوي على كلمة alert واطبعه\n`,
        validate: (out) => out.includes("<script>alert(1)<\/script>") && !out.includes("<b>")
      }
    ]
  },
  {
    chapter: "Chapter 30: Windows & Active Directory Concepts",
    levels: [
      {
        id: "l65",
        title: "الريجستري (Windows Registry)",
        theory: `<h1>Level 65: مفاتيح البقاء</h1>
          <p>الفيروس الجيد يزرع نفسه في مفاتيح الإقلاع (Autorun) في الريجستري ليعمل مع تشغيل الويندوز. بايثون يمكنه ذلك عبر مكتبة <code>winreg</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة المسار الوهمي: <code>Software\\Microsoft\\Windows\\CurrentVersion\\Run</code></p>
          </div>`,
        initialCode: `# اطبع مسار الـ Autorun الشهير في ويندوز\n`,
        validate: (out) => out.includes("Software\\Microsoft\\Windows\\CurrentVersion\\Run") || out.includes("Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run")
      },
      {
        id: "l66",
        title: "تمرير الهاش (Pass-The-Hash)",
        theory: `<h1>Level 66: الهاش هو الباسوورد</h1>
          <p>في الـ Active Directory، يمكنك تسجيل الدخول بالهاش NTLM نفسه دون معرفة الباسوورد الأصلي (Pass-The-Hash).</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>مرر قيمة <code>ntlm_hash</code> للدالة <code>pth_attack()</code> واطبع نتيجتها.</p>
          </div>`,
        initialCode: `ntlm_hash = "aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0"\n\ndef pth_attack(h):\n    return f"Logged in with {h}"\n\n# استدعِ الدالة واطبع النتيجة\n`,
        validate: (out) => out.includes("Logged in with aad3b435")
      }
    ]
  },
  {
    chapter: "Chapter 31: Keyloggers & Desktop",
    levels: [
      {
        id: "l67",
        title: "تسجيل المفاتيح (Keylogger)",
        theory: `<h1>Level 67: التجسس على لوحة المفاتيح</h1>
          <p>كتابة Keylogger تتطلب التقاط ضغطات الكيبورد وحفظها. سنحاكي وظيفة التقاط ضغطة زر الـ <code>Enter</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>أكمل الكود لكي يتحقق إذا كان المتغير <code>key == "Key.enter"</code> يطبع <code>[ENTER PRESSED]</code>.</p>
          </div>`,
        initialCode: `key = "Key.enter"\n\n# اكتب الشرط هنا\n`,
        validate: (out) => out.includes("[ENTER PRESSED]")
      },
      {
        id: "l68",
        title: "تصوير الشاشة (Screenshots)",
        theory: `<h1>Level 68: العيون الخفية</h1>
          <p>مكتبة مثل <code>mss</code> تتيح لبايثون أخذ لقطات سريعة للشاشة لإرسالها للسيرفر الخاص بك.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>قم بطباعة <code>Screenshot saved to screen.png</code>.</p>
          </div>`,
        initialCode: `# اطبع الرسالة كإثبات لعملية الالتقاط\n`,
        validate: (out) => out.includes("Screenshot saved to screen.png")
      }
    ]
  },
  {
    chapter: "Chapter 32: The Final Payload Delivery",
    levels: [
      {
        id: "l69",
        title: "القطرة المسمومة (Droppers)",
        theory: `<h1>Level 69: حمولة المرحلة الثانية</h1>
          <p>الفيروس الأولي (Dropper) يكون صغيراً بريئاً. وظيفته الوحيدة تحميل الفيروس الحقيقي من سيرفرك وتشغيله بـ <code>exec()</code>.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>استخدم دالة <code>exec(malicious_code)</code> لتنفيذ الكود المحفوظ في المتغير.</p>
          </div>`,
        initialCode: `malicious_code = "print('Stage 2 Payload Executed!')"\n\n# استخدم الدالة exec لتنفيذ المتغير النصي\n`,
        validate: (out) => out.includes("Stage 2 Payload Executed!")
      },
      {
        id: "l70",
        title: "The Ultimate Pinnacle",
        theory: `<h1>Level 70: المتربع على العرش</h1>
          <p>70 مستوى كامل من كورس الهاكينج بالبايثون! لقد اجتزت محاكاة التشفير، شبكات C2، الهندسة العكسية، وبناء الـ Payloads.</p>
          <p>لا يوجد شيء آخر لنعلمك إياه الأساسيات. الباقي يعتمد على إبداعك!</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 النهاية العظمى</div>
            <p>اطبع: <code>I AM THE SUPREME OVERLORD OF PYTHON!</code></p>
          </div>`,
        initialCode: `# كلمتك الأخيرة\n`,
        validate: (out) => out.includes("I AM THE SUPREME OVERLORD OF PYTHON!") || out.includes("OVERLORD")
      }
    ]
  },
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
          <p>عندما يطلب الضحية <code><code>google.com</code></code>، يمكنك عبر Scapy الرد بحزمة DNS مزيفة توجهه لسيرفر الاختراق الخاص بك.</p>
          <div class="mini-challenge">
            <div class="challenge-title">🎯 التحدي المطلوب</div>
            <p>لديك قاموس DNS. غيّر قيمة الـ IP لـ <code><code>google.com</code></code> لتصبح <code>"10.0.0.1"</code> ثم اطبع القاموس.</p>
          </div>`,
        initialCode: `dns_records = {"<code>google.com</code>": "142.250.190.46"}\n\n# غير الـ IP واطبع القاموس\n`,
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
  },
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
];

// Provide global access
window.pythonCurriculum = pythonCurriculum;

  