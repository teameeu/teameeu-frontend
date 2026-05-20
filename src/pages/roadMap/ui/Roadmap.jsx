import dayjs from "dayjs";
import { TimelineComponent } from "./Timeline";


export const Roadmap = () => {
    const items = [
        {
            id: 1,
            group: 1,
            title: "수학 탐구활동 준비하기",
            start_time: dayjs("2026-06-01").valueOf(),
            end_time: dayjs("2026-06-10").valueOf(),
            color: "var(--color-cyan-200)",
        },
        {
            id: 2,
            group: 2,
            title: "과학 실험 기록 정리하기",
            start_time: dayjs("2026-06-08").valueOf(),
            end_time: dayjs("2026-06-18").valueOf(),
            color: "var(--color-yellow-200)",
        },
        {
            id: 3,
            group: 3,
            title: "역사 인물 발표 준비",
            start_time: dayjs("2026-06-12").valueOf(),
            end_time: dayjs("2026-06-20").valueOf(),
            color: "var(--color-cyan-200)",
        },
        {
            id: 4,
            group: 4,
            title: "영단어 테스트",
            start_time: dayjs("2026-06-05").valueOf(),
            end_time: dayjs("2026-06-15").valueOf(),
            color: "var(--color-gray-200)",
        },
    ];

    return (
        <div className="column" style={{ margin: "96px 120px 120px" }}>
            <div>
                <div className="row" style={{ alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                    <span className="typo-heading-small">나의 진로 타임라인</span>
                    <div className="row" style={{ gap: "24px" }}>
                        <div className="row" style={{ gap: "8px", alignItems: "center", justifyContent: "center" }}>
                            <div className="init-circle" style={{ backgroundColor: "var(--color-cyan-200)" }}></div>
                            <span className="typo-body-small">완료된 항목</span>
                        </div>
                        <div className="row" style={{ gap: "8px", alignItems: "center", justifyContent: "center" }}>
                            <div className="init-circle" style={{ backgroundColor: "var(--color-yellow-200)" }}></div>
                            <span className="typo-body-small">진행 중 항목</span>
                        </div>
                        <div className="row" style={{ gap: "8px", alignItems: "center", justifyContent: "center" }}>
                            <div className="init-circle" style={{ backgroundColor: "var(--color-gray-200)" }}></div>
                            <span className="typo-body-small">예정된 항목</span>
                        </div>
                    </div>
                </div>
                <div className="timeline-area">


                    <TimelineComponent items={items} />
                </div>
            </div>
        </div>
    )
}