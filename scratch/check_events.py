import urllib.request, json
url = 'https://api.github.com/repos/Abdo453/abdo-portfolio/events'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        events = json.loads(response.read().decode('utf-8'))
        for event in events:
            if event['type'] == 'PushEvent':
                commits = event['payload'].get('commits', [])
                for c in commits:
                    print(f"Commit: {c['sha']}, Message: {c['message']}, Time: {event['created_at']}")
except Exception as e:
    print('Error:', e)
