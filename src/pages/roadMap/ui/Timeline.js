import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Timeline, {
    TimelineHeaders,
    DateHeader,
    TodayMarker,
} from "react-calendar-timeline";
import dayjs from "dayjs";
import "react-calendar-timeline/style.css";
import "./Roadmap.css";

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const MIN_ROWS = 4;

export const TimelineComponent = ({ items }) => {
    const isFirstMount = useRef(true);

    const [visibleTime, setVisibleTime] = useState(() => ({
        start: dayjs().subtract(1, "month").valueOf(),
        end: dayjs().add(1, "month").valueOf(),
    }));

    const handleTimeChange = useCallback((start, end, updateScrollCanvas) => {
        setVisibleTime({ start, end });
        updateScrollCanvas(start, end);
    }, []);

    const paddedGroups = useMemo(() => {
        const groupSet = new Set(items.map((item) => item.group));
        const fromItems = items.map((item) => ({ id: item.group, title: "" }));
        const padding = Array.from(
            { length: Math.max(0, MIN_ROWS - groupSet.size) },
            (_, i) => ({ id: `__placeholder_${i}`, title: "" })
        );
        return [...fromItems, ...padding];
    }, [items]);

    const itemRenderer = useCallback(({ item, itemContext, getItemProps }) => {
        const isSelected = itemContext.selected;

        const backgroundColor =
            item.status === "DONE"
                ? isSelected ? "var(--color-cyan-300)" : "var(--color-cyan-200)"
                : item.status === "IN_PROGRESS"
                    ? isSelected ? "var(--color-yellow-300)" : "var(--color-yellow-200)"
                    : isSelected ? "var(--color-gray-300)" : "var(--color-gray-200)";

        const textColor =
            item.status === "DONE"
                ? isSelected ? "var(--color-cyan-900)" : "var(--color-cyan-700)"
                : item.status === "IN_PROGRESS"
                    ? isSelected ? "var(--color-yellow-900)" : "var(--color-yellow-700)"
                    : isSelected ? "var(--color-gray-900)" : "var(--color-gray-700)";

        return (
            <div
                {...getItemProps({
                    className: "!border-none !shadow-none",
                    style: {
                        ...getItemProps().style,
                        transition: "background-color 0.25s ease, color 0.25s ease",
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
                        transition: "color 0.25s ease",
                    }}
                >
                    {item.title}
                </span>
            </div>
        );
    }, []);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            window.dispatchEvent(new Event("resize"));
        }
    }, []);

    return (
        <div style={{ width: "100%", height: "100%" }}>
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
                visibleTimeStart={visibleTime.start}
                visibleTimeEnd={visibleTime.end}
                onTimeChange={handleTimeChange}
                lineHeight={80}
                itemHeightRatio={0.7}
                sidebarWidth={0}
                canMove={false}
                canResize={false}
                stackItems
                minZoom={7 * 24 * 60 * 60 * 1000}
                maxZoom={180 * 24 * 60 * 60 * 1000}
                itemRenderer={itemRenderer}
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
    );
};