html = open(r'd:\abdo_portfolio\main\templates\main\methodology.html', encoding='utf-8').read()
idx = html.find('Red Forest')
if idx != -1:
    print(html[max(0,idx-50):idx+150].encode('ascii', errors='replace').decode())
else:
    print("Not found in main template")

# check if it's in the inject script output on RHCSA section
idx2 = html.find('p_rhcsa')
print(f"\np_rhcsa found at position: {idx2}")

idx3 = html.find('flashcard')
print(f"flashcard found at position: {idx3}")
