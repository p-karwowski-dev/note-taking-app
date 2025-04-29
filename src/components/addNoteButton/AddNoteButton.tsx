import './addNoteButton.css'

export function AddNoteButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="Add-note-button">
      Add Note
    </button>
  )
}
