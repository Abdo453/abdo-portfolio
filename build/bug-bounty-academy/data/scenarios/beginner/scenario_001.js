// ==========================================================
// SCENARIO 001: IDOR IN API ENDPOINT - FULL USER DATA LEAK
// ==========================================================

window.scenario_001 = {
  "metadata": {
    "id": "scenario-001",
    "title": "IDOR in API Endpoint - Full User Data Leak",
    "level": "Beginner",
    "category": "Authorization",
    "company": "Shopify",
    "reward": "$6,500",
    "time": "30 Min"
  },
  "decisionLog": [
    {
      "hypothesis": "النسخة الثانية من الـ API v2 محمية بالكامل وتتحقق من صلاحيات المستخدمين.",
      "whyFailed": "كود المصادقة في v2 سليم بالفعل ويتحقق من الـ JWT token وعلاقته بمساحة العمل.",
      "planB": "فحص المسارات القديمة مثل v1 للتحقق مما إذا كانت لا تزال نشطة وتقبل طلبات.",
      "ignored": "محاولة فحص هجمات Brute force على لوحة تسجيل الدخول الرئيسية."
    }
  ],
  "payloads": [
    {
      "code": "GET /api/v1/workspaces/43/members HTTP/1.1\nAuthorization: Bearer [attacker_jwt]",
      "explanation": "استدعاء endpoint قديم v1 مع تمرير معرف مساحة عمل أخرى (43).",
      "whyWorked": "الـ API القديم لا يطابق معرف المستخدم مع معرف مساحة العمل المطلوبة، مما يسمح بتسريب البيانات.",
      "alternatives": [
        "GET /api/v1/workspaces/43/documents",
        "GET /api/v1/workspaces/43/documents/5001/download"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "التركيز الكامل على فحص مسارات v2 فقط.",
      "whyWrong": "المطورون غالبًا ما يحمون الإصدارات الأحدث وينسون إغلاق أو حماية الإصدارات القديمة.",
      "betterWay": "تجميع روابط الـ API التاريخية عبر Waybackurls وفحص إصدارات v1 و v2."
    }
  ],
  "steps": [
  {
    "name": "How a Real Bug Hunter Thinks",
    "time": "09:00",
    "workspace": "markdown",
    "xpReward": 100,
    "description": "### 🎯 الهدف من هذه الخطوة:\nفهم بيئة الهدف، وتحديد الثغرة المحتملة في الأنظمة القديمة.\n\n---\n\n### 📖 خلفية الشركة وسياق القصة\n\nأنت تعمل كباحث أمني (Security Researcher) مشارك في برنامج **Shopify Bug Bounty**.\n\nأطلق فريق تطوير منصة الشركاء مؤخراً إصداراً جديداً كلياً من واجهة البرمجية (API) لإدارة الملفات والملفات الشخصية وهو الإصدار `/api/v2` وهو محمي بالكامل ويتحقق من صلاحية المستخدم وعلاقته بكل مورد يطلبه بدقة.\n\nولكن، تسربت شائعات ومعلومات تاريخية تفيد بأن الإصدار القديم `/api/v1` لا يزال نشطاً في الخلفية ولم يتم إيقافه بالكامل من قبل المطورين لتجنب تعطيل بعض البرمجيات القديمة للشركاء.\n\n> **🧠 كيف يفكر الباحث الأمني؟ | فلسفة المنهجية الأحدث**\n> باحث الـ Bug Bounty المحترف لا يتوقف عند رؤية إصدار محمي بالكامل. بل يبحث دائماً عن الأبواب الخلفية والنسخ المتروكة (Legacy Endpoints). الإصدارات القديمة غالباً ما يتم إهمال تحديثها وتفقد تدابير الحماية الحديثة.\n> هدفنا الأساسي اليوم هو الإجابة عن السؤال التالي: **هل هناك بيانات سرية لشركاء آخرين يمكننا الوصول إليها بدون امتلاك صلاحيات، من خلال هذا الإصدار القديم؟**\n\n---\n\n### ❓ سؤال تفاعلي لتنشيط التفكير:\nما هو المفهوم الجوهري لثغرة **IDOR (Insecure Direct Object Reference)**؟",
    "choices": [
      {
        "text": "أ) عدم استخدام تشفير قوي لنقل البيانات عبر بروتوكول HTTPS.",
        "correct": false,
        "xp": -10,
        "timePenalty": 5,
        "outcome": "غير صحيح. هذا يتعلق بأمن قنوات الاتصال والتشفير وليس بالصلاحيات."
      },
      {
        "text": "ب) اعتماد الخادم على معرّف يرسله المستخدم للوصول للمورد دون التحقق من صلاحيته له.",
        "correct": true,
        "xp": 50,
        "outcome": "أحسنت! هذا هو المفهوم الجوهري لـ IDOR؛ السيرفر يثق بالرقم المرسل منه ويسلم المورد دون التأكد من أحقيته."
      },
      {
        "text": "ج) إرسال كميات هائلة من الطلبات لإغراق السيرفر وتعطيله.",
        "correct": false,
        "xp": -5,
        "timePenalty": 2,
        "outcome": "غير صحيح. هذا هجوم حجب الخدمة DoS."
      }
    ],
    "aiAdvisor": {
      "hint": "اقرأ تفاصيل القصة بعناية، المفهوم يدور حول التحكم بالوصول للمعرفات المباشرة.",
      "payloadExplanation": "لا يوجد استغلال كودي مطلوب في هذه الخطوة الأولى، بل فهم المنهجية.",
      "failureExplanation": "الإخفاق في تحديد مفهوم الـ IDOR يعني أنك بحاجة لمراجعة الأساسيات قبل البدء."
    }
  },
  {
    "name": "Recon and Information Gathering",
    "time": "09:15",
    "workspace": "recon",
    "xpReward": 150,
    "description": "### 🎯 الهدف من هذه الخطوة:\nاستخراج الروابط القديمة والمؤرشفة لاكتشاف مسارات إصدار `v1` النشطة.\n\n---\n\n### 🔍 ما هو الـ Recon ولماذا هو خطوتنا الأولى؟\n\nمرحلة **جمع المعلومات (Recon)** هي ما يفرق بين الهجوم العشوائي والهجوم المنظم. هدفنا الآن **ليس** استغلال ثغرة، بل بناء خريطة كاملة للمنافذ والمسارات النشطة.\n\n```text\nالموقع المستهدف (Website)\n     │\n     ├── ملفات JavaScript (JS Files) ──> (قد تحتوي على روابط مسارات قديمة)\n     ├── واجهات البرمجية (API) ───> (v1 & v2)\n     ├── ملف Robots.txt ──> (يكشف مسارات الإدارة الحساسة)\n     └── الأرشيف التاريخي ──> (Wayback Machine)\n```\n\n> **🧠 كيف يفكر الباحث الأمني؟ | لماذا نستخدم Waybackurls؟**\n> متصفحك يرى فقط الروابط المفعّلة حالياً في القوائم. ولكن أداة `waybackurls` تبحث في أرشيفات الإنترنت التاريخية (مثل Wayback Machine) وتجلب كافة الروابط التي تم أرشفتها وزيارتها للموقع عبر التاريخ. هذا يتيح لنا اكتشاف مسارات `/api/v1` منسية لم يعد أحد يتحدث عنها اليوم.\n\n---\n\n### 🛠️ تشغيل الأداة:\nاختر الأداة المناسبة لتشغيلها بالأسفل للبحث في الروابط التاريخية والأرشيف لـ `target-app.com`.",
    "terminalCommands": [
      {
        "name": "subfinder -d target-app.com -silent",
        "correct": false,
        "output": [
          {
            "text": "[INF] Enumerating subdomains for target-app.com",
            "type": "info"
          },
          {
            "text": "www.target-app.com",
            "type": "out"
          },
          {
            "text": "api.target-app.com",
            "type": "out"
          },
          {
            "text": "legacy.target-app.com",
            "type": "out"
          },
          {
            "text": "[INF] Subdomain enumeration completed.",
            "type": "success"
          }
        ]
      },
      {
        "name": "waybackurls target-app.com",
        "correct": true,
        "evidence": {
          "title": "Historical API v1 Endpoint",
          "content": "GET /api/v1/workspaces/{workspace_id}/members\nGET /api/v1/workspaces/{workspace_id}/documents\nGET /api/v1/workspaces/{workspace_id}/documents/5001/download"
        },
        "output": [
          {
            "text": "https://api.target-app.com/api/v2/auth/login",
            "type": "out"
          },
          {
            "text": "https://api.target-app.com/api/v2/workspaces/active",
            "type": "out"
          },
          {
            "text": "https://api.target-app.com/api/profile",
            "type": "out"
          },
          {
            "text": "https://api.target-app.com/api/settings",
            "type": "out"
          },
          {
            "text": "https://api.target-app.com/api/v1/workspaces/42/members",
            "type": "success"
          },
          {
            "text": "https://api.target-app.com/api/v1/workspaces/42/documents",
            "type": "success"
          },
          {
            "text": "https://api.target-app.com/api/v1/workspaces/43/members",
            "type": "success"
          },
          {
            "text": "https://api.target-app.com/api/v1/workspaces/43/documents/5001/download",
            "type": "success"
          },
          {
            "text": "[!] Notice: Detected active legacy API v1 endpoints and noisy routes in history!",
            "type": "success"
          }
        ]
      }
    ],
    "aiAdvisor": {
      "hint": "شغّل أمر waybackurls للبحث عن مسارات قديمة تم أرشفتها مسبقاً.",
      "payloadExplanation": "يقوم waybackurls بجلب جميع الروابط التاريخية المؤرشفة للموقع من خوادم الأرشيف.",
      "failureExplanation": "عدم فحص الروابط التاريخية سيحرمك من اكتشاف مسارات API القديمة المتروكة."
    }
  },
  {
    "name": "IDOR Hypothesis",
    "time": "09:40",
    "workspace": "markdown",
    "xpReward": 150,
    "description": "### 🎯 الهدف من هذه الخطوة:\nتحديد المتغيرات القابلة للتعديل والتحضير لتجربتها بناءً على تفكيك مسار الطلب.\n\n---\n\n### 💡 بناء الفرضية الأمنية وتفكيك مسار الـ API\n\nبعد تشغيل الأداة في الخطوة السابقة، اكتشفنا وجود هذا المسار التاريخي النشط:\n`GET /api/v1/workspaces/42/members`\n\nدعنا نقوم بتفكيك هذا الرابط وفهمه عن قرب لتحديد أين تكمن الثغرة.\n\n#### 🛠️ هيكلية الرابط التفاعلية:\n*(اضغط على الأجزاء الملونة بالأسفل لقراءة دورها وفهمها):*\n\n<div style=\"background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px; font-family:var(--font-mono); font-size:0.95rem; margin-bottom:15px; letter-spacing:0.5px; text-align:center;\">\n  <span class=\"ep-part\" data-explanation=\"طريقة GET: تستخدم لقراءة واسترجاع البيانات من الخادم دون تعديلها.\">GET</span> \n  <span class=\"ep-part\" data-explanation=\"مسار api/v1: إصدار الـ API القديم المنسي الذي نبحث فيه عن ثغرات الصلاحيات.\">/api/v1</span>/workspaces/\n  <span class=\"ep-part\" data-explanation=\"المعرّف 42: معرّف رقمي تسلسلي ومباشر لمساحة عملك (Direct Object Reference).\">42</span>/members\n</div>\n\n> **🧠 كيف يفكر الباحث الأمني؟ | بناء الفرضية**\n> وجود معرّف رقمي تسلسلي ومباشر (مثل `42`) يطرح فوراً الفرضية التالية:\n> *\"إذا كان المستخدم (1337) مسجلاً ولديه صلاحية لمساحته 42، وقام بتعديل الرقم يدوياً إلى 43 (التي تخص مستخدماً آخر)، هل سيقوم الخادم بالتحقق من الصلاحيات أم سيعتمد فقط على صلاحية الـ Token لإرجاع البيانات؟\"*\n\n---\n\n### ❓ سؤال تفاعلي قبل إظهار الإجابة:\nما المعامل (Parameter) الأكثر إثارة للاهتمام والجاهز للفحص في الرابط السابق لاختبار ثغرة IDOR؟",
    "choices": [
      {
        "text": "أ) الـ Bearer Token الخاص بالمصادقة والتحقق من الهوية.",
        "correct": false,
        "xp": -5,
        "timePenalty": 2,
        "outcome": "هذا توكن الهوية الخاص بك، تغييره أو حذفه سيؤدي إلى رفض الطلب بالكامل 401 Unauthorized."
      },
      {
        "text": "ب) معرّف مساحة العمل رقم 42.",
        "correct": true,
        "xp": 50,
        "outcome": "أحسنت! تغيير المعرّف المباشر (Object ID) للمورد هو جوهر هجوم IDOR."
      },
      {
        "text": "ج) نوع الطلب GET.",
        "correct": false,
        "xp": -5,
        "timePenalty": 2,
        "outcome": "لا، نوع الطلب GET هو فقط لقراءة البيانات، تغييره لـ POST دون سبب لن يفيدنا حالياً."
      }
    ],
    "aiAdvisor": {
      "hint": "اختر المعامل الرقمي الذي يمثل مساراً لمورد مباشر.",
      "payloadExplanation": "فحص المعرفات التسلسلية يتيح للباحث اكتشاف ثغرات التحكم بالوصول بسهولة.",
      "failureExplanation": "تغيير معاملات المصادقة يفقدك الجلسة ولا يساعد في فحص ثغرات الصلاحيات."
    }
  },
  {
    "name": "Burp Verification",
    "time": "10:05",
    "workspace": "burp",
    "xpReward": 200,
    "description": "### 🎯 الهدف من هذه الخطوة:\nتعديل الطلب يدوياً في البروكسي واختبار استجابة السيرفر.\n\n---\n\n### 🌐 إدخال البروكسي (Burp Suite) في سياق القصة\n\nالآن نريد إرسال الطلب، ولكن المتصفح العادي مصمم لاتباع قواعد التطبيق ولا يتيح لك تعديل الطلب وتغيير معامل الـ `id` بعد أن تضغط على الأزرار بشكل حر. \n\nلذلك، نقوم بإدخال أداة **Burp Suite** لتعمل كـ **Proxy (بروكسي اعتراض)** يقف في منتصف الطريق بين متصفحك والسيرفر. يعترض الطلب، يمنحك فرصة للتعديل عليه، ثم يرسله للسيرفر.\n\n```text\n  المتصفح (Browser)\n         │\n         │ (طلب طبيعي لمساحتك: workspace_id=42)\n         ▼\n  البروكسي (Burp Suite) ────[ نقوم بتعديل القيمة يدوياً: workspace_id=43 ]\n         │\n         │ (طلب معدل ومستهدف)\n         ▼\n    الخادم (Server) ────> يقوم بالمعالجة وإرسال النتيجة\n```\n\n> **🧠 كيف يفكر الباحث الأمني؟ | لماذا نفعل هذا؟**\n> نقوم بتعديل `workspace_id` من `42` إلى `43` مع إبقاء رمز المصادقة (Bearer Token) الخاص بنا كما هو. \n> إذا استجاب السيرفر برمز `200 OK` وأرجع لنا أعضاء مساحة العمل `43` والملفات الحساسة التابعة لهم، نكون قد أثبتنا الثغرة يقيناً!\n\n---\n\n### 🛠️ التحقق العملي:\nانظر إلى الطلب في نافذة Burp بالأسفل. قم بتعديل المعرف من `42` إلى `43` في مسار الطلب، ثم اضغط على زر **Verify IDOR** لمشاهدة الاستجابة وتأكيد الثغرة.",
    "burpRequest": "GET /api/v1/workspaces/42/members HTTP/1.1\nHost: api.target-app.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...\nAccept: application/json",
    "burpResponse": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"workspace_id\": 42,\n  \"members\": [\n    {\"user_id\": 1337, \"email\": \"attacker@example.com\", \"role\": \"member\"}\n  ]\n}",
    "burpActions": [
      {
        "name": "Verify IDOR",
        "correct": true,
        "modifiedRequest": "GET /api/v1/workspaces/43/members HTTP/1.1\nHost: api.target-app.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...\nAccept: application/json",
        "modifiedResponse": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"workspace_id\": 43,\n  \"members\": [\n    {\"user_id\": 999, \"email\": \"ceo@target-company.com\", \"role\": \"admin\"},\n    {\"user_id\": 998, \"email\": \"finance@target-company.com\", \"role\": \"member\"}\n  ],\n  \"documents\": [\n    {\"doc_id\": 5001, \"title\": \"Q4 Financial Report\", \"created_by\": 999}\n  ]\n}",
        "evidence": {
          "title": "IDOR Leak Workspace 43",
          "content": "GET /api/v1/workspaces/43/members -> Leaks Workspace Members & Documents"
        }
      }
    ],
    "aiAdvisor": {
      "hint": "اضغط على زر Verify IDOR لتعديل معرف مساحة العمل إلى 43.",
      "payloadExplanation": "الطلب المعدل يطلب بيانات مساحة عمل لا تنتمي للمهاجم.",
      "failureExplanation": "إذا لم تقم بتعديل المعرف، فلن تتمكن من تأكيد الثغرة."
    }
  },
  {
    "name": "Exploitation & Flag",
    "time": "10:30",
    "workspace": "lab",
    "xpReward": 300,
    "description": "### 🎯 الهدف من هذه الخطوة:\nالاستغلال الفعلي وتحميل الملف المالي للحصول على العلم (Flag) كإثبات للاختراق الكامل.\n\n---\n\n### 💥 تصعيد الأثر الأمني (Impact Escalation)\n\nرائع! لقد أثبتنا وجود IDOR في قائمة الأعضاء، ورأينا في استجابة السيرفر وجود ملف مالي حساس للغاية باسم `Q4 Financial Report` ويحمل المعرف `doc_id = 5001`.\n\nفي برامج الـ Bug Bounty، إثبات تسريب أسماء الموظفين قد يمنحك مكافأة متوسطة (Medium). ولكن كباحث محترف، يجب عليك دائماً البحث عن **تصعيد الأثر (Escalation)** للحصول على أعلى قيمة أمنية ومكافأة.\n\n> **🧠 كيف يفكر الباحث الأمني؟ | لماذا نصعد الأثر؟**\n> سنقوم الآن بفحص مسار تحميل الملفات لمعرفة ما إذا كان مصاباً بالـ IDOR أيضاً.\n> سنحاول طلب الملف مباشرة باستخدام المسار التاريخي للتحميل:\n> `GET /api/v1/workspaces/43/documents/5001/download`\n> قراءة المستندات والتقارير المالية السرية للضحية هي الدليل القاطع على وجود خطر بالغ يهدد سرية بيانات العملاء، مما يرفع الثغرة لمستوى خطورة **Critical** (حرجة).\n\n---\n\n### 🛠️ استخراج العلم:\nانسخ رابط التحميل وقم بطلبه في لوحة التحكم بالأسفل للحصول على ملف التقرير وقراءة العلم (Flag) بداخله لإثبات الاختراق.",
    "instructions": "قم باستغلال مسار تحميل الملفات لقراءة مستند التقرير المالي الحساس (doc_id = 5001) للحصول على العلم (Flag).",
    "targetUrl": "https://api.target-app.com/api/v1/workspaces/43/documents/5001/download",
    "correctFlag": "FLAG{api_v1_idor_workspace_takeover}",
    "aiAdvisor": {
      "hint": "استخدم الرابط الموضح للحصول على ملف التقرير وقراءة العلم بداخله: FLAG{api_v1_idor_workspace_takeover}",
      "payloadExplanation": "العلم يمثل إثبات الاختراق الكامل للوصول لملفات سرية.",
      "failureExplanation": "تأكد من كتابة العلم بدقة."
    }
  },
  {
    "name": "Report Writing",
    "time": "11:00",
    "workspace": "report",
    "xpReward": 250,
    "description": "### 🎯 الهدف من هذه الخطوة:\nشرح الثغرة، خطوات تكرارها، والأثر المترتب عليها بوضوح في تقرير أمني احترافي.\n\n---\n\n### 📝 صياغة التقرير الاحترافي للعميل\n\nالثغرة غير المكتوبة بتقرير احترافي هي ثغرة غير موجودة. المطورون والمشرفون يستقبلون مئات التقارير يومياً، والتقرير غير المنظم يضيع وقتهم وقد يؤدي لتقييم خاطئ للثغرة.\n\n> **🧠 كيف يفكر الباحث الأمني؟ | هيكل التقرير الأفضل**\n> 1. **العنوان (Title)**: يصف الخلل بوضوح دون تضخيم (مثال: IDOR in workspaces endpoint leaks documents).\n> 2. **خطوات الاستغلال (Steps to Reproduce)**: خطوات بسيطة وواضحة جداً يستطيع أي مطور محاكاتها لتكرار الثغرة.\n> 3. **الأثر الأمني (Impact)**: التوضيح المباشر لما يمكن للمهاجم فعله بالبيانات الحساسة المسربة.\n\nاكتب التقرير الآن في المحرر بالأسفل مع الحرص على كتابة الكلمات المفتاحية مثل `idor` و `v1` لتأكيد الأثر.",
    "aiAdvisor": {
      "hint": "اكتب الكلمات المفتاحية بالإنجليزية مثل 'idor' و 'v1' في التقرير.",
      "payloadExplanation": "صياغة التقرير مع إثبات التأثير الكامل (Critical impact).",
      "failureExplanation": "عدم كتابة الكلمات المفتاحية يؤدي لرفض التقرير أو تقليل المكافأة."
    }
  },
  {
    "name": "Triage & Verdict",
    "time": "5 Days Later",
    "workspace": "review",
    "xpReward": 0,
    "description": "### 🎯 الهدف من هذه الخطوة:\nفهم كواليس تقييم الثغرات وقبولها من جهة الشركات وسراديب التحكيم.\n\n---\n\n### ⚖️ كواليس التحكيم وحساب مكافأة الـ Bounty\n\nبعد إرسال تقريرك، يتم تحويله إلى فريق الـ **Triage** (مراجعة وتقييم الثغرات). هؤلاء المهندسون يراجعون تقريرك ويتأكدون من صحته وخلوه من التكرار، ثم يستخدمون نموذج CVSS لحساب الخطورة.\n\n> **🧠 كيف يفكر الباحث الأمني؟ | لماذا نهتم بنظام الـ Triage؟**\n> معرفتك بكيفية عمل فريق الـ Triage يساعدك على كتابة تقارير تتوافق مع معاييرهم. ثغرة IDOR التي تؤدي لتسريب مستندات مالية لشركات أخرى تقع مباشرة تحت معايير تسريب السرية الكامل (High/Critical Confidentiality Impact)، مما يضمن الحصول على الحد الأقصى للمكافأة المقررة.\n\nراجع التقييم النهائي بالأسفل واستلم مكافأتك!",
    "aiAdvisor": {
      "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
      "payloadExplanation": "قرار المشرف الأمني لإصلاح وحل الثغرة.",
      "failureExplanation": "لا يوجد فشل هنا."
    }
  },
  {
    "name": "Lessons Learned",
    "time": "Post-Incident",
    "workspace": "quiz",
    "xpReward": 150,
    "description": "### 🎯 الهدف من هذه الخطوة:\nفهم الإصلاح البرمجي لمنع ثغرات IDOR نهائياً في الخلفية (Backend).\n\n---\n\n### 🎓 الدروس البرمجية المستفادة وكيفية الوقاية\n\nالباحث الأمني المتميز يساعد المطورين في إغلاق الثغرة بشكل سليم وصحيح برمجياً.\n\n> **🧠 كيف يفكر الباحث الأمني؟ | كيف نغلق الثغرة برمجياً؟**\n> محاولة تشفير المعرفات أو إخفائها في الواجهة الأمامية (Frontend) هي حماية وهمية (Security by Obscurity). \n> الحل الجذري والوحيد هو التحقق في كل طلب بالخلفية (Backend):\n> هل معرف المستخدم الحالي (المستخرج من رمز المصادقة الـ JWT) يمتلك صلاحية حقيقية وعلاقة مسجلة في قاعدة البيانات بـ `workspace_id` المطلوبة قبل إرجاع أي رد؟\n\n---\n\n### ❓ أسئلة الوقاية والاختبار النهائي:\nأجب على الأسئلة بالأسفل لاختبار مدى استيعابك للمفاهيم الوقائية للثغرة.",
    "quizData": [
      {
        "question": "ما هو السبب الرئيسي لحدوث ثغرات IDOR؟",
        "options": [
          "عدم استخدام تشفير قوي لكلمات المرور.",
          "اعتماد الخادم على المدخلات القادمة من المستخدم للوصول للموارد دون التحقق من صلاحياته لها.",
          "استخدام جدار حماية ضعيف.",
          "تسريب ملفات التكوين."
        ],
        "answer": 1
      },
      {
        "question": "كيف يمكن للمطور حماية التطبيق من ثغرات IDOR بالكامل؟",
        "options": [
          "تشفير المعرفات فقط في الواجهة الأمامية.",
          "إلغاء تفعيل بروتوكول HTTP.",
          "تطبيق نظام تحكم بالصلاحيات (Access Control) صارم في كل طلب على مستوى الخادم.",
          "حظر استخدام Burp Suite."
        ],
        "answer": 2
      }
    ],
    "aiAdvisor": {
      "hint": "الإجابة الأولى هي الخيار الثاني، والإجابة الثانية هي الخيار الثالث.",
      "payloadExplanation": "التحقق من فهمك لآلية الحماية والإصلاح للثغرة.",
      "failureExplanation": "الإجابات الخاطئة تؤدي لخصم نقاط من الـ XP."
    }
  }
],
  "realReport": {
    "title": "IDOR in API v1 workspaces endpoint allows accessing private workspaces documents",
    "severity": "Critical",
    "type": "IDOR",
    "desc": "The legacy API v1 endpoint at /api/v1/workspaces/{id}/members and /documents does not perform relationship checks between the authenticated user and the requested workspace. Any user can access data of other workspaces.",
    "steps": "1. Login and get valid authorization token.\n2. Send request to /api/v1/workspaces/43/members and notice it returns workspace data.\n3. Access /api/v1/workspaces/43/documents/5001/download to download sensitive files.",
    "impact": "Unrestricted access to all customer workspaces and private financial files.",
    "feedback": "Outstanding report! The impact is critical due to direct leakage of private PDF invoices and financial sheets. Bounty awarded.",
    "keywords": [
      "idor",
      "v1"
    ]
  },
  "writeup": {
    "description": "ثغرة **IDOR (Insecure Direct Object Reference)** تحدث عندما يُرجع الـ API البيانات اعتماداً على معرّف مقدَّم من المستخدم دون التحقق من صلاحية الوصول. هنا المشكلة في الـ API القديم `/api/v1` الذي يعاني من:\n- **عدم التحقق من Authorization**: يتحقق فقط من صحة الـ JWT ولكن لا يتحقق من علاقة المستخدم بمساحة العمل المطلوبة.\n- **Legacy endpoints**: المطورون أضافوا حماية على `/api/v2` ونسوا أن `/api/v1` لا يزال يعمل.",
    "payloadAnalysis": "الـ payload هو طلب GET بسيط مع تعديل رقم المعرّف:\n```http\nGET /api/v1/workspaces/43/members HTTP/1.1\nHost: api.target-app.com\nAuthorization: Bearer [attacker_jwt]\n```\nتغيير `42` (مساحة عمل المهاجم) → `43` (مساحة عمل الضحية) يكشف البيانات الحساسة كاملة. المعرفات التسلسلية تجعل هذا الاستغلال بسيطاً جداً.",
    "impact": "**Critical ($6,500)** — وصول كامل لبيانات أعضاء مساحات العمل الأخرى، التقارير المالية السرية، أسماء المستخدمين وبريدهم الإلكتروني. في الحالات الإنتاجية: خرق كامل لـ GDPR وسيناريوهات الابتزاز.",
    "mitigation": "```javascript\n// Express.js middleware: Authorization check\nasync function authorizeWorkspaceAccess(req, res, next) {\n  const { workspace_id } = req.params;\n  const userId = req.user.id; // From JWT\n  \n  // Check if user belongs to this workspace\n  const membership = await db.WorkspaceMember.findOne({\n    where: {\n      workspace_id: workspace_id,\n      user_id: userId\n    }\n  });\n  \n  if (!membership) {\n    return res.status(403).json({\n      error: 'Access denied: You are not a member of this workspace'\n    });\n  }\n  \n  next();\n}\n\n// Apply middleware to ALL workspace routes (v1 AND v2)\napp.use('/api/v1/workspaces/:workspace_id', authorizeWorkspaceAccess);\napp.use('/api/v2/workspaces/:workspace_id', authorizeWorkspaceAccess);\n```"
  },
  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // 1. Detect SQL Injection attempts
    if (/union\s+select|' \s*or\s+|sleep\s*\(/i.test(requestText)) {
      return builder
        .setStatus(200)
        .setBody({ status: "success", members: [] })
        .setObservabilityLog("[WARN] Database Guard: SQL syntax keywords detected in query.\n[INFO] Database Driver: Escaped parameter successfully. Prepared Statements active.\n[INFO] SQLi validation complete: 0 rows returned.")
        .setOutcome("لقد حاولت حقن استعلام SQL. قاعدة البيانات تستخدم الاستعلامات المجهزة (Prepared Statements) بأمان، مما يمنع تمرير الأوامر إلى محرك SQL.")
        .build();
    }

    // 2. Detect XSS attempts
    if (/<script|javascript:|onload=/i.test(requestText)) {
      return builder
        .setStatus(200)
        .setBody({ status: "error", message: "Invalid characters detected: &lt;script&gt;" })
        .setObservabilityLog("[WARN] Security Filter: HTML tag syntax detected in request.\n[INFO] Sanitization: Encoded HTML tags to prevent cross-site scripting (XSS).")
        .setOutcome("لقد حاولت تنفيذ هجوم XSS. يقوم السيرفر بترميز النصوص والمحارف الخاصة (HTML Entity Encoding) قبل معالجتها، مما يبطل مفعول الكود.")
        .build();
    }

    // Handle noisy API routes before evaluating legacy v1 endpoints
    if (/^\/api\/(profile|settings|messages)/i.test(parsed.path) || /^\/api\/v2\//i.test(parsed.path)) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Resource not available or accessible." })
        .setObservabilityLog(`[INFO] API Router: Received request for noisy or modern endpoint "${parsed.path}".\n[INFO] Legacy router ignores this traffic.`)
        .setOutcome("هذا المسار غير مفيد للاختبار الحالي. ركز على المسارات القديمة في /api/v1/workspaces/...")
        .build();
    }

    // Check GET request paths
    const match = parsed.path.match(/^\/api\/v1\/workspaces\/(\d+)\/(members|documents(?:\/5001\/download)?)$/i);

    if (!match) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Endpoint not found or method not allowed on this path." })
        .setObservabilityLog(`[WARN] API Router: Route matching failed for request path "${parsed.path}".\n[INFO] Allowed paths: GET /api/v1/workspaces/{workspace_id}/members, /documents, or /documents/5001/download`)
        .setOutcome("المسار غير صحيح أو غير مدعوم في هذا السيناريو. استخدم مسار /api/v1/workspaces/{workspace_id}/members أو /documents أولاً.")
        .build();
    }

    const workspaceId = parseInt(match[1], 10);
    const subRoute = match[2];

    if (workspaceId === 42) {
      const body = { workspace_id: 42 };
      if (subRoute === 'members') {
        body.members = [
          { user_id: 1337, email: "attacker@example.com", role: "member" }
        ];
      } else {
        body.documents = [
          { doc_id: 5001, title: "Q4 Financial Report", created_by: 1337 }
        ];
      }
      return builder
        .setStatus(200)
        .setBody(body)
        .setObservabilityLog(`[INFO] API Router: Routing legacy v1 request.\n[INFO] Auth Handler: Bearer token validated for User_ID: 1337.\n[INFO] Authz Check: User is member of workspace 42. Access granted.\n[INFO] Data Controller: Returning workspace details for workspace 42.`)
        .setOutcome("تم طلب بيانات مساحة عملك الحالية (42). لتأكيد وجود ثغرة IDOR، حاول تغيير المعرف إلى مساحة عمل أخرى (مثلاً 43).")
        .build();
    } else if (workspaceId === 41) {
      return builder
        .setStatus(403, "Forbidden")
        .setBody({ error: "Access denied to workspace 41." })
        .setObservabilityLog(`[WARN] API Router: Access denied for workspace 41.\n[INFO] Auth Handler: Bearer token validated, but no membership found.`)
        .setOutcome("مساحة العمل 41 تمنع الوصول، مما يشير إلى أن ليس كل تغيير معرف يؤدي إلى ثغرة.")
        .build();
    } else if (workspaceId === 44) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Workspace 44 not found." })
        .setObservabilityLog(`[INFO] API Router: Workspace 44 not found.\n[INFO] Legacy router returned 404.`)
        .setOutcome("المساحة 44 غير موجودة. حاول مسارات أو أرقام معرفات أكثر صلة.")
        .build();
    } else if (workspaceId === 43) {
      if (subRoute === "members") {
        return builder
          .setStatus(200)
          .setBody({
            workspace_id: 43,
            members: [
              { user_id: 999, email: "ceo@target-company.com", role: "admin" },
              { user_id: 998, email: "finance@target-company.com", role: "member" }
            ],
            documents: [
              { doc_id: 5001, title: "Q4 Financial Report", created_by: 999 }
            ]
          })
          .setCorrect(true)
          .setObservabilityLog(`[INFO] API Router: Routing legacy v1 request.\n[INFO] Auth Handler: Bearer token validated for User_ID: 1337.\n[WARN] Authz Check: Missing authorization check between User: 1337 and Workspace: 43.\n[CRITICAL] Data Leakage: User: 1337 successfully accessed private data of Workspace: 43 (IDOR)!`)
          .setOutcome("تجاوزت صلاحيات الوصول بنجاح! السيرفر لم يتحقق من ملكيتك لمساحة العمل 43 وقام بإرجاع بيانات الأعضاء والملفات السرية.")
          .setEvidence("IDOR Leak Workspace 43", `GET /api/v1/workspaces/43/members -> Leaks Workspace Members & Documents`)
          .build();
      } else if (subRoute === 'documents') {
        return builder
          .setStatus(200)
          .setBody({
            workspace_id: 43,
            documents: [
              { doc_id: 5001, title: "Q4 Financial Report", created_by: 999 },
              { doc_id: 5002, title: "Employee Payroll", created_by: 999 }
            ]
          })
          .setCorrect(true)
          .setObservabilityLog(`[INFO] API Router: Routing legacy v1 request.\n[INFO] Auth Handler: Bearer token validated for User_ID: 1337.\n[WARN] Authz Check: Missing authorization check between User: 1337 and Workspace: 43.\n[CRITICAL] Data Leakage: User: 1337 successfully accessed document metadata for Workspace: 43 (IDOR)!`)
          .setOutcome("تم الوصول إلى قائمة المستندات لworkspace 43 بدون صلاحية مناسبة. هذا يؤكد وجود تسريب IDOR في API القديم.")
          .setEvidence("IDOR Leak Workspace 43 Documents", `GET /api/v1/workspaces/43/documents -> Leaks Document Metadata`)
          .build();
      } else {
        return builder
          .setStatus(200)
          .setBody({
            status: "success",
            message: "Downloading file Q4 Financial Report (PDF)...",
            download_url: "/api/v1/workspaces/43/documents/5001/download?token=..."
          })
          .setCorrect(true)
          .setObservabilityLog(`[INFO] API Router: Routing download request.\n[INFO] Auth Handler: Bearer token validated.\n[WARN] Authz Check: Missing access control on document download.\n[CRITICAL] Data Leakage: Downloaded sensitive Q4 Financial Report (doc_id: 5001).`)
          .setOutcome("تم الوصول إلى رابط التحميل بنجاح! هذا يؤكد إمكانية تسريب المستندات الحساسة بالكامل.")
          .build();
      }
    } else {
      return builder
        .setStatus(404, "Not Found")
        .setBody({
          error: `Workspace ${workspaceId} not found or access denied.`
        })
        .setObservabilityLog(`[INFO] API Router: Routing request to workspace ${workspaceId}.\n[WARN] Authz Check: Access denied. Workspace either does not exist or user has no relations.`)
        .setOutcome(`مساحة العمل ${workspaceId} غير صالحة أو لا تحتوي على بيانات مفيدة للاستغلال. حاول استهداف معرفات أكثر احتمالاً، مثل 43.`)
        .build();
    }
  }
};
