import type { Emotion } from '../types'

export const EMOTIONS: Emotion[] = [
  { id: 1, name: '완전 좋음', img: '/emotions/emotion1.svg' },
  { id: 2, name: '좋음', img: '/emotions/emotion2.svg' },
  { id: 3, name: '보통', img: '/emotions/emotion3.svg' },
  { id: 4, name: '나쁨', img: '/emotions/emotion4.svg' },
  { id: 5, name: '끔찍함', img: '/emotions/emotion5.svg' },
]

export const getEmotionById = (id: number): Emotion | undefined =>
  EMOTIONS.find((e) => e.id === id)
