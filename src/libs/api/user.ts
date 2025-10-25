// 로그인한 유저 테이블 정보를 가져옵니다

import type { User } from '@supabase/supabase-js'
import type { Users } from '../supabase'
import { createClient } from '../supabase/client'

const supabase = createClient()

export async function getUserData(user: User) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function insertUserData(
  userData: Users,
  userId: Users['id']
): Promise<Users> {
  const { error, data } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId)
    .single()

  if (error) throw new Error(error.message)
  return data
}
