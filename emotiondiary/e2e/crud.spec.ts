import { test, expect, type Page } from '@playwright/test'

/**
 * CRUD E2E 테스트 — mock 모드 (VITE_DATA_SOURCE=mock)
 *
 * 격리 전략: 각 테스트가 "[TC-XX]" prefix 고유 content를 생성하고
 * 그 content 텍스트로만 검색하므로 다른 데이터에 영향 받지 않는다.
 */

// ─── 헬퍼 ───────────────────────────────────────────────────────────────────

async function createDiary(
  page: Page,
  options: { content: string; emotionIndex?: number; date?: string },
) {
  const { content, emotionIndex = 0, date } = options

  await page.goto('/new')

  if (date) {
    const input = page.locator('input[type="date"]')
    await input.fill(date)
    // 값이 제대로 설정됐는지 확인 — 안 됐으면 JS로 직접 주입
    const actual = await input.inputValue()
    if (actual !== date) {
      await input.evaluate((el: HTMLInputElement, v) => { el.value = v }, date)
    }
  }

  // 감정 선택 (aria-pressed 버튼 중 index 번째)
  await page.locator('button[aria-pressed]').nth(emotionIndex).click()

  await page.locator('textarea').fill(content)
  await page.getByRole('button', { name: '작성 완료' }).click()
  await page.waitForURL('/')
}

// ─── 테스트 ─────────────────────────────────────────────────────────────────

test.describe('CRUD 흐름', () => {
  /**
   * TC-CRUD-01: 작성 → 상세 확인 → 수정 → 삭제 전체 흐름
   *
   * Given  홈(/)이 표시된다
   * When   새 일기를 작성하고 / 상세에서 내용을 확인하고 / 수정하고 / 삭제하면
   * Then   각 단계마다 UI가 기대한 상태로 변한다
   */
  test('일기 작성 → 상세 확인 → 수정 → 삭제', async ({ page }) => {
    const originalContent = '[TC-CRUD-01] 오늘은 정말 즐거운 하루였다.'
    const updatedContent  = '[TC-CRUD-01] 수정됨 — 역시 좋은 하루!'

    // ── 1. 홈 진입 ────────────────────────────────────────────────────────────
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // ── 2. 작성 ──────────────────────────────────────────────────────────────
    await page.getByRole('button', { name: '새 일기 쓰기' }).click()
    await expect(page).toHaveURL('/new')

    await page.locator('button[aria-pressed]').nth(1).click()        // "좋음"
    await page.locator('textarea').fill(originalContent)
    await expect(page.locator('textarea')).toHaveValue(originalContent)

    await page.getByRole('button', { name: '작성 완료' }).click()
    await page.waitForURL('/')

    // 홈 목록에 새 항목이 보여야 한다
    await expect(page.getByText(originalContent)).toBeVisible()

    // ── 3. 상세 조회 ──────────────────────────────────────────────────────────
    await page
      .getByTestId('diary-card')
      .filter({ hasText: originalContent })
      .click()

    await expect(page).toHaveURL(/\/diary\//)
    await expect(page.getByText(originalContent)).toBeVisible()

    // 날짜 형식: "YYYY년 MM월 DD일 요일"
    await expect(page.locator('[class*="dateStr"]')).toHaveText(
      /\d{4}년 \d{2}월 \d{2}일 \S+요일/,
    )
    await expect(page.getByRole('button', { name: '수정하기' })).toBeVisible()
    await expect(page.getByRole('button', { name: '삭제하기' })).toBeVisible()

    // ── 4. 수정 ──────────────────────────────────────────────────────────────
    await page.getByRole('button', { name: '수정하기' }).click()
    await expect(page).toHaveURL(/\/edit\//)

    // 기존 내용이 pre-fill 되어 있어야 한다
    await expect(page.locator('textarea')).toHaveValue(originalContent)

    await page.locator('textarea').fill(updatedContent)
    await page.getByRole('button', { name: '수정 완료' }).click()

    // 상세 페이지로 복귀
    await expect(page).toHaveURL(/\/diary\//)
    await expect(page.getByText(updatedContent)).toBeVisible()
    await expect(page.getByText(originalContent)).not.toBeVisible()

    // ── 5. 삭제 ──────────────────────────────────────────────────────────────
    // confirm 다이얼로그를 클릭 전에 미리 accept 처리 (순서 중요!)
    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: '삭제하기' }).click()

    await page.waitForURL('/')
    await expect(page.getByText(updatedContent)).not.toBeVisible()
  })
})
