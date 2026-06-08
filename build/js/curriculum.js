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
            <p>استخدم <code>while</code> لطباعة قيمة <code>attempts</code> إذا كانت أقل من 3، وفي كل دورة قم بزيادة `attempts` بمقدار 1.</p>
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
  }
];

// Provide global access
window.pythonCurriculum = pythonCurriculum;
