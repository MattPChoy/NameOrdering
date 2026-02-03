import { computed, type Ref } from 'vue'
import { scoreScrabble } from '@/utils/scrabble'
import type { ScrabbleItem } from '@/types'

export function useScrabbleSort(names: Ref<string[]>) {
  return computed<ScrabbleItem[]>(() =>
    names.value
      .map(name => ({ name, score: scoreScrabble(name) }))
      .sort((a, b) => b.score.total - a.score.total)
  )
}
