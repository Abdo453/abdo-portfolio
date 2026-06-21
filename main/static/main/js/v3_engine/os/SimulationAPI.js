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
        
        switch(verb) {
            // Filesystem Commands
            case 'ls': return this.vfs.ls(args[0]);
            case 'cat': return this.vfs.cat(args[0]);
            case 'cd': return this.vfs.cd(args[0]);
            case 'pwd': return this.vfs.pwd();
            case 'find': return this.vfs.find(args[0]);
            case 'grep': return this.vfs.grep(args[0], args[1]);
            
            // Environment Commands
            case 'env': return this.env.printEnv();
            case 'echo': 
                // Resolve variables like $PATH before echoing
                const resolved = args.map(a => this.env.resolveVariables(a));
                return this.vfs.echo(resolved);

            // User Commands
            case 'whoami': return this.user.whoami();
            case 'id': return this.user.id();

            // Process Commands
            case 'ps': return this.process.ps(args);
            case 'kill': return this.process.kill(args[0]);

            // Network Commands
            case 'ip': return this.network.ip(args);
            case 'netstat': return this.network.netstat(args);
            case 'ss': return this.network.netstat(args);
            case 'hostname': return this.network.hostname();

            // Utilities
            case 'sleep': return `[Simulating time delay of ${args[0] || 0} seconds]`;
            
            default: 
                return `bash: ${verb}: command not found`;
        }
    }
}
