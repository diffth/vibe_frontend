export interface DiaryEntry {
  id: string | number
  date: number
  content: string
  emotionId: number
}

export interface Emotion {
  id: number
  name: string
  img: string
}

export type SortOption = 'latest' | 'oldest'

export interface DiaryCreatePayload {
  date: number
  content: string
  emotionId: number
}

export interface DiaryUpdatePayload {
  date: number
  content: string
  emotionId: number
}

export interface DiaryListResponse {
  items: DiaryEntry[]
  total: number
}

export interface ApiError {
  code: string
  message: string
}
