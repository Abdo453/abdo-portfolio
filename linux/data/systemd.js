// ==========================================
// 9. SYSTEMD SERVICES & RESOURCES (systemd.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'systemctl',name:'systemctl',icon:'⚙️',level:3,category:'System Administration',
   desc:'إدارة خدمات ووحدات نظام Systemd (تشغيل، إيقاف، تفعيل، تشخيص)',
   syntax:'systemctl [OPTIONS] COMMAND [UNIT]',
   flags:[
     {flag:'start UNIT',desc:'تشغيل الخدمة المحددة فوراً'},
     {flag:'stop UNIT',desc:'إيقاف تشغيل الخدمة المحددة'},
     {flag:'restart UNIT',desc:'إعادة تشغيل الخدمة'},
     {flag:'reload UNIT',desc:'إعادة تحميل ملفات الإعداد للخدمة دون قطع الاتصالات النشطة'},
     {flag:'enable UNIT',desc:'تفعيل التشغيل التلقائي للخدمة عند إقلاع النظام'},
     {flag:'disable UNIT',desc:'إيقاف التشغيل التلقائي للخدمة'},
     {flag:'status UNIT',desc:'عرض تقرير كامل عن حالة الخدمة وسجلاتها الأخيرة'},
     {flag:'daemon-reload',desc:'إعادة تحميل وتحديث تكوينات Systemd بعد تعديل ملفات الوحدات'},
     {flag:'mask UNIT',desc:'منع تشغيل الخدمة نهائياً وبأي طريقة (حتى بواسطة خدمات أخرى)'},
     {flag:'unmask UNIT',desc:'إلغاء الحظر وتفعيل إمكانية تشغيل الخدمة مجدداً'}
   ],
   examples:[
     'systemctl start nginx',
     'systemctl enable --now sshd # تفعيل وتشغيل في نفس الوقت',
     'sudo systemctl daemon-reload'
   ],
  },
  {id:'loginctl',name:'loginctl',icon:'👥',level:3,category:'System Administration',
   desc:'إدارة ومراقبة جلسات الدخول للمستخدمين والـ seats الفعالة في نظام Systemd',
   syntax:'loginctl [OPTIONS] COMMAND [ARGS...]',
   flags:[
     {flag:'list-sessions',desc:'عرض جميع جلسات المستخدمين المتصلين بالنظام حالياً'},
     {flag:'show-session ID',desc:'عرض معلومات تفصيلية عن جلسة دخول محددة بالمعرف'},
     {flag:'terminate-session ID',desc:'إيقاف وإنهاء جلسة مستخدم محدد فوراً وقطع اتصاله بالخادم'}
   ],
   examples:[
     'loginctl list-sessions',
     'sudo loginctl terminate-session 3 # طرد مستخدم وإنهاء جلسته'
   ],
   note:'تنبيه أمني: إذا اكتشفت جلسة دخول مشبوهة، يمكنك استخدام terminate-session لقطع اتصال المخترق فوراً.'
  },
  {id:'hostnamectl',name:'hostnamectl',icon:'🏷️',level:2,category:'System Administration',
   desc:'عرض وتعديل اسم الجهاز (Hostname) وإعدادات الهوية والـ Deployment للنظام',
   syntax:'hostnamectl [OPTIONS] COMMAND',
   flags:[
     {flag:'status',desc:'عرض الاسم الحالي ومعلومات نظام التشغيل والـ Kernel والعتاد الافتراضي'},
     {flag:'set-hostname NAME',desc:'تعديل اسم السيرفر بشكل دائم ومباشر'}
   ],
   examples:['hostnamectl status','sudo hostnamectl set-hostname prod-server'],
  },
  {id:'timedatectl',name:'timedatectl',icon:'⏰',level:2,category:'System Administration',
   desc:'إدارة وضبط التاريخ والوقت والمنطقة الزمنية ومزامنة الوقت التلقائي (NTP)',
   syntax:'timedatectl [OPTIONS] COMMAND',
   flags:[
     {flag:'status',desc:'عرض التاريخ والوقت والمنطقة الزمنية وحالة مزامنة الوقت حالياً'},
     {flag:'set-timezone ZONE',desc:'تعديل المنطقة الزمنية للنظام (مثال: Asia/Riyadh)'},
     {flag:'set-ntp BOOL',desc:'تفعيل (yes) أو إيقاف (no) مزامنة الوقت التلقائية عبر الإنترنت'}
   ],
   examples:['timedatectl status','sudo timedatectl set-timezone Africa/Cairo'],
  },
  {id:'systemd_analyze',name:'systemd-analyze',icon:'📊',level:3,category:'Performance Tuning',
   desc:'تحليل سرعة عملية إقلاع النظام وتحديد الخدمات التي تتسبب في بطء الإقلاع',
   syntax:'systemd-analyze [OPTIONS] [COMMAND]',
   flags:[
     {flag:'time',desc:'عرض إجمالي الوقت الذي استغرقه النظام للإقلاع بالكامل (Kernel + Userspace)'},
     {flag:'blame',desc:'عرض قائمة بالخدمات مرتبة تنازلياً حسب الوقت الذي استغرقته كل خدمة للإقلاع'},
     {flag:'plot',desc:'تصدير رسم بياني تفصيلي متكامل بصيغة SVG لعملية الإقلاع وتداخل الخدمات'}
   ],
   examples:[
     'systemd-analyze',
     'systemd-analyze blame | head -10',
     'systemd-analyze plot > boot.svg'
   ],
  },
  {id:'systemd_cgls',name:'systemd-cgls',icon:'🌳',level:3,category:'System Administration',
   desc:'عرض شجرة العمليات النشطة مقسمة ومصنفة حسب مجموعات التحكم (cgroups) والخدمات التابعة لها',
   syntax:'systemd-cgls [OPTIONS]',
   flags:[
     {flag:'--no-pager',desc:'عرض المحتوى مباشرة دون الحاجة لـ pager'}
   ],
   examples:['systemd-cgls'],
  },
  {id:'systemd_cgtop',name:'systemd-cgtop',icon:'📊',level:3,category:'Performance Tuning',
   desc:'عرض تفاعلي مباشر (مثل top) يوضح استهلاك الخدمات والـ cgroups للذاكرة والمعالج والـ I/O',
   syntax:'systemd-cgtop [OPTIONS]',
   flags:[
     {flag:'-m',desc:'الترتيب والتصفية حسب استهلاك الذاكرة العشوائية'},
     {flag:'-c',desc:'الترتيب والتصفية حسب استهلاك المعالج CPU (الافتراضي)'}
   ],
   examples:['systemd-cgtop'],
  },
  {id:'systemd_run',name:'systemd-run',icon:'🏃',level:4,category:'Containers',
   desc:'تشغيل سكريبت أو برنامج داخل وحدة خدمة افتراضية أو مؤقتة (Transient unit) للتحكم بحدودها وأمانها',
   syntax:'systemd-run [OPTIONS] COMMAND',
   flags:[
     {flag:'--scope',desc:'تشغيل البرنامج مباشرة في نفس سياق العملية الحالية بدل إنشاء خدمة بالخلفية'},
     {flag:'--unit=NAME',desc:'تسمية وحدة الخدمة المؤقتة باسم مخصص لسهولة تشخيصها وتتبعها'},
     {flag:'-p LIMIT=VALUE',desc:'تطبيق حد أقصى للموارد على البرنامج (مثال: -p MemoryLimit=200M)'}
   ],
   examples:[
     'sudo systemd-run --unit=backup_task /opt/backup.sh',
     'sudo systemd-run -p MemoryLimit=100M -p CPUQuota=10% firefox'
   ],
  },
  {id:'machinectl',name:'machinectl',icon:'🖥️',level:4,category:'Containers',
   desc:'إدارة ومراقبة الحاويات والأجهزة الافتراضية المدارة بواسطة نظام systemd-nspawn أو libvirt',
   syntax:'machinectl [OPTIONS] COMMAND [NAME]',
   flags:[
     {flag:'list',desc:'عرض جميع الأجهزة والحاويات النشطة حالياً بالنظام'},
     {flag:'login NAME',desc:'فتح جلسة دخول تفاعلية سطرية مباشرة داخل الحاوية المحددة'},
     {flag:'shell NAME',desc:'تشغيل shell داخل الحاوية كـ root فوراً ودون طلب مصادقة'},
     {flag:'terminate NAME',desc:'إيقاف وإنهاء الحاوية أو الجهاز الافتراضي المحدد فوراً'}
   ],
   examples:[
     'machinectl list',
     'sudo machinectl shell mycontainer'
   ],
  }
]);
