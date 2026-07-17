import re
import codecs

path = 'd:/abdo_portfolio/build/methodology.html'
with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Add sidebar item
sidebar_item = '''          <div class="meth-item" id="meth-ef-p_hash" onclick="openMethPhase('p_hash')" data-search="hash cracking hashcat john the ripper md5 bcrypt">
            <span>🔓</span> <span>Hash Cracking Mastery</span><span class="visited-badge"></span><button class="bookmark-btn" onclick="toggleBookmark(event, 'p_hash', '🔓 Hash Cracking Mastery')">★</button>
          </div>'''

if 'meth-ef-p_leaks' in content:
    # Insert right after p_leaks
    content = content.replace('<!-- Category 5: Threat Intel & Dark Web -->', '<!-- Category 5: Threat Intel & Dark Web -->')
    # Use replace on the exact p_leaks closing div
    # Wait, it's safer to find `p_leaks` div and insert after its closing </div>
    # But since it's just HTML, I can replace `meth-ef-p_leaks...</div>` with itself + sidebar_item.
    leaks_item_pattern = r'(<div class="meth-item" id="meth-ef-p_leaks".*?</div>)'
    content = re.sub(leaks_item_pattern, r'\1\n' + sidebar_item, content, flags=re.DOTALL | re.IGNORECASE)

# 2. Add main content block
hash_html = '''
      <!-- Phase: Hash Cracking Mastery -->
      <div class="meth-content-view" id="meth-content-p_hash" style="display: none; --tool-color: #f97316;">
        <div class="phase-module-header">
          <div class="phase-module-icon">🔓</div>
          <div class="phase-module-meta">
            <h2 class="phase-module-title">Hash Cracking Mastery</h2>
            <p class="phase-module-tagline">كيف تحول الهاشات المشفرة التي تصطادها من قواعد البيانات إلى كلمات مرور صريحة باستخدام Hashcat.</p>
            <div class="phase-meta-badges">
              <span class="badge-time">⏱️ Offline Execution</span>
              <span class="badge-difficulty bg-high">Advanced</span>
            </div>
          </div>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>🔍 1. معرفة نوع الهاش (Identify the Hash)</h3></div>
          <p>أول خطوة هي معرفة نوع التشفير (MD5, SHA1, Bcrypt, NTLM). لا تضيّع وقتك في التخمين:</p>
          <div class="cmd-ui-box">
            <div class="cmd-ui-top">hashid "21232f297a57a5a743894a0e4a801fc3"</div>
            <div class="cmd-ui-bottom"><button class="cmd-btn" onclick="copyText('hashid \\"21232f297a57a5a743894a0e4a801fc3\\"', this)">📋 Copy</button></div>
          </div>
          <p class="note"><em>Pro Tip:</em> استخدم <code>hashcat --example-hashes | grep "Bcrypt"</code> للبحث عن شكل الهاش في قاعدة بيانات Hashcat ومعرفة رقم الـ Mode (مثل 3200).</p>
        </div>

        <div class="cyber-card">
          <div class="card-header"><h3>⚙️ 2. استخدام Hashcat (الوحش الكاسر)</h3></div>
          <p>أداة Hashcat تعتمد على الـ GPU (كارت الشاشة) لتخمين ملايين الباسوردات في الثانية. إليك أهم 3 أنواع للهجوم:</p>
          <div class="table-wrapper"><table class="interactive-table">
            <thead><tr><th>نوع الهجوم (Attack Mode)</th><th>الأمر البرمجي (Command)</th><th>متى تستخدمه؟</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>Dictionary Attack (-a 0)</strong></td>
                <td><code>hashcat -m 0 -a 0 hashes.txt rockyou.txt</code></td>
                <td>عندما يكون لديك قائمة كلمات مرور شهيرة (Wordlist) وتريد تجربتها كما هي.</td>
              </tr>
              <tr>
                <td><strong>Rule-based Attack 🌟</strong></td>
                <td><code>hashcat -m 0 -a 0 hashes.txt rockyou.txt -r rules/best64.rule</code></td>
                <td><strong>السلاح السري!</strong> يأخذ الـ Wordlist ويقوم بتحوير الكلمات (مثال: admin -> Admin@123) لاختراق كلمات المرور المعقدة.</td>
              </tr>
              <tr>
                <td><strong>Mask Attack (-a 3)</strong></td>
                <td><code>hashcat -m 0 -a 3 hashes.txt ?u?l?l?d?d?d</code></td>
                <td>عندما تعرف نمطاً معيناً (Pattern). مثلاً: الحرف الأول كابيتال يليه حرفين سمول ثم 3 أرقام (مثل Ali123).</td>
              </tr>
            </tbody>
          </table></div>
        </div>

        <div class="cyber-card border-neon">
          <div class="card-header"><h3 style="color: var(--neon-purple);"><span class="hero-icon">💡</span> Pro Tips: تعمق في كسر الهاش</h3></div>
          <ul class="t-check-list">
            <li>🔥 <strong>لا تكسر الهاشات الضعيفة أوفلاين:</strong> جرب دائماً البحث عن الهاش في <code>CrackStation.net</code> أو <code>Hashes.org</code> أولاً قبل حرق كارت الشاشة الخاص بك!</li>
            <li>🔥 <strong>تحسين السرعة (Optimization):</strong> أضف <code>-O -w 3</code> لأمر Hashcat لجعله يستغل كارت الشاشة لأقصى درجة وتجاهل التحذيرات (لكن راقب حرارة الكارت).</li>
            <li>🔥 <strong>هجوم الـ OneRuleToRuleThemAll:</strong> هذه الـ Rule من أقوى القواعد الموجودة على GitHub لتحوير كلمات المرور. قم بتحميلها واستخدامها بدلاً من القواعد الافتراضية.</li>
          </ul>
        </div>
        
        <button class="hack-btn" onclick="launchSimulation('hashcat')">💻 Launch Live Hashcat Simulation</button>

        <button class="mark-complete-btn" id="complete-btn-p_hash" onclick="markPhaseComplete('p_hash','p_apt')" style="margin-top: 20px;">
          ✅ Mark Phase Complete — Hash Cracking Done → Proceed
        </button>
      </div>
'''

# Find the end of p_leaks content block to inject the hash block
# We will inject it right after `<!-- Phase 21: Data Leaks Hunting -->` block.
if '<!-- Phase 22: APT & Cyber Warfare -->' in content:
    content = content.replace('<!-- Phase 22: APT & Cyber Warfare -->', hash_html + '\n\n      <!-- Phase 22: APT & Cyber Warfare -->')
elif '<!-- Phase 22: APT & Cyber Warfare -->' in content:
    content = content.replace('<!-- Phase 22: APT & Cyber Warfare -->', hash_html + '\n\n      <!-- Phase 22: APT & Cyber Warfare -->')
else:
    # Let's search for "Data Leaks & Breaches Hunting" phase and append after it.
    idx = content.find('id="meth-content-p_leaks"')
    if idx != -1:
        end_idx = content.find('<!-- Phase', idx)
        if end_idx != -1:
            content = content[:end_idx] + hash_html + '\n\n' + content[end_idx:]

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)
print("Applied Hash Cracking updates successfully.")
