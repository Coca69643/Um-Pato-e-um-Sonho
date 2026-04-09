// =============================================
// Um Pato e um Sonho - main.js
// v0.0.7 — Joystick fix + HUD safe area guard + Assets Craftpix/OpenGameArt
// Three.js r128 — PlaneGeometry (WebView fix)
// =============================================

const IMGS = {
  idle1:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAC6klEQVR4Xu2bvy5FQRDGKUiEoEBuSBQ0JDRoFAoP4yWoeQ8PIxo0tBQSGhI9hT8Jx17O2jU77rc3fjqyszPn+803Z8+51+AAP1IFBqXZST4AAHETAAAAYgXE6XEAAMQKiNPjAACIFRCnxwEAECsgTo8DACBWQJweBwBArIA4PQ4AgFgBcXocAACxAuL0OAAAYgXE6XEAAMQKiNPjAACIFRCnxwEAECsgTo8DACBWQJweBwBArIA4PQ4AgFgBcXocAACxAuL0OAAAYgXE6XEAAMQKiNPjAACIFRCnxwEAECsgTo8DACBWQJweBwBArIA4PQ4AQLcCw8NDzx6aPD4+9UVzVVckADzar2APABSIZw0NRT87PbZu0xW3sroR/l6d0z+Kq6IwALj0nH0TANi1c4mMAQjHyMX5SWuuTmem+fvU9Hysniqc3lZcFYUBwKWP7ZsAwK6dS2TOPSAcNTlJv4yjKpzedyMoLBgAOW1nXIMDjMJ5hcUAxLp+dm7RJXUN74uqmI0AcOkn+yYAsGvnEpkDIDzVHB1+PnwtLy2Ya+hsnTaxqnHUNyMIAOY+SwfigLRGf7qiBEBJYds7D4ygNwUAUNJGDrEAcBDRsEXz4XvOq+Zw/x9eO/+2DPkhRFkAAF7bBQC/9Yzz+r4EkKPB6Nh4s2xkZDIMUV7zt9KVxZhHEAByFEivAYDgHpAUfW19s0F3e3OZxhhZEY6gcMnExLT84Us5DwHwpWF6fQ8AwH8BEF5nOI4YQe/KxJ5+ve4BAGi/OfZsBAEgASB2vLm/uzaffGKBjKBPZZL//QIA9/7r2hAAtZ+Cwu8CxR6mSnqEU1DiFASAkvZKxyZPQQBIi+i1IgkjfCbwSqr6/k+s/l6/igjrAIDgbSgAxKegVgBne3OtDl3bv4m9uW3cc3nQ/tXExd0r5Vvf7IlZxQgCQDYv14VNFwPAVVfTZrEn5ByHlsSaivUMyrlAz3yxvUpELIntxbX9mAMAYgQveco7cIbts2YAAAAASUVORK5CYII=",
  idle2:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADLklEQVR4Xu2cv05UQRTGl0ISogFJwGwkWmgjiTRooYWFD+NT2NBY+QhWPomVsREaSKxsTKBAE2NhIRaKfzJ7stzZO/fM7H6H5Ed1Q+acb+b7zTk7e/fuLo34kzqwJFVHfAQA8SYAAADEDojlqQAAiB0Qy1MBABA7IJanAgAgdkAsTwUAQOyAWJ4KAIDYAbE8FQAAsQNieSoAAGIHxPJUAADEDojlqQAAiB0Qy1MBABA7IJanAgAgdkAsTwUAQOyAWJ4KAIDYAbE8FQAAsQNieSoAAGIHxPJUAADEDojlqQAAiB0Qy1MBABA7IJanAgAgdkAsTwUAQOyAWD5iBfxq5EnEtV1YWsRJAqDRDvSmAYDXuYq4ZPrR4fuKNJPQ+zsPbZ6Ilf53flEmBoAm286fBAB+7+ojl5evJAAH++9SQttGcq1pPL6Rxm9s3s5NJkqlxzwFAaB+E1dlAECVffXBOQA2s201JYpT7YgWNMs0AJRsqTmOAcAczS1JPRTAjNNOiVyoN2gheiMAhu6bxuMB0NjQoelyAOzJ5+bW3ZT2zav1dL19785QuTR+/GQ/XZ+d/ZR0A4notGMAcO+hNoEAaOOjO0sJAHvyeft6cv/HLXoe+PTZV1rQHwcAULONGsQCoIGJjhS9nwHk7v/YE5FDV952orwTBMA5CeUxFACXFUBJ27l6bTUNW1vbDNV2Ln0LAkCJA/1j3C2oP/VoRAV0u9Rruv0g/svnTyVed46xAFZWrkep+gtzXfSLMACmEADAXWNtAsMB2H3wOK3s5Pije5W2Bdkk0U5EAHAjbhMIgDY+urPIAORmbB9BHPosUC5n5CMpANx7t00gANr46M4iA1DytLNdVe5UM3TlnIL+OwaAf0ZQAUNLqPH4RQOw0++8LVH4hYsaG5Rrlt8LAoD4XhAAogOw87P3heyjg/Ypig97t1LIt+8/0vWjl6fpWvXYYUmfVPbD3lvTAChB6B8DAMExtPM14OD5VifG3RfH9v+2Widfax0e698yc4gM0YIAMAeyBSlrdnFNbMHUFjdEWQGd7chxSsv9ukqUtc2kGWWSNSbWxC5uq2eUACBG8BusOlxwH0dzkgAAAABJRU5ErkJggg==",
  walk1:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADHElEQVR4Xu2bsU4VQRSGoRBDMF5jxBBJLKDRRBs0UePD8BQ0WkvDU/AwBAql0RYLEyzUQgtDxEKRhLlzcefO2dnZ/c8NHxUkZ86Z/b/zn53de5mf40eqwLy0OsXnACBuAgAAQKyAuDwOAIBYAXF5HAAAsQLi8jgAAGIFxOVxAADECojL4wAAiBUQl8cBABArIC6PAwAgVkBcHgcAQKyAuDwOAIBYAXF5HAAAsQLi8jgAAGIFxOVxAADECojL4wAAiBUQl8cBABArIC6PAwAgVkBcHgcAQKyAuDwOAIBYAXF5HAAAsQLi8jgAAGIFxOVxAADECojLu3PAwsK1PzU0OT397e7amq7L3SYBUKP9OuQAQAfxSpfGoh++2y9NM7Hu0eOn8d/unH6xORcbA0CVnitPAoBy7aqstACIR8qH929D3ZWVu+H3O8v3U/tx4XS3pyAAVOnj8iQAKNeuykoLgHjUWIpeGkeMoGmiAcDSUj3GAKBHcS2pUwBSY+fe6rolbTbGw/siF7MRANle6TcAAP3qm81uARCfavZ2xw9fDx+sZfOnAm4/O5C/L5qZEQSA4j7LL8QBeY16jegCoMvGXm5+YQT9UwAAXdqowloAVBCxIEX48D1+vRznST2ITXnt3HYb8kOIcgMAOGsXALT1TOX4mQRg0WDpxs3GsMXFW/KTj5cNFI8gAFgUyMcAQHAPyIq+8eRFQPf5+CiPMRGRGkFxuIdxNPQ9AACXGgYAY0GG1uK88tBFB3NA3GieT0QAwAGTQ7HWTRgHNJ9Osv988e3rp+KTT2ph/O7o5OR7CLvSp6CUWACo3n8TCXGA92No/Ara8jDVtl9Go+Ww5Cp+Lyh7DAVA25ZqFw8A8QiKy2dhxEdSC+eDrfH3heL45zvjD989jJ14b0M/iAEAB/j6B24XDjjabv564fqrjxa3hlF2+Ho1xI+WrjdOLWNOy8SrEgOAKjKWJwFAuXZVVroD8OPnr8YL23hz3GocTVFHec3/bUu5mTC743sAAKoYy5QEAGcyKR3Q+EwwK6PD1GKGIAAYROozBAB9qmvI/RcBgDVwwYn5jgAAAABJRU5ErkJggg==",
  walk2:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADHElEQVR4Xu2bvU5UQRiGoRBCIC6FkA0kFtJIog3aWFBwMd4ENDZyH16MsREabbHQQIOJsbAQC9hswuHb5cyZnzOz76w8VLD7zbxz3mfe7/zssrjAj9SBRak64gsAEG8CAABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFieBABA7IBYngQAQOyAWJ4EAEDsgFi+ugQsLT26zuHJ1dW/6o6t7biqWyQAcmy/HnMAoId5qUOt6acnn1KnmRj34uVr+3d1Sb9dXBULA0CWPZc+CQDSvcsyMgSAbSlfv3xudIfDzeb3JxtPXeupIunVXgUBIMs+Tp8EAOneZRkZAsC2mhDRqXZEC+oyDQAhW6pgDQAKmhsytQuAq+1sbe+ETOutqeF5URW9EQDevVK2AABl/fXOHgLAXtV8/HB387X7/Jl3flfBcP+keUvVjuamBQEgeZ/5B5IAv0clKppPvuyzHSvkes5jW1CfhR28/fWgWxAARviV5wAAzBMA22o6HjvHdiTlBhyvVbmAqAQAIHZv+esBIEiA13TXVZCf52TF6trj5oWVlXX7pjL19w5j1osBwBQCAMRGK3P9LABE7fq9V2+aQ7w4P0s+XNuC7CSDwYb85mvW/RAAHduIBCRnLM/A/xaAtce2I1qQZ+PkOgcA4M4ByTkAAC0AQrrmz8vvIWVRNbSgCLsAEGFWYGnUvxwBINDVxDLv+cB+Cua6mUrUHg97iFdB1i8A1P4siAT0yXfc2CYNZ8ft3+3ZffcjbsaAatX3f1xLm8WdsEsbACNnABCQmpIl1QH4/edv6/HuvT9vff30aDukXnmcnfyUC2ttQQAombfJuQEgPge03h908LdpbeDZFjRYXW4dvnP4zb6uTP299dWymJDHFQAo2J0AUNDc0lPHwiu9nqj5a2lBUYueKgZAH/cyjJ1rADdzj01wCmL+RgAAAABJRU5ErkJggg==",
  arvore:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF5WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgMTE2Ljg5ZDYzYTAsIDIwMjEvMTEvMjgtMjE6MDk6MzMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDItMDhUMDE6Mjc6MjkrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAyLTA4VDAxOjUzOjA1KzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAyLTA4VDAxOjUzOjA1KzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJmNGIyNzQ2LTYwY2QtYmU0Zi05MzhmLTUwYjk0NzY1MWU0MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2YmM5YzNmNi02ZTUxLWQ2NDUtOTdiYy00YWViN2JhZWMzNGYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YmM5YzNmNi02ZTUxLWQ2NDUtOTdiYy00YWViN2JhZWMzNGYiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZiYzljM2Y2LTZlNTEtZDY0NS05N2JjLTRhZWI3YmFlYzM0ZiIgc3RFdnQ6d2hlbj0iMjAyMy0wMi0wOFQwMToyNzoyOSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZjRiMjc0Ni02MGNkLWJlNGYtOTM4Zi01MGI5NDc2NTFlNDEiIHN0RXZ0OndoZW49IjIwMjMtMDItMDhUMDE6NTM6MDUrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6XQ4jFAAAO50lEQVR4nO1dTUxc1xk9wzCElDIeHGb4ixUSJxhwVCzLMokIiSw5khdxKyvKIlHEohsidVGpVXZVF5V3lbqLFLZWlU0XSGkXllLJkgmqHTmWIwWDTRxPZQPjN9ieQMdMGA/TxeW777v33YEh8c99vHskxMybN48375zv9313iFWrVThEFw1P+wQcni6cACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nACiDicACIOJ4CIwwkg4nAC2AHSR/p33Uraxqd9AraCk52/NBdLH+mvjoz1IH2kv0rP6Td/X/7SXOzJn+1PhxOAAekj/dW+E13K85GxHuX5b/6YCexHr4VJBLteADohumWb9h8Z68H0mQX0nejCwMEKAJ/kkbEetKfLAACd/JVC5dF/gMeMXS0AslDurnVLJhGQMDpfywAQROe9DQDAwMEKlvMiXSLy5TEyDdrjTKi8QGy3fEMIEcgJJQu9fnYJgCCVMH1mQXl/wJVnzIQDQOvedQDAzWstclt7uozZmTgA4QlyFzzw87EVoRYAd+fvrSUBAP94dgVAbUIB4MZ1ldTRcyUAwDenWjZdvsByPhEQAJEP+AKgfZpOi+NMHWuW++QueFaLILQhgFv40GQRY6/3oPdwK/DJnEIAIFz47Iz/fH9fAoAQwui5EsZeF57hzOQC1g+K987OxJHOCBG8eKAIAFi91ySPsXqvCe3pMpbzCczOxJVz+Msnc1KINpMPhLgPkL80F7t+dglDk0WM7kuh93ArspdXMbovJS0agGLRgO8J8t6GQn7v4VaMvd6DptOlTfLFfkQ+IKx/9V6TIoT2dNl4Du+tJUH5x2O7CI8AofYA9Hj+7hrwec5/DODo6Bq+mnpW7i8SuYR8TqQBgnzC6L4UMFnA4nirQj4grN4UFmqdQxiqglAKgGfzU5tunJB78COmjjXjONZxdHRNWmvr3nUpgLy3gW74RBFu3i7KbaICUGM84HuEm9da5PapY83GcwBEVWFzVRC6JFAv5QA/lgOCjP19Im7zJK1177pC2sVpkfx1/uIZvPKc8BTzd9ckeZQncPJ5PgAIEVCpuFKoKOeQTMUVD2BrMhhKAQAiy+fxnC728Ii/L7lrnrnz+M1FAGBL8ul4gOoF+H4Xp8V+yVRcvodKUBvJB0IUAjjxBLrweS8uSQPKgddNWM4nsL8PmAIUyyXkvQ20p9X9CXr9TyDxXZxWY7+t5AMh8QB6z13P7AFRth0dVWM6j//6Ng7dclcKFSRT8c3yMa70EKjho2+jcwBEpcF7Dba6fyAkAgBUDzA0KVzw+p+aFcsEYMzcTQKgbav3mhRCZ86X0dypunFTV1AXAeUCtRpOtoogVH2AkbEe2XD58+/6ZeeN0J4uByyck2/a1rp3XSHt4JsJGU6GJotSbCbkvQ0j8YT9fQnkLnjWkg+ERACU+XdPrAYaLt0Tq2hPlxXrNLl5auDo3oDHc8KN62VFaN0Tq8bzIoGQCAAoj+U2S8kHQpAEUvxXanet4VIPuMvnoHYu4Lvs0XOlgNCmJgrKvQISCCBayJRAJlNxWZXkLnjgQyQ//So8PljtAfTkb+pYM3IPfsT83TWlZud5wHI+sWXSp7t/wI/tfiUhxHXu85zSHKJSs+l0sIVMlQSv/Ttfy2D6zILVHsBqAVC/n2rpZCouRcBr9ry3geV8ItCoqQUuEt4hBIQIagktmYqj6XSpZguZRODNVVDKPaqr8HhhfQgAgFRvRloWiQCA7Pi9eADGWE7Wr8d+HXlvQ0niSjm1vUvkE7ZqIXPYnPwRrBZA+kh/lSZ0eK/9m1OCbJO1U3tW7xXQjRzexaPHR0fX8O9/CrEMjwCZfkE2Fxold18MNOPtWbX6IC/xxUAzkAMKWQ+p3szP+/BPCNb3AdJH+qvvrSVlzAWAM/9ZwDenWmTj56upZ5W2MEEf7jCBErZkKg5vroK33vVfM9X66UwDZs6X8fas2kL+YkCIpZD1wKeGf+bHf+ywWgA6+ZSVA74IAATIT2caAl6ABNCeLuPitJ/wEal8/o9D9xoEEgGAAPmP6vM/CVgpAOr66eQTdBHw/IDEQLU77xbyXgG1f3nmbwod+ggYHWM5n8DMefH4rXf9NrDtN390WFcFUOlH5d/N28L6iHT6TdtXChUcP7mO/X0JacndE6s1u4WEZCqOZCqutGvTmQZJpA5OPuGtdyFDBglnZKxH1v62TwMBFgqASj/C/N21gAh41n385Lrimk3jWeQNyOo5yTy7f/FAEUdH19C6d11pHJnIN2HgYEWGEi6EHV+EJwjrqgB+wfRJGwKvzY9DbebQ6/V0C313L37zygDwZwD5sXn/gITBE8x0xs9FuJBthVU5gGmpFU3aUMYNsLGvk8H2bq0hDw4e97ca+yZs1Ucw9R8IXAi25gTWCICTr2f1fNwKQE3yeU/fNJ7FieeoRwRbgU8GLecTxhtCtorAGgEAwXk/npVT/AYgyefQLZGSu+3IJ+iz/zwHMAlC/3v6rADgC9nm+wHWCmDmfFlpygBBy9TJ0Unhs4KAWiaa4jo/LuCv9Hnmbw3GW8w89uteRG8i2SoCa6oAIn/mfBkz58vI9McxOyN+6EYPgS/OMBEjj7lJAJV8AM361Uc+lZI//iHo0oHgxDAHrwhshnUeINWbkb14IDhpwxsxJrdLoEkefp8eMHf6+HEByDt+x37diezlVdy8XcTULXWxiCn3IOjEe3Pib9rYKbSuDOTk69AXaHAS+AAnNYIAAOfUbiEXylYrgE2lpF4i+usC1LEw3lqmz+TNVZDqtW+RiFUhQL+DZpqzA3yL0+/lA1DIp2GNockikqm4kghudexa8wCmki+daVDaz/QThmVhgIUeAPCnavQ7cd0Tm6XgeEJp2pAIhiZXt13vpx+XsJxPCPJQAsZbA+sFhkeA5XywWUTgI2IAgHP+mFgpJ7zA9bNL1nkBKwTArd+bq6C5U2y/cb0sY7e+/FrcCQxaZL3DGgThqhOK5zgzsSBFAKirjYBgtaF7nezlzeebImjutDcPsCYEEIh8AHKsytTf16dxAXFbllz3zdtFST7dr9end+lWsClsdE+sIpmKB8gHIKeQ+Y0nei//zWcFmzth5ZCIVQIoZD3lOU8ITUOagDqb39ypioCTz4/FhUCj5kAwbAxNFmV4MVULVFFsd8eSvi7GRlgRAmiChltIKQckU+KxPoYlSeXH4CJAszKsoVcWepa+Xdig9m6txFFWCc+3GO9YpnozyF2wc0zMCgHo0CdqM/1xI6k0yqWDRECPOfRSzXTHUVkmrh1b7z+YZgT5MWhaKNWbsS7+AxYKwDROvVKoKKTqr9E8H63po/2FF4kr++pWTFPGpi944GUjNZYWx1uxnE/gxvWyHCDl4uTHIKFSAmgjrMkB8pfmYnoOoF+4TH9cWrSpziayda+wUqgEbgjxEGBab0ArfAAoE0Y0XJJMxXFxWhw70x+XuQf9mEIPlYA7uS6PG9Z5AMBPBlO9GSkCupjJVBylnFh4QWLQhcJLSR1EYP6UX8qRF+Fj4ABklm9aJpY/1SK9jRSB5qG8ObHd5jFxazwA4HsBU5wki9fJ5iGDv0aZN20r5VRLNq363d+XMN42rlWB6OdHHop++N/XvZstsEoAgD9NW09IMMGbqxgv9tuzwQWfQ5PFmi1bvhDEVFbW+tsc3AttJe6nCStDgI5C1gOywUZKPevvKBkEtp8VNJV6pgrEFF7ELWdz+LGt/cthnQfg4FajewTdyum5bmUUCmpZsqmM1L9KlpI8Tj7Ffv39mf44Srn6xGkDrBYAoC6wqCUCIp2TbwohPFPnWXop57vvWkMcB99MSPL10pL/5shd8KyN/QSrBkLqhf4179u5VtOtZsCvLPQeAoF/aZS+Td8OBK0+DOsErfcAJuheod73FbKqRZLV1yontwInnxNvsnhbyQdCKoB6EIvF5M9W0BdvEJk8LNSDWtZf9wGeEnaNADjhOukD3ioKWQ/DD9T4zq21VtKmf9vHVn0IUy5iO0IvgHqsHACGH2ygrWUPTsRaFeKHH2wot2sLWa+mGGj7dl8BExbygRALoF7iR/d1V5uaGtHWsgdtSTFE+v6e51DIejgRa0Vbyx4MP9jAViUmYHbx+u8wEU8IRSNIR73EA0BTUyO62jKS/PvFH9CWTOP9Pc+J5yvrQgTFH3BxUxRnq+r3AvJ7E/R8+etrMQDhK6E0hM4D1Ev+oVd68UJHNwCgLdmEwQ5V6/SchNHWskeKgjwE4JO9/PW1QF+Bbw+j9QMhE8BOyL+/so6l+x4GX3gegx2NuHrnIQY7GvFSVzogBkB4hsGORtwv/oD7K+tSBAOe7w2I7E3rV7Y/go/3VBAqAdSDqVuLsSvzWfz3ziJ+/9tfSbK/X8oH9tW9AAC8c6hLEcEHb7wswwkQbrJNCE0nsB7rB4QH+PijwwCAhW/Ff+66euchvl/K451DXYH9yTNcvfMQgC+Kf10R/YGV/xUxdWuxrj8elmvJEcoksBZG93VXP3jjZYV4QFj/+IcHsPDtiiRcx2BH4ybpIkS8c6gLPa+K/0WIT1GtVwRhw64SAOGzL78DACR/KaZ+OPmEnleTilAGOxox/uEBTPz9Gr5fAl7qSgMQr3/80eFdK4LQCKBarW4bBqZuLcbwpSBqdF93dfzDAwAgyb8yn8WhV3p9ywbkNtqP3vPXTy/jyrzY5wO8XNf5hRG7MgmkUACo5FOCqOPKfBZX7zzE1TsPpVegPGLq1mLssy+/qzsPCBtC4wGA+rwAh06+6TUA9NqmCfeCXD9hO/LDav1AyAQA7CwUKM8ZTMJg+1TJ9ddj9WEmHwhRGahjJ55AB9X1P9eth/XacYRWAA6PBrsuCXTYGZwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOJwAIg4ngIjDCSDicAKIOP4PmPYm21FboIkAAAAASUVORK5CYII=",
  rocha:     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF5WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgMTE2Ljg5ZDYzYTAsIDIwMjEvMTEvMjgtMjE6MDk6MzMgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMDItMDNUMTQ6MDE6NDIrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTAyLTAzVDE0OjM0OjEzKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTAyLTAzVDE0OjM0OjEzKzAzOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmU4ZGU0NjUyLTU3MDctZDU0NC1hODE1LTcyY2I5YTkyNTJkZCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpiNGE1NWVmMS02YzYzLTRkNDgtYjJmYy1jMTk5Y2EyNzU0MWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiNGE1NWVmMS02YzYzLTRkNDgtYjJmYy1jMTk5Y2EyNzU0MWIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI0YTU1ZWYxLTZjNjMtNGQ0OC1iMmZjLWMxOTljYTI3NTQxYiIgc3RFdnQ6d2hlbj0iMjAyMy0wMi0wM1QxNDowMTo0MiswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOGRlNDY1Mi01NzA3LWQ1NDQtYTgxNS03MmNiOWE5MjUyZGQiIHN0RXZ0OndoZW49IjIwMjMtMDItMDNUMTQ6MzQ6MTMrMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz78b3tmAAAFgUlEQVR4nO1bPWsbSxQ9it8PUCHUiiUggQRCAtm15caQTsXDhpTBaQImZYqAEaTIe6XLmDQBg40L166s2jZYCCywQGzcGhf+A0IplLu+Gs3szsfObuC909j62N055565987sqjCfz/Ffxqu8B5A3/srrwt1Oe8V6lze3hazHkbkARPzHj39QKhcBANeDq6XPgOzEKGSVAzhxABF5AHh6fAYAhONJ9N7B1+8A/AuRiQDdTnsuEifS4msCiUFCAH7E8CoARb3/6R2CetX4eO4IwI8rvAjAiQPA+ubGSoR1IApAOPj6PTURUk+C3O5E4HpwZS3CcBSit7sN4GW69H9fJw0RUu0Dup32nKIOAEG9iuEotDoXkSXywEueWN/cQP/TO2kpNUVqU4DIy+Y6OcHEBXSMKneUykVcD66WkiRgnh9SmQJx5IGFjVvNwPi8w1GolTzJdcNRaDw1nAUQbS9Db3cb5ycXAPRcUCoXEY7jr/v0+LyYCuy9hchbRiKklgOSItXb3UZQr0Zdnw74/NdFqxmg92ZLOz84CaATfRFJQtHc1kmeNlVFhLUAosK8tc0Kqj6ht7ut7QKrHMAjzxNcqVx0igqPfpL9w/EEQb0aHWMLYwd0O+15780WAOD4bABgIQINolQuenPDIjlOIvKE9c0N63MaOYDI85LG/+eRoAHKxJC5JEk0HmlO/unx2UlwbQFk5Bu1ijKp0fxUlTOyL4cq+anIq85rAus+4PhsgEatopz3fCDheCIlJorDvxOOJ5G1dckTqOfQgbEAQb2qzL5xx/DBn59cKMvc3f0DGrXK0uc6SfH4bIDPB+/xpf8NjVpFe2y57AlyMqVyEUeHpwAW5OkvF0G3IfrS/2Y8FqMqcHf/YGQvHTw9PmNvfwd7+zto1CpR9EgMm27QBFYOsF3iqkA5ZG9/Z6mS6JB3LbnGfQBFJm2ITZBr5HVXn6kshlyjwMucDXHKIRy6LrUSgCcruriNCNTZUeR1yhyvQKVyER8//OvkylQcIIqgKwZFXafMEagMh+MJjg5PjUqeDM4CkPomIlDkATPyBNprbDUDtJqBkwhOAoglS5yLfGFE/5PlATvyssWWiwjODmjUKnj792b0WpaQKMlx4jallIiL17C56UJw7gSp3LSaQURKJgJ9bzgKo05PN/o84nTupDKnmxidBBAHwUUQQcSBhWtsdoll5IN61ak7tZ4Cs9lMWrpUxGxKFZ/vKvKuMLox0u2059XXrwEsBFhbW4usLFshytwgukC2L8BxdHgaTRngRQAiz6MvijyZThNvlBjfGaKNRhICQKwIMpgmQJlowOq6PxMBgGUnEMQIJUFXBJFUXLmzESC1GyN0cd2WVkcoHnn+niyfiOfTIQ+kvCFCc/X85CIqcbJpQQLRrjJBjK5uc2NTUQip7whFC6XfW1OqWs93b1xaWVnp1Y0+4GlLjBOKS1RxxGU9hugYYDWXmJAHcnxOUIYkKzdqldh+wpQ8kJEAvA2O+1wFnW7Pdk/AiwCUDDkxE/JiFSHyPrbjvDogqdbf3T8sVQvx3kHSseJy3AbeHpaWDUr2HhHl3Z2MvIqkqyusH5KSdYMEMbsnDTKpDPKGKO0kmMnj8q77dvyGiQo25AEHAS5vbguT6VT7+5zEbDZb+szVxrbkAUcHqESwIaR7jCieC3kgpQcl41aHHESS9hLioDpeFNz1cdlUnxSNE4FHOE6ApOWua8RFpNYHXN7cFkQRVLae/vwJHcdw+LonmWoVoJwQlxx1Eifd8BAfx/EBbz+YUD2jJ3MKsEpQXOb6sD+Q4W+GROgmTuDF/j4E+KN+Nyjb7vJJHsjRAUB8O83hizyQswCAOldw+PzpXO4C5I0/Kgfkgf8FyHsAeeMXgiZ9YhIfvhsAAAAASUVORK5CYII=",
  rabbit:    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAADEZJREFUeJztnd1rG1caxh9pd5GDHUiTEbaIMUmwWslOsJWlou6iQk3skC7ZXKbJRUgJlEJhC4Vt/4RSCnvRq73okqWFhu5dXdruJiYsmDjg7sY2cSQnMgoIF9tooqpI2rV6kdmL6B0fjWVnzsyZc5zo/G5ifWSeM8955+vovO8BNBqNRqPRaDQazd7k1Mhx69TIccvvd5z82nfLOgQydnpxKeTnO1613734Gr202m3fzXfa4ToAVBtAf7vRF92GUyPHrfOTaRhGF57WAaa5ueN3/GCamwjPFnb9Tnkqi8evHuParqsAUGkAG9m0bTg6mDqeaaPQNgBAqVJHeLaA85Ppbdsmf8pTWZSGekVJbtPvbe7jTvqYLaBUqXNt1/UZQKUBFP1hABd6DIpya3pxKUTa4dkCMFtAGeA+Cp5Gc1+tCz0GwrMFjKeH0Wg0rJnlfCiTiFvj6WH76Lw5d0/4GdCp3w6v+mG3Dbg5d88WGk8PI5OIWwAQtAHTi0uhr67P4VrNxEYzuMKzBQxEDyKTiFsD0YO29sZQL67VTHx1fU54JzQaDVu/N7uBmGEgk4hbMcNAb3bD1m80GiJlWyD98fSwfdY7NXLcGk8Pt3zOg2uTMom4dSZz0t7Zf4YaWDNNxAwDp62I3YDvZ+5gZjkv1HyCdnogehBjqUH7/dvzKyiWykAA9x8s5MHKw7Vt+oNHY4HuO5r7f6HHAADc2vcY+dU1xPtj+N3/nhzH12om9/67vgQ0d8w2YCKVtD+7JcmA6cWlUCYRt8h8w+iCaW5iLDWI/DczgWqD8eDS2cw2/c8l6KN5kFEAkg/kP+ZM7u1xNziTiG8zAIA0AzKJuLX2uAcA8MmVMfzpr7cBALFwrWP0Rfrv6h7Aycdfz+Pjr+e3/S2L/P07wNZTgf26U/RF+u8pAFQb8NHbb+LDcykAwIfnUvjo7Tc7Sl+k/54uAWcyJxE90G2/V6rUA7/+t2vD4x8KCL98TKq2an3R/nMPBbM3g6o6AAAWckX0HY1iPVeUKatcX7T/nn8LUN0BfdEX0GfsBwCsmfx3v8+6vij/PQeAKgPYU6BhdCF6oJvaYcm6C1epT4jynzsA9ooBNObNO/b9rOuL9t/TUwCaO26am0o6YN2sInqgG6VKHdED3Vg3qx2lD4H+cwVAJhG34v2xtgbE+2P27wNBQYMgtWoNaHYEANSqNVw6m+kIfdH+uw6ATCJuvf/WBMZSg20NGEsN4v23JgIzgfRZ1ks/tbzuBH3R/nOdAZynHNYAOiUFyW6nvE7UF+E/149BkUjE/umxHV9dnwtsPEDrB6Pv+gxAvzvfnLuHXxCGYXShXK3CMLrwC8K4OXev5Xdq0Wh9tfp2I+CYfer8OzBxra9cX6PRaDQajUaj0Wg0Go1Go9HIIIgaAbo+AAeqU+SDyNDmCgDVBtDfnVojwM3sH95ZQlwFIlTWCGimpdv62KFGAKMvtA1gOuD8ZNpOD6fPMom4dX4yLWWaXLNewrYUfce+u4LrDKDSAHabFAzOGgHwcAS4hXL0SaeZn2fXCKB8PQRcI2C3+QC07zz6rgNApQGkjWZuPMHWCGA7nWoZBFEjgObhAUC8PwYAVvNfoBmoQdYIoGlgbKEOOgBKlTr3BFWuM4BKA5jOtAaiBwEAg0djGEsNolSpY+XhGgCgWCoHViPAmSLP6suoEUAHQp8xjFKl3vYAyBaKXPvvOTeQDKDZqfRaRpoYnXGYekAwzU2pKeqq9E+NHLeGjg2gVq1t879nfw93AHjODWQNoAQFWR1AmOZmS468bFTos5dip/9eSuN4TgwBk56sogPolEfashNUVOrTJdbpv5dLr+eBILoXUNUBzpsdFdlBKvVF+e85AFQawN6M0TVwPpeXdvlRrQ+B/nu6BMws50PzuTwA2E8Esg1gtdliCZ2gL9J/X/cAqjsAWyODHakvwn9fAQBFBjgfwwyjS0py5l7RZ/Hrv6cA2CsGqHwKUakv0v9n9jHQ2YZO1BfhP3cAUI56u+dgWTUCWH2iU/X9+s9110g56uwvbvQYRH8bRhf+fPVGIE8EWl+8Pvc4AImvm1X0GfttcVnjAFpfrL6nH4NSyfiOnwc9HqD1xepzTwkbTw/j+5mt0qRnMie3vY5EIsKnQ2l99fp2I9jXzpsOWTnyWl+Nvkaj0Wg0Go1Go9FoNBqNRtOZ8Obj7zV81wcIKh3cLexQqOxJqZSRm1t5hHYZy0FC++13n30FgEoD0GYVTVyFEFPcQAmZuZVHmH+wiiDrAjhh5wX4XarHcwCoNABM55cqdSw0V86y58ldDXb9IkqFL1XqmH+wiotvjKA8lUXJw+rdXrRjhgHT3NxxKXkePE8KbWuApOwgZ+dPjCVx2oogPFugs1HgkPZk+iWUp7JAQHUB2jExlsSN2zkAwOVDh31NQ/OVGraQK2JyLCnNANrReH/MNmA0OWAfCX979CMw82NglwBWfyFX3KYt6x6EDrSNoV70Zjd8bYsrAFQawK7ZY5qbdj5+b3bjSccHfO1vp0/my+p88p9qIYjAdQCoNIC0aan2D8+lWjpfRj2Cdvq3Hq4hv7omrfOd/ovA1T0AawCZMHg0hlv7Hkvp/EtnMzDNTXTt625ZKVtW5++kL7vznf7Hj8R8e/DUAFBtwHB4K/XpvckX8dkHV+xZsalkPPB5+Kr1d/P/0y++9e3/U//zO0MnrN/+/uWW99hiRDKygsnkM5mTADMFmtbODbosjUr9oP139R9VdwDbDpoS3Wfsb8mKlVGeRpV+kP5zZwbtZgAkjMI5F09m8+JkBYEq/SD85xoIosIEJM6mJl86m8GZzEkpGcKs+XdX1u33n3f9IPz3NBK4kwHRA91STPj8m5mtFKnSTy25cc+7PgT7zx0AuxngtRFeWXm4hr7oCy3vPe/6ov33VR+ANaBUqePuyrpds042nagvwn/PAdCyirVZxUKuiNdfOWLfFAX9jKz1xej7rhGULRRRq9YwmhxoW7Mu6FOx1ven7ykAIpEI0BwJnF5cChVLZVvYWbE6iMcirS9O/1e84jQL6O//+Df+dW85RCnL8w9WEbJCqP33FyDAEUKtL1afu4Ht5gA6J0U2Go3ABkS0vlp9jUaj0Wg0Go1Go9FoNBqNRqPpIJ71ugCEr+xgKKoLoLomAJprGCcHD0FWNvRO+K0TwB0AKg2gnWVy4+E3P54HSok3jC58+d0i4FjEWUYbWFqWjvGYEs9dLVyVAWxRhGvfzAPNzGB2FfMg9YlSpY7wbAEX/zCCL79bROrFfpyfTKPRaEhrA0t4tgDz1WOIGQYyCX4fuCeElCp1lKeyuPjGCOYfrKJUqeP8ZFrKJMzcyiOEZws4bUUwMZbEQq6IUqUubcGq6cWlEC1NX57KYjL9kt0G2WQScevyocMAgBu3c5gYS3raDtcZgBYuvtBjPDHg1Zdw43YOo8kBT+I80GqdaBZFCM8WMDo0YFcHoaXsEfB9wfTiUqjRNJ9tgyx9JxtDvYCPIOS+B1BpgL3dRDMQssDo0ABWHq5hLDWIsxPHn3wx4BIxM8v5EBKwLh86jN7sBnr2/UaqfjuoZkAmEefS9vQUoNoANhAuZwEMxQDATp3+5MqEtCCI98cweFS+PktPl3f/PT8G7gUDqA1n8KQ4U/7+HZwYfZJKLePmkC5LtP8y9Wnf/3hk1H7Pi/++poXPLOdD+dWtciX5+3fQta/bNkBG7nwqGce6WUWpUsdnH1zBe5Mv2p+zuf3Po/7Mcj706Rff2q+9+O8rOnfLVgWA/3z7A/6SvRtYyvRu6dKQUDNIpT4E+e+5gSoNYAtEQlHBCpX6EOg/9z0AnVZYA6gR62ZVyrp5rDabIi2jUMVe0IdA/7nLxFFxBEKmAWzUA8DdlXWcQJ+0Jez3ir5I/7nKxDnFZRrg1KfUaDrtyajOsZf0Ich/12XinOJsbrppbgZeI8epDwB90ReEFk18lvRF+e/6MZCqUtxdWbeHHWUZsJO+TPaivgj/XdUJpEcN09zE668cwUKu2JKBGqQhWj9Y/V0DgB1IIBHT3MRocgC1ag3ZQtGzsBu0fvD6uwYAe02h0S5qSLFUxvTikj0SSDnrItH6wes/9SmAxrtpyBMA1so/Yzw9DJoIEolErHcvvoYgJoZo/WD1XT0GUiPYKLs597M9H5DmCfDtmnu0vlp9jUaj0Wg0Gs1zxv8B3MUl7R1ZZ7IAAAAASUVORK5CYII=",
  healthbar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAB4CAYAAAC3kr3rAAABe0lEQVR4nO3bMXECQBRF0WwMRAM0KZiJAiQgIhZiICIiBBWU6IAaBWCAvcU2pDhHwW/uzGv++Dr/3N+Ap95ffQD8ZwKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCAWDN+Dx++0mHCRMLgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAIAgEgkAgCASCQCAIBIJAAFgzbqcPP+kwYWJBEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIBIFAEAgEgUAQCASBQBAIAGvG5XfrJx0mTCwIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAIBYM24HvZ+0mHCxIIgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAIAoEgEAgCgSAQCAKBIBAA1oy/3cZPOkyYWBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBAJBIBAEAkEgEAQCQSAQBALAmgeqxQ8QKKDTTwAAAABJRU5ErkJggg==",
};

