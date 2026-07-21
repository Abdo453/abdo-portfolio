import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod2.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

mermaid_html = """
    <!-- 1.5 Decision Tree -->
    <div class="cyber-card">
        <h2><i class="fas fa-sitemap"></i> استراتيجية اختيار الأدوات (Decision Tree)</h2>
        <p>استخدم هذا المخطط لاختيار الأداة المناسبة لجمع النطاقات الفرعية (Subdomains) بناءً على السيناريو:</p>
        <div class="mermaid" style="text-align: center; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-top: 10px;">
graph TD
    A[حجم الهدف والوقت المتاح؟] --> B{هل السرعة أهم؟ < 5 دقائق}
    A --> C{هل الشمولية أهم؟}
    A --> D{هل تريد كل شيء؟ شامل الداخلي}
    
    B -->|نعم| E[استخدم: Subfinder -all]
    E --> E1[النتيجة: ~500 نطاق]
    
    C -->|نعم| F[استخدم: Amass + Subfinder]
    F --> F1[الوقت: 2-3 ساعات]
    F1 --> F2[النتيجة: ~2000 نطاق]
    
    D -->|نعم| G[استخدم: AltDNS + ShuffleDNS]
    G --> G1[الوقت: 4-6 ساعات]
    G1 --> G2[النتيجة: ~5000+ نطاق مع False Positives]
    
    E1 --> H((الفلترة الأساسية))
    F2 --> H
    G2 --> H
    
    H --> I["cat all_subs.txt | httpx -mc 200,301,302,403 > live_only.txt"]
    
    style A fill:#ff5555,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#50fa7b,stroke:#333,color:#000
    style C fill:#f1fa8c,stroke:#333,color:#000
    style D fill:#bd93f9,stroke:#333,color:#fff
    style I fill:#44475a,stroke:#6272a4,color:#8be9fd
        </div>
    </div>
"""

if "Decision Tree" not in html:
    html = html.replace("<!-- 2. Attack Flow -->", mermaid_html + "\n    <!-- 2. Attack Flow -->")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added Decision Tree to pt_mod2.html")
else:
    print("Decision Tree already exists")
