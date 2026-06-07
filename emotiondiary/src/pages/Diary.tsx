import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDiaryStore } from '../store/diaryStore'
import { diaryService } from '../services/diaryService'
import { getEmotionById } from '../constants/emotions'
import { formatDisplayDate } from '../utils/dateUtils'
import type { DiaryEntry } from '../types'
import Button from '../components/common/Button'
import styles from './Diary.module.css'

export default function Diary() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const getEntryById = useDiaryStore((s) => s.getEntryById)
  const onDelete = useDiaryStore((s) => s.onDelete)

  const [entry, setEntry] = useState<DiaryEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fromStore = getEntryById(id)
    if (fromStore) {
      setEntry(fromStore)
      setIsLoading(false)
      return
    }

    diaryService.getById(id)
      .then((data) => setEntry(data))
      .catch(() => {
        alert('일기가 존재하지 않습니다.')
        navigate('/', { replace: true })
      })
      .finally(() => setIsLoading(false))
  }, [id, getEntryById, navigate])

  const handleDelete = async () => {
    if (!id) return
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await onDelete(id)
      navigate('/', { replace: true })
    } catch {
      alert('삭제에 실패했습니다.')
    }
  }

  if (isLoading) {
    return <p style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-border)' }}>불러오는 중...</p>
  }

  if (!entry) return null

  const emotion = getEmotionById(entry.emotionId)

  return (
    <div className={styles.page}>
      <button type="button" className={styles.backBtn} onClick={() => navigate('/')}>
        &#8592; 목록으로
      </button>

      <div className={styles.card}>
        <p className={styles.dateStr}>{formatDisplayDate(entry.date)}</p>

        {emotion && (
          <div className={styles.emotionRow}>
            <img src={emotion.img} alt={emotion.name} className={styles.emotionImg} />
            <span className={styles.emotionName}>{emotion.name}</span>
          </div>
        )}

        <p className={styles.content}>{entry.content}</p>
      </div>

      <div className={styles.actions}>
        <Button label="수정하기" type="neutral" onClick={() => navigate(`/edit/${id}`)} />
        <Button label="삭제하기" type="negative" onClick={handleDelete} />
      </div>
    </div>
  )
}
