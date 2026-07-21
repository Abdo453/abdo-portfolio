import re

filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\views.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

timeline_data = """        'timeline': [
            {
                'year': '2025 - 2026',
                'title': 'OSCP Preparation & Advanced Labs',
                'description': 'Completing OffSec PWK labs, dominating HackTheBox Pro Labs, and mastering Active Directory exploitation and advanced Web Pentesting.'
            },
            {
                'year': '2024 - 2025',
                'title': 'Frontend Web Developer',
                'description': 'Built modern, responsive, and highly interactive web applications using HTML, CSS, JavaScript, and React. Gained deep understanding of client-side architecture.'
            },
            {
                'year': '2023',
                'title': 'Security Fundamentals & Networking',
                'description': 'Studied network protocols, Linux system administration, and basic security principles. Began solving TryHackMe rooms to build a solid foundation.'
            }
        ],
        'academy_explorer': ["""

pattern = re.compile(r"'academy_explorer': \[")
content = pattern.sub(timeline_data, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Timeline data added to views.py!")
