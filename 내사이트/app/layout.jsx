import fs from "fs";
import path from "path";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import Nav from "@/components/Nav";
import { site } from "@/data/site";
import { appData } from "@/data/app-data";
import "./globals.css";

// public/og-image.png 가 있으면 카톡 · 페이스북 · X 미리보기 그림으로 씁니다.
const hasOgImage = fs.existsSync(path.join(process.cwd(), "public", "og-image.png"));
const v = site.verification || {};
const otherVerify = {};
if (v.naver) otherVerify["naver-site-verification"] = v.naver;
if (v.bing) otherVerify["msvalidate.01"] = v.bing;

export const metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: `${site.name} · ${site.promise}`,
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.promise}`,
    description: site.description,
    siteName: site.name,
    locale: "ko_KR",
    type: "website",
    ...(site.url ? { url: site.url } : {}),
    ...(hasOgImage ? { images: [{ url: "/og-image.png", width: 1200, height: 630 }] } : {}),
  },
  twitter: {
    card: hasOgImage ? "summary_large_image" : "summary",
    title: `${site.name} · ${site.promise}`,
    description: site.description,
    ...(hasOgImage ? { images: ["/og-image.png"] } : {}),
  },
  verification: {
    ...(v.google ? { google: v.google } : {}),
    ...(Object.keys(otherVerify).length ? { other: otherVerify } : {}),
  },
};

// 테마별 제목 글꼴 (구글 폰트). data/site.js 의 theme 으로 고릅니다.
const THEME_FONT = {
  warm: "https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap",
  bold: "https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap",
  calm: "https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap",
};
const theme = site.theme || "clean";

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme={theme}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {THEME_FONT[theme] ? <link rel="stylesheet" href={THEME_FONT[theme]} /> : null}
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link className="logo" href="/">{site.name}</Link>
            <Nav />
          </div>
        </header>
        {appData.notice ? (
          <div className="notice"><div className="wrap">{appData.notice}</div></div>
        ) : null}
        {children}
        <footer className="site-footer">
          <div className="wrap">{site.name} · 만든 사람 {site.maker}</div>
        </footer>
      </body>
      {site.gaId ? <GoogleAnalytics gaId={site.gaId} /> : null}
    </html>
  );
}
