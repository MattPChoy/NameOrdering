export interface Airport {
  code: string
  name: string
  city: string
  lat: number
  lng: number
}

export interface Stock {
  symbol: string
  name: string
  exchange: string
}

export interface ScrabbleLetter {
  char: string
  value: number
}

export interface ScrabbleScore {
  total: number
  letters: ScrabbleLetter[]
}

export interface AirportItem {
  name: string
  airport: Airport
  distance: number
}

export interface StockItem {
  name: string
  stock: Stock
  price: number
  isMock: boolean
}

export interface HashItem {
  name: string
  hash: string
}

export interface ScrabbleItem {
  name: string
  score: ScrabbleScore
}

export interface VowelCountLetter {
  char: string
  isVowel: boolean
}

export interface VowelCountItem {
  name: string
  vowelCount: number
  letters: VowelCountLetter[]
}

export interface LetterDistPair {
  from: string
  to: string
  distance: number
}

export interface AvgLetterDistItem {
  name: string
  avgDistance: number
  pairs: LetterDistPair[]
}

export type SortMethod = 'scrabble' | 'hash' | 'airport' | 'stock' | 'vowelcount' | 'avgdist'
