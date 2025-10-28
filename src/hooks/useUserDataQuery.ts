import type { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '@/libs/api/user'
import type { Database } from '@/libs/supabase/database.types'

export type UserData = Database['public']['Tables']['users']['Row']

export const userKeys = {
  all: ['userData'] as const,
  detail: (userId: string | undefined) => [...userKeys.all, userId] as const,
}
export default function useUserDataQuery(user: User | null) {
  const userId = user?.id

  return useQuery<UserData, Error>({
    queryKey: userKeys.detail(userId),
    queryFn: async () => {
      if (!userId) {
        throw new Error('로그인 해주세요')
      }
      const data = await getUserData(userId)
      return data
    },

    enabled: !!userId,
  })
}
