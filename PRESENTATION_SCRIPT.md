# PAW BUDDY 프로젝트 발표 대본

**발표 시간**: 15-20분
**발표자**: Team 8
**날짜**: 2025년

---

## 1. 인사 및 프로젝트 소개 (2분)

안녕하세요. Team 8입니다. 저희는 반려동물 관리 웹 애플리케이션인 **PAW BUDDY**를 개발했습니다.

### 프로젝트 한눈에 보기

- **프로젝트명**: PAW BUDDY (포 버디)
- **주제**: 반려동물 건강, 식단, 일정 통합 관리 웹 서비스
- **개발 기간**: [개발 기간 입력]
- **팀 구성**:
  - 김동규 (팀장/Frontend)
  - 장효정 (Frontend)
  - 정지은 (Frontend)
  - 우혜리 (Frontend)

PAW BUDDY는 반려동물을 키우는 보호자들이 건강, 식단, 활동, 일정을 한 곳에서 체계적으로 관리할 수 있도록 돕는 **All-in-One 반려동물 관리 플랫폼**입니다.

---

## 2. 프로젝트 배경 및 목표 (2-3분)

### 왜 PAW BUDDY를 만들었나?

최근 통계에 따르면, 1인 가구 증가와 함께 반려동물을 키우는 가구가 급증하고 있습니다. 하지만 많은 반려동물 보호자들이 다음과 같은 어려움을 겪고 있습니다:

**문제점**:
- 예방접종 일정을 놓쳐서 병원에서 독촉 전화를 받은 경험
- 구충제를 언제 먹였는지 기억이 안 나는 상황
- 산책 기록, 식단 관리 등을 여러 앱에서 따로 관리하는 불편함
- 병원 방문 기록, 의료 정보를 종이나 메모에 흩어져 관리

### 우리의 솔루션

PAW BUDDY는 이러한 문제를 해결하기 위해 **3가지 핵심 가치**에 집중했습니다:

1. **All-in-One 통합 관리**
   - 건강, 식단, 활동, 일정을 하나의 플랫폼에서

2. **직관적인 사용자 경험**
   - 복잡한 설정 없이 누구나 쉽게 사용 가능
   - 깔끔한 UI/UX 디자인

3. **데이터 기반 기록 관리**
   - 시각적인 캘린더와 타임라인으로 한눈에 파악
   - 알림 기능으로 중요한 일정 놓치지 않기

---

## 3. 기술 스택 소개 (2분)

### 3.1 Frontend

```
Next.js 15.5.3 + TypeScript
```

**선택 이유**:
- Next.js의 SSR/SSG로 빠른 초기 로딩과 SEO 최적화
- TypeScript로 타입 안정성 확보 → 런타임 에러 최소화
- App Router(13+)를 활용한 직관적인 라우팅 구조

**스타일링**:
```
TailwindCSS 4.1
```
- 유틸리티 기반 스타일링으로 빠른 개발 속도
- 일관된 디자인 시스템 유지

### 3.2 Backend & Database

```
Supabase (PostgreSQL 기반)
```

**선택 이유**:
- **실시간 데이터베이스**: PostgreSQL의 강력한 관계형 DB
- **인증 시스템 내장**: 별도 구현 없이 사용자 인증/세션 관리
- **Storage**: 이미지 파일 관리 (펫 프로필, 사용자 프로필)
- **빠른 개발**: REST API 자동 생성, TypeScript 타입 자동 생성

### 3.3 상태 관리

```
Zustand 5.0
```

**선택 이유**:
- Redux 대비 보일러플레이트 최소화
- 가볍고 빠른 성능
- 직관적인 API

**우리가 만든 6개의 Store**:
- `userStore`: 로그인 사용자 정보
- `petStore`: 펫 목록 및 선택된 펫
- `scheduleStore`: 일정 데이터 및 필터링
- `calendarStore`: 캘린더 년/월 상태
- `modalStore`: 모달 상태 관리
- `profileCreationStore`: 펫 추가 폼 (localStorage persist)

### 3.4 기타 주요 라이브러리

- **React Query 5**: 서버 상태 관리 및 캐싱
- **React Hook Form**: 폼 상태 관리
- **Sonner**: 토스트 알림
- **Lucide React**: 아이콘

### 3.5 배포

```
Vercel
```
- Next.js 최적화 호스팅
- CI/CD 자동화

---

## 4. 주요 기능 시연 (8-10분)

### 4.1 회원가입 & 로그인 (1분)

**회원가입 프로세스**:
1. 닉네임, 이메일, 비밀번호 입력
2. 이메일 중복 검사
3. 비밀번호 강도 표시 (실시간 피드백)
4. Supabase Auth + users 테이블에 동시 저장

