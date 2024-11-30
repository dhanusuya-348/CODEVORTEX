import React from 'react';

const NotesList = ({ notes, onDelete, onEdit, onDownload }) => {
  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          <p>{note.content}</p>    
          <small>{new Date(note.date).toLocaleString()}</small>
          <div className="note-actions">
            <button className="edit-button" onClick={() => onEdit(note)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
            <button className="download-button" onClick={() => onDownload(note, 'json')}>Download as JSON</button>
            <button className="download-button" onClick={() => onDownload(note, 'txt')}>Download as TXT</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
