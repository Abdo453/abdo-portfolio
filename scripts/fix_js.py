import os

filepath = r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\templates\main\home.html'
with open(filepath, 'r', encoding='utf-8') as f:
    data = f.read()

# Replace the function definition
data = data.replace('function switchTab(btn, tabId)', 'function switchCyberTab(btn, tabId)')

# Replace the onClick handlers
data = data.replace('onclick="switchTab(this, ', 'onclick="switchCyberTab(this, ')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(data)
print("Replaced successfully.")
