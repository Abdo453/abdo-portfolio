export class PayloadAnalyzer {
    // Extracts injected commands based on rules and separators
    analyze(input, separators = [';', '&&', '||', '|', '`', '$()']) {
        let hasSeparator = false;
        let detectedSeparator = null;
        let injectedCmds = [];
        let remainingInput = input;

        // Detect $IFS space bypass
        let hasIFSBypass = input.includes('$IFS');
        if (hasIFSBypass) {
            remainingInput = remainingInput.replace(/\$IFS/g, ' ');
        }
        
        // Find separator
        for (let sep of separators) {
            // Very naive check, in a real scenario we'd use regex to not split inside quotes
            if (remainingInput.includes(sep)) {
                hasSeparator = true;
                detectedSeparator = sep;
                const parts = remainingInput.split(sep);
                for (let i = 1; i < parts.length; i++) {
                    injectedCmds.push(parts[i].trim());
                }
                break;
            }
        }
        
        // If it's pure injection (e.g. they just type "whoami" without base command)
        if (!hasSeparator && !input.startsWith('ping')) {
            injectedCmds.push(input.trim());
        }

        return {
            hasSeparator,
            detectedSeparator,
            hasIFSBypass,
            injectedCmds: injectedCmds.filter(Boolean)
        };
    }
}
