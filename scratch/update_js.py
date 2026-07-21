import re

js_path = r"d:\abdo_portfolio\main\static\main\js\methodology.js"

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Update openMethPhase function to hide rd-hero-section for CEH
js = js.replace(
    "const activeContent = document.getElementById('meth-content-' + phaseId);\n      if (activeContent) activeContent.style.display = 'block';",
    """const activeContent = document.getElementById('meth-content-' + phaseId);
      if (activeContent) activeContent.style.display = 'block';

      // Hide or show the rd-hero-section (Bug Bounty top bar)
      const rdHero = document.getElementById('rd-hero-section');
      if (rdHero) {
        if (phaseId.startsWith('mod') || phaseId === 'sys-hack') {
          rdHero.style.display = 'none';
        } else {
          rdHero.style.display = 'block';
        }
      }"""
)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Updated methodology.js to hide rd-hero-section for CEH")
