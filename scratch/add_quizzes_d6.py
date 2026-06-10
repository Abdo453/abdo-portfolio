import os

quizzes_file = r'D:\abdo_portfolio\build\ccna\quizzes.js'
with open(quizzes_file, 'r', encoding='utf-8') as f:
    quizzes_content = f.read()

new_quizzes = """
    "auto_json": {
        "easy": [
            {
                q: "أي صيغة بيانات (Data Format) أصبحت هي المعيار الأساسي لتبادل البيانات في הـ REST APIs بسبب سهولة قراءتها للبشر والآلات؟",
                options: ["XML", "JSON", "YAML", "HTML"],
                correct: 1,
                explanation: "الـ JSON يعتمد على فكرة (مفتاح: قيمة) وهو مدعوم بشكل هائل في لغات البرمجة والـ Web APIs."
            },
            {
                q: "ما هو الفعل (HTTP Verb) المستخدم في הـ REST API لجلب أو قراءة البيانات من الراوتر دون تغييرها؟",
                options: ["POST", "PUT", "PATCH", "GET"],
                correct: 3,
                explanation: "الـ GET يُستخدم دائماً للاستعلام وقراءة البيانات، بينما POST للإنشاء، وPUT/PATCH للتعديل."
            }
        ],
        "medium": [
            {
                q: "إذا تلقيت الرد `401 Unauthorized` من הـ REST API الخاص براوتر سيسكو، ماذا يعني هذا الرمز (HTTP Status Code)؟",
                options: ["الراوتر مُطفأ", "المسار غير موجود أو مكتوب بشكل خاطئ", "أنت لم تقم بإرسال بيانات المصادقة (Username/Password) الصحيحة", "الطلب تم بنجاح ولكن البيانات فارغة"],
                correct: 2,
                explanation: "الرموز التي تبدأ بـ 4 (4xx) تعني خطأ من العميل (أنت)، و 401 تحديداً تعني أنك تفشل في المصادقة (Authentication)."
            },
            {
                q: "ما هو الفرق الرئيسي بين JSON و XML؟",
                options: ["XML أسهل في القراءة من JSON", "JSON يعتمد على הـ Tags مثل HTML، بينما XML يعتمد على المسافات", "JSON خفيف وسهل البرمجة، بينما XML أكثر تعقيداً ويعتمد على הـ Tags ويستهلك مساحة أكبر", "JSON يستخدم في סيسكو فقط"],
                correct: 2,
                explanation: "XML دقيق لكنه مليء بـ <tags> تجعل حجم البيانات أكبر وقراءتها أصعب مقارنة بـ JSON البسيط المعتمد على الأقواس {}."
            }
        ],
        "hard": [
            {
                q: "في صيغة JSON، كيف تُمثّل المصفوفة (Array أو List) التي تحتوي على مجموعة من القيم؟",
                options: ["بين أقواس معقوفة {}", "بين أقواس مربعة []", "بين أقواس عادية ()", "داخل تاجات <>"],
                correct: 1,
                explanation: "في JSON، الـ Object يُكتب داخل {}، بينما الـ Array (مجموعة من القيم) يُكتب داخل أقواس مربعة []."
            }
        ],
        "scenario": [
            {
                q: "طلب منك مديرك كتابة سكريبت بايثون لإضافة مسار جديد (Static Route) في 100 راوتر. ما هو الـ HTTP Method الذي ستستخدمه في طلب الـ REST API لإنشاء هذا المورد الجديد؟",
                options: ["GET", "POST", "DELETE", "OPTIONS"],
                correct: 1,
                explanation: "بما أننا سنقوم (بإنشاء) مورد جديد لم يكن موجوداً، فالأمر الصحيح هو POST."
            }
        ]
    },
    "auto_sdn": {
        "easy": [
            {
                q: "في بنية الـ SDN (الشبكات المعرفة بالبرمجيات)، ما هما المستويان (Planes) اللذان يتم فصلهما عن بعضهما؟",
                options: ["Management Plane و Security Plane", "Data Plane و Control Plane", "Physical Plane و Logical Plane", "Core Plane و Access Plane"],
                correct: 1,
                explanation: "فكرة הـ SDN الجوهرية هي فصل הـ Control Plane (عقل الراوتر الذي يفكر) عن הـ Data Plane (عضلات الراوتر التي تمرر البيانات)."
            },
            {
                q: "ما هو الـ API المستخدم للتواصل بين الـ SDN Controller (المتحكم المركزي) والأجهزة العادية (الراوترات والسويتشات) في أسفل الشبكة؟",
                options: ["Northbound API", "Southbound API", "Eastbound API", "Westbound API"],
                correct: 1,
                explanation: "الاتصال لأسفل (نحو الأجهزة لتوزيع الأوامر عليها) يسمى Southbound API."
            }
        ],
        "medium": [
            {
                q: "أي أداة لإدارة التهيئة (Configuration Management) تعتمد على الـ SSH ولا تتطلب تثبيت أي برنامج وسيط (Agentless) على الراوترات؟",
                options: ["Puppet", "Chef", "Ansible", "Cisco DNA Center"],
                correct: 2,
                explanation: "الـ Ansible مشهور جداً بأنه Agentless، ويكتفي فقط بتفعيل הـ SSH على الراوتر أو السويتش ليدخل ويبرمجه."
            },
            {
                q: "ما هي بنية הـ (Intent-Based Networking) التي يقوم عليها הـ Cisco DNA Center؟",
                options: ["برمجة כל منفذ يدوياً بواسطة المهندس", "المهندس يحدد النية والهدف العام للشبكة، والـ Controller يترجم ذلك إلى أوامر برمجية (CLI) وينفذها على آلاف الأجهزة ਆلیاں", "توجيه البيانات استناداً إلى הـ MAC Address", "استخدام الأقمار الصناعية للاتصال"],
                correct: 1,
                explanation: "الشبكات الموجهة بالنوايا تسمح لك بوضع سياسة (مثال: فصل الموظفين عن الزوار)، وتترك للبرنامج مهمة التفكير في كيفية تطبيق الـ ACLs والـ VLANs."
            }
        ],
        "hard": [
            {
                q: "إذا كنت تريد كتابة סكريبت بايثون ليتحدث مع الـ SDN Controller (مثل Cisco DNA Center) لاستخراج إحصائيات الشبكة. أي نوع من الـ APIs ستستخدم؟",
                options: ["Southbound API", "Northbound API", "NETCONF", "OpenFlow"],
                correct: 1,
                explanation: "أنت والتطبيقات المبرمجة תجلسون فوق الـ Controller. الاتصال من أعلى لأسفل نحو الـ Controller يُسمى Northbound API."
            }
        ],
        "scenario": [
            {
                q: "في شبكة تقليدية مكونة من 50 راوتراً، جميعها تستخدم OSPF. تعطلت شبكة. أين يقع הـ Control Plane الذي سيتعامل مع هذا العطل؟",
                options: ["في سيرفر مركزي للشركة", "في הـ Data Plane الخاص بكل راوتر", "موزعاً داخل كل راوتر من الـ 50 راوتراً", "في الـ Cloud"],
                correct: 2,
                explanation: "في الشبكات العادية، الـ Control Plane ليس مركزياً، بل هو موجود في (عقل) كل راوتر، حيث يفكر ويشغل خوارزمية SPF بنفسه."
            }
        ]
    },
"""

quizzes_content = quizzes_content.replace('const quizzesData = {', 'const quizzesData = {\n' + new_quizzes)

with open(quizzes_file, 'w', encoding='utf-8') as f:
    f.write(quizzes_content)

print("Domain 6 Quizzes injected successfully!")
