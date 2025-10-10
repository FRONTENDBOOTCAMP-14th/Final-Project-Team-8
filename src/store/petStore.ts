import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { getUserPets } from '../libs/api/pet'

interface Pet {
  id: string
  name: string
  profileImg?: string
}

interface PetStore {
  pets: Pet[]
  setPets: (pets: Pet[]) => void
  selectedPetId: string | null
  setSelectedPetId: (id: string | null) => void
  fetchPets: (user: User) => Promise<void>
}

export const usePetStore = create<PetStore>(set => ({
  pets: [],
  setPets: pets => set({ pets }),
  selectedPetId: null,
  setSelectedPetId: id => set({ selectedPetId: id }),
  fetchPets: async (user: User) => {
    const data = await getUserPets(user)
    set({ pets: data })
  },
}))
