import type {
  DiaryEntry,
  DiaryCreatePayload,
  DiaryUpdatePayload,
  DiaryListResponse,
  SortOption,
  ApiError,
} from '../types'

const BASE = `${import.meta.env.VITE_API_BASE_URL}/api`

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (res.status === 204) return undefined as T

  const data = await res.json()

  if (!res.ok) {
    const apiErr = data as ApiError
    const err = new Error(apiErr.message || '서버 오류가 발생했습니다.')
    ;(err as Error & { code: string }).code = apiErr.code
    throw err
  }

  return data as T
}

export function listByMonth(
  from: number,
  to: number,
  sort: SortOption,
): Promise<DiaryListResponse> {
  return request<DiaryListResponse>(
    `${BASE}/diaries?from=${from}&to=${to}&sort=${sort}`,
  )
}

export function getById(id: string | number): Promise<DiaryEntry> {
  return request<DiaryEntry>(`${BASE}/diaries/${id}`)
}

export function create(payload: DiaryCreatePayload): Promise<DiaryEntry> {
  return request<DiaryEntry>(`${BASE}/diaries`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function update(id: string | number, payload: DiaryUpdatePayload): Promise<DiaryEntry> {
  return request<DiaryEntry>(`${BASE}/diaries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function remove(id: string | number): Promise<void> {
  return request<void>(`${BASE}/diaries/${id}`, { method: 'DELETE' })
}
