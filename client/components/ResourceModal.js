"use client";

import { useEffect } from "react";

export default function ResourceModal({
  resource,
  canModify,
  onClose,
  onEdit,
  onDelete,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="modal-title">{resource.title}</h2>
        <p className="card-org">{resource.organization}</p>
        {resource.location && (
          <p className="card-location text-secondary">{resource.location}</p>
        )}

        <div className="card-tags modal-tags">
          <span className="tag">{resource.category}</span>
        </div>

        <p className="modal-description">{resource.description}</p>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          Visit resource →
        </a>

        {canModify && (
          <div className="btn-group modal-actions">
            <button className="btn btn-primary" type="button" onClick={onEdit}>
              Edit
            </button>
            <button className="btn btn-danger" type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
