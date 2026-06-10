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
    },
    {
        phase: "الدفعة الثانية: Routing & Layer 3",
        levels: [
            {
                id: "lab11",
                title: "Lab 11: التوجيه الثابت (Static Route)",
                theory: `<h2>ربط الشبكات غير المتصلة مباشرة</h2>
                <p>التوجيه الثابت هو أأمن وأسرع أنواع التوجيه للشبكات الصغيرة. لتعليم الراوتر مساراً جديداً نكتب:</p>
                <p><code>ip route [Network] [Subnet_Mask] [Next_Hop_IP]</code></p>`,
                challengeText: "أضف مساراً ثابتاً للشبكة 10.0.0.0 قناع 255.0.0.0 عبر الـ IP التالي 192.168.1.2",
                validate: function(state) {
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "10.0.0.0" && r.mask === "255.0.0.0" && r.nextHop === "192.168.1.2") return true;
                        }
                    }
                    return false;
                }
            },
            {
                id: "lab12",
                title: "Lab 12: المسار الافتراضي (Default Route)",
                theory: `<h2>مخرج الطوارئ (الإنترنت)</h2>
                <p>المسار الافتراضي يُستخدم لتوجيه أي بيانات لا يعرف الراوتر وجهتها نحو الإنترنت (Gateway of Last Resort).</p>
                <p><code>ip route 0.0.0.0 0.0.0.0 [Next_Hop_IP]</code></p>`,
                challengeText: "أضف مساراً افتراضياً عبر الـ IP التالي 8.8.8.8",
                validate: function(state) {
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "0.0.0.0" && r.mask === "0.0.0.0" && r.nextHop === "8.8.8.8") return true;
                        }
                    }
                    return false;
                }
            },
            {
                id: "lab13",
                title: "Lab 13: المسار الاحتياطي العائم (Floating Static Route)",
                theory: `<h2>المسار الاحتياطي</h2>
                <p>ماذا لو انقطع الكابل الأساسي؟ يمكننا وضع مسار احتياطي عبر كابل أبطأ. نفعل ذلك بجعل قيمة الـ (AD) أعلى من 1.</p>
                <p><code>ip route 10.0.0.0 255.0.0.0 192.168.2.2 10</code></p>`,
                challengeText: "أضف مساراً احتياطياً لشبكة 10.0.0.0 (255.0.0.0) عبر 192.168.2.2 واجعل الـ AD بقيمة 10.",
                validate: function(state) {
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "10.0.0.0" && r.nextHop === "192.168.2.2" && r.ad === "10") return true;
                        }
                    }
                    return false;
                }
            },
            {
                id: "lab14",
                title: "Lab 14: تفعيل بروتوكول RIP",
                theory: `<h2>أقدم بروتوكولات التوجيه</h2>
                <p>يستخدم بروتوكول RIP لتبادل جداول التوجيه تلقائياً بين الراوترات. لابد من تفعيل الإصدار 2 ليدعم الـ VLSM.</p>
                <p><code>router rip</code><br><code>version 2</code><br><code>network 192.168.1.0</code></p>`,
                challengeText: "فعّل بروتوكول RIP الإصدار 2، وأعلن عن الشبكة 192.168.1.0.",
                validate: function(state) {
                    return state.currentProtocol === "rip" && state.rip && state.rip.version === "2" && state.rip.networks.some(n => n.net === "192.168.1.0");
                }
            },
            {
                id: "lab15",
                title: "Lab 15: تفعيل OSPF",
                theory: `<h2>بروتوكول OSPF (Area 0)</h2>
                <p>الـ OSPF هو الأكثر استخداماً عالمياً. يحتاج لـ Process ID ولتحديد الـ Area ولـ Wildcard Mask بدلاً من الـ Subnet.</p>
                <p><code>router ospf 1</code><br><code>network 10.1.1.0 0.0.0.255 area 0</code></p>`,
                challengeText: "فعّل OSPF برقم عملية 1، وأعلن عن شبكة 10.1.1.0 (Wildcard 0.0.0.255) في Area 0.",
                validate: function(state) {
                    if (state.ospf && state.ospf.pid === "1") {
                        return state.ospf.networks.some(n => n.net === "10.1.1.0" && n.wildcard === "0.0.0.255" && n.area === "0");
                    }
                    return false;
                }
            },
            {
                id: "lab16",
                title: "Lab 16: تعيين بصمة الراوتر (Router ID)",
                theory: `<h2>هوية الراوتر في الـ OSPF</h2>
                <p>لمنع تعارض الأسماء، يُفضّل تحديد Router ID يدوياً لكل راوتر في عملية الـ OSPF لضمان استقرار الشبكة في انتخاب الـ DR.</p>
                <p><code>router-id 1.1.1.1</code></p>`,
                challengeText: "أنت داخل الـ OSPF حالياً. قم بتحديد الـ Router ID الخاص بك ليكون 1.1.1.1",
                validate: function(state) {
                    return state.ospf && state.ospf.routerId === "1.1.1.1";
                }
            },
            {
                id: "lab17",
                title: "Lab 17: تفعيل EIGRP",
                theory: `<h2>بروتوكول EIGRP الخاص بسيسكو</h2>
                <p>يعتمد على رقم (Autonomous System - AS) يجب أن يكون متطابقاً بين جميع الراوترات لتتحدث معاً.</p>
                <p><code>router eigrp 100</code><br><code>network 172.16.0.0 0.0.255.255</code></p>`,
                challengeText: "فعّل EIGRP برقم AS هو 100، وأعلن عن شبكة 172.16.0.0 بالوايلد كارد 0.0.255.255.",
                validate: function(state) {
                    if (state.eigrp && state.eigrp.as === "100") {
                        return state.eigrp.networks.some(n => n.net === "172.16.0.0" && n.wildcard === "0.0.255.255");
                    }
                    return false;
                }
            },
            {
                id: "lab18",
                title: "Lab 18: Router-on-a-stick",
                theory: `<h2>جعل الراوتر يفهم الـ VLANs</h2>
                <p>الراوتر عادة لا يفهم الـ Tags الخاصة بالـ VLAN. للربط بين VLANs متعددة عبر كابل واحد، ندخل على الـ Sub-interface ونُفعّل الـ Dot1Q.</p>
                <p><code>interface f0/0.10</code><br><code>encapsulation dot1Q 10</code></p>`,
                challengeText: "ادخل للمنفذ الفرعي f0/0.10 وفعّل تغليف dot1Q للـ VLAN رقم 10.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/0.10"];
                    return intf && intf.encapsulation === "dot1Q" && intf.encapsulationVlan === "10";
                }
            },
            {
                id: "lab19",
                title: "Lab 19: ☠️ هجوم المسار المزيف (Route Injection)",
                isLinux: true,
                theory: `<h2>اختبار الاختراق: التلاعب بالتوجيه</h2>
                <p>إذا لم يقم مهندس الشبكة بتفعيل كلمات سر للـ OSPF (Authentication)، يمكن للهكر من جهاز Kali إرسال LSA وهمية ليعلن نفسه كـ Default Gateway ويسرق الترافيك.</p>
                <p>لدينا أداة بايثون جاهزة اسمها <code>route-injector</code> سنستخدمها لحقن مسار مزيف.</p>`,
                challengeText: "استخدم الأمر <code>route-injector --protocol ospf --target 192.168.1.1 --inject 0.0.0.0</code>",
                validate: function(state) {
                    return state.lastPing && state.lastPing.includes("route-injector --protocol ospf --target 192.168.1.1 --inject 0.0.0.0");
                }
            },
            {
                id: "lab20",
                title: "Lab 20: إصلاح الاختراق (Troubleshooting)",
                theory: `<h2>الإنقاذ في وقت الطوارئ</h2>
                <p>اكتشفت الشركة الهجوم الذي تم في Lab 19! الترافيك يتجه للهاكر بدلاً من الإنترنت عبر 192.168.1.1.</p>
                <p>الحل السريع: اكتب مساراً ثابتاً يوجه كل شيء للإنترنت عبر الراوتر الآمن (10.10.10.1) بقيمة AD = 1 ليطغى على مسار الـ OSPF (الذي يمتلك AD 110).</p>`,
                challengeText: "أضف مساراً افتراضياً (0.0.0.0 0.0.0.0) عبر الـ IP الآمن 10.10.10.1 مع وضع AD=1",
                validate: function(state) {
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "0.0.0.0" && r.mask === "0.0.0.0" && r.nextHop === "10.10.10.1" && r.ad === "1") return true;
                        }
                    }
                    return false;
                }
            }
        ]
    }
];
