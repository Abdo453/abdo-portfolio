import subprocess

result = subprocess.run(
    ['git', 'log', '--oneline', '-10'],
    capture_output=True, text=True, cwd=r'd:\abdo_portfolio'
)
print("Recent commits:\n", result.stdout)

result2 = subprocess.run(
    ['git', 'remote', '-v'],
    capture_output=True, text=True, cwd=r'd:\abdo_portfolio'
)
print("Remotes:\n", result2.stdout)

# Check if there's a gh-pages branch
result3 = subprocess.run(
    ['git', 'branch', '-a'],
    capture_output=True, text=True, cwd=r'd:\abdo_portfolio'
)
print("Branches:\n", result3.stdout)
