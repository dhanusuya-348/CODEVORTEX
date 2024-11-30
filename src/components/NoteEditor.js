import React, { useState, useEffect } from 'react';

const NoteEditor = ({ onSave, noteToEdit, setNoteToEdit }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setNote(noteToEdit.content); // Populate the editor with the content of the note being edited
    } else {
      setNote('');
    }
  }, [noteToEdit]);

  const handleSave = () => {
    const newNote = {
      id: noteToEdit ? noteToEdit.id : Date.now(), // Use existing ID if editing
      content: note,
      date: new Date(),
    };
    onSave(newNote);
    setNote('');
    setNoteToEdit(null); // Clear the editing note after saving
  };

  return (
    <div className="note-editor">
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        placeholder="Write your note here..."
      />
      <button className="save-button" onClick={handleSave}>
        {noteToEdit ? 'Update Note' : 'Save Note'}
      </button>
    </div>
  );
};

export default NoteEditor;
