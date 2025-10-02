import { createClient } from '../supabase/client'

/**
 * 이메일/비밀번호로 로그인
 */

export const loginWithEmail = async (email: string, password: string) => {
  const supabase = createClient()

  return await supabase.auth.signInWithPassword({ email, password })
}

/**
 * 이메일/비밀번호로 회원가입
 */

export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = createClient()

  return await supabase.auth.signUp({ email, password })
}
