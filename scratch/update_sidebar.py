import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

new_sidebar_content = """        <div class="category-items" id="cat-pentest" style="display: none;">
          
          <div style="padding-left:15px; color:#ff79c6; font-size:12px; margin-top:10px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 1: RECON</div>
          <div class="meth-item" id="meth-ef-pt_mod1" onclick="openMethPhase('pt_mod1')" data-search="fundamentals ethical hacking basics">01. Fundamentals</div>
          <div class="meth-item" id="meth-ef-pt_mod2" onclick="openMethPhase('pt_mod2')" data-search="active reconnaissance dns enum">02. Active Recon</div>
          <div class="meth-item" id="meth-ef-pt_mod3" onclick="openMethPhase('pt_mod3')" data-search="passive reconnaissance osint theharvester">03. Passive Recon</div>
          <div class="meth-item" id="meth-ef-pt_mod4" onclick="openMethPhase('pt_mod4')" data-search="content discovery directory fuzzing js">04. Content Discovery</div>
          <div class="meth-item" id="meth-ef-pt_mod5" onclick="openMethPhase('pt_mod5')" data-search="port scanning nmap masscan">05. Port Scanning</div>
          <div class="meth-item" id="meth-ef-pt_mod6" onclick="openMethPhase('pt_mod6')" data-search="service enumeration snmp smb">06. Service Enum</div>

          <div style="padding-left:15px; color:#50fa7b; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 2: WEB & API</div>
          <div class="meth-item" id="meth-ef-pt_mod7" onclick="openMethPhase('pt_mod7')" data-search="web testing owasp sqli xss">07. Web Testing</div>
          <div class="meth-item" id="meth-ef-pt_mod8" onclick="openMethPhase('pt_mod8')" data-search="api testing graphql rest jwt">08. API Testing</div>
          <div class="meth-item" id="meth-ef-pt_mod9" onclick="openMethPhase('pt_mod9')" data-search="authentication authorization session oauth saml oidc sso jwt">09. Authentication</div>
          <div class="meth-item" id="meth-ef-pt_mod10" onclick="openMethPhase('pt_mod10')" data-search="advanced vulnerabilities ssrf ssti xxe cache poisoning race conditions">10. Advanced Vulns</div>
          <div class="meth-item" id="meth-ef-pt_mod11" onclick="openMethPhase('pt_mod11')" data-search="client side security cors websocket csp dom xss">11. Client Side</div>

          <div style="padding-left:15px; color:#8be9fd; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 3: INFRASTRUCTURE</div>
          <div class="meth-item" id="meth-ef-pt_mod12" onclick="openMethPhase('pt_mod12')" data-search="cloud aws azure gcp">12. Cloud Security</div>
          <div class="meth-item" id="meth-ef-pt_mod13" onclick="openMethPhase('pt_mod13')" data-search="network pivot vpn routing">13. Network Pivot</div>
          <div class="meth-item" id="meth-ef-pt_mod14" onclick="openMethPhase('pt_mod14')" data-search="active directory ad kerberos bloodhound">14. Active Directory</div>

          <div style="padding-left:15px; color:#bd93f9; font-size:12px; margin-top:15px; margin-bottom:5px; font-family: var(--font-mono); letter-spacing: 0.1em;">█ PHASE 4: POST-EXPLOIT</div>
          <div class="meth-item" id="meth-ef-pt_mod15" onclick="openMethPhase('pt_mod15')" data-search="post exploitation privilege escalation c2">15. Privilege Escalation</div>
          <div class="meth-item" id="meth-ef-pt_mod16" onclick="openMethPhase('pt_mod16')" data-search="reporting cvss executive summary">16. Reporting</div>
          <div class="meth-item" id="meth-ef-pt_mod17" onclick="openMethPhase('pt_mod17')" data-search="methodologies ptes nist isaf">17. Frameworks</div>
          <div class="meth-item" id="meth-ef-pt_mod18" onclick="openMethPhase('pt_mod18')" data-search="bug bounty scope automation">18. Bug Bounty</div>
          <div class="meth-item" id="meth-ef-pt_mod19" onclick="openMethPhase('pt_mod19')" data-search="labs practice htb thm portswigger">19. Practice Labs</div>
          <div class="meth-item" id="meth-ef-pt_mod20" onclick="openMethPhase('pt_mod20')" data-search="tools reference wordlists">20. Tools Reference</div>
        </div>"""

pattern = r'<div class="category-items" id="cat-pentest".*?</div>\s*</div>'
html = re.sub(pattern, new_sidebar_content + '\n      </div>', html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html sidebar")
