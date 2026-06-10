// 140 Labs Structure (20 Fundamentals, 20 Switching, 20 Routing, 20 Services, 20 Security, 20 Troubleshooting, 20 Final Mixed)

window.ccnaCurriculum = [
    {
        phase: "Domain 1: Network Fundamentals",
        levels: [
            {
                title: "1. Device Initialization",
                theory: "<h3>شرح تهيئة الراوتر</h3><p>قبل استخدام الراوتر، يجب إعطاءه اسماً وإعداد بعض الأساسيات.</p>",
                challengeText: "قم بتغيير اسم الراوتر إلى R1.",
                validate: function(state) {
                    return state.hostname === 'R1';
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 2: Switching",
        levels: [
            {
                title: "1. Basic VLAN Configuration",
                theory: "<h3>VLAN Basics</h3><p>قم بإنشاء شبكة وهمية لفصل الموظفين.</p>",
                challengeText: "قم بإنشاء VLAN 10 وسمها HR.",
                validate: function(state) {
                    return state.vlans && state.vlans['10'] === 'HR';
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 3: Routing",
        levels: [
            {
                title: "1. Static Route Configuration",
                theory: "<h3>Static Routing</h3><p>تعلم كيفية توجيه المسار يدوياً.</p>",
                challengeText: "قم بإضافة Static Route لشبكة 192.168.2.0/24 للوصول عبر 10.0.0.2",
                validate: function(state) {
                    return state.routes && state.routes['192.168.2.0/24'] === '10.0.0.2';
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 4: IP Services",
        levels: [
            {
                title: "1. DHCP Pool Configuration",
                theory: "<h3>DHCP Configuration</h3><p>توزيع الـ IPs تلقائياً.</p>",
                challengeText: "قم بإنشاء DHCP Pool باسم 'LAN_POOL'.",
                validate: function(state) {
                    return state.dhcp && state.dhcp.pools && state.dhcp.pools['LAN_POOL'];
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 5: Security",
        levels: [
            {
                title: "1. Standard ACL",
                theory: "<h3>Access Control List</h3><p>منع شبكة من الوصول لأخرى.</p>",
                challengeText: "قم بإنشاء ACL رقم 10 لعمل deny لـ 192.168.1.0 0.0.0.255.",
                validate: function(state) {
                    return state.acls && state.acls['10'] && state.acls['10'].includes('deny 192.168.1.0 0.0.0.255');
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 6: Troubleshooting",
        levels: [
            {
                title: "1. PC Cannot Ping Gateway",
                theory: "<h3>Troubleshooting PC to Gateway</h3><p>هناك مشكلة تمنع الـ PC من الوصول للراوتر. اكتشف المشكلة في واجهة الراوتر.</p>",
                challengeText: "ادخل على الواجهة Fa0/0 واكتشف المشكلة وأصلحها.",
                initialState: {
                    interfaces: {
                        'fa0/0': { shutdown: true, ip: '192.168.1.1', mask: '255.255.255.0' }
                    }
                },
                validate: function(state) {
                    // Start state has Fa0/0 shutdown. Validation is when it's up.
                    return state.interfaces && state.interfaces['fa0/0'] && state.interfaces['fa0/0'].shutdown === false;
                }
            }
            // 19 more labs will be added here
        ]
    },
    {
        phase: "Domain 7: Final Mixed Scenarios",
        levels: [
            {
                title: "1. The Ultimate Router Setup",
                theory: "<h3>Final Assessment</h3><p>تطبيق شامل.</p>",
                challengeText: "قم بتهيئة Hostname، وتفعيل Interface، وإعداد OSPF.",
                validate: function(state) {
                    return state.hostname === 'CORE_R1' && state.ospf && state.ospf.process === '1';
                }
            }
            // 19 more labs will be added here
        ]
    }
];
