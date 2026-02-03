<script setup lang="ts">
import type { ScrabbleItem } from '@/types'

defineProps<{ item: ScrabbleItem }>()
</script>

<template>
  <div class="scrabble-detail">
    <div class="scrabble-total">{{ item.score.total }} points</div>
    <div class="tiles">
      <span v-for="(letter, i) in item.score.letters" :key="i" class="tile">
        <span class="tile-char">{{ letter.char }}</span>
        <span class="tile-value">{{ letter.value }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.scrabble-detail {
  font-size: 0.9rem;
}

.scrabble-total {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
}

.tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--tile-bg);
  border: 1px solid var(--tile-border);
  border-radius: var(--radius-sm);
  width: 32px;
  padding: 3px 0;
}

.tile-char {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.tile-value {
  font-size: 0.7rem;
  color: var(--accent);
  font-weight: 600;
}
</style>
