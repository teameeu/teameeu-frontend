import { useEffect } from "react";
import Timeline, {
    TimelineHeaders,
    DateHeader,
    TodayMarker,
} from "react-calendar-timeline";
import dayjs from "dayjs";
import "react-calendar-timeline/style.css";
import "./Roadmap.css";


export const TimelineComponent = ({ items }) => {
    const defaultStart = dayjs().subtract(1, "month");
    const defaultEnd = dayjs().add(1, "month");
    const MIN_ROWS = 4;

    const paddedGroups = [
        ...items.map((item) => ({ id: item.group, title: "" })),
        ...Array.from({ length: Math.max(0, MIN_ROWS - new Set(items.map((item) => item.group)).size) }, (_, i) => ({
            id: `__placeholder_${i}`,
            title: "",
        })),
    ];

    useEffect(() => {
        // 마운트 후 resize 이벤트를 강제로 발생시켜 너비 재계산
        window.dispatchEvent(new Event("resize"));
    }, []);

    return (
        <div className="min-h-screen bg-zinc-100 p-10">
            <div className="rounded-[32px] bg-white p-8 shadow-xl">
                <div className="column" style={{ margin: "0px 0px 16px" }}>
                    <h1 className="typo-heading-small" style={{ color: "var(--color-cyan-700)", margin: "0", padding: "0" }}>
                        중3 · 1학기
                    </h1>
                    <p className="typo-body-xsmall" style={{ color: "var(--color-gray-500)", margin: "0", padding: "0" }}>
                        2026년 3월 ~ 7월
                    </p>
                </div>
                <Timeline
                    groups={paddedGroups}
                    items={items}
                    defaultTimeStart={defaultStart.toDate()}
                    defaultTimeEnd={defaultEnd.toDate()}
                    lineHeight={80}
                    itemHeightRatio={0.7}
                    sidebarWidth={0}
                    canMove
                    canResize={false}
                    stackItems
                    minZoom={7 * 24 * 60 * 60 * 1000}
                    maxZoom={180 * 24 * 60 * 60 * 1000}
                    itemRenderer={({ item, itemContext, getItemProps }) => {
                        const isSelected = itemContext.selected;

                        const backgroundColor =
                            item.status === "done"
                                ? isSelected
                                    ? "var(--color-cyan-300)"
                                    : "var(--color-cyan-200)"
                                : item.status === "in-progress"
                                    ? isSelected
                                        ? "var(--color-yellow-300)"
                                        : "var(--color-yellow-200)"
                                    : isSelected
                                        ? "var(--color-gray-300)"
                                        : "var(--color-gray-200)";

                        const textColor =
                            item.status === "done"
                                ? isSelected
                                    ? "var(--color-cyan-900)"
                                    : "var(--color-cyan-700)"
                                : item.status === "in-progress"
                                    ? isSelected
                                        ? "var(--color-yellow-900)"
                                        : "var(--color-yellow-700)"
                                    : isSelected
                                        ? "var(--color-gray-900)"
                                        : "var(--color-gray-700)";

                        return (
                            <div
                                {...getItemProps({
                                    className:
                                        "!border-none !shadow-none",
                                    style: {
                                        ...getItemProps().style,
                                        transition: "all 0.2s ease",
                                        backgroundColor,
                                        borderRadius: "999px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 12px",
                                    },
                                })}
                            >
                                <span
                                    style={{
                                        whiteSpace: "nowrap",
                                        color: textColor,
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    {item.title}
                                </span>
                            </div>
                        );
                    }}
                >
                    <TimelineHeaders>
                        <DateHeader
                            unit="month"
                            fontSize={14}
                            color="var(--color-gray-700)"
                            labelFormat={([startTime]) => `${startTime.format("M")}월`}
                        />
                    </TimelineHeaders>

                    <TodayMarker>
                        {({ styles }) => (
                            <div
                                style={{
                                    ...styles,
                                    backgroundColor: "#fb7185",
                                    width: 2,
                                    zIndex: 50,
                                }}
                                className="today-marker"
                            >
                                <div className="today-pill">오늘</div>
                            </div>
                        )}
                    </TodayMarker>
                </Timeline>
            </div>
        </div>
    );
}