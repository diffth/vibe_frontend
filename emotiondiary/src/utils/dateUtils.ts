const DAY_NAMES = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

export function timestampToDateString(ts: number): string {
  const d = new Date(ts)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function dateStringToTimestamp(s: string): number {
  const [year, month, day] = s.split('-').map(Number)
  return new Date(year, month - 1, day).getTime()
}

export function formatDisplayDate(ts: number): string {
  const d = new Date(ts)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const dayName = DAY_NAMES[d.getDay()]
  return `${year}년 ${month}월 ${day}일 ${dayName}`
}

export function getMonthStart(year: number, month: number): number {
  return new Date(year, month - 1, 1).getTime()
}

export function getMonthEnd(year: number, month: number): number {
  return new Date(year, month, 0, 23, 59, 59, 999).getTime()
}

export function getCurrentYearMonth(): { year: number; month: number } {
  const d = new Date()
  return { year: d.getFullYear(), month: d.getMonth() + 1 }
}

export function addMonths(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const total = month - 1 + delta
  const newYear = year + Math.floor(total / 12)
  const newMonth = ((total % 12) + 12) % 12 + 1
  return { year: newYear, month: newMonth }
}

export function formatMonthLabel(year: number, month: number): string {
  return `${year}년 ${month}월`
}
