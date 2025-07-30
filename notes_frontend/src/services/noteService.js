// noteService.js: REST API connector for Notes
const BASE_URL = process.env.REACT_APP_NOTES_API_URL || "/api/notes";

// PUBLIC_INTERFACE
/**
 * Fetch all notes.
 * Returns array of notes, e.g., [{id, title, content}, ...]
 */
export async function fetchNotes() {
  const res = await fetch(BASE_URL, { credentials: "same-origin" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return await res.json();
}

// PUBLIC_INTERFACE
/**
 * Create a new note.
 * @param {Object} note - {title, content}
 */
export async function createNote(note) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Failed to create note");
  return await res.json();
}

// PUBLIC_INTERFACE
/**
 * Update a note by ID.
 * @param {string|number} id
 * @param {Object} note - {title, content}
 */
export async function updateNote(id, note) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Failed to update note");
  return await res.json();
}

// PUBLIC_INTERFACE
/**
 * Delete a note by ID.
 * @param {string|number} id
 */
export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  // No content expected
}
