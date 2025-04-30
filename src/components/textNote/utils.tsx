/**
 * Ensure that the text is safe to be displayed in the UI.
 */
export const sanitizeText = (text: string): string => {
  if (!text) return ''

  const parser = new DOMParser()
  const decodedText = decodeHTML(text)
  const doc = parser.parseFromString(decodedText, 'text/html')
  const pureText = purifyHTML(doc)

  return pureText
}

/**
 * Decodes HTML entities into their corresponding characters.
 * Example: &lt; becomes <, &gt; becomes >, etc.
 */
function decodeHTML(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

/**
 * Recursively removes all non-text elements from the DOM and leaves only the text content.
 */
function purifyHTML(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || ''
  }

  let textContent = ''
  node.childNodes.forEach((child) => {
    textContent += purifyHTML(child)
  })

  return textContent
}

/**
 * Get the list of items that match the text after the '@' sign.
 * The function will return a maximum of `maxReturn` items.
 * If no text is provided, it will return the first 5 items from the list.
 * If the text contains letter after a space after the '@' sign, it will return an empty array.
 * @param text - The text to search in.
 * @param list - The list of items to search from.
 * @param maxReturn - The maximum number of items to return.
 * @returns An array of matching items.
 */
export function getMatchingItems(
  text: string,
  list: string[],
  sign = '@',
  maxReturn = 5
): string[] {
  if (!text.length) return list.slice(0, 5)

  const atIndex = text.indexOf(sign)
  const afterSign = text.slice(atIndex + 1)
  const textParts = afterSign.split(' ')

  if (textParts[1]) {
    return []
  }

  const matched = []
  let index = 0
  while (matched.length < maxReturn && index < list.length) {
    if (list[index]?.toLowerCase()?.includes(textParts[0].toLowerCase())) {
      matched.push(list[index])
    }
    index++
  }
  return matched
}