const WORLD_W      = 2400;
const WORLD_H      = 2400;
const PLAYER_SPEED = 180;
const ANIM_MS      = 120;

// ---- SAFE AREA (Android WebView fix) ----
let safeTop = 0, safeLeft = 0;
function calcSafeArea() {
  // v0.0.7 — guard: safe area nunca negativa e nunca maior que 20% da tela.
  const style = getComputedStyle(document.documentElement);
  const cssTop  = style.getPropertyValue('--sat').trim();
  const cssLeft = style.getPropertyValue('--sal').trim();
  const rawTop  = parseInt(cssTop)  || 0;
  const rawLeft = parseInt(cssLeft) || 0;
  const maxSafe = Math.round(window.innerHeight * 0.20);
  safeTop  = Math.max(0, Math.min(rawTop,  maxSafe));
  safeLeft = Math.max(0, Math.min(rawLeft, Math.round(window.innerWidth * 0.10)));
  // Fallback: estimativa conservadora apenas se tela notch detectada
  if (safeTop === 0 && window.innerHeight < window.screen.height * 0.96) {
    safeTop = Math.min(24, Math.round(window.innerHeight * 0.03));
  }
}

// ---- WEBGL CHECK ----
(function() {
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl') || c.getContext('experimental-webgl'))) throw 0;
  } catch(e) {
    document.body.innerHTML = '<div style="color:#fff;font-family:monospace;padding:40px;text-align:center;margin-top:40vh">WebGL não disponível neste dispositivo.</div>';
    throw new Error('WebGL indisponível');
  }
})();

