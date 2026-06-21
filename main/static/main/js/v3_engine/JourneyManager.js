import { StorageEngine } from './StorageEngine.js';
import { ProgressEngine } from './ProgressEngine.js';
import { HintEngine } from './HintEngine.js';
import { VFS } from './VFS.js';
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
        this.vfs = new VFS(missionData.scenario.initialFS);
        this.history = []; // reset history for this mission
        
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
                output += this.runVirtualCommand(tokens.verb, tokens.args) + '\n';
            }
        } else {
            // Simulated base command
            if (input.startsWith('ping')) {
                output += `PING ${input.replace('ping', '').trim()} (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms`;
            } else {
                const tokens = this.parser.tokenize(input);
                output += this.runVirtualCommand(tokens.verb, tokens.args) + '\n';
            }
        }
        
        output = output.trim();
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
                this.initMission(this.currentMissionIndex + 1);
            }, 2000);
        }
    }

    runVirtualCommand(verb, args) {
        if (!verb) return '';
        switch(verb) {
            case 'whoami': return 'www-data';
            case 'pwd': return this.vfs.pwd();
            case 'ls': return this.vfs.ls(args[0]);
            case 'cat': return this.vfs.cat(args[0]);
            case 'cd': return this.vfs.cd(args[0]);
            case 'sleep': return `[Simulating time delay of ${args[0] || 0} seconds]`;
            default: return `bash: ${verb}: command not found`;
        }
    }
}
window.JourneyManager = JourneyManager; // Expose globally for testing/HTML
