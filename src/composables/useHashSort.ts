import { ref, watch, type Ref } from 'vue'
import { sha256 } from '@/utils/sha256'
import type { HashItem } from '@/types'

export function useHashSort(names: Ref<string[]>) {
  const items = ref<HashItem[]>([])

  watch(names, async (newNames) => {
    const results = await Promise.all(
      newNames.map(async name => ({
        name,
        hash: await sha256(name)
      }))
    )
    items.value = results.sort((a, b) => a.hash.localeCompare(b.hash))
  }, { immediate: true, deep: true })

  return items
}
