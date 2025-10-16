import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { getSelectedPet, getUserPets } from '@/libs/api/pet'
import type { Database } from '@/libs/supabase/database.types'

/**
 * UI 리스트용 반려동물 요약 정보
 * - 사이드바, 카드 등 최소 정보만 사용
 */
export interface PetSummary {
  id: string
  name: string
  profileImg: string | null
  species?: string
  breed?: string | null
  gender?: string | null
  bio?: string | null
}

/**
 * 선택된 반려동물 전체 정보
 * - DB Row 그대로 사용
 */
export type Pet = Database['public']['Tables']['pets']['Row']

interface PetStore {
  petList: PetSummary[]
  setPetList: (pets: PetSummary[]) => void
  selectedPetId: string | null
  setSelectedPetId: (id: string | null) => void
  fetchPetSummary: (user: User) => Promise<void>
  selectedPet?: Pet | undefined
  fetchSelectedPet: (id: string | null) => Promise<void>
}

/**
 * Zustand PetStore
 *
 * State:
 *  - petList: UI용 리스트
 *  - selectedPetId: 현재 선택된 반려동물 ID
 *  - selectedPet: 선택된 반려동물 전체 정보
 *
 * Actions:
 *  - setPetList: petList 업데이트
 *  - setSelectedPetId: 반려동물 선택 + 상세 정보 fetch
 *  - fetchPetSummary: 로그인 유저 기준 리스트 fetch + 첫 반려동물 자동 선택
 *  - fetchSelectedPet: 선택된 반려동물 전체 정보 fetch
 */
export const usePetStore = create<PetStore>((set, get) => ({
  // State
  petList: [],
  selectedPetId: null,
  selectedPet: undefined,

  // action

  /**
   * petList 업데이트
   */
  setPetList: (pets: PetSummary[]) => set({ petList: pets }),

  /**
   * selectedPetId 업데이트
   * - selectedPet 초기화
   * - 선택된 반려동물 전체 정보 fetch
   */
  setSelectedPetId: id => {
    set({ selectedPetId: id, selectedPet: undefined })
    if (id) get().fetchSelectedPet(id)
  },

  /**
   * 로그인 유저 기준으로 PetSummary 리스트 fetch
   * - petList 세팅
   * - 첫 번째 반려동물 자동 선택
   * - 선택된 첫 반려동물 상세 정보 fetch
   */
  fetchPetSummary: async (user: User) => {
    const data = await getUserPets(user)

    // UI용 요약 정보만 추출
    const summary: PetSummary[] = data.map(pet => ({
      id: pet.id,
      name: pet.name,
      profileImg: pet.profile_img ?? null,
      species: pet.species,
      breed: pet.breed,
      gender: pet.gender,
      bio: pet.bio,
    }))

    set({
      petList: summary,
      selectedPetId: data[0]?.id ?? null,
      selectedPet: undefined,
    })

    // 첫 번째 반려동물 상세 정보 fetch
    if (data[0]?.id) get().fetchSelectedPet(data[0].id)
  },

  /**
   * 선택된 반려동물 전체 정보 fetch
   * - selectedPet 상태에 세팅
   */
  fetchSelectedPet: async (id: string | null) => {
    if (!id) return
    const data = await getSelectedPet(id)
    set({ selectedPet: data })
  },
}))
