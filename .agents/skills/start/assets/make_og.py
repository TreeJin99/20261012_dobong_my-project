#!/usr/bin/env python3
"""카톡 · 페이스북 · X 미리보기 그림(og-image.png, 1200x630) 만들기. 고치지 않고 그대로 실행.

사용법 (my-project 폴더에서):
    python .agents/skills/start/assets/make_og.py
읽는 것: 내사이트/data/site.js 의 name · promise · description, 내사이트/app/globals.css 의 --brand
만드는 것: 내사이트/public/og-image.png  (layout.jsx 가 있으면 저절로 미리보기에 씀)
브라우저 창은 띄우지 않는다. 찍는 방법은 같은 폴더 og/shot.py 를 쓴다.
"""
import html
import importlib.util
import re
import sys
import tempfile
from pathlib import Path

ROOT = Path.cwd()
SITE = ROOT / "내사이트"
CARD = Path(__file__).resolve().parent / "og" / "shot.py"

spec = importlib.util.spec_from_file_location("make_cards", CARD)
mc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mc)
mc.W, mc.H = 1200, 630


def pick(src, key):
    m = re.search(r'^\s*%s:\s*"([^"]*)"' % key, src, flags=re.M)
    return m.group(1) if m else ""


site = (SITE / "data" / "site.js").read_text(encoding="utf-8")
css = (SITE / "app" / "globals.css").read_text(encoding="utf-8")
name, promise, desc = pick(site, "name"), pick(site, "promise"), pick(site, "description")
m = re.search(r"--brand:\s*(#[0-9A-Fa-f]{3,8})", css)
brand = m.group(1) if m else "#296258"
if not name or not promise:
    sys.exit("data/site.js 의 name 과 promise 가 비어 있습니다. 먼저 $start 로 서비스를 만들어 주세요.")

e = lambda s: html.escape(s)
page = f"""<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
{mc.font_faces()}
*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:630px;font-family:'Pretendard',sans-serif;background:{brand};color:#fff;
  display:flex;flex-direction:column;justify-content:center;padding:0 96px;word-break:keep-all}}
.name{{font-size:40px;font-weight:700;opacity:.85;letter-spacing:-0.02em}}
h1{{font-size:84px;font-weight:800;line-height:1.18;letter-spacing:-0.04em;margin:20px 0 28px;max-width:1000px}}
p{{font-size:32px;font-weight:500;opacity:.85;line-height:1.45;max-width:980px}}
</style></head><body>
<div class="name">{e(name)}</div><h1>{e(promise)}</h1><p>{e(desc)}</p>
</body></html>"""

(SITE / "public").mkdir(exist_ok=True)
out = SITE / "public" / "og-image.png"
with tempfile.TemporaryDirectory() as d:
    src = Path(d) / "og.html"
    src.write_text(page, encoding="utf-8")
    try:
        mc.shoot_playwright([(src, out)])
    except Exception:
        mc.shoot_cli([(src, out)])
print("만들었습니다:", out.relative_to(ROOT))
