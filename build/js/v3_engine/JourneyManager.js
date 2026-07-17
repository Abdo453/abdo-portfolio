import { StorageEngine } from './StorageEngine.js';
import { ProgressEngine } from './ProgressEngine.js';
import { HintEngine } from './HintEngine.js';
import { SimulationAPI } from './os/SimulationAPI.js';
import { CommandParser } from './CommandParser.js';
import { PayloadAnalyzer } from './PayloadAnalyzer.js';
import { FeedbackEngine } from './FeedbackEngine.js';
import { ScenarioEngine } from './ScenarioEngine.js';
import { UIRenderer } from './UIRenderer.js';
import { ObjectiveEngine } from './ObjectiveEngine.js';
import { AdaptiveEngine } from './AdaptiveEngine.js';

export class JourneyManager {
    constructor(journeyData) {
        if (journeyData && journeyData.encodedData) {
            const decodedText = decodeURIComponent(escape(atob(journeyData.encodedData)));
            this.journey = JSON.parse(decodedText);
        } else {
            this.journey = journeyData;
        }
        
        this.storage = new StorageEngine();
        this.progress = new ProgressEngine(this.storage);
        this.hints = new HintEngine(this.storage);
        
        this.parser = new CommandParser();
        this.analyzer = new PayloadAnalyzer();
        this.feedback = new FeedbackEngine();
        this.adaptiveEngine = new AdaptiveEngine();
        
        this.ui = new UIRenderer(this);
        
        this.currentMissionIndex = 0;
        this.history = [];
        this.startTime = Date.now();
        
        this.initMission(this.currentMissionIndex);
    }

    initMission(index) {
        if (index >= this.journey.missions.length) {
            this.ui.renderMasteryDashboard();
            return;
        }
        
        this.currentMissionIndex = index;
        const missionData = this.journey.missions[index];
        
        this.scenario = new ScenarioEngine(missionData.scenario);
        // Persist OS state across missions in the same journey
        if (!this.os) {
            const osStateData = missionData.scenario.osState || this.journey.osState;
            this.os = new SimulationAPI(osStateData);
        }
        this.objectiveEngine = new ObjectiveEngine(this.os);
        this.adaptiveEngine.resetState();
        
        this.history = []; // reset history for this mission
        this.startTime = Date.now();
        
        this.ui.renderMission(missionData);
    }

    resetServer() {
        if (this.journey.missions[this.currentMissionIndex]) {
            const missionData = this.journey.missions[this.currentMissionIndex];
            const osStateData = missionData.scenario.osState || this.journey.osState;
            this.os = new SimulationAPI(osStateData);
            this.objectiveEngine = new ObjectiveEngine(this.os);
            this.adaptiveEngine.resetState();
            this.ui.updateStats();
            this.ui.printTerminal("[!] Server reset to original state.", "term-warning");
        }
    }

    async executeCommand(input) {
        this.ui.printTerminal(`$ ${input}`, 'term-input-echo');

        // Mutate scenario using adaptive engine
        const mutation = this.adaptiveEngine.mutateScenario(this.scenario);
        const filters = mutation.filters;
        const analysis = this.analyzer.analyze(input);
        
        const fb = this.feedback.evaluate(input, filters, analysis);
        
        // Update Adaptive Engine state
        this.adaptiveEngine.updateState({ command: input, result: fb.allowed, usedHint: false });
        this.ui.updateStats();

        // Prepare raw mock HTTP request
        const requestBody = `ip=${encodeURIComponent(input)}`;
        const rawRequest = `POST /api/ping HTTP/1.1\r\nHost: hunteros.local\r\nUser-Agent: Mozilla/5.0 (Pentest-Platform)\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: ${requestBody.length}\r\nConnection: close\r\n\r\n${requestBody}`;
        
        if (!fb.allowed) {
            const rawResponse = `HTTP/1.1 403 Forbidden\r\nServer: Apache/2.4.41 (Ubuntu)\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: ${fb.reason.length}\r\nConnection: close\r\n\r\n${fb.reason}`;
            
            this.ui.printTerminal(`[-] ${fb.reason}`, 'term-error');
            this.history.push({ 
                input, 
                success: false, 
                note: fb.reason,
                httpTx: { request: rawRequest, response: rawResponse }
            });
            this.ui.updateHistoryPanel(this.history);
            return;
        }

        let output = '';
        if (analysis.injectedCmds.length > 0) {
            for (let cmdStr of analysis.injectedCmds) {
                const tokens = this.parser.tokenize(cmdStr);
                output += await this.runVirtualCommand(tokens.verb, tokens.args, cmdStr) + '\n';
            }
        } else {
            // Simulated base command
            if (input.startsWith('ping')) {
                output += `PING ${input.replace('ping', '').trim()} (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms`;
            } else {
                const tokens = this.parser.tokenize(input);
                output += await this.runVirtualCommand(tokens.verb, tokens.args, input) + '\n';
            }
        }
        
        output = output.trim();
        if (output.includes('__CLEAR__')) {
            this.ui.clearTerminal();
            output = output.replace('__CLEAR__', '').trim();
        }
        if (output) this.ui.printTerminal(output);

        const rawResponse = `HTTP/1.1 200 OK\r\nServer: Apache/2.4.41 (Ubuntu)\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: ${output.length}\r\nConnection: close\r\n\r\n${output}`;

        this.history.push({ 
            input, 
            success: true, 
            output,
            httpTx: { request: rawRequest, response: rawResponse }
        });
        this.ui.updateHistoryPanel(this.history);

        // Check Win Condition
        const currentMission = this.journey.missions[this.currentMissionIndex];
        let isComplete = false;
        
        if (currentMission.objective_engine) {
            isComplete = this.objectiveEngine.check(currentMission.objective_engine, this.history);
        } else {
            // Fallback for older scenarios using completionCondition string
            isComplete = this.scenario.checkObjective(this.vfs, this.history);
        }

        if (isComplete) {
            const rewardXP = this.journey.missions[this.currentMissionIndex].rewards.xp || 0;
            const rewardCoins = this.journey.missions[this.currentMissionIndex].rewards.coins || 0;
            
            this.progress.addReward(rewardXP, rewardCoins);
            this.progress.markMissionComplete(this.journey.id, this.journey.missions[this.currentMissionIndex].id);
            
            this.ui.printTerminal(`[+] Mission Accomplished! +${rewardXP} XP | +${rewardCoins} Coins`, 'term-success');
            
            setTimeout(() => {
                this.ui.showTimeline(this.history, () => {
                    this.initMission(this.currentMissionIndex + 1);
                });
            }, 1500);
        }
    }

    async runVirtualCommand(verb, args, rawInput) {
        if (!verb) return '';
        switch(verb) {
            case 'history':
                return this.history.map((h, i) => `  ${i+1}  ${h.input}`).join('\n');
            case 'clear':
                return '__CLEAR__';
            case 'help': 
                return `Available commands:\nls, pwd, cd, cat, find, grep, echo\nps, kill\nwhoami, id\nip, netstat, ss, hostname\nenv\nsleep, history, clear, help`;
            default: 
                return await this.os.execute(verb, args, rawInput);
        }
    }

    getCurrentDifficultyMode() {
        if (!this.scenario) return 'NORMAL';
        const mutation = this.adaptiveEngine.mutateScenario(this.scenario);
        return mutation.mode;
    }
}
window.JourneyManager = JourneyManager; // Expose globally for testing/HTML
