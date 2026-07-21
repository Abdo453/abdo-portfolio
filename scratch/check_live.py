content = open(r'C:\Users\Computer Market\.gemini\antigravity\brain\429a135b-0511-429e-8032-643525cb7848\.system_generated\steps\493\content.md', encoding='utf-8').read()
checks = ['OSCP', 'PEN-200', 'Buffer Overflow', 'p_mcsa', 'Windows Server', 'MCSA', 'meth-ef-p_oscp', 'Red Forest', 'RHCSA', 'flashcard', 'IDS/Firewall Evasion', 'Maltego', 'Operation Red Forest']
for c in checks:
    found = c in content
    icon = "OK" if found else "MISSING"
    print(f"  [{icon}] {c}")
