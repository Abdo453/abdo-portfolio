import json

filepath = 'd:/abdo_portfolio/build/ccna/data/labs.json'
with open(filepath, 'r', encoding='utf-8') as f:
    labs_data = json.load(f)

# The correct Domain names
domain_map = {
    "Domain 1: Network Fundamentals": "Domain 1: Network Fundamentals",
    "Domain 2: Switching": "Domain 2: Network Access",
    "Domain 2: Network Access": "Domain 2: Network Access",
    "Domain 3: Routing": "Domain 3: IP Connectivity",
    "Domain 3: IP Connectivity": "Domain 3: IP Connectivity",
    "Domain 4: IP Services": "Domain 4: IP Services",
    "Domain 5: Security": "Domain 5: Security Fundamentals",
    "Domain 5: Security Fundamentals": "Domain 5: Security Fundamentals",
    "Domain 6: Automation": "Domain 6: Automation and Programmability",
    "Domain 6: Automation and Programmability": "Domain 6: Automation and Programmability"
}

for phase in labs_data:
    old_name = phase.get('phase', '')
    if old_name in domain_map:
        phase['phase'] = domain_map[old_name]

# Ensure we have exactly 6 domains
current_domains = [p['phase'] for p in labs_data]
all_domains = list(dict.fromkeys(domain_map.values())) # Unique domain names

for d in all_domains:
    if d not in current_domains:
        labs_data.append({"phase": d, "levels": []})

# Sort them according to CCNA order
def get_domain_num(phase_name):
    import re
    m = re.search(r'Domain (\d)', phase_name)
    return int(m.group(1)) if m else 99

labs_data.sort(key=lambda x: get_domain_num(x['phase']))

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(labs_data, f, indent=4, ensure_ascii=False)

print("Updated labs.json domains")
