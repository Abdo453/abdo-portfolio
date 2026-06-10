window.ccnaCurriculum = [
    {
        phase: "المرحلة الأولى: أساسيات الشبكات",
        levels: [
            {
                id: "p1_l1",
                title: "مقدمة واجهة سيسكو (Cisco CLI)",
                theory: `<h2>التعرف على سيسكو CLI</h2>
                <p>تستخدم أجهزة سيسكو نظام تشغيل يسمى IOS. يحتوي النظام على أوضاع (Modes) مختلفة للصلاحيات:</p>
                <ul>
                    <li><code>Router></code> User EXEC Mode (صلاحيات محدودة للرؤية فقط)</li>
                    <li><code>Router#</code> Privileged EXEC Mode (صلاحيات أوسع لرؤية الإعدادات)</li>
                    <li><code>Router(config)#</code> Global Configuration Mode (صلاحيات تعديل النظام بالكامل)</li>
                </ul>
                <p>للإنتقال للمستوى الأعلى نستخدم أمر <code>enable</code>، وللدخول لوضع الإعدادات نستخدم <code>configure terminal</code>.</p>`,
                challengeText: "قم بالدخول إلى وضع الإعدادات Global Configuration Mode.",
                validate: function(state) {
                    return state.mode === "config";
                }
            },
            {
                id: "p1_l2",
                title: "تغيير اسم الراوتر",
                theory: `<h2>تغيير اسم الجهاز (Hostname)</h2>
                <p>من المهم جداً في الشبكات الكبيرة تمييز كل جهاز باسمه بدلاً من الاسم الافتراضي Router.</p>
                <p>يتم ذلك من خلال وضع الـ Configuration Mode باستخدام الأمر:<br>
                <code>hostname [NAME]</code></p>`,
                challengeText: "قم بتغيير اسم الراوتر ليصبح R1.",
                validate: function(state) {
                    return state.hostname === "R1";
                }
            }
        ]
    }
];
