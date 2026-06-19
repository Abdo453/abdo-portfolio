import urllib.request

url = 'https://raw.githubusercontent.com/Abdo453/abdo-portfolio/master/build/methodology.html'
with urllib.request.urlopen(url) as r:
    content = r.read().decode('utf-8')

checks = ['flashcard', 'Red Forest', 'Kerberoasting', 'Maltego', 'Fileless Malware', 'Boot Failure', 'hping3', 'EX200 Exam Simulator', 'OSCP', 'MCSA']
print(f"Raw GitHub file size: {len(content)} chars ({len(content)//1024} KB)")
ok = 0
for c in checks:
    found = c in content
    if found:
        ok += 1
    status = "OK" if found else "MISSING"
    print(f"  [{status}] {c}")
print(f"\nGitHub RAW: {ok}/{len(checks)} OK")
