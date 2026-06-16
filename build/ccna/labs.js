// CCNA Labs Curriculum (Expanded to 100% Coverage with Explicit Solutions)

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
