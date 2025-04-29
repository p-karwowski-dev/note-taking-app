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

export interface UseFetchReturnProps {
  isLoading: boolean
  isError: boolean
  data: Note[] | undefined
}
