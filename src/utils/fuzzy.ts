/**
 * Fuzzy match score between query and target.
 * Higher = better match.  Always >= 0.
 *
 * Score tiers (non-overlapping ranges):
 *   Exact match          10 000
 *   Prefix match          8 000+   (shorter target = higher within tier)
 *   Substring match       6 000+
 *   Subsequence match     2 000+   (bonuses for consecutive / boundary hits)
 *   Character overlap         0–100  (fallback when no subsequence exists)
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase()
  const t = target.toLowerCase()

  if (q.length === 0) return 0

  // Tier 1 – exact
  if (q === t) return 10000

  // Tier 2 – prefix  (shorter target = more specific)
  if (t.startsWith(q)) return 8000 + (100 - t.length)

  // Tier 3 – substring (not at position 0)
  if (t.includes(q)) return 6000 + (100 - t.length)

  // Tier 4 – subsequence (all query chars appear in order inside target)
  const sub = subsequenceScore(q, t)
  if (sub !== null) return 2000 + sub

  // Tier 5 – character-overlap fallback
  return charOverlapScore(q, t)
}

/**
 * Score a subsequence match of q inside t.
 * Returns null when q is not a subsequence of t.
 *
 * Bonuses per matched character:
 *   +10  matching at position 0 of target
 *   +7   matching immediately after a word boundary  (space / hyphen / underscore / dot)
 *   escalating streak bonus: first consecutive pair +5, second +10, third +15 …
 */
function subsequenceScore(q: string, t: string): number | null {
  let qi = 0
  let score = 0
  let lastIdx = -1
  let streak = 0

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (q[qi] !== t[ti]) continue

    score += 1 // base point per matched character

    if (lastIdx !== -1 && ti === lastIdx + 1) {
      streak++
      score += streak * 5
    } else {
      streak = 0
    }

    if (ti === 0)                        score += 10
    else if (/[\s\-_.]/.test(t[ti - 1])) score += 7

    lastIdx = ti
    qi++
  }

  if (qi < q.length) return null // not all characters matched

  // Prefer shorter targets (tighter / more specific match)
  score -= (t.length - q.length) * 0.5

  return Math.max(0, score)
}

/**
 * Fallback score: fraction of query characters present in target,
 * counted with multiplicity.  Scaled to 0–100 with a small length penalty.
 */
function charOverlapScore(q: string, t: string): number {
  const pool = new Map<string, number>()
  for (const c of t) pool.set(c, (pool.get(c) ?? 0) + 1)

  let matched = 0
  for (const c of q) {
    const n = pool.get(c) ?? 0
    if (n > 0) {
      matched++
      pool.set(c, n - 1)
    }
  }

  const ratio = matched / q.length
  return Math.max(0, ratio * 100 - t.length * 0.5)
}
