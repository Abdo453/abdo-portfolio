import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Mermaid JS if not exists
if 'mermaid.min.js' not in html:
    html = html.replace('{% block content %}', '{% block content %}\n<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>\n<script>mermaid.initialize({startOnLoad:true, theme: "dark"});</script>')

# 2. Update the Sidebar Category items for PENTESTING GUIDE
new_sidebar_items = """
        <div class="category-items" id="cat-pentest" style="display: none;">
          <div class="meth-item" id="meth-ef-pt_mod1" onclick="openMethPhase('pt_mod1')" data-search="fundamentals ethical hacking basics">01. Fundamentals</div>
          <div class="meth-item" id="meth-ef-pt_mod2" onclick="openMethPhase('pt_mod2')" data-search="active reconnaissance dns enum">02. Active Recon</div>
          <div class="meth-item" id="meth-ef-pt_mod3" onclick="openMethPhase('pt_mod3')" data-search="passive reconnaissance osint theharvester">03. Passive Recon</div>
          <div class="meth-item" id="meth-ef-pt_mod4" onclick="openMethPhase('pt_mod4')" data-search="content discovery directory fuzzing js">04. Content Discovery</div>
          <div class="meth-item" id="meth-ef-pt_mod5" onclick="openMethPhase('pt_mod5')" data-search="port scanning nmap masscan">05. Port Scanning</div>
          <div class="meth-item" id="meth-ef-pt_mod6" onclick="openMethPhase('pt_mod6')" data-search="service enumeration snmp smb">06. Service Enumeration</div>
          <div class="meth-item" id="meth-ef-pt_mod7" onclick="openMethPhase('pt_mod7')" data-search="web testing owasp sqli xss">07. Web Testing</div>
          <div class="meth-item" id="meth-ef-pt_mod8" onclick="openMethPhase('pt_mod8')" data-search="api testing graphql rest jwt">08. API Testing</div>
          <div class="meth-item" id="meth-ef-pt_mod9" onclick="openMethPhase('pt_mod9')" data-search="authentication authorization session oauth saml oidc sso jwt">09. Authentication</div>
          <div class="meth-item" id="meth-ef-pt_mod10" onclick="openMethPhase('pt_mod10')" data-search="advanced vulnerabilities ssrf ssti xxe cache poisoning race conditions">10. Advanced Vulns</div>
          <div class="meth-item" id="meth-ef-pt_mod11" onclick="openMethPhase('pt_mod11')" data-search="client side security cors websocket csp dom xss">11. Client Side</div>
          <div class="meth-item" id="meth-ef-pt_mod12" onclick="openMethPhase('pt_mod12')" data-search="cloud aws azure gcp">12. Cloud</div>
          <div class="meth-item" id="meth-ef-pt_mod13" onclick="openMethPhase('pt_mod13')" data-search="network pivot vpn routing">13. Network</div>
          <div class="meth-item" id="meth-ef-pt_mod14" onclick="openMethPhase('pt_mod14')" data-search="active directory ad kerberos bloodhound">14. Active Directory</div>
          <div class="meth-item" id="meth-ef-pt_mod15" onclick="openMethPhase('pt_mod15')" data-search="post exploitation privilege escalation c2">15. Post Exploitation</div>
          <div class="meth-item" id="meth-ef-pt_mod16" onclick="openMethPhase('pt_mod16')" data-search="reporting cvss executive summary">16. Reporting</div>
          <div class="meth-item" id="meth-ef-pt_mod17" onclick="openMethPhase('pt_mod17')" data-search="methodologies ptes nist isaf">17. Methodologies</div>
          <div class="meth-item" id="meth-ef-pt_mod18" onclick="openMethPhase('pt_mod18')" data-search="bug bounty scope automation">18. Bug Bounty</div>
          <div class="meth-item" id="meth-ef-pt_mod19" onclick="openMethPhase('pt_mod19')" data-search="labs practice htb thm portswigger">19. Labs</div>
          <div class="meth-item" id="meth-ef-pt_mod20" onclick="openMethPhase('pt_mod20')" data-search="tools reference wordlists">20. Tools Reference</div>
        </div>
"""

# Replace existing cat-pentest
pattern = r'<div class="category-items" id="cat-pentest".*?</div>\s*</div>'
html = re.sub(pattern, new_sidebar_items + '\n      </div>', html, flags=re.DOTALL)

# Update includes to go up to pt_mod20
includes_html = "      <!-- PENTESTING GUIDE MODULES -->\n"
for i in range(1, 21):
    includes_html += f"      {{% include 'main/modules/pt_mod{i}.html' %}}\n"

# Replace the existing REAL ASSESSMENTS MODULES to just below it
html = re.sub(r'<!-- PENTESTING GUIDE MODULES -->.*?<!-- REAL ASSESSMENTS MODULES -->', includes_html + '      <!-- REAL ASSESSMENTS MODULES -->', html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html for 20 modules.")

# 3. Update methodology.js mappings
js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

new_pt_mapping = """
        // Pentesting Guide
        if (phaseId === 'pt_mod1') return '01. Fundamentals';
        if (phaseId === 'pt_mod2') return '02. Active Recon';
        if (phaseId === 'pt_mod3') return '03. Passive Recon';
        if (phaseId === 'pt_mod4') return '04. Content Discovery';
        if (phaseId === 'pt_mod5') return '05. Port Scanning';
        if (phaseId === 'pt_mod6') return '06. Service Enumeration';
        if (phaseId === 'pt_mod7') return '07. Web Testing';
        if (phaseId === 'pt_mod8') return '08. API Testing';
        if (phaseId === 'pt_mod9') return '09. Authentication';
        if (phaseId === 'pt_mod10') return '10. Advanced Vulns';
        if (phaseId === 'pt_mod11') return '11. Client Side';
        if (phaseId === 'pt_mod12') return '12. Cloud';
        if (phaseId === 'pt_mod13') return '13. Network';
        if (phaseId === 'pt_mod14') return '14. Active Directory';
        if (phaseId === 'pt_mod15') return '15. Post Exploitation';
        if (phaseId === 'pt_mod16') return '16. Reporting';
        if (phaseId === 'pt_mod17') return '17. Methodologies';
        if (phaseId === 'pt_mod18') return '18. Bug Bounty';
        if (phaseId === 'pt_mod19') return '19. Labs';
        if (phaseId === 'pt_mod20') return '20. Tools Reference';
"""

# Replace the old pt_mapping inside getPhaseTitle
js = re.sub(r'// Pentesting Guide.*?10\. Tools Reference\';', new_pt_mapping.strip(), js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js for 20 modules.")

