mission_css = """
/* ==========================================================
   HUNTEROS MISSION DASHBOARD STYLE (TOOL DETAILS)
   ========================================================== */

.mission-dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.5s ease;
  color: var(--text-primary);
}

.mission-hero {
  background: linear-gradient(135deg, rgba(10, 10, 15, 0.9), rgba(20, 20, 30, 0.95));
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0, 229, 255, 0.05);
  backdrop-filter: blur(10px);
}

.mission-hero-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 15px;
}

.mission-hero-header .hero-title {
  margin: 0;
  font-size: 2rem;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-badges {
  display: flex;
  gap: 10px;
}

.badge-stars {
  color: #ffb020;
  letter-spacing: 2px;
}

.badge-type {
  background: rgba(0, 229, 255, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 229, 255, 0.3);
}

.mission-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.action-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 10px 20px;
  color: var(--text-primary);
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.action-btn.primary {
  background: rgba(0, 229, 255, 0.15);
  border-color: rgba(0, 229, 255, 0.5);
  color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
}

.action-btn.primary:hover {
  background: rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);
}

.mission-progress {
  background: rgba(0,0,0,0.4);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.05);
}

.progress-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.progress-bar {
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
  transition: width 1s ease;
}

.mission-module {
  background: rgba(10, 10, 15, 0.6);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.module-title {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0 0 20px 0;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  gap: 10px;
}

.module-content {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Labs Grid */
.labs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.lab-card {
  background: rgba(0,0,0,0.3);
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.lab-card:hover {
  background: rgba(0, 229, 255, 0.05);
  border-color: rgba(0, 229, 255, 0.3);
  transform: translateY(-5px);
}

.lab-card h4 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.lab-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 15px;
}

.lab-btn {
  background: transparent;
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lab-btn:hover {
  background: rgba(0, 229, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
}

/* Hide the old tabs if they still exist somehow */
.cyber-tabs { display: none !important; }
"""

with open(r'd:\abdo_portfolio\build\css\style.css', 'a', encoding='utf-8') as f:
    f.write("\n" + mission_css)

print("Appended Mission Dashboard CSS to style.css!")
