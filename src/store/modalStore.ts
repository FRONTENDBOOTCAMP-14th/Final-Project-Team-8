// modalStore.ts
import { create } from 'zustand'

export type ModalKind =
  | 'add:antiparasitic'
  | 'add:diet'
  | 'add:medical'
  | 'add:otherActivities'
  | 'add:otherTreatment'
  | 'add:vaccines'
  | 'add:walks'

export type ModalEntry = {
  kind: ModalKind
  // 필요하면 여기에 아코디언 id, pet_id, 프리필 값 등 payload 추가
  payload?: unknown
}

type ModalState = {
  active: ModalEntry | null
  openModal: (entry: ModalEntry) => void
  closeModal: () => void
}

export const useModal = create<ModalState>(set => ({
  active: null,
  openModal: entry => set({ active: entry }),
  closeModal: () => set({ active: null }),
}))
