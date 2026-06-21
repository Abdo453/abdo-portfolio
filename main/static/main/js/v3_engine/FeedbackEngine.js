export class FeedbackEngine {
    constructor() {}

    evaluate(input, filters, payloadAnalysis) {
        if (!filters) return { allowed: true };

        // Check Blacklist
        if (filters.blacklist) {
            for (let blocked of filters.blacklist) {
                if (input.includes(blocked)) {
                    const customMsg = filters.feedback && filters.feedback[blocked] 
                        ? filters.feedback[blocked] 
                        : `WAF Blocked: Forbidden sequence '${blocked}'.`;
                    return { allowed: false, reason: customMsg };
                }
            }
        }
        
        // Example logic for "space" filter
        if (filters.blacklist && filters.blacklist.includes(' ')) {
            if (/\s/.test(input)) {
                return { 
                    allowed: false, 
                    reason: filters.feedback && filters.feedback[' '] ? filters.feedback[' '] : "WAF Blocked: Spaces are not allowed." 
                };
            }
        }

        return { allowed: true };
    }
}
