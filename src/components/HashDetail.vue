<script setup lang="ts">
import type { HashItem } from '@/types'

defineProps<{ item: HashItem }>()
</script>

<template>
  <div class="hash-detail">
    <div class="hash-label">SHA-256</div>
    <div class="hash-value">{{ item.hash.slice(0, 16) }}</div>
  </div>
</template>

<style scoped>
.hash-detail {
  font-size: 0.9rem;
}

.hash-label {
  color: var(--text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.hash-value {
  font-family: 'Courier New', monospace;
  color: var(--accent);
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  word-break: break-all;
}
</style>
