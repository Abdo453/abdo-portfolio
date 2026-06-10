window.ccnaCurriculum = [
    {
        phase: "الدفعة الأولى: Switching & Layer 2 Security",
        levels: [
            {
                id: "lab1",
                title: "Lab 1: الأساسيات وتسمية الجهاز",
                theory: `<h2>تجهيز السويتش</h2>
                <p>كل جهاز في الشبكة يجب أن يكون له اسم مميز. قبل أي إعدادات متقدمة، يجب تغيير اسم السويتش الافتراضي.</p>
                <p><strong>الأوامر المطلوبة:</strong><br>
                <code>enable</code> للوصول لوضع المدير.<br>
                <code>configure terminal</code> للوصول لوضع الإعدادات.<br>
                <code>hostname [NAME]</code> لتغيير الاسم.</p>`,
                challengeText: "قم بتغيير اسم السويتش من Router (أو Switch) إلى SW1.",
                validate: function(state) {
                    return state.hostname === "SW1";
                }
            },
            {
                id: "lab2",
                title: "Lab 2: إنشاء الـ VLANs",
                theory: `<h2>تقسيم الشبكة وهمياً (VLAN)</h2>
                <p>لدينا قسم للمبيعات (Sales) وقسم للإدارة (Admin). يجب فصلهما أمنياً باستخدام الـ VLANs.</p>
                <p><strong>الأوامر:</strong><br>
                <code>vlan 10</code> ثم <code>name Sales</code><br>
                <code>vlan 20</code> ثم <code>name Admin</code></p>`,
                challengeText: "أنشئ VLAN 10 وسمّها Sales، وأنشئ VLAN 20 وسمّها Admin.",
                validate: function(state) {
                    let v10 = state.vlans && state.vlans["10"] && state.vlans["10"].name === "Sales";
                    let v20 = state.vlans && state.vlans["20"] && state.vlans["20"].name === "Admin";
                    return v10 && v20;
                }
            },
            {
                id: "lab3",
                title: "Lab 3: منافذ الوصول (Access Ports)",
                theory: `<h2>ربط الأجهزة بالـ VLANs</h2>
                <p>الآن يجب إخبار السويتش بأن المنفذ f0/1 يخص المبيعات (VLAN 10).</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/1</code><br>
                <code>switchport mode access</code><br>
                <code>switchport access vlan 10</code></p>`,
                challengeText: "قم بتحويل المنفذ f0/1 إلى وضع Access واربطه بـ VLAN 10.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/1"];
                    return intf && intf.mode === "access" && intf.accessVlan === "10";
                }
            },
            {
                id: "lab4",
                title: "Lab 4: الروابط المجمعة (Trunk Ports)",
                theory: `<h2>ربط السويتشات ببعضها (Trunking)</h2>
                <p>إذا أردنا أن تعبر بيانات VLAN 10 و VLAN 20 عبر كابل واحد إلى السويتش الآخر، يجب تحويل المنفذ إلى Trunk.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface g0/1</code><br>
                <code>switchport mode trunk</code></p>`,
                challengeText: "ادخل على المنفذ g0/1 وقم بتحويله إلى Trunk.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["g0/1"];
                    return intf && intf.mode === "trunk";
                }
            },
            {
                id: "lab5",
                title: "Lab 5: أمان الـ Native VLAN",
                theory: `<h2>إغلاق ثغرة VLAN Hopping</h2>
                <p>الـ Native VLAN الافتراضية هي 1، مما يشكل خطراً أمنياً لأنها تعبر كابل الـ Trunk بدون تشفير (Untagged). الهكر يستغل ذلك لاختراق الشبكة.</p>
                <p>الحل: تغييرها لرقم مهمل (مثلاً 99).</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface g0/1</code><br>
                <code>switchport trunk native vlan 99</code></p>`,
                challengeText: "قم بتغيير الـ Native VLAN على المنفذ g0/1 لتصبح 99.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["g0/1"];
                    return intf && intf.nativeVlan === "99";
                }
            },
            {
                id: "lab6",
                title: "Lab 6: أمان المنافذ (Port Security)",
                theory: `<h2>منع الغرباء من الاتصال</h2>
                <p>لحماية منفذ مدير الشركة (f0/2) من أن يقوم شخص بفصل كابله وتوصيل لابتوب اختراق، سنستخدم Port Security لكي يُغلق المنفذ فوراً في حال المخالفة.</p>
                <p><strong>الأوامر:</strong><br>
                <code>switchport port-security</code><br>
                <code>switchport port-security violation shutdown</code></p>`,
                challengeText: "في المنفذ f0/2، فعّل الـ Port Security واجعل الـ Violation هو shutdown.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/2"];
                    return intf && intf.portSecurityEnabled && intf.violation === "shutdown";
                }
            },
            {
                id: "lab7",
                title: "Lab 7: حماية من الـ MAC Flooding",
                theory: `<h2>تحديد عدد الأجهزة (Maximum MACs)</h2>
                <p>الهكر يقوم بإرسال آلاف عناوين الـ MAC الوهمية لإسقاط السويتش (MAC Flooding Attack). لمنع ذلك، نحدد أقصى عدد للأجهزة المسموحة على المنفذ بـ 2 فقط.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/3</code><br>
                <code>switchport port-security maximum 2</code></p>`,
                challengeText: "ادخل للمنفذ f0/3 وحدد الـ Maximum لعدد الـ MACs بـ 2.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/3"];
                    return intf && intf.maximumMacs === "2";
                }
            },
            {
                id: "lab8",
                title: "Lab 8: منع الدوران (Spanning Tree)",
                theory: `<h2>اختيار الملك (Root Bridge)</h2>
                <p>بروتوكول STP يمنع دوران البيانات للما لا نهاية (Loop). السويتش صاحب الأولوية الأقل يصبح الملك (Root) وتتجه كل البيانات إليه.</p>
                <p><strong>الأمر (من وضع Config):</strong><br>
                <code>spanning-tree vlan 10 root primary</code></p>`,
                challengeText: "اجعل هذا السويتش هو الأساسي (Root Primary) لـ VLAN 10.",
                validate: function(state) {
                    return state.stpConfig && state.stpConfig["10"] === "primary";
                }
            },
            {
                id: "lab9",
                title: "Lab 9: تجميع الروابط (EtherChannel)",
                theory: `<h2>مضاعفة السرعة وتوفير التكرار</h2>
                <p>إذا قمنا بتوصيل كابلين بين سويتشين، فإن STP سيغلق واحداً. لتشغيل الاثنين معاً ككابل واحد سريع، نستخدم EtherChannel عبر بروتوكول LACP (العالمي).</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/4</code><br>
                <code>channel-group 1 mode active</code></p>`,
                challengeText: "ادخل على المنفذ f0/4 واجمعه في القناة رقم 1 باستخدام وضع active.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/4"];
                    return intf && intf.channelGroup === "1" && intf.channelMode === "active";
                }
            },
            {
                id: "lab10",
                title: "Lab 10: ☠️ هجوم الاستطلاع الأول (Reconnaissance)",
                isLinux: true,
                theory: `<h2>اختبار الاختراق: من سطر أوامر Linux</h2>
                <p>لقد انتقلت الآن من شاشة إعدادات الراوتر إلى <strong>شاشة لابتوب Kali Linux الخاص بالهكر.</strong><br>
                أول خطوة لأي مختبر اختراق (Pentester) هي الاستطلاع لمعرفة البورتات المفتوحة في أجهزة الشبكة التي صممناها.</p>
                <p><strong>الأمر:</strong><br>
                استخدم أداة <code>nmap</code> لفحص بصمة السيرفر الهدف بصمت (Stealth Scan):<br>
                <code>nmap -sS 192.168.1.100</code></p>`,
                challengeText: "استخدم أمر nmap -sS لفحص الـ IP الهدف 192.168.1.100 من جهاز الهكر.",
                validate: function(state) {
                    return state.lastNmap && state.lastNmap.includes("nmap -sS 192.168.1.100");
                }
            }
        ]
    }
];
