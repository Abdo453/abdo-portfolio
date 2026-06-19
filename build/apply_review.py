import re
import codecs

path = 'd:/abdo_portfolio/build/methodology.html'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add "Common False Positives" and "False Output Example" after mistakes grid
false_positives_html = '''
        <p class="os-section-label">⚠️ Common False Positives (نتائج كاذبة شائعة)</p>
        <div class="cyber-card">
          <div class="card-header"><h3>🕵️‍♂️ كيف تميز بين الثغرة والسراب؟</h3></div>
          <p>ليس كل 404 يعنى Subdomain Takeover. انتبه للآتي:</p>
          <ul class="t-check-list">
            <li>✔ <strong>404 on `admin.target.com`:</strong> قد يكون السيرفر موجوداً ولكنه يرد بـ 404 عمداً لإخفاء لوحة التحكم، تأكد من الـ CNAME!</li>
            <li>✔ <strong>Timeouts:</strong> بعض الأدوات تسجل السيرفر كـ Offline بسبب حظر IP (WAF) وليس لأنه محذوف حقاً.</li>
          </ul>
          
          <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr; margin-top: 15px;">
            <div class="terminal-header">
              <div class="terminal-dots"><span class="dot close"></span><span class="dot minimize"></span><span class="dot maximize"></span></div>
              <div class="terminal-title">Output: False Positive Example</div>
            </div>
            <div class="terminal-body">
              <div class="term-cmd">root@kali:~# dig admin.target.com CNAME</div>
              <div class="term-warn">admin.target.com.    300    IN    CNAME    internal-router.target.local.</div>
              <div class="term-err">; NXDOMAIN (Not vulnerable: points to internal non-resolvable domain, not a 3rd party service)</div>
            </div>
          </div>
        </div>
'''
if '<!-- REAL CASE STUDY -->' in content:
    content = content.replace('<!-- REAL CASE STUDY -->', false_positives_html + '\n        <!-- REAL CASE STUDY -->')

# 2. Add Tool Links to the Tool Selection Guide
# Wait, let's just add a new section "Tool Installation Links"
tool_links_html = '''
        <p class="os-section-label">🔗 Tool Links</p>
        <div class="cyber-card">
          <div class="card-header"><h3>📥 روابط التحميل المباشرة</h3></div>
          <p>لتحميل أدوات الـ Recon الرسمية من GitHub:</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead>
              <tr><th>Tool</th><th>GitHub Repository</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Subfinder</strong></td><td><a href="https://github.com/projectdiscovery/subfinder" target="_blank" style="color:var(--neon-cyan);">projectdiscovery/subfinder</a></td></tr>
              <tr><td><strong>Amass</strong></td><td><a href="https://github.com/owasp-amass/amass" target="_blank" style="color:var(--neon-cyan);">owasp-amass/amass</a></td></tr>
              <tr><td><strong>httpx</strong></td><td><a href="https://github.com/projectdiscovery/httpx" target="_blank" style="color:var(--neon-cyan);">projectdiscovery/httpx</a></td></tr>
              <tr><td><strong>gau</strong></td><td><a href="https://github.com/lc/gau" target="_blank" style="color:var(--neon-cyan);">lc/gau</a></td></tr>
            </tbody>
          </table></div>
        </div>
'''
if '<!-- COMMON MISTAKES vs BEST PRACTICES -->' in content:
    content = content.replace('<!-- COMMON MISTAKES vs BEST PRACTICES -->', tool_links_html + '\n        <!-- COMMON MISTAKES vs BEST PRACTICES -->')

