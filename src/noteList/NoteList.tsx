import './noteList.css'

export function NoteList() {
  const onStopTyping = (text: string) => {
    console.log(text)
  }

  return <main className="Note-list"></main>
}
