import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDiaryStore } from '../store/diaryStore'
import { diaryService } from '../services/diaryService'
import { timestampToDateString, dateStringToTimestamp } from '../utils/dateUtils'
import EmotionSelector from '../components/diary/EmotionSelector'
import Button from '../components/common/Button'
import styles from './Edit.module.css'

export default function Edit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const getEntryById = useDiaryStore((s) => s.getEntryById)
  const onUpdate = useDiaryStore((s) => s.onUpdate)

  const [date, setDate] = useState('')
  const [emotionId, setEmotionId] = useState(3)
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return

    const fromStore = getEntryById(id)
    if (fromStore) {
      setDate(timestampToDateString(fromStore.date))
      setEmotionId(fromStore.emotionId)
      setContent(fromStore.content)
      setIsLoading(false)
      return
    }

    diaryService.getById(id)
      .then((data) => {
        setDate(timestampToDateString(data.date))
        setEmotionId(data.emotionId)
        setContent(data.content)
      })
      .catch(() => {
        alert('일기가 존재하지 않습니다.')
        navigate('/', { replace: true })
      })
      .finally(() => setIsLoading(false))
  }, [id, getEntryById, navigate])

  const validate = (): boolean => {
    if (content.trim().length === 0) {
      setContentError('내용을 입력해주세요.')
      return false
    }
    if (content.length > 2000) {
      setContentError('내용은 2000자 이내로 입력해주세요.')
      return false
    }
    setContentError('')
    return true
  }

  const handleSubmit = async () => {
    if (!id || !validate()) return
    setIsSubmitting(true)
    try {
      await onUpdate(id, {
        date: dateStringToTimestamp(date),
        content: content.trim(),
        emotionId,
      })
      navigate(`/diary/${id}`)
    } catch {
      alert('수정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <p style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-border)' }}>불러오는 중...</p>
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>일기 수정</h2>

      <div className={styles.section}>
        <label className={styles.label}>날짜</label>
        <input
          type="date"
          className={styles.dateInput}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>오늘의 감정</label>
        <EmotionSelector value={emotionId} onChange={setEmotionId} />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>일기 내용</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            if (contentError) setContentError('')
          }}
          maxLength={2100}
        />
        <p className={`${styles.charCount} ${content.length > 2000 ? styles.over : ''}`}>
          {content.length} / 2000
        </p>
        {contentError && <p className={styles.errorMsg}>{contentError}</p>}
      </div>

      <div className={styles.actions}>
        <Button label="취소" type="neutral" onClick={() => navigate(`/diary/${id}`)} />
        <Button
          label="수정 완료"
          type="positive"
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  )
}
