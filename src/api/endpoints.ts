import { Note } from './api.types'
import { appFetch } from './appFetch'

export const postNotes = async (notes: string[]) =>
  appFetch<Note[]>('/notes', {
    method: 'POST',
    body: JSON.stringify(notes),
  })

export const putNote = async (note: string, noteId: string) =>
  appFetch<Note[]>(`/notes/${noteId}`, {
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
