# Architecture

This is a Vue 3 + Vite + TypeScript application that sorts/orders names using various whimsical algorithms.

## Core Pattern: Composables

The app uses Vue's Composition API with a composable-per-sort-method pattern:

- **[useNames.ts](../src/composables/useNames.ts)** - Manages the list of names with localStorage persistence
- **[useSortedNames.ts](../src/composables/useSortedNames.ts)** - Orchestrator that instantiates all sort composables and returns typed arrays
- **Sort method composables** (e.g., `useAirportSort`, `useScrabbleSort`) - Each implements a specific sorting algorithm

## Sort Methods

Each sort method has three parts:
1. **Composable** in `src/composables/use*Sort.ts` - Reactive sorting logic
2. **Detail component** in `src/components/*Detail.vue` - Displays sort-specific info on cards
3. **Types** in `src/types.ts` - Item interface for that method (e.g., `AirportItem`, `ScrabbleItem`)

Available methods: `scrabble`, `hash`, `airport`, `stock`, `vowelcount`, `avgdist`

## Adding a New Sort Method

1. Add types to `src/types.ts`
2. Add utility functions to `src/utils/` if needed
3. Create `src/composables/use*Sort.ts` composable
4. Create `src/components/*Detail.vue` component
5. Register in `useSortedNames.ts` orchestrator
6. Add to `SortMethod` union type
7. Add tab in `MethodTabs.vue` and template case in `App.vue`
