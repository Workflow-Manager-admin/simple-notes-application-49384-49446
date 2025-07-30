import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * NotesList component: displays all filtered notes as cards in main area.
 */
function NotesList({ notes, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <div className="notes-list-loading">Loading notes...</div>;
  }
  if (error) {
    return <div className="notes-list-error">{error}</div>;
  }
  if (!notes.length) {
    return <div className="notes-list-empty">No notes found.</div>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-card" key={note.id} tabIndex={0}>
          <div className="note-card-header">
            <h3 className="note-title">{note.title || "Untitled"}</h3>
            <div className="note-actions">
              <button
                className="btn btn-link"
                aria-label="Edit note"
                onClick={() => onEdit(note)}
                tabIndex={-1}
              >
                ✎
              </button>
              <button
                className="btn btn-link"
                aria-label="Delete note"
                onClick={() => window.confirm("Delete this note?") && onDelete(note.id)}
                tabIndex={-1}
              >
                🗑
              </button>
            </div>
          </div>
          <div className="note-card-body">
            <div className="note-content">
              {(note.content || "").slice(0, 240) +
                (note.content && note.content.length > 240 ? "..." : "")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesList;