**로그인**:
- 이메일/비밀번호 인증
- "로그인 유지" 옵션
- 세션 자동 관리

**기술적 포인트**:
- Supabase Auth를 사용한 안전한 인증
- 회원가입 실패 시 자동 롤백 처리

### 4.2 펫 프로필 추가 - 6단계 마법사 (2분)

저희는 사용자가 펫을 등록할 때 **부담스럽지 않도록 6단계로 나눠서** 정보를 입력받습니다.

**Step 1: 종 선택**
- 강아지 / 고양이 / 기타 (현재 강아지만 지원, 나머지는 "준비 중")

**Step 2: 이름 입력**
- 반려동물 이름

**Step 3: 날짜 정보**
- 생일 (실제 생일 또는 추정)
- 입양일

**Step 4: 사진 업로드**
- Supabase Storage에 업로드
- 프로필 이미지 설정

**Step 5: 체형 정보**
- 소형견 / 중형견 / 대형견
- 현재 체중

**Step 6: 최종 확인**
- 입력한 정보 검토 후 저장

**기술적 포인트**:
- `profileCreationStore`로 단계별 데이터 임시 저장 (localStorage persist)
- 사용자가 중간에 나가도 데이터 유지
- Progress Bar로 진행률 표시

### 4.3 대시보드 - 한눈에 보는 우리 펫 (1분)

대시보드는 사용자가 로그인 후 가장 먼저 보는 화면입니다.

**구성 요소**:

1. **펫 프로필 캐러셀**
   - 등록된 모든 펫을 카드로 표시
   - 클릭하면 해당 펫으로 전환

2. **빠른 액세스 3개 카드**
   - 건강 카드 → 예방접종, 구충제, 의료 기록
   - 영양 관리 → 식단 일지, 식사 시간 알림
   - 활동 기록 → 산책, 기타 활동

**사용자 흐름**:
- 대시보드에서 원하는 기능으로 1클릭 접근
- 선택된 펫에 대한 정보만 표시

### 4.4 건강 카드 - 아코디언 기반 기록 관리 (2분)

건강 카드는 **4가지 카테고리의 의료 기록**을 관리합니다.

**1. 예방접종 (Vaccines)**
- 접종일, 백신명, 만료일, 로트 번호, 메모
- 다음 접종일 알림 설정

**2. 구충 치료 (Antiparasitic)**
- 복용일, 다음 복용일, 약품명, 메모
- 주기적 알림

**3. 의료 처치 (Medical Treatment)**
- 병원 방문일, 다음 방문일, 진료 내용, 카테고리, 메모
- 정기 검진 알림

**4. 기타 치료 (Other Treatments)**
- 날짜, 세부 내용, 제목, 메모

**UI 디자인 특징**:
- 아코디언 방식으로 깔끔한 정보 표시
- 각 기록마다 수정/삭제 버튼
- 빈 상태(Empty State)일 때 안내 메시지
- 로딩 상태 스켈레톤

**기술적 포인트**:
- 각 카테고리별 Supabase 테이블 (vaccines, antiparasitic, medical_treatment, other_treatments)
- CRUD 작업 후 자동 새로고침
- 삭제 시 확인 모달

### 4.5 캘린더 & 일정 관리 - 핵심 기능 (3분)

캘린더는 PAW BUDDY의 **가장 중요한 기능** 중 하나입니다.

**화면 구성**:
- **좌측 (75%)**: 캘린더 + 필터
- **우측 (25%)**: 선택된 날짜의 일정 목록

**지원하는 8가지 일정 카테고리**:
1. 생일 (Birthday) - 매년 자동 반복
2. 입양일 (Adoption) - 매년 자동 반복
3. 예방접종 (Vaccine)
4. 구충 치료 (Antiparasitic)
5. 의료 처치 (Medical)
6. 기타 치료 (Other Treatments)
7. 산책 (Walk)
8. 기타 활동 (Other Activities)

**주요 기능**:

1. **필터링**
   - 8가지 카테고리를 개별 토글
   - 여러 필터 동시 적용 가능
   - 선택된 필터만 캘린더에 표시

2. **일정 추가**
   - 카테고리 선택
   - 날짜, 시간, 제목, 메모 입력
   - 알림 설정 (시간 지정)

3. **일정 수정/삭제**
   - 일정 클릭 → 상세 모달
   - 인라인 수정
   - 삭제 확인 모달

4. **알림 관리**
   - 각 일정별로 알림 시간 설정
   - 브라우저 알림 (Notification API)
   - ON/OFF 토글