// ---- RENDERER ----
const renderer = new THREE.WebGLRenderer({ antialias:false, powerPreference:'high-performance', alpha:false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x5a8f3c);
renderer.sortObjects = true;
document.getElementById('game-canvas').appendChild(renderer.domElement);

// ---- CAMERA ----
const VIEW_H = 400;
let VIEW_W = VIEW_H * (window.innerWidth / window.innerHeight);
const camera = new THREE.OrthographicCamera(-VIEW_W/2, VIEW_W/2, VIEW_H/2, -VIEW_H/2, 0.1, 2000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();

// ---- TEXTURA NATIVA (WebView fix) ----
function loadTexNative(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const tex = new THREE.Texture(img);
      tex.magFilter = tex.minFilter = THREE.NearestFilter;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = () => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 8;
      cv.getContext('2d').fillStyle = '#ff00ff'; cv.getContext('2d').fillRect(0,0,8,8);
      const t = new THREE.CanvasTexture(cv);
      t.magFilter = t.minFilter = THREE.NearestFilter;
      resolve(t);
    };
    img.src = src;
  });
}

function makeMesh(tex, w, h) {
  const mat = new THREE.MeshBasicMaterial({ map:tex, transparent:true, alphaTest:0.05, depthWrite:false, side:THREE.DoubleSide });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
}

