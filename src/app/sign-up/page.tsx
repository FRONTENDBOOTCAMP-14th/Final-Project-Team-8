'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Signup from '../../components/sign-up/Signup'
import { signUpWithEmail } from '../../libs/api/auth'

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = async (email: string, password: string) => {
    const { data, error } = await signUpWithEmail(email, password)

    if (error) {
      toast.error(`오류 발생! ${error.message}`)
      return
    }

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

  return <Signup onSignup={handleSignup} onLogin={handleLogin} />
}
