/**
 * Ensure that the text is safe to be displayed in the UI.
 * This function will decode HTML entities and remove any non-text elements.
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

export const updateTooltipHtml = (
  text: string | undefined,
  list: string[] = []
) => {
  const tooltip = document.getElementById('tooltip')
  if (!tooltip) return

  if (!text?.includes('@')) {
    if (tooltip.style.display === 'block') {
      tooltip.style.display = 'none'
    }
    return
  }

  const matchUsers = getMatchingItems(text, list)

  if (!matchUsers.length) {
    tooltip.style.display = 'none'
    return
  }

  tooltip.innerHTML = ''
  matchUsers.forEach((user) => {
    const userElement = document.createElement('p')
    userElement.innerHTML = user
    tooltip.appendChild(userElement)
  })

  const { top = 0, left = 0 } = getCaretCoords()
  tooltip.style.top = `${top + 25}px`
  tooltip.style.left = `${left - 60}px`
  tooltip.style.display = 'block'
}

/**
 * Get the coordinates of the caret position in the text area.
 */
function getCaretCoords(): Partial<{ top: number; left: number }> {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return {}

  const range = selection.getRangeAt(0).cloneRange()
  range.collapse(true)

  const rect = range.getClientRects()[0]
  if (!rect) return {}

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  }
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
