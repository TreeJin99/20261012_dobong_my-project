"use client";
// 「써 보고 싶어요」 버튼. 누르면 GA4 에 cta_click 이벤트를 남기고 신청 폼을 새 창으로 엽니다.
// 폼 주소는 data/site.js 의 formUrl 입니다. 고치지 않습니다.
import { sendGAEvent } from "@next/third-parties/google";
import { site } from "@/data/site";

export default function CtaButton({ where, className = "btn" }) {
  const href = site.formUrl || "#";
  const onClick = () => {
    try { sendGAEvent("event", "cta_click", { location: where }); } catch (e) {}
  };
  return (
    <a className={className} href={href} onClick={onClick}
      {...(site.formUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {site.ctaLabel || "써 보고 싶어요"}
    </a>
  );
}
