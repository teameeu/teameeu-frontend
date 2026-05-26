import { useState, useEffect } from "react";
import { roadmapApi, unwrapApiData } from "@/shared/api";
import { ROADMAP_STATUS, STATUS_LABEL } from "@/features/roadmap/hooks/useRoadmapManer";
import { RoadmapDeleteModal } from "@/features/roadmap/actions/RoadmapDeleteModal";
import "@/features/grade/ui/components/GradeModal.css";

export const KanbanDetailPanel = ({ itemId, onClose, onUpdate, onDelete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        startedAt: "",
        endedAt: "",
        status: ROADMAP_STATUS.TODO,
    });

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const { data } = await roadmapApi.getRoadmapItem(itemId);
                const payload = unwrapApiData(data);
                if (payload) {
                    setForm({
                        title: payload.title ?? "",
                        description: payload.description ?? "",
                        startedAt: payload.startedAt ?? "",
                        endedAt: payload.endedAt ?? "",
                        status: payload.status ?? ROADMAP_STATUS.TODO,
                    });
                }
            } catch (err) {
                console.error("상세 정보 조회 실패:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (itemId) {
            fetchDetails();
        }
    }, [itemId]);

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        if (!form.title.trim()) return;
        setIsSubmitting(true);
        try {
            await onUpdate(itemId, {
                title: form.title.trim(),
                description: form.description,
                startedAt: form.startedAt,
                endedAt: form.endedAt,
                status: form.status,
            });
            handleClose();
        } catch (err) {
            console.error("항목 수정 실패:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const getStatusColors = (status) => {
        switch (status) {
            case ROADMAP_STATUS.DONE:
                return {
                    bg: "var(--color-cyan-100)",
                    color: "var(--color-cyan-700)",
                };
            case ROADMAP_STATUS.IN_PROGRESS:
                return {
                    bg: "var(--color-yellow-100)",
                    color: "var(--color-yellow-700)",
                };
            default:
                return {
                    bg: "var(--color-gray-100)",
                    color: "var(--color-gray-700)",
                };
        }
    };

    const statusColors = getStatusColors(form.status);

    return (
        <div className="grade-add-modal__backdrop" onClick={handleClose}>
            <article
                className="grade-add-modal__panel column"
                role="dialog"
                aria-modal="true"
                aria-labelledby="roadmap-detail-title"
                style={{ maxWidth: "500px" }}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="grade-add-modal__header column">
                    <div className="grade-add-modal__header-top row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <h3 id="roadmap-detail-title" className="typo-heading-medium" style={{ fontSize: "20px" }}>로드맵 상세 정보</h3>
                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    backgroundColor: statusColors.bg,
                                    color: statusColors.color,
                                    letterSpacing: "-0.2px"
                                }}
                            >
                                {STATUS_LABEL[form.status]}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="grade-add-modal__close"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            aria-label="상세 모달 닫기"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M7.2 7.2a1 1 0 0 1 1.4 0L12 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4L13.4 12l3.4 3.4a1 1 0 0 1-1.4 1.4L12 13.4l-3.4 3.4a1 1 0 0 1-1.4-1.4l3.4-3.4-3.4-3.4a1 1 0 0 1 0-1.4Z" />
                            </svg>
                        </button>
                    </div>
                </header>

                {isLoading ? (
                    <div style={{ padding: "40px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px" }}>
                        <div
                            style={{
                                width: "24px",
                                height: "24px",
                                border: "2px solid var(--color-cyan-100)",
                                borderTopColor: "var(--color-cyan-500)",
                                borderRadius: "50%",
                                animation: "spin 0.8s linear infinite",
                            }}
                        />
                        <span style={{ fontSize: "14px", color: "var(--color-gray-400)" }}>불러오는 중...</span>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : (
                    <section className="grade-add-modal__body">
                        <div className="grade-add-modal__fields column" style={{ gap: "12px" }}>
                            <div className="column" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>제목</span>
                                <input
                                    type="text"
                                    placeholder="항목 제목"
                                    value={form.title}
                                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                    style={{ height: "48px", fontSize: "16px", padding: "12px 16px" }}
                                />
                            </div>

                            <div className="column" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>설명</span>
                                <textarea
                                    placeholder="설명을 입력하세요..."
                                    value={form.description}
                                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    style={{
                                        width: "100%",
                                        minHeight: "100px",
                                        padding: "12px 16px",
                                        border: "1px solid var(--color-gray-200)",
                                        borderRadius: "12px",
                                        fontSize: "15px",
                                        lineHeight: "1.5",
                                        color: "var(--color-gray-900)",
                                        backgroundColor: "#ffffff",
                                        outline: "none",
                                        resize: "none",
                                        transition: "border-color 0.16s ease"
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-cyan-500)";
                                        e.currentTarget.style.boxShadow = "0 0 0 2px var(--color-cyan-100)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-gray-200)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            <div className="row" style={{ gap: "10px", width: "100%" }}>
                                <div className="column" style={{ flex: 1, gap: "4px" }}>
                                    <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>시작일</span>
                                    <input
                                        type="date"
                                        value={form.startedAt}
                                        onChange={(e) => setForm(prev => ({ ...prev, startedAt: e.target.value }))}
                                        style={{ height: "48px", fontSize: "16px", padding: "12px 16px" }}
                                    />
                                </div>
                                <div className="column" style={{ flex: 1, gap: "4px" }}>
                                    <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>종료일</span>
                                    <input
                                        type="date"
                                        value={form.endedAt}
                                        onChange={(e) => setForm(prev => ({ ...prev, endedAt: e.target.value }))}
                                        style={{ height: "48px", fontSize: "16px", padding: "12px 16px" }}
                                    />
                                </div>
                            </div>

                            <div className="column" style={{ gap: "4px", width: "100%" }}>
                                <span style={{ fontSize: "12px", color: "var(--color-gray-400)", fontWeight: 600, paddingLeft: "4px" }}>상태</span>
                                <div className="dropdown" style={{ width: "100%", position: "relative" }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                                        <span>{STATUS_LABEL[form.status]}</span>
                                        <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "var(--color-gray-400)" }}>expand_more</span>
                                    </button>

                                    {isDropdownOpen && (
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
                                                onClick={() => { setForm(prev => ({ ...prev, status: ROADMAP_STATUS.TODO })); setIsDropdownOpen(false); }}
                                                style={{ padding: "10px 16px", fontSize: "14px", color: "var(--color-gray-800)", cursor: "pointer", transition: "background-color 0.15s ease" }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-gray-050)"}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            >
                                                예정됨
                                            </li>
                                            <li
                                                onClick={() => { setForm(prev => ({ ...prev, status: ROADMAP_STATUS.IN_PROGRESS })); setIsDropdownOpen(false); }}
                                                style={{ padding: "10px 16px", fontSize: "14px", color: "var(--color-gray-800)", cursor: "pointer", transition: "background-color 0.15s ease" }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-gray-050)"}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                            >
                                                진행 중
                                            </li>
                                            <li
                                                onClick={() => { setForm(prev => ({ ...prev, status: ROADMAP_STATUS.DONE })); setIsDropdownOpen(false); }}
                                                style={{ padding: "10px 16px", fontSize: "14px", color: "var(--color-gray-800)", cursor: "pointer", transition: "background-color 0.15s ease" }}
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
                )}

                {!isLoading && (
                    <footer className="grade-add-modal__actions row" style={{ marginTop: "20px", justifyContent: "space-between", width: "100%" }}>
                        <button
                            type="button"
                            className="grade-add-modal__button grade-add-modal__button--ghost"
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            style={{
                                color: "var(--color-red-500)",
                                borderColor: "rgba(239, 68, 68, 0.2)",
                                minWidth: "80px",
                                backgroundColor: "rgba(239, 68, 68, 0.02)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "var(--color-red-500)";
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.06)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
                                e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.02)";
                            }}
                        >
                            삭제
                        </button>

                        <div className="row" style={{ gap: "8px" }}>
                            <button
                                type="button"
                                className="grade-add-modal__button grade-add-modal__button--ghost"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                style={{ minWidth: "80px" }}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="grade-add-modal__button grade-add-modal__button--primary"
                                onClick={handleSave}
                                disabled={isSubmitting || !form.title.trim() || !form.startedAt || !form.endedAt}
                                style={{ minWidth: "90px" }}
                            >
                                {isSubmitting ? "저장 중" : "저장"}
                            </button>
                        </div>
                    </footer>
                )}
            </article>
            {showDeleteConfirm && (
                <RoadmapDeleteModal
                    title={form.title}
                    onClose={() => setShowDeleteConfirm(false)}
                    isSubmitting={isSubmitting}
                    onConfirm={async () => {
                        setIsSubmitting(true);
                        try {
                            await onDelete(itemId);
                            handleClose();
                        } catch (err) {
                            console.error("항목 삭제 실패:", err);
                        } finally {
                            setIsSubmitting(false);
                            setShowDeleteConfirm(false);
                        }
                    }}
                />
            )}
        </div>
    );
};
