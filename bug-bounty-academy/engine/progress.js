// ==========================================
// V2 GAME STATE & PROGRESS CONTROLLER
// ==========================================

window.ProgressManager = {
  state: {
    xp: 0,
    bounty: 0,
    solved: [],
    lastActive: null
  },

  load() {
    this.state.xp = parseInt(localStorage.getItem('bb_sim_xp')) || 0;
    this.state.bounty = parseInt(localStorage.getItem('bb_sim_bounty')) || 0;
    this.state.lastActive = localStorage.getItem('bb_sim_last_active') || null;
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
    if (this.state.lastActive) {
      localStorage.setItem('bb_sim_last_active', this.state.lastActive);
    }
    this.updateUI();
  },

  updateUI() {
    const elXp = document.getElementById('global-xp');
    const elBounty = document.getElementById('global-bounty');
    const elRank = document.getElementById('global-rank');

    if (elXp) elXp.innerText = this.state.xp;
    if (elBounty) elBounty.innerText = `$${this.state.bounty.toLocaleString()}`;
    
    if (elRank) {
      let rank = 'Recon Rookie';
      if (this.state.xp >= 15000) rank = 'Elite Bug Hunter';
      else if (this.state.xp >= 8000) rank = 'Master Hunter';
      else if (this.state.xp >= 3000) rank = 'Security Researcher';
      else if (this.state.xp >= 1000) rank = 'Triage Expert';
      else if (this.state.xp >= 300) rank = 'Bug Hunter';
      elRank.innerText = rank;
    }
  },

  addXP(amount) {
    this.state.xp = Math.max(0, this.state.xp + amount);
    this.save();
  },

  addBounty(amount) {
    this.state.bounty = Math.max(0, this.state.bounty + amount);
    this.save();
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
  }
};

// Initialize progress manager automatically on load
ProgressManager.load();
