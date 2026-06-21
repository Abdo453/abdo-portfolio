export class VFS {
    constructor(initialState) {
        // Deep clone the initial state to prevent mutating the original JSON
        this.fs = JSON.parse(JSON.stringify(initialState || {}));
        this.cwd = '/';
        // Ensure root exists
        if (!this.fs['/']) this.fs['/'] = { type: 'dir', contents: [] };
    }

    // Resolves a path (e.g., ../var/www or /etc/passwd)
    resolvePath(path) {
        if (!path || path === '.') return this.cwd;
        if (path.startsWith('/')) return this._normalize(path);
        return this._normalize(this.cwd + '/' + path);
    }

    _normalize(path) {
        const parts = path.split('/').filter(p => p && p !== '.');
        const resolved = [];
        for (const p of parts) {
            if (p === '..') {
                if (resolved.length > 0) resolved.pop();
            } else {
                resolved.push(p);
            }
        }
        return '/' + resolved.join('/');
    }

    getNode(path) {
        return this.fs[this.resolvePath(path)];
    }

    ls(path) {
        const target = this.resolvePath(path);
        const node = this.getNode(target);
        if (!node) return `ls: cannot access '${path || target}': No such file or directory`;
        
        if (node.type === 'file') return target.split('/').pop();
        if (node.type === 'dir') return node.contents.join('  ');
        return '';
    }

    cd(path) {
        const target = this.resolvePath(path);
        const node = this.getNode(target);
        if (!node) return `bash: cd: ${path}: No such file or directory`;
        if (node.type !== 'dir') return `bash: cd: ${path}: Not a directory`;
        
        this.cwd = target;
        return '';
    }

    pwd() {
        return this.cwd;
    }

    cat(path) {
        const target = this.resolvePath(path);
        const node = this.getNode(target);
        if (!node) return `cat: ${path}: No such file or directory`;
        if (node.type === 'dir') return `cat: ${path}: Is a directory`;
        return node.content || '';
    }
}
