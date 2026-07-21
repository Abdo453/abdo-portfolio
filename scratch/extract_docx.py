import zipfile, xml.etree.ElementTree as ET
import sys

docx_path = r"C:\Users\Computer Market\Downloads\Complete_Pentesting_Methodology_Guide.docx"
out_path = r"d:\abdo_portfolio\scratch\docx_content.txt"

with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read('word/document.xml')

tree = ET.fromstring(xml_content)
namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

text_nodes = [node.text for node in tree.findall('.//w:t', namespace) if node.text]
text = ''.join([t if t else ' ' for t in text_nodes]) # Actually w:t nodes don't always mean newlines.

# A better way is to iterate paragraphs
paragraphs = []
for p in tree.findall('.//w:p', namespace):
    p_texts = [node.text for node in p.findall('.//w:t', namespace) if node.text]
    if p_texts:
        paragraphs.append(''.join(p_texts))

with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(paragraphs))

print("Extracted to docx_content.txt")
