import os

filepath = 'd:/abdo_portfolio/build/ccna/simulator.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add logging to processCommand
if "function processCommand(cmd) {" in content and "labReport.commands.push(cmd);" not in content:
    content = content.replace(
        "function processCommand(cmd) {\n    if (!cmd) return;\n",
        "function processCommand(cmd) {\n    if (!cmd) return;\n    if (typeof labReport !== 'undefined') labReport.commands.push(cmd);\n"
    )

# Log errors
invalid_block_old = """    else {
        // More realistic IOS error messages
        const modeHint = routerState.mode === 'user'
            ? '(run `enable` to enter privileged mode)'
            : routerState.mode === 'priv'
            ? '(try `show ?` or `configure terminal`)'
            : '(try `?` to see available commands)';
        term.writeln(`                           ^`);
        term.writeln(`% Invalid input detected at '^' marker. ${modeHint}`);
    }"""

invalid_block_new = """    else {
        if (typeof labReport !== 'undefined') labReport.errors.push(cmd);
        // More realistic IOS error messages
        const modeHint = routerState.mode === 'user'
            ? '(run `enable` to enter privileged mode)'
            : routerState.mode === 'priv'
            ? '(try `show ?` or `configure terminal`)'
            : '(try `?` to see available commands)';
        term.writeln(`                           ^`);
        term.writeln(`% Invalid input detected at '^' marker. ${modeHint}`);
    }"""

content = content.replace(invalid_block_old, invalid_block_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added command and error logging to simulator.js")
