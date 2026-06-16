import re

with open(r'd:\abdo_portfolio\main\portfolio_data.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: 'images': [...], 'images': [...], 'images': [...]
# We want to keep the LAST one (which is what Python actually uses)
# Pattern matches: 'id': 'xxx', 'images': [A], 'images': [B], 'images': [C],
# Replace with:    'id': 'xxx', 'images': [C],

pattern = r"'images': \[[^\]]*\],\s*'images': \[[^\]]*\],\s*('images': \[[^\]]*\])"
matches = re.findall(pattern, content)
print(f"Found {len(matches)} duplicate image groups")

fixed = re.sub(pattern, r'\1', content)

count_before = content.count("'images':")
count_after = fixed.count("'images':")
print(f"'images' keys before: {count_before}")
print(f"'images' keys after:  {count_after}")
print(f"Removed: {count_before - count_after} duplicate keys")

with open(r'd:\abdo_portfolio\main\portfolio_data.py', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Done!")
