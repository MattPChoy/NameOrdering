<script setup lang="ts">
import type { SortByItem, SortDirection } from '@/types'

defineProps<{ item: SortByItem; direction: SortDirection }>()
</script>

<template>
  <div class="sortby-detail">
    <span class="sortby-label">{{ direction === 'asc' ? 'A → Z' : 'Z → A' }}</span>
  </div>
</template>

<style scoped>
.sortby-detail {
  font-size: 0.9rem;
}

.sortby-label {
  color: var(--text-secondary);
  font-weight: 500;
}
</style>
