import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * NotesHeader component: Top bar with app name, search, and 'New Note' button
 */
function NotesHeader({
  appName,
  accentColor,
  onNewNote,
  searchValue,
  onSearchChange,
  onSidebarToggle,
}) {
  return (
    <header className="header-bar" style={{ borderBottom: `2px solid ${accentColor}` }}>
      <button
        className="sidebar-toggle"
        aria-label="Open sidebar"
        onClick={onSidebarToggle}
      >
        ☰
      </button>
      <div className="header-title">{appName}</div>
      <div className="header-actions">
        <input
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search notes"
        />
        <button
          className="btn btn-accent"
          style={{ backgroundColor: accentColor }}
          onClick={onNewNote}
        >
          + New Note
        </button>
      </div>
    </header>
  );
}

NotesHeader.propTypes = {
  appName: PropTypes.string.isRequired,
  accentColor: PropTypes.string,
  onNewNote: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSidebarToggle: PropTypes.func.isRequired,
};

export default NotesHeader;
