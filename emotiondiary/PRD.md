# PRD_TEMPLATE.md — 감정 일기장 (Emotion Diary)

> React 19 + Vite + TypeScript 기반 감정 일기장 서비스 PRD 템플릿  
> **1차(Mock) → 2차(API 연동)** 단계로 구현되도록 요구사항을 고정합니다.

---

## 0. 문서 메타

- 문서명: Emotion Diary PRD
- 버전: v1.1
- 작성 목적: 요구사항 기반 프론트엔드 구현(1차 Mock) 후, 기 구현된 백엔드 API 명세에 따라 2차 연동
- 범위: 일기 CRUD, 감정(1~5), 월별 필터링, 최신순/오래된순 정렬
- 비범위: 소셜/공유, 감정 분석(LLM), 푸시 알림, 다국어

---

## 1. 제품 개요

### 1.1 한 줄 소개
사용자가 하루의 일기를 작성하고, 그날의 감정을 1~5 단계로 기록하며, 월 단위로 탐색하고 정렬할 수 있는 개인 기록 앱.

### 1.2 목표
- 입력/조회 흐름이 단순해야 한다.
- 월 단위 탐색과 정렬로 빠르게 회고할 수 있어야 한다.
- **1차(Mock)** 로 UI/상태/라우팅을 먼저 완성하고  
  **2차(API 연동)** 으로 서버 영속성까지 연결한다.

### 1.3 대상 사용자
- 감정을 기록하고 회고하고 싶은 개인 사용자
- 요구사항 기반 설계/구현을 학습하는 수강생

---

## 2. 성공 기준 (Success Metrics)

- 신규 일기 작성 평균 완료 시간: 30초 이내(내용 1~2문장 기준)
- 월 이동 후 목록 로드: 1초 이내(정상 환경)
- 핵심 기능 결함 0 (작성/수정/삭제/상세/목록/월필터/정렬)
- E2E 시나리오(작성→조회→수정→삭제) 전부 통과

---

## 3. 구현 단계(필수) — 1차 Mock → 2차 API 연동

### 3.1 1차(Mock) 구현 요구사항
- 서버 없이도 전체 기능이 동작해야 한다.
- 데이터 소스는 **mockData**(인메모리)로 동작한다.
- CRUD 동작은 Zustand store 액션(onCreate/onUpdate/onDelete)만으로 완료한다.
- 월필터/정렬은 프론트 로직(util + list)로 수행한다.
- 페이지 라우팅/상태/컴포넌트 구조가 PRD 요구사항과 일치해야 한다.

#### 1차(Mock) 완료 기준
- /, /new, /diary/:id, /edit/:id 모든 라우팅 정상
- 작성/수정/삭제 후 화면 갱신 정상
- 월 이동 시 해당 월의 데이터만 노출
- 정렬 옵션에 따라 목록 순서 변경
- Empty State 노출

---

### 3.2 2차(API 연동) 구현 요구사항
- 백엔드 API는 **이미 구현되어 있다고 가정**한다.
- 프론트는 **API 명세서(본 PRD 5장)** 를 기준으로 호출한다.
- 데이터는 서버 응답을 store에 반영하여 화면을 갱신한다.
- 1차 Mock 로직을 제거하지 않고, **전환 가능한 구조**로 유지한다.

#### 전환 정책(권장)
- `VITE_DATA_SOURCE=mock|api` 환경변수로 데이터 소스를 전환한다.
- 기본값은 `mock` (수업 안정성 확보)
- 최종 제출/검증은 `api`

---

## 4. 기능 요구사항 (Functional Requirements)

## 4.1 도메인 모델(프론트 기준)

### DiaryEntry
- id: string | number
- date: number (Unix timestamp ms)
- content: string
- emotionId: number (1~5)

> **날짜 규칙**  
> 입력: "YYYY-MM-DD"  
> 저장/전송: timestamp(ms)  
> 표시: "YYYY-MM-DD" (format util 사용)

### Emotion
- id: number (1~5)
- name: string
- img: string (emotion1~5.png)

---

