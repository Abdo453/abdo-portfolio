export class VirtualEnv {
    constructor(envState) {
        this.env = envState || {
            "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
            "HOME": "/var/www",
            "USER": "www-data",
            "PWD": "/var/www/html",
            "SHELL": "/bin/bash"
        };
    }

    get(key) {
        return this.env[key] || "";
    }

    set(key, value) {
        this.env[key] = value;
    }

    printEnv() {
        let output = "";
        for (let [key, val] of Object.entries(this.env)) {
            output += `${key}=${val}\n`;
        }
        return output.trim();
    }

    resolveVariables(inputString) {
        // Simple regex to replace $VAR or ${VAR} with environment variable values
        return inputString.replace(/\$\{?([A-Za-z0-9_]+)\}?/g, (match, p1) => {
            return this.get(p1);
        });
    }
}
