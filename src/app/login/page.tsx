'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Login } from '../../components/login'
import { loginWithEmail } from '../../libs/api/auth'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await loginWithEmail(email, password)

    if (error) {
      toast.error(`로그인 실패 : ${error.message}`)
      return
    }

    toast.success('로그인 성공!')
    router.push('/')
  }

  const handleSignUp = () => {
    router.push('/signup')
  }

  return <Login onLogin={handleLogin} onSignUp={handleSignUp} />
}
