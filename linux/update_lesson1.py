import json
import os

filepath = 'd:/abdo_portfolio/build/ccna/data/lessons.json'

with open(filepath, 'r', encoding='utf-8') as f:
    lessons_data = json.load(f)

# Find lesson 1
for chapter in lessons_data:
    for lesson in chapter['lessons']:
        if lesson['id'] == 'lesson1':
            lesson['title'] = "1. ما هي الشبكة ومكوناتها؟ (النموذج الاحترافي الجديد)"
            lesson['content'] = """
                <h1>مفهوم الشبكات المعمّق (Network Deep Dive)</h1>
                
                <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                    <h3 style="color: var(--accent);">💡 الفكرة ببساطة (ولماذا نحتاجها؟)</h3>
                    <p>الشبكة ليست مجرد سلك يربط جهازين، بل هي بنية تحتية معقدة صُممت لضمان نقل البيانات بأمان وسرعة وموثوقية بين الأجهزة. تخيلها كشبكة طرق سريعة؛ إذا كانت مصممة بشكل صحيح، ستصل البيانات بسرعة وبدون حوادث.</p>
                </div>
                
                <h2>1. المكونات الأساسية لأي شبكة</h2>
                <p>أي شبكة في العالم تتكون من 3 عناصر رئيسية:</p>
                <ul>
                    <li><strong>الأجهزة الطرفية (End Devices):</strong> الكمبيوتر، الهواتف الذكية، الطابعات، السيرفرات.</li>
                    <li><strong>الأجهزة الوسيطة (Intermediary Devices):</strong> السويتش (للتوصيل الداخلي)، الراوتر (للتوصيل الخارجي)، الفايرول (للحماية).</li>
                    <li><strong>وسائط النقل (Network Media):</strong> الكابلات النحاسية، الألياف الضوئية، أو الوايفاي.</li>
                </ul>

                <div class="concept-box" style="border-color: #2ea043; background: rgba(46, 160, 67, 0.05);">
                    <h3 style="color: #2ea043;">💻 Real Outputs (مخرجات حقيقية من الشغل)</h3>
                    <p>في بيئة العمل، لكي تعرف الأجهزة المتصلة بالراوتر الخاص بك (كأجهزة وسيطة جارة)، نستخدم بروتوكول CDP. هكذا يظهر المخرج الحقيقي:</p>
                    <pre style="background: #161b22; color: #c9d1d9; padding: 10px; border-radius: 5px; overflow-x: auto; font-family: monospace;">
Router# show cdp neighbors
Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge
                  S - Switch, H - Host, I - IGMP, r - Repeater

Device ID        Local Intrfce     Holdtme    Capability  Platform  Port ID
Switch_IT        Fas 0/0           142          S I      WS-C2960  Fas 0/1
Router_Branch    Ser 0/0/0         124          R        C1900     Ser 0/0/0
                    </pre>
                </div>

                <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                    <h3 style="color: #ffb020;">⚠️ أخطاء شائعة في الشغل (Common Mistakes)</h3>
                    <ul>
                        <li><strong>الخلط بين السويتش والراوتر:</strong> محاولة توصيل شبكتين مختلفتين (مثلاً 192.168.1.0 و 10.0.0.0) باستخدام سويتش عادي (Layer 2). السويتش لا يقرأ הـ IP، ستحتاج إلى راوتر أو Layer 3 Switch!</li>
                        <li><strong>استخدام كابلات غير مناسبة:</strong> استخدام كابل نحاسي بطول 150 متر! الكابلات النحاسية أقصاها 100 متر، بعدها تضعف الإشارة (Attenuation). يجب استخدام Fiber.</li>
                    </ul>
                </div>

                <div class="concept-box" style="border-color: #8957e5; background: rgba(137, 87, 229, 0.05);">
                    <h3 style="color: #8957e5;">🛡️ منظور الأمن السيبراني (Cybersecurity Perspective)</h3>
                    <p>في الأمن السيبراني، معرفة المكونات هو أول خطوة. إذا اخترق أحدهم (End Device) سيحاول عمل (Pivot) ليخترق (Intermediary Devices) مثل الراوتر ليتحكم بالشبكة كلها. لذلك يجب إغلاق المنافذ المفتوحة وتأمين الأجهزة الوسيطة ببروتوكولات مثل SSH بدلاً من Telnet غير المشفر.</p>
                </div>
            """

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(lessons_data, f, indent=4, ensure_ascii=False)
print("Updated Lesson 1")