**데이터 흐름**:
```
1. 페이지 로드 → scheduleStore.fetchSchedules()
2. 8개 테이블에서 데이터 조회 (병렬)
3. schedule_notifications 테이블과 JOIN
4. 통합된 데이터로 캘린더 렌더링
5. 필터 적용 → 화면 업데이트
```

**기술적 포인트**:
- 완전 커스텀 캘린더 컴포넌트 (라이브러리 없음)
- `useCalendar()`, `useCalendarGrid()`, `useScheduleFilter()` 훅 분리
- 반복 일정 로직 (생일, 입양일)
- 알림 배치 조회로 성능 최적화

### 4.6 영양 관리 - 식단 일지 & 식사 시간 알림 (1분)

**1. 식단 일지 (Diet Log)**
- 날짜, 식사 종류 (아침/점심/저녁/간식), 내용, 메모
- 아코디언 방식으로 표시
- 과거 식단 이력 조회

**2. 식사 시간 알림 (Meal Time Reminder)**
- 정해진 시간에 브라우저 알림
- 아침/점심/저녁 식사 시간 개별 설정
- ON/OFF 토글

**사용 시나리오**:
> "매일 오전 8시, 오후 6시에 밥 주는 걸 잊지 않도록 알림을 설정했습니다."

### 4.7 활동 기록 - 산책 & 기타 활동 (1분)

**1. 산책 기록 (Walks)**
- 날짜, 시작 시간, 총 소요 시간, 거리, 메모
- 산책 패턴 파악 가능

**2. 기타 활동 (Other Activities)**
- 날짜, 시작 시간, 지속 시간, 제목, 메모
- 놀이, 훈련 등 다양한 활동 기록

**아코디언 UI**:
- 날짜별로 그룹화
- 수정/삭제 기능

### 4.8 사용자 계정 관리 (30초)

**설정 가능 항목**:
- 프로필 이미지
- 닉네임
- 생일
- 성별
- 연락처

**로그아웃**:
- 모든 Zustand store 초기화
- Supabase 세션 종료

---

## 5. 기술적 구현 상세 (3-4분)

### 5.1 데이터베이스 설계

**주요 테이블**:

```
users (사용자)
├── id (PK)
├── email
├── nickname
├── profile_img
└── ...

pets (반려동물)
├── id (PK)
├── user_id (FK → users)
├── name
├── species
├── birthdate
├── adoption_date
└── ...

vaccines (예방접종)
├── id (PK)
├── pet_id (FK → pets)
├── vaccinated_date
├── title
├── expiry_date
└── ...

(antiparasitic, medical_treatment, other_treatments,
 walks, other_activities, diet, scheduled_meals 등 8개 테이블)

schedule_notifications (알림 설정)
├── schedule_type
├── schedule_id
├── pet_id (FK)
├── enabled
└── notification_time
```

**관계**:
- `users` 1:N `pets`
- `pets` 1:N `각종 기록 테이블`
- `기록 테이블` 1:1 `schedule_notifications`

### 5.2 상태 관리 아키텍처

**6개의 Zustand Store**:

```typescript
// 1. userStore - 로그인 사용자
interface UserState {
  user: User | null
  setUser: () => Promise<void>
  resetUser: () => void
}

// 2. petStore - 펫 목록 및 선택
interface PetStore {
  petList: PetSummary[]          // 사이드바용 요약
  selectedPetId: string | null
  selectedPet?: Pet              // 상세 정보
  fetchPetSummary: (user) => Promise<void>
  fetchSelectedPet: (id) => Promise<void>
  resetPets: () => void
}

// 3. scheduleStore - 일정 관리
interface ScheduleStore {
  schedules: ScheduleEvent[]
  isLoading: boolean
  activeFilters: ScheduleCategory[]
  fetchSchedules: (petId) => Promise<void>
  addVaccine: (data) => Promise<void>
  // ... 각 카테고리별 CRUD 함수
}

// 4. calendarStore - 캘린더 상태
interface CalendarStore {
  currentYear: number
  currentMonth: number
  selectedDate: Date | null
  setYearMonth: (year, month) => void
  resetCalendar: () => void
}

// 5. modalStore - 모달 관리
interface ModalState {
  active: ModalEntry | null
  openModal: (entry) => void
  closeModal: () => void
}

// 6. profileCreationStore - 펫 추가 폼 (persist)
interface ProfileCreationStore {
  draftPet: DraftPet
  currentStep: number
  updateDraftPet: (data) => void
  nextStep: () => void
  resetDraftPet: () => void
}
```

**로그아웃 시 전체 초기화**:
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

