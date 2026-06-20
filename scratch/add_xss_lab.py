import re

file_path = r"d:\abdo_portfolio\main\static\main\modules\pt_mod7.html"
with open(file_path, "r", encoding="utf-8") as f:
    html = f.read()

xss_lab_html = """
    <!-- 5.5 INTERACTIVE LAB: XSS SIMULATOR -->
    <div class="cyber-card interactive-lab-card" style="border-left: 4px solid #ff79c6;">
        <h2 style="color: #ff79c6;">[Interactive Lab] بيئة تفاعلية: XSS & WAF Evasion</h2>
        <p>هذه البيئة تحاكي ثغرة <strong>Reflected XSS</strong>. الهدف هو تنفيذ كود جافاسكريبت وتخطي حماية الـ WAF (جدار الحماية).</p>
        
        <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <p style="margin-top: 0; font-family: var(--font-mono); color: #8be9fd;"><strong>السيناريو:</strong> موقع يطبع اسمك في الصفحة. الـ WAF يمنع كلمة <code>script</code> و <code>alert(1)</code>.</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <input type="text" id="xssPayloadInput" placeholder="Enter payload here (e.g. <img src=x onerror=prompt(1)>)" style="flex: 1; padding: 10px; background: #1e1e1e; border: 1px solid #444; color: #fff; font-family: var(--font-mono); border-radius: 4px;">
                <button onclick="runXssSimulator()" style="background: #ff79c6; color: #1e1e1e; font-weight: bold; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Execute 🚀</button>
            </div>
        </div>

        <div style="background: #1e1e1e; border: 1px solid #444; min-height: 100px; padding: 15px; border-radius: 4px; font-family: sans-serif; color: #fff; position: relative;">
            <div style="position: absolute; top: -10px; left: 15px; background: #444; padding: 2px 8px; font-size: 12px; border-radius: 4px;">Browser DOM Reflection</div>
            <h3>Hello, <span id="xssReflectionPoint">Guest</span>!</h3>
            <div id="wafAlert" style="display: none; color: #ff5555; margin-top: 10px; font-weight: bold; font-family: var(--font-mono);">[!] WAF BLOCKED: Malicious Payload Detected</div>
            <div id="successAlert" style="display: none; color: #50fa7b; margin-top: 10px; font-weight: bold; font-family: var(--font-mono);">[+] EXPLOIT SUCCESS: XSS Executed! Bounty: $500 💰</div>
        </div>
        
        <script>
            function runXssSimulator() {
                var payload = document.getElementById('xssPayloadInput').value;
                var reflectionPoint = document.getElementById('xssReflectionPoint');
                var wafAlert = document.getElementById('wafAlert');
                var successAlert = document.getElementById('successAlert');
                
                wafAlert.style.display = 'none';
                successAlert.style.display = 'none';
                
                // WAF Rules Simulation
                if (payload.toLowerCase().includes('script') || payload.includes('alert(1)')) {
                    wafAlert.style.display = 'block';
                    reflectionPoint.innerText = 'Blocked by WAF';
                    return;
                }
                
                // Reflect payload unsafely to simulate DOM XSS
                reflectionPoint.innerHTML = payload;
                
                // Determine Success
                if (payload.toLowerCase().includes('onerror') || payload.toLowerCase().includes('onload') || payload.toLowerCase().includes('onmouseover')) {
                    if (payload.toLowerCase().includes('prompt') || payload.toLowerCase().includes('alert') || payload.toLowerCase().includes('confirm')) {
                        successAlert.style.display = 'block';
                        // Execute the XSS safely in context
                        setTimeout(function(){
                            try {
                                alert("XSS LAB EXECUTED:\\n" + payload);
                            } catch(e) {}
                        }, 500);
                    }
                }
            }
        </script>
    </div>
"""

# Insert before "<!-- 6. Lab -->"
if "<!-- 6. Lab -->" in html and "INTERACTIVE LAB" not in html:
    html = html.replace("<!-- 6. Lab -->", xss_lab_html + "\n    <!-- 6. Lab -->")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Added Interactive Lab to pt_mod7")
else:
    print("Already added or could not find insertion point")
