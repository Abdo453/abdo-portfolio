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

    find(startPath) {
        const target = this.resolvePath(startPath || '.');
        const node = this.getNode(target);
        if (!node) return `find: '${startPath || target}': No such file or directory`;

        let results = [];
        
        const traverse = (currentPath) => {
            results.push(currentPath);
            const currentNode = this.fs[currentPath];
            if (currentNode && currentNode.type === 'dir' && currentNode.contents) {
                for (let child of currentNode.contents) {
                    let childPath = currentPath === '/' ? '/' + child : currentPath + '/' + child;
                    traverse(childPath);
                }
            }
        };

        traverse(target);
        return results.join('\n');
    }

    grep(pattern, filePattern) {
        if (!pattern) return 'grep: missing pattern';
        
        if (!filePattern) return 'grep: missing file operand';

        const targetFile = this.resolvePath(filePattern);
        const node = this.getNode(targetFile);

        if (!node) return `grep: ${filePattern}: No such file or directory`;
        if (node.type === 'dir') return `grep: ${filePattern}: Is a directory`;

        const content = node.content || '';
        const lines = content.split('\n');
        const matchedLines = [];

        for (let line of lines) {
            if (line.includes(pattern)) {
                matchedLines.push(line);
            }
        }

        return matchedLines.join('\n');
    }

    echo(args) {
        return args.join(' ');
    }

    // --- Dynamic World Extensions ---

    _getParentDir(path) {
        const parts = path.split('/');
        const name = parts.pop();
        const parentPath = parts.join('/') || '/';
        return { parent: this.getNode(parentPath), name, parentPath };
    }

    touch(path) {
        if (!path) return 'touch: missing file operand';
        const target = this.resolvePath(path);
        const { parent, name, parentPath } = this._getParentDir(target);
        
        if (!parent || parent.type !== 'dir') return `touch: cannot touch '${path}': No such file or directory`;
        
        if (!this.fs[target]) {
            this.fs[target] = { type: 'file', content: '' };
            if (!parent.contents.includes(name)) parent.contents.push(name);
        }
        return '';
    }

    mkdir(path) {
        if (!path) return 'mkdir: missing operand';
        const target = this.resolvePath(path);
        const { parent, name, parentPath } = this._getParentDir(target);
        
        if (!parent || parent.type !== 'dir') return `mkdir: cannot create directory '${path}': No such file or directory`;
        if (this.fs[target]) return `mkdir: cannot create directory '${path}': File exists`;
        
        this.fs[target] = { type: 'dir', contents: [] };
        if (!parent.contents.includes(name)) parent.contents.push(name);
        return '';
    }

    rm(path) {
        if (!path) return 'rm: missing operand';
        const target = this.resolvePath(path);
        if (target === '/') return `rm: it is dangerous to operate recursively on '/'`;
        
        const node = this.getNode(target);
        if (!node) return `rm: cannot remove '${path}': No such file or directory`;
        if (node.type === 'dir') return `rm: cannot remove '${path}': Is a directory`; // rm -r not supported yet
        
        const { parent, name } = this._getParentDir(target);
        if (parent) {
            parent.contents = parent.contents.filter(c => c !== name);
        }
        delete this.fs[target];
        return '';
    }

    write(path, content, append = false) {
        const target = this.resolvePath(path);
        const { parent, name } = this._getParentDir(target);
        
        if (!parent || parent.type !== 'dir') return `bash: ${path}: No such file or directory`;
        
        if (!this.fs[target]) {
            this.fs[target] = { type: 'file', content: '' };
            if (!parent.contents.includes(name)) parent.contents.push(name);
        } else if (this.fs[target].type === 'dir') {
            return `bash: ${path}: Is a directory`;
        }
        
        if (append) {
            this.fs[target].content += content + '\n';
        } else {
            this.fs[target].content = content + '\n';
        }
        return '';
    }

    wget(url) {
        if (!url) return 'wget: missing URL';
        const filename = url.split('/').pop() || 'index.html';
        const target = this.resolvePath(filename);
        
        const { parent, name } = this._getParentDir(target);
        if (!parent || parent.type !== 'dir') return `wget: ${filename}: No such file or directory`;
        
        this.fs[target] = { type: 'file', content: `Downloaded content from ${url}` };
        if (!parent.contents.includes(name)) parent.contents.push(name);
        
        return `Resolving ${url}...\nConnecting to ${url}...\nHTTP request sent, awaiting response... 200 OK\nLength: unspecified [text/html]\nSaving to: '${filename}'\n\n     0K                                                       100% 1.23M=0s\n\nDownloaded: 1 files.`;
    }
}
