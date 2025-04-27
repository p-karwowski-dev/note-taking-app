import { render, screen } from '@testing-library/react'
import App from './App'

test('renders app header', () => {
  render(<App />)
  const linkElement = screen.getByText(/Note Taking App/i)
  expect(linkElement).toBeInTheDocument()
})
