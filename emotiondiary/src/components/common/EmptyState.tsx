import styles from './EmptyState.module.css'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({
  message = '이번 달에 작성된 일기가 없습니다.',
}: EmptyStateProps) {
  return (
    <div data-testid="empty-state" className={styles.container}>
      <span className={styles.icon}>📖</span>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
