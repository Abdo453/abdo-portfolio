// ==========================================================
// SCENARIO 007: INFORMATION DISCLOSURE - EXPOSED .GIT & .ENV
// ==========================================================

window.scenario_007 = {
  "metadata": {
    "id": "scenario-007",
    "title": "Information Disclosure - Exposed .git & .env",
    "level": "Beginner",
    "category": "Recon Driven",
    "company": "GitHub",
    "reward": "$750",
    "time": "30 Min"
  },
  "decisionLog": [
    {
      "hypothesis": "النطاق التطويري dev محمي خلف جدار حماية أو يتطلب حساباً داخلياً.",
      "whyFailed": "الموقع متاح للعامة دون أي قيود وصول وتم نسيان ملفات التطوير في المجلد الرئيسي.",
      "planB": "استخدام أدوات التخمين لفحص الملفات المخفية مثل .git و .env على النطاق dev.",
      "ignored": "البحث عن ثغرات XSS في النطاق الرئيسي."
    }
  ],
  "payloads": [
    {
      "code": "curl -s \"https://dev.marketing-tool.com/.env\"",
      "explanation": "طلب ملف الإعدادات البيئية .env مباشرة عبر المتصفح أو أداة curl.",
      "whyWorked": "الملف تم تركه بصلاحيات قراءة للعامة في مجلد الويب الرئيسي دون حماية في تكوين خادم الويب.",
      "alternatives": [
        ".git/config",
        "backup.sql",
        "config.yml"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "تجاهل النطاقات الفرعية القديمة أو التطويرية (dev/staging).",
      "whyWrong": "البيئات التطويرية هي الحلقة الأضعف وغالباً ما تحمل إعدادات أمان ضعيفة وملفات اختبار.",
      "betterWay": "البدء دائماً بفحص النطاقات الفرعية وتصنيفها والبحث عن النطاقات المتروكة."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: كشف الملفات الحساسة على النطاق التطويري\n\nمرحباً بك! لدينا اليوم منصة SaaS للتسويق الرقمي.\nهدفنا هو البحث عن تسريبات لملفات حساسة متروكة على خوادمها.\n\n#### قواعد الفحص:\n- نطاق الفحص: النطاقات الفرعية التابعة لـ `*.marketing-tool.com`\n- ابحث عن مجلدات التطوير المشتركة أو ملفات التكوين المتروكة للعامة.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "ابدأ بجمع النطاقات الفرعية للبحث عن بيئات التطوير.",
        "payloadExplanation": "لا توجد أكواد حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 فحص النطاقات والتخمين على الملفات\n\nسنقوم بالبحث أولاً عن الأجهزة الفرعية ثم تخمين المجلدات على النطاق التطويري المكتشف `dev.marketing-tool.com`.\nاختر الأداة المناسبة لتشغيلها.",
      "terminalCommands": [
        {
          "name": "subfinder -d marketing-tool.com -silent",
          "correct": false,
          "output": [
            {
              "text": "[INF] Scanning marketing-tool.com",
              "type": "info"
            },
            {
              "text": "www.marketing-tool.com",
              "type": "out"
            },
            {
              "text": "dev.marketing-tool.com",
              "type": "success"
            }
          ]
        },
        {
          "name": "ffuf -u https://dev.marketing-tool.com/FUZZ -w common.txt -s",
          "correct": true,
          "evidence": {
            "title": "Exposed Git & Env Files",
            "content": "/.git/HEAD [Status: 200]\n/.env [Status: 200]\n/backup.sql [Status: 200]"
          },
          "output": [
            {
              "text": "/index.html [200]",
              "type": "out"
            },
            {
              "text": "/.git/HEAD [200]",
              "type": "success"
            },
            {
              "text": "/.env [200]",
              "type": "success"
            },
            {
              "text": "/backup.sql [200]",
              "type": "success"
            },
            {
              "text": "[!] Success: Critical development files exposed on webroot!",
              "type": "success"
            }
          ]
        }
      ],
      "aiAdvisor": {
        "hint": "شغّل أداة ffuf للتخمين على المسارات المخفية للنطاق dev المكتشف.",
        "payloadExplanation": "أداة ffuf تقوم بتخمين مسارات شائعة مثل .git و .env في مجلد الويب الرئيسي.",
        "failureExplanation": "عدم تشغيل التخمين سيحرمك من رؤية الملفات التي لا تظهر في الروابط العادية."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 قراءة محتويات ملف الـ .env الحساس\n\nسنقوم بالوصول إلى الرابط المكتشف:\n`https://dev.marketing-tool.com/.env`\n\nاضغط على **Request Env File** لمعاينة محتويات الملف والمفاتيح المسربة.",
      "burpRequest": "GET /.env HTTP/1.1\nHost: dev.marketing-tool.com\nUser-Agent: Mozilla/5.0",
      "burpResponse": "HTTP/1.1 404 Not Found\nContent-Length: 15",
      "burpActions": [
        {
          "name": "Request Env File",
          "correct": true,
          "modifiedRequest": "GET /.env HTTP/1.1\nHost: dev.marketing-tool.com\nUser-Agent: Mozilla/5.0",
          "modifiedResponse": "HTTP/1.1 200 OK\nContent-Type: text/plain\n\nDB_USERNAME=admin\nDB_PASSWORD=SuperSecretDBPass123!\nAWS_ACCESS_KEY_ID=EXAMPLE_KEY_EDU_ONLY\nSTRIPE_SECRET_KEY=sk_FAKE_EXAMPLE_EDUCATIONAL_PURPOSE_ONLY\nJWT_SECRET=dev-jwt-secret-2024",
          "evidence": {
            "title": "Leaked Stripe Secret Key",
            "content": "STRIPE_SECRET_KEY=sk_FAKE_EXAMPLE_EDUCATIONAL_PURPOSE_ONLY\nDB_PASSWORD=SuperSecretDBPass123!"
          }
        }
      ],
      "aiAdvisor": {
        "hint": "اضغط على زر Request Env File لإرسال الطلب وقراءة مفاتيح Stripe والـ AWS المسربة.",
        "payloadExplanation": "طلب الملف مباشرة لقراءة الأسرار المخزنة بداخله.",
        "failureExplanation": "تأكد من قراءة البيانات بالكامل لتأكيد التسريب."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "أدخل الـ Flag بعد التحقق من البيانات وقراءة الأسرار بنجاح.",
      "targetUrl": "https://dev.marketing-tool.com/.env",
      "correctFlag": "FLAG{exposed_git_env_stripe_keys_compromised}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{exposed_git_env_stripe_keys_compromised}",
        "payloadExplanation": "إثبات الوصول للأسرار ومفاتيح Stripe الحساسة.",
        "failureExplanation": "تأكد من كتابة العلم بطريقة صحيحة."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'git' و 'env'.",
        "payloadExplanation": "شرح خطورة تسريب ملفات البيئة والتطوير والأسرار البرمجية.",
        "failureExplanation": "يجب وضع الكلمات المفتاحية بالتقرير للتقييم الصحيح."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "1 Day Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
        "payloadExplanation": "تم التقييم بـ High لوجود Stripe Keys نشطة.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما هو المجلد الذي يحتوي على تاريخ المشروع بالكامل والـ Source Code؟",
          "options": [
            "مجلد static.",
            "مجلد .git المخصص لنظام Git لإدارة النسخ.",
            "مجلد uploads.",
            "مجلد node_modules."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن منع تسريب ملفات .git و .env في الإنتاج؟",
          "options": [
            "تغيير اسم الملفات فقط.",
            "إضافة قواعد في تكوين خادم الويب (Nginx/Apache) لمنع الوصول للملفات التي تبدأ بنقطة، وعدم رفع مجلدات التطوير للإنتاج.",
            "حظر استخدام أدوات التخمين.",
            "تعطيل قاعدة البيانات."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "مراجعة مبادئ تأمين خوادم الويب ضد تسريبات الملفات المخفية.",
        "failureExplanation": "خطأ في الإجابة يؤدي لخصم XP."
      }
    }
  ],
  "realReport": {
    "title": "Exposed git directory and env file on dev subdomain leaks database and Stripe keys",
    "severity": "High",
    "type": "IDOR",
    "desc": "The development subdomain dev.marketing-tool.com has an exposed .git directory and a publicly accessible .env configuration file containing live Stripe and database keys.",
    "steps": "1. Run directory fuzzing on dev subdomain.\n2. Access /.env and /.git/config directly.\n3. Retrieve active Stripe private credentials.",
    "impact": "Complete source code leak and access to financial credentials and production database.",
    "feedback": "Confirmed. We disabled the dev subdomain directory listing and blocked dotfiles access in Nginx. Bounty awarded.",
    "keywords": [
      "git",
      "env"
    ]
  },
  "writeup": {
    "description": "ثغرة **Information Disclosure** تحدث عندما تترك الفرق التطويرية ملفات حساسة في المجلد الرئيسي للخادم. ملف `.env` يحتوي على كل أسرار التطبيق (قواعد بيانات، مفاتيح API، JWT secrets). مجلد `.git` يحتوي على كامل تاريخ الكود المصدري بما فيه كلمات مرور قديمة.",
    "payloadAnalysis": "الطلب بسيط جداً:\n```\nGET /.env HTTP/1.1\nHost: dev.marketing-tool.com\n```\nلا يتطلب أي مصادقة أو تلاعب. الخادم يقوم بإرجاع الملف مباشرة كنص عادي بسبب عدم وجود قواعد في تكوين الخادم.",
    "impact": "**High → Critical** — يمكن استخدام `STRIPE_SECRET_KEY` لسحب مبالغ مالية مباشرة من حسابات العملاء. `AWS_ACCESS_KEY_ID` يسمح بالوصول لموارد السحابة الكاملة.",
    "mitigation": "```nginx\n# Nginx: Block access to dotfiles and sensitive files\nlocation ~ /\\. {\n    deny all;\n    return 404;\n}\n\nlocation ~* (\\.env|\\.git|backup\\.sql|\\.bak) {\n    deny all;\n    return 404;\n}\n```\n\n```bash\n# Add .env and .git to .gitignore\necho '.env' >> .gitignore\necho '.git/' >> .gitignore\n\n# Use environment variables from deployment platform\n# Never commit secrets to version control\ngit rm --cached .env\n```"
  },
  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // Detect path
    const path = parsed.path.toLowerCase();

    // /.env file
    if (path === '/.env' || path.endsWith('/.env')) {
      return builder
        .setStatus(200)
        .setHeader('Content-Type', 'text/plain')
        .setBody(
          'APP_NAME=MarketingToolPro\n' +
          'APP_ENV=development\n' +
          'DB_HOST=127.0.0.1\n' +
          'DB_USERNAME=admin\n' +
          'DB_PASSWORD=SuperSecretDBPass123!\n' +
          'DB_DATABASE=marketing_prod_db\n' +
          'AWS_ACCESS_KEY_ID=EXAMPLE_ACCESS_KEY_EDUCATIONAL_ONLY\n' +
          'AWS_SECRET_ACCESS_KEY=EXAMPLE/SECRET_KEY/EDUCATIONAL_DEMO_ONLY\n' +
          'STRIPE_SECRET_KEY=sk_FAKE_EXAMPLE_NOT_REAL_EDUCATIONAL_PURPOSE_ONLY\n' +
          'JWT_SECRET=dev-jwt-secret-key-2024-not-changed\n' +
          'MAIL_PASSWORD=smtp_pass_marketing_2023'
        )
        .setCorrect(true)
        .setEvidence("Leaked .env Credentials", "STRIPE_SECRET_KEY=sk_FAKE_EXAMPLE_EDUCATIONAL_ONLY\nDB_PASSWORD=SuperSecretDBPass123!\nAWS_ACCESS_KEY_ID=EXAMPLE_KEY_EDU_ONLY")
        .setObservabilityLog("[INFO] Nginx: Serving static file request for /.env\n[WARN] IDS: Sensitive file path detected in request: /.env\n[CRITICAL] Data Leak: Environment configuration file served without authentication!\n[CRITICAL] Exposed secrets: DB credentials, AWS keys, Stripe live API key\n[INFO] No access control rule matched - file served as plaintext")
        .setOutcome("تم كشف ملف الـ .env كاملاً! الملف يحتوي على Stripe Live Key وبيانات AWS وكلمة سر قاعدة البيانات. هذا يمثل ثغرة High/Critical فورية.")
        .build();
    }

    // /.git/config
    if (path.includes('.git/config') || path.includes('.git/head')) {
      return builder
        .setStatus(200)
        .setHeader('Content-Type', 'text/plain')
        .setBody(
          '[core]\n' +
          '    repositoryformatversion = 0\n' +
          '    filemode = true\n' +
          '    bare = false\n' +
          '[remote "origin"]\n' +
          '    url = https://github.com/marketing-tool-org/marketing-pro-internal\n' +
          '    fetch = +refs/heads/*:refs/remotes/origin/*\n' +
          '[branch "main"]\n' +
          '    remote = origin\n' +
          '    merge = refs/heads/main'
        )
        .setCorrect(true)
        .setEvidence("Exposed .git Repository Config", "Remote URL: https://github.com/marketing-tool-org/marketing-pro-internal\nFull source code potentially accessible via git clone")
        .setObservabilityLog("[INFO] Nginx: Serving request for /.git/config\n[WARN] IDS: Version control metadata file exposed publicly!\n[CRITICAL] Data Leak: Git repository configuration revealed internal GitHub repo URL.\n[INFO] Attacker can use git-dumper tool to reconstruct full source code history.")
        .setOutcome("مجلد الـ .git مكشوف! الـ config يكشف رابط الـ GitHub الداخلي. باستخدام أداة git-dumper يمكن استرداد كامل الكود المصدري بما فيه الأسرار التاريخية.")
        .build();
    }

    // /backup.sql
    if (path.includes('backup.sql')) {
      return builder
        .setStatus(200)
        .setHeader('Content-Type', 'application/sql')
        .setBody(
          '-- MarketingToolPro Database Backup\n' +
          '-- Generated: 2024-01-15 03:00:00\n' +
          '-- WARNING: Contains production data\n\n' +
          'CREATE TABLE users (\n' +
          '  id INT PRIMARY KEY,\n' +
          '  email VARCHAR(255),\n' +
          '  password_hash VARCHAR(255)\n' +
          ');\n\n' +
          'INSERT INTO users VALUES (1, "admin@marketing-tool.com", "$2b$12$examplehash");\n' +
          'INSERT INTO users VALUES (2, "cto@marketing-tool.com", "$2b$12$examplehash2");\n' +
          '-- [+] 50,000 user records follow...'
        )
        .setCorrect(true)
        .setEvidence("Database Backup Exposed", "backup.sql contains 50,000 user records including admin credentials and password hashes")
        .setObservabilityLog("[CRITICAL] Database backup file served publicly without authentication!\n[CRITICAL] File contains 50,000 user records and admin credentials.\n[INFO] File size: 45MB compressed. All production user data exposed.")
        .setOutcome("تم كشف ملف نسخة قاعدة البيانات الاحتياطية! يحتوي على بيانات 50,000 مستخدم بما فيها كلمات المرور المشفرة والبريد الإلكتروني.")
        .build();
    }

    // Normal files
    if (path === '/' || path.endsWith('/index.html')) {
      return builder
        .setStatus(200)
        .setBody('<html><body>MarketingToolPro - Development Environment</body></html>')
        .setHeader('Content-Type', 'text/html')
        .setObservabilityLog("[INFO] Router: Serving index page for dev subdomain.")
        .setOutcome("صفحة البداية للموقع التطويري. جرب مسارات مثل /.env أو /.git/config أو /backup.sql")
        .build();
    }

    return builder
      .setStatus(404)
      .setBody({ error: "Not Found" })
      .setObservabilityLog(`[INFO] Router: File not found at path "${parsed.path}".`)
      .setOutcome(`المسار "${parsed.path}" غير موجود. حاول /.env أو /.git/config أو /backup.sql`)
      .build();
  }
};
