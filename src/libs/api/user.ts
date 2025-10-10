//로그인한 유저 테이블 정보를 가져옵니다

import { createClient } from '../supabase/client'

const supabase = createClient()

export async function getUserData(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw new Error(error.message)
  return data
}
