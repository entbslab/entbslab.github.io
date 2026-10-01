# 인수인계 가이드 PDF 원본

`guide.html`을 수정한 뒤 아래 명령으로 PDF를 다시 만듭니다. Windows의 Microsoft Edge와 Python 패키지 pypdf, pypdfium2, reportlab이 필요합니다.

```bash
python docs/pdf-src/build.py "docs/홈페이지_운영_인수인계_가이드.pdf"
```

build.py는 Edge로 HTML을 인쇄한 뒤 표지를 뺀 쪽에 꼬리말과 쪽 번호를 넣습니다. 미리보기 PNG(p1.png …)도 같은 폴더에 생기며 커밋하지 않습니다.
