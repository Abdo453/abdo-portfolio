content = open(r'C:\Users\Computer Market\.gemini\antigravity\brain\429a135b-0511-429e-8032-643525cb7848\.system_generated\steps\579\content.md', encoding='utf-8').read()

checks = [
    ('OSCP PEN-200 section', 'OSCP'),
    ('Buffer Overflow guide', 'Buffer Overflow'),
    ('Windows Server MCSA', 'MCSA'),
    ('RHCSA section', 'RHCSA'),
    ('EX200 Flashcards', 'flashcard'),
    ('EX200 Exam Simulator', 'EX200 Exam Simulator'),
    ('Maltego DNS Footprinting', 'Maltego'),
    ('IDS Firewall Evasion', 'IDS/Firewall Evasion'),
    ('CEH Malware/Fileless', 'Fileless Malware'),
    ('AD Case Study Red Forest', 'Red Forest'),
    ('Kerberoasting', 'Kerberoasting'),
    ('Privilege Escalation table', 'Privilege Escalation'),
    ('Boot Failure scenario', 'Boot Failure'),
    ('Hping3', 'hping3'),
    ('SNMP Enumeration', 'snmpwalk'),
]

print("=" * 52)
print("  LIVE SITE FINAL VERIFICATION")
print("=" * 52)
ok_count = 0
for label, keyword in checks:
    found = keyword in content
    if found:
        ok_count += 1
    status = "OK" if found else "MISSING"
    print(f"  [{status}] {label}")

print("=" * 52)
print(f"  {ok_count}/{len(checks)} checks passed")
if ok_count == len(checks):
    print("  STATUS: FULLY DEPLOYED")
elif ok_count >= len(checks) - 2:
    print("  STATUS: MOSTLY DEPLOYED (cached page, try Ctrl+F5)")
else:
    print("  STATUS: STILL DEPLOYING")
