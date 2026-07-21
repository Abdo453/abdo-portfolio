import re

path_html = r'D:\abdo_portfolio\main\templates\main\methodology.html'
content = open(path_html, encoding='utf-8').read()

# Details for the tools
tool_details = {
    'subfinder': 'أداة سريعة جداً تعتمد على المصادر المفتوحة (OSINT) لجمع النطاقات الفرعية دون الاتصال المباشر بالهدف (Passive).',
    'amass': 'أداة قوية وعميقة تقوم ببحث مكثف وشامل (Passive & Active) ومحاولة تخمين النطاقات المخفية.',
    'assetfinder': 'أداة خفيفة وسريعة تركز على استخراج النطاقات من شهادات التشفير (crt.sh).',
    'httpx': 'أداة سريعة للتأكد من النطاقات الحية (Live) وتحديد التكنولوجيا المستخدمة (Tech Detect) وحالة السيرفر (Status Code).',
    'nuclei': 'أداة فحص تعتمد على قوالب (Templates) لاكتشاف الثغرات المعروفة (CVEs) وثغرات الـ Takeover بسهولة.',
    'naabu': 'أداة Port Scanner سريعة جداً لاكتشاف المنافذ المفتوحة غير المعيارية على السيرفرات.'
}

# Add the JS function if it doesn't exist
if 'function showToolInfo(' not in content:
    js_func = """
    function showToolInfo(tool, desc) {
      const modal = document.getElementById('popupModal');
      const textEl = document.getElementById('popupModalText');
      if(modal && textEl) {
        textEl.innerHTML = `<h3 style="color:var(--neon-cyan); margin-bottom:10px;">🛠️ ${tool}</h3><p style="color:#e2e8f0; font-size:1.1rem; line-height:1.6;">${desc}</p>`;
        modal.style.display = 'block';
      }
    }
"""
    # Insert before closing script tag
    content = content.replace('</script>\n</body>', js_func + '</script>\n</body>')

# Replace the onclick events
replacements = {
    'onclick="triggerTerminalSim(\'subfinder -d target.com\')"': f'onclick="showToolInfo(\'subfinder\', \'{tool_details["subfinder"]}\')"',
    'onclick="triggerTerminalSim(\'amass enum -d target.com\')"': f'onclick="showToolInfo(\'amass\', \'{tool_details["amass"]}\')"',
    'onclick="triggerTerminalSim(\'assetfinder target.com\')"': f'onclick="showToolInfo(\'assetfinder\', \'{tool_details["assetfinder"]}\')"',
    'onclick="triggerTerminalSim(\'httpx -l subs.txt\')"': f'onclick="showToolInfo(\'httpx\', \'{tool_details["httpx"]}\')"',
    'onclick="triggerTerminalSim(\'nuclei -u target.com\')"': f'onclick="showToolInfo(\'nuclei\', \'{tool_details["nuclei"]}\')"',
    'onclick="triggerTerminalSim(\'naabu -host target.com\')"': f'onclick="showToolInfo(\'naabu\', \'{tool_details["naabu"]}\')"'
}

for old, new in replacements.items():
    content = content.replace(old, new)

open(path_html, 'w', encoding='utf-8').write(content)
print('UI Updated with Tool Info Modals')
