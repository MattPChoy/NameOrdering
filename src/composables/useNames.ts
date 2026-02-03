import { ref, watch } from 'vue'

const NAMES_KEY = 'nameordering-names'

export function useNames() {
  const stored = localStorage.getItem(NAMES_KEY)
  const names = ref<string[]>(stored ? JSON.parse(stored) : [])

  watch(names, (val) => {
    localStorage.setItem(NAMES_KEY, JSON.stringify(val))
  }, { deep: true })

  function addName(name: string) {
    const trimmed = name.trim()
    if (trimmed && !names.value.includes(trimmed)) {
      names.value.push(trimmed)
    }
  }

  function removeName(name: string) {
    const idx = names.value.indexOf(name)
    if (idx !== -1) names.value.splice(idx, 1)
  }

  function clearNames() {
    names.value = []
  }

  return { names, addName, removeName, clearNames }
}
