import './App.css'
import { useGetNotes } from './api/hooks'
import { addNote } from './api/appRequests'
import { AddNoteButton } from './components/addNoteButton/AddNoteButton'
import { SyncTextNote } from './components/textNote/SyncTextNote'
import { useMemo } from 'react'

function App() {
  const {
    isLoading,
    isError,
    notes = [{ id: 0, body: 'test' }],
    refetchNotes,
  } = useGetNotes()
  const reverseNotes = useMemo(() => notes?.slice(0).reverse(), [notes])
  const userNames = ['user1']

  const addNoteHandler = async () => {
    const newNote = await addNote({
      id: notes?.length ? notes.length + 1 : 1,
      body: 'Your new note...',
    })

    if (newNote) refetchNotes()
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
        {reverseNotes?.map((note) => (
          <SyncTextNote key={note.id} note={note} userNames={userNames} />
        ))}
      </main>
      <div className="User-tooltip" id="tooltip"></div>
    </div>
  )
}

export default App
