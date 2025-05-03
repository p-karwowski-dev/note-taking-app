export interface BaseFetch {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: BodyInit
  controller?: AbortController
  headers?: HeadersInit
}

export type Note = {
  id: number
  body: string
}

export interface useGetNotesReturnProps {
  isLoading: boolean
  isError: boolean
  notes: Note[] | undefined
  refetchNotes: () => void
}

export interface User {
  birthdate: number
  email: string
  first_name: string
  gender: string
  last_name: string
  location: {
    city: string
    postcode: number
    state: string
    street: string
  }
  phone_number: string
  title: string
  username: string
}

export interface tooltipPosition {
  top: number
  left: number
}

export type DomRecList = React.RefObject<DOMRectList | null>

export type TextRef = React.RefObject<string | null>
