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
  }
]);
