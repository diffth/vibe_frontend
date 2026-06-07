import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDiaryStore } from '../store/diaryStore'
import { timestampToDateString, dateStringToTimestamp } from '../utils/dateUtils'
import EmotionSelector from '../components/diary/EmotionSelector'
import Button from '../components/common/Button'
import styles from './New.module.css'

export default function New() {
  const navigate = useNavigate()
  const onCreate = useDiaryStore((s) => s.onCreate)

  const [date, setDate] = useState(() => timestampToDateString(Date.now()))
  const [emotionId, setEmotionId] = useState(3)
  const [content, setContent] = useState('')
  const [contentError, setContentError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await onCreate({
        date: dateStringToTimestamp(date),
        content: content.trim(),
        emotionId,
      })
      navigate('/')
    } catch {
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>새 일기 작성</h2>

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
          placeholder="오늘 하루를 기록해 보세요..."
          maxLength={2100}
        />
        <p className={`${styles.charCount} ${content.length > 2000 ? styles.over : ''}`}>
          {content.length} / 2000
        </p>
        {contentError && <p className={styles.errorMsg}>{contentError}</p>}
      </div>

      <div className={styles.actions}>
        <Button label="취소" type="neutral" onClick={() => navigate(-1)} />
        <Button
          label="작성 완료"
          type="positive"
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  )
}
