import { GradeListSkeleton } from "@/shared/ui/grade/GradeListSkeleton";
import "./Homepage.css";
import { GradeEmptyPlaceholder } from "@/features/grade/ui/components/GradeEmptyPlaceholder";
import { GradeAddModal } from "@/features/grade/ui/components/GradeAddModal";
import { useGradeManager } from "@/features/grade/hooks/useGradeManager";
import { useState } from "react";

export const DashBoards = ({ handleAdd }) => {
    const [isOpenGradeModal, setIsOpenGradeModal] = useState(false);

    const todos = [
        { id: 1, text: "할 일 1", date: "~11월 11일" },
        { id: 2, text: "할 일 2", date: "~11월 12일" },
        { id: 3, text: "할 일 3", date: "~11월 13일" },
    ];

    const { grade = [], isLoading = false , createGrade, isSubmitting } = useGradeManager();
    const safeGrades = Array.isArray(grade) ? grade : [];

    const handleAddGrade = async (payload) => {
        return createGrade(payload)
    };


    return (
        <div className="column gap-24">

            {/* 성적 등록 모달 */}
            {isOpenGradeModal ? (
                <GradeAddModal
                    onClose={() => setIsOpenGradeModal(false)}
                    onSubmit={handleAddGrade}
                    isSubmitting={isSubmitting}
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
                    <button className="add-btn" onClick={() => setIsOpenGradeModal(true)}>
                        <span className="material-symbols-outlined">add</span>
                        추가하기
                    </button>
                </div>
                <table style={{ width: "100%", textAlign: "center" }}>
                    <thead className="typo-body-large">
                        <tr style={{boxShadow:"inset 0 -2px 0 var(--color-gray-400)"}}>            
                            <td style={{textAlign:"left", padding: "16px 8px"}}>과목</td>
                            <td style={{width: "100px", whiteSpace: "nowrap"}}>점수</td>
                            <td style={{width: "100px", whiteSpace: "nowrap"}}>성취도</td>
                            <td style={{width: "100px", whiteSpace: "nowrap"}}>과목평균</td>
                            <td style={{width: "100px", whiteSpace: "nowrap"}}>표준편차</td>
                            <td style={{textAlign:"center", padding: "16px 8px"}}>비고</td>
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
                                    <td style={{ textAlign: "left", padding: "16px 8px", width: "200px" }}>{data.subject}</td>
                                    <td style={{ width: "100px", whiteSpace: "nowrap" }}>{data.score}</td>
                                    <td style={{ width: "100px", whiteSpace: "nowrap" }}>{data.grade ?? "-"}</td>
                                    <td style={{ width: "100px", whiteSpace: "nowrap" }}>{data.average ?? "-"}</td>
                                    <td style={{ width: "100px", whiteSpace: "nowrap" }}>{data.stddev ?? "-"}</td>
                                    <td style={{ textAlign: "center", padding: "16px 8px" }}>{data.detail ?? "-"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};