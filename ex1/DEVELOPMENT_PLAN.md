# NFT Jewelry Marketplace — 개발 플랜

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Flawless — Global NFT Jewelry Market |
| 디자인 출처 | Figma (node-id: 74-1058) |
| 라우터 경로 | `/` |
| 페이지 크기 | 1440px (desktop 기준) |

---

## 2. 기술 스택

| 분류 | 선택 | 버전 |
|------|------|------|
| 번들러 | Vite | ^6.3.5 |
| UI 프레임워크 | React | ^19.0.0 |
| 언어 | TypeScript | ~5.7.2 |
| 라우터 | React Router DOM | ^7.6.1 |
| CSS | styled-components | ^6.1.18 |
| 폰트 | Playfair Display, Public Sans | Google Fonts |

---

## 3. 프로젝트 구조

```
ex1/
├── index.html                  # 폰트 로드 (Google Fonts)
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── images/                 # Figma에서 추출한 이미지 (17장)
│       ├── hero-jewelry.png
│       ├── hero-avatar.png
│       ├── banner-bg.png
│       ├── auction-card1.png
│       ├── auction-card2.png
│       ├── auction-avatar1.png
│       ├── auction-avatar2.png
│       ├── trending1~4.png
│       ├── collector1~5.png
│       └── upcoming1.png
└── src/
    ├── main.tsx                # 앱 진입점 (BrowserRouter)
    ├── App.tsx                 # 라우팅 + GlobalStyle
    ├── pages/
    │   └── HomePage.tsx        # "/" 라우트 — 레이아웃 조합
    └── components/
        ├── Header.tsx          # 공통 헤더
        ├── Footer.tsx          # 공통 푸터
        ├── HeroSection.tsx     # 히어로 섹션
        ├── BannerSection.tsx   # 풀블리드 배너
        ├── LiveAuctionSection.tsx  # 라이브 옥션 탭 + 카드
        ├── TrendingCollections.tsx # 트렌딩 컬렉션
        ├── TopCollectors.tsx       # 탑 컬렉터
        └── UpcomingAuction.tsx     # 업커밍 옥션 카드 슬라이더
```

---

## 4. 페이지 레이아웃 구조

```
PageWrapper (flex column, overflow-x: hidden)
│
├── Header (sticky, z-index: 100)
│
├── MainContent (flex column, align-items: center, gap: 100px, padding-top: 40px)
│   ├── ContentContainer (width: 981px)
│   │   └── HeroSection
│   │
│   ├── BannerSection (100vw 풀블리드, height: 226px)
│   │
│   └── MainGrid (width: 981px, flex row, space-between)
│       ├── LiveAuctionSection  (width: 580px)
│       └── RightColumn (flex column, gap: 60px)
│           ├── TrendingCollections
│           ├── TopCollectors
│           └── UpcomingAuction
│
└── Footer
```

---

## 5. 컴포넌트 설계

### 5-1. Header
- **역할**: 전체 페이지 공통 상단 네비게이션
- **구성**: 로고 + 검색바 / 메뉴 링크 + CTA 버튼
- **특이사항**: `position: sticky; top: 0; z-index: 100`

| 요소 | 스펙 |
|------|------|
| 로고 "Flawless" | Playfair Display Bold Italic 24px |
| 검색바 | bg #f3f4f6, radius 71px, placeholder "Search" |
| 메뉴 | Discover / Collection — Public Sans 16px |
| 버튼 | "Connect wallet" — bg #111827, text #f9fafb, radius 8px |

---

### 5-2. HeroSection
- **역할**: 랜딩 첫 화면, 브랜드 메시지 + 대표 NFT 이미지
- **구성**: 좌측 텍스트 컬럼 / 우측 이미지 + 오버레이 카드
- **핵심 포인트**: 오버레이 카드는 `HeroImageWrapper`(overflow:hidden) 바깥에 배치해야 클리핑 방지

