import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace 'Noto Kufi Arabic' with 'Cairo'
content = content.replace("'Noto Kufi Arabic'", "'Cairo'")

# Increase line-height to 1.95 for better Cairo reading
content = content.replace("line-height: 1.85;", "line-height: 1.95;")

# Improve English terms highlights inside CEH modules
if "background: rgba(255, 255, 255, 0.05);" not in content:
    strong_style = """
[id^="meth-content-ceh_"] strong,
[id^="meth-content-ceh_"] code {
    unicode-bidi: embed;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 7px;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    display: inline-block;
    direction: ltr;
}
"""
    # Replace the old basic strong styling
    content = re.sub(
        r'\[id\^="meth-content-ceh_"\] strong,\s*\[id\^="meth-content-ceh_"\] code\s*\{[^}]*\}',
        strong_style.strip(),
        content
    )

with open(css_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Applied premium Cairo font and English term highlighting successfully.")
