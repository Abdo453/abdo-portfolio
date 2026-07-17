export class VirtualNetwork {
    constructor(networkState) {
        this.interfaces = networkState?.interfaces || [
            { name: "lo", ip: "127.0.0.1", mask: "255.0.0.0" },
            { name: "eth0", ip: "10.10.10.5", mask: "255.255.255.0" }
        ];
        this.ports = networkState?.ports || [
            { proto: "tcp", local: "0.0.0.0:80", state: "LISTEN", pid: "1024/apache2" },
            { proto: "tcp", local: "0.0.0.0:22", state: "LISTEN", pid: "501/sshd" },
            { proto: "tcp", local: "127.0.0.1:3306", state: "LISTEN", pid: "889/mysqld" }
        ];
        this.hostnameStr = networkState?.hostname || "acme-web-prod";
    }

    ip(args) {
        let output = "";
        this.interfaces.forEach((iface, index) => {
            output += `${index + 1}: ${iface.name}: <UP,BROADCAST,RUNNING,MULTICAST> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000\n`;
            output += `    inet ${iface.ip}/${iface.mask} brd 10.10.10.255 scope global ${iface.name}\n`;
        });
        return output.trim();
    }

    netstat(args) {
        let output = "Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name\n";
        this.ports.forEach(p => {
            output += `${p.proto.padEnd(5)} 0      0      ${p.local.padEnd(23)} 0.0.0.0:*               ${p.state.padEnd(11)} ${p.pid}\n`;
        });
        return output.trim();
    }

    hostname() {
        return this.hostnameStr;
    }
}
