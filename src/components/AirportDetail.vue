<script setup lang="ts">
import type { AirportItem } from '@/types'

defineProps<{ item: AirportItem; originCity: string }>()
</script>

<template>
  <div class="airport-detail">
    <div class="airport-row">
      <span class="airport-code">{{ item.airport.code }}</span>
      <span class="airport-name">{{ item.airport.name }}</span>
    </div>
    <div class="airport-city">{{ item.airport.city }}</div>
    <div class="airport-distance">{{ item.distance.toLocaleString() }} km from {{ originCity }}</div>
  </div>
</template>

<style scoped>
.airport-detail {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.airport-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.airport-code {
  font-weight: 700;
  font-size: 1rem;
  color: var(--accent);
  font-family: monospace;
}

.airport-name {
  color: var(--text-primary);
}

.airport-city {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.airport-distance {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 6px;
}
</style>
