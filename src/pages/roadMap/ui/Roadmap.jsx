import { useState, useMemo } from "react";
import { Header } from "./Header";
import { TimelineComponent } from "./Timeline";
import { KanbanBoard } from "./KanbanBoard";
import { AddItemModal } from "@/features/roadmap/actions/addItem";
import { KanbanDetailPanel } from "@/features/roadmap/ui/kanbanDetailPanel";
import { useRoadmapManager, ROADMAP_STATUS } from "@/features/roadmap/hooks/useRoadmapManer";



export const Roadmap = () => {
    const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);


    const [alignItems, setAlignItems] = useState([
        ROADMAP_STATUS.TODO,
        ROADMAP_STATUS.IN_PROGRESS,
        ROADMAP_STATUS.DONE,
    ]);

    const [defaultStatus, setDefaultStatus] = useState(ROADMAP_STATUS.TODO);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // TODO: - 사용자 정보 조회 api 연동 후 구현
    const [dDay] = useState("-");
    const [dreamJob] = useState("-");


    const {
        items,
        isLoading,
        isSubmitting,
        error,
        todoCount,
        inProgressCount,
        doneCount,
        achievement,
        createItem,
        changeStatus,
        updateItem,
        deleteItem,
    } = useRoadmapManager();




    const handleAddItemModal = async (formData) => {
        if (formData && formData.title) {
            await createItem({
                title: formData.title,
                description: formData.description || "",
                startedAt: formData.startedAt || formData.startTime || "",
                endedAt: formData.endedAt || formData.endTime || "",
                status: formData.status || ROADMAP_STATUS.TODO,
            });
        }
        setIsOpenAddItemModal(false);
        setDefaultStatus(ROADMAP_STATUS.TODO);
    };

    const openAddModal = () => {
        setIsOpenAddItemModal(true);
    };


    const timelineItems = useMemo(() => items.map((item) => ({
        id: item.roadmapItemId,
        group: item.roadmapItemId,
        title: item.title,
        start_time: new Date(item.startedAt).getTime(),
        end_time: new Date(item.endedAt).getTime(),
        status: item.status,
    })), [items]);



    return (
        <div className="column" style={{ margin: "96px 120px 120px", gap: "64px" }}>
            {/* MARK: - 아이템 추가 모달 */}
            {isOpenAddItemModal && (
                <AddItemModal
                    onClose={() => { setIsOpenAddItemModal(false); setDefaultStatus(ROADMAP_STATUS.TODO); }}
                    onAdd={handleAddItemModal}
                    defaultStatus={defaultStatus}
                />
            )}

            {/* MARK: - 로딩 에러 alert */}
            {error && (
                <div className="typo-body-small" style={{ color: "var(--color-red-500)", textAlign: "center" }}>
                    {error}
                </div>
            )}

            <Header
                dDay={dDay}
                dreamJob={dreamJob}
                inProgressCount={inProgressCount}
                scheduledCount={todoCount}
                completedCount={doneCount}
                achievement={achievement}
                useAddRoadmapItem={openAddModal}
            />

            {/* MARK: - 타임라인 */}
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
                    {isLoading && items.length === 0 ? (
                        <div className="typo-body-small" style={{ padding: "40px", textAlign: "center", color: "var(--color-gray-500)" }}>
                            로드맵을 불러오는 중...
                        </div>
                    ) : timelineItems.length > 0 ? (
                        <TimelineComponent items={timelineItems} />
                    ) : (
                        <div className="typo-body-small" style={{ padding: "40px", textAlign: "center", color: "var(--color-gray-500)" }}>
                            등록된 항목이 없습니다. 항목을 추가해보세요!
                        </div>
                    )}
                </div>
            </div>

            {/* MARK: - 칸반 보드*/}
            <KanbanBoard
                items={items}
                alignItems={alignItems}
                onAdd={openAddModal}
                setDefaultStatus={setDefaultStatus}
                isSubmitting={isSubmitting}
                onChangeStatus={changeStatus}
                onCardClick={setSelectedItemId}
            />

            {/*MARK: - 상세 조회 모달 */}
            {selectedItemId && (
                <KanbanDetailPanel
                    itemId={selectedItemId}
                    onClose={() => setSelectedItemId(null)}
                    onUpdate={updateItem}
                    onDelete={deleteItem}
                />
            )}
        </div>
    );
}