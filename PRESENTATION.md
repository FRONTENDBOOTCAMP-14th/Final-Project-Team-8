---
marp: true
theme: default
paginate: true
backgroundColor: #fff
style: |
  section {
    font-family: 'Noto Sans KR', sans-serif;
  }
  h1 {
    color: #2563eb;
  }
  h2 {
    color: #1e40af;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  .columns-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
---

<!-- _class: lead -->
<!-- _paginate: false -->

# 🐾 PAW BUDDY

## 반려동물 관리 웹 애플리케이션

**Team 8**
김동규 | 장효정 | 정지은 | 우혜리

---

## 📋 목차

1. 프로젝트 소개
2. 프로젝트 배경 및 목표
3. 기술 스택
4. 주요 기능
5. 기술적 구현
6. 개발 과정의 도전과 해결
7. 향후 개선 계획
8. Q&A

---

<!-- _class: lead -->

# 1. 프로젝트 소개

---

## PAW BUDDY란?

<div class="columns">

<div>

### 🎯 프로젝트 개요

- **주제**: 반려동물 종합 관리 웹 서비스
- **목표**: 건강, 식단, 활동, 일정을 한 곳에서 체계적으로 관리

### 📱 핵심 가치

- **All-in-One 통합 관리**
- **직관적인 사용자 경험**
- **데이터 기반 기록 관리**

</div>

<div>

### ✨ 주요 기능

- ✅ 반려동물 프로필 관리
- 💉 건강 기록 (예방접종, 구충제, 의료)
- 📅 통합 캘린더 & 일정 관리
- 🍖 식단 관리 & 알림
- 🐕 활동 기록 (산책, 기타 활동)

</div>

</div>

---

<!-- _class: lead -->

# 2. 프로젝트 배경 및 목표

---

## 왜 PAW BUDDY를 만들었나?

### 📈 현황

- 1인 가구 증가와 함께 **반려동물 양육 가구 급증**
- 체계적인 관리 필요성 증가

### 😰 보호자들의 어려움

<div class="columns">

<div>

**문제점 1: 일정 관리**
- 예방접종 일정을 놓침
- 구충제 복용일을 잊어버림

**문제점 2: 정보 분산**
- 여러 앱에서 따로 관리
- 의료 기록이 흩어져 있음

</div>

<div>

**문제점 3: 기록의 어려움**
- 수기로 메모하다 분실
- 과거 기록 찾기 어려움

**문제점 4: 알림 부재**
- 중요한 일정 놓침
- 식사 시간을 잊어버림

</div>

</div>

---

## 우리의 솔루션

<div class="columns-3">

<div>

### 🎯 All-in-One 통합

**건강 + 식단 + 활동 + 일정**을 하나의 플랫폼에서

→ 여러 앱을 오갈 필요 없음

</div>

<div>

### 💡 직관적인 UX

- 복잡한 설정 없이 바로 사용
- 깔끔한 UI 디자인
- 빠른 접근성

</div>

<div>

### 📊 데이터 시각화

- 캘린더로 한눈에 파악
- 타임라인 형태의 기록
- 알림으로 놓치지 않음

</div>

</div>

---

<!-- _class: lead -->

# 3. 기술 스택

---

## 기술 스택 Overview

<div class="columns">

<div>

### Frontend

```
Next.js 15.5.3
TypeScript
TailwindCSS 4.1
```

**선택 이유**
- SSR/SSG로 빠른 초기 로딩
- 타입 안정성 확보
- 유틸리티 기반 빠른 개발

</div>

<div>

### Backend & Database

```
Supabase
PostgreSQL
Next.js API Routes
```

**선택 이유**
- 실시간 데이터베이스
- 인증 시스템 내장
- TypeScript 타입 자동 생성

</div>

</div>

---

## 상태 관리 & 라이브러리

<div class="columns">

<div>

### 상태 관리

```
Zustand 5.0
```

**6개의 Store**
- `userStore` - 사용자 정보
- `petStore` - 펫 관리
- `scheduleStore` - 일정 관리
- `calendarStore` - 캘린더 상태
- `modalStore` - 모달 관리
- `profileCreationStore` - 펫 추가 폼

</div>

<div>

### 주요 라이브러리

- **React Query 5** - 서버 상태 관리
- **React Hook Form** - 폼 관리
- **Sonner** - 토스트 알림
- **Lucide React** - 아이콘

### 배포

- **Vercel** - CI/CD 자동화

</div>

</div>

---

<!-- _class: lead -->

# 4. 주요 기능

---

## 🔐 회원가입 & 로그인

<div class="columns">

<div>

### 회원가입 프로세스

1. 닉네임, 이메일, 비밀번호 입력
2. 이메일 중복 검사
3. 비밀번호 강도 실시간 표시
4. Supabase Auth + users 테이블 동시 저장

### 기술 포인트

- Supabase Auth 활용
- 실패 시 자동 롤백 처리
- 세션 자동 관리

</div>

<div>

### 로그인

- 이메일/비밀번호 인증
- "로그인 유지" 옵션
- 안전한 세션 관리

### 보안

- Row Level Security (RLS)
- 환경변수로 API Key 관리
- HTTPS 통신

</div>

</div>

---

## 🐾 펫 프로필 추가 - 6단계 마법사

부담 없이 단계별로 정보 입력

<div class="columns-3">

<div>

**Step 1-2**
- 종 선택 (강아지/고양이)
- 이름 입력

**Step 3-4**
- 생일, 입양일
- 사진 업로드

</div>

<div>

**Step 5-6**
- 체형 선택
- 체중 입력
- 최종 확인

</div>

<div>

**기술 포인트**
- localStorage persist
- 중간 저장 지원
- Progress Bar
- Supabase Storage

</div>

</div>

---

## 🏠 대시보드

한눈에 보는 우리 펫

### 구성 요소

<div class="columns">

<div>

**1. 펫 프로필 캐러셀**
- 등록된 모든 펫 카드
- 클릭으로 펫 전환
- 프로필 이미지 + 이름

</div>

<div>

**2. 빠른 액세스 카드**
- 🏥 건강 카드
- 🍖 영양 관리
- 🐕 활동 기록

→ 1클릭으로 원하는 기능 접근

</div>

</div>

---

## 💉 건강 카드 - 의료 기록 관리

아코디언 기반 4가지 카테고리

<div class="columns">

<div>

### 기록 종류

1. **예방접종 (Vaccines)**
   - 접종일, 백신명, 만료일
   - 로트 번호, 메모

2. **구충 치료 (Antiparasitic)**
   - 복용일, 다음 복용일
   - 약품명, 메모

</div>

<div>

3. **의료 처치 (Medical)**
   - 병원 방문일, 다음 방문일
   - 진료 내용, 카테고리

4. **기타 치료**
   - 날짜, 세부 내용
   - 제목, 메모

</div>

</div>

### UI 특징
- 아코디언으로 깔끔한 정보 표시 | 수정/삭제 버튼 | Empty State & 로딩 스켈레톤

---

## 📅 캘린더 & 일정 관리

**PAW BUDDY의 핵심 기능**

<div class="columns">

<div>

### 화면 구성

- **좌측 (75%)**: 캘린더 + 필터
- **우측 (25%)**: 일정 목록

### 8가지 일정 카테고리

- 🎂 생일 (매년 반복)
- 🏠 입양일 (매년 반복)
- 💉 예방접종
- 💊 구충 치료

</div>

<div>

- 🏥 의료 처치
- 🩺 기타 치료
- 🐕 산책
- 🎾 기타 활동

### 주요 기능

✅ **필터링** - 8가지 카테고리 개별 토글
✅ **일정 추가/수정/삭제**
✅ **알림 설정** - 시간 지정
✅ **반복 일정** - 생일, 입양일

</div>

</div>

---

## 캘린더 - 기술적 구현

### 완전 커스텀 캘린더 (라이브러리 미사용)

<div class="columns">

<div>

**데이터 흐름**

```
1. fetchSchedules()
   ↓
2. 8개 테이블 병렬 조회
   ↓
3. 알림 정보 배치 조회
   ↓
4. 데이터 통합 & 렌더링
```

</div>

<div>

**성능 최적화**

- 병렬 API 호출 (Promise.all)
- 알림 배치 조회 (N+1 문제 해결)
- Map으로 빠른 데이터 접근
- 선택적 상태 구독

**커스텀 훅**
- `useCalendar()`
- `useCalendarGrid()`
- `useScheduleFilter()`

</div>

</div>

---

## 🍖 영양 관리

<div class="columns">

<div>

### 식단 일지 (Diet Log)

- 날짜, 식사 종류 (아침/점심/저녁/간식)
- 내용, 메모
- 아코디언 방식 표시
- 과거 식단 이력 조회

</div>

<div>

### 식사 시간 알림

- 정해진 시간에 브라우저 알림
- 아침/점심/저녁 개별 설정
- ON/OFF 토글
- Notification API 활용

**사용 시나리오**
> "매일 오전 8시, 오후 6시에 밥 주는 걸 잊지 않도록!"

</div>

</div>

---

## 🐕 활동 기록

<div class="columns">

<div>

### 산책 기록 (Walks)

- 날짜, 시작 시간
- 총 소요 시간
- 거리, 메모
- 산책 패턴 파악 가능

</div>

<div>

### 기타 활동

- 날짜, 시작 시간
- 지속 시간
- 제목, 메모
- 놀이, 훈련 등 다양한 활동

</div>

</div>

### UI 특징
- 아코디언으로 날짜별 그룹화 | 수정/삭제 기능 | 시각적 타임라인

---

<!-- _class: lead -->

# 5. 기술적 구현

---

## 데이터베이스 설계

<div class="columns">

<div>

### 주요 테이블

**users** - 사용자 정보
- id, email, nickname, profile_img

**pets** - 반려동물
- id, user_id, name, species, breed
- birthdate, adoption_date, weight

**의료 기록 (4개 테이블)**
- vaccines (예방접종)
- antiparasitic (구충제)
- medical_treatment (의료 처치)
- other_treatments (기타 치료)

</div>

<div>

**활동 기록 (2개 테이블)**
- walks (산책)
- other_activities (기타 활동)

**식단 (2개 테이블)**
- diet (식단 일지)
- scheduled_meals (식사 시간)

**알림**
- schedule_notifications

### 관계
- users 1:N pets
- pets 1:N 각종 기록 테이블

</div>

</div>

---

## 상태 관리 아키텍처

### Zustand 6개 Store

<div class="columns">

<div>

**userStore**
```typescript
{
  user: User | null
  setUser()
  resetUser()
}
```

**petStore**
```typescript
{
  petList: PetSummary[]
  selectedPetId: string | null
  selectedPet?: Pet
  fetchPetSummary()
  fetchSelectedPet()
  resetPets()
}
```

</div>

<div>

**scheduleStore**
```typescript
{
  schedules: ScheduleEvent[]
  activeFilters: Category[]
  fetchSchedules()
  addVaccine(), addMedical()...
  refetchSchedules()
}
```

**calendarStore**
```typescript
{
  currentYear, currentMonth
  selectedDate: Date | null
  setYearMonth()
  resetCalendar()
}
```

</div>

</div>

---

## API 설계 - Supabase 활용

<div class="columns">

<div>

### 인증 (auth.ts)

- `loginWithEmail()`
- `signUpWithEmail()`

### 펫 관리 (pet.ts)

- `getUserPets()`
- `getSelectedPet()`
- `updatePetImg()` - Storage
- `updatePetDetail()`

### 일정 (schedules.ts)

- `getScheduleData()` - 통합 조회
- 카테고리별 CRUD

</div>

<div>

### 알림 (notification.api.ts)

- `getScheduleNotification()`
- `batchGetNotifications()` 🚀
- `upsertNotification()`

### 활동 (activity.api.ts)

- 제네릭 CRUD 함수
```typescript
createActivity<T>()
updateActivity<T>()
deleteActivity<T>()
```

</div>

</div>

---

## 성능 최적화

<div class="columns">

<div>

### API 호출 최적화

✅ **중복 요청 방지**
```typescript
if (currentPetId === petId
    && !isLoading) return
```

✅ **병렬 조회**
```typescript
Promise.all([
  getVaccines(),
  getMedical(),
  ...
])
```

✅ **배치 조회**
```typescript
batchGetNotifications(ids)
// N+1 문제 해결
```

</div>

<div>

### 렌더링 최적화

✅ **선택적 구독**
```typescript
const id = usePetStore(
  state => state.selectedPetId
)
```

✅ **컴포넌트 분리**
- 아코디언 항목 독립
- 스켈레톤 로더

✅ **Lazy Loading**
- 이미지 지연 로딩
- 컴포넌트 분할

</div>

</div>

---

## 라우트 그룹 활용

Next.js App Router의 **Route Groups**로 레이아웃 분리

```
app/
├── (landing)/          # 인증 전 - 간단한 레이아웃
│   ├── login
│   └── sign-up
│
├── (main-layout)/      # 인증 후 - Sidebar 포함
│   ├── dashboard
│   ├── pet-profile
│   ├── add-profile
│   └── user-account
│
└── calendar/           # 독립적인 캘린더 레이아웃
```

**장점**: URL에 영향 없이 레이아웃 분리 | 코드 재사용성 | 유지보수 용이

---

<!-- _class: lead -->

# 6. 개발 과정의 도전과 해결

---

## 도전 1: 8개 테이블의 통합 조회

<div class="columns">

<div>

### 문제

- 건강, 식단, 활동 등 **8개 테이블**
- 순차 조회 시 너무 많은 API 호출
- 페이지 로딩 느림

### 영향

- 사용자 경험 저하
- 불필요한 네트워크 비용

</div>

<div>

### 해결

```typescript
export async function getScheduleData(petId) {
  // 병렬로 모든 테이블 조회
  const [
    petSchedules,
    vaccines,
    antiparasitic,
    medical,
    // ...
  ] = await Promise.all([
    getPetSchedules(petId),
    getVaccineSchedules(petId),
    // ...
  ])

  // 통합 후 반환
  return [...petSchedules, ...vaccines, ...]
}
```

✅ **8개 순차 → 1번 병렬 호출**

</div>

</div>

---

## 도전 2: 알림 정보 병합 (N+1 문제)

<div class="columns">

<div>

### 문제

- 각 일정마다 알림 조회
- **N+1 문제** 발생
- 100개 일정 = 100번 조회

### 영향

- DB 부하 증가
- 응답 시간 증가

</div>

<div>

### 해결

```typescript
// 1. 모든 일정 ID 수집
const scheduleIds = schedules.map(s => s.id)

// 2. 배치로 한 번에 조회
const notifications =
  await batchGetNotifications(scheduleIds)

// 3. Map으로 빠른 접근
const notificationMap = new Map(
  notifications.map(n => [n.schedule_id, n])
)

// 4. 병합
schedules.forEach(schedule => {
  schedule.notification =
    notificationMap.get(schedule.id)
})
```

✅ **100번 조회 → 1번 배치 조회**

</div>

</div>

---

## 도전 3: 로그아웃 시 상태 정리

<div class="columns">

<div>

### 문제

- 로그아웃 후에도 이전 사용자 데이터 남음
- 다음 로그인 시 데이터 충돌
- 보안 문제

</div>

<div>

### 해결

**모든 Store에 reset 함수 추가**

```typescript
const handleLogout = async () => {
  await supabase.auth.signOut()

  // 모든 store 초기화
  resetUser()
  resetPets()
  resetSchedules()
  resetCalendar()
  resetModal()
  resetDraftPet()

  router.push('/')
}
```

✅ **깔끔한 상태 초기화**

</div>

</div>

---

## 도전 4: 펫 추가 폼의 중간 저장

<div class="columns">

<div>

### 문제

- 6단계 폼 작성 중 브라우저 종료
- 입력한 데이터 모두 손실
- 사용자 불만

</div>

<div>

### 해결

**localStorage persist 적용**

```typescript
// profileCreationStore.ts
const useProfileCreationStore = create(
  persist(
    (set) => ({
      draftPet: {},
      currentStep: 1,
      updateDraftPet: (data) =>
        set((state) => ({
          draftPet: { ...state.draftPet, ...data }
        })),
      // ...
    }),
    { name: 'profile-creation-storage' }
  )
)
```

✅ **새로고침해도 데이터 유지**

</div>

</div>

---

<!-- _class: lead -->

# 7. 향후 개선 계획

---

## 기능 확장

<div class="columns">

<div>

### 🐱 다양한 동물 지원

- 현재: 강아지만 지원
- 계획: 고양이, 새, 햄스터 등

### 👥 소셜 기능

- 다른 보호자와 정보 공유
- 커뮤니티 게시판
- 팁 & 노하우 공유

</div>

<div>

### 🤖 AI 기반 분석

- 체중 변화 추이 분석
- 병원 방문 주기 예측
- 건강 이상 징후 감지

### 📱 모바일 앱

- React Native 크로스 플랫폼
- 네이티브 푸시 알림

</div>

</div>

---

## 기술 개선

<div class="columns">

<div>

### PWA (Progressive Web App)

- 오프라인 지원
- Service Worker
- 푸시 알림 (백그라운드)
- 홈 화면 추가

### 성능 최적화

- 이미지 최적화 (WebP)
- Next.js Image 컴포넌트
- 코드 스플리팅
- 번들 사이즈 최적화

</div>

<div>

### 접근성 (A11y)

- 스크린 리더 지원
- 키보드 내비게이션
- ARIA 속성 추가
- 색상 대비 개선

### 테스트 코드

- Unit Test (Jest)
- Integration Test
- E2E Test (Playwright)
- 90%+ 커버리지 목표

</div>

</div>

---

<!-- _class: lead -->

# 마무리

---

## 우리가 배운 것

<div class="columns-3">

<div>

### 🤝 팀워크

- Git 컨벤션
- 코드 리뷰 문화
- Issue 기반 작업 분배
- 원활한 소통

</div>

<div>

### 👤 사용자 중심

- Pain Point 해결
- 직관적인 UI/UX
- 피드백 수용
- 지속적 개선

</div>

<div>

### 💻 최신 기술

- Next.js 15 활용
- TypeScript 안정성
- Supabase 실시간 DB
- 모던 상태 관리

</div>

</div>

---

## 시연 및 링크

### 🔗 프로젝트 링크

- **배포 URL**: [URL 입력 필요]
- **GitHub**: https://github.com/FRONTENDBOOTCAMP-14th/Final-Project-Team-8
- **Figma 디자인**: [Figma 링크]
- **Notion 문서**: [Notion 링크]

### 📊 프로젝트 통계

- **개발 기간**: [입력 필요]
- **커밋 수**: 100+
- **PR 수**: 50+
- **코드 라인 수**: [입력 필요]

---

<!-- _class: lead -->

# 감사합니다!

PAW BUDDY와 함께
반려동물과 보호자 모두가 행복한 삶을!

---

<!-- _class: lead -->

# Q&A

궁금하신 점이 있으신가요?

---

## 예상 질문 1

### Q. 왜 Zustand를 선택했나요?

**A.**
- **Redux**: 보일러플레이트가 많고 러닝 커브 높음
- **Context API**: 리렌더링 성능 이슈
- **Zustand**:
  - ✅ 간결한 API (3-4줄로 store 생성)
  - ✅ 빠른 성능 (선택적 구독)
  - ✅ 낮은 학습 곡선 (팀 협업에 유리)
  - ✅ TypeScript 완벽 지원

```typescript
// 이렇게 간단합니다!
const usePetStore = create((set) => ({
  pets: [],
  fetchPets: async () => set({ pets: await api.getPets() })
}))
```

---

## 예상 질문 2

### Q. Supabase의 보안은 어떻게 관리하나요?

**A.**

1. **Row Level Security (RLS)**
   - 사용자는 자신의 데이터만 접근 가능
   ```sql
   CREATE POLICY "Users can only see their own pets"
   ON pets FOR SELECT
   USING (auth.uid() = user_id);
   ```

2. **환경변수 관리**
   - API Key는 `.env.local`에서 관리
   - Git에 커밋되지 않도록 `.gitignore` 설정

3. **HTTPS 통신** - 모든 API 통신 암호화

---

## 예상 질문 3

### Q. 알림 기능은 어떻게 구현했나요?

**A.**

**현재 구현**
- 브라우저 **Notification API** 사용
- 사용자가 알림 권한 부여 필요
- 설정한 시간에 브라우저 알림 표시

```typescript
if (Notification.permission === "granted") {
  new Notification("밥 줄 시간이에요!", {
    body: "우리 멍멍이 식사 시간입니다.",
    icon: "/paw-icon.png"
  })
}
```

**향후 계획**
- Service Worker + Push API로 **백그라운드 알림**
- 브라우저가 닫혀있어도 알림 가능

---

## 예상 질문 4

### Q. 캘린더 라이브러리를 사용하지 않은 이유는?

**A.**

### 우리의 요구사항

- 8가지 카테고리 동시 표시
- 필터링 기능
- 알림 시스템 통합
- 반복 일정 (생일, 입양일)
- 커스텀 디자인

### 결정

- 기존 라이브러리로는 **커스터마이징 한계**
- 직접 구현으로 **완전한 제어** 가능
- **학습 경험** - 캘린더 로직과 날짜 계산 깊이 이해

---

## 예상 질문 5

### Q. 반응형 디자인은 지원하나요?

**A.** 네, 모든 디바이스를 지원합니다!

<div class="columns">

<div>

### TailwindCSS 반응형 유틸리티

```html
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
">
  <!-- 모바일: 1열 -->
  <!-- 태블릿: 2열 -->
  <!-- 데스크톱: 3열 -->
</div>
```

</div>

<div>

### 최적화 포인트

- 모바일: 햄버거 메뉴
- 태블릿: 사이드바 축소
- 데스크톱: 전체 레이아웃

**특히 캘린더는**
작은 화면에서도 잘 보이도록
그리드 간격 조정!

</div>

</div>

---

<!-- _class: lead -->

# 다시 한번 감사합니다!

🐾 PAW BUDDY 🐾

**Team 8**
김동규 | 장효정 | 정지은 | 우혜리
