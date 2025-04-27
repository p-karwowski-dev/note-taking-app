import './App.css'
import { AddNoteButton } from './components/addNoteButton/AddNoteButton'
import { NoteList } from './noteList/NoteList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Note Taking App</h1>
      </header>

      <p>
        Add a note and start typing. Note will be automatically updated and
        saved to your list.
      </p>

      <AddNoteButton />

      <NoteList />
    </div>
  )
}

export default App
