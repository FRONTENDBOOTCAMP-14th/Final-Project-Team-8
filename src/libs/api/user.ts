//로그인한 유저 테이블 정보를 가져옵니다

import { User } from '@supabase/supabase-js'
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
