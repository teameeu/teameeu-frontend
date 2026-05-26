import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./kanbanCard";
import { ROADMAP_STATUS, STATUS_LABEL } from "@/features/roadmap/hooks/useRoadmapManer";

const getColumnColors = (id) => {
    switch (id) {
        case ROADMAP_STATUS.DONE:
            return {
                bg: "var(--color-cyan-100)",
                border: "var(--color-cyan-100)",
                badge: "var(--color-cyan-300)",
                overBorder: "var(--color-cyan-400)",
                glow: "rgba(34, 211, 238, 0.25)",
            };
        case ROADMAP_STATUS.IN_PROGRESS:
            return {
                bg: "var(--color-yellow-100)",
                border: "var(--color-yellow-100)",
                badge: "var(--color-yellow-300)",
                overBorder: "var(--color-yellow-400)",
                glow: "rgba(251, 191, 36, 0.25)",
            };
        default:
            return {
                bg: "var(--color-gray-100)",
                border: "var(--color-gray-100)",
                badge: "var(--color-gray-300)",
                overBorder: "var(--color-gray-400)",
                glow: "rgba(156, 163, 175, 0.25)",
            };
    }
};

const bounceStyles = `
@keyframes bounceSlow {
    0% { transform: translateY(0); }
    100% { transform: translateY(-4px); }
}
@keyframes bounceFast {
    0% { transform: translateY(0); }
    100% { transform: translateY(-6px); }
}
`;

const getEmptyPlaceholderStyles = (id, isOver, isDragging) => {
    const colors = getColumnColors(id);
    
    let border = "1px solid var(--color-gray-200)";
    let backgroundColor = "rgba(255, 255, 255, 0.4)";
    let boxShadow = "none";
    let transform = "none";
    
    if (isOver) {
        border = `1px solid ${colors.overBorder}`;
        backgroundColor = `color-mix(in srgb, ${colors.bg} 50%, white)`;
        boxShadow = `0 12px 24px ${colors.glow}, 0 2px 4px rgba(0,0,0,0.02)`;
        transform = "scale(1.02) translateY(-2px)";
    } else if (isDragging) {
        border = `1px dashed ${colors.overBorder}`;
        backgroundColor = `color-mix(in srgb, ${colors.bg} 20%, white)`;
        boxShadow = "none";
        transform = "none";
    }
    
    return {
        flexGrow: 1,
        padding: "36px 20px",
        borderRadius: "16px",
        border,
        backgroundColor,
        boxShadow,
        transform,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: "160px",
        textAlign: "center",
        gap: "12px",
    };
};

