import dayjs from "dayjs";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const KanbanCard = ({ item, isOverlay = false, onClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({
        id: item.roadmapItemId,
        disabled: isOverlay,
    });

    const dragStyle = transform
        ? { transform: CSS.Translate.toString(transform) }
        : {};

    return (
        <div
            ref={!isOverlay ? setNodeRef : undefined}
            {...(!isOverlay ? listeners : {})}
            {...(!isOverlay ? attributes : {})}
            onClick={!isOverlay ? onClick : undefined}
            style={{
                padding: "14px 16px",
                borderRadius: "12px",
                border: isOverlay
                    ? "1px solid var(--color-cyan-300)"
                    : "1px solid var(--color-gray-200)",
                backgroundColor: "var(--color-base-000)",
                opacity: isDragging ? 0 : 1,
                cursor: isOverlay ? "grabbing" : "pointer",
                touchAction: "none",
                transition: isDragging
                    ? "none"
                    : "opacity 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                boxShadow: isOverlay
                    ? "0 12px 28px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)"
                    : "none",
                transform: isOverlay ? "scale(1.03)" : undefined,
                ...dragStyle,
            }}
        >
            <span className="typo-body-large" style={{ color: "var(--color-gray-900)" }}>
                {item.title}
            </span>
            {item.endedAt && (
                <p
                    className="typo-body-small"
                    style={{
                        marginTop: "10px",
                        marginBottom: "0",
                        textAlign: "right",
                        color: "var(--color-gray-400)",
                    }}
                >
                    ~{dayjs(item.endedAt).format("YYYY-MM-DD")}
                </p>
            )}
        </div>
    );
};
