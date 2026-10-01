"""guide.html -> raw.pdf (headless Edge) -> footer/page numbers stamped -> final PDF + page previews."""
import io
import os
import subprocess
import sys

import pypdfium2 as pdfium
from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

HERE = os.path.dirname(os.path.abspath(__file__))
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
RAW = os.path.join(HERE, "raw.pdf")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "guide.pdf")
FOOTER = "엔터테인먼트경영연구센터 · 홈페이지 운영·인수인계 가이드"

# 1) print HTML
url = "file:///" + os.path.join(HERE, "guide.html").replace("\\", "/")
subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                "--virtual-time-budget=15000", "--run-all-compositor-stages-before-draw",
                f"--print-to-pdf={RAW}", url], check=True, capture_output=True)

# 2) stamp footer + page number on every page except the cover
pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
reader = PdfReader(RAW)
writer = PdfWriter()
total = len(reader.pages)
for i, page in enumerate(reader.pages):
    if i > 0:
        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=A4)
        w, _ = A4
        y = 11 * mm
        c.setStrokeColorRGB(0.87, 0.87, 0.89)
        c.setLineWidth(0.5)
        c.line(18 * mm, y + 4.2 * mm, w - 18 * mm, y + 4.2 * mm)
        c.setFont("Malgun", 7.5)
        c.setFillColorRGB(0.42, 0.42, 0.45)
        c.drawString(18 * mm, y, FOOTER)
        c.drawRightString(w - 18 * mm, y, f"{i + 1} / {total}")
        c.save()
        buf.seek(0)
        page.merge_page(PdfReader(buf).pages[0])
    writer.add_page(page)
writer.add_metadata({
    "/Title": "엔터테인먼트경영연구센터 홈페이지 운영·인수인계 가이드",
    "/Author": "김권택",
    "/Subject": "센터 홈페이지 구성, 관리, 계정 명의, 인수인계",
})
with open(OUT, "wb") as f:
    writer.write(f)

# 3) previews for review
pdf = pdfium.PdfDocument(OUT)
for i in range(len(pdf)):
    pdf[i].render(scale=1.1).to_pil().save(os.path.join(HERE, f"p{i + 1}.png"))
print(f"pages={len(pdf)} -> {OUT}")
