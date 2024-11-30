import { openDB } from 'idb';

const dbPromise = openDB('notes-store', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('notes')) {
      db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const saveNote = async (note) => {
  const db = await dbPromise;
  await db.put('notes', note);
};

export const getNotes = async () => {
  const db = await dbPromise;
  return await db.getAll('notes');
};

export const deleteNote = async (id) => {
  const db = await dbPromise;
  await db.delete('notes', id);
};

export const updateNote = async (note) => {
  const db = await dbPromise;
  await db.put('notes', note);
};
