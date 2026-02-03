import { ref, watch, type Ref } from 'vue'
import stocks from '@/data/stocks'
import { fuzzyScore } from '@/utils/fuzzy'
import { mockPrice } from '@/utils/mockPrice'
import type { StockItem, Stock } from '@/types'

function bestMatch(name: string): Stock {
  let best = stocks[0]
  let bestScore = -Infinity
  for (const stock of stocks) {
    const s = Math.max(
      fuzzyScore(name, stock.symbol),
      fuzzyScore(name, stock.name)
    )
    if (s > bestScore) {
      bestScore = s
      best = stock
    }
  }
  return best
}

export function useStockSort(names: Ref<string[]>) {
  const items = ref<StockItem[]>([])

  async function fetchPrices(matched: { name: string; stock: Stock }[]) {
    const symbols = [...new Set(matched.map(m => m.stock.symbol))]
    let priceMap: Record<string, number> = {}
    let isMock = false

    try {
      const res = await fetch(`/v7/finance/quote?symbols=${symbols.join(',')}`)
      if (!res.ok) throw new Error('bad response')
      const data = await res.json()
      const results: Array<{ symbol?: string; regularMarketPrice?: number }> =
        data?.quoteResponse?.result ?? []
      for (const r of results) {
        if (r.symbol && r.regularMarketPrice != null) {
          priceMap[r.symbol] = r.regularMarketPrice
        }
      }
      // If any symbol is missing a price, fall back entirely
      if (symbols.some(s => priceMap[s] == null)) throw new Error('incomplete')
    } catch {
      isMock = true
      priceMap = {}
      for (const s of symbols) {
        priceMap[s] = mockPrice(s)
      }
    }

    items.value = matched
      .map(m => ({
        name: m.name,
        stock: m.stock,
        price: priceMap[m.stock.symbol],
        isMock
      }))
      .sort((a, b) => b.price - a.price)
  }

  watch(names, (newNames) => {
    if (newNames.length === 0) {
      items.value = []
      return
    }
    const matched = newNames.map(name => ({ name, stock: bestMatch(name) }))
    fetchPrices(matched)
  }, { immediate: true, deep: true })

  return items
}
