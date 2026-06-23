// ==========================================
// V3 JSON SCENARIO LOADER ENGINE
// ==========================================

window.JsonEngine = {
  loadScenario(scId, callback) {
    const scMeta = window.scenariosDatabase.find(x => x.id === scId);
    if (!scMeta) {
      alert("Scenario not found in registry database!");
      window.location.href = '../index.html';
      return;
    }

    const lvlFolder = scMeta.level.toLowerCase().replace(' ', '');
    const jsonUrl = `../data/scenarios/${lvlFolder}/${scId.replace('-', '_')}.json`;
    const jsUrl = `../data/scenarios/${lvlFolder}/${scId.replace('-', '_')}.js`;

    // 1. Try standard JSON fetch
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) throw new Error("JSON file not found or blocked.");
        return response.json();
      })
      .then(data => {
        console.log(`[JsonEngine] Loaded scenario ${scId} via JSON fetch.`);
        callback(data);
      })
      .catch(err => {
        console.warn(`[JsonEngine] JSON fetch failed (offline file:// protocol or missing file). Falling back to JS script injection.`);
        
        // 2. Fallback to JS script injection for offline compatibility
        const varName = scId.replace('-', '_');
        if (window[varName]) {
          callback(window[varName]);
          return;
        }

        const script = document.createElement('script');
        script.src = `${jsUrl}?v=${Date.now()}`;
        script.onload = () => {
          if (window[varName]) {
            callback(window[varName]);
          } else {
            alert(`Failed to parse scenario namespace object: window.${varName}`);
            window.location.href = '../index.html';
          }
        };
        script.onerror = () => {
          alert(`Failed to load scenario data file: ${jsUrl}`);
          window.location.href = '../index.html';
        };
        document.head.appendChild(script);
      });
  }
};
