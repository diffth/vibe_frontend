import { test, expect } from '@playwright/test'

/**
 * Home 페이지 E2E 테스트 — 월 이동, 정렬, Empty State
 *
 * mock 모드(VITE_DATA_SOURCE=mock) 기준:
 *   현재 월: 4건, 이전 월: 2건, 그 이전: 0건
 *
 * 설계 원칙: 특정 seed 텍스트에 의존하지 않고,
 * 월 이동에 따른 '헤더 변경'과 '카드 목록 변화'로만 검증한다.
 */

/** "YYYY년 M월" 레이블 계산 */
function monthLabel(delta = 0): string {
  const d = new Date()
  d.setDate(1)
  d.setMonth(d.getMonth() + delta)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월`
}

test.describe('월 이동 + 정렬', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  /**
   * TC-HOME-01: 이전 달 이동 → 헤더 변경, 이전 달로 이동 확인
   *
   * Given  홈(/)에서 현재 월 제목이 표시된다
   * When   "이전 달" 버튼을 클릭한다
   * Then   헤더 제목이 "YYYY년 M월(이전 달)"으로 변경된다
   *        "다음 달" 버튼 클릭 시 현재 달로 복귀한다
   */
  test('이전/다음 달 버튼이 헤더 월을 정확히 변경한다', async ({ page }) => {
    const current = monthLabel(0)
    const prev    = monthLabel(-1)

    // 현재 월 확인
    await expect(page.getByRole('heading', { name: current })).toBeVisible()

    // 이전 달로 이동
    await page.getByLabel('이전 달').click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: prev })).toBeVisible()

    // 다음 달로 복귀
    await page.getByLabel('다음 달').click()
    await page.waitForLoadState('networkidle')
    await expect(page.getByRole('heading', { name: current })).toBeVisible()
  })

  /**
   * TC-HOME-02: 월 이동 시 목록이 해당 월 데이터로 교체된다
   *
   * Given  현재 월에 일기가 1건 이상 있다
   * When   이전 달로 이동한다
   * Then   카드 목록이 바뀐다 (현재 달과 이전 달의 카드가 동시에 보이지 않는다)
   *
   * 추가: 데이터 없는 달로 이동 시 Empty State 표시
   */
  test('이전 달로 이동하면 해당 월 데이터로 목록이 교체된다', async ({ page }) => {
    // 현재 달 첫 번째 카드 텍스트 수집
    const firstCard = page.getByTestId('diary-card').first()
    await expect(firstCard).toBeVisible()
    const currentFirstText = await firstCard.getByTestId('diary-preview').textContent()

    // 이전 달로 이동
    await page.getByLabel('이전 달').click()
    await page.waitForLoadState('networkidle')

    // 이전 달 목록이 로드됐는지 확인
    // (mock 이전 달: 2건 / 현재 달: 4건 — 둘 다 > 0이어서 단순 "카드 있음"으로만 확인)
    const prevCards = page.getByTestId('diary-card')
    const prevCount = await prevCards.count()

    if (prevCount > 0) {
      // 이전 달 첫 카드가 현재 달 첫 카드와 달라야 한다
      const prevFirstText = await prevCards.first().getByTestId('diary-preview').textContent()
      expect(prevFirstText).not.toBe(currentFirstText)
    }

    // 데이터 없는 달까지 이동 (mock: 2단계 더 이전 = 현재 기준 -3달)
    await page.getByLabel('이전 달').click()
    await page.waitForLoadState('networkidle')
    await page.getByLabel('이전 달').click()
    await page.waitForLoadState('networkidle')

    // Empty State 확인
    await expect(page.getByTestId('empty-state')).toBeVisible()
    await expect(
      page.getByText('이번 달에 작성된 일기가 없습니다.'),
    ).toBeVisible()
    await expect(page.getByTestId('diary-card')).toHaveCount(0)
  })

  /**
   * TC-HOME-03: 정렬 전환 — 최신순 ↔ 오래된순
   *
   * Given  현재 달에 날짜가 다른 일기가 2건 이상 있다
   * When   select를 "오래된순"으로 변경한다
   * Then   첫 번째 카드의 날짜가 최신순일 때와 달라진다 (순서 역전)
   *        다시 "최신순"으로 변경하면 원래 순서로 돌아온다
   */
  test('정렬 변경 시 첫 카드 날짜가 역전된다', async ({ page }) => {
    // 카드가 2건 이상 있어야 정렬 테스트가 의미 있다
    await expect(page.getByTestId('diary-card').first()).toBeVisible()
    const cardCount = await page.getByTestId('diary-card').count()
    test.skip(cardCount < 2, '정렬 테스트를 위해 일기가 2건 이상 필요')

    // 최신순(기본) 첫 카드 날짜
    const firstDateLatest = await page
      .getByTestId('diary-date')
      .first()
      .textContent()

    // 오래된순으로 변경
    await page.locator('select').selectOption('oldest')
    await page.waitForLoadState('networkidle')

    const firstDateOldest = await page
      .getByTestId('diary-date')
      .first()
      .textContent()

    // 날짜가 다른 카드가 첫 번째로 왔는지 확인
    expect(firstDateOldest).not.toBe(firstDateLatest)

    // 최신순 복귀
    await page.locator('select').selectOption('latest')
    await page.waitForLoadState('networkidle')

    const firstDateRestored = await page
      .getByTestId('diary-date')
      .first()
      .textContent()

    expect(firstDateRestored).toBe(firstDateLatest)
  })
})
