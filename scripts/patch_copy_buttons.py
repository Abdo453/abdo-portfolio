import os

def patch_copy_buttons():
    project_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    books_dir = os.path.join(project_dir, 'main', 'templates', 'main', 'books')
    
    for f in os.listdir(books_dir):
      if f.endswith('.html'):
        path = os.path.join(books_dir, f)
        
        # Load file with fallback encoding
        try:
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
        except UnicodeDecodeError:
            with open(path, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
          
        # 1. Replace copy-btn position
        target_btn = """    .copy-btn {
      position: absolute;
      left: 10px;"""
        replacement_btn = """    .copy-btn {
      position: absolute;
      right: 10px;"""
      
        # Fallback target if whitespaces differ
        target_btn_alt = """    .copy-btn {
      position: absolute;
      left: 10px;
      top: 10px;"""
        replacement_btn_alt = """    .copy-btn {
      position: absolute;
      right: 10px;
      top: 10px;"""

        if target_btn in content:
            content = content.replace(target_btn, replacement_btn)
        elif target_btn_alt in content:
            content = content.replace(target_btn_alt, replacement_btn_alt)

        # 2. Replace code-box padding to prevent overlapping
        target_padding = """    .code-box {
      font-family: 'Fira Code', monospace;
      background: #040409;
      border: 1px solid rgba(255,255,255,0.06);
      padding: 16px;"""
        replacement_padding = """    .code-box {
      font-family: 'Fira Code', monospace;
      background: #040409;
      border: 1px solid rgba(255,255,255,0.06);
      padding: 40px 16px 16px 16px;"""
      
        if target_padding in content:
            content = content.replace(target_padding, replacement_padding)

        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Patched copy-btn and code-box in {f}.")

if __name__ == '__main__':
    patch_copy_buttons()
