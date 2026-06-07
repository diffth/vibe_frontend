import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DiaryEntry } from '../../types'
import { getEmotionById } from '../../constants/emotions'
import { formatDisplayDate } from '../../utils/dateUtils'
import styles from './DiaryItem.module.css'

interface DiaryItemProps {
  entry: DiaryEntry
}

function DiaryItem({ entry }: DiaryItemProps) {
  const navigate = useNavigate()
  const emotion = getEmotionById(entry.emotionId)

  return (
    <div
      data-testid="diary-card"
      className={styles.card}
      onClick={() => navigate(`/diary/${entry.id}`)}
    >
      <div className={styles.top}>
        {emotion && (
          <img src={emotion.img} alt={emotion.name} className={styles.emotionImg} />
        )}
        <div className={styles.meta}>
          <span data-testid="diary-date" className={styles.date}>
            {formatDisplayDate(entry.date)}
          </span>
          {emotion && <span className={styles.emotionName}>{emotion.name}</span>}
        </div>
      </div>
      <p data-testid="diary-preview" className={styles.preview}>{entry.content}</p>
    </div>
  )
}

export default memo(DiaryItem)
