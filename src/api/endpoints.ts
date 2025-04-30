import { Note, User } from './api.types'
import { appFetch, appFetchWithUrl } from './appFetch'

export const postNote = async (note: Note) =>
  appFetch<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  })

export const putNote = async (note: Note) =>
  appFetch<Note>(`/notes/${note.id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  })

export const getNotes = async () =>
  appFetch<Note[]>('/notes', {
    method: 'GET',
  })

export const getNote = async (noteId: string) =>
  appFetch<Note>(`/notes/${noteId}`, {
    method: 'GET',
  })

export const getUserList = async () => appFetchWithUrl<User[]>('/users')