### 5.3 API 설계 - Supabase 활용

**인증 (auth.ts)**:
- `loginWithEmail()`
- `signUpWithEmail()` - Auth + users 테이블 동시 처리

**펫 관리 (pet.ts)**:
- `getUserPets()` - 사용자의 펫 목록
- `getSelectedPet()` - 펫 상세 정보
- `updatePetImg()` - 이미지 업로드 (Storage)
- `updatePetDetail()` - 정보 수정

**일정 관리 (schedules.ts)**:
- `getScheduleData()` - **8개 테이블 통합 조회**
- `createVaccine()`, `createAntiparasitic()`, ... - 개별 생성
- `updateVaccine()`, `deleteVaccine()`, ... - 개별 수정/삭제

**알림 관리 (notification.api.ts)**:
- `getScheduleNotification()` - 특정 일정 알림
- `getPetNotifications()` - 펫의 모든 알림
- `upsertNotification()` - 생성 또는 업데이트
- `batchGetNotifications()` - 배치 조회 (성능 최적화)

**활동 기록 (activity.api.ts)**:
- 제네릭 함수로 CRUD 통합:
  ```typescript
  createActivity<T>({ setData, type, pet_id })
  getPetTableData<T>(type, pet_id)
  updateActivity<T>(type, id, petId, dataList)
  deleteActivity<T>(type, id, petId)
  ```

### 5.4 성능 최적화

**1. API 호출 최적화**:
- 중복 요청 방지 (scheduleStore의 `currentPetId` 체크)
- 배치 조회 (알림 정보 Map으로 빠른 접근)
- 8개 테이블 병렬 조회 후 통합

**2. 컴포넌트 렌더링**:
- 아코디언 각 항목 독립적 상태
- 스켈레톤 로더로 로딩 상태 표시
- 지연 로딩 (Lazy Loading)

**3. 상태 관리**:
- Zustand의 선택적 구독:
  ```typescript
  const selectedPetId = usePetStore(state => state.selectedPetId)
  ```
- localStorage persist는 profileCreationStore만 사용

### 5.5 라우트 그룹 활용

Next.js App Router의 **Route Groups**로 레이아웃 분리:

```
app/
├── (landing)/          # 인증 전 - 간단한 레이아웃
│   ├── login
│   └── sign-up
├── (main-layout)/      # 인증 후 - Sidebar 포함
│   ├── dashboard
│   ├── pet-profile
│   ├── add-profile
│   └── user-account
└── calendar/           # 독립적인 레이아웃
```

**장점**:
- URL에 영향 없이 레이아웃 분리
- 코드 재사용성 향상
- 유지보수 용이

### 5.6 TypeScript 타입 안정성

**Supabase 자동 타입 생성**:
```typescript
// database.types.ts (자동 생성)
export type Database = {
  public: {
    Tables: {
      pets: { ... }
      vaccines: { ... }
      // ...
    }
  }
}

// 사용
const supabase = createClient<Database>()
```

**커스텀 타입 정의**:
```typescript
type ScheduleCategory =
  | 'birthday' | 'adoption'
  | 'vaccine' | 'antiparasitic' | 'medical'
  | 'other treatments' | 'walk' | 'other activities'

interface ScheduleEvent {
  id: string
  category: ScheduleCategory
  date: string
  title: string
  notification?: ScheduleNotification
}
```

---

## 6. 개발 과정에서의 도전과 해결 (2분)

### 6.1 도전 1: 8개 테이블의 통합 조회

**문제**:
- 건강, 식단, 활동 등 8개 테이블을 따로 조회하면 너무 많은 API 호출

**해결**:
```typescript
// schedules.ts
export async function getScheduleData(petId: string) {
  // 병렬로 모든 테이블 조회
  const [
    petSchedules,
    vaccines,
    antiparasitic,
    medical,
    otherTreatments,
    walks,
    otherActivities
  ] = await Promise.all([
    getPetSchedules(petId),
    getVaccineSchedules(petId),
    // ...
  ])

  // 통합 후 반환
  return [...petSchedules, ...vaccines, ...]
}
```

**결과**:
- 8개의 순차 호출 → 1번의 병렬 호출
- 페이지 로딩 시간 단축

### 6.2 도전 2: 알림 정보 병합

**문제**:
- 각 일정마다 알림 설정을 조회하면 N+1 문제 발생

**해결**:
```typescript
// 1. 모든 일정 ID 수집
const scheduleIds = schedules.map(s => s.id)

// 2. 배치로 한 번에 조회
const notifications = await batchGetNotifications(scheduleIds)

// 3. Map으로 빠른 접근
const notificationMap = new Map(
  notifications.map(n => [n.schedule_id, n])
)

// 4. 병합
schedules.forEach(schedule => {
  schedule.notification = notificationMap.get(schedule.id)
})
```

