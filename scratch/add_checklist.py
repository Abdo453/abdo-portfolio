import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod2.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

checklist_html = """
    <!-- 5.5 Interactive Checklist -->
    <div class="cyber-card" style="border-left: 4px solid #f1fa8c;">
        <h2><i class="fas fa-check-square"></i> قائمة المهام التفاعلية (Interactive Checklist)</h2>
        <p>احفظ تقدمك! سيتم حفظ العلامات التي تضعها هنا في متصفحك تلقائياً.</p>
        
        <div class="checklist-container" id="recon-checklist" style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 6px;">
            <div class="check-step" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #444; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <input type="checkbox" id="step1" class="recon-cb" style="transform: scale(1.3); margin-right: 10px;">
                    <label for="step1" style="font-size: 1.1em; color: #f8f8f2; cursor: pointer;">1. Define scope boundaries & wildcard targets</label>
                    <div style="font-size: 0.85em; color: #6272a4; margin-top: 5px; margin-left: 25px;">Est. time: 15 min | <a href="https://hackerone.com" target="_blank" style="color: #8be9fd;">📄 Scope Rules</a></div>
                </div>
            </div>

            <div class="check-step" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #444; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <input type="checkbox" id="step2" class="recon-cb" style="transform: scale(1.3); margin-right: 10px;">
                    <label for="step2" style="font-size: 1.1em; color: #f8f8f2; cursor: pointer;">2. Run Subdomain Enumeration (Passive + Active)</label>
                    <div style="font-size: 0.85em; color: #6272a4; margin-top: 5px; margin-left: 25px;">Est. time: 5-30 min</div>
                </div>
                <button onclick="navigator.clipboard.writeText('subfinder -d target.com -all | httpx > live.txt'); this.innerText='📋 Copied!';" style="background: #44475a; color: #f8f8f2; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-family: var(--font-mono); font-size: 0.9em;">
                    📋 Copy Command
                </button>
            </div>

            <div class="check-step" style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #444; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <input type="checkbox" id="step3" class="recon-cb" style="transform: scale(1.3); margin-right: 10px;">
                    <label for="step3" style="font-size: 1.1em; color: #f8f8f2; cursor: pointer;">3. Perform Zone Transfers & DNS Records extraction</label>
                    <div style="font-size: 0.85em; color: #6272a4; margin-top: 5px; margin-left: 25px;">Est. time: 5 min</div>
                </div>
                <button onclick="navigator.clipboard.writeText('dig axfr @ns.target.com target.com'); this.innerText='📋 Copied!';" style="background: #44475a; color: #f8f8f2; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-family: var(--font-mono); font-size: 0.9em;">
                    📋 Copy Command
                </button>
            </div>

            <div class="check-step" style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <input type="checkbox" id="step4" class="recon-cb" style="transform: scale(1.3); margin-right: 10px;">
                    <label for="step4" style="font-size: 1.1em; color: #f8f8f2; cursor: pointer;">4. Extract IPs, ASNs, and identify Cloud WAFs</label>
                    <div style="font-size: 0.85em; color: #6272a4; margin-top: 5px; margin-left: 25px;">Est. time: 10 min</div>
                </div>
                <button onclick="navigator.clipboard.writeText('cat live.txt | dnsx -a -resp'); this.innerText='📋 Copied!';" style="background: #44475a; color: #f8f8f2; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-family: var(--font-mono); font-size: 0.9em;">
                    📋 Copy Command
                </button>
            </div>
        </div>
        
        <script>
            // Restore from localStorage
            var checkboxes = document.querySelectorAll('.recon-cb');
            checkboxes.forEach(function(cb) {
                var saved = localStorage.getItem('recon_' + cb.id);
                if(saved === 'true') cb.checked = true;
                
                cb.addEventListener('change', function() {
                    localStorage.setItem('recon_' + this.id, this.checked);
                });
            });
        </script>
    </div>
"""

if "Interactive Checklist" not in html:
    html = html.replace("<!-- 6. Lab -->", checklist_html + "\n    <!-- 6. Lab -->")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added Interactive Checklist to pt_mod2.html")
else:
    print("Checklist already exists")
