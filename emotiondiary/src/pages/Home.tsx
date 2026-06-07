import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useDiaryStore } from '../store/diaryStore'
import { getCurrentYearMonth, addMonths } from '../utils/dateUtils'
import type { SortOption } from '../types'
import Header from '../components/layout/Header'
import DiaryList from '../components/diary/DiaryList'
import Button from '../components/common/Button'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const init = getCurrentYearMonth()
  const [year, setYear] = useState(init.year)
  const [month, setMonth] = useState(init.month)
  const [sort, setSort] = useState<SortOption>('latest')

  const { entries, isLoading, error, loadMonth } = useDiaryStore(
    useShallow((s) => ({
      entries: s.entries,
      isLoading: s.isLoading,
      error: s.error,
      loadMonth: s.loadMonth,
    })),
  )

  useEffect(() => {
    loadMonth(year, month, sort)
  }, [year, month, sort, loadMonth])

  const handlePrev = useCallback(() => {
    const prev = addMonths(year, month, -1)
    setYear(prev.year)
    setMonth(prev.month)
  }, [year, month])

  const handleNext = useCallback(() => {
    const next = addMonths(year, month, 1)
    setYear(next.year)
    setMonth(next.month)
  }, [year, month])

  return (
    <div className={styles.page}>
      <Header year={year} month={month} onPrev={handlePrev} onNext={handleNext} />
      <div className={styles.toolbar}>
        <select
          className={styles.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
        <Button label="새 일기 쓰기" type="positive" onClick={() => navigate('/new')} />
      </div>
      <DiaryList entries={entries} isLoading={isLoading} error={error} />
    </div>
  )
}
