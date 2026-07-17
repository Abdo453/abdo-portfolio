// ==========================================
// SCENARIO BUILDER ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  let scenario = {
    metadata: {
      id: "scenario-new",
      title: "",
      level: "Beginner",
      category: "",
      company: "",
      reward: "",
      time: ""
    },
    steps: []
  };

  let currentStepIndex = -1; // -1 means Metadata

  // --- DOM ELEMENTS ---
  const stepsList = document.getElementById("steps-list");
  const btnAddStep = document.getElementById("btn-add-step");
  const btnExport = document.getElementById("btn-export");
  const jsonPreview = document.getElementById("json-preview");
  
  const panelMeta = document.getElementById("panel-meta");
  const panelStep = document.getElementById("panel-step");

  // Meta Fields
  const metaId = document.getElementById("meta-id");
  const metaTitle = document.getElementById("meta-title");
  const metaLevel = document.getElementById("meta-level");
  const metaCategory = document.getElementById("meta-category");
  const metaCompany = document.getElementById("meta-company");
  const metaReward = document.getElementById("meta-reward");
  const metaTime = document.getElementById("meta-time");

  // Step Fields
  const stepName = document.getElementById("step-name");
  const stepWorkspace = document.getElementById("step-workspace");
  const stepXp = document.getElementById("step-xp");
  const stepTime = document.getElementById("step-time");
  const stepDesc = document.getElementById("step-desc");
  const stepHint = document.getElementById("step-hint");
  const btnDeleteStep = document.getElementById("btn-delete-step");
  const extraFields = document.getElementById("extra-fields");

  // --- INITIALIZATION ---
  function init() {
    bindMetaEvents();
    bindStepEvents();
    renderStepsList();
    updatePreview();
  }

  function updatePreview() {
    jsonPreview.textContent = JSON.stringify(scenario, null, 2);
  }

  // --- METADATA LOGIC ---
  function bindMetaEvents() {
    const updateMeta = () => {
      scenario.metadata = {
        id: metaId.value,
        title: metaTitle.value,
        level: metaLevel.value,
        category: metaCategory.value,
        company: metaCompany.value,
        reward: metaReward.value,
        time: metaTime.value
      };
      updatePreview();
    };

    [metaId, metaTitle, metaLevel, metaCategory, metaCompany, metaReward, metaTime].forEach(el => {
      el.addEventListener("input", updateMeta);
      el.addEventListener("change", updateMeta);
    });
  }

  // --- STEPS LIST LOGIC ---
  function renderStepsList() {
    // Keep the metadata item, remove others
    const items = stepsList.querySelectorAll(".step-item:not(.metadata-item)");
    items.forEach(item => item.remove());

    scenario.steps.forEach((step, index) => {
      const li = document.createElement("li");
      li.className = `step-item ${currentStepIndex === index ? 'active' : ''}`;
      li.innerHTML = `<span><i class="bx bx-run"></i> ${step.name || 'Unnamed Step'}</span> <span style="font-size:0.7rem; opacity:0.5;">${step.workspace}</span>`;
      li.addEventListener("click", () => selectStep(index));
      stepsList.appendChild(li);
    });

    const metaItem = stepsList.querySelector(".metadata-item");
    if (currentStepIndex === -1) {
      metaItem.classList.add("active");
    } else {
      metaItem.classList.remove("active");
    }
    
    metaItem.onclick = () => selectStep(-1);
  }

  btnAddStep.addEventListener("click", () => {
    scenario.steps.push({
      name: "New Step",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: "",
      aiAdvisor: { hint: "" }
    });
    selectStep(scenario.steps.length - 1);
  });

  function selectStep(index) {
    currentStepIndex = index;
    renderStepsList();

    if (index === -1) {
      panelMeta.classList.add("active");
      panelStep.classList.remove("active");
    } else {
      panelMeta.classList.remove("active");
      panelStep.classList.add("active");
      loadStepData(index);
    }
  }

  // --- STEP EDITOR LOGIC ---
  function loadStepData(index) {
    const step = scenario.steps[index];
    stepName.value = step.name || "";
    stepWorkspace.value = step.workspace || "markdown";
    stepXp.value = step.xpReward || 100;
    stepTime.value = step.time || "";
    stepDesc.value = step.description || step.instructions || "";
    stepHint.value = (step.aiAdvisor && step.aiAdvisor.hint) ? step.aiAdvisor.hint : "";
    
    renderExtraFields(step);
  }

  function bindStepEvents() {
    const updateStep = () => {
      if (currentStepIndex === -1) return;
      
      const step = scenario.steps[currentStepIndex];
      step.name = stepName.value;
      step.workspace = stepWorkspace.value;
      step.xpReward = parseInt(stepXp.value) || 0;
      step.time = stepTime.value;
      
      if (step.workspace === "lab") {
        step.instructions = stepDesc.value;
        delete step.description;
      } else {
        step.description = stepDesc.value;
        delete step.instructions;
      }

      if (!step.aiAdvisor) step.aiAdvisor = {};
      step.aiAdvisor.hint = stepHint.value;

      renderStepsList(); // Update sidebar name
      renderExtraFields(step); // Dynamically show inputs based on workspace
      updatePreview();
    };

    [stepName, stepWorkspace, stepXp, stepTime, stepDesc, stepHint].forEach(el => {
      el.addEventListener("input", updateStep);
      el.addEventListener("change", updateStep);
    });

    btnDeleteStep.addEventListener("click", () => {
      if (currentStepIndex !== -1 && confirm("Are you sure you want to delete this step?")) {
        scenario.steps.splice(currentStepIndex, 1);
        selectStep(-1);
      }
    });
  }

  function renderExtraFields(step) {
    extraFields.innerHTML = "";
    
    if (step.workspace === "burp") {
      // Add Mock HTTP Request/Response fields
      if (step.burpRequest === undefined) step.burpRequest = "GET / HTTP/1.1\\nHost: example.com";
      if (step.burpResponse === undefined) step.burpResponse = "HTTP/1.1 200 OK\\n\\nHello";

      extraFields.innerHTML = `
        <h3 style="color:var(--text-secondary); margin-top:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Burp Suite Configuration</h3>
        <div class="grid-2">
          <div class="form-group">
            <label>Mock Request</label>
            <textarea id="burp-req" style="min-height:150px; font-size:0.75rem;">${step.burpRequest.replace(/\\n/g, '\n')}</textarea>
          </div>
          <div class="form-group">
            <label>Mock Response</label>
            <textarea id="burp-res" style="min-height:150px; font-size:0.75rem;">${step.burpResponse.replace(/\\n/g, '\n')}</textarea>
          </div>
        </div>
      `;

      document.getElementById("burp-req").addEventListener("input", (e) => {
        step.burpRequest = e.target.value.replace(/\n/g, '\\n');
        updatePreview();
      });
      document.getElementById("burp-res").addEventListener("input", (e) => {
        step.burpResponse = e.target.value.replace(/\n/g, '\\n');
        updatePreview();
      });
    }
    else if (step.workspace === "lab" || step.workspace === "browser") {
      if (step.targetUrl === undefined) step.targetUrl = "https://target.com";
      if (step.correctFlag === undefined) step.correctFlag = "FLAG{example}";

      extraFields.innerHTML = `
        <h3 style="color:var(--text-secondary); margin-top:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">Lab / Browser Configuration</h3>
        <div class="grid-2">
          <div class="form-group">
            <label>Target URL</label>
            <input type="text" id="lab-url" value="${step.targetUrl}">
          </div>
          <div class="form-group">
            <label>Correct Flag</label>
            <input type="text" id="lab-flag" value="${step.correctFlag}">
          </div>
        </div>
      `;
      document.getElementById("lab-url").addEventListener("input", (e) => { step.targetUrl = e.target.value; updatePreview(); });
      document.getElementById("lab-flag").addEventListener("input", (e) => { step.correctFlag = e.target.value; updatePreview(); });
    }
  }

  // --- EXPORT LOGIC ---
  btnExport.addEventListener("click", () => {
    // Generate JS Wrapper
    const jsonStr = JSON.stringify(scenario, null, 2);
    const jsContent = `// ==========================================================\n// ${scenario.metadata.title.toUpperCase()}\n// ==========================================================\n\nwindow.${scenario.metadata.id.replace(/-/g, '_')} = {\n  "metadata": ${JSON.stringify(scenario.metadata, null, 2).replace(/\n/g, '\n  ')},\n  "steps": ${JSON.stringify(scenario.steps, null, 2).replace(/\n/g, '\n  ')}\n};\n`;
    
    const blob = new Blob([jsContent], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scenario.metadata.id.replace(/-/g, '_')}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  init();
});
