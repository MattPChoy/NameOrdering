/**
 * Deterministic fallback price from ticker symbol.
 * Produces a value in $10–$500 seeded from the ticker's char-code sum × prime 37.
 */
export function mockPrice(symbol: string): number {
  let sum = 0
  for (let i = 0; i < symbol.length; i++) {
    sum += symbol.charCodeAt(i)
  }
  const seed = (sum * 37) % 49000
  return 10 + seed / 100
}
