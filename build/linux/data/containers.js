// ==========================================
// 8. CONTAINERS & NAMESPACES (containers.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'unshare_c',name:'unshare',icon:'📦',level:4,category:'Containers',
   desc:'تشغيل سكريبت أو عملية في نطاق أسماء ومنعزل (Namespace) عن النظام الرئيسي (حجر أساس الحاويات)',
   syntax:'unshare [OPTIONS] [COMMAND]',
   flags:[
     {flag:'-m / --mount',desc:'عزل نقاط توصيل الملفات والأقراص (Mount)'},
     {flag:'-u / --uts',desc:'عزل وتغيير اسم الجهاز (Hostname)'},
     {flag:'-i / --ipc',desc:'عزل قنوات التواصل بين العمليات (System V IPC)'},
     {flag:'-n / --net',desc:'عزل كروت الشبكة وجداول التوجيه تماماً'},
     {flag:'-p / --pid',desc:'عزل شجرة العمليات والبدء بـ PID 1 كحاوية'},
     {flag:'-f',desc:'إجبار unshare على تشغيل العملية كابنة لضمان تطبيق شجرة العمليات المنعزلة'},
     {flag:'--map-root-user',desc:'جعل المستخدم الحالي بمثابة الـ root الافتراضي داخل البيئة المنعزلة'}
   ],
   examples:[
     'unshare -m -u -n -p -f --map-root-user /bin/bash # الدخول في سجن منعزل بالكامل بدون أدوات خارجية',
     'sudo unshare -n ip addr show # تشغيل مع كارت شبكة افتراضي فارغ ومنعزل'
   ],
   note:'تقنية: يستخدم Docker هذا الأمر داخلياً بالنواة لعزل التطبيقات عن بعضها وعن الخادم المستضيف.'
  },
  {id:'nsenter_c',name:'nsenter',icon:'🚪',level:4,category:'Containers',
   desc:'الدخول والربط بنطاقات الأسماء (Namespaces) الخاصة بعملية أخرى قيد التشغيل (مثل الدخول لحاوية نشطة)',
   syntax:'nsenter [OPTIONS] [COMMAND]',
   flags:[
     {flag:'-t PID',desc:'رقم العملية (PID) المستهدفة للدخول في نطاقها الأمني (إجباري)'},
     {flag:'-m',desc:'الدخول في نطاق توصيل الأقراص والملفات (Mount)'},
     {flag:'-n',desc:'الدخول في نطاق كروت الشبكة والـ IPs الخاص بالعملية المستهدفة'},
     {flag:'-p',desc:'الدخول في نطاق العمليات ورؤية شجرتها الخاصة'},
     {flag:'-u',desc:'الدخول في نطاق اسم الجهاز والـ Hostname'}
   ],
   examples:[
     'sudo nsenter -t 1234 -m -n /bin/bash # الدخول لبيئة شبكة وأقراص العملية 1234',
     'sudo nsenter -t $(docker inspect -f "{{.State.Pid}}" mycontainer) -n ip a'
   ],
  },
  {id:'pivot_root_c',name:'pivot_root',icon:'🔄',level:4,category:'Containers',
   desc:'تغيير وتدوير مجلد الجذر (Root Filesystem) الحالي ونقله لمسار آخر وجعل المسار الجديد هو جذر النظام الحقيقي',
   syntax:'pivot_root NEW_ROOT PUT_OLD',
   flags:[],
   examples:['sudo pivot_root /mnt/new_root /mnt/new_root/old_root'],
   note:'تعتبر pivot_root خطوة أمنية هامة جداً أثناء بناء الحاويات لتجريدها من رؤية نظام الملفات الرئيسي للخادم بالكامل.'
  },
  {id:'chroot_c',name:'chroot',icon:'🚪',level:4,category:'Containers',
   desc:'تغيير دليل الجذر (Root Directory) للعملية الحالية والعمليات الفرعية (إنشاء سجن Chroot)',
   syntax:'chroot NEWROOT [COMMAND]',
   flags:[],
   examples:[
     'sudo chroot /mnt/sysimage # الدخول لنظام لينكس معطل من قرص الإنقاذ لإصلاحه',
     'sudo chroot /var/chroot/apache /bin/bash # حبس خادم Apache في مجلد خاص لحماية السيرفر'
   ],
   note:'أداة أساسية في عمليات الإنقاذ وحبس الخدمات لتقليل أثر اختراق الخدمات الحساسة.'
  },
  {id:'cgcreate',name:'cgcreate',icon:'🚦',level:4,category:'Containers',
   desc:'إنشاء مجموعات تحكم بالموارد (Control Groups - cgroups) لتحديد استهلاك العمليات للـ CPU والذاكرة',
   syntax:'cgcreate -g CONTROLLER:PATH',
   flags:[
     {flag:'-g',desc:'تحديد نوع التحكم المطلوب (مثل cpu, memory, blkio) والمسار الخاص بالمجموعة'}
   ],
   examples:[
     'sudo cgcreate -g cpu,memory:/limit50 # إنشاء مجموعة للحد من استهلاك المعالج والذاكرة',
     'sudo cgset -r memory.limit_in_bytes=500M /limit50 # تعيين حد أقصى للذاكرة بـ 500 ميجا'
   ],
   note:'دفاعياً: مجموعات التحكم (cgroups) هي خط الدفاع الأول لمنع الخدمات والعمليات المشبوهة من التسبب في حظر الخدمة (DoS) بسبب نفاد الموارد.'
  },
  {id:'cgexec',name:'cgexec',icon:'🏃',level:4,category:'Containers',
   desc:'تشغيل عملية أو برنامج داخل مجموعة تحكم (cgroup) محددة مسبقاً لتطبيق حدود الموارد عليها فوراً',
   syntax:'cgexec -g CONTROLLER:PATH COMMAND',
   flags:[],
   examples:[
     'sudo cgexec -g memory:/limit50 python app.py # تشغيل السكريبت بحد أقصى للذاكرة'
   ],
  },
  {id:'systemd_nspawn',name:'systemd-nspawn',icon:'🚀',level:4,category:'Containers',
   desc:'أداة systemd المدمجة لإنشاء وتشغيل حاويات خفيفة (Chroot/Container) بشكل سريع وآمن',
   syntax:'systemd-nspawn -D DIRECTORY [COMMAND]',
   flags:[
     {flag:'-D DIR',desc:'تحديد المجلد الذي يحتوي على نظام الملفات الخاص بالحاوية (Root directory)'},
     {flag:'-b / --boot',desc:'إقلاع الحاوية كنظام كامل وبدء تشغيل نظام init الخاص بها'},
     {flag:'--network-veth',desc:'إنشاء كارت شبكة افتراضي ثنائي (Virtual Ethernet) للحاوية وتوصيلها بالشبكة'}
   ],
   examples:[
     'sudo systemd-nspawn -D /var/lib/container/ubuntu /bin/bash',
     'sudo systemd-nspawn -b -D /var/lib/container/my_server'
   ],
  },
  {id:'runc',name:'runc',icon:'📦',level:4,category:'Containers',
   desc:'الأداة منخفضة المستوى (CLI tool) لتشغيل الحاويات وفقاً لمواصفات OCI (Open Container Initiative)',
   syntax:'runc [global options] COMMAND [command options]',
   flags:[
     {flag:'run ID',desc:'إنشاء وتشغيل حاوية محددة بالمعرف المعين'},
     {flag:'start ID',desc:'بدء تشغيل حاوية تم إنشاؤها مسبقاً بالتكوين'},
     {flag:'state ID',desc:'عرض الحالة الحالية للحاوية المحددة'}
   ],
   examples:['sudo runc run mycontainer','sudo runc list'],
  }
]);
