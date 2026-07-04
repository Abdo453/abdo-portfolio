// ==========================================
// 2. BASH INTERNALS & BUILTINS (bash.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'exec',name:'exec',icon:'🚀',level:3,category:'Bash Internals',
   desc:'استبدال غلاف Bash الحالي بالكامل بالأمر الجديد أو إدارة قنوات الاتصال والـ File Descriptors للجلسة',
   syntax:'exec [COMMAND] [ARGUMENTS]',
   flags:[
     {flag:'exec -c',desc:'تشغيل الأمر مع تفريغ المتغيرات البيئية بالكامل'},
     {flag:'exec -l',desc:'تمرير المعامل الأول كـ login shell (تطبيق بروفايل الدخول)'},
     {flag:'exec N<FILE',desc:'فتح ملف للقراءة على الـ File Descriptor رقم N'},
     {flag:'exec N>FILE',desc:'فتح ملف للكتابة على الـ File Descriptor رقم N'}
   ],
   examples:[
     'exec htop # استبدال نافذة الغلاف الحالية ببرنامج htop وموت الغلاف عند الخروج',
     'exec 3<>/dev/tcp/10.0.0.1/80 # فتح قناة تواصل كاملة للشبكة على القناة رقم 3'
   ],
   note:'تنبيه أمني: عند تشغيل exec command، يتم إنهاء جلسة الـ terminal الحالية بمجرد انتهاء تشغيل هذا الأمر.'
  },
  {id:'source',name:'source',icon:'🔌',level:2,category:'Bash Internals',
   desc:'قراءة وتطبيق الأوامر والمتغيرات من ملف معين في بيئة الغلاف الحالي مباشرة (يرمز له بنقطة .)',
   syntax:'source FILE [ARGUMENTS]',
   flags:[],
   examples:['source ~/.bashrc','source config.env','. ./setup.sh'],
   note:'الفرق بين تشغيل سكريبت بـ ./script وتشيغله بـ source هو أن ./script يفتح عملية فرعية (Subshell)، بينما source يغير في الـ shell الحالي مباشرة.'
  },
  {id:'declare',name:'declare',icon:'🏷️',level:3,category:'Bash Internals',
   desc:'تعيين وتعديل متغيرات الغلاف وخصائصها (مثل جعل المتغير رقماً أو للقراءة فقط)',
   syntax:'declare [OPTIONS] VAR=VALUE',
   flags:[
     {flag:'-i',desc:'تعيين المتغير كـ Integer (حساب العمليات الرياضية تلقائياً)'},
     {flag:'-r',desc:'تعيين المتغير كـ Read-only (لا يمكن تعديله أو حذفه لاحقاً)'},
     {flag:'-x',desc:'تصدير المتغير للعمليات الفرعية (مثل export)'},
     {flag:'-a',desc:'تعيين المتغير كـ Indexed Array (مصفوفة عادية)'},
     {flag:'-A',desc:'تعيين المتغير كـ Associative Array (مصفوفة مفتاح وقيمة)'},
     {flag:'-f',desc:'عرض أسماء ودوال الغلاف المعرفة فقط'}
   ],
   examples:[
     'declare -r MY_KEY="secret" # متغير أمان غير قابل للتزوير',
     'declare -i result=5+10 # القيمة ستكون 15 رياضياً',
     'declare -A config=([port]=80 [ip]=127.0.0.1)'
   ],
  },
  {id:'readonly',name:'readonly',icon:'🔒',level:2,category:'Bash Internals',
   desc:'جعل متغيرات الغلاف غير قابلة للتغيير أو الحذف نهائياً أثناء عمر الجلسة الحالية',
   syntax:'readonly [OPTIONS] VAR',
   flags:[
     {flag:'-f',desc:'تعيين دالة (Function) معينة كـ Read-only لمنع تخريبها'},
     {flag:'-p',desc:'طباعة كافة المتغيرات للقراءة فقط المسجلة حالياً بالجلسة'}
   ],
   examples:['readonly USER_ID="1001"','readonly -f my_security_func'],
   note:'تنبيه أمني: المتغير المعرف بـ readonly لا يمكن إزالته حتى باستخدام أمر unset.'
  },
  {id:'local',name:'local',icon:'📍',level:2,category:'Bash Internals',
   desc:'إنشاء وتحديد متغيرات محلية النطاق داخل الدوال فقط لتجنب تداخل المتغيرات العالمية',
   syntax:'local [OPTIONS] VAR=VALUE',
   flags:[
     {flag:'local -i',desc:'تحديد متغير محلي رقمي'}
   ],
   examples:[
     `function test() {\n  local my_var="local_val"\n  echo $my_var\n}`
   ],
  },
  {id:'export',name:'export',icon:'📤',level:2,category:'Bash Internals',
   desc:'تصدير متغيرات الغلاف الحالي وجعلها متاحة لكافة العمليات والـ Subshells المفتوحة من الجلسة',
   syntax:'export [OPTIONS] VAR=VALUE',
   flags:[
     {flag:'-n',desc:'إزالة حالة التصدير وجعل المتغير خاصاً بالـ shell الحالي فقط'},
     {flag:'-p',desc:'طباعة جميع المتغيرات المصدرة للبيئة حالياً'}
   ],
   examples:['export PATH=$PATH:/opt/bin','export TERM="xterm-256color"'],
  },
  {id:'unset',name:'unset',icon:'🧹',level:2,category:'Bash Internals',
   desc:'حذف وإلغاء تسجيل المتغيرات أو الدوال المعرفة من ذاكرة الغلاف الحالي',
   syntax:'unset [OPTIONS] VAR_NAME',
   flags:[
     {flag:'-v',desc:'حذف متغير محدد (الافتراضي)'},
     {flag:'-f',desc:'حذف دالة محددة بالكامل من ذاكرة الجلسة'}
   ],
   examples:['unset temp_var','unset -f old_function'],
  },
  {id:'trap',name:'trap',icon:'🪤',level:4,category:'Shell Tricks',
   desc:'التقاط وتتبع إشارات النظام (Signals) وتنفيذ كود أو أمر مخصص عند حدوثها (مثالي للتنظيف الأمن)',
   syntax:'trap [COMMAND] [SIGNALS...]',
   flags:[
     {flag:'trap -p',desc:'عرض جميع الفخاخ والإشارات المسجلة حالياً'},
     {flag:'trap "" SIGINT',desc:'تجاهل إشارة المقاطعة Ctrl+C تماماً'},
     {flag:'trap - SIGINT',desc:'إعادة ضبط التقاط الإشارة للوضع الافتراضي'}
   ],
   examples:[
     'trap "rm -f /tmp/temp_*; exit" EXIT # حذف الملفات المؤقتة بمجرد إغلاق السكريبت',
     'trap "echo \'غير مسموح بالمقاطعة!\'" SIGINT # منع المستخدم من إيقاف السكريبت بـ Ctrl+C'
   ],
   note:'دفاعياً: تُستخدم الـ traps لتنظيف آثار ملفات التشفير أو التخزين المؤقت، وهجومياً يمكن استخدامها لتتبع أحداث الإغلاق لكتابة ملفات الثبات.'
  },
  {id:'wait',name:'wait',icon:'⏳',level:2,category:'Bash Internals',
   desc:'إيقاف سكريبت الـ Bash مؤقتاً حتى تنتهي العمليات المشغلة بالخلفية',
   syntax:'wait [PID | JOB_ID]',
   flags:[
     {flag:'-n',desc:'الانتظار حتى تنتهي أي عملية واحدة فقط من العمليات الحالية ثم الاستمرار'}
   ],
   examples:['./backup.sh &','wait $! # الانتظار حتى ينتهي الباك اب الفعلي'],
   note:'الرمز $! يمثل الـ PID الخاص بآخر عملية تم تشغيلها بالخلفية.'
  },
  {id:'disown',name:'disown',icon:'🔌',level:3,category:'Bash Internals',
   desc:'إزالة العملية من قائمة المهام المدارة للغلاف الحالي، لمنع قتلها عند إغلاق الـ Terminal',
   syntax:'disown [OPTIONS] [JOB_ID...]',
   flags:[
     {flag:'-h',desc:'منع إرسال إشارة SIGHUP للعملية عند خروج الغلاف دون إزالتها من القائمة'},
     {flag:'-a',desc:'إزالة جميع المهام النشطة دفعة واحدة'},
     {flag:'-r',desc:'إزالة المهام قيد التشغيل فقط'}
   ],
   examples:['python server.py &','disown %1 # فك الارتباط ليبقى الخادم يعمل'],
  },
  {id:'alias',name:'alias',icon:'🏷️',level:1,category:'Shell Tricks',
   desc:'تعريف أسماء مستعارة واختصارات للأوامر الطويلة والمكررة لتسهيل العمل',
   syntax:'alias NAME="COMMAND"',
   flags:[
     {flag:'-p',desc:'عرض جميع الأسماء المستعارة الحالية بالجلسة'}
   ],
   examples:[
     'alias ll="ls -la"',
     'alias lvextend_all="sudo lvextend -l +100%FREE -r"'
   ],
   note:'لجعل الاختصار دائماً، أضفه إلى نهاية ملف ~/.bashrc أو ~/.zshrc.'
  },
  {id:'unalias',name:'unalias',icon:'🧹',level:1,category:'Shell Tricks',
   desc:'حذف الأسماء المستعارة والاختصارات المعرفة بالنظام',
   syntax:'unalias NAME',
   flags:[
     {flag:'-a',desc:'حذف وإلغاء جميع الأسماء المستعارة تماماً'}
   ],
   examples:['unalias ll','unalias -a'],
  },
  {id:'shopt',name:'shopt',icon:'⚙️',level:3,category:'Bash Internals',
   desc:'عرض وتفعيل أو إيقاف خيارات سلوك الـ Shell الاختيارية (Shell Options)',
   syntax:'shopt [-pqsu] [OPTNAME...]',
   flags:[
     {flag:'-s',desc:'تفعيل الخيار المحدد (Set)'},
     {flag:'-u',desc:'إلغاء تفعيل الخيار المحدد (Unset)'},
     {flag:'extglob',desc:'تفعيل الأنماط المتقدمة للـ Globbing (مثل حذف كل شيء ما عدا نوع محدد)'},
     {flag:'autocd',desc:'الانتقال للمجلد تلقائياً بكتابة اسمه فقط دون الحاجة لكتابة cd'}
   ],
   examples:[
     'shopt -s autocd',
     'shopt -s extglob # تفعيل المطابقة المتقدمة للملفات'
   ],
  },
  {id:'printf',name:'printf',icon:'💬',level:2,category:'Bash Internals',
   desc:'طباعة وعرض النصوص المنسقة بشكل دقيق (أقوى وأكثر أماناً من echo)',
   syntax:'printf FORMAT [ARGUMENTS]',
   flags:[],
   examples:[
     'printf "اسم المستخدم: %s\\nرقم المعرف: %d\\n" "alice" 1001',
     'printf "%02d\\n" 5 # طباعة الرقم مسبوقاً بصفر (05)'
   ],
   note:'تنبيه أمني: استخدام echo لعرض مدخلات المستخدمين قد يكون عرضة لثغرات حقن الأوامر، بينما printf آمن تماماً.'
  },
  {id:'read',name:'read',icon:'⌨️',level:1,category:'Bash Internals',
   desc:'قراءة سطر إدخال قياسي من المستخدم وتخزينه في متغير',
   syntax:'read [OPTIONS] VAR_NAME',
   flags:[
     {flag:'-p PROMPT',desc:'عرض رسالة توجيهية للمستخدم قبل الإدخال'},
     {flag:'-s',desc:'وضع صامت (Silent) - لا يعرض الحروف أثناء الكتابة (مثالي لكلمات المرور)'},
     {flag:'-t SECONDS',desc:'تحديد مهلة زمنية للانتظار قبل الإلغاء وتكملة السكريبت'},
     {flag:'-a ARRAY',desc:'قراءة الكلمات المدخلة وتخزينها كمصفوفة تفاعلية'}
   ],
   examples:[
     'read -p "أدخل الاسم: " username',
     'read -s -p "أدخل كلمة المرور: " password'
   ],
  },
  {id:'mapfile',name:'mapfile',icon:'📑',level:3,category:'Bash Internals',
   desc:'قراءة أسطر من المدخلات القياسية أو ملف وتخزينها مباشرة في مصفوفة (Array) بسرعة فائقة',
   syntax:'mapfile [OPTIONS] ARRAY_NAME',
   flags:[
     {flag:'-t',desc:'حذف علامة السطر الجديد (\\n) من نهاية كل قيمة مخزنة بالمصفوفة'},
     {flag:'-n LIMIT',desc:'قراءة عدد محدد من الأسطر فقط ثم التوقف'}
   ],
   examples:[
     'mapfile -t lines < /etc/passwd # تخزين سطور ملف passwd بالكامل في مصفوفة lines'
   ],
  },
  {id:'ulimit',name:'ulimit',icon:'🚦',level:3,category:'System Administration',
   desc:'عرض وتحديد حدود الموارد المتاحة للمستخدم والـ Shell الحالي (مثل الذاكرة وحجم الملفات)',
   syntax:'ulimit [OPTIONS] [LIMIT]',
   flags:[
     {flag:'-a',desc:'عرض كافة القيود المفروضة حالياً على الجلسة'},
     {flag:'-u',desc:'تحديد الحد الأقصى لعدد العمليات المتاحة للمستخدم (Max user processes)'},
     {flag:'-f',desc:'تحديد الحد الأقصى لحجم الملفات التي يمكن إنشاؤها بالبايت'},
     {flag:'-n',desc:'تحديد عدد ملفات الـ File Descriptors المفتوحة بالوقت نفسه'}
   ],
   examples:['ulimit -a','ulimit -u 1000 # تحديد عمليات المستخدم لـ 1000 عملية فقط'],
   note:'دفاعياً: تعيين قيم ulimit صحيحة في /etc/security/limits.conf يمنع ثغرات الـ Fork Bomb من تجميد الخادم بالكامل.'
  }
]);
