// ==========================================
// 7. BINARY ANALYSIS & DEBUGGING (binary.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'readelf',name:'readelf',icon:'🧬',level:4,category:'Malware Analysis',
   desc:'عرض وتحليل محتويات وترويسات وهيكلية الملفات القابلة للتنفيذ بصيغة ELF (Executable and Linkable Format)',
   syntax:'readelf [OPTIONS] ELF_FILE',
   flags:[
     {flag:'-h',desc:'عرض الترويسة الرئيسية للملف (Header) - يوضح معمارية المعالج ونوع الملف'},
     {flag:'-l',desc:'عرض ترويسات البرنامج (Program Headers) والـ segments المحملة بالذاكرة'},
     {flag:'-S',desc:'عرض جدول الأقسام (Section Headers) وتفاصيل الـ sections بالملف'},
     {flag:'-s',desc:'عرض جدول الرموز (Symbol Table) وأسماء الدوال والمتغيرات المستخدمة بالبرنامج'},
     {flag:'-d',desc:'عرض قسم المكتبات الديناميكية المطلوبة للتشغيل (Dynamic section)'}
   ],
   examples:['readelf -h /bin/ls','readelf -d malware.elf','readelf -s vulnerable_app'],
   note:'تحليل البرمجيات الخبيثة: فحص جدول الرموز (-s) يعطيك فكرة عن أسماء الدوال التي استدعاها المبرمج لتخمين وظيفة البرنامج.'
  },
  {id:'objdump',name:'objdump',icon:'🧬',level:4,category:'Reverse Engineering',
   desc:'تفكيك الملفات التنفيذية وعرض كود التجميع (Disassembler) وقراءة محتويات الـ Sections',
   syntax:'objdump [OPTIONS] FILE',
   flags:[
     {flag:'-d',desc:'تفكيك الأقسام البرمجية القابلة للتنفيذ فقط وعرض لغة التجميع (Disassemble)'},
     {flag:'-D',desc:'تفكيك كافة أقسام الملف بلا استثناء بما في ذلك البيانات والأكواد'},
     {flag:'-s',desc:'عرض محتوى الأقسام بالكامل مدمجاً بصيغة الهكس والنصوص (Hex+ASCII)'},
     {flag:'-M intel',desc:'استخدام معيار إنتل (Intel syntax) لعرض لغة التجميع بدل معيار AT&T'},
     {flag:'-x',desc:'عرض جميع ترويسات وجداول ورموز الملف بالكامل دفعة واحدة'}
   ],
   examples:['objdump -d -M intel crackme','objdump -s -j .rodata suspected_bin # عرض النصوص الثابتة والمشفرة بالملف'],
  },
  {id:'nm',name:'nm',icon:'🔎',level:4,category:'Reverse Engineering',
   desc:'سرد وعرض الرموز (Symbols) والدوال والمتغيرات المعرفة داخل الملفات التنفيذية والمكتبات',
   syntax:'nm [OPTIONS] FILE',
   flags:[
     {flag:'-a',desc:'عرض كافة الرموز بما في ذلك الرموز الخاصة بمصحح الأخطاء (Debugger symbols)'},
     {flag:'-u',desc:'عرض الرموز غير المعرفة فقط (الدوال المستدعاة من مكتبات خارجية)'},
     {flag:'-D',desc:'عرض الرموز الديناميكية (Dynamic symbols) بدلاً من الرموز العادية'}
   ],
   examples:['nm /bin/ls','nm -u vulnerable_app','nm -D libhelper.so'],
  },
  {id:'ldd',name:'ldd',icon:'🔗',level:3,category:'Malware Analysis',
   desc:'عرض المكتبات الديناميكية المشتركة (Shared Libraries) المطلوبة لتشغيل ملف تنفيذي معين',
   syntax:'ldd [OPTIONS] FILE',
   flags:[
     {flag:'-u',desc:'عرض المكتبات غير المستخدمة والمستدعاة بدون حاجة'},
     {flag:'-v',desc:'عرض تفصيلي متكامل يتضمن إصدارات المكتبات المطلوبة والـ Dependencies'}
   ],
   examples:['ldd /bin/bash','ldd -v /usr/sbin/nginx'],
   note:'تنبيه أمني: لا تقم أبداً بتشغيل ldd على ملف تنفيذي مجهول أو مشبوه؛ لأن ldd قد يقوم بتنفيذ الملف برمجياً في بعض الحالات لجلب المتغيرات، استخدم readelf -d بدلاً منه للأمان.'
  },
  {id:'size',name:'size',icon:'📊',level:2,category:'Reverse Engineering',
   desc:'عرض أحجام أقسام الملف التنفيذي (.text, .data, .bss) والإجمالي الكلي لها بالبايت',
   syntax:'size [OPTIONS] FILE...',
   flags:[
     {flag:'-A',desc:'عرض تفصيلي لأحجام كل قسم فرعي بالملف'},
     {flag:'-m',desc:'عرض الأحجام بنظام المخرجات المتوافق مع نظام System V'}
   ],
   examples:['size /bin/ls','size -A suspected_bin'],
  },
  {id:'strip',name:'strip',icon:'✂️',level:3,category:'Reverse Engineering',
   desc:'حذف رموز مصحح الأخطاء (Debugging Symbols) من الملفات التنفيذية لتقليل حجمها وتصعيب هندستها عكسياً',
   syntax:'strip [OPTIONS] FILE...',
   flags:[
     {flag:'--strip-all',desc:'حذف كافة الرموز وجداول الرموز بالكامل من الملف'},
     {flag:'-g',desc:'حذف رموز مصحح الأخطاء فقط مع الحفاظ على الرموز الأساسية للتشغيل'}
   ],
   examples:['strip my_compiled_app','strip --strip-all malware_test'],
   note:'المخترقون ومطورو البرمجيات يطبقون أمر strip لمنع المهندسين العكسيين من رؤية أسماء الدوال والمتغيرات الحقيقية بالبرنامج.'
  },
  {id:'objcopy',name:'objcopy',icon:'🔄',level:4,category:'Reverse Engineering',
   desc:'نسخ وتحويل الملفات التنفيذية وتعديل محتوياتها وأقسامها وإضافة أو إزالة أقسام معينة بالكامل',
   syntax:'objcopy [OPTIONS] INFILE [OUTFILE]',
   flags:[
     {flag:'-O binary',desc:'تصدير واستخراج المحتوى الخام للملف كملف ثنائي صافي (Raw binary)'},
     {flag:'--add-section NAME=FILE',desc:'حقن وإضافة قسم جديد بالكامل للملف وحشو محتوياته من ملف خارجي'},
     {flag:'--remove-section=NAME',desc:'حذف قسم محدد بالكامل من الملف التنفيذي'}
   ],
   examples:[
     'objcopy -O binary app.elf app.bin',
     'objcopy --remove-section=.comment vulnerable_app'
   ],
  },
  {id:'od',name:'od (Octal Dump)',icon:'🔢',level:3,category:'Digital Forensics',
   desc:'عرض وتفريغ محتويات الملفات الثنائية بصيغة ثمانية أو سداسية عشر أو أحرف مقروءة',
   syntax:'od [OPTIONS] [FILE]',
   flags:[
     {flag:'-t x1',desc:'عرض المحتوى بنظام الهكس بايت بايت (Hexadecimal)'},
     {flag:'-c',desc:'عرض المحتوى كأحرف مقروءة (مع الرموز الخاصة مثل \\n, \\t)'},
     {flag:'-An',desc:'إلغاء طباعة عناوين السطور الجانبية وعرض البيانات فقط'}
   ],
   examples:['od -c config.bin','od -t x1 -An file.dat'],
  },
  {id:'sha256sum',name:'sha256sum',icon:'🔐',level:1,category:'Malware Analysis',
   desc:'حساب ومقارنة البصمة الرقمية للملفات باستخدام خوارزمية SHA256 للتحقق من سلامتها والتأكد من عدم تعديلها',
   syntax:'sha256sum [OPTIONS] [FILE...]',
   flags:[
     {flag:'-c',desc:'التحقق من قائمة بصمات مكتوبة في ملف والتأكد من مطابقتها الحالية (Check)'},
     {flag:'-b',desc:'قراءة الملف بالصيغة الثنائية (Binary mode) - افتراضي على معظم الأنظمة'}
   ],
   examples:[
     'sha256sum suspected_malware.exe # جلب التوقيع للبحث عنه في موقع VirusTotal',
     'sha256sum -c checksums.txt'
   ],
  },
  {id:'md5sum',name:'md5sum',icon:'🔐',level:1,category:'Malware Analysis',
   desc:'حساب البصمة الرقمية للملفات بخوارزمية MD5 (سريع ولكن لم يعد آمناً للتشفير بسبب ثغرات التصادم)',
   syntax:'md5sum [FILE]',
   flags:[],
   examples:['md5sum backup.zip'],
  },
  {id:'perf',name:'perf',icon:'📈',level:4,category:'Performance Tuning',
   desc:'الأداة الاحترافية المدمجة في نواة لينكس لمراقبة الأداء، وعمل البروفايل، وتحليل استهلاك الـ CPU بالدوال',
   syntax:'perf [COMMAND] [OPTIONS]',
   flags:[
     {flag:'stat CMD',desc:'تشغيل أمر وعرض إحصائيات دقيقة عن استهلاك العتاد وعدد دورات المعالج'},
     {flag:'record CMD',desc:'تسجيل وتحليل أداء البرنامج وحفظ النتائج في ملف perf.data'},
     {flag:'report',desc:'قراءة ملف perf.data وعرض واجهة تفاعلية تحلل الدوال الأكثر استهلاكاً للمعالج'}
   ],
   examples:[
     'perf stat ls',
     'sudo perf record -p 1234 # مراقبة أداء عملية حية',
     'sudo perf report'
   ],
  }
]);
