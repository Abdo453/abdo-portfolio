// ==========================================================
// SCENARIO 003: SSRF TO AWS METADATA - EC2 IAM KEYS THEFT
// ==========================================================

window.scenario_003 = {
  "metadata": {
    "id": "scenario-003",
    "title": "SSRF to AWS Metadata - EC2 IAM Keys Theft",
    "level": "Medium",
    "category": "Cloud",
    "company": "Airbnb",
    "reward": "$4,500",
    "time": "2 Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "طلب جلب الصور لا يمكن توجيهه للخوادم الداخلية بوجود جدران حماية.",
      "whyFailed": "التطبيق يثق بالـ URL الممرر تماماً ويقوم بإنشاء اتصال HTTP مباشر من خوادمه دون فلترة.",
      "planB": "تمرير عنوان خادم البيانات السحابية AWS Metadata (169.254.169.254) لاستعادة مفاتيح الوصول.",
      "ignored": "البحث عن ثغرات XSS في حقل الرابط."
    }
  ],
  "payloads": [
    {
      "code": "image_url = \"http://169.254.169.254/latest/meta-data/iam/security-credentials/aws-elasticbeanstalk-ec2-role\"",
      "explanation": "رابط AWS Metadata الداخلي الذي يوزع مفاتيح الصلاحيات المؤقتة لجهاز EC2.",
      "whyWorked": "يقوم الخادم بجلب الرابط داخلياً وإرجاع النتيجة الكاملة دون التحقق من النطاقات المحظورة.",
      "alternatives": [
        "http://localhost/admin",
        "http://127.0.0.1/"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "محاولة استدعاء localhost فقط والتوقف عند فشله.",
      "whyWrong": "الخادم قد يحظر localhost لكنه ينسى حظر عناوين الـ IP الخاصة بالخدمات السحابية.",
      "betterWay": "تجربة نطاقات البنية التحتية السحابية مثل 169.254.169.254."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: استغلال ثغرة SSRF للوصول إلى AWS Metadata\n\nمرحباً بك! معنا اليوم خدمة معالجة صور تسمح للمستخدمين بإدخال رابط صورة (URL) ليقوم الخادم بتحميلها ومعالجتها تلقائياً.\n\n#### قواعد العمل:\n- نطاق الفحص: خدمة معالجة الصور تحت `/api/process-image`\n- يعمل التطبيق على خوادم AWS EC2.\n- تحقق من وجود ثغرة **SSRF (Server-Side Request Forgery)** وكشف الملفات الحساسة للبنية التحتية.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "ابدأ بدراسة طريقة توجيه الخادم للطلبات الخارجية.",
        "payloadExplanation": "لا يوجد كود مطلوب هنا.",
        "failureExplanation": "لا مشاكل."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 استكشاف البنية التحتية للخادم\n\nنحتاج لمعرفة هل يعمل الخادم على بيئة سحابية (مثل AWS EC2) لفهم العناوين الداخلية المتاحة.\nاختر الأداة المناسبة لتشغيلها.",
      "aiAdvisor": {
        "hint": "شغّل nslookup للتحقق من هوية ومزود الخدمة الخاص بالخادم.",
        "payloadExplanation": "nslookup يوضح لك الـ IP والـ DNS المرتبط بالخادم لمعرفة نطاق الاستضافة.",
        "failureExplanation": "عدم معرفة السحابة المستضيفة يجعلك تخمن الـ Metadata بشكل عشوائي."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 إرسال طلب استرداد مفاتيح AWS\n\nبما أن الخادم على AWS، سنرسل طلب POST يحمل رابط الـ Metadata الخاص بـ AWS:\n`http://169.254.169.254/latest/meta-data/iam/security-credentials/aws-elasticbeanstalk-ec2-role`\n\nاضغط على **Fetch AWS Credentials** لمشاهدة الرد.",
      "burpRequest": "POST /api/process-image HTTP/1.1\nHost: target.com\nContent-Type: application/json\n\n{\n  \"image_url\": \"http://example.com/image.jpg\"\n}",
      "burpResponse": "HTTP/1.1 200 OK\nContent-Type: text/plain\n\n[Image Data Stream...]",
      "aiAdvisor": {
        "hint": "اضغط على زر Fetch AWS Credentials لتعديل الطلب واستخراج المفاتيح.",
        "payloadExplanation": "الطلب يطلب الموارد الأمنية الداخلية لخادم الـ EC2 مباشرة.",
        "failureExplanation": "تأكد من تمرير مسار المفاتيح بالكامل بنجاح."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "قم بإدخال الـ Flag بعد التحقق من صحة المفاتيح المسروقة بنجاح.",
      "targetUrl": "http://169.254.169.254/latest/meta-data/iam/security-credentials/aws-elasticbeanstalk-ec2-role",
      "correctFlag": "FLAG{ssrf_aws_metadata_keys_compromised}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{ssrf_aws_metadata_keys_compromised}",
        "payloadExplanation": "تأكيد الوصول لبيانات المفاتيح السحابية.",
        "failureExplanation": "تأكد من صحة الحروف."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'ssrf' و 'aws'.",
        "payloadExplanation": "شرح خطورة SSRF وقدرتها على سحب صلاحيات خادم السحابة بالكامل.",
        "failureExplanation": "يجب كتابة الكلمات المفتاحية في التقرير."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "1 Day Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "تفحص المكافأة وقرار المشرف.",
        "payloadExplanation": "سيتم تقييمها كـ Critical بسبب تسريب مفاتيح AWS الكاملة.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما هو الـ IP الافتراضي لخدمة AWS Metadata؟",
          "options": [
            "127.0.0.1",
            "192.168.1.1",
            "169.254.169.254",
            "10.0.0.1"
          ],
          "answer": 2
        },
        {
          "question": "كيف يمكن للمطور حظر هجمات SSRF تماماً؟",
          "options": [
            "تشفير البيانات الوصفية.",
            "استخدام قائمة بيضاء (Whitelist) للنطاقات المسموح بطلبها والتحقق من الـ IP بعد حل الـ DNS لمنع العناوين الداخلية.",
            "حظر استخدام بروتوكول HTTP v2.",
            "تعطيل تسجيل الدخول."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة الأولى هي الخيار الثالث، والثانية هي الخيار الثاني.",
        "payloadExplanation": "التحقق من المفاهيم الأساسية لأمان الشبكات والخدمات السحابية.",
        "failureExplanation": "خطأ في الإجابة يؤدي لخصم XP."
      }
    }
  ],
  "realReport": {
    "title": "SSRF in image processing service leads to AWS EC2 IAM role credentials disclosure",
    "severity": "Critical",
    "type": "SSRF",
    "desc": "The /api/process-image POST endpoint accepts user URLs and retrieves content directly without checking for internal destinations. This allows making requests to the internal AWS metadata service at 169.254.169.254.",
    "steps": "1. Send a POST request to /api/process-image with image_url pointing to 169.254.169.254.\n2. Traverse metadata paths to /latest/meta-data/iam/security-credentials/aws-elasticbeanstalk-ec2-role.\n3. Retrieve AWS temporary credentials.",
    "impact": "Complete compromise of the hosted AWS account assets matching the EC2 role permissions.",
    "feedback": "Critical issue hotfixed in hours by deploying IMDSv2 and setting network firewall rules to block metadata connections from application containers. Bounty awarded.",
    "keywords": [
      "ssrf",
      "aws"
    ]
  },
  simulateTerminal(command) {
    const cmd = command.trim();
    if (cmd.startsWith("nslookup target.com") || cmd.startsWith("nslookup")) {
      return {
        output: [
          { text: "Server:  8.8.8.8", type: "info" },
          { text: "Address: 54.210.23.45", type: "out" },
          { text: "Name: ec2-54-210-23-45.compute-1.amazonaws.com", type: "success" },
          { text: "[!] Success: Server identified as an AWS EC2 instance!", type: "success" }
        ],
        correct: true,
        evidence: { title: "AWS EC2 Hosting Range", content: "Server IP: 54.210.23.45 (AWS EC2 Compute Region)" },
        outcome: "رائع! أداة nslookup أظهرت أن الخادم مستضاف على بيئة AWS EC2، هذا يعني أننا يمكننا استهداف عنوان الـ Metadata الداخلي (169.254.169.254) لاستخراج المفاتيح."
      };
    } else if (cmd.startsWith("curl")) {
      return {
        output: [
          { text: "HTTP/2 405 Method Not Allowed", type: "error" },
          { text: "Allow: POST", type: "error" }
        ],
        correct: false,
        outcome: "استخدام curl أظهر أن المسار لا يقبل سوى طلبات POST. انتقل للـ Burp Suite لتعديل محتوى الطلب."
      };
    } else {
      return {
        output: [
          { text: `Command not found or not useful: ${cmd}`, type: "error" },
          { text: "Try using 'nslookup target.com' to identify the hosting provider.", type: "info" }
        ],
        correct: false
      };
    }
  },

  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    // 1. Detect SQL Injection attempts in requestText
    if (/union\s+select|' \s*or\s+|sleep\s*\(/i.test(requestText)) {
      return builder
        .setStatus(200)
        .setBody({ status: "success", image_fetched: false, message: "Query compiled successfully" })
        .setObservabilityLog("[WARN] Security Shield: SQL Injection attempt detected in parameter: image_url.\n[INFO] Database Driver: Escaped parameter successfully. Prepared Statements active.\n[INFO] SQLi validation complete: 0 rows returned.")
        .setOutcome("حاولت حقن استعلام SQL في حقل الرابط. لكن الخادم لا يمرر هذا الحقل إلى قاعدة البيانات بل يستعمله لإنشاء اتصال HTTP خارجي لجلب الصور.")
        .build();
    }

    // 2. Detect XSS attempts in requestText
    if (/<script|javascript:|onload=/i.test(requestText)) {
      return builder
        .setStatus(200)
        .setBody({ status: "error", message: "Invalid characters detected: &lt;script&gt;" })
        .setObservabilityLog("[WARN] Security Filter: HTML tag syntax detected in request.\n[INFO] Sanitization: Encoded HTML tags to prevent cross-site scripting (XSS).")
        .setOutcome("حاولت تنفيذ حقن XSS في حقل الرابط. يقوم الخادم بترميز وعزل الأكواد المشبوهة (HTML Entity Encoding) قبل معالجتها، مما يبطل مفعول الهجوم.")
        .build();
    }

    // Check if the request contains valid body JSON
    let extractedBody = bodyJson;
    if (!extractedBody) {
      try {
        const bodyStart = requestText.indexOf('{');
        if (bodyStart !== -1) {
          extractedBody = JSON.parse(requestText.substring(bodyStart).trim());
        }
      } catch (e) {
        // failed parse
      }
    }

    if (!extractedBody || typeof extractedBody.image_url === 'undefined') {
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: "Missing required parameter: image_url" })
        .setOutcome("الطلب لا يحتوي على المعامل image_url في جسم الـ JSON.")
        .build();
    }

    const url = extractedBody.image_url.trim();

    // 3. Detect Forbidden Protocols (SSRF Sandbox)
    const isForbiddenProtocol = /^(file|gopher|dict|ftp|sftp|tftp|ldap|php|expect):\/\//i.test(url);
    if (isForbiddenProtocol) {
      const matchProto = url.match(/^([a-z0-9]+):\/\//i);
      const proto = matchProto ? matchProto[1] : "unknown";
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: `Forbidden protocol: ${proto}` })
        .setObservabilityLog(`[WARN] Protocol Validator: Request attempted with forbidden protocol: ${proto}://\n[CRITICAL] Security Alert: SSRF mitigation blocked local system access protocol!`)
        .setOutcome(`حاولت استخدام بروتوكول ${proto}:// لقراءة الملفات المحلية أو الخدمات الداخلية. الخادم مبرمج على السماح ببروتوكولات HTTP و HTTPS فقط لجلب الصور!`)
        .build();
    }

    // 4. Detect Directory Traversal in URL
    const hasTraversal = /\.\.\/|\/etc\/passwd|\/etc\/hosts|win\.ini/i.test(url);
    if (hasTraversal) {
      return builder
        .setStatus(400, "Bad Request")
        .setBody({ error: "Invalid characters in URL path." })
        .setObservabilityLog("[WARN] Directory Traversal Blocked: Path traversal elements identified in request url.\n[INFO] Filter: Blocked request contains '../' or system file paths.")
        .setOutcome("حاولت استدعاء مسار ملفات محلي عن طريق Directory Traversal. يقوم الفلتر بحظر أي مسار يحتوي على محارف التراجع ../ أو مسارات ملفات النظام الحساسة.")
        .build();
    }

    // 1. AWS metadata check
    const isAwsMetaRoot = url.includes("169.254.169.254") || url.includes("[::ffff:a9fe:a9fe]");
    const isAwsRolePath = url.includes("iam/security-credentials/aws-elasticbeanstalk-ec2-role");


    // 2. Google Cloud metadata check
    const isGcpMetaRoot = url.includes("metadata.google.internal") || url.includes("computeMetadata/v1");
    const isGcpTokenPath = url.includes("service-accounts/default/token");

    // 3. Localhost loopback check
    const isLoopback = url.includes("127.0.0.1") || url.includes("localhost");

    if (isAwsMetaRoot) {
      if (isAwsRolePath) {
        return builder
          .setStatus(200)
          .setBody({
            Code: "Success",
            Type: "AWS-HMAC",
            AccessKeyId: "AKIAIOSFODNN7EXAMPLE",
            SecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
            Token: "IQoJb3JpZ2luX2VjEHYaCXVzLWVhc3QtMSJHMEUCIQDT...",
            Expiration: "2026-12-01T12:00:00Z"
          })
          .setCorrect(true)
          .setObservabilityLog(`[INFO] Image Fetcher: Initializing request to internal resource: ${url}\n[WARN] Security Filter: SSRF check skipped for cloud metadata IP.\n[CRITICAL] Data Leakage: IAM Credentials generated for EC2 Role and exposed in client response!`)
          .setOutcome("نجحت في استعادة مفاتيح IAM الخاصة بالخادم السحابي AWS EC2 من مسار البيانات التعريفية (Metadata)!")
          .setEvidence("AWS IAM Keys Leak", `AccessKeyId: AKIAIOSFODNN7EXAMPLE\nSecretAccessKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)
          .build();
      } else {
        return builder
          .setStatus(200)
          .setHeader("Content-Type", "text/plain")
          .setBody("ami-id\nhostname\niam/\nsecurity-groups\nlocal-ipv4")
          .setObservabilityLog(`[INFO] Image Fetcher: Fetching internal metadata root from: ${url}\n[WARN] SSRF: Request permitted to internal metadata service.`)
          .setOutcome("لقد استجاب الخادم لـ Metadata IP بنجاح! الآن تحتاج لتعديل المسار للوصول لمفاتيح الـ IAM الخاصة بالخادم (المسار: iam/security-credentials/aws-elasticbeanstalk-ec2-role).")
          .build();
      }
    } else if (isGcpMetaRoot) {
      if (isGcpTokenPath) {
        return builder
          .setStatus(200)
          .setBody({
            access_token: "ya29.c.Ko8B0wcV3x...SimulatedGCPToken...",
            expires_in: 3599,
            token_type: "Bearer"
          })
          .setCorrect(true)
          .setObservabilityLog(`[INFO] Image Fetcher: Fetching GCP metadata token from: ${url}\n[CRITICAL] Data Leakage: GCP Service Account Access Token leaked!`)
          .setOutcome("نجحت في استعادة Access Token الخاص بـ Google Cloud Service Account عبر ثغرة SSRF!")
          .setEvidence("GCP Token Leak", `access_token: ya29.c.Ko8B0wcV3x...`)
          .build();
      } else {
        return builder
          .setStatus(200)
          .setHeader("Metadata-Flavor", "Google")
          .setHeader("Content-Type", "text/plain")
          .setBody("computeMetadata/v1/instance/service-accounts/default/token\nhostname\nid\nimage")
          .setObservabilityLog(`[INFO] Image Fetcher: Accessing Google Cloud Metadata Service.\n[WARN] SSRF: Google metadata service access allowed.`)
          .setOutcome("لقد استجاب الخادم لعنوان Google Cloud Metadata! حاول طلب التوكين الخاص بـ Service Account للحصول على صلاحيات السحابة (المسار: computeMetadata/v1/instance/service-accounts/default/token).")
          .build();
      }
    } else if (isLoopback) {
      return builder
        .setStatus(200)
        .setHeader("Content-Type", "text/html")
        .setBody("<h1>Admin Control Panel</h1>\n<p>Welcome to loopback admin console. Server status: OK</p>\n<!-- Action: shutdown, restart -->")
        .setObservabilityLog(`[INFO] Image Fetcher: Routing request to loopback server: ${url}\n[WARN] SSRF: Loopback access allowed. Admin console exposed.`)
        .setOutcome("تم الوصول إلى لوحة التحكم المحلية (localhost) بنجاح! ولكن هدفك الأساسي هو سحب صلاحيات السحابة عبر AWS Metadata.")
        .build();
    } else {
      return builder
        .setStatus(200)
        .setHeader("Content-Type", "image/jpeg")
        .setBody("[Binary Image Data]")
        .setObservabilityLog(`[INFO] Image Fetcher: Fetching external image from: ${url}\n[INFO] Response code 200. Image processed successfully.`)
        .setOutcome("تم جلب الصورة ومعالجتها بنجاح. حاول استهداف الخوادم الداخلية أو الخدمات السحابية (مثل AWS Metadata: 169.254.169.254) لاختبار ثغرة SSRF.")
        .build();
    }
  }
};
