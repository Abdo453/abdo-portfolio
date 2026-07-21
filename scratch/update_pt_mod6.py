import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod6.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

banner_grabbing_html = """
        <h3>5. Banner Grabbing (سحب البانر)</h3>
        <p>لا تتجاهل الخطوة الأبسط! سحب الـ Banner يعطيك معلومات دقيقة عن إصدار الخدمة (مثل SSH, FTP, HTTP) والتي قد تكون مصابة بثغرات معروفة (CVEs). يمكنك استخدام Netcat أو cURL أو Telnet:</p>
        <div class="cmd-ui-box">nc -nv TARGET_IP 22</div>
        <div class="cmd-ui-box">curl -I http://TARGET_IP</div>
"""

integration_html = """
    <div class="cyber-card" style="border-left: 4px solid #bd93f9;">
        <h2><i class="fas fa-link"></i> تكامل الأدوات (Tools Integration Pipeline)</h2>
        <p>في بيئات العمل الحقيقية (Real-world Pentesting)، نادراً ما تستخدم أداة واحدة بشكل منفصل. إليك كيفية ربط مخرجات أدوات الاستكشاف مع أدوات الفحص:</p>
        
        <h3>السيناريو: من استكشاف النطاقات إلى فحص الثغرات</h3>
        <ol style="line-height: 1.8;">
            <li><strong>اكتشاف النطاقات:</strong> <code>subfinder -d target.com -all &gt; subs.txt</code></li>
            <li><strong>تصفية النطاقات الحية (Live):</strong> <code>cat subs.txt | httpx -mc 200,301,403 &gt; live_subs.txt</code></li>
            <li><strong>فحص الثغرات تلقائياً:</strong> <code>nuclei -l live_subs.txt -t cves/ -o nuclei_results.txt</code></li>
        </ol>
        <p><strong>لماذا هذا مهم؟</strong> هذا الـ Pipeline يوفر ساعات من الفحص اليدوي لنطاقات ميتة، ويوجه جهدك المباشر نحو الأهداف التي تتجاوب بالفعل مع الطلبات.</p>
    </div>
"""

# Insert Banner Grabbing after SNMP Walk
if "5. Banner Grabbing" not in html:
    html = html.replace("</div>\n\n    <div class=\"cyber-card\">\n        <h2>[Automation]", banner_grabbing_html + "    </div>\n\n    <div class=\"cyber-card\">\n        <h2>[Automation]")

# Insert Tools Integration before Lab
if "Tools Integration Pipeline" not in html:
    html = html.replace("    <div class=\"cyber-card\">\n        <h2>[Lab]", integration_html + "\n    <div class=\"cyber-card\">\n        <h2>[Lab]")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated pt_mod6.html with Banner Grabbing and Tools Integration")
