import { useEffect } from "react";
import "./ConfirmModal.css";

export const ConfirmModal = ({
  open = false,
  title = "확인",
  description = "",
  confirmLabel = "확인",
  cancelLabel = "취소",
  isSubmitting = false,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      if (isSubmitting) return;
      onClose?.();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, isSubmitting, onClose]);

  if (!open) return null;

  return (
    <div className="confirm-modal__backdrop" onClick={onClose}>
      <article
        className="confirm-modal__panel column"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="confirm-modal__header column">
          <h3 id="confirm-modal-title" className="typo-heading-medium">{title}</h3>
          <p id="confirm-modal-description" className="typo-body-xsmall">{description}</p>
        </header>

        <footer className="confirm-modal__actions row">
          <button
            type="button"
            className="confirm-modal__button confirm-modal__button--ghost"
            disabled={isSubmitting}
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="confirm-modal__button confirm-modal__button--primary"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </footer>
      </article>
    </div>
  );
};
