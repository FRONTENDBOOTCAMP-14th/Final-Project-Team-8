// 로그인한 유저 테이블 정보를 가져옵니다

import type { User } from '@supabase/supabase-js'
import type { UserData } from '@/hooks/useUserData'
import { createClient } from '../supabase/client'

const supabase = createClient()

interface updateProps {
  selectedFile: File
  filePath: string
  userId: string
}

interface updateUserDetailProps {
  userData: Partial<UserData>
  userId: string
}

export async function getUserData(user: User) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateUserImg({
  selectedFile,
  filePath,
  userId,
}: updateProps) {
  // storage 에 업로드
  const { error: profileError } = await supabase.storage
    .from('profiles')
    .upload(filePath, selectedFile, { upsert: true })

  if (profileError) {
    console.error('Supabase error:', profileError)
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

  // users table에 스토리지 경로로 이미지 업데이트
  const { data, error } = await supabase
    .from('users')
    .update({ profile_img: publicURLWithCacheBuster })
    .eq('id', userId)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export async function updateUserDetail({
  userData,
  userId,
}: updateUserDetailProps) {
  const updatePayload = {
    birthday: userData.birthday ?? null,
    gender: userData.gender ?? null,
    nickname: userData.nickname ?? null,
    phone: userData.phone ?? null,
  }

  const { data, error } = await supabase
    .from('users')
    .update(updatePayload)
    .eq('id', userId)
  if (error) throw new Error(error.message)
  return data
}
