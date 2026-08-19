"""Pull each arXiv-linked project's Figure 1 out of the paper PDF.

Renders the figure's bounding box rather than lifting embedded rasters, so vector
overlays, annotations and multi-panel layouts survive intact.

    pip install pymupdf pillow
    python scripts/fetch-figures.py src/content/projects src/assets/figures

Then add any new file to src/data/paperFigures.ts. Detail pages use these; listing
cards keep the generated teaser so they stay consistent at small sizes.

Papers whose Figure 1 cannot be located are skipped and simply fall back to the
generated teaser, so a failure here is never fatal.
"""
import io
import pathlib
import re
import sys
import urllib.request

import fitz

CONTENT = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (compatible; lab-site-builder)"}


def arxiv_id_of(md: pathlib.Path) -> str | None:
    m = re.search(r"^\s+arxiv:\s*https?://arxiv\.org/abs/(\S+)\s*$", md.read_text(encoding="utf-8"), re.M)
    return m.group(1) if m else None


def caption_rect(page: fitz.Page) -> fitz.Rect | None:
    """Where 'Figure 1' is captioned on this page, if at all."""
    best = None
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        text = "".join(s["text"] for line in block["lines"] for s in line["spans"])
        key = text.strip().lower().replace(" ", "")
        # Guard against matching "Fig. 10" and friends.
        if re.match(r"^(fig\.?|figure)1(?![0-9])", key):
            rect = fitz.Rect(block["bbox"])
            if best is None or rect.y0 < best.y0:
                best = rect
    return best


def figure_bbox(page: fitz.Page, caption: fitz.Rect) -> fitz.Rect | None:
    """Union of the visual content sitting directly above the caption."""
    parts = []
    for info in page.get_image_info():
        r = fitz.Rect(info["bbox"])
        if r.y1 <= caption.y0 + 6 and r.width > 30 and r.height > 20:
            parts.append(r)
    for d in page.get_drawings():
        r = fitz.Rect(d["rect"])
        if r.y1 <= caption.y0 + 6 and r.width > 30 and r.height > 20:
            parts.append(r)
    if not parts:
        return None

    box = parts[0]
    for r in parts[1:]:
        box |= r
    # Only the band just above the caption, so surrounding body text is excluded.
    box.y0 = max(box.y0, caption.y0 - 420)
    box = box & page.rect
    return box if box.width > 60 and box.height > 40 else None


def find_figure(doc: fitz.Document) -> tuple[fitz.Page, fitz.Rect] | None:
    """Figure 1 is usually on page 1, but two-column papers often push it to page 2."""
    for pno in range(min(3, doc.page_count)):
        page = doc[pno]
        caption = caption_rect(page)
        if caption is None:
            continue
        box = figure_bbox(page, caption)
        if box is not None:
            return page, box
    return None


def trim_white(pix: fitz.Pixmap) -> fitz.Pixmap:
    """Drop uniform white margins so the figure fills its frame on the page."""
    from PIL import Image

    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    gray = img.convert("L")
    mask = gray.point(lambda v: 0 if v > 244 else 255).convert("1")
    box = mask.getbbox()
    if not box:
        return pix
    pad = 6
    box = (
        max(box[0] - pad, 0),
        max(box[1] - pad, 0),
        min(box[2] + pad, img.width),
        min(box[3] + pad, img.height),
    )
    buf = io.BytesIO()
    img.crop(box).save(buf, format="PNG")
    return fitz.Pixmap(buf.getvalue())


for md in sorted(CONTENT.glob("*.md")):
    slug = md.stem
    arxiv_id = arxiv_id_of(md)
    if not arxiv_id:
        continue
    try:
        data = urllib.request.urlopen(urllib.request.Request(f"https://arxiv.org/pdf/{arxiv_id}", headers=UA), timeout=120).read()
        found = find_figure(fitz.open(stream=data, filetype="pdf"))
        if found is None:
            print(f"SKIP {slug}: no figure 1 located")
            continue
        page, box = found
        pix = trim_white(page.get_pixmap(matrix=fitz.Matrix(3.2, 3.2), clip=box))
        path = OUT / f"{slug}-fig1.png"
        pix.save(path)
        kb = path.stat().st_size / 1024
        print(f"OK   {slug:20s} {pix.width}x{pix.height}  {kb:.0f}kB  (arXiv {arxiv_id})")
    except Exception as e:  # noqa: BLE001 - report and continue with the rest
        print(f"FAIL {slug}: {type(e).__name__}: {e}")
