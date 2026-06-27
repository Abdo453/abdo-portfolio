// ==========================================================
// SCENARIO 010: RACE CONDITION - PROMO COUPON DOUBLE-REDEEM
// ==========================================================

window.scenario_010 = {
  "metadata": {
    "id": "scenario-010",
    "title": "Race Condition - Promo Coupon Double-Redeem",
    "level": "Hard",
    "category": "Business Logic",
    "company": "Stripe",
    "reward": "$5,000",
    "time": "3+ Hours"
  },
  "decisionLog": [
    {
      "hypothesis": "التطبيق يتحقق من حالة الكوبون قبل تنفيذه ولا يمكن استغلاله مرتين.",
      "whyFailed": "التطبيق يتحقق من القيمة المخزنة أولاً ثم يقوم بالتعديل، وبإرسال طلبات متوازية بسرعة عالية جداً (Concurrency)، يمر أكثر من طلب لمرحلة التحقق قبل إتمام تحديث القيمة.",
      "planB": "استخدام Turbo Intruder لإرسال 30 طلباً متوازياً في جزء من الثانية (Single-Packet Attack).",
      "ignored": "البحث عن ثغرات XSS في حقل الكوبون."
    }
  ],
  "payloads": [
    {
      "code": "Turbo Intruder Script:\nconcurrentConnections=30\nrequestsPerConnection=1\npipeline=False\nengine.queue(target.req, target.baseInput)",
      "explanation": "سكريبت Turbo Intruder لإرسال طلبات متزامنة في نفس جزء من الثانية لتجاوز الفحص المتتابع.",
      "whyWorked": "عدم وجود قفل متزامن ذري (Atomic Database Lock) يسمح بعدة عمليات قراءة متزامنة لنفس الحالة قبل التحديث.",
      "alternatives": [
        "Burp Intruder Pitchfork",
        "Python ThreadPoolExecutor"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "استخدام Burp Intruder العادي لفحص ثغرات الـ Concurrency.",
      "whyWrong": "Burp Intruder يرسل الطلبات بشكل متتابع وببطء مما يمنع حدوث السباق (Race).",
      "betterWay": "استخدام Turbo Intruder أو كتابة سكريبت مخصص يدعم المعالجة المتوازية الحقيقية."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: استغلال Race Condition في استخدام الكوبونات\n\nمرحباً بك! اليوم سنقوم بفحص لوحة تحكم التجار في Stripe.\nتحتوي اللوحة على ميزة \"كوبونات الخصم\" التي يمكن استخدامها مرة واحدة فقط للحصول على خصومات الرسوم بقيمة $20,000.\n\n#### قواعد الفحص:\n- مسار قبول الكوبون: `POST /api/coupons/accept`\n- الـ Request يحتوي على: `coupon_id` و `account_id`.\n- ابحث عن ثغرة **Race Condition** لتكرار الاستخدام والحصول على أرصدة مضاعفة.\n\nاضغط على **Next Step** للبدء.",
      "aiAdvisor": {
        "hint": "فكر في كيفية إرسال طلبات متزامنة لخداع الخادم قبل تسجيل استخدام الكوبون.",
        "payloadExplanation": "لا توجد أكواد حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 فحص تكوين ومعدل الطلبات\n\nسنقوم باختبار فحص بسيط وتجربة مسار الاستدعاء أولاً.\nاختر الأداة المناسبة لتشغيلها.",
      "aiAdvisor": {
        "hint": "شغّل curl لفحص المسار والتأكد من نشاط واجهة قبول الكوبونات.",
        "payloadExplanation": "طلب فحص الهيدر للتحقق من البروتوكولات والمسارات المدعومة.",
        "failureExplanation": "تأكد من فحص المسار بنجاح."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 إرسال طلبات متزامنة بـ Turbo Intruder\n\nسنقوم بالتقاط طلب قبول الكوبون وإرسال 30 طلب متوازٍ باستخدام سكريبت الـ Turbo Intruder.\nاضغط على **Send Parallel Requests** لمعرفة النتائج.",
      "burpRequest": "POST /api/coupons/accept HTTP/1.1\nHost: dashboard.stripe.com\nContent-Type: application/json\nAuthorization: Bearer merchant_token\n\n{\n  \"coupon_id\": \"coupon_20k_fees\",\n  \"account_id\": \"acct_1234567890\"\n}",
      "burpResponse": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"applied_discount\": 20000,\n  \"remaining\": 0\n}",
      "aiAdvisor": {
        "hint": "اضغط على زر Send Parallel Requests لتنفيذ هجوم Concurrency ورؤية النجاح المتعدد.",
        "payloadExplanation": "إرسال 30 طلب متزامن في نفس الوقت يجعل قاعدة البيانات تقرأ القيمة 'غير مستخدم' 30 مرة قبل التحديث.",
        "failureExplanation": "تأكد من نجاح توازي الطلبات."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:05",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "أدخل الـ Flag المسترد بعد الحصول على رصيد خصم بقيمة $600,000 بنجاح.",
      "targetUrl": "https://dashboard.stripe.com/api/coupons/accept",
      "correctFlag": "FLAG{race_condition_coupon_double_redeem}",
      "aiAdvisor": {
        "hint": "أدخل العلم الصحيح: FLAG{race_condition_coupon_double_redeem}",
        "payloadExplanation": "إثبات تخطي منطق معالجة العمليات التزامنية بنجاح.",
        "failureExplanation": "تأكد من كتابة العلم بدقة."
      }
    },
    {
      "name": "Report Writing",
      "time": "10:30",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'race' و 'coupon'.",
        "payloadExplanation": "توضيح الخطورة المالية الناتجة عن تكرار استخدام الكوبونات ذات الاستخدام الواحد.",
        "failureExplanation": "يجب وضع الكلمات المفتاحية بالتقرير للتقييم الصحيح."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "7 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "راجع قرار الفحص والمكافأة الممنوحة.",
        "payloadExplanation": "تم التقييم بـ High لوجود أثر مالي مباشر.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما هو السبب البرمجي الجوهري لحدوث ثغرة Race Condition؟",
          "options": [
            "بطء خوادم الويب.",
            "عدم استخدام المعالجة الذرية (Atomic Transactions) أو آلية الأقفال لقواعد البيانات (Mutex/Locking) عند فحص وتحديث الحالة بشكل متزامن.",
            "استخدام جدار حماية ضعيف.",
            "تسريب ملفات التكوين."
          ],
          "answer": 1
        },
        {
          "question": "كيف يمكن للمطور منع هجمات Concurrency على الكوبونات؟",
          "options": [
            "تقليل قيمة الكوبون.",
            "تطبيق Atomic update في قاعدة البيانات مثل: UPDATE accounts SET used = true WHERE coupon = X AND used = false.",
            "حظر استخدام متصفح تور.",
            "حظر استخدام البريد الإلكتروني."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "التحقق من الفهم التقني للعمليات التزامنية وطريقة تأمينها.",
        "failureExplanation": "خطأ في الإجابة يؤدي لخصم XP."
      }
    }
  ],
  "realReport": {
    "title": "Race condition in coupon redemption allows multiple applications of single-use coupon",
    "severity": "High",
    "type": "IDOR",
    "desc": "The coupon application endpoint /api/coupons/accept is vulnerable to a race condition. By executing parallel requests, a single-use coupon can be redeemed multiple times.",
    "steps": "1. Intercept a valid coupon redemption request.\n2. Send 30 parallel requests using Turbo Intruder.\n3. Verify multiple applications in merchants credits dashboard.",
    "impact": "Unlimited application of coupon credits leading to direct financial loss.",
    "feedback": "Confirmed. We patched this by enforcing transaction locks and applying atomic statements. Bounty awarded.",
    "keywords": [
      "race",
      "coupon"
    ]
  },
  "writeup": {
    "description": "ثغرة **Race Condition** تحدث عندما يقوم التطبيق بـ **Check-Then-Act** على بيانات مشتركة بدون قفل ذري (Atomic Lock). التطبيق:\n1. يقرأ حالة الكوبون من DB (`SELECT used FROM coupons WHERE id = X` → `false`)\n2. يُطبّق الخصم\n3. يُحدّث الحالة (`UPDATE coupons SET used = true WHERE id = X`)\n\nبإرسال 30 طلباً متوازياً قبل اكتمال الخطوة 3، تقرأ كل الطلبات القيمة `false` في الخطوة 1 وتمرر جميعها.",
    "payloadAnalysis": "يستخدم Turbo Intruder تقنية **Single-Packet Attack**: يُرسل كل الطلبات في حزمة TCP واحدة ليصلوا للخادم في نفس اللحظة بالضبط. هذا يُعظّم احتمالية التوازي ويتجاوز حماية Rate Limiting البسيطة.",
    "impact": "**High** — تأثير مالي مباشر. باستخدام كوبون بقيمة $20,000 مع 30 طلب متوازٍ يمكن الحصول على $600,000 من رصيد الرسوم.",
    "mitigation": "```sql\n-- PostgreSQL: Atomic update with row-level lock\n-- This prevents race condition at the database level\nUPDATE coupons\nSET used = true, used_at = NOW(), used_by = $account_id\nWHERE coupon_id = $coupon_id\n  AND used = false  -- Atomic check\nRETURNING *;\n\n-- If 0 rows returned -> coupon already used, reject!\n```\n\n```javascript\n// Application-level: Use database transaction + pessimistic lock\nasync function redeemCoupon(couponId, accountId) {\n  return await db.transaction(async (trx) => {\n    // Pessimistic lock - prevents concurrent reads\n    const coupon = await trx('coupons')\n      .where({ id: couponId, used: false })\n      .forUpdate()  // Row-level lock\n      .first();\n    \n    if (!coupon) throw new Error('Coupon already used');\n    \n    await trx('coupons').where({ id: couponId }).update({ used: true });\n    await applyCredit(accountId, coupon.value, trx);\n  });\n}\n```"
  },
  simulateTerminal(command) {
    const cmd = command.trim();
    if (cmd.startsWith("curl ")) {
      return {
        output: [
          { text: "HTTP/1.1 405 Method Not Allowed", type: "info" },
          { text: "Allow: POST", type: "out" },
          { text: "[!] Success: POST Endpoint is active and accepts coupon parameter!", type: "success" }
        ],
        correct: true,
        evidence: { title: "Coupon API Active", content: "Status: 405 Method Not Allowed\nAllow: POST" },
        outcome: "تم التأكد من استجابة المسار وفتحه لطلبات POST. يمكنك الآن الانتقال لأداة Burp وتجربة التوازي (Concurrency)."
      };
    } else {
      return {
        output: [
          { text: `Command not found or not useful: ${cmd}`, type: "error" },
          { text: "Try using 'curl -I https://dashboard.stripe.com/api/coupons/accept' to check the endpoint.", type: "info" }
        ],
        correct: false
      };
    }
  },

  simulateBackend(requestText, bodyJson) {
    const parsed = window.HttpRequestParser.parse(requestText);
    const builder = new window.HttpResponseBuilder();

    if (parsed.method !== 'POST' || !parsed.path.includes('coupons/accept')) {
      return builder
        .setStatus(404)
        .setBody({ error: "Endpoint not found. Use POST /api/coupons/accept" })
        .setObservabilityLog(`[WARN] Router: Unknown path "${parsed.path}".`)
        .setOutcome("استخدم POST /api/coupons/accept مع body يحتوي على coupon_id.")
        .build();
    }

    const couponId = bodyJson?.coupon_id || '';
    const accountId = bodyJson?.account_id || '';

    if (!couponId || !accountId) {
      return builder
        .setStatus(400)
        .setBody({ error: "Missing required fields: coupon_id and account_id" })
        .setObservabilityLog("[WARN] Validation: Missing coupon_id or account_id in request body.")
        .setOutcome("أضف coupon_id و account_id في الـ JSON body.")
        .build();
    }

    // Simulate race condition state using scenarioState
    if (!window.scenarioState.scenario010) {
      window.scenarioState.scenario010 = { couponUsedCount: 0, lastReset: Date.now() };
    }

    const state = window.scenarioState.scenario010;

    // Reset every 60 seconds (new session)
    if (Date.now() - state.lastReset > 60000) {
      state.couponUsedCount = 0;
      state.lastReset = Date.now();
    }

    // Simulate: First 3 concurrent requests pass (race condition window)
    if (state.couponUsedCount === 0) {
      // First normal request - coupon "valid" but not yet locked
      state.couponUsedCount++;
      return builder
        .setStatus(200)
        .setBody({ status: "success", applied_discount: 20000, message: "Coupon applied successfully", remaining: 0 })
        .setObservabilityLog("[INFO] Coupon Handler: Received POST /api/coupons/accept\n[INFO] DB Check: SELECT used FROM coupons WHERE id = 'coupon_20k_fees' -> false\n[INFO] DB Update: UPDATE coupons SET used = true WHERE id = 'coupon_20k_fees'\n[INFO] Credit Applied: +$20,000 to account " + accountId + "\n[INFO] Single request: No race detected.")
        .setOutcome("تم تطبيق الكوبون بنجاح بالطلب الواحد. الآن أرسل طلبات متوازية لاستغلال الـ Race Condition!")
        .build();
    } else if (state.couponUsedCount < 3) {
      // Simulating concurrent race window - multiple requests bypass the check!
      state.couponUsedCount++;
      return builder
        .setStatus(200)
        .setBody({ status: "success", applied_discount: 20000, message: "Coupon applied successfully (RACE BYPASS)", total_applied: state.couponUsedCount * 20000 })
        .setCorrect(state.couponUsedCount >= 2)
        .setEvidence("Race Condition Confirmed", `POST /api/coupons/accept applied ${state.couponUsedCount} times concurrently -> $${(state.couponUsedCount * 20000).toLocaleString()} credits`)
        .setObservabilityLog(`[INFO] Coupon Handler: Received concurrent request #${state.couponUsedCount}\n[INFO] DB Check: SELECT used FROM coupons WHERE id = 'coupon_20k_fees' -> false (STALE READ - race window!)\n[CRITICAL] Race Condition: Coupon checked as unused while previous update in flight!\n[CRITICAL] DB Update: Applied again! Total credits: $${(state.couponUsedCount * 20000).toLocaleString()}\n[CRITICAL] BUSINESS LOGIC BYPASS CONFIRMED - ${state.couponUsedCount} redemptions processed!`)
        .setOutcome(`🎯 Race Condition ناجح! الكوبون تم تطبيقه ${state.couponUsedCount} مرة بقيمة $${(state.couponUsedCount * 20000).toLocaleString()} إجمالي. الخادم لم يستخدم Atomic Lock مما سمح بمرور طلبات متعددة في نفس النافذة الزمنية.`)
        .build();
    } else {
      // After a few times, simulate the eventual lock kicking in
      return builder
        .setStatus(400)
        .setBody({ error: "Coupon has already been redeemed.", code: "COUPON_USED" })
        .setObservabilityLog("[INFO] Coupon Handler: Received late concurrent request.\n[INFO] DB Check: SELECT used FROM coupons WHERE id = 'coupon_20k_fees' -> true\n[INFO] Rejection: Coupon already marked as used. Late request denied.")
        .setOutcome("هذا الطلب جاء بعد اكتمال التحديث. في هجوم Race Condition الحقيقي، بعض الطلبات تنجح وبعضها يُرفض حسب التوقيت الدقيق.")
        .build();
    }
  }
};
