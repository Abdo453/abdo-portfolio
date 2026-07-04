// ==========================================
// 1. BASICS & FILESYSTEM COMMANDS (basics.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'pwd',name:'pwd',icon:'📍',level:1,category:'Linux Basics',
   desc:'طباعة مسار المجلد الحالي الفعلي (Print Working Directory)',
   syntax:'pwd [OPTIONS]',
   flags:[
     {flag:'-P',desc:'عرض المسار الفيزيائي الفعلي متخطياً الروابط الرمزية (Symbolic Links)'},
     {flag:'-L',desc:'عرض المسار المنطقي (Logical path) الذي يتضمن الروابط الرمزية (الافتراضي)'}
   ],
   examples:['pwd','pwd -P'],
   note:'تنبيه أمني: قد يختلف المسار المعروض إذا كنت داخل رابط رمزي، استخدم -P دوماً لمعرفة الموضع الحقيقي.'
  },
  {id:'ls',name:'ls',icon:'📂',level:1,category:'Files & Directories',
   desc:'عرض الملفات والمجلدات ومحتويات الدليل الحالي مع خصائصها',
   syntax:'ls [OPTIONS] [PATH]',
   flags:[
     {flag:'-l',desc:'عرض طويل يتضمن الأذونات، الحجم، المالك، وتاريخ التعديل'},
     {flag:'-a',desc:'عرض كل شيء بما في ذلك الملفات المخفية التي تبدأ بنقطة (.)'},
     {flag:'-h',desc:'عرض حجم الملفات بصيغة مقروءة للبشر (KB, MB, GB)'},
     {flag:'-R',desc:'عرض المجلدات الفرعية تكرارياً (Recursive)'},
     {flag:'-t',desc:'الترتيب حسب وقت التعديل الأحدث أولاً'},
     {flag:'-S',desc:'الترتيب حسب الحجم من الأكبر للأصغر'},
     {flag:'-i',desc:'عرض رقم الـ inode الفريد لكل ملف'}
   ],
   examples:['ls -la','ls -lhS /var/log','ls -lti'],
   note:'الـ inode المعروض بـ -i يفيدك في الكشف عن الروابط الصلبة والملفات المكررة.'
  },
  {id:'cd',name:'cd',icon:'🚶',level:1,category:'Linux Basics',
   desc:'الانتقال وتغيير دليل العمل الحالي (Change Directory)',
   syntax:'cd [PATH]',
   flags:[
     {flag:'cd ~',desc:'الانتقال إلى المجلد الرئيسي للمستخدم الحالي (Home)'},
     {flag:'cd ..',desc:'الانتقال خطوة واحدة لأعلى (المجلد الأب)'},
     {flag:'cd -',desc:'الانتقال للمجلد الذي كنت فيه قبل المجلد الحالي'}
   ],
   examples:['cd /etc/ssh','cd ~/Documents','cd -'],
  },
  {id:'mkdir',name:'mkdir',icon:'📁',level:1,category:'Files & Directories',
   desc:'إنشاء مجلدات جديدة بالنظام',
   syntax:'mkdir [OPTIONS] DIR_NAME',
   flags:[
     {flag:'-p',desc:'إنشاء المجلدات الأبوية المتداخلة تلقائياً إن لم تكن موجودة'},
     {flag:'-m MODE',desc:'تعيين الصلاحيات الرقمية للمجلد أثناء الإنشاء مباشرة'}
   ],
   examples:['mkdir myproject','mkdir -p /tmp/apps/logs/nginx','mkdir -m 700 private_keys'],
  },
  {id:'rmdir',name:'rmdir',icon:'🗑️',level:1,category:'Files & Directories',
   desc:'حذف المجلدات الفارغة فقط من النظام للسلامة الأجهزة',
   syntax:'rmdir [OPTIONS] DIR',
   flags:[
     {flag:'-p',desc:'حذف المجلد والمجلدات الأبوية له إن كانت فارغة أيضاً تكرارياً'}
   ],
   examples:['rmdir old_empty','rmdir -p parent/child/grandchild'],
  },
  {id:'touch',name:'touch',icon:'✏️',level:1,category:'Files & Directories',
   desc:'إنشاء ملف فارغ جديد أو تحديث أوقات الوصول والتعديل لملف موجود',
   syntax:'touch [OPTIONS] FILE',
   flags:[
     {flag:'-a',desc:'تغيير وقت الوصول فقط (Access time)'},
     {flag:'-m',desc:'تغيير وقت التعديل فقط (Modification time)'},
     {flag:'-t STAMP',desc:'تحديد تاريخ ووقت مخصصين بصيغة [[CC]YY]MMDDhhmm[.ss]'}
   ],
   examples:['touch app.log','touch -m -t 202601010000 file.txt'],
  },
  {id:'cp',name:'cp',icon:'📑',level:1,category:'Files & Directories',
   desc:'نسخ الملفات والمجلدات من مكان لآخر',
   syntax:'cp [OPTIONS] SOURCE DEST',
   flags:[
     {flag:'-r',desc:'نسخ المجلدات ومحتوياتها تكرارياً (Recursive)'},
     {flag:'-p',desc:'الحفاظ على مالك الملف وصلاحياته وتواريخ الوصول والتعديل'},
     {flag:'-a',desc:'وضع الأرشفة (يجمع -r, -p وانسخ الروابط الرمزية كما هي)'},
     {flag:'-i',desc:'سؤال المستخدم قبل استبدال أي ملف موجود مسبقاً'}
   ],
   examples:['cp config.json /etc/','cp -a /var/www/html/ /backup/www/','cp -i *.txt /tmp/'],
  },
  {id:'mv',name:'mv',icon:'✂️',level:1,category:'Files & Directories',
   desc:'نقل أو إعادة تسمية الملفات والمجلدات',
   syntax:'mv [OPTIONS] SOURCE DEST',
   flags:[
     {flag:'-i',desc:'السؤال قبل الكتابة فوق ملف موجود'},
     {flag:'-f',desc:'إجبار الاستبدال دون السؤال أو تحذيرات'},
     {flag:'-u',desc:'النقل فقط إذا كان الملف المصدر أحدث من الملف الهدف أو غير موجود'}
   ],
   examples:['mv old.txt new.txt','mv -u *.log /var/log/app/'],
  },
  {id:'rm',name:'rm',icon:'🗑️',level:1,category:'Files & Directories',
   desc:'حذف الملفات والمجلدات بشكل نهائي (لا توجد سلة مهملات!)',
   syntax:'rm [OPTIONS] FILE...',
   flags:[
     {flag:'-r',desc:'حذف المجلدات ومحتوياتها بالكامل تكرارياً'},
     {flag:'-f',desc:'حذف إجباري دون طلب تأكيد أو عرض تنبيهات عن عدم الوجود'},
     {flag:'-i',desc:'طلب تأكيد تفاعلي قبل حذف كل ملف'}
   ],
   examples:['rm temp.txt','rm -rf /tmp/cache/','rm -i *.pdf'],
   note:'تنبيه أمني: أمر rm -rf خطير للغاية وقد يدمر النظام بالكامل إذا تم تشغيله كـ root على مسار خاطئ.'
  },
  {id:'stat',name:'stat',icon:'📊',level:2,category:'Digital Forensics',
   desc:'عرض تفاصيل الصلاحيات وأرقام الـ inode والـ Timestamps الثلاثية للملف (MAC: Modify, Access, Change)',
   syntax:'stat [OPTIONS] FILE',
   flags:[
     {flag:'-f',desc:'عرض معلومات نظام الملفات (Filesystem) الحاضن للملف بدل الملف نفسه'},
     {flag:'-c FORMAT',desc:'تخصيص صيغة المخرجات لعرض أجزاء محددة (مثل الصلاحيات الرقمية %a)'}
   ],
   examples:['stat /etc/shadow','stat -c "%a %U %G" /etc/passwd'],
   note:'تحليل جنائي: تاريخ الـ Change (ctime) يتغير عند تغيير الصلاحيات أو المالك ولا يمكن للمستخدم العادي تزويره كـ mtime.'
  },
  {id:'findmnt',name:'findmnt',icon:'🔍',level:2,category:'System Administration',
   desc:'البحث وعرض الأقراص الموصولة بالنظام (Mount points) بطريقة مهيكلة',
   syntax:'findmnt [OPTIONS]',
   flags:[
     {flag:'-l',desc:'عرض القائمة بشكل مسطح بدلاً من الشجرة الافتراضية'},
     {flag:'-s',desc:'قراءة مواضع التوصيل من ملف /etc/fstab فقط'},
     {flag:'-t TYPE',desc:'فلترة المعروض حسب نوع نظام الملفات (مثل ext4, vfat)'}
   ],
   examples:['findmnt','findmnt -t ext4','findmnt -s'],
  },
  {id:'df',name:'df',icon:'💾',level:1,category:'System Administration',
   desc:'عرض المساحة المستخدمة والمتبقية في جميع وسائط التخزين المتصلة',
   syntax:'df [OPTIONS] [PATH]',
   flags:[
     {flag:'-h',desc:'عرض الأحجام بوحدات مفهومة للبشر (GB, MB)'},
     {flag:'-T',desc:'إظهار عمود يوضح نوع نظام الملفات الخاص بكل قسم (ext4, tmpfs)'},
     {flag:'-i',desc:'عرض عدد الـ inodes المتاحة والمستخدمة بدل المساحة'}
   ],
   examples:['df -h','df -Th'],
  },
  {id:'du',name:'du',icon:'📦',level:2,category:'System Administration',
   desc:'حساب حجم الملفات والمجلدات الفرعية بشكل تفصيلي على القرص',
   syntax:'du [OPTIONS] [PATH]',
   flags:[
     {flag:'-s',desc:'عرض الإجمالي الكلي للمسار المحدد فقط دون سرد المجلدات الفرعية'},
     {flag:'-h',desc:'عرض الأحجام بوحدات مقروءة'},
     {flag:'-d N',desc:'تحديد عمق المجلدات المطلوب حسابه (Max-depth)'}
   ],
   examples:['du -sh /var/log','du -h -d 1 /home'],
  },
  {id:'lsblk',name:'lsblk',icon:'💿',level:1,category:'System Administration',
   desc:'سرد جميع أجهزة التخزين والكتل (Block Devices) وهيكلة أقسامها كشجرة',
   syntax:'lsblk [OPTIONS]',
   flags:[
     {flag:'-f',desc:'إظهار أنظمة الملفات الخاصة بكل قسم مع الـ UUID والمعرف الفريد'},
     {flag:'-m',desc:'إظهار معلومات الأذونات والمالك لكل قرص'}
   ],
   examples:['lsblk','lsblk -f'],
  },
  {id:'blkid',name:'blkid',icon:'🏷️',level:3,category:'System Administration',
   desc:'تحديد أنواع كتل الأجهزة والـ UUID وعناوين الأقسام الحقيقية',
   syntax:'blkid [DEVICE]',
   flags:[
     {flag:'-o value',desc:'استخراج قيم الخصائص فقط بدون الأسماء'},
     {flag:'-s TAG',desc:'عرض وسم محدد فقط (مثل UUID أو TYPE)'}
   ],
   examples:['sudo blkid','sudo blkid /dev/sda1'],
   note:'تنبيه أمني: الـ UUID يضمن ثبات تعريف القرص في ملف fstab حتى لو تغير ترتيب كابلات السيرفر.'
  },
  {id:'ln',name:'ln',icon:'🔗',level:2,category:'Files & Directories',
   desc:'إنشاء روابط للملفات والمجلدات (روابط رمزية أو روابط صلبة)',
   syntax:'ln [OPTIONS] TARGET LINK_NAME',
   flags:[
     {flag:'-s',desc:'إنشاء رابط رمزي (Symbolic/Soft link) - يمثل اختصاراً يشير للملف'},
     {flag:'-f',desc:'إجبار كتابة الرابط وحذف أي ملف قديم يحمل نفس الاسم'},
     {flag:'-v',desc:'عرض تفاصيل العملية والربط'}
   ],
   examples:['ln -s /etc/nginx/nginx.conf ~/nginx_shortcut','ln file1.txt hardlink.txt'],
   note:'الروابط الصلبة (Hard links) تتشارك نفس الـ inode ولا يمكن عملها للمجلدات أو عبر أنظمة ملفات مختلفة، عكس الروابط الرمزية.'
  },
  {id:'file',name:'file',icon:'🔍',level:1,category:'Malware Analysis',
   desc:'تحديد وتصنيف نوع الملف الحقيقي من خلال قراءة توقيعه الرقمي (Magic Bytes)',
   syntax:'file [OPTIONS] FILE',
   flags:[
     {flag:'-b',desc:'عرض النتيجة مباشرة بدون تكرار اسم الملف في المخرج'},
     {flag:'-i',desc:'عرض نوع الـ MIME وتشفير الحروف الصافي للملف (مثل text/plain; charset=utf-8)'},
     {flag:'-z',desc:'محاولة فحص محتوى الملفات المضغوطة أيضاً'}
   ],
   examples:['file suspect_file','file -i script.py','file -b image.png'],
   note:'تحليل البرمجيات الخبيثة: لا تعتمد على امتداد الملف (.jpg, .exe)؛ لأن المخترقين يغيرون الامتداد للتمويه، بينما يكشف أمر file الحقيقة فوراً.'
  }
]);
