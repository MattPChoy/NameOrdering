import { computed, type Ref } from 'vue'
import airports from '@/data/airports'
import { fuzzyScore } from '@/utils/fuzzy'
import { haversine } from '@/utils/haversine'
import type { AirportItem, Airport } from '@/types'

function scoreAgainst(name: string, airport: Airport): number {
  return Math.max(
    fuzzyScore(name, airport.code),
    fuzzyScore(name, airport.city)
  )
}

/**
 * Assign airports to names without replacement using a greedy approach:
 * score every (name, airport) pair, then repeatedly pick the highest-scoring
 * pair whose airport hasn't been used yet.
 */
function assignAirports(names: string[]): Map<string, Airport> {
  // Build a scored list for every name against every airport
  const candidates: { nameIdx: number; airport: Airport; score: number }[] = []
  for (let i = 0; i < names.length; i++) {
    for (const airport of airports) {
      candidates.push({ nameIdx: i, airport, score: scoreAgainst(names[i], airport) })
    }
  }
  // Sort descending by score so the strongest matches are picked first
  candidates.sort((a, b) => b.score - a.score)

  const result = new Map<string, Airport>()
  const usedAirports = new Set<string>()

  for (const { nameIdx, airport, score } of candidates) {
    const name = names[nameIdx]
    if (result.has(name) || usedAirports.has(airport.code)) continue
    result.set(name, airport)
    usedAirports.add(airport.code)
    if (result.size === names.length) break
  }

  return result
}

export function useAirportSort(names: Ref<string[]>, origin: Ref<Airport>) {
  return computed<AirportItem[]>(() => {
    const assignments = assignAirports(names.value)
    return names.value
      .map(name => {
        const airport = assignments.get(name)!
        const distance = Math.round(haversine(airport.lat, airport.lng, origin.value.lat, origin.value.lng))
        return { name, airport, distance }
      })
      .sort((a, b) => a.distance - b.distance)
  })
}