// ---- GROUND ----
function makeGround() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const cols = ['#4e7f34','#5a8f3c','#62973f','#4a7830','#5c9140'];
  ctx.fillStyle = '#5a8f3c'; ctx.fillRect(0,0,256,256);
  for (let i=0;i<600;i++) {
    ctx.fillStyle = cols[Math.floor(Math.random()*cols.length)];
    ctx.fillRect(Math.floor(Math.random()*64)*4, Math.floor(Math.random()*64)*4, 4, 4);
  }
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(WORLD_W/128, WORLD_H/128);
  t.magFilter = t.minFilter = THREE.NearestFilter;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_W, WORLD_H), new THREE.MeshBasicMaterial({map:t}));
  mesh.renderOrder = 0;
  scene.add(mesh);
}

// ---- HUD ----
const hudCanvas = document.getElementById('hud-canvas');
const hudCtx    = hudCanvas.getContext('2d');
let healthbarImg = null;
const MAX_HP = 100;
let playerHP = MAX_HP;
let showFPS  = false;
let lastFPS  = 0; let fpsTimer = 0; let frameCount = 0;

function resizeHud() {
  hudCanvas.width  = window.innerWidth;
  hudCanvas.height = window.innerHeight;
  calcSafeArea();
}
resizeHud();

function drawHUD(dt) {
  hudCtx.clearRect(0, 0, hudCanvas.width, hudCanvas.height);

  // Healthbar no topo-esquerdo, respeitando safe area
  if (healthbarImg) {
    const frames = 6;
    const fH     = healthbarImg.naturalHeight / frames;
    const fW     = healthbarImg.naturalWidth;
    const fi     = Math.min(frames-1, Math.floor((1 - playerHP/MAX_HP) * frames));
    const dW     = Math.min(200, window.innerWidth * 0.45);
    const dH     = dW * (fH / fW);
    // v0.0.7 — clamp: nunca desenha fora da tela
    const hx     = Math.max(0, safeLeft + 12);
    const hy     = Math.max(0, safeTop  + 10);
    hudCtx.imageSmoothingEnabled = false;
    hudCtx.drawImage(healthbarImg, 0, fi*fH, fW, fH, hx, hy, dW, dH);
  }

  // FPS counter (opcional)
  if (showFPS) {
    frameCount++;
    fpsTimer += dt;
    if (fpsTimer >= 1) { lastFPS = frameCount; frameCount = 0; fpsTimer = 0; }
    hudCtx.font = '12px monospace';
    hudCtx.fillStyle = '#fff';
    hudCtx.shadowColor = '#000';
    hudCtx.shadowBlur = 3;
    hudCtx.fillText('FPS: ' + lastFPS, safeLeft + 12, safeTop + 80);
    hudCtx.shadowBlur = 0;
  }
}

