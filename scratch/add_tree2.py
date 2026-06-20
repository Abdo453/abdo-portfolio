import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod4.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

mermaid_html = """
    <!-- 1.5 Decision Tree -->
    <div class="cyber-card">
        <h2><i class="fas fa-sitemap"></i> استراتيجية اختيار أدوات استكشاف المحتوى</h2>
        <p>استخدم هذا المخطط لاختيار الأداة الأنسب لـ Directory & File Bruteforcing بناءً على متطلباتك:</p>
        <div class="mermaid" style="text-align: center; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-top: 10px;">
graph TD
    A[ما هو الهدف الأساسي؟] --> B{هل السرعة المطلقة هي الأهم؟}
    A --> C{هل تحتاج مرونة عالية Patterns/Headers?}
    A --> D{هل تبحث عن السهولة والفلترة السريعة؟}
    A --> E{هل تستهدف ملفات JavaScript؟}
    
    B -->|نعم| F[استخدم: Feroxbuster]
    F --> F1[مكتوب بـ Rust، سريع جداً ويدعم Recursion التلقائي]
    
    C -->|نعم| G[استخدم: FFuF]
    G --> G1[أقوى أداة للـ Fuzzing الشامل وتخصيص كل بايت]
    
    D -->|نعم| H[استخدم: Gobuster]
    H --> H1[بسيط وسهل في فلترة الأكواد (مثل إخفاء 404/403)]
    
    E -->|نعم| I[استخدم: xnLinkFinder أو katana]
    I --> I1[مخرجات مفصلة: /api/admin-panel, /users/{id}]
    I1 --> I2[الخطوة التالية: اختبار كل مسار في Burp Suite]
    
    style A fill:#ff5555,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#50fa7b,stroke:#333,color:#000
    style C fill:#f1fa8c,stroke:#333,color:#000
    style D fill:#bd93f9,stroke:#333,color:#fff
    style E fill:#ffb86c,stroke:#333,color:#000
        </div>
    </div>
"""

if "Decision Tree" not in html:
    html = html.replace("<!-- 2. Attack Flow -->", mermaid_html + "\n    <!-- 2. Attack Flow -->")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added Decision Tree to pt_mod4.html")
else:
    print("Decision Tree already exists")
