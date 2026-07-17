export class ProgressEngine {
    constructor(storageEngine) {
        this.storage = storageEngine;
    }

    addReward(xp, coins) {
        const currentXP = this.storage.getXP();
        const currentCoins = this.storage.getCoins();
        this.storage.saveXP(currentXP + xp);
        this.storage.saveCoins(currentCoins + coins);
    }

    getLevel() {
        const xp = this.storage.getXP();
        return Math.floor(xp / 1000) + 1; // 1000 XP per level
    }

    markMissionComplete(journeyId, missionId) {
        const prog = this.storage.getProgress(journeyId);
        if (!prog.completedMissions.includes(missionId)) {
            prog.completedMissions.push(missionId);
            this.storage.saveProgress(journeyId, prog);
            return true; // Newly completed
        }
        return false; // Already completed
    }
}
