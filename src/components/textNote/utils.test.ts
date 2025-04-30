import { getMatchingItems, sanitizeText } from './utils'

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

describe('getMatchingItems', () => {
  const list = ['user1', 'user2', 'user3']

  it('should return an array of matching items', () => {
    const text = 'Hello @user'
    expect(getMatchingItems(text, list)).toEqual(list)
  })

  it('should return an empty array when no matches are found', () => {
    const text = 'Hello @World'
    expect(getMatchingItems(text, list)).toEqual([])
  })

  it('should return an empty array when after match text contains space and further text', () => {
    const text = 'Hello @user ...'
    expect(getMatchingItems(text, list)).toEqual([])
  })

  it('should handle case sensitivity', () => {
    const text = 'Hello @User1'
    expect(getMatchingItems(text, list)).toEqual(['user1'])
  })

  it('should return an empty array when the text does not contain "@"', () => {
    const text = 'Hello world'
    expect(getMatchingItems(text, list)).toEqual([])
  })

  it('should return an empty array when the list is empty', () => {
    const text = 'Hello @user1'
    expect(getMatchingItems(text, [])).toEqual([])
  })
})
