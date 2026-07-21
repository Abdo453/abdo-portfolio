import re

filepath = r"C:\Users\Computer Market\.gemini\antigravity\scratch\abdo_portfolio\main\templates\main\home.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

projects_pattern = re.compile(r'<!-- 3. PROJECTS VIEW -->.*?<!-- 4. WRITEUPS VIEW -->', re.DOTALL)
new_projects = """<!-- 3. PROJECTS VIEW -->
        <div class="workspace-pane" id="pane-projects">
          <h2 class="pane-view-title">// Security-Focused Development</h2>
          <div class="visual-projects-grid">
            {% for project in projects %}
            <div class="visual-project-card" style="--project-glow: {{ project.color }}">
              <div class="project-card-image-wrap">
                <img src="{% static project.image %}" alt="{{ project.title }}" class="project-card-image" />
                <div class="project-glow-layer" style="background: {{ project.color }}1a"></div>
              </div>
              <div class="project-card-info">
                <h3 class="project-title-name">{{ project.title }}</h3>
                
                <div class="cyber-card project-detail-card">
                  <h4 style="color: #00e5ff;">🎯 The Problem:</h4>
                  <p>{{ project.problem_solved }}</p>
                  
                  <h4 style="color: #ffb020; margin-top: 10px;">💻 Tech Stack:</h4>
                  <div class="project-technologies">
                    {% for tool in project.tech_stack %}
                    <span class="tech-tag">{{ tool }}</span>
                    {% endfor %}
                  </div>
                  
                  <h4 style="color: #ff6b9d; margin-top: 10px;">🔒 Security Considerations:</h4>
                  <p>{{ project.security_considerations }}</p>
                </div>

                <div class="project-card-action" style="margin-top: 15px;">
                  <a href="{{ project.github_url }}" target="_blank" rel="noopener" class="cyber-btn ghost-btn">
                    📁 View Code Repository
                  </a>
                </div>
              </div>
            </div>
            {% endfor %}
          </div>
        </div>

        <!-- 4. LABS VIEW -->"""
content = projects_pattern.sub(new_projects, content)

writeups_pattern = re.compile(r'<!-- 4. WRITEUPS VIEW -->.*?<!-- 5. CERTS VIEW -->', re.DOTALL)
new_labs = """<!-- 4. LABS VIEW -->
        <div class="workspace-pane" id="pane-labs">
          <h2 class="pane-view-title">// Offensive Security Labs & Scenarios</h2>
          <div class="labs-grid">
            {% for lab in labs %}
            <div class="cyber-card lab-card">
              <div class="lab-header">
                <h3 class="lab-title">💀 {{ lab.title }}</h3>
                <span class="lab-date">{{ lab.date }}</span>
              </div>
              
              <div class="lab-section">
                <h4 class="text-neon-cyan">🎯 Goal</h4>
                <p>{{ lab.goal }}</p>
              </div>

              <div class="lab-section">
                <h4 class="text-neon-orange">🛠️ Tools Used</h4>
                <div class="lab-tools">
                  {% for tool in lab.tools %}
                  <span class="cyber-badge">{{ tool }}</span>
                  {% endfor %}
                </div>
              </div>

              <div class="lab-section">
                <h4 class="text-neon-green">⚙️ Execution Steps</h4>
                <ul class="lab-steps">
                  {% for step in lab.steps %}
                  <li>{{ step }}</li>
                  {% endfor %}
                </ul>
              </div>

              <div class="lab-result-box">
                <strong>🏁 Result:</strong> {{ lab.result }}
              </div>
            </div>
            {% endfor %}
          </div>
        </div>

        <!-- 5. CERTS VIEW -->"""
content = writeups_pattern.sub(new_labs, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated projects and labs panes in home.html!")
