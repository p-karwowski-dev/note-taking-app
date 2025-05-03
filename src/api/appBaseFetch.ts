import { BaseFetch } from '../app.types'

export const appBaseFetch = async <T>({
  method = 'GET',
  url,
  body,
  headers,
}: BaseFetch): Promise<T> => {
  const response = await fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error('Error 400: Invalid request.')
      case 401:
        throw new Error('Error 401: Unauthorized access. Please log in.')
      case 403:
        throw new Error(
          'Error 403: Forbidden access. You do not have permission to view this resource.'
        )
      case 404:
        throw new Error('Error 404: Resource not found.')
      case 500:
        throw new Error(
          'Error 500: Internal Server Error. Please try again later.'
        )
      default:
        throw new Error(`Error ${response.status}: ${response.statusText}`)
    }
  }

  try {
    return await response.json()
  } catch {
    throw new Error('Failed to parse json.')
  }
}
