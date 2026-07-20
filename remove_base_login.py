import re

filepath = r'd:\abdo_portfolio\main\templates\main\academy\base.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the login check IIFE
pattern = re.compile(r'<script>\s*\(function\(\)\s*\{\s*try\s*\{\s*const\s*userStr\s*=\s*localStorage\.getItem\(\'current_user\'\);.*?\}\)\(\);\s*</script>', re.DOTALL)

new_content, count = pattern.subn('', content)
if count > 0:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Removed from base.html")
else:
    print("Not found in base.html using primary regex.")
    
    # Try an alternative regex just in case
    pattern2 = re.compile(r'<script[^>]*>[\s\S]*?localStorage\.getItem\(\'current_user\'\)[\s\S]*?</script>')
    new_content, count2 = pattern2.subn('', content)
    if count2 > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Removed from base.html using secondary regex.")
