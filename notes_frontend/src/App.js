import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import NotesSidebar from "./components/NotesSidebar";
import NotesHeader from "./components/NotesHeader";
import NotesList from "./components/NotesList";
import NoteModal from "./components/NoteModal";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/noteService";

// PUBLIC_INTERFACE
function App() {
  // Notes data and UI state
  const [notes, setNotes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch notes from backend REST API
  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const fetched = await fetchNotes();
      setNotes(fetched);
    } catch (err) {
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Open modal for new note
  // PUBLIC_INTERFACE
  function handleNewNote() {
    setModalMode("create");
    setSelectedNote({ title: "", content: "" });
    setModalOpen(true);
  }

  // Open modal for editing existing note
  // PUBLIC_INTERFACE
  function handleEditNote(note) {
    setModalMode("edit");
    setSelectedNote(note);
    setModalOpen(true);
  }

  // Delete note
  // PUBLIC_INTERFACE
  async function handleDeleteNote(noteId) {
    setLoading(true);
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err) {
      setError("Failed to delete note.");
    } finally {
      setLoading(false);
    }
  }

  // Create or update note (from modal)
  // PUBLIC_INTERFACE
  async function handleSaveNote(note) {
    setLoading(true);
    setError("");
    try {
      if (modalMode === "create") {
        const created = await createNote(note);
        setNotes((prev) => [created, ...prev]);
      } else {
        const updated = await updateNote(selectedNote.id, note);
        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
      }
      setModalOpen(false);
      setSelectedNote(null);
    } catch (err) {
      setError("Failed to save note.");
    } finally {
      setLoading(false);
    }
  }

  // Filter notes by search
  const filteredNotes = notes.filter((note) => {
    if (!filterText) return true;
    const q = filterText.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });

  // Responsive sidebar toggle (for mobile)
  function toggleSidebar() {
    setSidebarOpen((open) => !open);
  }

  return (
    <div className="notes-app">
      <NotesHeader
        onNewNote={handleNewNote}
        searchValue={filterText}
        onSearchChange={setFilterText}
        onSidebarToggle={toggleSidebar}
        appName="Notes"
        accentColor="var(--accent-color)"
      />

      <div className="notes-main-content">
        <NotesSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          notes={filteredNotes}
          onNoteSelect={handleEditNote}
          selectedId={selectedNote && selectedNote.id}
          onNewNote={handleNewNote}
          accentColor="var(--accent-color)"
        />

        <main className="notes-main-area">
          <NotesList
            notes={filteredNotes}
            loading={loading}
            error={error}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        </main>
      </div>

      <NoteModal
        open={modalOpen}
        mode={modalMode}
        note={selectedNote}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNote}
        accentColor="var(--accent-color)"
      />
    </div>
  );
}

export default App;
