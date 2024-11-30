import React, { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import { saveNote, getNotes, deleteNote, updateNote } from './utils/idb';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [unsyncedNotes, setUnsyncedNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null); // State for the note currently being edited

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
    };
    fetchNotes();

    // Listen for online/offline status and sync
    window.addEventListener('online', handleOnlineSync);

    return () => {
      window.removeEventListener('online', handleOnlineSync);
    };
  }, []);

  const handleSaveNote = async (newNote) => {
    if (noteToEdit) {
      await updateNote(newNote); // Update existing note
      setNotes((prevNotes) => prevNotes.map(note => note.id === newNote.id ? newNote : note));
    } else {
      await saveNote(newNote); // Save new note
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    if (!navigator.onLine) {
      setUnsyncedNotes((prev) => [...prev, newNote]);
    } else {
      syncNotesWithServer(newNote);
    }

    setNoteToEdit(null); // Clear editing note after saving
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note) => {
    setNoteToEdit(note); // Set the note to edit
  };

  const handleOnlineSync = () => {
    if (unsyncedNotes.length > 0) {
      unsyncedNotes.forEach(note => syncNotesWithServer(note));
      setUnsyncedNotes([]); 
    }
  };

  const syncNotesWithServer = (note) => {
    console.log('Syncing note with server:', note);
  };

  const downloadNote = (note, format) => {
    // Your download logic...
  };

  const downloadAllNotes = (format) => {
    // Your download logic...
  };

  return (
    <div className="app-container">
      <h1>Dhanu's Notes App</h1>
      <div className="download-options">
        <button className="download-all-button" onClick={() => downloadAllNotes('json')}>Download All Notes as JSON</button>
        <button className="download-all-button" onClick={() => downloadAllNotes('txt')}>Download All Notes as TXT</button>
      </div>
      <NoteEditor onSave={handleSaveNote} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />
      <NotesList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} onDownload={downloadNote} />
    </div>
  );
};

export default App;
