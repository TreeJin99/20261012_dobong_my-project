// 소개 페이지 (주소 /about). 내용은 components/Landing.jsx 와 같습니다.
import Landing from "@/components/Landing";
import { site } from "@/data/site";

export const metadata = {
  title: `${site.name} 소개 · ${site.promise}`,
  description: site.description,
  openGraph: { title: `${site.name} · ${site.promise}`, description: site.description },
};

export default function About() {
  return <Landing />;
}
