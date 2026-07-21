import os

labs_file = r'D:\abdo_portfolio\build\ccna\labs.js'

labs_content = """// CCNA Labs Curriculum (Expanded)

window.ccnaCurriculum = [
    {
        phase: "Domain 1: Network Fundamentals",
        levels: [
            {
                title: "1. Device Initialization",
                theory: "<h3>شرح تهيئة الراوتر</h3><p>قبل استخدام الراوتر في بيئة العمل، يجب أن نميزه باسم فريد باستخدام أمر <code>hostname</code>.</p>",
                challengeText: "قم بتغيير اسم الراوتر إلى R1.",
                validate: function(state) { return state.hostname === 'R1'; }
            },
            {
                title: "2. Setting Passwords",
                theory: "<h3>حماية الراوتر بكلمات مرور</h3><p>الراوتر هو عصب الشبكة. يجب حماية وضع الـ Privileged EXEC باستخدام <code>enable secret</code>.</p>",
                challengeText: "قم بتعيين كلمة مرور مشفرة (Secret) للراوتر واجعلها 'cisco'.",
                validate: function(state) { return state.enableSecret === 'cisco'; }
            },
            {
                title: "3. Interface Configuration",
                theory: "<h3>تشغيل منافذ الراوتر</h3><p>منافذ الراوتر تكون مغلقة افتراضياً (Administratively Down). يجب الدخول للمنفذ، إعطاؤه IP، وتشغيله بـ <code>no shutdown</code>.</p>",
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
                theory: "<h3>إنشاء הـ VLANs</h3><p>لتقسيم السويتش منطقياً، ننشئ VLAN ونعطيها اسماً لتسهيل الإدارة.</p>",
                challengeText: "قم بإنشاء VLAN 10 وسمها HR، ثم قم بإنشاء VLAN 20 وسمها IT.",
                validate: function(state) {
                    return state.vlans && state.vlans['10'] === 'HR' && state.vlans['20'] === 'IT';
                }
            },
            {
                title: "2. Access Ports",
                theory: "<h3>تعيين المنافذ للـ VLAN</h3><p>لربط كمبيوتر الموظف بالـ VLAN، ندخل على المنفذ ونحوله לـ Access ثم نربطه بالرقم.</p>",
                challengeText: "قم بتعيين المنفذ fa0/1 ليكون Access في VLAN 10.",
                validate: function(state) {
                    return state.interfaces && state.interfaces['fa0/1'] && 
                           state.interfaces['fa0/1'].mode === 'access' && 
                           state.interfaces['fa0/1'].vlan === '10';
                }
            },
            {
                title: "3. Trunk Ports",
                theory: "<h3>إعداد הـ Trunk</h3><p>المسار بين סويتشين يحتاج إلى أن يكون Trunk لكي يعبر من خلاله ביانات كل הـ VLANs.</p>",
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
                theory: "<h3>التوجيه اليدوي</h3><p>يستخدم للوصول لشبكة بعيدة بكتابة المسار يدوياً: <code>ip route [Network] [Mask] [Next-Hop]</code></p>",
                challengeText: "قم بإضافة Static Route لشبكة 10.1.1.0/24 للوصول إليها عبر 192.168.1.2.",
                validate: function(state) {
                    return state.routes && state.routes['10.1.1.0/24'] === '192.168.1.2';
                }
            },
            {
                title: "2. Default Route",
                theory: "<h3>مسار الملاذ الأخير</h3><p>لتوجيه أي بيانات غير معروفة (مثل الإنترنت) نحو مزود الخدمة (ISP).</p>",
                challengeText: "أضف مساراً افتراضياً (Default Route) يشير إلى 200.1.1.1.",
                validate: function(state) {
                    return state.routes && state.routes['0.0.0.0/0'] === '200.1.1.1';
                }
            },
            {
                title: "3. Single-Area OSPF",
                theory: "<h3>تشغيل OSPF</h3><p>بروتوكول OSPF يسمح للراوترات باكتشاف المسارات آلياً.</p>",
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
                theory: "<h3>خادم DHCP</h3><p>توزيع الـ IPs تلقائياً للموظفين من خلال الراوتر.</p>",
                challengeText: "قم بإنشاء DHCP Pool باسم 'LAN', وحدد الشبكة 192.168.1.0/24، والـ default-router 192.168.1.1.",
                validate: function(state) {
                    let pool = state.dhcp && state.dhcp.pools && state.dhcp.pools['LAN'];
                    return pool && pool.network === '192.168.1.0 255.255.255.0' && pool.defaultRouter === '192.168.1.1';
                }
            },
            {
                title: "2. Static NAT",
                theory: "<h3>ترجمة العناوين</h3><p>السماح للإنترنت بالوصول לסيرفر داخلي بـ IP ثابت.</p>",
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
                theory: "<h3>Access Control List</h3><p>منع شبكة بالكامل من الوصول.</p>",
                challengeText: "قم بإنشاء ACL رقم 10 لعمل deny لـ 192.168.2.0 0.0.0.255، ثم permit any.",
                validate: function(state) {
                    return state.acls && state.acls['10'] && 
                           state.acls['10'].includes('deny 192.168.2.0 0.0.0.255') &&
                           state.acls['10'].includes('permit any');
                }
            },
            {
                title: "2. Port Security",
                theory: "<h3>تأمين المنافذ</h3><p>حماية منفذ السويتش من توصيل أجهزة غريبة به.</p>",
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
                theory: "<h3>إصلاح الأعطال 1</h3><p>الراوتر لا يتصل بالشبكة المحلية. المشكلة تتعلق بحالة المنفذ.</p>",
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
                theory: "<h3>إصلاح الأعطال 2</h3><p>الموظفون يحصلون على IP ولكن لا يستطيعون تصفح الإنترنت. هناك إعداد مفقود في الـ DHCP.</p>",
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
                theory: "<h3>التحدي النهائي</h3><p>تطبيق شامل لمعظم المهارات في تحدٍ واحد.</p>",
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
"""

with open(labs_file, 'w', encoding='utf-8') as f:
    f.write(labs_content)

print("labs.js fully expanded!")
