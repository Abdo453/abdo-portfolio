export class CommandParser {
    // Converts a raw input string into a list of executed commands
    // E.g., `8.8.8.8; ls -la` -> [ { verb: 'ping', args: ['8.8.8.8'] }, { verb: 'ls', args: ['-la'] } ]
    // Wait, since we are building a PayloadAnalyzer, the CommandParser just tokenizes
    
    tokenize(cmdString) {
        if (!cmdString) return { verb: '', args: [] };
        
        // Very basic tokenizer that respects quotes
        const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
        const tokens = [];
        let match;
        
        while ((match = regex.exec(cmdString)) !== null) {
            tokens.push(match[1] || match[2] || match[0]);
        }
        
        return {
            verb: tokens[0] || '',
            args: tokens.slice(1)
        };
    }
}
