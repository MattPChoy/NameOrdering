<script setup lang="ts">
import type { RandomItem } from '@/types'

defineProps<{ item: RandomItem }>()
</script>

<template>
  <div class="random-detail">
    <span class="random-label">Randomly ordered</span>
  </div>
</template>

<style scoped>
.random-detail {
  font-size: 0.9rem;
}

.random-label {
  color: var(--text-secondary);
  font-style: italic;
}
</style>
