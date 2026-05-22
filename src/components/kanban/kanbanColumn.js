import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanCard } from "./kanbanCard";


export const KanbanColumn = ({ id, items, setIsDone, onAdd }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        minWidth: "300px",
        width: "100%",
        padding: "16px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: `1px solid ${id === "done" ? "var(--color-cyan-100)" : id === "in-progress" ? "var(--color-yellow-100)" : "var(--color-gray-100)"}`,
        backgroundColor: `${id === "done" ? "var(--color-cyan-100)" : id === "in-progress" ? "var(--color-yellow-100)" : "var(--color-gray-100)"}`,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
        >
            <div
                {...attributes}
                {...listeners}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "grab",
                    userSelect: "none",
                }}
            >
                <span
                    className="typo-heading-small"
                    style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "var(--color-gray-900)",
                        backgroundColor: `${id === "done" ? "var(--color-cyan-300)" : id === "in-progress" ? "var(--color-yellow-300)" : "var(--color-gray-300)"}`,
                        padding: "2px 16px",
                        borderRadius: "999px",
                    }}
                >
                    {id === "done" ? "완료된 항목" : id === "in-progress" ? "진행 중 항목" : "예정된 항목"}
                </span>

                <span
                    className="typo-body-small"
                    style={{
                        color: "var(--color-gray-400)",
                    }}
                >
                    {items.length}
                </span>
            </div>

            {items.map((item) => (
                <KanbanCard
                    key={item.id}
                    item={item}
                    setIsDone={setIsDone}
                />
            ))}
            <button
                onClick={onAdd}
                style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: `1px solid var(--color-gray-300)`,
                    backgroundColor: "var(--color-base-000)",
                    alignItems: "center", 
                    justifyContent: "center"
                }}>
                <span className="typo-body-small" style={{ color: "var(--color-gray-900)" }}>
                    추가하기
                </span>
                <span className="material-symbols-outlined typo-body-small" style={{ color: "var(--color-gray-900)" }}>add</span>

            </button>
        </div>
    );
};
