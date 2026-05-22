import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "@/components/kanban/kanbanColumn";

export const KanbanBoard = ({
    items,
    alignItems,
    setAlignItems,
    setIsDone
}) => {

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setAlignItems((prev) => {
            const oldIndex = prev.indexOf(active.id);
            const newIndex = prev.indexOf(over.id);

            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    return (
        <div>
            {/* Header */}
            <div
                className="row"
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                }}
            >
                <span className="typo-heading-small">
                    항목별 보기
                </span>
            </div>

            {/* Drag Area */}
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={alignItems}
                    strategy={horizontalListSortingStrategy}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "flex-start",
                            overflowX: "hidden",
                            height: "fit-content",
                            maxHeight: "700px",
                        }}
                    >
                        {alignItems.map((status) => {
                            const filteredItems = items.filter(
                                (item) => item.status === status
                            );

                            return (
                                <KanbanColumn
                                    key={status}
                                    id={status}
                                    items={filteredItems}
                                    setIsDone={setIsDone}
                                />
                            );
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};