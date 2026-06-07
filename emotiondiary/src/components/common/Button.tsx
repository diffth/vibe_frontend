import styles from './Button.module.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  type?: 'positive' | 'negative' | 'neutral'
  disabled?: boolean
  htmlType?: 'button' | 'submit'
}

export default function Button({
  label,
  onClick,
  type = 'neutral',
  disabled = false,
  htmlType = 'button',
}: ButtonProps) {
  return (
    <button
      type={htmlType}
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
