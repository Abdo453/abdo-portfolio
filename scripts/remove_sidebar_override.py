import os

def remove_sidebar_override():
    books_dir = r"d:\abdo_portfolio\main\templates\main\books"
    target_pattern = """        .book-sidebar {
          position: sticky !important;
          top: 30px !important;
          max-height: calc(100vh - 60px);
          overflow-y: auto;
        }"""
    
    for filename in os.listdir(books_dir):
        if filename.endswith(".html"):
            filepath = os.path.join(books_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            if target_pattern in content:
                print(f"Removing sidebar override from {filename}")
                new_content = content.replace(target_pattern, "")
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
            else:
                # Let's try with windows line endings or slightly different spacing
                normalized_pattern = target_pattern.replace("\n", "\r\n")
                if normalized_pattern in content:
                    print(f"Removing sidebar override (CRLF) from {filename}")
                    new_content = content.replace(normalized_pattern, "")
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(new_content)
                else:
                    print(f"Pattern not found in {filename}")

if __name__ == '__main__':
    remove_sidebar_override()
