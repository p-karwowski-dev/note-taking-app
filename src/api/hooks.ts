import { useEffect, useRef, useState } from 'react'
import { getNotes } from './endpoints'
import { Note, UseFetchReturnProps } from './api.types'

export function useGetNotes(): UseFetchReturnProps {
  const refReq = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<Note[] | undefined>(undefined)

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const response = await getNotes()
        setData(response)
      } catch (error) {
        console.error('Error on useGetNotes:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (!refReq.current) {
      fetchNotes()
      refReq.current = true
    }
  }, [isLoading, data])

  return {
    isLoading,
    isError,
    data,
  }
}
