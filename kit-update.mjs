// 킷 새 판 올리기. my-project 폴더에서 `node kit-update.mjs` 로 실행합니다.
// 내가 만든 것(site.js 글 · 색 · 디자인 · 작업파일 · 올린 주소)은 그대로 두고, 킷이 맡는 파일만 새 판으로 바꿉니다.
import fs from "node:fs";
import path from "node:path";

const BASE = "https://raw.githubusercontent.com/TreeJin99/20261012_dobong_my-project/main/";
const LOCAL = process.env.KIT_SRC; // 시험용: 새 판이 있는 폴더

// 통째로 바꾸는 파일 (사용자가 고치지 않는 곳)
const REPLACE = [
  ".agents/skills/start/SKILL.md", ".agents/skills/landing/SKILL.md", ".agents/skills/design/SKILL.md",
  ".agents/skills/update/SKILL.md", ".agents/skills/ga4/SKILL.md",
  ".agents/skills/design/references/galleries.md",
  "내사이트/AGENTS.md", "내사이트/app/layout.jsx", "내사이트/app/page.jsx", "내사이트/app/about/page.jsx",
  "내사이트/components/Landing.jsx", "내사이트/components/CtaButton.jsx",
];

async function get(rel) {
  if (LOCAL) return fs.readFileSync(path.join(LOCAL, rel), "utf8");
  const res = await fetch(BASE + rel.split("/").map(encodeURIComponent).join("/"));
  if (!res.ok) throw new Error(`${rel} 를 받지 못했어요 (${res.status})`);
  return res.text();
}

if (!fs.existsSync("AGENTS.md") || !fs.existsSync("내사이트")) {
  console.log("my-project 폴더에서 실행해 주세요 (AGENTS.md 와 내사이트 폴더가 있는 곳).");
  process.exit(1);
}

const done = [];
const skipped = [];
for (const rel of REPLACE) {
  const text = await get(rel);
  try {
    fs.mkdirSync(path.dirname(rel), { recursive: true });
    fs.writeFileSync(rel, text);
    done.push(rel);
  } catch {
    skipped.push(rel); // 코덱스가 .agents 폴더를 잠가 두면 건너뜀. 자주 묻는 질문 규칙은 내사이트/AGENTS.md 에도 있어 괜찮음
  }
}

// 루트 AGENTS.md: 「나와 내 서비스」 칸은 내 것을 남기고 나머지만 새 판으로
{
  const mine = fs.readFileSync("AGENTS.md", "utf8");
  const fresh = await get("AGENTS.md");
  const cut = (s) => {
    const a = s.indexOf("## 나와 내 서비스");
    const b = s.indexOf("## 말하는 법");
    return a >= 0 && b > a ? [a, b] : null;
  };
  const m = cut(mine), f = cut(fresh);
  fs.writeFileSync("AGENTS.md", m && f ? fresh.slice(0, f[0]) + mine.slice(m[0], m[1]) + fresh.slice(f[1]) : fresh);
  done.push("AGENTS.md (나와 내 서비스는 그대로)");
}

// site.js: 자주 묻는 질문 칸(faq)이 없으면 makerWhy 다음 줄에 더함
{
  const p = "내사이트/data/site.js";
  let s = fs.readFileSync(p, "utf8");
  if (!/\bfaq\s*:/.test(s)) {
    s = s.replace(/(\n([ \t]*)makerWhy:[^\n]*\n)/, (all, line, sp) =>
      `${line}${sp}faq: [], // 자주 묻는 질문. 예: { q: "무료인가요?", a: "네, 신청은 무료예요." } 비어 있으면 칸이 안 보입니다\n`);
    fs.writeFileSync(p, s);
    done.push(p + " (faq 칸 더함)");
  }
}

// globals.css: 내 디자인은 그대로 두고 자주 묻는 질문 모양만 더함
{
  const p = "내사이트/app/globals.css";
  let s = fs.readFileSync(p, "utf8");
  if (!s.includes(".faq {")) {
    s += `
.faq { margin: 0; max-width: var(--text); }
.faq div { padding: 20px 0; border-bottom: 1px solid var(--line); }
.faq div:first-child { border-top: 1px solid var(--line); }
.faq dt { font-size: var(--fs-h3); font-weight: 650; letter-spacing: -0.02em; margin-bottom: 6px; }
.faq dd { margin: 0; color: var(--ink-2); }
`;
    fs.writeFileSync(p, s);
    done.push(p + " (자주 묻는 질문 모양 더함)");
  }
}

console.log("새 판으로 바꿨어요.\n- " + done.join("\n- "));
if (skipped.length) console.log("잠겨 있어 건너뛴 파일 (그대로 써도 됩니다):\n- " + skipped.join("\n- "));
