import re

path = r'D:\abdo_portfolio\main\templates\main\home.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace initialization
old_vars = """    let gameLevel = 1;
    let gameScore = 0;
    let flagsCaptured = [];"""

new_vars = """    let gameLevel = parseInt(localStorage.getItem('gameLevel')) || 1;
    let gameScore = parseInt(localStorage.getItem('gameScore')) || 0;
    let flagsCaptured = JSON.parse(localStorage.getItem('flagsCaptured')) || [];"""

# Add saveProgress() and inject into updateHUD()
old_hud = """    function updateHUD() {
      document.getElementById('hudLevel').innerText = `${gameLevel} / 4`;
      document.getElementById('hudScore').innerText = `${gameScore} XP`;"""

new_hud = """    function saveProgress() {
      localStorage.setItem('gameLevel', gameLevel);
      localStorage.setItem('gameScore', gameScore);
      localStorage.setItem('flagsCaptured', JSON.stringify(flagsCaptured));
    }

    function updateHUD() {
      saveProgress();
      document.getElementById('hudLevel').innerText = `${gameLevel} / 4`;
      document.getElementById('hudScore').innerText = `${gameScore} XP`;"""

if old_vars in content and old_hud in content:
    content = content.replace(old_vars, new_vars)
    content = content.replace(old_hud, new_hud)
    
    # Check if there's a reset function (e.g. exit command that resets to 0)
    # The user might want to keep the progress even if they exit the lab environment,
    # but there is a line `gameLevel = 1; gameScore = 0; flagsCaptured = [];` somewhere for the 'exit' command maybe.
    
    # We should also replace the progress in dashboard card
    # updateDashProgress function needs to be checked or created if it doesn't exist.
    # updateHUD() runs inside the lab, but the dashboard shows progress too.
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("LocalStorage logic applied to home.html!")
else:
    print("Could not find the target strings in home.html")
