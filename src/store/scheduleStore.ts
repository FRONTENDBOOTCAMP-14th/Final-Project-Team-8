import { getScheduleData, ScheduleEvent } from '@/libs/api/schedules'
import { create } from 'zustand'

interface ScheduleStore {
  // State
  schedules: ScheduleEvent[]
  isLoading: boolean
  error: string | null
  currentPetId: string | null

  // Actions
  fetchSchedules: (petId: string) => Promise<void>
  clearSchedules: () => void
  setError: (error: string | null) => void
}

/**
 * Zustand ScheduleStore
 *
 * State:
 * - schedules: 스케줄 목록
 * - isLoading: 로딩 상태
 * - error: 에러 메시지
 * - currentPetId: 현재 불러온 반려동물 ID(중복 요청 방지)
 *
 * Actions:
 * - fetchSchedules: 특정 반려동물의 스케줄 가져오기
 * - clearSchedules: 스케줄 초기화
 * - setError: 에러 설정
 */
export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  // State
  schedules: [],
  isLoading: false,
  error: null,
  currentPetId: null,

  // Actions
  /**
   * 반려동물의 스케줄 가져오기
   * - 같은 petId면 중복 요청 방지
   * - 로딩 상태 관리
   * - 에러 처리
   */
  fetchSchedules: async (petId: string) => {
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
}))
