// ==========================================
// V3 INTERACTIVE AUTOPLAY WALKTHROUGH COACH
// ==========================================

window.AutoplayManager = {
  isPlaying: false,
  timeoutIds: [],
  
  start() {
    if (this.isPlaying) {
      this.stop();
      return;
    }
    this.isPlaying = true;
    this.timeoutIds = [];
    
    const btn = document.getElementById('autoplay-walkthrough-btn');
    if (btn) {
      btn.innerHTML = `<i class="bx bx-stop-circle" style="font-size: 0.95rem;"></i> Stop Autoplay`;
      btn.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      btn.style.color = '#ef4444';
      btn.style.background = 'rgba(239, 68, 68, 0.08)';
    }
    
    if (window.StateManager) {
      window.StateManager.showToast("🎥 تم بدء العرض التلقائي للسيناريو خطوة بخطوة!", "info", 4000);
    }
    
    // Load Step 0 first
    window.ScenarioEngine.loadStep(0);
    this.runStep(0);
  },
  
  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
    
    const btn = document.getElementById('autoplay-walkthrough-btn');
    if (btn) {
      btn.innerHTML = `<i class="bx bx-play-circle" style="font-size: 0.95rem;"></i> Autoplay Walkthrough`;
      btn.style.borderColor = 'rgba(168, 85, 247, 0.25)';
      btn.style.color = '#c084fc';
      btn.style.background = 'rgba(168, 85, 247, 0.08)';
    }
    
    if (window.StateManager) {
      window.StateManager.showToast("🛑 تم إيقاف العرض التلقائي.", "warning", 3000);
    }
  },
  
  delay(fn, ms) {
    if (!this.isPlaying) return;
    const id = setTimeout(() => {
      if (this.isPlaying) fn();
    }, ms);
    this.timeoutIds.push(id);
  },
  
  runStep(idx) {
    if (!this.isPlaying) return;
    const step = window.ScenarioEngine.scenario.steps[idx];
    console.log(`[Autoplay] Running step ${idx}: ${step.name}`);
    
    // 1. Give the student time to read the text
    this.delay(() => {
      // 2. Perform step workspace actions
      if (step.workspace === 'recon') {
        // Run WAYBACKURLS command (correct command)
        const waybackBtn = Array.from(document.querySelectorAll('#term-control-buttons button')).find(b => b.innerText.includes('waybackurls'));
        if (waybackBtn) {
          if (window.StateManager) window.StateManager.showToast("⚙️ تشغيل أداة waybackurls لجمع المسارات القديمة...", "info", 2000);
          waybackBtn.click();
        }
        
        // Wait for command output typing (approx 3 seconds)
        this.delay(() => {
          this.solveStepChoices(step, idx);
        }, 3500);
        
      } else if (step.workspace === 'burp') {
        // Tamper request
        const verifyBtn = document.querySelector('#burp-actions-container button');
        if (verifyBtn) {
          if (window.StateManager) window.StateManager.showToast("⚙️ تعديل معرف مساحة العمل في Burp Suite إلى 43...", "info", 2000);
          
          // Show editing requests dynamically
          const reqView = document.getElementById('burp-request-view');
          if (reqView) {
            reqView.innerText = reqView.innerText.replace('/workspaces/42/', '/workspaces/43/');
          }
          
          this.delay(() => {
            verifyBtn.click();
            
            // Advance after Burp response resolves
            this.delay(() => {
              const nextBtn = document.getElementById('next-step-btn');
              if (nextBtn && !nextBtn.disabled) nextBtn.click();
              this.delay(() => this.runStep(idx + 1), 1000);
            }, 2500);
          }, 1500);
        }
        
      } else if (step.workspace === 'lab') {
        // Exploitation & flag submission
        if (window.StateManager) window.StateManager.showToast("⚙️ استخراج العلم من مسار التحميل المالي doc_id=5001...", "info", 2000);
        
        const flagInput = document.getElementById('lab-flag-input');
        const submitFlagBtn = document.getElementById('submit-flag-btn');
        if (flagInput && submitFlagBtn) {
          // Simulate typing flag
          let flagText = "FLAG{api_v1_idor_workspace_takeover}";
          flagInput.value = flagText;
          
          this.delay(() => {
            submitFlagBtn.click();
            
            // Advance after submit
            this.delay(() => {
              const nextBtn = document.getElementById('next-step-btn');
              if (nextBtn && !nextBtn.disabled) nextBtn.click();
              this.delay(() => this.runStep(idx + 1), 1000);
            }, 2000);
          }, 1500);
        }
        
      } else if (step.workspace === 'report') {
        // Write security report
        if (window.StateManager) window.StateManager.showToast("⚙️ كتابة التقرير الأمني وصياغة الأثر للثغرة...", "info", 2000);
        
        const fields = {
          'report-title': "Broken access control in workspaces endpoint leaks documents",
          'report-severity': "Critical",
          'report-type': "IDOR",
          'report-desc': "The legacy API v1 endpoint at /api/v1/workspaces/{id}/members and /documents does not perform relationship checks between the authenticated user and the requested workspace. Any user can access data of other workspaces.",
          'report-steps': "1. Login and get valid authorization token.\n2. Send request to /api/v1/workspaces/43/members and notice it returns workspace data.\n3. Access /api/v1/workspaces/43/documents/5001/download to download sensitive files.",
          'report-impact': "Unrestricted access to all customer workspaces and private financial files."
        };
        
        // Populate fields
        for (const [id, val] of Object.entries(fields)) {
          const el = document.getElementById(id);
          if (el) el.value = val;
        }
        
        this.delay(() => {
          const submitBtn = document.getElementById('submit-report-btn');
          if (submitBtn) submitBtn.click();
          
          // Advance after report triage review
          this.delay(() => {
            const nextBtn = document.getElementById('next-step-btn');
            if (nextBtn && !nextBtn.disabled) nextBtn.click();
            this.delay(() => this.runStep(idx + 1), 1000);
          }, 3000);
        }, 2000);
        
      } else if (step.workspace === 'review') {
        // Triage review verdict step (just click Next Step)
        this.delay(() => {
          const nextBtn = document.getElementById('next-step-btn');
          if (nextBtn && !nextBtn.disabled) nextBtn.click();
          this.delay(() => this.runStep(idx + 1), 1000);
        }, 3500);
        
      } else if (step.workspace === 'quiz') {
        // Prevention & remediation quiz
        if (window.StateManager) window.StateManager.showToast("⚙️ الإجابة على اختبار التدابير الوقائية البرمجية للثغرة...", "info", 2000);
        
        this.solveQuizQuestion(0, () => {
          this.delay(() => {
            this.solveQuizQuestion(1, () => {
              // Quiz completed, complete scenario
              this.delay(() => {
                const nextBtn = document.getElementById('next-step-btn');
                if (nextBtn && !nextBtn.disabled) {
                  nextBtn.click();
                  
                  // Finish and exit autoplay
                  this.delay(() => {
                    this.stop();
                    if (window.StateManager) window.StateManager.showToast("🎉 تم إكمال العرض التلقائي للسيناريو بنجاح!", "success", 4000);
                  }, 2000);
                }
              }, 2000);
            });
          }, 3000);
        });
        
      } else {
        // Normal text step (Step 0 or Step 2) with choice options
        this.solveStepChoices(step, idx);
      }
    }, 4500); // 4.5 seconds read delay
  },
  
  solveStepChoices(step, idx) {
    if (step.choices && step.choices.length > 0) {
      // Find correct choice index
      const correctChoiceIdx = step.choices.findIndex(c => c.correct);
      const choiceButtons = document.querySelectorAll('#step-choices .choice-btn');
      
      if (choiceButtons && choiceButtons[correctChoiceIdx]) {
        if (window.StateManager) window.StateManager.showToast(`⚙️ اختيار الإجابة الصحيحة (${String.fromCharCode(65 + correctChoiceIdx)})...`, "info", 2000);
        
        this.delay(() => {
          choiceButtons[correctChoiceIdx].click();
          
          // Wait for correct feedback and load next step
          this.delay(() => {
            const nextBtn = document.getElementById('next-step-btn');
            if (nextBtn && !nextBtn.disabled) nextBtn.click();
            
            this.delay(() => {
              this.runStep(idx + 1);
            }, 1000);
          }, 2500);
        }, 1500);
      }
    } else {
      // No choices, just click next
      const nextBtn = document.getElementById('next-step-btn');
      if (nextBtn && !nextBtn.disabled) nextBtn.click();
      this.delay(() => this.runStep(idx + 1), 1000);
    }
  },
  
  solveQuizQuestion(qIdx, onDone) {
    const q = window.ScenarioEngine.scenario.steps[window.ScenarioEngine.currentStepIndex].quizData[qIdx];
    const correctAnsIdx = q.answer;
    
    const optionCards = document.querySelectorAll('#quiz-options-list .quiz-option-card');
    const submitBtn = document.getElementById('quiz-submit-btn');
    const nextBtn = document.getElementById('quiz-next-btn');
    
    if (optionCards && optionCards[correctAnsIdx] && submitBtn) {
      this.delay(() => {
        optionCards[correctAnsIdx].click();
        
        this.delay(() => {
          submitBtn.click();
          
          this.delay(() => {
            if (nextBtn && !nextBtn.classList.contains('hidden')) {
              nextBtn.click();
              onDone();
            } else {
              // Final quiz submit completes it
              onDone();
            }
          }, 2500);
        }, 1500);
      }, 1500);
    }
  }
};

// Bind event listener to the button once DOM is ready or immediately if loaded
function initAutoplayBinding() {
  const btn = document.getElementById('autoplay-walkthrough-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.AutoplayManager.start();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoplayBinding);
} else {
  initAutoplayBinding();
}

