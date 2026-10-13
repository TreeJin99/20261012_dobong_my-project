# 내사이트 (Next.js 랜딩페이지) 고칠 때 지킬 것

이 폴더는 서버 없는 Next.js 사이트입니다. 뼈대는 이미 있으니 새로 만들지 않습니다(create-next-app 을 다시 쓰지 않음).

## 고치는 곳
| 파일 | 무엇 |
|---|---|
| `data/site.js` | theme(디자인 테마) · stage · 서비스 이름 · 한 줄 약속 · 소개 글 · 자주 묻는 질문(about.faq) · 신청 폼 주소(formUrl) · 버튼 글자 · 사이트 주소(url) · 측정 ID(gaId) · 검색 등록 코드 |
| `app/globals.css` | 맨 위 `--brand` 한 줄(내 색). `$design` 을 쓸 때만 `:root` 값과 이미 있는 규칙의 값 |
| `public/og-image.png` · `public/hero.png` | 미리보기 그림 · 첫 화면 그림 (있을 때만 씀) |

- `app/` · `components/` 의 jsx 와 className 은 고치지 않습니다. 모양은 theme 과 globals.css 값으로만 바꿉니다.
- 새 꾸러미(npm 패키지)를 더하지 않습니다. `next.config.mjs` 의 `output: "export"` 를 지우지 않고, app/api · 서버 액션 · 미들웨어를 만들지 않습니다.
- 색 코드는 `--brand` 하나만 씁니다. 흰 글자가 잘 읽히는 진한 색이어야 합니다.

## 테마 넷 (data/site.js 의 theme)
| theme | 느낌 | 모양 |
|---|---|---|
| clean | 깔끔하고 밝게 | 흰 바탕 · 왼쪽 정렬 · 굵은 고딕 |
| warm | 따뜻하고 친근하게 | 크림 바탕 · 둥근 카드 · 가운데 정렬 · 고운돋움 |
| bold | 힘 있고 또렷하게 | 첫 화면 전체가 내 색 · 아주 큰 블랙한산스 · 굵은 선 |
| calm | 차분하고 믿음직하게 | 넉넉한 여백 · 고운바탕 명조 · 가는 선 · 각진 버튼 |

## 페이지 짜임
- `stage: "landing"` (지금): 주소 / 가 랜딩페이지 한 장, 위 메뉴 없음. 버튼 「써 보고 싶어요」는 formUrl(구글 폼 · 네이버 폼)로 가고 누를 때마다 GA4 에 `cta_click` 이 남습니다.
- 랜딩 여섯 칸: 첫 화면(이름 · 한 줄 약속 · 버튼) · 이런 불편 있으셨죠(2~3줄) · 이렇게 풀어요(기능 셋) · 나오면 이렇게 써요(3단계) · 만든 사람(별명) · 마지막 버튼. about.faq 에 질문이 있으면 마지막 버튼 위에 「자주 묻는 질문」 칸이 생기고, 검색엔진 · AI 가 읽는 형식(FAQPage)도 같이 들어갑니다.
- 아직 없는 서비스를 있는 것처럼 쓰지 않습니다(「지금 바로 써 보세요」 대신 「나오면 가장 먼저 알려 드릴게요」).
- 서비스 화면은 사용자가 「이제 서비스 화면도 만들어 주세요」라고 할 때만 `stage: "app"` 으로 바꾸고 `data/app-data.js` 를 채웁니다.

## 확인
1. 고친 뒤 이 폴더에서 `npm run build`. 오류가 나면 고친 파일 안에서만 바로잡습니다(따옴표 · 쉼표 · 괄호).
2. 처음 한 번은 `npm install` (node_modules 가 없을 때만).
3. 화면은 `npm run dev` 로 띄우고 http://localhost:3000 을 알려 줍니다.
4. 올리기는 `$update` 의 순서대로 (로그인 → `npx vercel link --yes --project 영문이름` → `npx vercel --prod --yes`). 폴더 이름이 한글이라 link 없이 올리면 실패합니다. 받은 주소는 `data/site.js` 의 url 과 루트 AGENTS.md 「내 사이트 주소」에 적습니다.
5. GA4 측정 ID(G- 로 시작)는 `data/site.js` 의 gaId 에만 넣습니다. 검색 등록 확인 코드는 verification 의 google · naver · bing 에 content 값만 넣습니다. 미리보기 그림은 `python .agents/skills/start/assets/make_og.py` (안 되면 `python3`).
