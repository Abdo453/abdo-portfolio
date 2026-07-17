// ==========================================
// 4. SECURITY HARDENING & POLICIES (security.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'firewall_cmd',name:'firewall-cmd',icon:'🔥',level:3,category:'Firewall',
   desc:'إدارة قواعد جدار الحماية firewalld المعتمد في أنظمة Red Hat (RHEL/CentOS/Fedora)',
   syntax:'firewall-cmd [OPTIONS]',
   flags:[
     {flag:'--state',desc:'التحقق من حالة عمل جدار الحماية حالياً (Running/Not)'},
     {flag:'--list-all',desc:'عرض كل التفاصيل والخدمات والمنافذ المفتوحة بالمنطقة النشطة'},
     {flag:'--permanent',desc:'جعل التغيير دائماً وثابتاً بعد إعادة تشغيل النظام أو عمل reload'},
     {flag:'--add-port=PORT/PROTO',desc:'فتح منفذ محدد (مثال: --add-port=80/tcp)'},
     {flag:'--remove-port=PORT/PROTO',desc:'إغلاق ومنع حركة المرور عبر منفذ محدد'},
     {flag:'--add-service=SVC',desc:'السماح بمرور حركة خدمة معروفة بالنظام (مثال: --add-service=http)'},
     {flag:'--reload',desc:'إعادة تحميل وتطبيق القواعد الجدارية دون قطع الاتصالات الحالية'},
     {flag:'--add-rich-rule',desc:'إضافة قواعد غنية ومتقدمة جداً للتحكم بالمصادر والوجهات بحرية'}
   ],
   examples:[
     'firewall-cmd --state',
     'sudo firewall-cmd --permanent --add-service=https',
     'sudo firewall-cmd --permanent --add-port=8080/tcp',
     'sudo firewall-cmd --reload'
   ],
  },
  {id:'iptables',name:'iptables',icon:'🔒',level:3,category:'Firewall',
   desc:'الأداة الكلاسيكية الشهيرة لإدارة قواعد تصفية الحزم (netfilter) وتوجيهها بنواة لينكس',
   syntax:'iptables [OPTIONS] CHAIN RULE',
   flags:[
     {flag:'-L',desc:'عرض جميع القواعد الجدارية الحالية (List)'},
     {flag:'-F',desc:'حذف وتصفير كافة قواعد جدار الحماية الحالية (Flush) - خطر جداً!'},
     {flag:'-A CHAIN',desc:'إضافة قاعدة جديدة في نهاية السلسلة المحددة (مثال: INPUT, OUTPUT, FORWARD)'},
     {flag:'-D CHAIN N',desc:'حذف القاعدة رقم N من السلسلة المحددة'},
     {flag:'-p PROTO',desc:'تحديد البروتوكول المستهدف (tcp, udp, icmp)'},
     {flag:'--dport PORT',desc:'تحديد منفذ الوجهة المستهدف (Destination Port)'},
     {flag:'-j TARGET',desc:'تحديد الإجراء المطلوب عند التطابق (ACCEPT, DROP, REJECT)'}
   ],
   examples:[
     'sudo iptables -L -n -v # عرض تفصيلي لجميع القواعد بالأرقام',
     'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT # السماح بـ SSH',
     'sudo iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT # حماية من DDoS'
   ],
   note:'تنبيه أمني: احذر من استخدام -F إذا كانت السياسة الافتراضية للـ INPUT هي DROP؛ لأن ذلك سيقطع اتصالك بالسيرفر فوراً!'
  },
  {id:'getenforce',name:'getenforce',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'التحقق الفوري من وضع عمل نظام الحماية القسري SELinux حالياً',
   syntax:'getenforce',
   flags:[],
   examples:['getenforce'],
   note:'حالات SELinux: Enforcing (الحظر والإنذار)، Permissive (الإنذار فقط دون حظر)، Disabled (معطل بالكامل).'
  },
  {id:'setenforce',name:'setenforce',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'تغيير وضع عمل SELinux بشكل مؤقت وفوري (بدون الحاجة لإعادة التشغيل)',
   syntax:'setenforce [0|1|Enforcing|Permissive]',
   flags:[
     {flag:'1 / Enforcing',desc:'تفعيل وضع الحظر الكامل وتطبيق السياسات الأمنية قسرياً'},
     {flag:'0 / Permissive',desc:'تفعيل وضع الإنذار والتسجيل فقط (مفيد لحل مشاكل عمل التطبيقات)'}
   ],
   examples:['sudo setenforce 0','sudo setenforce Permissive'],
   note:'لتثبيت التغيير بشكل دائم بعد إقلاع النظام، يجب تعديل ملف الإعداد الرئيسي /etc/selinux/config.'
  },
  {id:'sestatus',name:'sestatus',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'عرض تقرير مفصل متكامل عن حالة وتفاصيل ضبط نظام SELinux والسياسات المفعلة',
   syntax:'sestatus [OPTIONS]',
   flags:[
     {flag:'-v',desc:'عرض تفاصيل إضافية عن سياق الملفات والعمليات المسجلة بالبيوس'},
     {flag:'-b',desc:'عرض قيم كل الـ Booleans والمتغيرات المنطقية للسياسات'}
   ],
   examples:['sestatus','sestatus -b'],
  },
  {id:'chcon',name:'chcon',icon:'🏷️',level:4,category:'SELinux/AppArmor',
   desc:'تغيير السياق الأمني (Security Context) الخاص بنظام SELinux لملفات معينة مؤقتاً',
   syntax:'chcon [OPTIONS] CONTEXT FILE...',
   flags:[
     {flag:'-R',desc:'تطبيق تغيير السياق بشكل تكراري على المجلدات والملفات الفرعية'},
     {flag:'-t TYPE',desc:'تعديل نوع السياق فقط (Type context) وهو الجزء الأكثر أهمية بالسياسات'},
     {flag:'--reference=RFILE',desc:'نسخ سياق الملف المرجعي RFILE وتطبيقه على الملف المستهدف'}
   ],
   examples:[
     'sudo chcon -t httpd_sys_content_t /var/www/html/index.html # السماح لخادم الويب بقراءة الصفحة',
     'sudo chcon -R --reference=/var/www/html/ /opt/myweb/'
   ],
  },
  {id:'restorecon',name:'restorecon',icon:'🔄',level:3,category:'SELinux/AppArmor',
   desc:'إعادة تعيين واستعادة سياقات SELinux الافتراضية للملفات والمجلدات بناءً على سياسات النظام الأساسية',
   syntax:'restorecon [OPTIONS] PATH...',
   flags:[
     {flag:'-R',desc:'استعادة السياقات بشكل تكراري للمجلدات (Recursive)'},
     {flag:'-v',desc:'عرض تفاصيل الملفات التي يتم تصحيح وتغيير سياقها الفعلي'},
     {flag:'-n',desc:'محاكاة العملية وعرض التغييرات المحتملة دون كتابتها فعلياً بالقرص'}
   ],
   examples:[
     'sudo restorecon -Rv /var/www/html/',
     'sudo restorecon -v /etc/ssh/sshd_config'
   ],
   note:'تنبيه أمني: عند نسخ ملف أو نقله من مكان لآخر، قد يرث سياقاً خاطئاً يمنع الخدمات من قراءته، تشغيل restorecon يحل المشكلة.'
  },
  {id:'setsebool',name:'setsebool',icon:'🔘',level:4,category:'SELinux/AppArmor',
   desc:'تعديل وتفعيل أو إيقاف سياسات SELinux المنطقية (Booleans) للخدمات فورياً',
   syntax:'setsebool [OPTIONS] BOOLEAN VALUE',
   flags:[
     {flag:'-P',desc:'حفظ وتثبيت التغيير بشكل دائم (Persistent) ليبقى فعالاً بعد إقلاع النظام'}
   ],
   examples:[
     'sudo setsebool -P httpd_can_network_connect on # السماح لخادم الويب بفتح اتصالات شبكية خارجية',
     'getsebool -a # عرض كل الـ Booleans المتاحة وحالتها الحالية'
   ],
  },
  {id:'semanage',name:'semanage',icon:'🛠️',level:4,category:'SELinux/AppArmor',
   desc:'أداة الإدارة الشاملة لسياسات SELinux وضبط المنافذ وسياقات الملفات الثابتة بالنظام',
   syntax:'semanage OBJECT COMMAND [OPTIONS]',
   flags:[
     {flag:'port -l',desc:'سرد جميع المنافذ الشبكية المسموح بها لكل خدمة بالنظام'},
     {flag:'port -a -t TYPE -p PROTO PORT',desc:'إضافة منفذ شبكي مسموح به لخدمة معينة (مثال: ssh_port_t)'},
     {flag:'fcontext -a -t TYPE "REGEX"',desc:'تعيين سياق SELinux افتراضي وثابت لمسار محدد بقاعدة البيانات'}
   ],
   examples:[
     'sudo semanage port -l | grep ssh',
     'sudo semanage port -a -t ssh_port_t -p tcp 2222 # السماح لـ SSH بالعمل على منفذ 2222',
     'sudo semanage fcontext -a -t httpd_sys_content_t "/custom_web(/.*)?"'
   ],
  },
  {id:'aa_status',name:'aa-status',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'التحقق وعرض حالة ملفات تعريف نظام الحماية AppArmor (المعتمد في Debian/Ubuntu)',
   syntax:'aa-status [OPTIONS]',
   flags:[
     {flag:'--enabled',desc:'التحقق بسرعة هل نظام AppArmor مفعل بالنظام حالياً أم لا'},
     {flag:'--profiled',desc:'عرض عدد ملفات التعريف (Profiles) المسجلة حالياً للنظام'}
   ],
   examples:['sudo aa-status','sudo aa-status --enabled'],
  },
  {id:'aa_enforce',name:'aa-enforce',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'تفعيل وضع الحظر والإنفاذ الكامل (Enforce mode) لملف تعريف أمني محدد في AppArmor',
   syntax:'aa-enforce PROFILE',
   flags:[],
   examples:['sudo aa-enforce /usr/sbin/nginx','sudo aa-enforce /etc/apparmor.d/*'],
  },
  {id:'aa_complain',name:'aa-complain',icon:'🛡️',level:3,category:'SELinux/AppArmor',
   desc:'تحويل ملف تعريف AppArmor لوضع الشكوى والإنذار (Complain mode) - يسجل الانتهاكات دون حظرها',
   syntax:'aa-complain PROFILE',
   flags:[],
   examples:['sudo aa-complain /usr/sbin/nginx'],
   note:'مفيد جداً عند تثبيت تطبيق جديد لمعرفة الملفات التي يحتاج لقراءتها لتعديل سياسة الحماية قبل تفعيل وضع الإنفاذ.'
  },
  {id:'apparmor_parser',name:'apparmor_parser',icon:'⚙️',level:4,category:'SELinux/AppArmor',
   desc:'إعادة تحميل أو تعديل أو التحقق من صحة ملفات تعريف AppArmor وحقنها بالنواة',
   syntax:'apparmor_parser [OPTIONS] PROFILE_FILE',
   flags:[
     {flag:'-r',desc:'إعادة تحميل وتحديث ملف التعريف الحالي بالنواة (Reload)'},
     {flag:'-R',desc:'حذف وإلغاء تسجيل ملف التعريف المحدد من النواة تماماً'},
     {flag:'-Q',desc:'صامت، لا تطبع أي أخطاء أو رسائل للطرفية'}
   ],
   examples:[
     'sudo apparmor_parser -r /etc/apparmor.d/usr.sbin.nginx',
     'sudo apparmor_parser -R /etc/apparmor.d/usr.sbin.nginx'
   ],
  }
]);
