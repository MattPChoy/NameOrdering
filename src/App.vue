<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNames }        from '@/composables/useNames'
import { useSortedNames }  from '@/composables/useSortedNames'
import type { SortMethod, Airport } from '@/types'
import airports            from '@/data/airports'

import NameInput       from '@/components/NameInput.vue'
import MethodTabs      from '@/components/MethodTabs.vue'
import NameCard        from '@/components/NameCard.vue'
import OriginPicker    from '@/components/OriginPicker.vue'
import AirportDetail   from '@/components/AirportDetail.vue'
import StockDetail     from '@/components/StockDetail.vue'
import HashDetail      from '@/components/HashDetail.vue'
import ScrabbleDetail      from '@/components/ScrabbleDetail.vue'
import VowelCountDetail    from '@/components/VowelCountDetail.vue'
import AvgLetterDistDetail from '@/components/AvgLetterDistDetail.vue'

const ORIGIN_KEY = 'nameordering-origin'

function loadOrigin(): Airport {
  const code = localStorage.getItem(ORIGIN_KEY)
  if (code) {
    const found = airports.find(a => a.code === code)
    if (found) return found
  }
  return airports.find(a => a.code === 'ADL') ?? airports[0]
}

const { names, addName, removeName } = useNames()
const activeMethod = ref<SortMethod>('scrabble')
const origin       = ref<Airport>(loadOrigin())

watch(origin, (val) => {
  localStorage.setItem(ORIGIN_KEY, val.code)
})

const { airportItems, stockItems, hashItems, scrabbleItems, vowelCountItems, avgLetterDistItems } = useSortedNames(names, origin)
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Name Ordering</h1>
    </header>

    <section class="controls">
      <NameInput @add="addName" />
      <MethodTabs :active="activeMethod" @select="activeMethod = $event" />
    </section>

    <OriginPicker v-if="activeMethod === 'airport'" :origin="origin" @update="origin = $event" />

    <section v-if="names.length > 0" class="card-grid">
      <template v-if="activeMethod === 'airport'">
        <NameCard v-for="item in airportItems" :key="item.name" :name="item.name" @remove="removeName">
          <AirportDetail :item="item" :origin-city="origin.city" />
        </NameCard>
      </template>

      <template v-else-if="activeMethod === 'stock'">
        <NameCard v-for="item in stockItems" :key="item.name" :name="item.name" @remove="removeName">
          <StockDetail :item="item" />
        </NameCard>
      </template>

      <template v-else-if="activeMethod === 'hash'">
        <NameCard v-for="item in hashItems" :key="item.name" :name="item.name" @remove="removeName">
          <HashDetail :item="item" />
        </NameCard>
      </template>

      <template v-else-if="activeMethod === 'vowelcount'">
        <NameCard v-for="item in vowelCountItems" :key="item.name" :name="item.name" @remove="removeName">
          <VowelCountDetail :item="item" />
        </NameCard>
      </template>

      <template v-else-if="activeMethod === 'avgdist'">
        <NameCard v-for="item in avgLetterDistItems" :key="item.name" :name="item.name" @remove="removeName">
          <AvgLetterDistDetail :item="item" />
        </NameCard>
      </template>

      <template v-else>
        <NameCard v-for="item in scrabbleItems" :key="item.name" :name="item.name" @remove="removeName">
          <ScrabbleDetail :item="item" />
        </NameCard>
      </template>
    </section>

    <p v-else class="empty-hint">Enter names above to get started.</p>
  </div>
</template>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}

.app-header {
  text-align: center;
  margin-bottom: 28px;
}

.app-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.empty-hint {
  text-align: center;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 32px;
}
</style>
