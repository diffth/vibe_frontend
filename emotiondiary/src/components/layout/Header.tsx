import { formatMonthLabel } from '../../utils/dateUtils'
import styles from './Header.module.css'

interface HeaderProps {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
}

export default function Header({ year, month, onPrev, onNext }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.navBtn} onClick={onPrev} aria-label="이전 달">
        &#8249;
      </button>
      <h1 className={styles.title}>{formatMonthLabel(year, month)}</h1>
      <button type="button" className={styles.navBtn} onClick={onNext} aria-label="다음 달">
        &#8250;
      </button>
    </header>
  )
}
