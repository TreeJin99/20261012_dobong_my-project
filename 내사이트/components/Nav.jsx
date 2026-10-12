"use client";
// 위 메뉴 (서비스 · 소개). 서비스 화면을 만든 뒤(stage: "app")에만 보입니다. 지금 보고 있는 페이지에 색이 들어갑니다.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export default function Nav() {
  const path = usePathname();
  if (site.stage !== "app") return null; // 랜딩페이지 한 장일 때는 메뉴가 없습니다
  const isAbout = path.startsWith("/about");
  return (
    <nav className="nav">
      <Link href="/" aria-current={isAbout ? undefined : "page"}>서비스</Link>
      <Link href="/about" aria-current={isAbout ? "page" : undefined}>소개</Link>
    </nav>
  );
}
