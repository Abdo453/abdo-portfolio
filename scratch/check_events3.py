import urllib.request, json
url = 'https://api.github.com/repos/Abdo453/abdo-portfolio/events'
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        events = json.loads(response.read().decode('utf-8'))
        for event in events:
            if event['type'] == 'PushEvent':
                commits = event['payload'].get('commits', [])
                if commits:
                    print(f"{event['created_at']} -> {commits[0]['message'][:60]}")
except Exception as e:
    print('Error:', e)
