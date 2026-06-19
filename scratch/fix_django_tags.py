import re

build_path = r"d:\abdo_portfolio\build\methodology.html"

with open(build_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove load static
content = content.replace("{% load static %}", "")

# Replace static tags if any left
content = re.sub(r"{%\s*static\s*'main/([^']+)'\s*%}", r"\1", content)

# Replace templatetags with raw braces
content = content.replace("{% templatetag openvariable %}", "{{")
content = content.replace("{% templatetag closevariable %}", "}}")

with open(build_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed Django tags in build/methodology.html")
