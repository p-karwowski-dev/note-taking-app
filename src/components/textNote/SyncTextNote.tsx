import { useState } from 'react'
import { Note } from '../../api/api.types'
import { TextNote } from './TextNote'

export const SyncTextNote = ({ note }: { note: Note }) => {
  const [syncNote, setSyncNote] = useState(note)
  console.log(note)

  const onStopTyping = (text: string) => {
    console.log(text)
  }

  return <TextNote text={syncNote.body} onStopTyping={onStopTyping} />
}
