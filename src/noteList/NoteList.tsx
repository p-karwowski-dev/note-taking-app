import './noteList.css'
import { TextNote } from '../components/textNote/TextNote'

export function NoteList() {
  const onStopTyping = (text: string) => {
    console.log(text)
  }

  return (
    <main className="Note-list">
      <TextNote text="Test" onStopTyping={onStopTyping} />
      <TextNote text="Test" onStopTyping={onStopTyping} />
    </main>
  )
}
