from html.parser import HTMLParser
import sys

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.void_elements = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'}

    def handle_starttag(self, tag, attrs):
        if tag.lower() not in self.void_elements:
            self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in self.void_elements:
            return
        
        # Traverse stack backwards to find matching tag
        found = False
        for i in range(len(self.stack)-1, -1, -1):
            if self.stack[i][0] == tag:
                # Pop all elements up to the matching tag
                # if there are unclosed tags between i and end, print them
                if i < len(self.stack) - 1:
                    pass # We just pop them implicitly
                del self.stack[i:]
                found = True
                break
        
        if not found:
            print(f"Warning: Unexpected closing tag </{tag}> at line {self.getpos()[0]}")

    def report(self):
        # We only care about div tags for layout breaking
        divs = [x for x in self.stack if x[0] == 'div']
        if divs:
            print(f"Unclosed div tags found: {len(divs)}")
            for tag, pos in divs:
                print(f"  <{tag}> at line {pos[0]}")
        else:
            print("All div tags matched successfully.")

with open(r'd:\abdo_portfolio\build\methodology.html', 'r', encoding='utf-8') as f:
    content = f.read()

checker = TagChecker()
checker.feed(content)
checker.report()
