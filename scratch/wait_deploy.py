import urllib.request
import time
import sys

url = "https://abdo453.github.io/abdo-portfolio/ccna/academy.html"
for _ in range(30):
    try:
        req = urllib.request.urlopen(url)
        content = req.read().decode('utf-8')
        if "v=19" in content:
            print("DEPLOYED!")
            sys.exit(0)
    except Exception as e:
        pass
    time.sleep(5)
print("TIMEOUT")
