import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Database } from '../libs/supabase/database.types'

/**
 * 반려동물 프로필 생성 전용 Store
 *
 * petStore와 완전히 독립적으로 동작
 * 기존 perStore를 전혀 건드리지 않음!
 */
export type DraftPet = Partial<Database['public']['Tables']['pets']['Insert']>

interface ProfileCreationStore {
  // State
  draftPet: DraftPet
  currentStep: number

  // Actions
  setCurrentStep: (step: number) => void
  updateDraftPet: (data: DraftPet) => void
  nextStep: () => void
  previousStep: () => void
  resetDraftPet: () => void
}

const initialDraftPet: DraftPet = {
  name: '',
  profile_img: null,
  species: '',
  breed: null,
  birthdate: null,
  adoption_date: null,
  weight: null,
  size: null,
}

export const useProfileCreationStore = create<ProfileCreationStore>()(
  persist(
    set => ({
      // State
      draftPet: initialDraftPet,
      currentStep: 1,

      // Actions
      setCurrentStep: (step: number) => set({ currentStep: step }),

      updateDraftPet: (data: DraftPet) =>
        set(state => ({
          draftPet: { ...state.draftPet, ...data },
        })),

      nextStep: () =>
        set(state => ({
          currentStep: Math.min(state.currentStep + 1, 7),
        })),

      previousStep: () =>
        set(state => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      resetDraftPet: () =>
        set({
          draftPet: initialDraftPet,
          currentStep: 3,
        }),
    }),
    { name: 'profile-creation-storage', version: 1 }
  )
)
