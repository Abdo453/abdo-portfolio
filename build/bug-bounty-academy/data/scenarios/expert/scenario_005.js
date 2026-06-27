// ==========================================================
// SCENARIO 005: TIME-BASED BLIND SQLI - ADMIN PASSWORD EXTRACTION
// ==========================================================

window.scenario_005 = {
  "metadata": {
    "id": "scenario-005",
    "title": "Time-Based Blind SQLi - Admin Password Extraction",
    "level": "Expert",
    "category": "API Security",
    "company": "Tesla",
    "reward": "$3,500",
    "time": "3+ Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "الموقع محمي تماماً من ثغرات SQLi لعدم وجود رسائل خطأ أو استجابة ظاهرة.",
      "whyFailed": "عدم وجود رسالة خطأ لا يعني عدم وجود ثغرة، فالاستعلام قد ينفذ في الخلفية دون إظهار النتيجة (Blind).",
      "planB": "استخدام الحقن القائم على تأخير الوقت SLEEP(5) لمراقبة استجابة الخادم.",
      "ignored": "استخدام هجمات XSS على المعاملات."
    }
  ],
  "payloads": [
    {
      "code": "GET /products?sort=price_asc,SLEEP(5) HTTP/1.1",
      "explanation": "حقن دالة SLEEP(5) في معامل الترتيب ORDER BY لتأخير الاستجابة 5 ثوان.",
      "whyWorked": "يتم دمج المدخلات مباشرة في جملة الاستعلام، مما يجبر محرك قاعدة البيانات MySQL على تنفيذ دالة الانتظار.",
      "alternatives": [
        "BENCHMARK(10000000,MD5(1))",
        "AND 1=1"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "استخدام UNION SELECT في حقل الترتيب (ORDER BY).",
      "whyWrong": "قواعد الـ SQL تمنع استخدام UNION بعد كلمة ORDER BY مباشرة، مما يؤدي لفشل الهجوم.",
      "betterWay": "استخدام الحقن الشرطي القائم على تأخير الوقت (Time-Based IF/SLEEP)."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: فحص متجر إلكتروني واكتشاف SQL Injection\n\nمرحباً بك! لدينا متجر إلكتروني يبيع منتجات تقنية ويسمح بترتيب المنتجات حسب السعر أو الاسم عبر معامل `sort`.\n\n#### قواعد الفحص:\n- نطاق العمل: `/products?category=electronics&sort=price_asc`\n- التطبيق يستخدم MySQL ولا تظهر رسائل خطأ للـ SQL.\n- اختبر وجود ثغرة **Time-Based Blind SQL Injection** لاستخراج كلمة مرور المدير.\n\nاضغط على **Next Step** لبدء الفحص.",
      "aiAdvisor": {
        "hint": "ادرس المعاملات وهل يمكن التأثير على الاستعلام.",
        "payloadExplanation": "لا توجد أكواد حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 فحص وتأكيد SQL Injection تلقائياً\n\nسنقوم بتشغيل أداة الفحص للتأكد من إمكانية حقن القواعد تلقائياً أو يدوياً.\nاختر الأداة المناسبة لتشغيلها.",
      "aiAdvisor": {
        "hint": "شغّل أداة sqlmap لفحص معامل الترتيب تلقائياً وتأكيد الثغرة.",
        "payloadExplanation": "sqlmap تقوم بإرسال مئات الطلبات التجريبية لكشف نوع الحقن تلقائياً.",
        "failureExplanation": "الفشل في فحص المتغير قد يؤدي لعدم معرفة قواعد الحقن المناسبة."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 التحقق اليدوي من تأخير الوقت (Time Delay)\n\nسنقوم بحقن دالة `SLEEP(5)` يدوياً في معامل الـ `sort` ومراقبة زمن الاستجابة.\nاضغط على **Execute Sleep Payload** لمراقبة تأخر الخادم.",
      "burpRequest": "GET /products?category=electronics&sort=price_asc HTTP/1.1\nHost: shop.target.com\nUser-Agent: Mozilla/5.0\nAccept: */*",
      "burpResponse": "HTTP/1.1 200 OK\n[Returned in 0.3 seconds]",
      "aiAdvisor": {
        "hint": "اضغط على زر Execute Sleep Payload لإرسال دالة النوم وتأكيد الحقن.",
        "payloadExplanation": "حقن دالة SLEEP(5) يجبر قاعدة البيانات على الانتظار قبل إرجاع الطلب.",
        "failureExplanation": "تأكد من نجاح الحقن لتأكيد الثغرة يدوياً."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "قم بإدخال العلم (Flag) بعد استخدام SQLMap لاستخراج كلمة مرور الأدمن بنجاح.",
      "targetUrl": "https://shop.target.com/products?category=electronics&sort=price_asc",
      "correctFlag": "FLAG{blind_sqli_order_by_extracted_admin}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{blind_sqli_order_by_extracted_admin}",
        "payloadExplanation": "استخراج البيانات يدوياً أو آلياً يثبت اختراق قاعدة البيانات.",
        "failureExplanation": "تأكد من كتابة العلم بدقة."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'sqli' و 'order'.",
        "payloadExplanation": "شرح كيفية استغلال الحقن في جملة ORDER BY وسحب جداول المستخدمين.",
        "failureExplanation": "الرجاء مراجعة الكلمات الدلالية قبل الحفظ."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "7 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
        "payloadExplanation": "تم التثبيت والإصلاح بنجاح.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "لماذا نستخدم Time-Based SQL Injection؟",
          "options": [
            "لأنها أسرع من الطرق الأخرى.",
            "عندما لا تظهر أي أخطاء أو تغييرات في رد الخادم (Blind) ونحتاج لتأخير الوقت لتأكيد الشرط.",
            "لأنها لا تحتاج لاستعلامات معقدة.",
            "لأنها تتخطى جدران الحماية بالكامل."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن للمطور منع ثغرات SQLi نهائياً؟",
          "options": [
            "استخدام استعلامات معدة مسبقاً (Parameterized Queries / Prepared Statements) وفلترة مدخلات الترتيب يدوياً باستخدام قائمة بيضاء.",
            "حظر كلمات مثل SELECT في الطلب فقط.",
            "تشفير قاعدة البيانات بالكامل.",
            "تعطيل دالة SLEEP في الخادم فقط."
          ],
          "answer": 0
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة الأولى هي الخيار الثاني، والثانية هي الخيار الأول.",
        "payloadExplanation": "اختبار المفاهيم لتأمين الكود ضد هجمات حقن قواعد البيانات.",
        "failureExplanation": "الرجاء القراءة بتركيز لتفادي خصم النقاط."
      }
    }
  ],
  "realReport": {
    "title": "Time-Based Blind SQL Injection in sort parameter",
    "severity": "High",
    "type": "IDOR",
    "desc": "The application sort parameter in the products page is vulnerable to Time-Based SQL Injection. An attacker can inject MySQL functions such as SLEEP() to perform database queries and dump tables.",
    "steps": "1. Access the endpoint with sort=price_asc,SLEEP(5).\n2. Observe the 5 seconds delay.\n3. Run sqlmap to extract db structures.",
    "impact": "Full database credentials theft and access to admin tables.",
    "feedback": "Confirmed and mitigated. We whitelisted the allowed values in the order by statement. Bounty awarded.",
    "keywords": [
      "sqli",
      "order"
    ]
  },
  simulateTerminal(command) {
    const cmd = command.trim();
    if (cmd.startsWith("sqlmap")) {
      return {
        output: [
          { text: "[INF] testing connection to the target URL", type: "info" },
          { text: "[INF] testing if the target URL is stable", type: "info" },
          { text: "[!] GET parameter 'sort' is vulnerable. Do you want to keep testing others? [y/N]", type: "success" },
          { text: "[!] MySQL database identified.", type: "success" }
        ],
        correct: true,
        evidence: { title: "SQLMap Vulnerable Parameter", content: "Parameter: sort (GET)\nType: time-based blind\nTitle: MySQL >= 5.0.12 AND time-based blind (query SLEEP)" },
        outcome: "تم التعرف على الثغرة بنجاح عبر sqlmap! يمكنك الآن الانتقال إلى أداة Burp Suite لتجربة حقن الوقت SLEEP() يدوياً ومراقبة النتيجة."
      };
    } else if (cmd.startsWith("curl")) {
      return {
        output: [
          { text: "HTTP/1.1 200 OK", type: "info" },
          { text: "[Product list returned instantly...]", type: "out" }
        ],
        correct: false,
        outcome: "التطبيق يعمل بشكل طبيعي والرد سريع. جرب فحص المسار بحثاً عن ثغرات قواعد البيانات (SQLi) باستخدام أداة متخصصة مثل sqlmap."
      };
    } else {
      return {
        output: [
          { text: `Command not found or not useful: ${cmd}`, type: "error" },
          { text: "Try using 'sqlmap -u https://shop.target.com/products?sort=price_asc --batch' to automatically find SQL injection.", type: "info" }
        ],
        correct: false
      };
    }
  },

  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // 1. Detect XSS attempts
    if (/<script|javascript:|onload=/i.test(requestText)) {
      return builder
        .setStatus(200)
        .setBody({ error: "Invalid characters detected: &lt;script&gt;" })
        .setObservabilityLog("[WARN] WAF Shield: Blocked XSS script injection pattern in query string.\n[INFO] Sanitization: Encoded special characters to prevent exploitation.")
        .setOutcome("حاولت تنفيذ حقن XSS في رابط المنتجات. يقوم السيرفر بتصفية وترميز المدخلات لمنع هجمات XSS.")
        .build();
    }

    // 2. Detect Directory Traversal / LFI
    if (/\.\.\/|\/etc\/passwd|\/etc\/hosts|win\.ini/i.test(requestText)) {
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: "Access Denied: Path traversal detected." })
        .setObservabilityLog("[WARN] Security Shield: Blocked directory traversal attack in URL parameters.")
        .setOutcome("حاولت استدعاء ملفات محلية باستخدام Directory Traversal. يقوم السيرفر بحظر هذه المحاولات فوراً.")
        .build();
    }

    // 3. Path Validation
    if (!parsed.path.includes("/products")) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Endpoint not found." })
        .setObservabilityLog(`[WARN] API Router: Unrecognized path: "${parsed.path}".\n[INFO] Available Endpoint: GET /products`)
        .setOutcome("تأكد من طلب مسار صفحة المنتجات الصحيح: /products")
        .build();
    }

    // Extract sort parameter from query path: e.g. /products?category=electronics&sort=price_asc,SLEEP(5)
    const urlParts = parsed.path.split('?');
    const queryString = urlParts[1] || '';
    const params = new URLSearchParams(queryString);
    const sortVal = params.get('sort') || '';

    // 4. Detect UNION SELECT inside ORDER BY (SQL syntax error simulation)
    if (/union\s+select/i.test(sortVal)) {
      return builder
        .setStatus(500, "Internal Server Error")
        .setBody({ error: "SQL Syntax Error near 'UNION SELECT'" })
        .setObservabilityLog("[ERROR] Database Driver: MysqlException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'UNION SELECT...' at line 1.\n[INFO] Query Executed: SELECT * FROM products ORDER BY price_asc UNION SELECT 1,2,3")
        .setOutcome("حاولت استخدام UNION SELECT بعد حقل ORDER BY مباشرة. قواعد SQL تمنع دمج الاستعلامات بـ UNION بعد كلمة ORDER BY مباشرة، مما يؤدي لخطأ في بناء الاستعلام (Syntax Error).")
        .build();
    }

    if (!sortVal) {
      return builder
        .setStatus(200)
        .setBody({ error: "Missing parameter: sort is required for ordering." })
        .setOutcome("لم يتم العثور على معامل الترتيب sort في رابط الطلب.")
        .build();
    }

    // Pattern matching to prevent memorized payload bypass
    const hasLongSleep = /sleep\s*\(\s*([5-9]|\d{2,})\s*\)/i.test(sortVal);
    const hasBenchmark = /benchmark\s*\(\s*\d+\s*,\s*.*\)/i.test(sortVal);
    const hasWaitfor = /waitfor\s+delay\s+['"]\d{2}:\d{2}:\d{2}['"]/i.test(sortVal);
    const hasShortSleep = /sleep\s*\(\s*[0-4]\s*\)/i.test(sortVal);

    if (hasLongSleep || hasBenchmark || hasWaitfor) {
      let delayText = "5.2 seconds";
      let delayMs = 5200;
      if (hasBenchmark) {
        delayText = "4.8 seconds";
        delayMs = 4800;
      }

      return builder
        .setStatus(200)
        .setHeader("X-Response-Time", delayText)
        .setBody({
          status: "success",
          products: [
            { id: 101, name: "Alpha Interceptor", price: 1500, category: "electronics" },
            { id: 102, name: "Beta Interceptor", price: 2500, category: "electronics" }
          ]
        })
        .setCorrect(true)
        .setObservabilityLog(`[INFO] DB Query: SELECT * FROM products ORDER BY ${sortVal}\n[WARN] Slow Query Alert: Execution took ${delayText}.\n[CRITICAL] SQL Injection Warning: Timing function execution detected!`)
        .setOutcome(`نجح الحقن! تأخر رد الخادم بمقدار ${delayText}، مما يؤكد أن قاعدة البيانات MySQL تقوم بتنفيذ الأوامر المحقونة في المعامل sort.`)
        .setEvidence("Time-Based SQLi Delay", `GET /products?sort=${sortVal} -> Response delayed by ${delayText}`)
        .build();
    } else if (hasShortSleep) {
      return builder
        .setStatus(200)
        .setHeader("X-Response-Time", "0.5 seconds")
        .setBody({
          status: "success",
          products: [
            { id: 101, name: "Alpha Interceptor", price: 1500 }
          ]
        })
        .setObservabilityLog(`[INFO] DB Query: SELECT * FROM products ORDER BY ${sortVal}\n[INFO] Query executed successfully in 0.5s.`)
        .setOutcome("تم تنفيذ الحقن بتأخير بسيط جداً. جرب استخدام sleep(5) أو sleep(10) لملاحظة تأخير الاستجابة بوضوح وتأكيد الثغرة.")
        .build();
    } else {
      return builder
        .setStatus(200)
        .setHeader("X-Response-Time", "0.3 seconds")
        .setBody({
          status: "success",
          products: [
            { id: 101, name: "Alpha Interceptor", price: 1500 }
          ]
        })
        .setOutcome("تم استرجاع قائمة المنتجات بشكل طبيعي. حاول حقن دالة SLEEP(5) في معامل sort لتأكيد وجود ثغرة Time-Based SQLi.")
        .build();
    }
  }
};
