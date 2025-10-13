import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createClient } from '../libs/supabase/client'

interface UserState {
  user: User | null
  setUser: () => Promise<void>
}

const supabase = createClient()

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    set({ user })
  },
}))
