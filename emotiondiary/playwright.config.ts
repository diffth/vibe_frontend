import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  timeout: 20_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // 개발 서버(5173)와 별개 포트로 항상 새로 시작 → env 적용 보장
    command: 'npx vite --port 5174',
    url: 'http://localhost:5174',
    reuseExistingServer: false,
    env: {
      // process.env 는 Vite의 .env.local 파일보다 우선 적용됨
      VITE_DATA_SOURCE: 'mock',
      VITE_API_BASE_URL: 'https://emotiondiary-api.codro.it',
    },
  },
})
