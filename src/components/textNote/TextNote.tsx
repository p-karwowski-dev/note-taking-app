import { useEffect, useRef } from 'react'
import './textNote.css'
import { sanitizeText } from './utils'

interface componentProps {
  text: string
  onStopTyping: (text: string) => void
}

export function TextNote({ text, onStopTyping }: componentProps) {
  const noteRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearTimeOutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const setTimeoutRef = () => {
    timeoutRef.current = setTimeout(() => {
      userStoppedTyping()
    }, 400)
  }

  const userStoppedTyping = () => {
    if (!noteRef.current) return
    const text = sanitizeText(noteRef.current.innerText)
    onStopTyping(text)
  }

  useEffect(() => {
    return clearTimeOutRef
  }, [])

  return (
    <div
      ref={noteRef}
      className="Text-note"
      contentEditable
      onInput={() => {
        clearTimeOutRef()
        setTimeoutRef()
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  )
}
