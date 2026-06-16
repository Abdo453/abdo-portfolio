// CCNA Labs Curriculum (Expanded with Detailed Explanations)

window.ccnaCurriculum = [
    {
        phase: "Domain 1: Network Fundamentals",
        levels: [
            {
                title: "1. Device Initialization",
                theory: "<h3>شرح تهيئة الراوتر</h3><p>قبل استخدام الراوتر في بيئة الإنتاج، من الضروري إعطاؤه اسماً مميزاً (Hostname) للتعرف عليه داخل الشبكة، خاصة عند إدارة أكثر من جهاز.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>enable</code>: للدخول لوضع الـ Privileged EXEC.</li><li><code>configure terminal</code>: للدخول لوضع الإعدادات العامة (Global Config).</li><li><code>hostname [name]</code>: لتغيير اسم الجهاز.</li></ul><p><b>تلميح:</b> تأكد من كتابة الاسم المطلوب بدقة كما هو مطلوب في التحدي.</p>",
                challengeText: "قم بتغيير اسم الراوتر إلى R1.",
                validate: function(state) { return state.hostname === 'R1'; }
            },
            {
                title: "2. Setting Passwords",
                theory: "<h3>حماية الراوتر بكلمات مرور</h3><p>حماية جهاز التوجيه (الراوتر) هي الخطوة الأولى في أمن الشبكات. نستخدم الأمر <code>enable secret</code> لتعيين كلمة مرور مشفرة تحمي الوصول إلى وضع الامتيازات (Privileged EXEC).</p><h4>الأوامر المستخدمة:</h4><ul><li><code>enable secret [password]</code>: لتعيين كلمة المرور المشفرة.</li></ul><p><b>ملاحظة:</b> يوجد أمر آخر وهو <code>enable password</code> ولكنه يخزن الكلمة بنص واضح (غير مشفر)، لذا يُفضل دائماً استخدام secret.</p>",
                challengeText: "قم بتعيين كلمة مرور مشفرة (Secret) للراوتر واجعلها 'cisco'.",
                validate: function(state) { return state.enableSecret === 'cisco'; }
            },
            {
                title: "3. Interface Configuration",
                theory: "<h3>تشغيل منافذ الراوتر</h3><p>على عكس السويتش، تكون منافذ الراوتر مغلقة افتراضياً لأسباب أمنية. لتشغيل منفذ، يجب الدخول إلى وضع إعداد المنفذ وتعيين عنوان IP وقناع الشبكة، ثم فتح المنفذ.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [type] [number]</code>: للدخول إلى المنفذ، مثال <code>interface fa0/0</code>.</li><li><code>ip address [IP] [Subnet Mask]</code>: لتعيين العنوان.</li><li><code>no shutdown</code>: لتشغيل المنفذ.</li></ul>",
                challengeText: "ادخل على المنفذ fa0/0، قم بتعيين الـ IP إلى 192.168.1.1 255.255.255.0، ثم قم بتشغيله.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/0'] && 
                           state.interfaces['fa0/0'].ip === '192.168.1.1' && 
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
                theory: "<h3>إنشاء הـ VLANs (الشبكات الوهمية)</h3><p>الـ VLANs تستخدم لتقسيم السويتش الواحد برمجياً إلى عدة سويتشات منفصلة، مما يقلل من حجم الـ Broadcast ويحسن الأمان.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>vlan [number]</code>: لإنشاء الشبكة الوهمية والدخول لإعداداتها.</li><li><code>name [vlan_name]</code>: لإعطائها اسماً وصفياً (اختياري ولكنه مفضل).</li><li><code>exit</code>: للرجوع خطوة للخلف.</li></ul>",
                challengeText: "قم بإنشاء VLAN 10 وسمها HR، ثم قم بإنشاء VLAN 20 وسمها IT.",
                validate: function(state) {
                    return state.vlans && state.vlans['10'] === 'HR' && state.vlans['20'] === 'IT';
                }
            },
            {
                title: "2. Access Ports",
                theory: "<h3>تعيين المنافذ للـ VLAN (Access Ports)</h3><p>المنافذ التي توصل بأجهزة الكمبيوتر الطرفية تُسمى Access Ports، وهي تنتمي לـ VLAN واحدة فقط.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [type] [number]</code>: لاختيار المنفذ.</li><li><code>switchport mode access</code>: لتحويل المنفذ ليعمل كـ Access.</li><li><code>switchport access vlan [number]</code>: لربط المنفذ بالـ VLAN المطلوبة.</li></ul>",
                challengeText: "قم بتعيين المنفذ fa0/1 ليكون Access في VLAN 10.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/1'] && 
                           state.interfaces['fa0/1'].mode === 'access' && 
                           state.interfaces['fa0/1'].vlan === '10';
                }
            },
            {
                title: "3. Trunk Ports",
                theory: "<h3>إعداد הـ Trunk</h3><p>منافذ الـ Trunk تُستخدم للربط بين سويتشين (أو سويتش وراوتر)، وتسمح بمرور بيانات من عدة VLANs مختلفة في نفس الوقت عبر كابل واحد.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>interface [type] [number]</code>: لاختيار المنفذ.</li><li><code>switchport mode trunk</code>: لتحويل المنفذ ليعمل كـ Trunk.</li></ul>",
                challengeText: "ادخل على المنفذ gi0/1 وحوله إلى وضع الـ Trunk.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['gi0/1'] && 
                           state.interfaces['gi0/1'].mode === 'trunk';
                }
            }
        ]
    },
    {
        phase: "Domain 3: Routing",
        levels: [
            {
                title: "1. Static Route",
                theory: "<h3>التوجيه اليدوي (Static Routing)</h3><p>التوجيه اليدوي هو إخبار الراوتر صراحةً بكيفية الوصول إلى شبكة غير متصلة به مباشرة. وهو الخيار الأفضل للشبكات الصغيرة جداً حيث يقلل الحمل على المعالج.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip route [Destination Network] [Subnet Mask] [Next-Hop IP]</code>: لإضافة المسار. الـ Next-Hop هو عنوان الـ IP للراوتر الجار الذي سيستلم البيانات.</li></ul>",
                challengeText: "قم بإضافة Static Route لشبكة 10.1.1.0/24 للوصول إليها عبر 192.168.1.2.",
                validate: function(state) {
                    return state.routes && state.routes['10.1.1.0/24'] === '192.168.1.2';
                }
            },
            {
                title: "2. Default Route",
                theory: "<h3>مسار الملاذ الأخير (Default Route)</h3><p>تخيل أن الراوتر استلم بيانات لشبكة غير موجودة في جدول التوجيه (Routing Table) لديه، الافتراضي أنه سيتخلص منها. المسار الافتراضي يحل هذه المشكلة بتوجيه أي شبكة مجهولة إلى مسار معين (غالباً نحو الإنترنت).</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip route 0.0.0.0 0.0.0.0 [Next-Hop IP]</code>: يمثل عنوان الأصفار أي شبكة مجهولة.</li></ul>",
                challengeText: "أضف مساراً افتراضياً (Default Route) يشير إلى 200.1.1.1.",
                validate: function(state) {
                    return state.routes && state.routes['0.0.0.0/0'] === '200.1.1.1';
                }
            },
            {
                title: "3. Single-Area OSPF",
                theory: "<h3>تفعيل بروتوكول OSPF</h3><p>بروتوكول OSPF هو من بروتوكولات التوجيه الديناميكي (Dynamic Routing)، يسمح للراوترات بمشاركة معلومات الشبكات المتصلة بها أوتوماتيكياً واختيار أسرع مسار.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>router ospf [Process ID]</code>: لبدء تشغيل الـ OSPF برقم عملية (مثل 1).</li><li><code>network [Network IP] [Wildcard Mask] area [Area ID]</code>: للإعلان عن الشبكة وتحديد المنطقة. الـ Wildcard هو عكس الـ Subnet Mask.</li></ul>",
                challengeText: "قم بتفعيل OSPF رقم 1، وأضف شبكة 192.168.1.0 بـ wildcard 0.0.0.255 في Area 0.",
                validate: function(state) {
                    return state.ospf && state.ospf.process === '1' && 
                           state.ospf.networks.some(n => n.net === '192.168.1.0' && n.area === '0');
                }
            }
        ]
    },
    {
        phase: "Domain 4: IP Services",
        levels: [
            {
                title: "1. DHCP Pool Configuration",
                theory: "<h3>تهيئة خادم DHCP</h3><p>بروتوكول DHCP يسهل إدارة عناوين الـ IP عن طريق توزيعها تلقائياً على الأجهزة المتصلة بالشبكة بدلاً من كتابتها يدوياً على كل جهاز.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip dhcp pool [Pool Name]</code>: لإنشاء الحوض.</li><li><code>network [Network IP] [Subnet Mask]</code>: لتحديد نطاق العناوين التي سيتم توزيعها.</li><li><code>default-router [Gateway IP]</code>: لتوزيع عنوان الراوتر كـ Gateway للأجهزة.</li></ul>",
                challengeText: "قم بإنشاء DHCP Pool باسم 'LAN', وحدد الشبكة 192.168.1.0/24، والـ default-router 192.168.1.1.",
                validate: function(state) {
                    let pool = state.dhcp && state.dhcp.pools && state.dhcp.pools['LAN'];
                    return pool && pool.network === '192.168.1.0 255.255.255.0' && pool.defaultRouter === '192.168.1.1';
                }
            },
            {
                title: "2. Static NAT",
                theory: "<h3>ترجمة العناوين الثابتة (Static NAT)</h3><p>تقنية NAT تحول الـ IP الداخلي (الخاص) إلى IP خارجي (عام) ليتمكن من الخروج للإنترنت. الـ Static NAT يربط IP داخلي بـ IP خارجي بشكل ثابت 1-to-1، ويستخدم غالباً للسيرفرات لكي يمكن الوصول إليها من الخارج.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>ip nat inside source static [Local IP] [Global IP]</code>: لإنشاء قاعدة الترجمة.</li></ul>",
                challengeText: "قم بعمل Static NAT يربط الـ IP الداخلي 192.168.1.50 بالـ IP الخارجي 200.1.1.50.",
                validate: function(state) {
                    return state.nat && state.nat.static && state.nat.static['192.168.1.50'] === '200.1.1.50';
                }
            }
        ]
    },
    {
        phase: "Domain 5: Security",
        levels: [
            {
                title: "1. Standard ACL",
                theory: "<h3>قوائم التحكم بالوصول (Standard ACL)</h3><p>الـ ACLs تعمل كحارس أمن (Firewall بدائي) على المنافذ. الـ Standard ACL (أرقام من 1 إلى 99) تقوم بالفلترة بناءً على عنوان المصدر (Source IP) فقط.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>access-list [1-99] permit/deny [Source IP] [Wildcard Mask]</code>: لإنشاء القاعدة.</li><li>تذكر دائماً أن هناك قاعدة خفية في النهاية تمنع كل شيء (Implicit Deny)، لذا تأكد من إضافة <code>permit any</code> إذا كنت تريد السماح للباقي.</li></ul>",
                challengeText: "قم بإنشاء ACL رقم 10 لعمل deny لـ 192.168.2.0 0.0.0.255، ثم permit any.",
                validate: function(state) {
                    return state.acls && state.acls['10'] && 
                           state.acls['10'].includes('deny 192.168.2.0 0.0.0.255') &&
                           state.acls['10'].includes('permit any');
                }
            },
            {
                title: "2. Port Security",
                theory: "<h3>أمان المنافذ (Port Security)</h3><p>تُستخدم هذه الميزة لحماية السويتش من هجمات مثل الـ MAC Flooding، أو لمنع الموظف من توصيل سويتش خارجي صغير أو جهاز غريب في منفذه.</p><h4>الأوامر المستخدمة:</h4><ul><li><code>switchport port-security</code>: لتفعيل الميزة على المنفذ (يجب أن يكون Access أولاً).</li><li><code>switchport port-security maximum [Number]</code>: لتحديد أقصى عدد من عناوين الـ MAC المسموح بها.</li></ul>",
                challengeText: "ادخل للمنفذ fa0/1، فعّل port-security، واجعل الحد الأقصى للأجهزة (maximum) هو 2.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/1'] && 
                           state.interfaces['fa0/1'].portSecurity === true &&
                           state.interfaces['fa0/1'].portSecurityMax === '2';
                }
            }
        ]
    },
    {
        phase: "Domain 6: Troubleshooting",
        levels: [
            {
                title: "1. Interface is Down",
                theory: "<h3>استكشاف الأخطاء: Interface is Down</h3><p>في بيئة العمل، من الشائع جداً أن تجد المنفذ مغلقاً بالخطأ. استخدم أمر <code>show ip interface brief</code> لمشاهدة حالة جميع المنافذ بسرعة. إذا رأيت Administratively Down فهذا يعني أن المنفذ مغلق يدوياً.</p><h4>كيفية الحل:</h4><p>يجب عليك الدخول للمنفذ وتشغيله باستخدام أمر <code>no shutdown</code>.</p>",
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
                theory: "<h3>استكشاف الأخطاء: مشكلة الـ DHCP</h3><p>الأجهزة تستلم عناوين IP، لكنها لا تستطيع التواصل خارج الشبكة المحلية (Ping 8.8.8.8 يفشل). السبب الشائع هو أن خادم הـ DHCP لم يقم بتوزيع عنوان الـ Gateway (وهو عنوان الراوتر).</p><h4>كيفية الحل:</h4><p>ادخل لإعدادات הـ DHCP Pool وأضف مسار <code>default-router</code> الصحيح.</p>",
                challengeText: "أصلح الـ DHCP Pool المسمى 'USERS' بإضافة الـ default-router 10.1.1.1.",
                initialState: {
                    dhcp: { pools: { 'USERS': { network: '10.1.1.0 255.255.255.0' } } }
                },
                validate: function(state) {
                    let p = state.dhcp && state.dhcp.pools && state.dhcp.pools['USERS'];
                    return p && p.defaultRouter === '10.1.1.1';
                }
            }
        ]
    },
    {
        phase: "Domain 7: Final Assessment",
        levels: [
            {
                title: "1. The CCNA Boss Fight",
                theory: "<h3>التحدي النهائي (Boss Fight)</h3><p>هذا التحدي يدمج ما تعلمته في مرحلة الـ Fundamentals والـ Routing والـ Switching.</p><h4>المطلوب:</h4><ul><li>تطبيق مهارات الإعداد الأساسي للراوتر (الاسم).</li><li>إنشاء VLAN على السويتش الوهمي.</li><li>إعداد التوجيه الافتراضي (Default Route) للوصول للإنترنت.</li><li>تشغيل OSPF للربط الداخلي.</li></ul><p><b>تلميح:</b> تذكر الدخول لـ <code>configure terminal</code> أولاً لإنجاز كل هذه الإعدادات.</p>",
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
