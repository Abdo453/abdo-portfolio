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
                <code>hostname [NAME]</code> لتغيير الاسم.<br>
                <code>show running-config</code> للتحقق من التغيير.</p>`,
                challengeText: "قم بتغيير اسم السويتش إلى SW1 واكتب show running-config للتحقق.",
                validate: function(state) {
                    return state.hostname === "SW1" && state.lastShow && state.lastShow.includes("show run");
                }
            },
            {
                id: "lab2",
                title: "Lab 2: إنشاء الـ VLANs",
                theory: `<h2>تقسيم الشبكة وهمياً (VLAN)</h2>
                <p>لدينا قسم للمبيعات (Sales) وقسم للإدارة (Admin). يجب فصلهما أمنياً باستخدام الـ VLANs.</p>
                <p><strong>الأوامر:</strong><br>
                <code>vlan 10</code> ثم <code>name Sales</code><br>
                <code>vlan 20</code> ثم <code>name Admin</code><br>
                <code>show vlan brief</code> للتحقق.</p>`,
                challengeText: "أنشئ VLAN 10 (Sales)، و VLAN 20 (Admin)، وتأكد بأمر show vlan brief.",
                validate: function(state) {
                    let v10 = state.vlans && state.vlans["10"] && state.vlans["10"].name === "Sales";
                    let v20 = state.vlans && state.vlans["20"] && state.vlans["20"].name === "Admin";
                    let checked = state.lastShow && state.lastShow.includes("show vlan");
                    return v10 && v20 && checked;
                }
            },
            {
                id: "lab3",
                title: "Lab 3: منافذ الوصول (Access Ports)",
                theory: `<h2>ربط الأجهزة بالـ VLANs</h2>
                <p>الآن يجب إخبار السويتش بأن المنفذ f0/1 يخص المبيعات، ويجب تشغيله.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/1</code><br>
                <code>switchport mode access</code><br>
                <code>switchport access vlan 10</code><br>
                <code>no shutdown</code><br>
                <code>show ip interface brief</code> للتحقق.</p>`,
                challengeText: "اربط المنفذ f0/1 بـ VLAN 10 وشغله ثم تحقق.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/1"];
                    let configured = intf && intf.mode === "access" && intf.accessVlan === "10" && intf.shutdown === false;
                    let checked = state.lastShow && state.lastShow.includes("show ip int");
                    return configured && checked;
                }
            },
            {
                id: "lab4",
                title: "Lab 4: الروابط المجمعة (Trunk Ports)",
                theory: `<h2>ربط السويتشات ببعضها (Trunking)</h2>
                <p>لعبور بيانات أكثر من VLAN عبر كابل واحد، نحوله إلى Trunk.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface g0/1</code><br>
                <code>switchport mode trunk</code><br>
                <code>no shutdown</code></p>`,
                challengeText: "حول المنفذ g0/1 إلى Trunk وقم بتشغيله.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["g0/1"];
                    return intf && intf.mode === "trunk" && intf.shutdown === false;
                }
            },
            {
                id: "lab5",
                title: "Lab 5: أمان الـ Native VLAN",
                theory: `<h2>إغلاق ثغرة VLAN Hopping</h2>
                <p>الـ Native VLAN الافتراضية هي 1، وبياناتها تمر عبر الـ Trunk بدون Tag (Untagged). الهكر يستغل ذلك لتنفيذ هجوم Double Tagging.</p>
                <p>الحل: تغييرها لرقم مهمل.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface g0/1</code><br>
                <code>switchport trunk native vlan 99</code></p>`,
                challengeText: "غير الـ Native VLAN على المنفذ g0/1 إلى 99.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["g0/1"];
                    return intf && intf.nativeVlan === "99";
                }
            },
            {
                id: "lab6",
                title: "Lab 6: أمان المنافذ (Port Security)",
                theory: `<h2>منع الغرباء من الاتصال</h2>
                <p>لحماية المنفذ (f0/2) من أجهزة الاختراق، سنُفعل الـ Port Security ونثبت الـ MAC address الحالي.</p>
                <p><strong>الأوامر:</strong><br>
                <code>switchport port-security</code><br>
                <code>switchport port-security mac-address sticky</code><br>
                <code>switchport port-security violation shutdown</code><br>
                <code>show port-security</code></p>`,
                challengeText: "في f0/2، فعل Port Security مع sticky و shutdown، وتحقق من النتيجة.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/2"];
                    let configured = intf && intf.portSecurityEnabled && intf.violation === "shutdown" && intf.macAddress === "sticky";
                    let checked = state.lastShow && state.lastShow.includes("show port-sec");
                    return configured && checked;
                }
            },
            {
                id: "lab7",
                title: "Lab 7: حماية من الـ MAC Flooding",
                theory: `<h2>تحديد عدد الأجهزة (Maximum MACs)</h2>
                <p>لنفترض أن Port Security مفعل مسبقاً، يجب تحديد أقصى عدد للأجهزة لمنع إغراق السويتش بآلاف الـ MAC الوهمية.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/3</code><br>
                <code>switchport port-security maximum 2</code></p>`,
                challengeText: "في f0/3، حدد الـ Maximum MACs بـ 2.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/3"];
                    return intf && intf.maximumMacs === "2";
                }
            },
            {
                id: "lab8",
                title: "Lab 8: منع الدوران (Spanning Tree)",
                theory: `<h2>اختيار الملك (Root Bridge)</h2>
                <p>بروتوكول STP يمنع الـ Loop. السويتش صاحب الأولوية الأقل يصبح Root.</p>
                <p><strong>الأمر (من وضع Config):</strong><br>
                <code>spanning-tree vlan 10 root primary</code></p>`,
                challengeText: "اجعل السويتش Root Primary لـ VLAN 10.",
                validate: function(state) {
                    return state.stpConfig && state.stpConfig["10"] === "primary";
                }
            },
            {
                id: "lab9",
                title: "Lab 9: تجميع الروابط (EtherChannel)",
                theory: `<h2>مضاعفة السرعة وتوفير التكرار</h2>
                <p>لدمج عدة كابلات في كابل وهمي واحد سريع باستخدام LACP.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/4</code><br>
                <code>channel-group 1 mode active</code></p>`,
                challengeText: "اجمع f0/4 في قناة رقم 1 بوضع active.",
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
                <p>لقد انتقلت الآن من شاشة الراوتر إلى <strong>شاشة لابتوب Kali Linux الخاص بالهكر.</strong></p>
                <p><strong>الأمر:</strong><br>
                استخدم أداة <code>nmap</code> لفحص بصمة السيرفر بصمت (Stealth Scan):<br>
                <code>nmap -sS 192.168.1.100</code></p>`,
                challengeText: "استخدم nmap -sS لفحص 192.168.1.100",
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
                <p><strong>الأوامر:</strong><br>
                <code>ip route 10.0.0.0 255.0.0.0 192.168.1.2</code><br>
                <code>show ip route</code></p>`,
                challengeText: "أضف مساراً ثابتاً لـ 10.0.0.0 (255.0.0.0) عبر 192.168.1.2 وتحقق بـ show.",
                validate: function(state) {
                    let routeExists = false;
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "10.0.0.0" && r.mask === "255.0.0.0" && r.nextHop === "192.168.1.2") routeExists = true;
                        }
                    }
                    let checked = state.lastShow && state.lastShow.includes("show ip route");
                    return routeExists && checked;
                }
            },
            {
                id: "lab12",
                title: "Lab 12: المسار الافتراضي (Default Route)",
                theory: `<h2>مخرج الطوارئ (الإنترنت)</h2>
                <p>توجيه أي بيانات مجهولة الوجهة نحو الراوتر المجاور (Next-hop المحلي).</p>
                <p><code>ip route 0.0.0.0 0.0.0.0 192.168.1.2</code></p>`,
                challengeText: "أضف مساراً افتراضياً عبر الـ IP المحلي 192.168.1.2",
                validate: function(state) {
                    if (state.routes) {
                        for(let r of state.routes) {
                            if (r.network === "0.0.0.0" && r.mask === "0.0.0.0" && r.nextHop === "192.168.1.2") return true;
                        }
                    }
                    return false;
                }
            },
            {
                id: "lab13",
                title: "Lab 13: المسار الاحتياطي (Floating Route)",
                theory: `<h2>المسار الاحتياطي (AD)</h2>
                <p>لتشغيل مسار احتياطي أبطأ، نرفع قيمة الـ AD (Administrative Distance) فوق 1. كلما زادت الـ AD، قلت موثوقية المسار ولن يعمل إلا إذا سقط الأساسي.</p>
                <p><code>ip route 10.0.0.0 255.0.0.0 192.168.2.2 10</code></p>`,
                challengeText: "أضف مساراً احتياطياً لشبكة 10.0.0.0 عبر 192.168.2.2 بقيمة AD=10.",
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
                title: "Lab 14: التوجيه الديناميكي RIPv2",
                theory: `<h2>التوجيه التلقائي المبسط</h2>
                <p>تفعيل بروتوكول RIP لتبادل الجداول.</p>
                <p><code>router rip</code><br><code>version 2</code><br><code>network 192.168.1.0</code></p>`,
                challengeText: "فعّل RIPv2 وأعلن عن شبكة 192.168.1.0.",
                validate: function(state) {
                    return state.currentProtocol === "rip" && state.rip && state.rip.version === "2" && state.rip.networks.some(n => n.net === "192.168.1.0");
                }
            },
            {
                id: "lab15",
                title: "Lab 15: تفعيل OSPF",
                theory: `<h2>بروتوكول OSPF (Area 0)</h2>
                <p>الـ OSPF هو الأكثر استخداماً. يحتاج Process ID، Wildcard Mask، و Area.</p>
                <p><code>router ospf 1</code><br><code>network 10.1.1.0 0.0.0.255 area 0</code></p>`,
                challengeText: "فعّل OSPF (PID 1)، وأعلن 10.1.1.0 (Wildcard 0.0.0.255) في Area 0.",
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
                <p>لمنع تعارض الأسماء وانتخاب الـ DR.</p>
                <p><code>router-id 1.1.1.1</code></p>`,
                challengeText: "داخل OSPF، حدد הـ Router ID ليكون 1.1.1.1",
                validate: function(state) {
                    return state.ospf && state.ospf.routerId === "1.1.1.1";
                }
            },
            {
                id: "lab17",
                title: "Lab 17: تفعيل EIGRP",
                theory: `<h2>مفاهيم EIGRP</h2>
                <p>يعتمد على Autonomous System متطابق بين كل الراوترات.</p>
                <p><code>router eigrp 100</code><br><code>network 172.16.0.0 0.0.255.255</code></p>`,
                challengeText: "فعّل EIGRP (AS 100)، وأعلن عن شبكة 172.16.0.0 (0.0.255.255).",
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
                <p>لربط VLANs عبر كابل واحد، ندخل للمنفذ الفرعي، نضع IP ونشغله ونفعل التغليف.</p>
                <p><strong>الأوامر:</strong><br>
                <code>interface f0/0.10</code><br>
                <code>encapsulation dot1Q 10</code><br>
                <code>ip address 192.168.10.1 255.255.255.0</code><br>
                <code>no shutdown</code></p>`,
                challengeText: "في f0/0.10 فعل dot1Q لـ VLAN 10، أعطه IP 192.168.10.1، وشغله.",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces["f0/0.10"];
                    return intf && intf.encapsulation === "dot1Q" && intf.encapsulationVlan === "10" && intf.ip === "192.168.10.1" && intf.shutdown === false;
                }
            },
            {
                id: "lab19",
                title: "Lab 19: ☠️ هجوم المسار المزيف",
                isLinux: true,
                theory: `<h2>حقن مسارات وهمية (Route Injection)</h2>
                <p>⚠️ <em>تنبيه: هذا أمر محاكى. في نظام Kali الحقيقي، يستخدم الـ Pentester برمجيات مثل Scapy أو سكربتات Python معقدة لحقن الـ LSA الوهمية في الـ OSPF.</em></p>
                <p>الهكر يرسل LSA وهمي ليعلن نفسه كـ Default Gateway.</p>`,
                challengeText: "احقن مسار 0.0.0.0: route-injector --protocol ospf --target 192.168.1.1 --inject 0.0.0.0",
                validate: function(state) {
                    return state.lastPing && state.lastPing.includes("route-injector --protocol ospf --target 192.168.1.1 --inject 0.0.0.0");
                }
            },
            {
                id: "lab20",
                title: "Lab 20: إصلاح الاختراق (Troubleshooting)",
                theory: `<h2>الإنقاذ في وقت الطوارئ</h2>
                <p>الحل السريع لصد هجوم OSPF هو كتابة مسار Static ثابت بقيمة AD=1 ليطغى على مسار الهاكر (AD=110).</p>`,
                challengeText: "أضف مسار 0.0.0.0 0.0.0.0 عبر الـ IP الآمن 10.10.10.1 مع وضع AD=1",
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
    },
    {
        phase: "الدفعة الثالثة: IP Services & Security",
        levels: [
            {
                id: "lab21",
                title: "Lab 21: العنونة بالإصدار السادس (IPv6 Addressing)",
                theory: `<h2>المستقبل: IPv6</h2>
                <p>الراوتر افتراضياً لا يمرر حزم الـ IPv6. يجب تفعيل التوجيه أولاً، ثم إعطاء المنفذ عنوان IPv6 سداسي عشري (Hexadecimal).</p>
                <p><strong>الأوامر:</strong><br>
                <code>ipv6 unicast-routing</code><br>
                <code>interface g0/0</code><br>
                <code>ipv6 address 2001:db8::1/64</code><br>
                <code>no shutdown</code></p>`,
                challengeText: "فعل التوجيه لـ IPv6، وادخل على g0/0 وشغله وأعطه الـ IP: 2001:db8::1/64",
                validate: function(state) {
                    let routing = state.ipv6Routing === true;
                    let intf = state.interfaces && state.interfaces["g0/0"];
                    let configured = intf && intf.ipv6 === "2001:db8::1/64" && intf.shutdown === false;
                    return routing && configured;
                }
            },
            {
                id: "lab22",
                title: "Lab 22: التوجيه الثابت للـ IPv6",
                theory: `<h2>المسارات في عالم الـ IPv6</h2>
                <p>بنفس مبدأ التوجيه في IPv4، ولكن بأمر ipv6 route والاعتماد على الـ Prefix Length (مثل /64) بدلاً من Subnet Mask.</p>
                <p><code>ipv6 route 2001:db8:2::/64 2001:db8:1::2</code></p>`,
                challengeText: "أضف مساراً ثابتاً للشبكة 2001:db8:2::/64 عبر 2001:db8:1::2",
                validate: function(state) {
                    if (state.ipv6Routes) {
                        for (let r of state.ipv6Routes) {
                            if (r.network === "2001:db8:2::/64" && r.nextHop === "2001:db8:1::2") return true;
                        }
                    }
                    return false;
                }
            },
            {
                id: "lab23",
                title: "Lab 23: قائمة التحكم (Standard ACL)",
                theory: `<h2>البواب الإلكتروني للشبكة (Standard)</h2>
                <p>الـ Standard ACL تتحكم في مرور البيانات بناءً على "مصدر البيانات (Source IP)" فقط. وتوضع أقرب ما يمكن للوجهة الممنوعة.</p>
                <p><strong>الأوامر لمنع جهاز 192.168.1.50 وتمرير الباقي:</strong><br>
                <code>access-list 1 deny 192.168.1.50</code><br>
                <code>access-list 1 permit any</code><br>
                وتطبيقها على المنفذ المتصل بالخادم:<br>
                <code>interface g0/1</code><br>
                <code>ip access-group 1 out</code></p>`,
                challengeText: "أنشئ ACL رقم 1 لمنع 192.168.1.50 والسماح للبقية، وطبقها كـ out على المنفذ g0/1.",
                validate: function(state) {
                    let acl = state.acls && state.acls["1"];
                    let hasDeny = acl && acl.some(r => r.action === "deny" && r.target === "192.168.1.50");
                    let hasPermit = acl && acl.some(r => r.action === "permit" && r.target === "any");
                    let intf = state.interfaces && state.interfaces["g0/1"];
                    let applied = intf && intf.accessGroup && intf.accessGroup.acl === "1" && intf.accessGroup.direction === "out";
                    return hasDeny && hasPermit && applied;
                }
            },
            {
                id: "lab24",
                title: "Lab 24: قائمة التحكم الممتدة (Extended ACL)",
                theory: `<h2>تحكم دقيق (Extended)</h2>
                <p>الـ Extended ACL تتحكم بناءً على المصدر، والوجهة، ورقم البورت (مثل 80 للويب). يجب وضعها قريباً من المصدر.</p>
                <p><strong>الأوامر لمنع التصفح (Port 80) عن خادم 10.0.0.5:</strong><br>
                <code>access-list 100 deny tcp any host 10.0.0.5 eq 80</code><br>
                <code>access-list 100 permit ip any any</code></p>`,
                challengeText: "أنشئ ACL 100 تمنع tcp من أي مكان إلى host 10.0.0.5 للبورت 80، ثم اسمح لباقي الترافيك.",
                validate: function(state) {
                    let acl = state.acls && state.acls["100"];
                    let hasDeny = acl && acl.some(r => r.action === "deny" && r.target === "tcp any host 10.0.0.5 eq 80");
                    let hasPermit = acl && acl.some(r => r.action === "permit" && r.target === "ip any any");
                    return hasDeny && hasPermit;
                }
            },
            {
                id: "lab25",
                title: "Lab 25: ترجمة العناوين (Static NAT)",
                theory: `<h2>تعريض خادم محلي للإنترنت (Static NAT)</h2>
                <p>لجعل خادم الويب الداخلي متاحاً للجمهور، نربط الـ IP الداخلي الخاص به (Private) بـ IP عام (Public) بشكل ثابت (1-to-1).</p>
                <p><strong>الأوامر:</strong><br>
                <code>ip nat inside source static 192.168.1.100 203.0.113.5</code><br>
                <code>interface f0/0</code> ثم <code>ip nat inside</code><br>
                <code>interface g0/0</code> ثم <code>ip nat outside</code></p>`,
                challengeText: "اربط الـ 192.168.1.100 بالعام 203.0.113.5. اجعل f0/0 inside و g0/0 outside.",
                validate: function(state) {
                    let hasNat = state.nat && state.nat.some(n => n.type === "static" && n.inside === "192.168.1.100" && n.outside === "203.0.113.5");
                    let inIf = state.interfaces && state.interfaces["f0/0"] && state.interfaces["f0/0"].nat === "inside";
                    let outIf = state.interfaces && state.interfaces["g0/0"] && state.interfaces["g0/0"].nat === "outside";
                    return hasNat && inIf && outIf;
                }
            },
            {
                id: "lab26",
                title: "Lab 26: مشاركة الإنترنت (NAT Overload / PAT)",
                theory: `<h2>اتصال الموظفين بالإنترنت (PAT)</h2>
                <p>كيف يتصل 100 موظف بالإنترنت باستخدام IP عام واحد فقط؟ عبر الـ PAT (Port Address Translation) وهو يعرف في سيسكو بكلمة overload.</p>
                <p><strong>الأوامر:</strong><br>
                أولاً نحدد الموظفين: <code>access-list 1 permit 192.168.1.0 0.0.0.255</code><br>
                ثم نطبق الـ PAT على منفذ الخروج: <code>ip nat inside source list 1 interface g0/0 overload</code></p>`,
                challengeText: "أنشئ ACL 1 للشبكة 192.168.1.0 (0.0.0.255)، وطبق PAT باستخدام قائمة 1 على واجهة g0/0.",
                validate: function(state) {
                    let acl = state.acls && state.acls["1"] && state.acls["1"].some(r => r.action === "permit" && r.target === "192.168.1.0");
                    let hasPat = state.nat && state.nat.some(n => n.type === "overload" && n.list === "1" && n.poolOrIf === "g0/0");
                    return acl && hasPat;
                }
            },
            {
                id: "lab27",
                title: "Lab 27: خادم الـ DHCP",
                theory: `<h2>توزيع الـ IP أوتوماتيكياً</h2>
                <p>بدلاً من كتابة الـ IP يدوياً لكل جهاز، يمكن للراوتر توزيعها.</p>
                <p><strong>الأوامر:</strong><br>
                <code>ip dhcp pool LAN</code><br>
                <code>network 192.168.1.0 255.255.255.0</code><br>
                <code>default-router 192.168.1.1</code></p>`,
                challengeText: "أنشئ Pool باسم LAN، للشبكة 192.168.1.0 (255.255.255.0)، والـ Gateway 192.168.1.1.",
                validate: function(state) {
                    let pool = state.dhcp && state.dhcp["LAN"];
                    return pool && pool.network === "192.168.1.0" && pool.mask === "255.255.255.0" && pool.defaultRouter === "192.168.1.1";
                }
            },
            {
                id: "lab28",
                title: "Lab 28: تأمين الإدارة عن بُعد (SSH)",
                theory: `<h2>تشفير بيانات الإدارة</h2>
                <p>بروتوكول Telnet يرسل كلمات السر مكشوفة (Plain Text). في عالم الـ Security، استخدامه جريمة! البديل هو SSH.</p>
                <p><strong>الأوامر المطلوبة:</strong><br>
                <code>ip domain-name cisco.com</code> (لإنشاء مفتاح التشفير)<br>
                <code>crypto key generate rsa</code><br>
                <code>username admin secret cisco</code><br>
                <code>line vty 0 4</code><br>
                <code>login local</code><br>
                <code>transport input ssh</code></p>`,
                challengeText: "اكتب الأوامر الستة المطلوبة لتفعيل الـ SSH والمستخدم admin.",
                validate: function(state) {
                    let domain = state.domainName === "cisco.com";
                    let keys = state.cryptoKey === true;
                    let user = state.users && state.users["admin"] === true;
                    let vty = state.lineVty && state.lineVty.loginLocal === true && state.lineVty.ssh === true;
                    return domain && keys && user && vty;
                }
            },
            {
                id: "lab29",
                title: "Lab 29: المركزية (Syslog & NTP)",
                theory: `<h2>إدارة الـ Logs ومزامنة الوقت</h2>
                <p>حين تتعرض الشبكة لاختراق، أول ما يبحث عنه المحقق الرقمي (Forensic) هو الـ Logs والوقت الدقيق.</p>
                <p><strong>الأوامر:</strong><br>
                إرسال السجلات لخادم: <code>logging 10.1.1.5</code><br>
                مزامنة الوقت من الخادم: <code>ntp server 10.1.1.5</code></p>`,
                challengeText: "قم بإعداد الـ Syslog ليرسل لـ 10.1.1.5، والـ NTP للمزامنة من 10.1.1.5.",
                validate: function(state) {
                    return state.syslog === "10.1.1.5" && state.ntp === "10.1.1.5";
                }
            },
            {
                id: "lab30",
                title: "Lab 30: حماية الطبقة الثانية (DHCP Snooping & ARP Inspection)",
                theory: `<h2>إحباط هجمات الهاكر الداخلية (LAN Security)</h2>
                <p>لو أوصل الهاكر خادم DHCP وهمي لتسريب بيانات الموظفين (MitM)، نوقفه بـ DHCP Snooping لتمييز المنافذ الموثوقة.</p>
                <p><strong>الأوامر (في الـ Switch):</strong><br>
                تفعيله عالمياً: <code>ip dhcp snooping</code><br>
                تفعيله لـ VLAN 10 فقط: <code>ip dhcp snooping vlan 10</code><br>
                منع تزييف الـ MAC: <code>ip arp inspection vlan 10</code><br>
                المصادقة (Trust) لمنفذ الراوتر الحقيقي (f0/1):<br>
                <code>interface f0/1</code><br>
                <code>ip dhcp snooping trust</code><br>
                <code>ip arp inspection trust</code></p>`,
                challengeText: "فعل Snooping عالمياً ولـ VLAN 10، وفعل ARP inspection لـ 10، ثم اجعل f0/1 موثوقاً (Trust) لكليهما.",
                validate: function(state) {
                    let global = state.dhcpSnoopingEnabled === true && state.dhcpSnoopingVlan === "10" && state.arpInspectionVlan === "10";
                    let intf = state.interfaces && state.interfaces["f0/1"];
                    let trusted = intf && intf.dhcpTrust === true && intf.arpTrust === true;
                    return global && trusted;
                }
            }
        ]
    },
    {
        phase: "الدفعة الرابعة: Advanced Protocols & Cybersecurity Bridge",
        levels: [
            {
                id: "lab31",
                title: "Lab 31: خطأ في التوجيه (Troubleshooting OSPF)",
                theory: `<h2>اكتشاف الأخطاء (Troubleshooting)</h2>
                <p>في الحياة العملية، لن تبني شبكات من الصفر دائماً، بل ستصلح أخطاء الآخرين. الراوترات هنا لا تتواصل بسبب خطأ في تكوين الـ OSPF.</p>
                <p><strong>التحدي:</strong><br>
                يوجد OSPF 1 قديم يمنع الاتصال. احذفه بأمر <code>no router ospf 1</code>.<br>
                ثم قم بإنشائه بشكل صحيح: <code>router ospf 10</code> ثم <code>network 10.0.0.0 0.255.255.255 area 0</code>.</p>`,
                challengeText: "احذف OSPF 1، وأنشئ OSPF 10 لشبكة 10.0.0.0 (Wildcard: 0.255.255.255) في Area 0.",
                validate: function(state) {
                    let oldDeleted = state.ospf && state.ospf.pid !== "1";
                    let newCreated = state.ospf && state.ospf.pid === "10" && state.ospf.networks.some(n => n.net === "10.0.0.0" && n.area === "0");
                    return oldDeleted && newCreated;
                }
            },
            {
                id: "lab32",
                title: "Lab 32: إصلاح قائمة التحكم (ACL Misconfiguration)",
                theory: `<h2>عندما يمنع الأمان العمل!</h2>
                <p>تذكر دائماً أن هناك <strong>Implicit Deny</strong> مخفية في نهاية أي قائمة تحكم. القائمة الحالية رقم 100 تمنع كل شيء عن طريق الخطأ.</p>
                <p><strong>التحدي:</strong><br>
                احذف القائمة الخاطئة: <code>no access-list 100</code><br>
                أعد كتابتها للسماح بمرور الـ Web فقط: <code>access-list 100 permit tcp any any eq 80</code>.</p>`,
                challengeText: "احذف القائمة 100 القديمة، وأنشئ 100 جديدة تسمح بـ tcp من أي لأي بالبورت 80.",
                validate: function(state) {
                    let acl = state.acls && state.acls["100"];
                    return acl && acl.some(r => r.action === "permit" && r.target === "tcp any any eq 80");
                }
            },
            {
                id: "lab33",
                title: "Lab 33: أتمتة الشبكات (Automation & RESTCONF)",
                isLinux: true,
                theory: `<h2>المستقبل: الشبكات المبرمجة</h2>
                <p>في CCNA 200-301، يجب أن تفهم أن الراوترات الحديثة تملك واجهات API المبرمجة (RESTCONF). بدلاً من Telnet والـ CLI، نستخرج البيانات بصيغة JSON!</p>
                <p><strong>وضع الـ Linux (Pentester / DevOps):</strong><br>
                استخدم أداة <code>curl</code> لإرسال طلب HTTP GET للراوتر.</p>`,
                challengeText: "في شاشة اللينكس، استخدم الأمر curl لجلب البيانات.",
                validate: function(state) {
                    return state.lastCurl && state.lastCurl.includes("curl");
                }
            },
            {
                id: "lab34",
                title: "Lab 34: ☠️ الاستطلاع العميق (Nmap Deep Scan)",
                isLinux: true,
                theory: `<h2>جسر الأمن السيبراني (Red Team)</h2>
                <p>الآن أنت المخترق. قبل أي هجوم، يجب أن تعرف بالضبط منافذ السيرفر وإصداراتها. فحص Nmap السريع غير كافٍ.</p>
                <p><strong>الأمر:</strong><br>
                سنستخدم فحص الـ Versioning (V):<br>
                <code>nmap -sV 192.168.1.1</code></p>`,
                challengeText: "اكتب nmap -sV 192.168.1.1 لمعرفة إصدار الخدمات المفتوحة.",
                validate: function(state) {
                    return state.lastNmap && state.lastNmap.includes("nmap -sV 192.168.1.1");
                }
            },
            {
                id: "lab35",
                title: "Lab 35: ☠️ كسر كلمات المرور (Hydra Brute-Force)",
                isLinux: true,
                theory: `<h2>اكتشافنا خدمة SSH!</h2>
                <p>بفضل Nmap، عرفنا أن بورت 22 (SSH) مفتوح على راوتر الشركة. سنقوم بتخمين الباسورد (Brute Force) باستخدام أداة THC Hydra.</p>
                <p><strong>الأمر:</strong><br>
                <code>hydra -l admin -P passwords.txt ssh://192.168.1.1</code></p>`,
                challengeText: "استخدم hydra لكسر كلمة سر اليوزر admin للخدمة ssh://192.168.1.1.",
                validate: function(state) {
                    return state.lastHydra && state.lastHydra.includes("hydra -l admin");
                }
            },
            {
                id: "lab36",
                title: "Lab 36: ☠️ الدخول الفعلي وتخطي الحماية (Access)",
                isLinux: true,
                theory: `<h2>الباسورد هو "cisco"!</h2>
                <p>الآن بعد أن نجح هيدرا بكشف كلمة السر (cisco)، سنقوم بتسجيل الدخول الفعلي للراوتر باستخدام الـ SSH من جهاز الـ Linux.</p>
                <p><strong>الأمر:</strong><br>
                <code>ssh admin@192.168.1.1</code></p>`,
                challengeText: "اتصل بالراوتر عن طريق ssh admin@192.168.1.1",
                validate: function(state) {
                    return state.lastSsh && state.lastSsh.includes("ssh admin@192.168.1.1");
                }
            },
            {
                id: "lab37",
                title: "Lab 37: ☠️ هجوم حجب الخدمة (Network DoS)",
                isLinux: true,
                theory: `<h2>إسقاط الشبكة! (SYN Flood)</h2>
                <p>في حال فشل الاختراق، الهكر يلجأ لتعطيل الخدمة وإسقاط السيرفر (Denial of Service) عن طريق إغراقه بآلاف الحزم المزيفة.</p>
                <p><strong>الأمر (أداة hping3):</strong><br>
                <code>hping3 --flood 192.168.1.1</code></p>`,
                challengeText: "نفذ الهجوم hping3 --flood 192.168.1.1 لإغراق الراوتر.",
                validate: function(state) {
                    return state.lastHping && state.lastHping.includes("hping3 --flood");
                }
            },
            {
                id: "lab38",
                title: "Lab 38: 🛡️ الاستجابة للحوادث (Blue Team: Mitigation)",
                theory: `<h2>ارتداء قبعة المدافع!</h2>
                <p>الشركة تتعرض لهجوم DoS! الـ IP الخاص بالهاكر هو 10.0.0.66. ادخل سريعاً لإعداد الراوتر لإيقافه في الطبقة الثالثة.</p>
                <p><strong>التحدي:</strong><br>
                1- أنشئ Standard ACL رقم 10 لمنعه: <code>access-list 10 deny 10.0.0.66</code><br>
                2- اسمح للبقية: <code>access-list 10 permit any</code><br>
                3- ادخل لـ <code>interface f0/0</code> وطبقها للدخول: <code>ip access-group 10 in</code>.</p>`,
                challengeText: "احظر 10.0.0.66، واسمح للبقية باستخدام ACL 10 وطبقها in على f0/0.",
                validate: function(state) {
                    let acl = state.acls && state.acls["10"];
                    let hasDeny = acl && acl.some(r => r.action === "deny" && r.target === "10.0.0.66");
                    let hasPermit = acl && acl.some(r => r.action === "permit" && r.target === "any");
                    let intf = state.interfaces && state.interfaces["f0/0"];
                    let applied = intf && intf.accessGroup && intf.accessGroup.acl === "10" && intf.accessGroup.direction === "in";
                    return hasDeny && hasPermit && applied;
                }
            },
            {
                id: "lab39",
                title: "Lab 39: 🛡️ تأمين الإدارة (Control Plane Policing)",
                theory: `<h2>منع الدخول المستقبلي للوحة التحكم</h2>
                <p>الهاكر استخدم هيدرا للوصول للـ SSH لأن بورت 22 مفتوح للجميع. الصح هندسياً أن يقتصر فتحه على الـ IP الخاص بمدير الشبكة فقط (192.168.1.5).</p>
                <p><strong>التحدي:</strong><br>
                أنشئ <code>access-list 5 permit 192.168.1.5</code><br>
                ادخل لـ <code>line vty 0 4</code><br>
                طبق القائمة لحماية الوصول باستخدام <code>access-class 5 in</code>.</p>`,
                challengeText: "أنشئ ACL 5 تسمح لـ 192.168.1.5، وطبقها على خطوط vty باستخدام access-class 5 in.",
                validate: function(state) {
                    let acl = state.acls && state.acls["5"] && state.acls["5"].some(r => r.action === "permit" && r.target === "192.168.1.5");
                    let applied = state.lineVty && state.lineVty.accessClass && state.lineVty.accessClass.acl === "5";
                    return acl && applied;
                }
            },
            {
                id: "lab40",
                title: "Lab 40: 🛡️ الزعيم النهائي (The Ultimate Fix)",
                theory: `<h2>الإنقاذ الشامل للشركة!</h2>
                <p>هذا هو الاختبار النهائي لمكتسباتك! الشركة مهلهلة أمنياً من الطبقة الثانية. يجب عليك إغلاق البورت المتبقي للهاكر، وإيقاف VLAN Hopping، وتأمين البورتات.</p>
                <p><strong>التحدي المزدوج:</strong><br>
                1- ادخل لـ <code>interface f0/10</code>، وأغلقه نهائياً بـ <code>shutdown</code>.<br>
                2- ادخل لـ <code>interface g0/1</code>، وغير الـ Native VLAN لـ 99 لمنع الـ Double Tagging.<br>
                3- في نفس المنفذ g0/1، حدد أنه <code>switchport mode trunk</code> للتأكيد.</p>`,
                challengeText: "أغلق f0/10. وفي g0/1 اجعله trunk وغير الـ native vlan إلى 99.",
                validate: function(state) {
                    let f10 = state.interfaces && state.interfaces["f0/10"] && state.interfaces["f0/10"].shutdown === true;
                    let g1 = state.interfaces && state.interfaces["g0/1"];
                    let g1Ok = g1 && g1.mode === "trunk" && g1.nativeVlan === "99";
                    return f10 && g1Ok;
                }
            }
        ]
    }
];
