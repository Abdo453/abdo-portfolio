import re

path = r'D:\abdo_portfolio\main\templates\main\home.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. We replace the static answerChallenge block with the new dynamic logic
old_js = """    // Daily Challenge Handler
    function answerChallenge(choiceIdx, element) {
      const feedbackEl = document.getElementById('dailyChallengeFeedback');
      if (!feedbackEl) return;
      
      document.querySelectorAll('.challenge-option').forEach(el => {
        el.classList.remove('correct', 'incorrect');
      });
      
      if (choiceIdx === 1) {
        element.classList.add('correct');
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'challenge-feedback correct';
        feedbackEl.innerHTML = '🟢 <strong>إجابة صحيحة!</strong> المنهجية المنظمة وتصنيف الأهداف تساعدك على توفير الوقت والوصول للثغرات بشكل أسرع دون لفت الانتباه أو التسبب في الحظر.';
        if (typeof playEnterKeySound === 'function') playEnterKeySound();
      } else {
        element.classList.add('incorrect');
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'challenge-feedback incorrect';
        feedbackEl.innerHTML = '🔴 <strong>إجابة غير صحيحة!</strong> هذه الطريقة قد تؤدي إلى حظرك أو استهلاك وقتك في نتائج غير مهمة. حاول مرة أخرى للتفكير كصياد ثغرات محترف.';
      }
    }"""

new_js = """    // Daily Challenge Handler & Bank
    const challengeBank = [
      {
        q: "لديك 800 Subdomains حية، ما أول 3 خطوات تقوم بها للفحص الفعال؟",
        options: [
          "A) تشغيل Nuclei على جميع المنافذ لتوفير الوقت.",
          "B) فرز النطاقات وتصنيفها (Categorize) ثم فحص CNAME للـ 404s ثم port scan للمنافذ الحساسة.",
          "C) تشغيل FFUF على كافة المسارات دفعة واحدة."
        ],
        correct: 1,
        feedback: "المنهجية المنظمة وتصنيف الأهداف تساعدك على توفير الوقت والوصول للثغرات بشكل أسرع دون التسبب في الحظر."
      },
      {
        q: "وجدت صفحة 403 Forbidden لمسار /admin، ما هو أول شيء تفكر فيه لتخطي الحماية؟",
        options: [
          "A) استخدام SQL Injection في الرابط مباشرة.",
          "B) تجربة التخطي عبر تغيير Headers مثل X-Forwarded-For أو تغيير المسار مثل /admin/.",
          "C) عمل Brute-force للمسار بأداة DirBuster."
        ],
        correct: 1,
        feedback: "التخطي عبر Headers أو إضافة /./ أو %2e غالباً ما ينجح في تخطي إعدادات WAF البسيطة أو قواعد Nginx."
      },
      {
        q: "بينما تفحص تطبيق ويب، وجدت بارامتر ?url=https://example.com. ما هي الثغرة الأكثر احتمالاً؟",
        options: [
          "A) Server-Side Request Forgery (SSRF)",
          "B) Cross-Site Scripting (XSS)",
          "C) Insecure Direct Object Reference (IDOR)"
        ],
        correct: 0,
        feedback: "أي بارامتر يستقبل روابط (URLs) هو مرشح قوي لثغرات SSRF، Open Redirect أو LFI."
      },
      {
        q: "ما هو أفضل سيناريو للبحث عن ثغرة Race Condition؟",
        options: [
          "A) عند تغيير لون واجهة المستخدم في الإعدادات.",
          "B) عند إرسال طلب تحويل أموال أو استخدام كوبون خصم مالي.",
          "C) عند البحث في محرك بحث الموقع."
        ],
        correct: 1,
        feedback: "تأثير Race Condition يظهر بشكل خطير في الوظائف المتعلقة بالمال، التوكنز، أو الدعوات (Limits bypass)."
      },
      {
        q: "أثناء عمل Recon، وجدت CNAME لـ subdomain يشير إلى خدمة سحابية تعطي خطأ NXDOMAIN. هذا يعني:",
        options: [
          "A) السيرفر تحت الصيانة.",
          "B) الثغرة المحتملة هي Subdomain Takeover.",
          "C) النطاق محمي بجدار حماية WAF."
        ],
        correct: 1,
        feedback: "عندما يشير CNAME إلى خدمة لم تعد مسجلة (NXDOMAIN)، يمكنك غالباً تسجيل تلك الخدمة والاستيلاء على النطاق."
      }
    ];

    let currentChallenge = null;

    function loadDailyChallenge() {
      // Pick a random challenge based on today's date so it changes once per day
      const today = new Date();
      const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
      const idx = seed % challengeBank.length;
      
      currentChallenge = challengeBank[idx];
      
      document.getElementById('dailyChallengeQ').innerText = currentChallenge.q;
      
      const optionsContainer = document.getElementById('dailyChallengeOptions');
      optionsContainer.innerHTML = '';
      
      currentChallenge.options.forEach((opt, i) => {
        const div = document.createElement('div');
        div.className = 'challenge-option';
        div.innerText = opt;
        div.onclick = () => answerChallenge(i, div);
        optionsContainer.appendChild(div);
      });
      
      const feedbackEl = document.getElementById('dailyChallengeFeedback');
      if (feedbackEl) {
        feedbackEl.style.display = 'none';
        feedbackEl.className = 'challenge-feedback';
      }
    }

    function answerChallenge(choiceIdx, element) {
      if (!currentChallenge) return;
      const feedbackEl = document.getElementById('dailyChallengeFeedback');
      if (!feedbackEl) return;
      
      document.querySelectorAll('.challenge-option').forEach(el => {
        el.classList.remove('correct', 'incorrect');
      });
      
      if (choiceIdx === currentChallenge.correct) {
        element.classList.add('correct');
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'challenge-feedback correct';
        feedbackEl.innerHTML = '🟢 <strong>إجابة صحيحة!</strong> ' + currentChallenge.feedback;
        if (typeof playEnterKeySound === 'function') playEnterKeySound();
      } else {
        element.classList.add('incorrect');
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'challenge-feedback incorrect';
        feedbackEl.innerHTML = '🔴 <strong>إجابة غير صحيحة!</strong> حاول مرة أخرى.';
      }
    }"""

if old_js in content:
    content = content.replace(old_js, new_js)
else:
    print("Could not find old JS block. Might be slightly different formatting.")

# Need to call loadDailyChallenge() on window load
window_load_hook = "loadDailyChallenge();"
if "document.addEventListener('DOMContentLoaded'" in content and window_load_hook not in content:
    # Find a good place to inject it
    content = content.replace("document.addEventListener('DOMContentLoaded', () => {", 
                              "document.addEventListener('DOMContentLoaded', () => {\n      loadDailyChallenge();")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Challenge Bank applied to home.html!")
