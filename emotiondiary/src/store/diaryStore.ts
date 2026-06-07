import { create } from 'zustand'
import type { DiaryEntry, SortOption, DiaryCreatePayload, DiaryUpdatePayload } from '../types'
import { diaryService } from '../services/diaryService'
import { getMonthStart, getMonthEnd } from '../utils/dateUtils'

interface DiaryState {
  entries: DiaryEntry[]
  isLoading: boolean
  error: string | null
  loadMonth: (year: number, month: number, sort: SortOption) => Promise<void>
  onCreate: (payload: DiaryCreatePayload) => Promise<DiaryEntry>
  onUpdate: (id: string | number, payload: DiaryUpdatePayload) => Promise<DiaryEntry>
  onDelete: (id: string | number) => Promise<void>
  getEntryById: (id: string | number) => DiaryEntry | undefined
  clearError: () => void
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,

  loadMonth: async (year, month, sort) => {
    set({ isLoading: true, error: null })
    try {
      const from = getMonthStart(year, month)
      const to = getMonthEnd(year, month)
      const res = await diaryService.listByMonth(from, to, sort)
      set({ entries: res.items, isLoading: false })
    } catch (e) {
      set({ error: (e as Error).message, isLoading: false })
    }
  },

  onCreate: async (payload) => {
    const newEntry = await diaryService.create(payload)
    set((s) => ({ entries: [newEntry, ...s.entries] }))
    return newEntry
  },

  onUpdate: async (id, payload) => {
    const updated = await diaryService.update(id, payload)
    set((s) => ({
      entries: s.entries.map((e) => (String(e.id) === String(id) ? updated : e)),
    }))
    return updated
  },

  onDelete: async (id) => {
    await diaryService.remove(id)
    set((s) => ({ entries: s.entries.filter((e) => String(e.id) !== String(id)) }))
  },

  getEntryById: (id) => get().entries.find((e) => String(e.id) === String(id)),

  clearError: () => set({ error: null }),
}))
