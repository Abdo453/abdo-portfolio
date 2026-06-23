import os
import re

html_files = [
    'exam.html', 'interview.html', 'career.html', 'resources.html', 'syllabus.html'
]

directory = 'd:/abdo_portfolio/build/ccna'

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Don't add if already there
        if 'data_loader.js' not in content:
            # Inject before the first <script src=...
            content = re.sub(r'(<script\s+src="[^"]+"></script>)', r'<script src="data_loader.js"></script>\n    \1', content, count=1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
        print(f"Updated {filename}")
