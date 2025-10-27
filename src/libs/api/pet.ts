// 로그인한 유저가 등록한 반려동물 정보를 가져옵니다.
import type { User } from '@supabase/supabase-js'
import type { Pet } from '@/store/petStore'
import { createClient } from '../supabase/client'

const supabase = createClient()

interface updateProps {
  selectedFile: File
  filePath: string
  petId: string
}

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
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updatePetImg({
  selectedFile,
  filePath,
  petId,
}: updateProps) {
  // storage 에 업로드
  const { error: profileError } = await supabase.storage
    .from('profiles')
    .upload(filePath, selectedFile, { upsert: true })

  if (profileError) {
    // console.error('Supabase error:', profileError)
    throw new Error(profileError.message)
  }
  // 업로드된 파일의 공개 URL 가져오기
  const { data: publicURLData } = supabase.storage
    .from('profiles')
    .getPublicUrl(filePath)

  if (!publicURLData) {
    throw new Error('url가져오기 실패')
  }
  const publicURL = publicURLData.publicUrl

  // 캐시 무효화 쿼리 파라미터
  const cacheBuster = `?t=${Date.now()}`
  const publicURLWithCacheBuster = publicURL + cacheBuster

  // pets table에 스토리지 경로로 이미지 업데이트
  const { data, error } = await supabase
    .from('pets')
    .update({ profile_img: publicURLWithCacheBuster })
    .eq('id', petId)

  if (error) {
    throw new Error(error.message)
  }
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
