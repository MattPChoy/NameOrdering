import { type Ref } from 'vue'
import { useAirportSort } from './useAirportSort'
import { useStockSort } from './useStockSort'
import { useHashSort } from './useHashSort'
import { useScrabbleSort } from './useScrabbleSort'
import { useVowelCountSort } from './useVowelCountSort'
import { useAvgLetterDistSort } from './useAvgLetterDistSort'
import type { Airport } from '@/types'

/**
 * Orchestrator: instantiates all sort composables unconditionally
 * and returns each typed array. The caller switches on activeMethod
 * in the template for full type safety.
 */
export function useSortedNames(names: Ref<string[]>, origin: Ref<Airport>) {
  const airportItems      = useAirportSort(names, origin)
  const stockItems        = useStockSort(names)
  const hashItems         = useHashSort(names)
  const scrabbleItems     = useScrabbleSort(names)
  const vowelCountItems   = useVowelCountSort(names)
  const avgLetterDistItems = useAvgLetterDistSort(names)

  return { airportItems, stockItems, hashItems, scrabbleItems, vowelCountItems, avgLetterDistItems }
}
