'use client'

import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/userStore'

interface UsePageStatusReseult {
  user: User | null
  isLoading: boolean
}

export function usePageStatus(): UsePageStatusReseult {
  const { user, setUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser().finally(() => setIsLoading(false))
  }, [setUser])

  return { user, isLoading }
}
