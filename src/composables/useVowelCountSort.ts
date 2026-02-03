import { computed, type Ref } from 'vue'
import { scoreVowelCount } from '@/utils/letterDistance'
import type { VowelCountItem } from '@/types'

export function useVowelCountSort(names: Ref<string[]>) {
  return computed<VowelCountItem[]>(() =>
    names.value
      .map(name => scoreVowelCount(name))
      .sort((a, b) => b.vowelCount - a.vowelCount)
  )
}
