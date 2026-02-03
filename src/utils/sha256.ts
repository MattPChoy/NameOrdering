/**
 * Async SHA-256 via Web Crypto API.
 * Input is trimmed and lowercased for consistency.
 * Returns the full 64-char hex string.
 */
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input.trim().toLowerCase())
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}
