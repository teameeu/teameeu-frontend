import { useEffect } from "react";
import "./GradeModal.css";

export const GradeDeleteModal = ({ onClose, onConfirm, isSubmitting = false, subject = "" }) => {
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
    <div className="grade-delete-modal__backdrop" onClick={onClose}>
      <article
        className="grade-delete-modal__panel column"
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-delete-modal-title"
        aria-describedby="grade-delete-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="grade-delete-modal__header column">
          <h3 id="grade-delete-modal-title" className="typo-heading-medium">성적 삭제</h3>
          <p id="grade-delete-modal-description" className="typo-body-xsmall">
            {subject ? `'${subject}' 과목 성적을 삭제할까요?` : "선택한 성적을 삭제할까요?"}
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
