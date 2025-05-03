import { TextNote } from './TextNote'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as utils from './utils'

jest.mock('./utils')

describe('TextNote', () => {
  const initialText = 'Test'
  const mockOnStopTyping = jest.fn()

  beforeEach(() => {
    jest.spyOn(utils, 'wrapText').mockImplementation((text) => text)
    jest.spyOn(utils, 'updateText').mockImplementation(() => null)
    jest.spyOn(utils, 'updateTooltipHtml').mockImplementation(() => null)
    render(<TextNote text={initialText} onStopTyping={mockOnStopTyping} />)
  })

  test('renders with initial text', () => {
    const noteElement = screen.getByText(initialText)
    expect(noteElement).toBeInTheDocument()
  })

  test('calls onStopTyping after user stops typing', async () => {
    const noteElement = screen.getByText(initialText)
    const newText = ' with new text'
    const finalText = initialText + newText

    await userEvent.type(noteElement, newText, { delay: 50 })
    await waitFor(() => expect(screen.getByText(finalText)).toBeInTheDocument())
    await waitFor(() => expect(mockOnStopTyping).toHaveBeenCalledTimes(1))
  })
})
