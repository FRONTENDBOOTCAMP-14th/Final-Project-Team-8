import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createClient } from '../libs/supabase/client'

interface UserState {
  user: User | null
  setUser: () => Promise<void>
}

const supabase = createClient()

/**
 * 현재 로그인한 사용자 상태를 관리하는 Zustand 스토어
 *
 * {User | null} user - 현재 로그인한 사용자 정보, 로그인 안됐으면 null
 * {() => Promise<void>} setUser - Supabase에서 사용자 정보를 가져와 상태를 업데이트하는 함수
 */
export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    set({ user })
  },
}))