### 6.3 도전 3: 로그아웃 시 상태 정리

**문제**:
- 로그아웃 후에도 이전 사용자 데이터가 남아있음

**해결**:
- 모든 Zustand store에 `reset` 함수 추가
- 로그아웃 시 일괄 호출:
  ```typescript
  resetUser()
  resetPets()
  resetSchedules()
  resetCalendar()
  resetModal()
  resetDraftPet()
  ```

### 6.4 도전 4: 펫 추가 폼의 중간 저장

**문제**:
- 6단계 폼을 작성 중 브라우저를 닫으면 데이터 손실

**해결**:
- `profileCreationStore`에 **localStorage persist** 적용
- 사용자가 돌아오면 이어서 작성 가능

---

## 7. 향후 개선 계획 (1분)

### 7.1 기능 확장

1. **고양이, 기타 동물 지원**
   - 현재는 강아지만 지원
   - 고양이, 새, 햄스터 등으로 확장

2. **소셜 기능**
   - 다른 반려동물 보호자와 정보 공유
   - 커뮤니티 게시판

3. **AI 기반 건강 분석**
   - 체중 변화 추이 분석
   - 병원 방문 주기 예측

4. **모바일 앱**
   - React Native로 크로스 플랫폼 앱 개발

### 7.2 기술 개선

1. **PWA (Progressive Web App)**
   - 오프라인 지원
   - 푸시 알림 (Service Worker)

2. **성능 최적화**
   - 이미지 최적화 (WebP, Next.js Image)
   - 코드 스플리팅

3. **접근성 (A11y)**
   - 스크린 리더 지원
   - 키보드 내비게이션 개선

4. **테스트 코드**
   - Jest, React Testing Library
   - E2E 테스트 (Playwright)

---

## 8. 마무리 (1분)

### 우리가 배운 것

1. **팀워크의 중요성**
   - Git 컨벤션, 코드 리뷰를 통한 협업
   - Issue 기반 작업 분배

2. **사용자 중심 개발**
   - 실제 반려동물 보호자의 Pain Point 해결
   - 직관적인 UI/UX 설계

3. **현대적인 기술 스택 활용**
   - Next.js, TypeScript, Supabase의 조합
   - 빠른 개발과 안정성 확보

### 시연 및 배포 링크

- **배포 URL**: [URL 입력]
- **GitHub**: [Repository URL]
- **디자인 시안**: [Figma 링크]

### 감사 인사

PAW BUDDY를 함께 만든 팀원들, 그리고 프로젝트를 지켜봐 주신 모든 분들께 감사드립니다.

반려동물과 보호자 모두가 행복한 삶을 위한 PAW BUDDY, 많은 관심 부탁드립니다!

---

## 9. 질의응답 (Q&A)

**예상 질문 및 답변**:

**Q1: 왜 Zustand를 선택했나요?**
> A: Redux는 보일러플레이트가 많고, Context API는 성능 이슈가 있습니다. Zustand는 간결한 API와 빠른 성능을 제공하며, 학습 곡선이 낮아 팀 협업에 유리했습니다.

**Q2: Supabase의 보안은 어떻게 관리하나요?**
> A: Supabase의 Row Level Security(RLS)를 활용하여, 사용자는 자신의 데이터만 접근할 수 있도록 설정했습니다. 또한, API Key는 환경변수로 관리합니다.

**Q3: 알림 기능은 어떻게 구현했나요?**
> A: 브라우저의 Notification API를 사용했습니다. 사용자가 알림 권한을 부여하면, 설정한 시간에 브라우저 알림이 표시됩니다. 향후 Service Worker를 활용한 푸시 알림으로 확장할 계획입니다.

**Q4: 캘린더 라이브러리를 사용하지 않은 이유는?**
> A: 우리의 요구사항(8가지 카테고리, 필터링, 알림 등)에 맞는 라이브러리를 찾기 어려웠고, 완전한 커스터마이징을 위해 직접 구현했습니다. 이 과정에서 캘린더 로직과 날짜 계산에 대한 깊은 이해를 얻었습니다.

**Q5: 반응형 디자인은 지원하나요?**
> A: TailwindCSS의 반응형 유틸리티를 활용하여 모바일, 태블릿, 데스크톱 모두 지원합니다. 특히 캘린더는 작은 화면에서도 잘 보이도록 최적화했습니다.

---

**발표 종료**

감사합니다!
