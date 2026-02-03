import { computed, type Ref } from 'vue'
import type { RandomItem } from '@/types'

/**
 * Simple seeded random number generator (mulberry32)
 */
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Fisher-Yates shuffle with a seeded random
 */
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array]
  const random = mulberry32(seed)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function useRandomSort(names: Ref<string[]>, seed: Ref<number>) {
  return computed<RandomItem[]>(() => {
    const items = names.value.map(name => ({ name, seed: seed.value }))
    return shuffleWithSeed(items, seed.value)
  })
}
