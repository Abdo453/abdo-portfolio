filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\static\main\css\style.css"
with open(filepath, 'a', encoding='utf-8') as f:
    f.write("""
/* ═══════════════════════════════════════════════════════════
   MODERN ANIMATED UI UPGRADE (Clean & Smooth)
   ═══════════════════════════════════════════════════════════ */

/* 1. Pane Switching Animation */
@keyframes fadeInUpClean {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.workspace-pane.active {
  animation: fadeInUpClean 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

/* 2. Card Hover Effects (Float & Glow) */
.cyber-card, .visual-project-card, .dashboard-widget, .profile-card, .lab-card {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  will-change: transform;
}

.cyber-card:hover, .visual-project-card:hover, .dashboard-widget:hover, .profile-card:hover, .lab-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 255, 102, 0.1), 0 0 0 1px rgba(0, 255, 102, 0.3);
}

.visual-project-card:hover {
  box-shadow: 0 12px 30px var(--project-glow), 0 0 0 1px var(--project-glow);
}

.lab-card:hover {
  box-shadow: 0 12px 30px rgba(0, 229, 255, 0.15), -4px 0 0 var(--text-neon-cyan);
}

/* 3. Button Interactions */
.cyber-btn, .tab-link {
  transition: all 0.2s ease;
}

.cyber-btn:hover {
  transform: scale(1.03);
  filter: brightness(1.2);
}

.cyber-btn:active {
  transform: scale(0.97);
}

.tab-link:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(4px);
}

/* 4. List Items & Tags Staggering (Subtle) */
.skill-item, .tech-tag, .cyber-badge {
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.skill-item:hover {
  transform: translateX(5px);
}
.tech-tag:hover, .cyber-badge:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.1);
}
""")

print("Added Modern Animated CSS rules successfully!")
