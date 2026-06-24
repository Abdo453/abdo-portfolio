// ==========================================
// V2 DATA-DRIVEN COMPONENTS RENDERER
// ==========================================

window.Renderer = {
  // 1. Dashboard Scenarios List Grid
  renderDashboardGrid(container, database, solvedList, activeLvl = 'all', activeCat = 'all') {
    if (!container) return;
    container.innerHTML = '';

    database.forEach(sc => {
      // Filters
      const matchLvl = activeLvl === 'all' || sc.level === activeLvl;
      const matchCat = activeCat === 'all' || sc.category === activeCat;
      if (!matchLvl || !matchCat) return;

      const isSolved = solvedList.includes(sc.id);

      const isRealHunt = localStorage.getItem('bb_sim_real_hunt_mode') === 'true';
      let displayTitle = sc.title;
      let displayCategory = sc.category;

      if (isRealHunt) {
        const maskedTitles = {
          "scenario-001": "Legacy User Directory Endpoint",
          "scenario-002": "Document Preview Module",
          "scenario-003": "Avatar Processing Microservice",
          "scenario-004": "Authorization Gateway API",
          "scenario-005": "E-Commerce Sorting Endpoint",
          "scenario-006": "Coupon Redemption Service",
          "scenario-007": "User Settings Profile Page",
          "scenario-008": "Image Processing CGI Gateway",
          "scenario-009": "GraphQL Search Schema API",
          "scenario-010": "SSO Callback Handler Endpoint"
        };
        displayTitle = maskedTitles[sc.id] || "Target API Endpoint";
        displayCategory = "Web Endpoint Analysis";
      }

      let cardClass = 'neurolynx-card';
      let progressPercent = 0;
      let statusTextHtml = '';
      let btnText = 'Start';
      let iconHtml = '<i class="bx bx-shield-quarter"></i>';

      // Pick icon based on category
      const cat = sc.category.toLowerCase();
      if (cat.includes('auth')) {
        iconHtml = '<i class="bx bx-key"></i>';
      } else if (cat.includes('api') || cat.includes('code')) {
        iconHtml = '<i class="bx bx-code-alt"></i>';
      } else if (cat.includes('cloud')) {
        iconHtml = '<i class="bx bx-cloud"></i>';
      } else if (cat.includes('business')) {
        iconHtml = '<i class="bx bx-git-branch"></i>';
      } else if (cat.includes('chain')) {
        iconHtml = '<i class="bx bx-link"></i>';
      } else if (cat.includes('recon')) {
        iconHtml = '<i class="bx bx-radar"></i>';
      }

      if (isSolved) {
        cardClass += ' completed-state';
        progressPercent = 100;
        statusTextHtml = '<span class="neurolynx-status-indicator completed">Completed <i class="bx bx-check-square" style="font-size:1.15rem; vertical-align:middle;"></i></span>';
        btnText = 'Review';
      } else if (sc.status === 'Unlocked') {
        cardClass += ' active-state';
        progressPercent = 50; // Mock active progress
        statusTextHtml = '<span class="neurolynx-status-indicator active">Active</span>';
        btnText = 'Resume';
      } else {
        cardClass += ' locked-state';
        progressPercent = 0;
        statusTextHtml = '<span class="neurolynx-status-indicator locked"><i class="bx bx-lock-alt"></i> Locked</span>';
        btnText = 'Unlock';
      }

      let scLvl = 10;
      if (sc.level === 'Easy') scLvl = 25;
      else if (sc.level === 'Medium') scLvl = 35;
      else if (sc.level === 'Hard') scLvl = 45;
      else if (sc.level === 'Expert') scLvl = 50;

      const card = document.createElement('div');
      card.className = cardClass;
      card.innerHTML = `
        <div class="neurolynx-card-header">
          <div class="neurolynx-card-icon">${iconHtml}</div>
          <div class="neurolynx-card-title-container">
            <h4 class="neurolynx-card-title">${displayTitle}</h4>
            <span class="neurolynx-card-level">Level ${scLvl} &bull; ${displayCategory} (${sc.company})</span>
          </div>
        </div>
        <div class="neurolynx-card-progress-section">
          <div class="neurolynx-card-progress-header">
            <span>Progress:</span>
            <span>${progressPercent}%</span>
          </div>
          <div class="neurolynx-card-progress-bar">
            <div class="neurolynx-card-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        </div>
        <div class="neurolynx-card-footer">
          ${statusTextHtml}
          <button class="neurolynx-btn">${btnText}</button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (sc.status === 'Unlocked' || isSolved) {
          window.location.href = `pages/scenario.html?id=${sc.id}`;
        } else if (sc.status === 'Premium') {
          alert("🔒 This is a premium scenario. Upgrade to the full Academy tier to unlock this target!");
        } else {
          alert("🔒 This scenario is locked. Please solve preceding scenarios in the dashboard first.");
        }
      });

      container.appendChild(card);
    });

    if (container.children.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No investigations matched your filters.</div>`;
    }
  },

  // 2. Timeline steps clock navigation
  renderTimelineSteps(container, steps, activeIndex, solved) {
    if (!container) return;
    container.innerHTML = '';

    steps.forEach((step, idx) => {
      const isCompleted = idx < activeIndex;
      const isActive = idx === activeIndex;
      const isLocked = idx > activeIndex;

      let statusClass = 'locked';
      let icon = '<i class="bx bx-lock-alt"></i>';

      if (isCompleted || solved) {
        statusClass = 'completed';
        icon = '<i class="bx bx-check"></i>';
      } else if (isActive) {
        statusClass = 'active';
        icon = `${idx + 1}`;
      }

      const li = document.createElement('li');
      li.className = `timeline-step ${statusClass}`;
      li.innerHTML = `
        <div class="timeline-step-icon" style="font-family: var(--font-mono);">${icon}</div>
        <div style="display:flex; flex-direction:column;">
          <span style="font-size:0.65rem; color:var(--text-muted); font-family:var(--font-mono);">${step.time || '09:00'}</span>
          <span class="timeline-step-label">${step.name}</span>
        </div>
      `;

      li.addEventListener('click', () => {
        if (!isLocked || solved) {
          window.SimulationManager.loadStep(idx);
        }
      });

      container.appendChild(li);
    });
  },

  // 3. Evidence Locker cards rendering
  renderEvidenceLocker(container, evidence) {
    if (!container) return;
    container.innerHTML = '';

    if (evidence.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size:0.9rem;">Your Evidence Locker is empty. Explore earlier phases to collect parameters or payloads.</div>`;
      return;
    }

    evidence.forEach(item => {
      const card = document.createElement('div');
      card.className = 'evidence-card';
      card.innerHTML = `
        <div class="evidence-card-title">${item.title}</div>
        <pre class="evidence-card-body">${item.content}</pre>
      `;
      container.appendChild(card);
    });
  },

  // 4. Payload breakdown viewer
  renderPayloadViewer(container, payloads) {
    if (!container) return;
    container.innerHTML = '';

    payloads.forEach(p => {
      const card = document.createElement('div');
      card.style.marginBottom = '20px';
      card.innerHTML = `
        <div style="font-family:var(--font-mono); background:#05070c; border:1px solid var(--border-color); padding:10px; border-radius:6px; color:var(--accent-green); margin-bottom:8px; word-break:break-all;">${p.code}</div>
        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin-bottom:4px;"><strong>Explanation:</strong> ${p.explanation}</p>
        <p style="font-size:0.85rem; color:var(--accent-cyan); line-height:1.5; margin-bottom:4px;"><strong>Why it Worked:</strong> ${p.whyWorked}</p>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;"><strong>Alternative payloads:</strong> <code>${p.alternatives.join('</code> or <code>')}</code></p>
      `;
      container.appendChild(card);
    });
  },

  // 5. Hunter Decision Log
  renderDecisionLog(container, decisionLog) {
    if (!container) return;
    container.innerHTML = '';

    decisionLog.forEach(log => {
      const div = document.createElement('div');
      div.style.marginBottom = '15px';
      div.innerHTML = `
        <h4 style="font-family:var(--font-title); font-size:0.92rem; color:var(--text-main); margin-bottom:4px;">💡 Hypothesis: ${log.hypothesis}</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5; margin-bottom:4px;"><strong>Why it Failed:</strong> ${log.whyFailed}</p>
        <p style="font-size:0.85rem; color:var(--accent-green); line-height:1.5; margin-bottom:4px;"><strong>Pivot Path (Plan B):</strong> ${log.planB}</p>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.5;"><strong>Ignored leads:</strong> ${log.ignored}</p>
      `;
      container.appendChild(div);
    });
  },

  // 6. Common Hunter Mistakes list
  renderMistakesChecklist(container, mistakes) {
    if (!container) return;
    container.innerHTML = '';

    mistakes.forEach(m => {
      const div = document.createElement('div');
      div.className = 'mistakes-item';
      div.style.marginBottom = '15px';
      div.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="font-weight:600; color:var(--critical-red); font-size:0.88rem;"><i class="bx bx-x-circle"></i> Error: ${m.mistake}</span>
          <span style="font-size:0.82rem; color:var(--text-secondary); padding-left:22px;"><strong>Why it was wrong:</strong> ${m.whyWrong}</span>
          <span style="font-size:0.82rem; color:var(--accent-green); padding-left:22px;"><strong>Better approach:</strong> ${m.betterWay}</span>
        </div>
      `;
      container.appendChild(div);
    });
  }
};

// Autoload homepage dashboard if in root index.html
window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('scenarios-list');
  if (container) {
    const solved = JSON.parse(localStorage.getItem('bb_sim_solved')) || [];
    
    // Level Filters Bindings
    const lvlFilters = document.getElementById('level-filters');
    const catFilters = document.getElementById('category-filters');
    
    let activeLvl = 'all';
    let activeCat = 'all';

    Renderer.renderDashboardGrid(container, window.scenariosDatabase, solved, activeLvl, activeCat);

    if (lvlFilters) {
      lvlFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        Array.from(lvlFilters.children).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeLvl = btn.dataset.level;
        Renderer.renderDashboardGrid(container, window.scenariosDatabase, solved, activeLvl, activeCat);
      });
    }

    if (catFilters) {
      catFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        Array.from(catFilters.children).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.category;
        Renderer.renderDashboardGrid(container, window.scenariosDatabase, solved, activeLvl, activeCat);
      });
    }
  }
});
