export class ScenarioEngine {
    constructor(scenarioData) {
        this.data = scenarioData;
    }

    getCompany() { return this.data.company || 'Unknown Corp'; }
    getTarget() { return this.data.target || 'Unknown Target'; }
    getObjective() { return this.data.objective || 'Hack the planet.'; }
    getEnvironment() { return this.data.environment || {}; }
    
    getFilters() { return this.data.filters || {}; }
    
    checkObjective(vfs, history) {
        if (!this.data.completionCondition) return false;
        
        // This evaluates a predefined string from JSON using eval safely (or string matching)
        // For security in a real app, this should be parsed into rule objects, but for this lab simulator:
        try {
            // E.g. "vfs.cat('/home/user/flag.txt').includes('FLAG')"
            const condition = new Function('vfs', 'history', `return ${this.data.completionCondition};`);
            return condition(vfs, history);
        } catch(e) {
            console.error("Error evaluating completion condition", e);
            return false;
        }
    }
}
