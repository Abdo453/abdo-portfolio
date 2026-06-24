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
    const varName = scId.replace('-', '_');

    // Try JS script injection first for interactive functions & offline compatibility
    const script = document.createElement('script');
    script.src = `${jsUrl}?v=${Date.now()}`;
    script.onload = () => {
      if (window[varName]) {
        console.log(`[JsonEngine] Loaded scenario ${scId} via JS script injection.`);
        callback(window[varName]);
      } else {
        fallbackToJson();
      }
    };
    script.onerror = () => {
      fallbackToJson();
    };
    document.head.appendChild(script);

    function fallbackToJson() {
      fetch(jsonUrl)
        .then(response => {
          if (!response.ok) throw new Error("JSON file not found or blocked.");
          return response.json();
        })
        .then(data => {
          console.log(`[JsonEngine] Loaded scenario ${scId} via fallback JSON fetch.`);
          callback(data);
        })
        .catch(err => {
          console.warn(`[JsonEngine] Fallback JSON fetch failed:`, err);
          alert(`Failed to load scenario data file: ${jsUrl} or ${jsonUrl}`);
          window.location.href = '../index.html';
        });
    }
  }
};
