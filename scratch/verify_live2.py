content = open(r'C:\Users\Computer Market\.gemini\antigravity\brain\429a135b-0511-429e-8032-643525cb7848\.system_generated\steps\593\content.md', encoding='utf-8').read()
checks = [
    ('OSCP PEN-200', 'OSCP'),
    ('Buffer Overflow', 'Buffer Overflow'),
    ('Windows Server MCSA', 'MCSA'),
    ('RHCSA', 'RHCSA'),
    ('EX200 Flashcards', 'flashcard'),
    ('EX200 Exam Simulator', 'EX200 Exam Simulator'),
    ('Boot Failure scenario', 'Boot Failure'),
    ('Maltego DNS', 'Maltego'),
    ('IDS/Firewall Evasion', 'IDS/Firewall Evasion'),
    ('Fileless Malware', 'Fileless Malware'),
    ('Red Forest Case Study', 'Red Forest'),
    ('Kerberoasting', 'Kerberoasting'),
    ('SNMP Enumeration', 'snmpwalk'),
    ('Hping3', 'hping3'),
    ('Red Team Mindset', 'Red Team Mindset'),
]
ok = 0
for label, kw in checks:
    found = kw in content
    if found:
        ok += 1
    status = "OK" if found else "MISSING"
    print(f"  [{status}] {label}")

print(f"\nLIVE SITE: {ok}/{len(checks)} checks passed")
