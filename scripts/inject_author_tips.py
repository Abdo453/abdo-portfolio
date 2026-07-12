import os

def inject_tips():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    
    tips_data = {
        'bug_bounty_playbook.html': {
            'id': 'playbook-tips',
            'title': '💡 نصائح وتوجيهات الكاتب الميدانية (Playbook Golden Advice)',
            'toc_text': '💡 نصائح وتوجيهات الكاتب الميدانية',
            'quiz_id': 'quizzes',
            'tips': [
                '<strong>لا تتسرع بالبدء بالفحص النشط (Active Scanning):</strong> خذ أولاً 24 إلى 48 ساعة لفهم بنية وهيكل خوادم الهدف وقراءة سجلات الـ DNS سلبياً.',
                '<strong>ركز على ثغرات الـ Out-of-Band (OOB):</strong> هي الأكثر قيمة وتخفياً عن أعين الـ WAF والأسهل في إثبات الأثر أمنياً.',
                '<strong>اكتب أدواتك وسكربتاتك الخاصة:</strong> الأدوات العامة المنتشرة يشغلها آلاف الباحثين في نفس اللحظة، التعديل البسيط على سكربت فحص قد يكشف لك ما عجزت عنه الأدوات الكبيرة.'
            ]
        },
        'web_hackers_handbook.html': {
            'id': 'web-tips',
            'title': '💡 نصائح وتوجيهات الكاتب الميدانية (WAHH Golden Advice)',
            'toc_text': '💡 نصائح وتوجيهات الكاتب الميدانية',
            'quiz_id': 'wahh-quiz',
            'tips': [
                '<strong>ارسم خريطة كاملة لحالة التطبيق (Application State Machine):</strong> تتبع جميع مراحل تسجيل الدفع واسترجاع الحسابات للبحث عن الثغرات المنطقية.',
                '<strong>اختبر الثغرات المنطقية بالتلاعب بالافتراضات:</strong> يفترض المطور دائماً أن الخطوة (أ) تسبق الخطوة (ب)، حاول كسر هذا الترتيب وإرسال طلبات عشوائية.',
                '<strong>لا تثق أبداً بالتحقق من المدخلات في جهة العميل (Client-Side):</strong> اعترض كل طلب بـ Burp Suite وعدل القيم والمعاملات قبل وصولها للسيرفر.'
            ]
        }
    }

    for filename, data in tips_data.items():
        path = os.path.join(books_dir, filename)
        if not os.path.exists(path):
            print(f"Skipping {filename} - not found.")
            continue
            
        try:
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
        except UnicodeDecodeError:
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()

        # Check if already patched to avoid duplicate injection
        if f'id="{data["id"]}"' in content:
            print(f"Skipping {filename} - tips already injected.")
            continue

        # 1. Inject Link in TOC
        quiz_link = f'href="#{data["quiz_id"]}"'
        tips_link = f'href="#{data["id"]}" class="toc-item">{data["toc_text"]}</a>\n          <a {quiz_link}'
        
        # Replace first occurrence of the quiz link in TOC
        if quiz_link in content:
            content = content.replace(f'href="#{data["quiz_id"]}"', tips_link, 1)
        else:
            print(f"Warning: Quiz link not found in TOC of {filename}.")

        # 2. Inject Section before Quiz Section
        quiz_section_tag = f'<section id="{data["quiz_id"]}"'
        
        tips_section_html = f"""        <!-- Author Strategic Tips -->
        <section id="{data["id"]}" class="content-sec">
          <h2 class="sec-title">{data["title"]}</h2>
          <p>جمعنا لك هنا زبدة الخبرة العملية والنصائح الذهبية التي يركز عليها الكاتب في فصول كتابه للتنقيب والعمل الميداني الفعلي:</p>
          
          <div class="benefit-box">
            <ul style="margin: 0; padding-right: 20px;">
"""
        for tip in data['tips']:
            tips_section_html += f"              <li style='margin-bottom: 12px;'>{tip}</li>\n"
            
        tips_section_html += """            </ul>
          </div>
        </section>

        """
        
        if quiz_section_tag in content:
            content = content.replace(quiz_section_tag, tips_section_html + quiz_section_tag)
            print(f"Successfully injected tips section into {filename}.")
        else:
            print(f"Warning: Quiz section tag not found in {filename}.")

        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)

if __name__ == '__main__':
    inject_tips()
