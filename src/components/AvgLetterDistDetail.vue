<script setup lang="ts">
import type { AvgLetterDistItem } from '@/types'

defineProps<{ item: AvgLetterDistItem }>()
</script>

<template>
  <div class="ald-detail">
    <div class="ald-total">{{ item.avgDistance }} avg dist</div>

    <div v-if="item.pairs.length > 0" class="ald-pairs">
      <span
        v-for="(pair, i) in item.pairs"
        :key="i"
        class="ald-pair"
      >{{ pair.from.toUpperCase() }}→{{ pair.to.toUpperCase() }}:{{ pair.distance }}</span>
    </div>

    <div v-else class="ald-empty">single letter</div>
  </div>
</template>

<style scoped>
.ald-detail {
  font-size: 0.9rem;
}

.ald-total {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
}

.ald-pairs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ald-pair {
  font-size: 0.78rem;
  color: var(--text-secondary);
  background: var(--tile-bg);
  border: 1px solid var(--tile-border);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

.ald-empty {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
