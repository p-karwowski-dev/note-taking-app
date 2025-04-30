import { Note, User } from './api.types'
import { appFetchWithEnv, appFetchWithUrl } from './appFetch'

export const postNote = async (note: Note) =>
  appFetchWithEnv<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  })

export const putNote = async (note: Note) =>
  appFetchWithEnv<Note>(`/notes/${note.id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  })

export const getNotes = async () =>
  appFetchWithEnv<Note[]>('/notes', {
    method: 'GET',
  })

export const getUserList = async () => appFetchWithUrl<User[]>('/users')
