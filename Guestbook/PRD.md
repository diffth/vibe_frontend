# [PRD] 우리반 커뮤니티 방명록 서비스 (Guestbook)

## 1. 프로젝트 개요 (Overview)
* **목적:** 수강생들이 공통 API 서버를 활용해 "우리반 커뮤니티 방명록"을 구현하고, 서로의 글을 확인하며 인터랙션을 주고받는 실습형 토이 프로젝트
* **핵심 가치:** 
  * **CRUD의 이해:** 글 등록, 조회, 수정, 삭제의 기본 데이터 흐름 습득
  * **상태 관리와 정렬:** 좋아요 기능 구현 및 정렬 조건(최신순/좋아요순)에 따른 피드 렌더링
  * **공유 및 테스트:** 하나의 백엔드 서버를 공유하여 실제 유저(동료 수강생) 간의 데이터 연동 경험
* **타겟 유저:** 우리반 수강생 전체

---

## 2. 핵심 기능 요구사항 (Functional Requirements)

### 2.1. 글 목록 조회
* **[사용자 행동] 사용자가 방명록 메인 페이지에 진입할 때**
  * 사용자는 페이지에 진입하는 즉시 자동으로 서버로부터 전체 방명록 목록 데이터를 호출(Fetch)하여 화면에 피드 리스트 형태로 조회합니다.
  * 사용자는 각 방명록 카드 내에서 `작성자(이름)`, `내용(본문)`, `등록 및 수정 일시`, `누적 좋아요 수`를 시각적으로 명확하게 확인합니다.
  * 사용자는 화면에 제공되는 '새로고침' 버튼을 클릭하거나 주기적인 폴링을 통해, 다른 수강생이 실시간으로 등록한 새로운 글 목록을 화면에 동기화하여 확인합니다.

### 2.2. 글 작성
* **[사용자 행동] 사용자가 새로운 방명록 글을 작성하여 등록할 때**
  * 사용자는 작성 폼의 `작성자(author)` 입력란과 `내용(content)` 입력란에 텍스트를 입력한 후 '등록' 버튼을 클릭하여 새로운 방명록 글을 데이터베이스에 등록합니다.
  * **입력 유효성 검증(Validation):**
    * 작성자 이름과 내용은 반드시 1자 이상의 문자(공백 제외)가 입력되어야 하며, 유효하지 않을 시 등록 처리를 제한합니다.
    * 글자 수 제한 규칙(작성자: 최대 10자, 내용: 최대 200자)을 설정하여, 제한 초과 시 입력을 차단하거나 사용자 경고를 노출합니다.
  * 사용자가 성공적으로 글을 등록하면, 입력 폼의 텍스트 필드는 모두 비워지고(초기화) 화면 피드가 최신 순으로 정렬되어 사용자가 방금 작성한 글이 화면 최상단에 즉시 표시됩니다.

### 2.3. 글 수정 & 삭제
* **[사용자 행동] 사용자가 자신이 등록한 글의 내용을 수정하거나 삭제할 때**
  * **글 수정:** 사용자가 개별 카드의 '수정' 버튼을 누르면 해당 카드가 편집 가능 상태(인라인 입력창 혹은 수정 모달)로 전환되며, 본문 내용을 수정한 뒤 '저장' 버튼을 클릭하면 서버에 변경 사항이 업데이트되고 글의 수정 일시(`updatedAt`)가 최신화됩니다.
  * **글 삭제:** 사용자가 개별 카드의 '삭제' 버튼을 누르면 브라우저 기본 컨펌 창 또는 디자인 모달을 통해 "정말 삭제하시겠습니까?"라는 재확인 절차를 거치며, 최종 승인 시 서버에 영구 삭제 처리를 요청하고 피드 목록에서 해당 카드를 완전히 제거합니다.

### 2.4. 좋아요 기능
* **[사용자 행동] 사용자가 마음에 드는 다른 수강생의 글에 긍정적인 반응을 보낼 때**
  * 사용자가 방명록 카드의 '좋아요(❤️)' 버튼을 클릭하면, 해당 글의 좋아요 카운트(`likes`)가 즉시 1 증가하며 서버에 저장됩니다.
  * 반영된 좋아요 수치가 화면에 실시간으로 다시 그려져(리렌더링), 사용자가 보낸 리액션의 결과를 즉각적으로 확인할 수 있습니다.

