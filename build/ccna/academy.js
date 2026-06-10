const academyData = [
    {
        chapter: "المرحلة الأولى: أساسيات الشبكات",
        lessons: [
            {
                id: "lesson1",
                title: "1. ما هي الشبكات؟ وأنواعها",
                content: `
                    <h1>مفهوم الشبكات (What is a Network?)</h1>
                    <p>الشبكة ببساطة هي جهازي كمبيوتر أو أكثر متصلين ببعضهم البعض بهدف <strong>مشاركة الموارد (Resources)</strong> مثل الملفات، الطابعات، أو الاتصال بالإنترنت.</p>
                    
                    <div class="concept-box">
                        <h3>لماذا نحتاج الشبكات؟</h3>
                        <ul>
                            <li><strong>مشاركة الموارد:</strong> تخيل شركة بها 50 موظف، بدلاً من شراء 50 طابعة، نشتري طابعة واحدة ونربطها بالشبكة!</li>
                            <li><strong>التواصل السريع:</strong> إرسال الإيميلات والمحادثات.</li>
                            <li><strong>الوصول للبيانات المركزية:</strong> حفظ ملفات الشركة على سيرفر واحد (File Server) يصل إليه الجميع.</li>
                        </ul>
                    </div>

                    <h2>أنواع الشبكات حسب المساحة الجغرافية:</h2>
                    
                    <h3>1. شبكة الـ LAN (Local Area Network)</h3>
                    <p>هي الشبكة المحلية. تغطي مساحة صغيرة مثل مكتب، منزل، أو مبنى واحد. تتميز بسرعتها العالية وسهولة إدارتها.</p>
                    <p><em>مثال:</em> أجهزة الكمبيوتر المتصلة بـ Switch داخل معمل المدرسة.</p>

                    <h3>2. شبكة الـ WAN (Wide Area Network)</h3>
                    <p>هي الشبكة الواسعة. تربط بين مدن أو دول مختلفة. أبطأ من الـ LAN وتعتمد على مزودي خدمة الإنترنت (ISPs) وشركات الاتصالات.</p>
                    <p><em>مثال:</em> ربط فرع بنك في القاهرة بفرع آخر في دبي، أو الإنترنت نفسه (أكبر شبكة WAN في العالم).</p>

                    <h3>3. شبكة الـ MAN (Metropolitan Area Network)</h3>
                    <p>تغطي مساحة متوسطة مثل مدينة أو حرم جامعي ضخم. وهي أكبر من الـ LAN وأصغر من الـ WAN.</p>

                    <h3>4. شبكة الـ WLAN (Wireless LAN)</h3>
                    <p>نفس فكرة الـ LAN ولكنها بدون كابلات (لاسلكية - Wi-Fi). تعتمد على الـ Access Points لربط الأجهزة (مثل شبكة الواي فاي في المنزل).</p>
                `
            },
            {
                id: "lesson2",
                title: "2. أجهزة الشبكة الأساسية",
                content: `
                    <h1>أجهزة الشبكات (Network Devices)</h1>
                    <p>لتكوين شبكة، نحتاج إلى أجهزة فيزيائية (Hardware) تقوم بتوجيه ونقل البيانات. إليك أهم 4 أجهزة:</p>
                    
                    <div class="concept-box">
                        <h3>1. الموزع (Hub) - "الغبي"</h3>
                        <p>جهاز قديم جداً وظيفته ربط الأجهزة ببعضها في شبكة LAN. لكنه يفتقر للذكاء؛ عندما يصله ملف من جهاز (A) ويريد إرساله لجهاز (B)، فإنه يقوم بإرسال الملف <strong>لجميع الأجهزة</strong> المتصلة به! وهذا يسبب بطئاً شديداً وانعداماً للأمان.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--success); background: rgba(63, 185, 80, 0.05);">
                        <h3 style="color: var(--success);">2. المحول (Switch) - "الذكي"</h3>
                        <p>هو بديل الـ Hub الحديث. جهاز ذكي جداً يربط أجهزة الـ LAN. عندما تصل رسالة من جهاز (A) إلى (B)، فإنه يقرأ العنوان (MAC Address) ويرسل الرسالة إلى جهاز (B) <strong>فقط</strong>. يتميز بالسرعة والأمان ولا يسبب اختناقاً في الشبكة.</p>
                    </div>

                    <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                        <h3 style="color: #ffb020;">3. الموجه (Router) - "بوابة العبور"</h3>
                        <p>إذا كان السويتش يربط أجهزة <em>نفس الشبكة</em>، فإن الراوتر وظيفته ربط <strong>شبكات مختلفة</strong> ببعضها البعض! الراوتر يقرأ عناوين الـ IP ويختار أفضل مسار لنقل البيانات من بلد لآخر أو من شبكتك المنزلية إلى الإنترنت.</p>
                    </div>

                    <div class="concept-box" style="border-color: var(--danger); background: rgba(248, 81, 73, 0.05);">
                        <h3 style="color: var(--danger);">4. الجدار الناري (Firewall) - "حارس الأمن"</h3>
                        <p>جهاز (أو برنامج) يقف بين شبكتك الداخلية والإنترنت، ويقوم بفحص كل ما يدخل وما يخرج. إذا وجد زيارة من موقع خبيث أو هجوم، فإنه يقوم بـ <em>حظر (Block)</em> الاتصال فوراً.</p>
                    </div>
                `
            },
            {
                id: "lesson3",
                title: "3. طوبولوجيا الشبكات",
                content: `
                    <h1>طوبولوجيا الشبكات (Network Topologies)</h1>
                    <p>الطوبولوجيا هي الطريقة أو "الرسم الهندسي" الذي نستخدمه لتوصيل الأجهزة ببعضها البعض في الشبكة.</p>

                    <h2>Physical vs Logical</h2>
                    <ul>
                        <li><strong>Physical Topology:</strong> هو الشكل المادي الحقيقي للكابلات والأجهزة على أرض الواقع.</li>
                        <li><strong>Logical Topology:</strong> هي الطريقة التي تسري بها الإشارات الكهربائية والبيانات داخل الأسلاك بغض النظر عن الشكل الخارجي.</li>
                    </ul>

                    <h2>أشهر أنواع الـ Topologies:</h2>
                    
                    <div class="concept-box">
                        <h3>1. Star Topology (النجمة) - "الأكثر استخداماً"</h3>
                        <p>تتصل جميع الأجهزة بجهاز مركزي واحد (عادة يكون Switch). في هذا النوع، إذا انقطع سلك جهاز معين، ينفصل هو فقط وتستمر باقي الشبكة في العمل. <em>لكن إذا تعطل الـ Switch، تتعطل الشبكة بالكامل.</em></p>
                    </div>

                    <div class="concept-box">
                        <h3>2. Mesh Topology (الشبكة العنكبوتية) - "الأعلى تكلفة وموثوقية"</h3>
                        <p>كل جهاز في الشبكة متصل بكل جهاز آخر بكابل مستقل! إذا انقطع كابل، توجد مسارات بديلة فوراً. يُستخدم في الأماكن الحساسة (مثل المستشفيات والمطارات) حيث يمنع انقطاع الاتصال بأي ثمن.</p>
                    </div>

                    <div class="concept-box">
                        <h3>3. Bus Topology (الناقل) - "القديم"</h3>
                        <p>كابل واحد رئيسي (Backbone) تتصل به جميع الأجهزة. إذا انقطع هذا الكابل الرئيسي في أي نقطة، <strong>تسقط الشبكة بأكملها</strong>.</p>
                    </div>

                    <div class="concept-box">
                        <h3>4. Ring Topology (الحلقة)</h3>
                        <p>الأجهزة متصلة ببعضها على شكل حلقة مغلقة. تنتقل البيانات في اتجاه واحد، وتمر على الأجهزة تباعاً حتى تصل للهدف. إذا فشل جهاز واحد، تتوقف الحلقة.</p>
                    </div>
                `
            },
            {
                id: "lesson4",
                title: "4. الكابلات وسرعة الشبكة",
                content: `
                    <h1>الكابلات ومفاهيم السرعة</h1>
                    
                    <h2>أنواع الكابلات (Cables)</h2>
                    <p>الكابلات هي الشرايين التي تنقل البيانات. إليك أشهرها:</p>
                    <ul>
                        <li><strong>1. الكابلات النحاسية (Copper - Twisted Pair):</strong> هي كابلات الإنترنت المنزلية (مثل Cat5, Cat6). رخيصة ومناسبة للمسافات القصيرة (حتى 100 متر)، لكنها تتأثر بالتشويش الكهرومغناطيسي (EMI).</li>
                        <li><strong>2. الألياف الضوئية (Fiber Optic):</strong> تنقل البيانات باستخدام <em>الضوء</em> داخل أنابيب زجاجية دقيقة. سرعتها خيالية، تسافر لمسافات طويلة جداً (كيلومترات)، ولا تتأثر بالتشويش. تُستخدم بين القارات وفي مراكز البيانات الضخمة (Data Centers).</li>
                        <li><strong>3. الكابلات المحورية (Coaxial):</strong> كابلات النحاس السميكة المستخدمة في أطباق الدش وكاميرات المراقبة القديمة. قوية لكنها أصبحت نادرة في شبكات الكمبيوتر الحديثة.</li>
                    </ul>

                    <h2>مفاهيم قياس كفاءة الشبكة</h2>
                    
                    <div class="concept-box">
                        <h3>1. عرض النطاق الترددي (Bandwidth)</h3>
                        <p>هو "السعة القصوى" للماسورة. أقصى كمية بيانات <em>يمكن</em> نقلها في الثانية الواحدة. يقاس بـ Mbps (ميجابت في الثانية). على سبيل المثال، اشتراكك 100 ميجا هو الـ Bandwidth.</p>
                    </div>

                    <div class="concept-box">
                        <h3>2. الإنتاجية الفعلية (Throughput)</h3>
                        <p>هي السرعة "الفعلية" التي تحصل عليها على أرض الواقع في تلك اللحظة. عادة تكون أقل من الـ Bandwidth بسبب التشويش، عدد المستخدمين، وتأخير السيرفر.</p>
                    </div>

                    <div class="concept-box">
                        <h3>3. التأخير (Latency / Ping)</h3>
                        <p>هو الوقت الذي تستغرقه قطعة بيانات (Packet) لتسافر من جهازك إلى السيرفر وتعود إليك مرة أخرى. يُقاس بالمللي ثانية (ms). في ألعاب الأونلاين والمكالمات، يُفضل أن يكون التأخير أقل ما يمكن.</p>
                    </div>
                `
            }
        ]
    }
];

function renderSidebar() {
    const toc = document.getElementById('tocPanel');
    toc.innerHTML = '';
    
    academyData.forEach(chapter => {
        const title = document.createElement('div');
        title.className = 'chapter-title';
        title.innerText = chapter.chapter;
        toc.appendChild(title);
        
        chapter.lessons.forEach(lesson => {
            const btn = document.createElement('button');
            btn.className = 'lesson-btn';
            btn.id = 'btn-' + lesson.id;
            btn.innerText = lesson.title;
            btn.onclick = () => loadLesson(lesson.id);
            toc.appendChild(btn);
        });
    });
}

function loadLesson(id) {
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
    
    for(let chap of academyData) {
        for(let less of chap.lessons) {
            if(less.id === id) {
                const article = document.getElementById('articleBody');
                article.style.opacity = '0';
                setTimeout(() => {
                    article.innerHTML = less.content;
                    article.style.transition = 'opacity 0.3s ease';
                    article.style.opacity = '1';
                }, 150);
                return;
            }
        }
    }
}

window.onload = () => {
    renderSidebar();
    if(academyData[0] && academyData[0].lessons[0]) {
        loadLesson(academyData[0].lessons[0].id);
    }
};
