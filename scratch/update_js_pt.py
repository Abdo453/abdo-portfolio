import re

js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# I want to add mapping for pt_mod
pt_mapping = """
        // Pentesting Guide
        if (phaseId === 'pt_mod1') return '1. Active Reconnaissance';
        if (phaseId === 'pt_mod2') return '2. Content Discovery';
        if (phaseId === 'pt_mod3') return '3. Port Scanning & Enum';
        if (phaseId === 'pt_mod4') return '4. Web App Testing';
        if (phaseId === 'pt_mod5') return '5. API Testing';
        if (phaseId === 'pt_mod6') return '6. Cloud & Infra Testing';
        if (phaseId === 'pt_mod7') return '7. Network Layer Testing';
        if (phaseId === 'pt_mod8') return '8. Post-Exploitation';
        if (phaseId === 'pt_mod9') return '9. Methodologies';
        if (phaseId === 'pt_mod10') return '10. Tools Reference';
"""

# Find getPhaseTitle function
if "function getPhaseTitle(phaseId) {" in js:
    js = js.replace("function getPhaseTitle(phaseId) {", "function getPhaseTitle(phaseId) {" + pt_mapping)
else:
    print("Could not find getPhaseTitle")

# Find getCategoryForPhase function
pt_cat_mapping = """
      if (phaseId.startsWith('pt_mod')) return 'Pentesting Guide';
"""
if "function getCategoryForPhase(phaseId) {" in js:
    js = js.replace("function getCategoryForPhase(phaseId) {", "function getCategoryForPhase(phaseId) {" + pt_cat_mapping)
else:
    print("Could not find getCategoryForPhase")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js successfully.")
