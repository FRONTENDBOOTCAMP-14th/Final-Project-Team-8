# 🐾 프로젝트 컨벤션

## 📂 파일 & 폴더 구조

```bash
/src
/app # Next.js 13 이상 App Router 구조
/components # 공통 UI 컴포넌트
/utils # 기능 단위 모듈 (health, life, schedule 등)
/hooks # 커스텀 훅
/lib # API, 유틸 함수
/styles # 전역 스타일, 테마
/types # 공용 타입 정의 (ex. Pet, Schedule)
/assets # 이미지, 아이콘 등 정적 파일
```

- **폴더명**: kebab-case → `health-record`, `life-log`
- **컴포넌트 파일명**: PascalCase → `PetCard.tsx`, `CalendarView.tsx`
- **유틸 함수/훅 파일명**: camelCase → `usePetRecord.ts`, `fetchData.ts`

---

## 🌱 Git 컨벤션

### 브랜치 네이밍

- `feature/기능명` → `feature/health-record-ui`
- `fix/버그설명` → `fix/date-picker-bug`
- `refactor/대상` → `refactor/schedule-component`

### 커밋 메시지

```bash
[type] 설명
```

- type: feat, fix, refactor, docs, style, test, chore, perf
- 예시:
  - `[feat] 건강 기록 추가 API 연동`
  - `[refactor] ScheduleList 컴포넌트 구조 개선`

### Issue 작성 규칙

- **Title**

  ```bash
  [type] 간단한 설명
  ```

- type: feat, fix, refactor, docs, style, test, chore, perf
- 설명: 작업 대상/의도를 짧고 명확히 작성
- 예시:
  - `[feat] 건강 기록 UI 컴포넌트 추가`
  - `[fix] DatePicker 선택 오류 수정`
  - `[refactor] ScheduleList 상태 관리 개선`

**Description**

```bash
## 📌 목적

이슈의 목적을 간단히 설명

## 🛠️ 작업 내용

- [ ] 할 일 1
- [ ] 할 일 2
- [ ] 할 일 3

## ✅ 참고 사항

관련된 문서, 디자인 링크, 추가 맥락 등
```

## 📝 HTML / JSX 컨벤션

- Next.js App Router 기준 → `page.tsx`, `layout.tsx` 구조 준수
- JSX 규칙:
  - 컴포넌트명: PascalCase
  - props: camelCase (`petName`, `onSubmit`)
  - self-closing 가능 시 self-closing `<Image />`
- TSX 규칙:
  - 타입 정의:
    - 컴포넌트 props는 `interface` 또는 `type`으로 명확히 선언
    - 공용 타입은 `types/` 디렉토리에 관리
  - `useState` 등 훅에 타입 명시 (상태 값 타입 지정)
  - 상태/이벤트 타입: React 제네릭 타입 적극 활용
- Next.js 컴포넌트 적극 활용:
  - 이미지: `<Image />`
  - 링크: `<Link />`
  - 헤더: `<Head />`

---

## 🎨 CSS / 스타일링 컨벤션

- **스타일링 방식**
  - Tailwind CSS 우선 → 필요 시 `module.css` / `styled-components` 보조
- **네이밍**
  - 전역 class: kebab-case (`.schedule-card`)
- **Theme 관리**
  - `tailwind.config.js` 또는 `:root { --primary: ... }`
- **CSS 작성 순서**
  1. **Layout**
     - `display` → block, inline, flex, grid 등
     - `position` → static, relative, absolute, fixed, sticky
     - `top`, `right`, `bottom`, `left` → position 속성과 함께 사용
     - `flex` → flex-direction, justify-content, align-items, gap
     - `grid` → grid-template-columns, grid-template-rows, grid-gap
     - `z-index` → 쌓임 순서
  2. **Box Mode**
     - `width`, `height` → 콘텐츠 영역 크기
     - `padding` → 콘텐츠와 테두리(border) 사이 공간
     - `border` → 테두리 두께와 스타일
     - `margin` → 요소 바깥 공간, 다른 요소와의 거리
  3. **Typography**
     - `font-family` → 글꼴 종류
     - `font-size` → 글자 크기
     - `font-weight` → 글자 굵기
     - `line-height` → 줄 간격
     - `letter-spacing` → 글자 간격
     - `text-align` → 글자 정렬 (left, center, right, justify)
     - `text-decoration` → 밑줄, 취소선 등
     - `text-transform` → 대문자/소문자 변환
  4. **Visual (color, shadow 등)**
     - `color` → 글자 색
     - `background`, `background-color` → 배경
     - `box-shadow` → 그림자 효과
     - `border-radius` → 모서리 둥글기
     - `opacity` → 투명도
     - `transition` → 변화 애니메이션
     - `filter` → blur, brightness 등 시각 효과

---

## ⚡ TypeScript / React 컨벤션

- **타입 정의**
  - `interface`: 객체 구조 정의 (우선)
  - `type`: 유니온, 함수 시그니처

  ```ts
  interface Pet {
    id: string
    name: string
    weight: number
  }

  type PetType = {
    id: string
    name: string
    weight: number
  }
  ```

- **컴포넌트 타입**

  ```ts
  interface PetCardProps {
    pet: Pet
  }

  export default function PetCard({ pet }: PetCardProps) {
    // ...
  }
  ```

- **상태 관리**
  - 기본: React Hooks (useState, useReducer, useContext)

  - 전역 상태 필요 시: Redux (팀 합의 후)

- **훅 네이밍**
  - use 접두어 필수 (useHealthRecord, useSchedule)

- **비동기 처리**
  - async/await 우선 사용

  - API 호출 → /lib/api 모듈화

- **불변성 유지**
  - 스프레드 연산자(...) 적극 활용

## ✔️ 코딩 스타일

- **문자열**: 작은따옴표 '...'

- **들여쓰기**: 스페이스 2칸

- **ESLint + Prettier 설정** :

  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all"
  }
  ```

- **import 순서**
  1. React/Next 기본 모듈

  2. 서드파티 라이브러리

  3. 내부 경로 (features, components, lib 등)

[돌아가기](/README.md)
