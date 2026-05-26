import { useEffect } from "react";
import "@/features/grade/ui/components/GradeModal.css";

export const RoadmapDeleteModal = ({ onClose, onConfirm, isSubmitting = false, title = "" }) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key !== "Escape") return;
            if (isSubmitting) return;
            onClose();
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isSubmitting, onClose]);

    return (
        <div className="grade-delete-modal__backdrop" onClick={onClose} style={{ zIndex: 2000 }}>
            <article
                className="grade-delete-modal__panel column"
                role="dialog"
                aria-modal="true"
                aria-labelledby="roadmap-delete-modal-title"
                aria-describedby="roadmap-delete-modal-description"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="grade-delete-modal__header column">
                    <h3 id="roadmap-delete-modal-title" className="typo-heading-medium">항목 삭제</h3>
                    <p id="roadmap-delete-modal-description" className="typo-body-xsmall">
                        {title ? `'${title}' 로드맵 항목을 삭제할까요?` : "선택한 항목을 삭제할까요?"}
                    </p>
                </header>

                <footer className="grade-delete-modal__actions row">
                    <button
                        type="button"
                        className="grade-delete-modal__button grade-delete-modal__button--ghost"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        className="grade-delete-modal__button grade-delete-modal__button--danger"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                    >
                        삭제
                    </button>
                </footer>
            </article>
        </div>
    );
};
