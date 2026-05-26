import { useState } from "react";
import { ROADMAP_STATUS } from "@/features/roadmap/hooks/useRoadmapManer";
import "@/features/grade/ui/components/GradeModal.css";

export const AddItemModal = ({ onClose, onAdd, defaultStatus = ROADMAP_STATUS.TODO }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState(defaultStatus);

    const statusLabel = (s) => {
        switch (s) {
            case ROADMAP_STATUS.DONE: return "완료";
            case ROADMAP_STATUS.IN_PROGRESS: return "진행 중";
            default: return "예정됨";
        }
    };

    const isValid = Boolean(title.trim() && startTime && endTime);

    return (
        <div className="grade-add-modal__backdrop" onClick={() => onClose()}>
            <article
                className="grade-add-modal__panel column"
                role="dialog"
                aria-modal="true"
                aria-labelledby="roadmap-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="grade-add-modal__header column">
                    <div className="grade-add-modal__header-top row">
                        <h3 id="roadmap-modal-title" className="typo-heading-medium">로드맵 항목 추가</h3>
                        <button
                            type="button"
                            className="grade-add-modal__close"
                            onClick={() => onClose()}
                            aria-label="로드맵 항목 추가 모달 닫기"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M7.2 7.2a1 1 0 0 1 1.4 0L12 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4L13.4 12l3.4 3.4a1 1 0 0 1-1.4 1.4L12 13.4l-3.4 3.4a1 1 0 0 1-1.4-1.4l3.4-3.4-3.4-3.4a1 1 0 0 1 0-1.4Z" />
                            </svg>
                        </button>
                    </div>
                </header>

                <section className="grade-add-modal__body">
                    <div className="grade-add-modal__fields column" style={{ gap: "12px" }}>
                        <input
                            type="text"
                            placeholder="항목 제목"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="설명"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="row" style={{ gap: "10px", width: "100%" }}>
                            <div className="column" style={{ flex: 1, gap: "4px" }}>
                                <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>시작일</span>
                                <input
                                    type="date"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    style={{ height: "48px", fontSize: "16px", padding: "12px 16px" }}
                                />
                            </div>
                            <div className="column" style={{ flex: 1, gap: "4px" }}>
                                <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>종료일</span>
                                <input
                                    type="date"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    style={{ height: "48px", fontSize: "16px", padding: "12px 16px" }}
                                />
                            </div>
                        </div>

                        <div className="column" style={{ gap: "4px", width: "100%" }}>
                            <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>상태</span>
                            <div className="dropdown" style={{ width: "100%", position: "relative" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        padding: "12px 16px",
                                        border: "1px solid var(--color-gray-200)",
                                        borderRadius: "12px",
                                        fontSize: "16px",
                                        color: "var(--color-gray-900)",
                                        backgroundColor: "#ffffff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        transition: "border-color 0.16s ease"
                                    }}
                                >
                                    <span>{statusLabel(status)}</span>
                                    <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--color-gray-400)" }}>expand_more</span>
                                </button>

                                {isOpen && (
                                    <ul
                                        style={{
                                            position: "absolute",
                                            bottom: "54px",
                                            left: 0,
                                            right: 0,
                                            backgroundColor: "#ffffff",
                                            border: "1px solid var(--color-gray-200)",
                                            borderRadius: "12px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                            padding: "6px 0",
                                            margin: 0,
                                            listStyle: "none",
                                            zIndex: 100
                                        }}
                                    >
                                        <li
                                            onClick={() => { setStatus(ROADMAP_STATUS.TODO); setIsOpen(false); }}
                                            style={{
                                                padding: "10px 16px",
                                                fontSize: "14px",
                                                color: "var(--color-gray-800)",
                                                cursor: "pointer",
                                                transition: "background-color 0.15s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-gray-050)"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            예정됨
                                        </li>
                                        <li
                                            onClick={() => { setStatus(ROADMAP_STATUS.IN_PROGRESS); setIsOpen(false); }}
                                            style={{
                                                padding: "10px 16px",
                                                fontSize: "14px",
                                                color: "var(--color-gray-800)",
                                                cursor: "pointer",
                                                transition: "background-color 0.15s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-gray-050)"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            진행 중
                                        </li>
                                        <li
                                            onClick={() => { setStatus(ROADMAP_STATUS.DONE); setIsOpen(false); }}
                                            style={{
                                                padding: "10px 16px",
                                                fontSize: "14px",
                                                color: "var(--color-gray-800)",
                                                cursor: "pointer",
                                                transition: "background-color 0.15s ease"
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-gray-050)"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        >
                                            완료
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="grade-add-modal__actions row" style={{ marginTop: "16px" }}>
                    <button
                        type="button"
                        className="grade-add-modal__button grade-add-modal__button--ghost"
                        onClick={() => onClose()}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="grade-add-modal__button grade-add-modal__button--primary"
                        onClick={() => onAdd({ title, description, startedAt: startTime, endedAt: endTime, status })}
                        disabled={!isValid}
                    >
                        저장
                    </button>
                </footer>
            </article>
        </div>
    );
};