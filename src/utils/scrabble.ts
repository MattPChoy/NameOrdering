import type { ScrabbleScore } from '@/types'

export const SCRABBLE_VALUES: Record<string, number> = {
  A:1,  B:3,  C:3,  D:2,  E:1,  F:4,  G:2,  H:4,  I:1,  J:8,
  K:5,  L:1,  M:3,  N:1,  O:1,  P:3,  Q:10, R:1,  S:1,  T:1,
  U:1,  V:4,  W:4,  X:8,  Y:4,  Z:10
}

/**
 * Score a name. Returns total and per-letter breakdown.
 * Only A–Z count; spaces, hyphens, apostrophes are skipped.
 */
export function scoreScrabble(name: string): ScrabbleScore {
  const letters: ScrabbleScore['letters'] = []
  let total = 0
  for (const ch of name.toUpperCase()) {
    const value = SCRABBLE_VALUES[ch]
    if (value !== undefined) {
      letters.push({ char: ch, value })
      total += value
    }
  }
  return { total, letters }
}
