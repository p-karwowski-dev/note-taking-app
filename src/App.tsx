import './App.css'
import { useState } from 'react'
import { useGetNotes } from './api/hooks'
import { addNote } from './api/appRequests'
import { AddNoteButton } from './components/addNoteButton/AddNoteButton'
import { SyncTextNote } from './components/textNote/SyncTextNote'

function App() {
  const { isLoading, isError, data: notes } = useGetNotes()
  const [notesList, setNotesList] = useState(notes ?? [])

  const addNoteHandler = async () => {
    const newNote = await addNote({
      id: notesList.length + 1,
      body: 'Your new note...',
    })

    if (newNote) {
      setNotesList((prevNotes) => [...prevNotes, newNote])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Note Taking App</h1>
      </header>

      <p>
        Add a note and start typing. Note will be automatically updated and
        saved to your list.
      </p>

      <AddNoteButton onClick={addNoteHandler} />

      {isLoading && <p>Loading notes...</p>}

      {isError && <p>Error loading notes</p>}

      <main className="Note-list">
        {notes?.map((note) => <SyncTextNote key={note.id} note={note} />)}
      </main>
    </div>
  )
}

export default App
