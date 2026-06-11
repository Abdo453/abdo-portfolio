import urllib.request

url = "https://abdo453.github.io/abdo-portfolio/build/ccna/academy_v17.js"
try:
    req = urllib.request.urlopen(url)
    content = req.read().decode('utf-8')
    print("SUCCESS: File loaded.")
    print("Length:", len(content))
    print("Domain 2 check:", "Domain 2: Network Access" in content)
    print("access_vlan_trunk check:", "access_vlan_trunk" in content)
except Exception as e:
    print("ERROR:", e)
