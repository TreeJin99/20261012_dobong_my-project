// 내 서비스 기획서 워드 파일 만들기 (고치지 않고 그대로 실행)
// 사용법 (my-project 폴더에서): node .agents/skills/start/assets/make_plan_docx.js
// 읽는 것: 작업파일/서비스기획.md · 작업파일/인터뷰기록.md  →  만드는 것: 내 서비스 기획서.docx
// docx 꾸러미는 내사이트/node_modules 에 이미 있다 (내사이트에서 npm install 을 한 뒤 실행).
const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

const ROOT = process.cwd();
let docx;
try { docx = createRequire(path.join(ROOT, "내사이트", "package.json"))("docx"); }
catch (e) { console.error("docx 꾸러미가 없습니다. 내사이트 폴더에서 npm install 을 먼저 해 주세요."); process.exit(1); }
const { Document, HeadingLevel, Packer, Paragraph, TextRun, BorderStyle } = docx;

const FONT = "맑은 고딕";
const DARK = "1F4E78";
const read = (p) => { try { return fs.readFileSync(path.join(ROOT, p), "utf8"); } catch { return ""; } };
const plan = read("작업파일/서비스기획.md");
const interview = read("작업파일/인터뷰기록.md");
if (!plan) { console.error("작업파일/서비스기획.md 가 없습니다."); process.exit(1); }

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 22, bold: o.bold, color: o.color });
const clean = (s) => s.replace(/\*\*/g, "").replace(/`/g, "").trim();

function toParas(md, base) {
  const out = [];
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) continue;
    let m;
    if ((m = line.match(/^#\s+(.*)/))) {
      out.push(new Paragraph({ spacing: { after: 160 }, children: [run(clean(m[1]), { size: base === 0 ? 36 : 30, bold: true, color: DARK })] }));
    } else if ((m = line.match(/^#{2,3}\s+(.*)/))) {
      out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF", space: 2 } },
        children: [run(clean(m[1]), { size: 26, bold: true, color: DARK })] }));
    } else if ((m = line.match(/^\s*[-*]\s+(.*)/))) {
      out.push(new Paragraph({ bullet: { level: 0 }, spacing: { after: 60 }, children: [run(clean(m[1]))] }));
    } else {
      out.push(new Paragraph({ spacing: { after: 80 }, children: [run(clean(line))] }));
    }
  }
  return out;
}

const t = new Date();
const ymd = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
const children = [
  ...toParas(plan, 0),
  new Paragraph({ spacing: { before: 120, after: 200 }, children: [run(`만든 날 ${ymd}`, { size: 18, color: "7F7F7F" })] }),
];
if (interview) {
  children.push(new Paragraph({ pageBreakBefore: true, children: [] }));
  children.push(...toParas(interview, 1));
}

const doc = new Document({ styles: { default: { document: { run: { font: FONT, size: 22 } } } }, sections: [{ children }] });
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(path.join(ROOT, "내 서비스 기획서.docx"), buf);
  console.log("만들었습니다: 내 서비스 기획서.docx");
});
