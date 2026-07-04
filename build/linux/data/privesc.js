// ==========================================
// 5. PRIVILEGE ESCALATION & CAPABILITIES (privesc.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'sudo',name:'sudo',icon:'⚡',level:3,category:'Privilege Escalation',
   desc:'تنفيذ الأوامر بصلاحيات مستخدم آخر (غالباً root) بناءً على إعدادات ملف sudoers',
   syntax:'sudo [OPTIONS] COMMAND',
   flags:[
     {flag:'-l',desc:'عرض صلاحيات الـ sudo المتاحة للمستخدم الحالي على هذا النظام (مهم جداً!)'},
     {flag:'-u USER',desc:'تنفيذ الأمر بصلاحيات المستخدم المحدد بدلاً من root'},
     {flag:'-i',desc:'بدء جلسة تفاعلية جديدة كـ root وتطبيق متغيراته البيئية (Login shell)'},
     {flag:'-k',desc:'إلغاء تخزين كلمة المرور المؤقتة (إجبار النظام على طلب كلمة المرور في المحاولة التالية)'}
   ],
   examples:[
     'sudo -l # رصد صلاحيات الارتقاء بالصلاحيات بدون كلمة مرور (NOPASSWD)',
     'sudo -u postgres psql # الدخول لقاعدة بيانات postgres',
     'sudo -i'
   ],
   note:'تنبيه أمني: ملف الضبط الرئيسي هو /etc/sudoers. استخدم دائماً أمر visudo لعديل هذا الملف لتفادي إتلاف صياغته وإغلاق النظام.'
  },
  {id:'su',name:'su',icon:'🦸',level:3,category:'Privilege Escalation',
   desc:'تبديل المستخدم الحالي بالجلسة إلى مستخدم آخر (Switch User)',
   syntax:'su [OPTIONS] [USER]',
   flags:[
     {flag:'- / -l',desc:'بدء الجلسة كـ Login shell كامل وتنزيل متغيرات المستخدم المستهدف البيئية بالكامل'},
     {flag:'-c CMD',desc:'تنفيذ أمر محدد بصلاحيات المستخدم المستهدف دون البقاء داخل الجلسة'}
   ],
   examples:['su -','su - alice','su -c "systemctl restart nginx" root'],
  },
  {id:'pkexec',name:'pkexec',icon:'🛡️',level:4,category:'Privilege Escalation',
   desc:'تنفيذ أمر ككاتب وصاحب صلاحيات مستخدم آخر باستخدام إطار عمل Polkit (أداة تفاعلية رسومية ونصية)',
   syntax:'pkexec [OPTIONS] COMMAND',
   flags:[
     {flag:'--user USER',desc:'تحديد المستخدم المراد التنفيذ بصلاحياته بدلاً من root'}
   ],
   examples:['pkexec bash','pkexec --user alice id'],
   note:'تنبيه أمني: كانت أداة pkexec بؤرة لثغرة PwnKit الشهيرة (CVE-2021-4034) والتي تسمح لأي مستخدم عادي بالارتقاء لصلاحيات root فورياً دون كلمة مرور.'
  },
  {id:'setcap',name:'setcap',icon:'🏷️',level:4,category:'الصلاحيات المتقدمة',
   desc:'منح قدرات أمنية مخصصة ودقيقة للملفات التنفيذية (Linux Capabilities) لتجنب منح صلاحية root الكاملة',
   syntax:'setcap CAPABILITY_SPEC FILE...',
   flags:[
     {flag:'-r',desc:'إزالة كافة القدرات الأمنية الممنوحة للملف التنفيذي بالكامل'},
     {flag:'cap_net_bind_service=+ep',desc:'القدرة على الارتباط بالمنافذ المحمية (أقل من 1024) دون صلاحيات root'},
     {flag:'cap_net_raw=+ep',desc:'القدرة على إنشاء حزم شبكية خام (Raw Packets) مثل أداة ping'}
   ],
   examples:[
     'sudo setcap cap_net_bind_service=+ep /usr/bin/node # تشغيل نود على منفذ 80 دون sudo',
     'sudo setcap -r /usr/bin/node # إزالة الصلاحيات'
   ],
   note:'تنبيه أمني: احذر من منح قدرات مثل cap_setuid للملفات العادية؛ لأنها تسمح للمستخدمين بالارتقاء لصلاحية root بسهولة.'
  },
  {id:'getcap',name:'getcap',icon:'🔍',level:3,category:'الصلاحيات المتقدمة',
   desc:'عرض واستكشاف القدرات الأمنية الخاصة (Linux Capabilities) الممنوحة للملفات التنفيذية',
   syntax:'getcap [OPTIONS] FILE...',
   flags:[
     {flag:'-r',desc:'البحث تكرارياً في المجلدات الفرعية عن أي ملف تنفيذي يملك قدرات خاصة'},
     {flag:'-v',desc:'عرض تفصيلي للنتائج حتى لو لم يكن للملف أي قدرات خاصة'}
   ],
   examples:[
     'getcap /usr/bin/ping',
     'getcap -r /usr/bin/ 2>/dev/null # رصد كافة الملفات ذات القدرات الخاصة بمجلد البرامج'
   ],
  },
  {id:'capsh',name:'capsh',icon:'🛡️',level:4,category:'الصلاحيات المتقدمة',
   desc:'أداة فحص واختبار قدرات وصلاحيات الجلسة الحالية وتجربة إسقاطها لأغراض الأمان والتشخيص',
   syntax:'capsh [OPTIONS]',
   flags:[
     {flag:'--print',desc:'طباعة القدرات الحالية للجلسة والمجموعات المرتبطة بها بالتفصيل'},
     {flag:'--drop=CAP_NAME',desc:'تشغيل الجلسة مع إسقاط وإزالة قدرة محددة لاختبار سلوك البرنامج'}
   ],
   examples:['capsh --print','capsh --drop=cap_net_raw'],
  },
  {id:'runuser',name:'runuser',icon:'👤',level:3,category:'Privilege Escalation',
   desc:'تشغيل أمر بصلاحيات مستخدم ومجموعة محددة (يستخدم داخل سكريبتات النظام والـ boot لسرعته ولا يطلب كلمة مرور)',
   syntax:'runuser [OPTIONS] -u USER -- COMMAND',
   flags:[
     {flag:'-g GROUP',desc:'تحديد المجموعة الرئيسية للتنفيذ بها'},
     {flag:'-l',desc:'محاكاة كاملة لعملية الدخول للمستخدم (Login shell)'}
   ],
   examples:['sudo runuser -u alice -- whoami','sudo runuser -l alice -c "id"'],
  },
  {id:'visudo',name:'visudo',icon:'✏️',level:3,category:'System Administration',
   desc:'تعديل ملف /etc/sudoers بأمان مع التحقق من صحة القواعد برمجياً قبل الحفظ لتفادي تلف النظام',
   syntax:'visudo [OPTIONS]',
   flags:[
     {flag:'-c',desc:'التحقق من صحة صياغة وقواعد ملف السودورز الحالي دون فتحه للتعديل (Check only)'},
     {flag:'-f FILE',desc:'فتح وتعديل ملف سودورز مخصص بدلاً من الملف الرئيسي'}
   ],
   examples:['sudo visudo','sudo visudo -c'],
  },
  {id:'chage',name:'chage',icon:'⏰',level:3,category:'System Administration',
   desc:'إدارة وإعداد أوقات وتواريخ انتهاء صلاحيات كلمات المرور والحسابات للمستخدمين',
   syntax:'chage [OPTIONS] USER',
   flags:[
     {flag:'-l',desc:'عرض تقرير شامل بتواريخ انتهاء كلمة المرور والحساب للمستخدم المستهدف'},
     {flag:'-M DAYS',desc:'تحديد الحد الأقصى لأيام صلاحية كلمة المرور قبل المطالبة بتغييرها'},
     {flag:'-E DATE',desc:'تحديد تاريخ انتهاء وقفل حساب المستخدم بالكامل بصيغة YYYY-MM-DD'},
     {flag:'-d 0',desc:'إجبار المستخدم على تغيير كلمة المرور فوراً في أول تسجيل دخول قادم له'}
   ],
   examples:[
     'sudo chage -l alice',
     'sudo chage -M 90 alice # صلاحية كلمة المرور 90 يوماً فقط',
     'sudo chage -d 0 bob # تغيير إجباري لكلمة مرور bob'
   ],
  },
  {id:'gpasswd',name:'gpasswd',icon:'👥',level:3,category:'System Administration',
   desc:'إدارة مجموعات المستخدمين وإضافة أو حذف الأعضاء وتعيين مدراء للمجموعات',
   syntax:'gpasswd [OPTIONS] GROUP',
   flags:[
     {flag:'-a USER',desc:'إضافة مستخدم محدد كعضو في المجموعة (Add)'},
     {flag:'-d USER',desc:'حذف مستخدم محدد وإزالته من عضوية المجموعة (Delete)'},
     {flag:'-A USER_LIST',desc:'تعيين مستخدمين كمدراء لإدارة شؤون وأعضاء المجموعة (Administrators)'},
     {flag:'-M USER_LIST',desc:'إعادة تعيين كامل قائمة الأعضاء للمجموعة بالأسماء المحددة'}
   ],
   examples:[
     'sudo gpasswd -a alice docker # إضافة alice لمجموعة docker لتتمكن من إدارة الحاويات',
     'sudo gpasswd -d bob developers'
   ],
  },
  {id:'newgrp',name:'newgrp',icon:'🔄',level:2,category:'Bash Internals',
   desc:'الدخول وتغيير المجموعة النشطة الحالية للمستخدم أثناء الجلسة دون الحاجة لتسجيل الخروج',
   syntax:'newgrp [GROUP]',
   flags:[],
   examples:['newgrp docker','newgrp developers'],
   note:'عند تشغيل newgrp، يتم فتح shell فرعي جديد يمتلك صلاحيات المجموعة المحددة مباشرة.'
  },
  {id:'unshare',name:'unshare',icon:'📦',level:4,category:'Containers',
   desc:'تشغيل برنامج في بيئة ونطاق أسماء منفصل عن العمليات الأبوية (إنشاء نويات الحاويات يدوياً)',
   syntax:'unshare [OPTIONS] [COMMAND [ARG...]]',
   flags:[
     {flag:'-m / --mount',desc:'فصل مساحات ونقاط التوصيل (Mount namespace)'},
     {flag:'-u / --uts',desc:'فصل اسم الجهاز والـ hostname (UTS namespace)'},
     {flag:'-i / --ipc',desc:'فصل قنوات الاتصال الداخلي بين العمليات (IPC namespace)'},
     {flag:'-n / --net',desc:'فصل وتعيين بيئة شبكية منعزلة تماماً (Network namespace)'},
     {flag:'-p / --pid',desc:'فصل شجرة العمليات لتبدأ العمليات من PID 1 داخل البيئة (PID namespace)'},
     {flag:'-f',desc:'إجبار unshare على تشغيل العملية كابنة فرعية لضمان تطبيق قيود الـ PID namespace'},
     {flag:'--map-root-user',desc:'مطابقة مستخدم الجلسة الحالي ليكون هو الـ root الافتراضي داخل السجن المنعزل'}
   ],
   examples:[
     'unshare -m -u -n -p -f --map-root-user /bin/bash # الدخول في سجن منعزل تماماً شبكياً وعملياتياً',
     'sudo unshare -n ip a # تشغيل أوامر شبكية في كرت شبكة افتراضي ومنعزل'
   ],
   note:'تعتبر أداة unshare هي حجر الأساس الذي تُبنى عليه تقنيات الحاويات الحديثة مثل Docker و LXC.'
  },
  {id:'nsenter',name:'nsenter',icon:'🚪',level:4,category:'Containers',
   desc:'الدخول والربط بنطاقات الأسماء (Namespaces) الخاصة بعملية أخرى قيد التشغيل (مثل الدخول لحاوية نشطة)',
   syntax:'nsenter [OPTIONS] [COMMAND [ARG...]]',
   flags:[
     {flag:'-t PID',desc:'تحديد رقم العملية (PID) المستهدفة للدخول في نطاقها الأمني (إجباري)'},
     {flag:'-m',desc:'الدخول في نطاق توصيل الأقراص (Mount)'},
     {flag:'-n',desc:'الدخول في نطاق الشبكة الخاص بالعملية المستهدفة'},
     {flag:'-p',desc:'الدخول في نطاق العمليات ورؤية شجرتها'}
   ],
   examples:[
     'sudo nsenter -t 1234 -m -n /bin/bash # الدخول لشبكة وأقراص العملية 1234 والتحكم بها',
     'sudo nsenter -t $(docker inspect -f "{{.State.Pid}}" mycontainer) -n ip a'
   ],
  },
  {id:'pivot_root',name:'pivot_root',icon:'🔄',level:4,category:'Containers',
   desc:'تغيير وتدوير مجلد الجذر (Root Filesystem) الحالي ونقله لمسار آخر وجعل المسار الجديد هو جذر النظام',
   syntax:'pivot_root NEW_ROOT PUT_OLD',
   flags:[],
   examples:['sudo pivot_root /mnt/new_root /mnt/new_root/old_root'],
  },
  {id:'newuidmap',name:'newuidmap',icon:'👤',level:4,category:'Containers',
   desc:'إعداد وتعيين مطابقة معرّفات المستخدمين (UID maps) لنطاقات الأسماء المخصصة للمستخدمين غير المتميزين (Rootless containers)',
   syntax:'newuidmap PID UID LOWERUID COUNT [UID LOWERUID COUNT ...]',
   flags:[],
   examples:['newuidmap 2345 0 100000 65536'],
  },
  {id:'newgidmap',name:'newgidmap',icon:'👥',level:4,category:'Containers',
   desc:'إعداد وتعيين مطابقة معرّفات المجموعات (GID maps) لنطاقات الأسماء للمستخدمين غير المتميزين',
   syntax:'newgidmap PID GID LOWERGID COUNT [GID LOWERGID COUNT ...]',
   flags:[],
   examples:['newgidmap 2345 0 100000 65536'],
  },
  {id:'passwd',name:'passwd',icon:'🔑',level:2,category:'System Administration',
   desc:'تعديل وتغيير كلمة مرور المستخدم الحالي أو مستخدمين آخرين بالنظام',
   syntax:'passwd [OPTIONS] [USER]',
   flags:[
     {flag:'-d',desc:'حذف كلمة المرور للمستخدم وجعل حسابه يعمل بدون كلمة مرور (خطر جداً!)'},
     {flag:'-l',desc:'قفل حساب المستخدم المحدد لمنعه من تسجيل الدخول (Lock)'},
     {flag:'-u',desc:'إلغاء قفل حساب المستخدم وتفعيل الدخول مجدداً (Unlock)'},
     {flag:'-e',desc:'إجبار المستخدم على تغيير كلمة المرور فوراً في الدخول التالي'}
   ],
   examples:['passwd','sudo passwd alice','sudo passwd -l bob'],
  },
  {id:'mount',name:'mount',icon:'🔌',level:2,category:'System Administration',
   desc:'توصيل ودمج أنظمة الملفات والأقراص في شجرة أدلة النظام الحالية (Mount point)',
   syntax:'mount [OPTIONS] DEVICE DIR',
   flags:[
     {flag:'-t TYPE',desc:'تحديد نوع نظام الملفات الخاص بالقرص (مثل ext4, ntfs, vfat)'},
     {flag:'-o OPTIONS',desc:'تحديد خيارات إضافية للتوصيل (مثل ro للقراءة فقط، noexec لمنع تشغيل الملفات التنفيذية)'},
     {flag:'-a',desc:'توصيل كافة الأجهزة المعرفة داخل ملف /etc/fstab تلقائياً'}
   ],
   examples:[
     'sudo mount /dev/sdb1 /mnt/usb',
     'sudo mount -o ro,noexec /dev/sdc1 /secure_mount # حماية القسم الموصول من تشغيل السكريبتات التنفيذية'
   ],
   note:'دفاعياً: إضافة خيارات noexec, nosuid, nodev في ملف fstab للأقسام العامة (مثل /tmp و /dev/shm) يمنع هجمات تشغيل الملفات التنفيذية المشبوهة.'
  }
]);
