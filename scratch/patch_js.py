import re

file_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"
with open(file_path, "r", encoding="utf-8") as f:
    js = f.read()

# Fix lazy loading condition
old_cond = "if (!activeContent && (phaseId.startsWith('pt_mod') || phaseId.startsWith('assess'))) {"
new_cond = "if (!activeContent && (phaseId.startsWith('pt_mod') || phaseId.startsWith('assess') || phaseId.startsWith('mod'))) {"
if old_cond in js:
    js = js.replace(old_cond, new_cond)

# Add mapping for modX to modX_XXX.html
# Let's just fix `filename` logic:
old_filename_logic = """
        let filename = phaseId + '.html';
        if (phaseId === 'assess-htb') filename = 'mod_assess_htb.html';
        if (phaseId === 'assess-bb') filename = 'mod_assess_bugbounty.html';
        if (phaseId === 'assess-ad') filename = 'mod_assess_ad.html';
"""
new_filename_logic = """
        let filename = phaseId + '.html';
        if (phaseId === 'assess-htb') filename = 'mod_assess_htb.html';
        if (phaseId === 'assess-bb') filename = 'mod_assess_bugbounty.html';
        if (phaseId === 'assess-ad') filename = 'mod_assess_ad.html';
        if (phaseId === 'mod1') filename = 'mod1_intro.html';
        if (phaseId === 'mod2') filename = 'mod2_footprinting.html';
        if (phaseId === 'mod3') filename = 'mod3_scanning.html';
        if (phaseId === 'mod4') filename = 'mod4_enumeration.html';
        if (phaseId === 'mod5') filename = 'mod5_vuln_analysis.html';
        if (phaseId === 'mod7') filename = 'mod7_malware.html';
        if (phaseId === 'mod8') filename = 'mod8_sniffing.html';
        if (phaseId === 'mod9') filename = 'mod9_social_eng.html';
        if (phaseId === 'mod10') filename = 'mod10_dos.html';
        if (phaseId === 'mod11') filename = 'mod11_session_hijacking.html';
        if (phaseId === 'mod12') filename = 'mod12_evasion.html';
        if (phaseId === 'mod13') filename = 'mod13_web_servers.html';
"""
if "if (phaseId === 'assess-ad') filename = 'mod_assess_ad.html';" in js and "mod2_footprinting" not in js:
    js = js.replace(old_filename_logic, new_filename_logic)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(js)

print("methodology.js updated for CEH modules")
