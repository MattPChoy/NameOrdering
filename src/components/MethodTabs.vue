<script setup lang="ts">
import type { SortMethod } from '@/types'

const props = defineProps<{
  active: SortMethod
}>()

const emit = defineEmits<{ select: [method: SortMethod] }>()

const tabs: { key: SortMethod; label: string }[] = [
  { key: 'sortby',     label: 'Sort by' },
  { key: 'random',     label: 'Random' },
  { key: 'scrabble',   label: 'Scrabble' },
  { key: 'hash',       label: 'SHA-256' },
  { key: 'airport',    label: 'IATA Airport' },
  { key: 'stock',      label: 'Stock' },
  { key: 'vowelcount', label: 'Vowel Count' },
  { key: 'avgdist',    label: 'Avg Letter Dist' },
]
</script>

<template>
  <div class="method-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      :class="{ active: props.active === tab.key }"
      @click="emit('select', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.method-tabs {
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
}

.method-tabs button {
  padding: 8px 18px;
  border: none;
  border-radius: var(--radius);
  background: var(--tab-inactive-bg);
  color: var(--text-secondary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.method-tabs button:hover {
  background: var(--tab-inactive-hover);
  color: var(--text-primary);
}

.method-tabs button.active {
  background: var(--tab-active-bg);
  color: #fff;
}
</style>
