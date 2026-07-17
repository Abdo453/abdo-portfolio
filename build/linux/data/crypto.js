// ==========================================
// 10. CRYPTOGRAPHY & KEY MANAGEMENT (crypto.js)
// ==========================================
window.LINUX_COMMANDS = (window.LINUX_COMMANDS || []).concat([
  {id:'openssl',name:'openssl',icon:'🔐',level:4,category:'Cryptography',
   desc:'الأداة الشاملة للتشفير، إنشاء المفاتيح العامة والخاصة، توقيع الشهادات الأمنية (SSL/TLS)، وتشفير البيانات',
   syntax:'openssl COMMAND [OPTIONS]',
   flags:[
     {flag:'genrsa -out FILE BITS',desc:'إنشاء مفتاح خاص جديد من نوع RSA بالحجم المحدد بالبايت (مثل 2048 أو 4096)'},
     {flag:'req -new -key KEY -out CSR',desc:'إنشاء طلب توقيع شهادة جديد (CSR) باستخدام المفتاح الخاص المحدد'},
     {flag:'x509 -req -in CSR -signkey KEY -out CERT',desc:'توقيع وإنتاج شهادة رقمية موقعة ذاتياً (Self-signed Certificate)'},
     {flag:'s_client -connect HOST:PORT',desc:'الاتصال بخادم بعيد وفحص وقراءة تفاصيل وصلاحية شهادة الـ SSL الخاصة به'},
     {flag:'enc -aes-256-cbc -in IN -out OUT',desc:'تشفير ملف محدد باستخدام خوارزمية AES-256 بمفتاح تعمية متماثل'},
     {flag:'enc -d -aes-256-cbc -in IN -out OUT',desc:'فك تشفير الملف باستخدام خوارزمية AES-256'},
     {flag:'dgst -sha256 FILE',desc:'حساب بصمة التشفير (Hash value) للملف المحدد للتأكد من سلامته'}
   ],
   examples:[
     'openssl genrsa -out private.pem 4096',
     'openssl s_client -connect google.com:443',
     'openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc'
   ],
  },
  {id:'gpg',name:'gpg (GNU Privacy Guard)',icon:'🔑',level:3,category:'Cryptography',
   desc:'إصدار وإدارة وتشفير وتوقيع البيانات والرسائل والبريد الإلكتروني باستخدام التشفير غير المتماثل (PGP)',
   syntax:'gpg [OPTIONS] [FILE]',
   flags:[
     {flag:'--gen-key',desc:'بدء معالج تفاعلي لإنشاء زوج مفاتيح جديد (عام وخاص)'},
     {flag:'-e -r RECIPIENT FILE',desc:'تشفير الملف وتوجيهه ليكون متاحاً للقراءة فقط بواسطة المستلم المحدد بمفتاحه العام'},
     {flag:'-d FILE',desc:'فك تشفير الملف وحمايته باستخدام مفتاحك الخاص ومطالبة كلمة مرورك'},
     {flag:'--sign FILE',desc:'توقيع الملف رقمياً لإثبات صحة وموثوقية مصدره'},
     {flag:'--verify SIGN_FILE',desc:'التحقق من صحة التوقيع الرقمي وصحة وسلامة الملف المرفق'},
     {flag:'--export -a NAME',desc:'تصدير مفتاحك العام بصيغة ASCII (Armored) لمشاركته مع الآخرين'},
     {flag:'--import KEY_FILE',desc:'استيراد وتخزين المفتاح العام الخاص بشخص آخر بقاعدة بياناتك'}
   ],
   examples:[
     'gpg --gen-key',
     'gpg -e -r admin@internal.com document.pdf # تشفير مستند للمدير',
     'gpg -d document.pdf.gpg > decrypted.pdf'
   ],
  },
  {id:'certtool',name:'certtool',icon:'📜',level:4,category:'Cryptography',
   desc:'أداة مكتبة GnuTLS لفحص وتوليد شهادات الـ X.509 والمفاتيح الخاصة وطلبات التوقيع',
   syntax:'certtool [OPTIONS]',
   flags:[
     {flag:'--generate-privkey',desc:'توليد وإنتاج مفتاح خاص جديد مشفر بالنظام'},
     {flag:'--generate-self-signed',desc:'إنتاج وتوقيع شهادة رقمية ذاتية التوقيع للجهاز'},
     {flag:'-i / --certificate-info',desc:'فك ترميز وعرض تفاصيل شهادة X.509 بالكامل وتواريخ صلاحيتها'}
   ],
   examples:[
     'certtool --generate-privkey --outfile key.pem',
     'certtool --certificate-info --infile cert.pem'
   ],
  },
  {id:'pkcs11_tool',name:'pkcs11-tool',icon:'💳',level:4,category:'Cryptography',
   desc:'إدارة والتفاعل مع بطاقات التشفير الذكية (Smart Cards) والـ HSM والمفاتيح الفيزيائية للأمان',
   syntax:'pkcs11-tool [OPTIONS]',
   flags:[
     {flag:'-L / --list-slots',desc:'عرض فتحات البطاقات الذكية والأجهزة المتصلة حالياً بالنظام'},
     {flag:'-O / --list-objects',desc:'عرض قائمة بالمفاتيح والشهادات المخزنة داخل الـ Token أو البطاقة المتصلة'},
     {flag:'--login',desc:'تسجيل الدخول للبطاقة باستخدام رقم التعريف الشخصي (PIN) المعتمد للـ Token'}
   ],
   examples:['pkcs11-tool --list-slots','pkcs11-tool --login --list-objects'],
  },
  {id:'age_crypto',name:'age',icon:'🔑',level:3,category:'Cryptography',
   desc:'أداة حديثة وبسيطة وسريعة جداً لتشغيل وتشفير الملفات بمفاتيح صغيرة وفعالة (بديل gpg البسيط)',
   syntax:'age [OPTIONS] FILE',
   flags:[
     {flag:'-o OUTFILE',desc:'تحديد ملف المخرجات المشفر'},
     {flag:'-r RECIPIENT',desc:'تحديد المفتاح العام للمستلم المستهدف لتشفير الملف له'},
     {flag:'-d',desc:'فك تشفير الملف المحدد (Decrypt)'},
     {flag:'-p',desc:'التشفير باستخدام كلمة مرور تقليدية متماثلة (Passphrase)'}
   ],
   examples:[
     'age-keygen -o key.txt # إنشاء زوج مفاتيح جديد',
     'age -r age1ql8t62... secret.txt -o secret.age # تشفير للمستلم',
     'age -d -i key.txt secret.age > decrypted.txt'
   ],
  },
  {id:'ssh_keygen',name:'ssh-keygen',icon:'🔑',level:2,category:'Cryptography',
   desc:'إنشاء وإدارة وفحص مفاتيح المصادقة الخاصة بالاتصال البعيد الآمن (SSH Keys)',
   syntax:'ssh-keygen [OPTIONS]',
   flags:[
     {flag:'-t TYPE',desc:'تحديد نوع الخوارزمية (مثل rsa أو ed25519 الأحدث والأكثر أماناً)'},
     {flag:'-b BITS',desc:'تحديد طول المفتاح بالبايت (مثل 4096 لـ rsa)'},
     {flag:'-f FILE',desc:'تحديد مسار واسم ملف حفظ المفتاح الناتج'},
     {flag:'-p',desc:'تغيير أو إعداد كلمة مرور جديدة للمفتاح الخاص الموجود حالياً'},
     {flag:'-y',desc:'قراءة المفتاح الخاص واستخراج المفتاح العام المقابل له'},
     {flag:'-F HOST',desc:'البحث عن بصمة السيرفر المستهدف داخل ملف known_hosts'}
   ],
   examples:[
     'ssh-keygen -t ed25519 -C "admin@internal" # إنشاء مفتاح آمن وسريع',
     'ssh-keygen -f ~/.ssh/id_rsa -y > ~/.ssh/id_rsa.pub # استخراج المفتاح العام'
   ],
   note:'أمنياً: يُنصح باستخدام ed25519 دائماً للمفاتيح الحديثة لأنها أسرع وأقوى تشفيراً من RSA التقليدي.'
  }
]);
