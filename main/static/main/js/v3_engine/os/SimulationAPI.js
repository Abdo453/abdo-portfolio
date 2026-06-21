import { VFS } from '../VFS.js';
import { VirtualUser } from './VirtualUser.js';
import { VirtualEnv } from './VirtualEnv.js';
import { VirtualProcess } from './VirtualProcess.js';
import { VirtualNetwork } from './VirtualNetwork.js';

export class SimulationAPI {
    constructor(osState) {
        // Initialize layers
        this.vfs = new VFS(osState?.filesystem);
        this.user = new VirtualUser(osState?.users, osState?.currentUser);
        this.env = new VirtualEnv(osState?.env);
        this.process = new VirtualProcess(osState?.processes);
        this.network = new VirtualNetwork(osState?.network);
    }

    // Main execution router
    execute(verb, args, rawInput) {
        if (!verb) return '';
        
        // Handle Redirection > and >>
        let redirectTarget = null;
        let append = false;
        
        // Find if args contains > or >>
        const rIndex = args.findIndex(a => a === '>' || a === '>>');
        if (rIndex !== -1) {
            append = args[rIndex] === '>>';
            redirectTarget = args[rIndex + 1];
            // Remove redirection from args
            args = args.slice(0, rIndex);
        } else if (rawInput && rawInput.includes('>')) {
            // Sometimes tokenizer keeps it together if not separated by space
            const parts = rawInput.split(/>>|>/);
            if (parts.length > 1) {
                redirectTarget = parts[1].trim();
                append = rawInput.includes('>>');
                // We re-parse args
                const subStr = parts[0].trim();
                const toks = subStr.split(' ');
                verb = toks[0];
                args = toks.slice(1);
            }
        }

        let output = '';

        // Check if verb is a script execution (e.g., ./script.sh or /opt/script.sh)
        if (verb.includes('/')) {
            const node = this.vfs.getNode(verb);
            if (node && node.type === 'file') {
                const scriptContent = node.content;
                const lines = scriptContent.split('\n').filter(l => l.trim() && !l.startsWith('#'));
                let scriptOutput = [];
                for (const line of lines) {
                    // Quick parser for simple script execution
                    const toks = line.trim().split(' ');
                    const subVerb = toks[0];
                    const subArgs = toks.slice(1);
                    scriptOutput.push(this.execute(subVerb, subArgs, line));
                }
                return scriptOutput.join('\n');
            } else {
                return `bash: ${verb}: No such file or directory`;
            }
        }

        switch(verb) {
            // Filesystem Commands
            case 'ls': output = this.vfs.ls(args[0]); break;
            case 'cat': output = this.vfs.cat(args[0]); break;
            case 'cd': output = this.vfs.cd(args[0]); break;
            case 'pwd': output = this.vfs.pwd(); break;
            case 'find': output = this.vfs.find(args[0]); break;
            case 'grep': output = this.vfs.grep(args[0], args[1]); break;
            case 'mkdir': output = this.vfs.mkdir(args[0]); break;
            case 'touch': output = this.vfs.touch(args[0]); break;
            case 'rm': output = this.vfs.rm(args[0]); break;
            case 'wget': output = this.vfs.wget(args[0]); break;
            case 'curl': output = this.vfs.wget(args[0]); break; // Treat curl like wget for simplicity
            
            // Environment Commands
            case 'env': output = this.env.printEnv(); break;
            case 'echo': 
                const resolved = args.map(a => this.env.resolveVariables(a));
                output = this.vfs.echo(resolved);
                break;

            // User Commands
            case 'whoami': output = this.user.whoami(); break;
            case 'id': output = this.user.id(); break;

            // Process Commands
            case 'ps': output = this.process.ps(args); break;
            case 'kill': output = this.process.kill(args[0]); break;

            // Network Commands
            case 'ip': output = this.network.ip(args); break;
            case 'netstat': output = this.network.netstat(args); break;
            case 'ss': output = this.network.netstat(args); break;
            case 'hostname': output = this.network.hostname(); break;

            // Utilities
            case 'sleep': output = `[Simulating time delay of ${args[0] || 0} seconds]`; break;
            
            default: 
                output = `bash: ${verb}: command not found`;
                break;
        }

        // Apply redirection if present
        if (redirectTarget && !output.startsWith('bash:')) {
            const err = this.vfs.write(redirectTarget, output, append);
            if (err) return err;
            return ''; // Redirected commands don't output to stdout
        }

        return output;
    }
}
