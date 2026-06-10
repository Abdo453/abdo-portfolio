/* 
   quizzes.js - Contains the structured quiz data for CCNA Domains
   Levels: easy, medium, hard, scenario, exam, dragdrop, cli
*/
const quizzesData = {

    "access_stp": {
        "easy": [
            {
                q: "ما هو الغرض الرئيسي من بروتوكول STP؟",
                options: ["تشفير הـ Passwords", "منع حلقات الطبقة الثانية (Layer 2 Loops)", "تقسيم الـ VLANs", "توزيع الـ IPs"],
                correct: 1,
                explanation: "الـ STP يكتشف الحلقات ويقوم بإغلاق أحد المسارات (Block) لمنع حدوث عاصفة البث (Broadcast Storm)."
            },
            {
                q: "ما هي قيمة الـ Bridge Priority الافتراضية في الـ STP؟",
                options: ["1", "4096", "32768", "65536"],
                correct: 2,
                explanation: "القيمة الافتراضية للـ Priority في جميع سويتشات سيسكو هي 32768."
            }
        ],
        "medium": [
            {
                q: "أي سويتش يتم اختياره ليكون الـ Root Bridge؟",
                options: ["صاحب أعلى IP Address", "صاحب أعلى Bridge ID", "صاحب أقل Bridge ID", "صاحب أحدث نظام تشغيل"],
                correct: 2,
                explanation: "الـ Bridge ID يتكون من Priority + MAC Address. السويتش الذي يمتلك أقل Priority يفوز، وإذا تساوت، يفوز صاحب أقل MAC Address."
            },
            {
                q: "ما هي وظيفة الـ BPDU Guard؟",
                options: ["منع الهجمات اللاسلكية", "إيقاف المنفذ (Error-Disable) إذا استلم رسالة BPDU", "تسريع السويتش", "تمكين بروتوكول הـ RSTP"],
                correct: 1,
                explanation: "يُوضع على منافذ הـ Access المتصلة بالكمبيوترات لحماية الشبكة من أي سويتش خارجي أو هجمة. بمجرد أن يشم رسالة BPDU يقوم بإغلاق المنفذ كإجراء أمني."
            }
        ],
        "hard": [
            {
                q: "في الـ RSTP، ما هي الحالة (State) التي تدمج حالات Disabled, Blocking, و Listening في حالة واحدة؟",
                options: ["Forwarding", "Learning", "Discarding", "Listening"],
                correct: 2,
                explanation: "لتبسيط وتسريع العمليات، قام بروتوكول 802.1w (RSTP) بدمج هذه الحالات الثلاثة السلبية في حالة واحدة تسمى Discarding."
            }
        ],
        "scenario": [
            {
                q: "قمت بتوصيل سيرفر طابعة جديد بالشبكة، وتأكدت أن الـ IP والـ VLAN صحيحة، لكن السيرفر استغرق حوالي 30 ثانية ليتمكن من إرسال بيانات (اللمبة برتقالية ثم خضراء). ما هو الأمر المفقود؟",
                options: [
                    "spanning-tree portfast",
                    "spanning-tree bpduguard enable",
                    "switchport mode access",
                    "switchport nonegotiate"
                ],
                correct: 0,
                explanation: "عدم تفعيل PortFast يجعل منفذ السويتش يمر بدورة הـ STP الكلاسيكية (15 ثانية Listening + 15 ثانية Learning) قبل أن يفتح (Forwarding). أمر PortFast يتخطى هذه الدورة فوراً للأجهزة النهائية."
            }
        ]
    },
    "access_etherchannel": {
        "easy": [
            {
                q: "ما هو الهدف من دمج كابلين سويتش معاً باستخدام الـ EtherChannel؟",
                options: ["توزيع الـ IPs", "زيادة הـ Bandwidth ومنع הـ STP من إغلاق أحد الكابلين", "عزل الـ VLANs", "تشفير הـ MAC"],
                correct: 1,
                explanation: "الـ EtherChannel يدمجها ككابل منطقي واحد، فيتعامل معها STP كمسار واحد ولا يغلق أياً منها، مما يضاعف السرعة."
            }
        ],
        "medium": [
            {
                q: "ما هو بروتوكول التفاوض الديناميكي للـ EtherChannel الذي يعتبر معياراً مفتوحاً (Open Standard)؟",
                options: ["DTP", "PAgP", "LACP", "STP"],
                correct: 2,
                explanation: "الـ LACP (802.3ad) هو المعيار العالمي المفتوح، بينما الـ PAgP خاص بشركة سيسكو."
            },
            {
                q: "في بروتوكول LACP، ما هما الوضعان (Modes) اللذان سيؤديان إلى تكوين قناة ناجحة (Channel Established)؟",
                options: ["Passive و Passive", "Auto و Desirable", "Active و Passive", "On و Desirable"],
                correct: 2,
                explanation: "في الـ LACP يجب أن يكون طرف واحد على الأقل مبادراً (Active) بينما الثاني يمكن أن يكون مبادراً أو منتظراً (Passive). (Passive + Passive) لن يفاوض أحد وسيفشل."
            }
        ],
        "hard": [
            {
                q: "أي من الاختلافات التالية بين منفذين سيمنع تكوين הـ EtherChannel بينهما؟",
                options: ["اختلاف الـ Description", "أحدهما Trunk بـ Allowed VLAN 10,20 والآخر بـ Allowed VLAN 10,20,30", "اختلاف أرقام المنافذ (Fa0/1 و Fa0/5)", "أحدهما متصل بـ PC والآخر متصل بسيرفر"],
                correct: 1,
                explanation: "الـ EtherChannel يرفض الدمج إذا اختلفت خصائص الـ Trunk مثل الـ Allowed VLANs أو الـ Native VLAN أو الـ Speed/Duplex."
            }
        ],
        "scenario": [
            {
                q: "أنت تقوم ببرمجة EtherChannel (LACP) بين سويتش Cisco وسويتش Juniper. كتبت الأوامر، لكن القناة أصبحت (Suspended). ماذا تراجع أولاً؟",
                options: [
                    "هل بروتوكول הـ STP مغلق؟",
                    "هل أحد السويتشات تم وضعه كـ PAgP Desirable؟",
                    "هل الماكات متطابقة؟",
                    "هل الـ DTP يعمل؟"
                ],
                correct: 1,
                explanation: "سويتش Juniper لا يفهم PAgP لأنه خاص بسيسكو. يجب التأكد أن كلا الطرفين مبرمجان ليعملا ببروتوكول LACP (Active/Passive)."
            }
        ]
    },


    "access_vlan_trunk": {
        "easy": [
            {
                q: "ما هي الوظيفة الأساسية للـ VLAN في السويتش؟",
                options: ["تشفير البيانات", "تقسيم السويتش برمجياً لتقليل رسائل הבث", "توصيل السويتش بالإنترنت", "زيادة سرعة الكابلات النحاسية"],
                correct: 1,
                explanation: "الـ VLAN تعزل المنافذ عن بعضها منطقياً، بحيث يصبح كل VLAN يمثل Broadcast Domain مستقل، مما يعزز الأمان ويقلل الإزعاج."
            },
            {
                q: "أي نوع من المنافذ يسمح بمرور بيانات عدة VLANs في نفس الوقت؟",
                options: ["Access Port", "Trunk Port", "Console Port", "Routed Port"],
                correct: 1,
                explanation: "الـ Trunk Port مخصص لحمل بيانات (Traffic) أكثر من VLAN واحدة بين السويتشات باستخدام بروتوكول 802.1Q."
            }
        ],
        "medium": [
            {
                q: "ماذا يفعل بروتوكول 802.1Q داخل الـ Trunk؟",
                options: ["يضيف 4 بايت (Tag) داخل الإطار لتحديد رقم הـ VLAN.", "يشفر الإطار بالكامل.", "يحول الإطار إلى Packet.", "يمسح الـ MAC Address."],
                correct: 0,
                explanation: "معيار 802.1Q يقوم بعمل Tag بإضافة 4 Bytes في الإطار الأصلي (بعد عنوان الـ Source MAC) لتحديد الـ VLAN التابع لها."
            },
            {
                q: "ما هو الـ Native VLAN؟",
                options: ["هي الـ VLAN المخصصة للصوت فقط.", "هي הـ VLAN التي يرسل السويتش بياناتها بدون Tag.", "هي الـ VLAN المشفرة.", "هي شبكة وهمية لا يمكن حذفها أبداً."],
                correct: 1,
                explanation: "في الـ Trunk، بيانات الـ Native VLAN يتم إرسالها واستقبالها كـ Untagged Frames."
            }
        ],
        "hard": [
            {
                q: "إذا كان سويتش A منسقاً كـ (Dynamic Auto) وسويتش B منسقاً كـ (Dynamic Auto)، ما هي نتيجة التفاوض (DTP) بينهما؟",
                options: ["Access Mode", "Trunk Mode", "Error Disabled", "Routing Mode"],
                correct: 0,
                explanation: "وضع Dynamic Auto يعني (أنا مستعد لأكون Trunk إذا طلب الطرف الآخر ذلك). بما أن الطرفين Auto (ينتظران)، فلن يبادر أحد، وسيبقيان في وضع Access."
            }
        ],
        "scenario": [
            {
                q: "لديك هاتف IP وجهاز كمبيوتر متصلان بنفس منفذ السويتش. الـ IP Phone يحتاج إلى أولوية عليا للصوت. ما هي التقنية الأنسب لبرمجة هذا المنفذ؟",
                options: [
                    "جعله Trunk Port للجميع.",
                    "جعله Access Port وبرمجة Voice VLAN.",
                    "استخدام Native VLAN 99.",
                    "إلغاء تفعيل الـ DTP."
                ],
                correct: 1,
                explanation: "يتم برمجة المنفذ كـ Access Port لكمبيوتر الموظف، مع إضافة أمر (switchport voice vlan X) ليسمح بمرور بيانات الصوت بعمل Tag لها مع إعطائها أولوية في الـ QoS."
            }
        ]
    },
    "access_inter_vlan": {
        "easy": [
            {
                q: "ما هي المشكلة التي يحلها الـ Inter-VLAN Routing؟",
                options: ["بطء سرعة السويتش", "عدم قدرة أجهزة في VLANs مختلفة على التواصل", "انقطاع الكابلات", "استنفاد عناوين הـ IPv4"],
                correct: 1,
                explanation: "الـ VLANs تعزل الأجهزة في شبكات (Subnets) مختلفة. بدون Layer 3 Routing لا يمكن نقل البيانات بينها."
            }
        ],
        "medium": [
            {
                q: "في طريقة Router-on-a-Stick، ما هو الإعداد الصحيح للمنفذ المتصل بالسويتش؟",
                options: ["في الراوتر Access، وفي السويتش Trunk", "في الراوتر Sub-interfaces، وفي السويتش Trunk", "في الراوتر Trunk، وفي السويتش Access", "في كلا الجهازين Access"],
                correct: 1,
                explanation: "السويتش يجب أن يكون Trunk ليمرر كل الـ VLANs، والراوتر يقسم المنفذ الفعلي إلى واجهات فرعية (Sub-interfaces) تعتمد على 802.1Q."
            }
        ],
        "hard": [
            {
                q: "ما هو الأمر الأساسي والمطلوب تفعيله في הـ Layer 3 Switch لكي يعمل كراوتر؟",
                options: ["switchport mode trunk", "encapsulation dot1q", "ip routing", "spanning-tree mode rapid"],
                correct: 2,
                explanation: "السويتش من الطبقة الثالثة (L3 Switch) يعمل افتراضياً كـ L2 فقط. يجب تفعيل أمر (ip routing) في وضع الـ Global Config لبدء توجيه الباكتات."
            }
        ],
        "scenario": [
            {
                q: "قمت بعمل إعداد ROAS. الـ PC1 في VLAN 10 يحاول عمل Ping للـ PC2 في VLAN 20 ولكن يفشل. تأكدت أن الواجهة الفرعية (g0/0.10) تعمل وحالتها UP، والسويتش في وضع Trunk. ما هو الخطأ الأكثر احتمالاً؟",
                options: [
                    "السويتش يحتاج أمر ip routing.",
                    "الـ PC1 لا يمتلك Default Gateway يشير إلى الـ IP الخاص بالـ Sub-interface.",
                    "الـ Trunk يحتاج إلى Native VLAN.",
                    "الراوتر يحتاج إلى OSPF."
                ],
                correct: 1,
                explanation: "الخطأ الأشهر في الـ ROAS هو نسيان وضع הـ IP الخاص بالـ Sub-interface (الراوتر) كـ Default Gateway في إعدادات הـ PC، أو وضعه بشكل خاطئ."
            }
        ]
    },


    "fund_ipv6_wireless": {
        "easy": [
            {
                q: "ما هو حجم عنوان الـ IPv6 بالبت (Bits)؟",
                options: ["32 bits", "64 bits", "128 bits", "256 bits"],
                correct: 2,
                explanation: "الـ IPv6 يتكون من 128 بت لحل مشكلة استنفاد عناوين הـ IPv4."
            },
            {
                q: "أي نوع من طرق الإرسال تم إلغاؤه تماماً في הـ IPv6؟",
                options: ["Unicast", "Multicast", "Anycast", "Broadcast"],
                correct: 3,
                explanation: "الـ Broadcast تم إلغاؤه في IPv6 للتقليل من الإزعاج في الشبكة، وتم استبداله بالـ Multicast."
            }
        ],
        "medium": [
            {
                q: "كيف يمكن اختصار الـ IPv6 التالي بشكل صحيح: 2001:0DB8:0000:0000:0000:0000:0000:0001 ؟",
                options: [
                    "2001:0DB8::1",
                    "2001:DB8::1",
                    "2001:DB8:0:1",
                    "2001:DB8::::1"
                ],
                correct: 1,
                explanation: "يتم إزالة الأصفار على اليسار لتصبح DB8، ويتم استبدال الأصفار المتتالية بـ :: ليصبح العنوان 2001:DB8::1."
            },
            {
                q: "ما هو الاختلاف الرئيسي بين 2.4 GHz و 5 GHz في الشبكات اللاسلكية؟",
                options: [
                    "2.4 أسرع بكثير ولكن المدى أقصر.",
                    "5 أسرع بكثير ولكن المدى أقصر.",
                    "لا يوجد فرق في السرعة أو المدى.",
                    "5 يُستخدم فقط في الـ Bluetooth."
                ],
                correct: 1,
                explanation: "تردد 5 GHz يوفر سرعة أعلى لتوافر قنوات أكثر، ولكنه لا يستطيع اختراق الجدران والمسافات مثل 2.4 GHz."
            }
        ],
        "hard": [
            {
                q: "في بيئة الشركات الكبرى (Enterprise)، ما هو دور الـ WLC (Wireless LAN Controller)؟",
                options: [
                    "تقوية إشارة הـ Wi-Fi.",
                    "إدارة הـ Autonomous APs بشكل فردي.",
                    "التحكم المركزي وتوجيه أجهزة הـ Lightweight APs.",
                    "تحويل الإشارات اللاسلكية إلى كابلات Fiber."
                ],
                correct: 2,
                explanation: "الـ WLC هو العقل المدبر الذي يتحكم مركزياً في الـ LAPs ويدفع لها الإعدادات لتسهيل الإدارة وتوفير الـ Roaming."
            }
        ],
        "scenario": [
            {
                q: "زميلك كتب أمر لتكوين IPv6: 2001:DB8::8A::1 ولاحظ أن الراوتر يرفض العنوان. ما هو السبب المباشر؟",
                options: [
                    "العنوان يتجاوز 128 بت.",
                    "لا يمكن استخدام الحروف في הـ IPv6.",
                    "تم استخدام (::) مرتين في نفس العنوان.",
                    "العنوان ينقصه الـ Subnet Mask /64."
                ],
                correct: 2,
                explanation: "قاعدة اختصار הـ IPv6 تمنع استخدام (::) أكثر من مرة واحدة في العنوان لأن الراوتر لن يستطيع تحديد عدد الأصفار المحذوفة في كل موقع."
            }
        ]
    },


    "fund_ethernet": {
        "easy": [
            {
                q: "كم يبلغ حجم الـ MAC Address؟",
                options: ["32 bits", "48 bits", "64 bits", "128 bits"],
                correct: 1,
                explanation: "الـ MAC Address يتكون من 48 بت (6 بايت)، نصفها للشركة المصنعة ونصفها للرقم التسلسلي."
            },
            {
                q: "أي بروتوكول يستخدم للحصول على MAC Address باستخدام الـ IP Address؟",
                options: ["DHCP", "DNS", "ARP", "ICMP"],
                correct: 2,
                explanation: "بروتوكول ARP (Address Resolution Protocol) يقوم بعمل Broadcast ليسأل عن الـ MAC الخاص بـ IP معين."
            }
        ],
        "medium": [
            {
                q: "ما هو أقصى حجم افتراضي للبيانات (Payload) داخل الـ Ethernet Frame؟",
                options: ["1000 Bytes", "1500 Bytes", "1518 Bytes", "9000 Bytes"],
                correct: 1,
                explanation: "أقصى حجم للـ Payload هو 1500 بايت ويُعرف بـ MTU (Maximum Transmission Unit)."
            },
            {
                q: "أي جهاز يفصل הـ Collision Domains ولكن لا يفصل הـ Broadcast Domains؟",
                options: ["Hub", "Switch", "Router", "Repeater"],
                correct: 1,
                explanation: "الـ Switch يمنع التصادمات حيث كل منفذ فيه يعتبر Collision Domain، لكنه يمرر البث (Broadcast) لجميع المنافذ."
            }
        ],
        "hard": [
            {
                q: "في شبكة Half-Duplex، أي تقنية يتم استخدامها لمنع التصادمات والتعامل معها؟",
                options: ["CSMA/CA", "STP", "CSMA/CD", "LACP"],
                correct: 2,
                explanation: "الـ CSMA/CD (Carrier Sense Multiple Access with Collision Detection) يكتشف التصادمات ويأمر الأجهزة بالتوقف عن الإرسال لزمن عشوائي."
            }
        ],
        "scenario": [
            {
                q: "لديك سويتش بـ 24 منفذ، وكل منفذ متصل به جهاز كمبيوتر. كم عدد الـ Collision Domains والـ Broadcast Domains في هذا السويتش الافتراضي؟",
                options: [
                    "24 Collision Domains, 24 Broadcast Domains",
                    "1 Collision Domain, 1 Broadcast Domain",
                    "24 Collision Domains, 1 Broadcast Domain",
                    "1 Collision Domain, 24 Broadcast Domains"
                ],
                correct: 2,
                explanation: "كل منفذ في السويتش هو مسار منفصل (24 Collision Domains)، ولكن السويتش الافتراضي (بدون VLANs) يمرر رسائل البث للجميع مما يجعله Broadcast Domain واحد."
            }
        ]
    },
    "fund_ipv4_subnetting": {
        "easy": [
            {
                q: "كم عدد البتات (Bits) في عنوان IPv4؟",
                options: ["16", "32", "64", "128"],
                correct: 1,
                explanation: "عنوان IPv4 يتكون من 32 بت مقسمة على 4 أجزاء (Octets)."
            },
            {
                q: "أي من العناوين التالية يعتبر Private IP (لا يُستخدم في الإنترنت)؟",
                options: ["8.8.8.8", "172.16.5.5", "200.10.5.1", "11.0.0.1"],
                correct: 1,
                explanation: "النطاق 172.16.x.x إلى 172.31.x.x يعتبر Private IP للفئة B."
            }
        ],
        "medium": [
            {
                q: "إذا كان الـ Prefix هو /26، كم عدد الأجهزة (Hosts) المتاحة في هذه الشبكة؟",
                options: ["64", "62", "32", "30"],
                correct: 1,
                explanation: "32 - 26 = 6 بت للـ Hosts. عدد الـ IPs الكلي هو 2^6 = 64. نطرح 2 (للشبكة والـ Broadcast) ليصبح المتاح 62 جهاز."
            },
            {
                q: "ما هو الـ Magic Number (Block Size) للـ Subnet Mask 255.255.255.224 ؟",
                options: ["16", "32", "64", "128"],
                correct: 1,
                explanation: "الـ Magic Number = 256 - 224 = 32."
            }
        ],
        "hard": [
            {
                q: "لديك الـ IP Address 192.168.1.130/25. ما هو عنوان الشبكة (Network Address) لهذا الـ IP؟",
                options: [
                    "192.168.1.0",
                    "192.168.1.128",
                    "192.168.1.130",
                    "192.168.1.255"
                ],
                correct: 1,
                explanation: "/25 تعني Mask بـ 128. القفزات تكون بصفر ثم 128. الرقم 130 يقع في الشبكة الثانية التي تبدأ من 192.168.1.128."
            }
        ],
        "scenario": [
            {
                q: "يشتكي مهندس من أن الراوترين المتصلين بـ Point-to-Point يهدرون الكثير من הـ IPs. ما هو الـ Subnet Mask الأنسب لربط راوترين معاً (تحتاج 2 IPs فقط)؟",
                options: ["/24", "/28", "/30", "/32"],
                correct: 2,
                explanation: "الـ /30 يترك 2 بت للأجهزة (2^2 = 4)، ونطرح 2 فيتبقى 2 IP صالحين للاستخدام، وهو المثالي للـ Point-to-Point."
            }
        ]
    },

    "fund_osi_tcp": {
        "easy": [
            {
                q: "أي طبقة من نموذج OSI مسؤولة عن التوجيه (Routing) واستخدام الـ IP Address؟",
                options: ["Transport Layer", "Network Layer", "Data Link Layer", "Physical Layer"],
                correct: 1,
                explanation: "الـ Network Layer (Layer 3) هي المسؤولة عن التوجيه باستخدام العناوين المنطقية (IP Addresses)."
            },
            {
                q: "ما هو اسم وحدة البيانات (PDU) في طبقة الـ Data Link؟",
                options: ["Packet", "Segment", "Bits", "Frame"],
                correct: 3,
                explanation: "في الطبقة الثانية يتم تغليف البيانات لتصبح Frame وتحتوي على عناوين الـ MAC."
            }
        ],
        "medium": [
            {
                q: "ما هي الطبقة المسؤولة عن تشفير البيانات وضغطها (Encryption & Compression)؟",
                options: ["Application", "Presentation", "Session", "Transport"],
                correct: 1,
                explanation: "الـ Presentation Layer تهتم بصيغة البيانات وتشفيرها لضمان قراءتها بشكل صحيح من الطرف الآخر."
            },
            {
                q: "في أي طبقة يتم إضافة الـ FCS (Frame Check Sequence)؟",
                options: ["Network", "Transport", "Data Link", "Physical"],
                correct: 2,
                explanation: "الـ FCS هو ذيل (Trailer) يُضاف في نهاية الـ Frame في طبقة الـ Data Link لاكتشاف الأخطاء."
            }
        ],
        "hard": [
            {
                q: "أثناء عملية الـ Encapsulation، ما هو الترتيب الصحيح لإضافة الـ Headers؟",
                options: [
                    "MAC -> IP -> Port -> Data",
                    "Port -> IP -> MAC -> Data",
                    "Port -> IP -> MAC -> FCS",
                    "Data -> Port -> MAC -> IP"
                ],
                correct: 2,
                explanation: "البيانات تنزل من فوق لتحت. أولاً يضاف الـ Port (L4)، ثم الـ IP (L3)، ثم الـ MAC والـ FCS (L2)."
            }
        ],
        "scenario": [
            {
                q: "أنت تقوم بتحليل حزم البيانات (Packet Capture) باستخدام Wireshark ولاحظت وجود خطأ في الـ Source MAC Address. في أي طبقة يجب أن تبدأ استكشاف الأخطاء (Troubleshooting)؟",
                options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"],
                correct: 1,
                explanation: "عناوين الـ MAC يتم التعامل معها حصراً في الطبقة الثانية (Data Link Layer) بواسطة كروت الشبكة والسويتشات."
            }
        ]
    }
};
