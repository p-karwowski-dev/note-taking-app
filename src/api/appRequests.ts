import { Note } from './api.types'
import { getNote, postNote, putNote } from './endpoints'

export const addNote = async (note: Note) => {
  let response
  try {
    response = await postNote(note)
  } catch (error) {
    console.error('Error on addNote:', error)
  }

  return response
}

export const updateNote = async (note: Note) => {
  let response
  try {
    response = await putNote(note)
  } catch (error) {
    console.error('Error on updateNote:', error)
  }

  return response
}

export const pullNote = async (noteId: string) => {
  let response
  try {
    response = await getNote(noteId)
  } catch (error) {
    console.error('Error on pullNote:', error)
  }

  return response
}
