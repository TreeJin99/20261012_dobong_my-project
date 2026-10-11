// 이 사이트는 서버(백엔드) 없이 미리 만들어 둔 화면만 올립니다.
// output: "export" 가 그 약속입니다. 지우지 않습니다.
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  devIndicators: false,
  // 코덱스가 매번 Next.js 문서를 읽느라 느려지지 않게, 내사이트/AGENTS.md 자동 생성을 끈다. 규칙은 위 폴더 AGENTS.md 에 있다.
  agentRules: false,
};

export default nextConfig;
