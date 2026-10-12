// 서비스 소개 랜딩페이지. 위에서 아래로 여섯 칸.
// 글은 data/site.js 의 about 에서 고칩니다. 10/20 광고 도착 페이지로 그대로 씁니다.
// stage 가 "landing" 이면 버튼이 신청 폼(formUrl)으로 가고, "app" 이면 서비스 화면(/)으로 갑니다.
import fs from "fs";
import path from "path";
import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import { site } from "@/data/site";

const A = site.about;
const isLanding = site.stage !== "app";
// public/hero.png 가 있으면 첫 화면 오른쪽에 그림으로 넣습니다.
const hasHero = fs.existsSync(path.join(process.cwd(), "public", "hero.png"));

function Main({ where, className = "btn" }) {
  if (isLanding) return <CtaButton where={where} className={className} />;
  return <Link className={className} href="/">지금 써 보기</Link>;
}

export default function Landing() {
  return (
    <main>
      {/* 1 첫 화면 */}
      <section className="hero">
        <div className="wrap">
          <div>
            <div className="name">{site.name}</div>
            <h1>{site.promise}</h1>
            <p>{A.who}</p>
            <div className="btns"><Main where="hero" /></div>
            {isLanding && !site.formUrl ? <p className="sample-note">신청 받기 준비 중</p> : null}
          </div>
          {isLanding ? (
            hasHero ? <div className="hero-shot" aria-hidden="true"><img src="/hero.png" alt="" /></div> : null
          ) : (
            <div className="hero-shot" aria-hidden="true">
              <iframe src="/" title="서비스 화면 미리보기" tabIndex={-1} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* 2 이런 불편 있으셨죠 */}
      <section className="band">
        <div className="wrap">
          <h2>이런 불편 있으셨죠</h2>
          <ul className="pains">
            {A.pains.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      {/* 3 이렇게 해결 */}
      <section className="band tint">
        <div className="wrap">
          <h2>{site.name}은 이렇게 풀어요</h2>
          <ul className="features">
            {A.features.map((f) => <li key={f.title}><h3>{f.title}</h3><p>{f.text}</p></li>)}
          </ul>
        </div>
      </section>

      {/* 4 이렇게 써요 */}
      <section className="band">
        <div className="wrap">
          <h2>{isLanding ? "나오면 이렇게 써요" : "이렇게 써요"}</h2>
          <ol className="steps">
            {A.steps.map((s) => <li key={s.title}><div><strong>{s.title}</strong><span>{s.text}</span></div></li>)}
          </ol>
        </div>
      </section>

      {/* 5 만든 사람 */}
      <section className="band tint">
        <div className="wrap">
          <div className="maker">
            <div className="photo">사진 자리</div>
            <div><strong>만든 사람 {site.maker}</strong><p>{A.makerWhy}</p></div>
          </div>
        </div>
      </section>

      {/* 6 마지막 버튼 */}
      <section className="band brand">
        <div className="wrap">
          <h2>{A.ctaTitle}</h2>
          {A.ctaText ? <p>{A.ctaText}</p> : null}
          <div className="btns">
            <Main where="bottom" className="btn on-brand" />
            {A.contactHref ? <a className="btn on-brand line" href={A.contactHref}>{A.contactLabel}</a> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
