import os
import re

root_dir = r'd:\abdo_portfolio'

# Pattern for the login check IIFE
pattern1 = re.compile(r'<script>\s*\(function\(\)\s*\{\s*try\s*\{\s*const\s*userStr\s*=\s*localStorage\.getItem\(\'current_user\'\);.*?\}\)\(\);\s*</script>', re.DOTALL)
pattern2 = re.compile(r'<script[^>]*>[\s\S]*?localStorage\.getItem\(\'current_user\'\)[\s\S]*?</script>')

count_modified = 0

for root, dirs, files in os.walk(root_dir):
    # Skip .git directory and node_modules if any
    if '.git' in dirs:
        dirs.remove('.git')
    
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content, count = pattern1.subn('', content)
                
                if count == 0:
                    new_content, count2 = pattern2.subn('', content)
                    count = count2
                
                if count > 0:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Purged from: {filepath}')
                    count_modified += 1
            except Exception as e:
                pass # skip files that can't be read

print(f'\nDone! Purged login check from {count_modified} files.')
