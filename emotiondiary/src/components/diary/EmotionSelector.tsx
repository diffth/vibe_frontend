import { EMOTIONS } from '../../constants/emotions'
import styles from './EmotionSelector.module.css'

interface EmotionSelectorProps {
  value: number
  onChange: (id: number) => void
}

export default function EmotionSelector({ value, onChange }: EmotionSelectorProps) {
  return (
    <div className={styles.container}>
      {EMOTIONS.map((emotion) => (
        <button
          key={emotion.id}
          type="button"
          className={`${styles.item} ${value === emotion.id ? styles.selected : ''}`}
          onClick={() => onChange(emotion.id)}
          aria-pressed={value === emotion.id}
        >
          <img src={emotion.img} alt={emotion.name} className={styles.img} />
          <span className={styles.name}>{emotion.name}</span>
        </button>
      ))}
    </div>
  )
}
