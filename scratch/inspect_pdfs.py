import os
import pypdf

pdf_paths = [
    r"C:\Users\Computer Market\.gemini\antigravity\brain\429a135b-0511-429e-8032-643525cb7848\.tempmediaStorage\media_429a135b-0511-429e-8032-643525cb7848_1781795573883.pdf",
    r"C:\Users\Computer Market\.gemini\antigravity\brain\429a135b-0511-429e-8032-643525cb7848\.tempmediaStorage\media_429a135b-0511-429e-8032-643525cb7848_1781887783035.pdf",
    r"C:\Users\Computer Market\.gemini\antigravity\brain\a03d2a93-a1f9-4b80-abe6-f44d17fe009d\.tempmediaStorage\media_a03d2a93-a1f9-4b80-abe6-f44d17fe009d_1781924988637.pdf",
    r"C:\Users\Computer Market\.gemini\antigravity\brain\a03d2a93-a1f9-4b80-abe6-f44d17fe009d\.tempmediaStorage\media_a03d2a93-a1f9-4b80-abe6-f44d17fe009d_1781925016203.pdf"
]

with open(r"d:\abdo_portfolio\scratch\pdf_results.txt", "w", encoding="utf-8") as out:
    for path in pdf_paths:
        if not os.path.exists(path):
            out.write(f"File not found: {path}\n")
            continue
        
        out.write(f"\nInspecting: {path}\n")
        out.write(f"Size: {os.path.getsize(path)} bytes\n")
        
        try:
            reader = pypdf.PdfReader(path)
            out.write(f"Number of pages: {len(reader.pages)}\n")
            text = reader.pages[0].extract_text()
            out.write("First page preview:\n")
            out.write(text[:1000])
            out.write("\n" + "="*50 + "\n")
        except Exception as e:
            out.write(f"Error inspecting: {e}\n")

print("Inspection completed, results written to scratch/pdf_results.txt")
