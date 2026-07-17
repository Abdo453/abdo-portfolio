// ==========================================
// 6. DIGITAL FORENSICS & LOG INVESTIGATION (forensics.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'dmesg',name:'dmesg',icon:'📟',level:3,category:'Digital Forensics',
   desc:'عرض وقراءة سجلات ورسائل إقلاع النواة (Kernel ring buffer) وأخطاء العتاد والـ Drivers',
   syntax:'dmesg [OPTIONS]',
   flags:[
     {flag:'-C',desc:'مسح وتصفير السجل الحالي تماماً (Clear buffer)'},
     {flag:'-w',desc:'مراقبة السجلات الحية بشكل مباشر ومستمر (Follow)'},
     {flag:'-T',desc:'عرض التوقيت والتواريخ بصيغة مقروءة للبشر (Human readable timestamps)'},
     {flag:'-l LEVEL',desc:'فلترة المعروض حسب مستوى الخطورة (مثل err, warn, info)'}
   ],
   examples:[
     'dmesg -T | grep -i "usb"',
     'sudo dmesg -l err,crit -T # عرض الأخطاء الجسيمة والحرجة للنواة فقط'
   ],
   note:'تحليل جنائي: عند إيقاف عملية فجأة بسبب استهلاك الذاكرة العشوائية، يعرض dmesg رسالة Out of Memory (OOM Killer) لتوضيح التفاصيل.'
  },
  {id:'aureport',name:'aureport',icon:'📊',level:4,category:'Digital Forensics',
   desc:'إنشاء تقارير أمنية ملخصة وسريعة من سجلات نظام التدقيق Auditd لجلسات الدخول والأحداث',
   syntax:'aureport [OPTIONS]',
   flags:[
     {flag:'-au',desc:'تقرير شامل عن محاولات وإحصائيات المصادقة وجلسات المستخدمين (Authentication)'},
     {flag:'-l',desc:'تقرير مفصل عن عمليات الدخول (Logins) وتوقيتاتها'},
     {flag:'-p',desc:'تقرير عن العمليات الجارية (Processes)'},
     {flag:'-s',desc:'تقرير عن استدعاءات النظام المراقبة (Syscalls)'},
     {flag:'-f',desc:'تقرير عن تعديل وتفاصيل الملفات المراقبة (Files)'}
   ],
   examples:['sudo aureport -au','sudo aureport -l --summary'],
  },
  {id:'fuser',name:'fuser',icon:'🔍',level:3,category:'Digital Forensics',
   desc:'تحديد العمليات التي تستخدم حالياً ملفاً أو مجلداً أو منفذاً شبكياً معيناً',
   syntax:'fuser [OPTIONS] NAME',
   flags:[
     {flag:'-v',desc:'عرض تفصيلي يتضمن اسم المستخدم والعملية والـ PID وصلاحياتها'},
     {flag:'-k',desc:'إنهاء وقتل العمليات التي تستخدم الهدف حالياً فوراً (Kill)'},
     {flag:'-n PROTO',desc:'تحديد نوع الفحص للمنافذ الشبكية (tcp أو udp)'}
   ],
   examples:[
     'fuser -v /etc/shadow',
     'sudo fuser -k -n tcp 80 # إجبار إنهاء العمليات التي تستحوذ على منفذ خادم الويب 80'
   ],
  },
  {id:'proc_cpuinfo',name:'/proc/cpuinfo',icon:'⚙️',level:2,category:'Malware Analysis',
   desc:'ملف افتراضي بالنواة يعرض خصائص ومواصفات المعالج (CPU) وتوقيعاته والمميزات المدعومة',
   syntax:'cat /proc/cpuinfo',
   flags:[],
   examples:['cat /proc/cpuinfo | grep "model name"','cat /proc/cpuinfo | grep -E "vmx|svm" # التحقق من دعم المحاكاة الافتراضية'],
  },
  {id:'proc_meminfo',name:'/proc/meminfo',icon:'📊',level:2,category:'System Administration',
   desc:'ملف افتراضي بالنواة يعرض إحصائيات دقيقة وتفصيلية عن استهلاك الذاكرة العشوائية والـ Swap والذاكرة المخزنة مؤقتاً',
   syntax:'cat /proc/meminfo',
   flags:[],
   examples:['cat /proc/meminfo | head -10','cat /proc/meminfo | grep MemFree'],
  },
  {id:'proc_net_tcp',name:'/proc/net/tcp',icon:'🌐',level:4,category:'Digital Forensics',
   desc:'جدول بالنواة يعرض جميع اتصالات الـ TCP المفتوحة بالجهاز مع الـ IPs والمنافذ بنظام الـ Hex',
   syntax:'cat /proc/net/tcp',
   flags:[],
   examples:['cat /proc/net/tcp'],
   note:'تحليل جنائي: البرمجيات الخبيثة المتقدمة تحاول خداع أدوات مثل netstat و ss، ولكن قراءة /proc/net/tcp مباشرة تعرض الاتصالات الحقيقية دوماً.'
  },
  {id:'proc_net_udp',name:'/proc/net/udp',icon:'🌐',level:4,category:'Digital Forensics',
   desc:'جدول بالنواة يعرض جميع اتصالات الـ UDP النشطة والمفتوحة مع المنافذ بنظام الـ Hex',
   syntax:'cat /proc/net/udp',
   flags:[],
   examples:['cat /proc/net/udp'],
  },
  {id:'proc_net_unix',name:'/proc/net/unix',icon:'🔌',level:4,category:'Digital Forensics',
   desc:'عرض المقابس المحلية (Unix domain sockets) النشطة والتي تستخدم للاتصال الداخلي بين العمليات بالخادم',
   syntax:'cat /proc/net/unix',
   flags:[],
   examples:['cat /proc/net/unix | head -20'],
  },
  {id:'proc_self_maps',name:'/proc/self/maps',icon:'🧠',level:4,category:'Malware Analysis',
   desc:'عرض خريطة توزيع الذاكرة وتفاصيل العناوين والـ Layout الخاص بعملية الـ Shell الحالية',
   syntax:'cat /proc/self/maps',
   flags:[],
   examples:['cat /proc/self/maps'],
   note:'تطوير الاستغلال: يعرض هذا الملف مناطق الذاكرة المخصصة للـ Heap والـ Stack والمكتبات المشتركة، وهو أساسي لكشف آليات عمل الـ ASLR.'
  },
  {id:'proc_self_status',name:'/proc/self/status',icon:'📊',level:3,category:'Digital Forensics',
   desc:'عرض تقرير شامل ومفصل لحالة العملية الحالية، استهلاكها للذاكرة، والقدرات والمجموعات الخاصة بها',
   syntax:'cat /proc/self/status',
   flags:[],
   examples:['cat /proc/self/status | grep -i "Cap" # فحص القدرات الموروثة للعملية'],
  },
  {id:'proc_self_fd',name:'/proc/self/fd',icon:'📂',level:3,category:'Digital Forensics',
   desc:'مجلد يحتوي على روابط لكافة الـ File Descriptors المفتوحة حالياً بواسطة العملية',
   syntax:'ls -l /proc/self/fd',
   flags:[],
   examples:['ls -l /proc/self/fd'],
  },
  {id:'proc_pid_cmdline',name:'/proc/[pid]/cmdline',icon:'⚙️',level:3,category:'Digital Forensics',
   desc:'عرض مسار ومتحولات الأمر الحقيقي الكامل الذي أطلق العملية ذات المعرف PID المحدد',
   syntax:'cat /proc/[PID]/cmdline',
   flags:[],
   examples:['cat /proc/1234/cmdline','strings /proc/$(pgrep nginx)/cmdline'],
   note:'تحليل جنائي: إذا قام هكر بتغيير اسم عمليته في قائمة ps التمويه، يعرض ملف cmdline اسم التشغيل الأصلي والحقيقي للعملية.'
  },
  {id:'proc_pid_environ',name:'/proc/[pid]/environ',icon:'🏷️',level:4,category:'Digital Forensics',
   desc:'عرض كافة المتغيرات البيئية (Environment Variables) المخصصة للعملية المحددة بالكامل',
   syntax:'cat /proc/[PID]/environ',
   flags:[],
   examples:[
     'cat /proc/1234/environ | tr "\\0" "\\n" # ترتيب وطباعة المتغيرات'
   ],
   note:'تنبيه أمني: ملف environ قد يحتوي على كلمات مرور قواعد بيانات أو مفاتيح API حساسة تم تمريرها للعملية أثناء التشغيل.'
  },
  {id:'proc_pid_maps',name:'/proc/[pid]/maps',icon:'🧠',level:4,category:'Malware Analysis',
   desc:'عرض خريطة ومناطق وعناوين الذاكرة المخصصة للعملية المستهدفة وصلاحيات القراءة والكتابة والتنفيذ (rwx) لكل منطقة',
   syntax:'cat /proc/[PID]/maps',
   flags:[],
   examples:['cat /proc/1234/maps | grep -i "rwx" # البحث عن مناطق ذاكرة مخصصة للحقن والتنفيذ (W^X violation)'],
  },
  {id:'proc_pid_fd',name:'/proc/[pid]/fd',icon:'📂',level:3,category:'Digital Forensics',
   desc:'سرد وعرض كافة الملفات والاتصالات والمقابس الشبكية المفتوحة بواسطة العملية المحددة حالياً',
   syntax:'ls -la /proc/[PID]/fd',
   flags:[],
   examples:[
     'sudo ls -la /proc/$(pgrep sshd)/fd/ # معرفة الملفات والمقابس التي يستحوذ عليها خادم SSH حالياً'
   ],
  },
  {id:'proc_pid_mounts',name:'/proc/[pid]/mounts',icon:'🔗',level:3,category:'System Administration',
   desc:'عرض نقاط وتفاصيل توصيل الأقراص النشطة والمتاحة لنطاق ومساحة عمل العملية المحددة',
   syntax:'cat /proc/[PID]/mounts',
   flags:[],
   examples:['cat /proc/1/mounts'],
  },
  {id:'journalctl',name:'journalctl',icon:'📰',level:2,category:'Digital Forensics',
   desc:'عرض وتحليل وفحص سجلات النظام الموحدة المدارة بواسطة systemd-journald بكفاءة عالية',
   syntax:'journalctl [OPTIONS]',
   flags:[
     {flag:'-u UNIT',desc:'عرض السجلات الخاصة بخدمة معينة فقط (مثل -u sshd)'},
     {flag:'-f',desc:'متابعة وعرض السجلات الحية مباشرة فور حدوثها (Follow)'},
     {flag:'-n N',desc:'عرض آخر N أسطر فقط من السجل'},
     {flag:'-p LEVEL',desc:'تصفية وعرض السجلات حسب مستوى الخطورة (مثل err, warning, crit)'},
     {flag:'--since "DATE"',desc:'عرض السجلات منذ توقيت معين (مثل --since "1 hour ago" أو "2026-07-01")'},
     {flag:'-k / --dmesg',desc:'عرض رسائل وسجلات النواة والكيرنل فقط'}
   ],
   examples:[
     'journalctl -u sshd -n 20',
     'journalctl -f -p err',
     'journalctl --since "2 hours ago"'
   ],
  },
  {id:'ausearch',name:'ausearch',icon:'🔍',level:4,category:'Digital Forensics',
   desc:'البحث وفحص قاعدة بيانات سجلات التدقيق الأمني لـ Auditd بناءً على أحداث معينة (مثل تعديل ملف passwd)',
   syntax:'ausearch [OPTIONS]',
   flags:[
     {flag:'-m TYPE',desc:'البحث حسب نوع الحدث الأمني (مثال: -m USER_LOGIN)'},
     {flag:'-f FILE',desc:'البحث عن كافة الأحداث والعمليات التي تفاعلت أو عدلت الملف المحدد'},
     {flag:'-ua UID',desc:'البحث عن الأحداث الجارية بواسطة مستخدم محدد برقم الـ UID الخاص به'},
     {flag:'-c COMM',desc:'البحث حسب اسم البرنامج التنفيذي المسؤول عن الحدث'}
   ],
   examples:[
     'sudo ausearch -f /etc/passwd',
     'sudo ausearch -m USER_LOGIN -success no # رصد محاولات الدخول الفاشلة بـ auditd'
   ],
  },
  {id:'lsof',name:'lsof',icon:'📂',level:3,category:'Digital Forensics',
   desc:'سرد وعرض كافة الملفات والمقابس الشبكية المفتوحة بواسطة جميع العمليات الجارية بالنظام (List Open Files)',
   syntax:'lsof [OPTIONS]',
   flags:[
     {flag:'-u USER',desc:'عرض الملفات المفتوحة بواسطة مستخدم محدد فقط'},
     {flag:'-i [PROTO][@HOST][:PORT]',desc:'عرض العمليات التي تستخدم اتصالات شبكية (مثال: -i :22 أو -i tcp)'},
     {flag:'-p PID',desc:'عرض جميع الملفات والشبكات المفتوحة بواسطة عملية محددة بالـ PID'},
     {flag:'-t',desc:'طباعة أرقام الـ PIDs فقط لتسهيل تمريرها لأوامر أخرى مثل kill'}
   ],
   examples:[
     'sudo lsof -i tcp:22 # معرفة من متصل حالياً بالـ SSH والعملية المالكة له',
     'sudo lsof -u alice',
     'sudo kill -9 $(sudo lsof -t -i :8080) # إنهاء أي عملية تحتل المنفذ 8080 فوراً'
   ],
   note:'تحليل جنائي: يفيد lsof في كشف الملفات المخفية المشبوهة أو السكريبتات الجارية بالخلفية والتي تستمع لمنافذ شبكية معينة.'
  }
]);
