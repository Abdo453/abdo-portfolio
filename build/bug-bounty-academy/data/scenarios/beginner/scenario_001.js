// ==========================================================
// SCENARIO 001: LEGACY API ENDPOINT INVESTIGATION
// ==========================================================

window.scenario_001 = {
  "metadata": {
    "id": "scenario-001",
    "title": "Legacy API Endpoint Investigation",
    "level": "Beginner",
    "category": "API Security",
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
  "debrief": {
    "correct": "لقد نجحت في تحديد مسار الإصدار القديم (/api/v1) بدلاً من تضييع الوقت في فحص /api/v2 المؤمنة بالكامل، وقمت بربط مسار Waybackurls مع تحديد المعرف التسلسلي وثغرة التحكم بالوصول.",
    "wasted": "محاولة تجربة ثغرات عشوائية مثل حقن SQL في مسارات API المؤمنة أو تخمين معاملات غير تسلسلية دون بناء فرضية أمنية واضحة أولاً.",
    "faster": "كان بإمكانك ملاحظة أن الـ Endpoint v1 يعيد معرفات مباشرة (Object References) مثل workspace_id=42 مما يعني وجود ثغرة IDOR بنسبة 90% دون محاولة فحص ثغرات أخرى.",
    "expert": "الباحث الخبير بخمس سنوات خبرة سيقوم مباشرة بكتابة سكربت أتمتة (Python script) لفحص وتجربة معرفات مساحات العمل دفعة واحدة من 1 إلى 100 لاستخراج كافة البيانات الحساسة وتسريبها (Massive Data Leakage) ليرتفع التقرير فوراً لتصنيف خطورة حرجة Critical ويضمن المكافأة الكبرى بقيمة 6,500$."
  },
  "steps": [
    {
      "name": "How a Real Bug Hunter Thinks",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "logEntry": "تم بدء التحقيق: تقييم نطاق أهداف البوابة لشركاء Shopify.",
      "expertMindset": "أنت الآن لا تبحث عن الثغرة مباشرة، بل تبحث عن نقاط الضعف المنطقية في تصميم بنية الأنظمة. نادراً ما تنسى الشركات حذف واجهة برمجة (API) قديمة بالكامل، ولكنها غالباً ما تنسى تحديث صلاحياتها الأمنية عند إطلاق الإصدارات الجديدة.",
      "whyExplanation": "### لماذا نبدأ بالبحث عن نسخ الـ API القديمة بدلاً من فحص الثغرات الأخرى؟\n\n1. **مبدأ الأمان الأسهل (Path of Least Resistance)**: المطورون في الشركات الكبيرة يقومون بحماية وتأمين الأجزاء الأساسية والحديثة من النظام (مثل v2) باستمرار، بينما يُهملون حماية الأنظمة القديمة أو المنسية (مثل v1).\n2. **غياب جدار الحماية (Firewall Auditing)**: الأنظمة القديمة غالباً لا تخضع للـ Monitoring والتدقيق الأمني بنفس القوة.\n3. **لماذا ليس SQLi؟**: قواعد البيانات اليوم تستخدم ORMs واستعلامات مجهزة (Prepared Statements) بشكل قياسي مما يجعل SQLi نادراً في الشركات الكبيرة مثل Shopify، بينما الأخطاء المنطقية في الصلاحيات (Authorization Logic) هي الثغرة الأكثر انتشاراً وتكلفة.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nفهم بيئة الهدف، وتحديد الثغرة المحتملة في الأنظمة القديمة.\n\n---\n\n### 📖 خلفية الشركة وسياق القصة\n\nأنت تعمل كباحث أمني (Security Researcher) مشارك في برنامج **Shopify Bug Bounty**.\n\nأطلق فريق تطوير منصة الشركاء مؤخراً إصداراً جديداً كلياً من واجهة البرمجية (API) لإدارة الملفات والملفات الشخصية وهو الإصدار `/api/v2` وهو محمي بالكامل ويتحقق من صلاحية المستخدم وعلاقته بكل مورد يطلبه بدقة.\n\nولكن، تسربت شائعات ومعلومات تاريخية تفيد بأن الإصدار القديم `/api/v1` لا يزال نشطاً في الخلفية ولم يتم إيقافه بالكامل من قبل المطورين لتجنب تعطيل بعض البرمجيات القديمة للشركاء.\n\nهدفنا الأساسي اليوم هو الإجابة عن السؤال التالي: **هل هناك بيانات سرية لشركاء آخرين يمكننا الوصول إليها بدون امتلاك صلاحيات، من خلال هذا الإصدار القديم؟**\n\n---\n\n### ❓ سؤال تفاعلي لتنشيط التفكير:\nما هي المشكلة الأمنية الأكثر شيوعاً عند الاحتفاظ بإصدارات API قديمة (مثل v1) نشطة في الخلفية؟",
      "choices": [
        {
          "text": "أ) عدم دعم تشفير HTTPS على المسارات القديمة.",
          "correct": false,
          "xp": -10,
          "timePenalty": 5,
          "outcome": "غير صحيح. هذا يتعلق بأمن قنوات الاتصال والتشفير وليس بالصلاحيات."
        },
        {
          "text": "ب) نسيان المطورين لتحديث وتطبيق ضوابط التحقق من الصلاحيات (Access Control) عليها بنفس مستوى النسخ الحديثة.",
          "correct": true,
          "xp": 50,
          "outcome": "أحسنت! هذا هو المفهوم الفعلي؛ المطورون يركزون على تأمين v2 ويهملون تدقيق الصلاحيات في v1 المنسي."
        },
        {
          "text": "ج) سهولة تخمين كلمات مرور مدراء النظام عبر مسارات v1.",
          "correct": false,
          "xp": -5,
          "timePenalty": 2,
          "outcome": "غير صحيح. مسارات الـ API القديمة لا تسهل تخمين كلمات المرور مباشرة."
        }
      ],
      "aiAdvisor": {
        "hint": "اقرأ تفاصيل القصة بعناية، المفهوم يدور حول التحكم بالوصول في الأنظمة المتروكة.",
        "payloadExplanation": "لا يوجد استغلال كودي مطلوب في هذه الخطوة الأولى، بل فهم المنهجية.",
        "failureExplanation": "الإخفاق في تحديد الفكرة يعني أنك بحاجة لمراجعة المنهجيات أولاً."
      }
    },
    {
      "name": "Recon and Information Gathering",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "logEntry": "فحص Waybackurls المكتمل. تم رسم خريطة بالمسارات التاريخية للـ API.",
      "expertMindset": "أداة waybackurls هي بمثابة آلة زمن للإنترنت. المهاجم أو الباحث الذكي لا يسأل السيرفر الحالي فقط عما لديه، بل يبحث في ذاكرة الإنترنت القديمة عن أسرار وروابط نسيتها الشركة نفسها.",
      "whyExplanation": "### لماذا نستخدم أداة Waybackurls في جمع المعلومات بدلاً من التصفح اليدوي؟\n\n1. **تاريخ التطبيق**: التصفح اليدوي يظهر لك فقط ما هو متاح للمستخدمين اليوم. أداة Waybackurls تسحب التاريخ المؤرشف للتطبيق في الإنترنت بأكمله منذ سنوات، مما يكشف عن مسارات غير مستخدمة برمجياً في الواجهة الأمامية الحالية ولكنها لا تزال تعمل وتستجيب في الخلفية (Backend).\n2. **توفير الوقت**: بضغطة زر نتحصل على آلاف الروابط المؤرشفة ونفلترها للبحث عن كلمات مثل /api/v1/ دون الحاجة للقيام بعمليات فحص عشوائية قد تعرضنا للحظر.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nاستخراج الروابط القديمة والمؤرشفة لاكتشاف مسارات إصدار `v1` النشطة.\n\n---\n\n### 🔍 ما هو الـ Recon ولماذا هو خطوتنا الأولى؟\n\nمرحلة **جمع المعلومات (Recon)** هي ما يفرق بين الهجوم العشوائي والهجوم المنظم. هدفنا الآن **ليس** استغلال ثغرة، بل بناء خريطة كاملة للمنافذ والمسارات النشطة.\n\n```text\nالموقع المستهدف (Website)\n     │\n     ├── ملفات JavaScript (JS Files) ──> (قد تحتوي على روابط مسارات قديمة)\n     ├── واجهات البرمجية (API) ───> (v1 & v2)\n     ├── ملف Robots.txt ──> (يكشف مسارات الإدارة الحساسة)\n     └── الأرشيف التاريخي ──> (Wayback Machine)\n```\n\n---\n\n### 🛠️ تشغيل الأداة:\nاختر الأداة المناسبة لتشغيلها بالأسفل للبحث في الروابط التاريخية والأرشيف لـ `target-app.com`.",
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
      "name": "Endpoint Parameter Analysis",
      "time": "09:40",
      "workspace": "markdown",
      "xpReward": 150,
      "logEntry": "تم تحليل معاملات v1 للـ workspace. الاشتباه بضعف في عزل الموارد.",
      "expertMindset": "المعرفات الرقمية التسلسلية المباشرة (مثل 42) هي بمثابة دعوة مفتوحة للفحص. الباحث المحترف يركز فوراً على هذه المعلمات لأنها تمثل الطريقة الأسهل لاختبار مدى قوة تطبيق نظام الفصل بين صلاحيات العملاء (Multi-tenant isolation).",
      "whyExplanation": "### لماذا هذا المعرّف (Object Reference) هو الأهم بدلاً من المعاملات الأخرى أو ملفات الارتباط (Cookies)؟\n\n1. **معامل التحكم المباشر**: المطور استخدم معرّفاً رقمياً تسلسلياً صريحاً (\`42\`) لجلب المورد. هذا يعني أن التطبيق يعتمد على هذه القيمة لتحديد السجل المطلوب في قاعدة البيانات.\n2. **توقع غياب الـ Relationship Validation**: في الـ APIs القديمة، غالباً ما يتحقق السيرفر من صحة الـ Token فقط (هل هذا المستخدم مسجل؟), ولكنه لا يتحقق من علاقة هذا المستخدم بالرقم الممرر (هل يملك المستخدم صلاحية لرؤية مساحة العمل 43؟).\n3. **لماذا ليس الكوكيز؟**: الكوكيز أو توكن Bearer يثبت هويتك أنت فقط، لكنه لا يحدد المورد الذي تحاول الوصول إليه. الخلل الأمني يكمن في عدم الربط بين الهوية (الـ JWT) والمورد المطلوب (الـ Object ID).",
      "description": "### 🎯 الهدف من هذه الخطوة:\nتحديد المتغيرات القابلة للتعديل والتحضير لتجربتها بناءً على تفكيك مسار الطلب.\n\n---\n\n### 💡 بناء الفرضية الأمنية وتفكيك مسار الـ API\n\nبعد تشغيل الأداة في الخطوة السابقة، اكتشفنا وجود هذا المسار التاريخي النشط:\n`GET /api/v1/workspaces/42/members`\n\nدعنا نقوم بتفكيك هذا الرابط وفهمه عن قرب لتحديد أين تكمن الثغرة.\n\n#### 🛠️ هيكلية الرابط التفاعلية:\n*(اضغط على الأجزاء الملونة بالأسفل لقراءة دورها وفهمها):*\n\n<div style=\"background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:8px; font-family:var(--font-mono); font-size:0.95rem; margin-bottom:15px; letter-spacing:0.5px; text-align:center;\">\n  <span class=\"ep-part\" data-explanation=\"طريقة GET: تستخدم لقراءة واسترجاع البيانات من الخادم دون تعديلها.\">GET</span> \n  <span class=\"ep-part\" data-explanation=\"مسار api/v1: إصدار الـ API القديم المنسي الذي نبحث فيه عن ثغرات الصلاحيات.\">/api/v1</span>/workspaces/\n  <span class=\"ep-part\" data-explanation=\"المعرّف 42: معرّف رقمي تسلسلي ومباشر لمساحة عملك (Direct Object Reference).\">42</span>/members\n</div>\n\n---\n\n### ❓ سؤال تفاعلي قبل إظهار الإجابة:\nما الذي يمثله الرقم `42` في المسار السابق وكيف يمكن استخدامه لبناء فرضية اختبار الصلاحيات؟",
      "choices": [
        {
          "text": "أ) رقم سري لتشابك التشفير يمنع اعتراض الطلبات.",
          "correct": false,
          "xp": -5,
          "timePenalty": 2,
          "outcome": "لا، الرقم 42 هو مجرد معرّف رقمي بسيط للمورد وليس له علاقة بالتشفير."
        },
        {
          "text": "ب) معرّف كائن مباشر (Direct Object Reference) يمكن محاولة تغييره للتحقق مما إذا كان السيرفر سيسرب بيانات الآخرين دون مصادقة كافية.",
          "correct": true,
          "xp": 50,
          "outcome": "أحسنت! هذا المعرّف يمثل مساحة العمل المباشرة، وتغييره هو جوهر بناء فرضيات اختبار الصلاحيات والتحكم بالوصول."
        },
        {
          "text": "ج) عنوان IP الخادم الخلفي لقاعدة البيانات.",
          "correct": false,
          "xp": -5,
          "timePenalty": 2,
          "outcome": "غير صحيح. عناوين الـ IP لا تظهر كمعرفات مسار مساحات العمل داخل طلبات الـ HTTP."
        }
      ],
      "aiAdvisor": {
        "hint": "اختر المعامل الرقمي الذي يمثل مساراً لمورد مباشر.",
        "payloadExplanation": "فحص المعرفات التسلسلية يتيح للباحث اكتشاف ثغرات التحكم بالوصول بسهولة.",
        "failureExplanation": "تغيير معاملات المصادقة يفقدك الجلسة ولا يساعد في فحص ثغرات الصلاحيات."
      }
    },
    {
      "name": "Request Tampering & Verification",
      "time": "10:05",
      "workspace": "burp",
      "xpReward": 200,
      "logEntry": "اعتراض الطلب في البروكسي. تم اختبار معرفات متعددة (41، 44) وتأكيد المشكلة في المعرف 43.",
      "expertMindset": "البروكسي هو العين التي ترى بها الطلب الحقيقي. الواجهات الأمامية (Frontend) تكذب وتخفي الأشياء وتلتزم بالقواعد، أما البروكسي فيعطيك الحقيقة المجردة ويسمح لك بخرق كل القواعد البرمجية المفروضة على متصفحك.",
      "whyExplanation": "### لماذا نحتاج لاستخدام البروكسي (Burp Suite) بدلاً من المتصفح العادي للتحقق؟\n\n1. **كسر قيود الواجهة الأمامية**: المتصفحات العادية مصممة لخدمة المستخدم العادي وتنفذ فقط الأزرار المبرمجة فيها. إذا كان الزر مبرمجاً لطلب مساحتك فقط (42)، فلن يتيح لك المتصفح تعديل الطلب يدوياً قبل إرساله.\n2. **التحكم الكامل بالبروتوكول**: البروكسي يتيح لك اعتراض الطلب في الهواء (In-Flight) وتعديل أي بايت فيه (تعديل المعرف إلى 43، تعديل الترويسات Headers، أو التوكن)، ومراقبة الاستجابة الخام من الخادم قبل قيام المتصفح بتفسيرها.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nتعديل الطلب يدوياً في البروكسي واختبار استجابة السيرفر.\n\n---\n\n### 🌐 إدخال البروكسي (Burp Suite) في سياق القصة\n\nالآن نريد إرسال الطلب، ولكن المتصفح العادي مصمم لاتباع قواعد التطبيق ولا يتيح لك تعديل الطلب وتغيير معامل الـ `id` بعد أن تضغط على الأزرار بشكل حر. \n\nلذلك، نقوم بإدخال أداة **Burp Suite** لتعمل كـ **Proxy (بروكسي اعتراض)** يقف في منتصف الطريق بين متصفحك والسيرفر. يعترض الطلب، يمنحك فرصة للتعديل عليه، ثم يرسله للسيرفر.\n\n```text\n  المتصفح (Browser)\n         │\n         │ (طلب طبيعي لمساحتك: workspace_id=42)\n         ▼\n  البروكسي (Burp Suite) ────[ نقوم بتعديل القيمة يدوياً: workspace_id=43 ]\n         │\n         │ (طلب معدل ومستهدف)\n         ▼\n    الخادم (Server) ────> يقوم بالمعالجة وإرسال النتيجة\n```\n\n---\n\n### 🛠️ التحقق العملي:\nانظر إلى الطلب في نافذة Burp بالأسفل. \n\n*جرّب إرسال طلبات لمعرفات مختلفة لمعرفة كيف يتعامل الخادم معها:*\n* جرّب تعديل المعرف إلى **41** لرؤية كيف يمنع الوصول (403 Forbidden).\n* جرّب تعديل المعرف إلى **44** لرؤية كيف يعيد (404 Not Found).\n* جرّب تعديل المعرف إلى **43** لتأكيد وجود خلل التحكم بالوصول والحصول على البيانات الحساسة للضحية.",
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
        "hint": "أرسل الطلب مع تعديل المعرف إلى 43 لتأكيد الثغرة والحصول على المبررات الكافية.",
        "payloadExplanation": "الطلب المعدل يطلب بيانات مساحة عمل لا تنتمي للمهاجم.",
        "failureExplanation": "إذا لم تقم بتعديل المعرف إلى 43، فلن تتمكن من تأكيد الثغرة."
      }
    },
    {
      "name": "Exploitation & Impact Escalation",
      "time": "10:30",
      "workspace": "lab",
      "xpReward": 300,
      "logEntry": "تحميل التقرير المالي Q4 بنجاح. تم تصعيد الأثر الأمني وتأكيد الثغرة.",
      "expertMindset": "في عالم مكافآت الثغرات، الأثر هو الملك (Impact is King). تسريب قائمة أعضاء مساحة العمل قد يساوي مكافأة 500$، لكن تسريب التقرير المالي السري للشركة يرفع خطورة الثغرة إلى Critical ويجعل مكافأتها تقفز إلى 6,500$.",
      "whyExplanation": "### لماذا نقوم بتصعيد الأثر (Escalation) وتحميل الملف المالي بدلاً من التوقف عند تسريب الأعضاء؟\n\n1. **تحديد خطورة الثغرة (Severity)**: في عالم الـ Bug Bounty، تسريب قائمة أسماء الأعضاء (Members List) قد يصنف كخطورة متوسطة (Medium) لأن الأسماء قد تكون شبه عامة. ولكن الوصول إلى المستندات المالية والتقارير السرية (Financial Reports) يعتبر تسريباً لبيانات بالغة السرية، مما يرفع الثغرة فوراً إلى خطورة حرجة (Critical).\n2. **حساب المكافأة**: قيمة مكافأتك ترتبط مباشرة بمدى الضرر الذي يمكن للمهاجم إحداثه. إثبات القدرة على قراءة المستندات الحساسة يضمن لك مكافأة تبلغ أضعاف المكافأة العادية.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nالاستغلال الفعلي وتحميل الملف المالي للحصول على العلم (Flag) كإثبات للاختراق الكامل.\n\n---\n\n### 💥 تصعيد الأثر الأمني (Impact Escalation)\n\nرائع! لقد أثبتنا وجود ضعف في مسار الأعضاء، ورأينا في استجابة السيرفر وجود ملف مالي حساس للغاية باسم `Q4 Financial Report` ويحمل المعرف `doc_id = 5001`.\n\nفي برامج الـ Bug Bounty، إثبات تسريب أسماء الموظفين قد يمنحك مكافأة متوسطة (Medium). ولكن كباحث محترف، يجب عليك دائماً البحث عن **تصعيد الأثر (Escalation)** للحصول على أعلى قيمة أمنية ومكافأة.\n\nسنحاول طلب الملف مباشرة باستخدام المسار التاريخي للتحميل:\n`GET /api/v1/workspaces/43/documents/5001/download`\nقراءة المستندات والتقارير المالية السرية للضحية هي الدليل القاطع على وجود خطر بالغ يهدد سرية بيانات العملاء، مما يرفع الثغرة لمستوى خطورة **Critical** (حرجة).\n\n---\n\n### 🛠️ استخراج العلم:\nانسخ رابط التحميل وقم بطلبه في لوحة التحكم بالأسفل للحصول على ملف التقرير وقراءة العلم (Flag) بداخله لإثبات الاختراق.",
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
      "name": "Security Report Writing",
      "time": "11:00",
      "workspace": "report",
      "xpReward": 250,
      "logEntry": "صياغة التقرير الأمني وإرساله لمراجعة فريق أمان Shopify.",
      "expertMindset": "جودة تقريرك تحدد خطوتك القادمة. التقرير السيء المكتوب بعجلة قد يجعل الشركة ترفض الثغرة أو تقلل قيمتها، بينما التقرير المتقن والمكتوب باحترافية يجبر فريق التقييم على احترامه وصرف أعلى مكافأة ممكنة.",
      "whyExplanation": "### لماذا صياغة التقرير بوضوح ودقة لها نفس أهمية اكتشاف الثغرة؟\n\n1. **إقناع فريق الـ Triage**: المهندس الذي يراجع تقريرك يقرأ عشرات التقارير يومياً. إذا لم يجد خطوات واضحة (Reproduction Steps) وأثراً أمنياً حقيقياً، فقد يغلق التقرير كـ \"غير مكتمل\" أو يقلل تصنيفه.\n2. **تسريع عملية الإصلاح (Patches)**: التقرير الواضح يتيح للمطورين فهم المشكلة وحلها فوراً، مما يقلل الوقت المستغرق لإطلاق المكافأة لك.\n3. **الاحترافية**: كتابة تقرير منظم يعكس مهارة الباحث الأمني ويبني علاقة ثقة طويلة الأمد مع الشركات.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nشرح الثغرة، خطوات تكرارها، والأثر المترتب عليها بوضوح في تقرير أمني احترافي.\n\n---\n\n### 📝 صياغة التقرير الاحترافي للعميل\n\nالملخص غير المكتوب بتقرير احترافي هو ثغرة غير موجودة. المطورون والمشرفون يستقبلون مئات التقارير يومياً، والتقرير غير المنظم يضيع وقتهم وقد يؤدي لتقييم خاطئ للثغرة.\n\n1. **العنوان (Title)**: يصف الخلل بوضوح دون تضخيم (مثال: Broken access control in workspaces endpoint leaks documents).\n2. **خطوات الاستغلال (Steps to Reproduce)**: خطوات بسيطة وواضحة جداً يستطيع أي مطور محاكاتها لتكرار الثغرة.\n3. **الأثر الأمني (Impact)**: التوضيح المباشر لما يمكن للمهاجم فعله بالبيانات الحساسة المسربة.\n\nاكتب التقرير الآن في المحرر بالأسفل مع الحرص على كتابة الكلمات المفتاحية مثل `idor` و `v1` لتأكيد الأثر.",
      "aiAdvisor": {
        "hint": "اكتب الكلمات المفتاحية بالإنجليزية مثل 'idor' و 'v1' في التقرير ليرتفع التقييم تلقائياً.",
        "payloadExplanation": "صياغة التقرير مع إثبات التأثير الكامل (Critical impact).",
        "failureExplanation": "عدم كتابة الكلمات المفتاحية يؤدي لرفض التقرير أو تقليل المكافأة."
      }
    },
    {
      "name": "Triage & Bounty Verdict",
      "time": "5 Days Later",
      "workspace": "review",
      "xpReward": 0,
      "logEntry": "قبول التقرير وتصنيفه كخطورة حرجة. مكافأة بقيمة 6,500$ معتمدة.",
      "expertMindset": "مهندس الـ Triage هو محامي الشركة وحكم المباراة في نفس الوقت. هو يحاول حماية أنظمة الشركة والتأكد من صحة الثغرة، لكن عندما تقدم له خطوات واضحة وسيناريو ضرر كامل، فلن يملك خياراً سوى تصنيف الثغرة بأعلى خطورة وقبول تقريرك.",
      "whyExplanation": "### لماذا تستغرق عملية التقييم عدة أيام وكيف تقيم الشركات خطورة الثغرات؟\n\n1. **التحقق الفعلي**: يقوم فريق الأمان في الشركة بإعادة تطبيق خطواتك على بيئة اختبار داخلية للتأكد من أن الثغرة حقيقية وليست وهماً أو ادعاءً.\n2. **تحديد القيمة المالية**: يتم مقارنة الثغرة بجدول المكافآت الخاص بالشركة (Bounty Table) بناءً على مستوى الأثر (Confidentiality, Integrity, Availability) باستخدام نظام CVSS.\n3. **التواصل مع المطورين**: يتم إرسال المشكلة للمطورين المسؤولين لبدء العمل على كتابة الإصلاح البرمجي وتثبيته.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nفهم كواليس تقييم الثغرات وقبولها من جهة الشركات وسراديب التحكيم.\n\n---\n\n### ⚖️ كواليس التحكيم وحساب مكافأة الـ Bounty\n\nبعد إرسال تقريرك، يتم تحويله إلى فريق الـ **Triage** (مراجعة وتقييم الثغرات). هؤلاء المهندسون يراجعون تقريرك ويتأكدون من صحته وخلوه من التكرار، ثم يستخدمون نموذج CVSS لحساب الخطورة.\n\nمعرفتك بكيفية عمل فريق الـ Triage يساعدك على كتابة تقارير تتوافق مع معاييرهم. الثغرة التي تؤدي لتسريب مستندات مالية لشركات أخرى تقع مباشرة تحت معايير تسريب السرية الكامل (High/Critical Confidentiality Impact)، مما يضمن الحصول على الحد الأقصى للمكافأة المقررة.\n\nراجع التقييم النهائي بالأسفل واستلم مكافأتك!",
      "aiAdvisor": {
        "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
        "payloadExplanation": "قرار المشرف الأمني لإصلاح وحل الثغرة.",
        "failureExplanation": "لا يوجد فشل هنا."
      }
    },
    {
      "name": "Prevention & Remediation",
      "time": "Post-Incident",
      "workspace": "quiz",
      "xpReward": 150,
      "logEntry": "مراجعة كود الإصلاح والوقاية البرمجية. اكتمال التحقيق بنجاح.",
      "expertMindset": "الأمان ليس جدار حماية خارجي فقط؛ الأمان هو كتابة كود نظيف يتبع فرضية عدم الثقة المطلقة بالمدخلات (Zero Trust input validation). المطور الجيد لا يفترض أبداً أن المستخدم يرسل بيانات صحيحة.",
      "whyExplanation": "### لماذا يعتبر التحقق في كل طلب بالخلفية (Backend Check) هو الحل الوحيد لمنع ثغرات IDOR؟\n\n1. **عدم الثقة بالعميل (Zero Client Trust)**: كل البيانات القادمة من المتصفح أو التطبيق (سواءً كانت معرّفات، كوكيز، أو متغيرات) يمكن التلاعب بها وتعديلها بسهولة بواسطة أدوات مثل Burp. لذلك، يجب ألا يثق الخادم بأي معرف يرسله المستخدم دون التحقق منه.\n2. **الربط الإجباري**: يجب أن تبدو جملة التحقق في السيرفر هكذا: \`هل المستخدم الحالي (المعرف من الـ JWT) عضو نشط في مساحة العمل المطلوبة (workspace_id)؟\`، إذا كانت الإجابة لا، يجب حظر الطلب فوراً برمز 403 Forbidden.",
      "description": "### 🎯 الهدف من هذه الخطوة:\nفهم الإصلاح البرمجي لمنع ثغرات التحكم بالوصول نهائياً في الخلفية (Backend).\n\n---\n\n### 🎓 الدروس البرمجية المستفادة وكيفية الوقاية\n\nالباحث الأمني المتميز يساعد المطورين في إغلاق الثغرة بشكل سليم وصحيح برمجياً.\n\nمحاولة تشفير المعرفات أو إخفائها في الواجهة الأمامية (Frontend) هي حماية وهمية (Security by Obscurity). \n\nالحل الجذري والوحيد هو التحقق في كل طلب بالخلفية (Backend):\nهل معرف المستخدم الحالي (المستخرج من رمز المصادقة الـ JWT) يمتلك صلاحية حقيقية وعلاقة مسجلة في قاعدة البيانات بـ `workspace_id` المطلوبة قبل إرجاع أي رد؟\n\n---\n\n### ❓ أسئلة الوقاية والاختبار النهائي:\nأجب على الأسئلة بالأسفل لاختبار مدى استيعابك للمفاهيم الوقائية للثغرة.",
      "quizData": [
        {
          "question": "ما هو السبب الرئيسي لحدوث ثغرات التحكم بالوصول المباشر (مثل IDOR)؟",
          "options": [
            "عدم استخدام تشفير قوي لكلمات المرور.",
            "اعتماد الخادم على المدخلات الرقمية القادمة من المستخدم دون التحقق من امتلاكه للمورد المستهدف.",
            "استخدام جدار حماية ضعيف.",
            "تسريب ملفات التكوين."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن للمطور حماية التطبيق بالكامل من ثغرات الوصول غير المصرح للمعرفات؟",
          "options": [
            "تشفير المعرفات فقط في الواجهة الأمامية.",
            "إلغاء تفعيل بروتوكول HTTP.",
            "تطبيق نظام تحكم بالصلاحيات (Access Control) صارم في كل طلب على مستوى الخادم يربط التوكن بالمعرف.",
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
    "title": "Broken access control in workspaces endpoint leaks documents",
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
        .setOutcome("مساحة العمل 41 تمنع الوصول (403 Forbidden)، مما يشير إلى أن ليس كل تغيير معرف يؤدي إلى ثغرة وأن هناك نظام صلاحيات مفعل لبعض المعرفات.")
        .build();
    } else if (workspaceId === 44) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Workspace 44 not found." })
        .setObservabilityLog(`[INFO] API Router: Workspace 44 not found.\n[INFO] Legacy router returned 404.`)
        .setOutcome("المساحة 44 غير موجودة على الخادم (404 Not Found). حاول تجربة أرقام معرفات أخرى تسلسلية.")
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
