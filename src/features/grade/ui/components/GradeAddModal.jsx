import { useEffect, useMemo, useState } from "react";
import "./GradeModal.css";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

export const GradeAddModal = ({ onClose, onSubmit, isSubmitting = false, initialValues = null, mode = "create" }) => {
    const [subject, setSubject] = useState("");
    const [score, setScore] = useState("");
    const [grade, setGrade] = useState("");
    const isEditMode = mode === "edit";

    const isValid = useMemo(() => {
        if (!subject.trim()) return false;
        if (!score.trim()) return false;
        if (!grade.trim()) return false;
        return true;
    }, [subject, score, grade]);


    const handleSubmit = async () => {
        if (!isValid) return;
        if (isSubmitting) return;

        const success = await onSubmit({
            subject: subject.trim(),
            score: Number(score),
            grade: grade.trim(),
        });

        if (success) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key !== "Escape") return;
            if (isSubmitting) return;
            onClose();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isSubmitting, onClose]);

    useEffect(() => {
        setSubject(initialValues?.subject ?? "");
        setScore(initialValues?.score != null ? String(initialValues.score) : "");
        setGrade(initialValues?.grade ?? "");
    }, [initialValues]);

    return (
        <div className="grade-add-modal__backdrop" onClick={onClose}>
            <article
                className="grade-add-modal__panel column"
                role="dialog"
                aria-modal="true"
                aria-labelledby="grade-modal-title"
                aria-describedby="grade-modal-description"
                onClick={(e) => e.stopPropagation()}
            >
                {isSubmitting ? <LoadingSpinner label="성적 추가 중..." fullscreen /> : null}

                <header className="grade-add-modal__header column">
                    <div className="grade-add-modal__header-top row">
                        <h3 id="grade-modal-title" className="typo-heading-medium">{isEditMode ? "성적 수정" : "성적 추가"}</h3>
                        <button
                            type="button"
                            className="grade-add-modal__close"
                            onClick={onClose}
                            disabled={isSubmitting}
                            aria-label="성적 추가 모달 닫기"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M7.2 7.2a1 1 0 0 1 1.4 0L12 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4L13.4 12l3.4 3.4a1 1 0 0 1-1.4 1.4L12 13.4l-3.4 3.4a1 1 0 0 1-1.4-1.4l3.4-3.4-3.4-3.4a1 1 0 0 1 0-1.4Z" />
                            </svg>
                        </button>
                    </div>
                    <p id="grade-modal-description" className="typo-caption-medium">{isEditMode ? "과목, 점수, 등급을 수정해주세요." : "과목, 점수, 등급을 입력해주세요."}</p>
                </header>

                <section className="grade-add-modal__body">
                    <form
                        className="grade-add-modal__fields column"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="과목명" disabled={isSubmitting} />
                        <input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="점수" disabled={isSubmitting} />
                        <input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="등급" disabled={isSubmitting} />
                        <button type="submit" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />
                    </form>
                </section>

                <footer className="grade-add-modal__actions row">
                    <button
                        type="button"
                        className="grade-add-modal__button grade-add-modal__button--ghost"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="grade-add-modal__button grade-add-modal__button--primary"
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                    >
                        {isEditMode ? "수정" : "저장"}
                    </button>
                </footer>
            </article>
        </div>
    );
};
