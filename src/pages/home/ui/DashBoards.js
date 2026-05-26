import { GradeListSkeleton } from "@/shared/ui/grade/GradeListSkeleton";
import "./Homepage.css";
import { GradeEmptyPlaceholder } from "@/features/grade/ui/components/GradeEmptyPlaceholder";
import { GradeAddModal } from "@/features/grade/ui/components/GradeAddModal";
import { GradeDeleteModal } from "@/features/grade/ui/components/GradeDeleteModal";
import { useGradeManager } from "@/features/grade/hooks/useGradeManager";
import { useState } from "react";

export const DashBoards = ({ handleAdd }) => {
    const [isOpenGradeModal, setIsOpenGradeModal] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [deletingGrade, setDeletingGrade] = useState(null);

    const todos = [
        { id: 1, text: "할 일 1", date: "~11월 11일" },
        { id: 2, text: "할 일 2", date: "~11월 12일" },
        { id: 3, text: "할 일 3", date: "~11월 13일" },
    ];

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
            {/* 메인 대시보드 */}
            <div className="board">
                <div className="row board-header">
                    <h1 className="typo-heading-medium">나의 할 일</h1>
                    <button className="add-btn" onClick={() => handleAdd({ title: "", startTime: "", endTime: "", status: "scheduled" })}>
                        <span className="material-symbols-outlined">add</span>추가하기
                    </button>
                </div>
                <table>
                    <tbody className="todo">
                        {todos.map((todo, idx) => (
                            <tr key={todo.id}>
                                <td className="todo-item" style={{width: "100%"}}>
                                    <input type="checkbox" id={`todo-${idx}`} />
                                    <label htmlFor={`todo-${idx}`} className="typo-body-small todo-label">{todo.text}</label>
                                </td>
                                <td className="typo-body-small todo-item" style={{color: "var(--color-gray-600)", width: "fit-content", whiteSpace: "nowrap"}}><span>{todo.date}</span></td>
                                <td className="typo-body-small todo-item td-right" style={{color: "var(--color-gray-600)", width: "fit-content", whiteSpace: "nowrap"}}><span>삭제</span></td>
                            </tr>
                        ))}
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
                        <span className="typo-body-large">김이름님은</span>
                        <div className="type-tag">
                            <span>C유형</span></div>
                        <span className="typo-body-large">이에요</span>
                    </div>
                    <div className="row gap-16">
                        <div className="small-gray-box column">
                            <p className="typo-body-large">나의 진로</p>
                            <h1 className="typo-heading-medium color-cyan-600">사육사</h1>
                        </div>
                        <div className="small-gray-box column">
                            <p className="typo-body-large">추천 진로</p>
                            <h1 className="typo-heading-medium color-cyan-600">경찰관</h1>
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
