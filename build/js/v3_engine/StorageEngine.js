export class StorageEngine {
    constructor(prefix = 'v3_') {
        this.prefix = prefix;
    }

    get(key, defaultValue) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('StorageEngine Error:', e);
            return defaultValue;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } catch (e) {
            console.error('StorageEngine Error:', e);
        }
    }

    saveXP(xp) { this.set('xp', xp); }
    getXP() { return this.get('xp', 0); }

    saveCoins(coins) { this.set('coins', coins); }
    getCoins() { return this.get('coins', 0); }

    saveProgress(journeyId, progressObj) {
        const prog = this.get('progress', {});
        prog[journeyId] = progressObj;
        this.set('progress', prog);
    }
    
    getProgress(journeyId) {
        const prog = this.get('progress', {});
        return prog[journeyId] || { completedMissions: [], unlockedHints: [] };
    }
}