const getEmptyIcon = (id, isDragging, isOver, colors) => {
    if (isDragging) {
        return (
            <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    animation: isOver 
                        ? "bounceFast 0.6s infinite alternate ease-in-out" 
                        : "bounceSlow 1.0s infinite alternate ease-in-out",
                    transition: "color 0.2s ease"
                }}
            >
                <path
                    d="M12 4V16M12 16L7 11M12 16L17 11"
                    stroke={isOver ? colors.overBorder : "var(--color-gray-500)"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 20H20"
                    stroke={isOver ? colors.overBorder : "var(--color-gray-500)"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    switch (id) {
        case ROADMAP_STATUS.TODO:
            return (
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="3" y="4" width="18" height="16" rx="3" stroke="var(--color-gray-400)" strokeWidth="1.8" />
                    <path d="M7 9H17" stroke="var(--color-gray-300)" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 13H13" stroke="var(--color-gray-300)" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="17" cy="13" r="1.2" fill="var(--color-gray-400)" />
                </svg>
            );
        case ROADMAP_STATUS.IN_PROGRESS:
            return (
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12"
                        stroke="var(--color-gray-400)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 7V12L14.5 13.5"
                        stroke="var(--color-gray-400)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M19 5L20 7L22 5"
                        stroke="var(--color-yellow-400)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        case ROADMAP_STATUS.DONE:
            return (
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="9" stroke="var(--color-gray-400)" strokeWidth="1.8" />
                    <path
                        d="M8.5 12.5L11 15L15.5 9.5"
                        stroke="var(--color-cyan-400)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        default:
            return null;
    }
};

export const KanbanColumn = ({ id, items, onAdd, setDefaultStatus, isSubmitting, isDragging, onCardClick }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    const colors = getColumnColors(id);

    return (
        <div
            ref={setNodeRef}
            style={{
                minWidth: "300px",
                width: "100%",
                padding: "16px",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                border: `2px solid ${isOver ? colors.overBorder : "transparent"}`,
                backgroundColor: isOver ? `color-mix(in srgb, ${colors.bg} 60%, white)` : colors.bg,
                transition: "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
                boxShadow: isOver ? `0 12px 28px ${colors.glow}, 0 0 0 1px ${colors.overBorder}` : "none",
                minHeight: "480px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    userSelect: "none",
                    marginBottom: "4px",
                    padding: "0 4px"
                }}
            >
                <span
                    className="typo-heading-small"
                    style={{
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "var(--color-gray-800)",
                        backgroundColor: colors.badge,
                        padding: "4px 16px",
                        borderRadius: "999px",
                        letterSpacing: "-0.2px"
                    }}
                >
                    {STATUS_LABEL[id] ?? "알 수 없음"}
                </span>

                <span
                    className="typo-body-small"
                    style={{ fontWeight: 600, color: "var(--color-gray-400)" }}
                >
                    {items.length}
                </span>
            </div>

            {items.map((item) => (
                <KanbanCard key={item.roadmapItemId} item={item} onClick={() => onCardClick?.(item.roadmapItemId)} />
            ))}

            {items.length === 0 && (
                <div style={getEmptyPlaceholderStyles(id, isOver, isDragging)}>
                    <style>{bounceStyles}</style>
                    {getEmptyIcon(id, isDragging, isOver, colors)}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span
                            style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: isOver ? colors.overBorder : "var(--color-gray-700)",
                                transition: "color 0.2s ease",
                                letterSpacing: "-0.2px"
                            }}
                        >
                            {isDragging 
                                ? (isOver ? "여기서 카드를 놓으세요" : "여기에 놓기")
                                : (id === ROADMAP_STATUS.TODO 
                                    ? "예정된 항목이 없습니다" 
                                    : id === ROADMAP_STATUS.IN_PROGRESS 
                                        ? "진행 중인 항목이 없습니다" 
                                        : "완료된 항목이 없습니다")}
                        </span>
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "var(--color-gray-400)",
                                maxWidth: "210px",
                                lineHeight: "1.45",
                                letterSpacing: "-0.2px"
                            }}
                        >
                            {isDragging
                                ? "마우스를 떼어 카드를 배치합니다"
                                : (id === ROADMAP_STATUS.TODO
                                    ? "새로운 진로 항목을 추가해 로드맵을 그려보세요"
                                    : id === ROADMAP_STATUS.IN_PROGRESS
                                        ? "예정된 항목을 드래그하여 이곳으로 시작해보세요"
                                        : "진행 중인 항목을 끌어서 완료해보세요")}
                        </span>
                    </div>
                </div>
            )}

            <button
                onClick={() => { setDefaultStatus(id); onAdd(); }}
                disabled={isSubmitting}
                style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--color-gray-200)",
                    backgroundColor: "var(--color-base-000)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.5 : 1,
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                    marginTop: items.length === 0 ? "0" : "auto"
                }}
                onMouseEnter={(e) => {
                    if (!isSubmitting) {
                        e.currentTarget.style.borderColor = "var(--color-gray-300)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isSubmitting) {
                        e.currentTarget.style.borderColor = "var(--color-gray-200)";
                        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
                    }
                }}
            >
                <span className="typo-body-small" style={{ fontWeight: 600, color: "var(--color-gray-800)" }}>추가하기</span>
                <span className="material-symbols-outlined typo-body-small" style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-gray-800)" }}>add</span>
            </button>
        </div>
    );
};
