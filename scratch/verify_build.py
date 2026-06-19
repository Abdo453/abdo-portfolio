html = open(r'd:\abdo_portfolio\build\methodology.html', encoding='utf-8').read()
checks = [
    ('OSCP', 'OSCP'),
    ('Flashcard', 'flashcard'),
    ('EX200 Exam Simulator', 'EX200 Exam Simulator'),
    ('Maltego', 'Maltego'),
    ('Hping3', 'hping3'),
    ('Red Forest', 'Red Forest'),
    ('Kerberoasting', 'Kerberoasting'),
    ('Fileless Malware', 'Fileless Malware'),
    ('RHCSA', 'RHCSA'),
    ('Boot Failure scenario', 'Boot Failure'),
    ('SNMP Enum', 'snmpwalk'),
    ('MCSA', 'MCSA'),
    ('Buffer Overflow', 'Buffer Overflow'),
    ('IDS Firewall Evasion', 'IDS/Firewall Evasion'),
    ('Active Directory Mindset', 'Red Team Mindset'),
]
ok = 0
for label, kw in checks:
    found = kw in html
    if found:
        ok += 1
    status = "OK" if found else "MISSING"
    print(f"  [{status}] {label}")

print(f"\nBUILD FILE: {ok}/{len(checks)} checks passed")
if ok == len(checks):
    print("BUILD IS PERFECT - Waiting for CDN cache to expire on live site")
