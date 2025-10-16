import { createClient } from '../supabase/client'
import type { TablesInsert } from '../supabase/database.types'

/**
 * 이메일/비밀번호로 로그인
 */
export const loginWithEmail = async (email: string, password: string) => {
  const supabase = createClient()

  return await supabase.auth.signInWithPassword({ email, password })
}

/**
 * 이메일/비밀번호로 회원가입
 * - Auth 계정 생성
 * - users 테이블에 닉네임 저장
 */
export const signUpWithEmail = async (
  email: string,
  password: string,
  metadata?: {
    name?: string
  }
) => {
  const supabase = createClient()

  // 1. Auth 회원가입
  let authData, authError

  if (metadata) {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    authData = result.data
    authError = result.error
  } else {
    // metadata가 없으면 email, password만 전달
    const result = await supabase.auth.signUp({
      email,
      password,
    })
    authData = result.data
    authError = result.error
  }

  // Auth로 회원가입 실패 시 즉시 반환
  if (authError) {
    return { data: null, error: authError }
  }

  // 유저 정보가 없으면 에러 반환
  if (!authData.user) {
    return {
      data: null,
      error: new Error('회원가입에 실패했습니다'),
    }
  }

  // 2. users 테이블에 닉네임 저장
  const nickname = metadata?.name ?? email.split('@')[0] // name이 없으면 이메일 앞 부분 사용

  const newUser: TablesInsert<'users'> = {
    id: authData.user.id,
    email,
    nickname: nickname ?? null,
  }

  const { error: profileError } = await supabase.from('users').insert(newUser)

  // users 테이블 저장 실패 시 에러 반환
  if (profileError) {
    console.error('Profile creation failed : ', profileError)

    return {
      data: authData,
      error: {
        ...profileError,
        message: '프로필 생성에 실패했습니다',
      },
    }
  }

  // 3. 성공 시 auth 데이터 반환
  return { data: authData, error: null }
}
