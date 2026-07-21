filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\static\main\css\style.css"
with open(filepath, 'a', encoding='utf-8') as f:
    f.write("""
/* ═══════════════════════════════════════════════════════════
   PORTFOLIO OVERHAUL: PROFILE & LABS (ADDED DYNAMICALLY)
   ═══════════════════════════════════════════════════════════ */

/* Profile Hero */
.profile-hero-section {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(180deg, rgba(3, 3, 8, 0.9) 0%, var(--bg-tertiary) 100%);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 30px;
}
.hero-name {
  font-size: 3rem;
  font-weight: 900;
  color: var(--text-primary);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  margin-bottom: 10px;
}
.hero-title {
  font-size: 1.2rem;
  color: var(--text-neon-cyan);
  font-family: 'Fira Code', monospace;
  margin-bottom: 20px;
}
.hero-tagline {
  font-style: italic;
  color: var(--text-neon-green);
  font-size: 1.1rem;
  border-left: 3px solid var(--text-neon-green);
  padding-left: 15px;
  display: inline-block;
  margin-bottom: 30px;
}
.hero-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* Profile Content Grid */
.profile-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 0 20px;
}
.mindset-quote {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-neon-orange);
  margin-bottom: 15px;
  border-left: 3px solid var(--text-neon-orange);
  padding-left: 15px;
}

/* Labs Grid */
.labs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.lab-card {
  padding: 25px;
  border-left: 4px solid var(--text-neon-cyan);
}
.lab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px dashed var(--border-color);
  padding-bottom: 10px;
}
.lab-title {
  font-size: 1.4rem;
  color: var(--text-primary);
}
.lab-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.lab-section {
  margin-bottom: 15px;
}
.lab-section h4 {
  margin-bottom: 5px;
  font-size: 1rem;
}
.lab-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.lab-steps {
  list-style: none;
  padding-left: 10px;
  color: var(--text-secondary);
}
.lab-steps li {
  margin-bottom: 5px;
  position: relative;
}
.lab-steps li::before {
  content: '>';
  position: absolute;
  left: -15px;
  color: var(--text-neon-green);
}
.lab-result-box {
  background: rgba(0, 255, 102, 0.05);
  border: 1px solid rgba(0, 255, 102, 0.2);
  padding: 15px;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  margin-top: 20px;
}
""")

print("Added new CSS rules to style.css!")
