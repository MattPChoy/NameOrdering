<script setup lang="ts">
import type { StockItem } from '@/types'

defineProps<{ item: StockItem }>()
</script>

<template>
  <div class="stock-detail">
    <div class="stock-row">
      <span class="stock-symbol">{{ item.stock.symbol }}</span>
      <span class="exchange-badge">{{ item.stock.exchange }}</span>
      <span v-if="item.isMock" class="mock-badge">mock price</span>
    </div>
    <div class="stock-name">{{ item.stock.name }}</div>
    <div class="stock-price">${{ item.price.toFixed(2) }}</div>
  </div>
</template>

<style scoped>
.stock-detail {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.stock-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.stock-symbol {
  font-weight: 700;
  font-size: 1rem;
  color: var(--accent);
  font-family: monospace;
}

.exchange-badge {
  background: var(--badge-bg);
  color: var(--badge-text);
  padding: 2px 7px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.mock-badge {
  background: var(--mock-badge-bg);
  color: var(--mock-badge-text);
  padding: 2px 7px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
}

.stock-name {
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stock-price {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 4px;
}
</style>