## 4.2 라우팅

| 경로 | 페이지 | 설명 |
|------|--------|------|
| / | Home | 월별 일기 목록(필터+정렬) |
| /new | New | 새 일기 작성 |
| /diary/:id | Diary | 일기 상세 |
| /edit/:id | Edit | 일기 수정 |

### 공통 UX 규칙
- 존재하지 않는 `:id` 접근 시: 알림("일기가 존재하지 않습니다") 후 홈으로 이동(replace)
- 네트워크 에러 시: 알림 1회 + 사용자 재시도 가능(버튼/이동)

---

## 4.3 Home (월별 목록/정렬)

### 기능
1) 기본 진입 시 **현재 월** 일기만 표시  
2) 월 이동(이전/다음)  
3) 정렬 옵션:
- 최신순(latest) 기본
- 오래된순(oldest)

### UI 구성(최소)
- Header: "YYYY년 M월", 이전(<), 다음(>)
- DiaryList: 목록 카드
- Sort Select: 최신순/오래된순
- Empty State: "이번 달에 작성된 일기가 없습니다."

---

## 4.4 New (일기 작성)

### 입력 필드
- date: 기본값 오늘
- emotionId: 기본값 3
- content: 기본값 ""

### 검증
- content: 1자 이상, 최대 2000자
- emotionId: 1~5
- date: 유효한 날짜

### 동작
- 작성 완료 클릭 시:
  - mock 모드: store.onCreate
  - api 모드: POST 생성 → 성공 시 홈 이동

---

## 4.5 Diary (상세 보기)

### 표시 항목
- 날짜(YYYY-MM-DD + 요일)
- 감정 이미지/라벨
- 본문(content)

### 동작
- 수정하기 → /edit/:id
- 삭제하기 → confirm → 삭제 수행 → 홈 이동

---

## 4.6 Edit (일기 수정)

### 요구사항
- initData로 기존 데이터 주입
- 수정 완료 클릭 시:
  - mock 모드: store.onUpdate
  - api 모드: PUT 수정 → 성공 시 상세(/diary/:id) 이동

---

## 5. API 명세(프론트 호출 기준)

> 백엔드는 이미 구현되어 있으며, 프론트는 아래 명세로만 호출합니다.  
> Base URL은 환경변수로 주입합니다.

### 5.1 환경변수
- `VITE_API_BASE_URL` 예: `http://localhost:8080`
- 실제 호출 Base: `${VITE_API_BASE_URL}/api`

---

### 5.2 공통 규칙

#### 요청/응답
- Content-Type: application/json
- 날짜는 **timestamp(ms)** 로 송수신한다.