```
HeroRight (position: relative, 380×448px)
├── FeaturedLabel (absolute, top:0)
├── HeroImageWrapper (absolute, bottom:0, 380×380px, overflow:hidden)
│   └── HeroImage
└── OverlayCard (absolute, bottom:12px) ← 이미지 바깥에 위치
```

---

### 5-3. BannerSection
- **역할**: 풀블리드 프로모션 배너 (Historical Diamonds NFTs)
- **구성**: 검정 배경 + 우측 이미지 + 양쪽 그라디언트 페이드 + 좌측 텍스트/통계
- **핵심 포인트**: `width: 100vw; margin-left: calc(-50vw + 50%)` 로 풀블리드 구현
  - 부모에 `overflow-x: hidden` 이 있으면 이 기법이 동작하지 않으므로 `PageWrapper`에 설정

---

### 5-4. LiveAuctionSection
- **역할**: 라이브 옥션 / Buy Now 탭 전환 + 경매 카드 목록
- **상태**: `activeTab: 'live' | 'buy'`
- **구성**: 탭 헤더 + 카드 리스트 (카드 제목은 카드 바깥)

| 요소 | 스펙 |
|------|------|
| 탭 폰트 | Playfair Display Bold 24px |
| 활성 탭 색 | #111827 + border-bottom #111827 |
| 비활성 탭 색 | #6b7280 + border-bottom #e5e7eb |
| Live 도트 | width/height 8px, bg #ef4444 |
| 카드 크기 | 580×673px, border #e5e7eb, radius 16px |
| 이미지 크기 | 580×559px |
| 시간 뱃지 | bg rgba(0,0,0,0.4), backdrop-blur 4px |
| Place a bid | bg #004ffd, width calc(100% - 32px) |

---

### 5-5. TrendingCollections
- **역할**: 트렌딩 컬렉션 순위 리스트
- **상태**: `activeTime: '1d' | '7d' | '30d'` (기본값: '1d')
- **구성**: 시간 필터 탭 + 4개 컬렉션 행

| 요소 | 스펙 |
|------|------|
| 탭 컨테이너 | bg #f3f4f6, radius 12px, padding 4px, width 320px (box-sizing: border-box) |
| 썸네일 | 48×48px, radius 8px |
| 컬렉션명 | Public Sans Bold 14px, #111827 |
| 바닥가격 | Public Sans Regular 12px, #6b7280 |
| 거래량 ETH | Public Sans Bold 14px, #111827 (우측 정렬) |

---

### 5-6. TopCollectors
- **역할**: 탑 컬렉터 순위 리스트
- **상태**: `activeTime: '1d' | '7d' | '30d'` (기본값: '7d')
- **구성**: 시간 필터 탭 + 5개 컬렉터 행

| 요소 | 스펙 |
|------|------|
| 아바타 | 42×42px, 원형 |
| 순위 번호 | Public Sans Bold 16px |
| 지갑 주소 | Public Sans Regular 12px, #6b7280 |

---

### 5-7. UpcomingAuction
- **역할**: 예정 경매 카드 가로 스크롤
- **구성**: 3개 카드 + 우측 페이드 오버레이 + 네비게이션 화살표

```
CardsOuter (position: relative — NavButton/FadeOverlay 기준점)
├── CardsWrapper (overflow: hidden — 스크롤 클리핑)
│   └── CardScroll (flex row, gap: 8px)
│       └── Card × 3
├── FadeOverlay (absolute, 우측 그라디언트)
└── NavButton (absolute, 우측 화살표 — 그림자 클리핑 방지)
```

| 요소 | 스펙 |
|------|------|
| 카드 크기 | 240×(이미지240+텍스트)px, radius 12px |
| 타이머 뱃지 | "2D  1H  30M Left", bg rgba(0,0,0,0.4) |
| Remind me | bg #004ffd, 벨 아이콘 포함 |