// ---- INIT ----
async function initGame() {
  calcSafeArea();

  const textures = {
    idle1:  await loadTexNative(IMGS.idle1),
    idle2:  await loadTexNative(IMGS.idle2),
    walk1:  await loadTexNative(IMGS.walk1),
    walk2:  await loadTexNative(IMGS.walk2),
    arvore: await loadTexNative(IMGS.arvore),
    rocha:  await loadTexNative(IMGS.rocha),
    rabbit: await loadTexNative(IMGS.rabbit),
  };

  healthbarImg = new Image();
  await new Promise(r => { healthbarImg.onload = r; healthbarImg.onerror = r; healthbarImg.src = IMGS.healthbar; });

  // Passa imagem idle ao inventário
  const idleImgEl = new Image();
  idleImgEl.src = IMGS.idle1;
  await new Promise(r => { idleImgEl.onload = r; idleImgEl.onerror = r; });
  Inventory.setIdleImg(idleImgEl);

  const ferrImg = new Image();
  ferrImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABACAYAAADlNHIOAAAA9klEQVR4nO3bsS2FURyH4csQdhAxgE4hMQADmAGdwlXoMIMBGECi0BlAxA6WoLoKX67u5JV8z1Oe5le87f8sFgDM1cbvh7uDx6/Ro6fPR5Pdle3l0/D9j+Xh2v2t++vh+58nFz/7m6PH+JsAMQFiAsQEiAkQEyAmQEyAmAAxAWICxASICRATICZATICYADEBYgLEBIgJEBMgJgAAAMzP5E7+7Xgx/D5+92G6u/KytzN8f//1fe3+5c3t8P2r8zP/A/4LAWICxASICRATICZATICYADEBYgLEBIgJEBMgJkBMgJgAMQFiAsQEiAkQEyAmQEwAgPn6BtdRF2N3xZwUAAAAAElFTkSuQmCC";
  await new Promise(r => { ferrImg.onload = r; ferrImg.onerror = r; });
  Inventory.setFerramentasImg(ferrImg);

  makeGround();

  // ---- Player ----
  const player = {
    mesh: makeMesh(textures.idle1, 48, 48),
    x:0, y:0, animTimer:0, animFrame:0,
    isMoving:false, facingLeft:false, w:28, h:28,
  };
  scene.add(player.mesh);

  // ---- Obstáculos: só árvores e pedras ----
  const obstacles = [];
  function spawnObs(type, x, y) {
    const isTree = type === 'arvore';
    const m = makeMesh(textures[type], isTree?90:72, isTree?90:60);
    m.position.set(x, y, 1);
    scene.add(m);
    obstacles.push({ mesh:m, x, y, w:isTree?28:36, h:isTree?20:28 });
  }
  [
    {t:'arvore',x:-300,y:200},{t:'arvore',x:250,y:300},
    {t:'arvore',x:-150,y:-350},{t:'arvore',x:400,y:-200},
    {t:'arvore',x:-450,y:100},{t:'arvore',x:100,y:-450},
    {t:'arvore',x:-200,y:450},{t:'arvore',x:500,y:150},
    {t:'arvore',x:-500,y:-250},{t:'arvore',x:350,y:450},
    {t:'arvore',x:-350,y:-500},{t:'arvore',x:600,y:-400},
    {t:'rocha',x:180,y:-180},{t:'rocha',x:-200,y:120},
    {t:'rocha',x:350,y:-50},{t:'rocha',x:-400,y:-150},
    {t:'rocha',x:50,y:320},{t:'rocha',x:-120,y:-280},
    {t:'rocha',x:280,y:380},{t:'rocha',x:-320,y:220},
  ].forEach(o => spawnObs(o.t, o.x, o.y));

  // ---- Coelhos decorativos ----
  const rabbits = [];
  [{x:120,y:220},{x:-180,y:-100},{x:320,y:-320}].forEach(r => {
    const m = makeMesh(textures.rabbit, 36, 36);
    m.position.set(r.x, r.y, 1);
    scene.add(m);
    rabbits.push({mesh:m, x:r.x, y:r.y});
  });

  // ---- Input ----
  const keys = {};
  window.addEventListener('keydown', e => { keys[e.code] = true; });
  window.addEventListener('keyup',   e => { keys[e.code] = false; });

  let joy = {active:false, startX:0, startY:0, dx:0, dy:0};
  const joyEl   = document.getElementById('joystick');
  const joyKnob = document.getElementById('joystick-knob');

  // v0.0.7 — touchstart no window para ampliar zona de detecção do joystick.
  // Ativa se o toque iniciar na metade esquerda + metade inferior da tela.
  window.addEventListener('touchstart', e => {
    const t = e.touches[0];
    const isJoyZone = t.clientX < window.innerWidth * 0.5 &&
                      t.clientY > window.innerHeight * 0.45;
    if (!isJoyZone) return;
    e.preventDefault();
    joy = {active:true, startX:t.clientX, startY:t.clientY, dx:0, dy:0};
    // DEBUG — remover após validação em dispositivo real:
    // console.log('[JOY] ativado em', t.clientX.toFixed(0), t.clientY.toFixed(0));
  }, {passive:false});
  window.addEventListener('touchmove', e => {
    if (!joy.active) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - joy.startX;
    const dy = t.clientY - joy.startY;
    const dist = Math.sqrt(dx*dx+dy*dy), max = 50;
    const cl = Math.min(dist, max);
    const ang = Math.atan2(dy, dx);
    joy.dx = Math.cos(ang)*cl/max;
    joy.dy = Math.sin(ang)*cl/max;
    joyKnob.style.transform = `translate(${Math.cos(ang)*cl}px,${Math.sin(ang)*cl}px)`;
  }, {passive:false});
  window.addEventListener('touchend', () => {
    joy = {active:false, startX:0, startY:0, dx:0, dy:0};
    joyKnob.style.transform = 'translate(0,0)';
  });

  function checkAABB(ax,ay,aw,ah,bx,by,bw,bh) {
    return Math.abs(ax-bx)<(aw+bw)/2 && Math.abs(ay-by)<(ah+bh)/2;
  }

  // ---- Game Loop ----
  let lastTime = performance.now();

  function update(dt) {
    let mx=0, my=0;
    if (keys['ArrowLeft'] ||keys['KeyA']) mx -= 1;
    if (keys['ArrowRight']||keys['KeyD']) mx += 1;
    if (keys['ArrowUp']   ||keys['KeyW']) my += 1;
    if (keys['ArrowDown'] ||keys['KeyS']) my -= 1;
    if (joy.active) { mx += joy.dx; my -= joy.dy; }
    if (Inventory.state.aberto) { mx = 0; my = 0; }

    const len = Math.sqrt(mx*mx+my*my);
    if (len > 1) { mx/=len; my/=len; }
    player.isMoving  = len > 0.05;
    if (mx < -0.05) player.facingLeft = true;
    if (mx >  0.05) player.facingLeft = false;

    const hW = WORLD_W/2-40, hH = WORLD_H/2-40;
    let nx = Math.max(-hW, Math.min(hW, player.x + mx*PLAYER_SPEED*dt));
    let ny = Math.max(-hH, Math.min(hH, player.y + my*PLAYER_SPEED*dt));

    let cX = false, cY = false;
    for (const o of obstacles) {
      if (checkAABB(nx, player.y, player.w, player.h, o.x, o.y, o.w, o.h)) { cX=true; break; }
    }
    if (!cX) player.x = nx;
    for (const o of obstacles) {
      if (checkAABB(player.x, ny, player.w, player.h, o.x, o.y, o.w, o.h)) { cY=true; break; }
    }
    if (!cY) player.y = ny;

    // Animação pato
    player.animTimer += dt*1000;
    if (player.animTimer >= ANIM_MS) { player.animTimer=0; player.animFrame=1-player.animFrame; }
    const k = player.isMoving
      ? (player.animFrame===0 ? 'walk1' : 'walk2')
      : (player.animFrame===0 ? 'idle1' : 'idle2');
    player.mesh.material.map = textures[k];
    player.mesh.material.needsUpdate = true;
    player.mesh.scale.x = player.facingLeft ? -1 : 1;
    player.mesh.position.set(player.x, player.y, 2);

    // Depth sort (y-sorting)
    [...obstacles, ...rabbits, {mesh:player.mesh, y:player.y}].forEach(o => {
      o.mesh.position.z = 1 + (500 - o.y) * 0.001;
    });

    // Camera segue jogador
    const hvW = VIEW_W/2, hvH = VIEW_H/2;
    camera.position.set(
      Math.max(-WORLD_W/2+hvW, Math.min(WORLD_W/2-hvW, player.x)),
      Math.max(-WORLD_H/2+hvH, Math.min(WORLD_H/2-hvH, player.y)),
      100
    );
  }

  function loop(now) {
    const dt = Math.min((now - lastTime)/1000, 0.05);
    lastTime = now;
    update(dt);
    renderer.render(scene, camera);
    drawHUD(dt);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  VIEW_W = VIEW_H*(w/h);
  camera.left=-VIEW_W/2; camera.right=VIEW_W/2;
  camera.top=VIEW_H/2; camera.bottom=-VIEW_H/2;
  camera.updateProjectionMatrix();
  resizeHud();
});

initGame().catch(e => console.error('Erro init:', e));
