import type { User } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { getUserData } from '@/libs/api/user'
import type { Database } from '@/libs/supabase/database.types'

export type UserData = Database['public']['Tables']['users']['Row']

export default function useUserData(user: User | null) {
  const [userData, setUserData] = useState<UserData | null>(null)
  useEffect(() => {
    if (!user) return
    const fetchUSerData = async () => {
      try {
        const data = await getUserData(user)
        setUserData(data)
      } catch (error) {
        toast.error(`${error}발생`)
      }
    }
    fetchUSerData()
  }, [user])

  return { userData }
}
