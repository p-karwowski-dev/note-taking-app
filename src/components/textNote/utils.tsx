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
