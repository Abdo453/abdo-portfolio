import urllib.request, json
url = 'https://api.github.com/repos/Abdo453/abdo-portfolio/events'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        events = json.loads(response.read().decode('utf-8'))
        for event in events:
            if event['type'] == 'PushEvent':
                print(f"PushEvent at {event['created_at']}")
                for c in event['payload'].get('commits', []):
                    print(f"  - {c['sha'][:7]}: {c['message']}")
except Exception as e:
    print('Error:', e)
