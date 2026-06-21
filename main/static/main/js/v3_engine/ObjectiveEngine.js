export class ObjectiveEngine {
    constructor(simulationAPI) {
        this.os = simulationAPI;
    }

    check(objective, history) {
        if (!objective) return true; // No objective, implicitly complete
        
        switch (objective.type) {
            case 'file_read':
                return this._checkFileRead(objective, history);
            case 'file_write':
                return this._checkFileWrite(objective, history);
            case 'command_exec':
                return this._checkCommandExec(objective, history);
            case 'evidence_collection':
                return this._checkEvidenceCollection(objective, history);
            default:
                console.warn(`Unknown objective type: ${objective.type}`);
                return false;
        }
    }

    _checkFileRead(objective, history) {
        const targetNode = this.os.vfs.getNode(objective.target);
        if (!targetNode || targetNode.type !== 'file') return false;
        
        // If the objective explicitly provides an 'evidence_string', use it. 
        // Otherwise, use the entire file content.
        const evidence = objective.evidence_string || targetNode.content;
        return history.some(h => h.success && h.output && h.output.includes(evidence));
    }

    _checkFileWrite(objective, history) {
        const targetNode = this.os.vfs.getNode(objective.target);
        if (!targetNode || targetNode.type !== 'file') return false;
        
        if (objective.contains) {
            return targetNode.content.includes(objective.contains);
        }
        return true;
    }

    _checkCommandExec(objective, history) {
        return history.some(h => h.success && h.input.includes(objective.target));
    }

    _checkEvidenceCollection(objective, history) {
        if (!Array.isArray(objective.items)) return false;
        return objective.items.every(subObj => this.check(subObj, history));
    }
}