### 2.5. 피드 데이터 정렬
* **[사용자 행동] 사용자가 방명록 글 목록의 배치 순서를 변경할 때**
  * 사용자는 화면 상단에 배치된 정렬 필터를 조작하여 목록의 정렬 방식을 아래 두 가지 기준으로 전환할 수 있습니다.
    * **최신순 (기본값):** 글이 등록된 시간(`createdAt` 또는 `id` 역순)을 기준으로 가장 최근에 작성된 방명록이 최상단에 배치됩니다.
    * **좋아요순:** 누적 좋아요(`likes`) 개수가 많은 방명록이 최상단에 배치됩니다. (좋아요 수가 동일한 글들 사이에서는 최신순으로 2차 정렬을 적용합니다.)

---

## 3. 사용자 흐름 및 예외 케이스 (User Flow & Exception Cases)

사용자가 서비스를 이용하는 과정에서 발생할 수 있는 특수한 상황 및 에러 케이스에 대한 대응 시나리오입니다.

### 3.1. [예외 케이스 1] API 서버 통신 장애 및 네트워크 에러 발생
* **상황:** 사용자가 글 등록, 수정, 삭제 요청을 보내거나 좋아요를 누르는 순간에 API 서버가 응답하지 않거나 네트워크 연결이 유실된 경우.
* **대응 방안:**
  1. API 통신 중에는 등록/수정/삭제/좋아요 버튼을 비활성화(Disabled)하여 중복 요청을 방지하고 로딩 표시(Spinner)를 제공합니다.
  2. 요청 실패 시, 화면에 "네트워크 연결이 불안정합니다. 잠시 후 다시 시도해 주세요."라는 토스트 알림(Toast Notification) 또는 시스템 얼럿을 띄웁니다.
  3. 특히 글 작성/수정 중 실패한 경우, 작성자가 입력 중이던 입력 필드의 텍스트 내용을 초기화하지 않고 그대로 유지하여 사용자가 작성한 내용이 유실되지 않도록 보존합니다.

### 3.2. [예외 케이스 2] 다른 사용자에 의해 이미 삭제된 글을 조작하는 경우 (동시성 오류)
* **상황:** 사용자가 메인 페이지를 켜놓은 사이에 다른 사용자가 특정 글을 삭제했으나, 현재 사용자의 화면에는 아직 그 글 카드가 남아있어 이를 수정, 삭제 또는 좋아요 클릭하려 시도하는 경우.
* **대응 방안:**
  1. API 서버로부터 404 (Not Found) 에러 응답을 수신하는 즉시 화면에 "이미 삭제된 글이거나 존재하지 않는 게시글입니다."라는 에러 안내 메시지를 노출합니다.
  2. 사용자가 확인 버튼을 누르면 전체 방명록 피드를 자동으로 새로고침(Re-fetch)하여 화면에서 사라진 게시글을 제거하고 최신 피드 리스트 상태로 동기화합니다.

---

## 4. 데이터 모델 (Data Model)

서버와 클라이언트가 주고받을 방명록 객체의 표준 스펙입니다.

```json
{
  "id": 1,
  "author": "홍길동",
  "content": "오늘 너무 반가웠습니다.",
  "likes": 3,
  "createdAt": "2026-03-02T12:34:56Z",
  "updatedAt": "2026-03-02T12:50:00Z"
}
```

---

## 5. API 명세서 (API Specification)

**Base URL**: `https://guestbook-api.codro.it`
**Content-Type**: `application/json; charset=utf-8`

### 5.1. 공통 사항

#### 정렬 파라미터

| **값** | **설명** |
| --- | --- |
| `latest` (기본) | 최신순 (`createdAt DESC`) |
| `likes` | 좋아요순 (`likes DESC`, `createdAt DESC`) |

#### 시간 형식
ISO-8601 문자열 (예: `2026-03-02T13:00:00`)

---

### 5.2. 엔드포인트

#### 1. 글 목록 조회
* **Endpoint:** `GET /api/posts`
* **Query Parameters:**
  | **파라미터** | **타입** | **필수** | **기본값** | **설명** |
  | --- | --- | --- | --- | --- |
  | `sort` | string | X | `latest` | `latest` \| `likes` |
  | `q` | string | X | - | 작성자/내용 검색어 |
* **Response 200:**
  ```json
  [
    {
      "id": 1,
      "author": "홍길동",
      "content": "안녕하세요!",
      "likes": 2,
      "createdAt": "2026-03-02T10:00:00",
      "updatedAt": "2026-03-02T10:00:00"
    }
  ]
  ```
