// 첫 화면 (주소 /).
// data/site.js 의 stage 가 "landing" 이면 소개 랜딩페이지 한 장, "app" 이면 서비스 화면입니다.
// 서비스 화면은 type 이 정합니다.
import Landing from "@/components/Landing";
import MapApp from "@/components/MapApp";
import ListApp from "@/components/ListApp";
import CalcApp from "@/components/CalcApp";
import QuizApp from "@/components/QuizApp";
import LogApp from "@/components/LogApp";
import { site } from "@/data/site";

const APPS = { map: MapApp, list: ListApp, calc: CalcApp, quiz: QuizApp, log: LogApp };

export default function Home() {
  if (site.stage !== "app") return <Landing />;
  const App = APPS[site.type] || ListApp;
  return (
    <main className="wrap">
      <div className="app-head">
        <h1>{site.promise}</h1>
        {site.appIntro ? <p>{site.appIntro}</p> : null}
      </div>
      <App />
    </main>
  );
}
