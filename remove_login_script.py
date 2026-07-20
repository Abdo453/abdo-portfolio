import re
import os
import glob

build_dir = r'd:\abdo_portfolio\build'
html_files = glob.glob(os.path.join(build_dir, '*.html'))

pattern = re.compile(r'<script>\s*\(function\(\)\s*\{\s*try\s*\{\s*const\s*userStr\s*=\s*localStorage\.getItem\(\'current_user\'\);.*?\}\)\(\);\s*</script>', re.DOTALL)

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content, count = pattern.subn('', content)
        
        # In case there's another variation
        if count == 0:
            pattern2 = re.compile(r'<script[^>]*>[\s\S]*?localStorage\.getItem\(\'current_user\'\)[\s\S]*?</script>')
            new_content, count2 = pattern2.subn('', content)
            count = count2
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Removed login check from {os.path.basename(filepath)}')
    except Exception as e:
        print(f'Error processing {filepath}: {e}')

print('Done removing login checks!')