# 3. Add Reporting Section at the very end of methodology.html
reporting_html = '''
      <!-- Phase: Bug Bounty Reporting -->
      <div class="meth-content-view" id="meth-content-p_reporting" style="display: none; --tool-color: #22c55e;">
        <div class="phase-module-header">
          <div class="phase-module-icon">📝</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">Professional Reporting (HackerOne/Bugcrowd)</h2>
            <p class="phase-module-tagline">كيف تكتب تقريراً احترافياً يُجبر الترياج (Triage) على قبول ثغرتك بدون نقاش</p>
            <div class="phase-meta-badges">
              <span class="badge-time">⏱️ 30-60 Minutes</span>
              <span class="badge-difficulty" style="background:#22c55e; color:#000;">Crucial</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>📄 هيكل التقرير المثالي (The Perfect Report Template)</h3></div>
          <p>التقرير الضعيف قد يؤدي إلى إغلاق ثغرتك كـ N/A أو Informative. يجب أن تتبع هيكل HackerOne القياسي:</p>
          
          <div class="terminal-window" dir="ltr" style="text-align: left; direction: ltr; margin-top: 15px;">
            <div class="terminal-header">
              <div class="terminal-dots"><span class="dot close"></span><span class="dot minimize"></span><span class="dot maximize"></span></div>
              <div class="terminal-title">Report_Template.md</div>
            </div>
            <div class="terminal-body">
              <div class="term-warn">## Title: Subdomain Takeover on [vulnerable.target.com] via [Service]</div><br>
              <div class="term-warn">## Description:</div>
              <div class="term-cmd">I have found a subdomain takeover vulnerability on `vulnerable.target.com`. The CNAME record points to an unclaimed Amazon S3 bucket. I was able to claim the bucket and host arbitrary content.</div><br>
              
              <div class="term-warn">## Steps To Reproduce:</div>
              <div class="term-cmd">1. Run `dig vulnerable.target.com CNAME` -> Returns `target-bucket.s3.amazonaws.com`
2. Notice the AWS NoSuchBucket error when visiting the URL.
3. Go to AWS Console -> S3 -> Create bucket named `target-bucket`.
4. Upload an `index.html` file containing `<h1>Subdomain Takeover by Abdo</h1>`.
5. Visit `https://vulnerable.target.com` and observe the injected HTML.</div><br>
              
              <div class="term-warn">## Impact:</div>
              <div class="term-cmd">An attacker can host malicious phishing pages, steal user cookies (if the root domain shares cookies), and completely bypass CSP/CORS protections.</div><br>
              
              <div class="term-warn">## Remediation:</div>
              <div class="term-cmd">Remove the dangling CNAME record from your DNS zone file immediately.</div>
            </div>
          </div>
        </div>
        
        <div class="cyber-card">
          <div class="card-header"><h3>💡 نصائح الترياج الذهبية (Triage Tips)</h3></div>
          <ul class="t-check-list">
            <li>✔ <strong>لا تبالغ في الـ Impact:</strong> إذا كانت الثغرة XSS لا تقل "Can take over the server". كن دقيقاً (Can steal admin session).</li>
            <li>✔ <strong>أضف PoC Video:</strong> الترياج مشغول جداً، مقطع فيديو مدته دقيقة يثبت الثغرة يسرع عملية القبول (Triaged) بنسبة 80%.</li>
            <li>✔ <strong>الـ Impact التجاري:</strong> اذكر كيف تخسر الشركة أموالاً أو سمعة (PII data leak, GDPR violation).</li>
          </ul>
        </div>
        
        <button class="mark-complete-btn" id="complete-btn-p_reporting" onclick="markPhaseComplete('p_reporting','')" style="margin-top: 20px;">
          ✅ Mark Playbook 100% Completed! 🏆
        </button>
      </div>
'''
if '<!-- Main Content Area -->' in content:
    # Need to append `p_reporting` right before the end of `.main-content`
    # It's better to find `<!-- Scenario 3: Subdomain Takeover -->` block and append after it.
    idx = content.find('✅ Mark Phase Complete — Subdomain Takeover Scenario Done')
    if idx != -1:
        end_idx = content.find('</div>', idx)
        if end_idx != -1:
            content = content[:end_idx+6] + '\n\n' + reporting_html + content[end_idx+6:]

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied Python edits successfully.")
