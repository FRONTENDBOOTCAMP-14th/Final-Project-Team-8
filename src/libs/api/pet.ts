// 로그인한 유저가 등록한 반려동물 정보를 가져옵니다.
import type { User } from '@supabase/supabase-js'
import type { Pet } from '@/store/petStore'
import { createClient } from '../supabase/client'

export async function getUserPets(user: User) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  return data
}

export async function getSelectedPet(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updatePetDetail(petData: Partial<Pet>, petId: string) {
  const supabase = createClient()
  const updatePayload = {
    adoption_date: petData?.adoption_date ?? null,
    bio: petData?.bio ?? null,
    birthdate: petData?.birthdate ?? null,
    breed: petData?.breed ?? null,
    species: petData?.species ?? null,
    gender: petData?.gender ?? null,
    name: petData?.name ?? '',
    size: petData?.size ?? null,
    weight: petData?.weight ?? null,
    profile_img: petData?.profile_img ?? null,
  }
  const { data, error } = await supabase
    .from('pets')
    .update(updatePayload)
    .eq('id', petId)
  if (error) throw new Error(error.message)
  return data
}
