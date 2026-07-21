import re

html_file = r'D:\abdo_portfolio\build\ccna\interview.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace everything inside interview-container with dynamic root
new_container = """
    <div class="interview-container">
        <h2 style="text-align: center; margin-bottom: 30px; color: #fff;">أهم أسئلة المقابلات الشخصية (CCNA)</h2>
        <div id="interviewsRoot"></div>
    </div>
"""
content = re.sub(r'<div class="interview-container">.*?</div>\s*</div>', new_container, content, flags=re.DOTALL)

# Add script to render the data and import interviews.js
scripts = """
    <script src="interviews.js?v=13"></script>
    <script>
        function toggleFaq(el) {
            const answer = el.nextElementSibling;
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
            } else {
                answer.classList.add('active');
            }
        }
        
        function renderInterviews() {
            const root = document.getElementById('interviewsRoot');
            if(!root || typeof interviewsData === 'undefined') return;
            
            let html = '';
            let qIndex = 1;
            
            interviewsData.forEach((category, cIdx) => {
                html += `<h3 style="color: var(--accent); margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 5px;">${category.category}</h3>`;
                
                category.questions.forEach((q, qIdx) => {
                    const hintId = `hint_${cIdx}_${qIdx}`;
                    const ansId = `ans_${cIdx}_${qIdx}`;
                    html += `
                        <div class="faq-item" style="padding: 20px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 20px; background: var(--bg-color);">
                            <div class="faq-question" style="font-size: 1.2rem; margin-bottom: 15px; font-weight: bold; color: #fff;">${qIndex}. ${q.q}</div>
                            
                            <button class="btn btn-next" onclick="document.getElementById('${hintId}').style.display = 'block'; this.style.display='none';">تلميح (Hint)</button>
                            
                            <div id="${hintId}" style="display: none; margin-top: 15px; padding: 15px; background: rgba(255, 176, 32, 0.1); border-left: 4px solid #ffb020; border-radius: 4px; color: #c9d1d9;">
                                <p><strong>تلميح:</strong> ${q.hint}</p>
                                <button class="btn btn-finish" style="margin-top: 10px;" onclick="document.getElementById('${ansId}').style.display = 'block'; this.style.display='none';">إظهار الإجابة الكاملة</button>
                            </div>

                            <div id="${ansId}" style="display: none; margin-top: 15px; padding: 15px; background: rgba(46, 160, 67, 0.1); border-left: 4px solid var(--success); border-radius: 4px; color: #fff; line-height: 1.8;">
                                <strong>الإجابة النموذجية:</strong>
                                <div style="margin-top: 10px;">${q.ans}</div>
                            </div>
                        </div>
                    `;
                    qIndex++;
                });
            });
            
            root.innerHTML = html;
        }
        
        window.onload = () => {
            renderInterviews();
        };
    </script>
    <script src="features.js?v=13"></script>
</body>
</html>
"""

content = re.sub(r'<script>\s*function toggleFaq.*?</script>\s*<script src="features.js"></script>\s*</body>\s*</html>', scripts, content, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("interview.html modified successfully!")
