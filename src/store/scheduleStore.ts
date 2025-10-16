import type {
  ScheduleCategory,
  ScheduleEvent,
} from '@/components/calendar/types'
import { getScheduleData } from '@/libs/api/schedules'
import { create } from 'zustand'

interface ScheduleStore {
  // State
  schedules: ScheduleEvent[]
  isLoading: boolean
  error: string | null
  currentPetId: string | null
  activeFilters: ScheduleCategory[]

  // Actions
  fetchSchedules: (petId: string) => Promise<void>
  clearSchedules: () => void
  setError: (error: string | null) => void
  setActiveFilters: (filters: ScheduleCategory[]) => void
}

// 모든 카테고리(기본값)
const ALL_CATEGORIES: ScheduleCategory[] = [
  'birthday',
  'adoption',
  'vaccine',
  'antiparasitic',
  'medical',
  'walk',
]

/**
 * Zustand ScheduleStore
 *
 * State:
 * - schedules: 스케줄 목록
 * - isLoading: 로딩 상태
 * - error: 에러 메시지
 * - currentPetId: 현재 불러온 반려동물 ID(중복 요청 방지)
 * - activeFilters: 활성화된 필터 목록
 *
 * Actions:
 * - fetchSchedules: 특정 반려동물의 스케줄 가져오기
 * - clearSchedules: 스케줄 초기화
 * - setError: 에러 설정
 * - setActiveFilters: 필터 설정
 */
export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  // State
  schedules: [],
  isLoading: false,
  error: null,
  currentPetId: null,
  activeFilters: ALL_CATEGORIES, // 기본적으로 모두 표시

  // Actions
  /**
   * 반려동물의 스케줄 가져오기
   * - 같은 petId면 중복 요청 방지
   * - 로딩 상태 관리
   * - 에러 처리
   */
  fetchSchedules: async (petId: string) => {
    // 이미 같은 petId의 데이터를 로딩 중이거나 가져온 경우 스킵
    const { currentPetId, isLoading } = get()
    if (currentPetId === petId && !isLoading) {
      console.log('Using cached schedules for pet:', petId)
      return
    }

    console.log('Fetching schedules for pet:', petId)

    set({
      isLoading: true,
      error: null,
      currentPetId: petId,
    })

    try {
      const data = await getScheduleData(petId)
      console.log('Fetched schedules:', data.length, 'items')

      set({
        schedules: data,
        isLoading: false,
        error: null,
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '일정을 불러올 수 없습니다.'

      console.error('Failed to fetch Schedules:', err)

      set({
        schedules: [],
        isLoading: false,
        error: errorMessage,
      })
    }
  },

  /**
   * 스케줄 초기화
   * - 반려동물 선택 해제 시 사용
   */
  clearSchedules: () => {
    set({
      schedules: [],
      isLoading: false,
      error: null,
      currentPetId: null,
    })
  },

  /**
   * 에러 설정
   */
  setError: (error: string | null) => {
    set({ error })
  },

  /**
   * 활성 필터 설정
   */
  setActiveFilters: (filters: ScheduleCategory[]) => {
    set({ activeFilters: filters })
  },
}))
