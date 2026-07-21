import subprocess

def run(cmd, desc=''):
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=r'd:\abdo_portfolio')
    if desc: print(f'\n--- {desc} ---')
    if result.stdout.strip(): print("OUT:", result.stdout.strip())
    if result.stderr.strip(): print("ERR:", result.stderr.strip())
    return result.returncode

run(['git', 'add', 'build/methodology.html', 'main/templates/main/methodology.html'], 'add')
run(['git', 'commit', '-m', 'fix: move rd-sections out of grid-bg into meth-viewer to fix layout'], 'commit')
code = run(['git', 'push', 'origin', 'master'], 'push')
print("\nDone:", code)
