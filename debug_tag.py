import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

path = r"D:\abdo_portfolio\main\templates\main\quiz.html"
with open(path, encoding="utf-8") as f:
    content = f.read()

# Find and fix the remaining {{ 
idx = content.find("{{")
while idx != -1:
    end = content.find("}}", idx)
    if end == -1:
        break
    print(f"Found at {idx}: {content[idx:end+2]!r}")
    # Replace it
    inner = content[idx+2:end]
    replacement = "{&#123;" + inner + "}}"
    content = content[:idx] + replacement + content[end+2:]
    idx = content.find("{{", idx + len(replacement))

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done, remaining: " + str(content.count("{{")))
