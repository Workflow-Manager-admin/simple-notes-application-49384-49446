import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * NoteModal component: Modal for create/edit note.
 */
function NoteModal({ open, mode, note, onClose, onSave, accentColor }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSave({ title, content });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ borderTop: `4px solid ${accentColor}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">{mode === "edit" ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            className="modal-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            maxLength={100}
          />
          <textarea
            className="modal-textarea"
            placeholder="Your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
            rows={7}
          />
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-accent"
              style={{ backgroundColor: accentColor }}
              disabled={!title.trim() && !content.trim()}
            >
              {mode === "edit" ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  note: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  accentColor: PropTypes.string,
};

export default NoteModal;
