import urllib.request
import json

def check_runs():
    url = "https://api.github.com/repos/Abdo453/abdo-portfolio/actions/runs"
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if "workflow_runs" in data and len(data["workflow_runs"]) > 0:
                latest = data["workflow_runs"][0]
                print(f"Latest run status: {latest['status']}")
                print(f"Conclusion: {latest['conclusion']}")
                print(f"Commit Message: {latest['head_commit']['message']}")
                print(f"Created at: {latest['created_at']}")
                print(f"Updated at: {latest['updated_at']}")
            else:
                print("No runs found.")
    except Exception as e:
        print(f"Error fetching runs: {e}")

if __name__ == '__main__':
    check_runs()
