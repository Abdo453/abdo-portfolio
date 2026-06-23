// ==========================================
// BUG BOUNTY SIMULATION ENGINE
// ==========================================

(function() {
  // Game State
  let state = {
    xp: 0,
    bounty: 0,
    solved: [],
    currentScenario: null,
    currentStepIndex: 0,
    stepTimer: null,
    stepTimeSpent: 0,
    evidence: [],
    activeChoices: [],
    selectedQuizOption: null,
    quizCurrentQuestion: 0,
    quizAnswers: []
  };

  // DOM Elements
  const el = {
    globalXP: document.getElementById('global-xp'),
    globalBounty: document.getElementById('global-bounty'),
    globalRank: document.getElementById('global-rank'),
    completedCount: document.getElementById('completed-count'),
    successRate: document.getElementById('success-rate'),
    dashboardView: document.getElementById('dashboard-view'),
    simulatorView: document.getElementById('simulator-view'),
    scenariosList: document.getElementById('scenarios-list'),
    levelFilters: document.getElementById('level-filters'),
    categoryFilters: document.getElementById('category-filters'),
    
    // Simulator UI
    exitSimBtn: document.getElementById('exit-sim-btn'),
    scenarioTitle: document.getElementById('sim-scenario-title'),
    diffBadge: document.getElementById('sim-diff-badge'),
    categoryBadge: document.getElementById('sim-category-badge'),
    bountyVal: document.getElementById('sim-bounty-val'),
    timeVal: document.getElementById('sim-time-val'),
    companyVal: document.getElementById('sim-company-val'),
    timelineList: document.getElementById('timeline-steps-list'),
    
    // Workspaces
    stepTitle: document.getElementById('step-title'),
    stepTimeSpent: document.getElementById('step-time-spent'),
    stepXPPotential: document.getElementById('step-xp-potential'),
    markdownBody: document.getElementById('step-content-markdown'),
    choicesContainer: document.getElementById('step-choices-container'),
    choicesGrid: document.getElementById('step-choices'),
    prevStepBtn: document.getElementById('prev-step-btn'),
    nextStepBtn: document.getElementById('next-step-btn'),
    
    // Terminal Workspace
    workspaceTerminal: document.getElementById('workspace-terminal'),
    termBody: document.getElementById('term-body'),
    termInput: document.getElementById('term-input'),
    termControls: document.getElementById('term-control-buttons'),
    
    // Burp Workspace
    workspaceBurp: document.getElementById('workspace-burp'),
    burpRequestView: document.getElementById('burp-request-view'),
    burpResponseView: document.getElementById('burp-response-view'),
    burpActions: document.getElementById('burp-actions-container'),
    
    // Evidence Workspace
    workspaceEvidence: document.getElementById('workspace-evidence'),
    evidenceContainer: document.getElementById('evidence-container'),
    
    // Report Builder Workspace
    workspaceReport: document.getElementById('workspace-report'),
    reportTitle: document.getElementById('report-title'),
    reportSeverity: document.getElementById('report-severity'),
    reportType: document.getElementById('report-type'),
    reportDesc: document.getElementById('report-desc'),
    reportSteps: document.getElementById('report-steps'),
    reportImpact: document.getElementById('report-impact'),
    submitReportBtn: document.getElementById('submit-report-btn'),
    
    // Expert Review Workspace
    workspaceReview: document.getElementById('workspace-review'),
    userReportSummary: document.getElementById('user-report-summary'),
    realReportSummary: document.getElementById('real-report-summary'),
    triageVerdictPanel: document.getElementById('triage-verdict-panel'),
    
    // Mindset / Mistakes boxes
    workspaceThoughts: document.getElementById('workspace-thoughts'),
    thoughtsContent: document.getElementById('thoughts-content'),
    workspaceMistakes: document.getElementById('workspace-mistakes'),
    mistakesList: document.getElementById('mistakes-list'),
    
    // Quiz Workspace
    workspaceQuiz: document.getElementById('workspace-quiz'),
    quizCurrentNum: document.getElementById('quiz-current-num'),
    quizTotalNum: document.getElementById('quiz-total-num'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsList: document.getElementById('quiz-options-list'),
    quizSubmitBtn: document.getElementById('quiz-submit-btn'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    
    // Lab Workspace
    workspaceLab: document.getElementById('workspace-lab'),
    labInstructions: document.getElementById('lab-instructions'),
    labTargetUrl: document.getElementById('lab-target-url'),
    labFlagInput: document.getElementById('lab-flag-input'),
    submitFlagBtn: document.getElementById('submit-flag-btn')
  };

  // State Filters
  let activeLevel = 'all';
  let activeCategory = 'all';

  // Load Saved Game Data
  function loadGame() {
    state.xp = parseInt(localStorage.getItem('bb_sim_xp')) || 0;
    state.bounty = parseInt(localStorage.getItem('bb_sim_bounty')) || 0;
    try {
      state.solved = JSON.parse(localStorage.getItem('bb_sim_solved')) || [];
    } catch(e) {
      state.solved = [];
    }
    updateGlobalStats();
  }

  // Save Game Data
  function saveGame() {
    localStorage.setItem('bb_sim_xp', state.xp);
    localStorage.setItem('bb_sim_bounty', state.bounty);
    localStorage.setItem('bb_sim_solved', JSON.stringify(state.solved));
    updateGlobalStats();
  }

  // Update Stats UI
  function updateGlobalStats() {
    el.globalXP.innerText = state.xp;
    el.globalBounty.innerText = `$${state.bounty.toLocaleString()}`;
    
    // Determine Rank
    let rank = 'Recon Rookie';
    if (state.xp >= 15000) rank = 'Elite Bug Hunter';
    else if (state.xp >= 8000) rank = 'Master Hunter';
    else if (state.xp >= 3000) rank = 'Security Researcher';
    else if (state.xp >= 1000) rank = 'Triage Expert';
    else if (state.xp >= 300) rank = 'Bug Hunter';
    
    el.globalRank.innerText = rank;
    
    // Dashboard Stats
    el.completedCount.innerText = `${state.solved.length}/100`;
    const acc = state.solved.length > 0 ? Math.min(100, Math.round(92 + (state.xp / 1000))) : 0;
    el.successRate.innerText = `${acc}%`;
  }

  // Render Dashboard Scenarios
  function renderDashboard() {
    el.scenariosList.innerHTML = '';
    
    window.scenariosDatabase.forEach(sc => {
      // Apply filters
      const matchLvl = activeLevel === 'all' || sc.level === activeLevel;
      const matchCat = activeCategory === 'all' || sc.category === activeCategory;
      if (!matchLvl || !matchCat) return;

      const isSolved = state.solved.includes(sc.id);
      
      // Resolve status markup
      let statusHtml = '';
      if (isSolved) {
        statusHtml = `<span class="card-status completed"><i class="bx bx-check-circle"></i> Solved</span>`;
      } else if (sc.status === 'Unlocked') {
        statusHtml = `<span class="card-status unlocked"><i class="bx bx-lock-open-alt"></i> Play</span>`;
      } else if (sc.status === 'Premium') {
        statusHtml = `<span class="card-status premium"><i class="bx bxs-crown"></i> Premium</span>`;
      } else {
        statusHtml = `<span class="card-status locked"><i class="bx bx-lock-alt"></i> Locked</span>`;
      }

      // Difficulty class
      const diffClass = sc.level.toLowerCase().replace(' ', '');

      const card = document.createElement('div');
      card.className = 'scenario-card';
      card.innerHTML = `
        <div class="card-header-row">
          <span class="scenario-id">${sc.id.toUpperCase()}</span>
          <span class="difficulty-badge ${diffClass}">${sc.level}</span>
        </div>
        <h3 class="scenario-title">${sc.title}</h3>
        <div class="scenario-meta">
          <span class="category-tag">${sc.category}</span>
          <span class="company-tag">${sc.company}</span>
        </div>
        <div class="card-footer-row">
          <span class="bounty-amount">${sc.reward}</span>
          ${statusHtml}
        </div>
      `;

      card.addEventListener('click', () => {
        if (sc.status === 'Unlocked' || isSolved) {
          startScenario(sc.id);
        } else if (sc.status === 'Premium') {
          alert("🔒 This is a premium scenario. Unlock the full Academy tier to access this mission!");
        } else {
          alert("🔒 This scenario is locked. Solve the preceding scenarios in the dashboard to unlock this track.");
        }
      });

      el.scenariosList.appendChild(card);
    });

    if (el.scenariosList.children.length === 0) {
      el.scenariosList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No scenarios found matching your filters.</div>`;
    }
  }

  // Initialize Simulator View
  function startScenario(id) {
    // Dynamically retrieve scenario configuration
    // (Scenario scripts will load config onto window.scenario_[id_num] e.g. window.scenario_001)
    const varName = id.replace('-', '_');
    const scData = window[varName];
    
    if (!scData) {
      alert("Error: Scenario logic file not loaded!");
      return;
    }

    // Get basic metadata from database
    const meta = window.scenariosDatabase.find(x => x.id === id);

    state.currentScenario = {
      ...meta,
      ...scData
    };
    state.currentStepIndex = 0;
    state.evidence = [];
    state.stepTimeSpent = 0;
    state.quizCurrentQuestion = 0;
    state.quizAnswers = [];

    // Update Simulator Topbar
    el.scenarioTitle.innerText = `${meta.id.toUpperCase()}: ${meta.title}`;
    el.diffBadge.className = `difficulty-badge ${meta.level.toLowerCase().replace(' ', '')}`;
    el.diffBadge.innerText = meta.level;
    el.categoryBadge.innerText = meta.category;
    el.bountyVal.innerText = meta.reward;
    el.timeVal.innerText = meta.time;
    el.companyVal.innerText = meta.company;

    // Switch panels
    el.dashboardView.classList.remove('active');
    el.simulatorView.classList.add('active');

    // Run active step timer
    if (state.stepTimer) clearInterval(state.stepTimer);
    state.stepTimer = setInterval(() => {
      state.stepTimeSpent++;
      el.stepTimeSpent.innerText = state.stepTimeSpent;
    }, 60000); // Increments every minute
    el.stepTimeSpent.innerText = "0";

    renderTimeline();
    loadStep(0);
  }

  // Exit Simulator
  function exitScenario() {
    if (state.stepTimer) clearInterval(state.stepTimer);
    state.currentScenario = null;
    el.simulatorView.classList.remove('active');
    el.dashboardView.classList.add('active');
    renderDashboard();
  }

  // Render Left Navigation Timeline
  function renderTimeline() {
    el.timelineList.innerHTML = '';
    const steps = state.currentScenario.steps;

    steps.forEach((step, idx) => {
      const isCompleted = idx < state.currentStepIndex;
      const isActive = idx === state.currentStepIndex;
      const isLocked = idx > state.currentStepIndex;

      let statusClass = 'locked';
      let icon = '<i class="bx bx-lock-alt"></i>';

      if (isCompleted) {
        statusClass = 'completed';
        icon = '<i class="bx bx-check"></i>';
      } else if (isActive) {
        statusClass = 'active';
        icon = `${idx + 1}`;
      } else {
        icon = `<i class="bx bx-lock-alt"></i>`;
      }

      const li = document.createElement('li');
      li.className = `timeline-step ${statusClass}`;
      li.innerHTML = `
        <div class="timeline-step-icon">${icon}</div>
        <span class="timeline-step-label">${step.name}</span>
      `;

      li.addEventListener('click', () => {
        if (!isLocked) {
          loadStep(idx);
        }
      });

      el.timelineList.appendChild(li);
    });
  }

  // Load Step Contents and Interactive Workspace
  function loadStep(index) {
    state.currentStepIndex = index;
    renderTimeline();

    const step = state.currentScenario.steps[index];
    el.stepTitle.innerText = step.name;
    el.stepXPPotential.innerText = step.xpReward || 50;

    // Default: Clear all interactive workspaces
    hideAllWorkspaces();

    // Render markdown text
    if (step.description) {
      el.markdownBody.classList.remove('hidden');
      el.markdownBody.innerHTML = marked.parse(step.description);
    } else {
      el.markdownBody.classList.add('hidden');
    }

    // Load step-specific workspaces
    if (step.workspace === 'recon') {
      setupReconWorkspace(step);
    } else if (step.workspace === 'burp') {
      setupBurpWorkspace(step);
    } else if (step.workspace === 'evidence') {
      setupEvidenceWorkspace();
    } else if (step.workspace === 'report') {
      setupReportWorkspace(step);
    } else if (step.workspace === 'review') {
      setupReviewWorkspace();
    } else if (step.workspace === 'quiz') {
      setupQuizWorkspace(step);
    } else if (step.workspace === 'lab') {
      setupLabWorkspace(step);
    }

    // Dynamic mindset / mistakes advice panels
    if (step.thoughts) {
      el.workspaceThoughts.classList.remove('hidden');
      el.thoughtsContent.innerHTML = marked.parse(step.thoughts);
    }
    if (step.mistakes) {
      el.workspaceMistakes.classList.remove('hidden');
      el.mistakesList.innerHTML = '';
      step.mistakes.forEach(m => {
        const div = document.createElement('div');
        div.className = 'mistakes-item';
        div.innerHTML = `<i class="bx bx-x-circle"></i> <span>${m}</span>`;
        el.mistakesList.appendChild(div);
      });
    }

    // Handle Choices / Decision points
    if (step.choices && step.choices.length > 0) {
      el.choicesContainer.classList.remove('hidden');
      el.choicesGrid.innerHTML = '';
      
      step.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerHTML = `
          <span class="choice-marker">${String.fromCharCode(65 + idx)}</span>
          <span>${choice.text}</span>
        `;
        btn.addEventListener('click', () => handleChoiceSelection(choice));
        el.choicesGrid.appendChild(btn);
      });
    }

    // Navigation button controls
    el.prevStepBtn.disabled = index === 0;
    
    // The "Next" button is only enabled if:
    // 1. The step has no blocking choices, or the user already selected a choice/completed the work.
    // 2. Or if the step is already completed.
    const isCompleted = index < state.solved.includes(state.currentScenario.id) || index < state.currentStepIndex;
    const isLastStep = index === state.currentScenario.steps.length - 1;
    
    if (isLastStep) {
      el.nextStepBtn.innerText = "Finish Scenario";
      el.nextStepBtn.classList.add('success-btn');
      el.nextStepBtn.disabled = !state.solved.includes(state.currentScenario.id) && !state.currentScenario.steps[index].completedDirect;
    } else {
      el.nextStepBtn.innerText = "Next Step";
      el.nextStepBtn.classList.remove('success-btn');
      el.nextStepBtn.disabled = (step.choices && step.choices.length > 0) || step.workspace === 'report' || step.workspace === 'quiz' || step.workspace === 'lab';
    }
  }

  function hideAllWorkspaces() {
    el.choicesContainer.classList.add('hidden');
    el.workspaceTerminal.classList.add('hidden');
    el.workspaceBurp.classList.add('hidden');
    el.workspaceEvidence.classList.add('hidden');
    el.workspaceReport.classList.add('hidden');
    el.workspaceReview.classList.add('hidden');
    el.workspaceThoughts.classList.add('hidden');
    el.workspaceMistakes.classList.add('hidden');
    el.workspaceQuiz.classList.add('hidden');
    el.workspaceLab.classList.add('hidden');
  }

  // Choice Selection Engine
  function handleChoiceSelection(choice) {
    if (choice.timePenalty) {
      state.stepTimeSpent += choice.timePenalty;
      el.stepTimeSpent.innerText = state.stepTimeSpent;
    }
    
    alert(`${choice.outcome}\n\nXP Modifier: ${choice.xp >= 0 ? '+' : ''}${choice.xp}`);
    
    state.xp = Math.max(0, state.xp + choice.xp);
    saveGame();

    if (choice.correct) {
      // Unlock next step
      el.nextStepBtn.disabled = false;
      if (state.currentStepIndex + 1 < state.currentScenario.steps.length) {
        loadStep(state.currentStepIndex + 1);
      }
    }
  }

  // --- RECON TERMINAL EMULATOR ---
  let typingTimer = null;
  function setupReconWorkspace(step) {
    el.workspaceTerminal.classList.remove('hidden');
    el.termBody.innerHTML = '';
    el.termControls.innerHTML = '';
    
    // Injected commands
    if (step.terminalCommands) {
      step.terminalCommands.forEach(cmd => {
        const btn = document.createElement('button');
        btn.className = 'hunt-btn';
        btn.innerHTML = `<i class="bx bx-terminal"></i> Run <code>${cmd.name}</code>`;
        btn.addEventListener('click', () => {
          // Disable controls during typing
          Array.from(el.termControls.children).forEach(b => b.disabled = true);
          executeTerminalScript(cmd);
        });
        el.termControls.appendChild(btn);
      });
    }
  }

  function executeTerminalScript(cmd) {
    let index = 0;
    el.termBody.innerHTML += `<div class="term-line term-cmd">hunter@recon:~$ ${cmd.name}</div>`;
    
    if (typingTimer) clearInterval(typingTimer);

    typingTimer = setInterval(() => {
      if (index >= cmd.output.length) {
        clearInterval(typingTimer);
        // Enable controls
        Array.from(el.termControls.children).forEach(b => b.disabled = false);
        el.termBody.scrollTop = el.termBody.scrollHeight;
        
        // Add evidence to locker if present
        if (cmd.evidence) {
          addEvidence(cmd.evidence);
        }
        
        // Enable next step if this command was the correct one
        if (cmd.correct) {
          el.nextStepBtn.disabled = false;
        }
        return;
      }

      const line = cmd.output[index];
      const div = document.createElement('div');
      div.className = `term-line ${line.type === 'error' ? 'term-err' : line.type === 'success' ? 'term-success' : 'term-out'}`;
      div.innerText = line.text;
      el.termBody.appendChild(div);
      el.termBody.scrollTop = el.termBody.scrollHeight;
      
      index++;
    }, 150); // Fast feed simulator
  }

  // --- BURP SUITE SIMULATOR ---
  function setupBurpWorkspace(step) {
    el.workspaceBurp.classList.remove('hidden');
    el.burpRequestView.innerText = step.burpRequest || '';
    el.burpResponseView.innerText = step.burpResponse || '';
    el.burpActions.innerHTML = '';

    if (step.burpActions) {
      step.burpActions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'hunt-btn';
        btn.innerHTML = `<i class="bx bx-git-commit"></i> ${action.name}`;
        btn.addEventListener('click', () => {
          // Render changes
          el.burpRequestView.innerText = action.modifiedRequest || step.burpRequest;
          el.burpResponseView.innerText = action.modifiedResponse || '';
          
          if (action.evidence) {
            addEvidence(action.evidence);
          }

          if (action.correct) {
            alert("Payload injection successful! Evidence gathered and stored in your locker.");
            el.nextStepBtn.disabled = false;
          } else {
            alert(action.outcome || "No response change. Target filter blocked your payload.");
            if (action.timePenalty) {
              state.stepTimeSpent += action.timePenalty;
              el.stepTimeSpent.innerText = state.stepTimeSpent;
            }
          }
        });
        el.burpActions.appendChild(btn);
      });
    }
  }

  // --- EVIDENCE LOCKER ---
  function addEvidence(item) {
    if (!state.evidence.some(e => e.title === item.title)) {
      state.evidence.push(item);
      alert(`📂 Evidence Locker: Unlocked new proof! "${item.title}"`);
    }
  }

  function setupEvidenceWorkspace() {
    el.workspaceEvidence.classList.remove('hidden');
    el.evidenceContainer.innerHTML = '';

    if (state.evidence.length === 0) {
      el.evidenceContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No evidence gathered yet. Revisit previous steps if you missed findings.</div>`;
      return;
    }

    state.evidence.forEach(item => {
      const card = document.createElement('div');
      card.className = 'evidence-card';
      card.innerHTML = `
        <div class="evidence-card-title">${item.title}</div>
        <pre class="evidence-card-body">${item.content}</pre>
      `;
      el.evidenceContainer.appendChild(card);
    });

    el.nextStepBtn.disabled = false;
  }

  // --- REPORT BUILDER & EXPERT REVIEW ---
  function setupReportWorkspace(step) {
    el.workspaceReport.classList.remove('hidden');
    
    // Pre-populate titles if needed
    el.reportTitle.value = '';
    el.reportSeverity.value = '';
    el.reportType.value = '';
    el.reportDesc.value = '';
    el.reportSteps.value = '';
    el.reportImpact.value = '';

    el.submitReportBtn.disabled = false;
  }

  // Handle Report Submission
  el.submitReportBtn.addEventListener('click', () => {
    const title = el.reportTitle.value.trim();
    const severity = el.reportSeverity.value;
    const type = el.reportType.value;
    const desc = el.reportDesc.value.trim();
    const steps = el.reportSteps.value.trim();
    const impact = el.reportImpact.value.trim();

    if (!title || !severity || !type || !desc || !steps || !impact) {
      alert("Please fill in all sections of the vulnerability report!");
      return;
    }

    el.submitReportBtn.disabled = true;

    // Calculate score based on similarity templates
    const correctReport = state.currentScenario.realReport;
    
    let accuracy = 70; // Base score
    if (severity === correctReport.severity) accuracy += 10;
    if (type === correctReport.type) accuracy += 10;
    if (title.toLowerCase().includes(correctReport.keywords[0])) accuracy += 5;
    if (steps.toLowerCase().includes(correctReport.keywords[1])) accuracy += 5;

    // Render comparison
    setupReviewWorkspace(title, severity, type, desc, steps, impact, accuracy);
    
    // Advance to next step (Review panel)
    state.currentStepIndex++;
    loadStep(state.currentStepIndex);
  });

  function setupReviewWorkspace(title, severity, type, desc, steps, impact, score) {
    el.workspaceReview.classList.remove('hidden');
    
    const sc = state.currentScenario;
    const correctReport = sc.realReport;

    // Populate user report
    el.userReportSummary.innerHTML = `
      <p><strong>Title:</strong> ${title || 'No Title'}</p>
      <p><strong>Severity:</strong> <span class="difficulty-badge expert">${severity || 'Low'}</span></p>
      <p><strong>Type:</strong> ${type || 'Other'}</p>
      <p><strong>Description:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${desc || ''}</p>
      <p><strong>Steps to Reproduce:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${steps || ''}</p>
      <p><strong>Impact:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${impact || ''}</p>
    `;

    // Populate original report
    el.realReportSummary.innerHTML = `
      <p><strong>Title:</strong> ${correctReport.title}</p>
      <p><strong>Severity:</strong> <span class="difficulty-badge real">${correctReport.severity}</span></p>
      <p><strong>Type:</strong> ${correctReport.type}</p>
      <p><strong>Description:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${correctReport.desc}</p>
      <p><strong>Steps to Reproduce:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${correctReport.steps}</p>
      <p><strong>Impact:</strong></p>
      <p style="font-size:0.82rem; color:var(--text-secondary); white-space:pre-line;">${correctReport.impact}</p>
    `;

    // Triager feedback verdict
    const isCompleted = state.solved.includes(sc.id);
    let bountyReward = parseInt(sc.reward.replace('$', '').replace(',', ''));
    let xpReward = sc.steps[state.currentStepIndex - 1]?.xpReward || 200;

    // Apply scoring deduction
    const finalScore = score || 85;
    bountyReward = Math.round(bountyReward * (finalScore / 100));
    xpReward = Math.round(xpReward * (finalScore / 100));

    el.triageVerdictPanel.innerHTML = `
      <h3 style="color:var(--accent-cyan); margin-bottom:12px;"><i class="bx bxs-check-shield"></i> Triager Triage Verdict</h3>
      <p style="font-size:0.9rem; margin-bottom:15px; color:var(--text-secondary);">
        Your report has been triaged as <strong>${correctReport.severity}</strong> severity. 
        Report Accuracy: <strong class="text-green">${finalScore}%</strong>.
      </p>
      <blockquote style="font-style: italic; color:var(--text-muted); margin-bottom: 20px;">
        "${correctReport.feedback}"
      </blockquote>
      <div style="display:flex; gap:15px;">
        <span class="stat-badge xp-badge"><i class="bx bxs-zap"></i> +${xpReward} XP</span>
        <span class="stat-badge bounty-badge"><i class="bx bx-dollar-circle"></i> +$${bountyReward.toLocaleString()} Bounty</span>
      </div>
    `;

    if (!isCompleted) {
      state.xp += xpReward;
      state.bounty += bountyReward;
      state.solved.push(sc.id);
      saveGame();
    }

    el.nextStepBtn.disabled = false;
  }

  // --- QUIZ ENGINE ---
  function setupQuizWorkspace(step) {
    el.workspaceQuiz.classList.remove('hidden');
    el.quizNextBtn.classList.add('hidden');
    el.quizSubmitBtn.classList.remove('hidden');
    el.quizSubmitBtn.disabled = true;
    
    state.selectedQuizOption = null;

    const quiz = step.quizData[state.quizCurrentQuestion];
    el.quizCurrentNum.innerText = state.quizCurrentQuestion + 1;
    el.quizTotalNum.innerText = step.quizData.length;
    el.quizQuestionText.innerText = quiz.question;

    el.quizOptionsList.innerHTML = '';
    quiz.options.forEach((opt, idx) => {
      const div = document.createElement('div');
      div.className = 'quiz-option';
      div.innerHTML = `<span class="choice-marker">${String.fromCharCode(65 + idx)}</span> <span>${opt}</span>`;
      div.addEventListener('click', () => selectQuizOption(div, idx));
      el.quizOptionsList.appendChild(div);
    });
  }

  function selectQuizOption(element, index) {
    // Clear previous selection
    Array.from(el.quizOptionsList.children).forEach(el => el.classList.remove('selected'));
    
    element.classList.add('selected');
    state.selectedQuizOption = index;
    el.quizSubmitBtn.disabled = false;
  }

  el.quizSubmitBtn.addEventListener('click', () => {
    const step = state.currentScenario.steps[state.currentStepIndex];
    const quiz = step.quizData[state.quizCurrentQuestion];
    const optionCards = Array.from(el.quizOptionsList.children);

    optionCards[state.selectedQuizOption].classList.remove('selected');

    if (state.selectedQuizOption === quiz.answer) {
      optionCards[state.selectedQuizOption].classList.add('correct');
      state.xp += 10;
      saveGame();
      alert("Correct Answer! +10 XP");
    } else {
      optionCards[state.selectedQuizOption].classList.add('wrong');
      optionCards[quiz.answer].classList.add('correct');
      alert(`Incorrect. The correct answer was ${String.fromCharCode(65 + quiz.answer)}.`);
    }

    el.quizSubmitBtn.classList.add('hidden');
    el.quizNextBtn.classList.remove('hidden');
  });

  el.quizNextBtn.addEventListener('click', () => {
    const step = state.currentScenario.steps[state.currentStepIndex];
    state.quizCurrentQuestion++;

    if (state.quizCurrentQuestion < step.quizData.length) {
      setupQuizWorkspace(step);
    } else {
      // Quiz complete
      alert(`Quiz completed! You scored ${state.xp} XP total.`);
      el.workspaceQuiz.classList.add('hidden');
      el.nextStepBtn.disabled = false;
      
      // Auto advance
      if (state.currentStepIndex + 1 < state.currentScenario.steps.length) {
        loadStep(state.currentStepIndex + 1);
      }
    }
  });

  // --- INTERACTIVE SIMULATED LAB ---
  function setupLabWorkspace(step) {
    el.workspaceLab.classList.remove('hidden');
    el.labInstructions.innerText = step.instructions || "Conduct the security audit on this target to locate the vulnerability flag.";
    el.labTargetUrl.innerText = step.targetUrl || "https://staging-app.company.org/";
    el.labFlagInput.value = '';
    el.submitFlagBtn.disabled = false;
  }

  el.submitFlagBtn.addEventListener('click', () => {
    const step = state.currentScenario.steps[state.currentStepIndex];
    const userFlag = el.labFlagInput.value.trim();

    if (!userFlag) {
      alert("Please enter a flag before submitting.");
      return;
    }

    if (userFlag === step.correctFlag) {
      el.submitFlagBtn.disabled = true;
      alert(`🚩 Flag Accepted! Congratulations! +${step.xpReward || 100} XP`);
      state.xp += step.xpReward || 100;
      saveGame();
      
      el.nextStepBtn.disabled = false;
      
      // Auto progress
      if (state.currentStepIndex + 1 < state.currentScenario.steps.length) {
        loadStep(state.currentStepIndex + 1);
      } else {
        step.completedDirect = true;
        loadStep(state.currentStepIndex); // Triggers "Finish" state
      }
    } else {
      alert("❌ Invalid flag. Analyze the request details and try again.");
    }
  });

  // Timeline Step Navigation Handlers
  el.prevStepBtn.addEventListener('click', () => {
    if (state.currentStepIndex > 0) {
      loadStep(state.currentStepIndex - 1);
    }
  });

  el.nextStepBtn.addEventListener('click', () => {
    const isLastStep = state.currentStepIndex === state.currentScenario.steps.length - 1;
    if (isLastStep) {
      exitScenario();
    } else if (state.currentStepIndex + 1 < state.currentScenario.steps.length) {
      loadStep(state.currentStepIndex + 1);
    }
  });

  // Dashboard Filters Click Handlers
  el.levelFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    
    Array.from(el.levelFilters.children).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeLevel = btn.dataset.level;
    renderDashboard();
  });

  el.categoryFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    Array.from(el.categoryFilters.children).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderDashboard();
  });

  el.exitSimBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to leave this scenario? Your current progress will not be saved.")) {
      exitScenario();
    }
  });

  // Init platform
  window.addEventListener('DOMContentLoaded', () => {
    loadGame();
    renderDashboard();
  });

})();
