import { computed, type Ref } from 'vue'
import { scoreAvgLetterDist } from '@/utils/letterDistance'
import type { AvgLetterDistItem } from '@/types'

export function useAvgLetterDistSort(names: Ref<string[]>) {
  return computed<AvgLetterDistItem[]>(() =>
    names.value
      .map(name => scoreAvgLetterDist(name))
      .sort((a, b) => b.avgDistance - a.avgDistance)
  )
}
