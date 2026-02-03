<script setup lang="ts">
import { computed } from 'vue'
import airports from '@/data/airports'
import type { Airport } from '@/types'

const props = defineProps<{ origin: Airport }>()
const emit  = defineEmits<{ update: [airport: Airport] }>()

const sorted = computed(() =>
  airports.slice().sort((a, b) => a.city.localeCompare(b.city))
)

function onChange(e: Event) {
  const code = (e.target as HTMLSelectElement).value
  const airport = airports.find(a => a.code === code)
  if (airport) emit('update', airport)
}
</script>

<template>
  <div class="origin-picker">
    <label>Distance from</label>
    <select :value="props.origin.code" @change="onChange">
      <option v-for="a in sorted" :key="a.code" :value="a.code">
        {{ a.city }} ({{ a.code }})
      </option>
    </select>
  </div>
</template>

<style scoped>
.origin-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.origin-picker label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.origin-picker select {
  padding: 6px 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.origin-picker select:focus {
  border-color: var(--accent);
}

.origin-picker option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
</style>
