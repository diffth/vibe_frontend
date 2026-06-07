import type { DiaryEntry, SortOption } from '../types'

export function filterByMonth(entries: DiaryEntry[], from: number, to: number): DiaryEntry[] {
  return entries.filter((e) => e.date >= from && e.date <= to)
}

export function sortEntries(entries: DiaryEntry[], sort: SortOption): DiaryEntry[] {
  return sort === 'latest'
    ? [...entries].sort((a, b) => b.date - a.date)
    : [...entries].sort((a, b) => a.date - b.date)
}
