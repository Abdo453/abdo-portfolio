import re

new_html_content = """            <!-- Pane 3: Dynamic Content (Viewer) -->
            <div class="explorer-content-panel">
              <div id="emptyContentState" class="empty-state">
                <span class="empty-icon">🛠️</span>
                <p>Select a tool to view its deep analysis.</p>
              </div>

              {% for folder in academy_explorer %}
                {% for tool in folder.tools %}
                <div class="tool-content-view" id="content-{{ tool.id }}" style="display: none; --tool-color: {{ folder.color_theme }};">
                  
                  <!-- HERO SECTION -->
                  <div class="cyber-hero">
                    <div class="hero-left">
                      <h2 class="hero-title"><span class="hero-icon">{{ tool.icon }}</span> {{ tool.name }}</h2>
                      <p class="hero-tagline">{{ tool.tagline }}</p>
                      <div class="hero-badges">
                        {% for badge in tool.badges %}
                          <span class="cyber-badge">{{ badge }}</span>
                        {% endfor %}
                      </div>
                    </div>
                    <div class="hero-right">
                      <div class="stat-row">
                        <div class="stat-label"><span>Speed</span><span>{{ tool.stats.speed }}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {{ tool.stats.speed }}%;"></div></div>
                      </div>
                      <div class="stat-row">
                        <div class="stat-label"><span>Complexity</span><span>{{ tool.stats.complexity }}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {{ tool.stats.complexity }}%;"></div></div>
                      </div>
                      <div class="stat-row">
                        <div class="stat-label"><span>Accuracy</span><span>{{ tool.stats.accuracy }}%</span></div>
                        <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: {{ tool.stats.accuracy }}%;"></div></div>
                      </div>
                    </div>
                  </div>

                  <!-- TABS NAVIGATION -->
                  <div class="cyber-tabs">
                    <button class="cyber-tab-btn active" onclick="switchTab(this, 'tab-overview-{{ tool.id }}')">Overview</button>
                    <button class="cyber-tab-btn" onclick="switchTab(this, 'tab-commands-{{ tool.id }}')">Commands</button>
                    <button class="cyber-tab-btn" onclick="switchTab(this, 'tab-workflow-{{ tool.id }}')">Workflow</button>
                    <button class="cyber-tab-btn" onclick="switchTab(this, 'tab-comparisons-{{ tool.id }}')">Comparisons</button>
                  </div>

                  <!-- TAB: OVERVIEW -->
                  <div class="tab-pane active" id="tab-overview-{{ tool.id }}">
                    <div class="cyber-card">
                      <div class="card-header"><h3>⚫ What is {{ tool.name }}?</h3></div>
                      <p>{{ tool.what_is }}</p>
                    </div>

                    <div class="cyber-card">
                      <div class="card-header"><h3>🟣 Why Use It?</h3></div>
                      <ul class="t-check-list">
                        {% for w in tool.why %}<li>✔ {{ w }}</li>{% endfor %}
                      </ul>
                    </div>

                    <div class="use-box-grid">
                      <div class="use-card perfect-for">
                        <h4>✅ Perfect For:</h4>
                        <ul>
                          {% for w in tool.when_use %}<li>✔ {{ w }}</li>{% endfor %}
                        </ul>
                      </div>
                      <div class="use-card avoid-when">
                        <h4>❌ Avoid When:</h4>
                        <ul>
                          {% for w in tool.when_not %}<li>❌ {{ w }}</li>{% endfor %}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- TAB: COMMANDS -->
                  <div class="tab-pane" id="tab-commands-{{ tool.id }}">
                    {% if tool.install %}
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔵 Installation</h3></div>
                      <div class="cmd-ui-box">
                        <div class="cmd-ui-top">{{ tool.install }}</div>
                        <div class="cmd-ui-bottom">
                          <button class="cmd-btn" onclick="copyText('{{ tool.install|escapejs }}', this)">📋 Copy</button>
                        </div>
                      </div>
                    </div>
                    {% endif %}

                    <div class="cyber-card">
                      <div class="card-header"><h3>🟠 Core Command</h3></div>
                      <div class="cmd-ui-box">
                        <div class="cmd-ui-top">{{ tool.cmd }}</div>
                        <div class="cmd-ui-bottom">
                          <button class="cmd-btn" onclick="copyText('{{ tool.cmd|escapejs }}', this)">📋 Copy</button>
                          <button class="cmd-btn run-btn" onclick="simulateTerminal('{{ tool.cmd|escapejs }}')">▶ Run Demo</button>
                        </div>
                      </div>
                    </div>

                    {% if tool.flags %}
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔴 Flags & Parameters</h3></div>
                      <table class="interactive-table">
                        <thead><tr><th>Flag</th><th>Description</th></tr></thead>
                        <tbody>
                          {% for f in tool.flags %}
                          <tr><td>{{ f.flag }}</td><td>{{ f.desc }}</td></tr>
                          {% endfor %}
                        </tbody>
                      </table>
                    </div>
                    {% endif %}
                  </div>

                  <!-- TAB: WORKFLOW -->
                  <div class="tab-pane" id="tab-workflow-{{ tool.id }}">
                    <div class="cyber-card">
                      <div class="card-header"><h3>🔵 Execution Flow</h3></div>
                      <div class="workflow-map">
                        {% for node in tool.flow_nodes %}
                          <div class="wf-node">{{ node }}</div>
                          {% if not forloop.last %}<div class="wf-arrow">↓</div>{% endif %}
                        {% endfor %}
                      </div>
                    </div>

                    <div class="cyber-card">
                      <div class="card-header"><h3>🟡 Real Attack Pipeline</h3></div>
                      <div class="workflow-map" style="flex-direction: row; flex-wrap: wrap; justify-content: center;">
                        {% for wnode in tool.workflow_nodes %}
                          <div class="wf-node" style="border-color: #ffb020; box-shadow: 0 0 10px rgba(255,176,32,0.3);">{{ wnode }}</div>
                          {% if not forloop.last %}<div class="wf-arrow" style="transform: rotate(-90deg);">↓</div>{% endif %}
                        {% endfor %}
                      </div>
                    </div>
                  </div>

                  <!-- TAB: COMPARISONS -->
                  <div class="tab-pane" id="tab-comparisons-{{ tool.id }}">
                    {% if tool.comparison %}
                    <div class="cyber-card">
                      <div class="card-header"><h3>🟢 Comparison Chart</h3></div>
                      <table class="interactive-table">
                        <thead>
                          <tr><th>Tool</th><th>Speed</th><th>Accuracy</th><th>Passive</th><th>Active</th></tr>
                        </thead>
                        <tbody>
                          {% for cmp in tool.comparison %}
                          <tr>
                            <td>{{ cmp.tool }}</td>
                            <td>{{ cmp.speed }}</td>
                            <td>{{ cmp.accuracy }}</td>
                            <td>{{ cmp.passive }}</td>
                            <td>{{ cmp.active }}</td>
                          </tr>
                          {% endfor %}
                        </tbody>
                      </table>
                    </div>
                    {% endif %}

                    <div class="cyber-card">
                      <div class="card-header"><h3>🔗 Related Tools</h3></div>
                      <div class="related-tools-bar">
                        {% for rel in tool.related_tools %}
                          <div class="related-tool-pill" onclick="openTool('{{ rel }}')">🚀 {{ rel }}</div>
                        {% endfor %}
                      </div>
                    </div>
                  </div>

                </div>
                {% endfor %}
              {% endfor %}
            </div>"""

filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\templates\main\home.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Pane 3
pattern = re.compile(r"            <!-- Pane 3: Dynamic Content \(Viewer\) -->.*?</div>\s*</div>\s*</div>", re.DOTALL)
new_content = pattern.sub(new_html_content + "\n\n          </div>\n        </div>", content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("home.html updated successfully!")
