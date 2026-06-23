// ==========================================================
// SCENARIO 006: BUSINESS LOGIC - THE ALCHEMY OF NEGATIVE WEALTH
// ==========================================================

window.scenario_006 = {
  "metadata": {
    "id": "scenario-006",
    "title": "Business Logic - The Alchemy of Negative Wealth",
    "level": "Easy",
    "category": "Business Logic",
    "company": "CyberGear",
    "reward": "$5,000",
    "time": "1 Hour"
  },
  "decisionLog": [
    {
      "hypothesis": "الخادم يثق بمدخلات الكميات ويسمح بإضافة قيم سالبة لتقليص المجموع الإجمالي للسلة.",
      "whyFailed": "جدار حماية التطبيق (WAF) يقوم باكتشاف علامة السالب وحظر الطلب برمز خطأ 400 Bad Request.",
      "planB": "تخطي فلترة جدار الحماية باستخدام قيم عشرية أو ترميز Unicode أو محاولة إحداث تجاوز الحد الأقصى للمتغيرات (Integer Overflow).",
      "ignored": "محاولة فحص ثغرات تخطي نظام الدفع مباشرة بدون سلة تسوق."
    }
  ],
  "payloads": [
    {
      "code": "POST /api/cart/add HTTP/2\n{\n  \"item_id\": \"9910\",\n  \"quantity\": 4294967281\n}",
      "explanation": "إرسال قيمة تفوق الحد الأقصى للمتغيرات الصحيحة 32-bit بهدف التسبب في التفاف القيمة وتحويلها لعدد سالب (-15) في معالجة الخلفية.",
      "whyWorked": "الكود البرمجي في الخلفية يفسر القيمة كعدد صحيح ذي إشارة (Signed Integer), مما يؤدي لالتفافها والتلاعب بحساب السعر الإجمالي.",
      "alternatives": [
        "Unicode negative injection (\\u002D15)",
        "Race condition on checkout and coupon redemption"
      ]
    }
  ],
  "mistakes": [
    {
      "mistake": "تجاهل الأخطاء المنطقية وتجربة هجمات SQL Injection عشوائية.",
      "whyWrong": "تضييع الوقت في اختبارات غير مستهدفة حيث أن المشكلة الأساسية تكمن في طريقة معالجة الأرقام والعمليات الرياضية الحساسة.",
      "betterWay": "التركيز على مدخلات الكميات وتجربة حدود المدخلات الحسابية مثل الحدود الدنيا والقصوى والتزامن."
    }
  ],
  "steps": [
    {
      "name": "Mission Brief",
      "time": "09:00",
      "workspace": "markdown",
      "xpReward": 100,
      "description": "### 🎯 الهدف: فحص منصة CyberGear ومحاكي محفظة السلة\n\nمرحباً بك في منصة **\"CyberGear\"**، وهو متجر إلكتروني لبيع معدات الاختراق عالية الأداء (مثل أجهزة كشف الشبكات وحواسيب مخصصة).\nالمنصة تحتوي على نظام \"محفظة\" (Wallet) ونظام \"سلة مشتريات\" (Cart).\n\n#### قواعد العمل:\n- رصيد محفظتك الحالي هو **10 دولارات** فقط.\n- هدفك هو شراء جهاز **\"Signal Interceptor\"** الذي يبلغ سعره **1,500 دولار**.\n- نحتاج لاختبار المنطق البرمجي والرياضي للخادم (Business Logic) لمعرفة ما إذا كان من الممكن التلاعب بالعمليات الحسابية لشراء المنتج مجاناً.\n\nاضغط على **Next Step** لبدء الاستطلاع المتقدم.",
      "aiAdvisor": {
        "hint": "اقرأ أهداف المهمة وسعر المنتج والفرق بينه وبين رصيدك الحالي.",
        "payloadExplanation": "لا توجد أكواد مطلوبة حالياً.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Passive Recon",
      "time": "09:15",
      "workspace": "recon",
      "xpReward": 150,
      "description": "### 🔍 استكشاف واجهة البرمجة (API Endpoints)\n\nقبل البدء بالهجوم، نحتاج لمعرفة كيف يتخاطب المتصفح مع السيرفر لإضافة المنتجات للطلب وتطبيق الخصومات.\nشغّل أداة الفحص والتخمين لمعرفة مسارات الدفع المتاحة.",
      "terminalCommands": [
        {
          "name": "curl -I https://api.cybergear.com/api/cart/add",
          "correct": false,
          "output": [
            {
              "text": "HTTP/2 405 Method Not Allowed",
              "type": "error"
            },
            {
              "text": "Allow: POST",
              "type": "error"
            }
          ]
        },
        {
          "name": "ffuf -u https://api.cybergear.com/api/cart -X POST -d \"item_id=8842\"",
          "correct": true,
          "evidence": {
            "title": "Discovered CyberGear API Paths",
            "content": "POST /api/cart/add\nPOST /api/coupon/apply\nPOST /api/cart/checkout"
          },
          "output": [
            {
              "text": "[INF] Scanning directories under /api/cart...",
              "type": "info"
            },
            {
              "text": "[+] Found endpoint: POST /api/cart/add",
              "type": "success"
            },
            {
              "text": "[+] Found endpoint: POST /api/coupon/apply",
              "type": "success"
            },
            {
              "text": "[+] Found endpoint: POST /api/cart/checkout",
              "type": "success"
            }
          ]
        }
      ],
      "aiAdvisor": {
        "hint": "شغّل أداة التخمين ffuf للتعرف على نهايات الخدمة (endpoints) المرتبطة بالسلة والدفع.",
        "payloadExplanation": "تخمين المسارات يحدد لنا الروابط الفعالة التي تعيد تهيئة سلة المشتريات.",
        "failureExplanation": "عدم معرفة نهايات الخدمة البرمجية يمنعنا من صياغة طلبات التلاعب."
      }
    },
    {
      "name": "Burp Verification",
      "time": "09:40",
      "workspace": "burp",
      "xpReward": 200,
      "description": "### 🌐 اعتراض الطلب والتلاعب بالكميات (Negative & Overflow Injection)\n\nلقد قمنا بالتقاط طلب إضافة جهاز \"Signal Interceptor\" بسعر 1,500 دولار.\nجرب تعديل كمية المنتجات في الطلب عبر Burp Suite لتمرير قيم سالبة أو تجاوز الحد الأقصى للمتغيرات (Integer Overflow) لتجاوز جدار الحماية (WAF).",
      "burpRequest": "POST /api/cart/add HTTP/2\nHost: api.cybergear.com\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...\n\n{\n  \"item_id\": \"8842\",\n  \"quantity\": 1\n}",
      "burpResponse": "HTTP/2 200 OK\nContent-Type: application/json\n\n{\n  \"status\": \"success\",\n  \"cart_total\": 1500,\n  \"message\": \"Item added to cart\"\n}",
      "burpActions": [
        {
          "name": "Inject Negative Quantity (-15)",
          "correct": false,
          "modifiedRequest": "POST /api/cart/add HTTP/2\nHost: api.cybergear.com\nContent-Type: application/json\n\n{\n  \"item_id\": \"8842\",\n  \"quantity\": -15\n}",
          "modifiedResponse": "HTTP/2 400 Bad Request\nContent-Type: application/json\n\n{\n  \"error\": \"Security Filter: Negative values are strictly prohibited.\"\n}",
          "outcome": "تم حظرك بواسطة جدار الحماية (WAF) الذي يكتشف علامة الناقص (-) في حقل الأرقام."
        },
        {
          "name": "Bypass WAF with Float",
          "correct": false,
          "modifiedRequest": "POST /api/cart/add HTTP/2\nHost: api.cybergear.com\nContent-Type: application/json\n\n{\n  \"item_id\": \"8842\",\n  \"quantity\": -15.0\n}",
          "modifiedResponse": "HTTP/2 500 Internal Server Error\nContent-Type: application/json\n\n{\n  \"error\": \"Database Error: Cannot cast negative float to unsigned integer.\"\n}",
          "outcome": "تخطى جدار الحماية لكن قاعدة البيانات ترفض الرقم العشرى السالب لأن الحقل مبرمج كـ Unsigned INT."
        },
        {
          "name": "Trigger Integer Overflow (4294967281)",
          "correct": true,
          "modifiedRequest": "POST /api/cart/add HTTP/2\nHost: api.cybergear.com\nContent-Type: application/json\n\n{\n  \"item_id\": \"8842\",\n  \"quantity\": 4294967281\n}",
          "modifiedResponse": "HTTP/2 400 Bad Request\nContent-Type: application/json\n\n{\n  \"error\": \"Cart validation failed: Cart total cannot be verified.\"\n}",
          "outcome": "تجاوزت الـ WAF وفك السيرفر تشفير القيمة لتمثل عدد سالب (-15) في معالجة الخلفية، ولكن الخادم يقوم بالتحقق من الإجمالي النهائي للسلة ويرفض المعاملات الشاذة أو غير المنطقية."
        }
      ],
      "aiAdvisor": {
        "hint": "اضغط على خيار Trigger Integer Overflow لمعرفة رد السيرفر عند حدوث التجاوز الحسابي الرقمي.",
        "payloadExplanation": "الرقم 4294967281 يمثل القيمة سالبة 15 عند تفسيرها كعدد صحيح ذي إشارة 32-bit (Two's Complement).",
        "failureExplanation": "المحاولات السابقة تم كشفها بفضل فلاتر الـ WAF والتحقق من الأنواع."
      }
    },
    {
      "name": "DNS Verification",
      "time": "10:05",
      "workspace": "markdown",
      "xpReward": 150,
      "description": "### 🧠 التفكير في مسار الهجوم البديل\n\nبعد أن فشلت محاولات التلاعب بالكميات والأرقام السالبة لتخفيض الإجمالي مباشرة بسبب التحقق من قيمة السلة:\n`{\"error\": \"Cart total cannot be verified\"}`\n\nكيف تتصرف الآن لتخطي هذا القيد البرمجي الحسابي؟",
      "choices": [
        {
          "text": "أ) أبحث عن ثغرة XSS في اسم المنتج لتنفيذ كود في متصفح الأدمن للتحكم بحسابه.",
          "correct": false,
          "xp": -10,
          "timePenalty": 5,
          "outcome": "تشتيت للجهد وفقدان للتركيز على مسار الـ Logic الخاص بعملية الدفع الحساسة."
        },
        {
          "text": "ب) أجرب إضافة منتج واحد بكمية 1، وأتلاعب بسعر المنتج نفسه في الطلب price: -1500.",
          "correct": false,
          "xp": -5,
          "timePenalty": 2,
          "outcome": "الأسعار عادة ما يتم جلبها وتأكيدها بالخلفية بناءً على قاعدة البيانات ولا تُقرأ من طلب المستخدم مباشرة."
        },
        {
          "text": "ج) أبقي الكميات صحيحة (1)، لكني أحاول تطبيق كوبون الخصم تزامناً مع عملية الشراء (Race Condition) لكسر معادلة الخصم والدفع قبل أن يحدث التحديث النهائي.",
          "correct": true,
          "xp": 50,
          "outcome": "تخمين رائع! استغلال العمليات التزامنية (Concurrency) هو الخيار الذهبي لتطبيق الخصم المتكرر أو كسر الشروط الحسابية وتعديل النتيجة النهائية."
        }
      ],
      "aiAdvisor": {
        "hint": "اختر الخيار (ج) لتجربة الهجوم التزامني لتكرار تطبيق الكوبونات.",
        "payloadExplanation": "الـ Race Condition يتجاوز الفحوصات المتتالية بإرسال طلبات دفع وكوبونات معاً في نفس التوقيت.",
        "failureExplanation": "تجنب تضييع الوقت في تجربة ثغرات غير مؤثرة."
      }
    },
    {
      "name": "Exploitation & Flag",
      "time": "10:30",
      "workspace": "lab",
      "xpReward": 300,
      "instructions": "قم بتنفيذ هجوم Race Condition لإرسال طلب تطبيق الكوبون متزامناً مع طلب الدفع (Checkout) للحصول على العلم (Flag).",
      "targetUrl": "https://api.cybergear.com/api/cart/checkout",
      "correctFlag": "FLAG{business_logic_race_negative_wealth_cracked}",
      "aiAdvisor": {
        "hint": "أدخل العلم المسترجع الصحيح: FLAG{business_logic_race_negative_wealth_cracked}",
        "payloadExplanation": "الحصول على العلم يؤكد كسر شروط الدفع بنجاح.",
        "failureExplanation": "تأكد من كتابة العلم والحروف بدقة."
      }
    },
    {
      "name": "Report Writing",
      "time": "11:00",
      "workspace": "report",
      "xpReward": 250,
      "aiAdvisor": {
        "hint": "الكلمات المفتاحية المطلوبة هي 'race' و 'logic'.",
        "payloadExplanation": "شرح كيفية التسبب في تطبيق خصومات متعددة تؤدي لإتمام الدفع مجاناً.",
        "failureExplanation": "عدم ذكر التفاصيل والكلمات المفتاحية يقلل من جودة التقرير."
      }
    },
    {
      "name": "Triage & Verdict",
      "time": "5 Days Later",
      "workspace": "review",
      "aiAdvisor": {
        "hint": "راجع النتيجة وقبول الثغرة.",
        "payloadExplanation": "تقييم الثغرة كـ Critical نظراً لتأثيرها المباشر على الإيرادات والأموال.",
        "failureExplanation": "لا يوجد."
      }
    },
    {
      "name": "Lessons Learned",
      "time": "Post-Incident",
      "workspace": "quiz",
      "quizData": [
        {
          "question": "ما هو السبب البرمجي الجوهري لحدوث ثغرات التزامن (Race Conditions)؟",
          "options": [
            "بطء اتصال خوادم الويب الخاصة بالشركة.",
            "عدم استخدام أقفال المعاملات (Database Locks/Mutex) للتحقق والتحديث بشكل متزامن.",
            "استخدام جدار حماية ضعيف.",
            "تسريب ملفات التكوين."
          ],
          "answer": 1
        },
        {
          "question": "كيف يتم إصلاح ثغرات التلاعب بالمنطق البرمجي الحسابي في سلة التسوق؟",
          "options": [
            "تشفير أسماء المنتجات.",
            "تطبيق تحديثات ذرية (Atomic Updates)، واستخدام دالة القيمة المطلقة abs() للكميات والتحقق التام بالخلفية.",
            "حظر استخدام متصفحات الهاتف.",
            "حظر استخدام الكوبونات نهائياً."
          ],
          "answer": 1
        }
      ],
      "aiAdvisor": {
        "hint": "الإجابة لكلا السؤالين هي الخيار الثاني (ب).",
        "payloadExplanation": "ترسيخ مبادئ المعاملات الذرية وحماية منطق العمل الحساس.",
        "failureExplanation": "الإجابات الخاطئة تخصم من نقاط الـ XP."
      }
    }
  ],
  "realReport": {
    "title": "Race condition in checkout coupon application leads to negative cart total or free purchases",
    "severity": "Critical",
    "type": "IDOR",
    "desc": "The shopping cart checkout service at /api/cart/checkout is vulnerable to a race condition with the coupon application endpoint /api/coupon/apply. Applying multiple coupons concurrently during checking out reduces the final cart total to $0 and allows purchasing items for free.",
    "steps": "1. Add a Signal Interceptor ($1,500) to the cart.\n2. Prepare concurrent requests to apply a coupon and checkout the cart.\n3. Send requests in parallel using a concurrency tool.\n4. Payment finishes successfully with a total of $0.",
    "impact": "Direct theft of physical/digital goods without correct payment.",
    "feedback": "Confirmed. We patched the logic by enforcing transaction locks and applying database updates atomically. Bounty awarded.",
    "keywords": [
      "race",
      "logic"
    ]
  },
  simulateBackend(requestText, bodyJson) {
    const response = {
      responseHeaders: "HTTP/2 200 OK\nContent-Type: application/json",
      responseBody: "{}",
      correct: false,
      outcome: "",
      timePenalty: 0,
      observabilityLog: ""
    };

    if (!bodyJson || typeof bodyJson.quantity === 'undefined') {
      response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "Missing required parameters: quantity" }, null, 2);
      response.outcome = "الطلب غير مكتمل أو يحتوي على بنية JSON غير صالحة.";
      return response;
    }

    const qty = bodyJson.quantity;
    const rawText = requestText.replace(/\s+/g, ''); // strip spaces to check patterns easily

    // 1. Check if quantity is normal (1)
    if (qty === 1) {
      response.responseBody = JSON.stringify({ status: "success", cart_total: 1500, message: "Item added to cart" }, null, 2);
      response.outcome = "تمت إضافة المنتج بنجاح بالسعر الطبيعي 1,500$.";
      return response;
    }

    // 2. Check if raw request text contains explicit minus sign
    const hasMinusSign = rawText.includes('"-15"') || rawText.includes(':-15') || rawText.includes(':-15.0') || rawText.includes('"-15.0"');
    
    if (qty < 0 && hasMinusSign) {
      response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "WAF Blocked: Invalid characters detected." }, null, 2);
      response.observabilityLog = "[WARN] WAF triggered on negative quantity payload '-15'.";
      response.outcome = "تم حظرك بواسطة جدار الحماية (WAF) الذي يكتشف علامة الناقص (-) في حقل الأرقام.";
      response.timePenalty = 5;
      return response;
    }

    // 3. Float or Unicode bypass attempt
    const isUnicodeBypass = rawText.includes('\\u002D');
    const isFloatBypass = qty === -15.0 && !hasMinusSign; // bypassed minus check but still negative
    
    if (qty < 0 && (isUnicodeBypass || isFloatBypass)) {
      response.responseHeaders = "HTTP/2 500 Internal Server Error\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "Database Error: Cannot cast negative float to unsigned integer." }, null, 2);
      response.observabilityLog = "[ERROR] Database constraint violation: Cannot store negative value in Unsigned Int column 'quantity'.";
      response.outcome = "تجاوزت جدار الحماية (WAF) بنجاح، ولكن خادم قاعدة البيانات انهار بترميز 500 Internal Server Error لأن الحقل مبرمج كـ Unsigned INT ولا يقبل السوالب.";
      response.timePenalty = 2;
      return response;
    }

    // 4. Integer Overflow Attempt (Wraparound)
    const MAX_INT = 2147483647;
    if (qty > MAX_INT) {
      let interpretedQty = qty;
      if (qty > 2147483647 && qty <= 4294967295) {
        interpretedQty = qty - 4294967296; // wrap to signed negative
      }

      if (interpretedQty === -15) {
        response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
        response.responseBody = JSON.stringify({ error: "Cart validation failed: Cart total cannot be verified." }, null, 2);
        response.observabilityLog = "[CRITICAL] Integer Overflow bypass successful! Interpreted quantity: -15. Cart calculation: (1 * 1500) + (-15 * 100) = 0. Checkout blocked by cart validation rules.";
        response.outcome = "تجاوزت جدار الـ WAF بنجاح ووقع التفاف للمتغيرات (Integer Overflow) ليتحول العدد إلى -15 داخل الخادم. ولكن النظام كشف أن إجمالي السلة صفر أو شاذ، فرفض تفعيل الدفع بـ 400 Bad Request.";
        response.correct = true; // Advance step!
        return response;
      } else {
        response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
        response.responseBody = JSON.stringify({ error: "Cart validation failed: Cart total cannot be verified." }, null, 2);
        response.observabilityLog = `[CRITICAL] Integer Overflow detected. Interpreted quantity: ${interpretedQty}. Cart Total: ${(1500 + interpretedQty * 100)}.`;
        response.outcome = "تم إحداث التفاف للمتغيرات، ولكن قيمة السلة غير صحيحة أو السيرفر رفض التحقق من الإجمالي.";
        return response;
      }
    }

    // Generic fallback
    response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
    response.responseBody = JSON.stringify({ error: "Invalid request parameters." }, null, 2);
    response.outcome = "الطلب البرمجي لم ينجح في تجاوز جدار الحماية أو التسبب في الالتفاف الحسابي الصحيح.";
    return response;
  }
};
