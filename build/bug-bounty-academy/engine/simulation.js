// ==========================================
// V2 INTERACTIVE SIMULATION ENGINE & AI MOCK
// ==========================================

window.SimulationManager = {
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
    
    stepTitle: document.getElementById('step-title'),
    stepTimeSpent: document.getElementById('step-time-spent'),
    stepXPPotential: document.getElementById('step-xp-potential'),
    markdownBody: document.getElementById('step-content-markdown'),
    choicesPanel: document.getElementById('step-choices-container'),
    choicesGrid: document.getElementById('step-choices'),
    prevBtn: document.getElementById('prev-step-btn'),
    nextBtn: document.getElementById('next-step-btn'),
    
    // Terminal
    terminal: document.getElementById('workspace-terminal'),
    termBody: document.getElementById('term-body'),
    termControls: document.getElementById('term-control-buttons'),
    
    // Burp
    burp: document.getElementById('workspace-burp'),
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
    aiDrawer: document.getElementById('ai-advisor-drawer'),
    aiToggleBtn: document.getElementById('ai-advisor-toggle-btn'),
    aiCloseBtn: document.getElementById('close-ai-drawer-btn'),
    aiChatHistory: document.getElementById('ai-chat-history'),
    aiChatInput: document.getElementById('ai-chat-input'),
    aiSendBtn: document.getElementById('send-ai-chat-btn')
  },

  init(scId, data) {
    this.scenario = data;
    this.currentStepIndex = 0;
    this.timeSpent = 0;
    this.evidence = [];
    this.quizCurrentQuestion = 0;
    
    // Save last active scenario
    ProgressManager.setLastActive(scId);

    // Setup headers
    this.el.title.innerText = `${scId.toUpperCase()}: ${data.metadata.title}`;
    this.el.diff.className = `difficulty-badge ${data.metadata.level.toLowerCase().replace(' ', '')}`;
    this.el.diff.innerText = data.metadata.level;
    this.el.cat.innerText = data.metadata.category;
    this.el.bounty.innerText = data.metadata.reward;
    this.el.time.innerText = data.metadata.time;
    this.el.company.innerText = data.metadata.company;

    // Start timer clock
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeSpent++;
      this.el.stepTimeSpent.innerText = this.timeSpent;
    }, 60000);
    this.el.stepTimeSpent.innerText = "0";

    // AI Chat togglers
    this.el.aiToggleBtn.addEventListener('click', () => this.toggleAIDrawer(true));
    this.el.aiCloseBtn.addEventListener('click', () => this.toggleAIDrawer(false));
    this.el.aiSendBtn.addEventListener('click', () => this.handleAIChatSubmit());
    this.el.aiChatInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') this.handleAIChatSubmit();
    });

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
        alert("🎉 Congratulations! You have completed the investigation and claimed the bounty!");
        window.location.href = '../index.html';
      } else {
        this.loadStep(this.currentStepIndex + 1);
      }
    });

    this.loadStep(0);
  },

  toggleAIDrawer(open) {
    this.el.aiDrawer.style.transform = open ? 'translateX(0)' : 'translateX(320px)';
  },

  loadStep(idx) {
    this.currentStepIndex = idx;
    const step = this.scenario.steps[idx];

    // Reset UI
    this.hideAllWorkspaces();
    this.el.stepTitle.innerText = step.name;
    this.el.stepXPPotential.innerText = step.xpReward || 50;

    // Render left timeline steps
    const isSolved = ProgressManager.state.solved.includes(this.scenario.metadata.id);
    Renderer.renderTimelineSteps(this.el.timeline, this.scenario.steps, idx, isSolved);

    // Markdown description parsing
    if (step.description) {
      this.el.markdownBody.classList.remove('hidden');
      this.el.markdownBody.innerHTML = MarkdownParser.parse(step.description);
    }

    // Dynamic mindset box
    if (step.thoughts) {
      // Replaced thoughts with the new Decision Log component V2!
    }

    // Dynamic decision log V2
    if (this.scenario.decisionLog && step.name === "DNS Verification") {
      this.el.decisionLog.classList.remove('hidden');
      Renderer.renderDecisionLog(this.el.decisionLogContent, this.scenario.decisionLog);
    }

    // Dynamic mistakes box V2
    if (this.scenario.mistakes && step.name === "Passive Recon") {
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
        btn.innerHTML = `
          <span class="choice-marker">${String.fromCharCode(65 + i)}</span>
          <span>${choice.text}</span>
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
    
    alert(`${choice.outcome}\n\nXP adjustment: ${choice.xp >= 0 ? '+' : ''}${choice.xp}`);
    ProgressManager.addXP(choice.xp);

    if (choice.correct) {
      this.el.nextBtn.disabled = false;
      if (this.currentStepIndex + 1 < this.scenario.steps.length) {
        this.loadStep(this.currentStepIndex + 1);
      }
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
      alert(`📂 Evidence added to locker: "${item.title}"`);
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

    if (!isCompleted) {
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
      div.innerHTML = `<span class="choice-marker">${String.fromCharCode(65 + idx)}</span> <span>${opt}</span>`;
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
      exploitBtn.style.marginTop = '10px';
      exploitBtn.style.marginBottom = '20px';
      exploitBtn.style.width = '100%';
      exploitBtn.style.background = 'rgba(6, 182, 212, 0.1)';
      exploitBtn.style.borderColor = 'var(--accent-cyan)';
      exploitBtn.style.color = 'var(--accent-cyan)';
      exploitBtn.innerHTML = '<i class="bx bx-play-circle"></i> Run Exploit (Simulate Request)';
      
      const submissionDiv = this.el.lab.querySelector('.lab-flag-submission');
      submissionDiv.parentNode.insertBefore(exploitBtn, submissionDiv);
    }
    
    exploitBtn.onclick = () => {
      alert(`[Simulated Browser Output for: ${step.targetUrl}]\n\nExploit Executed Successfully!\n\nCaptured Flag: ${step.correctFlag}`);
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
      }
    };
  },

  // --- AI ADVISOR CHATBOT MOCK ---
  handleAIChatSubmit() {
    const input = this.el.aiChatInput.value.trim();
    if (!input) return;

    this.el.aiChatInput.value = '';
    this.el.aiChatHistory.innerHTML += `
      <div class="chat-bubble user-bubble" style="background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); padding: 10px; border-radius: 8px; color: var(--text-main); align-self: flex-end; width: fit-content; max-width: 90%;">
        ${input}
      </div>
    `;

    // Process Response
    setTimeout(() => {
      const step = this.scenario.steps[this.currentStepIndex];
      let aiResponse = "I can only advise you on findings related to the active investigation step. Ask for a 'hint' if you are stuck.";

      const query = input.toLowerCase();
      if (query.includes('hint') || query.includes('help') || query.includes('خطوة')) {
        aiResponse = step.aiAdvisor?.hint || "For this step, look closely at the choices grid and evaluate the server response headers in Burp Suite.";
      } else if (query.includes('payload') || query.includes('exploit') || query.includes('استغلال')) {
        aiResponse = step.aiAdvisor?.payloadExplanation || "A valid payload should tamper parameters in the GET request or inject CRLF characters to bypass header filters.";
      } else if (query.includes('fail') || query.includes('wrong') || query.includes('خطأ')) {
        aiResponse = step.aiAdvisor?.failureExplanation || "Your choices might fail if you trigger aggressive fuzzing tools (like sqlmap or nuclei) directly, alerting WAF firewalls.";
      }

      this.el.aiChatHistory.innerHTML += `
        <div class="chat-bubble ai-bubble" style="background: rgba(6,182,212,0.05); border: 1px solid rgba(6,182,212,0.15); padding: 10px; border-radius: 8px; color: var(--accent-cyan);">
          <strong>AI Advisor:</strong> ${aiResponse}
        </div>
      `;
      this.el.aiChatHistory.scrollTop = this.el.aiChatHistory.scrollHeight;
    }, 600);
  }
};
