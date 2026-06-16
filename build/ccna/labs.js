// CCNA Labs Curriculum (Expanded to 100% Coverage with Explicit Solutions)

window.ccnaCurriculum = [
    {
        phase: "Domain 1: Network Fundamentals",
        levels: [
            {
                title: "1. Device Initialization",
                theory: "<h3>شرح تهيئة الراوتر</h3><p>قبل استخدام الراوتر في بيئة الإنتاج، من الضروري إعطاؤه اسماً مميزاً (Hostname) للتعرف عليه داخل الشبكة، خاصة عند إدارة أكثر من جهاز.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>enable</code>: للدخول لوضع الـ Privileged EXEC.</li><li><code>configure terminal</code>: للدخول لوضع الإعدادات العامة.</li><li><code>hostname [name]</code>: لتغيير اسم الجهاز.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>hostname R1</code></div>",
                challengeText: "قم بتغيير اسم الراوتر إلى R1.",
                validate: function(state) { return state.hostname === 'R1'; }
            },
            {
                title: "2. Setting Passwords",
                theory: "<h3>حماية الراوتر بكلمات مرور</h3><p>حماية جهاز التوجيه (الراوتر) هي الخطوة الأولى في أمن الشبكات. نستخدم الأمر <code>enable secret</code> لتعيين كلمة مرور مشفرة تحمي الوصول إلى وضع الامتيازات.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>enable secret [password]</code>: لتعيين كلمة المرور المشفرة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>enable secret cisco</code></div>",
                challengeText: "قم بتعيين كلمة مرور مشفرة (Secret) للراوتر واجعلها 'cisco'.",
                validate: function(state) { return state.enableSecret === 'cisco'; }
            },
            {
                title: "3. Interface Configuration",
                theory: "<h3>تشغيل منافذ الراوتر</h3><p>على عكس السويتش، تكون منافذ الراوتر مغلقة افتراضياً لأسباب أمنية. لتشغيل منفذ، يجب الدخول إلى وضع إعداد المنفذ وتعيين عنوان IP وقناع الشبكة، ثم فتح المنفذ.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [type] [number]</code>: للدخول إلى المنفذ.</li><li><code>ip address [IP] [Subnet Mask]</code>: لتعيين العنوان.</li><li><code>no shutdown</code>: لتشغيل المنفذ.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/0<br>ip address 192.168.1.1 255.255.255.0<br>no shutdown</code></div>",
                challengeText: "ادخل على المنفذ fa0/0، قم بتعيين الـ IP إلى 192.168.1.1 255.255.255.0، ثم قم بتشغيله.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/0'] && 
                           state.interfaces['fa0/0'].ip === '192.168.1.1' && 
                           state.interfaces['fa0/0'].shutdown === false;
                }
            },
            {
                title: "4. IPv6 Configuration",
                theory: "<h3>إعدادات IPv6 الأساسية</h3><p>الإصدار السادس من بروتوكول الإنترنت لا يحتاج לـ Subnet Mask بصيغته القديمة، بل نستخدم הـ Prefix (مثل /64). ولا تنسَ تفعيل توجيه הـ IPv6 عالمياً.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ipv6 unicast-routing</code>: لتفعيل توجيه IPv6 في الراوتر.</li><li><code>ipv6 address [IP/Prefix]</code>: لإعطاء المنفذ عنوان IPv6.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ipv6 unicast-routing<br>interface fa0/0<br>ipv6 address 2001:db8::1/64<br>no shutdown</code></div>",
                challengeText: "فعل توجيه IPv6 في الراوتر، ثم ادخل للمنفذ fa0/0 وامنحه الـ IP التالي: 2001:db8::1/64، وقم بتشغيله.",
                validate: function(state) {
                    return state.ipv6Routing === true && 
                           state.interfaces && state.interfaces['fa0/0'] && 
                           state.interfaces['fa0/0'].ipv6 === '2001:db8::1/64' &&
                           state.interfaces['fa0/0'].shutdown === false;
                }
            }
        ]
    },
    {
        phase: "Domain 2: Switching",
        levels: [
            {
                title: "1. Basic VLAN Configuration",
                theory: "<h3>إنشاء הـ VLANs (الشبكات الوهمية)</h3><p>الـ VLANs تستخدم لتقسيم السويتش الواحد برمجياً إلى عدة سويتشات منفصلة، مما يقلل من حجم الـ Broadcast ويحسن الأمان.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>vlan [number]</code>: لإنشاء الشبكة الوهمية.</li><li><code>name [vlan_name]</code>: لإعطائها اسماً وصفياً.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>vlan 10<br>name HR<br>exit<br>vlan 20<br>name IT<br>exit</code></div>",
                challengeText: "قم بإنشاء VLAN 10 وسمها HR، ثم قم بإنشاء VLAN 20 وسمها IT.",
                validate: function(state) {
                    return state.vlans && state.vlans['10'] === 'HR' && state.vlans['20'] === 'IT';
                }
            },
            {
                title: "2. Access Ports",
                theory: "<h3>تعيين المنافذ للـ VLAN (Access Ports)</h3><p>المنافذ التي توصل بأجهزة الكمبيوتر الطرفية تُسمى Access Ports، وهي تنتمي לـ VLAN واحدة فقط.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [type] [number]</code>: لاختيار المنفذ.</li><li><code>switchport mode access</code>: لتحويل المنفذ ليعمل كـ Access.</li><li><code>switchport access vlan [number]</code>: لربطه بالـ VLAN.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/1<br>switchport mode access<br>switchport access vlan 10</code></div>",
                challengeText: "قم بتعيين المنفذ fa0/1 ليكون Access في VLAN 10.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/1'] && 
                           state.interfaces['fa0/1'].mode === 'access' && 
                           state.interfaces['fa0/1'].vlan === '10';
                }
            },
            {
                title: "3. Trunk Ports",
                theory: "<h3>إعداد הـ Trunk</h3><p>منافذ الـ Trunk تُستخدم للربط بين سويتشين، وتسمح بمرور بيانات من عدة VLANs مختلفة عبر كابل واحد.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>switchport mode trunk</code>: لتحويل المنفذ ليعمل كـ Trunk.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface gi0/1<br>switchport mode trunk</code></div>",
                challengeText: "ادخل على المنفذ gi0/1 وحوله إلى وضع الـ Trunk.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['gi0/1'] && 
                           state.interfaces['gi0/1'].mode === 'trunk';
                }
            },
            {
                title: "4. EtherChannel (LACP)",
                theory: "<h3>دمج الوصلات (EtherChannel)</h3><p>تُستخدم التقنية لدمج عدة كابلات فيزيائية في كابل منطقي واحد (Port-Channel) لزيادة السرعة وتوفير الـ Redundancy. بروتوكول LACP هو المعيار المفتوح.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>channel-group [Number] mode [active]</code>: لربط المنفذ בـ EtherChannel عبر بروتوكول LACP.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/1<br>channel-group 1 mode active<br>exit<br>interface fa0/2<br>channel-group 1 mode active</code></div>",
                challengeText: "قم بدمج المنفذين fa0/1 و fa0/2 في Channel-Group رقم 1 باستخدام بروتوكول LACP في وضع الـ active.",
                validate: function(state) {
                    return state.interfaces && 
                           state.interfaces['fa0/1'] && state.interfaces['fa0/1'].channelGroup === '1' && state.interfaces['fa0/1'].channelGroupMode === 'active' &&
                           state.interfaces['fa0/2'] && state.interfaces['fa0/2'].channelGroup === '1' && state.interfaces['fa0/2'].channelGroupMode === 'active';
                }
            }
        ]
    },
    {
        phase: "Domain 3: Routing",
        levels: [
            {
                title: "1. Static Route",
                theory: "<h3>التوجيه اليدوي (Static Routing)</h3><p>التوجيه اليدوي هو إخبار الراوتر بكيفية الوصول إلى شبكة غير متصلة به مباشرة.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip route [Network] [Mask] [Next-Hop]</code>: لإضافة المسار.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip route 10.1.1.0 255.255.255.0 192.168.1.2</code></div>",
                challengeText: "قم بإضافة Static Route لشبكة 10.1.1.0/24 للوصول إليها عبر 192.168.1.2.",
                validate: function(state) {
                    return state.routes && state.routes['10.1.1.0/24'] === '192.168.1.2';
                }
            },
            {
                title: "2. Default Route",
                theory: "<h3>مسار الملاذ الأخير (Default Route)</h3><p>المسار الافتراضي يوجه أي شبكة مجهولة (زي الإنترنت) إلى مسار معين بدلاً من التخلص من البيانات.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip route 0.0.0.0 0.0.0.0 [Next-Hop]</code>: يمثل عنوان الأصفار أي شبكة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip route 0.0.0.0 0.0.0.0 200.1.1.1</code></div>",
                challengeText: "أضف مساراً افتراضياً (Default Route) يشير إلى 200.1.1.1.",
                validate: function(state) {
                    return state.routes && state.routes['0.0.0.0/0'] === '200.1.1.1';
                }
            },
            {
                title: "3. Single-Area OSPF",
                theory: "<h3>تفعيل بروتوكول OSPF</h3><p>الـ OSPF هو بروتوكول توجيه ديناميكي يشارك مسارات الشبكات آلياً.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>router ospf [ID]</code>: لبدء العملية.</li><li><code>network [IP] [Wildcard] area [Area]</code>: للإعلان عن الشبكة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>router ospf 1<br>network 192.168.1.0 0.0.0.255 area 0</code></div>",
                challengeText: "قم بتفعيل OSPF رقم 1، وأضف شبكة 192.168.1.0 بـ wildcard 0.0.0.255 في Area 0.",
                validate: function(state) {
                    return state.ospf && state.ospf.process === '1' && 
                           state.ospf.networks.some(n => n.net === '192.168.1.0' && n.area === '0');
                }
            },
            {
                title: "4. Inter-VLAN Routing (ROAS)",
                theory: "<h3>الراوتر على عصا (Router on a Stick)</h3><p>تستخدم لربط الـ VLANs المختلفة ببعضها باستخدام راوتر متصل بكابل Trunk واحد، مقسماً إلى منافذ فرعية (Subinterfaces).</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [Type].[VLAN]</code>: لإنشاء منفذ فرعي.</li><li><code>encapsulation dot1Q [VLAN]</code>: لتحديد الـ VLAN المربوطة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/0.10<br>encapsulation dot1q 10<br>ip address 192.168.10.1 255.255.255.0</code></div>",
                challengeText: "أنشئ منفذ فرعي fa0/0.10 واربطه بـ VLAN 10 عبر dot1Q، وأعطه IP 192.168.10.1 255.255.255.0",
                validate: function(state) {
                    let intf = state.interfaces && state.interfaces['fa0/0.10'];
                    return intf && intf.encapsulation === 'dot1Q' && intf.encapsulationVlan === '10' && intf.ip === '192.168.10.1';
                }
            }
        ]
    },
    {
        phase: "Domain 4: IP Services",
        levels: [
            {
                title: "1. DHCP Pool Configuration",
                theory: "<h3>تهيئة خادم DHCP</h3><p>بروتوكول DHCP يُوزع الـ IPs تلقائياً على الأجهزة بدلاً من إدخالها يدوياً.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip dhcp pool [Name]</code>: لإنشاء الحوض.</li><li><code>network [IP] [Mask]</code>: نطاق العناوين.</li><li><code>default-router [IP]</code>: عنوان الـ Gateway.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip dhcp pool LAN<br>network 192.168.1.0 255.255.255.0<br>default-router 192.168.1.1</code></div>",
                challengeText: "قم بإنشاء DHCP Pool باسم 'LAN', وحدد الشبكة 192.168.1.0/24، والـ default-router 192.168.1.1.",
                validate: function(state) {
                    let pool = state.dhcp && state.dhcp.pools && state.dhcp.pools['LAN'];
                    return pool && pool.network === '192.168.1.0 255.255.255.0' && pool.defaultRouter === '192.168.1.1';
                }
            },
            {
                title: "2. Static NAT",
                theory: "<h3>ترجمة العناوين الثابتة (Static NAT)</h3><p>الـ Static NAT يربط IP داخلي بـ IP خارجي بشكل ثابت، يستخدم غالباً لتشغيل السيرفرات على الإنترنت.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip nat inside source static [Local] [Global]</code>: لإنشاء الترجمة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip nat inside source static 192.168.1.50 200.1.1.50</code></div>",
                challengeText: "قم بعمل Static NAT يربط الـ IP الداخلي 192.168.1.50 بالـ IP الخارجي 200.1.1.50.",
                validate: function(state) {
                    return state.nat && state.nat.static && state.nat.static['192.168.1.50'] === '200.1.1.50';
                }
            },
            {
                title: "3. NAT Overload (PAT)",
                theory: "<h3>ترجمة عناوين المنافذ (PAT)</h3><p>يسمح للشبكة الداخلية بالكامل بالوصول للإنترنت باستخدام IP عام (Public IP) واحد فقط عن طريق التمييز بأرقام المنافذ.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip nat inside source list [ACL] interface [Interface] overload</code>: لربط شبكة بـ IP المنفذ الخارجي.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>access-list 1 permit 192.168.1.0 0.0.0.255<br>ip nat inside source list 1 interface gi0/0 overload</code></div>",
                challengeText: "استخدم ACL رقم 1 للسماح للشبكة 192.168.1.0 0.0.0.255، ثم قم بتفعيل PAT (Overload) ليخرجوا عبر المنفذ gi0/0.",
                validate: function(state) {
                    let hasAcl = state.acls && state.acls['1'] && state.acls['1'].some(a => a.target === '192.168.1.0');
                    let hasPat = state.nat && state.nat.some(n => n.type === 'overload' && n.list === '1' && n.poolOrIf === 'gi0/0');
                    return hasAcl && hasPat;
                }
            }
        ]
    },
    {
        phase: "Domain 5: Security",
        levels: [
            {
                title: "1. Standard ACL",
                theory: "<h3>قوائم التحكم بالوصول (Standard ACL)</h3><p>الـ Standard ACL تقوم بالفلترة بناءً على الـ Source IP وتستخدم لعمل Block أو Allow لشبكة معينة.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>access-list [ID] permit/deny [IP] [Wildcard]</code>: لإنشاء القاعدة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>access-list 10 deny 192.168.2.0 0.0.0.255<br>access-list 10 permit any</code></div>",
                challengeText: "قم بإنشاء ACL رقم 10 لعمل deny لـ 192.168.2.0 0.0.0.255، ثم permit any.",
                validate: function(state) {
                    return state.acls && state.acls['10'] && 
                           state.acls['10'].includes('deny 192.168.2.0 0.0.0.255') &&
                           state.acls['10'].includes('permit any');
                }
            },
            {
                title: "2. Port Security",
                theory: "<h3>أمان المنافذ (Port Security)</h3><p>ميزة تحمي منفذ السويتش من الهجمات وتحديد عدد معين للأجهزة المسموح بتوصيلها.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>switchport port-security</code>: للتفعيل.</li><li><code>switchport port-security maximum [Num]</code>: تحديد الحد الأقصى.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/1<br>switchport port-security<br>switchport port-security maximum 2</code></div>",
                challengeText: "ادخل للمنفذ fa0/1، فعّل port-security، واجعل الحد الأقصى للأجهزة (maximum) هو 2.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/1'] && 
                           state.interfaces['fa0/1'].portSecurity === true &&
                           state.interfaces['fa0/1'].portSecurityMax === '2';
                }
            },
            {
                title: "3. Extended ACL",
                theory: "<h3>قوائم التحكم الممتدة (Extended ACL)</h3><p>تتيح تحكماً دقيقاً، حيث يمكنها حجب بروتوكول معين (مثل الويب TCP 80) بين أجهزة محددة بدلاً من حجب كل شيء. تبدأ أرقامها من 100.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>access-list 100 permit tcp any any eq 80</code>: للسماح بتصفح الويب فقط.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>access-list 100 permit tcp any any eq 80</code></div>",
                challengeText: "قم بإنشاء Extended ACL رقم 100 لعمل السماح (permit) لبروتوكول الـ tcp لأي مصدر وأي وجهة לבورت 80.",
                validate: function(state) {
                    return state.acls && state.acls['100'] && state.acls['100'].some(a => a.action === 'permit' && a.target === 'tcp' && a.wildcard === 'any');
                }
            },
            {
                title: "4. SSH Configuration",
                theory: "<h3>الدخول الآمن (SSH)</h3><p>الـ Telnet يرسل الباسوردات بنص واضح، بينما الـ SSH يشفرها. لإعداد SSH تحتاج لاسم دومين ومفاتيح تشفير ومستخدم محلي.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip domain-name [Name]</code> و <code>crypto key generate rsa</code>: لتوليد مفاتيح التشفير.</li><li><code>transport input ssh</code>: لإجبار الـ vty على استخدام SSH فقط.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip domain-name ccna.com<br>crypto key generate rsa<br>username admin<br>line vty 0 4<br>login local<br>transport input ssh</code></div>",
                challengeText: "قم بإعداد الـ SSH: الدومين ccna.com، أنشئ مفاتيح التشفير، المستخدم admin، وادخل على خطوط vty لتفعيل الـ login local والـ transport input ssh.",
                validate: function(state) {
                    return state.domainName === 'ccna.com' && state.cryptoKey === true && 
                           state.users && state.users['admin'] && 
                           state.lineVty && state.lineVty.loginLocal === true && state.lineVty.ssh === true;
                }
            }
        ]
    },
    {
        phase: "Domain 6: Troubleshooting & Management",
        levels: [
            {
                title: "1. Interface is Down",
                theory: "<h3>استكشاف الأخطاء: Interface is Down</h3><p>عندما تجد أن المنفذ Administratively Down فهذا يعني أنه مغلق يدوياً ويجب إعادة تشغيله.</p><h4>كيفية الحل:</h4><p>ادخل لإعدادات المنفذ واكتب <code>no shutdown</code>.</p><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>interface fa0/0<br>no shutdown</code></div>",
                challengeText: "اكتشف لماذا المنفذ fa0/0 لا يعمل، وقم بإصلاحه.",
                initialState: {
                    interfaces: {
                        'fa0/0': { shutdown: true, ip: '192.168.1.1', mask: '255.255.255.0' }
                    }
                },
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/0'] && state.interfaces['fa0/0'].shutdown === false;
                }
            },
            {
                title: "2. Missing Gateway in DHCP",
                theory: "<h3>استكشاف الأخطاء: مشكلة الـ DHCP</h3><p>الأجهزة تستلم عناوين IP، لكن لا يوجد تواصل خارجي لأن הـ DHCP Pool يفتقد لعنوان הـ Gateway (default-router).</p><h4>كيفية الحل:</h4><p>يجب الدخول لـ Pool الـ DHCP وإضافة הـ Gateway.</p><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>ip dhcp pool USERS<br>default-router 10.1.1.1</code></div>",
                challengeText: "أصلح الـ DHCP Pool المسمى 'USERS' بإضافة الـ default-router 10.1.1.1.",
                initialState: {
                    dhcp: { pools: { 'USERS': { network: '10.1.1.0 255.255.255.0' } } }
                },
                validate: function(state) {
                    let p = state.dhcp && state.dhcp.pools && state.dhcp.pools['USERS'];
                    return p && p.defaultRouter === '10.1.1.1';
                }
            },
            {
                title: "3. Device Discovery (CDP)",
                theory: "<h3>بروتوكول الاستكشاف (CDP)</h3><p>بروتوكول سيسكو للاستكشاف (CDP) يسمح لك برؤية الأجهزة المجاورة المتصلة مباشرة بالراوتر، وهو مفيد جداً لرسم خريطة الشبكة واكتشاف الأخطاء.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>cdp run</code>: لتفعيله عالمياً.</li><li><code>show cdp neighbors</code>: لرؤية الأجهزة المجاورة.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>cdp run<br>exit<br>show cdp neighbors</code></div>",
                challengeText: "قم بتفعيل بروتوكول CDP عالمياً على الراوتر، ثم ارجع للوضع العادي واعرض جيران الـ CDP لاكتشافهم.",
                validate: function(state) {
                    return state.cdpGlobal === true && state.lastShow === 'show cdp neighbors';
                }
            }
        ]
    },
    {
        phase: "Domain 7: Final Assessment",
        levels: [
            {
                title: "1. The CCNA Boss Fight",
                theory: "<h3>التحدي النهائي (Boss Fight)</h3><p>هذا التحدي يدمج ما تعلمته: تغيير الاسم، إعداد VLAN، عمل توجيه افتراضي، وتشغيل OSPF.</p><h4>المطلوب:</h4><ul><li>الاسم: CORE</li><li>VLAN: 100</li><li>مسار إنترنت: 8.8.8.8</li><li>OSPF للشبكة الداخلية.</li></ul><div style=\"background:#1a1a1a; border-right:4px solid #4CAF50; padding:10px; margin-top:15px; border-radius:5px;\"><b style=\"color:#4CAF50;\">💡 طريقة الحل الشاملة (اكتب هذه الأوامر):</b><br><code style=\"color:#ddd; display:block; margin-top:8px;\">enable<br>configure terminal<br>hostname CORE<br>vlan 100<br>exit<br>ip route 0.0.0.0 0.0.0.0 8.8.8.8<br>router ospf 1<br>network 10.0.0.0 0.255.255.255 area 0</code></div>",
                challengeText: "1. سمِّ الراوتر CORE<br>2. أنشئ VLAN 100<br>3. أضف مسار Default Route لـ 8.8.8.8<br>4. فعّل OSPF 1 لشبكة 10.0.0.0",
                validate: function(state) {
                    let hasHostname = state.hostname === 'CORE';
                    let hasVlan = state.vlans && state.vlans['100'] !== undefined;
                    let hasRoute = state.routes && state.routes['0.0.0.0/0'] === '8.8.8.8';
                    let hasOspf = state.ospf && state.ospf.process === '1' && state.ospf.networks.some(n => n.net === '10.0.0.0');
                    return hasHostname && hasVlan && hasRoute && hasOspf;
                }
            }
        ]
    }
];
