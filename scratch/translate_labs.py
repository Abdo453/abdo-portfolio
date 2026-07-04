import json

labs = [
    {
        "phase": "المرحلة الأولى: أساسيات لينكس وسطر الأوامر",
        "levels": [
            {
                "id": "lab1_1",
                "title": "التنقل في نظام الملفات (FHS)",
                "objective": "قم بتغيير المجلد الحالي إلى /etc ثم اعرض محتوياته.",
                "hint": "استخدم الأمر 'cd /etc' ثم الأمر 'ls'.",
                "validate": "function(state) { return state.history && state.history.includes('cd /etc') && state.history.includes('ls'); }"
            },
            {
                "id": "lab1_2",
                "title": "معالجة النصوص (Grep)",
                "objective": "ابحث عن كلمة 'root' داخل ملف معلومات المستخدمين /etc/passwd.",
                "hint": "استخدم الأمر 'grep root /etc/passwd'.",
                "validate": "function(state) { return state.history && state.history.some(c => c.includes('grep root /etc/passwd')); }"
            }
        ]
    },
    {
        "phase": "المرحلة الثانية: إدارة العمليات والنظام الداخلي",
        "levels": [
            {
                "id": "lab2_1",
                "title": "إدارة العمليات النشطة",
                "objective": "هناك عملية خبيثة تعمل في النظام. اعرض قائمة العمليات الكاملة للتعرف عليها.",
                "hint": "استخدم الأمر 'ps aux'.",
                "validate": "function(state) { return state.history && state.history.includes('ps aux'); }"
            },
            {
                "id": "lab2_2",
                "title": "تعديل صلاحيات الملفات",
                "objective": "قم بتعديل صلاحيات الملف 'script.sh' المتواجد بالمجلد الحالي ليصبح قابلاً للتنفيذ من قبل الجميع.",
                "hint": "استخدم الأمر 'chmod 777 script.sh' أو 'chmod +x script.sh'.",
                "validate": "function(state) { return state.history && state.history.some(c => c.includes('chmod') && c.includes('script.sh')); }"
            }
        ]
    },
    {
        "phase": "المرحلة الثالثة: إدارة الشبكات والخدمات",
        "levels": [
            {
                "id": "lab3_1",
                "title": "فحص عنوان الشبكة (IP)",
                "objective": "اعرف عنوان الـ IP الخاص بك على النظام باستخدام الأمر الحديث لإدارة الشبكة.",
                "hint": "استخدم الأمر 'ip a' أو 'ip address'.",
                "validate": "function(state) { return state.history && (state.history.includes('ip a') || state.history.includes('ip address') || state.history.includes('ip addr')); }"
            },
            {
                "id": "lab3_2",
                "title": "تشغيل خدمة الاتصال الآمن (SSH)",
                "objective": "قم بتشغيل خدمة SSH على السيرفر لتفعيل الاتصال عن بعد باستخدام systemctl.",
                "hint": "استخدم الأمر 'systemctl start sshd' أو 'systemctl start ssh'.",
                "validate": "function(state) { return state.history && (state.history.includes('systemctl start sshd') || state.history.includes('systemctl start ssh')); }"
            }
        ]
    },
    {
        "phase": "المرحلة الرابعة: الأمان واختبار الاختراق",
        "levels": [
            {
                "id": "lab4_1",
                "title": "البحث عن ملفات SUID",
                "objective": "ابحث في كامل النظام عن ملفات تنفيذية تحمل صلاحية SUID مع إخفاء رسائل الخطأ.",
                "hint": "استخدم الأمر 'find / -perm -4000 2>/dev/null'.",
                "validate": "function(state) { return state.history && state.history.some(c => c.includes('find') && c.includes('-perm -4000')); }"
            },
            {
                "id": "lab4_2",
                "title": "فحص صلاحيات sudo",
                "objective": "تحقق من قائمة الأوامر التي يمكنك تشغيلها بصلاحيات المشرف root دون طلب كلمة مرور.",
                "hint": "استخدم الأمر 'sudo -l'.",
                "validate": "function(state) { return state.history && state.history.includes('sudo -l'); }"
            }
        ]
    }
]

with open('linux/data/labs.json', 'w', encoding='utf-8') as f:
    json.dump(labs, f, ensure_ascii=False, indent=4)

print("Labs successfully translated to Arabic!")
