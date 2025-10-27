'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Login } from '@/components/login'
import { loginWithEmail } from '@/libs/api/auth'

export default function LoginPage() {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')

  const handleLogin = async (email: string, password: string) => {
    const { error } = await loginWithEmail(email, password)

    if (error) {
      setLoginError(
        '이메일 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요.'
      )
      return
    }

    toast.success('로그인 성공!')
    router.push('/dashboard')
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <Login
      onLogin={handleLogin}
      onSignUp={handleSignUp}
      loginError={loginError}
      onErrorChange={setLoginError}
    />
  )
}
