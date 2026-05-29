import os
import urllib.request

# Target directory
dest_dir = r"D:\abdo_portfolio\main\static\main\images\tools"
os.makedirs(dest_dir, exist_ok=True)

images = {
    # General / Categories
    'category_recon.png': 'https://images.openai.com/static-rsc-4/dGf4_nBu9x_z2O2RUL0S4F6V8AniaFmB8a-v8kGgkyA3ShenIiaThbdAXhz6-Y3f_JIF47ekZ0y9qs7Z94P7ulMUsAzK9hmqEMkoDJsiT5QdbuJ-ikLbpgoqyca9CJUSg6TgZ1d8qqs0I_CjUNR_65WPs_cfFJNpposVZut28reNWkM7Y-I37nLaKI5FQVIm?purpose=fullsize',
    'category_crawling.png': 'https://images.openai.com/static-rsc-4/PD-K5cLi5ISWwGrRHehttk2ozFhkTznxD3ExKUdgdkWOX2aeBWleZnlsJy439xpL14pAR-Mml8teVtJIECSmKEqoyUDdM-_CLCt56iaydVpogjHOmYfKkv4Gs6LTgeap03HtiNmPhqHQIiR2SQQTjYgVv-MMCSBvNL07gU1Ga7UvszSEO2e1O__Enh27XqK9?purpose=fullsize',
    'category_historical.png': 'https://images.openai.com/static-rsc-4/k5C262OzF2yQzB6fFyVSPoI8gxK6xVJloSGkKVXEFJp1-b9xTcdOQ10Lc_WU9PFfY3TnvPHdZPXIvKpMQxHfwx0rkyCtV6kQBiKzLV6PlLz9ern6PRyz7eJB7AVD-M0iN7kgxOSa7Oqb7oSyXXa2WzYvdUPKwbrFb9ra9GVoMdqi8evG6LiRPMwL0Q7VkVe4?purpose=fullsize',
    'category_dir.png': 'https://images.openai.com/static-rsc-4/fwGpI3_S88sW245yMQcqIbhkerAMcYxyCH3qKREnlOYKUbl6k8xeaHxWQ7TlN-NxbWavuXGKP0y5dEbyO9MAYuFnMlEju_zqaeBIO0GLfCCMBhzLCKQ90CL-vzYXUkilvMGR-rj4__FVAsS0kid-Ol1Y7UXL3svTLYEzSYVieAJF8B0LDofu87Xe2OttoFvl?purpose=fullsize',
    
    # Amass / Recon
    'tool_amass_1.png': 'https://images.openai.com/static-rsc-4/hAcjaBG9eK2-BjE5Z010DoDlK6_xKEo0eZLow16IVCeLmVdbYF8OPQzp96lIVWucWwAMpAoKQlOaF06hW1hu4RzkldfofqnG1lG0wiczFyvf8IWkcB32I8z5F_bKpSmR3uZKFVP2Zhan3DqY85qD4-WsCGAoBWS1kEmj56pGtZmK6VYBOIumETU4VyF0AhL7?purpose=fullsize',
    'tool_amass_2.png': 'https://images.openai.com/static-rsc-4/JrYNhZsA9m-O61v2qhvkMg4bEg6mCvfp-n_xT2Pr5HP_GZa_qH68izzGBcTgEpGIwrDK-JjTSnU8cxEAzEKqK7ewxPVZ9BQqqjIo5Zkb6ecpWD-u6jZhqBi0C2nxASjPZNxPyYwDHrs7XA65PYfAlnTtf50OQHGFDH96ceolbvqMcGqXOWUwLmVH4r5Na2mB?purpose=fullsize',
    
    # Katana / Crawling
    'tool_katana_1.png': 'https://images.openai.com/static-rsc-4/a1Xdav-uixgtuQC27vfcR0WLZefx5BWVeVTpEtLrqyfnCZI-ryCVLal2J2IyF4ifXCELREhHOcQbaQuLLr_IqT0Yy9BH49t38bK-DfAWE4askaMw9R3StpkBwLufF8Rl3XWpq44jCkkVjjvqv5OH7BzwZTan2z7aTornaIwRt6yIXRS15NvmLptDLxoQEbZz?purpose=fullsize',
    'tool_katana_2.png': 'https://images.openai.com/static-rsc-4/iIEaHLCTN1UVgheiXyVgq5RTLANyw72OF8PG_H4QLT5k4aDuPD5D1L0ZrtUznBfFSXM9TJhpNTrsHmHy8w5EKvJq5J2fZmet05Y4ctgVuGk0acrVALTeE82g7EzI84zyVX0w1qqRXP1PqDPmAWo8BFMrvHtwT_yvp35PUUaMOKC4uka6BjSfxyYFDaCBrw00?purpose=fullsize',
    
    # gau / Historical URLs
    'tool_gau_1.png': 'https://images.openai.com/static-rsc-4/PyaC5xx18oTJWMjR-0oPEszYItSaaqrm9FxiXWsqJ2bOKFoC1zj49YrLcFSUtzlKwbsWLDQAeV5S-h2z80LKq45jFNo2JZECtwLJKTr-K6O5-04r4x0rKrnye2RRFGygvfJmpWCFTnRVOrh9oW0qd8D-f67Bpveob7ghBdjGlYjOOLYvGV9KOGSNUBrOyVX5?purpose=fullsize',
    'tool_gau_2.png': 'https://images.openai.com/static-rsc-4/JQBFKUeMyq8mC9432d1ipVm36IByui2vke3rvFCcgGGVkGH6x4OCPt63MTIz_k_Fxl4gLW04B7iWvn7SQMdMTwRIou_LOgzH85qtYLzZs8weUmc61EfWQhM2Poo9iDoQU1L-ne2xg7qCKhn3PXol2uwXZsDpPf3gFhAX1lkCFCszH4vFnDPo4y4u-NhVm6vZ?purpose=fullsize',
    'tool_gau_3.png': 'https://images.openai.com/static-rsc-4/jZ_rATCX3JPyGl6f6tFwIU4BBHsDPc7am-Ehtseq5J_etGFicDa6YczfJsRqxYqblFIQ64kNiPC7xH6MQ9sw_2UEMTCZ9kGPf8_PZvoS8Z_adgQe9VuAjJEqNu9FVHQzm-KX6sFDLLj17WmOfasjSpD0phktKD_Kd2i4wB6NTVnD_wcKW83k56KaajhbVz6y?purpose=fullsize',
    
    # Directory Discovery
    'tool_dir_1.png': 'https://images.openai.com/static-rsc-4/MYxRn1hzKIe2DLIPqZ7f-osQTM3JIoYS6Ko4MiiEpwvaEcRWBynZ_oe2iXybsYOwtMtCJ57OVi3hDoSiRF-YBC1QEaIBQHSQBvV_5v6sR53gSX79YEwx4yZV0CkBqh4YTWSdDyjvwieiGP2WH_H2q8kbRoAAg3BzBrYH0DpxeVbmjrgxIrwbmTo5YBVru08k?purpose=fullsize',
    'tool_dir_2.png': 'https://images.openai.com/static-rsc-4/g0G6zla59zm7834jT_SH7wxP1rfAka5PSsuEJryKs96QHGXy2-zXwD05TXXiQ3T0RhmdYML86F77yn-SLnpXVP_bC9yywtK1DjFOdsmsxDHirt9nuAivzk9XQpTvQV1YC9Cxqd3KPU8b-WvqWJbWJuGjUeyD6BEeGNRuAV7MTzmiawDeXe2Hillma1DolmHB?purpose=fullsize',
    
    # Parameter Discovery
    'tool_param_1.png': 'https://images.openai.com/static-rsc-4/PZQbRB9rAf0oV3UhMdiKy7tVFPdnGoRCOZpTRc6gDxxaO6fsok28l7i5KgsV29OgkEdl4hL0PTJGl2Fvnclg4cYocCloqwZYFDhLGZOxJU-xE_yyTYb2YzosAeWiI4qwSDseVe0xL-p-UQZxWTyDlkGaF9voLxzTpP1KyMD6IuyWE5clAjELHjdOJ3hFntqZ?purpose=fullsize',
    'tool_param_2.png': 'https://images.openai.com/static-rsc-4/lb1nfqVHTvuYpcW1S6x08HmxyCl9pOFF3875_cAEAV5Mv3cJQrHuavWYaTfzzxAsw_B6HkHHnRfuS1bLSklRGa7CFPiElmGNUaHDZVTkCaTqM_P-PbsUzoX1NxNS2xFyV0bSEqTAwDKWQ5njCxaeUln4ADiSR9fBpfcfvBCnx-iQfNCMQyYrqjkZwk1l91iK?purpose=fullsize',
    'tool_param_3.png': 'https://images.openai.com/static-rsc-4/x1SNUB0nit-o9Tc-7-ZCtF8Hk-90bZ8QRjQHCBgiBCwWUaQM3byzXwR3UWIOVxbCybQEMXAYhKXCIA0smYTImpcBd-1X2vIzUNc2b_d36EyrcSj9tkKG537f5uH_uB95apZIl9DQRtF7kfTh0n_4XC539-S-yjZSq9lmKO2iaOSTh3YrrAAB02x2z-6fvR_-?purpose=fullsize',
    
    # JS Recon
    'tool_js_1.png': 'https://images.openai.com/static-rsc-4/DhnZEkGytasN0VBWNJXcERf1_TeDcSHiod0BEFgW11a3RHSsMkOmDy_LPIkiCoXSo1JNWtgg_VWO6mj3n8392UXSkvLD-RByZUinIbmTbOzqGSebTCyBleyyYq9X0CHd4B9zfyvdb1GKALSnzVNu6NgnXtEXOfZ3ejw8IDC4ipClTeqKRnohDJcmbj0r1GyR?purpose=fullsize',
    'tool_js_2.png': 'https://images.openai.com/static-rsc-4/Don9qfp6AUxhDMq1qRcukML8yuBrxT1jjywEl9Z6SeaazKT3C7LBASfLD6OoI7PHVNFP-kOm6uh9syjD2cn1WR8JnRTmH9LUNbR8JB8U3CtZUjdi_yb5rgWwBTXCWzqy9j_0dSIPbeCq_4qyL05aPa1kGWJBNyQQBxTEd7cP-FU9Q1_plHH_wH82Jv-P-vZZ?purpose=fullsize',
    'tool_js_3.png': 'https://images.openai.com/static-rsc-4/v03Gxsa-Ak2T9eC-PoFj29EXg44CPX7bZJs-41VAHRbGCGDbO0fMaHgT4K8ULoUAkaMAdeJlBSSVdmfpl1PVgZC8quA6wjTCiAxDU48aNAYFCjiLj1nWc30K3fPIHReLtq51I2jXbIwduYbgjLTovF-MyDTJkpi__v58hllZGcOds56jTgNY5hOlVtHV3TGs?purpose=fullsize',
    
    # Vulnerability Scanning
    'tool_vuln_1.png': 'https://images.openai.com/static-rsc-4/pOkjtYhE_eHmCoMeBfCcZjhNxw2Dbsnhe_KOxrI-9Ts12WcmYjmwMHT5koRmrforqFV3uXKsVtp1IUrDjFuACzPVlyXadYZHfRX8V4J7ugXo3U993dpIHGuizAJPotic08IQYe8uGLvW-eFoETD2WCQ4-a_8QpFtl_UQugq3Nzragg98ZWjz0UzREpEXrnmd?purpose=fullsize',
    'tool_vuln_2.png': 'https://images.openai.com/static-rsc-4/J56xq6asesD2N8rqrYmfygbdqSCHXGr6Y3TSMDt5Aei_BAFj3Gqm3EXtpiGJYedOGqTzIQ1XJgcY89tvip6nQMgQ-kKzqG7i-uLaXqb3CH6MpdsmejPtaH5x2vv5qc7Oxsvw5HvQTl7BsC_Xa9Z4_8g_DtnXdYHrS9uj9eUQiPpCGuxWn4o5ke4pE1Oe4XfO?purpose=fullsize',
    'tool_vuln_3.png': 'https://images.openai.com/static-rsc-4/xxFZbRwqsC6fZo9vzFbzsT1_5rzEcqAQCpBZogchI8Te-P8QKavGVR_gMMyAAwBnkGCfSZ7MqZLfV5hIJknsRWrrHr6m-Hf1QvRvVLu0vfAGYJrVsPFkUd4kJfFB6ipDn_xRjntAly6hAwNmpDgLuF9HfAyox2yv8qsg1xhLRUVHiPBVEy_QvREtcAA8JtWK?purpose=fullsize'
}

for name, url in images.items():
    filepath = os.path.join(dest_dir, name)
    if os.path.exists(filepath):
        print(f"[exists] {name}")
        continue
    try:
        print(f"[downloading] {name}...", end="", flush=True)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        with urllib.request.urlopen(req, timeout=15) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(" [OK]")
    except Exception as e:
        print(f" [FAILED] {e}")

print("Done downloading all images.")
