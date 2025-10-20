import { toast } from 'sonner'
import { create } from 'zustand'
import type {
  ScheduleCategory,
  ScheduleEvent,
} from '@/components/calendar/types'
import type {
  CreateAntiparasiticData,
  CreateMedicalData,
  CreateOtherActivitiesData,
  CreateOtherTreatmentsData,
  CreateVaccineData,
  CreateWalkData,
} from '@/libs/api/schedules'
import {
  createAntiparasitic,
  createMedical,
  createOtherActivities,
  createOtherTreatments,
  createVaccine,
  createWalk,
  getScheduleData,
} from '@/libs/api/schedules'

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
  addVaccine: (data: CreateVaccineData) => Promise<void>
  addAntiparasitic: (data: CreateAntiparasiticData) => Promise<void>
  addMedical: (data: CreateMedicalData) => Promise<void>
  addWalk: (data: CreateWalkData) => Promise<void>
}

// 모든 카테고리(기본값)
const ALL_CATEGORIES: ScheduleCategory[] = [
  'birthday',
  'adoption',
  'vaccine',
  'antiparasitic',
  'medical',
  'other treatments',
  'walk',
  'other activities',
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
 * - addVaccine/addAntiparasitic/addMedical/addWalk: 일정 추가
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
      return
    }

    set({
      isLoading: true,
      error: null,
      currentPetId: petId,
    })

    try {
      const data = await getScheduleData(petId)

      set({
        schedules: data,
        isLoading: false,
        error: null,
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '일정을 불러올 수 없습니다.'

      toast.error(`Failed to fetch Schedules: ${err}`)

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

  /**
   * 예방접종 일정 추가
   */
  addVaccine: async (data: CreateVaccineData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createVaccine(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '예방접종 일정 추가에 실패했습니다.'

      toast.error(`Failed to add vaccine: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },

  /**
   * 구충 치료 일정 추가
   */
  addAntiparasitic: async (data: CreateAntiparasiticData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createAntiparasitic(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '구충 치료 일정 추가에 실패했습니다.'

      toast.error(`Failed to add antiparasitic: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },

  /**
   * 의료 처치 일정 추가
   */
  addMedical: async (data: CreateMedicalData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createMedical(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '의료 처치 일정 추가에 실패했습니다.'

      toast.error(`Failed to add medical: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },

  /**
   * 기타 치료 일정 추가
   */
  addOtherTreatments: async (data: CreateOtherTreatmentsData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createOtherTreatments(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '기타 치료 일정 추가에 실패했습니다.'

      toast.error(`Failed to add other treatments: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },

  /**
   * 산책 일정 추가
   */
  addWalk: async (data: CreateWalkData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createWalk(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '산책 일정 추가에 실패했습니다.'

      toast.error(`Failed to add walk: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },

  /**
   * 기타 활동 일정 추가
   */
  addOtherActivities: async (data: CreateOtherActivitiesData) => {
    const { currentPetId } = get()

    if (!currentPetId) {
      throw new Error('반려동물을 선택해주세요.')
    }

    set({ isLoading: true, error: null })

    try {
      await createOtherActivities(data)
      await get().fetchSchedules(currentPetId)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '기타 치료 일정 추가에 실패했습니다.'

      toast.error(`Failed to add other activities: ${err}`)

      set({
        isLoading: false,
        error: errorMessage,
      })

      throw err
    }
  },
}))
