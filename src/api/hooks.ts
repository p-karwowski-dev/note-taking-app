import { useEffect, useMemo, useRef, useState } from 'react'
import { getNotes } from './endpoints'
import { Note, useGetNotesReturnProps, User } from '../app.types'
import { pullUserList } from './appRequests'

export function useGetNotes(): useGetNotesReturnProps {
  const [counter, update] = useState(0)
  const refRequest = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [notes, setNotes] = useState<Note[] | undefined>(undefined)

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const response = await getNotes()
        setNotes(response)
      } catch (error) {
        console.error('Error on useGetNotes:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (!refRequest.current) {
      fetchNotes()
      refRequest.current = true
    }
  }, [isLoading, notes, counter])

  const refetchNotes = () => {
    refRequest.current = false
    setIsError(false)
    setIsLoading(false)
    update((prev) => prev + 1)
  }

  return {
    isLoading,
    isError,
    notes,
    refetchNotes,
  }
}

export function useGetUserList() {
  const refRequest = useRef(false)
  const [userList, setUserList] = useState<User[] | undefined>(undefined)

  const userNames = useMemo(
    () => userList?.map(({ first_name }) => first_name) ?? [],
    [userList]
  )

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await pullUserList()
        setUserList(response)
      } catch (error) {
        console.error('Error on useGetUserList:', error)
      }
    }

    if (!refRequest.current) {
      fetchUserList()
      refRequest.current = true
    }
  }, [])

  return { userNames }
}
