import { GradeListSkeleton } from "@/shared/ui/grade/GradeListSkeleton";
import "./Homepage.css";
import { GradeEmptyPlaceholder } from "@/features/grade/ui/components/GradeEmptyPlaceholder";
import { GradeAddModal } from "@/features/grade/ui/components/GradeAddModal";
import { GradeDeleteModal } from "@/features/grade/ui/components/GradeDeleteModal";
import { useGradeManager } from "@/features/grade/hooks/useGradeManager";
import { roadmapApi, unwrapApiData } from "@/shared/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";

export const DashBoards = () => {
    const { user } = useAuth();
    const [isOpenGradeModal, setIsOpenGradeModal] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [deletingGrade, setDeletingGrade] = useState(null);
    const [todoItems, setTodoItems] = useState([]);
    const [isRoadmapLoading, setIsRoadmapLoading] = useState(false);
    const [isTodoDeleting, setIsTodoDeleting] = useState(false);
    const [isTodoStatusSubmitting, setIsTodoStatusSubmitting] = useState(false);
    const [activeStatusMenuId, setActiveStatusMenuId] = useState(null);
    const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);
    const [isTodoSubmitting, setIsTodoSubmitting] = useState(false);
    const [todoForm, setTodoForm] = useState({
        title: "",
        description: "",
        startedAt: "",
        endedAt: "",
    });

    const { grade = [], isLoading = false , createGrade, updateGrade, deleteGrade, isSubmitting } = useGradeManager();
    const safeGrades = Array.isArray(grade) ? grade : [];

    const handleOpenCreateGradeModal = () => {
        setEditingGrade(null);
        setIsOpenGradeModal(true);
    };

    const handleOpenEditGradeModal = (gradeItem) => {
        setEditingGrade(gradeItem);
        setIsOpenGradeModal(true);
    };

    const handleSubmitGrade = async (payload) => {
        if (editingGrade?.gradeId) {
            return updateGrade(editingGrade.gradeId, payload);
        }
        return createGrade(payload);
    };

    const handleOpenDeleteGradeModal = (gradeItem) => {
        setDeletingGrade(gradeItem);
    };

    const handleConfirmDeleteGrade = async () => {
        if (!deletingGrade?.gradeId) return;
        await deleteGrade(deletingGrade.gradeId);
        setDeletingGrade(null);
    };

    const loadRoadmap = async () => {
        setIsRoadmapLoading(true);

        try {
            const { data } = await roadmapApi.getRoadmap();
            const payload = unwrapApiData(data);
            const items = Array.isArray(payload?.items) ? payload.items : [];
            setTodoItems(items);
        } catch (error) {
            setTodoItems([]);
        } finally {
            setIsRoadmapLoading(false);
        }
    };

    useEffect(() => {
        loadRoadmap();
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setActiveStatusMenuId(null);
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const isTodoFormValid = Boolean(
        todoForm.title.trim() &&
        todoForm.description.trim() &&
        todoForm.startedAt &&
        todoForm.endedAt
    );

    const handleOpenTodoModal = () => {
        setTodoForm({
            title: "",
            description: "",
            startedAt: "",
            endedAt: "",
        });
        setIsOpenTodoModal(true);
    };

    const handleSubmitTodo = async () => {
        if (!isTodoFormValid) return;
        if (isTodoSubmitting) return;

        setIsTodoSubmitting(true);
        try {
            await roadmapApi.createRoadmapItem({
                title: todoForm.title.trim(),
                description: todoForm.description.trim(),
                startedAt: todoForm.startedAt,
                endedAt: todoForm.endedAt,
            });
            setIsOpenTodoModal(false);
            await loadRoadmap();
        } finally {
            setIsTodoSubmitting(false);
        }
    };

    const getTodoStatusLabel = (status) => {
        switch (status) {
            case "DONE":
                return "완료";
            case "IN_PROGRESS":
                return "진행중";
            case "TODO":
            default:
                return "예정";
        }
    };

    const getTodoStatusClassName = (status) => {
        switch (status) {
            case "DONE":
                return "todo-status todo-status--done";
            case "IN_PROGRESS":
                return "todo-status todo-status--in-progress";
            case "TODO":
            default:
                return "todo-status todo-status--todo";
        }
    };

    const TodoStatusIcon = ({ status, className = "" }) => {
        if (status === "DONE") {
            return (
                <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
                    <circle cx="10" cy="10" r="9" fill="#DFF8EF" />
                    <path d="M6 10.2L8.7 13L14 7.6" fill="none" stroke="#0C8D66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }

        if (status === "IN_PROGRESS") {
            return (
                <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
                    <circle cx="10" cy="10" r="9" fill="#FFF2D7" />
                    <path d="M8 6.8L13.2 10L8 13.2V6.8Z" fill="#A66A00" />
                </svg>
            );
        }

        return (
            <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
                <circle cx="10" cy="10" r="9" fill="#EEF1F5" />
                <circle cx="10" cy="10" r="4.3" fill="none" stroke="#6D7485" strokeWidth="1.8" />
                <path d="M10 7.6V10.1L11.9 11.6" fill="none" stroke="#6D7485" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    };

    const handleDeleteTodoItem = async (roadmapItemId) => {
        if (!roadmapItemId) return;
        if (isTodoDeleting) return;

        const shouldDelete = window.confirm("이 할 일을 삭제할까요?");
        if (!shouldDelete) return;

        setIsTodoDeleting(true);
        try {
            await roadmapApi.deleteRoadmapItem(roadmapItemId);
            await loadRoadmap();
        } finally {
            setIsTodoDeleting(false);
        }
    };

    const statusOptions = [
        { value: "TODO", label: "예정" },
        { value: "IN_PROGRESS", label: "진행중" },
        { value: "DONE", label: "완료" },
    ];

    const handleUpdateTodoStatus = async (item, nextStatus) => {
        if (!item?.roadmapItemId) return;
        if (item.status === nextStatus) {
            setActiveStatusMenuId(null);
            return;
        }

        setIsTodoStatusSubmitting(true);
        try {
            await roadmapApi.updateRoadmapItem(item.roadmapItemId, {
                title: item.title ?? "",
                description: item.description ?? "",
                startedAt: item.startedAt,
                endedAt: item.endedAt,
                status: nextStatus,
            });
            setActiveStatusMenuId(null);
            await loadRoadmap();
        } finally {
            setIsTodoStatusSubmitting(false);
        }
    };


    return (
        <div className="column gap-24">

            {/* 성적 등록 모달 */}
            {isOpenGradeModal ? (
                <GradeAddModal
                    onClose={() => setIsOpenGradeModal(false)}
                    onSubmit={handleSubmitGrade}
                    isSubmitting={isSubmitting}
                    initialValues={editingGrade}
                    mode={editingGrade ? "edit" : "create"}
                />
            ) : null}
            {deletingGrade ? (
                <GradeDeleteModal
                    onClose={() => setDeletingGrade(null)}
                    onConfirm={handleConfirmDeleteGrade}
                    isSubmitting={isSubmitting}
                    subject={deletingGrade.subject}
                />
            ) : null}
            {isOpenTodoModal ? (
                <div className="grade-add-modal__backdrop" onClick={() => setIsOpenTodoModal(false)}>
                    <article
                        className="grade-add-modal__panel column"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="todo-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <header className="grade-add-modal__header column">
                            <div className="grade-add-modal__header-top row">
                                <h3 id="todo-modal-title" className="typo-heading-medium">할 일 추가</h3>
                                <button
                                    type="button"
                                    className="grade-add-modal__close"
                                    onClick={() => setIsOpenTodoModal(false)}
                                    disabled={isTodoSubmitting}
                                    aria-label="할 일 추가 모달 닫기"
                                >
                                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                        <path d="M7.2 7.2a1 1 0 0 1 1.4 0L12 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4L13.4 12l3.4 3.4a1 1 0 0 1-1.4 1.4L12 13.4l-3.4 3.4a1 1 0 0 1-1.4-1.4l3.4-3.4-3.4-3.4a1 1 0 0 1 0-1.4Z" />
                                    </svg>
                                </button>
                            </div>
                        </header>
                        <section className="grade-add-modal__body">
                            <div className="grade-add-modal__fields column">
                                <input
                                    value={todoForm.title}
                                    onChange={(event) => setTodoForm((prev) => ({ ...prev, title: event.target.value }))}
                                    placeholder="제목"
                                    disabled={isTodoSubmitting}
                                />
                                <input
                                    value={todoForm.description}
                                    onChange={(event) => setTodoForm((prev) => ({ ...prev, description: event.target.value }))}
                                    placeholder="설명"
                                    disabled={isTodoSubmitting}
                                />
                                <input
                                    type="date"
                                    value={todoForm.startedAt}
                                    onChange={(event) => setTodoForm((prev) => ({ ...prev, startedAt: event.target.value }))}
                                    disabled={isTodoSubmitting}
                                />
                                <input
                                    type="date"
                                    value={todoForm.endedAt}
                                    onChange={(event) => setTodoForm((prev) => ({ ...prev, endedAt: event.target.value }))}
                                    disabled={isTodoSubmitting}
                                />
                            </div>
                        </section>
                        <footer className="grade-add-modal__actions row">
                            <button
                                type="button"
                                className="grade-add-modal__button grade-add-modal__button--ghost"
                                onClick={() => setIsOpenTodoModal(false)}
                                disabled={isTodoSubmitting}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="grade-add-modal__button grade-add-modal__button--primary"
                                onClick={handleSubmitTodo}
                                disabled={!isTodoFormValid || isTodoSubmitting}
                            >
                                저장
                            </button>
                        </footer>
                    </article>
                </div>
            ) : null}
            {/* 메인 대시보드 */}
            <div className="board">
                <div className="row board-header">
                    <h1 className="typo-heading-medium">나의 할 일</h1>
                    <button className="add-btn" onClick={handleOpenTodoModal}>
                        <span className="material-symbols-outlined">add</span>추가하기
                    </button>
                </div>
                <table>
                    <tbody className="todo">
                        {isRoadmapLoading ? (
                            <tr>
                                <td className="typo-body-small todo-item" style={{ width: "100%", color: "var(--color-gray-500)" }}>
                                    로드맵을 불러오는 중...
                                </td>
                            </tr>
                        ) : todoItems.length === 0 ? (
                            <tr>
                                <td className="typo-body-small todo-item" style={{ width: "100%", color: "var(--color-gray-500)" }}>
                                    등록된 로드맵 항목이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            todoItems.map((item, idx) => {
                                const period = item.startedAt && item.endedAt
                                    ? `${item.startedAt} ~ ${item.endedAt}`
                                    : "-";

                                return (
                                    <tr key={item.roadmapItemId ?? `${item.title}-${idx}`}>
                                        <td className="typo-body-small todo-item todo-col-status">
                                            <div className="todo-status-menu" onClick={(event) => event.stopPropagation()}>
                                                <button
                                                    type="button"
                                                    className={`${getTodoStatusClassName(item.status)} todo-status--button`}
                                                    disabled={isTodoStatusSubmitting}
                                                    onClick={() => setActiveStatusMenuId((prev) => (prev === item.roadmapItemId ? null : item.roadmapItemId))}
                                                >
                                                    <TodoStatusIcon status={item.status} className="todo-status__icon-svg" />
                                                    <span>{getTodoStatusLabel(item.status)}</span>
                                                    <span className="material-symbols-outlined todo-status-menu__arrow">expand_more</span>
                                                </button>
                                                {activeStatusMenuId === item.roadmapItemId ? (
                                                    <div className="todo-status-menu__list">
                                                        {statusOptions.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                type="button"
                                                                className={`todo-status-menu__item ${item.status === option.value ? "is-active" : ""}`}
                                                                disabled={isTodoStatusSubmitting}
                                                                onClick={() => handleUpdateTodoStatus(item, option.value)}
                                                            >
                                                                <TodoStatusIcon status={option.value} className="todo-status-menu__item-icon-svg" />
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </td>
                                        <td className="todo-item todo-col-title">
                                            <span className="typo-body-small todo-label">{item.title}</span>
                                        </td>
                                        <td className="typo-body-small todo-item todo-col-date">
                                            <span>{period}</span>
                                        </td>
                                        <td className="typo-body-small todo-item todo-col-action">
                                            <button
                                                type="button"
                                                className="todo-delete-btn"
                                                disabled={isTodoDeleting}
                                                onClick={() => handleDeleteTodoItem(item.roadmapItemId)}
                                            >
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {/* 2열 */}
            <div className="row gap-24">
                {/* 나의 달성 현황 */}
                <div className="board">
                    <div className="row board-header">
                        <h1 className="typo-heading-medium">나의 달성 현황</h1>
                    </div>
                    <div className="row subtitle" style={{justifyContent: "space-between"}}>
                        <span className="row typo-body-large">전체 활동 달성도</span>
                        <span className="row typo-body-large color-cyan-600">70%</span>
                    </div>
                    <div className="row gap-16">
                        <div className="small-gray-box column">
                            <p className="typo-body-large">진행중</p>
                            <h1 className="typo-heading-large color-cyan-600">3</h1>
                        </div>
                        <div className="small-gray-box column">
                            <p className="typo-body-large">달성도</p>
                            <h1 className="typo-heading-large color-cyan-600">20%</h1>
                        </div>
                    </div>
                </div>
                {/* 나의 진로 탐색 */}
                <div className="board">
                    <div className="row board-header">
                        <h1 className="typo-heading-medium">나의 진로 탐색</h1>
                        <button className="add-btn"><span className="material-symbols-outlined">add</span>추가하기</button>
                    </div>
                    <div className="row subtitle">
                        <span className="typo-body-large">{user?.userName ?? "사용자"}님의 진로 정보</span>
                    </div>
                    <div className="row gap-16">
                        <div className="small-gray-box column">
                            <p className="typo-body-large">희망 진로</p>
                            <h1 className="typo-heading-medium color-cyan-600">{user?.career ?? "-"}</h1>
                        </div>
                        <div className="small-gray-box column">
                            <p className="typo-body-large">희망 학과/부서</p>
                            <h1 className="typo-heading-medium color-cyan-600">{user?.department ?? "-"}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* 3열 */}
            <div className="board" style={{ backgroundColor: "var(--color-cyan-050)" }}>
                {/* 나의 성적표 */}
                <div className="row board-header">
                    <h1 className="typo-heading-medium ">나의 성적표</h1>
                    <button className="add-btn" onClick={handleOpenCreateGradeModal}>
                        <span className="material-symbols-outlined">add</span>
                        추가하기
                    </button>
                </div>
                <table className="grade-table">
                    <thead className="typo-body-large">
                        <tr className="grade-table__head-row">            
                            <td className="grade-table__subject">과목</td>
                            <td className="grade-table__metric">점수</td>
                            <td className="grade-table__metric">성취도</td>
                            <td className="grade-table__metric">과목평균</td>
                            <td className="grade-table__metric">표준편차</td>
                            <td className="grade-table__action-head">관리</td>
                        </tr>
                    </thead>
                    <tbody className="typo-body-small">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6}>
                                    <GradeListSkeleton />
                                </td>
                            </tr>
                        ) : safeGrades.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    <GradeEmptyPlaceholder />
                                </td>
                            </tr>
                        ) : (
                            safeGrades.map((data) => (
                                <tr key={data.gradeId}>
                                    <td className="grade-table__subject">{data.subject}</td>
                                    <td className="grade-table__metric">{data.score}</td>
                                    <td className="grade-table__metric">{data.grade ?? "-"}</td>
                                    <td className="grade-table__metric">{data.average ?? "-"}</td>
                                    <td className="grade-table__metric">{data.stddev ?? "-"}</td>
                                    <td className="grade-table__action-cell">
                                        <button
                                            type="button"
                                            className="grade-table__action-btn grade-table__action-btn--edit"
                                            disabled={isSubmitting}
                                            onClick={() => handleOpenEditGradeModal(data)}
                                            aria-label="성적 수정"
                                        >
                                            <span className="material-symbols-outlined grade-table__icon-btn">edit</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="grade-table__action-btn grade-table__action-btn--plain-delete"
                                            disabled={isSubmitting}
                                            onClick={() => handleOpenDeleteGradeModal(data)}
                                            aria-label="성적 삭제"
                                        >
                                            <span className="grade-table__x-icon" aria-hidden="true">x</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
