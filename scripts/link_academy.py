import io

filepath = r'C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\templates\main\home.html'
with io.open(filepath, 'r', encoding='utf-8') as f:
    data = f.read()

injection = """<!-- Academy Link Section -->
  <section id="academy-link" class="academy-link-section" style="padding: 60px 0;">
    <div class="container reveal fade-in" style="text-align: center;">
      <div class="modern-card" style="background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(167,139,250,0.1)); border-color: var(--accent-purple); padding: 40px;">
        <h2 style="color: var(--accent-purple); margin-bottom: 15px; font-size: 2rem;">Terminal & Tools Academy</h2>
        <p style="color: var(--text-muted); margin-bottom: 30px; font-size: 1.1rem; max-width: 600px; margin-left: auto; margin-right: auto;">
          Access my interactive Cyberpunk OS to explore offensive tools, commands, and methodologies in a 3-pane file explorer environment.
        </p>
        <a href="academy.html" class="btn btn-primary" style="font-size: 1.1rem; padding: 15px 30px;">
          Launch Interactive Academy 🚀
        </a>
      </div>
    </div>
  </section>

  <!-- Labs Section -->"""

data = data.replace('<!-- Labs Section -->', injection)

with io.open(filepath, 'w', encoding='utf-8') as f:
    f.write(data)

print("Linked academy.html successfully")
