html = open(r'd:\abdo_portfolio\main\templates\main\methodology.html', encoding='utf-8').read()
# The RHCSA section - find its end
rhcsa_pos = html.find('id="meth-content-p_rhcsa"')
# Look past the RHCSA section for the next meth-content-view
next_section = html.find('class="meth-content-view"', rhcsa_pos + 100)
print(f"RHCSA starts at: {rhcsa_pos}")
print(f"Next section starts at: {next_section}")
print(f"Text before next section:\n{repr(html[next_section-100:next_section+50])}")
