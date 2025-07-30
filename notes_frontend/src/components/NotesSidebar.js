import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * NotesSidebar component: navigation list of all notes.
 */
function NotesSidebar({
  open,
  onClose,
  notes,
  selectedId,
  onNoteSelect,
  onNewNote,
  accentColor,
}) {
  // On narrow screens, show the sidebar as an overlay
  return (
    <nav className={`notes-sidebar${open ? " open" : ""}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">All Notes</span>
        <button
          className="sidebar-close"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <button
        className="btn btn-accent btn-block"
        style={{ backgroundColor: accentColor }}
        onClick={onNewNote}
      >
        + New Note
      </button>
      <ul className="notes-sidebar-list">
        {notes.length === 0 && (
          <li className="empty-notes-msg">No notes yet!</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className={`sidebar-note${selectedId === note.id ? " selected" : ""}`}
            onClick={() => {
              onNoteSelect(note);
              onClose();
            }}
            tabIndex={0}
          >
            <div className="sidebar-note-title">{note.title || "Untitled"}</div>
            <div className="sidebar-note-snippet">
              {(note.content || "").slice(0, 30)}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

NotesSidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  notes: PropTypes.array.isRequired,
  selectedId: PropTypes.any,
  onNoteSelect: PropTypes.func.isRequired,
  onNewNote: PropTypes.func.isRequired,
  accentColor: PropTypes.string,
};

export default NotesSidebar;
