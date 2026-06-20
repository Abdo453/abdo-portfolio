import re
import os

input_file = r"d:\abdo_portfolio\scratch\docx_content.txt"
output_dir = r"d:\abdo_portfolio\scratch"

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

chunks = {i: [] for i in range(1, 11)}
current_chunk = 0

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Match primary headers like "1. Active Reconnaissance", "2. Content Discovery", etc.
    match = re.match(r'^(\d+)\.\s+[A-Z]', line)
    if match:
        num = int(match.group(1))
        if 1 <= num <= 10:
            current_chunk = num
    
    if current_chunk > 0:
        chunks[current_chunk].append(line)

for i in range(1, 11):
    chunk_path = os.path.join(output_dir, f"pt_chunk_{i}.txt")
    with open(chunk_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(chunks[i]))
    print(f"Chunk {i} written with {len(chunks[i])} lines.")
