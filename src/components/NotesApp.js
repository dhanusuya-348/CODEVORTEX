import React, { useState } from 'react';
import './NotesApp.css'; 

const NotesApp = () => {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const handleSaveNote = () => {
    if (note.trim()) {
      setSavedNotes([...savedNotes, note]);
      setNote(''); //resetting the input
    }
  };
  return (
    <div className="app-container">
      <h1>Notes Management with Offline Support</h1>
      <div className="note-input-container">
        <textarea
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="note-input"
        />
        <button className="save-button" onClick={handleSaveNote}>
          Save Note
        </button>
      </div>
      <div className="notes-list">
        {savedNotes.length > 0 ? (
          savedNotes.map((note, index) => (
            <div key={index} className="note-item">
              {note}
            </div>
          ))
        ) : (
          <p className="no-notes">No notes saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
