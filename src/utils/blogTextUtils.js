/**
 * Extracts plain text from a blog body that could be:
 * 1. TipTap JSON object
 * 2. TipTap JSON string (stringified)
 * 3. Legacy HTML string
 */
export function extractPlainText(body) {
  if (!body) return '';

  // If it's already an object (TipTap JSON)
  if (typeof body === 'object') {
    return extractTextFromJson(body);
  }

  // If it's a string, try JSON first
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      if (parsed && parsed.type === 'doc') {
        return extractTextFromJson(parsed);
      }
    } catch {
      // Not JSON — treat as HTML
    }

    // Legacy HTML
    return new DOMParser().parseFromString(body, 'text/html').body.textContent || '';
  }

  return '';
}

function extractTextFromJson(node) {
  if (!node) return '';
  if (node.type === 'text') return node.text || '';
  if (node.content) return node.content.map(extractTextFromJson).join(' ');
  return '';
}

/**
 * Get a trimmed snippet from the blog body for preview cards.
 * Removes the title from the start if it's duplicated.
 */
export function getSnippet(body, title = '', maxLength = 160) {
  const rawText = extractPlainText(body);
  const trimmed = rawText.startsWith(title)
    ? rawText.slice(title.length).trim()
    : rawText.trim();
  if (!trimmed) return '';
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) + '...' : trimmed;
}
