import urllib.request, json
url = 'https://api.github.com/users/Abdo453/events'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        events = json.loads(response.read().decode('utf-8'))
        for event in events:
            if event['type'] == 'PushEvent':
                for c in event['payload'].get('commits', []):
                    print(f"{event['created_at']} -> {c['sha'][:7]}: {c['message'][:60]}")
except Exception as e:
    print('Error:', e)
