// robots.txt. 검색엔진 로봇에게 「다 둘러봐도 돼요, 사이트 지도는 여기 있어요」 하고 알려 줍니다. 고치지 않습니다.
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function robots() {
  const base = site.url ? site.url.replace(/\/$/, "") : "";
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
