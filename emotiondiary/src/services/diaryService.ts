import * as mock from './diaryMock'
import * as api from './diaryApi'

const source = import.meta.env.VITE_DATA_SOURCE ?? 'mock'

export const diaryService = source === 'api' ? api : mock
