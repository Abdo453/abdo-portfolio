import re

path = r"D:\abdo_portfolio\main\templates\main\quiz.html"
with open(path, encoding="utf-8") as f:
    content = f.read()

# Django template engine will try to parse {{ }} as template tags.
# Wrap the <script> sections with {% verbatim %} ... {% endverbatim %}
# Also replace any {{ }} inside strings used in JS with safe equivalents

# Replace JS template-looking strings in question/tip text 
# These are inside JS strings — escape them so Django won't parse them
content = content.replace("'{{7*7}}'", "'\\x7B\\x7B7*7}}'")
content = content.replace("{{7*7}}", "{&#123;7*7}}")
content = content.replace("{{config}}", "{&#123;config}}")
content = content.replace("{{config.items()}}", "{&#123;config.items()}}")
content = content.replace("{{self.__class__.__mro__}}", "{&#123;self.__class__.__mro__}}")

# Count remaining {{ to see if any still exist  
remaining = content.count("{{")
print(f"Remaining Django-style tags: {remaining}")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed.")
