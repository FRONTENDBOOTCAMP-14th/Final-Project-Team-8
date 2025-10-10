// 로그인한 유저가 등록한 반려동물 정보를 가져옵니다.
import { createClient } from '../supabase/client'

const supabase = createClient()

export async function getUserPets(userId: string) {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', userId)

  if (error) throw new Error(error.message)

  return data
}
