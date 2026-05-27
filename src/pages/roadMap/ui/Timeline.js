import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Timeline, {
    TimelineHeaders,
    DateHeader,
} from "react-calendar-timeline";
import dayjs from "dayjs";
import "react-calendar-timeline/style.css";
import "./Roadmap.css";

const MIN_ROWS = 4;

const keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start_time",
    itemTimeEndKey: "end_time",
};

export const TimelineComponent = ({ items, title }) => {
    const isFirstMount = useRef(true);
    const today = useMemo(() => dayjs().valueOf(), []);
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
        const fromItems = Array.from(groupSet).map((groupId) => ({ id: groupId, title: "" }));
        const padding = Array.from(
            { length: Math.max(0, MIN_ROWS - groupSet.size) },
            (_, i) => ({ id: `__placeholder_${i}`, title: "" })
        );
        return [...fromItems, ...padding];
    }, [items]);

    const todayOffsetPercent = useMemo(() => {
        const duration = visibleTime.end - visibleTime.start;

        if (duration <= 0 || today < visibleTime.start || today > visibleTime.end) {
            return null;
        }

        return ((today - visibleTime.start) / duration) * 100;
    }, [today, visibleTime]);

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

        const { style, className, ...restProps } = getItemProps();

        return (
            <div
                style={{
                    ...style,
                    transition: "background-color 0.25s ease, color 0.25s ease",
                    backgroundColor,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    overflow: "hidden",
                    minWidth: 0,
                }}
                className={className}
                {...restProps}
            >
                <span
                    style={{
                        display: "block",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: textColor,
                        transition: "color 0.25s ease",
                        fontWeight: 600,
                        fontSize: "12px",
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
                    {title || "-"}
                </h1>
                <p className="typo-body-xsmall" style={{ color: "var(--color-gray-500)", margin: "0", padding: "0" }}>
                    2026년 3월 ~ 7월
                </p>
            </div>
            <div className="roadmap-timeline-shell">
                {todayOffsetPercent !== null && (
                    <div
                        className="today-overlay"
                        style={{ left: `${todayOffsetPercent}%` }}
                    >
                        <div className="today-pill">오늘</div>
                        <div className="today-marker" />
                    </div>
                )}

                <Timeline
                    groups={paddedGroups}
                    items={items}
                    keys={keys}
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
                </Timeline>
            </div>
        </div>
    );
};