* **curl 예시:**
  ```bash
  # 전체 조회 (최신순)
  curl https://guestbook-api.codro.it/api/posts
  
  # 좋아요순 정렬
  curl https://guestbook-api.codro.it/api/posts?sort=likes
  
  # 검색
  curl "https://guestbook-api.codro.it/api/posts?q=홍길동"
  ```

#### 2. 글 작성
* **Endpoint:** `POST /api/posts`
* **Request Body:**
  | **필드** | **타입** | **필수** | **조건** | **설명** |
  | --- | --- | --- | --- | --- |
  | `author` | string | O | trim 후 1~20자 | 작성자 닉네임 |
  | `content` | string | O | trim 후 1~200자 | 내용 |
  ```json
  {
    "author": "홍길동",
    "content": "오늘 수업 재밌어요!"
  }
  ```
* **Response 201:**
  ```json
  {
    "id": 15,
    "author": "홍길동",
    "content": "오늘 수업 재밌어요!",
    "likes": 0,
    "createdAt": "2026-03-02T13:00:00",
    "updatedAt": "2026-03-02T13:00:00"
  }
  ```
* **curl 예시:**
  ```bash
  curl -X POST https://guestbook-api.codro.it/api/posts \
    -H "Content-Type: application/json" \
    -d '{"author":"홍길동","content":"오늘 수업 재밌어요!"}'
  ```

#### 3. 글 수정
* **Endpoint:** `PUT /api/posts/{id}`
* **Path Parameters:**
  | **파라미터** | **타입** | **설명** |
  | --- | --- | --- |
  | `id` | number | 글 ID |
* **Request Body:**
  | **필드** | **타입** | **필수** | **조건** | **설명** |
  | --- | --- | --- | --- | --- |
  | `author` | string | O | trim 후 1~20자 | 작성자 닉네임 |
  | `content` | string | O | trim 후 1~200자 | 내용 |
  ```json
  {
    "author": "홍길동",
    "content": "내용 수정했습니다."
  }
  ```
* **Response 200:** 수정된 글 반환 (형식은 글 작성 응답과 동일)
* **curl 예시:**
  ```bash
  curl -X PUT https://guestbook-api.codro.it/api/posts/1 \
    -H "Content-Type: application/json" \
    -d '{"author":"홍길동","content":"내용 수정했습니다."}'
  ```

#### 4. 글 삭제
* **Endpoint:** `DELETE /api/posts/{id}`
* **Path Parameters:**
  | **파라미터** | **타입** | **설명** |
  | --- | --- | --- |
  | `id` | number | 글 ID |
* **Response 204:** No Content (응답 본문 없음)
* **curl 예시:**
  ```bash
  curl -X DELETE https://guestbook-api.codro.it/api/posts/1
  ```

#### 5. 좋아요
* **Endpoint:** `POST /api/posts/{id}/like`
* **Path Parameters:**
  | **파라미터** | **타입** | **설명** |
  | --- | --- | --- |
  | `id` | number | 글 ID |
* **Response 200:**
  ```json
  {
    "id": 15,
    "likes": 4
  }
  ```
* **curl 예시:**
  ```bash
  curl -X POST https://guestbook-api.codro.it/api/posts/15/like
  ```

---

### 5.3. 에러 응답

모든 4xx/5xx 에러는 동일한 포맷으로 반환됩니다.

```json
{
  "timestamp": "2026-03-02T13:10:00",
  "status": 400,
  "error": "Bad Request",
  "message": "content는 1~200자여야 합니다.",
  "path": "/api/posts"
}
```

#### 에러 코드

| **상태** | **설명** | **발생 조건** |
| --- | --- | --- |
| 400 | Bad Request | author/content 유효성 실패, sort 값 오류 |
| 404 | Not Found | 존재하지 않는 id로 조회/수정/삭제/좋아요 |
| 500 | Internal Server Error | 서버 내부 오류 |

#### 에러 예시

* **유효성 실패 (400):**
  ```bash
  curl -X POST https://guestbook-api.codro.it/api/posts \
    -H "Content-Type: application/json" \
    -d '{"author":"","content":"내용"}'
  ```
  ```json
  {
    "timestamp": "2026-03-02T13:10:00",
    "status": 400,
    "error": "Bad Request",
    "message": "author는 필수입니다.",
    "path": "/api/posts"
  }
  ```

* **존재하지 않는 글 (404):**
  ```bash
  curl https://guestbook-api.codro.it/api/posts/999
  ```
  ```json
  {
    "timestamp": "2026-03-02T13:10:00",
    "status": 404,
    "error": "Not Found",
    "message": "게시글을 찾을 수 없습니다. (id: 999)",
    "path": "/api/posts/999"
  }
  ```

