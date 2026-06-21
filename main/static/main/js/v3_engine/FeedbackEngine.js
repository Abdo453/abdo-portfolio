export class FeedbackEngine {
    constructor() {}

    evaluate(input, filters, payloadAnalysis) {
        if (!filters) return { allowed: true };

        const hasIntent = payloadAnalysis && payloadAnalysis.injectedCmds && payloadAnalysis.injectedCmds.length > 0;
        let prefix = "";
        
        if (hasIntent) {
            prefix = "ممتاز! لقد اكتشفت طريقة لتمرير الأوامر، لكن ";
        }

        // Check Blacklist
        if (filters.blacklist) {
            for (let blocked of filters.blacklist) {
                // Space is handled below via regex to catch all whitespaces
                if (blocked === ' ') continue; 

                if (input.includes(blocked)) {
                    let customMsg = filters.feedback && filters.feedback[blocked] 
                        ? filters.feedback[blocked] 
                        : `WAF Blocked: Forbidden sequence '${blocked}'.`;
                        
                    if (hasIntent && !customMsg.includes("ممتاز")) {
                        customMsg = prefix + customMsg;
                    }
                    return { allowed: false, reason: customMsg };
                }
            }
        }
        
        // Handle space filtering specially to catch all whitespace variants
        if (filters.blacklist && filters.blacklist.includes(' ')) {
            if (/\s/.test(input)) {
                let msg = filters.feedback && filters.feedback[' '] ? filters.feedback[' '] : "WAF Blocked: Spaces are not allowed.";
                if (hasIntent && !msg.includes("ممتاز")) {
                    msg = prefix + msg;
                }
                return { 
                    allowed: false, 
                    reason: msg 
                };
            }
        }

        return { allowed: true };
    }
}
