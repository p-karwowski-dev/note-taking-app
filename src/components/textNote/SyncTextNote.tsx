import { TextNote } from './TextNote'
import { updateNote } from '../../api/appRequests'
import { Note } from '../../api/api.types'

export const SyncTextNote = ({
  note,
  userNames,
}: {
  note: Note
  userNames: string[]
}) => {
  const onStopTyping = async (text: string) => {
    await updateNote({
      id: note.id,
      body: text,
    })
  }

  return (
    <TextNote
      text={note.body}
      onStopTyping={onStopTyping}
      userNames={userNames}
    />
  )
}
