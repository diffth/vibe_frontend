import type {
  DiaryEntry,
  DiaryCreatePayload,
  DiaryUpdatePayload,
  DiaryListResponse,
  SortOption,
} from '../types'
import { filterByMonth, sortEntries } from '../utils/filterUtils'
import { getMonthStart, getMonthEnd } from '../utils/dateUtils'

const now = new Date()
const y = now.getFullYear()
const m = now.getMonth() + 1

function d(year: number, month: number, day: number): number {
  return new Date(year, month - 1, day).getTime()
}

const prevMonth = m === 1 ? { y: y - 1, m: 12 } : { y, m: m - 1 }

let mockData: DiaryEntry[] = [
  { id: 1, date: d(y, m, 1), content: '새로운 달의 시작! 기분이 상쾌하다.', emotionId: 1 },
  { id: 2, date: d(y, m, 3), content: '오늘은 평범한 하루였다. 특별한 일은 없었지만 나쁘지 않았어.', emotionId: 3 },
  { id: 3, date: d(y, m, 5), content: '업무가 너무 많아서 힘들었다. 빨리 주말이 오면 좋겠다.', emotionId: 4 },
  { id: 4, date: d(y, m, 7), content: '친구들과 오랜만에 만나서 즐거운 시간을 보냈다!', emotionId: 2 },
  { id: 5, date: d(prevMonth.y, prevMonth.m, 15), content: '저번 달 중순의 일기. 그때는 날씨가 좋았다.', emotionId: 2 },
  { id: 6, date: d(prevMonth.y, prevMonth.m, 28), content: '월말이라 바빴지만 뿌듯하게 마무리했다.', emotionId: 1 },
]

let nextId = 100

function assertFound(entry: DiaryEntry | undefined, id: string | number): DiaryEntry {
  if (!entry) {
    const err = new Error('일기가 존재하지 않습니다.')
    ;(err as Error & { code: string }).code = 'NOT_FOUND'
    throw err
  }
  return entry
}

export function listByMonth(
  from: number,
  to: number,
  sort: SortOption,
): Promise<DiaryListResponse> {
  const filtered = filterByMonth(mockData, from, to)
  const sorted = sortEntries(filtered, sort)
  return Promise.resolve({ items: sorted, total: sorted.length })
}

export function getById(id: string | number): Promise<DiaryEntry> {
  const entry = mockData.find((e) => String(e.id) === String(id))
  return Promise.resolve(assertFound(entry, id))
}

export function create(payload: DiaryCreatePayload): Promise<DiaryEntry> {
  const newEntry: DiaryEntry = { id: String(nextId++), ...payload }
  mockData.push(newEntry)
  return Promise.resolve({ ...newEntry })
}

export function update(id: string | number, payload: DiaryUpdatePayload): Promise<DiaryEntry> {
  const idx = mockData.findIndex((e) => String(e.id) === String(id))
  assertFound(mockData[idx], id)
  mockData[idx] = { ...mockData[idx], ...payload }
  return Promise.resolve({ ...mockData[idx] })
}

export function remove(id: string | number): Promise<void> {
  const idx = mockData.findIndex((e) => String(e.id) === String(id))
  assertFound(mockData[idx], id)
  mockData.splice(idx, 1)
  return Promise.resolve()
}

export { getMonthStart, getMonthEnd }
