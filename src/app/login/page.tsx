'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Login } from '../../components/login'
import { createClient } from '../../libs/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

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
