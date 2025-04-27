import { sanitizeText } from './utils'

describe('sanitizeText', () => {
  it('should return an empty string if input is null or undefined or empty string', () => {
    expect(sanitizeText(null as any)).toBe('')
    expect(sanitizeText(undefined as any)).toBe('')
    expect(sanitizeText('')).toBe('')
  })

  it('should handle strings without HTML tags correctly', () => {
    const input = 'Plain text'
    expect(sanitizeText(input)).toBe(input)
  })

  it('should remove HTML tags from the input string', () => {
    const input = '<div>Hello <b>World</b></div>'
    const expectedOutput = 'Hello World'
    expect(sanitizeText(input)).toBe(expectedOutput)
  })

  it('should escape special characters', () => {
    const input = '<p>alert("XSS")</p>'
    const expectedOutput = 'alert("XSS")'
    expect(sanitizeText(input)).toBe(expectedOutput)
  })

  it('should prevent encoded symbol to be used for making HTML tags', () => {
    const input = '&lt;script&gt;alert("XSS")&lt;/script&gt;'
    const expectedOutput = '<script>alert("XSS")</script>'
    expect(sanitizeText(input)).not.toBe(expectedOutput)
  })

  it('should allow to use encoded symbol', () => {
    const input = '0 is &lt; then 2'
    const expectedOutput = '0 is < then 2'
    expect(sanitizeText(input)).toBe(expectedOutput)
  })
})
