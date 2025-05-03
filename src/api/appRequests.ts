import { Note } from '../app.types'
import { getUserList, postNote, putNote } from './endpoints'

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

export const pullUserList = async () => {
  let response
  try {
    response = await getUserList()
  } catch (error) {
    console.error('Error on pullUserList:', error)
  }

  return response
}
