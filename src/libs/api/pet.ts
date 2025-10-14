// 로그인한 유저가 등록한 반려동물 정보를 가져옵니다.
import { User } from '@supabase/supabase-js'
import { createClient } from '../supabase/client'

const supabase = createClient()
export async function getUserPets(user: User) {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  return data
}

export async function getSelectedPet(id: string) {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('pet_id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}
