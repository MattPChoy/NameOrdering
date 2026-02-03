import type { VowelCountItem, AvgLetterDistItem } from '@/types'

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])

function alphabetPos(ch: string): number {
  return ch.charCodeAt(0) - 96 // a=1, b=2, … z=26
}

/** Strip to lowercase alpha only. */
function letters(name: string): string[] {
  return name.toLowerCase().replace(/[^a-z]/g, '').split('')
}

export function scoreVowelCount(name: string): VowelCountItem {
  const chars = letters(name)
  return {
    name,
    vowelCount: chars.filter(ch => VOWELS.has(ch)).length,
    letters: chars.map(ch => ({ char: ch, isVowel: VOWELS.has(ch) })),
  }
}

export function scoreAvgLetterDist(name: string): AvgLetterDistItem {
  const chars = letters(name)

  const pairs = chars.slice(0, -1).map((ch, i) => ({
    from: ch,
    to: chars[i + 1],
    distance: Math.abs(alphabetPos(ch) - alphabetPos(chars[i + 1])),
  }))

  const avgDistance = pairs.length
    ? Math.round((pairs.reduce((sum, p) => sum + p.distance, 0) / pairs.length) * 100) / 100
    : 0

  return { name, avgDistance, pairs }
}
