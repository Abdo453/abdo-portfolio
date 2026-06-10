import esprima
code = open('D:/abdo_portfolio/build/ccna/academy.js', encoding='utf-8').read()
try:
    esprima.parseScript(code)
    print("NO ERROR IN ACADEMY.JS")
except Exception as e:
    print("ERROR:")
    print(getattr(e, 'description', str(e)))
    print("Line:", getattr(e, 'lineNumber', 'Unknown'))
    index = getattr(e, 'index', -1)
    if index != -1:
        start = max(0, index - 50)
        end = min(len(code), index + 50)
        print("CONTEXT:")
        print(repr(code[start:end]))
