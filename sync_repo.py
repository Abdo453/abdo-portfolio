import subprocess

def run(cmd, desc=''):
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=r'd:\abdo_portfolio')
    if desc: print(f'\n--- {desc} ---')
    if result.stdout.strip(): print(result.stdout.strip())
    if result.stderr.strip(): print("ERR:", result.stderr.strip())
    return result.returncode

# Pull latest from origin
run(['git', 'fetch', 'origin'], 'fetch')
run(['git', 'status', '--short'], 'local changes')
print('\nLocal is behind. Checking diff...')
run(['git', 'log', '--oneline', 'HEAD..origin/master'], 'commits on origin not in local')