#### 에러 응답(통일)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "content is required"
}
```

#### HTTP 상태 규칙
- 200: 조회/수정 성공
- 201: 생성 성공
- 204: 삭제 성공(응답 바디 없음)
- 400: 유효성 실패
- 404: 리소스 없음
- 500: 서버 오류

---

### 5.3 엔드포인트

#### (1) 월별 목록 조회
- **GET** `/api/diaries`
- Query
  - `from` (number, ms) : 월 시작 timestamp
  - `to` (number, ms) : 월 종료 timestamp
  - `sort` (string) : `latest | oldest`

**Request 예**
- `/api/diaries?from=1704038400000&to=1706716799999&sort=latest`

**Response 200**
```json
{
  "items": [
    {
      "id": "uuid-1",
      "date": 1706054400000,
      "content": "오늘은 기분이 좋았다.",
      "emotionId": 2
    }
  ],
  "total": 1
}
```

---

#### (2) 단건 조회
- **GET** `/api/diaries/{id}`

**Response 200**
```json
{
  "id": "uuid-1",
  "date": 1706054400000,
  "content": "오늘은 기분이 좋았다.",
  "emotionId": 2
}
```

**Response 404**
```json
{
  "code": "NOT_FOUND",
  "message": "Diary not found"
}
```

---

#### (3) 생성
- **POST** `/api/diaries`

**Request**
```json
{
  "date": 1706054400000,
  "content": "새 일기 내용",
  "emotionId": 3
}
```

**Response 201**
```json
{
  "id": "uuid-new",
  "date": 1706054400000,
  "content": "새 일기 내용",
  "emotionId": 3
}
```

---

#### (4) 수정
- **PUT** `/api/diaries/{id}`

**Request**
```json
{
  "date": 1706054400000,
  "content": "수정된 내용",
  "emotionId": 4
}
```

**Response 200**
```json
{
  "id": "uuid-1",
  "date": 1706054400000,
  "content": "수정된 내용",
  "emotionId": 4
}
```

---

#### (5) 삭제
- **DELETE** `/api/diaries/{id}`
- **Response 204** (No Content)

---

## 6. 프론트 구현 가이드(데이터 소스 전환)

### 6.1 데이터 접근 레이어 분리(필수)
- `src/services/diaryApi.ts` (API 호출)
- `src/services/diaryMock.ts` (mockData + 로컬 CRUD)
- `src/services/diaryService.ts` (데이터 소스 선택/추상화)

예시(개념)
- `diaryService.listByMonth(from, to, sort)`
- `diaryService.getById(id)`
- `diaryService.create(payload)`
- `diaryService.update(id, payload)`
- `diaryService.remove(id)`

### 6.2 store 연동(권장)
- store 액션은 서비스 레이어를 호출한다.
  - mock/api 전환을 store가 몰라도 되도록 구성한다.
- 화면(Pages)은 store의 상태/액션만 사용한다.

### 6.3 API 연동 시 주의
- 월 필터는 **서버 조회**가 기본이다.  
  (mock 단계에서는 util.getMonthRangeByDate로 필터)
- 정렬은 서버에서 처리하며, UI는 sort 값을 전달한다.

---

## 7. 비기능 요구사항 (Non-Functional)

- 200개 리스트까지 자연스러운 렌더링(React.memo 유지)
- 불필요한 리렌더링 방지(선택적 구독, memo, callback)
- 로딩/에러 상태 표시(최소 1곳 이상: Home 목록 영역)

---

## 8. 테스트 요구사항 (E2E 시나리오 기준)

1) 작성 → 목록 확인  
2) 상세 조회  
3) 수정 → 반영 확인  
4) 삭제 → 목록 제거 확인

> **실행 모드**  
> - 1차: mock 모드로 E2E 통과  
> - 2차: api 모드로 E2E 통과

---

## 9. 디자인 스타일 가이드 (고정)

### 9.1 테마
- 레트로 노트북 스타일
- 따뜻한 색감 중심

### 9.2 컬러 팔레트(고정)

| 용도 | 색상 코드 |
|---|---|
| 텍스트 | `#4a3728` |
| 테두리 | `#8b7355` |
| 배경(밝은) | `#fdf8e8` |
| 배경(어두운) | `#d4c4a8` |
| 긍정 버튼 | `#7cb87c` |
| 부정 버튼 | `#b85c5c` |

### 9.3 특수 효과(구현 힌트)
- 스프링 바인딩: `#root::before`로 왼쪽 바인딩 효과
- 테이프 장식: Header/카드에 `::before`, `::after` 활용
- 노트 줄무늬: `textarea`에 `repeating-linear-gradient`로 줄 효과

### 9.4 폰트
- Gmarket Sans를 `@font-face`로 로드
- Light(300), Medium(500), Bold(700) 구성

---

## 10. 오픈 이슈(결정 필요)

- [ ] `id` 전략: number 유지 vs UUID 전환
- [ ] Edit 저장 후 이동: 상세로 이동(권장) vs 홈 이동
- [ ] 삭제 confirm: 브라우저 confirm vs 커스텀 모달
- [ ] API 실패 시 UX: 재시도 버튼 제공 여부

---

## 11. 부록 — 감정 정의(고정)

| emotionId | 라벨(예시) |
|---:|---|
| 1 | 완전 좋음 |
| 2 | 좋음 |
| 3 | 보통 |
| 4 | 나쁨 |
| 5 | 끔찍함 |