// ==========================================
// V4 STATE & PROGRESS MANAGER
// ==========================================

// Level definitions: [minXP, title, numericLevel, nextXP]
const LEVELS = [
  { minXP: 0,     maxXP: 299,    level: 1, title: 'Recon Rookie',      color: '#64748b', icon: '🔎' },
  { minXP: 300,   maxXP: 999,    level: 2, title: 'Bug Hunter',        color: '#22c55e', icon: '🐛' },
  { minXP: 1000,  maxXP: 2999,   level: 3, title: 'Triage Expert',     color: '#06b6d4', icon: '🔍' },
  { minXP: 3000,  maxXP: 7999,   level: 4, title: 'Sec. Researcher',   color: '#a855f7', icon: '🔬' },
  { minXP: 8000,  maxXP: 14999,  level: 5, title: 'Master Hunter',     color: '#f59e0b', icon: '🏹' },
  { minXP: 15000, maxXP: Infinity,level: 6, title: 'Elite Bug Hunter', color: '#ef4444', icon: '💀' },
];

window.StateManager = {
  state: {
    xp: 0,
    bounty: 0,
    solved: [],
    hintsUsed: 0,
    hintsXPSpent: 0,
    lastActive: null,
    errorsCount: 0,
    timeSpentTotal: 0,
    realHuntMode: false,
    username: 'Alex Mercer',
    joinDate: null
  },

  load() {
    this.state.xp = parseInt(localStorage.getItem('bb_sim_xp')) || 0;
    this.state.bounty = parseInt(localStorage.getItem('bb_sim_bounty')) || 0;
    this.state.lastActive = localStorage.getItem('bb_sim_last_active') || null;
    this.state.errorsCount = parseInt(localStorage.getItem('bb_sim_errors_count')) || 0;
    this.state.timeSpentTotal = parseInt(localStorage.getItem('bb_sim_time_spent_total')) || 0;
    this.state.realHuntMode = localStorage.getItem('bb_sim_real_hunt_mode') === 'true';
    this.state.hintsUsed = parseInt(localStorage.getItem('bb_sim_hints_used')) || 0;
    this.state.hintsXPSpent = parseInt(localStorage.getItem('bb_sim_hints_xp')) || 0;
    this.state.username = localStorage.getItem('bb_sim_username') || 'Alex Mercer';
    this.state.joinDate = localStorage.getItem('bb_sim_join_date') || new Date().toISOString().split('T')[0];

    if (!localStorage.getItem('bb_sim_join_date')) {
      localStorage.setItem('bb_sim_join_date', this.state.joinDate);
    }

    try {
      this.state.solved = JSON.parse(localStorage.getItem('bb_sim_solved')) || [];
    } catch(e) {
      this.state.solved = [];
    }
    this.updateUI();
  },

  save() {
    localStorage.setItem('bb_sim_xp', this.state.xp);
    localStorage.setItem('bb_sim_bounty', this.state.bounty);
    localStorage.setItem('bb_sim_solved', JSON.stringify(this.state.solved));
    localStorage.setItem('bb_sim_errors_count', this.state.errorsCount);
    localStorage.setItem('bb_sim_time_spent_total', this.state.timeSpentTotal);
    localStorage.setItem('bb_sim_real_hunt_mode', this.state.realHuntMode);
    localStorage.setItem('bb_sim_hints_used', this.state.hintsUsed);
    localStorage.setItem('bb_sim_hints_xp', this.state.hintsXPSpent);
    localStorage.setItem('bb_sim_username', this.state.username);

    if (this.state.lastActive) {
      localStorage.setItem('bb_sim_last_active', this.state.lastActive);
    }
    this.updateUI();
  },

  // ---- Level System ----
  getLevelData(xp) {
    const x = (xp !== undefined) ? xp : this.state.xp;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (x >= LEVELS[i].minXP) {
        const current = LEVELS[i];
        const next = LEVELS[i + 1] || null;
        const progressInLevel = x - current.minXP;
        const levelRange = next ? (next.minXP - current.minXP) : 1;
        const progressPct = next ? Math.min(100, Math.round((progressInLevel / levelRange) * 100)) : 100;
        return {
          level: current.level,
          title: current.title,
          color: current.color,
          icon: current.icon,
          currentXP: x,
          minXP: current.minXP,
          nextXP: next ? next.minXP : null,
          xpToNext: next ? (next.minXP - x) : 0,
          progressPct: progressPct,
          isMaxLevel: !next
        };
      }
    }
    return LEVELS[0];
  },

  // ---- UI Updates ----
  updateUI() {
    const ld = this.getLevelData();

    // XP and bounty numbers
    const elXp = document.getElementById('global-xp');
    const elBounty = document.getElementById('global-bounty');
    if (elXp) elXp.innerText = this.state.xp.toLocaleString();
    if (elBounty) elBounty.innerText = `$${this.state.bounty.toLocaleString()}`;

    // Rank text (used in scenario header)
    const elRank = document.getElementById('global-rank');
    if (elRank) elRank.innerText = `${ld.icon} ${ld.title}`;

    // Level badge (new element)
    const elLevelNum = document.getElementById('global-level-num');
    if (elLevelNum) elLevelNum.innerText = ld.level;

    const elLevelTitle = document.getElementById('global-level-title');
    if (elLevelTitle) elLevelTitle.innerText = ld.title;

    // XP progress bar
    const elBar = document.getElementById('xp-progress-bar-fill');
    if (elBar) {
      elBar.style.width = `${ld.progressPct}%`;
      elBar.style.background = `linear-gradient(90deg, ${ld.color}aa, ${ld.color})`;
    }

    // XP ratio text
    const elRatio = document.getElementById('xp-text-ratio');
    if (elRatio) {
      if (ld.isMaxLevel) {
        elRatio.innerText = `${this.state.xp.toLocaleString()} XP — MAX`;
      } else {
        elRatio.innerText = `${this.state.xp.toLocaleString()} / ${ld.nextXP.toLocaleString()} XP`;
      }
    }

    // Next level label
    const elNextLevel = document.getElementById('xp-next-level-label');
    if (elNextLevel) {
      elNextLevel.innerText = ld.isMaxLevel ? 'MAX LEVEL' : `${ld.xpToNext.toLocaleString()} XP to Level ${ld.level + 1}`;
    }

    // Username display
    const elUsername = document.getElementById('global-username');
    if (elUsername) elUsername.innerText = this.state.username;
  },

  toggleRealHuntMode() {
    this.state.realHuntMode = !this.state.realHuntMode;
    this.save();
    window.location.reload();
  },

  addXP(amount) {
    const oldLevel = this.getLevelData().level;
    this.state.xp = Math.max(0, this.state.xp + amount);
    const newLevel = this.getLevelData().level;
    this.save();

    // Show XP toast notification
    this._showXPToast(amount, oldLevel, newLevel);
  },

  addBounty(amount) {
    this.state.bounty = Math.max(0, this.state.bounty + amount);
    this.save();
  },

  useHint(xpCost) {
    this.state.hintsUsed++;
    this.state.hintsXPSpent += xpCost;
    this.addXP(-xpCost);
    this._showToast(`💡 Hint used: -${xpCost} XP`, 'warning');
  },

  solveScenario(id) {
    if (!this.state.solved.includes(id)) {
      this.state.solved.push(id);
      this.save();
    }
  },

  setLastActive(id) {
    this.state.lastActive = id;
    this.save();
  },

  setUsername(name) {
    this.state.username = name.trim() || 'Anonymous Hunter';
    this.save();
  },

  // V3 extensions
  logError() {
    this.state.errorsCount++;
    this.save();
  },

  addTimeSpent(minutes) {
    this.state.timeSpentTotal += minutes;
    this.save();
  },

  // ---- Toast Notifications ----
  _showXPToast(amount, oldLevel, newLevel) {
    const isPositive = amount > 0;
    const isLevelUp = newLevel > oldLevel;

    if (isLevelUp) {
      const ld = this.getLevelData();
      this._showToast(`🎉 LEVEL UP! → Level ${newLevel} — ${ld.title}`, 'levelup', 3500);
    }

    if (isPositive) {
      this._showToast(`+${amount} XP`, 'xp-gain', 1800);
    } else if (amount < 0) {
      this._showToast(`${amount} XP`, 'xp-loss', 1800);
    }
  },

  _showToast(message, type = 'info', duration = 2200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `bb-toast bb-toast-${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('visible'));
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
};

// V2 Alias for backwards compatibility
window.ProgressManager = window.StateManager;

// Auto load progress
window.StateManager.load();
