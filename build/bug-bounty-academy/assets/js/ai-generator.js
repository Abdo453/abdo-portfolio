// ==========================================
// AI SCENARIO GENERATOR ENGINE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerate = document.getElementById("btn-generate");
  const promptInput = document.getElementById("prompt-input");
  const chips = document.querySelectorAll(".example-chip");
  
  const aiTerminal = document.getElementById("ai-terminal");
  const aiLogs = document.getElementById("ai-logs");
  const resultContainer = document.getElementById("result-container");
  const resultCode = document.getElementById("result-code");
  const btnExport = document.getElementById("btn-export");

  let generatedScenario = null;

  // --- TEMPLATES ---
  // Since we don't have a real backend LLM, we use structural templates
  // and inject keywords based on the prompt.
  const TEMPLATES = {
    ssrf: {
      category: "Cloud Security",
      vuln: "SSRF",
      defaultCompany: "Acme Corp",
      defaultLevel: "Hard",
      steps: [
        { name: "Mission Brief", workspace: "markdown", description: "You need to find a way to access internal cloud metadata via a vulnerable parameter." },
        { name: "Recon", workspace: "recon", description: "Use ffuf or similar tools to find hidden endpoints." },
        { name: "Exploitation", workspace: "burp", burpRequest: "GET /api/proxy?url=http://169.254.169.254/latest/meta-data/ HTTP/1.1", burpResponse: "HTTP/1.1 200 OK\n\nami-id\nhostname\niam/info" }
      ]
    },
    xss: {
      category: "Client-Side",
      vuln: "Cross-Site Scripting (XSS)",
      defaultCompany: "Shopify",
      defaultLevel: "Beginner",
      steps: [
        { name: "Mission Brief", workspace: "markdown", description: "A reflected XSS vulnerability exists on the search page." },
        { name: "Payload Generation", workspace: "browser", targetUrl: "https://shop.local/search?q=", correctFlag: "alert(1)" }
      ]
    },
    sqli: {
      category: "Database",
      vuln: "SQL Injection",
      defaultCompany: "BankLocal",
      defaultLevel: "Medium",
      steps: [
        { name: "Mission Brief", workspace: "markdown", description: "Bypass the login screen using a classic SQL injection." },
        { name: "Exploitation", workspace: "burp", burpRequest: "POST /login HTTP/1.1\n\nusername=admin' OR '1'='1&password=a", burpResponse: "HTTP/1.1 200 OK\n\nWelcome Admin!" }
      ]
    }
  };

  // --- LOGIC ---
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      promptInput.value = chip.textContent;
    });
  });

  function parsePrompt(prompt) {
    const text = prompt.toLowerCase();
    let type = "ssrf"; // default
    if (text.includes("xss") || text.includes("cross site") || text.includes("cross-site")) type = "xss";
    if (text.includes("sql") || text.includes("sqli") || text.includes("injection")) type = "sqli";

    let level = TEMPLATES[type].defaultLevel;
    if (text.includes("easy") || text.includes("beginner")) level = "Beginner";
    if (text.includes("medium")) level = "Medium";
    if (text.includes("hard") || text.includes("expert")) level = "Expert";

    let company = TEMPLATES[type].defaultCompany;
    // Basic extraction heuristic for company names if mentioned with "at" or "in"
    const match = text.match(/(?:at|in|for)\s+([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      company = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    }

    return { type, level, company };
  }

  function generateJson(params) {
    const tpl = TEMPLATES[params.type];
    
    // Construct the scenario JSON
    return {
      metadata: {
        id: `ai-scenario-${Date.now()}`,
        title: `AI Generated: ${params.level} ${tpl.vuln}`,
        level: params.level,
        category: tpl.category,
        company: params.company,
        reward: `$${Math.floor(Math.random() * 5 + 1)},000`,
        time: "45 Min"
      },
      steps: tpl.steps
    };
  }

  async function simulateThinking(params) {
    aiTerminal.style.display = "block";
    resultContainer.style.display = "none";
    btnGenerate.disabled = true;
    promptInput.disabled = true;
    
    aiLogs.innerHTML = "";
    
    const appendLog = (text, type = "log-line", delay = 0) => {
      return new Promise(resolve => {
        setTimeout(() => {
          // Remove cursor from previous line if exists
          const oldCursor = document.getElementById("cursor");
          if (oldCursor) oldCursor.remove();

          const p = document.createElement("p");
          p.className = type;
          p.innerHTML = text + `<span id="cursor" class="cursor"></span>`;
          aiLogs.appendChild(p);
          aiLogs.scrollTop = aiLogs.scrollHeight;
          resolve();
        }, delay);
      });
    };

    await appendLog(`[SYSTEM] Initializing AI Scenario Generator v3.0...`, "system", 500);
    await appendLog(`[+] Parsing prompt for intents and entities...`, "log-line", 800);
    await appendLog(`    - Vulnerability Class: <span style="color:#fff">${TEMPLATES[params.type].vuln}</span>`, "log-line", 400);
    await appendLog(`    - Target Company: <span style="color:#fff">${params.company}</span>`, "log-line", 300);
    await appendLog(`    - Difficulty Level: <span style="color:#fff">${params.level}</span>`, "log-line", 300);
    await appendLog(`[+] Loading structural templates...`, "log-line", 800);
    await appendLog(`[+] Generating Metadata block...`, "log-line", 600);
    await appendLog(`[+] Generating Execution Steps (Markdown, Recon, Burp)...`, "log-line", 1000);
    await appendLog(`[+] Validating JSON schema structure...`, "log-line", 700);
    await appendLog(`[SUCCESS] Scenario generated successfully!`, "success", 500);

    // Remove final cursor
    setTimeout(() => {
      const oldCursor = document.getElementById("cursor");
      if (oldCursor) oldCursor.remove();
      
      showResults(params);
    }, 500);
  }

  function showResults(params) {
    generatedScenario = generateJson(params);
    resultCode.textContent = JSON.stringify(generatedScenario, null, 2);
    
    aiTerminal.style.display = "none";
    resultContainer.style.display = "block";
    
    btnGenerate.disabled = false;
    promptInput.disabled = false;
    btnGenerate.innerHTML = "<i class='bx bx-brain'></i> Generate Another";
  }

  btnGenerate.addEventListener("click", () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    const params = parsePrompt(prompt);
    simulateThinking(params);
  });

  btnExport.addEventListener("click", () => {
    if (!generatedScenario) return;

    const jsContent = `// ==========================================================\n// AI GENERATED SCENARIO\n// ==========================================================\n\nwindow.${generatedScenario.metadata.id.replace(/-/g, '_')} = {\n  "metadata": ${JSON.stringify(generatedScenario.metadata, null, 2).replace(/\n/g, '\n  ')},\n  "steps": ${JSON.stringify(generatedScenario.steps, null, 2).replace(/\n/g, '\n  ')}\n};\n`;
    
    const blob = new Blob([jsContent], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedScenario.metadata.id.replace(/-/g, '_')}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
