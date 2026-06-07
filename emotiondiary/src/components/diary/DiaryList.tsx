import type { DiaryEntry } from '../../types'
import DiaryItem from './DiaryItem'
import EmptyState from '../common/EmptyState'
import styles from './DiaryList.module.css'

interface DiaryListProps {
  entries: DiaryEntry[]
  isLoading: boolean
  error: string | null
}

export default function DiaryList({ entries, isLoading, error }: DiaryListProps) {
  if (isLoading) {
    return <p className={styles.statusMessage}>불러오는 중...</p>
  }

  if (error) {
    return <p className={`${styles.statusMessage} ${styles.error}`}>{error}</p>
  }

  if (entries.length === 0) {
    return <EmptyState />
  }

  return (
    <div data-testid="diary-list" className={styles.list}>
      {entries.map((entry) => (
        <DiaryItem key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
