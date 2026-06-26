// ==========================================
// V3 INTERACTIVE SIMULATION ENGINE (SCENARIO ENGINE)
// ==========================================

window.ScenarioEngine = {
  scenario: null,
  currentStepIndex: 0,
  timeSpent: 0,
  timer: null,
  evidence: [],
  selectedQuizOption: null,
  quizCurrentQuestion: 0,
  
  // DOM selectors
  el: {
    title: document.getElementById('sim-scenario-title'),
    diff: document.getElementById('sim-diff-badge'),
    cat: document.getElementById('sim-category-badge'),
    bounty: document.getElementById('sim-bounty-val'),
    time: document.getElementById('sim-time-val'),
    company: document.getElementById('sim-company-val'),
    timeline: document.getElementById('timeline-steps-list'),
    
    logoText: document.getElementById('app-logo-text'),
    logoSubtext: document.getElementById('app-logo-subtext'),
    briefTargetName: document.getElementById('brief-target-name'),
    briefObjectiveText: document.getElementById('brief-objective-text'),
    briefRewardVal: document.getElementById('brief-reward-val'),
    briefScopeList: document.getElementById('brief-scope-list'),
    
    stepTitle: document.getElementById('step-title'),
    stepTimeSpent: document.getElementById('step-time-spent'),
    stepXPPotential: document.getElementById('step-xp-potential'),
    markdownBody: document.getElementById('step-content-markdown'),
    choicesPanel: document.getElementById('step-choices-container'),
    choicesGrid: document.getElementById('step-choices'),
    prevBtn: document.getElementById('prev-step-btn'),
    nextBtn: document.getElementById('next-step-btn'),
    
    // Terminal console pane
    terminal: document.getElementById('console-pane-terminal'),
    termBody: document.getElementById('term-body'),
    termControls: document.getElementById('term-control-buttons'),
    
    // Burp console pane
    burp: document.getElementById('console-pane-burp'),
    burpReq: document.getElementById('burp-request-view'),
    burpResp: document.getElementById('burp-response-view'),
    burpActions: document.getElementById('burp-actions-container'),
    
    // Decision Log
    decisionLog: document.getElementById('workspace-decision-log'),
    decisionLogContent: document.getElementById('decision-log-content'),
    
    // Payload
    payload: document.getElementById('workspace-payload'),
    payloadContent: document.getElementById('payload-content-area'),
    
    // Evidence
    evidence: document.getElementById('workspace-evidence'),
    evidenceContainer: document.getElementById('evidence-container'),
    
    // Report Builder
    report: document.getElementById('workspace-report'),
    reportTitle: document.getElementById('report-title'),
    reportSeverity: document.getElementById('report-severity'),
    reportType: document.getElementById('report-type'),
    reportDesc: document.getElementById('report-desc'),
    reportSteps: document.getElementById('report-steps'),
    reportImpact: document.getElementById('report-impact'),
    submitReportBtn: document.getElementById('submit-report-btn'),
    
    // Review
    review: document.getElementById('workspace-review'),
    userReportSummary: document.getElementById('user-report-summary'),
    realReportSummary: document.getElementById('real-report-summary'),
    triagePanel: document.getElementById('triage-verdict-panel'),
    
    // Mistakes
    mistakes: document.getElementById('workspace-mistakes'),
    mistakesList: document.getElementById('mistakes-list'),
    
    // Quiz
    quiz: document.getElementById('workspace-quiz'),
    quizCurrentNum: document.getElementById('quiz-current-num'),
    quizTotalNum: document.getElementById('quiz-total-num'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsList: document.getElementById('quiz-options-list'),
    quizSubmitBtn: document.getElementById('quiz-submit-btn'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    
    // Lab
    lab: document.getElementById('workspace-lab'),
    labInstructions: document.getElementById('lab-instructions'),
    labTargetUrl: document.getElementById('lab-target-url'),
    labFlagInput: document.getElementById('lab-flag-input'),
    submitFlagBtn: document.getElementById('submit-flag-btn'),
    
    // AI Chat
    aiToggleBtn: document.getElementById('ai-advisor-toggle-btn')
  },

  init(scId, data) {
    this.scenario = data;
    this.currentStepIndex = 0;
    this.timeSpent = 0;
    this.evidence = [];
    this.quizCurrentQuestion = 0;
    this.hintsUnlockedCount = 0;
    this.unlockedHints = {};
    
    // Save last active scenario
    ProgressManager.setLastActive(scId);

    // Dynamic Title & Category masking for Real Hunt Mode
    const isRealHunt = ProgressManager.state.realHuntMode;
    let displayTitle = data.metadata.title;
    let displayCategory = data.metadata.category;
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
      displayTitle = maskedTitles[scId] || "Target API Endpoint";
      displayCategory = "Web Endpoint Analysis";
    }

    // Setup headers
    this.el.title.innerText = `${scId.toUpperCase()}: ${displayTitle}`;
    this.el.diff.className = `difficulty-badge ${data.metadata.level.toLowerCase().replace(' ', '')}`;
    this.el.diff.innerText = data.metadata.level;
    this.el.cat.innerText = displayCategory;
    this.el.bounty.innerText = data.metadata.reward;
    this.el.time.innerText = data.metadata.time;
    this.el.company.innerText = data.metadata.company;

    // Dynamic Header Logo
    if (this.el.logoText && data.metadata.company) {
      this.el.logoText.innerText = `${data.metadata.company} Bug Bounty Academy`;
    }
    if (this.el.logoSubtext) {
      const cleanNum = scId.replace('scenario-', '').toUpperCase();
      this.el.logoSubtext.innerText = `Scenario-${cleanNum}: ${data.metadata.category} Exploit Engine`;
    }

    // Dynamic Target Brief Panel
    if (this.el.briefTargetName) this.el.briefTargetName.innerText = data.metadata.company || "Target System";
    if (this.el.briefObjectiveText) {
      this.el.briefObjectiveText.innerText = data.metadata.objective || `Identify flaws in ${data.metadata.category} controls.`;
    }
    if (this.el.briefRewardVal) this.el.briefRewardVal.innerText = data.metadata.reward;
    if (this.el.briefScopeList) {
      this.el.briefScopeList.innerHTML = '';
      const scopeItems = data.metadata.scope || [
        "No verification tokens in API requests.",
        "Backend trust on client-side state variables.",
        "No validation check on final balance integrity."
      ];
      scopeItems.forEach(item => {
        this.el.briefScopeList.innerHTML += `<li>${item}</li>`;
      });
    }

    // Start timer clock
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeSpent++;
      this.el.stepTimeSpent.innerText = this.timeSpent;
    }, 60000);
    this.el.stepTimeSpent.innerText = "0";

    // AI Advisor Column toggle
    const splitBody = document.querySelector('.workspace-body-split');
    if (this.el.aiToggleBtn && splitBody) {
      this.el.aiToggleBtn.addEventListener('click', () => {
        splitBody.classList.toggle('advisor-collapsed');
      });
    }

    document.getElementById('exit-sim-btn').addEventListener('click', () => {
      if(confirm("Exit investigation? Unsaved step progress will be discarded.")) {
        window.location.href = '../index.html';
      }
    });

    // Step navigation buttons bindings
    this.el.prevBtn.addEventListener('click', () => {
      if (this.currentStepIndex > 0) {
        this.loadStep(this.currentStepIndex - 1);
      }
    });

    this.el.nextBtn.addEventListener('click', () => {
      const isLastStep = this.currentStepIndex === this.scenario.steps.length - 1;
      if (isLastStep) {
        this.showCompletionOverlay();
      } else {
        this.loadStep(this.currentStepIndex + 1);
      }
    });

    this.loadStep(0);
  },

  // --- COMPLETION OVERLAY ---
  showCompletionOverlay() {
    const id = this.scenario.metadata.id;
    const totalXP = this.scenario.steps.reduce((sum, s) => sum + (s.xpReward || 0), 0);
    const bountyRaw = parseInt((this.scenario.metadata.reward || '0').replace(/[^0-9]/g, ''));
    const dbEntry = window.scenariosDatabase ? window.scenariosDatabase.find(s => s.id === id) : null;
    const stars = dbEntry ? dbEntry.stars : 3;
    const starsHtml = Array.from({length: 5}, (_, i) =>
      `<i class="bx bxs-star" style="color: ${i < stars ? '#f59e0b' : 'rgba(255,255,255,0.1)'}"></i>`
    ).join('');

    const overlay = document.createElement('div');
    overlay.id = 'completion-overlay';
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.4s ease;`;
    overlay.innerHTML = `
      <div style="background:var(--bg-card);border:1px solid rgba(6,182,212,0.4);border-radius:16px;padding:48px 40px;max-width:520px;width:90%;text-align:center;box-shadow:0 0 60px rgba(6,182,212,0.15);">
        <div style="font-size:3.5rem;margin-bottom:12px;">🏆</div>
        <h2 style="font-family:var(--font-title);color:var(--accent-cyan);font-size:1.6rem;margin-bottom:8px;">Scenario Complete!</h2>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:24px;">You've successfully completed this investigation and filed a report.</p>
        <div style="display:flex;justify-content:center;gap:4px;margin-bottom:24px;font-size:1.4rem;">${starsHtml}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;">
          <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:10px;padding:16px;">
            <div style="font-size:1.4rem;font-weight:700;color:var(--accent-cyan);font-family:var(--font-mono);">+${totalXP.toLocaleString()}</div>
            <div style="color:var(--text-muted);font-size:0.72rem;text-transform:uppercase;margin-top:2px;">XP Earned</div>
          </div>
          <div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);border-radius:10px;padding:16px;">
            <div style="font-size:1.4rem;font-weight:700;color:var(--accent-green);font-family:var(--font-mono);">$${bountyRaw.toLocaleString()}</div>
            <div style="color:var(--text-muted);font-size:0.72rem;text-transform:uppercase;margin-top:2px;">Bounty Potential</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <button id="comp-next-scenario" class="hunt-btn success-btn" style="width:100%;padding:12px;font-size:0.9rem;">
            <i class="bx bx-right-arrow-alt"></i> Back to Dashboard
          </button>
          <button id="comp-view-profile" class="hunt-btn" style="width:100%;padding:12px;font-size:0.9rem;">
            <i class="bx bx-user"></i> View My Profile
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('comp-next-scenario').onclick = () => { window.location.href = '../index.html'; };
    document.getElementById('comp-view-profile').onclick = () => { window.location.href = 'profile.html'; };
  },

  // --- TOAST NOTIFICATIONS ---
  showToast(msg, type = 'info', duration = 3000) {
    if (typeof ProgressManager !== 'undefined' && ProgressManager.showToast) {
      ProgressManager.showToast(msg, type);
      return;
    }
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const colors = { success: '#22c55e', error: '#ef4444', info: '#06b6d4', warning: '#f59e0b' };
    toast.style.cssText = `background:var(--bg-card);border:1px solid ${colors[type] || colors.info};border-left:3px solid ${colors[type] || colors.info};border-radius:8px;padding:12px 16px;color:var(--text-main);font-size:0.82rem;max-width:320px;animation:slideInToast 0.3s ease;box-shadow:0 4px 20px rgba(0,0,0,0.4);`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, duration);
  },

  switchConsoleTab(tabId) {
    const tabs = ['idle', 'terminal', 'burp'];
    tabs.forEach(t => {
      const tabEl = document.getElementById(`console-tab-${t}`);
      const paneEl = document.getElementById(`console-pane-${t}`);
      if (tabEl) tabEl.classList.toggle('active', t === tabId);
      if (paneEl) paneEl.classList.toggle('hidden', t !== tabId);
    });
  },

  loadStep(idx) {
    this.currentStepIndex = idx;
    const step = this.scenario.steps[idx];

    // Reset UI
    this.hideAllWorkspaces();
    this.el.stepTitle.innerText = step.name;
    this.el.stepXPPotential.innerText = step.xpReward || 50;

    // Show Target Summary card ONLY on step 0 (Mission) to maximize vertical space on active steps
    const briefCard = document.getElementById('static-mission-brief');
    if (briefCard) {
      if (idx === 0) {
        briefCard.classList.remove('hidden');
      } else {
        briefCard.classList.add('hidden');
      }
    }

    // Render left timeline steps
    const isSolved = ProgressManager.state.solved.includes(this.scenario.metadata.id);
    Renderer.renderTimelineSteps(this.el.timeline, this.scenario.steps, idx, isSolved);

    // Switch bottom console pane active tab based on active step workspace
    if (step.workspace === 'recon') {
      this.switchConsoleTab('terminal');
    } else if (step.workspace === 'burp') {
      this.switchConsoleTab('burp');
    } else if (step.workspace === 'lab') {
      this.switchConsoleTab('terminal');
    } else {
      this.switchConsoleTab('idle');
    }

    // Dynamic AI Advisor - progressive hints system
    const hintsSelector = document.getElementById('advisor-hints-selector');
    const hintDisplay = document.getElementById('advisor-hint-display');
    if (hintsSelector && hintDisplay) {
      hintsSelector.innerHTML = '';
      hintDisplay.innerText = "Select a hint tab above to show assistance.";
      
      const hints = step.aiAdvisor?.hints || (step.aiAdvisor?.hint ? step.aiAdvisor.hint.split('. ').filter(h => h.trim().length > 0) : []);
      if (hints.length === 0) {
        hintsSelector.innerHTML = '<span style="color:var(--text-muted); font-size:0.75rem;">No hints active for this step.</span>';
        hintDisplay.innerText = "Analyze the description and inputs.";
      } else {
        const isRealHunt = ProgressManager.state.realHuntMode;
        hints.forEach((hintText, hIdx) => {
          const btn = document.createElement('button');
          btn.className = 'hint-badge-btn';
          
          const hintKey = `${this.scenario.metadata.id}_step_${this.currentStepIndex}_hint_${hIdx}`;
          const isUnlocked = this.unlockedHints[hintKey] || !isRealHunt;
          
          if (isRealHunt && !isUnlocked) {
            btn.classList.add('locked');
            btn.innerHTML = `<i class="bx bx-lock-alt"></i> Hint ${hIdx + 1} ($500)`;
          } else {
            btn.classList.add('unlocked');
            btn.innerText = `Hint ${hIdx + 1}`;
          }

          btn.addEventListener('click', () => {
            const currentUnlocked = this.unlockedHints[hintKey] || !isRealHunt;
            if (isRealHunt && !currentUnlocked) {
              const confirmUnlock = confirm("🚨 Warning: Unlocking this hint will deduct $500 from your potential bounty reward for this scenario. Do you want to proceed?");
              if (!confirmUnlock) return;
              
              // Unlock hint
              this.unlockedHints[hintKey] = true;
              this.hintsUnlockedCount = (this.hintsUnlockedCount || 0) + 1;
              btn.classList.remove('locked');
              btn.classList.add('unlocked');
              btn.innerText = `Hint ${hIdx + 1}`;
            }

            Array.from(hintsSelector.children).forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            hintDisplay.innerText = hintText + (hintText.endsWith('.') ? '' : '.');
          });
          hintsSelector.appendChild(btn);
        });
        
        if (!isRealHunt && hintsSelector.children.length > 0) {
          hintsSelector.children[0].click();
        } else {
          hintDisplay.innerText = "Click a hint tab above to unlock technical hints.";
        }
      }
    }

    // Dynamic AI Advisor - threat analysis pane
    const analysisText = document.getElementById('advisor-analysis-text');
    if (analysisText && step.aiAdvisor) {
      analysisText.innerHTML = `
        <div style="margin-bottom:8px;"><strong>Status:</strong> <span class="text-cyan">${step.name === 'Verdict' || step.name === 'Triage & Verdict' ? 'RESOLVED' : 'ACTIVE_DIAGNOSIS'}</span></div>
        <div style="margin-bottom:8px;"><strong>Payload Logic:</strong> <span dir="auto">${step.aiAdvisor.payloadExplanation || 'Analyze parameters to design an exploit.'}</span></div>
        <div><strong>Trap Analysis:</strong> <span dir="auto">${step.aiAdvisor.failureExplanation || 'Avoid standard fuzzers to bypass firewalls.'}</span></div>
      `;
    }

    // Dynamic AI Advisor - Decision Tree or Timeline interactive visual card
    const interCard = document.getElementById('advisor-interactive-card');
    const interTitle = document.getElementById('advisor-interactive-title');
    const interVisual = document.getElementById('advisor-interactive-visual');
    if (interCard && interTitle && interVisual) {
      const lowerName = step.name.toLowerCase();
      if (lowerName.includes('dns') || lowerName.includes('check') || lowerName.includes('decision')) {
        interCard.classList.remove('hidden');
        interTitle.innerHTML = `<i class="bx bx-git-branch text-green"></i> Decision Tree Engine`;
        interVisual.innerHTML = `
          <div class="decision-tree-node highlighted">
            Is input validated server-side?<br>
            <span style="color:var(--critical-red); font-weight:700;">➔ NO</span>
          </div>
          <div class="decision-tree-arrow">↓</div>
          <div class="decision-tree-node highlighted">
            Can value be negative?<br>
            <span style="color:var(--accent-green); font-weight:700;">➔ YES</span>
          </div>
          <div class="decision-tree-arrow">↓</div>
          <div class="decision-tree-node highlighted">
            Does backend trust frontend value?<br>
            <span style="color:var(--accent-green); font-weight:700;">➔ YES</span>
          </div>
          <div class="decision-tree-arrow">↓</div>
          <div style="background:rgba(239,68,68,0.12); border:1px solid var(--critical-red); color:var(--critical-red); border-radius:6px; padding:10px; font-size:0.75rem; text-align:center; font-weight:bold; letter-spacing:0.5px; font-family:var(--font-mono);">
            🚨 BUSINESS LOGIC FLAW POSSIBLE
          </div>
        `;
      } else if (lowerName.includes('exploit') || lowerName.includes('timeline')) {
        interCard.classList.remove('hidden');
        interTitle.innerHTML = `<i class="bx bx-time-five text-orange"></i> Concurrency Race Timeline`;
        interVisual.innerHTML = `
          <div class="timeline-stamp-row">
            <span class="timeline-stamp-time">T0 (0ms)</span>
            <span class="timeline-stamp-desc">Race exploit triggers 10 threads.</span>
          </div>
          <div class="timeline-stamp-row">
            <span class="timeline-stamp-time">T1 (2ms)</span>
            <span class="timeline-stamp-desc">Thread-1 applies discount coupon.</span>
          </div>
          <div class="timeline-stamp-row">
            <span class="timeline-stamp-time">T2 (3ms)</span>
            <span class="timeline-stamp-desc">Thread-2 requests cart checkout.</span>
          </div>
          <div class="timeline-stamp-row">
            <span class="timeline-stamp-time">T3 (5ms)</span>
            <span class="timeline-stamp-desc">DB checks coupon status before updates.</span>
          </div>
          <div class="timeline-stamp-row active">
            <span class="timeline-stamp-time">T4 (8ms)</span>
            <span class="timeline-stamp-desc">Coupon applied twice. Total: $0.</span>
          </div>
          <div style="background:rgba(34,197,94,0.12); border:1px solid var(--accent-green); color:var(--accent-green); border-radius:6px; padding:8px; font-size:0.72rem; text-align:center; font-weight:700; font-family:var(--font-mono); margin-top:8px;">
            💰 FREE PURCHASE CONFIRMED
          </div>
        `;
      } else {
        interCard.classList.add('hidden');
      }
    }

    // Markdown description parsing
    if (step.description) {
      this.el.markdownBody.classList.remove('hidden');
      this.el.markdownBody.innerHTML = MarkdownParser.parse(step.description);
    }

    // Dynamic decision log V2
    if (this.scenario.decisionLog && (step.name === "DNS Verification" || step.name === "DNS Check")) {
      this.el.decisionLog.classList.remove('hidden');
      Renderer.renderDecisionLog(this.el.decisionLogContent, this.scenario.decisionLog);
    }

    // Dynamic mistakes box V2
    if (this.scenario.mistakes && (step.name === "Passive Recon" || step.name === "Recon")) {
      this.el.mistakes.classList.remove('hidden');
      Renderer.renderMistakesChecklist(this.el.mistakesList, this.scenario.mistakes);
    }

    // Load step workspace
    if (step.workspace === 'recon') {
      this.setupTerminalWorkspace(step);
    } else if (step.workspace === 'burp') {
      this.setupBurpWorkspace(step);
    } else if (step.workspace === 'payload') {
      this.setupPayloadWorkspace();
    } else if (step.workspace === 'evidence') {
      this.setupEvidenceWorkspace();
    } else if (step.workspace === 'report') {
      this.setupReportWorkspace();
    } else if (step.workspace === 'review') {
      // Handled via report submission
    } else if (step.workspace === 'quiz') {
      this.setupQuizWorkspace(step);
    } else if (step.workspace === 'lab') {
      this.setupLabWorkspace(step);
    }

    // Choices
    if (step.choices && step.choices.length > 0) {
      this.el.choicesPanel.classList.remove('hidden');
      this.el.choicesGrid.innerHTML = '';
      step.choices.forEach((choice, i) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.setAttribute('dir', 'auto');
        btn.innerHTML = `
          <span class="choice-marker">${String.fromCharCode(65 + i)}</span>
          <span dir="auto">${choice.text}</span>
        `;
        btn.addEventListener('click', () => this.selectChoice(choice));
        this.el.choicesGrid.appendChild(btn);
      });
    }

    // Navigation buttons
    this.el.prevBtn.disabled = idx === 0;
    
    const isCompleted = isSolved || idx < this.currentStepIndex;
    const isLastStep = idx === this.scenario.steps.length - 1;

    if (isLastStep) {
      this.el.nextBtn.innerText = "Finish Scenario";
      this.el.nextBtn.classList.add('success-btn');
      this.el.nextBtn.disabled = !isSolved && !step.completedDirect;
    } else {
      this.el.nextBtn.innerText = "Next Step";
      this.el.nextBtn.classList.remove('success-btn');
      this.el.nextBtn.disabled = (step.choices && step.choices.length > 0) || step.workspace === 'report' || step.workspace === 'quiz' || step.workspace === 'lab';
    }
  },

  hideAllWorkspaces() {
    this.el.markdownBody.classList.add('hidden');
    this.el.choicesPanel.classList.add('hidden');
    this.el.terminal.classList.add('hidden');
    this.el.burp.classList.add('hidden');
    this.el.decisionLog.classList.add('hidden');
    this.el.payload.classList.add('hidden');
    this.el.evidence.classList.add('hidden');
    this.el.report.classList.add('hidden');
    this.el.review.classList.add('hidden');
    this.el.mistakes.classList.add('hidden');
    this.el.quiz.classList.add('hidden');
    this.el.lab.classList.add('hidden');
  },

  selectChoice(choice) {
    if (choice.timePenalty) {
      this.timeSpent += choice.timePenalty;
      this.el.stepTimeSpent.innerText = this.timeSpent;
    }

    ProgressManager.addXP(choice.xp);

    // Show inline result notification instead of alert()
    const existingResult = document.getElementById('choice-result-banner');
    if (existingResult) existingResult.remove();
    const isCorrect = choice.correct;
    const xpSign = (choice.xp || 0) >= 0 ? '+' : '';
    const banner = document.createElement('div');
    banner.id = 'choice-result-banner';
    banner.style.cssText = `margin-top:12px;padding:14px 16px;border-radius:8px;font-size:0.85rem;line-height:1.5;border:1px solid ${isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'};background:${isCorrect ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)'};color:var(--text-main);`;
    banner.innerHTML = `<div style="font-weight:700;margin-bottom:6px;color:${isCorrect ? 'var(--accent-green)' : 'var(--critical-red)'}">${isCorrect ? '✅ Correct Choice!' : '❌ Wrong Path'}</div>
      <div dir="auto" style="color:var(--text-secondary)">${choice.outcome}</div>
      <div style="margin-top:8px;font-family:var(--font-mono);font-size:0.75rem;color:${isCorrect ? 'var(--accent-cyan)' : 'var(--warning-amber)'}">XP: ${xpSign}${choice.xp || 0}</div>`;
    this.el.choicesGrid.appendChild(banner);

    if (isCorrect) {
      this.el.nextBtn.disabled = false;
      setTimeout(() => {
        if (this.currentStepIndex + 1 < this.scenario.steps.length) {
          this.loadStep(this.currentStepIndex + 1);
        }
      }, 1500);
    } else {
      ProgressManager.logError();
    }
  },

  // --- TERMINAL CLI WORKSPACE ---
  setupTerminalWorkspace(step) {
    this.el.terminal.classList.remove('hidden');
    this.el.termBody.innerHTML = '';
    this.el.termControls.innerHTML = '';

    if (step.terminalCommands) {
      step.terminalCommands.forEach(cmd => {
        const btn = document.createElement('button');
        btn.className = 'hunt-btn';
        btn.innerHTML = `<i class="bx bx-terminal"></i> Run <code>${cmd.name}</code>`;
        btn.addEventListener('click', () => {
          Array.from(this.el.termControls.children).forEach(b => b.disabled = true);
          this.executeTerminalCommand(cmd);
        });
        this.el.termControls.appendChild(btn);
      });
    }
  },

  executeTerminalCommand(cmd) {
    let index = 0;
    this.el.termBody.innerHTML += `<div class="term-line term-cmd">hunter@recon:~$ ${cmd.name}</div>`;
    
    const interval = setInterval(() => {
      if (index >= cmd.output.length) {
        clearInterval(interval);
        Array.from(this.el.termControls.children).forEach(b => b.disabled = false);
        this.el.termBody.scrollTop = this.el.termBody.scrollHeight;
        
        if (cmd.evidence) {
          this.addEvidence(cmd.evidence);
        }
        
        if (cmd.correct) {
          this.el.nextBtn.disabled = false;
        }
        return;
      }

      const line = cmd.output[index];
      const div = document.createElement('div');
      div.className = `term-line ${line.type === 'error' ? 'term-err' : line.type === 'success' ? 'term-success' : 'term-out'}`;
      div.innerText = line.text;
      this.el.termBody.appendChild(div);
      this.el.termBody.scrollTop = this.el.termBody.scrollHeight;
      
      index++;
    }, 150);
  },

  // --- BURP SUITE WORKSPACE ---
  setupBurpWorkspace(step) {
    this.el.burp.classList.remove('hidden');
    this.el.burpReq.innerText = step.burpRequest || '';
    this.el.burpResp.innerText = step.burpResponse || '';
    this.el.burpActions.innerHTML = '';

    const logsPane = document.getElementById('burp-logs-pane');
    const gridContainer = document.getElementById('burp-grid-container');
    const logsView = document.getElementById('burp-logs-view');

    const hasInteractive = typeof this.scenario.simulateBackend === 'function' || this.scenario.metadata.id === 'scenario-006';
    this.el.burpReq.setAttribute('contenteditable', hasInteractive ? 'true' : 'false');

    if (hasInteractive) {
      // Premium V3 Interactive Repeater mode with 3-column observability logs!
      if (logsPane) logsPane.classList.remove('hidden');
      if (gridContainer) gridContainer.style.gridTemplateColumns = '1fr 1fr 1.2fr';
      
      if (logsView) {
        logsView.innerText = "[INFO] Observability agent active.\n[INFO] Listening for target requests on api.cybergear.com/cart...\n[INFO] Waiting for client request...";
        if (logsPane) {
          logsPane.style.borderColor = 'var(--border-color)';
          logsPane.style.boxShadow = 'none';
        }
      }

      const sendBtn = document.createElement('button');
      sendBtn.className = 'hunt-btn success-btn';
      sendBtn.innerHTML = `<i class="bx bx-send"></i> Send Request (Repeater)`;
      sendBtn.style.padding = '10px 20px';
      sendBtn.style.fontWeight = 'bold';
      
      sendBtn.addEventListener('click', () => {
        const requestText = this.el.burpReq.innerText || this.el.burpReq.textContent || '';
        
        // Extract JSON body
        let bodyJson = null;
        try {
          const bodyStart = requestText.indexOf('{');
          if (bodyStart !== -1) {
            const bodyText = requestText.substring(bodyStart);
            bodyJson = JSON.parse(bodyText.trim());
          }
        } catch(e) {
          console.warn("Failed to parse request JSON body: ", e);
        }

        // Run simulation backend logic (supports loaded JS module or static fallback)
        let result;
        if (typeof this.scenario.simulateBackend === 'function') {
          result = this.scenario.simulateBackend(requestText, bodyJson);
        } else {
          result = this.runScenario006Simulation(requestText, bodyJson);
        }

        // Display response
        this.el.burpResp.innerText = result.responseHeaders + '\n\n' + result.responseBody;

        // Print observability log on screen and console
        if (logsView && result.observabilityLog) {
          logsView.innerText = `[INFO] Request received: POST /api/cart/add\n${result.observabilityLog}`;
          
          if (logsPane) {
            if (result.correct) {
              logsPane.style.borderColor = 'var(--accent-green)';
              logsPane.style.boxShadow = '0 0 12px rgba(34, 197, 94, 0.25)';
            } else if (result.responseHeaders.includes('500')) {
              logsPane.style.borderColor = 'var(--critical-red)';
              logsPane.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.25)';
            } else if (result.responseHeaders.includes('400')) {
              logsPane.style.borderColor = 'var(--warning-amber)';
              logsPane.style.boxShadow = '0 0 12px rgba(245, 158, 11, 0.25)';
            }
          }
        }

        if (result.correct) {
          alert(result.outcome || "Vulnerability bypassed successfully!");
          this.el.nextBtn.disabled = false;
          if (result.evidence) {
            this.addEvidence(result.evidence);
          }
        } else {
          alert(result.outcome || "Bypass blocked by target security filters.");
          if (result.timePenalty) {
            this.timeSpent += result.timePenalty;
            this.el.stepTimeSpent.innerText = this.timeSpent;
          }
          ProgressManager.logError();
        }
      });
      this.el.burpActions.appendChild(sendBtn);
    } else {
      // V2 Fallback static action buttons
      if (logsPane) logsPane.classList.add('hidden');
      if (gridContainer) gridContainer.style.gridTemplateColumns = '1fr 1fr';

      if (step.burpActions) {
        step.burpActions.forEach(action => {
          const btn = document.createElement('button');
          btn.className = 'hunt-btn';
          btn.innerHTML = `<i class="bx bx-navigation"></i> ${action.name}`;
          btn.addEventListener('click', () => {
            this.el.burpReq.innerText = action.modifiedRequest || step.burpRequest;
            this.el.burpResp.innerText = action.modifiedResponse || '';
            
            if (action.evidence) {
              this.addEvidence(action.evidence);
            }

            if (action.correct) {
              alert("Vulnerable parameter tampered successfully! Target response payload captured in Burp proxy.");
              this.el.nextBtn.disabled = false;
            } else {
              alert(action.outcome || "Bypass blocked by target security filters.");
              if (action.timePenalty) {
                this.timeSpent += action.timePenalty;
                this.el.stepTimeSpent.innerText = this.timeSpent;
              }
            }
          });
          this.el.burpActions.appendChild(btn);
        });
      }
    }
  },

  runScenario006Simulation(requestText, bodyJson) {
    const response = {
      responseHeaders: "HTTP/2 200 OK\nContent-Type: application/json",
      responseBody: "{}",
      correct: false,
      outcome: "",
      timePenalty: 0,
      observabilityLog: ""
    };

    if (!bodyJson || typeof bodyJson.quantity === 'undefined') {
      response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "Missing required parameters: quantity" }, null, 2);
      response.outcome = "الطلب غير مكتمل أو يحتوي على بنية JSON غير صالحة.";
      return response;
    }

    const qty = bodyJson.quantity;
    const rawText = requestText.replace(/\s+/g, ''); // strip spaces to check patterns easily

    // 1. Check if quantity is normal (1)
    if (qty === 1) {
      response.responseBody = JSON.stringify({ status: "success", cart_total: 1500, message: "Item added to cart" }, null, 2);
      response.outcome = "تمت إضافة المنتج بنجاح بالسعر الطبيعي 1,500$.";
      response.observabilityLog = "[INFO] Cart Engine: Calculating total for User_ID:44\n[INFO] Cart Engine: Item added (Signal Interceptor, Qty: 1). New total: $1500.";
      return response;
    }

    // 2. Check if raw request text contains explicit minus sign
    const hasMinusSign = rawText.includes('"-15"') || rawText.includes(':-15') || rawText.includes(':-15.0') || rawText.includes('"-15.0"');
    
    if (qty < 0 && hasMinusSign) {
      response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "WAF Blocked: Invalid characters detected." }, null, 2);
      response.observabilityLog = "[WARN] WAF triggered on negative quantity payload '-15'.\n[WARN] Security Filter: Negative value validation check failed.";
      response.outcome = "تم حظرك بواسطة جدار الحماية (WAF) الذي يكتشف علامة الناقص (-) في حقل الأرقام.";
      response.timePenalty = 5;
      return response;
    }

    // 3. Float or Unicode bypass attempt
    const isUnicodeBypass = rawText.includes('\\u002D');
    const isFloatBypass = qty === -15.0 && !hasMinusSign; // bypassed minus check but still negative
    
    if (qty < 0 && (isUnicodeBypass || isFloatBypass)) {
      response.responseHeaders = "HTTP/2 500 Internal Server Error\nContent-Type: application/json";
      response.responseBody = JSON.stringify({ error: "Database Error: Cannot cast negative float to unsigned integer." }, null, 2);
      response.observabilityLog = "[ERROR] Database constraint violation: Cannot store negative value in Unsigned Int column 'quantity'.\n[CRITICAL] Server crash: Database transaction rollback executed.";
      response.outcome = "تجاوزت جدار الحماية (WAF) بنجاح، ولكن خادم قاعدة البيانات انهار بترميز 500 Internal Server Error لأن الحقل مبرمج كـ Unsigned INT ولا يقبل السوالب.";
      response.timePenalty = 2;
      return response;
    }

    // 4. Integer Overflow Attempt (Wraparound)
    const MAX_INT = 2147483647;
    if (qty > MAX_INT) {
      let interpretedQty = qty;
      if (qty > 2147483647 && qty <= 4294967295) {
        interpretedQty = qty - 4294967296; // wrap to signed negative
      }

      if (interpretedQty === -15) {
        response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
        response.responseBody = JSON.stringify({ error: "Cart validation failed: Cart total cannot be verified." }, null, 2);
        response.observabilityLog = "[INFO] Cart Engine: Calculating total for User_ID:44\n[CRITICAL] Integer Overflow bypass successful. Payment Gateway charged: $0.\n🎉 BINGO! Account Takeover complete.";
        response.outcome = "تجاوزت جدار الـ WAF بنجاح ووقع التفاف للمتغيرات (Integer Overflow) ليتحول العدد إلى -15 داخل الخادم. ولكن النظام كشف أن إجمالي السلة صفر أو شاذ، فرفض تفعيل الدفع بـ 400 Bad Request.";
        response.correct = true; // Advance step!
        response.evidence = {
          title: "Integer Overflow Cart Bypass",
          content: "POST /api/cart/add quantity: 4294967281 -> Bypasses WAF and overflows to -15"
        };
        return response;
      } else {
        response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
        response.responseBody = JSON.stringify({ error: "Cart validation failed: Cart total cannot be verified." }, null, 2);
        response.observabilityLog = `[CRITICAL] Integer Overflow detected. Interpreted quantity: ${interpretedQty}.\n[WARN] Cart calculation mismatch.`;
        response.outcome = "تم إحداث التفاف للمتغيرات، ولكن قيمة السلة غير صحيحة أو السيرفر رفض التحقق من الإجمالي.";
        return response;
      }
    }

    // Generic fallback
    response.responseHeaders = "HTTP/2 400 Bad Request\nContent-Type: application/json";
    response.responseBody = JSON.stringify({ error: "Invalid request parameters." }, null, 2);
    response.outcome = "الطلب البرمجي لم ينجح في تجاوز جدار الحماية أو التسبب في الالتفاف الحسابي الصحيح.";
    return response;
  },

  // --- PAYLOAD VIEWER ---
  setupPayloadWorkspace() {
    this.el.payload.classList.remove('hidden');
    Renderer.renderPayloadViewer(this.el.payloadContent, this.scenario.payloads);
    this.el.nextBtn.disabled = false;
  },

  // --- EVIDENCE LOCKER ---
  addEvidence(item) {
    if (!this.evidence.some(e => e.title === item.title)) {
      this.evidence.push(item);
      this.showToast(`📂 Evidence saved: "${item.title}"`, 'success');
    }
  },

  setupEvidenceWorkspace() {
    this.el.evidence.classList.remove('hidden');
    Renderer.renderEvidenceLocker(this.el.evidenceContainer, this.evidence);
    this.el.nextBtn.disabled = false;
  },

  // --- REPORT BUILDER & EXPERT REVIEW ---
  setupReportWorkspace() {
    this.el.report.classList.remove('hidden');
    
    // Clear inputs
    this.el.reportTitle.value = '';
    this.el.reportSeverity.value = '';
    this.el.reportType.value = '';
    this.el.reportDesc.value = '';
    this.el.reportSteps.value = '';
    this.el.reportImpact.value = '';

    // Register submit click
    this.el.submitReportBtn.onclick = () => {
      const title = this.el.reportTitle.value.trim();
      const severity = this.el.reportSeverity.value;
      const type = this.el.reportType.value;
      const desc = this.el.reportDesc.value.trim();
      const steps = this.el.reportSteps.value.trim();
      const impact = this.el.reportImpact.value.trim();

      if (!title || !severity || !type || !desc || !steps || !impact) {
        alert("Ensure all report fields are completed!");
        return;
      }

      // Accuracy score check
      const correctReport = this.scenario.realReport;
      let score = 70;
      if (severity === correctReport.severity) score += 10;
      if (type === correctReport.type) score += 10;
      if (title.toLowerCase().includes(correctReport.keywords[0])) score += 5;
      if (steps.toLowerCase().includes(correctReport.keywords[1])) score += 5;

      this.currentStepIndex++;
      this.loadStep(this.currentStepIndex);
      this.renderReviewWorkspace(title, severity, type, desc, steps, impact, score);
    };
  },

  renderReviewWorkspace(title, severity, type, desc, steps, impact, score) {
    this.el.review.classList.remove('hidden');
    
    const correctReport = this.scenario.realReport;

    this.el.userReportSummary.innerHTML = `
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Severity:</strong> <span class="difficulty-badge expert">${severity}</span></p>
      <p><strong>Type:</strong> ${type}</p>
      <p style="white-space: pre-line;"><strong>Description:</strong>\n${desc}</p>
      <p style="white-space: pre-line;"><strong>Steps:</strong>\n${steps}</p>
      <p style="white-space: pre-line;"><strong>Impact:</strong>\n${impact}</p>
    `;

    this.el.realReportSummary.innerHTML = `
      <p><strong>Title:</strong> ${correctReport.title}</p>
      <p><strong>Severity:</strong> <span class="difficulty-badge real">${correctReport.severity}</span></p>
      <p><strong>Type:</strong> ${correctReport.type}</p>
      <p style="white-space: pre-line;"><strong>Description:</strong>\n${correctReport.desc}</p>
      <p style="white-space: pre-line;"><strong>Steps:</strong>\n${correctReport.steps}</p>
      <p style="white-space: pre-line;"><strong>Impact:</strong>\n${correctReport.impact}</p>
    `;

    // Award XP/bounty
    const id = this.scenario.metadata.id;
    const isSolved = ProgressManager.state.solved.includes(id);

    let bounty = parseInt(this.scenario.metadata.reward.replace('$', '').replace(',', ''));
    let xp = this.scenario.steps[this.currentStepIndex - 1]?.xpReward || 200;

    // Apply Hint Penalty in Real Hunt Mode
    const isRealHunt = ProgressManager.state.realHuntMode;
    if (isRealHunt && this.hintsUnlockedCount > 0) {
      const penaltyAmount = this.hintsUnlockedCount * 500;
      bounty = Math.max(0, bounty - penaltyAmount);
    }

    bounty = Math.round(bounty * (score / 100));
    xp = Math.round(xp * (score / 100));

    this.el.triagePanel.innerHTML = `
      <h3 style="color:var(--accent-cyan); margin-bottom:12px;"><i class="bx bxs-check-shield"></i> Triager Triage Verdict</h3>
      <p style="font-size:0.9rem; margin-bottom:15px; color:var(--text-secondary);">
        Severity: <strong>${correctReport.severity}</strong> | Score: <strong class="text-green">${score}%</strong>.
      </p>
      <blockquote style="font-style: italic; color:var(--text-muted); margin-bottom: 20px;">
        "${correctReport.feedback}"
      </blockquote>
      <div style="display:flex; gap:15px;">
        <span class="stat-badge xp-badge"><i class="bx bxs-zap"></i> +${xp} XP</span>
        <span class="stat-badge bounty-badge"><i class="bx bx-dollar-circle"></i> +$${bounty.toLocaleString()} Bounty</span>
      </div>
    `;

    const isAlreadySolved = ProgressManager.state.solved.includes(id);
    if (!isAlreadySolved) {
      ProgressManager.addXP(xp);
      ProgressManager.addBounty(bounty);
      ProgressManager.solveScenario(id);
    }

    this.el.nextBtn.disabled = false;
  },

  // --- QUIZ ENGINE ---
  setupQuizWorkspace(step) {
    this.el.quiz.classList.remove('hidden');
    this.el.quizNextBtn.classList.add('hidden');
    this.el.quizSubmitBtn.classList.remove('hidden');
    this.el.quizSubmitBtn.disabled = true;
    this.selectedQuizOption = null;

    const quiz = step.quizData[this.quizCurrentQuestion];
    this.el.quizCurrentNum.innerText = this.quizCurrentQuestion + 1;
    this.el.quizTotalNum.innerText = step.quizData.length;
    this.el.quizQuestionText.innerText = quiz.question;

    this.el.quizOptionsList.innerHTML = '';
    quiz.options.forEach((opt, idx) => {
      const div = document.createElement('div');
      div.className = 'quiz-option';
      div.setAttribute('dir', 'auto');
      div.innerHTML = `<span class="choice-marker">${String.fromCharCode(65 + idx)}</span> <span dir="auto">${opt}</span>`;
      div.addEventListener('click', () => {
        Array.from(this.el.quizOptionsList.children).forEach(el => el.classList.remove('selected'));
        div.classList.add('selected');
        this.selectedQuizOption = idx;
        this.el.quizSubmitBtn.disabled = false;
      });
      this.el.quizOptionsList.appendChild(div);
    });

    this.el.quizSubmitBtn.onclick = () => {
      const optionCards = Array.from(this.el.quizOptionsList.children);
      optionCards[this.selectedQuizOption].classList.remove('selected');

      if (this.selectedQuizOption === quiz.answer) {
        optionCards[this.selectedQuizOption].classList.add('correct');
        ProgressManager.addXP(10);
        alert("Correct! +10 XP");
      } else {
        optionCards[this.selectedQuizOption].classList.add('wrong');
        optionCards[quiz.answer].classList.add('correct');
        alert(`Wrong response. The correct answer was: ${String.fromCharCode(65 + quiz.answer)}.`);
        ProgressManager.logError();
      }

      this.el.quizSubmitBtn.classList.add('hidden');
      this.el.quizNextBtn.classList.remove('hidden');
    };

    this.el.quizNextBtn.onclick = () => {
      this.quizCurrentQuestion++;
      if (this.quizCurrentQuestion < step.quizData.length) {
        this.setupQuizWorkspace(step);
      } else {
        alert("Section Quiz Complete!");
        this.el.quiz.classList.add('hidden');
        this.el.nextBtn.disabled = false;
        if (this.currentStepIndex + 1 < this.scenario.steps.length) {
          this.loadStep(this.currentStepIndex + 1);
        }
      }
    };
  },

  // --- LAB COMPONENT ---
  setupLabWorkspace(step) {
    this.el.lab.classList.remove('hidden');
    this.el.labInstructions.innerText = step.instructions || "Analyze the challenge and capture the flag.";
    this.el.labTargetUrl.innerText = step.targetUrl || "https://app-staging.target.com";
    this.el.labFlagInput.value = '';
    this.el.submitFlagBtn.disabled = false;

    // Add a simulated exploit button if not already present
    let exploitBtn = document.getElementById('lab-exploit-simulate-btn');
    if (!exploitBtn) {
      exploitBtn = document.createElement('button');
      exploitBtn.id = 'lab-exploit-simulate-btn';
      exploitBtn.className = 'hunt-btn';
      exploitBtn.style.marginTop = '15px';
      exploitBtn.style.marginBottom = '15px';
      exploitBtn.style.width = '100%';
      exploitBtn.style.background = 'rgba(6, 182, 212, 0.08)';
      exploitBtn.style.borderColor = 'var(--accent-cyan)';
      exploitBtn.style.color = 'var(--accent-cyan)';
      exploitBtn.innerHTML = '<i class="bx bx-play-circle"></i> Run Exploit (Simulate Concurrency Request)';
      
      const submissionDiv = this.el.lab.querySelector('.lab-flag-submission');
      submissionDiv.parentNode.insertBefore(exploitBtn, submissionDiv);
    }
    
    exploitBtn.onclick = () => {
      this.switchConsoleTab('terminal');
      this.el.termBody.innerHTML = '';
      this.executeTerminalCommand({
        name: "python3 exploit.py --target " + step.targetUrl,
        correct: true,
        output: [
          { text: "[*] Initializing race condition thread pool (10 concurrent workers)...", type: "info" },
          { text: "[*] Target Endpoint: POST /api/cart/checkout", type: "info" },
          { text: "[*] Dispatching parallel payloads with timing delta < 1ms...", type: "info" },
          { text: "[+] Thread-1 applied coupon WELCOME_1500 (balance check: $10)", type: "info" },
          { text: "[+] Thread-2 applied coupon WELCOME_1500 concurrently! (bypass lock status)", type: "success" },
          { text: "[+] Thread-3 initiated checkout (order total reduced: $0)", type: "success" },
          { text: "[+] Payment execution bypass verified. Transaction ID: TX_8829402", type: "success" },
          { text: `[+] Success: Flag retrieved: ${step.correctFlag}`, type: "success" }
        ]
      });
    };

    this.el.submitFlagBtn.onclick = () => {
      const flag = this.el.labFlagInput.value.trim();
      if (!flag) return;

      if (flag === step.correctFlag) {
        this.el.submitFlagBtn.disabled = true;
        alert(`🚩 Valid Flag Submitted! +${step.xpReward || 100} XP`);
        ProgressManager.addXP(step.xpReward || 100);
        this.el.nextBtn.disabled = false;
        
        if (this.currentStepIndex + 1 < this.scenario.steps.length) {
          this.loadStep(this.currentStepIndex + 1);
        } else {
          step.completedDirect = true;
          this.loadStep(this.currentStepIndex);
        }
      } else {
        alert("❌ Invalid Flag identifier. Re-check the Burp responses.");
        ProgressManager.logError();
      }
    };
  },

  // --- AI ADVISOR CHATBOT MOCK ---
  handleAIChatSubmit() {
    // Retained for backwards compatibility
  }
};

// Aliasing SimulationManager to ScenarioEngine for backward compatibility
window.SimulationManager = window.ScenarioEngine;

