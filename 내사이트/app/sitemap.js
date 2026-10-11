// 사이트 지도 (sitemap.xml). 검색엔진에 「내 사이트에는 이런 페이지가 있어요」 하고 알려 주는 목록입니다.
// data/site.js 의 url 이 채워져 있어야 만들어집니다. 고치지 않습니다.
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap() {
  if (!site.url) return [];
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
  ];
}
