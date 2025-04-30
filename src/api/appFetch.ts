import { BaseFetch } from './api.types'
import { appBaseFetch } from './appBaseFetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_SESSION = process.env.REACT_APP_API_SESSION

export const appFetchWithEnv = async <T>(
  endpoint: string,
  options?: Omit<BaseFetch, 'url'>
): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error(
      'REACT_APP_API_BASE_URL is not defined in the environment variables.'
    )
  }

  if (!API_SESSION) {
    throw new Error('API_SESSION is not defined in the environment variables.')
  }

  return appBaseFetch<T>({
    url: `${API_BASE_URL}/${API_SESSION}${endpoint}`,
    ...options,
  })
}

export const appFetchWithUrl = async <T>(
  endpoint: string,
  options?: Omit<BaseFetch, 'url'>
): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error(
      'REACT_APP_API_BASE_URL is not defined in the environment variables.'
    )
  }

  return appBaseFetch<T>({
    url: `${API_BASE_URL}${endpoint}`,
    ...options,
  })
}
