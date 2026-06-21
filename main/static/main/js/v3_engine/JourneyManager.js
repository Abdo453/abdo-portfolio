import { StorageEngine } from './StorageEngine.js';
import { ProgressEngine } from './ProgressEngine.js';
import { HintEngine } from './HintEngine.js';
import { SimulationAPI } from './os/SimulationAPI.js';
import { CommandParser } from './CommandParser.js';
import { PayloadAnalyzer } from './PayloadAnalyzer.js';
import { FeedbackEngine } from './FeedbackEngine.js';
import { ScenarioEngine } from './ScenarioEngine.js';
import { UIRenderer } from './UIRenderer.js';

export class JourneyManager {
    constructor(journeyData) {
        this.journey = journeyData;
        
        this.storage = new StorageEngine();
        this.progress = new ProgressEngine(this.storage);
        this.hints = new HintEngine(this.storage);
        
        this.parser = new CommandParser();
        this.analyzer = new PayloadAnalyzer();
        this.feedback = new FeedbackEngine();
        
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
        this.os = new SimulationAPI(missionData.scenario.osState);
        this.history = []; // reset history for this mission
        this.startTime = Date.now();
        
        this.ui.renderMission(missionData);
    }

    executeCommand(input) {
        this.ui.printTerminal(`$ ${input}`, 'term-input-echo');

        const filters = this.scenario.getFilters();
        const analysis = this.analyzer.analyze(input);
        
        const fb = this.feedback.evaluate(input, filters, analysis);
        
        if (!fb.allowed) {
            this.ui.printTerminal(`[-] ${fb.reason}`, 'term-error');
            this.history.push({ input, success: false, note: fb.reason });
            this.ui.updateHistoryPanel(this.history);
            return;
        }

        let output = '';
        if (analysis.injectedCmds.length > 0) {
            for (let cmdStr of analysis.injectedCmds) {
                const tokens = this.parser.tokenize(cmdStr);
                output += this.runVirtualCommand(tokens.verb, tokens.args, cmdStr) + '\n';
            }
        } else {
            // Simulated base command
            if (input.startsWith('ping')) {
                output += `PING ${input.replace('ping', '').trim()} (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms`;
            } else {
                const tokens = this.parser.tokenize(input);
                output += this.runVirtualCommand(tokens.verb, tokens.args, input) + '\n';
            }
        }
        
        output = output.trim();
        if (output.includes('__CLEAR__')) {
            this.ui.clearTerminal();
            output = output.replace('__CLEAR__', '').trim();
        }
        if (output) this.ui.printTerminal(output);

        this.history.push({ input, success: true, output });
        this.ui.updateHistoryPanel(this.history);

        // Check Win Condition
        if (this.scenario.checkObjective(this.vfs, this.history)) {
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

    runVirtualCommand(verb, args, rawInput) {
        if (!verb) return '';
        switch(verb) {
            case 'history':
                return this.history.map((h, i) => `  ${i+1}  ${h.input}`).join('\n');
            case 'clear':
                return '__CLEAR__';
            case 'help': 
                return `Available commands:\nls, pwd, cd, cat, find, grep, echo\nps, kill\nwhoami, id\nip, netstat, ss, hostname\nenv\nsleep, history, clear, help`;
            default: 
                return this.os.execute(verb, args, rawInput);
        }
    }
}
window.JourneyManager = JourneyManager; // Expose globally for testing/HTML
