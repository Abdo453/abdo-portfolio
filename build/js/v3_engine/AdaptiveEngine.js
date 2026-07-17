export class AdaptiveEngine {
    constructor() {
        this.playerState = {
            attempts: 0,
            failures: 0,
            successes: 0,
            avgSolveTime: 0,
            hintUsage: 0,
            payloadComplexityScore: 0,
            confidenceLevel: 0,
            missionStartTime: Date.now()
        };
    }

    resetState() {
        this.playerState = {
            ...this.playerState,
            attempts: 0,
            failures: 0,
            successes: 0,
            hintUsage: 0,
            payloadComplexityScore: 0,
            missionStartTime: Date.now()
        };
    }

    updateState(event) {
        // event = { command, result (true/false), usedHint }
        if (event.usedHint) {
            this.playerState.hintUsage++;
        } else if (event.command) {
            this.playerState.attempts++;
            if (event.result) {
                this.playerState.successes++;
            } else {
                this.playerState.failures++;
            }

            // Extremely basic complexity heuristic
            if (event.command.includes(';') || event.command.includes('|') || event.command.includes('>')) {
                this.playerState.payloadComplexityScore += 1;
            }
        }

        const elapsedSeconds = (Date.now() - this.playerState.missionStartTime) / 1000;
        this.playerState.avgSolveTime = elapsedSeconds / Math.max(1, this.playerState.attempts);

        this.playerState.confidenceLevel = this.calculateConfidence();
    }

    calculateDifficulty() {
        let score = 50; // base NORMAL

        score -= this.playerState.successes * 5;
        score += this.playerState.failures * 3;
        score -= this.playerState.avgSolveTime < 60 ? 10 : 0;
        score += this.playerState.hintUsage * 8;
        score += this.playerState.payloadComplexityScore * 2;

        return Math.max(0, Math.min(100, score));
    }

    calculateConfidence() {
        return (
            this.playerState.successes * 10 -
            this.playerState.hintUsage * 8 +
            this.playerState.payloadComplexityScore * 2 -
            this.playerState.failures * 3
        );
    }

    mutateScenario(scenario) {
        const difficulty = this.calculateDifficulty();
        
        // Deep copy filters to avoid mutating the core definition
        let currentFilters = JSON.parse(JSON.stringify(scenario.getFilters() || {}));
        
        if (!currentFilters.blacklist) currentFilters.blacklist = [];
        if (!currentFilters.feedback) currentFilters.feedback = {};

        // 0 - 25: EASY MODE
        if (difficulty < 30) {
            currentFilters.blacklist = []; // Remove all WAF
            currentFilters.blind = false;
        } 
        // 26 - 50: NORMAL MODE
        else if (difficulty < 60) {
            // Keep original scenario filters
            currentFilters.blind = !!currentFilters.blind;
        } 
        // 51 - 75: HARD MODE
        else if (difficulty < 80) {
            // Ensure space is blocked if not already
            if (!currentFilters.blacklist.includes(' ')) {
                currentFilters.blacklist.push(' ');
                currentFilters.feedback[' '] = 'WAF Alert: Adaptive Hard Mode activated. Spaces blocked.';
            }
        } 
        // 76 - 100: INSANE / BLIND MODE
        else {
            // Insane mode: Space filter + Blind
            if (!currentFilters.blacklist.includes(' ')) {
                currentFilters.blacklist.push(' ');
                currentFilters.feedback[' '] = 'WAF Alert: Insane Mode activated. Spaces blocked.';
            }
            currentFilters.blind = true;
        }

        return {
            filters: currentFilters,
            difficultyScore: difficulty,
            mode: difficulty < 30 ? 'EASY' : difficulty < 60 ? 'NORMAL' : difficulty < 80 ? 'HARD' : 'INSANE'
        };
    }
}
