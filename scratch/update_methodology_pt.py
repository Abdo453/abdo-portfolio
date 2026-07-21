import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

sidebar_html = """
      <!-- Category: COMPLETE PENTESTING GUIDE -->
      <div class="sidebar-category">
        <div class="category-title" onclick="toggleCategory('cat-pentest')">
          <span>🎯 PENTESTING GUIDE</span>
          <span>▼</span>
        </div>
        <div class="category-items" id="cat-pentest" style="display: none;">
          <div class="meth-item" id="meth-ef-pt_mod1" onclick="openMethPhase('pt_mod1')" data-search="active reconnaissance dns brute force">
            1. Active Reconnaissance
          </div>
          <div class="meth-item" id="meth-ef-pt_mod2" onclick="openMethPhase('pt_mod2')" data-search="content discovery directory fuzzing">
            2. Content Discovery
          </div>
          <div class="meth-item" id="meth-ef-pt_mod3" onclick="openMethPhase('pt_mod3')" data-search="port scanning nmap masscan naabu">
            3. Port Scanning & Enum
          </div>
          <div class="meth-item" id="meth-ef-pt_mod4" onclick="openMethPhase('pt_mod4')" data-search="web application testing owasp top 10">
            4. Web App Testing
          </div>
          <div class="meth-item" id="meth-ef-pt_mod5" onclick="openMethPhase('pt_mod5')" data-search="api testing graphql rest jwt">
            5. API Testing
          </div>
          <div class="meth-item" id="meth-ef-pt_mod6" onclick="openMethPhase('pt_mod6')" data-search="cloud infrastructure testing aws azure">
            6. Cloud & Infra Testing
          </div>
          <div class="meth-item" id="meth-ef-pt_mod7" onclick="openMethPhase('pt_mod7')" data-search="network layer testing vpn dns">
            7. Network Layer Testing
          </div>
          <div class="meth-item" id="meth-ef-pt_mod8" onclick="openMethPhase('pt_mod8')" data-search="post exploitation privilege escalation lateral movement">
            8. Post-Exploitation
          </div>
          <div class="meth-item" id="meth-ef-pt_mod9" onclick="openMethPhase('pt_mod9')" data-search="pentesting methodologies ptes nist">
            9. Methodologies
          </div>
          <div class="meth-item" id="meth-ef-pt_mod10" onclick="openMethPhase('pt_mod10')" data-search="essential tools reference wordlists">
            10. Tools Reference
          </div>
        </div>
      </div>
"""

# Insert the sidebar category before <!-- Category 7: CEH MASTERCLASS --> or at the end of sidebar categories
insert_marker = '<!-- Category 7: CEH MASTERCLASS'
if insert_marker in html:
    html = html.replace(insert_marker, sidebar_html + '\n      ' + insert_marker)
else:
    print("Could not find insert marker for sidebar")

include_html = """
      <!-- PENTESTING GUIDE MODULES -->
      {% include 'main/modules/pt_mod1_active_recon.html' %}
      {% include 'main/modules/pt_mod2_content_discovery.html' %}
      {% include 'main/modules/pt_mod3_port_scanning.html' %}
      {% include 'main/modules/pt_mod4_web_app.html' %}
      {% include 'main/modules/pt_mod5_api_testing.html' %}
      {% include 'main/modules/pt_mod6_cloud_infra.html' %}
      {% include 'main/modules/pt_mod7_network.html' %}
      {% include 'main/modules/pt_mod8_post_exploit.html' %}
      {% include 'main/modules/pt_mod9_methodologies.html' %}
      {% include 'main/modules/pt_mod10_tools_ref.html' %}
"""

# Insert the includes just before <!-- Category 7: CEH MASTERCLASS (MISSING MODULES) --> in the body or at the end
# Actually, the includes are placed inside the <div class="meth-viewer" id="mainViewer">
# Let's insert it before {% include 'main/modules/recon_subdomain.html' %}
include_marker = "{% include 'main/modules/recon_subdomain.html' %}"
if include_marker in html:
    html = html.replace(include_marker, include_html + '\n      ' + include_marker)
else:
    print("Could not find insert marker for includes")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Updated methodology.html successfully.")
