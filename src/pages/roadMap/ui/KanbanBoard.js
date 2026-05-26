import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    pointerWithin,
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { KanbanColumn } from "@/features/roadmap/ui/kanbanColumn";
import { KanbanCard } from "@/features/roadmap/ui/kanbanCard";

const autoScrollConfig = {
    enabled: false,
};

export const KanbanBoard = ({
    items,
    alignItems,
    setIsDone,
    onAdd,
    setDefaultStatus,
    isSubmitting,
    onChangeStatus,
    onCardClick,
}) => {
    const [activeItem, setActiveItem] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    const findColumnForItem = useCallback((itemId) => {
        const item = items.find((i) => i.roadmapItemId === itemId);
        return item?.status ?? null;
    }, [items]);

    const handleDragStart = useCallback((event) => {
        const item = items.find((i) => i.roadmapItemId === event.active.id);
        if (item) setActiveItem(item);
    }, [items]);

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        setActiveItem(null);

        if (!over) return;

        const cardId = active.id;
        let targetColumn = null;

        if (alignItems.includes(over.id)) {
            targetColumn = over.id;
        } else {
            targetColumn = findColumnForItem(over.id);
        }

        if (!targetColumn) return;

        const currentColumn = findColumnForItem(cardId);
        if (currentColumn === targetColumn) return;

        onChangeStatus(cardId, targetColumn);
    }, [alignItems, findColumnForItem, onChangeStatus]);

    const handleDragCancel = useCallback(() => {
        setActiveItem(null);
    }, []);

    return (
        <div>
            <div
                className="row"
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                }}
            >
                <span className="typo-heading-small">항목별 보기</span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
                autoScroll={autoScrollConfig}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                        overflowX: "auto",
                        minHeight: "400px",
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
                                onAdd={onAdd}
                                setDefaultStatus={setDefaultStatus}
                                isSubmitting={isSubmitting}
                                isDragging={!!activeItem}
                                onCardClick={onCardClick}
                            />
                        );
                    })}
                </div>

                <DragOverlay
                    dropAnimation={{
                        duration: 200,
                        easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                    }}
                >
                    {activeItem ? (
                        <KanbanCard item={activeItem} isOverlay />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
