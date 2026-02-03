<script setup lang="ts">
import type { VowelCountItem } from '@/types'

defineProps<{ item: VowelCountItem }>()
</script>

<template>
  <div class="vc-detail">
    <div class="vc-total">{{ item.vowelCount }} vowel{{ item.vowelCount === 1 ? '' : 's' }}</div>

    <div class="vc-letters">
      <span
        v-for="(letter, i) in item.letters"
        :key="i"
        class="vc-letter"
        :class="{ vowel: letter.isVowel }"
      >{{ letter.char.toUpperCase() }}</span>
    </div>
  </div>
</template>

<style scoped>
.vc-detail {
  font-size: 0.9rem;
}

.vc-total {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
}

.vc-letters {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.vc-letter {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--tile-bg);
  border: 1px solid var(--tile-border);
  color: var(--text-primary);
}

.vc-letter.vowel {
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  border-color: var(--accent);
  color: var(--accent);
}
</style>
