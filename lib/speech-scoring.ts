/**
 * Order-aware local scoring for speech practice transcripts.
 *
 * Weights (per product spec):
 * - 55% full-string Levenshtein similarity (normalized, punctuation stripped)
 * - 35% ordered token-sequence similarity via token-level Levenshtein (word order matters)
 * - 10% token coverage (weak signal: share of target tokens that appear anywhere in spoken)
 *
 * Threshold default 0.78 — shuffled words should fail; minor omissions can still pass.
 *
 * Internal sanity checks (not automated tests):
 * - target: "Could I get an iced americano with less ice?"
 *   spoken: "iced americano less ice could I get" → should NOT pass (order wrecked).
 * - target: "Could I get an iced americano with less ice?"
 *   spoken: "Could I get iced americano with less ice" → may pass (small "an" drop).
 */

export const DEFAULT_PASS_THRESHOLD = 0.78;

export function normalizeSpeechText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenizeNormalized(normalized: string): string[] {
  return normalized.split(' ').filter(Boolean);
}

function levenshteinChars(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = new Array<number>(n + 1);
  for (let j = 0; j <= n; j += 1) row[j] = j;
  for (let i = 1; i <= m; i += 1) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j += 1) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n];
}

/** Levenshtein distance on token arrays (substitution = replace one word). */
function levenshteinTokens(a: string[], b: string[]): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = new Array<number>(n + 1);
  for (let j = 0; j <= n; j += 1) row[j] = j;
  for (let i = 1; i <= m; i += 1) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j += 1) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[n];
}

function charLevenshteinSimilarity(a: string, b: string): number {
  if (a.length === 0 && b.length === 0) return 1;
  if (a.length === 0 || b.length === 0) return 0;
  const dist = levenshteinChars(a, b);
  const maxLen = Math.max(a.length, b.length);
  return 1 - dist / maxLen;
}

function tokenSequenceSimilarity(expectedTokens: string[], spokenTokens: string[]): number {
  if (expectedTokens.length === 0 && spokenTokens.length === 0) return 1;
  if (expectedTokens.length === 0 || spokenTokens.length === 0) return 0;
  const dist = levenshteinTokens(expectedTokens, spokenTokens);
  const maxTok = Math.max(expectedTokens.length, spokenTokens.length);
  return 1 - dist / maxTok;
}

/** Share of unique target tokens that appear at least once in spoken (secondary signal only). */
function tokenCoverage(expectedTokens: string[], spokenTokens: string[]): number {
  if (expectedTokens.length === 0) return spokenTokens.length === 0 ? 1 : 0;
  const spokenSet = new Set(spokenTokens);
  let hit = 0;
  const seen = new Set<string>();
  for (const w of expectedTokens) {
    if (seen.has(w)) continue;
    seen.add(w);
    if (spokenSet.has(w)) hit += 1;
  }
  return hit / seen.size;
}

export interface SpeechScoreResult {
  similarity: number;
  passed: boolean;
  normalizedTarget: string;
  normalizedTranscript: string;
}

export function scoreSpeechMatch(
  target: string,
  transcript: string,
  threshold: number = DEFAULT_PASS_THRESHOLD
): SpeechScoreResult {
  const normalizedTarget = normalizeSpeechText(target);
  const normalizedTranscript = normalizeSpeechText(transcript);
  const tTok = tokenizeNormalized(normalizedTarget);
  const sTok = tokenizeNormalized(normalizedTranscript);

  const wChar = charLevenshteinSimilarity(normalizedTarget, normalizedTranscript);
  const wTok = tokenSequenceSimilarity(tTok, sTok);
  const wCov = tokenCoverage(tTok, sTok);

  const similarity = Math.min(1, 0.55 * wChar + 0.35 * wTok + 0.1 * wCov);

  return {
    similarity,
    passed: similarity >= threshold,
    normalizedTarget,
    normalizedTranscript,
  };
}
