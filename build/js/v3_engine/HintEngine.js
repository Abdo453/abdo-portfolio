export class HintEngine {
    constructor(storageEngine) {
        this.storage = storageEngine;
    }

    unlockHint(journeyId, missionId, hintIndex, cost) {
        const coins = this.storage.getCoins();
        if (coins < cost) {
            return { success: false, reason: `Not enough coins. You need ${cost} Coins.` };
        }
        
        const prog = this.storage.getProgress(journeyId);
        const hintKey = `${missionId}_hint_${hintIndex}`;
        
        if (prog.unlockedHints.includes(hintKey)) {
            return { success: true, alreadyUnlocked: true };
        }

        this.storage.saveCoins(coins - cost);
        prog.unlockedHints.push(hintKey);
        this.storage.saveProgress(journeyId, prog);
        
        return { success: true, alreadyUnlocked: false };
    }

    isHintUnlocked(journeyId, missionId, hintIndex) {
        const prog = this.storage.getProgress(journeyId);
        const hintKey = `${missionId}_hint_${hintIndex}`;
        return prog.unlockedHints.includes(hintKey);
    }
}
