import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod5.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

mermaid_html = """
    <!-- 1.5 Decision Tree & Templates -->
    <div class="cyber-card">
        <h2><i class="fas fa-bolt"></i> قوالب جاهزة واستراتيجية الفحص (Nmap Templates)</h2>
        <p>لا تتوه بين 30+ من خيارات Nmap! اختر القالب الذي يناسب السيناريو الخاص بك:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(80,250,123,0.1); border: 1px solid #50fa7b; padding: 15px; border-radius: 6px;">
                <h3 style="color: #50fa7b; margin-top: 0;">1️⃣ Quick Scan (الفحص السريع)</h3>
                <p style="font-size: 0.9em; margin-bottom: 10px;">الوقت: ~5 دقائق | التركيز: السرعة</p>
                <code style="display: block; background: #282a36; padding: 8px; border-radius: 4px; font-size: 0.8em; color: #f8f8f2; cursor: pointer;" onclick="navigator.clipboard.writeText('nmap -sS -T4 --top-ports 100 target.com'); this.innerText='📋 Copied!';">
                    nmap -sS -T4 --top-ports 100 target.com
                </code>
            </div>
            
            <div style="background: rgba(241,250,140,0.1); border: 1px solid #f1fa8c; padding: 15px; border-radius: 6px;">
                <h3 style="color: #f1fa8c; margin-top: 0;">2️⃣ Comprehensive (الشامل)</h3>
                <p style="font-size: 0.9em; margin-bottom: 10px;">الوقت: ~30 دقيقة | التركيز: الدقة واكتشاف الإصدارات</p>
                <code style="display: block; background: #282a36; padding: 8px; border-radius: 4px; font-size: 0.8em; color: #f8f8f2; cursor: pointer;" onclick="navigator.clipboard.writeText('nmap -sS -sV -A -T3 -p- target.com'); this.innerText='📋 Copied!';">
                    nmap -sS -sV -A -T3 -p- target.com
                </code>
            </div>
            
            <div style="background: rgba(255,85,85,0.1); border: 1px solid #ff5555; padding: 15px; border-radius: 6px;">
                <h3 style="color: #ff5555; margin-top: 0;">3️⃣ Stealth (التخفي من الـ WAF)</h3>
                <p style="font-size: 0.9em; margin-bottom: 10px;">الوقت: عدة ساعات | التركيز: تجاوز الحماية</p>
                <code style="display: block; background: #282a36; padding: 8px; border-radius: 4px; font-size: 0.8em; color: #f8f8f2; cursor: pointer;" onclick="navigator.clipboard.writeText('nmap -sS -T1 -f -D RND:5 -p- target.com'); this.innerText='📋 Copied!';">
                    nmap -sS -T1 -f -D RND:5 -p- target.com
                </code>
            </div>
        </div>

        <div class="mermaid" style="text-align: center; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">
graph TD
    A[ما هي أولوية الفحص؟] --> B{هل السرعة أهم من التخفي؟}
    A --> C{هل التخفي وتجنب الإنذارات هو الأهم؟}
    
    B -->|نعم| D[استخدم قالب Quick Scan T4]
    B -->|بعدها| E[أو استخدم Naabu للسرعة الفائقة]
    
    C -->|نعم| F[استخدم قالب Stealth T1 مع Decoys]
    C -->|انتبه| G[سيستغرق وقتاً طويلاً جداً]
    
    D --> H((تحليل النتائج))
    E --> H
    F --> H
    
    H --> I["nmap-converter -i output.xml -o output.csv"]
    I --> J[استيراد إلى Spreadsheet وتحديد الخدمات]
    
    style A fill:#ff5555,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#50fa7b,stroke:#333,color:#000
    style C fill:#bd93f9,stroke:#333,color:#fff
    style I fill:#44475a,stroke:#6272a4,color:#8be9fd
        </div>
    </div>
"""

if "Decision Tree & Templates" not in html:
    html = html.replace("<!-- 2. Attack Flow -->", mermaid_html + "\n    <!-- 2. Attack Flow -->")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added Decision Tree & Templates to pt_mod5.html")
else:
    print("Decision Tree already exists")
