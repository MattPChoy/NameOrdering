import { computed, type Ref } from 'vue'
import type { SortByItem, SortDirection } from '@/types'

export function useSortBySort(names: Ref<string[]>, direction: Ref<SortDirection>) {
  return computed<SortByItem[]>(() => {
    const items = names.value.map(name => ({ name }))
    return items.sort((a, b) => {
      const cmp = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      return direction.value === 'asc' ? cmp : -cmp
    })
  })
}
