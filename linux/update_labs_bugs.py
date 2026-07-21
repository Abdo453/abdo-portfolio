import json

filepath = 'd:/abdo_portfolio/build/ccna/data/labs.json'
with open(filepath, 'r', encoding='utf-8') as f:
    labs = json.load(f)

# Domain 1 is at index 0
domain1 = labs[0]

# Level 0: Device Initialization
# Challenge: change hostname to R1
domain1['levels'][0]['topology'] = """
[Console PC] ---- (Console Cable) ---- [Router]
"""
domain1['levels'][0]['bugs'] = [
    {
        "description": "The router has a wrong hostname.",
        "state": { "hostname": "Switch" }
    }
]

# Level 1: Setting Passwords
# Challenge: set enable secret to cisco
domain1['levels'][1]['topology'] = """
[Admin PC] ---- (SSH) ---- [R1]
"""
domain1['levels'][1]['bugs'] = [
    {
        "description": "The secret password is set to 'wrongpass'.",
        "state": { "enableSecret": "wrongpass" }
    }
]

# Level 2: Interface Configuration
# Challenge: IP 192.168.1.1/24 on fa0/0 and no shut
domain1['levels'][2]['topology'] = """
[PC 192.168.1.10] ---- (fa0/0) [R1] (s0/0/0) ---- [Internet]
"""
domain1['levels'][2]['bugs'] = [
    {
        "description": "Interface is administratively down.",
        "state": { "interfaces": { "fa0/0": { "ip": "192.168.1.1", "mask": "255.255.255.0", "shutdown": True } } }
    },
    {
        "description": "Wrong IP address configured.",
        "state": { "interfaces": { "fa0/0": { "ip": "10.0.0.1", "mask": "255.0.0.0", "shutdown": False } } }
    }
]

# Level 3: IPv6 Configuration
# Challenge: ipv6 unicast-routing, int fa0/0, ipv6 addr 2001:db8::1/64, no shut
domain1['levels'][3]['topology'] = """
[IPv6 PC] ---- (fa0/0) [R1]
"""
domain1['levels'][3]['bugs'] = [
    {
        "description": "IPv6 routing is disabled.",
        "state": { "ipv6Routing": False, "interfaces": { "fa0/0": { "ipv6": "2001:db8::1/64", "shutdown": False } } }
    },
    {
        "description": "Interface is shutdown.",
        "state": { "ipv6Routing": True, "interfaces": { "fa0/0": { "ipv6": "2001:db8::1/64", "shutdown": True } } }
    }
]

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(labs, f, indent=4, ensure_ascii=False)

print("Added topology and bugs to Domain 1 labs.")
