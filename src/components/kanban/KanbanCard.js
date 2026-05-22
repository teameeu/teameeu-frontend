import dayjs from "dayjs";


export const KanbanCard = ({ item, setIsDone }) => {
    return (
        <div
            style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: `1px solid var(--color-gray-300)`,
                backgroundColor: "var(--color-base-000)",
                // color: `${item.status === "done" ? "var(--color-cyan-200)" : item.status === "in-progress" ? "var(--color-yellow-200)" : "var(--color-gray-200)"}`,
            }}
        >
            <div className="row todo-item" style={{ gap: "8px", alignItems: "left" }}>
                <input type="checkbox" id={`item-${item.id}`} checked={item.status === "done"} onChange={(e) => setIsDone(item.id, e.target.checked)} />
                <label htmlFor={`item-${item.id}`} className="typo-body-large todo-label">{item.title}</label>
            </div>
            <p className="typo-body-small" style={{ marginTop: "16px", marginBottom: "0", textAlign: "right", color: "var(--color-gray-400)" }}>
                ~{dayjs(item.end_time).format("YYYY-MM-DD")}
            </p>
        </div>
    );
};
