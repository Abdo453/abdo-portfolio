export class VirtualUser {
    constructor(usersState, currentUser) {
        // e.g. { "root": { uid: 0, gid: 0, home: "/root", shell: "/bin/bash" } }
        this.users = usersState || {
            "root": { uid: 0, gid: 0, home: "/root", shell: "/bin/bash" },
            "www-data": { uid: 33, gid: 33, home: "/var/www", shell: "/usr/sbin/nologin" }
        };
        this.currentUser = currentUser || "www-data";
    }

    whoami() {
        return this.currentUser;
    }

    id() {
        const u = this.users[this.currentUser];
        if (!u) return `uid=1000(${this.currentUser}) gid=1000(${this.currentUser}) groups=1000(${this.currentUser})`;
        return `uid=${u.uid}(${this.currentUser}) gid=${u.gid}(${this.currentUser}) groups=${u.gid}(${this.currentUser})`;
    }

    getPasswd() {
        let output = "";
        for (let [user, info] of Object.entries(this.users)) {
            output += `${user}:x:${info.uid}:${info.gid}::${info.home}:${info.shell}\n`;
        }
        return output.trim();
    }
}