---

### 5-8. Footer
- **역할**: 전체 페이지 공통 하단
- **구성**: 브랜드 소개 / 마켓플레이스·계정·회사 링크 컬럼 / 저작권
- **특이사항**: Figma 원본에는 없으나 실제 서비스 요건 충족을 위해 추가

---

## 6. 디자인 토큰

### 색상

| 토큰 | 값 | 사용처 |
|------|----|--------|
| Gray/G900 | `#111827` | 주요 텍스트, 버튼 bg |
| Gray/G600 | `#4b5563` | 히어로 서브타이틀 |
| Gray/G500 | `#6b7280` | 보조 텍스트, 비활성 탭 |
| Gray/G400 | `#9ca3af` | 플레이스홀더 |
| Gray/G200 | `#e5e7eb` | 카드 보더, 비활성 탭 언더라인 |
| Gray/G100 | `#f3f4f6` | 검색바 bg, 탭 컨테이너 bg |
| Gray/G50  | `#f9fafb` | 버튼 텍스트, 배너 텍스트 |
| Blue/B500 | `#004ffd` | Place a bid, Remind me 버튼 |
| Black     | `#000000` | 로고, 배너 bg |
| Red       | `#ef4444` | Live 상태 도트 |

### 타이포그래피

| 스타일 | 폰트 | 굵기 | 크기 |
|--------|------|------|------|
| 로고 | Playfair Display | Bold Italic | 24px |
| 히어로 타이틀 | Playfair Display | Bold | 48px |
| 섹션 타이틀 | Playfair Display | Bold | 24px |
| 히어로 서브타이틀 | Public Sans | Regular | 20px |
| 네비 메뉴 | Public Sans | Regular | 16px |
| 카드 제목 | Public Sans | Regular | 20px |
| 버튼 | Public Sans | Regular | 14~16px |
| 보조 정보 | Public Sans | Regular | 12px |

---

## 7. 이미지 출처

Figma MCP를 통해 Figma 파일(RLK98dy6dqFOEe22XaNEOl)에서 직접 추출.

| 파일명 | 위치 | 해상도 |
|--------|------|--------|
| hero-jewelry.png | 히어로 메인 이미지 | 4000×4000 |
| banner-bg.png | 배너 배경 | 1084×474 |
| auction-card1.png | 경매 카드 1 | 3768×3768 |
| auction-card2.png | 경매 카드 2 | 2868×1912 |
| trending1~4.png | 트렌딩 썸네일 | 다양 |
| collector1~5.png | 컬렉터 아바타 | 300×300 |
| upcoming1.png | 예정 경매 카드 | 4096×2731 |

---

## 8. 주요 구현 결정사항

### 풀블리드 배너
`BannerSection`은 981px 컨테이너 안에 있지만 전체 뷰포트 너비를 채워야 합니다.
```css
width: 100vw;
margin-left: calc(-50vw + 50%);
```
이 기법이 동작하려면 상위 요소에 `overflow-x: hidden`이 없어야 하므로 `PageWrapper`에만 적용.

### 히어로 오버레이 카드 클리핑 방지
이미지 위에 반투명 카드를 겹치되, 이미지 컨테이너(`overflow: hidden`) 바깥에 배치해야 합니다.
`HeroRight`(`position: relative`)를 기준점으로 `OverlayCard`를 `absolute` 배치.

### Upcoming 네비게이션 버튼 그림자 클리핑 방지
스크롤 컨테이너(`overflow: hidden`)와 플로팅 버튼을 분리하기 위해
`CardsOuter`(기준 래퍼) → `CardsWrapper`(overflow 클리핑) 2단 구조 사용.

---

## 9. 로컬 실행

```bash
npm install
npm run dev
# → http://localhost:5173
```

### 빌드
```bash
npm run build
npm run preview
```

### 타입 검사
```bash
npx tsc --noEmit
```
