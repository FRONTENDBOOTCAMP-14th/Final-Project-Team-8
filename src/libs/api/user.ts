// 로그인한 유저 테이블 정보를 가져옵니다

import type { User } from '@supabase/supabase-js'
import type { UserData } from '@/hooks/useUserData'
import { createClient } from '../supabase/client'

const supabase = createClient()

interface updateProps {
  imgRef: string
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

export async function updateUserImg({ imgRef, userId }: updateProps) {
  const { data, error } = await supabase
    .from('users')
    .update({ profile_img: imgRef })
    .eq('id', userId)
  if (error) {
    console.error('Supabase error:', error)
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
