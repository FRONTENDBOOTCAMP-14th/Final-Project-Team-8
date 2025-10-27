'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Signup from '@/components/sign-up/SignUp'
import { signUpWithEmail } from '@/libs/api/auth'

// 에러 코드별 메시지
const ERROR_MESSAGES: Record<string, string> = {
  user_already_exists:
    '이미 가입된 이메일입니다. 다른 이메일을 사용하거나 로그인해주세요.',
}

export default function SignupPage() {
  const router = useRouter()
  const [signupError, setSignupError] = useState('')

  const handleSignup = async (
    email: string,
    password: string,
    name: string
  ) => {
    setSignupError('')

    const { error } = await signUpWithEmail(email, password, { name })

    if (error) {
      handleSignupError(error)
      return
    }

    handleSignupSuccess()
  }

  const handleSignupError = (error: any) => {
    // 에러 코드 추출 (code 또는 status)
    const errorCode = error.code ?? error.status?.toString()

    // 에러 코드에 맞는 메시지 찾기 (없으면 기본 메시지 보여짐)
    const errorMessage = errorCode
      ? (ERROR_MESSAGES[errorCode] ??
        '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
      : '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'

    setSignupError(errorMessage)
    toast.error('회원가입에 실패했습니다.', { description: errorMessage })
  }

  const handleSignupSuccess = () => {
    toast.success('회원가입 성공!', {
      description: '이메일을 확인해주세요.',
      action: {
        label: '로그인 페이지로 이동',
        onClick: () => router.push('/login'),
      },
    })
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <Signup
      onSignup={handleSignup}
      onLogin={handleLogin}
      signupError={signupError}
      onErrorChange={setSignupError}
    />
  )
}
