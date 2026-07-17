export class VirtualProcess {
    constructor(processState) {
        // Expected state: [ { pid: 1, user: "root", cmd: "/sbin/init" }, ... ]
        this.processes = processState || [
            { pid: 1, user: "root", cmd: "/sbin/init" },
            { pid: 334, user: "root", cmd: "/usr/sbin/cron -f" },
            { pid: 501, user: "root", cmd: "/usr/sbin/sshd -D" },
            { pid: 889, user: "mysql", cmd: "/usr/sbin/mysqld" },
            { pid: 1024, user: "root", cmd: "apache2 -k start" },
            { pid: 1025, user: "www-data", cmd: "apache2 -k start" },
            { pid: 1026, user: "www-data", cmd: "apache2 -k start" }
        ];
    }

    ps(args) {
        // A simple simulation of ps aux
        let header = "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\n";
        let output = "";
        for (let p of this.processes) {
            output += `${p.user.padEnd(10)} ${String(p.pid).padEnd(5)}  0.0  0.0  10000  2000 ?        Ss   Jan01   0:00 ${p.cmd}\n`;
        }
        return (header + output).trim();
    }

    kill(pidStr) {
        const pid = parseInt(pidStr);
        if (isNaN(pid)) return `bash: kill: ${pidStr}: arguments must be process or job IDs`;
        
        const index = this.processes.findIndex(p => p.pid === pid);
        if (index === -1) return `bash: kill: (${pid}) - No such process`;
        
        // Remove process
        const proc = this.processes[index];
        this.processes.splice(index, 1);
        return `[+] Process ${pid} (${proc.cmd}) killed`;
    }
}