---

### 5.4. JavaScript fetch 예시

* **글 목록 조회:**
  ```javascript
  const res = await fetch('https://guestbook-api.codro.it/api/posts?sort=latest');
  const posts = await res.json();
  ```

* **글 작성:**
  ```javascript
  const res = await fetch('https://guestbook-api.codro.it/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author: '홍길동', content: '안녕하세요!' })
  });
  const newPost = await res.json();
  ```

* **글 수정:**
  ```javascript
  const res = await fetch('https://guestbook-api.codro.it/api/posts/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author: '홍길동', content: '수정합니다.' })
  });
  const updated = await res.json();
  ```

* **글 삭제:**
  ```javascript
  await fetch('https://guestbook-api.codro.it/api/posts/1', { method: 'DELETE' });
  ```

* **좋아요:**
  ```javascript
  const res = await fetch('https://guestbook-api.codro.it/api/posts/1/like', {
    method: 'POST'
  });
  const { id, likes } = await res.json();
  ```

---

## 6. 화면별 필수 UI 요소 (Required UI Elements)

각 레이아웃 및 뷰 단위에서 반드시 포함되어야 하는 핵심 컴포넌트와 그 역할입니다.

### 6.1. 메인 방명록 피드 화면 (Main Feed View)
1. **방명록 신규 작성 폼 (Form Zone):** 수강생이 자신의 이름을 입력하는 한 줄 입력창(Input), 글 내용을 작성하는 여러 줄 입력창(Textarea), 서버로 전송하는 '등록' 버튼으로 구성됩니다.
2. **피드 정렬 필터 컨트롤러 (Filter Bar):** '최신순'과 '좋아요순' 두 가지 보기 옵션을 토글할 수 있는 스위치 형태의 버튼 또는 드롭다운 선택 메뉴입니다.
3. **전체 글 개수 인디케이터 (Counter):** 현재 데이터베이스에 등록된 전체 방명록 개수(예: "총 42개의 따뜻한 한마디가 남아있어요")를 실시간으로 노출하는 텍스트 영역입니다.

### 6.2. 방명록 개별 카드 컴포넌트 (Guestbook Card Component)
1. **글 메타 정보 영역 (Header Area):** 작성자의 이름(author)과 함께 글이 최종적으로 작성되거나 수정된 일시(포맷팅된 날짜/시간)를 표시하는 영역입니다.
2. **수정/삭제 관리 버튼 (Action Buttons):** 해당 카드를 편집하기 위한 '수정' 아이콘/링크 버튼과 삭제를 실행하기 위한 '삭제' 아이콘/링크 버튼입니다.
3. **좋아요 피드백 영역 (Interaction Button):** 하트(❤️) 모양의 좋아요 버튼과 현재 이 글이 받은 좋아요 누적 횟수를 표시하는 텍스트 영역입니다.

### 6.3. 글 수정 편집 화면/모달 (Edit View / Modal)
1. **기존 본문 데이터가 연동된 입력창 (Prefilled Textarea):** 사용자가 기존에 작성했던 글의 본문 내용이 채워진 채로 열려 즉시 수정할 수 있는 입력 창입니다.
2. **저장 및 취소 제어 버튼 (Submit/Cancel Buttons):** 수정된 텍스트를 서버에 전송하는 '저장(완료)' 버튼과 수정 동작을 중단하고 이전 상태로 돌아가는 '취소' 버튼입니다.
3. **실시간 글자 수 카운터 (Character Limit Indicator):** 현재 입력한 글자 수와 최대 허용 글자 수를 대비하여 보여주는 텍스트(예: "154 / 200자")입니다.

---

## 7. 최종 테스트 및 배포 시나리오

1. **로컬 개발 및 검증:** 각자 클라이언트(프론트엔드) 코드를 작성하고 공통 API 주소를 연결하여 등록/조회/수정/삭제(CRUD) 기능이 정상 작동하는지 확인합니다.
2. **우리반 합동 테스트 (Peer Review):**
  * 모두가 동시에 접속하여 "안녕하세요 [이름]입니다!" 형태로 글을 등록합니다.
  * 서로의 글에 좋아요를 누르며 **'좋아요순 정렬'**이 실시간으로 동적 작동하는지 확인합니다.
  * 수정/삭제 시 타인의 화면에서도 데이터가 올바르게 갱신(또는 새로고침 후 반영)되는지 크로스 체크합니다.